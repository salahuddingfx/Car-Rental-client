import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, MessageCircle, ArrowRight, Mail, Phone, MapPin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => { e.preventDefault(); if (email.trim()) { setSubscribed(true); setEmail(''); } };

  return (
    <footer className="bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200/60 dark:border-neutral-700/60 pt-16 pb-6 text-neutral-500 dark:text-neutral-400 relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12">
        {/* Brand */}
        <div className="lg:col-span-2 space-y-5">
          <Link to="/" className="font-display font-bold text-xl tracking-widest text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
            <span className="text-accent-amber font-extrabold text-2xl">A</span>pex Ride
          </Link>
          <p className="text-sm leading-relaxed max-w-sm">Experience the pinnacle of automotive engineering and modern luxury across Bangladesh. Premium hypercars, sports coupés, and electric tourers for discerning drivers.</p>
          <div className="space-y-2">
            <a href="tel:+8801700000000" className="flex items-center gap-2 text-xs hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">
              <Phone size={13} /> +880 1700-000000
            </a>
            <a href="mailto:support@apexride.com" className="flex items-center gap-2 text-xs hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">
              <Mail size={13} /> support@apexride.com
            </a>
            <span className="flex items-center gap-2 text-xs">
              <MapPin size={13} /> Dhaka, Bangladesh
            </span>
          </div>
          <div className="flex gap-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-neutral-200 dark:border-neutral-700 hover:border-accent-blue hover:text-accent-blue transition-colors bg-white dark:bg-neutral-800 rounded-lg">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-neutral-200 dark:border-neutral-700 hover:border-pink-500 hover:text-pink-500 transition-colors bg-white dark:bg-neutral-800 rounded-lg">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://wa.me/8801700000000" target="_blank" rel="noopener noreferrer" className="p-2 border border-neutral-200 dark:border-neutral-700 hover:border-green-500 hover:text-green-500 transition-colors bg-white dark:bg-neutral-800 rounded-lg">
              <MessageCircle size={15} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-neutral-200 dark:border-neutral-700 hover:border-red-500 hover:text-red-500 transition-colors bg-white dark:bg-neutral-800 rounded-lg">
              <Globe size={15} />
            </a>
          </div>
        </div>

        {/* Explore */}
        <div className="space-y-3">
          <h4 className="font-display text-[10px] font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest">Explore</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/cars" className="hover:text-accent-blue transition-colors">All Vehicles</Link></li>
            <li><Link to="/cars?category=Electric" className="hover:text-accent-blue transition-colors">Electric Collection</Link></li>
            <li><Link to="/cars?category=Supercar" className="hover:text-accent-blue transition-colors">Supercars</Link></li>
            <li><Link to="/cars?category=SUV" className="hover:text-accent-blue transition-colors">Luxury SUVs</Link></li>
            <li><Link to="/cars?category=Luxury" className="hover:text-accent-blue transition-colors">Luxury Sedans</Link></li>
            <li><Link to="/compare" className="hover:text-accent-blue transition-colors">Compare Cars</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div className="space-y-3">
          <h4 className="font-display text-[10px] font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest">Company</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/about" className="hover:text-accent-blue transition-colors">About Us</Link></li>
            <li><Link to="/reviews" className="hover:text-accent-blue transition-colors">Reviews</Link></li>
            <li><Link to="/blog" className="hover:text-accent-blue transition-colors">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-accent-blue transition-colors">Contact</Link></li>
            <li><Link to="/referrals" className="hover:text-accent-blue transition-colors">Referral Program</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-3">
          <h4 className="font-display text-[10px] font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest">Support</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/verify-id" className="hover:text-accent-blue transition-colors">ID Verification</Link></li>
            <li><Link to="/insurance" className="hover:text-accent-blue transition-colors">Insurance Options</Link></li>
            <li><Link to="/damage-report" className="hover:text-accent-blue transition-colors">Damage Report</Link></li>
            <li><Link to="/background-check" className="hover:text-accent-blue transition-colors">Background Check</Link></li>
            <li><Link to="/track-booking" className="hover:text-accent-blue transition-colors">Track Booking</Link></li>
            <li><Link to="/privacy" className="hover:text-accent-blue transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-accent-blue transition-colors">Terms of Service</Link></li>
          </ul>
          <div className="pt-2 space-y-2">
            <h4 className="font-display text-[10px] font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest">Newsletter</h4>
            {subscribed ? <div className="text-xs text-accent-blue">✓ Subscribed.</div> : (
              <form onSubmit={handleSubscribe} className="flex border border-neutral-200 dark:border-neutral-700 focus-within:border-accent-blue transition-colors rounded-lg overflow-hidden">
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email"
                  className="w-full bg-white dark:bg-neutral-800 text-xs text-neutral-800 dark:text-neutral-200 px-3 py-2 outline-none font-sans" />
                <button type="submit" className="px-3 border-l border-neutral-200 dark:border-neutral-700 hover:text-accent-blue hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"><ArrowRight size={14} /></button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-neutral-200/60 dark:border-neutral-700/60 pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-neutral-400 dark:text-neutral-500 gap-3">
        <div className="flex flex-wrap items-center gap-4 justify-center">
          <span>&copy; {new Date().getFullYear()} Apex Ride. All rights reserved.</span>
          <span className="flex items-center gap-1">Architected with <Heart size={10} className="text-red-400 fill-red-400" /> by <Link to="/developer" className="hover:text-accent-amber transition-colors font-medium">Salah Uddin Kader</Link></span>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/terms" className="hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">Terms</Link>
          <Link to="/privacy" className="hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">Privacy</Link>
          <Link to="/cookies" className="hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">Cookies</Link>
          <Link to="/refund" className="hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">Refund</Link>
          <Link to="/security" className="hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">Security</Link>
        </div>
      </div>
    </footer>
  );
};
