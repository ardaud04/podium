import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { reel } from '../data/content';
import Reveal from './Reveal';
import './Reel.css';

function ReelCard({ item, index, position }) {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const inView = useInView(wrapRef, { amount: 0.4 });
  const [muted, setMuted] = useState(true);

  // play only while on screen, so three videos never fight for bandwidth
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) {
      v.play().catch(() => {
        /* autoplay can be refused, the poster frame still shows */
      });
    } else {
      v.pause();
    }
  }, [inView]);

  // opacity-only animation: this element's CSS transform does the fanned
  // layout (translate + rotate), and Framer overwrites `transform` inline
  // the moment it's asked to animate x/y/scale/rotate, which would wipe
  // that positioning out
  return (
    <motion.figure
      ref={wrapRef}
      className={`reelCard reelCard--${position}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
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

const positions = ['left', 'center', 'right'];

export default function Reel() {
  return (
    <section className="section reel" id="motion">
      <div className="wrap">
        <Reveal className="reel__head">
          <span className="kicker">Motion design</span>
          <h2 className="display h2">
            Things that move <em className="serif-em">get remembered.</em>
          </h2>
          <p className="lede">
            Animated video and graphics made in house, for brands, products and logos that need more
            than a static post.
          </p>
        </Reveal>

        <div className="reel__stack">
          {reel.map((item, i) => (
            <ReelCard key={item.src} item={item} index={i} position={positions[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}
