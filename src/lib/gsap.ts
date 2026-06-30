import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Register plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Configure GSAP defaults if needed
gsap.defaults({
  ease: 'power2.out',
  duration: 0.8
});

export { gsap, ScrollTrigger, MotionPathPlugin };
