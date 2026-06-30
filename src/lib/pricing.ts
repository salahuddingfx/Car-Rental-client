export const CURRENCY = '৳';

export const TRIP_FEE_RATE = 0.12;
export const TAX_RATE = 0.08;
export const HOURLY_MULTIPLIER = 0.08; // hourly = daily * 0.08 (80% of daily for 24 hours)
export const DISTANCE_RATE = 15; // per km

export interface PricingOptions {
  days: number;
  hours?: number;
  distanceKm?: number;
  isHourly?: boolean;
  isDistanceBased?: boolean;
}

export function calculateBookingCost(price: number, options: PricingOptions | number) {
  let subtotal: number;
  let hours = 0;
  let distanceCharge = 0;
  
  // Support legacy format (price, days)
  const days = typeof options === 'number' ? options : options.days;
  hours = typeof options !== 'number' ? options.hours || 0 : 0;
  const distanceKm = typeof options !== 'number' ? options.distanceKm || 0 : 0;
  const isHourly = typeof options !== 'number' ? options.isHourly : false;
  const isDistanceBased = typeof options !== 'number' ? options.isDistanceBased : false;
  
  // Calculate base price
  if (isHourly && hours > 0) {
    const hourlyRate = Math.round(price * HOURLY_MULTIPLIER);
    subtotal = hourlyRate * hours;
  } else {
    subtotal = price * days;
  }
  
  // Add distance charge if distance-based pricing
  if (isDistanceBased && distanceKm > 0) {
    distanceCharge = distanceKm * DISTANCE_RATE;
  }
  
  const tripFee = Math.round(subtotal * TRIP_FEE_RATE);
  const tax = Math.round((subtotal + distanceCharge) * TAX_RATE);
  const total = subtotal + distanceCharge + tripFee + tax;
  
  return { subtotal, tripFee, tax, total, distanceCharge };
}

export function formatPrice(amount: number): string {
  return `${CURRENCY}${amount.toLocaleString()}`;
}

// Get hourly rate from daily price
export function getHourlyRate(dailyPrice: number): number {
  return Math.round(dailyPrice * HOURLY_MULTIPLIER);
}

// Get price per km
export function getDistanceRate(): number {
  return DISTANCE_RATE;
}
