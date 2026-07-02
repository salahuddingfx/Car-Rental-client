import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Copy, CheckCircle, Users, ArrowRight, Share2 } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { useToastStore } from '../store/useToastStore';
import { useStore } from '../store/useStore';

const referralHistory = [
  { name: 'Sarah K.', status: 'Completed', earned: 500, date: '2026-06-15' },
  { name: 'Mike R.', status: 'Pending', earned: 0, date: '2026-06-28' },
  { name: 'Fatima A.', status: 'Completed', earned: 500, date: '2026-06-10' },
];

export const ReferralProgram: React.FC = () => {
  const { user } = useStore();
  const { addToast } = useToastStore();
  const [copied, setCopied] = useState(false);

  const referralCode = `APEX-${(user?.name || 'USER').slice(0, 3).toUpperCase()}-2026`;
  const referralLink = `https://apexride.com/signup?ref=${referralCode}`;

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    addToast('Referral code copied!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const totalEarned = referralHistory.filter(r => r.status === 'Completed').reduce((sum, r) => sum + r.earned, 0);

  return (
    <div className="pt-24 pb-20 bg-light-bg dark:bg-neutral-950 min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        <Breadcrumbs items={[{ label: 'My Dashboard', href: '/dashboard' }, { label: 'Referral Program' }]} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="w-16 h-16 bg-pink-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Gift size={28} className="text-pink-500" />
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-2">Referral Program</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Invite friends and earn ৳500 for each successful referral</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Referred', value: referralHistory.length, icon: Users },
            { label: 'Completed', value: referralHistory.filter(r => r.status === 'Completed').length, icon: CheckCircle },
            { label: 'Total Earned', value: `৳${totalEarned}`, icon: Gift },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-2xl p-4 text-center shadow-sm">
              <stat.icon size={18} className="text-pink-500 mx-auto mb-1" />
              <p className="text-xl font-bold text-neutral-900 dark:text-neutral-100 font-display">{stat.value}</p>
              <p className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Referral Code */}
        <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-6 mb-8 text-white">
          <h3 className="font-display text-xs font-bold uppercase tracking-widest mb-3 opacity-80">Your Referral Code</h3>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 text-center">
              <span className="text-2xl font-bold font-display tracking-wider">{referralCode}</span>
            </div>
            <button onClick={copyCode}
              className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors cursor-pointer">
              {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
            </button>
          </div>
          <div className="flex gap-2">
            <a href={`https://wa.me/?text=${encodeURIComponent(`Join Apex Ride with my referral code: ${referralCode}\n${referralLink}`)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 py-2.5 rounded-xl text-xs font-bold transition-colors">
              <Share2 size={14} /> Share WhatsApp
            </a>
            <button onClick={() => { navigator.clipboard.writeText(referralLink); addToast('Link copied!', 'success'); }}
              className="flex-1 flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer">
              <Copy size={14} /> Copy Link
            </button>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-2xl p-6 mb-8 shadow-sm">
          <h3 className="font-display text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-4">How It Works</h3>
          <div className="space-y-4">
            {[
              { step: '1', title: 'Share Your Code', desc: 'Send your referral code to friends and family' },
              { step: '2', title: 'Friend Signs Up', desc: 'They register using your referral code' },
              { step: '3', title: 'They Book a Car', desc: 'Your friend completes their first rental' },
              { step: '4', title: 'You Earn ৳500', desc: 'Credit is added to your account balance' },
            ].map((item, i) => (
              <div key={item.step} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-pink-100 dark:bg-pink-950/30 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-pink-600">{item.step}</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">{item.title}</p>
                  <p className="text-[10px] text-neutral-500 dark:text-neutral-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Referral History */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
          <h3 className="font-display text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-4">Referral History</h3>
          {referralHistory.length === 0 ? (
            <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center py-4">No referrals yet. Share your code!</p>
          ) : (
            <div className="space-y-2">
              {referralHistory.map((r, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-950/30 flex items-center justify-center">
                      <Users size={14} className="text-pink-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">{r.name}</p>
                      <p className="text-[10px] text-neutral-500 dark:text-neutral-400">{r.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${r.status === 'Completed' ? 'bg-green-100 text-green-600 dark:bg-green-950/30 dark:text-green-400' : 'bg-amber-100 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400'}`}>
                      {r.status}
                    </span>
                    {r.earned > 0 && <p className="text-xs font-bold text-green-600 dark:text-green-400 mt-0.5">+৳{r.earned}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
