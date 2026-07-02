export interface Review {
  id: string;
  name: string;
  avatar: string;
  date: string;
  rating: number;
  text: string;
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  category: 'Sports' | 'Luxury' | 'Supercar' | 'SUV' | 'Electric' | 'Sedan' | 'Hatchback' | 'Van';
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  fuel: 'Electric' | 'Petrol' | 'Hybrid' | 'Diesel';
  transmission: 'Automatic' | 'Manual' | 'Automatic (CVT)';
  seats: number;
  power: string;
  speed: string;
  description: string;
  features: string[];
  hostName: string;
  hostAvatar: string;
  hostRating: number;
  isAvailable: boolean;
  location: string;
  ratingBreakdown: {
    cleanliness: number;
    communication: number;
    listingAccuracy: number;
  };
  reviews: Review[];
}

export interface Booking {
  id: string;
  bookingRef: string;
  carId: string;
  userId: string;
  pickupDate: string;
  returnDate: string;
  totalDays: number;
  totalPrice: number;
  status: 'Upcoming' | 'Active' | 'Completed' | 'Cancelled';
  driverInfo: {
    fullName: string;
    email: string;
    phone: string;
    licenseNumber: string;
    licenseExpiry: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'user' | 'host' | 'company' | 'driver';
  drivingLicense?: {
    licenseNumber: string;
    expiryDate: string;
    country: string;
    verified: boolean;
  };
  balance?: number;
}

// Initial mock cars database
export const INITIAL_CARS: Car[] = [
  {
    id: 'car-1',
    name: 'Harrier Z',
    brand: 'Toyota',
    category: 'SUV',
    price: 4500,
    rating: 4.85,
    reviewsCount: 34,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=800',
    ],
    fuel: 'Petrol',
    transmission: 'Automatic (CVT)',
    seats: 5,
    power: '181 HP',
    speed: '9.2s (0-100 km/h)',
    description: 'Bangladesh er shobcheye popular luxury SUV. Toyota Harrier Z grade 2.0L CVT petrol, panoramic sunroof, leather interior, 360 camera, adaptive cruise — premium comfort for Dhaka roads.',
    features: ['2.0L CVT Engine', 'Panoramic Sunroof', '360° Camera', 'Adaptive Cruise Control', 'Leather Seats', 'LED Headlamps'],
    hostName: 'Rafiq Motors',
    hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    hostRating: 4.90,
    isAvailable: true,
    location: 'Gulshan, Dhaka',
    ratingBreakdown: { cleanliness: 4.9, communication: 4.8, listingAccuracy: 4.9 },
    reviews: [
      { id: 'r-1', name: 'Tanvir Hasan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150', date: '2026-06-20', rating: 5, text: 'Harrier ta onek bhalo condition e chilo. AC ta powerful, seats comfortable. Airport pickup er jonno perfect.' },
      { id: 'r-2', name: 'Nusrat Jahan', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150', date: '2026-06-05', rating: 4, text: 'Gulshan theke Cox\'s Bazar obdhi smooth drive. Host ta helpful chilo. Definitely recommend.' }
    ]
  },
  {
    id: 'car-2',
    name: 'Premio 2.0A',
    brand: 'Toyota',
    category: 'Sedan',
    price: 2800,
    rating: 4.78,
    reviewsCount: 56,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=800',
    ],
    fuel: 'Petrol',
    transmission: 'Automatic (CVT)',
    seats: 5,
    power: '158 HP',
    speed: '10.5s (0-100 km/h)',
    description: 'Toyota Premio — Dhaka er roads er shobcheye trusted sedan. 2.0A grade with CVT, power steering, AC, airbag. Family rental er jonno ideal choice. Fuel efficient ar comfortable.',
    features: ['2.0L CVT Engine', 'Power Steering', 'Dual Airbags', 'ABS Braking', 'Climate Control', 'USB Charging'],
    hostName: 'Kamal Auto',
    hostAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    hostRating: 4.82,
    isAvailable: true,
    location: 'Banani, Dhaka',
    ratingBreakdown: { cleanliness: 4.7, communication: 4.8, listingAccuracy: 4.8 },
    reviews: [
      { id: 'r-3', name: 'Arif Rahman', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150', date: '2026-06-18', rating: 5, text: 'Premio ta clean chilo, ACValo. Wedding er jonno 3 din niyechilam. Kono problem hoynai.' }
    ]
  },
  {
    id: 'car-3',
    name: 'X-Trail 2.0',
    brand: 'Nissan',
    category: 'SUV',
    price: 4000,
    rating: 4.82,
    reviewsCount: 28,
    image: 'https://images.unsplash.com/photo-1606611013016-969c19ba27c5?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1606611013016-969c19ba27c5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800',
    ],
    fuel: 'Petrol',
    transmission: 'Automatic (CVT)',
    seats: 5,
    power: '141 HP',
    speed: '11.2s (0-100 km/h)',
    description: 'Nissan X-Trail — reliable SUV for long tours. 2.0L CVT, spacious boot, comfortable ride quality. Sylhet, Chittagong, Cox\'s Bazar highways er jonno perfect family SUV.',
    features: ['2.0L CVT Engine', 'Spacious Boot', 'Rear Camera', 'Bluetooth Audio', 'Roof Rails', 'Hill Start Assist'],
    hostName: 'Rafiq Motors',
    hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    hostRating: 4.90,
    isAvailable: true,
    location: 'Uttara, Dhaka',
    ratingBreakdown: { cleanliness: 4.8, communication: 4.9, listingAccuracy: 4.8 },
    reviews: [
      { id: 'r-4', name: 'Sumaiya K.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150', date: '2026-06-14', rating: 5, text: 'Sylhet tour e X-Trail niyechilam. Highway te onek smooth, boot e luggage shob fit hoise.' }
    ]
  },
  {
    id: 'car-4',
    name: 'HiAce Commuter',
    brand: 'Toyota',
    category: 'Van',
    price: 5500,
    rating: 4.75,
    reviewsCount: 41,
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&q=80&w=800',
    ],
    fuel: 'Petrol',
    transmission: 'Manual',
    seats: 14,
    power: '134 HP',
    speed: '14.0s (0-100 km/h)',
    description: 'Toyota HiAce micro bus — group travel er shobcheye practical choice. 14-seater with AC, push-back seats, music system. Office trips, family gatherings, airport transfers er jonno ideal.',
    features: ['2.7L Petrol Engine', '14 Seater AC', 'Push-Back Seats', 'Music System', 'Luggage Compartment', 'Fuel Efficient'],
    hostName: 'Dhaka Transport',
    hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    hostRating: 4.78,
    isAvailable: true,
    location: 'Dhanmondi, Dhaka',
    ratingBreakdown: { cleanliness: 4.6, communication: 4.8, listingAccuracy: 4.9 },
    reviews: [
      { id: 'r-5', name: 'Fahmidul Islam', avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=150', date: '2026-06-22', rating: 5, text: 'Office team outing er jonno HiAce niyechilam 13 jon. AC ta bhalo, seats comfortable. Cox\'s Bazar obdhi smooth trip.' }
    ]
  },
  {
    id: 'car-5',
    name: 'Swift GL',
    brand: 'Suzuki',
    category: 'Hatchback',
    price: 1800,
    rating: 4.70,
    reviewsCount: 63,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=800',
    ],
    fuel: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    power: '89 HP',
    speed: '12.6s (0-100 km/h)',
    description: 'Suzuki Swift — budget-friendly city car. Fuel efficient, easy to park, smooth automatic transmission. Daily commute, office runs, city tours er jonno best value for money.',
    features: ['1.2L Engine', 'Automatic Transmission', 'Air Conditioning', 'Power Windows', 'USB Audio', 'Compact Design'],
    hostName: 'City Wheels',
    hostAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
    hostRating: 4.72,
    isAvailable: true,
    location: 'Chattogram City',
    ratingBreakdown: { cleanliness: 4.7, communication: 4.7, listingAccuracy: 4.7 },
    reviews: [
      { id: 'r-6', name: 'Tasnim Ahmed', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150', date: '2026-06-25', rating: 4, text: 'Chattogram city tour er jonno Swift perfect. AC Valo, fuel consumption kom. Budget-friendly option.' }
    ]
  },
  {
    id: 'car-6',
    name: 'Wrangler Unlimited',
    brand: 'Jeep',
    category: 'SUV',
    price: 8500,
    rating: 4.88,
    reviewsCount: 12,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1606611013016-969c19ba27c5?auto=format&fit=crop&q=80&w=800',
    ],
    fuel: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    power: '268 HP',
    speed: '7.5s (0-100 km/h)',
    description: 'Jeep Wrangler Unlimited — off-road adventure er king. 3.6L Pentastar V6, 4x4, removable top. Cox\'s Bazar beach, Sylhet tea gardens, haor areas — everywhere you dare to go.',
    features: ['3.6L V6 Pentastar', '4x4 Off-Road', 'Removable Hard Top', 'Rock-Trac System', 'Trail Rated', 'All-Terrain Tires'],
    hostName: 'Adventure Fleet',
    hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    hostRating: 4.92,
    isAvailable: true,
    location: 'Sylhet',
    ratingBreakdown: { cleanliness: 4.9, communication: 5.0, listingAccuracy: 4.8 },
    reviews: [
      { id: 'r-7', name: 'Sakib Chowdhury', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150', date: '2026-06-10', rating: 5, text: 'Lawachara forest Jeep er sathe gechilam. Off-road experience ta unbelievable! Wrangler er kono alternative nai.' }
    ]
  },
  {
    id: 'car-7',
    name: 'Prado TXL',
    brand: 'Toyota',
    category: 'SUV',
    price: 9500,
    rating: 4.92,
    reviewsCount: 19,
    image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=800',
    ],
    fuel: 'Diesel',
    transmission: 'Automatic',
    seats: 7,
    power: '197 HP',
    speed: '10.8s (0-100 km/h)',
    description: 'Toyota Land Cruiser Prado TXL — ultimate luxury SUV. 2.8L diesel, 7-seater, leather interior, moonroof, crawl control. VIP transfers, long tours, Cox\'s Bazar to Sylhet — pure comfort.',
    features: ['2.8L Turbo Diesel', '7 Seater', 'Moonroof', 'Leather Interior', 'Crawl Control', 'Multi-Terrain Select'],
    hostName: 'Prestige Fleet',
    hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    hostRating: 4.95,
    isAvailable: true,
    location: 'Cox\'s Bazar',
    ratingBreakdown: { cleanliness: 5.0, communication: 4.9, listingAccuracy: 5.0 },
    reviews: [
      { id: 'r-8', name: 'Mashfiqur Rahman', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150', date: '2026-06-08', rating: 5, text: 'Prado ta VIP comfort. Cox\'s Bazar beach road e drive korte maja. Family er jonno best luxury option.' }
    ]
  }
];
