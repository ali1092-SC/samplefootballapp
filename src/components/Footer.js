import React from 'react';
import './Footer.css';

const Footer = () => {
  const scrollToSection = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container footer__top-inner">
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer__logo-icon">⚽</div>
              <div className="footer__logo-text">
                <span className="footer__logo-fifa">FIFA</span>
                <span className="footer__logo-wc">World Cup 2026™</span>
              </div>
            </div>
            <p className="footer__brand-desc">
              The official fan app for FIFA World Cup 2026™ — the greatest football tournament on Earth, hosted across the United States, Canada, and Mexico.
            </p>
            <div className="footer__social">
              {['𝕏', 'f', 'in', '▶'].map((s, i) => (
                <button key={i} className="footer__social-btn">{s}</button>
              ))}
            </div>
          </div>

          <div className="footer__links-col">
            <h4>Quick Links</h4>
            <ul>
              {[
                ['#schedule', 'Match Schedule'],
                ['#players-watch', 'Players to Watch'],
                ['#top-players', 'Top Players'],
                ['#summaries', 'Match Reports'],
                ['#news', 'Latest News'],
              ].map(([href, label]) => (
                <li key={href}>
                  <button onClick={() => scrollToSection(href)}>{label}</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__links-col">
            <h4>Tournament</h4>
            <ul>
              {['Group Stage', 'Knockout Stage', 'Teams & Groups', 'Stadiums & Venues', 'Match Officials', 'Tournament Awards'].map(item => (
                <li key={item}><button>{item}</button></li>
              ))}
            </ul>
          </div>

          <div className="footer__links-col">
            <h4>Host Nations</h4>
            <div className="footer__hosts">
              <div className="footer__host">
                <span>🇺🇸</span>
                <div>
                  <strong>United States</strong>
                  <span>11 Venues</span>
                </div>
              </div>
              <div className="footer__host">
                <span>🇲🇽</span>
                <div>
                  <strong>Mexico</strong>
                  <span>3 Venues</span>
                </div>
              </div>
              <div className="footer__host">
                <span>🇨🇦</span>
                <div>
                  <strong>Canada</strong>
                  <span>2 Venues</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__middle">
        <div className="container">
          <div className="footer__stats">
            {[
              { num: '48', label: 'Competing Nations' },
              { num: '104', label: 'Total Matches' },
              { num: '16', label: 'Host Venues' },
              { num: '5.4M+', label: 'Tickets Available' },
              { num: '3', label: 'Host Countries' },
              { num: '39', label: 'Tournament Days' },
            ].map(s => (
              <div key={s.label} className="footer__stat">
                <span className="footer__stat-num">{s.num}</span>
                <span className="footer__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copyright">
            © 2026 Fédération Internationale de Football Association (FIFA). All Rights Reserved.
          </p>
          <p className="footer__disclaimer">
            This is a fan-made application for demonstration purposes. Not affiliated with or endorsed by FIFA. All trademarks belong to their respective owners.
          </p>
          <div className="footer__legal">
            {['Privacy Policy', 'Terms of Use', 'Cookie Policy', 'Accessibility'].map(item => (
              <button key={item}>{item}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
