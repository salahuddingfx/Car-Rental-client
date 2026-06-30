import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Car, type Review, type Booking, type User, INITIAL_CARS } from '../data/mockCars';

interface AppState {
  cars: Car[];
  user: User | null;
  wishlist: string[];
  bookings: Booking[];
  login: (email: string, role?: 'user' | 'host' | 'company') => void;
  logout: () => void;
  toggleWishlist: (carId: string) => void;
  addBooking: (booking: Omit<Booking, 'id'>) => Booking;
  cancelBooking: (bookingId: string) => void;
  addCar: (car: Omit<Car, 'id' | 'rating' | 'reviewsCount' | 'reviews' | 'ratingBreakdown' | 'hostName' | 'hostAvatar' | 'hostRating'>) => void;
  editCar: (carId: string, updatedCar: Partial<Car>) => void;
  deleteCar: (carId: string) => void;
  updateProfile: (name: string, email: string, avatar: string) => void;
  updateDrivingLicense: (license: { licenseNumber: string; expiryDate: string; country: string }) => void;
}

// Initial mock cars database
const INITIAL_CARS: Car[] = [
  {
    id: 'car-1',
    name: 'Sapphire Aetheria',
    brand: 'Aetheria',
    category: 'Electric',
    price: 340,
    rating: 4.95,
    reviewsCount: 42,
    image: '/luxury_car.png',
    fuel: 'Electric',
    transmission: 'Automatic',
    seats: 5,
    power: '1,234 HP',
    speed: '1.89s (0-60 mph)',
    description: 'The Aetheria Sapphire represents the pinnacle of modern luxury electric grand tourers. Featuring tri-motor AWD, an ultra-premium layout, and active aerodynamic stabilization, it glides across pavement while delivering track-dominating speed.',
    features: ['Tri-Motor AWD', 'Carbon Fiber Aero', 'Executive Seating', 'Autopilot', 'Heated & Cooled Seats', 'Premium Audio System'],
    hostName: 'Seraphina Vance',
    hostAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    hostRating: 4.98,
    isAvailable: true,
    location: 'Los Angeles, CA',
    ratingBreakdown: { cleanliness: 5.0, communication: 4.9, listingAccuracy: 5.0 },
    reviews: [
      { id: 'r-1', name: 'Marcus Sterling', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150', date: '2026-06-15', rating: 5, text: 'Absolutely spectacular. The acceleration is unreal, and the car was clean as a surgical suite.' },
      { id: 'r-2', name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150', date: '2026-06-01', rating: 5, text: 'Host was highly responsive and accommodating. Car was a show-stopper in Beverly Hills.' }
    ]
  },
  {
    id: 'car-2',
    name: 'Huracán Evo Spyder',
    brand: 'Lamborghini',
    category: 'Supercar',
    price: 650,
    rating: 4.98,
    reviewsCount: 18,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800',
    fuel: 'Petrol',
    transmission: 'Automatic',
    seats: 2,
    power: '640 HP',
    speed: '3.1s (0-60 mph)',
    description: 'An open-air symphony of high-revving naturally aspirated V10 power. The Huracán Evo Spyder delivers raw emotion and aggressive aesthetics that will command attention wherever you drive.',
    features: ['V10 Engine', 'Convertible Soft Top', 'Sport Exhaust', 'Magnetorheological Suspension', 'LDVI Active System', 'Carbon Ceramic Brakes'],
    hostName: 'Vincenzo Bianchi',
    hostAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    hostRating: 4.95,
    isAvailable: true,
    location: 'Miami, FL',
    ratingBreakdown: { cleanliness: 4.9, communication: 5.0, listingAccuracy: 5.0 },
    reviews: [
      { id: 'r-3', name: 'Devon K.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150', date: '2026-05-20', rating: 5, text: 'Rented for our anniversary. The exhaust note is mesmerizing, a true masterpiece.' }
    ]
  },
  {
    id: 'car-3',
    name: '911 GT3 RS (992)',
    brand: 'Porsche',
    category: 'Sports',
    price: 520,
    rating: 4.99,
    reviewsCount: 31,
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800',
    fuel: 'Petrol',
    transmission: 'Automatic',
    seats: 2,
    power: '518 HP',
    speed: '3.0s (0-60 mph)',
    description: 'The ultimate track weapon for the road. Featuring DRS active aerodynamics, a screaming 9000 RPM flat-six engine, and complete mechanical adjustments on the steering wheel, this is for driving purists.',
    features: ['Active Aero DRS', '9000 RPM Flat-Six', 'PDK Transmission', 'Rear Axle Steering', 'Weissach Package', 'Telemetry Recorder'],
    hostName: 'Dieter K.',
    hostAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    hostRating: 5.0,
    isAvailable: true,
    location: 'Los Angeles, CA',
    ratingBreakdown: { cleanliness: 5.0, communication: 5.0, listingAccuracy: 5.0 },
    reviews: [
      { id: 'r-4', name: 'Chris Harris', avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=150', date: '2026-06-12', rating: 5, text: 'Precision engineering at its absolute best. Handles like it is on rails. High recommendation.' }
    ]
  },
  {
    id: 'car-4',
    name: 'S-Class Maybach S680',
    brand: 'Mercedes-Benz',
    category: 'Luxury',
    price: 480,
    rating: 4.92,
    reviewsCount: 15,
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=800',
    fuel: 'Petrol',
    transmission: 'Automatic',
    seats: 4,
    power: '621 HP',
    speed: '4.5s (0-60 mph)',
    description: 'First-class luxury travel redefined. The Mercedes-Maybach S680 matches twin-turbo V12 whispering power with an exquisite passenger lounge, active ambient noise cancellation, and silver champagne flutes.',
    features: ['V12 Twin-Turbo', 'Rear Executive Lounge', 'Active Noise Cancellation', 'Burmester 4D Audio', 'Reclining Massaging Seats', 'Refrigerator Console'],
    hostName: 'Prestige Group',
    hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    hostRating: 4.88,
    isAvailable: true,
    location: 'New York, NY',
    ratingBreakdown: { cleanliness: 4.9, communication: 4.8, listingAccuracy: 5.0 },
    reviews: []
  },
  {
    id: 'car-5',
    name: 'Model X Plaid',
    brand: 'Tesla',
    category: 'SUV',
    price: 260,
    rating: 4.88,
    reviewsCount: 55,
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=800',
    fuel: 'Electric',
    transmission: 'Automatic',
    seats: 6,
    power: '1,020 HP',
    speed: '2.5s (0-60 mph)',
    description: 'The quickest accelerating SUV ever built. The Tesla Model X Plaid offers Falcon Wing doors, yoke steering, active gaming console interior, and three ultra-high performance electric motors.',
    features: ['Tri-Motor Plaid AWD', 'Falcon Wing Doors', 'Yoke Steering', '6-Seat Configuration', 'Full Self-Driving Capability', 'Active Air Suspension'],
    hostName: 'Aero Rentals',
    hostAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
    hostRating: 4.91,
    isAvailable: true,
    location: 'San Francisco, CA',
    ratingBreakdown: { cleanliness: 4.8, communication: 4.9, listingAccuracy: 4.9 },
    reviews: []
  },
  {
    id: 'car-6',
    name: 'Vantage F1 Edition',
    brand: 'Aston Martin',
    category: 'Sports',
    price: 380,
    rating: 4.90,
    reviewsCount: 22,
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800',
    fuel: 'Petrol',
    transmission: 'Automatic',
    seats: 2,
    power: '527 HP',
    speed: '3.5s (0-60 mph)',
    description: 'Developed to celebrate Aston Martin’s return to Formula 1. This special edition Vantage features unique aerodynamic improvements, stiffer track-oriented suspension, and raw Aston Martin elegance.',
    features: ['F1 Aerodynamic Package', 'Carbon Exterior Accents', 'Alcantara Sport Seats', 'Active Exhaust valves', 'F1 Racing Finish', 'Limited Slip Diff'],
    hostName: 'Seraphina Vance',
    hostAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    hostRating: 4.98,
    isAvailable: true,
    location: 'Los Angeles, CA',
    ratingBreakdown: { cleanliness: 4.9, communication: 4.9, listingAccuracy: 4.9 },
    reviews: []
  },
  {
    id: 'car-7',
    name: 'Cullinan Black Badge',
    brand: 'Rolls-Royce',
    category: 'Luxury',
    price: 980,
    rating: 4.97,
    reviewsCount: 9,
    image: 'https://images.unsplash.com/photo-1632245889027-e406faaa19ca?auto=format&fit=crop&q=80&w=800',
    fuel: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    power: '592 HP',
    speed: '4.9s (0-60 mph)',
    description: 'The supreme luxury SUV. Black Badge edition features darkened chrome elements, increased V12 torque, starlight headliner, and customized comfort suspension, gliding over roads like a magic carpet.',
    features: ['V12 Twin-Turbo', 'Starlight Headliner', 'Shooting Star Feature', 'Self-Leveling Suspension', 'Bespoke Audio', 'Whisper Cabin Soundproofing'],
    hostName: 'Prestige Group',
    hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    hostRating: 4.88,
    isAvailable: true,
    location: 'Las Vegas, NV',
    ratingBreakdown: { cleanliness: 5.0, communication: 4.9, listingAccuracy: 5.0 },
    reviews: []
  }
];

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
        cars: state.cars,
      }),
    }
  )
);
