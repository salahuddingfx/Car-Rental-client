import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Home } from './pages/Home';
import { ScrollToTop } from './components/ScrollToTop';
import { IntroLoader } from './components/IntroLoader';
import { useThemeStore } from './store/useThemeStore';
import { ProtectedRoute } from './components/ProtectedRoute';

const Listing = lazy(() => import('./pages/Listing').then(m => ({ default: m.Listing })));
const Details = lazy(() => import('./pages/Details').then(m => ({ default: m.Details })));
const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const Bookings = lazy(() => import('./pages/Bookings').then(m => ({ default: m.Bookings })));
const GuestBooking = lazy(() => import('./pages/GuestBooking').then(m => ({ default: m.GuestBooking })));
const Auth = lazy(() => import('./pages/Auth').then(m => ({ default: m.Auth })));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword').then(m => ({ default: m.ForgotPassword })));
const DriverCars = lazy(() => import('./pages/DriverCars').then(m => ({ default: m.DriverCars })));
const PolicyPage = lazy(() => import('./pages/PolicyPage').then(m => ({ default: m.PolicyPage })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Reviews = lazy(() => import('./pages/Reviews').then(m => ({ default: m.Reviews })));
const DeveloperCredits = lazy(() => import('./pages/DeveloperCredits'));
const CarComparison = lazy(() => import('./pages/CarComparison').then(m => ({ default: m.CarComparison })));
const IDVerification = lazy(() => import('./pages/IDVerification').then(m => ({ default: m.IDVerification })));
const InsuranceOptions = lazy(() => import('./pages/InsuranceOptions').then(m => ({ default: m.InsuranceOptions })));
const DamageReport = lazy(() => import('./pages/DamageReport').then(m => ({ default: m.DamageReport })));
const BackgroundCheck = lazy(() => import('./pages/BackgroundCheck').then(m => ({ default: m.BackgroundCheck })));
const ReferralProgram = lazy(() => import('./pages/ReferralProgram').then(m => ({ default: m.ReferralProgram })));
const Blog = lazy(() => import('./pages/Blog').then(m => ({ default: m.Blog })));
const BlogPost = lazy(() => import('./pages/BlogPost').then(m => ({ default: m.BlogPost })));
const BookingTracker = lazy(() => import('./pages/BookingTracker').then(m => ({ default: m.BookingTracker })));
const BookingLookup = lazy(() => import('./pages/BookingLookup').then(m => ({ default: m.BookingLookup })));

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
  const isDark = useThemeStore(s => s.isDark);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

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
          <Route path="tracking/:bookingId" element={<Suspense fallback={<PageLoader />}><BookingTracker /></Suspense>} />
          <Route path="track-booking" element={<Suspense fallback={<PageLoader />}><BookingLookup /></Suspense>} />
          <Route path="guest-book/:carId" element={<Suspense fallback={<PageLoader />}><GuestBooking /></Suspense>} />
          <Route path="auth" element={<Suspense fallback={<PageLoader />}><Auth /></Suspense>} />
          <Route path="forgot-password" element={<Suspense fallback={<PageLoader />}><ForgotPassword /></Suspense>} />
          <Route path="dashboard" element={<Suspense fallback={<PageLoader />}><Dashboard /></Suspense>} />
          <Route path="driver/cars" element={<Suspense fallback={<PageLoader />}><DriverCars /></Suspense>} />
          <Route path="about" element={<Suspense fallback={<PageLoader />}><About /></Suspense>} />
          <Route path="reviews" element={<Suspense fallback={<PageLoader />}><Reviews /></Suspense>} />
          <Route path="contact" element={<Suspense fallback={<PageLoader />}><Contact /></Suspense>} />
          <Route path="developer" element={<Suspense fallback={<PageLoader />}><DeveloperCredits /></Suspense>} />
          <Route path="compare" element={<Suspense fallback={<PageLoader />}><CarComparison /></Suspense>} />
          <Route path="verify-id" element={<Suspense fallback={<PageLoader />}><ProtectedRoute><IDVerification /></ProtectedRoute></Suspense>} />
          <Route path="insurance" element={<Suspense fallback={<PageLoader />}><ProtectedRoute><InsuranceOptions /></ProtectedRoute></Suspense>} />
          <Route path="damage-report" element={<Suspense fallback={<PageLoader />}><ProtectedRoute><DamageReport /></ProtectedRoute></Suspense>} />
          <Route path="background-check" element={<Suspense fallback={<PageLoader />}><ProtectedRoute><BackgroundCheck /></ProtectedRoute></Suspense>} />
          <Route path="referrals" element={<Suspense fallback={<PageLoader />}><ProtectedRoute><ReferralProgram /></ProtectedRoute></Suspense>} />
          <Route path="blog" element={<Suspense fallback={<PageLoader />}><Blog /></Suspense>} />
          <Route path="blog/:slug" element={<Suspense fallback={<PageLoader />}><BlogPost /></Suspense>} />
          <Route path=":policyType" element={<Suspense fallback={<PageLoader />}><PolicyPage /></Suspense>} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
