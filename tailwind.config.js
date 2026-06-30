/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#020202',
        'light-bg': '#f8f7f4',
        'light-surface': '#ffffff',
        graphite: '#121212',
        'graphite-light': '#1a1a1a',
        'accent-blue': '#2563eb',
        'accent-blue-hover': '#1d4ed8',
        'accent-amber': '#d97706',
        'accent-amber-light': '#fef3c7',
        silver: '#9ca3af',
        'luxury-gold': '#b45309',
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
        display: ['Space Grotesk', 'Outfit', 'sans-serif'],
      },
      keyframes: {
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'slide-up': { '0%': { transform: 'translateY(24px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        blink: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.2' } },
        'signal-blink': { '0%, 49%': { opacity: '0' }, '50%, 100%': { opacity: '1' } },
      },
      animation: {
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'slide-up': 'slide-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        float: 'float 5s ease-in-out infinite',
        blink: 'blink 1.2s ease-in-out infinite',
        'signal-blink': 'signal-blink 0.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
