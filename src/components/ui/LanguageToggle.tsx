import { useLanguageStore } from '../../store/useLanguageStore';

export const LanguageToggle = ({ className = '' }: { className?: string }) => {
  const { lang, toggleLanguage } = useLanguageStore();

  return (
    <button
      onClick={toggleLanguage}
      className={`px-2.5 py-1.5 text-[10px] font-display font-bold uppercase tracking-wider rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer ${className}`}
    >
      {lang === 'en' ? 'বাং' : 'EN'}
    </button>
  );
};
