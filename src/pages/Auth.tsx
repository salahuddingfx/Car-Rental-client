import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { CssWave } from '../components/CssWave';

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useStore();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('demo@aether.com');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email);
      navigate('/');
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg relative overflow-hidden px-6">
      <CssWave />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-md border border-neutral-200/60 shadow-sm p-8 rounded-xl">
          <div className="text-center mb-7">
            <h2 className="font-display text-xl font-extrabold uppercase text-neutral-900 mb-1">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-xs text-neutral-500">
              {isLogin ? 'Access your Aether portal' : 'Join Bangladesh\'s premium car rental'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1.5 block">Full Name</label>
                <div className="flex items-center border border-neutral-200 p-3 bg-white rounded-lg focus-within:border-accent-blue transition-colors">
                  <User size={15} className="text-neutral-400 mr-2 shrink-0" />
                  <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)}
                    className="bg-transparent text-sm text-neutral-800 placeholder-neutral-400 outline-none w-full font-sans" required />
                </div>
              </div>
            )}

            <div>
              <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1.5 block">Email</label>
              <div className="flex items-center border border-neutral-200 p-3 bg-white rounded-lg focus-within:border-accent-blue transition-colors">
                <Mail size={15} className="text-neutral-400 mr-2 shrink-0" />
                <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent text-sm text-neutral-800 placeholder-neutral-400 outline-none w-full font-sans" required />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1.5 block">Password</label>
              <div className="flex items-center border border-neutral-200 p-3 bg-white rounded-lg focus-within:border-accent-blue transition-colors">
                <Lock size={15} className="text-neutral-400 mr-2 shrink-0" />
                <input type={showPw ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent text-sm text-neutral-800 placeholder-neutral-400 outline-none w-full font-sans" required />
                <button type="button" onClick={() => setShowPw(!showPw)} className="text-neutral-400 hover:text-neutral-600 cursor-pointer shrink-0">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="text-right">
                <button type="button" className="text-[11px] text-accent-blue hover:text-accent-blue-hover transition-colors cursor-pointer">Forgot password?</button>
              </div>
            )}

            <Button type="submit" variant="primary" className="w-full rounded-lg" isLoading={loading}>
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
  );
};
