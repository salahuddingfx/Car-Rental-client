import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Car, type Booking, type User, INITIAL_CARS } from '../data/mockCars';

interface AppState {
  cars: Car[];
  user: User | null;
  wishlist: string[];
  bookings: Booking[];
  guestBookings: Booking[];
  login: (email: string, role?: 'user' | 'host' | 'company' | 'driver') => void;
  logout: () => void;
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
      user: {
        id: 'user-123',
        name: 'James Harrison',
        email: 'james@luxury.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
        role: 'user',
        drivingLicense: {
          licenseNumber: 'DL-9847291-A',
          expiryDate: '2029-12-31',
          country: 'United States',
          verified: true
        },
        balance: 12500,
      },
      wishlist: ['car-1', 'car-3'],
      guestBookings: [],
      bookings: [
        {
          id: 'booking-1',
          carId: 'car-3',
          userId: 'user-123',
          pickupDate: '2026-07-10',
          returnDate: '2026-07-12',
          totalDays: 2,
          totalPrice: 1040,
          status: 'Upcoming',
          driverInfo: {
            fullName: 'James Harrison',
            email: 'james@luxury.com',
            phone: '+1 (555) 019-2834',
            licenseNumber: 'DL-9847291-A',
            licenseExpiry: '2029-12-31'
          }
        }
      ],

      login: (email, role = 'user') => {
        set({
          user: {
            id: crypto.randomUUID(),
            name: email.split('@')[0].toUpperCase(),
            email: email,
            avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150`,
            role: role,
            balance: 5000,
          }
        });
      },

      logout: () => set({ user: null }),

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
