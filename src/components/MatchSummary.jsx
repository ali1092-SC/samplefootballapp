import React, { useState } from 'react';
import { completedMatches } from '../data/matchData';

const PossessionBar = ({ home, away, homeName, awayName }) => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
      <span style={{ fontSize: '12px', fontWeight: '700', color: '#fff' }}>{home}%</span>
      <span style={{ fontSize: '11px', color: '#8a9bb5', letterSpacing: '1px', textTransform: 'uppercase' }}>Possession</span>
      <span style={{ fontSize: '12px', fontWeight: '700', color: '#fff' }}>{away}%</span>
    </div>
    <div style={{
      background: 'rgba(255,255,255,0.1)',
      borderRadius: '4px',
      height: '10px',
      overflow: 'hidden',
      display: 'flex'
    }}>
      <div style={{
        width: `${home}%`,
        background: 'linear-gradient(90deg, #c9a84c, #f0c060)',
        transition: 'width 1s ease'
      }} />
      <div style={{
        flex: 1,
        background: 'linear-gradient(90deg, #4a9eff, #0066cc)'
      }} />
    </div>
  </div>
);

const RatingWidget = ({ rating }) => {
  const percentage = (rating / 10) * 100;
  const getColor = (r) => {
    if (r >= 9) return '#FFD700';
    if (r >= 8) return '#27ae60';
    if (r >= 7) return '#c9a84c';
    return '#d4143c';
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 8px' }}>
        <svg width="80" height="80" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke={getColor(rating)}
            strokeWidth="6"
            strokeDasharray={`${2 * Math.PI * 34}`}
            strokeDashoffset={`${2 * Math.PI * 34 * (1 - percentage / 100)}`}
            strokeLinecap="round"
          />
        </svg>
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Bebas Neue, cursive',
          fontSize: '22px',
          color: getColor(rating),
          letterSpacing: '1px'
        }}>
          {rating}
        </div>
      </div>
      <div style={{ fontSize: '10px', color: '#8a9bb5', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>
        Match Rating
      </div>
    </div>
  );
};

const MatchSummaryCard = ({ match }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(10,32,96,0.8), rgba(0,13,46,0.95))',
      border: '1px solid rgba(201,168,76,0.2)',
      borderRadius: '20px',
      overflow: 'hidden',
      marginBottom: '24px',
      transition: 'all 0.3s ease'
    }}>
      {/* Match Result Header */}
      <div style={{
        padding: '24px',
        background: 'rgba(0,13,46,0.5)',
        borderBottom: '1px solid rgba(201,168,76,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <span style={{
            background: 'rgba(39,174,96,0.2)',
            border: '1px solid rgba(39,174,96,0.4)',
            color: '#27ae60',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '1px'
          }}>
            ✓ FULL TIME
          </span>
          <span style={{ fontSize: '12px', color: '#8a9bb5' }}>📅 {match.date}</span>
        </div>

        {/* Score */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '8px', lineHeight: 1 }}>{match.homeTeam.flag}</div>
            <div style={{ fontFamily: 'Oswald, sans-serif', fontSize: '20px', fontWeight: '700', color: '#fff' }}>
              {match.homeTeam.name}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'Bebas Neue, cursive',
              fontSize: '64px',
              color: '#ffffff',
              letterSpacing: '8px',
              lineHeight: 1,
              background: 'linear-gradient(135deg, #c9a84c, #f0c060)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {match.homeTeam.score} – {match.awayTeam.score}
            </div>
            <div style={{ fontSize: '11px', color: '#8a9bb5', marginTop: '4px' }}>📍 {match.venue}</div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '8px', lineHeight: 1 }}>{match.awayTeam.flag}</div>
            <div style={{ fontFamily: 'Oswald, sans-serif', fontSize: '20px', fontWeight: '700', color: '#fff' }}>
              {match.awayTeam.name}
            </div>
          </div>
        </div>
      </div>

      {/* Goal Scorers */}
      <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {match.goalScorers.map((scorer, i) => (
            <span key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.2)',
              borderRadius: '20px',
              padding: '6px 14px',
              fontSize: '12px',
              color: '#c9a84c',
              fontWeight: '600'
            }}>
              ⚽ {scorer}
            </span>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ flex: 1 }}>
            <PossessionBar
              home={match.possession.home}
              away={match.possession.away}
              homeName={match.homeTeam.name}
              awayName={match.awayTeam.name}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '24px', color: '#fff' }}>
                  {match.shots.home}
                </div>
                <div style={{ fontSize: '10px', color: '#8a9bb5', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Shots
                </div>
              </div>
              <RatingWidget rating={match.rating} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '24px', color: '#fff' }}>
                  {match.shots.away}
                </div>
                <div style={{ fontSize: '10px', color: '#8a9bb5', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Shots
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Toggle */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          background: 'rgba(201,168,76,0.05)',
          borderTop: '1px solid rgba(201,168,76,0.1)',
          padding: '12px 24px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'background 0.2s ease'
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.1)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(201,168,76,0.05)'}
      >
        <span style={{ fontSize: '13px', color: '#c9a84c', fontWeight: '700', letterSpacing: '1px' }}>
          📝 MATCH REPORT & HIGHLIGHTS
        </span>
        <span style={{ color: '#c9a84c', fontSize: '16px' }}>{expanded ? '▲' : '▼'}</span>
      </div>

      {expanded && (
        <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
          <p style={{ color: '#b8c8e0', lineHeight: '1.8', fontSize: '14px', marginBottom: '20px' }}>
            {match.summary}
          </p>
          <div style={{
            fontFamily: 'Bebas Neue, cursive',
            fontSize: '14px',
            letterSpacing: '2px',
            color: '#c9a84c',
            marginBottom: '12px'
          }}>
            KEY MOMENTS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {match.highlights.map((h, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                background: 'rgba(0,13,46,0.6)',
                borderRadius: '8px',
                border: '1px solid rgba(201,168,76,0.08)'
              }}>
                <span style={{ color: '#c9a84c', fontSize: '14px' }}>▶</span>
                <span style={{ fontSize: '13px', color: '#ffffff', fontWeight: '500' }}>{h}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const MatchSummary = () => {
  return (
    <section id="results" style={{
      padding: '80px 0',
      background: 'linear-gradient(180deg, #000d2e 0%, #04122a 100%)'
    }}>
      <div className="section-container">
        <div style={{ marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(39,174,96,0.15)',
            border: '1px solid rgba(39,174,96,0.4)',
            borderRadius: '4px',
            padding: '4px 12px',
            marginBottom: '16px',
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '2px',
            color: '#27ae60',
            textTransform: 'uppercase'
          }}>
            ✓ Completed Matches
          </div>
          <h2 className="section-title">MATCH RESULTS</h2>
          <p style={{ color: '#8a9bb5', marginTop: '12px', fontSize: '15px' }}>
            Full time results, stats and match reports from completed fixtures
          </p>
        </div>

        {completedMatches.map(match => (
          <MatchSummaryCard key={match.id} match={match} />
        ))}
      </div>
    </section>
  );
};

export default MatchSummary;
