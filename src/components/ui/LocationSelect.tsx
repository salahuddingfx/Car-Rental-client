import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, MapPin } from 'lucide-react';
import { getCitiesForCountry } from '../../data/countries';

interface LocationSelectProps {
  countryCode: string;
  value: string;
  onChange: (city: string) => void;
  error?: string;
}

export function LocationSelect({ countryCode, value, onChange, error }: LocationSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const cities = getCitiesForCountry(countryCode);
  const filtered = cities.filter(c => c.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && searchRef.current) searchRef.current.focus();
  }, [open]);

  if (!countryCode || cities.length === 0) {
    return (
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Enter your city"
        className={`w-full border rounded-xl px-3 py-2.5 text-sm bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 outline-none placeholder:text-neutral-300 dark:placeholder:text-neutral-600 transition-colors ${error ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-700 focus:border-accent-blue'}`}
      />
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between border rounded-xl px-3 py-2.5 text-sm transition-colors ${error ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-700'} bg-white dark:bg-neutral-800 text-left cursor-pointer`}
      >
        <span className={value ? 'text-neutral-800 dark:text-neutral-200' : 'text-neutral-300 dark:text-neutral-600'}>
          {value || 'Select city'}
        </span>
        <ChevronDown size={14} className={`text-neutral-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="p-2 border-b border-neutral-100 dark:border-neutral-700">
            <div className="flex items-center gap-2 px-2 py-1.5 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
              <Search size={14} className="text-neutral-400" />
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search city..."
                className="flex-1 bg-transparent text-xs text-neutral-800 dark:text-neutral-200 outline-none placeholder:text-neutral-400"
              />
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filtered.map(city => (
              <button
                key={city}
                type="button"
                onClick={() => {
                  onChange(city);
                  setOpen(false);
                  setSearch('');
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors cursor-pointer ${value === city ? 'bg-accent-blue/10' : ''}`}
              >
                <MapPin size={12} className="text-neutral-400" />
                <span className="text-xs text-neutral-800 dark:text-neutral-200">{city}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {error && <p className="text-[10px] text-red-500 mt-1">{error}</p>}
    </div>
  );
}
