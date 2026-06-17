import React, { useState } from 'react';
import { matches, teamFlags } from '../data/matches';
import './MatchSchedule.css';

const stages = ['All', 'Group Stage', 'Round of 16', 'Quarter-Final', 'Semi-Final', 'Final'];
const groups = ['All', 'A', 'B', 'C', 'D', 'E', 'F'];

export default function MatchSchedule() {
  const [activeStage, setActiveStage] = useState('All');
  const [activeGroup, setActiveGroup] = useState('All');
  const [expandedMatch, setExpandedMatch] = useState(null);

  const filtered = matches.filter((m) => {
    const stageOk = activeStage === 'All' || m.stage === activeStage;
    const groupOk = activeGroup === 'All' || m.group === activeGroup;
    return stageOk && groupOk;
  });

  const toggleExpand = (id) => setExpandedMatch(expandedMatch === id ? null : id);

  return (
    <div className="schedule-section">
      <div className="section-wrapper">
        <div className="section-header">
          <div className="section-subtitle">FIFA World Cup 2026™</div>
          <h2 className="section-title">Match Schedule</h2>
          <p className="schedule-intro">All times shown in Eastern Standard Time (EST)</p>
        </div>

        <div className="schedule-filters">
          <div className="filter-group">
            <span className="filter-label">Stage:</span>
            <div className="filter-btns">
              {stages.map((s) => (
                <button
                  key={s}
                  className={`filter-btn ${activeStage === s ? 'filter-btn-active' : ''}`}
                  onClick={() => setActiveStage(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <span className="filter-label">Group:</span>
            <div className="filter-btns">
              {groups.map((g) => (
                <button
                  key={g}
                  className={`filter-btn ${activeGroup === g ? 'filter-btn-active' : ''}`}
                  onClick={() => setActiveGroup(g)}
                >
                  {g === 'All' ? 'All' : `Group ${g}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="matches-grid">
          {filtered.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              expanded={expandedMatch === match.id}
              onToggle={() => toggleExpand(match.id)}
            />
          ))}
          {filtered.length === 0 && (
            <div className="no-matches">
              <i className="fas fa-search" />
              <p>No matches found for selected filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MatchCard({ match, expanded, onToggle }) {
  const isCompleted = match.status === 'completed';
  const isLive = match.status === 'live';
  const isUpcoming = match.status === 'upcoming';

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };

  const eventIcons = { goal: '⚽', yellow: '🟨', red: '🟥', var: '📺' };

  return (
    <div className={`match-card ${expanded ? 'match-card-expanded' : ''} match-card-${match.status}`}>
      <div className="match-card-header">
        <div className="match-meta">
          <span className="badge badge-group">
            {match.group ? `Group ${match.group}` : match.stage}
          </span>
          {isLive && <span className="badge badge-live"><i className="fas fa-circle" style={{fontSize:'0.5rem', marginRight:'4px'}} />LIVE</span>}
          {isCompleted && <span className="badge badge-completed">FT</span>}
          {isUpcoming && <span className="badge badge-upcoming">Upcoming</span>}
        </div>
        <div className="match-datetime">
          <i className="fas fa-calendar-alt" />
          <span>{formatDate(match.date)}</span>
          <span className="match-time-divider">·</span>
          <i className="fas fa-clock" />
          <span>{match.time}</span>
        </div>
        <div className="match-venue">
          <i className="fas fa-map-marker-alt" />
          <span>{match.venue}</span>
        </div>
      </div>

      <div className="match-scoreboard">
        <div className="match-team match-team-home">
          <span className="team-flag">{teamFlags[match.homeTeam] || '🏳️'}</span>
          <span className="team-name">{match.homeTeam}</span>
        </div>

        <div className="match-score-center">
          {isCompleted || isLive ? (
            <div className="score-display">
              <span className="score-num">{match.homeScore}</span>
              <span className="score-sep">–</span>
              <span className="score-num">{match.awayScore}</span>
            </div>
          ) : (
            <div className="score-vs">VS</div>
          )}
          {isUpcoming && (
            <div className="kickoff-time">{match.time}</div>
          )}
        </div>

        <div className="match-team match-team-away">
          <span className="team-name">{match.awayTeam}</span>
          <span className="team-flag">{teamFlags[match.awayTeam] || '🏳️'}</span>
        </div>
      </div>

      {isCompleted && match.summary && (
        <button className="expand-btn" onClick={onToggle}>
          <span>{expanded ? 'Hide Summary' : 'Match Summary'}</span>
          <i className={`fas fa-chevron-${expanded ? 'up' : 'down'}`} />
        </button>
      )}

      {expanded && match.summary && (
        <div className="match-summary">
          <div className="summary-events">
            <h4 className="summary-title">Match Events</h4>
            <div className="events-list">
              {match.summary.events.map((event, idx) => (
                <div key={idx} className={`event-item event-${event.team === match.homeTeam ? 'home' : 'away'}`}>
                  <span className="event-time">{event.time}'</span>
                  <span className="event-icon">{eventIcons[event.type] || '•'}</span>
                  <span className="event-player">{event.player}</span>
                  <span className="event-team-flag">{teamFlags[event.team]}</span>
                </div>
              ))}
            </div>
          </div>

          {match.summary.motm && (
            <div className="summary-motm">
              <span className="motm-label">⭐ Man of the Match</span>
              <span className="motm-name">{match.summary.motm}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
