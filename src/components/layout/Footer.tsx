import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Play, MessageCircle, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => { e.preventDefault(); if (email.trim()) { setSubscribed(true); setEmail(''); } };

  return (
    <footer className="bg-white dark:bg-neutral-900 border-t border-neutral-200/60 dark:border-neutral-700/60 pt-16 pb-8 text-neutral-500 dark:text-neutral-400 relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12">
        <div className="lg:col-span-2 space-y-5">
          <Link to="/" className="font-display font-bold text-xl tracking-widest text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
            <span className="text-accent-amber font-extrabold text-2xl">A</span>pex Ride
          </Link>
          <p className="text-sm leading-relaxed max-w-sm">Experience the pinnacle of automotive engineering and modern luxury across Bangladesh. Premium hypercars, sports coupés, and electric tourers for discerning drivers.</p>
          <div className="flex gap-3">
            {[Globe, Play, MessageCircle].map((Icon, i) => (
              <a key={i} href="#" className="p-2 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors bg-neutral-50 dark:bg-neutral-800 rounded-lg"><Icon size={15} /></a>
            ))}
          </div>
        </div>
        {[
          { title: 'Explore', links: [
            { to: '/cars', label: 'All Vehicles' },
            { to: '/cars?category=Electric', label: 'Electric Collection' },
            { to: '/cars?category=Supercar', label: 'Supercars' },
            { to: '/cars?category=SUV', label: 'Luxury SUVs' },
          ]},
          { title: 'Company', links: [
            { to: '/about', label: 'About Us' },
            { to: '/contact', label: 'Contact' },
            { to: '/developer', label: 'Developer' },
            { to: '/privacy', label: 'Privacy Policy' },
            { to: '/terms', label: 'Terms of Service' },
          ]},
        ].map(col => (
          <div key={col.title} className="space-y-3">
            <h4 className="font-display text-[10px] font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest">{col.title}</h4>
            <ul className="space-y-1.5 text-xs">{col.links.map(l => (
              <li key={l.label}><Link to={l.to} className="hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">{l.label}</Link></li>
            ))}</ul>
          </div>
        ))}
        <div className="space-y-3">
          <h4 className="font-display text-[10px] font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest">Newsletter</h4>
          <p className="text-xs leading-normal">Subscribe for priority access to new model additions and events.</p>
          {subscribed ? <div className="text-xs text-accent-blue">✓ Access granted.</div> : (
            <form onSubmit={handleSubscribe} className="flex border border-neutral-200 dark:border-neutral-700 focus-within:border-accent-blue transition-colors rounded-lg overflow-hidden">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="EMAIL"
                className="w-full bg-neutral-50 dark:bg-neutral-800 text-[10px] uppercase text-neutral-800 dark:text-neutral-200 px-3 py-2 outline-none font-sans" />
              <button type="submit" className="px-3 border-l border-neutral-200 dark:border-neutral-700 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"><ArrowRight size={14} /></button>
            </form>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 border-t border-neutral-200/60 dark:border-neutral-700/60 pt-6 mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 gap-3">
        <div>© {new Date().getFullYear()} Apex Ride. All rights reserved.</div>
        <div className="flex gap-5">
          <Link to="/terms" className="hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">Terms of Service</Link>
          <Link to="/privacy" className="hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">Privacy Policy</Link>
          <Link to="/cookies" className="hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">Cookie Policy</Link>
          <Link to="/refund" className="hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">Refund Policy</Link>
          <Link to="/security" className="hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">Security</Link>
        </div>
      </div>
    </footer>
  );
};