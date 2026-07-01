import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { useRecentlyViewed } from '../../store/useRecentlyViewed';
import { useStore } from '../../store/useStore';
import { CarCard } from '../ui/CarCard';

export const RecentlyViewedSection = () => {
  const { items } = useRecentlyViewed();
  const { cars } = useStore();

  const recentCars = items
    .map(id => cars.find(c => c.id === id))
    .filter(Boolean)
    .slice(0, 4);

  if (recentCars.length === 0) return null;

  return (
    <section className="py-16 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
        >
          <div>
            <p className="font-display text-[10px] tracking-[0.25em] text-accent-amber uppercase font-bold mb-2 flex items-center gap-1.5">
              <Clock size={12} /> Continue Browsing
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100">Recently Viewed</h2>
          </div>
          <Link to="/cars" className="group font-display text-xs text-neutral-400 hover:text-accent-blue uppercase tracking-widest flex items-center gap-1.5 transition-colors">
            View All <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recentCars.map((car, i) => car && (
            <motion.div key={car.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <CarCard car={car} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
