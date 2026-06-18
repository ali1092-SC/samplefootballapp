import React, { useState } from 'react';
import { watchPlayers } from '../data/playersData';
import { groupStageMatches } from '../data/matchData';

const PlayerSpotlight = ({ player }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? 'linear-gradient(135deg, rgba(10,32,96,0.95), rgba(0,13,46,1))'
          : 'linear-gradient(135deg, rgba(10,32,96,0.7), rgba(0,13,46,0.85))',
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.15)'}`,
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 60px rgba(201,168,76,0.15)' : 'none'
      }}
    >
      {/* Hype Badge */}
      <div style={{
        background: 'linear-gradient(135deg, #d4143c, #a00e2b)',
        padding: '8px 16px',
        fontSize: '11px',
        fontWeight: '800',
        letterSpacing: '2px',
        color: '#fff',
        textAlign: 'center'
      }}>
        {player.hype}
      </div>

      {/* Avatar */}
      <div style={{
        height: '180px',
        background: `linear-gradient(135deg, #0a1f5c, #041238)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background circles */}
        <div style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          border: '1px solid rgba(201,168,76,0.1)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }} />
        <div style={{
          position: 'absolute',
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          border: '1px solid rgba(201,168,76,0.15)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }} />

        {/* Player Image Placeholder */}
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #001f5b, #0a3080)',
          border: '3px solid #c9a84c',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '52px',
          position: 'relative',
          zIndex: 2,
          boxShadow: '0 0 30px rgba(201,168,76,0.3)'
        }}>
          ⚽
        </div>

        {/* Flag */}
        <div style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          fontSize: '32px'
        }}>
          {player.flag}
        </div>

        {/* Jersey Number */}
        <div style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          background: 'rgba(201,168,76,0.9)',
          color: '#001f5b',
          borderRadius: '6px',
          padding: '4px 8px',
          fontFamily: 'Bebas Neue, cursive',
          fontSize: '20px',
          letterSpacing: '1px'
        }}>
          #10
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '20px' }}>
        <div style={{
          fontFamily: 'Oswald, sans-serif',
          fontSize: '22px',
          fontWeight: '700',
          color: '#fff',
          letterSpacing: '1px',
          marginBottom: '4px'
        }}>
          {player.name}
        </div>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <span style={{
            background: 'rgba(201,168,76,0.1)',
            border: '1px solid rgba(201,168,76,0.3)',
            color: '#c9a84c',
            padding: '3px 10px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: '700'
          }}>
            {player.position}
          </span>
          <span style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#8a9bb5',
            padding: '3px 10px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: '600'
          }}>
            {player.club}
          </span>
          <span style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#8a9bb5',
            padding: '3px 10px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: '600'
          }}>
            Age {player.age}
          </span>
        </div>

        <div style={{
          background: 'rgba(0,13,46,0.6)',
          borderRadius: '8px',
          padding: '12px',
          marginBottom: '12px'
        }}>
          <div style={{ fontSize: '11px', color: '#8a9bb5', marginBottom: '6px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Key Strengths
          </div>
          <div style={{ fontSize: '13px', color: '#c9a84c', fontWeight: '600' }}>
            {player.keyStrength}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          {[
            { label: 'Goals', value: player.goals, icon: '⚽' },
            { label: 'Assists', value: player.assists, icon: '🎯' }
          ].map(stat => (
            <div key={stat.label} style={{
              flex: 1,
              background: 'rgba(0,13,46,0.6)',
              borderRadius: '8px',
              padding: '10px',
              textAlign: 'center',
              border: '1px solid rgba(201,168,76,0.1)'
            }}>
              <div style={{ fontSize: '18px', marginBottom: '2px' }}>{stat.icon}</div>
              <div style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '24px', color: '#fff', lineHeight: 1 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '10px', color: '#8a9bb5', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MatchPlayerSpotlight = ({ match }) => (
  <div style={{
    background: 'linear-gradient(135deg, rgba(10,32,96,0.6), rgba(0,13,46,0.8))',
    border: '1px solid rgba(201,168,76,0.15)',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '16px'
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '16px'
    }}>
      <span style={{ fontSize: '32px' }}>{match.homeTeam.flag}</span>
      <div style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '16px', letterSpacing: '2px', color: '#8a9bb5' }}>VS</div>
      <span style={{ fontSize: '32px' }}>{match.awayTeam.flag}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: '700', color: '#fff', fontSize: '16px' }}>
          {match.homeTeam.name} vs {match.awayTeam.name}
        </div>
        <div style={{ fontSize: '11px', color: '#c9a84c' }}>{match.date} · {match.time} EST</div>
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
      {match.playersToWatch.map((player, idx) => (
        <div key={idx} style={{
          background: 'rgba(0,13,46,0.6)',
          border: '1px solid rgba(201,168,76,0.1)',
          borderRadius: '10px',
          padding: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #001f5b, #0a3080)',
            border: '2px solid #c9a84c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            flexShrink: 0
          }}>
            ⚽
          </div>
          <div>
            <div style={{ fontWeight: '700', fontSize: '13px', color: '#fff' }}>{player.name}</div>
            <div style={{ fontSize: '11px', color: '#c9a84c' }}>{player.team} · {player.position}</div>
            <div style={{ fontSize: '10px', color: '#8a9bb5', marginTop: '2px' }}>{player.stat}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const PlayersToWatch = () => {
  const [view, setView] = useState('spotlight');

  return (
    <section id="watch" style={{
      padding: '80px 0',
      background: 'linear-gradient(180deg, #041238 0%, #000d2e 100%)'
    }}>
      <div className="section-container">
        <div style={{ marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(212,20,60,0.15)',
            border: '1px solid rgba(212,20,60,0.4)',
            borderRadius: '4px',
            padding: '4px 12px',
            marginBottom: '16px',
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '2px',
            color: '#d4143c',
            textTransform: 'uppercase'
          }}>
            🌟 Featured
          </div>
          <h2 className="section-title">PLAYERS TO WATCH</h2>
          <p style={{ color: '#8a9bb5', marginTop: '12px', fontSize: '15px' }}>
            Ones to watch — the stars set to define this tournament
          </p>
        </div>

        {/* View Toggle */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '40px' }}>
          {[
            { key: 'spotlight', label: '⭐ Spotlight Players' },
            { key: 'bymatch', label: '📋 By Match' }
          ].map(v => (
            <button
              key={v.key}
              onClick={() => setView(v.key)}
              style={{
                background: view === v.key ? 'linear-gradient(135deg, #d4143c, #ff2d5c)' : 'rgba(255,255,255,0.05)',
                color: view === v.key ? '#fff' : '#8a9bb5',
                border: view === v.key ? 'none' : '1px solid rgba(255,255,255,0.1)',
                padding: '10px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '13px',
                transition: 'all 0.2s ease'
              }}
            >
              {v.label}
            </button>
          ))}
        </div>

        {view === 'spotlight' ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '24px'
          }}>
            {watchPlayers.map(player => (
              <PlayerSpotlight key={player.id} player={player} />
            ))}
          </div>
        ) : (
          <div>
            {groupStageMatches.filter(m => m.playersToWatch?.length).map(match => (
              <MatchPlayerSpotlight key={match.id} match={match} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PlayersToWatch;
