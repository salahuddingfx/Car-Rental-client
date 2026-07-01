import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, ExternalLink, Quote, ThumbsUp, Filter } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useStore } from '../store/useStore';

interface SocialReview {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
  source: 'google' | 'facebook' | 'tripadvisor' | 'apex';
  sourceLabel: string;
  helpful: number;
  carName?: string;
  verified: boolean;
}

const socialReviews: SocialReview[] = [
  { id: 'g1', name: 'Rafiq Hassan', avatar: 'https://i.pravatar.cc/150?img=11', rating: 5, text: 'Absolutely incredible experience! The BMW 7 Series was spotless and the chauffeur was extremely professional. Will definitely book again for my next Dhaka trip.', date: '2 days ago', source: 'google', sourceLabel: 'Google', helpful: 24, carName: 'BMW 7 Series', verified: true },
  { id: 'g2', name: 'Nusrat Jahan', avatar: 'https://i.pravatar.cc/150?img=5', rating: 5, text: 'Best car rental service in Bangladesh. The Mercedes E-Class we booked for our wedding was in perfect condition. Great attention to detail.', date: '1 week ago', source: 'google', sourceLabel: 'Google', helpful: 18, carName: 'Mercedes E-Class', verified: true },
  { id: 'g3', name: 'Tanvir Ahmed', avatar: 'https://i.pravatar.cc/150?img=12', rating: 4, text: 'Good service overall. The Toyota Land Cruiser was comfortable for our Cox\'s Bazar trip. Only minor issue was a slight delay in pickup, but the car made up for it.', date: '2 weeks ago', source: 'google', sourceLabel: 'Google', helpful: 12, carName: 'Toyota Land Cruiser', verified: true },

  { id: 'f1', name: 'Samira Karim', avatar: 'https://i.pravatar.cc/150?img=9', rating: 5, text: 'Used Apex Ride for my mother\'s birthday surprise. The Audi A6 was delivered on time, beautifully clean, and the whole process was seamless. Highly recommend!', date: '3 days ago', source: 'facebook', sourceLabel: 'Facebook', helpful: 31, carName: 'Audi A6', verified: true },
  { id: 'f2', name: 'Kamal Hossain', avatar: 'https://i.pravatar.cc/150?img=15', rating: 5, text: 'First time using a luxury rental in Sylhet and Apex Ride exceeded expectations. The Range Rover Sport handled the hill roads perfectly. Amazing fleet!', date: '5 days ago', source: 'facebook', sourceLabel: 'Facebook', helpful: 15, carName: 'Range Rover Sport', verified: true },
  { id: 'f3', name: 'Farhana Rahman', avatar: 'https://i.pravatar.cc/150?img=20', rating: 4, text: 'Great selection of cars. We rented a Nissan Patrol for a family outing. Comfortable, clean, and well-maintained. The online booking was super easy.', date: '1 week ago', source: 'facebook', sourceLabel: 'Facebook', helpful: 9, carName: 'Nissan Patrol', verified: false },

  { id: 't1', name: 'David Mitchell', avatar: 'https://i.pravatar.cc/150?img=33', rating: 5, text: 'As a tourist visiting Bangladesh, I was impressed by the quality of service. The chauffeur-driven BMW was a luxury experience. Professional from start to finish.', date: '4 days ago', source: 'tripadvisor', sourceLabel: 'TripAdvisor', helpful: 42, carName: 'BMW 5 Series', verified: true },
  { id: 't2', name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?img=25', rating: 5, text: 'Booked a Porsche Cayenne for a photoshoot in Chattogram. The car was stunning and the team was very accommodating. Will use again for sure!', date: '1 week ago', source: 'tripadvisor', sourceLabel: 'TripAdvisor', helpful: 28, carName: 'Porsche Cayenne', verified: true },
  { id: 't3', name: 'Aminul Islam', avatar: 'https://i.pravatar.cc/150?img=51', rating: 4, text: 'Solid service with a good range of vehicles. The Honda Vezel was perfect for city driving. Prices are reasonable for the quality you get.', date: '2 weeks ago', source: 'tripadvisor', sourceLabel: 'TripAdvisor', helpful: 11, carName: 'Honda Vezel', verified: true },

  { id: 'a1', name: 'Zahidul Haque', avatar: 'https://i.pravatar.cc/150?img=53', rating: 5, text: 'Used Apex Ride for my corporate event. Fleet of 3 luxury cars all delivered on time and in pristine condition. The admin dashboard made managing bookings a breeze.', date: '1 day ago', source: 'apex', sourceLabel: 'Apex Ride', helpful: 19, carName: 'Multiple Cars', verified: true },
  { id: 'a2', name: 'Tasnim Faria', avatar: 'https://i.pravatar.cc/150?img=44', rating: 5, text: 'The Tesla Model 3 was an absolute joy to drive! Silent, smooth, and incredibly responsive. Apex Ride is leading the EV rental game in Bangladesh.', date: '3 days ago', source: 'apex', sourceLabel: 'Apex Ride', helpful: 35, carName: 'Tesla Model 3', verified: true },
  { id: 'a3', name: 'Shakil Khan', avatar: 'https://i.pravatar.cc/150?img=57', rating: 4, text: 'Great experience overall. Booked an SUV for a Sylhet tour. The car was well-maintained and the pricing was transparent. No hidden charges.', date: '5 days ago', source: 'apex', sourceLabel: 'Apex Ride', helpful: 14, carName: 'Toyota Fortuner', verified: true },
  { id: 'a4', name: 'Maliha Sultana', avatar: 'https://i.pravatar.cc/150?img=47', rating: 5, text: 'Customer service was outstanding. They helped me choose the perfect car for my wedding. The decorated Mercedes looked absolutely stunning in photos!', date: '1 week ago', source: 'apex', sourceLabel: 'Apex Ride', helpful: 27, carName: 'Mercedes E-Class', verified: true },
];

const sourceColors: Record<string, string> = {
  google: 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
  facebook: 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800',
  tripadvisor: 'bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800',
  apex: 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800',
};

const sourceLogos: Record<string, string> = {
  google: 'G',
  facebook: 'f',
  tripadvisor: '🦉',
  apex: 'A',
};

export const Reviews: React.FC = () => {
  const { cars } = useStore();
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'rating'>('recent');

  useEffect(() => { document.title = 'Reviews — Apex Ride' }, []);

  const allPlatformReviews = cars.flatMap(c => c.reviews.map(r => ({ ...r, carName: c.name, source: 'apex' as const, sourceLabel: 'Apex Ride', helpful: Math.floor(Math.random() * 20), verified: true })));
  const allReviews = [...socialReviews, ...allPlatformReviews];

  const filtered = filter === 'all' ? allReviews : allReviews.filter(r => r.source === filter);
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'helpful') return b.helpful - a.helpful;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const avgRating = allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length;
  const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: allReviews.filter(r => r.rating === star).length,
    pct: (allReviews.filter(r => r.rating === star).length / allReviews.length) * 100,
  }));

  const sourceStats = [
    { key: 'google', label: 'Google', count: allReviews.filter(r => r.source === 'google').length, avg: (allReviews.filter(r => r.source === 'google').reduce((s, r) => s + r.rating, 0) / Math.max(allReviews.filter(r => r.source === 'google').length, 1)).toFixed(1) },
    { key: 'facebook', label: 'Facebook', count: allReviews.filter(r => r.source === 'facebook').length, avg: (allReviews.filter(r => r.source === 'facebook').reduce((s, r) => s + r.rating, 0) / Math.max(allReviews.filter(r => r.source === 'facebook').length, 1)).toFixed(1) },
    { key: 'tripadvisor', label: 'TripAdvisor', count: allReviews.filter(r => r.source === 'tripadvisor').length, avg: (allReviews.filter(r => r.source === 'tripadvisor').reduce((s, r) => s + r.rating, 0) / Math.max(allReviews.filter(r => r.source === 'tripadvisor').length, 1)).toFixed(1) },
    { key: 'apex', label: 'Apex Ride', count: allReviews.filter(r => r.source === 'apex').length, avg: (allReviews.filter(r => r.source === 'apex').reduce((s, r) => s + r.rating, 0) / Math.max(allReviews.filter(r => r.source === 'apex').length, 1)).toFixed(1) },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-light-bg to-white dark:from-neutral-900 dark:to-neutral-950 transition-colors">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 overflow-hidden pt-24 pb-12 lg:pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-amber/5 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <Breadcrumbs items={[{ label: 'Reviews' }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <p className="font-display text-[10px] tracking-[0.25em] text-accent-amber uppercase font-bold mb-3">What Our Clients Say</p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-3">Customer Reviews</h1>
            <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">Real reviews from Google, Facebook, TripAdvisor, and our platform — all in one place.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6 relative z-10 pb-16">
        {/* Rating Summary */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-700/60 rounded-2xl shadow-sm p-6 sm:p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Big Rating */}
            <div className="text-center lg:border-r border-neutral-200/60 dark:border-neutral-700/60 lg:pr-8">
              <div className="text-6xl font-bold text-neutral-900 dark:text-neutral-100 font-display">{avgRating.toFixed(1)}</div>
              <div className="flex items-center justify-center gap-1 mt-2 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} className={i < Math.round(avgRating) ? 'text-accent-amber fill-accent-amber' : 'text-neutral-300 dark:text-neutral-600'} />
                ))}
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">{allReviews.length} total reviews</p>
            </div>

            {/* Rating Bars */}
            <div className="space-y-2">
              {ratingCounts.map(r => (
                <div key={r.star} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400 w-8">{r.star} ★</span>
                  <div className="flex-1 h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${r.pct}%` }} transition={{ duration: 0.8, delay: 0.3 }}
                      className="h-full bg-accent-amber rounded-full" />
                  </div>
                  <span className="text-xs text-neutral-400 w-8 text-right">{r.count}</span>
                </div>
              ))}
            </div>

            {/* Source Stats */}
            <div className="space-y-3">
              {sourceStats.map(s => (
                <div key={s.key} className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold border ${sourceColors[s.key]}`}>
                      {sourceLogos[s.key]}
                    </span>
                    <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">{s.label}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">{s.avg}</span>
                    <span className="text-[10px] text-neutral-400 ml-1">({s.count})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {[
            { key: 'all', label: 'All Reviews' },
            { key: 'google', label: 'Google' },
            { key: 'facebook', label: 'Facebook' },
            { key: 'tripadvisor', label: 'TripAdvisor' },
            { key: 'apex', label: 'Apex Ride' },
          ].map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-full text-xs font-display font-bold uppercase tracking-widest transition-all cursor-pointer ${
                filter === f.key
                  ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/20'
                  : 'bg-white dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 hover:border-accent-blue/30 hover:text-accent-blue'
              }`}>
              {f.label}
            </button>
          ))}
          <div className="ml-auto">
            <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 px-3 py-2 rounded-lg outline-none cursor-pointer">
              <option value="recent">Most Recent</option>
              <option value="helpful">Most Helpful</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map((review, i) => (
            <motion.div key={review.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-700/60 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-200">{review.name}</h4>
                    <p className="text-[10px] text-neutral-400 dark:text-neutral-500">{review.date}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${sourceColors[review.source]}`}>
                  {sourceLogos[review.source]} {review.sourceLabel}
                </span>
              </div>

              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={13} className={j < review.rating ? 'text-accent-amber fill-accent-amber' : 'text-neutral-300 dark:text-neutral-600'} />
                ))}
                {review.verified && (
                  <span className="text-[9px] text-green-600 dark:text-green-400 ml-1 font-medium">✓ Verified</span>
                )}
              </div>

              {review.carName && (
                <p className="text-[10px] text-accent-blue font-medium mb-1.5">{review.carName}</p>
              )}

              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed flex-1 mb-3">{review.text}</p>

              <div className="flex items-center gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                <button className="flex items-center gap-1 text-[10px] text-neutral-400 hover:text-accent-blue transition-colors cursor-pointer">
                  <ThumbsUp size={11} /> {review.helpful} helpful
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
