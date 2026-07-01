import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, CreditCard, Calendar, Shield, Check } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useToastStore } from '../store/useToastStore';
import { Button } from '../components/ui/Button';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { calculateBookingCost, formatPrice } from '../lib/pricing';

export const GuestBooking = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { cars, addGuestBooking } = useStore();
  const { addToast } = useToastStore();
  const car = cars.find(c => c.id === carId);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    licenseExpiry: '',
    pickupDate: '',
    returnDate: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!car) {
    return (
      <div className="pt-28 pb-20 text-center min-h-screen">
        <p className="text-neutral-500 dark:text-neutral-400 mb-4">Vehicle not found</p>
        <Button variant="outline" onClick={() => navigate('/cars')}>Back to Cars</Button>
      </div>
    );
  }

  const days = form.pickupDate && form.returnDate
    ? Math.max(1, Math.ceil((new Date(form.returnDate).getTime() - new Date(form.pickupDate).getTime()) / (1000 * 60 * 60 * 24)))
    : 0;

  const pricing = days > 0 ? calculateBookingCost(car.price, days) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.phone || !form.pickupDate || !form.returnDate) return;

    addGuestBooking({
      carId: car.id,
      pickupDate: form.pickupDate,
      returnDate: form.returnDate,
      totalDays: days,
      totalPrice: pricing?.total || 0,
      status: 'Upcoming',
      driverInfo: {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        licenseNumber: form.licenseNumber || 'N/A',
        licenseExpiry: form.licenseExpiry || 'N/A',
      },
    });

    addToast('Booking confirmed! Check your email for details.', 'success');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-28 pb-20 text-center min-h-screen bg-light-bg dark:bg-neutral-950">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto px-6">
          <div className="w-16 h-16 rounded-2xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
            <Check size={28} className="text-green-600" />
          </div>
          <h2 className="font-display text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-2">Booking Confirmed!</h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-6">Your reservation for the {car.name} has been placed. We'll send details to {form.email}.</p>
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 mb-6 text-left">
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-1">Booking Reference</p>
            <p className="font-display font-bold text-neutral-800 dark:text-neutral-200">GUEST-{Date.now().toString(36).toUpperCase()}</p>
          </div>
          <Button variant="primary" className="rounded-xl" onClick={() => navigate('/cars')}>Browse More Cars</Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-light-bg dark:bg-neutral-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'Our Cars', href: '/cars' },
          { label: car.name, href: `/cars/${car.id}` },
          { label: 'Guest Booking' },
        ]} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="font-display text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-1">Guest Booking</h1>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">No account needed — just fill in your details and go.</p>

              <form onSubmit={handleSubmit} className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 shadow-sm p-6 rounded-2xl space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-neutral-400 dark:text-neutral-500 font-display uppercase tracking-widest mb-1.5 block">Full Name *</label>
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
                      <input required value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })}
                        placeholder="e.g. Rahim Uddin"
                        className="w-full border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-800 dark:text-neutral-200 p-2.5 pl-9 rounded-xl outline-none focus:border-accent-blue transition-colors placeholder:text-neutral-300 dark:placeholder:text-neutral-600 bg-white dark:bg-neutral-800" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 dark:text-neutral-500 font-display uppercase tracking-widest mb-1.5 block">Email *</label>
                    <div className="relative">
                      <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
                      <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="e.g. rahim@gmail.com"
                        className="w-full border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-800 dark:text-neutral-200 p-2.5 pl-9 rounded-xl outline-none focus:border-accent-blue transition-colors placeholder:text-neutral-300 dark:placeholder:text-neutral-600 bg-white dark:bg-neutral-800" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-neutral-400 dark:text-neutral-500 font-display uppercase tracking-widest mb-1.5 block">Phone *</label>
                    <div className="relative">
                      <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
                      <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                        placeholder="e.g. +880 1700-000000"
                        className="w-full border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-800 dark:text-neutral-200 p-2.5 pl-9 rounded-xl outline-none focus:border-accent-blue transition-colors placeholder:text-neutral-300 dark:placeholder:text-neutral-600 bg-white dark:bg-neutral-800" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 dark:text-neutral-500 font-display uppercase tracking-widest mb-1.5 block">License Number</label>
                    <div className="relative">
                      <CreditCard size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
                      <input value={form.licenseNumber} onChange={e => setForm({ ...form, licenseNumber: e.target.value })}
                        placeholder="Optional"
                        className="w-full border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-800 dark:text-neutral-200 p-2.5 pl-9 rounded-xl outline-none focus:border-accent-blue transition-colors placeholder:text-neutral-300 dark:placeholder:text-neutral-600 bg-white dark:bg-neutral-800" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-neutral-400 dark:text-neutral-500 font-display uppercase tracking-widest mb-1.5 block">Pickup Date *</label>
                    <div className="relative">
                      <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
                      <input required type="date" value={form.pickupDate} onChange={e => setForm({ ...form, pickupDate: e.target.value })}
                        className="w-full border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-800 dark:text-neutral-200 p-2.5 pl-9 rounded-xl outline-none focus:border-accent-blue transition-colors bg-white dark:bg-neutral-800" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 dark:text-neutral-500 font-display uppercase tracking-widest mb-1.5 block">Return Date *</label>
                    <div className="relative">
                      <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
                      <input required type="date" value={form.returnDate} onChange={e => setForm({ ...form, returnDate: e.target.value })}
                        min={form.pickupDate}
                        className="w-full border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-800 dark:text-neutral-200 p-2.5 pl-9 rounded-xl outline-none focus:border-accent-blue transition-colors bg-white dark:bg-neutral-800" />
                    </div>
                  </div>
                </div>

                <Button type="submit" variant="primary" className="w-full rounded-xl" disabled={days <= 0}>
                  <Shield size={14} className="mr-1.5" /> Confirm Guest Booking
                </Button>
                <p className="text-[10px] text-neutral-400 dark:text-neutral-500 text-center">No account required. Confirmation will be sent to your email.</p>
              </form>
            </motion.div>
          </div>

          {/* Sidebar - Car & Price */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 shadow-sm p-5 rounded-2xl sticky top-28">
              <div className="h-36 bg-neutral-100 dark:bg-neutral-800 rounded-xl overflow-hidden mb-4">
                <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-[10px] text-accent-blue font-display uppercase tracking-widest font-bold mb-0.5">{car.brand}</p>
              <h3 className="font-display text-sm font-bold text-neutral-800 dark:text-neutral-200 mb-3">{car.name}</h3>

              {pricing && (
                <div className="border-t border-neutral-100 dark:border-neutral-800 pt-3 space-y-2 text-sm">
                  <div className="flex justify-between text-neutral-500 dark:text-neutral-400"><span>{days} days × {formatPrice(car.price)}</span><span className="text-neutral-800 dark:text-neutral-200 font-semibold">{formatPrice(pricing.subtotal)}</span></div>
                  <div className="flex justify-between text-neutral-500 dark:text-neutral-400"><span>Trip fee</span><span className="text-neutral-800 dark:text-neutral-200 font-semibold">{formatPrice(pricing.tripFee)}</span></div>
                  <div className="flex justify-between text-neutral-500 dark:text-neutral-400"><span>Tax</span><span className="text-neutral-800 dark:text-neutral-200 font-semibold">{formatPrice(pricing.tax)}</span></div>
                  <div className="border-t border-neutral-100 dark:border-neutral-800 pt-2 flex justify-between font-display text-sm font-bold text-neutral-900 dark:text-neutral-100"><span>Total</span><span>{formatPrice(pricing.total)}</span></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
