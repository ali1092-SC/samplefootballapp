import React from 'react';

const Footer = () => {
  const hostCities = [
    { city: 'New York/NJ', country: '🇺🇸', venue: 'MetLife Stadium' },
    { city: 'Los Angeles', country: '🇺🇸', venue: 'SoFi Stadium' },
    { city: 'Dallas', country: '🇺🇸', venue: 'AT&T Stadium' },
    { city: 'San Francisco', country: '🇺🇸', venue: "Levi's Stadium" },
    { city: 'Vancouver', country: '🇨🇦', venue: 'BC Place' },
    { city: 'Toronto', country: '🇨🇦', venue: 'BMO Field' },
    { city: 'Mexico City', country: '🇲🇽', venue: 'Estadio Azteca' },
    { city: 'Guadalajara', country: '🇲🇽', venue: 'Estadio Akron' },
  ];

  return (
    <footer className="bg-fifa-navyDark border-t border-fifa-gold/20">
      {/* Host cities section */}
      <div className="border-b border-fifa-gold/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="section-subtitle mb-2">Tournament Venues</p>
            <h3 className="font-bebas text-4xl text-white tracking-wider">Host Stadiums</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {hostCities.map((host, i) => (
              <div key={i} className="text-center group">
                <div className="w-14 h-14 bg-fifa-navy/60 border border-fifa-gold/20 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-2 group-hover:border-fifa-gold/50 transition-all duration-300 group-hover:bg-fifa-gold/10">
                  {host.country}
                </div>
                <p className="text-white/80 text-xs font-semibold">{host.city}</p>
                <p className="text-white/30 text-xs leading-tight mt-0.5">{host.venue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center">
                  <span className="text-xl">⚽</span>
                </div>
                <div>
                  <p className="font-bebas text-xl text-white tracking-widest">FIFA</p>
                  <p className="font-bebas text-xl text-fifa-gold tracking-wider -mt-1">WORLD CUP 2026™</p>
                </div>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                The official fan hub for FIFA World Cup 2026™. Bringing you closer to the beautiful game.
              </p>
              <div className="flex gap-3 mt-6">
                {['Twitter / X', 'Instagram', 'YouTube', 'TikTok'].map((social) => (
                  <div key={social} title={social} className="w-9 h-9 bg-white/5 hover:bg-fifa-gold/20 border border-white/10 hover:border-fifa-gold/40 rounded-lg flex items-center justify-center transition-all cursor-pointer">
                    <span className="text-white/50 text-xs">
                      {social === 'Twitter / X' ? '𝕏' : social === 'Instagram' ? '📸' : social === 'YouTube' ? '▶' : '♪'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tournament */}
            <div>
              <h4 className="text-fifa-gold font-bold text-sm tracking-widest uppercase mb-4">Tournament</h4>
              <ul className="space-y-2">
                {['Match Schedule', 'Group Stage', 'Round of 32', 'Knockout Rounds', 'Final - July 19', 'All Venues'].map((item) => (
                  <li key={item}>
                    <a href="#schedule" className="text-white/50 hover:text-fifa-gold text-sm transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Players */}
            <div>
              <h4 className="text-fifa-gold font-bold text-sm tracking-widest uppercase mb-4">Players</h4>
              <ul className="space-y-2">
                {['Top Scorers', 'Best XI', 'Emerging Stars', 'Golden Boot Race', 'Player Stats', 'All Squads'].map((item) => (
                  <li key={item}>
                    <a href="#top-players" className="text-white/50 hover:text-fifa-gold text-sm transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* News */}
            <div>
              <h4 className="text-fifa-gold font-bold text-sm tracking-widest uppercase mb-4">Media</h4>
              <ul className="space-y-2">
                {['Latest News', 'Match Reports', 'Previews', 'Interviews', 'Video Highlights', 'Photography'].map((item) => (
                  <li key={item}>
                    <a href="#news" className="text-white/50 hover:text-fifa-gold text-sm transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Host nations banner */}
          <div className="bg-gradient-to-r from-fifa-navy via-fifa-navyLight to-fifa-navy rounded-2xl p-6 border border-fifa-gold/15 mb-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="font-bebas text-2xl text-white tracking-widest">HOSTED BY</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
                    <span className="text-2xl">🇺🇸</span>
                    <span className="text-white font-bold text-sm">UNITED STATES</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
                    <span className="text-2xl">🇨🇦</span>
                    <span className="text-white font-bold text-sm">CANADA</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
                    <span className="text-2xl">🇲🇽</span>
                    <span className="text-white font-bold text-sm">MEXICO</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-fifa-gold font-bebas text-xl tracking-widest">JUNE 11 — JULY 19, 2026</p>
                <p className="text-white/40 text-xs">16 cities · 104 matches · 48 nations</p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs text-center sm:text-left">
              © 2026 FIFA World Cup™ Fan Hub. This is a fan-made application for informational purposes.
              FIFA World Cup™ is a trademark of FIFA.
            </p>
            <div className="flex items-center gap-4 text-white/20 text-xs">
              <span>Privacy Policy</span>
              <span>·</span>
              <span>Terms of Use</span>
              <span>·</span>
              <span>Cookie Policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gold line */}
      <div className="h-1 bg-gold-gradient"></div>
    </footer>
  );
};

export default Footer;
