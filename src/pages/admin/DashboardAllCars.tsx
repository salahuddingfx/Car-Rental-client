import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';

export const DashboardAllCars = () => {
  const { cars } = useStore();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl">
      <h3 className="font-display text-xs font-bold text-neutral-800 uppercase tracking-widest border-b border-neutral-100 pb-3 mb-4">All Cars ({cars.length})</h3>
      <div className="space-y-2">
        {cars.map(car => (
          <div key={car.id} className="flex items-center justify-between p-3 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-14 h-11 bg-neutral-100 rounded-lg overflow-hidden shrink-0">
                <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-800">{car.name}</p>
                <p className="text-[10px] text-neutral-500">{car.brand} · {car.category} · ৳{car.price}/d</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-neutral-400">Host: {car.hostName}</span>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${car.isAvailable ? 'bg-green-50 text-green-600' : 'bg-neutral-100 text-neutral-500'}`}>{car.isAvailable ? 'Active' : 'Inactive'}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
