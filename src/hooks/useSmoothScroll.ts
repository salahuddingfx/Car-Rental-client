import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/gsap';

export const useSmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    // Update ScrollTrigger on scroll
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Sync Lenis with GSAP ticker
    const updatePhysics = (time: number) => {
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(updatePhysics);
    gsap.ticker.lagSmoothing(0);

    // Add global access to lenis if needed
    (window as any).lenis = lenis;

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updatePhysics);
      delete (window as any).lenis;
    };
  }, []);
};
export default useSmoothScroll;
