import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Tag, ArrowRight, Search } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';

const blogPosts = [
  {
    id: '1',
    slug: 'top-10-road-trip-routes-from-dhaka',
    title: 'Top 10 Road Trip Routes from Dhaka',
    excerpt: 'Discover the most scenic drives within reach of the capital — from Cox\'s Bazar coastal roads to Sylhet tea gardens.',
    category: 'Travel',
    date: '2026-06-25',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '2',
    slug: 'electric-cars-in-bangladesh',
    title: 'Electric Cars in Bangladesh: What You Need to Know',
    excerpt: 'A complete guide to EV charging infrastructure, cost savings, and the best electric cars available for rent.',
    category: 'EV Guide',
    date: '2026-06-18',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '3',
    slug: 'luxury-vs-sports-car',
    title: 'Luxury vs Sports Car: Which Should You Rent?',
    excerpt: 'Comfort or adrenaline? We break down the experience differences to help you choose your next ride.',
    category: 'Lifestyle',
    date: '2026-06-10',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '4',
    slug: 'safe-driving-tips-bangladesh',
    title: 'Safe Driving Tips for Bangladesh Highways',
    excerpt: 'Essential safety practices for long-distance driving on Bangladeshi roads, monsoon or dry season.',
    category: 'Safety',
    date: '2026-06-02',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '5',
    slug: 'how-apex-ride-maintains-fleet-quality',
    title: 'How Apex Ride Maintains Fleet Quality',
    excerpt: 'Behind the scenes of our 150-point inspection process that keeps every car in showroom condition.',
    category: 'Company',
    date: '2026-05-28',
    readTime: '3 min',
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '6',
    slug: 'coxs-bazar-in-a-supercar',
    title: 'Cox\'s Bazar in a Supercar: A Weekend Guide',
    excerpt: 'Turn heads on the world\'s longest beach with our curated supercar weekend package itinerary.',
    category: 'Travel',
    date: '2026-05-20',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=600',
  },
];

const categories = ['All', 'Travel', 'EV Guide', 'Lifestyle', 'Safety', 'Company'];

export const Blog: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = blogPosts.filter(p => {
    if (selectedCat !== 'All' && p.category !== selectedCat) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="pt-24 pb-20 bg-light-bg dark:bg-neutral-950 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[{ label: 'Blog' }]} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="w-16 h-16 bg-accent-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BookOpen size={28} className="text-accent-blue" />
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-2">Apex Ride Blog</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Tips, guides, and stories from the road</p>
        </motion.div>

        {/* Search + Categories */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-sm w-full">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input type="text" placeholder="Search articles..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-sm pl-10 pr-4 py-2.5 rounded-xl outline-none focus:border-accent-blue" />
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map(c => (
              <button key={c} onClick={() => setSelectedCat(c)}
                className={`text-[10px] font-display font-bold uppercase tracking-widest px-3 py-1.5 rounded-full transition-colors cursor-pointer ${selectedCat === c ? 'bg-accent-blue text-white' : 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-accent-blue'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((post, i) => (
            <Link key={post.id} to={`/blog/${post.slug}`}>
              <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group h-full">
              <div className="h-44 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[9px] font-display font-bold uppercase tracking-widest text-accent-blue bg-accent-blue/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Tag size={8} /> {post.category}
                  </span>
                </div>
                <h3 className="font-display text-sm font-bold text-neutral-800 dark:text-neutral-200 mb-2 group-hover:text-accent-blue transition-colors line-clamp-2">{post.title}</h3>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed mb-3 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[10px] text-neutral-400 dark:text-neutral-500">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                  </div>
                  <ArrowRight size={14} className="text-neutral-400 group-hover:text-accent-blue group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </motion.article>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <BookOpen size={32} className="text-neutral-300 dark:text-neutral-600 mx-auto mb-3" />
            <p className="text-sm text-neutral-500 dark:text-neutral-400">No articles found.</p>
          </div>
        )}
      </div>
    </div>
  );
};
