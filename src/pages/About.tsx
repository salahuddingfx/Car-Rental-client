import { motion } from 'framer-motion';
import { Shield, Users, Car, Award } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';

const stats = [
  { icon: Car, label: 'Vehicles', value: '50+' },
  { icon: Users, label: 'Happy Clients', value: '2,000+' },
  { icon: Award, label: 'Years Experience', value: '8+' },
  { icon: Shield, label: 'Verified Hosts', value: '100%' },
];

const values = [
  {
    title: 'Quality Assurance',
    desc: 'Every vehicle in our fleet undergoes rigorous inspection and maintenance. We partner only with verified hosts who meet our premium standards.',
  },
  {
    title: 'Transparent Pricing',
    desc: 'No hidden fees or surprises. Our pricing is clear from the start, with all taxes and fees shown before you confirm your booking.',
  },
  {
    title: 'Client Support',
    desc: 'Our support team is available around the clock to assist with bookings, roadside assistance, and any questions during your rental.',
  },
  {
    title: 'Seamless Experience',
    desc: 'From browsing to booking to pickup, we have designed every step of the journey to be intuitive and hassle-free.',
  },
];

export const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-light-bg to-white dark:from-neutral-950 dark:to-neutral-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Breadcrumbs items={[{ label: 'About Us' }]} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-display text-[10px] tracking-[0.25em] text-accent-blue uppercase font-bold mb-4">About Apex Ride</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight mb-4">
            Redefining the Car Rental Experience
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
            Apex Ride connects discerning drivers with premium vehicles from trusted hosts. 
            We believe every journey deserves a vehicle that matches your standards — whether 
            for business, leisure, or the open road.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-20">
          {stats.map((s) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 shadow-sm p-6 rounded-2xl text-center">
              <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center mx-auto mb-3">
                <s.icon size={22} className="text-accent-blue" />
              </div>
              <p className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 font-display">{s.value}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-display uppercase tracking-wider mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="font-display text-xl font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-widest text-center mb-10">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 shadow-sm p-6 rounded-2xl">
                <h3 className="font-display text-sm font-bold text-neutral-800 dark:text-neutral-200 mb-2">{v.title}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center bg-neutral-900 dark:bg-neutral-100 rounded-2xl p-10 sm:p-14">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white dark:text-neutral-900 mb-3">Ready to hit the road?</h2>
          <p className="text-neutral-400 dark:text-neutral-600 text-sm mb-6 max-w-lg mx-auto">Browse our collection of premium vehicles and find the perfect ride for your next journey.</p>
          <a href="/cars" className="inline-block px-8 py-3 bg-accent-blue text-white text-sm font-bold rounded-xl hover:bg-accent-blue-hover transition-colors">
            Explore Fleet
          </a>
        </motion.div>
      </div>
    </div>
  );
};
