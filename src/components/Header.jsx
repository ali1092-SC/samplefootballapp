import React, { useState, useEffect } from 'react';

const Header = ({ activeSection, setActiveSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'schedule', label: 'Schedule' },
    { id: 'players', label: 'Top Players' },
    { id: 'watch', label: 'Players to Watch' },
    { id: 'results', label: 'Results' },
    { id: 'news', label: 'News' },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
    setMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease',
        background: scrolled
          ? 'rgba(0, 13, 46, 0.97)'
          : 'linear-gradient(180deg, rgba(0,13,46,0.95) 0%, transparent 100%)',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.3)' : 'none',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }} onClick={() => scrollTo('hero')}>
            <div style={{
              width: '46px',
              height: '46px',
              background: 'linear-gradient(135deg, #c9a84c, #f0c060)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              boxShadow: '0 0 20px rgba(201,168,76,0.5)',
              animation: 'glow 3s infinite'
            }}>
              ⚽
            </div>
            <div>
              <div style={{
                fontFamily: 'Bebas Neue, cursive',
                fontSize: '22px',
                letterSpacing: '3px',
                color: '#c9a84c',
                lineHeight: 1
              }}>
                FIFA WORLD CUP
              </div>
              <div style={{
                fontFamily: 'Bebas Neue, cursive',
                fontSize: '28px',
                letterSpacing: '4px',
                color: '#ffffff',
                lineHeight: 1
              }}>
                2026™
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', gap: '8px', alignItems: 'center' }} className="desktop-nav">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  background: activeSection === item.id ? 'rgba(201,168,76,0.2)' : 'transparent',
                  border: activeSection === item.id ? '1px solid rgba(201,168,76,0.5)' : '1px solid transparent',
                  color: activeSection === item.id ? '#c9a84c' : '#b8c8e0',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: '600',
                  fontSize: '13px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  if (activeSection !== item.id) {
                    e.target.style.color = '#ffffff';
                    e.target.style.background = 'rgba(255,255,255,0.1)';
                  }
                }}
                onMouseLeave={e => {
                  if (activeSection !== item.id) {
                    e.target.style.color = '#b8c8e0';
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                {item.label}
              </button>
            ))}
            <div style={{
              background: 'linear-gradient(135deg, #d4143c, #ff2d5c)',
              color: 'white',
              padding: '8px 20px',
              borderRadius: '6px',
              fontWeight: '700',
              fontSize: '12px',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              marginLeft: '8px',
              animation: 'pulse 2s infinite',
              boxShadow: '0 0 15px rgba(212,20,60,0.4)'
            }}>
              🔴 LIVE
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none',
              background: 'transparent',
              border: '1px solid rgba(201,168,76,0.4)',
              color: '#c9a84c',
              padding: '8px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '18px'
            }}
            className="mobile-menu-btn"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{
            background: 'rgba(0,13,46,0.98)',
            borderTop: '1px solid rgba(201,168,76,0.2)',
            padding: '16px 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#b8c8e0',
                  padding: '12px 16px',
                  cursor: 'pointer',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: '600',
                  fontSize: '14px',
                  textAlign: 'left',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
};

export default Header;
