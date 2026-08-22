import './Marquee.css';
import { marqueeWords } from '../data/content';

export default function Marquee() {
  // rendered twice so the loop meets itself with no visible seam
  const run = [...marqueeWords, ...marqueeWords];

  return (
    <div className="mq mqWords" aria-hidden="true">
      <div className="mq__track" style={{ '--mq-dur': '34s' }}>
        {[0, 1].map((pass) => (
          <div className="mqWords__set" key={pass}>
            {run.map((word, i) => (
              <span key={`${pass}-${i}`} className={i % 2 ? 'mqWords__alt' : 'mqWords__main'}>
                {word}
                <i className="mqWords__star">&#10022;</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
