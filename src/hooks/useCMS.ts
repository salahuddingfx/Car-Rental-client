import { useState, useEffect, useCallback } from 'react';
import { cmsApi } from '../lib/api';

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

function loadCMSFromStorage(): CMSData | null {
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
  const [cms, setCMS] = useState<CMSData | null>(() => loadCMSFromStorage());

  const fetchFromAPI = useCallback(async () => {
    try {
      const { data } = await cmsApi.getAll();
      const mapped: CMSData = {
        hero: {
          slides: (data.cms.hero_slides?.value as CMSData['hero']['slides']) || cms?.hero.slides || [],
          stats: (data.cms.hero_stats?.value as CMSData['hero']['stats']) || cms?.hero.stats || [],
        },
        brands: (data.cms.brands?.value as CMSData['brands']) || cms?.brands || [],
        features: (data.cms.features?.value as CMSData['features']) || cms?.features || [],
        stats: (data.cms.stats?.value as CMSData['stats']) || cms?.stats || [],
        offers: data.offers.map((o) => ({
          id: String(o.id),
          title: o.title,
          description: o.description || '',
          ctaText: 'Learn More',
          ctaLink: '#',
          img: '',
          active: o.active,
        })),
        faq: data.faqs.map((f) => ({ id: String(f.id), question: f.question, answer: f.answer })),
        about: {
          hero: (data.cms.about_hero?.value as CMSData['about']['hero']) || cms?.about.hero || { tagline: '', title: '', description: '' },
          stats: (data.cms.about_stats?.value as CMSData['about']['stats']) || cms?.about.stats || [],
          values: (data.cms.about_values?.value as CMSData['about']['values']) || cms?.about.values || [],
          cta: (data.cms.about_cta?.value as CMSData['about']['cta']) || cms?.about.cta || { tagline: '', title: '', description: '', ctaText: '', ctaLink: '' },
        },
        contact: {
          hero: (data.cms.contact_hero?.value as CMSData['contact']['hero']) || cms?.contact.hero || { tagline: '', title: '', description: '' },
          infos: (data.cms.contact_infos?.value as CMSData['contact']['infos']) || cms?.contact.infos || [],
          formLabels: (data.cms.contact_form_labels?.value as CMSData['contact']['formLabels']) || cms?.contact.formLabels || { name: '', email: '', message: '', submit: '', success: '' },
        },
        footer: (data.cms.footer_content?.value as CMSData['footer']) || cms?.footer || { brandDesc: '', contact: [], socialLinks: [], columns: [], copyright: '', developerCredit: '' },
        navbar: { links: (data.cms.navbar_links?.value as CMSData['navbar']['links']) || cms?.navbar.links || [] },
        home: (data.cms.home_content?.value as CMSData['home']) || cms?.home || {
          featuredSection: { tagline: '', title: '', description: '' },
          popularSection: { tagline: '', title: '', description: '', ctaText: '', ctaLink: '' },
          recentlyViewedSection: { tagline: '', title: '', description: '', ctaText: '', ctaLink: '' },
          whyChooseUs: { title: '', description: '' },
          contactCTA: { title: '', subtitle: '', ctaText: '', ctaLink: '' },
        },
        blog: cms?.blog || { posts: [], categories: ['All'] },
        reviews: {
          hero: (data.cms.reviews_hero?.value as CMSData['reviews']['hero']) || cms?.reviews.hero || { tagline: '', title: '', description: '' },
          items: data.reviews.map((r) => ({
            id: String(r.id),
            name: r.name,
            avatar: r.avatar || '',
            rating: r.rating,
            text: r.text,
            source: r.source,
            date: r.date,
          })),
        },
        timeline: {
          events: data.timelines.filter((t) => t.type === 'journey').map((t) => ({
            id: String(t.id),
            year: t.year,
            title: t.title,
            description: t.description || '',
            icon: t.icon || 'Calendar',
            type: t.type,
          })),
          processSteps: data.process_steps.map((ps) => ({
            id: String(ps.id),
            step: ps.step,
            title: ps.title,
            description: ps.description || '',
            icon: ps.icon || 'Circle',
          })),
        },
      };
      setCMS(mapped);
    } catch {
      // API unavailable, keep localStorage data
    }
  }, [cms]);

  useEffect(() => {
    fetchFromAPI();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === CMS_KEY) {
        setCMS(loadCMSFromStorage());
      }
    };
    window.addEventListener('storage', handleStorage);
    const interval = setInterval(() => {
      setCMS(loadCMSFromStorage());
    }, 2000);
    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, [fetchFromAPI]);

  return cms;
}
