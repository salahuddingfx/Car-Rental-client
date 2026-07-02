import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, Plus, Check, Zap, Disc, Users, Star, MapPin } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { useStore } from '../store/useStore';
import { useToastStore } from '../store/useToastStore';
import { formatPrice } from '../lib/pricing';
import type { Car } from '../data/mockCars';

export const CarComparison: React.FC = () => {
  const { cars } = useStore();
  const { addToast } = useToastStore();
  const [selected, setSelected] = useState<string[]>([]);

  const maxCompare = 3;

  const toggle = (carId: string) => {
    if (selected.includes(carId)) {
      setSelected(prev => prev.filter(id => id !== carId));
    } else if (selected.length >= maxCompare) {
      addToast(`Maximum ${maxCompare} cars for comparison`, 'error');
      return;
    } else {
      setSelected(prev => [...prev, carId]);
    }
  };

  const compared = selected.map(id => cars.find(c => c.id === id)).filter(Boolean) as Car[];

  return (
    <div className="pt-24 pb-20 bg-light-bg dark:bg-neutral-950 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[{ label: 'Our Cars', href: '/cars' }, { label: 'Compare Cars' }]} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="font-display text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-2">Compare Cars</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Select up to {maxCompare} cars to compare side by side</p>
        </motion.div>

        {/* Car Selector */}
        {compared.length < maxCompare && (
          <div className="mb-8">
            <h3 className="font-display text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-3">Select Cars to Compare ({selected.length}/{maxCompare})</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {cars.map(car => {
                const isSelected = selected.includes(car.id);
                return (
                  <button key={car.id} onClick={() => toggle(car.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                      isSelected ? 'border-accent-blue bg-accent-blue/5' : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300'
                    }`}>
                    <img src={car.image} alt={car.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200 truncate">{car.name}</p>
                      <p className="text-[10px] text-neutral-500 dark:text-neutral-400">{car.brand}</p>
                    </div>
                    <div className={`ml-auto w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${isSelected ? 'bg-accent-blue text-white' : 'border border-neutral-300 dark:border-neutral-600'}`}>
                      {isSelected && <Check size={12} />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Comparison Table */}
        {compared.length >= 2 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm">
            <div className={`grid gap-0`} style={{ gridTemplateColumns: `200px repeat(${compared.length}, 1fr)` }}>
              {/* Header row */}
              <div className="p-4 bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700" />
              {compared.map(car => (
                <div key={car.id} className="p-4 border-b border-neutral-200 dark:border-neutral-700 text-center relative">
                  <button onClick={() => toggle(car.id)}
                    className="absolute top-2 right-2 w-5 h-5 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center text-neutral-400 hover:text-red-500 cursor-pointer">
                    <X size={10} />
                  </button>
                  <img src={car.image} alt={car.name} className="w-full h-28 object-cover rounded-lg mb-3" />
                  <p className="text-[10px] text-accent-blue font-display font-bold uppercase tracking-widest">{car.brand}</p>
                  <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200">{car.name}</p>
                </div>
              ))}

              {/* Spec rows */}
              {[
                { label: 'Price / Day', render: (c: Car) => <span className="font-bold text-neutral-900 dark:text-neutral-100">{formatPrice(c.price)}</span> },
                { label: 'Category', render: (c: Car) => c.category },
                { label: 'Rating', render: (c: Car) => <span className="flex items-center gap-1 justify-center"><Star size={12} className="text-accent-amber fill-accent-amber" /> {c.rating.toFixed(2)} ({c.reviewsCount})</span> },
                { label: 'Fuel', render: (c: Car) => <span className="flex items-center gap-1 justify-center">{c.fuel === 'Electric' ? <Zap size={12} className="text-accent-amber" /> : null} {c.fuel}</span> },
                { label: 'Transmission', render: (c: Car) => <span className="flex items-center gap-1 justify-center"><Disc size={12} /> {c.transmission}</span> },
                { label: 'Seats', render: (c: Car) => <span className="flex items-center gap-1 justify-center"><Users size={12} /> {c.seats}</span> },
                { label: 'Power', render: (c: Car) => c.power },
                { label: '0-60 mph', render: (c: Car) => c.speed },
                { label: 'Location', render: (c: Car) => <span className="flex items-center gap-1 justify-center"><MapPin size={12} /> {c.location}</span> },
                { label: '', render: (c: Car) => <Link to={`/cars/${c.id}`}><Button variant="primary" size="sm" className="rounded-lg text-[10px]">View Details</Button></Link> },
              ].map((row, i) => (
                <React.Fragment key={row.label || 'cta'}>
                  <div className={`p-3 flex items-center text-[10px] font-display font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 ${i % 2 === 0 ? 'bg-white dark:bg-neutral-900' : 'bg-neutral-50 dark:bg-neutral-800'} border-b border-neutral-100 dark:border-neutral-800`}>
                    {row.label}
                  </div>
                  {compared.map(car => (
                    <div key={car.id + row.label}
                      className={`p-3 text-center text-xs text-neutral-700 dark:text-neutral-300 flex items-center justify-center ${i % 2 === 0 ? 'bg-white dark:bg-neutral-900' : 'bg-neutral-50 dark:bg-neutral-800'} border-b border-neutral-100 dark:border-neutral-800`}>
                      {row.render(car)}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        ) : compared.length === 1 ? (
          <div className="text-center py-12 bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-2xl">
            <Plus size={32} className="text-neutral-300 dark:text-neutral-600 mx-auto mb-3" />
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Select at least 2 cars to compare</p>
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-2xl">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Select cars above to start comparing</p>
          </div>
        )}
      </div>
    </div>
  );
};
