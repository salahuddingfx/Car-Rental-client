import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/ui/Button';
import { PlusCircle, Car, Fuel, Disc, Star, Edit2, Trash2, X } from 'lucide-react';
import type { Car as CarType } from '../../data/mockCars';

interface FormErrors {
  name?: string;
  brand?: string;
  price?: string;
  seats?: string;
  image?: string;
}

export const DashboardMyCars = () => {
  const { user, cars, addCar, editCar, deleteCar } = useStore();
  const hostCars = cars.filter(c => c.hostName === user?.name);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editCarId, setEditCarId] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
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

  const validateCarForm = (): FormErrors => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = 'Car name is required';
    if (!form.brand.trim()) errs.brand = 'Brand is required';
    if (!form.price || Number(form.price) <= 0) errs.price = 'Price must be greater than 0';
    if (!form.seats || Number(form.seats) < 1) errs.seats = 'Seats must be at least 1';
    if (form.image && !form.image.startsWith('http')) errs.image = 'Image URL must start with http';
    return errs;
  };

  const handleAddCar = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateCarForm();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
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

  return (
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
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-neutral-200 text-sm text-neutral-800 p-2.5 rounded-lg outline-none focus:border-accent-blue" />
                  {errors.name && <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">Brand</label>
                  <input value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })}
                    className="w-full border border-neutral-200 text-sm text-neutral-800 p-2.5 rounded-lg outline-none focus:border-accent-blue" />
                  {errors.brand && <p className="text-[10px] text-red-500 mt-1">{errors.brand}</p>}
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
  );
};
