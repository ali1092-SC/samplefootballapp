import React, { useState } from 'react';
import { topPlayers } from '../data/playersData';
import './TopPlayers.css';

const RankMedal = ({ rank }) => {
  if (rank === 1) return <span className="medal medal--gold">🥇</span>;
  if (rank === 2) return <span className="medal medal--silver">🥈</span>;
  if (rank === 3) return <span className="medal medal--bronze">🥉</span>;
  return <span className="medal medal--rank">{rank}</span>;
};

const StatBar = ({ value, max, color }) => (
  <div className="stat-bar">
    <div
      className="stat-bar__fill"
      style={{ width: `${(value / max) * 100}%`, background: color }}
    />
  </div>
);

const TopPlayers = () => {
  const [sortBy, setSortBy] = useState('rating');

  const maxGoals = Math.max(...topPlayers.map(p => p.goals));
  const maxAssists = Math.max(...topPlayers.map(p => p.assists));

  const sorted = [...topPlayers].sort((a, b) => {
    if (sortBy === 'goals') return b.goals - a.goals;
    if (sortBy === 'assists') return b.assists - a.assists;
    return b.rating - a.rating;
  });

  return (
    <section id="top-players" className="top-players dark-section">
      <div className="container">
        <div className="section-header">
          <p className="section-subtitle">Tournament</p>
          <h2 className="section-title">Top <span>Players</span></h2>
          <div className="section-divider" />
        </div>

        <div className="top-players__podium">
          {sorted.slice(0, 3).map((player, i) => (
            <div
              key={player.rank}
              className={`podium-card podium-card--${['silver', 'gold', 'bronze'][i]}`}
              style={{ order: [2, 1, 3][i] }}
            >
              <div className="podium-card__rank">
                {i === 1 ? '🥇' : i === 0 ? '🥈' : '🥉'}
              </div>
              <div
                className="podium-card__avatar"
                style={{ background: `linear-gradient(135deg, ${player.photoColor}CC, ${player.photoColor}55)` }}
              >
                <span>{player.photoInitials}</span>
              </div>
              <div className="podium-card__flag">{player.flag}</div>
              <h3 className="podium-card__name">{player.name}</h3>
              <div className="podium-card__club">{player.club}</div>
              <div className="podium-card__stats">
                <div className="podium-card__stat">
                  <span className="podium-card__stat-num" style={{ color: '#F0C040' }}>{player.goals}</span>
                  <span className="podium-card__stat-label">Goals</span>
                </div>
                <div className="podium-card__stat">
                  <span className="podium-card__stat-num" style={{ color: '#4FC3F7' }}>{player.assists}</span>
                  <span className="podium-card__stat-label">Assists</span>
                </div>
                <div className="podium-card__stat">
                  <span className="podium-card__stat-num" style={{ color: '#69F0AE' }}>{player.rating}</span>
                  <span className="podium-card__stat-label">Rating</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="top-players__table-wrap">
          <div className="top-players__sort">
            <span>Sort by:</span>
            {[
              { id: 'rating', label: '⭐ Rating' },
              { id: 'goals', label: '⚽ Goals' },
              { id: 'assists', label: '🎯 Assists' },
            ].map(s => (
              <button
                key={s.id}
                className={`top-players__sort-btn${sortBy === s.id ? ' active' : ''}`}
                onClick={() => setSortBy(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="top-players__table">
            <div className="top-players__thead">
              <div className="tp-col tp-col--rank">Rank</div>
              <div className="tp-col tp-col--player">Player</div>
              <div className="tp-col tp-col--pos">Pos</div>
              <div className="tp-col tp-col--mp">MP</div>
              <div className="tp-col tp-col--goals">Goals</div>
              <div className="tp-col tp-col--assists">Assists</div>
              <div className="tp-col tp-col--rating">Rating</div>
            </div>

            {sorted.map((player, idx) => (
              <div
                key={player.rank}
                className={`top-players__row${idx < 3 ? ` top-players__row--top${idx + 1}` : ''}`}
              >
                <div className="tp-col tp-col--rank">
                  <RankMedal rank={idx + 1} />
                </div>
                <div className="tp-col tp-col--player">
                  <div
                    className="tp-avatar"
                    style={{ background: `linear-gradient(135deg, ${player.photoColor}CC, ${player.photoColor}55)` }}
                  >
                    {player.photoInitials}
                  </div>
                  <div className="tp-player-info">
                    <span className="tp-player-name">{player.name}</span>
                    <span className="tp-player-meta">
                      {player.flag} {player.country} · {player.club}
                    </span>
                  </div>
                </div>
                <div className="tp-col tp-col--pos">
                  <span className="tp-pos-badge">{player.position}</span>
                </div>
                <div className="tp-col tp-col--mp">{player.matches}</div>
                <div className="tp-col tp-col--goals">
                  <div className="tp-stat-cell">
                    <span className="tp-stat-num">{player.goals}</span>
                    <StatBar value={player.goals} max={maxGoals} color="var(--fifa-gold)" />
                  </div>
                </div>
                <div className="tp-col tp-col--assists">
                  <div className="tp-stat-cell">
                    <span className="tp-stat-num" style={{ color: '#4FC3F7' }}>{player.assists}</span>
                    <StatBar value={player.assists} max={maxAssists} color="#4FC3F7" />
                  </div>
                </div>
                <div className="tp-col tp-col--rating">
                  <div className="tp-rating">
                    <span
                      className="tp-rating-num"
                      style={{
                        color: player.rating >= 9.0 ? 'var(--fifa-gold)' :
                               player.rating >= 8.5 ? '#69F0AE' : '#4FC3F7'
                      }}
                    >
                      {player.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopPlayers;
