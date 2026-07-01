import React from 'react';

export const CssWave: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Wave layer 1 - blue */}
      <svg className="absolute bottom-0 left-0 w-full h-40" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <defs>
          <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.06" />
          </linearGradient>
        </defs>
        <path fill="url(#wave1)"
          d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z">
          <animate attributeName="d" dur="7s" repeatCount="indefinite"
            values="
              M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z;
              M0,80 C240,30 480,90 720,50 C960,10 1200,80 1440,60 L1440,120 L0,120 Z;
              M0,40 C240,90 480,10 720,70 C960,100 1200,30 1440,60 L1440,120 L0,120 Z;
              M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z
            " />
        </path>
      </svg>

      {/* Wave layer 2 - amber */}
      <svg className="absolute bottom-0 left-0 w-full h-32" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <defs>
          <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0.06" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <path fill="url(#wave2)"
          d="M0,70 C360,20 720,90 1080,40 C1260,20 1380,60 1440,50 L1440,120 L0,120 Z">
          <animate attributeName="d" dur="9s" repeatCount="indefinite"
            values="
              M0,70 C360,20 720,90 1080,40 C1260,20 1380,60 1440,50 L1440,120 L0,120 Z;
              M0,40 C360,80 720,20 1080,70 C1260,90 1380,30 1440,60 L1440,120 L0,120 Z;
              M0,60 C360,30 720,70 1080,30 C1260,50 1380,80 1440,40 L1440,120 L0,120 Z;
              M0,70 C360,20 720,90 1080,40 C1260,20 1380,60 1440,50 L1440,120 L0,120 Z
            " />
        </path>
      </svg>

      {/* Wave layer 3 - emerald */}
      <svg className="absolute bottom-0 left-0 w-full h-24" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <defs>
          <linearGradient id="wave3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#059669" stopOpacity="0.04" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.03" />
          </linearGradient>
        </defs>
        <path fill="url(#wave3)"
          d="M0,50 C480,90 960,10 1440,50 L1440,120 L0,120 Z">
          <animate attributeName="d" dur="11s" repeatCount="indefinite"
            values="
              M0,50 C480,90 960,10 1440,50 L1440,120 L0,120 Z;
              M0,70 C480,20 960,80 1440,40 L1440,120 L0,120 Z;
              M0,30 C480,70 960,30 1440,60 L1440,120 L0,120 Z;
              M0,50 C480,90 960,10 1440,50 L1440,120 L0,120 Z
            " />
        </path>
      </svg>

      {/* Wave layer 4 - violet */}
      <svg className="absolute bottom-0 left-0 w-full h-20" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <defs>
          <linearGradient id="wave4" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.03" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path fill="url(#wave4)"
          d="M0,60 C240,30 720,80 1440,40 L1440,120 L0,120 Z">
          <animate attributeName="d" dur="13s" repeatCount="indefinite"
            values="
              M0,60 C240,30 720,80 1440,40 L1440,120 L0,120 Z;
              M0,40 C240,70 720,20 1440,60 L1440,120 L0,120 Z;
              M0,55 C240,40 720,70 1440,35 L1440,120 L0,120 Z;
              M0,60 C240,30 720,80 1440,40 L1440,120 L0,120 Z
            " />
        </path>
      </svg>

      {/* Subtle radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-accent-blue/5 via-accent-amber/3 to-transparent blur-3xl" />
    </div>
  );
};
