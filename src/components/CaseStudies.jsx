import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { cases } from '../data/content';
import useMediaQuery from '../hooks/useMediaQuery';
import Reveal from './Reveal';
import './CaseStudies.css';

/** Tiles share a row height, so the ratio only decides how wide one sits. */
function ratioClass(item) {
  return `caseMedia--${item.ratio || 'portrait'}`;
}

function VideoTile({ item }) {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [muted, setMuted] = useState(true);

  // only the clips actually on screen play, so a page of sixteen of them
  // never has more than a handful competing for bandwidth
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) {
      v.play().catch(() => {
        /* autoplay can be refused; the poster frame still shows */
      });
    } else {
      v.pause();
    }
  }, [inView]);

  return (
    <div className={`caseMedia ${ratioClass(item)}`} ref={ref}>
      <video
        ref={videoRef}
        src={item.src}
        poster={item.poster}
        muted={muted}
        loop
        playsInline
        preload="none"
      />
      <button
        className="caseMedia__sound"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? 'Unmute clip' : 'Mute clip'}
      >
        {muted ? 'Sound off' : 'Sound on'}
      </button>
    </div>
  );
}

function YouTubeTile({ item }) {
  const [playing, setPlaying] = useState(false);

  // a still frame until it is asked for, so an embed the visitor may never
  // click does not drag YouTube's player onto every page load
  return (
    <div className={`caseMedia ${ratioClass(item)}`}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${item.id}?autoplay=1&rel=0`}
          title={item.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button className="caseMedia__play" onClick={() => setPlaying(true)}>
          <img
            src={`https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`}
            alt={item.title}
            loading="lazy"
          />
          <span className="caseMedia__playIcon" aria-hidden="true">
            &#9654;
          </span>
          <span className="sr-only">Play {item.title}</span>
        </button>
      )}
    </div>
  );
}

function MediaTile({ item }) {
  if (item.kind === 'youtube') return <YouTubeTile item={item} />;
  if (item.kind === 'image') {
    return (
      <div className={`caseMedia caseMedia--still ${ratioClass(item)}`}>
        <img src={item.src} alt={item.alt || ''} loading="lazy" />
      </div>
    );
  }
  return <VideoTile item={item} />;
}

function CaseCard({ item, index, stacking }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const animate = stacking && !reduced;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 10%', 'end start'],
  });

  // cards shrink a touch as the next one slides over them
  const scale = useTransform(scrollYProgress, [0, 1], [1, animate ? 0.92 : 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, animate ? 0.5 : 1]);

  return (
    <motion.article
      ref={ref}
      className="case"
      style={{
        top: `calc(84px + ${index * 14}px)`,
        scale,
        opacity,
        zIndex: index + 1,
      }}
    >
      <header className="case__head">
        <div className="case__title">
          <span className="case__sector">{item.sector}</span>
          <h3 className="display case__name">{item.name}</h3>
        </div>

        {item.stats.length > 0 && (
          <dl className="case__stats">
            {item.stats.map((stat) => (
              <div className="case__stat" key={stat.label}>
                <dt className="display">{stat.value}</dt>
                <dd>{stat.label}</dd>
              </div>
            ))}
          </dl>
        )}
      </header>

      <p className="case__summary">{item.summary}</p>

      <div className="case__media">
        {item.media.map((m) => (
          <MediaTile item={m} key={m.src || m.id} />
        ))}
      </div>
    </motion.article>
  );
}

export default function CaseStudies() {
  // below this width the cards flow normally, so the stacking maths is off
  const stacking = useMediaQuery('(min-width: 901px)');

  return (
    <section className="section work" id="work">
      <div className="wrap">
        <Reveal className="work__head">
          <span className="kicker">Selected work</span>
          <h2 className="display h2">
            Proof, not <em className="serif-em">promises.</em>
          </h2>
        </Reveal>

        <div className="work__stack">
          {cases.map((item, i) => (
            <CaseCard key={item.name} item={item} index={i} stacking={stacking} />
          ))}
        </div>
      </div>
    </section>
  );
}
