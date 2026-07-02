import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Check, Car, User, Phone, Mail, AlertTriangle, X, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { formatPrice } from '../lib/pricing';

const statusSteps = [
  { key: 'Booked', label: 'Booked', icon: Check, desc: 'Your reservation is confirmed' },
  { key: 'Confirmed', label: 'Confirmed', icon: Car, desc: 'Host accepted your booking' },
  { key: 'Driver Assigned', label: 'Driver Assigned', icon: User, desc: 'A professional driver has been assigned' },
  { key: 'In Progress', label: 'In Progress', icon: MapPin, desc: 'Your ride is active' },
  { key: 'Completed', label: 'Completed', icon: Star, desc: 'Trip finished successfully' },
];

export const BookingTracker: React.FC = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { bookings, guestBookings, cars, cancelBooking } = useStore();

  const allBookings = [...bookings, ...guestBookings];
  const booking = allBookings.find(b => b.id === bookingId);

  if (!booking) {
    return (
      <div className="pt-28 pb-20 text-center min-h-screen bg-light-bg dark:bg-neutral-950">
        <p className="text-neutral-500 dark:text-neutral-400 mb-4">Booking not found</p>
        <Button variant="outline" onClick={() => navigate('/dashboard?tab=bookings')}>Back to Bookings</Button>
      </div>
    );
  }

  const car = cars.find(c => c.id === booking.carId);

  const currentStepIndex = statusSteps.findIndex(s => s.key === booking.status);
  const isCancelled = booking.status === 'Cancelled';

  return (
    <div className="pt-24 pb-20 bg-light-bg dark:bg-neutral-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'My Dashboard', href: '/dashboard' },
          { label: 'My Booking', href: '/dashboard?tab=bookings' },
          { label: `Booking #${booking.id.slice(-6).toUpperCase()}` },
        ]} />

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="font-display text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">Booking Details</h1>
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full font-display ${
              isCancelled ? 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800' :
              booking.status === 'Completed' ? 'bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800' :
              'bg-accent-blue/10 text-accent-blue border border-accent-blue/20'
            }`}>
              {booking.status}
            </span>
          </div>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 font-mono">ID: {booking.id}</p>
        </motion.div>

        {/* Status Timeline */}
        {!isCancelled && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 shadow-sm p-6 rounded-2xl mb-6">
            <h3 className="font-display text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest mb-5">Booking Status</h3>
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute top-5 left-0 right-0 h-[2px] bg-neutral-100 dark:bg-neutral-800" />
              <div className="absolute top-5 left-0 h-[2px] bg-accent-blue transition-all duration-500"
                style={{ width: `${currentStepIndex >= 0 ? (currentStepIndex / (statusSteps.length - 1)) * 100 : 0}%` }} />

              <div className="relative flex justify-between">
                {statusSteps.map((step, i) => {
                  const done = i <= currentStepIndex;
                  const active = i === currentStepIndex;
                  const StepIcon = step.icon;
                  return (
                    <div key={step.key} className="flex flex-col items-center text-center flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        active ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/30 scale-110' :
                        done ? 'bg-accent-blue text-white' :
                        'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500'
                      }`}>
                        <StepIcon size={16} />
                      </div>
                      <p className={`mt-2 text-[10px] font-display font-bold uppercase tracking-wider ${
                        active ? 'text-accent-blue' : done ? 'text-neutral-700 dark:text-neutral-300' : 'text-neutral-400 dark:text-neutral-500'
                      }`}>{step.label}</p>
                      <p className={`text-[9px] mt-0.5 ${active ? 'text-neutral-500 dark:text-neutral-400' : 'text-neutral-300 dark:text-neutral-600'}`}>{step.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {isCancelled && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/50 p-5 rounded-2xl mb-6 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
              <X size={18} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-red-700 dark:text-red-400">Booking Cancelled</p>
              <p className="text-xs text-red-500/80 dark:text-red-400/60">This booking has been cancelled. No charges applied.</p>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: Car + Details */}
          <div className="lg:col-span-3 space-y-5">
            {/* Car Card */}
            {car && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 shadow-sm rounded-2xl overflow-hidden">
                <div className="h-44 bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                  <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <p className="font-display text-[10px] text-accent-blue uppercase tracking-widest font-bold mb-0.5">{car.brand}</p>
                  <h3 className="font-display text-lg font-extrabold text-neutral-900 dark:text-neutral-100">{car.name}</h3>
                  <div className="flex items-center gap-3 mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-accent-amber fill-accent-amber" />
                      <span className="font-bold">{car.rating.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={12} />
                      <span>{car.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Trip Timeline */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 shadow-sm p-5 rounded-2xl">
              <h3 className="font-display text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest mb-4">Trip Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                  <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-display uppercase tracking-widest mb-1">Pickup</p>
                  <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200">{booking.pickupDate}</p>
                </div>
                <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                  <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-display uppercase tracking-widest mb-1">Return</p>
                  <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200">{booking.returnDate}</p>
                </div>
                <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                  <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-display uppercase tracking-widest mb-1">Duration</p>
                  <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200">{booking.totalDays} day{booking.totalDays > 1 ? 's' : ''}</p>
                </div>
                <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                  <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-display uppercase tracking-widest mb-1">Total Paid</p>
                  <p className="text-sm font-bold text-accent-blue">{formatPrice(booking.totalPrice)}</p>
                </div>
              </div>
            </motion.div>

            {/* Driver Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 shadow-sm p-5 rounded-2xl">
              <h3 className="font-display text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest mb-4">Your Driver</h3>
              <div className="flex items-center gap-4 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-accent-blue/10 flex items-center justify-center">
                  <User size={20} className="text-accent-blue" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200">{booking.driverInfo.fullName}</p>
                  <p className="text-[10px] text-neutral-400 dark:text-neutral-500">Company Driver</p>
                </div>
              </div>
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                  <Phone size={13} className="text-neutral-400 dark:text-neutral-500" />
                  <span>{booking.driverInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                  <Mail size={13} className="text-neutral-400 dark:text-neutral-500" />
                  <span>{booking.driverInfo.email}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Summary + Actions */}
          <div className="lg:col-span-2 space-y-5">
            {/* Price Summary */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 shadow-sm p-5 rounded-2xl sticky top-28">
              <h3 className="font-display text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest mb-4">Price Summary</h3>
              {car && (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-neutral-500 dark:text-neutral-400">
                    <span>{formatPrice(car.price)} × {booking.totalDays} days</span>
                    <span className="text-neutral-800 dark:text-neutral-200 font-semibold">{formatPrice(car.price * booking.totalDays)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-500 dark:text-neutral-400">
                    <span>Trip fee</span>
                    <span className="text-neutral-800 dark:text-neutral-200 font-semibold">{formatPrice(Math.round(car.price * booking.totalDays * 0.1))}</span>
                  </div>
                  <div className="flex justify-between text-neutral-500 dark:text-neutral-400">
                    <span>Tax</span>
                    <span className="text-neutral-800 dark:text-neutral-200 font-semibold">{formatPrice(Math.round(car.price * booking.totalDays * 0.05))}</span>
                  </div>
                  <div className="border-t border-neutral-100 dark:border-neutral-800 pt-2 flex justify-between font-display text-sm font-bold text-neutral-900 dark:text-neutral-100">
                    <span>Total</span>
                    <span>{formatPrice(booking.totalPrice)}</span>
                  </div>
                </div>
              )}

              <div className="mt-5 space-y-2">
                {booking.status === 'Upcoming' && (
                  <>
                    <Button variant="outline" className="w-full rounded-xl text-sm" onClick={() => navigate('/damage-report')}>
                      <AlertTriangle size={14} className="mr-1.5" /> Report an Issue
                    </Button>
                    <button onClick={() => cancelBooking(booking.id)}
                      className="w-full py-2.5 text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-bold transition-colors cursor-pointer">
                      Cancel Booking
                    </button>
                  </>
                )}
                {booking.status === 'Active' && (
                  <Button variant="outline" className="w-full rounded-xl text-sm" onClick={() => navigate('/damage-report')}>
                    <AlertTriangle size={14} className="mr-1.5" /> Report Damage
                  </Button>
                )}
                {booking.status === 'Completed' && (
                  <Button variant="primary" className="w-full rounded-xl text-sm" onClick={() => navigate('/reviews')}>
                    Leave a Review
                  </Button>
                )}
                <Button variant="ghost" className="w-full rounded-xl text-xs" onClick={() => navigate('/dashboard?tab=bookings')}>
                  <ChevronRight size={14} className="mr-1 rotate-180" /> All Bookings
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
