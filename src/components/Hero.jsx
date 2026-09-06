import { Fragment, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { hero } from '../data/content';
import { useContactForm } from './ContactModal';
import './Hero.css';

const EASE = [0.16, 1, 0.3, 1];

export default function Hero() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { openForm } = useContactForm();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // gentle parallax so the hero drifts as you leave it
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 90]);
  const stackY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -70]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, reduced ? 1 : 0]);

  const words = hero.headline;

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__grain" aria-hidden="true" />

      <div className="wrap hero__wrap">
        <motion.div className="hero__copy" style={{ y: copyY, opacity: fade }}>
          <h1 className="display h1 hero__title">
            {words.map((word, i) => (
              <Fragment key={word + i}>
                <span className="hero__word">
                  <motion.span
                    initial={{ y: '105%', rotate: 3 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{ duration: 0.95, delay: 0.18 + i * 0.07, ease: EASE }}
                  >
                    {word}
                  </motion.span>
                </span>{' '}
              </Fragment>
            ))}
            <span className="hero__word hero__word--em">
              <motion.span
                initial={{ y: '105%', rotate: 3 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ duration: 0.95, delay: 0.18 + words.length * 0.07, ease: EASE }}
              >
                <em className="serif-em">{hero.headlineItalic}</em>
              </motion.span>
            </span>
          </h1>

          <motion.ul
            className="hero__points"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.72, ease: EASE }}
          >
            {hero.points.map((point) => (
              <li key={point}>
                <span className="hero__tick" aria-hidden="true">
                  &#10003;
                </span>
                {point}
              </li>
            ))}
          </motion.ul>

          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.88, ease: EASE }}
          >
            <button type="button" className="btn btn--solid" onClick={openForm}>
              {hero.primary.label}
              <span className="arrow">&rarr;</span>
            </button>
            <a className="btn btn--ghost" href={hero.secondary.href}>
              {hero.secondary.label}
            </a>
          </motion.div>
        </motion.div>

        {/* floating proof stack — hovering one pulls it clear of the other two */}
        <motion.div className="hero__stack" style={{ y: stackY }}>
          {[
            { src: '/videos/ezuni_motion_v2.mp4', cls: 'a', d: 0.45 },
            { src: '/videos/iced_tea.mp4', cls: 'b', d: 0.6 },
            { src: '/videos/mcp_motion_phone.mp4', cls: 'c', d: 0.75 },
          ].map((card) => (
            <motion.figure
              key={card.src}
              className={`hero__card hero__card--${card.cls}`}
              initial={{ opacity: 0, y: 60, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: card.d, ease: EASE }}
            >
              {/* three nested layers, because each owns a transform that would
                  otherwise overwrite the others: Framer drives the entrance on
                  the figure, the hover lift lives on the middle element, and the
                  idle drift keyframes sit on the innermost one */}
              <div className="hero__cardHover">
                <div className="hero__cardFloat">
                  <video src={card.src} autoPlay muted loop playsInline />
                </div>
              </div>
            </motion.figure>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#work"
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{ opacity: fade }}
        aria-label="Scroll to content"
      >
        <span className="hero__scrollLine" />
        Scroll
      </motion.a>
    </section>
  );
}
