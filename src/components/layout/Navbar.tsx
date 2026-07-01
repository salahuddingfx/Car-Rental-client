import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, User as UserIcon, Menu, X, Heart, LogOut, Calendar, Sun, Moon } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useThemeStore } from '../../store/useThemeStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';
import { LanguageToggle } from '../ui/LanguageToggle';
import { NotificationBell } from '../ui/NotificationBell';

const categories = [
  { name: 'Electric', desc: 'Zero emission, maximum torque', img: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=200' },
  { name: 'Supercar', desc: 'Raw horsepower, aggressive style', img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=200' },
  { name: 'Sports', desc: 'Precision track and road weapons', img: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=200' },
  { name: 'Luxury', desc: 'First-class prestige travel lounges', img: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=200' },
  { name: 'SUV', desc: 'Commanding heights, multi-terrain', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200' },
];

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, wishlist, logout, cars } = useStore();
  const { isDark, toggleTheme } = useThemeStore();
  const { t } = useLanguageStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => { const h = () => setIsScrolled(window.scrollY > 50); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h); }, []);
  useEffect(() => { setIsMobileMenuOpen(false); setIsSearchOpen(false); setIsNotificationsOpen(false); setIsProfileOpen(false); }, [location.pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => { e.preventDefault(); if (searchQuery.trim()) { navigate(`/cars?search=${encodeURIComponent(searchQuery)}`); setIsSearchOpen(false); } };
  const filteredCars = searchQuery.trim() ? cars.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.brand.toLowerCase().includes(searchQuery.toLowerCase()) || c.location.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5) : [];


  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${isScrolled ? 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md py-3 border-b border-neutral-200/60 dark:border-neutral-700/60 shadow-sm' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
<Link to="/" className="flex items-center gap-1.5 group">
             <span className={`font-extrabold font-display transition-all duration-500 ${isScrolled ? 'text-xl text-accent-amber' : 'text-2xl text-accent-amber'}`}>A</span>
             <span className={`font-display font-bold tracking-widest transition-all duration-500 ${isScrolled ? 'text-base text-neutral-900 dark:text-white' : 'text-xl text-white'}`}>pex Ride</span>
           </Link>

          <div className="hidden lg:flex items-center gap-7">
            {[
              { to: '/', label: t('home') },
              { to: '/cars', label: t('browseCars') },
              ...(user ? [{ to: '/driver/cars', label: t('listYourCar') }] : []),
              { to: '/about', label: t('aboutUs') },
              { to: '/contact', label: t('contact') },
            ].map(l => (
              <Link key={l.to} to={l.to} className={`font-display text-xs tracking-widest uppercase hover:text-accent-blue transition-colors ${location.pathname === l.to ? 'text-accent-blue' : isScrolled ? 'text-neutral-600 dark:text-neutral-400' : 'text-white/70'}`}>{l.label}</Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <LanguageToggle />
            <button onClick={() => setIsSearchOpen(true)} className={`transition-colors cursor-pointer ${isScrolled ? 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white' : 'text-white/60 hover:text-white'}`}><Search size={18} /></button>
            <Link to="/dashboard?tab=wishlist" className={`transition-colors relative ${isScrolled ? 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white' : 'text-white/60 hover:text-white'}`}>
              <Heart size={18} />
              {wishlist.length > 0 && <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-accent-blue text-white font-sans text-[8px] font-bold rounded-full flex items-center justify-center">{wishlist.length}</span>}
            </Link>
            <NotificationBell className={isScrolled ? '' : 'text-white/60 hover:text-white'} />
            {user ? (
              <div className="relative">
                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-2 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 p-1.5 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors rounded-lg cursor-pointer">
                  <img src={user.avatar} alt="" className="w-6 h-6 object-cover rounded" />
                  <span className="font-display text-[10px] uppercase font-bold tracking-widest text-neutral-700 dark:text-neutral-300 max-w-[70px] truncate">{user.name}</span>
                </button>
                <AnimatePresence>{isProfileOpen && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 mt-3 w-48 bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-700/60 shadow-lg p-1.5 z-50 rounded-xl">
                    <div className="px-3 py-1.5 border-b border-neutral-100 dark:border-neutral-800 mb-1"><p className="text-xs font-bold text-neutral-800 dark:text-neutral-200 truncate">{user.name}</p><p className="text-[10px] text-neutral-500 truncate">{user.email}</p></div>
                    {[
                      { icon: UserIcon, label: t('myProfile'), to: '/dashboard' },
                      { icon: Calendar, label: t('myBookings'), to: '/dashboard?tab=bookings' },
                    ].map(l => (
                      <Link key={l.label} to={l.to} className="flex items-center gap-2 px-3 py-1.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors rounded">{<l.icon size={13} />}{l.label}</Link>
                    ))}
                    <button onClick={toggleTheme} className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors rounded cursor-pointer">
                      {isDark ? <Sun size={13} /> : <Moon size={13} />}
                      {isDark ? 'Light Mode' : 'Dark Mode'}
                    </button>
                    <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors rounded cursor-pointer"><LogOut size={13} />{t('logout')}</button>
                  </motion.div>
                )}</AnimatePresence>
              </div>
            ) : (
              <Button variant="glass" size="sm" onClick={() => navigate('/auth')} className="rounded-lg">{t('signIn')}</Button>
            )}
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`lg:hidden transition-colors cursor-pointer ${isScrolled ? 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white' : 'text-white/70 hover:text-white'}`}>{isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </nav>

      <AnimatePresence>{isMobileMenuOpen && (
        <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} transition={{ type: 'tween', duration: 0.25 }}
          className="fixed inset-0 bg-white dark:bg-neutral-950 z-30 flex flex-col p-8 pt-28 overflow-y-auto lg:hidden">
          <div className="flex flex-col gap-5 text-left mb-8">
            <Link to="/" className="font-display text-lg font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-100 border-b border-neutral-100 dark:border-neutral-800 pb-2">{t('home')}</Link>
            <Link to="/cars" className="font-display text-lg font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-100 border-b border-neutral-100 dark:border-neutral-800 pb-2">{t('browseCars')}</Link>
            {user && <Link to="/driver/cars" className="font-display text-lg font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-100 border-b border-neutral-100 dark:border-neutral-800 pb-2">{t('listYourCar')}</Link>}
            <Link to="/about" className="font-display text-lg font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-100 border-b border-neutral-100 dark:border-neutral-800 pb-2">{t('aboutUs')}</Link>
            <Link to="/contact" className="font-display text-lg font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-100 border-b border-neutral-100 dark:border-neutral-800 pb-2">{t('contact')}</Link>
            <div><span className="font-display text-xs font-bold tracking-wider text-neutral-400 uppercase block mb-2">Categories</span>
              <div className="grid grid-cols-2 gap-2 pl-2">{categories.map(c => <Link key={c.name} to={`/cars?category=${c.name}`} className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white text-sm py-0.5">{c.name}</Link>)}</div>
            </div>
          </div>
          <div className="mt-auto space-y-3">
            {user ? (
              <>
                <div className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg mb-3">
                  <img src={user.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
                  <div><p className="text-sm font-bold text-neutral-800 dark:text-neutral-100 uppercase font-display">{user.name}</p><p className="text-xs text-neutral-500 truncate">{user.email}</p></div>
                </div>
                <button onClick={toggleTheme} className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer">
                  {isDark ? <Sun size={15} className="text-amber-500" /> : <Moon size={15} />}
                  {isDark ? 'Light Mode' : 'Dark Mode'}
                </button>
                <Button variant="outline" size="sm" className="w-full rounded-lg" onClick={() => navigate('/dashboard')}>Dashboard</Button>
                <Button variant="glass" size="sm" className="w-full text-red-500 border-red-200 rounded-lg" onClick={() => { logout(); navigate('/'); }}>Logout</Button>
              </>
            ) : (
              <Button variant="primary" className="w-full rounded-lg" onClick={() => navigate('/auth')}>Sign In</Button>
            )}
          </div>
        </motion.div>
      )}</AnimatePresence>

      <AnimatePresence>{isSearchOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md z-50 flex flex-col p-8 md:p-24">
          <button onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} className="absolute top-8 right-8 text-neutral-400 hover:text-neutral-800 dark:hover:text-white transition-colors cursor-pointer"><X size={26} /></button>
          <form onSubmit={handleSearchSubmit} className="w-full max-w-3xl mx-auto mt-16 relative">
            <input type="text" autoFocus value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search luxury models, brands, or locations..."
              className="w-full bg-transparent border-b-2 border-neutral-200 dark:border-neutral-700 focus:border-accent-blue text-xl md:text-3xl text-neutral-800 dark:text-neutral-100 font-sans py-3 outline-none transition-colors" />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-800 dark:hover:text-white cursor-pointer"><Search size={24} /></button>
          </form>
          {searchQuery.trim() && <div className="w-full max-w-3xl mx-auto mt-10 text-left">
            <h4 className="font-display text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-4">Suggestions</h4>
            {filteredCars.length > 0 ? filteredCars.map(car => (
              <div key={car.id} onClick={() => { navigate(`/cars/${car.id}`); setIsSearchOpen(false); setSearchQuery(''); }}
                className="flex items-center gap-4 p-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 transition-all rounded-lg cursor-pointer mb-2">
                <img src={car.image} alt={car.name} className="w-16 h-10 object-cover bg-neutral-100 dark:bg-neutral-800 rounded" />
                <div className="flex-1"><p className="text-sm text-neutral-800 dark:text-neutral-200 font-semibold">{car.name}</p><p className="text-[10px] text-neutral-500 uppercase tracking-wider">{car.brand} · {car.category} · {car.location}</p></div>
                <span className="text-accent-blue font-bold text-sm font-display">৳{car.price}/day</span>
              </div>
            )) : <p className="text-neutral-500 text-sm">No results for "{searchQuery}"</p>}
          </div>}
        </motion.div>
      )}</AnimatePresence>
    </>
  );
};
