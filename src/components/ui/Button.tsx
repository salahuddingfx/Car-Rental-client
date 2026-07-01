import React, { forwardRef, useRef } from 'react';
import { motion } from 'framer-motion';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  magnetic?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  magnetic = false,
  ...props
}, ref) => {
  const localRef = useRef<HTMLButtonElement>(null);
  const activeRef = (ref || localRef) as React.RefObject<HTMLButtonElement | null>;

  const baseStyles = 'relative inline-flex items-center justify-center font-display uppercase tracking-wider font-semibold overflow-hidden transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue/50 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
  
  const variants = {
    primary: 'bg-accent-blue text-white hover:bg-accent-blue-hover shadow-lg shadow-accent-blue/20 border border-accent-blue',
    secondary: 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 border border-neutral-700 dark:border-neutral-300',
    glass: 'bg-white/70 dark:bg-neutral-800/70 text-neutral-800 dark:text-neutral-200 hover:bg-white dark:hover:bg-neutral-700 border border-neutral-200/60 dark:border-neutral-600/60 shadow-sm backdrop-blur-sm',
    outline: 'bg-transparent text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 hover:border-accent-amber/50 hover:text-accent-amber hover:bg-accent-amber/5',
    ghost: 'bg-transparent text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
  };

  const sizes = {
    sm: 'text-xs px-4 py-2 h-9',
    md: 'text-sm px-6 py-3 h-12',
    lg: 'text-base px-8 py-4 h-14'
  };

  const content = (
    <span className="relative z-10 flex items-center justify-center gap-2">
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : null}
      {children}
    </span>
  );

  const hoverEffect = variant === 'primary' || variant === 'secondary' ? (
    <motion.span 
      className={`absolute inset-0 z-0 bg-white/20 origin-left`}
      initial={{ scaleX: 0 }}
      whileHover={{ scaleX: 1 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    />
  ) : null;

  if (magnetic && !isLoading) {
    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      const btn = activeRef.current;
      if (!btn) return;
      
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    };

    const handleMouseLeave = () => {
      const btn = activeRef.current;
      if (!btn) return;
      btn.style.transform = '';
    };

    return (
      <button
        ref={activeRef}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {hoverEffect}
        {content}
      </button>
    );
  }

  return (
    <button
      ref={activeRef}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {hoverEffect}
      {content}
    </button>
  );
});

Button.displayName = 'Button';
