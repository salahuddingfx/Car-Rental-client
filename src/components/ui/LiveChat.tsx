import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, ArrowLeft } from 'lucide-react';
import { useChatStore, type Chat } from '../../store/useChatStore';
import { useStore } from '../../store/useStore';

interface LiveChatProps {
  hostId: string;
  hostName: string;
  hostAvatar: string;
  carId: string;
  carName: string;
}

export const LiveChat = ({ hostId, hostName, hostAvatar, carId, carName }: LiveChatProps) => {
  const { user } = useStore();
  const { createChat, sendMessage, getChat, getChatsByUser, markAsRead } = useChatStore();
  const [isOpen, setIsOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const myChats = user ? getChatsByUser(user.id) : [];
  const currentChat = activeChat ? getChat(activeChat) : null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat?.messages]);

  const handleStartChat = () => {
    if (!user) return;
    const chatId = createChat({
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      hostId,
      hostName,
      hostAvatar,
      carId,
      carName,
    });
    setActiveChat(chatId);
    markAsRead(chatId);
  };

  const handleSend = () => {
    if (!message.trim() || !activeChat || !user) return;
    sendMessage(activeChat, {
      senderId: user.id,
      senderName: user.name,
      senderAvatar: user.avatar,
      text: message.trim(),
    });
    setMessage('');

    // Simulate host auto-reply after 1.5s
    setTimeout(() => {
      sendMessage(activeChat, {
        senderId: hostId,
        senderName: hostName,
        senderAvatar: hostAvatar,
        text: getAutoReply(),
      });
    }, 1500);
  };

  const getAutoReply = () => {
    const replies = [
      'Thanks for your interest! How can I help?',
      'Great choice! This car is in excellent condition.',
      'Feel free to ask any questions about the car.',
      'I can arrange early pickup if needed!',
      'The car is available for your requested dates.',
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  return (
    <>
      {/* Chat Bubble */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen && myChats.length > 0 && !activeChat) {
            setActiveChat(myChats[0].id);
            markAsRead(myChats[0].id);
          }
        }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent-blue text-white rounded-full shadow-lg shadow-accent-blue/30 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
      >
        <MessageCircle size={22} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] h-[500px] bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-accent-blue text-white p-4 flex items-center gap-3">
              {activeChat ? (
                <button onClick={() => setActiveChat(null)} className="cursor-pointer">
                  <ArrowLeft size={18} />
                </button>
              ) : null}
              <div className="flex-1">
                <h3 className="font-display text-sm font-bold">
                  {activeChat ? currentChat?.carName || 'Chat' : 'Messages'}
                </h3>
                <p className="text-[10px] text-white/70">
                  {activeChat
                    ? `Chatting with ${currentChat?.participantNames.find(n => n !== user?.name) || hostName}`
                    : `${myChats.length} conversation${myChats.length !== 1 ? 's' : ''}`
                  }
                </p>
              </div>
              <button onClick={() => setIsOpen(false)} className="cursor-pointer">
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            {!activeChat ? (
              /* Chat List */
              <div className="flex-1 overflow-y-auto">
                {myChats.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6">
                    <MessageCircle size={32} className="text-neutral-300 dark:text-neutral-600 mb-3" />
                    <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-300 mb-1">No messages yet</p>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-4">Start a conversation with the host</p>
                    <button
                      onClick={handleStartChat}
                      className="px-4 py-2 bg-accent-blue text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      Chat with Host
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                    {myChats.map(chat => {
                      const otherIdx = chat.participants.findIndex(p => p !== user?.id);
                      return (
                        <button
                          key={chat.id}
                          onClick={() => { setActiveChat(chat.id); markAsRead(chat.id); }}
                          className="w-full flex items-center gap-3 p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors text-left cursor-pointer"
                        >
                          <img
                            src={chat.participantAvatars[otherIdx] || hostAvatar}
                            alt=""
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200 truncate">
                                {chat.participantNames[otherIdx] || hostName}
                              </p>
                              <span className="text-[9px] text-neutral-400 shrink-0">
                                {chat.lastMessageTime ? new Date(chat.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                              </span>
                            </div>
                            <p className="text-[10px] text-accent-blue font-medium">{chat.carName}</p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{chat.lastMessage || 'Start chatting...'}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              /* Messages */
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-50 dark:bg-neutral-800/50">
                  {currentChat?.messages.map(msg => {
                    const isMe = msg.senderId === user?.id;
                    return (
                      <div key={msg.id} className={`flex gap-2 ${isMe ? 'flex-row-reverse' : ''}`}>
                        <img src={msg.senderAvatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0" />
                        <div className={`max-w-[70%] ${isMe ? 'text-right' : ''}`}>
                          <div className={`inline-block px-3 py-2 rounded-2xl text-xs ${
                            isMe
                              ? 'bg-accent-blue text-white rounded-br-sm'
                              : 'bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 text-neutral-800 dark:text-neutral-200 rounded-bl-sm'
                          }`}>
                            {msg.text}
                          </div>
                          <p className="text-[9px] text-neutral-400 mt-1">
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-2">
                  <input
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 text-xs text-neutral-800 dark:text-neutral-200 px-3 py-2.5 bg-neutral-100 dark:bg-neutral-700 rounded-full outline-none focus:ring-2 focus:ring-accent-blue/20"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className="w-9 h-9 bg-accent-blue text-white rounded-full flex items-center justify-center disabled:opacity-50 hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
