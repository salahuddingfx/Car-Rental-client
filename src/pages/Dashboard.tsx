import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  User, Calendar, Heart, BarChart3, Users, Globe, Settings, Car, DollarSign,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { DashboardSidebar } from './admin/DashboardSidebar';
import { DashboardHeader } from './admin/DashboardHeader';
import { DashboardOverview } from './admin/DashboardOverview';
import { DashboardBookingsTab } from './admin/DashboardBookingsTab';
import { DashboardWishlist } from './admin/DashboardWishlist';
import { DashboardMyCars } from './admin/DashboardMyCars';
import { DashboardEarnings } from './admin/DashboardEarnings';
import { DashboardAllCars } from './admin/DashboardAllCars';
import { DashboardUsers } from './admin/DashboardUsers';
import { DashboardAnalytics } from './admin/DashboardAnalytics';
import { DashboardSettings } from './admin/DashboardSettings';
import type { TabItem } from './admin/DashboardSidebar';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, logout } = useStore();

  const activeTab = searchParams.get('tab') || 'overview';
  const userRole = user?.role || 'user';

  if (!user) {
    return (
      <div className="pt-28 pb-20 text-center min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-light-bg to-white">
        <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mb-4">
          <User size={28} className="text-neutral-400" />
        </div>
        <p className="text-neutral-600 font-semibold mb-1">Sign in to access your dashboard</p>
        <p className="text-neutral-400 text-sm mb-6">Access your bookings, listings, and more.</p>
        <Button variant="primary" onClick={() => navigate('/auth')} className="rounded-xl">Sign In</Button>
      </div>
    );
  }

  const switchTab = (tab: string) => setSearchParams({ tab });

  const getTabs = (): TabItem[] => {
    const base: TabItem[] = [
      { id: 'overview', label: 'Overview', icon: User },
      { id: 'bookings', label: 'My Bookings', icon: Calendar },
    ];
    if (userRole === 'user') base.push({ id: 'wishlist', label: 'Wishlist', icon: Heart });
    if (userRole === 'host') {
      base.push(
        { id: 'my-cars', label: 'My Cars', icon: Car },
        { id: 'earnings', label: 'Earnings', icon: DollarSign },
      );
    }
    if (userRole === 'company') {
      base.push(
        { id: 'all-cars', label: 'All Cars', icon: Globe },
        { id: 'all-users', label: 'Users', icon: Users },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
      );
    }
    base.push({ id: 'settings', label: 'Settings', icon: Settings });
    return base;
  };

  const tabs = getTabs();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-light-bg to-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <DashboardHeader userRole={userRole} />
        <Breadcrumbs items={[{ label: 'My Dashboard' }]} />

        <div className="flex flex-col lg:flex-row gap-8">
          <DashboardSidebar
            tabs={tabs}
            activeTab={activeTab}
            switchTab={switchTab}
            user={user}
            onLogout={handleLogout}
          />

          <div className="flex-1 min-w-0 space-y-6">
            {activeTab === 'overview' && <DashboardOverview />}
            {activeTab === 'bookings' && <DashboardBookingsTab />}
            {activeTab === 'wishlist' && <DashboardWishlist />}
            {activeTab === 'my-cars' && <DashboardMyCars />}
            {activeTab === 'earnings' && <DashboardEarnings />}
            {activeTab === 'all-cars' && <DashboardAllCars />}
            {activeTab === 'all-users' && <DashboardUsers />}
            {activeTab === 'analytics' && <DashboardAnalytics />}
            {activeTab === 'settings' && <DashboardSettings />}
          </div>
        </div>
      </div>
    </div>
  );
};
