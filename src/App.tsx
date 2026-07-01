import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Home } from './pages/Home';
import { ScrollToTop } from './components/ScrollToTop';
import { IntroLoader } from './components/IntroLoader';

const Listing = lazy(() => import('./pages/Listing').then(m => ({ default: m.Listing })));
const Details = lazy(() => import('./pages/Details').then(m => ({ default: m.Details })));
const Bookings = lazy(() => import('./pages/Bookings').then(m => ({ default: m.Bookings })));
const GuestBooking = lazy(() => import('./pages/GuestBooking').then(m => ({ default: m.GuestBooking })));
const Auth = lazy(() => import('./pages/Auth').then(m => ({ default: m.Auth })));
const DriverCars = lazy(() => import('./pages/DriverCars').then(m => ({ default: m.DriverCars })));
const PolicyPage = lazy(() => import('./pages/PolicyPage').then(m => ({ default: m.PolicyPage })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const DeveloperCredits = lazy(() => import('./pages/DeveloperCredits'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-accent-blue border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-neutral-500 font-display tracking-wider">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <IntroLoader />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="cars" element={<Suspense fallback={<PageLoader />}><Listing /></Suspense>} />
          <Route path="cars/:id" element={<Suspense fallback={<PageLoader />}><Details /></Suspense>} />
          <Route path="bookings/:carId" element={<Suspense fallback={<PageLoader />}><Bookings /></Suspense>} />
          <Route path="guest-book/:carId" element={<Suspense fallback={<PageLoader />}><GuestBooking /></Suspense>} />
          <Route path="auth" element={<Suspense fallback={<PageLoader />}><Auth /></Suspense>} />
          <Route path="driver/cars" element={<Suspense fallback={<PageLoader />}><DriverCars /></Suspense>} />
          <Route path="about" element={<Suspense fallback={<PageLoader />}><About /></Suspense>} />
          <Route path="contact" element={<Suspense fallback={<PageLoader />}><Contact /></Suspense>} />
          <Route path="developer" element={<Suspense fallback={<PageLoader />}><DeveloperCredits /></Suspense>} />
          <Route path=":policyType" element={<Suspense fallback={<PageLoader />}><PolicyPage /></Suspense>} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
