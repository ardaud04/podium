import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { nav } from '../data/content';
import './Nav.css';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock the page while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'is-scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="nav__inner">
          <a href="#top" className="nav__logo" aria-label="Podium home">
            <img
              src="/images/logo-01.png"
              alt="Podium"
              className={`logo-img ${scrolled ? '' : 'logo-img--light'}`}
            />
          </a>

          <nav className="nav__links" aria-label="Main">
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="nav__right">
            <a className="btn btn--solid nav__cta" href="#contact">
              Start a project
            </a>
            <button
              className="nav__burger"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <motion.div
              className="drawer__panel"
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="drawer__top">
                <img src="/images/logo-01.png" alt="Podium" className="logo-img logo-img--light" />
                <button className="drawer__close" onClick={() => setOpen(false)} aria-label="Close menu">
                  &times;
                </button>
              </div>

              <ul className="drawer__links">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a href={item.href} onClick={() => setOpen(false)}>
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <a className="btn btn--solid drawer__cta" href="#contact" onClick={() => setOpen(false)}>
                Start a project
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
