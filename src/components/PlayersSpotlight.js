import React, { useState } from 'react';
import { featuredPlayers } from '../data/players';
import { matches } from '../data/matches';
import './PlayersSpotlight.css';

export default function PlayersSpotlight() {
  const [selectedMatch, setSelectedMatch] = useState('all');
  const [imgErrors, setImgErrors] = useState({});

  const completedMatches = matches.filter((m) => m.status === 'completed');

  const filteredPlayers =
    selectedMatch === 'all'
      ? featuredPlayers
      : featuredPlayers.filter((p) => p.matchId === parseInt(selectedMatch));

  const getMatchLabel = (matchId) => {
    const m = matches.find((x) => x.id === matchId);
    return m ? `${m.homeTeam} vs ${m.awayTeam}` : '';
  };

  const handleImgError = (id) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  const getRatingColor = (rating) => {
    if (rating >= 9) return '#00a651';
    if (rating >= 8) return '#c9a84c';
    return '#c8102e';
  };

  return (
    <div className="players-section">
      <div className="section-wrapper">
        <div className="section-header">
          <div className="section-subtitle">Stars of the Tournament</div>
          <h2 className="section-title">Players to Watch</h2>
        </div>

        <div className="players-filter-bar">
          <button
            className={`players-filter-btn ${selectedMatch === 'all' ? 'players-filter-active' : ''}`}
            onClick={() => setSelectedMatch('all')}
          >
            All Players
          </button>
          {completedMatches.map((m) => (
            <button
              key={m.id}
              className={`players-filter-btn ${selectedMatch === String(m.id) ? 'players-filter-active' : ''}`}
              onClick={() => setSelectedMatch(String(m.id))}
            >
              {m.homeTeam} vs {m.awayTeam}
            </button>
          ))}
        </div>

        <div className="players-grid">
          {filteredPlayers.map((player, idx) => (
            <div
              key={player.id}
              className="player-card"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <div className="player-card-bg" />

              <div className="player-jersey">#{player.jersey}</div>

              <div className="player-photo-wrapper">
                {!imgErrors[player.id] ? (
                  <img
                    src={player.photo}
                    alt={player.name}
                    className="player-photo"
                    onError={() => handleImgError(player.id)}
                  />
                ) : (
                  <div className="player-photo-fallback">
                    <i className="fas fa-user" />
                  </div>
                )}
                <div className="player-flag-badge">{player.flag}</div>
              </div>

              <div className="player-info">
                <div className="player-position-tag">{player.position}</div>
                <h3 className="player-name">{player.name}</h3>
                <div className="player-country">{player.flag} {player.country}</div>
                <div className="player-club">
                  <i className="fas fa-shield-alt" />
                  {player.club}
                </div>
                <div className="player-match-context">
                  <i className="fas fa-futbol" />
                  {getMatchLabel(player.matchId)}
                </div>

                <div className="player-stats">
                  <div className="stat-item">
                    <span className="stat-val">⚽ {player.stats.goals}</span>
                    <span className="stat-key">Goals</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-val">🅰️ {player.stats.assists}</span>
                    <span className="stat-key">Assists</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-val" style={{ color: getRatingColor(player.stats.rating) }}>
                      {player.stats.rating}
                    </span>
                    <span className="stat-key">Rating</span>
                  </div>
                </div>

                <p className="player-description">{player.description}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredPlayers.length === 0 && (
          <div className="no-players">
            <i className="fas fa-user-slash" />
            <p>No featured players for this match yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
