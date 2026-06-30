import { LogOut, DollarSign, Shield } from 'lucide-react';

export interface TabItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}

interface DashboardSidebarProps {
  tabs: TabItem[];
  activeTab: string;
  switchTab: (tab: string) => void;
  user: { name: string; avatar: string; role: string; drivingLicense?: { verified: boolean }; balance?: number };
  onLogout: () => void;
}

export const DashboardSidebar = ({ tabs, activeTab, switchTab, user, onLogout }: DashboardSidebarProps) => {
  const userRole = user?.role || 'user';

  return (
    <aside className="lg:w-56 shrink-0">
      <div className="bg-white border border-neutral-200/60 shadow-sm p-1.5 rounded-2xl flex lg:flex-col gap-1">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => switchTab(tab.id)}
            className={`flex items-center gap-2.5 px-4 py-2.5 text-xs font-display font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${activeTab === tab.id ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/20' : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50'}`}>
            <tab.icon size={15} />
            {tab.label}
          </button>
        ))}
        <button onClick={onLogout}
          className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-display font-bold uppercase tracking-wider rounded-xl transition-all text-red-500 hover:bg-red-50 cursor-pointer">
          <LogOut size={15} /> Logout
        </button>
      </div>

      <div className="mt-4 p-4 bg-white border border-neutral-200/60 shadow-sm rounded-2xl">
        <div className="flex items-center gap-3 mb-3">
          <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <p className="text-sm font-bold text-neutral-800 font-display">{user.name}</p>
            <p className="text-[10px] text-neutral-500 flex items-center gap-1">
              {userRole === 'host' ? 'Host' : userRole === 'company' ? 'Admin' : 'Renter'}
              <span className={`w-1.5 h-1.5 rounded-full ${userRole === 'host' ? 'bg-accent-amber' : userRole === 'company' ? 'bg-accent-blue' : 'bg-green-500'}`} />
            </p>
          </div>
        </div>
        {user.drivingLicense?.verified && (
          <div className="text-[10px] text-green-600 border-t border-neutral-100 pt-2 mt-2 flex items-center gap-1">
            <Shield size={11} /> License Verified
          </div>
        )}
        {userRole === 'host' && user.balance !== undefined && (
          <div className="text-[10px] text-neutral-500 border-t border-neutral-100 pt-2 mt-2 flex items-center gap-1">
            <DollarSign size={11} className="text-accent-blue" /> Balance: ৳{user.balance}
          </div>
        )}
      </div>
    </aside>
  );
};
