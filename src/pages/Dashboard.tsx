import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Calendar, Heart, Car, DollarSign, Settings, LogOut, Shield, Plus, Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../store/useStore';
import { useThemeStore } from '../store/useThemeStore';
import { Button } from '../components/ui/Button';
import { Breadcrumbs } from '../components/Breadcrumbs';

const baseTabs = [
  { id: 'overview', label: 'Overview', icon: User },
  { id: 'bookings', label: 'My Bookings', icon: Calendar },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const driverTabs = [
  { id: 'my-cars', label: 'My Cars', icon: Car },
  { id: 'add-car', label: 'Add Car', icon: Plus },
];

export const Dashboard = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, logout, bookings, wishlist, cars, cancelBooking, addCar, deleteCar, updateProfile } = useStore();
  const { isDark, toggleTheme } = useThemeStore();
  const activeTab = searchParams.get('tab') || 'overview';
  const [profileName, setProfileName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [editProfile, setEditProfile] = useState(false);

  const isDriver = user?.role === 'driver' || user?.role === 'host';
  const tabs = isDriver ? [...baseTabs.slice(0, 3), ...driverTabs, baseTabs[3]] : baseTabs;

  const [newCar, setNewCar] = useState({
    name: '', brand: '', category: 'Luxury' as const, price: 0, location: 'Dhaka',
    seats: 4, transmission: 'Automatic' as const, fuelType: 'Petrol' as const, year: 2024,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800',
    images: [] as string[], description: '', features: [] as string[], available: true,
  });

  if (!user) {
    return (
      <div className="pt-28 pb-20 text-center min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-light-bg to-white dark:from-neutral-900 dark:to-neutral-950">
        <div className="w-16 h-16 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
          <User size={28} className="text-neutral-400" />
        </div>
        <p className="text-neutral-600 dark:text-neutral-300 font-semibold mb-1">Sign in to access your dashboard</p>
        <p className="text-neutral-400 text-sm mb-6">Access your bookings, wishlist, and more.</p>
        <Button variant="primary" onClick={() => navigate('/auth')} className="rounded-xl">Sign In</Button>
      </div>
    );
  }

  const switchTab = (tab: string) => setSearchParams({ tab });
  const userBookings = bookings.filter(b => b.userId === user.id);
  const wishlistCars = cars.filter(c => wishlist.includes(c.id));
  const myCars = isDriver ? cars.filter(c => c.hostName === user.name) : [];
  const handleLogout = () => { logout(); navigate('/'); };

  const handleAddCar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCar.name || !newCar.brand || newCar.price <= 0) return;
    addCar({ ...newCar });
    setNewCar({
      name: '', brand: '', category: 'Luxury', price: 0, location: 'Dhaka',
      seats: 4, transmission: 'Automatic', fuelType: 'Petrol', year: 2024,
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800',
      images: [], description: '', features: [], available: true,
    });
    switchTab('my-cars');
  };

  return (
    <div className="pt-24 pb-20 bg-light-bg dark:bg-neutral-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Breadcrumbs items={[{ label: 'My Dashboard' }]} />
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-56 shrink-0">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 shadow-sm p-1.5 rounded-2xl flex lg:flex-col gap-1 transition-colors">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => switchTab(tab.id)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 text-xs font-display font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${activeTab === tab.id ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/20' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800'}`}>
                  <tab.icon size={15} />{tab.label}
                </button>
              ))}
              <button onClick={handleLogout} className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-display font-bold uppercase tracking-wider rounded-xl transition-all text-red-500 hover:bg-red-50 dark:hover:bg-red-950 cursor-pointer">
                <LogOut size={15} /> Logout
              </button>
            </div>
            <div className="mt-4 p-4 bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 shadow-sm rounded-2xl transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-bold text-neutral-800 dark:text-neutral-100 font-display">{user.name}</p>
                  <p className="text-[10px] text-neutral-500">{user.email}</p>
                </div>
              </div>
              <div className="text-[10px] text-accent-blue border-t border-neutral-100 dark:border-neutral-800 pt-2 mt-2 capitalize">{user.role}</div>
              {user.drivingLicense?.verified && (
                <div className="text-[10px] text-green-600 border-t border-neutral-100 dark:border-neutral-800 pt-2 mt-2 flex items-center gap-1">
                  <Shield size={11} /> License Verified
                </div>
              )}
              {user.balance !== undefined && (
                <div className="text-[10px] text-neutral-500 border-t border-neutral-100 dark:border-neutral-800 pt-2 mt-2 flex items-center gap-1">
                  <DollarSign size={11} className="text-accent-blue" /> Balance: ৳{user.balance}
                </div>
              )}
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={activeTab}>

              {activeTab === 'overview' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {[
                      { label: 'Total Bookings', value: userBookings.length, icon: Calendar, color: 'text-accent-blue' },
                      { label: 'Wishlist', value: `${wishlist.length} Cars`, icon: Heart, color: 'text-red-500' },
                      { label: 'Balance', value: `৳${user.balance || 0}`, icon: DollarSign, color: 'text-accent-amber' },
                      ...(isDriver ? [{ label: 'My Cars', value: myCars.length, icon: Car, color: 'text-green-500' }] : []),
                    ].map((s) => (
                      <div key={s.label} className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 shadow-sm p-5 rounded-2xl relative overflow-hidden transition-colors">
                        <p className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1">{s.label}</p>
                        <span className="text-xl font-bold text-neutral-900 dark:text-neutral-100 font-display">{s.value}</span>
                        <s.icon size={32} className={`absolute right-4 bottom-3 opacity-10 ${s.color}`} />
                      </div>
                    ))}
                  </div>
                  {userBookings.length > 0 && (
                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 shadow-sm p-5 rounded-2xl transition-colors">
                      <h3 className="font-display text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest mb-4">Recent Bookings</h3>
                      <div className="space-y-3">
                        {userBookings.slice(0, 3).map(booking => {
                          const car = cars.find(c => c.id === booking.carId);
                          return (
                            <div key={booking.id} className="flex items-center justify-between p-3 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                              <div className="flex items-center gap-3">
                                <Car size={16} className="text-neutral-400" />
                                <div>
                                  <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">{car?.name || 'Unknown'}</p>
                                  <p className="text-[10px] text-neutral-500">{booking.pickupDate} → {booking.returnDate}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200">৳{booking.totalPrice}</p>
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

              {activeTab === 'bookings' && (
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 shadow-sm p-5 rounded-2xl transition-colors">
                  <h3 className="font-display text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest mb-4">All Bookings</h3>
                  {userBookings.length > 0 ? (
                    <div className="space-y-3">
                      {userBookings.map(booking => {
                        const car = cars.find(c => c.id === booking.carId);
                        return (
                          <div key={booking.id} className="flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="w-16 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden shrink-0">
                                {car && <img src={car.image} alt={car.name} className="w-full h-full object-cover" />}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">{car?.name || 'Unknown'}</p>
                                <p className="text-[10px] text-neutral-500">{booking.pickupDate} → {booking.returnDate} · {booking.totalDays} days</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200">৳{booking.totalPrice}</p>
                                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${booking.status === 'Upcoming' ? 'bg-accent-blue/10 text-accent-blue' : booking.status === 'Completed' ? 'bg-green-50 text-green-600' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'}`}>{booking.status}</span>
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
                      <Calendar size={32} className="mx-auto text-neutral-300 dark:text-neutral-600 mb-3" />
                      <p className="text-neutral-500 text-sm">No bookings yet</p>
                      <Button variant="primary" size="sm" className="mt-4 rounded-xl" onClick={() => navigate('/cars')}>Browse Cars</Button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 shadow-sm p-5 rounded-2xl transition-colors">
                  <h3 className="font-display text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest mb-4">My Wishlist</h3>
                  {wishlistCars.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {wishlistCars.map(car => (
                        <div key={car.id} onClick={() => navigate(`/cars/${car.id}`)} className="flex items-center gap-3 p-3 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-accent-blue/20 transition-colors cursor-pointer">
                          <div className="w-20 h-14 bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden shrink-0">
                            <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200 truncate">{car.name}</p>
                            <p className="text-[10px] text-neutral-500">{car.brand} · {car.category}</p>
                            <p className="text-xs font-bold text-accent-blue">৳{car.price}/d</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Heart size={32} className="mx-auto text-neutral-300 dark:text-neutral-600 mb-3" />
                      <p className="text-neutral-500 text-sm">No favorites yet</p>
                      <Button variant="primary" size="sm" className="mt-4 rounded-xl" onClick={() => navigate('/cars')}>Browse Cars</Button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'my-cars' && isDriver && (
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 shadow-sm p-5 rounded-2xl transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest">My Cars</h3>
                    <Button variant="primary" size="sm" className="rounded-xl" onClick={() => switchTab('add-car')}>
                      <Plus size={14} className="mr-1" /> Add Car
                    </Button>
                  </div>
                  {myCars.length > 0 ? (
                    <div className="space-y-3">
                      {myCars.map(car => (
                        <div key={car.id} className="flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-20 h-14 bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden shrink-0">
                              <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">{car.name}</p>
                              <p className="text-[10px] text-neutral-500">{car.brand} · {car.category} · {car.location}</p>
                              <p className="text-xs font-bold text-accent-blue">৳{car.price}/d</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => navigate(`/cars/${car.id}`)} className="p-2 text-neutral-400 hover:text-accent-blue transition-colors rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"><Edit2 size={14} /></button>
                            <button onClick={() => deleteCar(car.id)} className="p-2 text-neutral-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-950 cursor-pointer"><Trash2 size={14} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Car size={32} className="mx-auto text-neutral-300 dark:text-neutral-600 mb-3" />
                      <p className="text-neutral-500 text-sm mb-2">You haven't listed any cars yet</p>
                      <Button variant="primary" size="sm" className="rounded-xl" onClick={() => switchTab('add-car')}>Add Your First Car</Button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'add-car' && isDriver && (
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 shadow-sm p-6 rounded-2xl transition-colors">
                  <h3 className="font-display text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest mb-6">Add New Car</h3>
                  <form onSubmit={handleAddCar} className="space-y-5 max-w-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Car Name *</label>
                        <input required value={newCar.name} onChange={e => setNewCar(p => ({ ...p, name: e.target.value }))}
                          className="w-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-neutral-800 dark:text-neutral-200 p-2.5 rounded-xl outline-none focus:border-accent-blue transition-colors" placeholder="e.g. BMW M4 Competition" />
                      </div>
                      <div>
                        <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Brand *</label>
                        <input required value={newCar.brand} onChange={e => setNewCar(p => ({ ...p, brand: e.target.value }))}
                          className="w-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-neutral-800 dark:text-neutral-200 p-2.5 rounded-xl outline-none focus:border-accent-blue transition-colors" placeholder="e.g. BMW" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Category</label>
                        <select value={newCar.category} onChange={e => setNewCar(p => ({ ...p, category: e.target.value as any }))}
                          className="w-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-neutral-800 dark:text-neutral-200 p-2.5 rounded-xl outline-none focus:border-accent-blue transition-colors">
                          <option>Luxury</option><option>Sports</option><option>Supercar</option><option>Electric</option><option>SUV</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Price/Day (৳) *</label>
                        <input required type="number" min="1" value={newCar.price || ''} onChange={e => setNewCar(p => ({ ...p, price: Number(e.target.value) }))}
                          className="w-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-neutral-800 dark:text-neutral-200 p-2.5 rounded-xl outline-none focus:border-accent-blue transition-colors" placeholder="e.g. 8000" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Seats</label>
                        <select value={newCar.seats} onChange={e => setNewCar(p => ({ ...p, seats: Number(e.target.value) }))}
                          className="w-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-neutral-800 dark:text-neutral-200 p-2.5 rounded-xl outline-none focus:border-accent-blue transition-colors">
                          <option>2</option><option>4</option><option>5</option><option>7</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Transmission</label>
                        <select value={newCar.transmission} onChange={e => setNewCar(p => ({ ...p, transmission: e.target.value as any }))}
                          className="w-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-neutral-800 dark:text-neutral-200 p-2.5 rounded-xl outline-none focus:border-accent-blue transition-colors">
                          <option>Automatic</option><option>Manual</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Fuel</label>
                        <select value={newCar.fuelType} onChange={e => setNewCar(p => ({ ...p, fuelType: e.target.value as any }))}
                          className="w-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-neutral-800 dark:text-neutral-200 p-2.5 rounded-xl outline-none focus:border-accent-blue transition-colors">
                          <option>Petrol</option><option>Diesel</option><option>Electric</option><option>Hybrid</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Location</label>
                        <input value={newCar.location} onChange={e => setNewCar(p => ({ ...p, location: e.target.value }))}
                          className="w-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-neutral-800 dark:text-neutral-200 p-2.5 rounded-xl outline-none focus:border-accent-blue transition-colors" />
                      </div>
                      <div>
                        <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Year</label>
                        <input type="number" value={newCar.year} onChange={e => setNewCar(p => ({ ...p, year: Number(e.target.value) }))}
                          className="w-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-neutral-800 dark:text-neutral-200 p-2.5 rounded-xl outline-none focus:border-accent-blue transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Description</label>
                      <textarea rows={3} value={newCar.description} onChange={e => setNewCar(p => ({ ...p, description: e.target.value }))}
                        className="w-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-neutral-800 dark:text-neutral-200 p-2.5 rounded-xl outline-none focus:border-accent-blue resize-none transition-colors" placeholder="Tell renters about your car..." />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button type="submit" variant="primary" className="rounded-xl">Add Car</Button>
                      <Button type="button" variant="outline" className="rounded-xl" onClick={() => switchTab('my-cars')}>Cancel</Button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 shadow-sm p-6 rounded-2xl transition-colors space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest">Settings</h3>
                    <button onClick={toggleTheme} className="text-xs text-accent-blue hover:underline cursor-pointer">
                      {isDark ? 'Light Mode' : 'Dark Mode'}
                    </button>
                  </div>

                  <div className="border-b border-neutral-100 dark:border-neutral-800 pb-6">
                    <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 mb-4">Profile</h4>
                    <div className="flex items-center gap-4 mb-4">
                      <img src={user.avatar} alt="" className="w-16 h-16 rounded-full object-cover" />
                      <div>
                        <p className="font-bold text-neutral-800 dark:text-neutral-100">{user.name}</p>
                        <p className="text-sm text-neutral-500">{user.email}</p>
                        <p className="text-xs text-accent-blue capitalize mt-0.5">{user.role}</p>
                      </div>
                    </div>
                    {!editProfile ? (
                      <Button variant="outline" size="sm" className="rounded-xl" onClick={() => { setProfileName(user.name); setProfileEmail(user.email); setEditProfile(true); }}>Edit Profile</Button>
                    ) : (
                      <div className="space-y-3 max-w-md">
                        <div>
                          <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Name</label>
                          <input value={profileName} onChange={e => setProfileName(e.target.value)} className="w-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-neutral-800 dark:text-neutral-200 p-2.5 rounded-xl outline-none focus:border-accent-blue transition-colors" />
                        </div>
                        <div>
                          <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Email</label>
                          <input value={profileEmail} onChange={e => setProfileEmail(e.target.value)} className="w-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-neutral-800 dark:text-neutral-200 p-2.5 rounded-xl outline-none focus:border-accent-blue transition-colors" />
                        </div>
                        <div className="flex gap-2">
                          <Button variant="primary" size="sm" className="rounded-xl" onClick={() => { updateProfile(profileName, profileEmail, user.avatar); setEditProfile(false); }}>Save</Button>
                          <Button variant="outline" size="sm" className="rounded-xl" onClick={() => setEditProfile(false)}>Cancel</Button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-b border-neutral-100 dark:border-neutral-800 pb-6">
                    <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 mb-3">Driving License</h4>
                    {user.drivingLicense ? (
                      <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-xl space-y-1">
                        <p className="text-xs text-neutral-500">License: <span className="text-neutral-800 dark:text-neutral-200 font-mono">{user.drivingLicense.licenseNumber}</span></p>
                        <p className="text-xs text-neutral-500">Expiry: <span className="text-neutral-800 dark:text-neutral-200">{user.drivingLicense.expiryDate}</span></p>
                        <p className="text-xs text-neutral-500">Country: <span className="text-neutral-800 dark:text-neutral-200">{user.drivingLicense.country}</span></p>
                        <p className="text-[10px] text-green-600 flex items-center gap-1 mt-1"><Shield size={11} /> Verified</p>
                      </div>
                    ) : (
                      <p className="text-sm text-neutral-500">No license on file. <button className="text-accent-blue hover:underline cursor-pointer">Add one</button></p>
                    )}
                  </div>

                  <div className="border-b border-neutral-100 dark:border-neutral-800 pb-6">
                    <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 mb-3">Appearance</h4>
                    <div className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                      <span className="text-sm text-neutral-700 dark:text-neutral-300">Dark Mode</span>
                      <button onClick={toggleTheme} className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer flex-shrink-0 ${isDark ? 'bg-accent-blue' : 'bg-neutral-300'}`}>
                        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${isDark ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 mb-3">Account</h4>
                    <div className="space-y-2">
                      <button className="w-full text-left text-sm text-neutral-700 dark:text-neutral-300 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors cursor-pointer">Change Password</button>
                      <button className="w-full text-left text-sm text-red-500 p-3 bg-red-50 dark:bg-red-950 rounded-xl hover:bg-red-100 dark:hover:bg-red-900 transition-colors cursor-pointer">Delete Account</button>
                    </div>
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
