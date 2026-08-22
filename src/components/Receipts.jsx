import { receiptsRowA, receiptsRowB } from '../data/content';
import Reveal from './Reveal';
import './Receipts.css';

function Row({ images, reverse, duration }) {
  return (
    <div className="mq receiptsRow" aria-hidden="true">
      <div
        className={`mq__track ${reverse ? 'mq__track--rev' : ''}`}
        style={{ '--mq-dur': duration }}
      >
        {[0, 1].map((pass) => (
          <div className="receiptsRow__set" key={pass}>
            {images.map((src, i) => (
              <div className="receiptsRow__card" key={`${pass}-${i}`}>
                <img src={src} alt="" loading="lazy" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Receipts() {
  return (
    <section className="section receipts" id="receipts">
      <div className="band band--dark receipts__band">
        <div className="wrap">
          <Reveal className="receipts__head">
            <span className="kicker">Receipts</span>
            <h2 className="display h2">
              Screenshots, or it <em className="serif-em">did not happen.</em>
            </h2>
          </Reveal>
        </div>

        <Row images={receiptsRowA} duration="58s" />
        <Row images={receiptsRowB} duration="66s" reverse />
      </div>
    </section>
  );
}
