import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';

const socialLinks = [
  { 
    label: 'GitHub', 
    href: 'https://github.com/salahuddingfx', 
    username: '@salahuddingfx',
    icon: 'github-icon'
  },
  { 
    label: 'Portfolio', 
    href: 'https://salahuddin.codes', 
    username: 'salahuddin.codes',
    icon: 'social-icon'
  },
  { 
    label: 'LinkedIn', 
    href: 'https://linkedin.com/in/salahuddingfx', 
    username: '@salahuddingfx',
    icon: 'linkedin-icon'
  },
  { 
    label: 'Twitter', 
    href: 'https://twitter.com/salahuddingfx', 
    username: '@salahuddingfx',
    icon: 'x-icon'
  },
  { 
    label: 'Instagram', 
    href: 'https://instagram.com/salahuddingfx', 
    username: '@salahuddingfx',
    icon: 'instagram-icon'
  },
];

export const DeveloperCredits: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <Breadcrumbs items={[{ label: 'Developer' }]} />
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-6xl font-extrabold uppercase tracking-tight mb-4 text-white">
            Built by <span className="text-accent-blue">Salah Uddin Kader</span>
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Full-stack developer crafting digital experiences with passion and precision.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
          className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border-2 border-accent-blue/30 rounded-3xl p-12 mb-12 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-64 h-64 bg-accent-blue rounded-full blur-[120px] -translate-x-32 -translate-y-32" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent-amber rounded-full blur-[100px] translate-x-24 translate-y-24" />
          </div>

          <div className="relative flex flex-col lg:flex-row items-center gap-12">
            <div className="w-48 h-48 rounded-full border-4 border-accent-blue/50 shadow-2xl shadow-accent-blue/30 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
                alt="Salah Uddin Kader" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 uppercase tracking-tight">
                SALAH UDDIN KADER
              </h2>
              <p className="text-accent-blue font-display uppercase tracking-widest text-sm mb-4">
                Lead Developer • Nextora Studio
              </p>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                Crafting premium web experiences with React, TypeScript, and modern design systems. 
                Founder of Nextora Studio - building digital products that matter.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4">
                  <span className="text-accent-amber font-display uppercase text-xs tracking-widest block mb-1">Agency</span>
                  <span className="font-bold text-white">Nextora Studio</span>
                </div>
                <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4">
                  <span className="text-accent-amber font-display uppercase text-xs tracking-widest block mb-1">Website</span>
                  <a href="https://nextorastudio.tech" target="_blank" rel="noopener noreferrer" 
                     className="font-bold text-accent-blue hover:text-accent-blue-hover transition-colors flex items-center gap-1 justify-center lg:justify-start">
                    nextorastudio.tech <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {socialLinks.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                    className="group relative px-4 py-2 border-2 border-accent-blue/30 rounded-full hover:border-accent-blue transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-accent-blue/0 group-hover:bg-accent-blue/10 transition-colors" />
                    <span className="relative flex items-center gap-2 text-sm font-display uppercase tracking-widest">
                      <span className="w-3.5 h-3.5 rounded-full bg-neutral-800 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5">
                          <use href={`/icons.svg#${link.icon}`} />
                        </svg>
                      </span>
                      <span className="text-neutral-300 group-hover:text-white transition-colors">{link.label}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="text-center"
        >
          <p className="text-neutral-500 text-sm font-display uppercase tracking-widest mb-4">
            TECH STACK
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['React 19', 'TypeScript', 'Vite', 'TailwindCSS', 'Framer Motion', 'Zustand', 'Three.js'].map((tech) => (
              <span key={tech} 
                className="px-4 py-2 border border-accent-amber/20 text-accent-amber rounded-full text-xs font-display uppercase tracking-widest">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="text-center mt-16">
          <Link to="/" className="inline-block px-8 py-3 border-2 border-accent-blue text-accent-blue font-display uppercase tracking-widest rounded-xl hover:bg-accent-blue hover:text-white transition-all">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};