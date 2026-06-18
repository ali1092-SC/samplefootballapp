import React from 'react'
import { Twitter, Instagram, Youtube, Facebook, ExternalLink } from 'lucide-react'

const hostCities = [
  { city: 'New York', country: '🇺🇸', venue: 'MetLife Stadium' },
  { city: 'Los Angeles', country: '🇺🇸', venue: 'SoFi Stadium' },
  { city: 'Dallas', country: '🇺🇸', venue: 'AT&T Stadium' },
  { city: 'San Francisco', country: '🇺🇸', venue: "Levi's Stadium" },
  { city: 'Boston', country: '🇺🇸', venue: 'Gillette Stadium' },
  { city: 'Mexico City', country: '🇲🇽', venue: 'Estadio Azteca' },
  { city: 'Toronto', country: '🇨🇦', venue: 'BMO Field' },
  { city: 'Vancouver', country: '🇨🇦', venue: 'BC Place' },
]

const footerLinks = [
  {
    title: 'Tournament',
    links: ['Groups', 'Knockout Stage', 'All Fixtures', 'Results', 'Standings'],
  },
  {
    title: 'Players',
    links: ['Top Scorers', 'Best Rated', 'Player Profiles', 'Team Squads', 'Awards'],
  },
  {
    title: 'More',
    links: ['Tickets', 'Host Cities', 'News', 'Fan Guide', 'Merchandise'],
  },
]

const socials = [
  { Icon: Twitter, label: 'Twitter', color: 'hover:text-sky-400' },
  { Icon: Instagram, label: 'Instagram', color: 'hover:text-pink-400' },
  { Icon: Youtube, label: 'YouTube', color: 'hover:text-red-500' },
  { Icon: Facebook, label: 'Facebook', color: 'hover:text-blue-500' },
]

export default function Footer() {
  return (
    <footer className="bg-fifa-dark border-t border-fifa-gold/20 mt-8">
      {/* Host cities strip */}
      <div className="border-b border-fifa-border py-8 px-4 overflow-x-auto">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-white/30 uppercase tracking-widest text-center mb-6">Official Host Cities & Venues</p>
          <div className="flex gap-4 flex-wrap justify-center">
            {hostCities.map((city) => (
              <div key={city.city} className="flex flex-col items-center gap-1 bg-white/5 border border-fifa-border rounded-xl px-4 py-3 min-w-[100px] card-hover">
                <span className="text-xl">{city.country}</span>
                <span className="text-xs font-bold text-white">{city.city}</span>
                <span className="text-[10px] text-white/40 text-center">{city.venue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-fifa-gold to-yellow-600 flex items-center justify-center shadow-lg">
                <span className="text-xl">⚽</span>
              </div>
              <div>
                <div className="font-black text-base tracking-widest text-white uppercase">FIFA</div>
                <div className="text-xs tracking-[0.2em] text-fifa-gold font-semibold uppercase">World Cup 2026™</div>
              </div>
            </div>
            <p className="text-sm text-white/40 leading-relaxed mb-6 max-w-sm">
              The 23rd FIFA World Cup™ is set to be the largest in history, hosted across the United States, Canada, and Mexico. June 11 – July 19, 2026.
            </p>

            {/* Host flags */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 bg-white/5 border border-fifa-border rounded-full px-4 py-2">
                <span className="text-xl">🇺🇸</span>
                <span className="text-xs text-white/60">USA</span>
                <span className="text-white/20 mx-1">·</span>
                <span className="text-xl">🇨🇦</span>
                <span className="text-xs text-white/60">CAN</span>
                <span className="text-white/20 mx-1">·</span>
                <span className="text-xl">🇲🇽</span>
                <span className="text-xs text-white/60">MEX</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socials.map(({ Icon, label, color }) => (
                <button
                  key={label}
                  className={`w-9 h-9 bg-white/5 border border-fifa-border rounded-full flex items-center justify-center text-white/40 ${color} transition-colors hover:border-current`}
                  aria-label={label}
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-bold text-white/80 uppercase tracking-widest mb-4">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white/40 hover:text-fifa-gold transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-fifa-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-white/25 text-center md:text-left">
            © 2026 FIFA — Fédération Internationale de Football Association. All rights reserved.
            <br className="hidden md:block" />
            This is a fan-made application. FIFA™ and FIFA World Cup™ are registered trademarks of FIFA.
          </div>
          <div className="flex items-center gap-4">
            {['Privacy Policy', 'Terms of Use', 'Cookie Policy'].map((item) => (
              <a key={item} href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* FIFA motto */}
        <div className="text-center mt-8">
          <p className="text-xs text-fifa-gold/30 italic tracking-widest uppercase">
            "For the Game. For the World."
          </p>
        </div>
      </div>
    </footer>
  )
}
