import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function IntroLoader() {
  const [phase, setPhase] = useState<'enter' | 'exit' | 'gone'>('enter');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('exit'), 1800);
    const t2 = setTimeout(() => setPhase('gone'), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === 'gone') return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-light-bg"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={phase === 'enter' ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: phase === 'enter' ? 1 : 0, ease: 'linear' }}
            className="w-16 h-16 rounded-2xl bg-accent-blue flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent-blue/20"
          >
            <span className="text-white font-display text-2xl font-black">A</span>
          </motion.div>
          <h1 className="font-display text-4xl font-extrabold text-neutral-900 tracking-tight">Apex Ride</h1>
          <p className="text-neutral-400 text-sm mt-2 tracking-wider font-display uppercase">Premium Car Rental</p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="h-0.5 bg-accent-blue/30 rounded-full mt-6 mx-auto overflow-hidden"
          >
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              className="h-full w-1/2 bg-accent-blue rounded-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
