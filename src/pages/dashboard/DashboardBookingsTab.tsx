import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { Car } from 'lucide-react';

export const DashboardBookingsTab = () => {
  const { user, bookings, cars } = useStore();
  const userRole = user?.role || 'user';

  const userBookings = bookings.filter(b => b.userId === user?.id);
  const hostCars = cars.filter(c => c.hostName === user?.name);
  const hostBookings = bookings.filter(b => hostCars.some(c => c.id === b.carId));
  const displayBookings = userRole === 'host' ? hostBookings : userBookings;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl">
      <h3 className="font-display text-xs font-bold text-neutral-800 uppercase tracking-widest border-b border-neutral-100 pb-3 mb-4">
        {userRole === 'host' ? 'Booking Requests' : 'All Bookings'}
      </h3>
      {displayBookings.length > 0 ? (
        <div className="space-y-3">
          {displayBookings.map(booking => {
            const car = cars.find(c => c.id === booking.carId);
            return (
              <div key={booking.id} className="flex items-center justify-between p-3 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-11 bg-neutral-100 rounded-lg overflow-hidden shrink-0">
                    {car && <img src={car.image} alt={car.name} className="w-full h-full object-cover" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-neutral-800">{car?.name || 'Unknown'}</p>
                    <p className="text-[10px] text-neutral-500">{booking.pickupDate} to {booking.returnDate} · {booking.totalDays} days</p>
                    {userRole === 'host' && <p className="text-[9px] text-neutral-400 mt-0.5">Renter: {booking.driverInfo.fullName}</p>}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-neutral-800">৳{booking.totalPrice}</p>
                  <span className={`text-[10px] font-medium ${booking.status === 'Upcoming' ? 'text-accent-blue' : booking.status === 'Completed' ? 'text-green-600' : booking.status === 'Active' ? 'text-accent-amber' : 'text-neutral-400'}`}>{booking.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-neutral-500 text-center py-12">No bookings yet.</p>
      )}
    </motion.div>
  );
};
