import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { translations, type LangKey } from '../data/translations';

interface LanguageState {
  lang: 'en' | 'bn';
  toggleLanguage: () => void;
  t: (key: LangKey) => string;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      lang: 'en',
      toggleLanguage: () => set((state) => ({
        lang: state.lang === 'en' ? 'bn' : 'en',
      })),
      t: (key: LangKey) => {
        const lang = get().lang;
        return translations[lang][key] || translations.en[key];
      },
    }),
    { name: 'language-storage' }
  )
);
