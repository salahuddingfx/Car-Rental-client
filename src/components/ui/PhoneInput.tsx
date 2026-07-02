import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { countries, type Country } from '../../data/countries';

interface PhoneInputProps {
  value: string;
  countryCode: string;
  onChange: (phone: string) => void;
  onCountryCodeChange: (code: string) => void;
  error?: string;
  placeholder?: string;
}

export function PhoneInput({ value, countryCode, onChange, onCountryCodeChange, error, placeholder }: PhoneInputProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = countries.find(c => c.dialCode === countryCode) || countries[0];

  const filtered = countries.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.dialCode.includes(search)
  );

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

  return (
    <div ref={ref} className="relative">
      <div className={`flex items-center border rounded-xl transition-colors ${error ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-700'} bg-white dark:bg-neutral-800`}>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 px-3 py-2.5 border-r border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors shrink-0 cursor-pointer"
        >
          <span className="text-sm">{selected.flag}</span>
          <span className="text-xs text-neutral-600 dark:text-neutral-300 font-medium">{selected.dialCode}</span>
          <ChevronDown size={12} className="text-neutral-400" />
        </button>
        <input
          type="tel"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder || '1XXX XXXXXX'}
          className="flex-1 bg-transparent text-sm text-neutral-800 dark:text-neutral-200 px-3 py-2.5 outline-none placeholder:text-neutral-300 dark:placeholder:text-neutral-600"
        />
      </div>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-72 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="p-2 border-b border-neutral-100 dark:border-neutral-700">
            <div className="flex items-center gap-2 px-2 py-1.5 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
              <Search size={14} className="text-neutral-400" />
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search country..."
                className="flex-1 bg-transparent text-xs text-neutral-800 dark:text-neutral-200 outline-none placeholder:text-neutral-400"
              />
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filtered.map(c => (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  onCountryCodeChange(c.dialCode);
                  setOpen(false);
                  setSearch('');
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors cursor-pointer ${countryCode === c.dialCode ? 'bg-accent-blue/10' : ''}`}
              >
                <span className="text-sm">{c.flag}</span>
                <span className="text-xs text-neutral-800 dark:text-neutral-200 flex-1 text-left">{c.name}</span>
                <span className="text-[10px] text-neutral-400 font-mono">{c.dialCode}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {error && <p className="text-[10px] text-red-500 mt-1">{error}</p>}
    </div>
  );
}
