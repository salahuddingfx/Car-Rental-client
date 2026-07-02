import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Rocket, MapPin, Smartphone, Car, Globe, Zap, Search, Calendar, Truck, Map, CheckCircle, Star, Award, Users, Heart, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Rocket, MapPin, Smartphone, Car, Globe, Zap, Search, Calendar, Truck, Map, CheckCircle, Star, Award, Users, Heart, Shield,
};

interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: string;
  type: 'journey' | 'process';
}

interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  processSteps: ProcessStep[];
}

export function Timeline({ events, processSteps }: TimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current) return;

    const items = timelineRef.current.querySelectorAll('.timeline-item');
    items.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, x: i % 2 === 0 ? -60 : 60, scale: 0.9 },
        {
          opacity: 1, x: 0, scale: 1, duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 85%', end: 'top 50%', toggleActions: 'play none none reverse' }
        }
      );
    });

    const line = timelineRef.current.querySelector('.timeline-line');
    if (line) {
      gsap.fromTo(line,
        { scaleY: 0 },
        { scaleY: 1, duration: 2, ease: 'power2.out', scrollTrigger: { trigger: timelineRef.current, start: 'top 80%', end: 'bottom 20%' } }
      );
    }

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, [events]);

  useEffect(() => {
    if (!processRef.current) return;

    const steps = processRef.current.querySelectorAll('.process-step');
    steps.forEach((step, i) => {
      gsap.fromTo(step,
        { opacity: 0, y: 50, scale: 0.8 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.6, delay: i * 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: { trigger: step, start: 'top 85%', toggleActions: 'play none none reverse' }
        }
      );
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, [processSteps]);

  return (
    <div className="space-y-24">
      {/* Company Journey Timeline */}
      <div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-xs font-display uppercase tracking-widest text-accent-blue mb-3 block">Our Journey</span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white">The Apex Ride Story</h2>
        </motion.div>

        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          <div className="timeline-line absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-blue via-accent-amber to-accent-blue origin-top" />

          {events.map((event, i) => {
            const Icon = iconMap[event.icon] || Star;
            const isLeft = i % 2 === 0;

            return (
              <div key={event.id} className={`timeline-item relative flex items-center mb-16 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${isLeft ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                  <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-lg border border-neutral-100 dark:border-neutral-700 hover:shadow-xl transition-shadow">
                    <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-xs font-display font-bold uppercase tracking-widest text-accent-amber">{event.year}</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-neutral-900 dark:text-white mb-2">{event.title}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{event.description}</p>
                  </div>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-accent-blue flex items-center justify-center shadow-lg shadow-accent-blue/30 z-10">
                  <Icon size={20} className="text-white" />
                </div>

                <div className="w-1/2" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Rental Process */}
      <div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-xs font-display uppercase tracking-widest text-accent-blue mb-3 block">How It Works</span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white">Rent in 5 Simple Steps</h2>
        </motion.div>

        <div ref={processRef} className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step) => {
              const Icon = iconMap[step.icon] || Star;
              return (
                <div key={step.id} className="process-step relative">
                  <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-lg border border-neutral-100 dark:border-neutral-700 text-center hover:shadow-xl hover:-translate-y-1 transition-all h-full">
                    <div className="w-14 h-14 rounded-2xl bg-accent-blue/10 flex items-center justify-center mx-auto mb-4">
                      <Icon size={24} className="text-accent-blue" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-accent-blue text-white flex items-center justify-center text-sm font-bold mx-auto mb-3">
                      {step.step}
                    </div>
                    <h3 className="font-display text-sm font-bold text-neutral-900 dark:text-white mb-2">{step.title}</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{step.description}</p>
                  </div>
                  {step.step < processSteps.length && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-neutral-200 dark:bg-neutral-700" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
