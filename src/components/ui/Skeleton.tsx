import { motion } from 'framer-motion';

const shimmer = 'animate-pulse bg-neutral-200 dark:bg-neutral-700 rounded';

export function CarCardSkeleton() {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm">
      <div className={`h-48 ${shimmer}`} />
      <div className="p-5 space-y-3">
        <div className="h-3 w-16 rounded-full bg-neutral-200 dark:bg-neutral-700" />
        <div className="h-5 w-32 rounded-full bg-neutral-200 dark:bg-neutral-700" />
        <div className="flex justify-between items-center">
          <div className="h-4 w-20 rounded-full bg-neutral-200 dark:bg-neutral-700" />
          <div className="h-4 w-24 rounded-full bg-neutral-200 dark:bg-neutral-700" />
        </div>
      </div>
    </div>
  );
}

export function CarDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className={`h-[420px] lg:h-[520px] rounded-xl ${shimmer}`} />
      <div className="space-y-4">
        <div className="h-3 w-20 rounded-full bg-neutral-200 dark:bg-neutral-700" />
        <div className="h-8 w-48 rounded-full bg-neutral-200 dark:bg-neutral-700" />
        <div className="h-4 w-32 rounded-full bg-neutral-200 dark:bg-neutral-700" />
        <div className="h-20 w-full rounded-lg bg-neutral-200 dark:bg-neutral-700" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-24 rounded-xl bg-neutral-200 dark:bg-neutral-700" />
      ))}
    </div>
  );
}
