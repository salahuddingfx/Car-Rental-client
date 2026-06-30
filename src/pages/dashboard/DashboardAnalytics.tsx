import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { Car, Calendar, DollarSign, Users } from 'lucide-react';

export const DashboardAnalytics = () => {
  const { cars, bookings } = useStore();
  const allBookings = bookings;
  const totalRevenue = allBookings.reduce((sum, b) => sum + b.totalPrice, 0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Cars', value: `${cars.length}`, icon: Car, color: 'text-accent-blue' },
          { label: 'Total Bookings', value: `${allBookings.length}`, icon: Calendar, color: 'text-accent-amber' },
          { label: 'Revenue', value: `৳${totalRevenue}`, icon: DollarSign, color: 'text-green-500' },
          { label: 'Hosts', value: '5', icon: Users, color: 'text-purple-500' },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl relative overflow-hidden">
            <p className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1">{s.label}</p>
            <span className="text-xl font-bold text-neutral-900 font-display">{s.value}</span>
            <s.icon size={32} className={`absolute right-4 bottom-3 opacity-10 ${s.color}`} />
          </div>
        ))}
      </div>

      <div className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl">
        <h3 className="font-display text-xs font-bold text-neutral-800 uppercase tracking-widest mb-4">Booking Status Breakdown</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Upcoming', value: allBookings.filter(b => b.status === 'Upcoming').length, color: 'bg-accent-blue', textColor: 'text-accent-blue' },
            { label: 'Active', value: allBookings.filter(b => b.status === 'Active').length, color: 'bg-accent-amber', textColor: 'text-accent-amber' },
            { label: 'Completed', value: allBookings.filter(b => b.status === 'Completed').length, color: 'bg-green-500', textColor: 'text-green-600' },
            { label: 'Cancelled', value: allBookings.filter(b => b.status === 'Cancelled').length, color: 'bg-neutral-400', textColor: 'text-neutral-500' },
          ].map(s => (
            <div key={s.label} className="p-4 bg-neutral-50 rounded-xl text-center">
              <p className={`text-2xl font-bold ${s.textColor} font-display`}>{s.value}</p>
              <p className="text-[10px] text-neutral-500 font-display uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
