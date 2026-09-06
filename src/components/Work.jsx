import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { work } from '../data/content';
import Reveal from './Reveal';
import './Work.css';

/** Tiles share a row height, so the ratio only decides how wide one sits. */
function ratioClass(item) {
  return `caseMedia--${item.ratio || 'portrait'}`;
}

function VideoTile({ item }) {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [muted, setMuted] = useState(true);

  // only the clips actually on screen play, so a page of many of them never
  // has more than a handful competing for bandwidth
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
      {item.caption && <span className="caseMedia__cap">{item.caption}</span>}
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
      {item.caption && <span className="caseMedia__cap">{item.caption}</span>}
    </div>
  );
}

function MediaTile({ item }) {
  if (item.kind === 'youtube') return <YouTubeTile item={item} />;
  if (item.kind === 'image') {
    return (
      <div className={`caseMedia caseMedia--still ${ratioClass(item)}`}>
        <img src={item.src} alt={item.alt || ''} loading="lazy" />
        {item.caption && <span className="caseMedia__cap">{item.caption}</span>}
      </div>
    );
  }
  return <VideoTile item={item} />;
}

function EditingGrid({ items }) {
  return (
    <div className="workGrid">
      {items.map((item) => (
        <MediaTile item={item} key={item.src || item.id} />
      ))}
    </div>
  );
}

const positions = ['left', 'center', 'right'];

function MotionCard({ item, index }) {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const inView = useInView(wrapRef, { amount: 0.4 });
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [inView]);

  return (
    <motion.figure
      ref={wrapRef}
      className={`reelCard reelCard--${positions[index]}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <video ref={videoRef} src={item.src} muted={muted} loop playsInline preload="metadata" />

      <button
        className="reelCard__sound"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
      >
        {muted ? 'Sound off' : 'Sound on'}
      </button>

      <figcaption className="reelCard__cap">
        <h3 className="display">{item.title}</h3>
        <span>{item.meta}</span>
      </figcaption>
    </motion.figure>
  );
}

function MotionFan({ items }) {
  return (
    <div className="reel__stack">
      {items.map((item, i) => (
        <MotionCard key={item.src} item={item} index={i} />
      ))}
    </div>
  );
}

export default function Work() {
  const [active, setActive] = useState(work.tabs[0].id);
  const reduced = useReducedMotion();
  const tab = work.tabs.find((t) => t.id === active);

  return (
    <section className="section work" id="work">
      <div className="wrap">
        <Reveal className="work__head">
          <h2 className="display h2">{work.title}</h2>
        </Reveal>

        <Reveal delay={0.06} className="work__tabs" role="tablist">
          {work.tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active === t.id}
              className={`work__tab ${active === t.id ? 'is-active' : ''}`}
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </button>
          ))}
        </Reveal>

        <div className="work__panel">
          <motion.div
            key={active}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {tab.id === 'motion' ? (
              <MotionFan items={tab.media} />
            ) : (
              <EditingGrid items={tab.media} />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
