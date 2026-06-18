import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date('2026-06-11T15:00:00-05:00');
    const interval = setInterval(() => {
      const now = new Date();
      const diff = target - now;
      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #000d2e 0%, #001f5b 30%, #0a1a4a 60%, #000d2e 100%)'
    }}>
      {/* Animated Background Elements */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {/* Football field lines */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          border: '1px solid rgba(201,168,76,0.05)',
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px',
          height: '900px',
          borderRadius: '50%',
          border: '1px solid rgba(201,168,76,0.03)',
        }} />
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1px',
          height: '100%',
          background: 'linear-gradient(180deg, transparent, rgba(201,168,76,0.08), transparent)'
        }} />

        {/* Floating orbs */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(201,168,76,0.${i + 1}) 0%, transparent 70%)`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `float${i} ${8 + i * 2}s ease-in-out infinite`,
            }}
          />
        ))}

        {/* Star particles */}
        {[...Array(40)].map((_, i) => (
          <div
            key={`star-${i}`}
            style={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              background: '#ffffff',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        padding: '0 24px',
        maxWidth: '1000px',
        animation: 'fadeInUp 1s ease forwards'
      }}>
        {/* FIFA Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(201,168,76,0.15)',
          border: '1px solid rgba(201,168,76,0.4)',
          borderRadius: '30px',
          padding: '8px 20px',
          marginBottom: '32px',
          fontSize: '12px',
          letterSpacing: '3px',
          fontWeight: '700',
          textTransform: 'uppercase',
          color: '#c9a84c'
        }}>
          <span style={{ animation: 'pulse 2s infinite', color: '#d4143c' }}>●</span>
          Official Fan Experience 2026
        </div>

        {/* Main Title */}
        <div style={{ marginBottom: '8px' }}>
          <span style={{
            fontFamily: 'Bebas Neue, cursive',
            fontSize: 'clamp(60px, 15vw, 140px)',
            letterSpacing: '6px',
            background: 'linear-gradient(135deg, #ffffff 0%, #c9a84c 50%, #ffffff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'block',
            lineHeight: 0.9
          }}>
            FIFA
          </span>
          <span style={{
            fontFamily: 'Bebas Neue, cursive',
            fontSize: 'clamp(30px, 8vw, 70px)',
            letterSpacing: '10px',
            color: '#8a9bb5',
            display: 'block'
          }}>
            WORLD CUP
          </span>
          <span style={{
            fontFamily: 'Bebas Neue, cursive',
            fontSize: 'clamp(70px, 18vw, 160px)',
            letterSpacing: '4px',
            background: 'linear-gradient(135deg, #c9a84c 0%, #f0c060 50%, #c9a84c 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'block',
            lineHeight: 0.9
          }}>
            2026™
          </span>
        </div>

        {/* Host Countries */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          marginBottom: '48px',
          flexWrap: 'wrap'
        }}>
          {['🇺🇸 USA', '🇨🇦 CANADA', '🇲🇽 MEXICO'].map((country, i) => (
            <React.Fragment key={i}>
              <span style={{
                fontFamily: 'Oswald, sans-serif',
                fontSize: '18px',
                fontWeight: '600',
                letterSpacing: '2px',
                color: 'rgba(255,255,255,0.8)'
              }}>
                {country}
              </span>
              {i < 2 && <span style={{ color: '#c9a84c', fontSize: '20px' }}>✦</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Countdown Timer */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: '16px',
          padding: '32px 48px',
          marginBottom: '48px',
          display: 'inline-block'
        }}>
          <div style={{
            fontSize: '11px',
            letterSpacing: '3px',
            color: '#c9a84c',
            fontWeight: '700',
            marginBottom: '20px',
            textTransform: 'uppercase'
          }}>
            ⏱ Tournament Kickoff Countdown
          </div>
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
            {Object.entries(countdown).map(([unit, value]) => (
              <div key={unit} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'Bebas Neue, cursive',
                  fontSize: 'clamp(40px, 8vw, 72px)',
                  color: '#ffffff',
                  lineHeight: 1,
                  background: 'rgba(201,168,76,0.1)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: '10px',
                  padding: '8px 16px',
                  minWidth: '80px'
                }}>
                  {String(value).padStart(2, '0')}
                </div>
                <div style={{
                  fontSize: '10px',
                  fontWeight: '700',
                  letterSpacing: '2px',
                  color: '#8a9bb5',
                  marginTop: '8px',
                  textTransform: 'uppercase'
                }}>
                  {unit}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'linear-gradient(135deg, #c9a84c, #f0c060)',
              color: '#001f5b',
              padding: '16px 40px',
              borderRadius: '8px',
              border: 'none',
              fontFamily: 'Oswald, sans-serif',
              fontSize: '16px',
              fontWeight: '700',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(201,168,76,0.4)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
          >
            View Schedule
          </button>
          <button
            onClick={() => document.getElementById('news')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'transparent',
              color: '#ffffff',
              padding: '16px 40px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.3)',
              fontFamily: 'Oswald, sans-serif',
              fontSize: '16px',
              fontWeight: '700',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.1)'; e.target.style.borderColor = 'rgba(255,255,255,0.6)'; }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.borderColor = 'rgba(255,255,255,0.3)'; }}
          >
            Latest News
          </button>
        </div>
      </div>

      {/* Bottom gradient */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '200px',
        background: 'linear-gradient(transparent, #000d2e)',
        pointerEvents: 'none'
      }} />

      <style>{`
        @keyframes float0 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes float1 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-30px); } }
        @keyframes float2 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        @keyframes float3 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-25px); } }
        @keyframes float4 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-18px); } }
        @keyframes float5 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-22px); } }
      `}</style>
    </section>
  );
};

export default Hero;
