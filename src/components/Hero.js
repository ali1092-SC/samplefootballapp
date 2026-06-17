import React, { useEffect, useRef } from 'react';
import './Hero.css';

const Hero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.7 ? '#D4AF37' : '#FFFFFF';
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < 120; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const scrollToSection = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="hero" className="hero">
      <canvas ref={canvasRef} className="hero__canvas" />
      <div className="hero__overlay" />

      <div className="hero__hexagons">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`hero__hex hero__hex--${i + 1}`} />
        ))}
      </div>

      <div className="hero__content container">
        <div className="hero__meta">
          <span className="hero__meta-badge">⚽ Official Fan App</span>
          <span className="hero__meta-dot">•</span>
          <span className="hero__meta-text">June 11 – July 19, 2026</span>
        </div>

        <div className="hero__trophy">🏆</div>

        <h1 className="hero__title">
          <span className="hero__title-fifa">FIFA</span>
          <span className="hero__title-world">World Cup</span>
          <span className="hero__title-year">2026™</span>
        </h1>

        <p className="hero__tagline">
          WE ARE <span className="hero__tagline-highlight">26</span>
        </p>

        <p className="hero__desc">
          48 Teams. 3 Nations. 1 Champion. The greatest football tournament on Earth returns to North America for the most epic World Cup in history.
        </p>

        <div className="hero__hosts">
          <div className="hero__host">
            <span className="hero__host-flag">🇺🇸</span>
            <span>USA</span>
          </div>
          <div className="hero__host-divider">×</div>
          <div className="hero__host">
            <span className="hero__host-flag">🇨🇦</span>
            <span>Canada</span>
          </div>
          <div className="hero__host-divider">×</div>
          <div className="hero__host">
            <span className="hero__host-flag">🇲🇽</span>
            <span>Mexico</span>
          </div>
        </div>

        <div className="hero__actions">
          <button className="hero__btn hero__btn--primary" onClick={() => scrollToSection('#schedule')}>
            View Schedule
          </button>
          <button className="hero__btn hero__btn--secondary" onClick={() => scrollToSection('#news')}>
            Latest News
          </button>
        </div>

        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-num">48</span>
            <span className="hero__stat-label">Teams</span>
          </div>
          <div className="hero__stat-sep" />
          <div className="hero__stat">
            <span className="hero__stat-num">16</span>
            <span className="hero__stat-label">Venues</span>
          </div>
          <div className="hero__stat-sep" />
          <div className="hero__stat">
            <span className="hero__stat-num">104</span>
            <span className="hero__stat-label">Matches</span>
          </div>
          <div className="hero__stat-sep" />
          <div className="hero__stat">
            <span className="hero__stat-num">39</span>
            <span className="hero__stat-label">Days</span>
          </div>
        </div>
      </div>

      <div className="hero__scroll-hint">
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
        <span>Scroll to Explore</span>
      </div>
    </section>
  );
};

export default Hero;
