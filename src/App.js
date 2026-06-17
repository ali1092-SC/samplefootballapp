import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MatchSchedule from './components/MatchSchedule';
import PlayersToWatch from './components/PlayersToWatch';
import TopPlayers from './components/TopPlayers';
import MatchSummary from './components/MatchSummary';
import LatestNews from './components/LatestNews';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <MatchSchedule />
      <PlayersToWatch />
      <TopPlayers />
      <MatchSummary />
      <LatestNews />
      <Footer />
    </div>
  );
}

export default App;
