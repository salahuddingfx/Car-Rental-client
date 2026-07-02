import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, MapPin, Users, Zap, Disc, Shield, Check, Share2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useRecentlyViewed } from '../store/useRecentlyViewed';
import { Button } from '../components/ui/Button';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CarImageSlider } from '../components/ui/CarImageSlider';
import { PriceCalculator } from '../components/ui/PriceCalculator';
import { CarCalendar } from '../components/ui/CarCalendar';
import { RatingsGraph } from '../components/ui/RatingsGraph';
import { formatPrice } from '../lib/pricing';

export const Details: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cars, bookings } = useStore();
  const { addItem } = useRecentlyViewed();
  const car = cars.find(c => c.id === id);

  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  useEffect(() => {
    if (id) addItem(id);
  }, [id, addItem]);

  if (!car) {
    return (
      <div className="pt-28 pb-20 text-center min-h-screen flex flex-col items-center justify-center">
        <p className="text-neutral-500 dark:text-neutral-400 mb-4">Vehicle not found</p>
        <Button variant="outline" onClick={() => navigate('/cars')}>Back to Fleet</Button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-light-bg dark:bg-neutral-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'Our Cars', href: '/cars' },
          { label: car.name },
        ]} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
          <div className="h-[420px] lg:h-[520px] rounded-xl overflow-hidden border border-neutral-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
            <CarImageSlider images={car.images || [car.image]} alt={car.name} />
          </div>

          <div className="space-y-5">
            <div>
              <p className="font-display text-[10px] tracking-widest text-accent-blue uppercase font-bold mb-1.5">{car.brand}</p>
              <h1 className="font-display text-3xl md:text-4xl font-extrabold uppercase text-neutral-900 dark:text-neutral-100">{car.name}</h1>
            </div>

            <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950 border border-amber-200/50 dark:border-amber-800/50 px-3 py-1.5 rounded-lg">
                <Star size={14} className="text-accent-amber fill-accent-amber" />
                <span className="font-bold text-accent-amber">{car.rating.toFixed(2)}</span>
                <span className="text-neutral-400 dark:text-neutral-500">({car.reviewsCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-neutral-400 dark:text-neutral-500" />
                <span>{car.location}</span>
              </div>
            </div>

            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">{car.description}</p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Zap, label: 'Power', value: car.power },
                { icon: Disc, label: 'Transmission', value: car.transmission },
                { icon: Users, label: 'Seats', value: `${car.seats} Seats` },
                { icon: Shield, label: 'Fuel', value: car.fuel },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-3 p-3 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-lg shadow-sm">
                  <f.icon size={16} className="text-accent-blue shrink-0" />
                  <div>
                    <p className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-wider font-display font-semibold">{f.label}</p>
                    <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">{f.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {car.features.length > 0 && (
              <div>
                <h3 className="font-display text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest mb-2.5">Premium Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {car.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-neutral-600">
                      <Check size={14} className="text-accent-blue shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h3 className="font-display text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest border-b border-neutral-200 dark:border-neutral-800 pb-2 mb-4">The Experience</h3>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">{car.description}</p>
            </section>

            <section>
              <h3 className="font-display text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest border-b border-neutral-200 dark:border-neutral-800 pb-2 mb-4">Host Profile</h3>
              <div className="flex items-center gap-4 p-4 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl shadow-sm">
                <img src={car.hostAvatar} alt={car.hostName} className="w-12 h-12 object-cover rounded-full" />
                <div>
                  <h4 className="font-display text-sm font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">{car.hostName}</h4>
                  <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                    <Star size={12} className="text-accent-amber fill-accent-amber" />
                    <span className="font-bold text-accent-amber">{car.hostRating.toFixed(2)}</span> Rating
                  </div>
                </div>
              </div>
            </section>

            <RatingsGraph ratingBreakdown={car.ratingBreakdown} overallRating={car.rating} reviewsCount={car.reviewsCount} />

            <section>
              <h3 className="font-display text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest border-b border-neutral-200 dark:border-neutral-800 pb-2 mb-4">Customer Reviews</h3>
              <div className="space-y-4">
                {car.reviews.map(rev => (
                  <div key={rev.id} className="p-4 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <img src={rev.avatar} alt={rev.name} className="w-9 h-9 object-cover rounded-full" />
                        <div>
                          <h4 className="text-neutral-800 dark:text-neutral-200 text-xs font-bold font-display uppercase tracking-wider">{rev.name}</h4>
                          <p className="text-[10px] text-neutral-400 dark:text-neutral-500">{rev.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400 bg-amber-50 border border-amber-200/50 px-2 py-1 rounded">
                        <Star size={11} className="text-accent-amber fill-accent-amber" />
                        <span className="text-accent-amber font-bold">{rev.rating}</span>
                      </div>
                    </div>
                    <p className="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed">{rev.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="font-display text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest border-b border-neutral-200 dark:border-neutral-800 pb-2 mb-4">Location Zone</h3>
              <div className="h-36 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-xl flex items-center justify-center relative overflow-hidden">
                <MapPin size={20} className="text-accent-blue" />
                <span className="font-display text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest ml-2">{car.location}</span>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1 space-y-5">
            <PriceCalculator pricePerDay={car.price} pickupDate={pickupDate} returnDate={returnDate} onPickupChange={setPickupDate} onReturnChange={setReturnDate} />
            <CarCalendar bookedDates={bookings.filter(b => b.carId === car.id).flatMap(b => {
              const dates: string[] = [];
              const start = new Date(b.pickupDate);
              const end = new Date(b.returnDate);
              while (start <= end) { dates.push(start.toISOString()); start.setDate(start.getDate() + 1); }
              return dates;
            })} />

            <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 shadow-sm p-6 rounded-xl sticky top-28">
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 font-display">{formatPrice(car.price)}</span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">/ day</span>
              </div>
              <span className="text-xs text-green-600 font-medium flex items-center gap-1 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Available Now
              </span>

              <Button variant="primary" className="w-full rounded-lg mb-2" onClick={() => {
                const params = new URLSearchParams();
                if (pickupDate) params.set('pickup', pickupDate);
                if (returnDate) params.set('return', returnDate);
                navigate(`/bookings/${car.id}?${params.toString()}`);
              }}>
                Reserve Now
              </Button>
              <Button variant="outline" className="w-full rounded-lg mb-2" onClick={() => {
                const params = new URLSearchParams();
                if (pickupDate) params.set('pickup', pickupDate);
                if (returnDate) params.set('return', returnDate);
                navigate(`/guest-book/${car.id}?${params.toString()}`);
              }}>
                Book as Guest
              </Button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Check out this ${car.brand} ${car.name} on Apex Ride!\n৳${car.price}/day · ${car.location}\n${window.location.href}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 border border-green-300 dark:border-green-700 text-green-600 dark:text-green-400 text-xs font-bold rounded-lg hover:bg-green-50 dark:hover:bg-green-950/30 transition-colors"
              >
                <Share2 size={14} /> Share on WhatsApp
              </a>
              <p className="text-[10px] text-neutral-400 dark:text-neutral-500 text-center leading-relaxed">
                <Shield size={12} className="inline mr-1" />
                Concierge Verified · Free cancellation within 48h
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-neutral-200/60 dark:border-neutral-800 pt-10">
          <h2 className="font-display text-xl font-bold uppercase text-neutral-800 dark:text-neutral-200 tracking-widest mb-6">Similar Vehicles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {(cars.filter(c => c.id !== car.id && c.category === car.category).slice(0, 4).length > 0
              ? cars.filter(c => c.id !== car.id && c.category === car.category).slice(0, 4)
              : cars.filter(c => c.id !== car.id).slice(0, 4)
            ).map(c => (
              <Link key={c.id} to={`/cars/${c.id}`}>
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                  <div className="h-36 bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                    <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <p className="font-display text-[9px] text-accent-blue uppercase tracking-widest font-bold mb-0.5">{c.brand}</p>
                    <h3 className="font-display text-sm font-bold text-neutral-800 dark:text-neutral-200 truncate">{c.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                        <Star size={11} className="text-accent-amber fill-accent-amber" />
                        <span>{c.rating.toFixed(2)}</span>
                      </div>
                      <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200 font-display">{formatPrice(c.price)}<span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-sans font-normal">/d</span></span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
