import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import NewsTicker from './components/NewsTicker';
import MatchSchedule from './components/MatchSchedule';
import TopPlayers from './components/TopPlayers';
import PlayersToWatch from './components/PlayersToWatch';
import MatchSummary from './components/MatchSummary';
import LatestNews from './components/LatestNews';
import Footer from './components/Footer';
import './index.css';

const SectionDivider = ({ text }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 24px',
    overflow: 'hidden',
    background: '#000d2e'
  }}>
    <div style={{
      flex: 1,
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3))'
    }} />
    <div style={{
      padding: '8px 24px',
      background: 'rgba(201,168,76,0.08)',
      border: '1px solid rgba(201,168,76,0.2)',
      borderRadius: '20px',
      fontFamily: 'Bebas Neue, cursive',
      fontSize: '12px',
      letterSpacing: '3px',
      color: '#c9a84c',
      whiteSpace: 'nowrap'
    }}>
      ⚽ {text} ⚽
    </div>
    <div style={{
      flex: 1,
      height: '1px',
      background: 'linear-gradient(90deg, rgba(201,168,76,0.3), transparent)'
    }} />
  </div>
);

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const observerRef = useRef(null);

  useEffect(() => {
    const sections = ['hero', 'schedule', 'players', 'watch', 'results', 'news'];
    const observers = [];

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: '-40% 0px -40% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    observerRef.current = observers;
    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#000d2e' }}>
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <Hero />
      <NewsTicker />
      <MatchSchedule />
      <SectionDivider text="FIFA WORLD CUP 2026" />
      <TopPlayers />
      <SectionDivider text="STARS OF THE TOURNAMENT" />
      <PlayersToWatch />
      <SectionDivider text="MATCH CENTRE" />
      <MatchSummary />
      <SectionDivider text="NEWS & UPDATES" />
      <LatestNews />
      <Footer />

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
}

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #c9a84c, #f0c060)',
        border: 'none',
        color: '#001f5b',
        fontSize: '20px',
        cursor: 'pointer',
        zIndex: 999,
        boxShadow: '0 8px 30px rgba(201,168,76,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        fontWeight: '700'
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      title="Back to top"
    >
      ▲
    </button>
  );
};

export default App;
