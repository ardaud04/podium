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

          <ul className="about__bullets">
            {about.bullets.map((point) => (
              <li key={point}>
                <span className="about__tick" aria-hidden="true">
                  &#10003;
                </span>
                {point}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
