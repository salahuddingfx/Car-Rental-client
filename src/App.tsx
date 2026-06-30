import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Home } from './pages/Home';
import { Listing } from './pages/Listing';
import { Details } from './pages/Details';
import { Bookings } from './pages/Bookings';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { PolicyPage } from './pages/PolicyPage';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="cars" element={<Listing />} />
          <Route path="cars/:id" element={<Details />} />
          <Route path="bookings/:carId" element={<Bookings />} />
          <Route path="auth" element={<Auth />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="host" element={<Dashboard />} />
          <Route path=":policyType" element={<PolicyPage />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
