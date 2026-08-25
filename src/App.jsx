import { useEffect } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';

import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Brands from './components/Brands';
import CaseStudies from './components/CaseStudies';
import Reel from './components/Reel';
import About from './components/About';
import Receipts from './components/Receipts';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ContactProvider } from './components/ContactModal';

export default function App() {
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  // buttery scroll, but only when the user has not asked for less motion
  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // native scrolling on touch feels better than an emulated one
      syncTouch: false,
    });

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // let the anchor links ride the same easing
    const onClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -20 });
    };
    document.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('click', onClick);
      lenis.destroy();
    };
  }, [reduced]);

  return (
    <ContactProvider>
      <motion.div className="scrollBar" style={{ scaleX: progress }} aria-hidden="true" />

      <Nav />

      <main>
        <Hero />
        <Marquee />
        <Brands />
        <CaseStudies />
        <Reel />
        <About />
        <Receipts />
        <Contact />
      </main>

      <Footer />
    </ContactProvider>
  );
}
