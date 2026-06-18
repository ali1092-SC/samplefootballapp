import React, { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import MatchSchedule from './components/MatchSchedule.jsx'
import PlayersToWatch from './components/PlayersToWatch.jsx'
import TopPlayers from './components/TopPlayers.jsx'
import MatchSummary from './components/MatchSummary.jsx'
import LatestNews from './components/LatestNews.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-fifa-dark">
      <Header scrolled={scrolled} />
      <main>
        <Hero />
        <SectionDivider />
        <section id="schedule">
          <MatchSchedule />
        </section>
        <SectionDivider />
        <section id="players-watch">
          <PlayersToWatch />
        </section>
        <SectionDivider />
        <section id="top-players">
          <TopPlayers />
        </section>
        <SectionDivider />
        <section id="match-summary">
          <MatchSummary />
        </section>
        <SectionDivider />
        <section id="news">
          <LatestNews />
        </section>
      </main>
      <Footer />
    </div>
  )
}

function SectionDivider() {
  return (
    <div className="relative py-1">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-fifa-gold/30 to-transparent" />
      </div>
      <div className="relative flex justify-center">
        <span className="px-4 bg-fifa-dark text-fifa-gold/40 text-xs">⚽</span>
      </div>
    </div>
  )
}
