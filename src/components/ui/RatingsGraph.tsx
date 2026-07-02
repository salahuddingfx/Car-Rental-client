import React from 'react';

interface RatingBarProps {
  label: string;
  value: number;
  max?: number;
  color?: string;
}

export const RatingBar: React.FC<RatingBarProps> = ({ label, value, max = 5, color = 'bg-accent-amber' }) => {
  const pct = (value / max) * 100;
  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] text-neutral-500 dark:text-neutral-400 w-28 shrink-0 font-display uppercase tracking-wider">{label}</span>
      <div className="flex-1 h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 w-8 text-right">{value.toFixed(1)}</span>
    </div>
  );
};

interface RatingsGraphProps {
  ratingBreakdown: { cleanliness: number; communication: number; listingAccuracy: number };
  overallRating: number;
  reviewsCount: number;
}

export const RatingsGraph: React.FC<RatingsGraphProps> = ({ ratingBreakdown, overallRating, reviewsCount }) => {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-xl p-5 shadow-sm">
      <h3 className="font-display text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest mb-4">Rating Breakdown</h3>
      <div className="flex items-center gap-4 mb-5">
        <div className="text-center">
          <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 font-display">{overallRating.toFixed(1)}</p>
          <p className="text-[10px] text-neutral-500 dark:text-neutral-400">{reviewsCount} reviews</p>
        </div>
        <div className="flex-1 space-y-2">
          <RatingBar label="Cleanliness" value={ratingBreakdown.cleanliness} />
          <RatingBar label="Communication" value={ratingBreakdown.communication} />
          <RatingBar label="Accuracy" value={ratingBreakdown.listingAccuracy} />
        </div>
      </div>
      <div className="grid grid-cols-5 gap-1">
        {[5, 4, 3, 2, 1].map(stars => {
          const count = stars === 5 ? 65 : stars === 4 ? 25 : stars === 3 ? 7 : stars === 2 ? 2 : 1;
          return (
            <div key={stars} className="text-center">
              <div className="h-16 bg-neutral-50 dark:bg-neutral-800 rounded-md relative overflow-hidden mb-1">
                <div className="absolute bottom-0 left-0 right-0 bg-accent-amber/30 rounded-md transition-all duration-700" style={{ height: `${count}%` }} />
              </div>
              <span className="text-[9px] text-neutral-500 dark:text-neutral-400">{stars}*</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
