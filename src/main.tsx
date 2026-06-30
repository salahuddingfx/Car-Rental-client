import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
      <Toaster
        theme="light"
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#ffffff',
            border: '1px solid rgba(0,0,0,0.06)',
            color: '#1c1917',
            fontFamily: "'Outfit', 'Inter', sans-serif",
          },
        }}
      />
    </HelmetProvider>
  </StrictMode>,
);
