import { motion } from 'motion/react';
import { services, steps } from '../data/content';
import Reveal, { RevealGroup, revealItem } from './Reveal';
import './Services.css';

export default function Services() {
  return (
    <section className="section services" id="about">
      <div className="wrap">
        <div className="services__head">
          <Reveal>
            <span className="kicker">About</span>
            <h2 className="display h2">
              One person. <em className="serif-em">All of it.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="lede services__lede">
              Podium is me, Abdul-Rashid. Not an agency, not a ticket queue, not an account manager
              who forwards your notes to someone else. You work directly with the person doing the
              work: filming, editing, posting and refining, with your feedback built into every step.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="services__grid">
          {services.map((s) => (
            <motion.article className="svc" key={s.title} variants={revealItem}>
              <span className="svc__tag">{s.tag}</span>
              <h3 className="display svc__title">{s.title}</h3>
              <p>{s.body}</p>
              <span className="svc__line" />
            </motion.article>
          ))}
        </RevealGroup>

        <Reveal delay={0.15}>
          <p className="services__note">
            What you get is obsessive attention to detail, a real relationship with the person doing
            your work, and constant back and forth until it is right. Everything on this page, the
            motion design, the case studies and the numbers, I did myself.
          </p>
        </Reveal>

        <div className="miniProcess" id="process">
          <span className="kicker">The process</span>
          <RevealGroup className="miniSteps" stagger={0.08}>
            {steps.map((s) => (
              <motion.div className="miniStep" key={s.n} variants={revealItem}>
                <span className="miniStep__n">{s.n}</span>
                <div>
                  <h4 className="display">{s.title}</h4>
                  <p>{s.body}</p>
                </div>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
