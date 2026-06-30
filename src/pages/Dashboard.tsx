import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User, Calendar, Heart, Shield, CreditCard, LogOut, Settings, Car, Clock,
  PlusCircle, BarChart3, Users, Globe, Star, X, DollarSign, Fuel, Disc,
  Edit2, Trash2,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import type { Car as CarType } from '../store/useStore';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, bookings, wishlist, cars, logout, toggleWishlist, addCar, editCar, deleteCar } = useStore();

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

  const userBookings = bookings.filter(b => b.userId === user.id);
  const totalSpend = userBookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const rentingDays = userBookings.reduce((sum, b) => sum + b.totalDays, 0);
  const wishlistCars = cars.filter(c => wishlist.includes(c.id));

  // Host-specific
  const hostCars = cars.filter(c => c.hostName === user.name);
  const hostBookings = bookings.filter(b => hostCars.some(c => c.id === b.carId));
  const hostEarnings = hostBookings.reduce((sum, b) => sum + b.totalPrice, 0);

  // Company-specific (admin sees all)
  const allBookings = bookings;
  const totalRevenue = allBookings.reduce((sum, b) => sum + b.totalPrice, 0);

  const switchTab = (tab: string) => setSearchParams({ tab });

  // Add Car form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [editCarId, setEditCarId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '', brand: '', category: 'Luxury' as CarType['category'], price: 0,
    image: '', fuel: 'Petrol' as CarType['fuel'], transmission: 'Automatic' as CarType['transmission'],
    seats: 5, power: '', speed: '', description: '', location: '', features: '',
  });

  const resetForm = () => {
    setForm({ name: '', brand: '', category: 'Luxury', price: 0, image: '', fuel: 'Petrol', transmission: 'Automatic', seats: 5, power: '', speed: '', description: '', location: '', features: '' });
    setEditCarId(null);
    setShowAddForm(false);
  };

  const handleAddCar = (e: React.FormEvent) => {
    e.preventDefault();
    if (editCarId) {
      editCar(editCarId, {
        ...form,
        features: form.features.split(',').map(f => f.trim()).filter(Boolean),
      });
    } else {
      addCar({
        ...form,
        price: Number(form.price),
        seats: Number(form.seats),
        isAvailable: true,
        features: form.features.split(',').map(f => f.trim()).filter(Boolean),
      });
    }
    resetForm();
  };

  const startEdit = (car: CarType) => {
    setForm({
      name: car.name, brand: car.brand, category: car.category, price: car.price,
      image: car.image, fuel: car.fuel, transmission: car.transmission, seats: car.seats,
      power: car.power, speed: car.speed, description: car.description, location: car.location,
      features: car.features.join(', '),
    });
    setEditCarId(car.id);
    setShowAddForm(true);
  };

  // Tabs based on role
  const getTabs = () => {
    const base = [
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-light-bg to-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">Dashboard</h1>
            <p className="text-sm text-neutral-500 mt-1">
              {userRole === 'host' ? 'Manage your listings and earnings' :
               userRole === 'company' ? 'Full platform management' :
               'Manage your bookings and profile'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {userRole === 'host' && (
              <Button variant="primary" size="sm" onClick={() => { resetForm(); setShowAddForm(true); }}
                className="rounded-xl flex items-center gap-1.5">
                <PlusCircle size={14} /> Add Car
              </Button>
            )}
          </div>
        </div>

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
              <button onClick={() => { logout(); navigate('/'); }}
                className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-display font-bold uppercase tracking-wider rounded-xl transition-all text-red-500 hover:bg-red-50 cursor-pointer">
                <LogOut size={15} /> Logout
              </button>
            </div>

            {/* User card */}
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

          {/* Main Content */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* ===================== OVERVIEW ===================== */}
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {userRole === 'host' ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                      {[
                        { label: 'Listed Cars', value: `${hostCars.length}`, icon: Car, color: 'text-accent-blue' },
                        { label: 'Total Earnings', value: `৳${hostEarnings}`, icon: DollarSign, color: 'text-accent-amber' },
                        { label: 'Active Bookings', value: `${hostBookings.filter(b => b.status === 'Upcoming' || b.status === 'Active').length}`, icon: Calendar, color: 'text-green-500' },
                      ].map((s, i) => (
                        <div key={i} className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl relative overflow-hidden">
                          <p className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1">{s.label}</p>
                          <span className="text-xl font-bold text-neutral-900 font-display">{s.value}</span>
                          <s.icon size={32} className={`absolute right-4 bottom-3 opacity-10 ${s.color}`} />
                        </div>
                      ))}
                    </div>
                    {hostCars.length > 0 && (
                      <div className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl">
                        <h3 className="font-display text-xs font-bold text-neutral-800 uppercase tracking-widest mb-4">Your Cars</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {hostCars.slice(0, 4).map(car => (
                            <div key={car.id} className="flex items-center gap-3 p-3 border border-neutral-200 rounded-xl hover:border-accent-blue/20 transition-colors">
                              <div className="w-16 h-12 bg-neutral-100 rounded-lg overflow-hidden shrink-0">
                                <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-neutral-800 truncate">{car.name}</p>
                                <p className="text-[10px] text-neutral-500">৳{car.price}/d · {car.category}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : userRole === 'company' ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                      {[
                        { label: 'Total Cars', value: `${cars.length}`, icon: Car, color: 'text-accent-blue' },
                        { label: 'Total Users', value: '1,247', icon: Users, color: 'text-accent-amber' },
                        { label: 'Total Revenue', value: `৳${totalRevenue}`, icon: DollarSign, color: 'text-green-500' },
                        { label: 'Avg Rating', value: '4.9', icon: Star, color: 'text-purple-500' },
                      ].map((s, i) => (
                        <div key={i} className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl relative overflow-hidden">
                          <p className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1">{s.label}</p>
                          <span className="text-xl font-bold text-neutral-900 font-display">{s.value}</span>
                          <s.icon size={32} className={`absolute right-4 bottom-3 opacity-10 ${s.color}`} />
                        </div>
                      ))}
                    </div>
                    <div className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl">
                      <h3 className="font-display text-xs font-bold text-neutral-800 uppercase tracking-widest mb-4">Recent Platform Activity</h3>
                      <div className="space-y-2">
                        {allBookings.slice(0, 5).map(b => {
                          const car = cars.find(c => c.id === b.carId);
                          return (
                            <div key={b.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl">
                              <div className="flex items-center gap-3">
                                <Car size={16} className="text-neutral-400" />
                                <div>
                                  <p className="text-xs font-semibold text-neutral-800">{car?.name || 'Unknown'} — {b.driverInfo.fullName}</p>
                                  <p className="text-[10px] text-neutral-500">{b.pickupDate} → {b.returnDate}</p>
                                </div>
                              </div>
                              <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full ${b.status === 'Upcoming' ? 'bg-accent-blue/10 text-accent-blue' : b.status === 'Completed' ? 'bg-green-50 text-green-600' : 'bg-neutral-100 text-neutral-500'}`}>{b.status}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  /* USER overview */
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                      {[
                        { label: 'Total Spent', value: `৳${totalSpend}`, icon: CreditCard, color: 'text-accent-blue' },
                        { label: 'Rental Days', value: `${rentingDays} Days`, icon: Clock, color: 'text-accent-amber' },
                        { label: 'Wishlist', value: `${wishlist.length} Cars`, icon: Heart, color: 'text-red-500' },
                      ].map((s, i) => (
                        <div key={i} className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl relative overflow-hidden">
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
              </motion.div>
            )}

            {/* ===================== BOOKINGS ===================== */}
            {activeTab === 'bookings' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl">
                <h3 className="font-display text-xs font-bold text-neutral-800 uppercase tracking-widest border-b border-neutral-100 pb-3 mb-4">
                  {userRole === 'host' ? 'Booking Requests' : 'All Bookings'}
                </h3>
                {(userRole === 'host' ? hostBookings : userBookings).length > 0 ? (
                  <div className="space-y-3">
                    {(userRole === 'host' ? hostBookings : userBookings).map(booking => {
                      const car = cars.find(c => c.id === booking.carId);
                      return (
                        <div key={booking.id} className="flex items-center justify-between p-3 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="w-14 h-11 bg-neutral-100 rounded-lg overflow-hidden shrink-0">
                              {car && <img src={car.image} alt={car.name} className="w-full h-full object-cover" />}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-neutral-800">{car?.name || 'Unknown'}</p>
                              <p className="text-[10px] text-neutral-500">{booking.pickupDate} to {booking.returnDate} · {booking.totalDays} days</p>
                              {userRole === 'host' && <p className="text-[9px] text-neutral-400 mt-0.5">Renter: {booking.driverInfo.fullName}</p>}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-neutral-800">৳{booking.totalPrice}</p>
                            <span className={`text-[10px] font-medium ${booking.status === 'Upcoming' ? 'text-accent-blue' : booking.status === 'Completed' ? 'text-green-600' : booking.status === 'Active' ? 'text-accent-amber' : 'text-neutral-400'}`}>{booking.status}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-neutral-500 text-center py-12">No bookings yet.</p>
                )}
              </motion.div>
            )}

            {/* ===================== WISHLIST (user only) ===================== */}
            {activeTab === 'wishlist' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl">
                <h3 className="font-display text-xs font-bold text-neutral-800 uppercase tracking-widest border-b border-neutral-100 pb-3 mb-4">Saved Vehicles</h3>
                {wishlistCars.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {wishlistCars.map(car => (
                      <div key={car.id} className="flex items-center justify-between p-3 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer" onClick={() => navigate(`/cars/${car.id}`)}>
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-12 bg-neutral-100 rounded-lg overflow-hidden shrink-0">
                            <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-neutral-800">{car.name}</p>
                            <p className="text-[10px] text-neutral-500">{car.brand} · {car.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-neutral-800 font-display">৳{car.price}<span className="text-[10px] text-neutral-500 font-normal">/d</span></span>
                          <button onClick={(e) => { e.stopPropagation(); toggleWishlist(car.id); }}
                            className="text-red-400 hover:text-red-500 transition-colors cursor-pointer p-1">
                            <Heart size={15} className="fill-red-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart size={24} className="mx-auto text-neutral-300 mb-3" />
                    <p className="text-sm text-neutral-500">Your wishlist is empty.</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* ===================== MY CARS (host only) ===================== */}
            {activeTab === 'my-cars' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-xs font-bold text-neutral-800 uppercase tracking-widest">Your Vehicles ({hostCars.length})</h3>
                  <Button variant="primary" size="sm" onClick={() => { resetForm(); setShowAddForm(true); }}
                    className="rounded-xl flex items-center gap-1.5">
                    <PlusCircle size={14} /> Add Car
                  </Button>
                </div>

                {hostCars.length > 0 ? (
                  <div className="space-y-3">
                    {hostCars.map(car => (
                      <div key={car.id} className="bg-white border border-neutral-200/60 shadow-sm p-4 rounded-2xl flex items-center gap-4">
                        <div className="w-20 h-16 bg-neutral-100 rounded-xl overflow-hidden shrink-0">
                          <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <h4 className="text-sm font-bold text-neutral-800">{car.name}</h4>
                            <span className="text-[9px] font-display font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent-blue/10 text-accent-blue">{car.category}</span>
                          </div>
                          <p className="text-[10px] text-neutral-500">{car.brand} · {car.location} · ৳{car.price}/day</p>
                          <div className="flex items-center gap-3 mt-1.5 text-[10px] text-neutral-400">
                            <span className="flex items-center gap-1"><Fuel size={11} /> {car.fuel}</span>
                            <span className="flex items-center gap-1"><Disc size={11} /> {car.transmission}</span>
                            <span className="flex items-center gap-1"><Star size={11} className="text-amber-400" /> {car.rating}</span>
                            <span className={`flex items-center gap-1 ${car.isAvailable ? 'text-green-500' : 'text-red-400'}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${car.isAvailable ? 'bg-green-500' : 'bg-red-400'}`} />
                              {car.isAvailable ? 'Available' : 'Booked'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button onClick={() => startEdit(car)}
                            className="p-2 text-neutral-400 hover:text-accent-blue hover:bg-accent-blue/5 rounded-lg transition-all cursor-pointer">
                            <Edit2 size={15} />
                          </button>
                          <button onClick={() => deleteCar(car.id)}
                            className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white border border-neutral-200/60 shadow-sm p-12 rounded-2xl text-center">
                    <Car size={32} className="mx-auto text-neutral-300 mb-3" />
                    <p className="text-neutral-600 font-semibold mb-1">No cars listed yet</p>
                    <p className="text-neutral-400 text-sm mb-4">Add your first vehicle to start earning.</p>
                    <Button variant="primary" size="sm" onClick={() => { resetForm(); setShowAddForm(true); }}
                      className="rounded-xl">Add Your First Car</Button>
                  </div>
                )}

                {/* Add/Edit Car Form Modal */}
                {showAddForm && (
                  <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => resetForm()}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-between mb-5">
                        <h3 className="font-display text-sm font-bold text-neutral-800 uppercase tracking-wider">{editCarId ? 'Edit Car' : 'Add New Car'}</h3>
                        <button onClick={resetForm} className="text-neutral-400 hover:text-neutral-600 cursor-pointer"><X size={18} /></button>
                      </div>
                      <form onSubmit={handleAddCar} className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Car Name</label>
                            <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                              className="w-full border border-neutral-200 text-sm text-neutral-800 p-2.5 rounded-lg outline-none focus:border-accent-blue" />
                          </div>
                          <div>
                            <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Brand</label>
                            <input required value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })}
                              className="w-full border border-neutral-200 text-sm text-neutral-800 p-2.5 rounded-lg outline-none focus:border-accent-blue" />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Category</label>
                            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value as CarType['category'] })}
                              className="w-full border border-neutral-200 text-sm text-neutral-800 p-2.5 rounded-lg outline-none focus:border-accent-blue bg-white">
                              {['Luxury', 'Sports', 'Supercar', 'SUV', 'Electric'].map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Price/day (৳)</label>
                            <input required type="number" value={form.price || ''} onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                              className="w-full border border-neutral-200 text-sm text-neutral-800 p-2.5 rounded-lg outline-none focus:border-accent-blue" />
                          </div>
                          <div>
                            <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Seats</label>
                            <input required type="number" value={form.seats} onChange={e => setForm({ ...form, seats: Number(e.target.value) })}
                              className="w-full border border-neutral-200 text-sm text-neutral-800 p-2.5 rounded-lg outline-none focus:border-accent-blue" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Fuel</label>
                            <select value={form.fuel} onChange={e => setForm({ ...form, fuel: e.target.value as CarType['fuel'] })}
                              className="w-full border border-neutral-200 text-sm text-neutral-800 p-2.5 rounded-lg outline-none focus:border-accent-blue bg-white">
                              {['Petrol', 'Electric', 'Hybrid', 'Diesel'].map(f => <option key={f} value={f}>{f}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Transmission</label>
                            <select value={form.transmission} onChange={e => setForm({ ...form, transmission: e.target.value as CarType['transmission'] })}
                              className="w-full border border-neutral-200 text-sm text-neutral-800 p-2.5 rounded-lg outline-none focus:border-accent-blue bg-white">
                              {['Automatic', 'Manual'].map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Power (HP)</label>
                            <input value={form.power} onChange={e => setForm({ ...form, power: e.target.value })}
                              className="w-full border border-neutral-200 text-sm text-neutral-800 p-2.5 rounded-lg outline-none focus:border-accent-blue" />
                          </div>
                          <div>
                            <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Speed (0-60)</label>
                            <input value={form.speed} onChange={e => setForm({ ...form, speed: e.target.value })}
                              className="w-full border border-neutral-200 text-sm text-neutral-800 p-2.5 rounded-lg outline-none focus:border-accent-blue" />
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Location</label>
                          <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}
                            className="w-full border border-neutral-200 text-sm text-neutral-800 p-2.5 rounded-lg outline-none focus:border-accent-blue" />
                        </div>
                        <div>
                          <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Image URL</label>
                          <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })}
                            className="w-full border border-neutral-200 text-sm text-neutral-800 p-2.5 rounded-lg outline-none focus:border-accent-blue" />
                        </div>
                        <div>
                          <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Features (comma separated)</label>
                          <input value={form.features} onChange={e => setForm({ ...form, features: e.target.value })}
                            className="w-full border border-neutral-200 text-sm text-neutral-800 p-2.5 rounded-lg outline-none focus:border-accent-blue" />
                        </div>
                        <div>
                          <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Description</label>
                          <textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                            className="w-full border border-neutral-200 text-sm text-neutral-800 p-2.5 rounded-lg outline-none focus:border-accent-blue resize-none" />
                        </div>
                        <div className="flex gap-3 pt-2">
                          <Button type="submit" variant="primary" size="sm" className="rounded-xl flex-1">
                            {editCarId ? 'Update Car' : 'Add Car'}
                          </Button>
                          <Button variant="outline" size="sm" onClick={resetForm} className="rounded-xl">Cancel</Button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* ===================== EARNINGS (host only) ===================== */}
            {activeTab === 'earnings' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {[
                    { label: 'Total Earnings', value: `৳${hostEarnings}`, icon: DollarSign, color: 'text-accent-amber' },
                    { label: 'Completed Trips', value: `${hostBookings.filter(b => b.status === 'Completed').length}`, icon: Star, color: 'text-green-500' },
                    { label: 'Avg. Per Rental', value: hostBookings.length > 0 ? `৳${Math.round(hostEarnings / hostBookings.length)}` : '৳0', icon: BarChart3, color: 'text-accent-blue' },
                  ].map((s, i) => (
                    <div key={i} className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl relative overflow-hidden">
                      <p className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1">{s.label}</p>
                      <span className="text-xl font-bold text-neutral-900 font-display">{s.value}</span>
                      <s.icon size={32} className={`absolute right-4 bottom-3 opacity-10 ${s.color}`} />
                    </div>
                  ))}
                </div>

                {hostBookings.filter(b => b.status === 'Completed').length > 0 ? (
                  <div className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl">
                    <h3 className="font-display text-xs font-bold text-neutral-800 uppercase tracking-widest mb-4">Earnings History</h3>
                    <div className="space-y-3">
                      {hostBookings.filter(b => b.status === 'Completed').map(booking => {
                        const car = cars.find(c => c.id === booking.carId);
                        return (
                          <div key={booking.id} className="flex items-center justify-between p-3 border border-neutral-200 rounded-xl">
                            <div className="flex items-center gap-3">
                              <Car size={16} className="text-neutral-400" />
                              <div>
                                <p className="text-sm font-semibold text-neutral-800">{car?.name || 'Unknown'}</p>
                                <p className="text-[10px] text-neutral-500">{booking.pickupDate} — {booking.totalDays} days</p>
                              </div>
                            </div>
                            <span className="text-sm font-bold text-green-600">+৳{booking.totalPrice}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-neutral-200/60 shadow-sm p-12 rounded-2xl text-center">
                    <DollarSign size={28} className="mx-auto text-neutral-300 mb-3" />
                    <p className="text-neutral-500">No earnings yet. Start listing your cars!</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* ===================== ALL CARS (company only) ===================== */}
            {activeTab === 'all-cars' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl">
                <h3 className="font-display text-xs font-bold text-neutral-800 uppercase tracking-widest border-b border-neutral-100 pb-3 mb-4">All Cars ({cars.length})</h3>
                <div className="space-y-2">
                  {cars.map(car => (
                    <div key={car.id} className="flex items-center justify-between p-3 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-11 bg-neutral-100 rounded-lg overflow-hidden shrink-0">
                          <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-neutral-800">{car.name}</p>
                          <p className="text-[10px] text-neutral-500">{car.brand} · {car.category} · ৳{car.price}/d</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-neutral-400">Host: {car.hostName}</span>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${car.isAvailable ? 'bg-green-50 text-green-600' : 'bg-neutral-100 text-neutral-500'}`}>{car.isAvailable ? 'Active' : 'Inactive'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ===================== ALL USERS (company only) ===================== */}
            {activeTab === 'all-users' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl">
                <h3 className="font-display text-xs font-bold text-neutral-800 uppercase tracking-widest border-b border-neutral-100 pb-3 mb-4">Users & Hosts</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { name: 'James Harrison', role: 'Renter', email: 'james@luxury.com', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150' },
                    { name: 'Seraphina Vance', role: 'Host', email: 'seraphina@aether.com', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150' },
                    { name: 'Prestige Group', role: 'Host', email: 'prestige@rentals.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150' },
                    { name: 'Vincenzo Bianchi', role: 'Host', email: 'vincenzo@example.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150' },
                    { name: 'Aero Rentals', role: 'Host', email: 'aero@rentals.com', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150' },
                    { name: 'Dieter K.', role: 'Host', email: 'dieter@example.com', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150' },
                  ].map((u, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
                      <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-bold text-neutral-800">{u.name}</p>
                        <p className="text-[10px] text-neutral-500">{u.email}</p>
                        <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${u.role === 'Host' ? 'bg-accent-amber/10 text-accent-amber' : 'bg-accent-blue/10 text-accent-blue'}`}>{u.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ===================== ANALYTICS (company only) ===================== */}
            {activeTab === 'analytics' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Total Cars', value: `${cars.length}`, icon: Car, color: 'text-accent-blue' },
                    { label: 'Total Bookings', value: `${allBookings.length}`, icon: Calendar, color: 'text-accent-amber' },
                    { label: 'Revenue', value: `৳${totalRevenue}`, icon: DollarSign, color: 'text-green-500' },
                    { label: 'Hosts', value: '5', icon: Users, color: 'text-purple-500' },
                  ].map((s, i) => (
                    <div key={i} className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl relative overflow-hidden">
                      <p className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1">{s.label}</p>
                      <span className="text-xl font-bold text-neutral-900 font-display">{s.value}</span>
                      <s.icon size={32} className={`absolute right-4 bottom-3 opacity-10 ${s.color}`} />
                    </div>
                  ))}
                </div>

                <div className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl">
                  <h3 className="font-display text-xs font-bold text-neutral-800 uppercase tracking-widest mb-4">Booking Status Breakdown</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: 'Upcoming', value: allBookings.filter(b => b.status === 'Upcoming').length, color: 'bg-accent-blue', textColor: 'text-accent-blue' },
                      { label: 'Active', value: allBookings.filter(b => b.status === 'Active').length, color: 'bg-accent-amber', textColor: 'text-accent-amber' },
                      { label: 'Completed', value: allBookings.filter(b => b.status === 'Completed').length, color: 'bg-green-500', textColor: 'text-green-600' },
                      { label: 'Cancelled', value: allBookings.filter(b => b.status === 'Cancelled').length, color: 'bg-neutral-400', textColor: 'text-neutral-500' },
                    ].map(s => (
                      <div key={s.label} className="p-4 bg-neutral-50 rounded-xl text-center">
                        <p className={`text-2xl font-bold ${s.textColor} font-display`}>{s.value}</p>
                        <p className="text-[10px] text-neutral-500 font-display uppercase tracking-widest mt-1">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ===================== SETTINGS ===================== */}
            {activeTab === 'settings' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-neutral-200/60 shadow-sm p-5 sm:p-6 rounded-2xl">
                <h3 className="font-display text-xs font-bold text-neutral-800 uppercase tracking-widest border-b border-neutral-100 pb-3 mb-5">Profile Settings</h3>
                <div className="space-y-4 max-w-md">
                  {[
                    { label: 'Full Name', value: user.name },
                    { label: 'Email', value: user.email },
                  ].map((f, i) => (
                    <div key={i}>
                      <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">{f.label}</label>
                      <input type="text" defaultValue={f.value}
                        className="w-full bg-white border border-neutral-200 text-sm text-neutral-800 p-3 rounded-xl outline-none focus:border-accent-blue transition-colors" />
                    </div>
                  ))}
                  <Button variant="primary" size="sm" className="rounded-xl">Save Changes</Button>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-100">
                  <h4 className="font-display text-xs font-bold text-neutral-800 uppercase tracking-widest mb-4">
                    {userRole === 'host' ? 'Account Details' : 'Driving License'}
                  </h4>
                  {userRole === 'host' ? (
                    <div className="p-4 bg-amber-50/50 border border-amber-200/40 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign size={16} className="text-accent-amber" />
                        <span className="text-sm font-semibold text-neutral-800">Balance: ৳{user.balance || 0}</span>
                      </div>
                      <p className="text-xs text-neutral-500">Track your earnings and payouts from the Earnings tab.</p>
                    </div>
                  ) : user.drivingLicense ? (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield size={16} className="text-green-600" />
                        <span className="text-sm font-semibold text-green-800">License Verified & Cleared</span>
                      </div>
                      <p className="text-xs text-green-600">#{user.drivingLicense.licenseNumber} · Expires {user.drivingLicense.expiryDate}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-neutral-500">No license on file.</p>
                  )}
                </div>

                {/* Role Switcher */}
                <div className="mt-8 pt-6 border-t border-neutral-100">
                  <h4 className="font-display text-xs font-bold text-neutral-800 uppercase tracking-widest mb-4">Portal Access</h4>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { role: 'user' as const, label: 'Client Portal', desc: 'Browse & rent vehicles', icon: User },
                      { role: 'host' as const, label: 'Driver Portal', desc: 'List & manage your cars', icon: Car },
                      { role: 'company' as const, label: 'Company Admin', desc: 'Full platform management', icon: Shield },
                    ].map(p => (
                      <button key={p.role} onClick={() => {
                        useStore.setState({ user: user ? { ...user, role: p.role } : null });
                      }}
                        className={`flex items-center gap-3 p-3 border rounded-xl transition-all cursor-pointer text-left ${userRole === p.role ? 'border-accent-blue bg-accent-blue/5' : 'border-neutral-200 hover:border-neutral-300 bg-white'}`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${userRole === p.role ? 'bg-accent-blue text-white' : 'bg-neutral-100 text-neutral-500'}`}>
                          <p.icon size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-neutral-800">{p.label}</p>
                          <p className="text-[10px] text-neutral-500">{p.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
