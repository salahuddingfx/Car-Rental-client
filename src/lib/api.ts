import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

// Attach token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('user_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-logout on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('user_token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// Auth
export const authApi = {
  register: (data: { name: string; email: string; password: string; password_confirmation: string }) =>
    api.post<{ user: User; token: string }>('/auth/register', data),
  login: (email: string, password: string) =>
    api.post<{ user: User; token: string }>('/auth/login', { email, password }),
  logout: () => api.post('/auth/logout'),
  me: () => api.get<User>('/auth/me'),
};

// Cars
export const carsApi = {
  list: (params?: Record<string, string | number | boolean>) =>
    api.get<{ data: Car[]; current_page: number; last_page: number; total: number }>('/cars', { params }),
  get: (id: string) => api.get<Car>(`/cars/${id}`),
};

// Bookings
export const bookingsApi = {
  list: () => api.get<{ data: Booking[] }>('/bookings'),
  create: (data: { car_id: string; pickup_date: string; return_date: string; driver_info?: unknown }) =>
    api.post<{ data: Booking }>('/bookings', data),
  get: (id: string) => api.get<Booking>(`/bookings/${id}`),
  cancel: (id: string) => api.post(`/bookings/${id}/cancel`),
  lookup: (bookingRef: string) => api.post<{ data: Booking }>('/bookings/lookup', { booking_ref: bookingRef }),
};

// CMS
export const cmsApi = {
  getAll: () => api.get<{
    cms: Record<string, { key: string; value: unknown }>;
    faqs: Array<{ id: string; question: string; answer: string }>;
    offers: Array<{ id: string; title: string; description: string; active: boolean }>;
    reviews: Array<{ id: string; name: string; avatar?: string; rating: number; text: string; source: string; date: string }>;
    timelines: Array<{ id: string; year: string; title: string; description: string; icon: string; type: string; sort_order: number }>;
    process_steps: Array<{ id: string; step: number; title: string; description: string; icon: string }>;
  }>('/cms'),
};

// Blog
export const blogApi = {
  list: (params?: { category?: string; page?: number }) =>
    api.get<{ data: BlogPost[]; last_page: number }>('/blog', { params }),
  get: (slug: string) => api.get<BlogPost>(`/blog/${slug}`),
};

// Chat
export const chatApi = {
  create: (data: {
    guest_id: string;
    guest_name: string;
    guest_email: string;
    guest_phone?: string;
    guest_country?: string;
    guest_address?: string;
  }) => api.post<ChatSession>('/chats', data),

  byGuest: (guestId: string) =>
    api.get<ChatSession | null>('/chats/by-guest', { params: { guest_id: guestId } }),

  sendMessage: (chatId: number, data: {
    sender_type: 'guest' | 'user' | 'admin' | 'system';
    sender_id?: string;
    sender_name: string;
    message: string;
  }) => api.post<ChatMessage>(`/chats/${chatId}/messages`, data),

  getMessages: (chatId: number) =>
    api.get<ChatMessage[]>(`/chats/${chatId}/messages`),

  markRead: (chatId: number) =>
    api.post(`/chats/${chatId}/read`),
};

// Profile
export const profileApi = {
  update: (data: { name?: string; email?: string; phone?: string }) =>
    api.put<User>('/profile', data),
  updateLicense: (data: { license_number: string; license_expiry: string; license_country: string }) =>
    api.put<User>('/profile/license', data),
};

// Types
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  balance: string;
  phone?: string;
  license_number?: string;
  license_expiry?: string;
  license_country?: string;
  license_verified: boolean;
}

export interface Car {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  seats: number;
  transmission: string;
  fuel: string;
  power?: string;
  speed?: string;
  description?: string;
  features?: string[];
  image?: string;
  images?: string[];
  location?: string;
  year?: string;
  rating: number;
  reviews_count: number;
  is_available: boolean;
}

export interface Booking {
  id: number;
  booking_ref: string;
  car_id: number;
  user_id: number;
  pickup_date: string;
  return_date: string;
  total_days: number;
  total_price: string;
  status: string;
  car?: Car;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  category: string;
  date: string;
  read_time?: string;
  image?: string;
}

export interface ChatSession {
  id: number;
  guest_id: string;
  user_id?: number;
  guest_name: string;
  guest_email: string;
  guest_phone?: string;
  guest_country?: string;
  guest_address?: string;
  status: 'open' | 'closed';
  last_message_at?: string;
  messages: ChatMessage[];
}

export interface ChatMessage {
  id: number;
  chat_id: number;
  sender_type: 'guest' | 'user' | 'admin' | 'system';
  sender_id?: string;
  sender_name: string;
  message: string;
  is_read: boolean;
  created_at: string;
}
