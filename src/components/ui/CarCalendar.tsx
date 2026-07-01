import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarCalendarProps {
  bookedDates?: string[];
}

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];

export const CarCalendar: React.FC<CarCalendarProps> = ({ bookedDates = [] }) => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const booked = useMemo(() => new Set(bookedDates.map(d => d.slice(0, 10))), [bookedDates]);

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const prev = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };

  const next = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const isPast = (d: number) => {
    const dt = new Date(year, month, d);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return dt < t;
  };

  const isBooked = (d: number) => {
    const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    return booked.has(key);
  };

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <button onClick={prev} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer">
          <ChevronLeft size={14} className="text-neutral-500 dark:text-neutral-400" />
        </button>
        <h4 className="font-display text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest">
          {MONTHS[month]} {year}
        </h4>
        <button onClick={next} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer">
          <ChevronRight size={14} className="text-neutral-500 dark:text-neutral-400" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[9px] text-neutral-400 dark:text-neutral-500 font-display font-bold uppercase tracking-wider py-1">
            {d}
          </div>
        ))}
        {cells.map((d, i) => {
          if (d === null) return <div key={`empty-${i}`} />;
          const past = isPast(d);
          const bookedDay = isBooked(d);
          return (
            <div key={d} className={`text-center text-[11px] py-1.5 rounded-md font-medium transition-colors ${
              past ? 'text-neutral-300 dark:text-neutral-600' :
              bookedDay ? 'bg-red-100 dark:bg-red-950 text-red-500 line-through' :
              'text-neutral-700 dark:text-neutral-300 hover:bg-accent-blue/10'
            }`}>
              {d}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-accent-blue/20 border border-accent-blue/40" />
          <span className="text-[10px] text-neutral-400 dark:text-neutral-500">Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-red-100 dark:bg-red-950 border border-red-200 dark:border-red-800" />
          <span className="text-[10px] text-neutral-400 dark:text-neutral-500">Booked</span>
        </div>
      </div>
    </div>
  );
};
