import { Fragment, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { hero, stats } from '../data/content';
import './Hero.css';

const EASE = [0.16, 1, 0.3, 1];

export default function Hero() {
  const ref = useRef(null);
  const reduced = useReducedMotion();

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
          <motion.span
            className="eyebrow eyebrow--onDark"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          >
            {hero.eyebrow}
          </motion.span>

          <h1 className="display h1 hero__title">
            {words.map((word, i) => (
              <Fragment key={word + i}>
                <span className="hero__word">
                  <motion.span
                    initial={{ y: '105%', rotate: 3 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{ duration: 0.95, delay: 0.32 + i * 0.08, ease: EASE }}
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
                transition={{ duration: 0.95, delay: 0.32 + words.length * 0.08, ease: EASE }}
              >
                <em className="serif-em">{hero.headlineItalic}</em>
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="hero__sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
          >
            {hero.sub}
          </motion.p>

          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: EASE }}
          >
            <a className="btn btn--solid" href={hero.primary.href}>
              {hero.primary.label}
              <span className="arrow">&rarr;</span>
            </a>
            <a className="btn btn--ghost" href={hero.secondary.href}>
              {hero.secondary.label}
            </a>
          </motion.div>

          <motion.ul
            className="hero__ticks"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.15 }}
          >
            {stats.slice(0, 2).map((s) => (
              <li key={s.label}>
                <b>
                  {s.value.toLocaleString()}
                  {s.suffix}
                </b>
                <span>{s.label}</span>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* floating proof stack — the actual motion design work, front and centre */}
        <motion.div className="hero__stack" style={{ y: stackY }} aria-hidden="true">
          {[
            { src: '/videos/ezuni_rebranding.mp4', cls: 'a', d: 0.55 },
            { src: '/videos/iced_tea.mp4', cls: 'b', d: 0.7 },
            { src: '/videos/mcp_motion_phone.mp4', cls: 'c', d: 0.85 },
          ].map((card) => (
            <motion.figure
              key={card.src}
              className={`hero__card hero__card--${card.cls}`}
              initial={{ opacity: 0, y: 60, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: card.d, ease: EASE }}
            >
              {/* the drift lives on an inner element: a CSS animation would
                  otherwise outrank the inline transform driving the entrance */}
              <div className="hero__cardFloat">
                <video src={card.src} autoPlay muted loop playsInline />
              </div>
            </motion.figure>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        style={{ opacity: fade }}
        aria-label="Scroll to content"
      >
        <span className="hero__scrollLine" />
        Scroll
      </motion.a>
    </section>
  );
}
