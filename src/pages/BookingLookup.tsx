import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Hash, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';

export const BookingLookup: React.FC = () => {
  const navigate = useNavigate();
  const { bookings, guestBookings } = useStore();
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const allBookings = [...bookings, ...guestBookings];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    setError('');

    const trimmed = query.trim().toUpperCase();
    if (!trimmed) { setError('Please enter your booking reference or ID.'); return; }

    const found = allBookings.find(
      b => b.bookingRef.toUpperCase() === trimmed || b.id.toUpperCase() === trimmed || b.id === trimmed
    );

    if (found) {
      navigate(`/tracking/${found.id}`);
    } else {
      setError('No booking found. Check your reference and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-neutral-950 flex items-center justify-center px-4 pt-24 pb-20">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-accent-blue/10 flex items-center justify-center mx-auto mb-4">
            <Search size={28} className="text-accent-blue" />
          </div>
          <h1 className="font-display text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider mb-2">Track Your Booking</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Enter your booking reference or ID to view status, driver details, and trip info.</p>
        </div>

        <form onSubmit={handleSearch} className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 shadow-sm p-6 rounded-2xl">
          <label className="text-[10px] text-neutral-400 dark:text-neutral-500 font-display uppercase tracking-widest mb-2 block">Booking Reference</label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Hash size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
              <input
                type="text"
                value={query}
                onChange={e => { setQuery(e.target.value); setError(''); setSearched(false); }}
                placeholder="e.g. AR-X7K2M"
                className="w-full border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-800 dark:text-neutral-200 p-3 pl-9 rounded-xl outline-none focus:border-accent-blue transition-colors placeholder:text-neutral-300 dark:placeholder:text-neutral-600 bg-white dark:bg-neutral-800 font-mono uppercase"
              />
            </div>
            <Button type="submit" variant="primary" className="rounded-xl px-4">
              <ArrowRight size={16} />
            </Button>
          </div>
          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-500 mt-3">{error}</motion.p>
          )}
        </form>

        <div className="mt-6 text-center">
          <p className="text-[10px] text-neutral-400 dark:text-neutral-500">
            Don't have a reference? <a href="mailto:support@apexride.com" className="text-accent-blue hover:underline">Contact Support</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
