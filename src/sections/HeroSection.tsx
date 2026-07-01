import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Search, Volume2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface Props {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  carRef: React.RefObject<HTMLDivElement | null>;
  carInnerRef: React.RefObject<HTMLDivElement | null>;
  heroRef: React.RefObject<HTMLDivElement | null>;
  searchLoc: string;
  setSearchLoc: (v: string) => void;
  searchPickup: string;
  setSearchPickup: (v: string) => void;
  searchReturn: string;
  setSearchReturn: (v: string) => void;
  onSearch: (e: React.FormEvent) => void;
  onHorn: () => void;
}

const cities = ['Gulshan, Dhaka', 'Uttara, Dhaka', 'Banani, Dhaka', 'Sylhet', 'Chattogram', "Cox's Bazar", 'Gazipur', 'Khulna'];

export const HeroSection: React.FC<Props> = ({
  scrollRef, carRef, carInnerRef, heroRef,
  searchLoc, setSearchLoc, searchPickup, setSearchPickup, searchReturn, setSearchReturn,
  onSearch, onHorn,
}) => {
  const navigate = useNavigate();

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center px-6 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-50/30 via-light-bg to-light-bg" />

      <div ref={carRef}
        className="absolute right-0 top-[55%] -translate-y-1/2 z-10 pointer-events-none hidden md:block select-none"
        style={{ width: 'min(52vw, 640px)', transformOrigin: 'center center' }}
        onClick={onHorn}
      >
        <div ref={carInnerRef} className="relative w-full aspect-[2.6/1] cursor-pointer pointer-events-auto" title="Honk!">
          <img src="/luxury_car.png" alt="Luxury Car" className="car-img w-full object-contain drop-shadow-[0_24px_64px_rgba(0,0,0,0.1)]" />
          <div className="headlight-glow absolute left-[6.5%] top-[48%] w-[28px] h-[10px] rounded-full opacity-0" style={{
            background: '#93c5fd', filter: 'blur(4px)',
            animation: 'headlight-pulse 1.5s ease-in-out infinite',
          }} />
          <div className="signal-light absolute left-[15%] top-[25%] w-[10px] h-[6px] rounded-sm opacity-0" style={{
            background: '#f97316', animation: 'signal-blink 0.8s ease-in-out infinite',
            boxShadow: '0 0 6px 2px rgba(249, 115, 22, 0.6)',
          }} />
          <div className="signal-light absolute left-[82%] top-[25%] w-[10px] h-[6px] rounded-sm opacity-0" style={{
            background: '#f97316', animation: 'signal-blink 0.8s ease-in-out infinite 0.4s',
            boxShadow: '0 0 6px 2px rgba(249, 115, 22, 0.6)',
          }} />
          <img src="/luxury_wheel.png" alt="Front Wheel" className="car-img car-wheel absolute left-[21.6%] bottom-[12.4%] w-[15.1%] aspect-square object-contain" />
          <img src="/luxury_wheel.png" alt="Rear Wheel" className="car-img car-wheel absolute left-[77.5%] bottom-[12.4%] w-[15.1%] aspect-square object-contain" />
          <div className="absolute -bottom-8 left-[10%] right-[10%] h-6 rounded-full bg-black/5 blur-xl" />
        </div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto w-full">
        <div ref={scrollRef} className="max-w-xl">
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-5">
            <span className="font-display text-[10px] tracking-[0.25em] text-accent-blue uppercase font-bold bg-blue-50/80 px-4 py-2 inline-block rounded-lg border border-blue-100/50">
              BANGLADESH'S PREMIER LUXURY CAR RENTAL
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="hero-text-large font-display font-extrabold tracking-tight mb-4"
          >
            <span className="block text-neutral-900 dark:text-neutral-100 mb-1">Experience Bangladesh</span>
            <span className="block text-accent-blue">In Pure Luxury</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
            className="text-neutral-500 max-w-lg text-base leading-relaxed mb-8"
          >
            Premium car rental across Dhaka, Chattogram, Sylhet & Cox's Bazar. Chauffeur-driven or self-drive — reserved for those who demand the finest.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="max-w-xl mb-10">
            <form onSubmit={onSearch} className="bg-white/90 border border-neutral-200/60 shadow-sm p-5 rounded-xl space-y-4 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1">
                  <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest block mb-1.5">Location</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input type="text" placeholder="e.g. Gulshan, Dhaka" value={searchLoc}
                      onChange={(e) => setSearchLoc(e.target.value)} list="cities"
                      className="w-full bg-white border border-neutral-200 text-neutral-800 text-sm pl-9 pr-3 py-2.5 outline-none focus:border-accent-blue rounded-lg transition-colors placeholder:text-neutral-400" />
                    <datalist id="cities">{cities.map(c => <option key={c} value={c} />)}</datalist>
                  </div>
                </div>
                <div className="w-full md:w-auto md:min-w-[130px]">
                  <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest block mb-1.5">Pickup</label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input type="date" value={searchPickup} onChange={(e) => setSearchPickup(e.target.value)}
                      className="w-full bg-white border border-neutral-200 text-neutral-800 text-sm pl-9 pr-3 py-2.5 outline-none focus:border-accent-blue rounded-lg transition-colors" />
                  </div>
                </div>
                <div className="w-full md:w-auto md:min-w-[130px]">
                  <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest block mb-1.5">Return</label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input type="date" value={searchReturn} onChange={(e) => setSearchReturn(e.target.value)}
                      className="w-full bg-white border border-neutral-200 text-neutral-800 text-sm pl-9 pr-3 py-2.5 outline-none focus:border-accent-blue rounded-lg transition-colors" />
                  </div>
                </div>
              </div>
              <Button type="submit" variant="primary" size="md" className="w-full md:w-auto rounded-lg">
                <Search size={15} /> Search Fleet
              </Button>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
            className="flex flex-col sm:flex-row items-center justify-start gap-4"
          >
            <Button variant="primary" magnetic onClick={() => navigate('/cars')} size="lg" className="rounded-lg px-10">Book Now</Button>
            <Button variant="outline" onClick={() => document.getElementById('featured-cars')?.scrollIntoView({ behavior: 'smooth' })} size="lg" className="rounded-lg">Explore Fleet</Button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="mt-5 flex flex-wrap items-center gap-3 text-[11px] text-neutral-400"
          >
            {['Dhaka', 'Chattogram', 'Sylhet', "Cox's Bazar"].map(c => (
              <span key={c} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> {c}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.button onClick={onHorn}
        className="absolute bottom-8 right-8 z-20 w-11 h-11 bg-white/80 border border-neutral-200 rounded-full flex items-center justify-center text-neutral-400 hover:text-accent-blue hover:border-accent-blue/30 transition-all shadow-sm cursor-pointer"
        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.5 }}
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} title="Honk!"
      ><Volume2 size={17} /></motion.button>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="font-display text-[10px] uppercase tracking-widest font-semibold text-neutral-400">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-[1.5px] h-10 bg-accent-blue/30 rounded-full" />
      </motion.div>
    </section>
  );
};
