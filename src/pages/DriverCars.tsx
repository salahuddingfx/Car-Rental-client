import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Fuel, Disc, Users, MapPin, PlusCircle, Trash2, Edit2, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { Breadcrumbs } from '../components/Breadcrumbs';
import type { Car as CarType } from '../data/mockCars';

export const DriverCars = () => {
  const navigate = useNavigate();
  const { user, cars, addCar, editCar, deleteCar } = useStore();
  const driverCars = cars.filter(c => c.hostName === user?.name);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '', brand: '', category: 'Luxury' as CarType['category'], price: 0,
    image: '', images: '', fuel: 'Petrol' as CarType['fuel'], transmission: 'Automatic' as CarType['transmission'],
    seats: 5, power: '', speed: '', description: '', location: '', features: '',
  });

  const resetForm = () => {
    setForm({ name: '', brand: '', category: 'Luxury', price: 0, image: '', images: '', fuel: 'Petrol', transmission: 'Automatic', seats: 5, power: '', speed: '', description: '', location: '', features: '' });
    setEditId(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      editCar(editId, {
        ...form,
        price: Number(form.price),
        seats: Number(form.seats),
        features: form.features.split(',').map(f => f.trim()).filter(Boolean),
        images: form.images ? form.images.split(',').map(i => i.trim()).filter(Boolean) : [form.image],
      });
    } else {
      addCar({
        ...form,
        price: Number(form.price),
        seats: Number(form.seats),
        isAvailable: true,
        features: form.features.split(',').map(f => f.trim()).filter(Boolean),
        images: form.images ? form.images.split(',').map(i => i.trim()).filter(Boolean) : [form.image],
      });
    }
    resetForm();
  };

  const startEdit = (car: CarType) => {
    setForm({
      name: car.name, brand: car.brand, category: car.category, price: car.price,
      image: car.image, images: car.images?.join(', ') || '', fuel: car.fuel, transmission: car.transmission, seats: car.seats,
      power: car.power, speed: car.speed, description: car.description, location: car.location,
      features: car.features.join(', '),
    });
    setEditId(car.id);
    setShowForm(true);
  };

  return (
    <div className="pt-24 pb-20 bg-light-bg min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <Breadcrumbs items={[{ label: 'My Cars' }]} />

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl font-extrabold text-neutral-900">My Cars</h1>
            <p className="text-sm text-neutral-500 mt-1">List your car and start earning</p>
          </div>
          <Button variant="primary" className="rounded-xl flex items-center gap-1.5" onClick={() => { resetForm(); setShowForm(true); }}>
            <PlusCircle size={14} /> Add Car
          </Button>
        </div>

        {!user ? (
          <div className="bg-white border border-neutral-200/60 shadow-sm p-12 rounded-2xl text-center">
            <Car size={32} className="mx-auto text-neutral-300 mb-3" />
            <p className="text-neutral-600 font-semibold mb-1">Sign in to list your car</p>
            <p className="text-neutral-400 text-sm mb-4">You need an account to manage your listings.</p>
            <Button variant="primary" onClick={() => navigate('/auth')} className="rounded-xl">Sign In</Button>
          </div>
        ) : driverCars.length > 0 ? (
          <div className="space-y-3">
            {driverCars.map(car => (
              <div key={car.id} className="bg-white border border-neutral-200/60 shadow-sm p-4 rounded-2xl flex items-center gap-4">
                <div className="w-24 h-18 bg-neutral-100 rounded-xl overflow-hidden shrink-0">
                  <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="text-sm font-bold text-neutral-800">{car.name}</h4>
                    <span className="text-[9px] font-display font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent-blue/10 text-accent-blue">{car.category}</span>
                    <span className={`text-[9px] font-display font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${car.isAvailable ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                      {car.isAvailable ? 'Active' : 'Paused'}
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-500">{car.brand} · {car.location} · ৳{car.price}/day</p>
                  <div className="flex items-center gap-3 mt-1.5 text-[10px] text-neutral-400">
                    <span className="flex items-center gap-1"><Fuel size={11} /> {car.fuel}</span>
                    <span className="flex items-center gap-1"><Disc size={11} /> {car.transmission}</span>
                    <span className="flex items-center gap-1"><Users size={11} /> {car.seats} seats</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button onClick={() => startEdit(car)} className="p-2 text-neutral-400 hover:text-accent-blue hover:bg-accent-blue/5 rounded-lg transition-all cursor-pointer">
                    <Edit2 size={15} />
                  </button>
                  <button onClick={() => { if (confirm('Delete this car?')) deleteCar(car.id); }} className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer">
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
            <p className="text-neutral-400 text-sm mb-4">Add your first car to start earning.</p>
            <Button variant="primary" onClick={() => { resetForm(); setShowForm(true); }} className="rounded-xl">Add Your First Car</Button>
          </div>
        )}

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={resetForm}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-sm font-bold text-neutral-800 uppercase tracking-wider">{editId ? 'Edit Car' : 'Add New Car'}</h3>
                <button onClick={resetForm} className="text-neutral-400 hover:text-neutral-600 cursor-pointer"><X size={18} /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                    <input type="number" required value={form.price || ''} onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                      className="w-full border border-neutral-200 text-sm text-neutral-800 p-2.5 rounded-lg outline-none focus:border-accent-blue" />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Seats</label>
                    <input type="number" value={form.seats} onChange={e => setForm({ ...form, seats: Number(e.target.value) })}
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
                <div>
                  <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Location</label>
                  <div className="relative">
                    <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}
                      placeholder="e.g. Dhaka, Bangladesh"
                      className="w-full border border-neutral-200 text-sm text-neutral-800 p-2.5 pl-9 rounded-lg outline-none focus:border-accent-blue placeholder:text-neutral-300" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Image URL</label>
                  <input required value={form.image} onChange={e => setForm({ ...form, image: e.target.value })}
                    placeholder="https://..."
                    className="w-full border border-neutral-200 text-sm text-neutral-800 p-2.5 rounded-lg outline-none focus:border-accent-blue placeholder:text-neutral-300" />
                </div>
                <div>
                  <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Extra Images (comma separated)</label>
                  <input value={form.images} onChange={e => setForm({ ...form, images: e.target.value })}
                    placeholder="https://img1.jpg, https://img2.jpg"
                    className="w-full border border-neutral-200 text-sm text-neutral-800 p-2.5 rounded-lg outline-none focus:border-accent-blue placeholder:text-neutral-300" />
                </div>
                <div>
                  <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Features (comma separated)</label>
                  <input value={form.features} onChange={e => setForm({ ...form, features: e.target.value })}
                    placeholder="e.g. Sunroof, Leather Seats, GPS"
                    className="w-full border border-neutral-200 text-sm text-neutral-800 p-2.5 rounded-lg outline-none focus:border-accent-blue placeholder:text-neutral-300" />
                </div>
                <div>
                  <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Description</label>
                  <textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                    placeholder="Tell renters about your car..."
                    className="w-full border border-neutral-200 text-sm text-neutral-800 p-2.5 rounded-lg outline-none focus:border-accent-blue resize-none placeholder:text-neutral-300" />
                </div>
                <div className="flex gap-3 pt-2">
                  <Button type="submit" variant="primary" size="sm" className="rounded-xl flex-1">
                    {editId ? 'Update Car' : 'Add Car'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={resetForm} className="rounded-xl">Cancel</Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
