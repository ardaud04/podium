import { motion } from 'motion/react';
import { stats } from '../data/content';
import Counter from './Counter';
import Reveal, { RevealGroup, revealItem } from './Reveal';
import './Stats.css';

export default function Stats() {
  return (
    <section className="section statsSection">
      <div className="band band--dark statsBand">
        <div className="wrap">
          <Reveal className="statsHead">
            <span className="kicker">The numbers</span>
            <h2 className="display h2">
              Attention is nice. <em className="serif-em">Movement is better.</em>
            </h2>
          </Reveal>

          <RevealGroup className="statsGrid">
            {stats.map((s) => (
              <motion.div className="stat" key={s.label} variants={revealItem}>
                <b className="display">
                  <Counter value={s.value} suffix={s.suffix} />
                </b>
                <small>{s.label}</small>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
