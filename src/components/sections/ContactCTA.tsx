import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, ArrowRight, Phone } from 'lucide-react';

interface ContactCTAProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

export function ContactCTA({ title, subtitle, ctaText, ctaLink }: ContactCTAProps) {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-blue rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-amber rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
            <MessageSquare size={14} className="text-accent-amber" />
            <span className="text-xs font-display uppercase tracking-widest text-neutral-300">Get in Touch</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            {title || 'Ready to Get Started?'}
          </h2>

          <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            {subtitle || "Whether you have questions or ready to book, we're here to help you find the perfect ride."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => navigate(ctaLink || '/contact')}
              className="group flex items-center gap-2 px-8 py-4 bg-accent-blue text-white font-display font-semibold text-sm uppercase tracking-wider rounded-xl hover:bg-accent-blue-hover transition-all shadow-lg shadow-accent-blue/25">
              {ctaText || 'Contact Us'}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <a href="tel:+8801700000000"
              className="flex items-center gap-2 px-8 py-4 border border-neutral-600 text-neutral-300 font-display font-semibold text-sm uppercase tracking-wider rounded-xl hover:bg-white/5 hover:border-neutral-500 transition-all">
              <Phone size={16} />
              Call Now
            </a>
          </div>

          <p className="mt-8 text-xs text-neutral-500">
            Or reach us at <span className="text-accent-amber">hello@apexride.com</span> &middot; +880 1700-000000
          </p>
        </motion.div>
      </div>
    </section>
  );
}
