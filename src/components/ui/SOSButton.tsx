import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, Shield, AlertTriangle } from 'lucide-react';

export const SOSButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-16 left-0 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl rounded-2xl p-5 w-72 mb-2"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-sm font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">Emergency SOS</h3>
              <button onClick={() => setOpen(false)} className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 cursor-pointer">
                <X size={16} />
              </button>
            </div>

            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-xl p-3 mb-4">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle size={14} className="text-red-500" />
                <span className="text-xs font-bold text-red-600 dark:text-red-400">Need immediate help?</span>
              </div>
              <p className="text-[10px] text-red-500/70 dark:text-red-400/70 leading-relaxed">
                Call emergency services or our 24/7 support line. We'll dispatch help to your location immediately.
              </p>
            </div>

            <div className="space-y-2">
              <a href="tel:999" className="flex items-center gap-3 w-full p-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors cursor-pointer">
                <Phone size={16} />
                <div>
                  <p className="text-xs font-bold">Emergency: 999</p>
                  <p className="text-[10px] opacity-75">Police / Fire / Ambulance</p>
                </div>
              </a>
              <a href="tel:+8801700000000" className="flex items-center gap-3 w-full p-3 bg-accent-blue hover:bg-blue-600 text-white rounded-xl transition-colors cursor-pointer">
                <Shield size={16} />
                <div>
                  <p className="text-xs font-bold">Apex Ride Support</p>
                  <p className="text-[10px] opacity-75">24/7 roadside assistance</p>
                </div>
              </a>
            </div>

            <p className="text-[9px] text-neutral-400 dark:text-neutral-500 text-center mt-3">
              Your location will be shared with emergency services
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center cursor-pointer transition-colors ${
          open ? 'bg-neutral-800 text-white' : 'bg-red-500 text-white hover:bg-red-600'
        }`}
      >
        {open ? <X size={20} /> : <Phone size={20} />}
      </motion.button>
    </div>
  );
};
