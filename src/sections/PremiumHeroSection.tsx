import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const slides = [
  {
    img: '/luxury_car.png',
    alt: 'Luxury Car',
    title: 'Luxury Sedan',
    subtitle: 'Experience unparalleled comfort and prestige',
  },
  {
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070',
    alt: 'Sports Car',
    title: 'Sports Coupe',
    subtitle: 'Feel the adrenaline of raw performance',
  },
  {
    img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=2070',
    alt: 'Supercar',
    title: 'Exotic Supercar',
    subtitle: 'Turn heads with uncompromising style',
  },
  {
    img: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=2070',
    alt: 'Electric Car',
    title: 'Electric Performance',
    subtitle: 'Zero emissions, infinite thrill',
  },
];

export const PremiumHeroSection: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState<boolean[]>(slides.map(() => false));
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
        if (p >= 100) {
          next();
          return 0;
        }
        return p + 0.5;
      });
    }, 50);
    timerRef.current = interval;
    return () => clearInterval(interval);
  }, [next, isPaused]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-neutral-950">
      {slides.map((slide, i) => (
        <div key={i} className={`absolute inset-0 transition-all duration-1000 ease-in-out ${i === current ? 'opacity-100' : 'opacity-0'}`}>
          <div className={`absolute inset-0 transition-all duration-[1.5s] ease-out ${i === current ? 'scale-100' : 'scale-110'}`}>
            <img
              src={slide.img}
              alt={slide.alt}
              onLoad={() => setLoaded(p => { const n = [...p]; n[i] = true; return n; })}
              className={`w-full h-full object-cover transition-opacity duration-700 ${loaded[i] ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/30 to-neutral-950/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/40 via-transparent to-transparent" />

          {/* Slide content */}
          <div className={`absolute bottom-20 left-6 sm:left-12 lg:left-16 max-w-xl transition-all duration-700 delay-300 ${i === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-block text-[10px] tracking-[0.3em] uppercase text-white/50 font-display font-bold mb-3 border-l-2 border-accent-blue pl-3">{slide.title}</span>
            <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed">{slide.subtitle}</p>
          </div>
        </div>
      ))}

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-20 h-[3px] bg-white/5">
        <div className="h-full bg-gradient-to-r from-accent-blue to-blue-400 transition-all duration-[50ms] ease-linear rounded-r-full" style={{ width: `${progress}%` }} />
      </div>

      {/* Arrows - Right side bottom */}
      <div className="absolute right-4 sm:right-8 bottom-6 z-20 flex items-center gap-2">
        <button onClick={prev} className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/25 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg">
          <ChevronLeft size={18} />
        </button>
        <button onClick={next} className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/25 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg">
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-500 cursor-pointer ${i === current ? 'w-10 h-2 bg-white shadow-lg shadow-white/20' : 'w-2 h-2 bg-white/30 hover:bg-white/50'}`} />
        ))}
      </div>

      {/* Counter top right */}
      <div className="absolute top-6 right-6 sm:right-8 z-20 text-white/30 font-display text-xs tracking-widest">
        <span className="text-white/70 font-bold">{String(current + 1).padStart(2, '0')}</span> / {String(slides.length).padStart(2, '0')}
      </div>

      {/* Pause - center bottom above dots */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20">
        <button onClick={() => setIsPaused(p => !p)}
          className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/25 hover:scale-105 active:scale-95 transition-all cursor-pointer mx-auto shadow-lg">
          {isPaused ? <Play size={14} /> : <Pause size={14} />}
        </button>
      </div>
    </section>
  );
};
