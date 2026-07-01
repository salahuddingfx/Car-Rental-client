import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Calendar, Heart, Car, DollarSign, Settings, LogOut, Shield } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { Breadcrumbs } from '../components/Breadcrumbs';

const tabs = [
  { id: 'overview', label: 'Overview', icon: User },
  { id: 'bookings', label: 'My Bookings', icon: Calendar },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Dashboard = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, logout, bookings, wishlist, cars, cancelBooking } = useStore();
  const activeTab = searchParams.get('tab') || 'overview';

  if (!user) {
    return (
      <div className="pt-28 pb-20 text-center min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-light-bg to-white">
        <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mb-4">
          <User size={28} className="text-neutral-400" />
        </div>
        <p className="text-neutral-600 font-semibold mb-1">Sign in to access your dashboard</p>
        <p className="text-neutral-400 text-sm mb-6">Access your bookings, wishlist, and more.</p>
        <Button variant="primary" onClick={() => navigate('/auth')} className="rounded-xl">Sign In</Button>
      </div>
    );
  }

  const switchTab = (tab: string) => setSearchParams({ tab });
  const userBookings = bookings.filter(b => b.userId === user.id);
  const wishlistCars = cars.filter(c => wishlist.includes(c.id));

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="pt-24 pb-20 bg-light-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Breadcrumbs items={[{ label: 'My Dashboard' }]} />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-56 shrink-0">
            <div className="bg-white border border-neutral-200/60 shadow-sm p-1.5 rounded-2xl flex lg:flex-col gap-1">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => switchTab(tab.id)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 text-xs font-display font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${activeTab === tab.id ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/20' : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50'}`}>
                  <tab.icon size={15} />
                  {tab.label}
                </button>
              ))}
              <button onClick={handleLogout}
                className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-display font-bold uppercase tracking-wider rounded-xl transition-all text-red-500 hover:bg-red-50 cursor-pointer">
                <LogOut size={15} /> Logout
              </button>
            </div>

            <div className="mt-4 p-4 bg-white border border-neutral-200/60 shadow-sm rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-bold text-neutral-800 font-display">{user.name}</p>
                  <p className="text-[10px] text-neutral-500">{user.email}</p>
                </div>
              </div>
              {user.drivingLicense?.verified && (
                <div className="text-[10px] text-green-600 border-t border-neutral-100 pt-2 mt-2 flex items-center gap-1">
                  <Shield size={11} /> License Verified
                </div>
              )}
              {user.balance !== undefined && (
                <div className="text-[10px] text-neutral-500 border-t border-neutral-100 pt-2 mt-2 flex items-center gap-1">
                  <DollarSign size={11} className="text-accent-blue" /> Balance: ৳{user.balance}
                </div>
              )}
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {[
                      { label: 'Total Bookings', value: userBookings.length, icon: Calendar, color: 'text-accent-blue' },
                      { label: 'Wishlist', value: `${wishlist.length} Cars`, icon: Heart, color: 'text-red-500' },
                      { label: 'Balance', value: `৳${user.balance || 0}`, icon: DollarSign, color: 'text-accent-amber' },
                    ].map((s) => (
                      <div key={s.label} className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl relative overflow-hidden">
                        <p className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1">{s.label}</p>
                        <span className="text-xl font-bold text-neutral-900 font-display">{s.value}</span>
                        <s.icon size={32} className={`absolute right-4 bottom-3 opacity-10 ${s.color}`} />
                      </div>
                    ))}
                  </div>

                  {userBookings.length > 0 && (
                    <div className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl">
                      <h3 className="font-display text-xs font-bold text-neutral-800 uppercase tracking-widest mb-4">Recent Bookings</h3>
                      <div className="space-y-3">
                        {userBookings.slice(0, 3).map(booking => {
                          const car = cars.find(c => c.id === booking.carId);
                          return (
                            <div key={booking.id} className="flex items-center justify-between p-3 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
                              <div className="flex items-center gap-3">
                                <Car size={16} className="text-neutral-400" />
                                <div>
                                  <p className="text-sm font-semibold text-neutral-800">{car?.name || 'Unknown'}</p>
                                  <p className="text-[10px] text-neutral-500">{booking.pickupDate} → {booking.returnDate}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-bold text-neutral-800">৳{booking.totalPrice}</p>
                                <span className={`text-[10px] font-medium ${booking.status === 'Upcoming' ? 'text-accent-blue' : booking.status === 'Completed' ? 'text-green-600' : 'text-neutral-400'}`}>{booking.status}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Bookings Tab */}
              {activeTab === 'bookings' && (
                <div className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl">
                  <h3 className="font-display text-xs font-bold text-neutral-800 uppercase tracking-widest mb-4">All Bookings</h3>
                  {userBookings.length > 0 ? (
                    <div className="space-y-3">
                      {userBookings.map(booking => {
                        const car = cars.find(c => c.id === booking.carId);
                        return (
                          <div key={booking.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="w-16 h-12 bg-neutral-100 rounded-lg overflow-hidden shrink-0">
                                {car && <img src={car.image} alt={car.name} className="w-full h-full object-cover" />}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-neutral-800">{car?.name || 'Unknown'}</p>
                                <p className="text-[10px] text-neutral-500">{booking.pickupDate} → {booking.returnDate} · {booking.totalDays} days</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <p className="text-sm font-bold text-neutral-800">৳{booking.totalPrice}</p>
                                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${booking.status === 'Upcoming' ? 'bg-accent-blue/10 text-accent-blue' : booking.status === 'Completed' ? 'bg-green-50 text-green-600' : 'bg-neutral-100 text-neutral-500'}`}>{booking.status}</span>
                              </div>
                              {booking.status === 'Upcoming' && (
                                <button onClick={() => cancelBooking(booking.id)} className="text-[10px] text-red-500 hover:text-red-700 cursor-pointer">Cancel</button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar size={32} className="mx-auto text-neutral-300 mb-3" />
                      <p className="text-neutral-500 text-sm">No bookings yet</p>
                      <Button variant="primary" size="sm" className="mt-4 rounded-xl" onClick={() => navigate('/cars')}>Browse Cars</Button>
                    </div>
                  )}
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl">
                  <h3 className="font-display text-xs font-bold text-neutral-800 uppercase tracking-widest mb-4">My Wishlist</h3>
                  {wishlistCars.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {wishlistCars.map(car => (
                        <div key={car.id} onClick={() => navigate(`/cars/${car.id}`)} className="flex items-center gap-3 p-3 border border-neutral-200 rounded-xl hover:border-accent-blue/20 transition-colors cursor-pointer">
                          <div className="w-20 h-14 bg-neutral-100 rounded-lg overflow-hidden shrink-0">
                            <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-neutral-800 truncate">{car.name}</p>
                            <p className="text-[10px] text-neutral-500">{car.brand} · {car.category}</p>
                            <p className="text-xs font-bold text-accent-blue">৳{car.price}/d</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Heart size={32} className="mx-auto text-neutral-300 mb-3" />
                      <p className="text-neutral-500 text-sm">No favorites yet</p>
                      <Button variant="primary" size="sm" className="mt-4 rounded-xl" onClick={() => navigate('/cars')}>Browse Cars</Button>
                    </div>
                  )}
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="bg-white border border-neutral-200/60 shadow-sm p-6 rounded-2xl">
                  <h3 className="font-display text-xs font-bold text-neutral-800 uppercase tracking-widest mb-4">Profile Settings</h3>
                  <div className="space-y-4 max-w-md">
                    <div className="flex items-center gap-4 mb-6">
                      <img src={user.avatar} alt="" className="w-16 h-16 rounded-full object-cover" />
                      <div>
                        <p className="font-bold text-neutral-800">{user.name}</p>
                        <p className="text-sm text-neutral-500">{user.email}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Name</label>
                      <input defaultValue={user.name} className="w-full border border-neutral-200 text-sm text-neutral-800 p-2.5 rounded-xl outline-none focus:border-accent-blue" />
                    </div>
                    <div>
                      <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Email</label>
                      <input defaultValue={user.email} className="w-full border border-neutral-200 text-sm text-neutral-800 p-2.5 rounded-xl outline-none focus:border-accent-blue" />
                    </div>
                    <Button variant="primary" className="rounded-xl">Save Changes</Button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
