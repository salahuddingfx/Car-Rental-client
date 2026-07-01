import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronDown, Fuel, Zap } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useStore } from '../store/useStore';
import { CarCard } from '../components/ui/CarCard';
import { Button } from '../components/ui/Button';

const categories = [
  { value: 'All', label: 'All Vehicles' },
  { value: 'Luxury', label: 'Luxury' },
  { value: 'Sports', label: 'Sports' },
  { value: 'Supercar', label: 'Supercar' },
  { value: 'SUV', label: 'SUV' },
  { value: 'Electric', label: 'Electric' },
];
const fuelTypes = [
  { value: 'All', label: 'All Fuels' },
  { value: 'Petrol', label: 'Petrol' },
  { value: 'Electric', label: 'Electric' },
  { value: 'Hybrid', label: 'Hybrid' },
  { value: 'Diesel', label: 'Diesel' },
];
const sortOptions = [
  { value: 'Price: Low', label: 'Price: Low to High' },
  { value: 'Price: High', label: 'Price: High to Low' },
  { value: 'Rating', label: 'Highest Rated' },
  { value: 'Name', label: 'Name A-Z' },
];

const PAGE_SIZE = 6;

export const Listing = () => {
  const [searchParams] = useSearchParams();
  const { cars } = useStore();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [fuel, setFuel] = useState('All');
  const [sort, setSort] = useState('Price: Low');
  const [priceRange, setPriceRange] = useState(1000);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => { document.title = 'Explore Fleet — Apex Ride' }, []);

  const filtered = useMemo(() => {
    let result = [...cars];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(c => c.name.toLowerCase().includes(q) || c.brand.toLowerCase().includes(q) || c.location.toLowerCase().includes(q));
    }
    if (category !== 'All') result = result.filter(c => c.category === category);
    if (fuel !== 'All') result = result.filter(c => c.fuel === fuel);
    result = result.filter(c => c.price <= priceRange);
    result.sort((a, b) => {
      switch (sort) {
        case 'Price: Low': return a.price - b.price;
        case 'Price: High': return b.price - a.price;
        case 'Rating': return b.rating - a.rating;
        case 'Name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });
    return result;
  }, [cars, search, category, fuel, sort, priceRange]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => { setPage(1); }, [search, category, fuel, sort, priceRange]);

  const activeFilters = [
    ...(category !== 'All' ? [{ key: 'category', label: category, onRemove: () => setCategory('All') }] : []),
    ...(fuel !== 'All' ? [{ key: 'fuel', label: fuel, onRemove: () => setFuel('All') }] : []),
    ...(priceRange < 1000 ? [{ key: 'price', label: `Under ৳${priceRange}`, onRemove: () => setPriceRange(1000) }] : []),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-light-bg to-white">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 overflow-hidden pt-24 pb-12 lg:pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-accent-amber/5 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <Breadcrumbs items={[{ label: 'Our Cars' }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center lg:text-left">
            <p className="font-display text-[10px] tracking-[0.25em] text-accent-blue uppercase font-bold mb-3">Apex Ride Fleet Collection</p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-3">Explore Our Fleet</h1>
            <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">Handpicked luxury, sports, and performance vehicles — each maintained to perfection and ready for your journey.</p>
          </motion.div>

          {/* Search bar */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mt-8 max-w-2xl mx-auto lg:mx-0">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input type="text" placeholder="Search by name, brand, or location..." value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/10 text-white text-sm pl-11 pr-4 py-3.5 outline-none focus:border-accent-blue/50 focus:bg-white/15 rounded-xl transition-all placeholder:text-neutral-500" />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors cursor-pointer">
                  <X size={16} />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6 relative z-10 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ===== FILTER SIDEBAR ===== */}
          <aside className={`lg:w-60 shrink-0 ${showFilters ? 'fixed inset-0 z-40 bg-white p-6 overflow-y-auto lg:relative lg:inset-auto lg:z-auto lg:bg-transparent lg:p-0' : 'hidden lg:block'}`}>
            {showFilters && (
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h3 className="font-display text-sm font-bold text-neutral-800 uppercase tracking-wider">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="text-neutral-500 hover:text-neutral-800 cursor-pointer"><X size={20} /></button>
              </div>
            )}

            <div className="bg-white border border-neutral-200/60 rounded-2xl p-5 shadow-sm space-y-6">
              {/* Category */}
              <div>
                <h4 className="font-display text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-3">Category</h4>
                <div className="space-y-1.5">
                  {categories.map(c => (
                    <button key={c.value} onClick={() => setCategory(c.value)}
                      className={`w-full text-left text-xs px-3 py-2 rounded-lg transition-all ${category === c.value ? 'bg-accent-blue text-white font-semibold' : 'text-neutral-600 hover:bg-neutral-100'}`}>
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-px bg-neutral-100" />

              {/* Fuel Type */}
              <div>
                <h4 className="font-display text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-3">Fuel Type</h4>
                <div className="space-y-1.5">
                  {fuelTypes.map(f => (
                    <button key={f.value} onClick={() => setFuel(f.value)}
                      className={`w-full text-left text-xs px-3 py-2 rounded-lg transition-all flex items-center gap-2 ${fuel === f.value ? 'bg-accent-amber/10 text-accent-amber font-semibold' : 'text-neutral-600 hover:bg-neutral-100'}`}>
                      {f.value === 'Electric' ? <Zap size={13} /> : <Fuel size={13} />}
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-px bg-neutral-100" />

              {/* Price Range */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-display text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Max Price</h4>
                  <span className="text-sm font-bold text-accent-blue">৳{priceRange}</span>
                </div>
                <input type="range" min={100} max={1000} value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-accent-blue h-1.5 rounded-full appearance-none bg-neutral-200 cursor-pointer" />
                <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                  <span>৳100</span>
                  <span>৳1,000</span>
                </div>
              </div>
              <div className="h-px bg-neutral-100" />

              {/* Sort */}
              <div>
                <h4 className="font-display text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-3">Sort By</h4>
                <div className="relative">
                  <button onClick={() => setSortOpen(!sortOpen)}
                    className="w-full flex items-center justify-between bg-white border border-neutral-200 text-sm text-neutral-700 px-3 py-2.5 rounded-lg hover:border-neutral-400 transition-colors cursor-pointer">
                    <span>{sortOptions.find(s => s.value === sort)?.label}</span>
                    <ChevronDown size={14} className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {sortOpen && (
                      <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                        className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg z-10 overflow-hidden">
                        {sortOptions.map(s => (
                          <button key={s.value} onClick={() => { setSort(s.value); setSortOpen(false); }}
                            className={`w-full text-left text-xs px-3 py-2.5 transition-colors cursor-pointer ${sort === s.value ? 'bg-accent-blue/10 text-accent-blue font-semibold' : 'text-neutral-600 hover:bg-neutral-50'}`}>
                            {s.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </aside>

          {/* ===== CAR GRID ===== */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-6 bg-white border border-neutral-200/60 rounded-2xl px-5 py-3 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-sm text-neutral-600">
                  {filtered.length > 0 ? (
                    <>Showing <strong className="text-neutral-900">{(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, filtered.length)}</strong> of <strong className="text-neutral-900">{filtered.length}</strong> vehicles</>
                  ) : (
                    <><strong className="text-neutral-900">0</strong> vehicles</>
                  )}
                </span>
                <div className="hidden sm:flex items-center gap-1.5">
                  {activeFilters.map(f => (
                    <span key={f.key} className="flex items-center gap-1 text-[10px] font-medium text-accent-blue bg-accent-blue/5 border border-accent-blue/20 px-2.5 py-1 rounded-full">
                      {f.label}
                      <button onClick={f.onRemove} className="hover:text-accent-blue-hover cursor-pointer"><X size={11} /></button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center gap-1.5 text-xs text-neutral-600 border border-neutral-200 px-3 py-1.5 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer">
                  <SlidersHorizontal size={14} /> Filters
                </button>
              </div>
            </div>

            {/* Cars Grid */}
            <AnimatePresence mode="wait">
              {filtered.length > 0 ? (
                <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {paginated.map((car, i) => (
                    <motion.div key={car.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04, duration: 0.35 }}>
                      <CarCard car={car} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-24 bg-white border border-neutral-200/60 rounded-2xl shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
                    <Search size={24} className="text-neutral-400" />
                  </div>
                  <p className="text-neutral-600 font-semibold mb-1">No vehicles found</p>
                  <p className="text-neutral-400 text-sm mb-6">Try adjusting your filters or search terms.</p>
                  <Button variant="outline" size="sm" onClick={() => { setSearch(''); setCategory('All'); setFuel('All'); setPriceRange(1000); }}
                    className="rounded-lg">Reset All Filters</Button>
                </motion.div>
              )}
            </AnimatePresence>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-2 text-xs font-semibold rounded-xl border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                      page === p
                        ? 'bg-accent-blue text-white shadow-sm shadow-accent-blue/20'
                        : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-2 text-xs font-semibold rounded-xl border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
