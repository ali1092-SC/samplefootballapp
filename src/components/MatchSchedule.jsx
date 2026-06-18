import React, { useState } from 'react'
import { Clock, MapPin, Calendar, ChevronRight } from 'lucide-react'

const tabs = ['Group Stage', 'Round of 32', 'Knockouts']

const matches = {
  'Group Stage': [
    {
      id: 1, group: 'Group A', date: 'Jun 11, 2026', time: '5:00 PM EST',
      home: { name: 'Mexico', flag: '🇲🇽', code: 'MEX' },
      away: { name: 'Uruguay', flag: '🇺🇾', code: 'URU' },
      venue: 'Estadio Azteca, Mexico City', status: 'upcoming',
    },
    {
      id: 2, group: 'Group A', date: 'Jun 11, 2026', time: '8:00 PM EST',
      home: { name: 'USA', flag: '🇺🇸', code: 'USA' },
      away: { name: 'Serbia', flag: '🇷🇸', code: 'SRB' },
      venue: 'SoFi Stadium, Los Angeles', status: 'upcoming',
    },
    {
      id: 3, group: 'Group B', date: 'Jun 12, 2026', time: '12:00 PM EST',
      home: { name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', code: 'ENG' },
      away: { name: 'Argentina', flag: '🇦🇷', code: 'ARG' },
      venue: 'MetLife Stadium, New York', status: 'upcoming',
    },
    {
      id: 4, group: 'Group B', date: 'Jun 12, 2026', time: '3:00 PM EST',
      home: { name: 'France', flag: '🇫🇷', code: 'FRA' },
      away: { name: 'Brazil', flag: '🇧🇷', code: 'BRA' },
      venue: 'AT&T Stadium, Dallas', status: 'live',
    },
    {
      id: 5, group: 'Group C', date: 'Jun 13, 2026', time: '6:00 PM EST',
      home: { name: 'Germany', flag: '🇩🇪', code: 'GER' },
      away: { name: 'Spain', flag: '🇪🇸', code: 'ESP' },
      venue: 'Gillette Stadium, Boston', status: 'upcoming',
    },
    {
      id: 6, group: 'Group C', date: 'Jun 13, 2026', time: '9:00 PM EST',
      home: { name: 'Portugal', flag: '🇵🇹', code: 'POR' },
      away: { name: 'Morocco', flag: '🇲🇦', code: 'MAR' },
      venue: 'Levi\'s Stadium, San Francisco', status: 'upcoming',
    },
    {
      id: 7, group: 'Group D', date: 'Jun 14, 2026', time: '2:00 PM EST',
      home: { name: 'Netherlands', flag: '🇳🇱', code: 'NED' },
      away: { name: 'Japan', flag: '🇯🇵', code: 'JPN' },
      venue: 'BC Place, Vancouver', status: 'completed', score: '2-1',
    },
    {
      id: 8, group: 'Group D', date: 'Jun 14, 2026', time: '5:00 PM EST',
      home: { name: 'Canada', flag: '🇨🇦', code: 'CAN' },
      away: { name: 'Belgium', flag: '🇧🇪', code: 'BEL' },
      venue: 'BMO Field, Toronto', status: 'completed', score: '1-1',
    },
  ],
  'Round of 32': [
    {
      id: 9, group: 'R32', date: 'Jun 28, 2026', time: '3:00 PM EST',
      home: { name: 'Brazil', flag: '🇧🇷', code: 'BRA' },
      away: { name: 'USA', flag: '🇺🇸', code: 'USA' },
      venue: 'MetLife Stadium, New York', status: 'upcoming',
    },
    {
      id: 10, group: 'R32', date: 'Jun 28, 2026', time: '6:00 PM EST',
      home: { name: 'France', flag: '🇫🇷', code: 'FRA' },
      away: { name: 'Mexico', flag: '🇲🇽', code: 'MEX' },
      venue: 'AT&T Stadium, Dallas', status: 'upcoming',
    },
    {
      id: 11, group: 'R32', date: 'Jun 29, 2026', time: '12:00 PM EST',
      home: { name: 'Germany', flag: '🇩🇪', code: 'GER' },
      away: { name: 'Argentina', flag: '🇦🇷', code: 'ARG' },
      venue: 'Estadio Azteca, Mexico City', status: 'upcoming',
    },
    {
      id: 12, group: 'R32', date: 'Jun 29, 2026', time: '9:00 PM EST',
      home: { name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', code: 'ENG' },
      away: { name: 'Portugal', flag: '🇵🇹', code: 'POR' },
      venue: 'SoFi Stadium, Los Angeles', status: 'upcoming',
    },
  ],
  'Knockouts': [
    {
      id: 13, group: 'QF', date: 'Jul 6, 2026', time: '3:00 PM EST',
      home: { name: 'TBD', flag: '🏳', code: 'TBD' },
      away: { name: 'TBD', flag: '🏳', code: 'TBD' },
      venue: 'AT&T Stadium, Dallas', status: 'upcoming',
    },
    {
      id: 14, group: 'QF', date: 'Jul 7, 2026', time: '3:00 PM EST',
      home: { name: 'TBD', flag: '🏳', code: 'TBD' },
      away: { name: 'TBD', flag: '🏳', code: 'TBD' },
      venue: 'MetLife Stadium, New York', status: 'upcoming',
    },
    {
      id: 15, group: 'SF', date: 'Jul 14, 2026', time: '7:00 PM EST',
      home: { name: 'TBD', flag: '🏳', code: 'TBD' },
      away: { name: 'TBD', flag: '🏳', code: 'TBD' },
      venue: 'Rose Bowl, Los Angeles', status: 'upcoming',
    },
    {
      id: 16, group: 'FINAL', date: 'Jul 19, 2026', time: '4:00 PM EST',
      home: { name: 'TBD', flag: '🏳', code: 'TBD' },
      away: { name: 'TBD', flag: '🏳', code: 'TBD' },
      venue: 'MetLife Stadium, New York', status: 'upcoming',
    },
  ],
}

const statusConfig = {
  live: { label: '🔴 LIVE', className: 'bg-red-600/20 text-red-400 border-red-600/40 status-live' },
  upcoming: { label: 'Upcoming', className: 'bg-blue-600/20 text-blue-400 border-blue-600/40' },
  completed: { label: 'Full Time', className: 'bg-green-600/20 text-green-400 border-green-600/40' },
}

export default function MatchSchedule() {
  const [activeTab, setActiveTab] = useState('Group Stage')

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <SectionHeader
        label="Tournament Schedule"
        title="Fixtures & Results"
        subtitle="All match dates in Eastern Standard Time (EST)"
      />

      {/* Tabs */}
      <div className="flex gap-2 mb-8 bg-fifa-card/50 p-1.5 rounded-2xl border border-fifa-border w-fit mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeTab === tab
                ? 'tab-active'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Match Cards Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {matches[activeTab].map((match, i) => (
          <MatchCard key={match.id} match={match} delay={i * 0.1} />
        ))}
      </div>
    </div>
  )
}

function MatchCard({ match, delay }) {
  const status = statusConfig[match.status]
  const isLive = match.status === 'live'

  return (
    <div
      className={`relative bg-fifa-card border border-fifa-border rounded-2xl p-5 card-hover overflow-hidden ${
        isLive ? 'border-fifa-red/50 shadow-lg shadow-red-900/20' : ''
      }`}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      {isLive && <div className="absolute inset-0 shimmer-effect pointer-events-none" />}

      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-xs font-bold text-fifa-gold/80 bg-fifa-gold/10 px-2 py-0.5 rounded-full">
            {match.group}
          </span>
        </div>
        <span className={`text-xs font-semibold border px-2.5 py-1 rounded-full ${status.className}`}>
          {status.label}
        </span>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col items-center gap-1 flex-1">
          <span className="text-4xl">{match.home.flag}</span>
          <span className="text-xs font-bold text-white/90">{match.home.code}</span>
          <span className="text-[10px] text-white/50">{match.home.name}</span>
        </div>

        <div className="flex flex-col items-center px-4">
          {match.score ? (
            <div className="text-2xl font-black text-white">{match.score}</div>
          ) : (
            <div className="text-lg font-black text-fifa-gold/60">VS</div>
          )}
          <div className="mt-1 text-[10px] font-semibold text-fifa-gold/80 tracking-wider uppercase">
            {match.status === 'completed' ? 'FT' : match.time}
          </div>
        </div>

        <div className="flex flex-col items-center gap-1 flex-1">
          <span className="text-4xl">{match.away.flag}</span>
          <span className="text-xs font-bold text-white/90">{match.away.code}</span>
          <span className="text-[10px] text-white/50">{match.away.name}</span>
        </div>
      </div>

      {/* Meta info */}
      <div className="border-t border-fifa-border/50 pt-3 flex flex-col gap-1">
        <div className="flex items-center gap-2 text-xs text-white/40">
          <Calendar size={11} />
          <span>{match.date}</span>
          <span className="mx-1">·</span>
          <Clock size={11} />
          <span>{match.time} EST</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/40">
          <MapPin size={11} />
          <span>{match.venue}</span>
        </div>
      </div>
    </div>
  )
}

function SectionHeader({ label, title, subtitle }) {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-2 text-fifa-gold text-xs font-bold tracking-widest uppercase bg-fifa-gold/10 border border-fifa-gold/20 px-4 py-2 rounded-full mb-4">
        <Trophy size={12} />
        {label}
      </div>
      <h2 className="text-4xl md:text-5xl font-black text-white mb-3">{title}</h2>
      {subtitle && <p className="text-white/50 text-sm">{subtitle}</p>}
    </div>
  )
}

function Trophy({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}
