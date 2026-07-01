import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface Props {
  searchLoc: string;
  setSearchLoc: (v: string) => void;
  searchPickup: string;
  setSearchPickup: (v: string) => void;
  searchReturn: string;
  setSearchReturn: (v: string) => void;
  onSearch: (e: React.FormEvent) => void;
}

const brands = [
  { name: 'Toyota', count: 24, logo: 'TOYOTA' },
  { name: 'BMW', count: 14, logo: 'BMW' },
  { name: 'Mercedes', count: 12, logo: 'MERCEDES' },
  { name: 'Audi', count: 9, logo: 'AUDI' },
  { name: 'Nissan', count: 18, logo: 'NISSAN' },
  { name: 'Mitsubishi', count: 15, logo: 'MITSUBISHI' },
  { name: 'Honda', count: 20, logo: 'HONDA' },
  { name: 'Lamborghini', count: 3, logo: 'LAMBO' },
  { name: 'Porsche', count: 5, logo: 'PORSCHE' },
];

export const BrandsSection: React.FC<Props> = ({ searchLoc, setSearchLoc, searchPickup, setSearchPickup, searchReturn, setSearchReturn, onSearch }) => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-14 items-start">
        <div className="lg:col-span-2 order-2 lg:order-1">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-700/60 shadow-sm p-7 rounded-xl"
          >
            <h3 className="font-display text-sm font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-5 pb-2 border-b border-neutral-100 dark:border-neutral-700">
              Quick Booking
            </h3>
            <form onSubmit={onSearch} className="space-y-5">
              <div>
                <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1.5 block">Location</label>
                <div className="flex items-center border border-neutral-200 dark:border-neutral-700 p-3 bg-white dark:bg-neutral-800 rounded-lg">
                  <MapPin size={15} className="text-neutral-400 mr-2 shrink-0" />
                  <input type="text" placeholder="e.g. Gulshan, Dhaka" value={searchLoc}
                    onChange={(e) => setSearchLoc(e.target.value)}
                    className="bg-transparent text-sm text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 outline-none w-full font-sans" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1.5 block">Pickup</label>
                  <div className="flex items-center border border-neutral-200 dark:border-neutral-700 p-3 bg-white dark:bg-neutral-800 rounded-lg">
                    <Calendar size={15} className="text-neutral-400 mr-2 shrink-0" />
                    <input type="date" value={searchPickup} onChange={(e) => setSearchPickup(e.target.value)}
                      className="bg-transparent text-xs text-neutral-800 dark:text-neutral-200 outline-none w-full" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1.5 block">Return</label>
                  <div className="flex items-center border border-neutral-200 p-3 bg-white rounded-lg">
                    <Calendar size={15} className="text-neutral-400 mr-2 shrink-0" />
                    <input type="date" value={searchReturn} onChange={(e) => setSearchReturn(e.target.value)}
                      className="bg-transparent text-xs text-neutral-800 outline-none w-full" />
                  </div>
                </div>
              </div>
              <Button type="submit" variant="primary" className="w-full rounded-lg">Search Fleet</Button>
            </form>
          </motion.div>
        </div>

        <div className="lg:col-span-3 order-1 lg:order-2 space-y-7">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="font-display text-[10px] tracking-widest text-accent-blue uppercase font-bold mb-2">Available In Bangladesh</p>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold uppercase text-neutral-900">Popular Brands</h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {brands.map((brand, i) => (
              <motion.div key={brand.name} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.04 }} onClick={() => navigate(`/cars?brand=${brand.name}`)}
                className="p-5 border border-neutral-200 hover:border-accent-amber/30 bg-white hover:bg-amber-50/30 transition-all duration-300 group cursor-pointer flex flex-col justify-between h-24 rounded-xl shadow-sm"
              >
                <span className="font-display text-xs text-neutral-400 group-hover:text-neutral-500 tracking-widest">{brand.logo}</span>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-bold text-neutral-800 group-hover:text-accent-amber transition-colors">{brand.name}</span>
                  <span className="text-[10px] text-neutral-400">{brand.count} cars</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
