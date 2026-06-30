import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-1.5 text-[10px] font-display uppercase tracking-widest text-neutral-400 mb-6">
      <Link to="/" className="hover:text-accent-blue transition-colors flex items-center gap-1">
        <Home size={11} />
        <span>Home</span>
      </Link>
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-1.5">
          <ChevronRight size={10} className="text-neutral-300" />
          {item.href ? (
            <Link to={item.href} className="hover:text-accent-blue transition-colors">{item.label}</Link>
          ) : (
            <span className="text-neutral-600 font-semibold">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
