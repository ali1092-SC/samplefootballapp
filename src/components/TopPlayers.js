import React, { useState } from 'react';
import { topScorers } from '../data/players';
import './TopPlayers.css';

const categories = [
  { key: 'goals', label: 'Top Scorers', icon: '⚽' },
  { key: 'assists', label: 'Top Assists', icon: '🅰️' },
  { key: 'rating', label: 'Best Rated', icon: '⭐' },
];

export default function TopPlayers() {
  const [activeCategory, setActiveCategory] = useState('goals');
  const [imgErrors, setImgErrors] = useState({});

  const sorted = [...topScorers].sort((a, b) => b[activeCategory] - a[activeCategory]);

  const handleImgError = (name) => {
    setImgErrors((prev) => ({ ...prev, [name]: true }));
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return { emoji: '🥇', class: 'rank-gold' };
    if (rank === 2) return { emoji: '🥈', class: 'rank-silver' };
    if (rank === 3) return { emoji: '🥉', class: 'rank-bronze' };
    return { emoji: String(rank), class: 'rank-default' };
  };

  const getBarWidth = (val, max) => `${(val / max) * 100}%`;

  const maxVal = Math.max(...sorted.map((p) => p[activeCategory]));

  return (
    <div className="top-players-section">
      <div className="section-wrapper">
        <div className="section-header">
          <div className="section-subtitle">FIFA World Cup 2026™</div>
          <h2 className="section-title">Tournament Leaders</h2>
        </div>

        <div className="leaderboard-container">
          <div className="leaderboard-nav">
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`leaderboard-nav-btn ${activeCategory === cat.key ? 'leaderboard-nav-active' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                <span className="leaderboard-nav-icon">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="leaderboard-table">
            <div className="leaderboard-header">
              <span className="lb-col lb-rank">Rank</span>
              <span className="lb-col lb-player">Player</span>
              <span className="lb-col lb-country">Country</span>
              <span className="lb-col lb-stat">
                {categories.find((c) => c.key === activeCategory)?.icon}{' '}
                {categories.find((c) => c.key === activeCategory)?.label.split(' ')[1]}
              </span>
              <span className="lb-col lb-bar">Performance</span>
            </div>

            {sorted.map((player, idx) => {
              const rankBadge = getRankBadge(idx + 1);
              return (
                <div
                  key={player.name}
                  className={`leaderboard-row ${idx < 3 ? 'top-three' : ''}`}
                  style={{ animationDelay: `${idx * 0.07}s` }}
                >
                  <div className={`lb-col lb-rank ${rankBadge.class}`}>
                    <span className="rank-badge">{rankBadge.emoji}</span>
                  </div>

                  <div className="lb-col lb-player">
                    <div className="lb-player-avatar">
                      {!imgErrors[player.name] ? (
                        <img
                          src={player.photo}
                          alt={player.name}
                          onError={() => handleImgError(player.name)}
                        />
                      ) : (
                        <div className="lb-avatar-fallback">
                          <i className="fas fa-user" />
                        </div>
                      )}
                    </div>
                    <span className="lb-player-name">{player.name}</span>
                  </div>

                  <div className="lb-col lb-country">
                    <span className="lb-flag">{player.flag}</span>
                    <span className="lb-country-name">{player.country}</span>
                  </div>

                  <div className="lb-col lb-stat">
                    <span className="lb-stat-value">{player[activeCategory]}</span>
                  </div>

                  <div className="lb-col lb-bar">
                    <div className="progress-bar-track">
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: getBarWidth(player[activeCategory], maxVal),
                          animationDelay: `${idx * 0.07 + 0.3}s`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Podium section for top 3 */}
        <div className="podium-section">
          <h3 className="podium-title">🏆 Top 3 — {categories.find((c) => c.key === activeCategory)?.label}</h3>
          <div className="podium">
            {[sorted[1], sorted[0], sorted[2]].map((player, idx) => {
              const positions = [2, 1, 3];
              const pos = positions[idx];
              const heights = ['140px', '180px', '110px'];
              return (
                <div key={player.name} className={`podium-place podium-place-${pos}`}>
                  <div className="podium-player">
                    <div className="podium-photo-wrapper">
                      {!imgErrors[player.name] ? (
                        <img
                          src={player.photo}
                          alt={player.name}
                          className="podium-photo"
                          onError={() => handleImgError(player.name)}
                        />
                      ) : (
                        <div className="podium-photo-fallback">
                          <i className="fas fa-user" />
                        </div>
                      )}
                      <span className="podium-flag">{player.flag}</span>
                    </div>
                    <div className="podium-name">{player.name.split(' ').pop()}</div>
                    <div className="podium-value">{player[activeCategory]}</div>
                  </div>
                  <div className="podium-block" style={{ height: heights[idx] }}>
                    <span className="podium-pos">{pos === 1 ? '🥇' : pos === 2 ? '🥈' : '🥉'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
