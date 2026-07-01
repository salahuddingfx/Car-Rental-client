import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarCalendarProps {
  bookedDates?: string[];
}

export const CarCalendar = ({ bookedDates = [] }: CarCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const bookedSet = useMemo(() => {
    const set = new Set<string>();
    bookedDates.forEach(d => set.add(d));
    return set;
  }, [bookedDates]);

  const days = useMemo(() => {
    const arr: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) arr.push(null);
    for (let i = 1; i <= daysInMonth; i++) arr.push(i);
    return arr;
  }, [firstDay, daysInMonth]);

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1));

  const monthName = currentMonth.toLocaleString('en-US', { month: 'long' });

  const isBooked = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return bookedSet.has(dateStr);
  };

  const isPast = (day: number) => {
    const d = new Date(year, month, day);
    return d < today;
  };

  return (
    <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm p-5 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer">
          <ChevronLeft size={16} className="text-neutral-600 dark:text-neutral-400" />
        </button>
        <h3 className="font-display text-sm font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">
          {monthName} {year}
        </h3>
        <button onClick={nextMonth} className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer">
          <ChevronRight size={16} className="text-neutral-600 dark:text-neutral-400" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} className="text-center text-[10px] font-display font-bold text-neutral-400 uppercase py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} />;
          const past = isPast(day);
          const booked = isBooked(day);
          return (
            <div
              key={day}
              className={`h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                past
                  ? 'text-neutral-300 dark:text-neutral-600 cursor-not-allowed'
                  : booked
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-500 cursor-not-allowed line-through'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 cursor-pointer'
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-700">
        <div className="flex items-center gap-1.5 text-[10px] text-neutral-500">
          <span className="w-3 h-3 rounded bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800" /> Available
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-neutral-500">
          <span className="w-3 h-3 rounded bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800" /> Booked
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-neutral-500">
          <span className="w-3 h-3 rounded bg-neutral-100 border border-neutral-200 dark:bg-neutral-700 dark:border-neutral-600" /> Past
        </div>
      </div>
    </div>
  );
};
