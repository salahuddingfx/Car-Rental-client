import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, MapPin, Calendar, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    img: '/luxury_car.png',
    alt: 'Luxury Car',
    tagline: 'BANGLADESH\'S PREMIER LUXURY CAR RENTAL',
    title: 'Experience Bangladesh\nIn Pure Luxury',
    subtitle: 'Premium car rental across Dhaka, Chattogram, Sylhet & Cox\'s Bazar. Chauffeur-driven or self-drive.',
    cta: 'Book Now',
  },
  {
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070',
    alt: 'Sports Car',
    tagline: 'RAW PERFORMANCE UNLEASHED',
    title: 'Feel The Adrenaline\nOf Pure Speed',
    subtitle: 'From sports coupés to exotic supercars — machines built for those who demand the finest.',
    cta: 'Explore Fleet',
  },
  {
    img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=2070',
    alt: 'Supercar',
    tagline: 'TURN HEADS EVERYWHERE',
    title: 'Uncompromising\nStyle & Power',
    subtitle: 'Arrive in style with our curated collection of exotic supercars and luxury tourers.',
    cta: 'View Supercars',
  },
  {
    img: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=2070',
    alt: 'Electric Car',
    tagline: 'THE FUTURE IS ELECTRIC',
    title: 'Zero Emissions\nInfinite Thrill',
    subtitle: 'Tesla, BYD and more. Silent acceleration, cutting-edge tech, zero compromise.',
    cta: 'Go Electric',
  },
];

const stats = [
  { value: '120+', label: 'Cars Available' },
  { value: '6', label: 'Cities Covered' },
  { value: '2,400+', label: 'Happy Clients' },
  { value: '4.9', label: 'Avg. Rating' },
];

export const PremiumHeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState<boolean[]>(slides.map(() => false));
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [searchLoc, setSearchLoc] = useState('');
  const [searchPickup, setSearchPickup] = useState('');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slide = slides[current];

  const next = useCallback(() => {
    setCurrent(p => (p + 1) % slides.length);
    setProgress(0);
  }, []);

  const prev = useCallback(() => {
    setCurrent(p => (p - 1 + slides.length) % slides.length);
    setProgress(0);
  }, []);

  const goTo = useCallback((i: number) => {
    setCurrent(i);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { next(); return 0; }
        return p + 0.5;
      });
    }, 50);
    timerRef.current = interval;
    return () => clearInterval(interval);
  }, [next, isPaused]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchLoc) params.set('search', searchLoc);
    navigate(`/cars?${params.toString()}`);
  };

  const handleCta = () => {
    if (current === 0) navigate('/cars');
    else if (current === 3) navigate('/cars?category=Electric');
    else if (current === 2) navigate('/cars?category=Supercar');
    else navigate('/cars');
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-neutral-950">
      {/* Slides with Ken Burns */}
      {slides.map((s, i) => (
        <div key={s.alt} className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <div className={`absolute inset-0 transition-transform duration-[2s] ease-out ${i === current ? 'scale-100' : 'scale-110'}`}>
            <img
              src={s.img}
              alt={s.alt}
              onLoad={() => setLoaded(p => { const n = [...p]; n[i] = true; return n; })}
              className={`w-full h-full object-cover transition-opacity duration-700 ${loaded[i] ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
          {/* Dual gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-neutral-950/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/60 via-transparent to-transparent" />
        </div>
      ))}

      {/* Animated content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-12 lg:px-16"
        >
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-2xl">
              {/* Tagline */}
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-block text-[10px] sm:text-[11px] tracking-[0.3em] text-accent-blue font-display font-bold mb-4 border-l-2 border-accent-blue pl-3"
              >
                {slide.tagline}
              </motion.span>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-5 whitespace-pre-line"
              >
                {slide.title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-white/60 text-sm sm:text-base max-w-lg leading-relaxed mb-8"
              >
                {slide.subtitle}
              </motion.p>

              {/* Search form + CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <form onSubmit={handleSearch} className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex flex-col sm:flex-row gap-3 mb-6 max-w-xl">
                  <div className="flex-1 flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2.5">
                    <MapPin size={16} className="text-white/40 shrink-0" />
                    <input type="text" placeholder="Where are you going?" value={searchLoc} onChange={e => setSearchLoc(e.target.value)}
                      className="bg-transparent text-white text-sm outline-none w-full placeholder:text-white/30" />
                  </div>
                  <div className="flex-1 flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2.5">
                    <Calendar size={16} className="text-white/40 shrink-0" />
                    <input type="date" value={searchPickup} onChange={e => setSearchPickup(e.target.value)}
                      className="bg-transparent text-white text-sm outline-none w-full [color-scheme:dark]" />
                  </div>
                  <button type="submit" className="bg-accent-blue hover:bg-blue-600 text-white text-sm font-bold px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0">
                    <Search size={16} /> Search
                  </button>
                </form>

                <button onClick={handleCta}
                  className="bg-white text-neutral-900 text-sm font-bold px-8 py-3 rounded-xl hover:bg-neutral-100 transition-colors cursor-pointer">
                  {slide.cta}
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-0 left-0 right-0 z-20 bg-white/5 backdrop-blur-sm border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-white font-display text-lg sm:text-xl font-bold">{s.value}</p>
              <p className="text-white/40 text-[10px] sm:text-xs uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-30 h-[3px] bg-white/5">
        <div className="h-full bg-gradient-to-r from-accent-blue to-blue-400 transition-all duration-[50ms] ease-linear rounded-r-full" style={{ width: `${progress}%` }} />
      </div>

      {/* Counter */}
      <div className="absolute top-6 right-6 sm:right-8 z-30 text-white/30 font-display text-xs tracking-widest">
        <span className="text-white/70 font-bold">{String(current + 1).padStart(2, '0')}</span> / {String(slides.length).padStart(2, '0')}
      </div>

      {/* Arrows + Pause */}
      <div className="absolute right-4 sm:right-8 bottom-24 z-30 flex items-center gap-2">
        <button onClick={prev} className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/25 hover:scale-105 active:scale-95 transition-all cursor-pointer">
          <ChevronLeft size={16} />
        </button>
        <button onClick={next} className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/25 hover:scale-105 active:scale-95 transition-all cursor-pointer">
          <ChevronRight size={16} />
        </button>
        <button onClick={() => setIsPaused(p => !p)}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/25 hover:scale-105 active:scale-95 transition-all cursor-pointer ml-1">
          {isPaused ? <Play size={14} /> : <Pause size={14} />}
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
        {slides.map((s, i) => (
          <button key={s.title} onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-500 cursor-pointer ${i === current ? 'w-10 h-2 bg-white shadow-lg shadow-white/20' : 'w-2 h-2 bg-white/30 hover:bg-white/50'}`} />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-28 left-6 sm:left-12 z-30 hidden sm:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-white/30 font-display uppercase tracking-widest" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-[1.5px] h-8 bg-accent-blue/40 rounded-full" />
      </motion.div>
    </section>
  );
};
