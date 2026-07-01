import React from 'react';
import { motion } from 'framer-motion';
import { Award, Compass, Shield, Clock } from 'lucide-react';

const features = [
  { icon: Award, title: 'Premium Fleet, Guaranteed', desc: 'Every vehicle is track-validated, professionally detailed, and exactly what you booked. No substitutes. No compromises.' },
  { icon: Compass, title: 'All Over Bangladesh', desc: 'Serving Dhaka, Chattogram, Sylhet, Cox\'s Bazar, Gazipur & Khulna. Airport pickup at Hazrat Shahjalal & Shah Amanat.' },
  { icon: Shield, title: 'Insured & Verified', desc: 'Comprehensive liability cover, 24/7 roadside assistance, and fully vetted chauffeurs with clean records.' },
  { icon: Clock, title: 'Flexible Hourly Rentals', desc: 'Book by the hour, day, or week. Perfect for business meetings, weddings, airport transfers, or weekend getaways.' },
];

const stats = [
  { label: 'Cities Covered', value: '6' },
  { label: 'Happy Clients', value: '2,400+' },
  { label: 'Cars Available', value: '120+' },
  { label: 'Avg. Rating', value: '4.9' },
];

export const WhyChooseUsSection: React.FC = () => (
  <section className="relative py-20 border-t border-neutral-200/60 dark:border-neutral-700/60 z-10">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
      <div className="space-y-5">
        <p className="font-display text-[10px] tracking-widest text-accent-blue uppercase font-bold">Why Apex Ride</p>
        <h2 className="font-display text-3xl md:text-4xl font-extrabold uppercase text-neutral-900 dark:text-neutral-100 leading-tight">
          Luxury Mobility, Redefined for Bangladesh
        </h2>
        <p className="text-neutral-500 text-base leading-relaxed">
          We own and maintain every car in our fleet. No middlemen, no surprises. From traffic-savvy chauffeurs in Dhaka to self-drive tours in Cox's Bazar — we deliver a premium experience tailored to Bangladesh.
        </p>
        <div className="space-y-4 pt-2">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-4">
              <div className="p-2.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-accent-blue mt-0.5 rounded-lg shadow-sm shrink-0">
                <f.icon size={16} />
              </div>
              <div>
                <h4 className="text-neutral-800 dark:text-neutral-200 font-semibold text-sm mb-0.5">{f.title}</h4>
                <p className="text-sm text-neutral-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="p-7 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-amber-50/20 dark:hover:bg-neutral-750 hover:border-accent-amber/20 transition-all duration-300 flex flex-col justify-center items-center text-center h-36 rounded-xl shadow-sm"
          >
            <span className="text-3xl md:text-4xl font-bold text-accent-amber font-display">{s.value}</span>
            <span className="text-xs text-neutral-500 mt-1.5 uppercase tracking-wider font-medium">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
