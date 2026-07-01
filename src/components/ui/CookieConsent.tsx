import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Settings, X } from 'lucide-react';
import { Button } from './Button';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const COOKIE_KEY = 'apex-ride-cookies';

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (!stored) setVisible(true);
  }, []);

  const save = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify(prefs));
    setVisible(false);
    setShowCustomize(false);
  };

  const handleAcceptAll = () => save({ necessary: true, analytics: true, marketing: true });

  const handleIgnoreAll = () => save({ necessary: true, analytics: false, marketing: false });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6"
        >
          <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-2xl rounded-2xl p-6">
            {!showCustomize ? (
              <>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent-amber/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                    <Cookie size={20} className="text-accent-amber" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-sm font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-1.5">
                      We Value Your Privacy
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4">
                      We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. Choose your preference below.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="primary" size="sm" className="rounded-lg" onClick={handleAcceptAll}>
                        Accept All
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-lg" onClick={handleIgnoreAll}>
                        Ignore All
                      </Button>
                      <Button variant="ghost" size="sm" className="rounded-lg" onClick={() => setShowCustomize(true)}>
                        <Settings size={13} className="mr-1" /> Customize
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-sm font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">
                    Cookie Preferences
                  </h3>
                  <button onClick={() => setShowCustomize(false)} className="text-neutral-400 hover:text-neutral-800 dark:hover:text-white cursor-pointer">
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-3 mb-5">
                  {[
                    { key: 'necessary' as const, label: 'Necessary', desc: 'Essential for the website to function. Cannot be disabled.', disabled: true },
                    { key: 'analytics' as const, label: 'Analytics', desc: 'Help us understand how visitors interact with our website.' },
                    { key: 'marketing' as const, label: 'Marketing', desc: 'Used to deliver personalized advertisements.' },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                      <div className="flex-1 mr-3">
                        <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">{item.label}</p>
                        <p className="text-[10px] text-neutral-500 dark:text-neutral-400">{item.desc}</p>
                      </div>
                      <button
                        disabled={item.disabled}
                        onClick={() => !item.disabled && setPreferences(p => ({ ...p, [item.key]: !p[item.key] }))}
                        className={`relative w-10 h-6 rounded-full transition-colors flex-shrink-0 ${
                          preferences[item.key] ? 'bg-accent-blue' : 'bg-neutral-300 dark:bg-neutral-600'
                        } ${item.disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          preferences[item.key] ? 'translate-x-4' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button variant="primary" size="sm" className="rounded-lg" onClick={() => save(preferences)}>
                    Save Preferences
                  </Button>
                  <Button variant="ghost" size="sm" className="rounded-lg" onClick={handleAcceptAll}>
                    Accept All
                  </Button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
