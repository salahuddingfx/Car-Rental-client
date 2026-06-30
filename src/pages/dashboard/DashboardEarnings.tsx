import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { DollarSign, Star, BarChart3, Car } from 'lucide-react';

export const DashboardEarnings = () => {
  const { user, bookings, cars } = useStore();
  const hostCars = cars.filter(c => c.hostName === user?.name);
  const hostBookings = bookings.filter(b => hostCars.some(c => c.id === b.carId));
  const hostEarnings = hostBookings.reduce((sum, b) => sum + b.totalPrice, 0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Earnings', value: `৳${hostEarnings}`, icon: DollarSign, color: 'text-accent-amber' },
          { label: 'Completed Trips', value: `${hostBookings.filter(b => b.status === 'Completed').length}`, icon: Star, color: 'text-green-500' },
          { label: 'Avg. Per Rental', value: hostBookings.length > 0 ? `৳${Math.round(hostEarnings / hostBookings.length)}` : '৳0', icon: BarChart3, color: 'text-accent-blue' },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl relative overflow-hidden">
            <p className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1">{s.label}</p>
            <span className="text-xl font-bold text-neutral-900 font-display">{s.value}</span>
            <s.icon size={32} className={`absolute right-4 bottom-3 opacity-10 ${s.color}`} />
          </div>
        ))}
      </div>

      {hostBookings.filter(b => b.status === 'Completed').length > 0 ? (
        <div className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl">
          <h3 className="font-display text-xs font-bold text-neutral-800 uppercase tracking-widest mb-4">Earnings History</h3>
          <div className="space-y-3">
            {hostBookings.filter(b => b.status === 'Completed').map(booking => {
              const car = cars.find(c => c.id === booking.carId);
              return (
                <div key={booking.id} className="flex items-center justify-between p-3 border border-neutral-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Car size={16} className="text-neutral-400" />
                    <div>
                      <p className="text-sm font-semibold text-neutral-800">{car?.name || 'Unknown'}</p>
                      <p className="text-[10px] text-neutral-500">{booking.pickupDate} — {booking.totalDays} days</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-green-600">+৳{booking.totalPrice}</span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white border border-neutral-200/60 shadow-sm p-12 rounded-2xl text-center">
          <DollarSign size={28} className="mx-auto text-neutral-300 mb-3" />
          <p className="text-neutral-500">No earnings yet. Start listing your cars!</p>
        </div>
      )}
    </motion.div>
  );
};
