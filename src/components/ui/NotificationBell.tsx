import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, Calendar, Car, MessageCircle, X } from 'lucide-react';
import { pushService, type PushNotification } from '../../services/pushService';

export const NotificationBell = ({ className = '' }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<PushNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setNotifications(pushService.getNotifications());
    setUnreadCount(pushService.getUnreadCount());

    const unsubscribe = pushService.subscribe((notifs) => {
      setNotifications(notifs);
      setUnreadCount(pushService.getUnreadCount());
    });

    return unsubscribe;
  }, []);

  const handleMarkAllRead = () => {
    pushService.markAllAsRead();
  };

  const handleMarkRead = (id: string) => {
    pushService.markAsRead(id);
  };

  const getIcon = (title: string) => {
    if (title.includes('Booking')) return <Calendar size={14} className="text-blue-500" />;
    if (title.includes('Message') || title.includes('Chat')) return <MessageCircle size={14} className="text-green-500" />;
    if (title.includes('Car') || title.includes('Vehicle')) return <Car size={14} className="text-amber-500" />;
    return <Bell size={14} className="text-neutral-500" />;
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
      >
        <Bell size={18} className="text-neutral-600 dark:text-neutral-400" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="absolute right-0 mt-3 w-80 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-xl z-50 rounded-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-neutral-100 dark:border-neutral-700">
                <h4 className="font-display text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">
                  Notifications
                </h4>
                {unreadCount > 0 && (
                  <button onClick={handleMarkAllRead} className="text-[10px] text-accent-blue hover:underline cursor-pointer">
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center">
                    <Bell size={24} className="mx-auto text-neutral-300 mb-2" />
                    <p className="text-xs text-neutral-500">No notifications yet</p>
                  </div>
                ) : (
                  notifications.map(notif => (
                    <div
                      key={notif.id}
                      onClick={() => handleMarkRead(notif.id)}
                      className={`flex items-start gap-3 p-4 border-b border-neutral-50 dark:border-neutral-700/50 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors cursor-pointer ${!notif.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                    >
                      <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center shrink-0">
                        {getIcon(notif.title)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200 truncate">{notif.title}</p>
                          {!notif.read && <span className="w-1.5 h-1.5 rounded-full bg-accent-blue shrink-0" />}
                        </div>
                        <p className="text-[11px] text-neutral-500 line-clamp-2">{notif.body}</p>
                        <p className="text-[9px] text-neutral-400 mt-1">
                          {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
