import React, { useState, useEffect } from 'react';
import './Header.css';

const hostNations = [
  { name: 'United States', flag: '🇺🇸', color: '#B22234' },
  { name: 'Canada', flag: '🇨🇦', color: '#FF0000' },
  { name: 'Mexico', flag: '🇲🇽', color: '#006847' },
];

const navLinks = [
  { id: 'schedule', label: 'Schedule', icon: 'fa-calendar-alt' },
  { id: 'players', label: 'Players', icon: 'fa-user-circle' },
  { id: 'top-players', label: 'Top Players', icon: 'fa-trophy' },
  { id: 'news', label: 'News', icon: 'fa-newspaper' },
];

function Countdown() {
  const targetDate = new Date('2026-06-11T20:00:00-05:00');
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const calc = () => {
      const diff = targetDate - new Date();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hrs', value: timeLeft.hours },
    { label: 'Min', value: timeLeft.minutes },
    { label: 'Sec', value: timeLeft.seconds },
  ];

  return (
    <div className="countdown">
      <span className="countdown-label">TOURNAMENT KICKOFF</span>
      <div className="countdown-units">
        {units.map((u) => (
          <div className="countdown-unit" key={u.label}>
            <span className="countdown-value">{String(u.value ?? 0).padStart(2, '0')}</span>
            <span className="countdown-unit-label">{u.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Header({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header className="header">
      {/* Top ticker */}
      <div className="ticker-bar">
        <div className="ticker-content">
          <span className="ticker-live">● LIVE</span>
          <div className="ticker-scroll">
            <span>🇦🇷 ARG 5-0 BOL &nbsp;|&nbsp; 🇺🇸 USA 2-1 MEX &nbsp;|&nbsp; 🇫🇷 FRA 2-2 MAR &nbsp;|&nbsp; 🇵🇹 POR 2-1 ENG &nbsp;|&nbsp; 🇧🇷 BRA 3-0 COL &nbsp;|&nbsp; 🇨🇦 CAN 1-1 URU &nbsp;|&nbsp; 🇯🇵 JPN 2-1 KSA &nbsp;|&nbsp; FIFA WORLD CUP 2026™ — NORTH AMERICA</span>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-overlay" />
        <div className="hero-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{ '--delay': `${Math.random() * 5}s`, '--x': `${Math.random() * 100}%`, '--size': `${Math.random() * 6 + 2}px` }} />
          ))}
        </div>

        <div className="hero-content">
          <div className="host-badges">
            {hostNations.map((n) => (
              <div key={n.name} className="host-badge">
                <span className="host-flag">{n.flag}</span>
                <span className="host-name">{n.name}</span>
              </div>
            ))}
          </div>

          <div className="hero-logo-section">
            <div className="trophy-icon">🏆</div>
            <div className="hero-title-block">
              <div className="hero-fifa">FIFA</div>
              <div className="hero-wc">WORLD CUP</div>
              <div className="hero-year">2026™</div>
            </div>
          </div>

          <div className="hero-tagline">WE ARE 26 · UNITED BY FOOTBALL</div>
          <Countdown />

          <div className="hero-meta">
            <div className="hero-meta-item">
              <i className="fas fa-map-marker-alt" />
              <span>16 Host Cities</span>
            </div>
            <div className="hero-meta-divider" />
            <div className="hero-meta-item">
              <i className="fas fa-users" />
              <span>48 Teams</span>
            </div>
            <div className="hero-meta-divider" />
            <div className="hero-meta-item">
              <i className="fas fa-futbol" />
              <span>104 Matches</span>
            </div>
            <div className="hero-meta-divider" />
            <div className="hero-meta-item">
              <i className="fas fa-calendar" />
              <span>Jun 11 – Jul 19, 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Nav */}
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-inner">
          <div className="navbar-brand">
            <span className="navbar-trophy">🏆</span>
            <span className="navbar-title">WC2026™</span>
          </div>

          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`} />
          </button>

          <ul className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  className={`nav-link ${activeSection === link.id ? 'nav-link-active' : ''}`}
                  onClick={() => scrollTo(link.id)}
                >
                  <i className={`fas ${link.icon}`} />
                  <span>{link.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
