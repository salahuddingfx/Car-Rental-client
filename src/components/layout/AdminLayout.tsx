import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Car, Users, BarChart3, Settings, LogOut, ChevronRight } from 'lucide-react';
import { useStore } from '../../store/useStore';

const adminLinks = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard },
  { to: '/admin/cars', label: 'All Cars', icon: Car },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col fixed h-full">
        <div className="p-6 border-b border-neutral-100">
          <Link to="/" className="font-display font-bold text-lg tracking-widest flex items-center gap-1.5">
            <span className="text-accent-amber font-extrabold text-xl">A</span>pex Ride
          </Link>
          <p className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {adminLinks.map((link) => {
            const isActive = location.pathname === link.to || (link.to !== '/admin' && location.pathname.startsWith(link.to));
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-accent-blue/10 text-accent-blue'
                    : 'text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50'
                }`}
              >
                <link.icon size={18} />
                <span className="font-display text-xs tracking-wider uppercase">{link.label}</span>
                {isActive && <ChevronRight size={14} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-neutral-100">
          {user && (
            <div className="flex items-center gap-3 px-3 py-2 mb-2">
              <img src={user.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
              <div className="min-w-0">
                <p className="text-xs font-bold text-neutral-800 truncate">{user.name}</p>
                <p className="text-[10px] text-neutral-400 truncate">{user.email}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut size={14} />
            <span className="font-display tracking-wider uppercase">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};
