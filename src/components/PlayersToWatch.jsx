import React, { useState } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const featuredMatches = [
  {
    id: 1,
    matchLabel: 'France 🇫🇷 vs Brazil 🇧🇷',
    date: 'Jun 12 | 3:00 PM EST',
    players: [
      {
        name: 'Kylian Mbappé',
        nation: 'France',
        flag: '🇫🇷',
        position: 'ST',
        number: '10',
        color: 'from-blue-800 to-blue-600',
        rating: 9.4,
        avatar: 'KM',
        note: 'The talismanic captain leads France in search of a second consecutive World Cup. His blistering pace and clinical finishing make him the tournament\'s most feared attacker.',
        stats: { goals: 3, assists: 1, rating: 9.1 },
      },
      {
        name: 'Vinícius Júnior',
        nation: 'Brazil',
        flag: '🇧🇷',
        position: 'LW',
        number: '7',
        color: 'from-yellow-700 to-green-700',
        rating: 9.2,
        avatar: 'VJ',
        note: 'Brazil\'s electric winger brings flair, dribbling wizardry and end product. His ability to cut inside and deliver stunning goals could be the difference for the Seleção.',
        stats: { goals: 2, assists: 3, rating: 8.8 },
      },
      {
        name: 'Rodrygo',
        nation: 'Brazil',
        flag: '🇧🇷',
        position: 'RW',
        number: '11',
        color: 'from-green-700 to-yellow-700',
        rating: 8.7,
        avatar: 'RG',
        note: 'The Real Madrid winger has emerged as Brazil\'s clutch player. Known for his big-game temperament and ability to create from wide areas.',
        stats: { goals: 1, assists: 2, rating: 8.4 },
      },
    ],
  },
  {
    id: 2,
    matchLabel: 'England 🏴󠁧󠁢󠁥󠁮󠁧󠁿 vs Argentina 🇦🇷',
    date: 'Jun 12 | 12:00 PM EST',
    players: [
      {
        name: 'Jude Bellingham',
        nation: 'England',
        flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
        position: 'CAM',
        number: '8',
        color: 'from-red-800 to-white/20',
        rating: 9.3,
        avatar: 'JB',
        note: 'The Real Madrid superstar is England\'s heartbeat. His box-to-box energy, leadership and goal-scoring from midfield make him one of the world\'s most complete players.',
        stats: { goals: 2, assists: 2, rating: 9.0 },
      },
      {
        name: 'Lautaro Martínez',
        nation: 'Argentina',
        flag: '🇦🇷',
        position: 'ST',
        number: '22',
        color: 'from-sky-700 to-sky-500',
        rating: 9.0,
        avatar: 'LM',
        note: 'The Inter Milan striker carries the Argentine attack. Lethal in the box, strong in the air, and dangerous with both feet. Aiming to build on his Champions League heroics.',
        stats: { goals: 3, assists: 0, rating: 8.7 },
      },
      {
        name: 'Phil Foden',
        nation: 'England',
        flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
        position: 'AM',
        number: '47',
        color: 'from-blue-900 to-sky-700',
        rating: 8.8,
        avatar: 'PF',
        note: 'England\'s creative genius can unlock any defence with his vision and technical excellence. His direct running and incisive passing are a constant threat.',
        stats: { goals: 1, assists: 3, rating: 8.6 },
      },
    ],
  },
  {
    id: 3,
    matchLabel: 'Germany 🇩🇪 vs Spain 🇪🇸',
    date: 'Jun 13 | 6:00 PM EST',
    players: [
      {
        name: 'Florian Wirtz',
        nation: 'Germany',
        flag: '🇩🇪',
        position: 'AM',
        number: '10',
        color: 'from-gray-700 to-red-800',
        rating: 9.0,
        avatar: 'FW',
        note: 'The Bayer Leverkusen sensation has taken European football by storm. His creativity, dribbling and sublime technique at 21 marks him as the next great German playmaker.',
        stats: { goals: 2, assists: 4, rating: 9.1 },
      },
      {
        name: 'Pedri',
        nation: 'Spain',
        flag: '🇪🇸',
        position: 'CM',
        number: '8',
        color: 'from-red-800 to-yellow-600',
        rating: 8.9,
        avatar: 'PE',
        note: 'Barcelona\'s midfield maestro dictates tempo and creates chances effortlessly. His ability to find pockets of space and play through pressure is extraordinary.',
        stats: { goals: 1, assists: 3, rating: 8.8 },
      },
      {
        name: 'Lamine Yamal',
        nation: 'Spain',
        flag: '🇪🇸',
        position: 'RW',
        number: '19',
        color: 'from-yellow-600 to-red-700',
        rating: 9.2,
        avatar: 'LY',
        note: 'At just 18, the Barcelona wonderkid is Spain\'s brightest star. His audacious dribbling and fearless approach in one-on-one situations give Spain a massive edge.',
        stats: { goals: 3, assists: 2, rating: 9.0 },
      },
    ],
  },
]

export default function PlayersToWatch() {
  const [activeMatch, setActiveMatch] = useState(0)
  const match = featuredMatches[activeMatch]

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-fifa-gold text-xs font-bold tracking-widest uppercase bg-fifa-gold/10 border border-fifa-gold/20 px-4 py-2 rounded-full mb-4">
          <Star size={12} />
          Spotlight
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-3">Players to Watch</h2>
        <p className="text-white/50 text-sm">Key performers to follow in each upcoming fixture</p>
      </div>

      {/* Match Selector */}
      <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
        {featuredMatches.map((m, i) => (
          <button
            key={m.id}
            onClick={() => setActiveMatch(i)}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 ${
              activeMatch === i
                ? 'bg-fifa-gold text-fifa-dark border-fifa-gold shadow-lg shadow-fifa-gold/20'
                : 'bg-transparent border-fifa-border text-white/60 hover:border-fifa-gold/40 hover:text-white'
            }`}
          >
            {m.matchLabel}
          </button>
        ))}
      </div>

      {/* Match Info Bar */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 bg-fifa-card border border-fifa-border rounded-full px-5 py-2 text-sm text-white/60">
          <span className="text-fifa-gold font-semibold">{match.date}</span>
        </div>
      </div>

      {/* Player Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {match.players.map((player, i) => (
          <PlayerCard key={player.name} player={player} index={i} />
        ))}
      </div>
    </div>
  )
}

function PlayerCard({ player, index }) {
  return (
    <div
      className="relative bg-fifa-card border border-fifa-border rounded-3xl overflow-hidden card-hover group"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Top avatar section */}
      <div className={`relative bg-gradient-to-br ${player.color} p-8 flex flex-col items-center`}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)'
          }} />
        </div>

        {/* Avatar circle */}
        <div className="relative z-10 w-24 h-24 rounded-full bg-white/15 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center shadow-2xl mb-3 group-hover:scale-105 transition-transform">
          <span className="text-3xl font-black text-white">{player.avatar}</span>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-fifa-dark rounded-full border-2 border-fifa-gold flex items-center justify-center text-xs font-black text-fifa-gold">
            {player.number}
          </div>
        </div>

        {/* Flag & Position */}
        <div className="relative z-10 flex items-center gap-2">
          <span className="text-xl">{player.flag}</span>
          <span className="text-xs font-bold bg-black/30 text-white px-2 py-0.5 rounded-full">{player.position}</span>
        </div>

        {/* Rating badge */}
        <div className="absolute top-4 right-4 bg-fifa-gold text-fifa-dark text-xs font-black px-2 py-1 rounded-lg shadow-lg">
          {player.rating}
        </div>
      </div>

      {/* Info section */}
      <div className="p-5">
        <h3 className="text-lg font-black text-white mb-0.5">{player.name}</h3>
        <p className="text-xs text-fifa-gold/80 font-semibold uppercase tracking-wider mb-3">{player.nation}</p>

        {/* Stats row */}
        <div className="flex gap-3 mb-4">
          {[
            { label: 'Goals', value: player.stats.goals },
            { label: 'Assists', value: player.stats.assists },
            { label: 'Rating', value: player.stats.rating },
          ].map((stat) => (
            <div key={stat.label} className="flex-1 bg-white/5 rounded-xl p-2 text-center">
              <div className="text-lg font-black text-white">{stat.value}</div>
              <div className="text-[10px] text-white/40 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scouting note */}
        <p className="text-xs text-white/55 leading-relaxed border-t border-fifa-border pt-3">
          {player.note}
        </p>
      </div>
    </div>
  )
}
