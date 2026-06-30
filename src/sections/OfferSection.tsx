import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const fmt = (s: number) => {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
};

export const OfferSection: React.FC = () => {
  const navigate = useNavigate();
  const [t, setT] = useState(86400);
  useEffect(() => { const i = setInterval(() => setT(p => p > 0 ? p - 1 : 86400), 1000); return () => clearInterval(i); }, []);

  return (
    <section className="relative py-20 border-t border-neutral-200/60 z-10 bg-amber-50/30">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row justify-between items-center gap-10">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4 max-w-xl">
          <span className="font-display text-[9px] uppercase font-bold tracking-widest text-accent-amber border border-accent-amber/30 px-2 py-0.5 bg-amber-50 rounded">Limited — Bangladesh Special</span>
          <h2 className="font-display text-3xl font-extrabold uppercase text-neutral-900 leading-tight">Cox's Bazar Road Trip Package</h2>
          <p className="text-base text-neutral-500">
            Book a luxury SUV for 3+ days and get a complimentary chauffeur, fuel coverage, and a curated Cox's Bazar itinerary. Perfect for a weekend escape from Dhaka to the world's longest sea beach.
          </p>
          <div className="pt-1">
            <span className="text-[10px] text-neutral-400 font-display uppercase tracking-widest block mb-1">OFFER EXPIRES IN</span>
            <div className="text-2xl md:text-3xl font-display font-bold text-accent-amber tracking-widest">{fmt(t)}</div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <Button variant="primary" size="lg" onClick={() => navigate('/cars/car-4')} className="rounded-lg">Book Package</Button>
        </motion.div>
      </div>
    </section>
  );
};
