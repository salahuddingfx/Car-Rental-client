import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
  min?: string;
  className?: string;
  position?: 'top' | 'bottom';
  glass?: boolean;
}

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];

export const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, placeholder = 'Select date', min, className = '', position = 'bottom', glass = false }) => {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const [month, setMonth] = useState(value ? new Date(value).getMonth() : today.getMonth());
  const [year, setYear] = useState(value ? new Date(value).getFullYear() : today.getFullYear());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (value) {
      const d = new Date(value);
      setMonth(d.getMonth());
      setYear(d.getFullYear());
    }
  }, [value]);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const minDate = min ? new Date(min) : null;

  const isPast = (d: number) => {
    const dt = new Date(year, month, d);
    const t = new Date(); t.setHours(0,0,0,0);
    return dt < t || (minDate !== null && dt < minDate);
  };

  const isSelected = (d: number) => {
    if (!value) return false;
    const sel = new Date(value);
    return sel.getFullYear() === year && sel.getMonth() === month && sel.getDate() === d;
  };

  const isToday = (d: number) => {
    return today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;
  };

  const select = (d: number) => {
    const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    onChange(key);
    setOpen(false);
  };

  const prev = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const next = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

  const display = value ? new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';

  if (glass) {
    return (
      <div ref={ref} className={`relative ${className}`}>
        <button type="button" onClick={() => setOpen(!open)}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border border-white/15 bg-white/10 backdrop-blur-sm text-white text-sm text-left transition-colors cursor-pointer hover:border-white/30">
          <Calendar size={15} className="shrink-0 text-white/40" />
          <span className="flex-1 truncate">{value ? display : placeholder}</span>
          {value && (
            <span onClick={(e) => { e.stopPropagation(); onChange(''); }} className="text-white/40 hover:text-red-400 text-xs">&times;</span>
          )}
        </button>

        {open && (
          <div className={`absolute left-0 bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4 z-50 w-[280px] ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'}`}>
            <div className="flex items-center justify-between mb-3">
              <button type="button" onClick={prev} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors cursor-pointer">
                <ChevronLeft size={14} className="text-white/50" />
              </button>
              <span className="font-display text-xs font-bold text-white uppercase tracking-widest">
                {MONTHS[month]} {year}
              </span>
              <button type="button" onClick={next} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors cursor-pointer">
                <ChevronRight size={14} className="text-white/50" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-0.5 mb-1">
              {DAYS.map(d => (
                <div key={d} className="text-center text-[9px] text-white/30 font-display font-bold uppercase tracking-wider py-1">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-0.5">
              {cells.map((d, i) => {
                if (d === null) return <div key={`e-${i}`} />;
                const past = isPast(d);
                const selected = isSelected(d);
                const todayMark = isToday(d);
                return (
                  <button key={d} type="button" disabled={past}
                    onClick={() => select(d)}
                    className={`text-[11px] py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                      past ? 'text-white/15 cursor-not-allowed' :
                      selected ? 'bg-accent-blue text-white shadow-md shadow-accent-blue/30' :
                      todayMark ? 'bg-white/10 text-white font-bold' :
                      'text-white/70 hover:bg-white/10'
                    }`}>
                    {d}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-1.5 mt-3 pt-3 border-t border-white/10">
              {[
                { label: 'Today', offset: 0 },
                { label: 'Tomorrow', offset: 1 },
                { label: 'Next Week', offset: 7 },
              ].map(q => {
                const dt = new Date(); dt.setDate(dt.getDate() + q.offset);
                const key = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
                return (
                  <button key={q.label} type="button" onClick={() => { onChange(key); setOpen(false); }}
                    className="flex-1 text-[10px] font-display font-bold uppercase tracking-wider py-1.5 rounded-lg border border-white/10 text-white/50 hover:border-accent-blue hover:text-accent-blue transition-colors cursor-pointer">
                    {q.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button type="button" onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm text-left transition-colors cursor-pointer ${
          value
            ? 'border-accent-blue/30 bg-accent-blue/5 text-neutral-800 dark:text-neutral-200'
            : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500'
        } hover:border-accent-blue/50`}>
        <Calendar size={15} className="shrink-0 opacity-50" />
        <span className="flex-1 truncate">{value ? display : placeholder}</span>
        {value && (
          <span onClick={(e) => { e.stopPropagation(); onChange(''); }} className="text-neutral-400 hover:text-red-500 text-xs">&times;</span>
        )}
      </button>

      {open && (
        <div className={`absolute left-0 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-2xl p-4 z-50 w-[280px] ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'}`}>
          <div className="flex items-center justify-between mb-3">
            <button type="button" onClick={prev} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer">
              <ChevronLeft size={14} className="text-neutral-500 dark:text-neutral-400" />
            </button>
            <span className="font-display text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest">
              {MONTHS[month]} {year}
            </span>
            <button type="button" onClick={next} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer">
              <ChevronRight size={14} className="text-neutral-500 dark:text-neutral-400" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-0.5 mb-1">
            {DAYS.map(d => (
              <div key={d} className="text-center text-[9px] text-neutral-400 dark:text-neutral-500 font-display font-bold uppercase tracking-wider py-1">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0.5">
            {cells.map((d, i) => {
              if (d === null) return <div key={`e-${i}`} />;
              const past = isPast(d);
              const selected = isSelected(d);
              const todayMark = isToday(d);
              return (
                <button key={d} type="button" disabled={past}
                  onClick={() => select(d)}
                  className={`text-[11px] py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                    past ? 'text-neutral-300 dark:text-neutral-600 cursor-not-allowed' :
                    selected ? 'bg-accent-blue text-white shadow-md shadow-accent-blue/20' :
                    todayMark ? 'bg-accent-blue/10 text-accent-blue font-bold' :
                    'text-neutral-700 dark:text-neutral-300 hover:bg-accent-blue/10'
                  }`}>
                  {d}
                </button>
              );
            })}
          </div>

          <div className="flex gap-1.5 mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
            {[
              { label: 'Today', offset: 0 },
              { label: 'Tomorrow', offset: 1 },
              { label: 'Next Week', offset: 7 },
            ].map(q => {
              const dt = new Date(); dt.setDate(dt.getDate() + q.offset);
              const key = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
              return (
                <button key={q.label} type="button" onClick={() => { onChange(key); setOpen(false); }}
                  className="flex-1 text-[10px] font-display font-bold uppercase tracking-wider py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-accent-blue hover:text-accent-blue transition-colors cursor-pointer">
                  {q.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
