import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { Car, Star, MapPin, Trash2, Eye, EyeOff } from 'lucide-react';

export const AdminCars = () => {
  const { cars, editCar, deleteCar } = useStore();
  const [filter, setFilter] = useState('all');

  const filteredCars = filter === 'all' ? cars : cars.filter(c => c.category === filter);

  const toggleAvailability = (carId: string, current: boolean) => {
    editCar(carId, { isAvailable: !current });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-neutral-900 tracking-tight">All Cars</h1>
          <p className="text-sm text-neutral-500 mt-1">{cars.length} vehicles in the platform</p>
        </div>
        <div className="flex gap-2">
          {['all', 'Sports', 'Luxury', 'Supercar', 'SUV', 'Electric'].map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 text-[10px] font-display font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${filter === cat ? 'bg-accent-blue text-white' : 'bg-white border border-neutral-200 text-neutral-600 hover:border-accent-blue/30'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border border-neutral-200/60 shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-100">
                <th className="text-left text-[10px] font-display font-bold text-neutral-400 uppercase tracking-widest px-5 py-3">Car</th>
                <th className="text-left text-[10px] font-display font-bold text-neutral-400 uppercase tracking-widest px-5 py-3">Category</th>
                <th className="text-left text-[10px] font-display font-bold text-neutral-400 uppercase tracking-widest px-5 py-3">Location</th>
                <th className="text-left text-[10px] font-display font-bold text-neutral-400 uppercase tracking-widest px-5 py-3">Price</th>
                <th className="text-left text-[10px] font-display font-bold text-neutral-400 uppercase tracking-widest px-5 py-3">Rating</th>
                <th className="text-left text-[10px] font-display font-bold text-neutral-400 uppercase tracking-widest px-5 py-3">Status</th>
                <th className="text-right text-[10px] font-display font-bold text-neutral-400 uppercase tracking-widest px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCars.map(car => (
                <tr key={car.id} className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-11 bg-neutral-100 rounded-lg overflow-hidden shrink-0">
                        <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-neutral-800">{car.name}</p>
                        <p className="text-[10px] text-neutral-500">{car.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-[10px] font-display font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-accent-blue/10 text-accent-blue">{car.category}</span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1 text-xs text-neutral-600">
                      <MapPin size={12} /> {car.location}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm font-bold text-neutral-800">৳{car.price}/d</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1 text-xs">
                      <Star size={11} className="text-accent-amber fill-accent-amber" />
                      <span className="font-bold text-neutral-800">{car.rating}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <button onClick={() => toggleAvailability(car.id, car.isAvailable)}
                      className={`flex items-center gap-1.5 text-[10px] font-medium px-2.5 py-1 rounded-full cursor-pointer ${car.isAvailable ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                      {car.isAvailable ? <><Eye size={11} /> Active</> : <><EyeOff size={11} /> Hidden</>}
                    </button>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => deleteCar(car.id)}
                      className="p-1.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
