import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const MainLayout: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-light-bg font-sans selection:bg-accent-blue/20 selection:text-accent-blue">
      <Navbar />
      <main className="relative z-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
