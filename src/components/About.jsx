import { about } from '../data/content';
import Reveal from './Reveal';
import './About.css';

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="wrap about__wrap">
        <Reveal className="about__portrait">
          <figure>
            <img src={about.photo} alt={about.photoAlt} loading="lazy" />
          </figure>
        </Reveal>

        <Reveal delay={0.1} className="about__copy">
          <span className="kicker">{about.kicker}</span>
          <h2 className="display h2">
            {about.title} <em className="serif-em">{about.titleItalic}</em>
          </h2>

          {about.body.map((para, i) => (
            <p key={i} className={i === 0 ? 'lede about__lede' : 'about__para'}>
              {para}
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
