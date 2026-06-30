import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isBefore, isAfter, startOfDay } from 'date-fns';

interface CalendarProps {
  selectedRange: { from: Date | null; to: Date | null };
  onChange: (range: { from: Date | null; to: Date | null }) => void;
  disabledDates?: Date[];
}

export const Calendar: React.FC<CalendarProps> = ({
  selectedRange,
  onChange,
  disabledDates = []
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(new Date()));
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get padding days for the start of the week (Sunday is 0)
  const startDayOfWeek = monthStart.getDay();
  const padDays = Array.from({ length: startDayOfWeek }, () => {
    return subMonths(startOfMonth(currentMonth), 1); // just a placeholder date
  });

  const today = startOfDay(new Date());

  const handleDateClick = (date: Date) => {
    if (isBefore(date, today)) return; // Disable past dates
    
    const isDateDisabled = disabledDates.some(disabled => isSameDay(disabled, date));
    if (isDateDisabled) return;

    if (!selectedRange.from || (selectedRange.from && selectedRange.to)) {
      onChange({ from: date, to: null });
    } else {
      if (isBefore(date, selectedRange.from)) {
        onChange({ from: date, to: null });
      } else {
        onChange({ from: selectedRange.from, to: date });
      }
    }
  };

  const isSelected = (date: Date) => {
    if (selectedRange.from && isSameDay(date, selectedRange.from)) return true;
    if (selectedRange.to && isSameDay(date, selectedRange.to)) return true;
    return false;
  };

  const isInRange = (date: Date) => {
    if (!selectedRange.from) return false;
    
    if (selectedRange.to) {
      return isAfter(date, selectedRange.from) && isBefore(date, selectedRange.to);
    }
    
    if (hoveredDate) {
      return isAfter(date, selectedRange.from) && isBefore(date, hoveredDate) && isAfter(hoveredDate, selectedRange.from);
    }
    
    return false;
  };

  const isDateDisabled = (date: Date) => {
    if (isBefore(date, today)) return true;
    return disabledDates.some(disabled => isSameDay(disabled, date));
  };

  return (
    <div className="w-full max-w-sm glass-panel p-6 bg-graphite border border-white/5 select-none">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-display text-sm font-bold tracking-wider text-white uppercase">
          {format(currentMonth, 'MMMM yyyy')}
        </h4>
        <div className="flex gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 text-neutral-400 hover:text-white border border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 text-neutral-400 hover:text-white border border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div key={day} className="text-xs font-semibold text-neutral-500 uppercase tracking-wider py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {padDays.map((_, i) => (
          <div key={`pad-${i}`} className="py-2 text-transparent text-sm pointer-events-none">
            -
          </div>
        ))}
        
        {days.map((date) => {
          const disabled = isDateDisabled(date);
          const selected = isSelected(date);
          const inRange = isInRange(date);
          const isFrom = selectedRange.from && isSameDay(date, selectedRange.from);
          const isTo = selectedRange.to && isSameDay(date, selectedRange.to);

          return (
            <button
              key={date.toString()}
              onClick={() => handleDateClick(date)}
              onMouseEnter={() => !disabled && setHoveredDate(date)}
              onMouseLeave={() => setHoveredDate(null)}
              disabled={disabled}
              className={`
                py-2 text-sm font-semibold relative transition-all duration-150 cursor-pointer
                ${disabled ? 'text-neutral-700 line-through cursor-not-allowed' : 'text-neutral-300 hover:text-white'}
                ${inRange && !disabled ? 'bg-accent-blue/15 text-accent-blue' : ''}
                ${isFrom ? 'bg-accent-blue text-white rounded-none shadow-lg shadow-accent-blue/20' : ''}
                ${isTo ? 'bg-accent-blue text-white rounded-none shadow-lg shadow-accent-blue/20' : ''}
              `}
            >
              <span>{format(date, 'd')}</span>
              {isSameDay(date, today) && !selected && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent-blue rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default Calendar;
