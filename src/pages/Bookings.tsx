import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, User, Mail, Phone, Check, Upload, FileText } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { calculateBookingCost, formatPrice } from '../lib/pricing';

const steps = [
  { num: 1, label: 'Review' },
  { num: 2, label: 'Your Info' },
  { num: 3, label: 'Payment' },
  { num: 4, label: 'Confirmation' },
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface PassengerErrors {
  name?: string;
  email?: string;
  phone?: string;
  nid?: string;
}

export const Bookings: React.FC = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { cars, addBooking, user } = useStore();
  const car = cars.find(c => c.id === carId);

  const [step, setStep] = useState(1);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [nidFile, setNidFile] = useState<File | null>(null);
  const [nidPreview, setNidPreview] = useState('');
  const [pickup] = useState(new Date().toISOString().split('T')[0]);
  const [returnD] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [errors, setErrors] = useState<PassengerErrors>({});
  const [touched, setTouched] = useState(false);

  const handleNidUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setErrors(p => ({ ...p, nid: 'File must be under 5MB' })); return; }
    setNidFile(file);
    setNidPreview(URL.createObjectURL(file));
    setErrors(p => ({ ...p, nid: undefined }));
  };

  const validatePassengerInfo = (): PassengerErrors => {
    const errs: PassengerErrors = {};
    if (name.trim().length < 2) errs.name = 'Name must be at least 2 characters';
    if (!emailRegex.test(email)) errs.email = 'Please enter a valid email';
    if (phone.trim().length < 8) errs.phone = 'Phone must be at least 8 characters';
    if (!nidFile) errs.nid = 'NID upload is required for verification';
    return errs;
  };

  const goToStep3 = () => {
    setTouched(true);
    const errs = validatePassengerInfo();
    setErrors(errs);
    if (Object.keys(errs).length === 0) setStep(3);
  };

  if (!car) {
    return (
      <div className="pt-28 pb-20 text-center min-h-screen flex flex-col items-center justify-center">
        <p className="text-neutral-500 dark:text-neutral-400 mb-4">Vehicle not found</p>
        <Button variant="outline" onClick={() => navigate('/cars')}>Back to Fleet</Button>
      </div>
    );
  }

  const days = Math.max(1, Math.ceil((new Date(returnD).getTime() - new Date(pickup).getTime()) / 86400000));
  const { subtotal, tripFee, tax, total } = calculateBookingCost(car.price, days);

  const handleConfirm = () => {
    if (!user) { navigate('/auth'); return; }
    addBooking({
      carId: car.id, userId: user.id,
      pickupDate: pickup, returnDate: returnD,
      totalDays: days, totalPrice: total, status: 'Upcoming',
      driverInfo: { fullName: name, email, phone, licenseNumber: 'N/A - Company Driver', licenseExpiry: '' },
    });
    setStep(4);
  };

  return (
    <div className="pt-28 pb-20 bg-light-bg dark:bg-neutral-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'Our Cars', href: '/cars' },
          { label: car.name, href: `/cars/${car.id}` },
          { label: 'My Booking' },
        ]} />

        <div className="flex items-center justify-center gap-0 mb-10">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-display transition-colors ${step >= s.num ? 'bg-accent-blue text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500'}`}>{step > s.num ? <Check size={14} /> : s.num}</div>
              {i < steps.length - 1 && <div className={`w-12 h-[1.5px] ${step > s.num ? 'bg-accent-blue' : 'bg-neutral-200 dark:bg-neutral-700'}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 shadow-sm p-6 rounded-xl">
                <h3 className="font-display text-sm font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-4">Review Your Booking</h3>
                <div className="flex gap-4 mb-5 pb-4 border-b border-neutral-100 dark:border-neutral-800">
                  <img src={car.image} alt={car.name} className="w-20 h-14 object-cover rounded-lg bg-neutral-100 dark:bg-neutral-800" />
                  <div>
                    <p className="font-display text-xs text-accent-blue uppercase tracking-wider font-bold">{car.brand}</p>
                    <h4 className="font-display text-base font-bold text-neutral-800 dark:text-neutral-200">{car.name}</h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{car.location}</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-neutral-500 dark:text-neutral-400">Pickup</span><span className="font-semibold text-neutral-800 dark:text-neutral-200">{pickup}</span></div>
                  <div className="flex justify-between"><span className="text-neutral-500 dark:text-neutral-400">Return</span><span className="font-semibold text-neutral-800 dark:text-neutral-200">{returnD}</span></div>
                  <div className="flex justify-between"><span className="text-neutral-500 dark:text-neutral-400">Duration</span><span className="font-semibold text-neutral-800 dark:text-neutral-200">{days} day{days > 1 ? 's' : ''}</span></div>
                  <div className="flex justify-between"><span className="text-neutral-500 dark:text-neutral-400">Daily Rate</span><span className="font-semibold text-neutral-800 dark:text-neutral-200">{formatPrice(car.price)}</span></div>
                </div>
                <Button variant="primary" className="w-full mt-6 rounded-lg" onClick={() => setStep(2)}>Continue</Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 shadow-sm p-6 rounded-xl">
                <h3 className="font-display text-sm font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-2">Passenger Information</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-5">Our professional driver will handle the ride. Just provide your details.</p>
                <div className="space-y-4">
                  {[
                    { key: 'name', icon: User, label: 'Full Name', value: name, set: setName, type: 'text', ph: 'Your name' },
                    { key: 'email', icon: Mail, label: 'Email', value: email, set: setEmail, type: 'email', ph: 'your@email.com' },
                    { key: 'phone', icon: Phone, label: 'Phone', value: phone, set: setPhone, type: 'tel', ph: '+880 1XXX XXXXXX' },
                  ].map((f) => {
                    const fieldKey = f.key as keyof PassengerErrors;
                    return (
                      <div key={f.key}>
                        <label className="text-[10px] text-neutral-400 dark:text-neutral-500 font-display uppercase tracking-widest mb-1.5 block">{f.label}</label>
                        <div className="flex items-center border border-neutral-200 dark:border-neutral-700 p-3 bg-white dark:bg-neutral-800 rounded-lg">
                          <f.icon size={15} className="text-neutral-400 dark:text-neutral-500 mr-2 shrink-0" />
                          <input type={f.type} placeholder={f.ph} value={f.value} onChange={(e) => { f.set(e.target.value); if (touched) setErrors(validatePassengerInfo()); }}
                            className="bg-transparent text-sm text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-600 outline-none w-full font-sans" />
                        </div>
                        {errors[fieldKey] && <p className="text-[10px] text-red-500 mt-1">{errors[fieldKey]}</p>}
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="ghost" onClick={() => setStep(1)} className="rounded-lg">Back</Button>
                  <Button variant="primary" className="flex-1 rounded-lg" onClick={goToStep3}>Continue</Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 shadow-sm p-6 rounded-xl">
                <h3 className="font-display text-sm font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-5">Payment</h3>
                <div className="space-y-4">
                  <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800 flex items-center gap-3">
                    <CreditCard size={20} className="text-neutral-400 dark:text-neutral-500" />
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">Pay on pickup — no card details needed</span>
                  </div>
                  {[
                    { label: 'Passenger', value: name },
                    { label: 'Email', value: email },
                    { label: 'Vehicle', value: `${car.brand} ${car.name}` },
                    { label: 'Duration', value: `${days} day${days > 1 ? 's' : ''}` },
                  ].map((f) => (
                    <div key={f.label} className="flex justify-between text-sm">
                      <span className="text-neutral-500 dark:text-neutral-400">{f.label}</span>
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200">{f.value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="ghost" onClick={() => setStep(2)} className="rounded-lg">Back</Button>
                  <Button variant="primary" className="flex-1 rounded-lg" onClick={handleConfirm}>
                    Confirm — {formatPrice(total)}
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 shadow-sm p-8 rounded-xl text-center">
                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={28} className="text-green-600" />
                </div>
                <h3 className="font-display text-lg font-bold text-neutral-800 dark:text-neutral-200 mb-2">Booking Confirmed!</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Your {car.name} has been reserved.</p>
                <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-6">Pickup: {pickup} · Return: {returnD}</p>
                <Button variant="primary" onClick={() => navigate('/dashboard?tab=bookings')} className="rounded-lg">View My Bookings</Button>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 shadow-sm p-5 rounded-xl sticky top-28">
              <h4 className="font-display text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-3">Price Summary</h4>
              <div className="flex gap-3 mb-4 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <img src={car.image} alt={car.name} className="w-14 h-10 object-cover rounded bg-neutral-100 dark:bg-neutral-800" />
                <div>
                  <p className="font-display text-xs font-bold text-neutral-800 dark:text-neutral-200">{car.name}</p>
                  <p className="text-[10px] text-neutral-500 dark:text-neutral-400">{car.brand}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-neutral-500 dark:text-neutral-400">
                  <span>{formatPrice(car.price)} × {days} day{days > 1 ? 's' : ''}</span>
                  <span className="text-neutral-800 dark:text-neutral-200 font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-neutral-500 dark:text-neutral-400"><span>Trip fee</span><span className="text-neutral-800 dark:text-neutral-200 font-semibold">{formatPrice(tripFee)}</span></div>
                <div className="flex justify-between text-neutral-500 dark:text-neutral-400"><span>Tax</span><span className="text-neutral-800 dark:text-neutral-200 font-semibold">{formatPrice(tax)}</span></div>
                <div className="border-t border-neutral-100 dark:border-neutral-800 pt-2 flex justify-between font-display text-sm font-bold text-neutral-900 dark:text-neutral-100"><span>Total</span><span>{formatPrice(total)}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
