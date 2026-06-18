import React, { useState } from 'react';
import { matchSummaries } from '../data/matchSummaries';

const EventIcon = ({ type }) => {
  const icons = {
    goal: { icon: '⚽', color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/30' },
    yellow: { icon: '🟨', color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/30' },
    red: { icon: '🟥', color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/30' },
    substitution: { icon: '🔄', color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/30' },
    fulltime: { icon: '🏁', color: 'text-fifa-gold', bg: 'bg-fifa-gold/10 border-fifa-gold/30' },
  };
  const config = icons[type] || icons.goal;
  return (
    <div className={`w-9 h-9 rounded-full flex items-center justify-center border text-sm ${config.bg} flex-shrink-0`}>
      {config.icon}
    </div>
  );
};

const StatBar = ({ label, homeVal, awayVal, homeTeam, awayTeam }) => {
  const total = homeVal + awayVal;
  const homePct = total === 0 ? 50 : (homeVal / total) * 100;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="font-bold text-white">{homeVal}</span>
        <span className="text-white/50 text-xs uppercase tracking-wider">{label}</span>
        <span className="font-bold text-white">{awayVal}</span>
      </div>
      <div className="flex h-1.5 rounded-full overflow-hidden gap-0.5">
        <div className="bg-fifa-gold rounded-full transition-all duration-1000" style={{ width: `${homePct}%` }}></div>
        <div className="bg-white/30 rounded-full transition-all duration-1000" style={{ width: `${100 - homePct}%` }}></div>
      </div>
    </div>
  );
};

const SummaryCard = ({ summary }) => {
  const [activeTab, setActiveTab] = useState('summary');

  return (
    <div className="fifa-card border border-fifa-gold/20 overflow-hidden">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-fifa-navyDark via-fifa-navy to-fifa-navyDark p-6 border-b border-fifa-gold/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-fifa-gold/60 tracking-widest uppercase">{summary.date}</span>
          <span className="bg-green-900/60 text-green-400 text-xs font-bold px-3 py-1 rounded-full border border-green-600/30">FULL TIME</span>
        </div>

        {/* Score */}
        <div className="flex items-center justify-between gap-4 py-4">
          <div className="flex-1 text-center">
            <div className="text-5xl mb-2">{summary.teamA.flag}</div>
            <p className="font-bebas text-2xl text-white tracking-wider">{summary.teamA.name}</p>
          </div>
          <div className="text-center px-4">
            <div className="font-bebas text-6xl text-white flex items-center gap-3">
              <span>{summary.teamA.score}</span>
              <span className="text-fifa-gold/30 text-3xl">–</span>
              <span>{summary.teamB.score}</span>
            </div>
            <p className="text-white/40 text-xs mt-1">🏟️ {summary.venue}</p>
            <p className="text-white/30 text-xs">👥 {summary.attendance}</p>
          </div>
          <div className="flex-1 text-center">
            <div className="text-5xl mb-2">{summary.teamB.flag}</div>
            <p className="font-bebas text-2xl text-white tracking-wider">{summary.teamB.name}</p>
          </div>
        </div>

        {/* Man of match */}
        <div className="bg-fifa-gold/10 border border-fifa-gold/30 rounded-xl p-3 flex items-center justify-center gap-3">
          <span className="text-2xl">🏅</span>
          <div className="text-center">
            <p className="text-fifa-gold/60 text-xs font-semibold tracking-widest uppercase">Man of the Match</p>
            <p className="text-white font-bold">{summary.manOfMatch.flag} {summary.manOfMatch.name} · {summary.manOfMatch.team}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-fifa-gold/10">
        {['summary', 'timeline', 'stats'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-semibold tracking-wider uppercase transition-all ${
              activeTab === tab
                ? 'text-fifa-gold border-b-2 border-fifa-gold bg-fifa-gold/5'
                : 'text-white/40 hover:text-white/60'
            }`}
          >
            {tab === 'summary' ? '📝 Report' : tab === 'timeline' ? '⏱️ Timeline' : '📊 Stats'}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-6">
        {activeTab === 'summary' && (
          <div>
            <h3 className="font-bebas text-2xl text-fifa-gold tracking-wider mb-4">{summary.headline}</h3>
            <p className="text-white/70 leading-relaxed text-sm">{summary.summary}</p>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-4">
            {summary.timeline.map((event, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="text-right w-10 flex-shrink-0 pt-2">
                  {event.minute && (
                    <span className="text-fifa-gold/60 text-xs font-bold">{event.minute}'</span>
                  )}
                </div>
                <div className="flex items-center gap-1 pt-1">
                  <div className="w-px h-6 bg-fifa-gold/20"></div>
                  <div className="w-2 h-2 rounded-full bg-fifa-gold/40 flex-shrink-0"></div>
                  <div className="w-px h-6 bg-fifa-gold/20"></div>
                </div>
                <div className="flex-1 flex items-start gap-3 pb-2">
                  <EventIcon type={event.type} />
                  <div>
                    {event.player && (
                      <p className="text-white font-semibold text-sm">
                        {event.flag} {event.player}
                        {event.team && <span className="text-white/40 ml-1 text-xs">({event.team})</span>}
                      </p>
                    )}
                    <p className="text-white/50 text-xs mt-0.5">{event.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-4">
            <div className="flex justify-between text-xs text-white/40 mb-2">
              <span className="font-bold text-white/60">{summary.teamA.name}</span>
              <span></span>
              <span className="font-bold text-white/60">{summary.teamB.name}</span>
            </div>
            {[
              { label: 'Possession %', homeVal: summary.stats.possession[Object.keys(summary.stats.possession)[0]], awayVal: summary.stats.possession[Object.keys(summary.stats.possession)[1]] },
              { label: 'Shots', homeVal: summary.stats.shots[Object.keys(summary.stats.shots)[0]], awayVal: summary.stats.shots[Object.keys(summary.stats.shots)[1]] },
              { label: 'Shots on Target', homeVal: summary.stats.shotsOnTarget[Object.keys(summary.stats.shotsOnTarget)[0]], awayVal: summary.stats.shotsOnTarget[Object.keys(summary.stats.shotsOnTarget)[1]] },
              { label: 'Corners', homeVal: summary.stats.corners[Object.keys(summary.stats.corners)[0]], awayVal: summary.stats.corners[Object.keys(summary.stats.corners)[1]] },
              { label: 'Fouls', homeVal: summary.stats.fouls[Object.keys(summary.stats.fouls)[0]], awayVal: summary.stats.fouls[Object.keys(summary.stats.fouls)[1]] },
              { label: 'Passes', homeVal: summary.stats.passes[Object.keys(summary.stats.passes)[0]], awayVal: summary.stats.passes[Object.keys(summary.stats.passes)[1]] },
            ].map((stat) => (
              <StatBar key={stat.label} {...stat} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const MatchSummary = () => {
  return (
    <section id="summaries" className="py-24 bg-fifa-navyDark relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fifa-gold/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="section-subtitle mb-3">Match Reports</p>
          <h2 className="section-title">Match Summaries</h2>
          <div className="w-24 h-1 bg-gold-gradient mx-auto mt-4 rounded-full"></div>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Full match reports with goal timelines, key events, man of the match awards, and detailed match statistics.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {matchSummaries.map((summary) => (
            <SummaryCard key={summary.id} summary={summary} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MatchSummary;
