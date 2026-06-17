import React, { useState } from 'react';
import { playersToWatch } from '../data/playersData';
import './PlayersToWatch.css';

const PlayerAvatar = ({ color, initials, size = 'lg' }) => (
  <div
    className={`player-avatar player-avatar--${size}`}
    style={{ background: `linear-gradient(135deg, ${color}CC, ${color}55)` }}
  >
    <span>{initials}</span>
    <div className="player-avatar__shine" />
  </div>
);

const PlayerCard = ({ player }) => (
  <div className="pw-card" style={{ '--player-color': player.photoColor }}>
    <div className="pw-card__glow" />
    <div className="pw-card__header">
      <PlayerAvatar color={player.photoColor} initials={player.photoInitials} />
      <div className="pw-card__header-info">
        <div className="pw-card__number">#{player.jerseyNumber}</div>
        <h3 className="pw-card__name">{player.name}</h3>
        <div className="pw-card__meta">
          <span className="pw-card__flag">{player.flag}</span>
          <span className="pw-card__country">{player.country}</span>
          <span className="pw-card__sep">·</span>
          <span className="pw-card__club">{player.club}</span>
        </div>
        <div className="pw-card__position">
          <span>{player.position}</span>
        </div>
      </div>
    </div>
    <div className="pw-card__note">
      <div className="pw-card__note-label">⚡ Scout Report</div>
      <p>{player.scoutNote}</p>
    </div>
    <div className="pw-card__footer">
      <div className="pw-card__stat">
        <span className="pw-card__stat-num">—</span>
        <span className="pw-card__stat-label">Goals</span>
      </div>
      <div className="pw-card__stat">
        <span className="pw-card__stat-num">—</span>
        <span className="pw-card__stat-label">Assists</span>
      </div>
      <div className="pw-card__stat">
        <span className="pw-card__stat-num">TBD</span>
        <span className="pw-card__stat-label">Rating</span>
      </div>
    </div>
  </div>
);

const PlayersToWatch = () => {
  const [activeMatch, setActiveMatch] = useState('all');

  const matchFilters = [
    { id: 'all', label: 'All Matches' },
    { id: 1, label: '🇺🇸 USA vs Mexico 🇲🇽' },
    { id: 2, label: '🇨🇦 Canada vs Argentina 🇦🇷' },
    { id: 5, label: '🇧🇷 Brazil vs Germany 🇩🇪' },
    { id: 6, label: '🇫🇷 France vs Portugal 🇵🇹' },
  ];

  const filtered = activeMatch === 'all'
    ? playersToWatch
    : playersToWatch.filter(p => p.matchId === activeMatch);

  return (
    <section id="players-watch" className="pw light-section">
      <div className="container">
        <div className="section-header">
          <p className="section-subtitle" style={{ color: 'var(--fifa-gray)' }}>Key Matchups</p>
          <h2 className="section-title" style={{ color: 'var(--fifa-navy)' }}>
            Players to <span>Watch</span>
          </h2>
          <div className="section-divider" />
          <p className="pw__desc">
            The stars who could define this tournament — scout their style before they take the stage
          </p>
        </div>

        <div className="pw__filters">
          {matchFilters.map(f => (
            <button
              key={f.id}
              className={`pw__filter-btn${activeMatch === f.id ? ' active' : ''}`}
              onClick={() => setActiveMatch(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="pw__grid">
          {filtered.map(p => <PlayerCard key={p.id} player={p} />)}
        </div>
      </div>
    </section>
  );
};

export default PlayersToWatch;
