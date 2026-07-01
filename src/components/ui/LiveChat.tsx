import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, ArrowLeft, User, Phone, Mail, MapPin } from 'lucide-react';
import { useChatStore, type Chat } from '../../store/useChatStore';
import { useStore } from '../../store/useStore';

type View = 'contact' | 'chat';

export const LiveChat = () => {
  const { user } = useStore();
  const { createChat, sendMessage, getChat, getChatsByUser, markAsRead } = useChatStore();
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<View>('list');
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactAddress, setContactAddress] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const myChats = user ? getChatsByUser(user.id) : [];
  const currentChat = activeChat ? getChat(activeChat) : null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat?.messages]);

  const handleSend = () => {
    if (!message.trim() || !activeChat || !user) return;
    sendMessage(activeChat, {
      senderId: user.id,
      senderName: user.name,
      senderAvatar: user.avatar,
      text: message.trim(),
    });
    setMessage('');
    setTimeout(() => {
      sendMessage(activeChat, {
        senderId: 'host-support',
        senderName: 'Apex Support',
        senderAvatar: '/avatars/support.png',
        text: getAutoReply(),
      });
    }, 1500);
  };

  const getAutoReply = () => {
    const replies = [
      'Thanks for reaching out! How can we assist you?',
      'Great to hear from you! What can we help with?',
      'Our team will get back to you shortly.',
      'Feel free to ask any questions about our services!',
      'Welcome to Apex Ride! What interests you?',
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactPhone.trim() || !contactEmail.trim()) return;
    setContactSubmitted(true);
    // Simulate creating a chat with support
    if (user) {
      const chatId = createChat({
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        hostId: 'host-support',
        hostName: 'Apex Support',
        hostAvatar: '/avatars/support.png',
        carId: 'general-inquiry',
        carName: 'General Inquiry',
      });
      sendMessage(chatId, {
        senderId: user.id,
        senderName: user.name,
        senderAvatar: user.avatar,
        text: `Hi, I'd like to get in touch.\n\nName: ${contactName}\nPhone: ${contactPhone}\nEmail: ${contactEmail}${contactAddress ? `\nAddress: ${contactAddress}` : ''}`,
      });
      setTimeout(() => {
        sendMessage(chatId, {
          senderId: 'host-support',
          senderName: 'Apex Support',
          senderAvatar: '/avatars/support.png',
          text: `Thanks ${contactName}! We've received your details and will get back to you at ${contactEmail} shortly.`,
        });
      }, 1500);
    }
    setTimeout(() => {
      setContactSubmitted(false);
      setContactName('');
      setContactPhone('');
      setContactEmail('');
      setContactAddress('');
      setView('list');
    }, 2500);
  };

  return (
    <>
      {/* Chat Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-6 z-50 w-14 h-14 bg-accent-blue text-white rounded-full shadow-lg shadow-accent-blue/30 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
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
            className="fixed bottom-36 right-6 z-50 w-[360px] h-[500px] bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-accent-blue text-white p-4 flex items-center gap-3">
              {view === 'chat' ? (
                <button onClick={() => { setView('list'); setActiveChat(null); }} className="cursor-pointer">
                  <ArrowLeft size={18} />
                </button>
              ) : view === 'contact' ? (
                <button onClick={() => setView('list')} className="cursor-pointer">
                  <ArrowLeft size={18} />
                </button>
              ) : null}
              <div className="flex-1">
                <h3 className="font-display text-sm font-bold">
                  {view === 'chat' ? currentChat?.carName || 'Chat' : view === 'contact' ? 'Contact Us' : 'Messages'}
                </h3>
                <p className="text-[10px] text-white/70">
                  {view === 'chat'
                    ? `Chatting with ${currentChat?.participantNames.find(n => n !== user?.name) || 'Support'}`
                    : view === 'contact'
                    ? 'Tell us how to reach you'
                    : `${myChats.length} conversation${myChats.length !== 1 ? 's' : ''}`
                  }
                </p>
              </div>
              <button onClick={() => setIsOpen(false)} className="cursor-pointer">
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            {view === 'list' && (
              <div className="flex-1 overflow-y-auto">
                {/* Contact Us button */}
                <button
                  onClick={() => setView('contact')}
                  className="w-full flex items-center gap-3 p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors border-b border-neutral-100 dark:border-neutral-800 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-accent-amber/10 flex items-center justify-center">
                    <Mail size={18} className="text-accent-amber" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">Contact Us</p>
                    <p className="text-[10px] text-neutral-400">Name, phone, email & address</p>
                  </div>
                </button>

                {myChats.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-center p-6">
                    <MessageCircle size={32} className="text-neutral-300 dark:text-neutral-600 mb-3" />
                    <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-300 mb-1">No conversations yet</p>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500">Start chatting or contact us</p>
                  </div>
                ) : (
                  <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                    {myChats.map(chat => {
                      const otherIdx = chat.participants.findIndex(p => p !== user?.id);
                      return (
                        <button
                          key={chat.id}
                          onClick={() => { setActiveChat(chat.id); setView('chat'); markAsRead(chat.id); }}
                          className="w-full flex items-center gap-3 p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors text-left cursor-pointer"
                        >
                          <img
                            src={chat.participantAvatars[otherIdx] || '/avatars/support.png'}
                            alt=""
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200 truncate">
                                {chat.participantNames[otherIdx] || 'Support'}
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
            )}

            {/* Contact Form */}
            {view === 'contact' && (
              <div className="flex-1 overflow-y-auto p-4">
                {contactSubmitted ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-3">
                      <Send size={20} className="text-green-600" />
                    </div>
                    <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200 mb-1">Message Sent!</p>
                    <p className="text-xs text-neutral-400">We'll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-3">
                    <p className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-wider font-display">Required *</p>
                    {[
                      { icon: User, label: 'Your Name', value: contactName, set: setContactName, ph: 'John Doe', required: true },
                      { icon: Phone, label: 'Phone Number', value: contactPhone, set: setContactPhone, ph: '+880 1XXX XXXXXX', required: true },
                      { icon: Mail, label: 'Email Address', value: contactEmail, set: setContactEmail, ph: 'you@example.com', required: true },
                    ].map(f => (
                      <div key={f.label}>
                        <label className="text-[10px] text-neutral-500 dark:text-neutral-400 font-display uppercase tracking-widest mb-1 block">{f.label} {f.required && '*'}</label>
                        <div className="flex items-center border border-neutral-200 dark:border-neutral-700 p-2.5 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                          <f.icon size={14} className="text-neutral-400 mr-2 shrink-0" />
                          <input
                            type="text"
                            required={f.required}
                            placeholder={f.ph}
                            value={f.value}
                            onChange={e => f.set(e.target.value)}
                            className="bg-transparent text-xs text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 outline-none w-full"
                          />
                        </div>
                      </div>
                    ))}
                    <div>
                      <label className="text-[10px] text-neutral-500 dark:text-neutral-400 font-display uppercase tracking-widest mb-1 block">Address (Optional)</label>
                      <div className="flex items-center border border-neutral-200 dark:border-neutral-700 p-2.5 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                        <MapPin size={14} className="text-neutral-400 mr-2 shrink-0" />
                        <input
                          type="text"
                          placeholder="Your address (optional)"
                          value={contactAddress}
                          onChange={e => setContactAddress(e.target.value)}
                          className="bg-transparent text-xs text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 outline-none w-full"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-accent-blue text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Chat Messages */}
            {view === 'chat' && (
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
