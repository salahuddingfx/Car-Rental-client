import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const letters = 'APEX RIDE'.split('');

export function IntroLoader() {
  const [phase, setPhase] = useState<'enter' | 'exit' | 'gone'>('enter');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('exit'), 2800);
    const t2 = setTimeout(() => setPhase('gone'), 3400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === 'gone') return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Animated gradient background */}
        <motion.div
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950"
          style={{ backgroundSize: '200% 200%' }}
        />

        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_70%)]" />

        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * -400 - 100],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeOut',
            }}
            className="absolute w-0.5 h-0.5 rounded-full bg-accent-amber/40"
          />
        ))}

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={phase === 'enter' ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 1.05, y: -20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative text-center"
        >
          {/* Logo icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
            className="w-20 h-20 rounded-3xl bg-gradient-to-br from-accent-amber via-accent-amber to-amber-600 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-accent-amber/30 relative"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-3xl border border-white/20"
            />
            <span className="text-white font-display text-3xl font-black tracking-tighter">A</span>
          </motion.div>

          {/* Letter-by-letter title */}
          <div className="flex items-center justify-center gap-0.5 mb-3">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30, rotateX: 90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-5xl font-black text-white tracking-wider inline-block"
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-neutral-400 text-xs tracking-[0.35em] font-display uppercase"
          >
            Premium Car Rental
          </motion.p>

          {/* Loading bar */}
          <div className="mt-10 w-48 h-0.5 bg-white/5 rounded-full mx-auto overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-full bg-gradient-to-r from-accent-amber via-amber-400 to-accent-amber rounded-full relative"
            >
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear', delay: 0.5 }}
                className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Cinematic exit lines */}
        <AnimatePresence>
          {phase === 'exit' && (
            <>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-0 left-0 right-0 h-px bg-accent-amber/40 origin-left"
              />
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-0 left-0 right-0 h-px bg-accent-amber/40 origin-right"
              />
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 top-0 bottom-0 w-px bg-accent-amber/40 origin-top"
              />
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-0 top-0 bottom-0 w-px bg-accent-amber/40 origin-bottom"
              />
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
