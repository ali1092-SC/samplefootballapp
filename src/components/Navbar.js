import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#schedule', label: 'Schedule' },
    { href: '#players-watch', label: 'Players to Watch' },
    { href: '#top-players', label: 'Top Players' },
    { href: '#summaries', label: 'Match Reports' },
    { href: '#news', label: 'News' },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <a href="#hero" className="navbar__brand" onClick={(e) => scrollToSection(e, '#hero')}>
          <div className="navbar__logo">
            <div className="navbar__logo-icon">
              <span>⚽</span>
            </div>
            <div className="navbar__logo-text">
              <span className="navbar__logo-fifa">FIFA</span>
              <span className="navbar__logo-wc">World Cup 2026™</span>
            </div>
          </div>
        </a>

        <ul className={`navbar__links${menuOpen ? ' navbar__links--open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={(e) => scrollToSection(e, link.href)}>
                {link.label}
              </a>
            </li>
          ))}
          <li className="navbar__cta">
            <a href="#schedule" onClick={(e) => scrollToSection(e, '#schedule')} className="navbar__btn">
              View Fixtures
            </a>
          </li>
        </ul>

        <button
          className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
