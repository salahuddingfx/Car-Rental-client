import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Phone, Mail, MapPin } from 'lucide-react';
import { useChatStore } from '../../store/useChatStore';
import { useStore } from '../../store/useStore';

type View = 'contact' | 'chat';

export const LiveChat = () => {
  const { user } = useStore();
  const { createChat, sendMessage, getChat, getChatsByUser, markAsRead } = useChatStore();
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<View>('contact');
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactAddress, setContactAddress] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const currentChat = activeChat ? getChat(activeChat) : null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat?.messages]);

  useEffect(() => {
    if (isOpen) {
      if (user && activeChat) {
        setView('chat');
      } else {
        setView('contact');
        setContactSubmitted(false);
      }
    }
  }, [isOpen, user, activeChat]);

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

    const userId = user?.id || 'guest-' + Date.now();
    const userName = user?.name || contactName;
    const userAvatar = user?.avatar || '';

    const chatId = createChat({
      userId,
      userName,
      userAvatar,
      hostId: 'host-support',
      hostName: 'Apex Support',
      hostAvatar: '/avatars/support.png',
      carId: 'general-inquiry',
      carName: 'General Inquiry',
    });

    sendMessage(chatId, {
      senderId: userId,
      senderName: userName,
      senderAvatar: userAvatar,
      text: `Hi, I'd like to get in touch.\n\nName: ${contactName}\nPhone: ${contactPhone}\nEmail: ${contactEmail}${contactAddress ? `\nAddress: ${contactAddress}` : ''}`,
    });

    setTimeout(() => {
      sendMessage(chatId, {
        senderId: 'host-support',
        senderName: 'Apex Support',
        senderAvatar: '/avatars/support.png',
        text: `Thanks ${contactName}! We've received your details and will get back to you at ${contactEmail} shortly. Feel free to chat with us here anytime.`,
      });
    }, 1500);

    setActiveChat(chatId);
    markAsRead(chatId);

    setTimeout(() => {
      setContactSubmitted(false);
      setContactName('');
      setContactPhone('');
      setContactEmail('');
      setContactAddress('');
      setView('chat');
    }, 2000);
  };

  const hasExistingChat = user ? getChatsByUser(user.id).length > 0 : false;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-6 z-50 w-14 h-14 bg-accent-blue text-white rounded-full shadow-lg shadow-accent-blue/30 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
      >
        <MessageCircle size={22} />
      </button>

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
              {view === 'chat' && (
                <button onClick={() => { setView('contact'); setActiveChat(null); }} className="cursor-pointer">
                  <User size={18} />
                </button>
              )}
              <div className="flex-1">
                <h3 className="font-display text-sm font-bold">
                  {view === 'chat' ? 'Chat with Us' : 'Contact Us'}
                </h3>
                <p className="text-[10px] text-white/70">
                  {view === 'chat'
                    ? `Apex Support`
                    : 'Tell us how to reach you'
                  }
                </p>
              </div>
              <button onClick={() => setIsOpen(false)} className="cursor-pointer">
                <X size={18} />
              </button>
            </div>

            {/* Contact Form — Default View */}
            {view === 'contact' && (
              <div className="flex-1 overflow-y-auto p-4">
                {contactSubmitted ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-3">
                      <Send size={20} className="text-green-600" />
                    </div>
                    <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200 mb-1">Message Sent!</p>
                    <p className="text-xs text-neutral-400">Connecting you to support...</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-3">
                    <p className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-wider font-display mb-1">
                      Fill in your details to start chatting *
                    </p>
                    {[
                      { icon: User, label: 'Your Name', value: contactName, set: setContactName, ph: 'John Doe' },
                      { icon: Phone, label: 'Phone Number', value: contactPhone, set: setContactPhone, ph: '+880 1XXX XXXXXX' },
                      { icon: Mail, label: 'Email Address', value: contactEmail, set: setContactEmail, ph: 'you@example.com' },
                    ].map(f => (
                      <div key={f.label}>
                        <label className="text-[10px] text-neutral-500 dark:text-neutral-400 font-display uppercase tracking-widest mb-1 block">{f.label} *</label>
                        <div className="flex items-center border border-neutral-200 dark:border-neutral-700 p-2.5 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                          <f.icon size={14} className="text-neutral-400 mr-2 shrink-0" />
                          <input
                            type="text"
                            required
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
                          placeholder="Your address"
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
                      Start Chat
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
                        <div className="w-7 h-7 rounded-full bg-accent-blue/10 flex items-center justify-center shrink-0">
                          {isMe ? <User size={12} className="text-accent-blue" /> : <MessageCircle size={12} className="text-accent-blue" />}
                        </div>
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
