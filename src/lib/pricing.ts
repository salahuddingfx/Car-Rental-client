export const CURRENCY = '৳';

export const TRIP_FEE_RATE = 0.12;
export const TAX_RATE = 0.08;

export function calculateBookingCost(price: number, days: number) {
  const subtotal = price * days;
  const tripFee = Math.round(subtotal * TRIP_FEE_RATE);
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tripFee + tax;
  return { subtotal, tripFee, tax, total };
}

export function formatPrice(amount: number): string {
  return `${CURRENCY}${amount.toLocaleString()}`;
}
