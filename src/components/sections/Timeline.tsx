import { motion } from 'framer-motion';
import { Rocket, MapPin, Smartphone, Car, Globe, Zap, Search, Calendar, Truck, Map, CheckCircle, Star, Award, Users, Heart, Shield } from 'lucide-react';

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
  return (
    <div className="space-y-24">
      {/* Company Journey Timeline */}
      <div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-xs font-display uppercase tracking-widest text-accent-blue mb-3 block">Our Journey</span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white">The Apex Ride Story</h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-blue via-accent-amber to-accent-blue" />

          {events.map((event, i) => {
            const Icon = iconMap[event.icon] || Star;
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`relative flex items-center mb-16 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
              >
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
              </motion.div>
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

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step, i) => {
              const Icon = iconMap[step.icon] || Star;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative"
                >
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
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
