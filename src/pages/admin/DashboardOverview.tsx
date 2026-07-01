import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { Car, DollarSign, Calendar, CreditCard, Clock, Heart, Users, Star } from 'lucide-react';

export const DashboardOverview = () => {
  const { user, bookings, wishlist, cars } = useStore();
  const userRole = user?.role || 'user';

  const userBookings = bookings.filter(b => b.userId === user?.id);
  const totalSpend = userBookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const rentingDays = userBookings.reduce((sum, b) => sum + b.totalDays, 0);

  const hostCars = cars.filter(c => c.hostName === user?.name);
  const hostEarnings = bookings.filter(b => hostCars.some(c => c.id === b.carId)).reduce((sum, b) => sum + b.totalPrice, 0);

  const allBookings = bookings;
  const totalRevenue = allBookings.reduce((sum, b) => sum + b.totalPrice, 0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {userRole === 'host' ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Listed Cars', value: `${hostCars.length}`, icon: Car, color: 'text-accent-blue' },
              { label: 'Total Earnings', value: `৳${hostEarnings}`, icon: DollarSign, color: 'text-accent-amber' },
              { label: 'Active Bookings', value: `${bookings.filter(b => hostCars.some(c => c.id === b.carId) && (b.status === 'Upcoming' || b.status === 'Active')).length}`, icon: Calendar, color: 'text-green-500' },
            ].map((s) => (
              <div key={s.label} className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl relative overflow-hidden">
                <p className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1">{s.label}</p>
                <span className="text-xl font-bold text-neutral-900 font-display">{s.value}</span>
                <s.icon size={32} className={`absolute right-4 bottom-3 opacity-10 ${s.color}`} />
              </div>
            ))}
          </div>
          {hostCars.length > 0 && (
            <div className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl">
              <h3 className="font-display text-xs font-bold text-neutral-800 uppercase tracking-widest mb-4">Your Cars</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {hostCars.slice(0, 4).map(car => (
                  <div key={car.id} className="flex items-center gap-3 p-3 border border-neutral-200 rounded-xl hover:border-accent-blue/20 transition-colors">
                    <div className="w-16 h-12 bg-neutral-100 rounded-lg overflow-hidden shrink-0">
                      <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-neutral-800 truncate">{car.name}</p>
                      <p className="text-[10px] text-neutral-500">৳{car.price}/d · {car.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : userRole === 'company' ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total Cars', value: `${cars.length}`, icon: Car, color: 'text-accent-blue' },
              { label: 'Total Users', value: '1,247', icon: Users, color: 'text-accent-amber' },
              { label: 'Total Revenue', value: `৳${totalRevenue}`, icon: DollarSign, color: 'text-green-500' },
              { label: 'Avg Rating', value: '4.9', icon: Star, color: 'text-purple-500' },
            ].map((s) => (
              <div key={s.label} className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl relative overflow-hidden">
                <p className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1">{s.label}</p>
                <span className="text-xl font-bold text-neutral-900 font-display">{s.value}</span>
                <s.icon size={32} className={`absolute right-4 bottom-3 opacity-10 ${s.color}`} />
              </div>
            ))}
          </div>
          <div className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl">
            <h3 className="font-display text-xs font-bold text-neutral-800 uppercase tracking-widest mb-4">Recent Platform Activity</h3>
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
                    <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full ${b.status === 'Upcoming' ? 'bg-accent-blue/10 text-accent-blue' : b.status === 'Completed' ? 'bg-green-50 text-green-600' : 'bg-neutral-100 text-neutral-500'}`}>{b.status}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Total Spent', value: `৳${totalSpend}`, icon: CreditCard, color: 'text-accent-blue' },
              { label: 'Rental Days', value: `${rentingDays} Days`, icon: Clock, color: 'text-accent-amber' },
              { label: 'Wishlist', value: `${wishlist.length} Cars`, icon: Heart, color: 'text-red-500' },
            ].map((s) => (
              <div key={s.label} className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl relative overflow-hidden">
                <p className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1">{s.label}</p>
                <span className="text-xl font-bold text-neutral-900 font-display">{s.value}</span>
                <s.icon size={32} className={`absolute right-4 bottom-3 opacity-10 ${s.color}`} />
              </div>
            ))}
          </div>
          {userBookings.length > 0 && (
            <div className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl">
              <h3 className="font-display text-xs font-bold text-neutral-800 uppercase tracking-widest mb-4">Recent Bookings</h3>
              <div className="space-y-3">
                {userBookings.slice(0, 3).map(booking => {
                  const car = cars.find(c => c.id === booking.carId);
                  return (
                    <div key={booking.id} className="flex items-center justify-between p-3 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <Car size={16} className="text-neutral-400" />
                        <div>
                          <p className="text-sm font-semibold text-neutral-800">{car?.name || 'Unknown'}</p>
                          <p className="text-[10px] text-neutral-500">{booking.pickupDate} → {booking.returnDate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-neutral-800">৳{booking.totalPrice}</p>
                        <span className={`text-[10px] font-medium ${booking.status === 'Upcoming' ? 'text-accent-blue' : booking.status === 'Completed' ? 'text-green-600' : 'text-neutral-400'}`}>{booking.status}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};
