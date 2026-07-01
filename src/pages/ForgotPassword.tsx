import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { CssWave } from '../components/CssWave';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-neutral-900 relative overflow-hidden px-6">
      <CssWave />
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-4">
          <Breadcrumbs items={[{ label: 'Login', href: '/auth' }, { label: 'Forgot Password' }]} />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-200/60 dark:border-neutral-700/60 shadow-sm p-8 rounded-xl">
            {!sent ? (
              <>
                <div className="text-center mb-7">
                  <div className="w-14 h-14 bg-accent-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Mail size={24} className="text-accent-blue" />
                  </div>
                  <h2 className="font-display text-xl font-extrabold uppercase text-neutral-900 dark:text-neutral-100 mb-1">
                    Reset Password
                  </h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Enter your email and we'll send you a reset link
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] text-neutral-400 dark:text-neutral-500 font-display uppercase tracking-widest mb-1.5 block">Email Address</label>
                    <div className="flex items-center border border-neutral-200 dark:border-neutral-700 p-3 bg-white dark:bg-neutral-800 rounded-lg focus-within:border-accent-blue transition-colors">
                      <Mail size={15} className="text-neutral-400 dark:text-neutral-500 mr-2 shrink-0" />
                      <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required autoFocus
                        className="bg-transparent text-sm text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-500 outline-none w-full font-sans" />
                    </div>
                  </div>

                  <Button type="submit" variant="primary" className="w-full rounded-lg" isLoading={loading}>
                    Send Reset Link <ArrowRight size={15} />
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={28} className="text-green-600" />
                </div>
                <h2 className="font-display text-xl font-extrabold uppercase text-neutral-900 dark:text-neutral-100 mb-2">
                  Check Your Email
                </h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                  We've sent a password reset link to<br />
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">{email}</span>
                </p>
                <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mb-6">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
                <Button variant="primary" className="w-full rounded-lg" onClick={() => navigate('/auth')}>
                  Back to Sign In
                </Button>
              </div>
            )}

            <div className="mt-6 text-center">
              <button onClick={() => navigate('/auth')} className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white flex items-center gap-1.5 mx-auto cursor-pointer transition-colors">
                <ArrowLeft size={12} /> Back to Sign In
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
