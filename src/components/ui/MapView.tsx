import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Star, X, Zap } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { formatPrice } from '../../lib/pricing';

interface MapViewProps {
  search: string;
  category: string;
  fuel: string;
  sort: string;
  priceRange: number;
}

const locationCoords: Record<string, { x: number; y: number }> = {
  'Gulshan, Dhaka': { x: 52, y: 55 },
  'Banani, Dhaka': { x: 54, y: 53 },
  'Uttara, Dhaka': { x: 50, y: 48 },
  'Dhanmondi, Dhaka': { x: 49, y: 57 },
  'Chattogram City': { x: 62, y: 72 },
  'Sylhet': { x: 68, y: 30 },
  'Cox\'s Bazar': { x: 70, y: 85 },
};

export const MapView: React.FC<MapViewProps> = ({ search, category, fuel, sort, priceRange }) => {
  const { cars } = useStore();
  const [selectedCar, setSelectedCar] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = [...cars];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(c => c.name.toLowerCase().includes(q) || c.brand.toLowerCase().includes(q) || c.location.toLowerCase().includes(q));
    }
    if (category !== 'All') result = result.filter(c => c.category === category);
    if (fuel !== 'All') result = result.filter(c => c.fuel === fuel);
    result = result.filter(c => c.price <= priceRange);
    result.sort((a, b) => {
      switch (sort) {
        case 'Price: Low': return a.price - b.price;
        case 'Price: High': return b.price - a.price;
        case 'Rating': return b.rating - a.rating;
        case 'Name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });
    return result;
  }, [cars, search, category, fuel, sort, priceRange]);

  const selected = selectedCar ? cars.find(c => c.id === selectedCar) : null;

  return (
    <div className="relative w-full h-[500px] bg-neutral-100 dark:bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-200/60 dark:border-neutral-700/60">
      {/* Map background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 dark:from-neutral-800 dark:via-neutral-750 dark:to-neutral-800">
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-neutral-400" />
        </svg>
        {/* Fake roads */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeWidth="2" className="text-neutral-300 dark:text-neutral-600" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="currentColor" strokeWidth="2" className="text-neutral-300 dark:text-neutral-600" />
          <line x1="10%" y1="20%" x2="80%" y2="80%" stroke="currentColor" strokeWidth="1" className="text-neutral-300 dark:text-neutral-600" />
          <line x1="20%" y1="70%" x2="90%" y2="30%" stroke="currentColor" strokeWidth="1" className="text-neutral-300 dark:text-neutral-600" />
        </svg>
      </div>

      {/* Car pins */}
      {filtered.map((car) => {
        const coords = locationCoords[car.location] || { x: 50, y: 50 };
        const isActive = selectedCar === car.id;
        return (
          <motion.button
            key={car.id}
            onClick={() => setSelectedCar(isActive ? null : car.id)}
            initial={{ scale: 0 }}
            animate={{ scale: 1, x: '-50%', y: '-100%' }}
            className={`absolute z-10 cursor-pointer transition-all ${isActive ? 'z-20' : 'hover:z-20'}`}
            style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
          >
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full shadow-lg transition-all ${isActive ? 'bg-accent-blue text-white scale-110' : 'bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:scale-105'}`}>
              <MapPin size={12} />
              <span className="text-[10px] font-bold whitespace-nowrap">{formatPrice(car.price)}</span>
            </div>
            <div className={`absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] ${isActive ? 'border-t-accent-blue' : 'border-t-white dark:border-t-neutral-900'}`} />
          </motion.button>
        );
      })}

      {/* Car popup */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden z-30"
          >
            <button onClick={() => setSelectedCar(null)}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center text-neutral-500 hover:text-neutral-800 dark:hover:text-white cursor-pointer z-10">
              <X size={12} />
            </button>
            <div className="h-32 bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
              <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <p className="text-[9px] text-accent-blue font-display font-bold uppercase tracking-widest">{selected.brand}</p>
              <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 mb-1">{selected.name}</h3>
              <div className="flex items-center gap-3 text-[10px] text-neutral-500 dark:text-neutral-400 mb-3">
                <span className="flex items-center gap-1"><Star size={10} className="text-accent-amber fill-accent-amber" /> {selected.rating.toFixed(1)}</span>
                <span className="flex items-center gap-1"><MapPin size={10} /> {selected.location}</span>
                {selected.fuel === 'Electric' && <span className="flex items-center gap-1"><Zap size={10} className="text-accent-amber" /> EV</span>}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-neutral-900 dark:text-neutral-100 font-display">{formatPrice(selected.price)}<span className="text-[10px] text-neutral-500 font-sans font-normal">/day</span></span>
                <Link to={`/cars/${selected.id}`}
                  className="text-xs font-bold text-accent-blue hover:text-accent-blue-hover transition-colors">View Details</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm rounded-2xl p-6">
            <MapPin size={24} className="text-neutral-400 mx-auto mb-2" />
            <p className="text-sm text-neutral-500 dark:text-neutral-400">No cars in this area</p>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute top-3 left-3 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-sm">
        <p className="text-[10px] font-display font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-widest">
          {filtered.length} car{filtered.length !== 1 ? 's' : ''} on map
        </p>
      </div>
    </div>
  );
};
