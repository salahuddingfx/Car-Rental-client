import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
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
  const { login } = useStore();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('demo@apexride.com');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<AuthErrors>({});
  const [touched, setTouched] = useState(false);

  const validate = (): AuthErrors => {
    const errs: AuthErrors = {};
    if (!emailRegex.test(email)) errs.email = 'Please enter a valid email';
    if (password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (!isLogin && !name.trim()) errs.name = 'Name is required';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    setTimeout(() => {
      login(email);
      navigate('/');
      setLoading(false);
    }, 800);
  };

  const handleBlur = () => {
    setTouched(true);
    setErrors(validate());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg relative overflow-hidden px-6">
      <CssWave />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-4">
          <Breadcrumbs items={[{ label: 'Sign In' }]} />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="bg-white/90 backdrop-blur-md border border-neutral-200/60 shadow-sm p-8 rounded-xl">
          <div className="text-center mb-7">
            <h2 className="font-display text-xl font-extrabold uppercase text-neutral-900 mb-1">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-xs text-neutral-500">
              {isLogin ? 'Access your Apex Ride portal' : 'Join Bangladesh\'s premium car rental'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1.5 block">Full Name</label>
                <div className="flex items-center border border-neutral-200 p-3 bg-white rounded-lg focus-within:border-accent-blue transition-colors">
                  <User size={15} className="text-neutral-400 mr-2 shrink-0" />
                  <input type="text" placeholder="Your name" value={name} onChange={(e) => { setName(e.target.value); if (touched) setErrors(validate()); }}
                    onBlur={handleBlur}
                    className="bg-transparent text-sm text-neutral-800 placeholder-neutral-400 outline-none w-full font-sans" />
                </div>
                {errors.name && <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>}
              </div>
            )}

            <div>
              <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1.5 block">Email</label>
              <div className="flex items-center border border-neutral-200 p-3 bg-white rounded-lg focus-within:border-accent-blue transition-colors">
                <Mail size={15} className="text-neutral-400 mr-2 shrink-0" />
                <input type="email" placeholder="your@email.com" value={email} onChange={(e) => { setEmail(e.target.value); if (touched) setErrors(validate()); }}
                  onBlur={handleBlur}
                  className="bg-transparent text-sm text-neutral-800 placeholder-neutral-400 outline-none w-full font-sans" />
              </div>
              {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1.5 block">Password</label>
              <div className="flex items-center border border-neutral-200 p-3 bg-white rounded-lg focus-within:border-accent-blue transition-colors">
                <Lock size={15} className="text-neutral-400 mr-2 shrink-0" />
                <input type={showPw ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={(e) => { setPassword(e.target.value); if (touched) setErrors(validate()); }}
                  onBlur={handleBlur}
                  className="bg-transparent text-sm text-neutral-800 placeholder-neutral-400 outline-none w-full font-sans" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="text-neutral-400 hover:text-neutral-600 cursor-pointer shrink-0">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <p className="text-[10px] text-red-500 mt-1">{errors.password}</p>}
            </div>

            {isLogin && (
              <div className="text-right">
                <button type="button" className="text-[11px] text-accent-blue hover:text-accent-blue-hover transition-colors cursor-pointer">Forgot password?</button>
              </div>
            )}

            <Button type="submit" variant="primary" className="w-full rounded-lg" isLoading={loading} disabled={Object.keys(validate()).length > 0}>
              {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={15} />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-neutral-500">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button onClick={() => setIsLogin(!isLogin)} className="text-accent-blue hover:text-accent-blue-hover font-semibold cursor-pointer transition-colors">
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-neutral-100">
            <p className="text-[10px] text-neutral-400 text-center">
              Demo: click Sign In with the pre-filled email
            </p>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  );
};
