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
              Short-form editing and motion design, done end to end by one person. Everything on
              this site is work I made myself.
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
          <small>&copy; {year} Podium. Short-form editing and motion design.</small>
          <small>Run by Abdul-Rashid</small>
        </div>
      </div>
    </footer>
  );
}
