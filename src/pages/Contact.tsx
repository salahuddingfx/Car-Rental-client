import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { PhoneInput } from '../components/ui/PhoneInput';
import { CountrySelect } from '../components/ui/CountrySelect';
import { LocationSelect } from '../components/ui/LocationSelect';
import { contactFormSchema } from '../lib/validations';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@apexride.com' },
  { icon: Phone, label: 'Phone', value: '+880 1700-000000' },
  { icon: MapPin, label: 'Office', value: 'Dhaka 1212, Bangladesh' },
];

export const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+880',
    country: '',
    location: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactFormSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach(issue => {
        const key = issue.path[0] as string;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-light-bg to-white dark:from-neutral-950 dark:to-neutral-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Breadcrumbs items={[{ label: 'Talk to Us' }]} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto mb-12">
          <p className="font-display text-[10px] tracking-[0.25em] text-accent-blue uppercase font-bold mb-4">Get in Touch</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight mb-4">We'd love to hear from you</h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
            Have a question about a booking, want to list your vehicle, or need assistance? Our team is here to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="space-y-4">
            {contactInfo.map((info) => (
              <div key={info.label} className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 shadow-sm p-5 rounded-2xl flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-accent-blue/10 flex items-center justify-center shrink-0">
                  <info.icon size={20} className="text-accent-blue" />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-display uppercase tracking-widest">{info.label}</p>
                  <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">{info.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 shadow-sm p-6 sm:p-8 rounded-2xl">
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 rounded-2xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                    <Send size={24} className="text-green-600" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-1">Message Sent</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-neutral-400 dark:text-neutral-500 font-display uppercase tracking-widest mb-1.5 block">Your Name *</label>
                      <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Rahim Uddin"
                        className={`w-full border text-sm text-neutral-800 dark:text-neutral-200 p-3 rounded-xl outline-none transition-all duration-200 placeholder:text-neutral-300 dark:placeholder:text-neutral-600 bg-white dark:bg-neutral-800 ${errors.name ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-700 focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/10'}`} />
                      {errors.name && <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="text-[10px] text-neutral-400 dark:text-neutral-500 font-display uppercase tracking-widest mb-1.5 block">Your Email *</label>
                      <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="e.g. rahim@gmail.com"
                        className={`w-full border text-sm text-neutral-800 dark:text-neutral-200 p-3 rounded-xl outline-none transition-all duration-200 placeholder:text-neutral-300 dark:placeholder:text-neutral-600 bg-white dark:bg-neutral-800 ${errors.email ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-700 focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/10'}`} />
                      {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-neutral-400 dark:text-neutral-500 font-display uppercase tracking-widest mb-1.5 block">Phone Number</label>
                    <PhoneInput
                      value={form.phone}
                      countryCode={form.countryCode}
                      onChange={phone => setForm({ ...form, phone })}
                      onCountryCodeChange={code => setForm({ ...form, countryCode: code })}
                      error={errors.phone}
                      placeholder="1XXX XXXXXX"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-neutral-400 dark:text-neutral-500 font-display uppercase tracking-widest mb-1.5 block">Country</label>
                      <CountrySelect value={form.country} onChange={code => setForm({ ...form, country: code, location: '' })} error={errors.country} />
                    </div>
                    <div>
                      <label className="text-[10px] text-neutral-400 dark:text-neutral-500 font-display uppercase tracking-widest mb-1.5 block">City / Location</label>
                      <LocationSelect countryCode={form.country} value={form.location} onChange={loc => setForm({ ...form, location: loc })} error={errors.location} />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-neutral-400 dark:text-neutral-500 font-display uppercase tracking-widest mb-1.5 block">Message *</label>
                    <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us what's on your mind..."
                      className={`w-full border text-sm text-neutral-800 dark:text-neutral-200 p-3 rounded-xl outline-none transition-all duration-200 placeholder:text-neutral-300 dark:placeholder:text-neutral-600 resize-none bg-white dark:bg-neutral-800 ${errors.message ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-700 focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/10'}`} />
                    {errors.message && <p className="text-[10px] text-red-500 mt-1">{errors.message}</p>}
                  </div>
                  <Button type="submit" variant="primary" className="rounded-xl">
                    <Send size={14} className="mr-1.5" /> Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
