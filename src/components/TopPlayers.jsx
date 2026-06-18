import React, { useState } from 'react'
import { Trophy, Target, Star, TrendingUp } from 'lucide-react'

const categories = ['Golden Boot', 'Most Assists', 'Best Rated']

const topPlayers = {
  'Golden Boot': [
    { rank: 1, name: 'Lautaro Martínez', nation: 'Argentina', flag: '🇦🇷', avatar: 'LM', goals: 5, assists: 1, matches: 3, rating: 8.9, color: 'from-yellow-500 to-yellow-300', isLeader: true },
    { rank: 2, name: 'Kylian Mbappé', nation: 'France', flag: '🇫🇷', avatar: 'KM', goals: 4, assists: 2, matches: 3, rating: 9.1, color: 'from-blue-500 to-blue-300', isLeader: false },
    { rank: 3, name: 'Lamine Yamal', nation: 'Spain', flag: '🇪🇸', avatar: 'LY', goals: 4, assists: 3, matches: 3, rating: 9.0, color: 'from-red-500 to-yellow-400', isLeader: false },
    { rank: 4, name: 'Harry Kane', nation: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', avatar: 'HK', goals: 3, assists: 1, matches: 3, rating: 8.5, color: 'from-red-600 to-red-400', isLeader: false },
    { rank: 5, name: 'Vinícius Júnior', nation: 'Brazil', flag: '🇧🇷', avatar: 'VJ', goals: 3, assists: 4, matches: 3, rating: 8.8, color: 'from-yellow-600 to-green-500', isLeader: false },
    { rank: 6, name: 'Florian Wirtz', nation: 'Germany', flag: '🇩🇪', avatar: 'FW', goals: 3, assists: 3, matches: 3, rating: 9.1, color: 'from-gray-500 to-red-500', isLeader: false },
  ],
  'Most Assists': [
    { rank: 1, name: 'Vinícius Júnior', nation: 'Brazil', flag: '🇧🇷', avatar: 'VJ', goals: 3, assists: 4, matches: 3, rating: 8.8, color: 'from-yellow-600 to-green-500', isLeader: true },
    { rank: 2, name: 'Pedri', nation: 'Spain', flag: '🇪🇸', avatar: 'PE', goals: 1, assists: 4, matches: 3, rating: 8.8, color: 'from-red-600 to-yellow-500', isLeader: false },
    { rank: 3, name: 'Lamine Yamal', nation: 'Spain', flag: '🇪🇸', avatar: 'LY', goals: 4, assists: 3, matches: 3, rating: 9.0, color: 'from-red-500 to-yellow-400', isLeader: false },
    { rank: 4, name: 'Florian Wirtz', nation: 'Germany', flag: '🇩🇪', avatar: 'FW', goals: 3, assists: 3, matches: 3, rating: 9.1, color: 'from-gray-500 to-red-500', isLeader: false },
    { rank: 5, name: 'Jude Bellingham', nation: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', avatar: 'JB', goals: 2, assists: 3, matches: 3, rating: 9.0, color: 'from-red-700 to-red-400', isLeader: false },
    { rank: 6, name: 'Kylian Mbappé', nation: 'France', flag: '🇫🇷', avatar: 'KM', goals: 4, assists: 2, matches: 3, rating: 9.1, color: 'from-blue-500 to-blue-300', isLeader: false },
  ],
  'Best Rated': [
    { rank: 1, name: 'Kylian Mbappé', nation: 'France', flag: '🇫🇷', avatar: 'KM', goals: 4, assists: 2, matches: 3, rating: 9.1, color: 'from-blue-500 to-blue-300', isLeader: true },
    { rank: 2, name: 'Florian Wirtz', nation: 'Germany', flag: '🇩🇪', avatar: 'FW', goals: 3, assists: 3, matches: 3, rating: 9.1, color: 'from-gray-500 to-red-500', isLeader: false },
    { rank: 3, name: 'Lamine Yamal', nation: 'Spain', flag: '🇪🇸', avatar: 'LY', goals: 4, assists: 3, matches: 3, rating: 9.0, color: 'from-red-500 to-yellow-400', isLeader: false },
    { rank: 4, name: 'Jude Bellingham', nation: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', avatar: 'JB', goals: 2, assists: 3, matches: 3, rating: 9.0, color: 'from-red-700 to-red-400', isLeader: false },
    { rank: 5, name: 'Lautaro Martínez', nation: 'Argentina', flag: '🇦🇷', avatar: 'LM', goals: 5, assists: 1, matches: 3, rating: 8.9, color: 'from-yellow-500 to-yellow-300', isLeader: false },
    { rank: 6, name: 'Vinícius Júnior', nation: 'Brazil', flag: '🇧🇷', avatar: 'VJ', goals: 3, assists: 4, matches: 3, rating: 8.8, color: 'from-yellow-600 to-green-500', isLeader: false },
  ],
}

export default function TopPlayers() {
  const [activeCategory, setActiveCategory] = useState('Golden Boot')
  const players = topPlayers[activeCategory]

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-fifa-gold text-xs font-bold tracking-widest uppercase bg-fifa-gold/10 border border-fifa-gold/20 px-4 py-2 rounded-full mb-4">
          <Trophy size={12} />
          Tournament Stats
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-3">Top Players</h2>
        <p className="text-white/50 text-sm">Stats updated after each matchday</p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-10 justify-center flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 ${
              activeCategory === cat
                ? 'tab-active border-transparent'
                : 'bg-transparent border-fifa-border text-white/60 hover:border-fifa-gold/40 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Leader Card (featured top player) */}
      <LeaderCard player={players[0]} category={activeCategory} />

      {/* Leaderboard */}
      <div className="mt-8 space-y-3">
        {players.slice(1).map((player, i) => (
          <LeaderboardRow key={player.name} player={player} category={activeCategory} />
        ))}
      </div>
    </div>
  )
}

function LeaderCard({ player, category }) {
  const statKey = category === 'Golden Boot' ? 'goals' : category === 'Most Assists' ? 'assists' : 'rating'
  const statLabel = category === 'Golden Boot' ? 'Goals' : category === 'Most Assists' ? 'Assists' : 'Rating'

  return (
    <div className="relative bg-gradient-to-br from-fifa-gold/20 via-fifa-card to-fifa-card border-2 border-fifa-gold/60 rounded-3xl p-6 md:p-8 overflow-hidden animate-pulse-gold">
      <div className="absolute inset-0 bg-gradient-to-br from-fifa-gold/5 to-transparent pointer-events-none" />
      <div className="absolute top-4 right-4">
        <div className="bg-fifa-gold text-fifa-dark text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider">
          🏆 Leader
        </div>
      </div>

      <div className="flex items-center gap-6 flex-wrap">
        {/* Avatar */}
        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${player.color} flex items-center justify-center text-3xl font-black text-white shadow-2xl border-2 border-white/20 flex-shrink-0`}>
          {player.avatar}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap mb-1">
            <span className="text-2xl">{player.flag}</span>
            <h3 className="text-xl md:text-2xl font-black text-white">{player.name}</h3>
          </div>
          <p className="text-fifa-gold/80 text-sm font-semibold uppercase tracking-wider">{player.nation}</p>
        </div>

        {/* Stats */}
        <div className="flex gap-4 flex-wrap">
          <StatPill value={player.goals} label="Goals" highlight={category === 'Golden Boot'} />
          <StatPill value={player.assists} label="Assists" highlight={category === 'Most Assists'} />
          <StatPill value={player.rating} label="Rating" highlight={category === 'Best Rated'} />
          <StatPill value={player.matches} label="Played" />
        </div>
      </div>
    </div>
  )
}

function LeaderboardRow({ player, category }) {
  const statKey = category === 'Golden Boot' ? 'goals' : category === 'Most Assists' ? 'assists' : 'rating'

  return (
    <div className="flex items-center gap-4 bg-fifa-card border border-fifa-border rounded-2xl p-4 card-hover flex-wrap">
      {/* Rank */}
      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-black text-white/60 flex-shrink-0">
        {player.rank}
      </div>

      {/* Avatar */}
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${player.color} flex items-center justify-center text-sm font-black text-white flex-shrink-0`}>
        {player.avatar}
      </div>

      {/* Name & Nation */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span>{player.flag}</span>
          <span className="font-bold text-white text-sm truncate">{player.name}</span>
        </div>
        <div className="text-xs text-white/40 uppercase tracking-wider">{player.nation}</div>
      </div>

      {/* Stats */}
      <div className="flex gap-3 items-center">
        <MiniStat value={player.goals} label="G" highlight={category === 'Golden Boot'} />
        <MiniStat value={player.assists} label="A" highlight={category === 'Most Assists'} />
        <MiniStat value={player.rating} label="Rtg" highlight={category === 'Best Rated'} />
      </div>
    </div>
  )
}

function StatPill({ value, label, highlight }) {
  return (
    <div className={`text-center px-4 py-3 rounded-2xl ${highlight ? 'bg-fifa-gold/20 border border-fifa-gold/40' : 'bg-white/5 border border-white/10'}`}>
      <div className={`text-2xl font-black ${highlight ? 'text-fifa-gold' : 'text-white'}`}>{value}</div>
      <div className="text-[10px] text-white/50 uppercase tracking-wider">{label}</div>
    </div>
  )
}

function MiniStat({ value, label, highlight }) {
  return (
    <div className={`text-center px-3 py-1.5 rounded-xl ${highlight ? 'bg-fifa-gold/20' : 'bg-white/5'}`}>
      <span className={`text-sm font-black ${highlight ? 'text-fifa-gold' : 'text-white'}`}>{value}</span>
      <span className="text-[10px] text-white/40 ml-1">{label}</span>
    </div>
  )
}
