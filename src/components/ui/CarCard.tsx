import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Disc, Zap, Flame, User, Star } from 'lucide-react';
import { useStore } from '../../store/useStore';
import type { Car } from '../../store/useStore';
import { Button } from './Button';

interface CarCardProps { car: Car }

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const { wishlist, toggleWishlist } = useStore();
  const isWishlisted = wishlist.includes(car.id);

  return (
    <div className="group relative bg-white border border-neutral-200/60 shadow-sm flex flex-col h-full overflow-hidden text-left transition-all duration-500 rounded-2xl hover:shadow-xl hover:shadow-neutral-900/5 hover:border-accent-blue/20 hover:-translate-y-1">
      {/* Image */}
      <div className="w-full h-48 overflow-hidden bg-neutral-100 relative">
        <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="font-display text-[9px] font-bold uppercase tracking-widest text-white bg-accent-blue/80 backdrop-blur-sm px-2.5 py-1 rounded-full">{car.category}</span>
          {car.fuel === 'Electric' && (
            <span className="font-display text-[9px] font-bold uppercase tracking-widest text-white bg-accent-amber/80 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1">
              <Zap size={10} /> EV
            </span>
          )}
        </div>
        <button onClick={(e) => { e.preventDefault(); toggleWishlist(car.id); }}
          className="absolute top-3 right-3 z-10 p-2 bg-black/20 backdrop-blur-sm text-white/70 hover:text-red-400 hover:bg-black/40 transition-all duration-300 rounded-full cursor-pointer">
          <Heart size={15} className={`transition-all duration-300 ${isWishlisted ? 'fill-red-400 text-red-400 scale-110' : ''}`} />
        </button>
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          <span className="text-white text-xs font-bold">{car.rating.toFixed(1)}</span>
          <span className="text-white/60 text-[10px]">({car.reviewsCount})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col gap-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] text-neutral-400 font-display uppercase tracking-widest">{car.brand}</span>
            <span className="w-1 h-1 rounded-full bg-neutral-300" />
            <span className="text-[10px] text-neutral-400 font-display uppercase tracking-widest">{car.location}</span>
          </div>
          <h3 className="text-base font-bold text-neutral-900 group-hover:text-accent-blue transition-colors">{car.name}</h3>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-2 bg-neutral-50 rounded-xl p-3">
          {[
            { icon: car.fuel === 'Electric' ? Zap : Flame, label: car.fuel === 'Electric' ? 'Electric' : car.fuel === 'Petrol' ? 'Petrol' : car.fuel },
            { icon: Disc, label: car.transmission === 'Automatic' ? 'Auto' : 'Manual' },
            { icon: User, label: `${car.seats} seats` },
          ].map((f, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <f.icon size={13} className={car.fuel === 'Electric' ? 'text-accent-amber' : 'text-neutral-400'} />
              <span className="text-[10px] text-neutral-500 font-medium">{f.label}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1 mt-auto">
          <div>
            <span className="text-neutral-400 text-[9px] font-display uppercase tracking-widest block">Daily Rate</span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-xl font-bold text-neutral-900 group-hover:text-accent-blue transition-colors">৳{car.price}</span>
              <span className="text-[10px] text-neutral-400">/ day</span>
            </div>
          </div>
          <Link to={`/cars/${car.id}`}>
            <Button variant="primary" size="sm" className="rounded-xl shadow-lg shadow-accent-blue/15 group-hover:shadow-accent-blue/25">Rent Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
