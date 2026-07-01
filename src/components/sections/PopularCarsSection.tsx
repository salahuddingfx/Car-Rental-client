import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { CarCard } from '../ui/CarCard';

export const PopularCarsSection = () => {
  const { cars } = useStore();

  const popular = [...cars]
    .sort((a, b) => (b.reviewsCount * b.rating) - (a.reviewsCount * a.rating))
    .slice(0, 4);

  return (
    <section className="py-16 bg-light-bg dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
        >
          <div>
            <p className="font-display text-[10px] tracking-[0.25em] text-red-500 uppercase font-bold mb-2 flex items-center gap-1.5">
              <TrendingUp size={12} /> Trending Now
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100">Popular Cars</h2>
          </div>
          <Link to="/cars?sort=Rating" className="group font-display text-xs text-neutral-400 hover:text-accent-blue uppercase tracking-widest flex items-center gap-1.5 transition-colors">
            View All <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {popular.map((car, i) => (
            <motion.div key={car.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <CarCard car={car} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
