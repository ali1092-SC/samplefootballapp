import React, { useState } from 'react'
import { Menu, X, Trophy } from 'lucide-react'

const navLinks = [
  { label: 'Schedule', href: '#schedule' },
  { label: 'Players to Watch', href: '#players-watch' },
  { label: 'Top Players', href: '#top-players' },
  { label: 'Match Summary', href: '#match-summary' },
  { label: 'News', href: '#news' },
]

export default function Header({ scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-fifa-dark/95 backdrop-blur-md shadow-lg shadow-black/50 border-b border-fifa-gold/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fifa-gold to-yellow-600 flex items-center justify-center shadow-lg">
                <span className="text-lg">⚽</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-fifa-red rounded-full border border-white" />
            </div>
            <div>
              <div className="font-black text-sm tracking-widest text-white uppercase">FIFA</div>
              <div className="text-[10px] tracking-[0.2em] text-fifa-gold font-semibold uppercase">World Cup 2026™</div>
            </div>
          </div>

          {/* Host Nations Badge */}
          <div className="hidden md:flex items-center gap-1 bg-fifa-card/80 border border-fifa-gold/20 rounded-full px-3 py-1">
            <span className="text-sm">🇺🇸</span>
            <span className="text-xs text-fifa-gold/60 mx-1">|</span>
            <span className="text-sm">🇨🇦</span>
            <span className="text-xs text-fifa-gold/60 mx-1">|</span>
            <span className="text-sm">🇲🇽</span>
            <span className="text-xs text-white/60 ml-2 font-medium">USA · CAN · MEX</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="px-3 py-2 text-sm font-medium text-white/70 hover:text-fifa-gold transition-colors duration-200 rounded-lg hover:bg-fifa-gold/10"
              >
                {link.label}
              </a>
            ))}
            <button className="ml-2 px-4 py-2 bg-gradient-to-r from-fifa-red to-red-700 text-white text-sm font-bold rounded-full hover:from-red-600 hover:to-red-800 transition-all shadow-lg shadow-red-900/30">
              Buy Tickets
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-white/70 hover:text-white"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-fifa-dark/98 border-t border-fifa-gold/20 backdrop-blur-md">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="block px-4 py-3 text-sm font-medium text-white/80 hover:text-fifa-gold hover:bg-fifa-gold/10 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button className="w-full mt-2 py-3 bg-gradient-to-r from-fifa-red to-red-700 text-white font-bold rounded-xl">
              Buy Tickets
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
