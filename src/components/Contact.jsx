import { motion } from 'motion/react';
import { contact } from '../data/content';
import Reveal, { RevealGroup, revealItem } from './Reveal';
import './Contact.css';

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="band band--dark contact__band">
        <div className="wrap">
          <Reveal className="contact__head">
            <span className="kicker">Get in touch</span>
            <h2 className="display h2">
              Start the <em className="serif-em">conversation.</em>
            </h2>
            <p className="lede">
              Pick whichever is easiest. The same person answers all three, usually within the day.
            </p>
          </Reveal>

          <RevealGroup className="contact__grid">
            {contact.map((c) => (
              <motion.a
                className="ccard"
                key={c.label}
                href={c.href}
                variants={revealItem}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <b className="display">{c.label}</b>
                <span>{c.detail}</span>
                <span className="ccard__arrow">&rarr;</span>
              </motion.a>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
