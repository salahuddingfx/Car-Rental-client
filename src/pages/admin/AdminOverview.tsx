import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { Car, DollarSign, Users, Star, Calendar, TrendingUp } from 'lucide-react';

export const AdminOverview = () => {
  const { cars, bookings, guestBookings } = useStore();

  const allBookings = [...bookings, ...guestBookings];
  const totalRevenue = allBookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const totalUsers = 1247;
  const activeBookings = allBookings.filter(b => b.status === 'Upcoming' || b.status === 'Active').length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-extrabold text-neutral-900 tracking-tight">Admin Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">Full platform management overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Cars', value: `${cars.length}`, icon: Car, color: 'text-accent-blue', bg: 'bg-accent-blue/10' },
          { label: 'Total Users', value: `${totalUsers}`, icon: Users, color: 'text-accent-amber', bg: 'bg-accent-amber/10' },
          { label: 'Total Revenue', value: `৳${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Active Bookings', value: `${activeBookings}`, icon: Calendar, color: 'text-purple-500', bg: 'bg-purple-50' },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl relative overflow-hidden">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
              <s.icon size={20} className={s.color} />
            </div>
            <p className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1">{s.label}</p>
            <span className="text-xl font-bold text-neutral-900 font-display">{s.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl">
          <h3 className="font-display text-xs font-bold text-neutral-800 uppercase tracking-widest mb-4 flex items-center gap-2">
            <TrendingUp size={14} className="text-accent-blue" /> Recent Bookings
          </h3>
          <div className="space-y-2">
            {allBookings.slice(0, 5).map(b => {
              const car = cars.find(c => c.id === b.carId);
              return (
                <div key={b.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Car size={16} className="text-neutral-400" />
                    <div>
                      <p className="text-xs font-semibold text-neutral-800">{car?.name || 'Unknown'} — {b.driverInfo.fullName}</p>
                      <p className="text-[10px] text-neutral-500">{b.pickupDate} → {b.returnDate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full ${b.status === 'Upcoming' ? 'bg-accent-blue/10 text-accent-blue' : b.status === 'Completed' ? 'bg-green-50 text-green-600' : 'bg-neutral-100 text-neutral-500'}`}>{b.status}</span>
                  </div>
                </div>
              );
            })}
            {allBookings.length === 0 && <p className="text-neutral-400 text-xs text-center py-4">No bookings yet</p>}
          </div>
        </div>

        <div className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl">
          <h3 className="font-display text-xs font-bold text-neutral-800 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Star size={14} className="text-accent-amber" /> Top Rated Cars
          </h3>
          <div className="space-y-2">
            {cars.sort((a, b) => b.rating - a.rating).slice(0, 5).map(car => (
              <div key={car.id} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl">
                <div className="w-14 h-10 bg-neutral-200 rounded-lg overflow-hidden shrink-0">
                  <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-neutral-800 truncate">{car.name}</p>
                  <p className="text-[10px] text-neutral-500">{car.brand} · {car.category}</p>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <Star size={11} className="text-accent-amber fill-accent-amber" />
                  <span className="font-bold text-neutral-800">{car.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
