import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SavedSearch {
  id: string;
  name: string;
  search: string;
  category: string;
  fuel: string;
  sort: string;
  priceRange: number;
  createdAt: string;
}

interface SavedSearchState {
  searches: SavedSearch[];
  addSearch: (s: Omit<SavedSearch, 'id' | 'createdAt'>) => void;
  removeSearch: (id: string) => void;
}

export const useSavedSearches = create<SavedSearchState>()(
  persist(
    (set, get) => ({
      searches: [],
      addSearch: (s) => set({ searches: [{ ...s, id: crypto.randomUUID(), createdAt: new Date().toISOString() }, ...get().searches].slice(0, 10) }),
      removeSearch: (id) => set({ searches: get().searches.filter(s => s.id !== id) }),
    }),
    { name: 'saved-searches' }
  )
);
