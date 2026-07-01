import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { Heart } from 'lucide-react';

export const DashboardWishlist = () => {
  const navigate = useNavigate();
  const { wishlist, cars, toggleWishlist } = useStore();
  const wishlistCars = cars.filter(c => wishlist.includes(c.id));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl">
      <h3 className="font-display text-xs font-bold text-neutral-800 uppercase tracking-widest border-b border-neutral-100 pb-3 mb-4">Saved Vehicles</h3>
      {wishlistCars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {wishlistCars.map(car => (
            <div key={car.id} className="flex items-center justify-between p-3 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer" onClick={() => navigate(`/cars/${car.id}`)}>
              <div className="flex items-center gap-3">
                <div className="w-16 h-12 bg-neutral-100 rounded-lg overflow-hidden shrink-0">
                  <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-800">{car.name}</p>
                  <p className="text-[10px] text-neutral-500">{car.brand} · {car.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-neutral-800 font-display">৳{car.price}<span className="text-[10px] text-neutral-500 font-normal">/d</span></span>
                <button onClick={(e) => { e.stopPropagation(); toggleWishlist(car.id); }}
                  className="text-red-400 hover:text-red-500 transition-colors cursor-pointer p-1">
                  <Heart size={15} className="fill-red-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Heart size={24} className="mx-auto text-neutral-300 mb-3" />
          <p className="text-sm text-neutral-500">Your wishlist is empty.</p>
        </div>
      )}
    </motion.div>
  );
};
