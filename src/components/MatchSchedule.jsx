import React, { useState } from 'react';
import { matches, groups } from '../data/matches';

const StatusBadge = ({ status }) => {
  if (status === 'live') return (
    <span className="live-badge text-xs">● LIVE</span>
  );
  if (status === 'completed') return (
    <span className="bg-green-900/60 text-green-400 text-xs font-bold px-3 py-1 rounded-full border border-green-600/30">
      FT
    </span>
  );
  return (
    <span className="bg-fifa-navy/60 text-fifa-gold/80 text-xs font-bold px-3 py-1 rounded-full border border-fifa-gold/20">
      UPCOMING
    </span>
  );
};

const PlayerWatch = ({ player }) => (
  <div className="flex items-center gap-3 bg-fifa-navyDark/60 rounded-xl p-3 border border-fifa-gold/10 hover:border-fifa-gold/30 transition-all">
    <div className="relative flex-shrink-0">
      <img
        src={player.image}
        alt={player.name}
        className="w-12 h-12 rounded-full object-cover border-2 border-fifa-gold/40"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
      <div className="w-12 h-12 rounded-full bg-fifa-navyLight border-2 border-fifa-gold/40 items-center justify-center text-2xl hidden">
        👤
      </div>
      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-fifa-navyDark rounded-full flex items-center justify-center text-xs border border-fifa-gold/30">
        {player.flag}
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-white font-bold text-sm leading-tight truncate">{player.name}</p>
      <p className="text-fifa-gold/70 text-xs">{player.position} · {player.stat}</p>
      <p className="text-white/50 text-xs mt-0.5 leading-tight">{player.description}</p>
    </div>
  </div>
);

const MatchCard = ({ match }) => {
  const [showPlayers, setShowPlayers] = useState(false);

  return (
    <div className="match-card fifa-card border border-fifa-gold/15 hover:border-fifa-gold/40">
      {/* Card header */}
      <div className="bg-fifa-navyDark/80 px-5 py-3 flex items-center justify-between border-b border-fifa-gold/10">
        <div className="flex items-center gap-2">
          <span className="text-fifa-gold/60 text-xs font-bold tracking-widest uppercase">{match.group}</span>
          <span className="text-white/20">·</span>
          <span className="text-white/50 text-xs">{match.date}</span>
        </div>
        <StatusBadge status={match.status} />
      </div>

      {/* Score / Matchup */}
      <div className="px-5 py-6">
        <div className="flex items-center justify-between gap-4">
          {/* Team A */}
          <div className="flex-1 flex flex-col items-center text-center gap-2">
            <span className="text-5xl">{match.teamA.flag}</span>
            <div>
              <p className="font-bebas text-xl text-white tracking-wider">{match.teamA.name}</p>
              <p className="text-white/40 text-xs font-bold">{match.teamA.code}</p>
            </div>
          </div>

          {/* Score / VS */}
          <div className="flex flex-col items-center gap-2">
            {match.status === 'completed' ? (
              <div className="text-center">
                <div className="flex items-center gap-3">
                  <span className="font-bebas text-5xl text-white">{match.scoreA}</span>
                  <span className="font-bebas text-2xl text-fifa-gold/40">—</span>
                  <span className="font-bebas text-5xl text-white">{match.scoreB}</span>
                </div>
                {match.manOfMatch && (
                  <p className="text-fifa-gold text-xs font-semibold mt-1">
                    🏅 {match.manOfMatch}
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center">
                <div className="bg-fifa-gold/10 border border-fifa-gold/30 rounded-xl px-4 py-3">
                  <p className="font-bebas text-2xl text-fifa-gold tracking-widest">VS</p>
                  <p className="text-white/70 text-sm font-bold">{match.timeEST}</p>
                  <p className="text-white/40 text-xs">EST</p>
                </div>
              </div>
            )}
          </div>

          {/* Team B */}
          <div className="flex-1 flex flex-col items-center text-center gap-2">
            <span className="text-5xl">{match.teamB.flag}</span>
            <div>
              <p className="font-bebas text-xl text-white tracking-wider">{match.teamB.name}</p>
              <p className="text-white/40 text-xs font-bold">{match.teamB.code}</p>
            </div>
          </div>
        </div>

        {/* Goals */}
        {match.status === 'completed' && match.goals && (
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {match.goals.map((goal, i) => (
              <span key={i} className="text-xs bg-green-900/30 text-green-400 border border-green-600/20 rounded-full px-2.5 py-1">
                ⚽ {goal.player} {goal.minute}'
              </span>
            ))}
          </div>
        )}

        {/* Venue */}
        <div className="mt-4 flex items-center justify-center gap-2 text-white/40 text-xs">
          <span>🏟️</span>
          <span>{match.venue}, {match.city}</span>
          <span>·</span>
          <span>{match.country}</span>
        </div>
      </div>

      {/* Players to watch toggle */}
      <div className="border-t border-fifa-gold/10 px-5 py-3">
        <button
          onClick={() => setShowPlayers(!showPlayers)}
          className="w-full flex items-center justify-between text-sm font-semibold text-fifa-gold/80 hover:text-fifa-gold transition-colors"
        >
          <span className="flex items-center gap-2">
            <span>👁️</span>
            <span>Players to Watch</span>
          </span>
          <span className={`transition-transform duration-300 ${showPlayers ? 'rotate-180' : ''}`}>▼</span>
        </button>

        {showPlayers && (
          <div className="mt-4 space-y-3 animate-fade-in">
            {match.playersToWatch.map((player, i) => (
              <PlayerWatch key={i} player={player} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const MatchSchedule = () => {
  const [activeGroup, setActiveGroup] = useState('All');
  const [activeStatus, setActiveStatus] = useState('All');

  const filtered = matches.filter(m => {
    const groupMatch = activeGroup === 'All' || m.group === activeGroup;
    const statusMatch = activeStatus === 'All' ||
      (activeStatus === 'Upcoming' && m.status === 'upcoming') ||
      (activeStatus === 'Completed' && m.status === 'completed') ||
      (activeStatus === 'Live' && m.status === 'live');
    return groupMatch && statusMatch;
  });

  return (
    <section id="schedule" className="py-24 bg-fifa-navyDark stadium-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="section-subtitle mb-3">FIFA World Cup 2026™</p>
          <h2 className="section-title">Match Schedule</h2>
          <div className="w-24 h-1 bg-gold-gradient mx-auto mt-4 rounded-full"></div>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            All match times shown in Eastern Standard Time (EST). Click any match to reveal players to watch.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          {/* Status filter */}
          <div className="flex items-center gap-2 bg-fifa-navy/50 rounded-xl p-1.5 border border-fifa-gold/20">
            {['All', 'Upcoming', 'Completed', 'Live'].map(s => (
              <button
                key={s}
                onClick={() => setActiveStatus(s)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all ${
                  activeStatus === s
                    ? 'bg-gold-gradient text-fifa-navyDark'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {s === 'Live' && <span className="mr-1 text-red-400">●</span>}
                {s}
              </button>
            ))}
          </div>

          {/* Group filter */}
          <div className="flex-1 flex flex-wrap gap-2">
            {groups.map(g => (
              <button
                key={g}
                onClick={() => setActiveGroup(g)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold tracking-wide transition-all border ${
                  activeGroup === g
                    ? 'bg-fifa-gold/20 border-fifa-gold text-fifa-gold'
                    : 'border-white/10 text-white/50 hover:text-white hover:border-white/30'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Match grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map(match => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/40">
            <span className="text-5xl block mb-4">⚽</span>
            <p className="text-lg">No matches found for this filter</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MatchSchedule;
