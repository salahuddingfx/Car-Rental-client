import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useToastStore } from '../store/useToastStore';
import { Button } from '../components/ui/Button';
import { CssWave } from '../components/CssWave';
import { Breadcrumbs } from '../components/Breadcrumbs';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface AuthErrors {
  email?: string;
  password?: string;
  name?: string;
}

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { login, register, user } = useStore();
  const { addToast } = useToastStore();

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('demo@apexride.com');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<AuthErrors>({});
  const [touched, setTouched] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [registered, setRegistered] = useState(false);

  const validate = (): AuthErrors => {
    const errs: AuthErrors = {};
    if (!emailRegex.test(email)) errs.email = 'Please enter a valid email';
    if (password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (!isLogin && !name.trim()) errs.name = 'Name is required';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);

    if (isLogin) {
      const success = await login(email, password);
      if (success) {
        const currentUser = useStore.getState().user;
        if (currentUser && !currentUser.drivingLicense) {
          setTimeout(() => addToast('Welcome back! Please complete your profile for a smoother experience.', 'info'), 500);
        }
        navigate('/dashboard');
      } else {
        setErrors({ email: 'Invalid credentials or server unavailable' });
      }
    } else {
      const success = await register(name, email, password);
      if (success) {
        setRegistered(true);
      } else {
        setErrors({ email: 'Registration failed. Email may already be taken.' });
      }
    }
    setLoading(false);
  };

  const handleBlur = () => {
    setTouched(true);
    setErrors(validate());
  };

  if (registered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-neutral-900 relative overflow-hidden px-6 pt-24 pb-20">
        <CssWave />
        <div className="relative z-10 w-full max-w-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-200/60 dark:border-neutral-700/60 shadow-sm p-8 rounded-xl text-center">
              <div className="w-16 h-16 rounded-2xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h2 className="font-display text-xl font-extrabold uppercase text-neutral-900 dark:text-neutral-100 mb-2">Verify Your Account</h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                We've sent a verification link to <span className="font-semibold text-neutral-700 dark:text-neutral-300">{email}</span>
              </p>
              <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-6">
                Please check your inbox and click the verification link to activate your account. Then sign in to continue.
              </p>
              <Button variant="primary" className="w-full rounded-lg" onClick={() => { setRegistered(false); setIsLogin(true); setEmail(email); }}>
                <ArrowRight size={15} className="mr-1" /> Go to Sign In
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-neutral-900 relative overflow-hidden px-6 pt-24 pb-20">
      <CssWave />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-4">
          <Breadcrumbs items={[{ label: 'Login' }]} />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-200/60 dark:border-neutral-700/60 shadow-sm p-8 rounded-xl">
          <div className="text-center mb-7">
            <h2 className="font-display text-xl font-extrabold uppercase text-neutral-900 dark:text-neutral-100 mb-1">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {isLogin ? 'Access your Apex Ride portal' : 'Join Bangladesh\'s premium car rental'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-[10px] text-neutral-400 dark:text-neutral-500 font-display uppercase tracking-widest mb-1.5 block">Full Name</label>
                <div className="flex items-center border border-neutral-200 dark:border-neutral-700 p-3 bg-white dark:bg-neutral-800 rounded-lg focus-within:border-accent-blue transition-colors">
                  <User size={15} className="text-neutral-400 dark:text-neutral-500 mr-2 shrink-0" />
                  <input type="text" placeholder="Your name" value={name} onChange={(e) => { setName(e.target.value); if (touched) setErrors(validate()); }}
                    onBlur={handleBlur}
                    className="bg-transparent text-sm text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-500 outline-none w-full font-sans" />
                </div>
                {errors.name && <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>}
              </div>
            )}

            <div>
              <label className="text-[10px] text-neutral-400 dark:text-neutral-500 font-display uppercase tracking-widest mb-1.5 block">Email</label>
              <div className="flex items-center border border-neutral-200 dark:border-neutral-700 p-3 bg-white dark:bg-neutral-800 rounded-lg focus-within:border-accent-blue transition-colors">
                <Mail size={15} className="text-neutral-400 dark:text-neutral-500 mr-2 shrink-0" />
                <input type="email" placeholder="your@email.com" value={email} onChange={(e) => { setEmail(e.target.value); if (touched) setErrors(validate()); }}
                  onBlur={handleBlur}
                  className="bg-transparent text-sm text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-500 outline-none w-full font-sans" />
              </div>
              {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="text-[10px] text-neutral-400 dark:text-neutral-500 font-display uppercase tracking-widest mb-1.5 block">Password</label>
              <div className="flex items-center border border-neutral-200 dark:border-neutral-700 p-3 bg-white dark:bg-neutral-800 rounded-lg focus-within:border-accent-blue transition-colors">
                <Lock size={15} className="text-neutral-400 dark:text-neutral-500 mr-2 shrink-0" />
                <input type={showPw ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={(e) => { setPassword(e.target.value); if (touched) setErrors(validate()); }}
                  onBlur={handleBlur}
                  className="bg-transparent text-sm text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-500 outline-none w-full font-sans" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 cursor-pointer shrink-0">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <p className="text-[10px] text-red-500 mt-1">{errors.password}</p>}
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-600 text-accent-blue focus:ring-accent-blue/50 cursor-pointer" />
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">Remember me</span>
                </label>
                <button type="button" onClick={() => navigate('/forgot-password')} className="text-[11px] text-accent-blue hover:text-accent-blue-hover transition-colors cursor-pointer">Forgot password?</button>
              </div>
            )}

            <Button type="submit" variant="primary" className="w-full rounded-lg" isLoading={loading}>
              {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={15} />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button onClick={() => { setIsLogin(!isLogin); setErrors({}); }} className="text-accent-blue hover:text-accent-blue-hover font-semibold cursor-pointer transition-colors">
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-700">
            <p className="text-[10px] text-neutral-400 dark:text-neutral-500 text-center mb-3">Or continue with</p>
            <div className="flex gap-3">
              <button type="button" onClick={() => { setLoading(true); login('demo@apexride.com', 'password').then(() => { navigate('/dashboard'); setLoading(false); }); }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 border-2 border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 rounded-lg hover:border-neutral-300 dark:hover:border-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-700 active:scale-[0.98] transition-all duration-150 cursor-pointer shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">Google</span>
              </button>
              <button type="button" onClick={() => { setLoading(true); login('demo@apexride.com', 'password').then(() => { navigate('/dashboard'); setLoading(false); }); }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 border-2 border-[#1877F2]/30 bg-[#1877F2]/5 dark:bg-[#1877F2]/10 rounded-lg hover:border-[#1877F2]/50 hover:bg-[#1877F2]/10 dark:hover:bg-[#1877F2]/15 active:scale-[0.98] transition-all duration-150 cursor-pointer shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                <span className="text-sm font-semibold text-[#1877F2]">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  );
};
