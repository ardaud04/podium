import { nav, contact } from '../data/content';
import Reveal from './Reveal';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap">
        <Reveal className="footer__top">
          <div className="footer__brand">
            <img src="/images/logo-01.png" alt="Podium" className="footer__logo" />
            <p>
              Growth and content systems for brands that would rather be watched than scrolled past.
              Working out of Dubai and the UK.
            </p>
          </div>

          <div className="footer__cols">
            <div>
              <h4>Menu</h4>
              <ul>
                {nav.map((item) => (
                  <li key={item.href}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Connect</h4>
              <ul>
                {contact.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <div className="footer__bar">
          <small>&copy; {year} Podium. Growth and content systems.</small>
          <small>Dubai to the UK</small>
        </div>
      </div>
    </footer>
  );
}
