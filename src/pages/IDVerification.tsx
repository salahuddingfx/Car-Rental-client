import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, CheckCircle, Shield, FileText, X } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { useToastStore } from '../store/useToastStore';

type VerifyStep = 'nid' | 'selfie' | 'review' | 'done';

export const IDVerification: React.FC = () => {
  const [step, setStep] = useState<VerifyStep>('nid');
  const [nidFile, setNidFile] = useState<File | null>(null);
  const [nidPreview, setNidPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToastStore();

  const handleNidUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { addToast('File too large. Max 5MB.', 'error'); return; }
    setNidFile(file);
    setNidPreview(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('done');
      addToast('ID verification submitted! We\'ll review within 24 hours.', 'success');
    }, 1500);
  };

  const steps = [
    { id: 'nid', label: 'Upload NID' },
    { id: 'selfie', label: 'Take Selfie' },
    { id: 'review', label: 'Review' },
  ];

  return (
    <div className="pt-24 pb-20 bg-light-bg dark:bg-neutral-950 min-h-screen">
      <div className="max-w-2xl mx-auto px-6">
        <Breadcrumbs items={[{ label: 'My Dashboard', href: '/dashboard' }, { label: 'ID Verification' }]} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="w-16 h-16 bg-accent-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield size={28} className="text-accent-blue" />
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-2">ID Verification</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Verify your identity to unlock full booking privileges</p>
        </motion.div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-3">
              <div className={`flex items-center gap-2 ${i < steps.indexOf(step) || step === 'done' ? 'text-green-500' : step === s.id ? 'text-accent-blue' : 'text-neutral-400 dark:text-neutral-500'}`}>
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                  i < steps.indexOf(step) || step === 'done' ? 'bg-green-500 border-green-500 text-white' :
                  step === s.id ? 'border-accent-blue bg-accent-blue/10' :
                  'border-neutral-200 dark:border-neutral-700'
                }`}>
                  {i < steps.indexOf(step) || step === 'done' ? <CheckCircle size={14} /> : i + 1}
                </span>
                <span className="text-xs font-medium hidden sm:block">{s.label}</span>
              </div>
              {i < steps.length - 1 && <div className={`w-8 h-px ${i < steps.indexOf(step) ? 'bg-green-500' : 'bg-neutral-200 dark:bg-neutral-700'}`} />}
            </div>
          ))}
        </div>

        {/* Step: NID Upload */}
        {step === 'nid' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
            <h3 className="font-display text-sm font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-2">Upload National ID Card</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6">Clear photo of front and back of your NID</p>

            {nidPreview ? (
              <div className="relative mb-4">
                <img src={nidPreview} alt="NID Preview" className="w-full h-48 object-contain rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800" />
                <button onClick={() => { setNidFile(null); setNidPreview(''); }}
                  className="absolute top-2 right-2 w-7 h-7 bg-black/50 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-black/70">
                  <X size={14} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-neutral-200 dark:border-neutral-700 rounded-xl cursor-pointer hover:border-accent-blue transition-colors">
                <Upload size={28} className="text-neutral-400 dark:text-neutral-500 mb-2" />
                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Click to upload NID</span>
                <span className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-1">JPG, PNG up to 5MB</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleNidUpload} />
              </label>
            )}

            <Button variant="primary" className="w-full rounded-xl mt-4" disabled={!nidFile} onClick={() => setStep('selfie')}>
              Continue <FileText size={15} />
            </Button>
          </motion.div>
        )}

        {/* Step: Selfie */}
        {step === 'selfie' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
            <h3 className="font-display text-sm font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-2">Take a Selfie</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6">We'll match your selfie with your NID photo</p>

            <div className="w-40 h-40 mx-auto rounded-full bg-neutral-100 dark:bg-neutral-800 border-2 border-dashed border-neutral-300 dark:border-neutral-600 flex items-center justify-center mb-4">
              <div className="text-center">
                <Upload size={24} className="text-neutral-400 dark:text-neutral-500 mx-auto mb-1" />
                <span className="text-[10px] text-neutral-400 dark:text-neutral-500">Click to capture</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setStep('nid')}>Back</Button>
              <Button variant="primary" className="flex-1 rounded-xl" onClick={() => setStep('review')}>Continue</Button>
            </div>
          </motion.div>
        )}

        {/* Step: Review */}
        {step === 'review' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
            <h3 className="font-display text-sm font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-2">Review & Submit</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6">Confirm your documents before submission</p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                <span className="text-xs text-neutral-600 dark:text-neutral-400">NID Card</span>
                <span className="text-xs text-green-600 font-medium flex items-center gap-1"><CheckCircle size={12} /> Uploaded</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                <span className="text-xs text-neutral-600 dark:text-neutral-400">Selfie</span>
                <span className="text-xs text-green-600 font-medium flex items-center gap-1"><CheckCircle size={12} /> Captured</span>
              </div>
            </div>

            <p className="text-[10px] text-neutral-400 dark:text-neutral-500 text-center mb-6 leading-relaxed">
              By submitting, you confirm this is your legitimate government-issued ID. Verification typically takes 24 hours.
            </p>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setStep('selfie')}>Back</Button>
              <Button variant="primary" className="flex-1 rounded-xl" isLoading={loading} onClick={handleSubmit}>Submit for Review</Button>
            </div>
          </motion.div>
        )}

        {/* Step: Done */}
        {step === 'done' && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-2xl p-8 shadow-sm text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-950/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-green-500" />
            </div>
            <h3 className="font-display text-lg font-bold text-neutral-800 dark:text-neutral-200 mb-2">Verification Submitted!</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">We'll review your documents within 24 hours. You'll receive a notification once verified.</p>
            <Button variant="outline" className="rounded-xl" onClick={() => window.location.href = '/dashboard'}>Back to Dashboard</Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
