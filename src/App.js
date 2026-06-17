import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MatchSchedule from './components/MatchSchedule';
import PlayersSpotlight from './components/PlayersSpotlight';
import TopPlayers from './components/TopPlayers';
import NewsFeed from './components/NewsFeed';
import Footer from './components/Footer';
import './styles/global.css';

function App() {
  const [activeSection, setActiveSection] = useState('schedule');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['schedule', 'players', 'top-players', 'news'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      <Header activeSection={activeSection} />
      <main>
        <section id="schedule"><MatchSchedule /></section>
        <section id="players"><PlayersSpotlight /></section>
        <section id="top-players"><TopPlayers /></section>
        <section id="news"><NewsFeed /></section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
