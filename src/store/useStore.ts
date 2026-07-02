import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Car, type Booking, type User, INITIAL_CARS } from '../data/mockCars';
import { authApi, carsApi } from '../lib/api';

interface AppState {
  cars: Car[];
  user: User | null;
  wishlist: string[];
  bookings: Booking[];
  guestBookings: Booking[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  fetchCars: (params?: Record<string, string | number | boolean>) => Promise<void>;
  toggleWishlist: (carId: string) => void;
  addBooking: (booking: Omit<Booking, 'id'>) => Booking;
  addGuestBooking: (booking: Omit<Booking, 'id' | 'userId'>) => Booking;
  cancelBooking: (bookingId: string) => void;
  addCar: (car: Omit<Car, 'id' | 'rating' | 'reviewsCount' | 'reviews' | 'ratingBreakdown' | 'hostName' | 'hostAvatar' | 'hostRating'>) => void;
  editCar: (carId: string, updatedCar: Partial<Car>) => void;
  deleteCar: (carId: string) => void;
  updateProfile: (name: string, email: string, avatar: string) => void;
  updateDrivingLicense: (license: { licenseNumber: string; expiryDate: string; country: string }) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      cars: INITIAL_CARS,
      user: null,
      wishlist: [],
      guestBookings: [],
      bookings: [],

      login: async (email, password) => {
        try {
          const { data } = await authApi.login(email, password);
          localStorage.setItem('user_token', data.token);
          const apiUser = data.user;
          set({
            user: {
              id: String(apiUser.id),
              name: apiUser.name,
              email: apiUser.email,
              avatar: apiUser.avatar || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150`,
              role: apiUser.role as User['role'],
              balance: Number(apiUser.balance),
              drivingLicense: apiUser.license_number ? {
                licenseNumber: apiUser.license_number,
                expiryDate: apiUser.license_expiry || '',
                country: apiUser.license_country || '',
                verified: apiUser.license_verified,
              } : undefined,
            },
          });
          return true;
        } catch {
          return false;
        }
      },

      register: async (name, email, password) => {
        try {
          const { data } = await authApi.register({ name, email, password, password_confirmation: password });
          localStorage.setItem('user_token', data.token);
          const apiUser = data.user;
          set({
            user: {
              id: String(apiUser.id),
              name: apiUser.name,
              email: apiUser.email,
              avatar: apiUser.avatar || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150`,
              role: apiUser.role as User['role'],
              balance: Number(apiUser.balance),
            },
          });
          return true;
        } catch {
          return false;
        }
      },

      logout: () => {
        localStorage.removeItem('user_token');
        set({ user: null });
      },

      fetchCars: async (params?) => {
        try {
          const { data } = await carsApi.list(params);
          const mapped: Car[] = data.data.map((c) => ({
            id: String(c.id),
            name: c.name,
            brand: c.brand,
            category: c.category as Car['category'],
            price: c.price,
            seats: c.seats,
            transmission: c.transmission,
            fuel: c.fuel,
            power: c.power || '',
            speed: c.speed || '',
            description: c.description || '',
            features: c.features || [],
            image: c.image || '',
            images: c.images || [],
            location: c.location || '',
            year: c.year || '',
            rating: c.rating,
            reviewsCount: c.reviews_count,
            reviews: [],
            ratingBreakdown: { cleanliness: c.rating, communication: c.rating, listingAccuracy: c.rating },
            hostName: 'Host',
            hostAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
            hostRating: c.rating,
          }));
          set({ cars: mapped });
        } catch {
          // Keep local cars as fallback
        }
      },

      toggleWishlist: (carId) => set((state) => {
        const index = state.wishlist.indexOf(carId);
        if (index > -1) {
          return { wishlist: state.wishlist.filter(id => id !== carId) };
        } else {
          return { wishlist: [...state.wishlist, carId] };
        }
      }),

      addBooking: (newBooking) => {
        const booking: Booking = {
          ...newBooking,
          id: crypto.randomUUID(),
          bookingRef: 'AR-' + crypto.randomUUID().slice(0, 5).toUpperCase(),
        };
        set((state) => ({
          bookings: [booking, ...state.bookings]
        }));
        return booking;
      },

      addGuestBooking: (newBooking) => {
        const booking: Booking = {
          ...newBooking,
          id: crypto.randomUUID(),
          bookingRef: 'AR-' + crypto.randomUUID().slice(0, 5).toUpperCase(),
          userId: 'guest-' + crypto.randomUUID(),
        };
        set((state) => ({
          guestBookings: [booking, ...state.guestBookings]
        }));
        return booking;
      },

      cancelBooking: (bookingId) => set((state) => ({
        bookings: state.bookings.map(b => b.id === bookingId ? { ...b, status: 'Cancelled' as const } : b)
      })),

      addCar: (carData) => set((state) => {
        const newCar: Car = {
          ...carData,
          id: crypto.randomUUID(),
          rating: 5.0,
          reviewsCount: 0,
          reviews: [],
          ratingBreakdown: { cleanliness: 5.0, communication: 5.0, listingAccuracy: 5.0 },
          hostName: state.user?.name || 'Local Host',
          hostAvatar: state.user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
          hostRating: 5.0
        };
        return { cars: [newCar, ...state.cars] };
      }),

      editCar: (carId, updatedFields) => set((state) => ({
        cars: state.cars.map(c => c.id === carId ? { ...c, ...updatedFields } : c)
      })),

      deleteCar: (carId) => set((state) => ({
        cars: state.cars.filter(c => c.id !== carId)
      })),

      updateProfile: (name, email, avatar) => set((state) => ({
        user: state.user ? { ...state.user, name, email, avatar } : null
      })),

      updateDrivingLicense: (license) => set((state) => ({
        user: state.user ? {
          ...state.user,
          drivingLicense: {
            ...license,
            verified: true
          }
        } : null
      }))
    }),
    {
      name: 'car-rental-storage',
      partialize: (state) => ({
        user: state.user,
        wishlist: state.wishlist,
        bookings: state.bookings,
        guestBookings: state.guestBookings,
        cars: state.cars,
      }),
    }
  )
);
