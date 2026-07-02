import { z } from 'zod';

export const phoneSchema = z.string().min(8, 'Phone must be at least 8 digits').max(20, 'Phone is too long');

export const emailSchema = z.string().email('Please enter a valid email');

export const nameSchema = z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long');

export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  country: z.string().min(1, 'Country is required').optional(),
  location: z.string().min(1, 'Location is required').optional(),
  countryCode: z.string().min(1, 'Country code is required').optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message is too long'),
});

export const guestBookingSchema = z.object({
  fullName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  countryCode: z.string().min(1, 'Country code is required'),
  country: z.string().min(1, 'Country is required'),
  location: z.string().min(1, 'Location is required'),
  licenseNumber: z.string().optional(),
  licenseExpiry: z.string().optional(),
  pickupDate: z.string().min(1, 'Pickup date is required'),
  returnDate: z.string().min(1, 'Return date is required'),
});

export const passengerInfoSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  countryCode: z.string().min(1, 'Country code is required'),
  country: z.string().min(1, 'Country is required'),
  location: z.string().min(1, 'Location is required'),
});

export const liveChatSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  countryCode: z.string().min(1, 'Country code is required'),
  country: z.string().min(1, 'Country is required'),
  address: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type GuestBookingData = z.infer<typeof guestBookingSchema>;
export type PassengerInfoData = z.infer<typeof passengerInfoSchema>;
export type LiveChatData = z.infer<typeof liveChatSchema>;
