import { useState, useMemo } from 'react';
import { Calculator } from 'lucide-react';
import { calculateBookingCost, formatPrice } from '../../lib/pricing';
import { DatePicker } from './DatePicker';

interface PriceCalculatorProps {
  pricePerDay: number;
  pickupDate?: string;
  returnDate?: string;
  onPickupChange?: (date: string) => void;
  onReturnChange?: (date: string) => void;
}

export const PriceCalculator = ({ pricePerDay, pickupDate: propPickup, returnDate: propReturn, onPickupChange, onReturnChange }: PriceCalculatorProps) => {
  const [internalPickup, setInternalPickup] = useState('');
  const [internalReturn, setInternalReturn] = useState('');

  const pickupDate = propPickup !== undefined ? propPickup : internalPickup;
  const returnDate = propReturn !== undefined ? propReturn : internalReturn;
  const setPickupDate = (v: string) => { if (onPickupChange) onPickupChange(v); else setInternalPickup(v); };
  const setReturnDate = (v: string) => { if (onReturnChange) onReturnChange(v); else setInternalReturn(v); };

  const days = useMemo(() => {
    if (!pickupDate || !returnDate) return 0;
    const diff = new Date(returnDate).getTime() - new Date(pickupDate).getTime();
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, [pickupDate, returnDate]);

  const pricing = useMemo(() => {
    if (days <= 0) return null;
    return calculateBookingCost(pricePerDay, days);
  }, [days, pricePerDay]);

  return (
    <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm p-5 rounded-2xl">
      <h3 className="font-display text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest mb-4 flex items-center gap-2">
        <Calculator size={14} className="text-accent-blue" /> Price Calculator
      </h3>

      <div className="space-y-3 mb-4">
        <div>
          <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Pickup Date</label>
          <DatePicker value={pickupDate} onChange={setPickupDate} placeholder="Select pickup" />
        </div>
        <div>
          <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Return Date</label>
          <DatePicker value={returnDate} onChange={setReturnDate} placeholder="Select return" min={pickupDate || undefined} />
        </div>
      </div>

      {pricing && days > 0 && (
        <div className="border-t border-neutral-100 dark:border-neutral-700 pt-4 space-y-2 text-sm">
          <div className="flex justify-between text-neutral-500">
            <span>{days} days × {formatPrice(pricePerDay)}</span>
            <span className="text-neutral-800 dark:text-neutral-200 font-semibold">{formatPrice(pricing.subtotal)}</span>
          </div>
          <div className="flex justify-between text-neutral-500">
            <span>Trip fee</span>
            <span className="text-neutral-800 dark:text-neutral-200 font-semibold">{formatPrice(pricing.tripFee)}</span>
          </div>
          <div className="flex justify-between text-neutral-500">
            <span>Tax</span>
            <span className="text-neutral-800 dark:text-neutral-200 font-semibold">{formatPrice(pricing.tax)}</span>
          </div>
          <div className="border-t border-neutral-100 dark:border-neutral-700 pt-2 flex justify-between font-display text-sm font-bold text-neutral-900 dark:text-neutral-100">
            <span>Total</span>
            <span>{formatPrice(pricing.total)}</span>
          </div>
        </div>
      )}

      {(!pickupDate || !returnDate) && (
        <p className="text-xs text-neutral-400 text-center">Select dates to see pricing</p>
      )}
    </div>
  );
};
