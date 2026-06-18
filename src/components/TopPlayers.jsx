import React, { useState } from 'react';
import { topPlayers } from '../data/topPlayers';

const MedalIcon = ({ badge }) => {
  if (badge === 'gold') return <span className="text-2xl">🥇</span>;
  if (badge === 'silver') return <span className="text-2xl">🥈</span>;
  if (badge === 'bronze') return <span className="text-2xl">🥉</span>;
  return (
    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
      <span className="text-white/60 text-xs font-bold">{}</span>
    </div>
  );
};

const RatingBar = ({ value, max = 10 }) => (
  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
    <div
      className="h-full bg-gold-gradient rounded-full transition-all duration-1000"
      style={{ width: `${(value / max) * 100}%` }}
    ></div>
  </div>
);

const PlayerCard = ({ player, featured }) => {
  const [hovered, setHovered] = useState(false);

  const borderColor = player.badge === 'gold'
    ? 'border-fifa-gold'
    : player.badge === 'silver'
    ? 'border-gray-400'
    : player.badge === 'bronze'
    ? 'border-amber-700'
    : 'border-fifa-gold/15';

  const glowClass = player.badge === 'gold'
    ? 'hover:shadow-2xl hover:shadow-fifa-gold/25'
    : '';

  return (
    <div
      className={`relative rounded-2xl overflow-hidden border ${borderColor} ${glowClass} transition-all duration-300 ${hovered ? '-translate-y-2' : ''} bg-gradient-to-b from-fifa-navyLight/80 to-fifa-navyDark cursor-pointer`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Rank badge */}
      <div className="absolute top-3 left-3 z-10">
        <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold ${
          player.badge === 'gold' ? 'bg-fifa-gold text-fifa-navyDark' :
          player.badge === 'silver' ? 'bg-gray-400 text-gray-900' :
          player.badge === 'bronze' ? 'bg-amber-700 text-white' :
          'bg-white/10 text-white/60'
        }`}>
          <MedalIcon badge={player.badge} />
          <span>#{player.rank}</span>
        </div>
      </div>

      {/* Award badge */}
      {player.award && (
        <div className="absolute top-3 right-3 z-10">
          <span className="text-xs bg-black/50 text-white/80 rounded-full px-2 py-1 backdrop-blur-sm">
            {player.award}
          </span>
        </div>
      )}

      {/* Player image */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-fifa-navyDark z-10"></div>
        <img
          src={player.image}
          alt={player.name}
          className="w-full h-full object-cover object-top transition-transform duration-500"
          style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.style.background = 'linear-gradient(180deg, #001A5C, #000D2E)';
          }}
        />
        {/* Gold shimmer overlay for top 3 */}
        {player.badge && (
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-fifa-gold/5 z-10"></div>
        )}
      </div>

      {/* Player info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bebas text-2xl text-white tracking-wider leading-tight">{player.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg">{player.flag}</span>
              <span className="text-white/60 text-sm">{player.team}</span>
              <span className="text-white/20">·</span>
              <span className="text-fifa-gold/70 text-xs font-semibold bg-fifa-gold/10 px-2 py-0.5 rounded-full">{player.position}</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white/5 rounded-xl p-2.5 text-center">
            <p className="font-bebas text-2xl text-fifa-gold">{player.goals}</p>
            <p className="text-white/40 text-xs uppercase tracking-wide">Goals</p>
          </div>
          <div className="bg-white/5 rounded-xl p-2.5 text-center">
            <p className="font-bebas text-2xl text-white">{player.assists}</p>
            <p className="text-white/40 text-xs uppercase tracking-wide">Assists</p>
          </div>
          <div className="bg-white/5 rounded-xl p-2.5 text-center">
            <p className="font-bebas text-2xl text-green-400">{player.rating}</p>
            <p className="text-white/40 text-xs uppercase tracking-wide">Rating</p>
          </div>
        </div>

        {/* Rating bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-white/40">
            <span>Performance Rating</span>
            <span className="text-fifa-gold font-bold">{player.rating}/10</span>
          </div>
          <RatingBar value={player.rating} />
        </div>

        {/* Matches played */}
        <p className="text-white/30 text-xs mt-3 text-center">
          {player.matches} match{player.matches !== 1 ? 'es' : ''} played · {player.minutesPlayed} mins
        </p>
      </div>
    </div>
  );
};

const TopPlayers = () => {
  const [sortBy, setSortBy] = useState('rating');

  const sorted = [...topPlayers].sort((a, b) => {
    if (sortBy === 'goals') return b.goals - a.goals;
    if (sortBy === 'assists') return b.assists - a.assists;
    return b.rating - a.rating;
  });

  return (
    <section id="top-players" className="py-24 bg-gradient-to-b from-fifa-navyDark via-fifa-navy to-fifa-navyDark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fifa-gold/50 to-transparent"></div>
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.6) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="section-subtitle mb-3">Tournament Leaderboard</p>
          <h2 className="section-title">Top Players</h2>
          <div className="w-24 h-1 bg-gold-gradient mx-auto mt-4 rounded-full"></div>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            The stars lighting up the FIFA World Cup 2026™ — ranked by performance rating across all matches played.
          </p>
        </div>

        {/* Sort controls */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-1 bg-fifa-navyDark/80 rounded-xl p-1.5 border border-fifa-gold/20">
            {[
              { key: 'rating', label: '⭐ Rating' },
              { key: 'goals', label: '⚽ Goals' },
              { key: 'assists', label: '🎯 Assists' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSortBy(key)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  sortBy === key
                    ? 'bg-gold-gradient text-fifa-navyDark'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Podium spotlight for top 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {sorted.slice(0, 3).map((player) => (
            <PlayerCard key={player.id} player={player} featured={player.rank === 1} />
          ))}
        </div>

        {/* Remaining players */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {sorted.slice(3).map((player) => (
            <div key={player.id} className="fifa-card p-4 flex flex-col items-center text-center gap-2">
              <div className="relative">
                <img
                  src={player.image}
                  alt={player.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-fifa-gold/30"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/64'; }}
                />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-fifa-navyDark border border-fifa-gold/40 rounded-full flex items-center justify-center text-xs font-bold text-fifa-gold">
                  {player.rank}
                </div>
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-tight">{player.name}</p>
                <p className="text-white/40 text-xs">{player.flag} {player.team}</p>
              </div>
              <div className="flex gap-3 text-center">
                <div>
                  <p className="font-bebas text-lg text-fifa-gold">{player.goals}</p>
                  <p className="text-white/30 text-xs">G</p>
                </div>
                <div>
                  <p className="font-bebas text-lg text-white">{player.assists}</p>
                  <p className="text-white/30 text-xs">A</p>
                </div>
                <div>
                  <p className="font-bebas text-lg text-green-400">{player.rating}</p>
                  <p className="text-white/30 text-xs">RTG</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopPlayers;
