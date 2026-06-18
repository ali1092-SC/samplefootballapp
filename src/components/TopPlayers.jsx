import React, { useState } from 'react';
import { topPlayers } from '../data/playersData';

const StatBar = ({ value, max, color }) => (
  <div style={{
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '4px',
    height: '6px',
    overflow: 'hidden',
    flex: 1
  }}>
    <div style={{
      height: '100%',
      width: `${(value / max) * 100}%`,
      background: color,
      borderRadius: '4px',
      transition: 'width 1s ease'
    }} />
  </div>
);

const PlayerCard = ({ player, rank }) => {
  const [hovered, setHovered] = useState(false);

  const getRankColor = (r) => {
    if (r === 1) return '#FFD700';
    if (r === 2) return '#C0C0C0';
    if (r === 3) return '#CD7F32';
    return '#8a9bb5';
  };

  return (
    <div
      className="card-hover"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? `linear-gradient(135deg, ${player.color}dd, rgba(0,13,46,0.95))`
          : `linear-gradient(135deg, ${player.color}aa, rgba(0,13,46,0.9))`,
        border: `1px solid ${hovered ? player.accentColor + '60' : 'rgba(201,168,76,0.15)'}`,
        borderRadius: '16px',
        padding: '0',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'default'
      }}
    >
      {/* Rank Badge */}
      <div style={{
        position: 'absolute',
        top: '16px',
        left: '16px',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${getRankColor(rank)}, ${getRankColor(rank)}88)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Bebas Neue, cursive',
        fontSize: '18px',
        color: rank <= 3 ? '#001f5b' : '#fff',
        zIndex: 2,
        boxShadow: `0 0 12px ${getRankColor(rank)}66`
      }}>
        {rank}
      </div>

      {/* Player Avatar Area */}
      <div style={{
        height: '140px',
        background: `linear-gradient(180deg, ${player.color} 0%, rgba(0,0,0,0) 100%)`,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${player.accentColor}20, transparent)`,
        }} />

        {/* Player silhouette/emoji */}
        <div style={{
          fontSize: '80px',
          lineHeight: 1,
          opacity: 0.9,
          filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.5))'
        }}>
          {player.emoji}
        </div>

        {/* Flag */}
        <div style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          fontSize: '28px',
          lineHeight: 1
        }}>
          {player.flag}
        </div>
      </div>

      {/* Player Info */}
      <div style={{ padding: '16px 20px 20px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '4px'
        }}>
          <div>
            <div style={{
              fontFamily: 'Oswald, sans-serif',
              fontSize: '20px',
              fontWeight: '700',
              color: '#ffffff',
              letterSpacing: '1px'
            }}>
              {player.name}
            </div>
            <div style={{ fontSize: '12px', color: player.accentColor, fontWeight: '600', letterSpacing: '1px' }}>
              {player.team} · {player.position}
            </div>
          </div>
          <div style={{
            background: `linear-gradient(135deg, ${player.accentColor}, ${player.accentColor}88)`,
            color: '#001f5b',
            padding: '4px 10px',
            borderRadius: '20px',
            fontFamily: 'Bebas Neue, cursive',
            fontSize: '20px',
            letterSpacing: '1px',
            fontWeight: '700'
          }}>
            {player.rating}
          </div>
        </div>

        <p style={{ fontSize: '11px', color: '#8a9bb5', marginBottom: '16px', fontStyle: 'italic' }}>
          {player.description}
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { label: 'Goals', value: player.goals, max: 7, color: '#f0c060' },
            { label: 'Assists', value: player.assists, max: 8, color: '#4a9eff' },
            { label: 'Matches', value: player.matches, max: 7, color: '#c9a84c' }
          ].map(stat => (
            <div key={stat.label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '11px', color: '#8a9bb5', fontWeight: '600', width: '55px' }}>
                {stat.label}
              </span>
              <StatBar value={stat.value} max={stat.max} color={stat.color} />
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#fff', width: '20px', textAlign: 'right' }}>
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TopPlayers = () => {
  const [sortBy, setSortBy] = useState('rating');

  const sorted = [...topPlayers].sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <section id="players" style={{
      padding: '80px 0',
      background: 'linear-gradient(180deg, #000d2e 0%, #041238 50%, #000d2e 100%)'
    }}>
      <div className="section-container">
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(201,168,76,0.1)',
            border: '1px solid rgba(201,168,76,0.3)',
            borderRadius: '4px',
            padding: '4px 12px',
            marginBottom: '16px',
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '2px',
            color: '#c9a84c',
            textTransform: 'uppercase'
          }}>
            🏅 Tournament Leaders
          </div>
          <h2 className="section-title">TOP PLAYERS 2026</h2>
          <p style={{ color: '#8a9bb5', marginTop: '12px', fontSize: '15px' }}>
            Official tournament statistics — updated after each match
          </p>
        </div>

        {/* Sort Controls */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '40px', flexWrap: 'wrap' }}>
          <span style={{ color: '#8a9bb5', fontSize: '13px', fontWeight: '600', alignSelf: 'center', marginRight: '8px' }}>
            Sort by:
          </span>
          {[
            { key: 'rating', label: '⭐ Rating' },
            { key: 'goals', label: '⚽ Goals' },
            { key: 'assists', label: '🎯 Assists' }
          ].map(sort => (
            <button
              key={sort.key}
              onClick={() => setSortBy(sort.key)}
              style={{
                background: sortBy === sort.key ? 'linear-gradient(135deg, #c9a84c, #f0c060)' : 'rgba(255,255,255,0.05)',
                color: sortBy === sort.key ? '#001f5b' : '#8a9bb5',
                border: sortBy === sort.key ? 'none' : '1px solid rgba(255,255,255,0.1)',
                padding: '8px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '13px',
                transition: 'all 0.2s ease'
              }}
            >
              {sort.label}
            </button>
          ))}
        </div>

        {/* Top 3 Podium */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {sorted.slice(0, 3).map((player, idx) => (
            <div key={player.id} style={{
              transform: idx === 0 ? 'scale(1.02)' : 'scale(1)',
              transition: 'transform 0.3s ease'
            }}>
              <PlayerCard player={player} rank={idx + 1} />
            </div>
          ))}
        </div>

        {/* Rest of players */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {sorted.slice(3).map((player, idx) => (
            <PlayerCard key={player.id} player={player} rank={idx + 4} />
          ))}
        </div>

        {/* Golden Boot / Golden Ball */}
        <div style={{
          marginTop: '60px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {[
            {
              award: '👟 Golden Boot',
              subtitle: 'Top Goal Scorer',
              player: 'Kylian Mbappé & Erling Haaland',
              team: 'France · Norway',
              stat: '5 Goals',
              color: '#c9a84c'
            },
            {
              award: '🏅 Golden Ball',
              subtitle: 'Best Player',
              player: 'Vinicius Jr.',
              team: 'Brazil',
              stat: '4G · 4A · 9.0 Rating',
              color: '#4a9eff'
            },
            {
              award: '🧤 Golden Glove',
              subtitle: 'Best Goalkeeper',
              player: 'Emiliano Martínez',
              team: 'Argentina',
              stat: '2 Clean Sheets',
              color: '#27ae60'
            }
          ].map((award, i) => (
            <div key={i} style={{
              background: `linear-gradient(135deg, rgba(10,32,96,0.8), rgba(0,13,46,0.9))`,
              border: `1px solid ${award.color}40`,
              borderRadius: '12px',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                fontSize: '44px',
                lineHeight: 1,
                filter: `drop-shadow(0 0 10px ${award.color}66)`
              }}>
                {award.award.split(' ')[0]}
              </div>
              <div>
                <div style={{
                  fontFamily: 'Bebas Neue, cursive',
                  fontSize: '20px',
                  letterSpacing: '2px',
                  color: award.color
                }}>
                  {award.award.split(' ').slice(1).join(' ')}
                </div>
                <div style={{ fontSize: '11px', color: '#8a9bb5', marginBottom: '4px' }}>{award.subtitle}</div>
                <div style={{ fontWeight: '700', color: '#fff', fontSize: '15px' }}>{award.player}</div>
                <div style={{ fontSize: '12px', color: '#8a9bb5' }}>{award.team} · {award.stat}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .podium-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default TopPlayers;
