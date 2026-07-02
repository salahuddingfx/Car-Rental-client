import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Phone, Mail, MapPin } from 'lucide-react';
import { useChatStore } from '../../store/useChatStore';
import { useStore } from '../../store/useStore';
import { PhoneInput } from './PhoneInput';
import { CountrySelect } from './CountrySelect';
import { liveChatSchema } from '../../lib/validations';

type View = 'contact' | 'chat';

const GUEST_ID_KEY = 'apexride-guest-id';

function getOrCreateGuestId(): string {
  let id = localStorage.getItem(GUEST_ID_KEY);
  if (!id) {
    id = 'guest-' + crypto.randomUUID();
    localStorage.setItem(GUEST_ID_KEY, id);
  }
  return id;
}

export const LiveChat = () => {
  const { user } = useStore();
  const { createChat, sendMessage, getChat, markAsRead, chats } = useChatStore();
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<View>('contact');
  const [activeChat, setActiveChat] = useState<string | null>(() => localStorage.getItem('apexride-active-chat'));
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactCountryCode, setContactCountryCode] = useState('+880');
  const [contactCountry, setContactCountry] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactAddress, setContactAddress] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});

  const myId = user?.id || getOrCreateGuestId();
  const currentChat = activeChat ? getChat(activeChat) : null;

  const persistActiveChat = useCallback((chatId: string | null) => {
    if (chatId) {
      localStorage.setItem('apexride-active-chat', chatId);
    } else {
      localStorage.removeItem('apexride-active-chat');
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat?.messages]);

  useEffect(() => {
    if (activeChat) {
      persistActiveChat(activeChat);
    }
  }, [activeChat, persistActiveChat]);

  useEffect(() => {
    if (isOpen && !activeChat) {
      const existing = chats.find(
        c => c.participants.includes(myId) && c.carId === 'general-inquiry'
      );
      if (existing) {
        setActiveChat(existing.id);
        setView('chat');
      }
    }
  }, [isOpen, activeChat, chats, myId]);

  const handleSend = useCallback(() => {
    if (!message.trim() || !activeChat) return;
    sendMessage(activeChat, {
      senderId: myId,
      senderName: user?.name || contactName || 'Guest',
      senderAvatar: user?.avatar || '',
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
  }, [message, activeChat, myId, user, contactName, sendMessage]);

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
    const result = liveChatSchema.safeParse({
      name: contactName,
      email: contactEmail,
      phone: contactPhone,
      countryCode: contactCountryCode,
      country: contactCountry,
      address: contactAddress,
    });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach(issue => {
        const key = issue.path[0] as string;
        fieldErrors[key] = issue.message;
      });
      setContactErrors(fieldErrors);
      return;
    }
    setContactErrors({});
    setContactSubmitted(true);

    const chatId = createChat({
      userId: myId,
      userName: user?.name || contactName,
      userAvatar: user?.avatar || '',
      hostId: 'host-support',
      hostName: 'Apex Support',
      hostAvatar: '/avatars/support.png',
      carId: 'general-inquiry',
      carName: 'General Inquiry',
    });

    sendMessage(chatId, {
      senderId: myId,
      senderName: user?.name || contactName,
      senderAvatar: user?.avatar || '',
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
      setContactCountryCode('+880');
      setContactCountry('');
      setContactEmail('');
      setContactAddress('');
      setContactErrors({});
      setView('chat');
    }, 2000);
  };

  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowGreeting(true), 2000);
    const hide = setTimeout(() => setShowGreeting(false), 8000);
    return () => { clearTimeout(t); clearTimeout(hide); };
  }, []);

  return (
    <>
      {/* Greeting popup */}
      <AnimatePresence>
        {showGreeting && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed bottom-36 right-4 sm:right-6 z-50 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-xl rounded-2xl rounded-br-sm p-4 max-w-[220px]"
          >
            <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-0.5">Hello!</p>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Need a car? Chat with us!
            </p>
            <div className="absolute bottom-0 right-4 w-3 h-3 bg-white dark:bg-neutral-800 border-r border-b border-neutral-200 dark:border-neutral-700 transform translate-y-1/2 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => { setIsOpen(!isOpen); setShowGreeting(false); }}
        className={`fixed bottom-20 right-4 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-accent-blue text-white rounded-full shadow-lg shadow-accent-blue/30 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer ${showGreeting ? 'animate-bounce' : ''}`}
      >
        <MessageCircle size={22} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 sm:inset-auto sm:bottom-36 sm:right-6 z-50 sm:w-[360px] sm:h-[500px] max-h-[85vh] sm:max-h-none bg-white dark:bg-neutral-900 sm:rounded-2xl rounded-t-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700 sm:border flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-accent-blue text-white p-4 flex items-center gap-3 shrink-0">
              {view === 'chat' && (
                <button onClick={() => { setView('contact'); setActiveChat(null); persistActiveChat(null); }} className="p-1 cursor-pointer">
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
              <button onClick={() => setIsOpen(false)} className="p-2 -mr-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>

            {/* Contact Form */}
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
                    <div>
                      <label className="text-[10px] text-neutral-500 dark:text-neutral-400 font-display uppercase tracking-widest mb-1 block">Your Name *</label>
                      <div className="flex items-center border border-neutral-200 dark:border-neutral-700 p-2.5 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                        <User size={14} className="text-neutral-400 mr-2 shrink-0" />
                        <input type="text" required placeholder="John Doe" value={contactName} onChange={e => setContactName(e.target.value)}
                          className="bg-transparent text-xs text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 outline-none w-full" />
                      </div>
                      {contactErrors.name && <p className="text-[10px] text-red-500 mt-1">{contactErrors.name}</p>}
                    </div>
                    <div>
                      <label className="text-[10px] text-neutral-500 dark:text-neutral-400 font-display uppercase tracking-widest mb-1 block">Email Address *</label>
                      <div className="flex items-center border border-neutral-200 dark:border-neutral-700 p-2.5 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                        <Mail size={14} className="text-neutral-400 mr-2 shrink-0" />
                        <input type="text" required placeholder="you@example.com" value={contactEmail} onChange={e => setContactEmail(e.target.value)}
                          className="bg-transparent text-xs text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 outline-none w-full" />
                      </div>
                      {contactErrors.email && <p className="text-[10px] text-red-500 mt-1">{contactErrors.email}</p>}
                    </div>
                    <div>
                      <label className="text-[10px] text-neutral-500 dark:text-neutral-400 font-display uppercase tracking-widest mb-1 block">Phone Number *</label>
                      <PhoneInput value={contactPhone} countryCode={contactCountryCode} onChange={setContactPhone} onCountryCodeChange={setContactCountryCode} error={contactErrors.phone} placeholder="1XXX XXXXXX" />
                    </div>
                    <div>
                      <label className="text-[10px] text-neutral-500 dark:text-neutral-400 font-display uppercase tracking-widest mb-1 block">Country *</label>
                      <CountrySelect value={contactCountry} onChange={code => { setContactCountry(code); }} error={contactErrors.country} />
                    </div>
                    <div>
                      <label className="text-[10px] text-neutral-500 dark:text-neutral-400 font-display uppercase tracking-widest mb-1 block">Address (Optional)</label>
                      <div className="flex items-center border border-neutral-200 dark:border-neutral-700 p-2.5 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                        <MapPin size={14} className="text-neutral-400 mr-2 shrink-0" />
                        <input type="text" placeholder="Your address" value={contactAddress} onChange={e => setContactAddress(e.target.value)}
                          className="bg-transparent text-xs text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 outline-none w-full" />
                      </div>
                    </div>
                    <button type="submit" className="w-full py-2.5 bg-accent-blue text-white text-xs font-bold rounded-lg hover:bg-blue-700 active:scale-[0.98] transition-all cursor-pointer">
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
                  {!currentChat || currentChat.messages.length === 0 ? (
                    <div className="text-center py-4">
                      <div className="w-12 h-12 bg-accent-blue/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <MessageCircle size={20} className="text-accent-blue" />
                      </div>
                      <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200 mb-1">Hello!</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-[240px] mx-auto">
                        Welcome to Apex Ride! Do you need a car? Ask us anything about our fleet, pricing, or bookings.
                      </p>
                    </div>
                  ) : (
                    currentChat.messages.map(msg => {
                      const isMe = msg.senderId === myId;
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
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-2">
                  <input
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
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
