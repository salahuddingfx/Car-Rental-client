import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecentlyViewedState {
  items: string[];
  addItem: (carId: string) => void;
  getRecent: (limit?: number) => string[];
}

export const useRecentlyViewed = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (carId) => set((state) => {
        const filtered = state.items.filter(id => id !== carId);
        return { items: [carId, ...filtered].slice(0, 10) };
      }),
      getRecent: (limit = 5) => get().items.slice(0, limit),
    }),
    { name: 'recently-viewed' }
  )
);
