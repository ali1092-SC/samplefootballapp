import React from 'react';

const Footer = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer style={{
      background: '#000510',
      borderTop: '1px solid rgba(201,168,76,0.2)',
      padding: '60px 0 32px'
    }}>
      <div className="section-container">
        {/* Top Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px',
          marginBottom: '48px'
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                background: 'linear-gradient(135deg, #c9a84c, #f0c060)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                ⚽
              </div>
              <div>
                <div style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '16px', letterSpacing: '2px', color: '#c9a84c', lineHeight: 1 }}>
                  FIFA WORLD CUP
                </div>
                <div style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '22px', letterSpacing: '3px', color: '#fff', lineHeight: 1 }}>
                  2026™
                </div>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: '#8a9bb5', lineHeight: '1.7', maxWidth: '260px' }}>
              The greatest sporting event on Earth. USA · Canada · Mexico · June 11 – July 19, 2026.
            </p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              {['🇺🇸', '🇨🇦', '🇲🇽'].map((flag, i) => (
                <span key={i} style={{ fontSize: '24px' }}>{flag}</span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '16px', letterSpacing: '2px', color: '#c9a84c', marginBottom: '16px' }}>
              Quick Links
            </div>
            {[
              { label: 'Match Schedule', id: 'schedule' },
              { label: 'Top Players', id: 'players' },
              { label: 'Players to Watch', id: 'watch' },
              { label: 'Results', id: 'results' },
              { label: 'Latest News', id: 'news' }
            ].map(link => (
              <div
                key={link.id}
                onClick={() => scrollTo(link.id)}
                style={{
                  fontSize: '13px',
                  color: '#8a9bb5',
                  marginBottom: '10px',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={e => e.target.style.color = '#c9a84c'}
                onMouseLeave={e => e.target.style.color = '#8a9bb5'}
              >
                › {link.label}
              </div>
            ))}
          </div>

          {/* Tournament Info */}
          <div>
            <div style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '16px', letterSpacing: '2px', color: '#c9a84c', marginBottom: '16px' }}>
              Tournament Info
            </div>
            {[
              { icon: '🌍', text: '48 Teams' },
              { icon: '⚽', text: '104 Matches' },
              { icon: '🏟️', text: '16 Stadiums' },
              { icon: '👥', text: '5.7M+ Fans Expected' },
              { icon: '🏆', text: 'Final: July 19, 2026' },
              { icon: '📍', text: 'MetLife Stadium, NY' }
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                color: '#8a9bb5',
                marginBottom: '10px'
              }}>
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div>
            <div style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '16px', letterSpacing: '2px', color: '#c9a84c', marginBottom: '16px' }}>
              Tournament Stats
            </div>
            {[
              { label: 'Goals Scored', value: '18' },
              { label: 'Yellow Cards', value: '24' },
              { label: 'Avg Possession %', value: '54%' },
              { label: 'Total Shots', value: '147' },
              { label: 'Saves Made', value: '62' }
            ].map((stat, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                paddingBottom: '8px'
              }}>
                <span style={{ fontSize: '12px', color: '#8a9bb5' }}>{stat.label}</span>
                <span style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '18px', color: '#c9a84c', letterSpacing: '1px' }}>
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)',
          marginBottom: '32px'
        }} />

        {/* Bottom */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ fontSize: '12px', color: '#8a9bb5' }}>
            © 2026 FIFA World Cup™ Fan App. For demonstration purposes only.
          </div>
          <div style={{ fontSize: '12px', color: '#8a9bb5' }}>
            Made with ❤️ for football fans worldwide
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            {['Privacy', 'Terms', 'Contact'].map(link => (
              <span key={link} style={{
                fontSize: '12px',
                color: '#8a9bb5',
                cursor: 'pointer',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={e => e.target.style.color = '#c9a84c'}
              onMouseLeave={e => e.target.style.color = '#8a9bb5'}
              >
                {link}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
