import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Check, Zap, Crown, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { useToastStore } from '../store/useToastStore';

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    period: 'Free',
    icon: Shield,
    color: 'neutral',
    features: [
      'Third-party liability coverage',
      'Basic accident coverage',
      'Roadside assistance',
      '24/7 helpline',
    ],
    excluded: ['Personal accident cover', 'Zero deductible', 'Tyre & windshield'],
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 299,
    period: '/ trip',
    icon: Zap,
    color: 'blue',
    popular: true,
    features: [
      'Everything in Basic',
      'Personal accident cover (৳5,00,000)',
      'Zero deductible on collision',
      'Engine protection',
      'Key lockout assistance',
    ],
    excluded: ['Tyre & windshield', 'Natural disaster cover'],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 599,
    period: '/ trip',
    icon: Crown,
    color: 'amber',
    features: [
      'Everything in Standard',
      'Tyre & windshield protection',
      'Natural disaster cover',
      'Trip cancellation cover',
      'Lost key replacement',
      'VIP roadside assistance',
    ],
    excluded: [],
  },
];

export const InsuranceOptions: React.FC = () => {
  const [selected, setSelected] = useState('standard');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToastStore();

  const handleSelect = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addToast(`${plans.find(p => p.id === selected)?.name} insurance added!`, 'success');
    }, 800);
  };

  return (
    <div className="pt-24 pb-20 bg-light-bg dark:bg-neutral-950 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <Breadcrumbs items={[{ label: 'My Dashboard', href: '/dashboard' }, { label: 'Insurance' }]} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="w-16 h-16 bg-accent-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield size={28} className="text-accent-blue" />
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-2">Insurance Options</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Protect your trip with the right coverage plan</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <motion.div key={plan.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              onClick={() => setSelected(plan.id)}
              className={`relative bg-white dark:bg-neutral-900 border-2 rounded-2xl p-6 cursor-pointer transition-all shadow-sm hover:shadow-lg ${
                selected === plan.id
                  ? plan.color === 'amber' ? 'border-accent-amber shadow-accent-amber/10' : 'border-accent-blue shadow-accent-blue/10'
                  : 'border-neutral-200/60 dark:border-neutral-800'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-blue text-white text-[9px] font-display font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <div className="text-center mb-5">
                <plan.icon size={24} className={`mx-auto mb-2 ${plan.color === 'amber' ? 'text-accent-amber' : plan.color === 'blue' ? 'text-accent-blue' : 'text-neutral-500'}`} />
                <h3 className="font-display text-sm font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">{plan.name}</h3>
                <div className="mt-2">
                  <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 font-display">
                    {plan.price === 0 ? 'Free' : `৳${plan.price}`}
                  </span>
                  {plan.price > 0 && <span className="text-xs text-neutral-500 dark:text-neutral-400 ml-1">{plan.period}</span>}
                </div>
              </div>

              <ul className="space-y-2.5 mb-5">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                    <Check size={13} className="text-green-500 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
                {plan.excluded.map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-neutral-400 dark:text-neutral-500 line-through">
                    <span className="w-3 h-3 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className={`w-full h-1 rounded-full ${selected === plan.id ? (plan.color === 'amber' ? 'bg-accent-amber' : 'bg-accent-blue') : 'bg-neutral-100 dark:bg-neutral-800'}`} />
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="primary" className="rounded-xl px-8" isLoading={loading} onClick={handleSelect}>
            Select {plans.find(p => p.id === selected)?.name} Plan <ArrowRight size={15} />
          </Button>
          <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-3">
            Insurance can be added at checkout or during your trip. Coverage is per rental period.
          </p>
        </div>
      </div>
    </div>
  );
};
