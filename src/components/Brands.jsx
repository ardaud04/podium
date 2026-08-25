import { brands } from '../data/content';
import Reveal from './Reveal';
import './Brands.css';

function Tile({ brand }) {
  return (
    <div className="brandTile" title={brand.name}>
      <img
        src={brand.src}
        alt={brand.name}
        loading="lazy"
        className={`brandTile__img brandTile__img--${brand.shape}`}
      />
    </div>
  );
}

export default function Brands() {
  return (
    <section className="section brandsSection" id="brands">
      <div className="band band--dark brandsBand">
        <div className="wrap">
          <Reveal className="brands__head">
            <span className="kicker">{brands.kicker}</span>
            <h2 className="display h2">
              {brands.title} <em className="serif-em">{brands.titleItalic}</em>
            </h2>
          </Reveal>
        </div>

        <div className="mq brandsRow">
          <div className="mq__track" style={{ '--mq-dur': '46s' }}>
            {/* two identical passes so the loop meets itself with no seam */}
            {[0, 1].map((pass) => (
              <div className="brandsRow__set" key={pass} aria-hidden={pass === 1}>
                {brands.logos.map((brand) => (
                  <Tile brand={brand} key={`${pass}-${brand.name}`} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
