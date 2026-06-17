import React from 'react';
import './Footer.css';

const socialLinks = [
  { icon: 'fa-twitter', label: 'Twitter', url: 'https://twitter.com/FIFAWorldCup' },
  { icon: 'fa-instagram', label: 'Instagram', url: 'https://instagram.com/fifaworldcup' },
  { icon: 'fa-facebook', label: 'Facebook', url: 'https://facebook.com/fifaworldcup' },
  { icon: 'fa-youtube', label: 'YouTube', url: 'https://youtube.com/@FIFAWorldCup' },
  { icon: 'fa-tiktok', label: 'TikTok', url: 'https://tiktok.com/@fifaworldcup' },
];

const hostCities = [
  { city: 'New York/NJ', venue: 'MetLife Stadium', flag: '🇺🇸' },
  { city: 'Los Angeles', venue: 'SoFi Stadium', flag: '🇺🇸' },
  { city: 'Dallas', venue: 'AT&T Stadium', flag: '🇺🇸' },
  { city: 'San Francisco', venue: "Levi's Stadium", flag: '🇺🇸' },
  { city: 'Seattle', venue: 'Lumen Field', flag: '🇺🇸' },
  { city: 'Miami', venue: 'Hard Rock Stadium', flag: '🇺🇸' },
  { city: 'Toronto', venue: 'BMO Field', flag: '🇨🇦' },
  { city: 'Vancouver', venue: 'BC Place', flag: '🇨🇦' },
  { city: 'Mexico City', venue: 'Estadio Azteca', flag: '🇲🇽' },
  { city: 'Guadalajara', venue: 'Estadio Akron', flag: '🇲🇽' },
];

const sponsors = [
  { name: 'adidas', icon: '⚡' },
  { name: 'Coca-Cola', icon: '🥤' },
  { name: 'Hyundai', icon: '🚗' },
  { name: 'Qatar Airways', icon: '✈️' },
  { name: 'Visa', icon: '💳' },
  { name: 'Budweiser', icon: '🍺' },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="footer-wave">
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
          <path d="M0,0 C300,60 900,60 1200,0 L1200,60 L0,60 Z" fill="#000e2e" />
        </svg>
      </div>

      <div className="footer-inner">
        {/* Main Footer Brand */}
        <div className="footer-brand-section">
          <div className="footer-logo">
            <span className="footer-trophy">🏆</span>
            <div className="footer-logo-text">
              <span className="footer-fifa">FIFA</span>
              <span className="footer-wc">WORLD CUP</span>
              <span className="footer-year-small">2026™</span>
            </div>
          </div>
          <p className="footer-tagline">WE ARE 26 · UNITED BY FOOTBALL</p>
          <div className="footer-host-flags">
            <span className="footer-host">🇺🇸 USA</span>
            <span className="footer-host-sep">·</span>
            <span className="footer-host">🇨🇦 Canada</span>
            <span className="footer-host-sep">·</span>
            <span className="footer-host">🇲🇽 Mexico</span>
          </div>
          <div className="footer-socials">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label={s.label}
              >
                <i className={`fab ${s.icon}`} />
              </a>
            ))}
          </div>
        </div>

        {/* Host Cities */}
        <div className="footer-cities-section">
          <h4 className="footer-section-title">Host Cities & Venues</h4>
          <div className="footer-cities-grid">
            {hostCities.map((c) => (
              <div key={c.city} className="footer-city-item">
                <span className="footer-city-flag">{c.flag}</span>
                <div className="footer-city-info">
                  <span className="footer-city-name">{c.city}</span>
                  <span className="footer-city-venue">{c.venue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div className="footer-sponsors-section">
          <h4 className="footer-section-title">Official Partners</h4>
          <div className="footer-sponsors-grid">
            {sponsors.map((s) => (
              <div key={s.name} className="footer-sponsor-badge">
                <span className="sponsor-icon">{s.icon}</span>
                <span className="sponsor-name">{s.name}</span>
              </div>
            ))}
          </div>

          <div className="footer-quicklinks">
            <h4 className="footer-section-title" style={{ marginTop: '28px' }}>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/canadamexicousa2026" target="_blank" rel="noopener noreferrer">Official FIFA Site</a></li>
              <li><a href="#schedule" onClick={(e) => { e.preventDefault(); document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' }); }}>Match Schedule</a></li>
              <li><a href="#players" onClick={(e) => { e.preventDefault(); document.getElementById('players')?.scrollIntoView({ behavior: 'smooth' }); }}>Players to Watch</a></li>
              <li><a href="#top-players" onClick={(e) => { e.preventDefault(); document.getElementById('top-players')?.scrollIntoView({ behavior: 'smooth' }); }}>Tournament Leaders</a></li>
              <li><a href="#news" onClick={(e) => { e.preventDefault(); document.getElementById('news')?.scrollIntoView({ behavior: 'smooth' }); }}>Latest News</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <div className="footer-disclaimer">
            <p>
              ⚠️ This is a fan-made application created for informational purposes. 
              Match data, schedules and player information are illustrative examples only.
            </p>
            <p>
              FIFA WORLD CUP™ and all related marks are trademarks of FIFA. 
              This site is not affiliated with or endorsed by FIFA.
            </p>
          </div>

          <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
            <i className="fas fa-chevron-up" />
            <span>Top</span>
          </button>
        </div>

        <div className="footer-copyright">
          <p>© 2026 FIFA World Cup Fan App · Built with ❤️ for football fans worldwide</p>
          <div className="footer-host-nations">
            <span>🇺🇸</span>
            <span>🇨🇦</span>
            <span>🇲🇽</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
