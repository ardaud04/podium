import { motion } from 'motion/react';
import { contact } from '../data/content';
import { useContactForm } from './ContactModal';
import Reveal, { RevealGroup, revealItem } from './Reveal';
import './Contact.css';

export default function Contact() {
  const { openForm } = useContactForm();

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
              Tell me what you need in two boxes and a sentence. It lands in my inbox and I answer
              it myself, usually the same day.
            </p>

            <button type="button" className="btn btn--solid contact__cta" onClick={openForm}>
              Start a project
              <span className="arrow">&rarr;</span>
            </button>
          </Reveal>

          <span className="contact__divider">or reach me directly</span>

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
