import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { cases } from '../data/content';
import useMediaQuery from '../hooks/useMediaQuery';
import Reveal from './Reveal';
import './CaseStudies.css';

function CaseCard({ item, index, stacking }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const animate = stacking && !reduced;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 12%', 'end start'],
  });

  // cards shrink a touch as the next one slides over them
  const scale = useTransform(scrollYProgress, [0, 1], [1, animate ? 0.9 : 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, animate ? 0.45 : 1]);

  return (
    <motion.article
      ref={ref}
      className="case"
      style={{
        top: `calc(90px + ${index * 16}px)`,
        scale,
        opacity,
        zIndex: index + 1,
      }}
    >
      <div className="case__body">
        <span className="case__sector">{item.sector}</span>
        <h3 className="display case__name">{item.name}</h3>
        <span className="case__result">{item.result}</span>

        <div className="case__cols">
          <div>
            <h4>Strategy</h4>
            <ul>
              {item.strategy.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Result</h4>
            <p>{item.outcome}</p>
          </div>
        </div>
      </div>

      <div className="case__proof">
        <img src={item.image} alt={`${item.name} work sample`} loading="lazy" />
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
          <p className="lede">
            A handful of projects I can share publicly, with the actual screenshots behind them.
          </p>
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
