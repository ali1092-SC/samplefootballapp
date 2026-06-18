import React, { useState } from 'react'
import { Clock, User, Square, ChevronDown, ChevronUp, Award } from 'lucide-react'

const completedMatches = [
  {
    id: 1,
    date: 'Jun 14, 2026',
    group: 'Group D',
    home: { name: 'Netherlands', flag: '🇳🇱', score: 2, scorers: [
      { name: 'Gakpo', minute: 23 },
      { name: 'Dumfries', minute: 78 },
    ]},
    away: { name: 'Japan', flag: '🇯🇵', score: 1, scorers: [
      { name: 'Kubo', minute: 55 },
    ]},
    venue: 'BC Place, Vancouver',
    motm: { name: 'Cody Gakpo', flag: '🇳🇱', rating: 9.1 },
    events: [
      { minute: 23, type: 'goal', team: 'home', player: 'Gakpo', description: 'Clinical finish from inside the box' },
      { minute: 41, type: 'yellow', team: 'away', player: 'Endo', description: 'Reckless challenge' },
      { minute: 55, type: 'goal', team: 'away', player: 'Kubo', description: 'Stunning long-range effort' },
      { minute: 68, type: 'yellow', team: 'home', player: 'De Roon', description: 'Tactical foul' },
      { minute: 78, type: 'goal', team: 'home', player: 'Dumfries', description: 'Header from corner' },
      { minute: 85, type: 'red', team: 'away', player: 'Itakura', description: 'Second yellow card' },
    ],
    summary: 'Netherlands claimed a hard-fought victory over a resilient Japan side in Vancouver. Gakpo opened the scoring before Kubo equalized with a brilliant long-range strike. Dumfries sealed the win with a towering header from a corner in the 78th minute.',
  },
  {
    id: 2,
    date: 'Jun 14, 2026',
    group: 'Group D',
    home: { name: 'Canada', flag: '🇨🇦', score: 1, scorers: [
      { name: 'Davies', minute: 34 },
    ]},
    away: { name: 'Belgium', flag: '🇧🇪', score: 1, scorers: [
      { name: 'De Bruyne', minute: 67 },
    ]},
    venue: 'BMO Field, Toronto',
    motm: { name: 'Kevin De Bruyne', flag: '🇧🇪', rating: 9.3 },
    events: [
      { minute: 34, type: 'goal', team: 'home', player: 'Davies', description: 'Penalty kick converted' },
      { minute: 50, type: 'yellow', team: 'home', player: 'Hutchinson', description: 'Unsporting behavior' },
      { minute: 62, type: 'yellow', team: 'away', player: 'Tielemans', description: 'Late challenge' },
      { minute: 67, type: 'goal', team: 'away', player: 'De Bruyne', description: 'Inch-perfect free kick' },
    ],
    summary: 'A thrilling home debut for Canada at BMO Field ended in a dramatic draw. Alphonso Davies converted a penalty before Kevin De Bruyne rescued Belgium with an unstoppable free kick. Both teams showed tremendous quality in an entertaining Group D clash.',
  },
]

const eventIcons = {
  goal: { icon: '⚽', color: 'text-white', bg: 'bg-green-600/20 border-green-500/40' },
  yellow: { icon: '🟨', color: 'text-yellow-400', bg: 'bg-yellow-600/10 border-yellow-500/30' },
  red: { icon: '🟥', color: 'text-red-400', bg: 'bg-red-600/10 border-red-500/30' },
}

export default function MatchSummary() {
  const [expandedMatch, setExpandedMatch] = useState(null)

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-fifa-gold text-xs font-bold tracking-widest uppercase bg-fifa-gold/10 border border-fifa-gold/20 px-4 py-2 rounded-full mb-4">
          <Clock size={12} />
          Results
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-3">Match Summaries</h2>
        <p className="text-white/50 text-sm">Full time recaps with key events and stats</p>
      </div>

      <div className="space-y-6">
        {completedMatches.map((match) => (
          <MatchSummaryCard
            key={match.id}
            match={match}
            isExpanded={expandedMatch === match.id}
            onToggle={() => setExpandedMatch(expandedMatch === match.id ? null : match.id)}
          />
        ))}
      </div>
    </div>
  )
}

function MatchSummaryCard({ match, isExpanded, onToggle }) {
  return (
    <div className="bg-fifa-card border border-fifa-border rounded-3xl overflow-hidden card-hover">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-fifa-gold/80 bg-fifa-gold/10 px-2 py-0.5 rounded-full">
              {match.group}
            </span>
            <span className="text-xs text-white/40">{match.date}</span>
          </div>
          <span className="text-xs bg-green-600/20 text-green-400 border border-green-600/30 px-2 py-1 rounded-full font-semibold">
            Full Time
          </span>
        </div>

        {/* Scoreline */}
        <div className="flex items-center justify-between my-6">
          <div className="flex flex-col items-center gap-2 flex-1">
            <span className="text-4xl">{match.home.flag}</span>
            <span className="font-bold text-white text-sm">{match.home.name}</span>
            {match.home.scorers.map((s) => (
              <span key={s.name} className="text-xs text-white/40">⚽ {s.name} {s.minute}'</span>
            ))}
          </div>

          <div className="flex flex-col items-center px-6">
            <div className="text-5xl font-black text-white">
              {match.home.score}
              <span className="text-fifa-gold/50 mx-2">-</span>
              {match.away.score}
            </div>
            <div className="text-xs text-white/40 mt-1 uppercase tracking-widest">Full Time</div>
          </div>

          <div className="flex flex-col items-center gap-2 flex-1">
            <span className="text-4xl">{match.away.flag}</span>
            <span className="font-bold text-white text-sm">{match.away.name}</span>
            {match.away.scorers.map((s) => (
              <span key={s.name} className="text-xs text-white/40">⚽ {s.name} {s.minute}'</span>
            ))}
          </div>
        </div>

        {/* MOTM */}
        <div className="flex items-center gap-3 bg-fifa-gold/10 border border-fifa-gold/20 rounded-2xl p-3 mb-4">
          <Award size={16} className="text-fifa-gold flex-shrink-0" />
          <div>
            <div className="text-[10px] text-fifa-gold/60 uppercase tracking-widest">Man of the Match</div>
            <div className="text-sm font-bold text-white flex items-center gap-1">
              {match.motm.flag} {match.motm.name}
              <span className="ml-2 text-xs bg-fifa-gold/20 text-fifa-gold px-1.5 py-0.5 rounded-md">{match.motm.rating}</span>
            </div>
          </div>
        </div>

        {/* Summary text */}
        <p className="text-sm text-white/60 leading-relaxed">{match.summary}</p>

        {/* Expand button */}
        <button
          onClick={onToggle}
          className="mt-4 flex items-center gap-2 text-xs font-semibold text-fifa-gold hover:text-fifa-gold-light transition-colors"
        >
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {isExpanded ? 'Hide' : 'Show'} match timeline
        </button>
      </div>

      {/* Timeline */}
      {isExpanded && (
        <div className="border-t border-fifa-border px-6 py-5">
          <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Match Timeline</h4>
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-fifa-border" />

            <div className="space-y-3">
              {match.events.map((event, i) => {
                const config = eventIcons[event.type]
                const isHome = event.team === 'home'
                return (
                  <div key={i} className={`flex items-center gap-3 ${isHome ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`flex-1 flex ${isHome ? 'justify-end' : 'justify-start'}`}>
                      <div className={`bg-fifa-card/80 border rounded-xl px-3 py-2 max-w-[160px] ${isHome ? 'text-right' : 'text-left'}`} style={{ borderColor: 'rgba(42,42,106,0.8)' }}>
                        <div className="text-xs font-bold text-white">{event.player}</div>
                        <div className="text-[10px] text-white/40">{event.description}</div>
                      </div>
                    </div>
                    <div className="relative z-10 flex-shrink-0">
                      <div className={`w-10 h-10 rounded-full border flex items-center justify-center text-sm ${config.bg}`}>
                        {config.icon}
                      </div>
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-black text-white/60 whitespace-nowrap">
                        {event.minute}'
                      </div>
                    </div>
                    <div className="flex-1" />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
