import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, X } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { useToastStore } from '../store/useToastStore';
import { useStore } from '../store/useStore';

const damageAreas = [
  'Front Bumper', 'Rear Bumper', 'Left Side', 'Right Side',
  'Roof', 'Windshield', 'Hood', 'Trunk',
  'Left Headlight', 'Right Headlight', 'Left Mirror', 'Right Mirror',
];

export const DamageReport: React.FC = () => {
  const { bookings } = useStore();
  const { addToast } = useToastStore();
  const [selectedBooking, setSelectedBooking] = useState('');
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const activeBookings = bookings.filter(b => b.status === 'Active' || b.status === 'Upcoming');

  const toggleArea = (area: string) => {
    setSelectedAreas(prev => prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) { addToast('File too large. Max 5MB.', 'error'); return; }
      setPhotos(prev => [...prev, URL.createObjectURL(file)]);
    });
  };

  const handleSubmit = () => {
    if (!selectedBooking) { addToast('Please select a booking.', 'error'); return; }
    if (selectedAreas.length === 0) { addToast('Select damage areas.', 'error'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); addToast('Damage report submitted!', 'success'); }, 1200);
  };

  return (
    <div className="pt-24 pb-20 bg-light-bg dark:bg-neutral-950 min-h-screen">
      <div className="max-w-2xl mx-auto px-6">
        <Breadcrumbs items={[{ label: 'My Dashboard', href: '/dashboard' }, { label: 'Damage Report' }]} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={28} className="text-amber-500" />
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-2">Damage Report</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Report any pre-existing or new damage</p>
        </motion.div>

        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-2xl p-8 shadow-sm text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-950/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-green-500" />
            </div>
            <h3 className="font-display text-lg font-bold text-neutral-800 dark:text-neutral-200 mb-2">Report Submitted</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">Our team will review within 12 hours.</p>
            <Button variant="outline" className="rounded-xl" onClick={() => window.location.href = '/dashboard'}>Back to Dashboard</Button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-2xl p-5 shadow-sm">
              <h3 className="font-display text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-3">Select Booking</h3>
              {activeBookings.length === 0 ? (
                <p className="text-xs text-neutral-500 dark:text-neutral-400">No active bookings.</p>
              ) : (
                <div className="space-y-2">
                  {activeBookings.map(b => (
                    <button key={b.id} onClick={() => setSelectedBooking(b.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-colors ${selectedBooking === b.id ? 'border-accent-blue bg-accent-blue/5' : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300'}`}>
                      <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">Booking #{b.id.slice(0, 8)}</p>
                      <p className="text-[10px] text-neutral-500 dark:text-neutral-400">{b.pickupDate} to {b.returnDate}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-2xl p-5 shadow-sm">
              <h3 className="font-display text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-3">Damaged Areas</h3>
              <div className="grid grid-cols-3 gap-2">
                {damageAreas.map(area => (
                  <button key={area} onClick={() => toggleArea(area)}
                    className={`text-[10px] font-medium p-2.5 rounded-lg border transition-all ${selectedAreas.includes(area) ? 'border-red-300 bg-red-50 dark:bg-red-950/30 text-red-600' : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'}`}>
                    {area}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-2xl p-5 shadow-sm">
              <h3 className="font-display text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-3">Photos</h3>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {photos.map((p, i) => (
                  <div key={i} className="relative">
                    <img src={p} alt="" className="w-full h-20 object-cover rounded-lg border border-neutral-200 dark:border-neutral-700" />
                    <button onClick={() => setPhotos(prev => prev.filter((_, j) => j !== i))}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center cursor-pointer"><X size={10} /></button>
                  </div>
                ))}
              </div>
              <label className="flex items-center justify-center gap-2 h-20 border-2 border-dashed border-neutral-200 dark:border-neutral-700 rounded-xl cursor-pointer hover:border-accent-blue transition-colors">
                <span className="text-xs text-neutral-500 dark:text-neutral-400">+ Add Photos</span>
                <input type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoUpload} />
              </label>
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-2xl p-5 shadow-sm">
              <h3 className="font-display text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-3">Description</h3>
              <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe the damage..."
                className="w-full h-24 text-sm text-neutral-800 dark:text-neutral-200 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-3 outline-none focus:border-accent-blue resize-none" />
            </div>

            <Button variant="primary" className="w-full rounded-xl" isLoading={loading} onClick={handleSubmit}>Submit Report</Button>
          </div>
        )}
      </div>
    </div>
  );
};
