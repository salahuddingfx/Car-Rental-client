import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { CarCard } from '../components/ui/CarCard';
import useEmblaCarousel from 'embla-carousel-react';
import type { Car } from '../store/useStore';

interface Props { cars: Car[] }

const categories = ['All', 'Luxury', 'Sports', 'Supercar', 'SUV', 'Electric'];

export const FeaturedCarsSection: React.FC<Props> = ({ cars }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true, loop: true, align: 'start' });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const filtered = activeCategory === 'All' ? cars : cars.filter(c => c.category === activeCategory);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section id="featured-cars" className="relative py-20 lg:py-28 z-10 bg-gradient-to-b from-light-bg to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <p className="font-display text-[10px] tracking-[0.25em] text-accent-blue uppercase font-bold mb-2">The Chosen Collection</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-neutral-900">Featured Vehicles</h2>
            <p className="text-neutral-500 text-sm mt-1.5 max-w-md">Handpicked luxury and performance machines waiting for your next journey.</p>
          </div>
          <Link to="/cars" className="group font-display text-xs text-neutral-400 hover:text-accent-blue uppercase tracking-widest flex items-center gap-1.5 transition-colors border-b border-transparent hover:border-accent-blue pb-0.5">
            Explore All <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-display font-bold uppercase tracking-widest transition-all cursor-pointer ${activeCategory === cat ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/20' : 'bg-white text-neutral-500 border border-neutral-200 hover:border-accent-blue/30 hover:text-accent-blue'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
            <div className="flex gap-5">
              {filtered.slice(0, 6).map(car => (
                <div key={car.id} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0">
                  <CarCard car={car} />
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          {canScrollPrev && (
            <button onClick={scrollPrev} className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-neutral-200 shadow-lg flex items-center justify-center text-neutral-600 hover:text-accent-blue hover:border-accent-blue/30 transition-all cursor-pointer z-10">
              <ChevronLeft size={18} />
            </button>
          )}
          {canScrollNext && (
            <button onClick={scrollNext} className="absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-neutral-200 shadow-lg flex items-center justify-center text-neutral-600 hover:text-accent-blue hover:border-accent-blue/30 transition-all cursor-pointer z-10">
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
