import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MatchSchedule from './components/MatchSchedule';
import TopPlayers from './components/TopPlayers';
import MatchSummary from './components/MatchSummary';
import NewsFeed from './components/NewsFeed';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-fifa-navyDark font-inter">
      <Header />
      <main>
        <Hero />
        
        {/* Decorative divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-fifa-gold/40 to-transparent"></div>
        
        <MatchSchedule />
        
        <div className="h-px bg-gradient-to-r from-transparent via-fifa-gold/40 to-transparent"></div>
        
        <TopPlayers />
        
        <div className="h-px bg-gradient-to-r from-transparent via-fifa-gold/40 to-transparent"></div>
        
        <MatchSummary />
        
        <div className="h-px bg-gradient-to-r from-transparent via-fifa-gold/40 to-transparent"></div>
        
        <NewsFeed />
      </main>
      <Footer />
    </div>
  );
}

export default App;
