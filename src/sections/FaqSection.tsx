import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  { q: 'What documents do I need to rent a car in Bangladesh?', a: 'A valid Bangladesh driving license (or international driving permit for foreigners), national ID or passport, and a credit card. For chauffeur-driven rentals, only a valid ID is required.' },
  { q: 'Do you offer chauffeur-driven cars?', a: 'Yes. All vehicles can be booked with a professional English-speaking chauffeur, recommended for navigating Dhaka traffic. Self-drive is also available.' },
  { q: 'Which cities do you cover?', a: 'Dhaka, Chattogram, Sylhet, Cox\'s Bazar, Gazipur, and Khulna. Airport pickup available at Hazrat Shahjalal (DAC) and Shah Amanat (CGP).' },
  { q: 'What payment methods do you accept?', a: 'bKash, Nagad, credit/debit cards (Visa, Mastercard), and bank transfers. Full payment at booking. Security deposit held on card.' },
  { q: 'Can I book a car for a few hours?', a: 'Yes. Hourly rentals with a 3-hour minimum. Perfect for airport transfers, business meetings, or wedding events.' },
  { q: 'What is your fuel and mileage policy?', a: 'Like-for-like fuel policy. Self-drive includes 100 km/day; extra km charged nominally. Chauffeur-driven has unlimited city mileage.' },
];

export const FaqSection: React.FC = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative py-20 z-10 bg-white dark:bg-neutral-900">
      <div className="max-w-3xl mx-auto px-6 space-y-10">
        <div className="text-center space-y-1">
          <HelpCircle className="text-accent-amber mx-auto" size={22} />
          <h2 className="font-display text-2xl font-extrabold uppercase text-neutral-900">Frequently Asked</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const open = active === i;
            return (
              <div key={faq.q} className={`border border-neutral-200 bg-white transition-colors overflow-hidden rounded-xl shadow-sm ${open ? 'border-accent-amber/30' : 'hover:bg-amber-50/20'}`}>
                <button onClick={() => setActive(open ? null : i)}
                  className="w-full p-5 text-left flex justify-between items-center text-neutral-800 font-bold text-sm cursor-pointer group"
                >
                  <span className="group-hover:text-accent-amber transition-colors">{faq.q}</span>
                  <ChevronDown size={16} className={`text-neutral-400 transition-transform duration-300 shrink-0 ml-3 ${open ? 'rotate-180 text-accent-amber' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                      <div className="px-5 pb-5 text-sm text-neutral-500 leading-relaxed border-t border-neutral-100 pt-3.5">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
