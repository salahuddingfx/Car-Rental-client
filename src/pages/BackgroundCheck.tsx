import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileSearch, CheckCircle, Upload, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { useToastStore } from '../store/useToastStore';

export const BackgroundCheck: React.FC = () => {
  const { addToast } = useToastStore();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); addToast('Background check request submitted!', 'success'); }, 1500);
  };

  return (
    <div className="pt-24 pb-20 bg-light-bg dark:bg-neutral-950 min-h-screen">
      <div className="max-w-2xl mx-auto px-6">
        <Breadcrumbs items={[{ label: 'My Dashboard', href: '/dashboard' }, { label: 'Background Check' }]} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FileSearch size={28} className="text-purple-500" />
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-2">Background Check</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Build trust with renters by verifying your background</p>
        </motion.div>

        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-2xl p-8 shadow-sm text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-950/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-green-500" />
            </div>
            <h3 className="font-display text-lg font-bold text-neutral-800 dark:text-neutral-200 mb-2">Request Submitted</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">Background check typically takes 3-5 business days.</p>
            <Button variant="outline" className="rounded-xl" onClick={() => window.location.href = '/dashboard'}>Back to Dashboard</Button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
              <h3 className="font-display text-sm font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-4">What We Check</h3>
              <div className="space-y-3">
                {[
                  { title: 'Criminal Record', desc: 'National database search for any criminal history' },
                  { title: 'Identity Verification', desc: 'Cross-reference with government ID databases' },
                  { title: 'Driving History', desc: 'Traffic violations, accidents, and license status' },
                  { title: 'Credit Check', desc: 'Basic creditworthiness assessment (soft check)' },
                ].map(item => (
                  <div key={item.title} className="flex items-start gap-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-950/30 flex items-center justify-center shrink-0 mt-0.5">
                      <FileSearch size={12} className="text-purple-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">{item.title}</p>
                      <p className="text-[10px] text-neutral-500 dark:text-neutral-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
              <h3 className="font-display text-sm font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-3">Required Documents</h3>
              <div className="space-y-2">
                {['Valid National ID or Passport', 'Driving License', 'Proof of Address (utility bill)'].map(doc => (
                  <label key={doc} className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                    <Upload size={14} className="text-neutral-400 dark:text-neutral-500" />
                    <span className="text-xs text-neutral-700 dark:text-neutral-300">{doc}</span>
                    <input type="file" className="hidden" accept=".pdf,.jpg,.png" />
                  </label>
                ))}
              </div>
            </div>

            <Button variant="primary" className="w-full rounded-xl" isLoading={loading} onClick={handleSubmit}>
              Request Background Check <ArrowRight size={15} />
            </Button>
            <p className="text-[10px] text-neutral-400 dark:text-neutral-500 text-center">
              Free for verified hosts. Takes 3-5 business days.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
