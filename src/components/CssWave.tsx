import React from 'react';

export const CssWave: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Top gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/10 via-transparent to-accent-amber/8" />

      {/* Large background wave 1 - blue */}
      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
        <defs>
          <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.10" />
          </linearGradient>
        </defs>
        <path fill="url(#wave1)"
          d="M0,200 C360,100 720,350 1080,200 C1260,120 1380,280 1440,200 L1440,900 L0,900 Z">
          <animate attributeName="d" dur="12s" repeatCount="indefinite"
            values="
              M0,200 C360,100 720,350 1080,200 C1260,120 1380,280 1440,200 L1440,900 L0,900 Z;
              M0,300 C360,180 720,100 1080,300 C1260,400 1380,150 1440,250 L1440,900 L0,900 Z;
              M0,150 C360,300 720,100 1080,250 C1260,180 1380,350 1440,200 L1440,900 L0,900 Z;
              M0,200 C360,100 720,350 1080,200 C1260,120 1380,280 1440,200 L1440,900 L0,900 Z
            " />
        </path>
      </svg>

      {/* Large background wave 2 - amber */}
      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
        <defs>
          <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <path fill="url(#wave2)"
          d="M0,400 C480,250 960,500 1440,350 L1440,900 L0,900 Z">
          <animate attributeName="d" dur="15s" repeatCount="indefinite"
            values="
              M0,400 C480,250 960,500 1440,350 L1440,900 L0,900 Z;
              M0,350 C480,500 960,250 1440,400 L1440,900 L0,900 Z;
              M0,450 C480,300 960,400 1440,300 L1440,900 L0,900 Z;
              M0,400 C480,250 960,500 1440,350 L1440,900 L0,900 Z
            " />
        </path>
      </svg>

      {/* Large background wave 3 - emerald */}
      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
        <defs>
          <linearGradient id="wave3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#059669" stopOpacity="0.10" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.06" />
          </linearGradient>
        </defs>
        <path fill="url(#wave3)"
          d="M0,600 C360,500 720,700 1080,550 C1260,480 1380,620 1440,580 L1440,900 L0,900 Z">
          <animate attributeName="d" dur="18s" repeatCount="indefinite"
            values="
              M0,600 C360,500 720,700 1080,550 C1260,480 1380,620 1440,580 L1440,900 L0,900 Z;
              M0,550 C360,650 720,500 1080,600 C1260,680 1380,520 1440,560 L1440,900 L0,900 Z;
              M0,620 C360,520 720,650 1080,520 C1260,500 1380,600 1440,550 L1440,900 L0,900 Z;
              M0,600 C360,500 720,700 1080,550 C1260,480 1380,620 1440,580 L1440,900 L0,900 Z
            " />
        </path>
      </svg>

      {/* Mid floating orb - blue */}
      <div className="absolute top-[15%] right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-accent-blue/15 to-blue-400/8 blur-[100px]" />

      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-accent-blue/8 via-accent-amber/6 to-transparent blur-3xl" />

      {/* Bottom orb - amber */}
      <div className="absolute bottom-[5%] left-[15%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-accent-amber/12 to-orange-400/6 blur-[80px]" />
    </div>
  );
};
