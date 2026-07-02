import { useState, useEffect } from 'react';

interface CMSData {
  hero: {
    slides: Array<{ id: string; img: string; alt: string; tagline: string; title: string; subtitle: string; cta: string; ctaLink: string }>;
    stats: Array<{ label: string; value: string }>;
  };
  brands: Array<{ id: string; name: string; count: number; logo: string }>;
  features: Array<{ id: string; icon: string; title: string; desc: string }>;
  stats: Array<{ id: string; value: string; label: string }>;
  offers: Array<{ id: string; title: string; description: string; ctaText: string; ctaLink: string; img: string; active: boolean }>;
  faq: Array<{ id: string; question: string; answer: string }>;
  about: {
    hero: { tagline: string; title: string; description: string };
    stats: Array<{ id: string; value: string; label: string }>;
    values: Array<{ id: string; title: string; desc: string; icon: string }>;
    cta: { tagline: string; title: string; description: string; ctaText: string; ctaLink: string };
  };
  contact: {
    hero: { tagline: string; title: string; description: string };
    infos: Array<{ id: string; type: string; value: string; label: string }>;
    formLabels: { name: string; email: string; message: string; submit: string; success: string };
  };
  footer: {
    brandDesc: string;
    contact: Array<{ id: string; type: string; value: string; label: string }>;
    socialLinks: Array<{ id: string; platform: string; url: string; icon: string }>;
    columns: Array<{ id: string; title: string; links: Array<{ id: string; label: string; href: string }> }>;
    copyright: string;
    developerCredit: string;
  };
  navbar: {
    links: Array<{ id: string; label: string; href: string }>;
  };
  home: {
    featuredSection: { tagline: string; title: string; description: string };
    popularSection: { tagline: string; title: string; description: string; ctaText: string; ctaLink: string };
    recentlyViewedSection: { tagline: string; title: string; description: string; ctaText: string; ctaLink: string };
    whyChooseUs: { title: string; description: string };
    contactCTA: { title: string; subtitle: string; ctaText: string; ctaLink: string };
  };
  blog: {
    posts: Array<{ id: string; slug: string; title: string; excerpt: string; category: string; date: string; readTime: string; image: string; content: string }>;
    categories: string[];
  };
  reviews: {
    hero: { tagline: string; title: string; description: string };
    items: Array<{ id: string; name: string; avatar: string; rating: number; text: string; source: string; date: string }>;
  };
  timeline: {
    events: Array<{ id: string; year: string; title: string; description: string; icon: string; type: string }>;
    processSteps: Array<{ id: string; step: number; title: string; description: string; icon: string }>;
  };
}

const CMS_KEY = 'apexride-cms';

function loadCMS(): CMSData | null {
  try {
    const raw = localStorage.getItem(CMS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return parsed.state || parsed;
    }
  } catch { /* ignore */ }
  return null;
}

export function useCMS() {
  const [cms, setCMS] = useState<CMSData | null>(() => loadCMS());

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === CMS_KEY) {
        setCMS(loadCMS());
      }
    };
    window.addEventListener('storage', handleStorage);
    const interval = setInterval(() => {
      setCMS(loadCMS());
    }, 2000);
    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, []);

  return cms;
}
