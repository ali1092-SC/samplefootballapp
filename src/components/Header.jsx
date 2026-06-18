import React, { useState, useEffect } from 'react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Schedule', href: '#schedule' },
    { label: 'Top Players', href: '#top-players' },
    { label: 'Match Summaries', href: '#summaries' },
    { label: 'News', href: '#news' },
  ];

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-fifa-red text-white text-center py-2 px-4 text-xs font-semibold tracking-widest uppercase z-50 relative">
        <span className="inline-flex items-center gap-2">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse inline-block"></span>
          FIFA World Cup 2026™ — Now Live | USA · Canada · Mexico
          <span className="w-2 h-2 bg-white rounded-full animate-pulse inline-block"></span>
        </span>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-fifa-navyDark/98 shadow-2xl backdrop-blur-md border-b border-fifa-gold/20'
            : 'bg-fifa-navyDark border-b border-fifa-gold/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gold-gradient flex items-center justify-center shadow-lg">
                  <span className="text-2xl">⚽</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-fifa-red rounded-full border-2 border-fifa-navyDark animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="font-bebas text-2xl text-white tracking-[0.15em]">FIFA</span>
                  <span className="font-bebas text-2xl text-fifa-gold tracking-[0.1em]">WORLD CUP</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bebas text-3xl text-white tracking-[0.2em] leading-none">2026</span>
                  <span className="text-xs text-fifa-gold/70 font-semibold">™</span>
                  <div className="flex gap-1 ml-2">
                    <span className="text-xs">🇺🇸</span>
                    <span className="text-xs">🇨🇦</span>
                    <span className="text-xs">🇲🇽</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-5 py-2 text-sm font-semibold text-white/80 hover:text-fifa-gold tracking-wider uppercase transition-all duration-200 hover:bg-fifa-gold/10 rounded-lg"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#schedule"
                className="ml-4 px-6 py-2.5 bg-gold-gradient text-fifa-navyDark font-bold text-sm tracking-wider uppercase rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-fifa-gold/30 hover:scale-105"
              >
                Watch Now
              </a>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="flex flex-col gap-1.5">
                <span className={`w-6 h-0.5 bg-fifa-gold transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-6 h-0.5 bg-fifa-gold transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-6 h-0.5 bg-fifa-gold transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-fifa-gold/20 py-4 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-white/80 hover:text-fifa-gold font-semibold tracking-wider uppercase text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
