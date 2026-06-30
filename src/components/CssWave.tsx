import React from 'react';

export const CssWave: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[200%] h-48 opacity-[0.07]"
        style={{
          background: 'repeating-linear-gradient(90deg, transparent, transparent 40px, #2563eb 40px, #2563eb 42px)',
          animation: 'wave-anim 6s ease-in-out infinite',
        }}
      />
      <div className="absolute bottom-4 left-0 w-[200%] h-32 opacity-[0.05]"
        style={{
          background: 'repeating-linear-gradient(90deg, transparent, transparent 60px, #2563eb 60px, #2563eb 62px)',
          animation: 'wave-anim-2 8s ease-in-out infinite',
        }}
      />
      <div className="absolute bottom-0 left-0 w-full h-40"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(37,99,235,0.03) 100%)',
        }}
      />
      <svg className="absolute bottom-0 left-0 w-full h-32" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <defs>
          <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.06" />
            <stop offset="50%" stopColor="#2563eb" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.06" />
          </linearGradient>
        </defs>
        <path fill="url(#wave-grad)"
          d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z">
          <animate attributeName="d" dur="8s" repeatCount="indefinite"
            values="
              M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z;
              M0,80 C240,30 480,90 720,50 C960,10 1200,80 1440,60 L1440,120 L0,120 Z;
              M0,40 C240,90 480,10 720,70 C960,100 1200,30 1440,60 L1440,120 L0,120 Z;
              M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z
            " />
        </path>
      </svg>
    </div>
  );
};
