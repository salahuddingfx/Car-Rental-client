import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollToTopButton } from '../ScrollToTopButton';
import { ToastContainer } from '../ui/Toast';

export const MainLayout = () => {
  return (
    <div className="relative min-h-screen bg-light-bg dark:bg-neutral-900 font-sans selection:bg-accent-blue/20 selection:text-accent-blue transition-colors">
      <Navbar />
      <main className="relative z-0">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
      <ToastContainer />
    </div>
  );
};
