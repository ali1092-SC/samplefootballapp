import React, { useState } from 'react';
import { groupStageMatches, knockoutMatches } from '../data/matchData';

const tabs = ['Group Stage', 'Round of 16', 'Quarterfinals', 'Semifinals', 'Final'];

const MatchCard = ({ match, showPlayers = false }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="card-hover"
      style={{
        background: 'linear-gradient(135deg, rgba(10,32,96,0.8) 0%, rgba(0,20,70,0.9) 100%)',
        border: '1px solid rgba(201,168,76,0.2)',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: showPlayers ? 'pointer' : 'default',
        transition: 'all 0.3s ease'
      }}
      onClick={() => showPlayers && setExpanded(!expanded)}
    >
      {/* Match Header */}
      <div style={{
        background: 'rgba(0,13,46,0.6)',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(201,168,76,0.1)'
      }}>
        <span style={{
          fontFamily: 'Bebas Neue, cursive',
          fontSize: '13px',
          letterSpacing: '2px',
          color: '#c9a84c'
        }}>
          {match.group || match.round}
        </span>
        <span style={{
          background: match.status === 'live' ? '#d4143c' : 'rgba(201,168,76,0.15)',
          color: match.status === 'live' ? '#fff' : '#c9a84c',
          padding: '3px 10px',
          borderRadius: '20px',
          fontSize: '11px',
          fontWeight: '700',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          animation: match.status === 'live' ? 'pulse 2s infinite' : 'none'
        }}>
          {match.status === 'live' ? '🔴 LIVE' : '📅 UPCOMING'}
        </span>
      </div>

      {/* Teams */}
      <div style={{ padding: '24px 20px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          gap: '16px'
        }}>
          {/* Home Team */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '52px', marginBottom: '8px', lineHeight: 1 }}>
              {match.homeTeam.flag}
            </div>
            <div style={{
              fontFamily: 'Oswald, sans-serif',
              fontSize: '20px',
              fontWeight: '700',
              color: '#ffffff',
              letterSpacing: '1px'
            }}>
              {match.homeTeam.name}
            </div>
            {match.homeTeam.ranking && (
              <div style={{ fontSize: '11px', color: '#8a9bb5', marginTop: '4px' }}>
                FIFA #{match.homeTeam.ranking}
              </div>
            )}
          </div>

          {/* VS / Score */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'Bebas Neue, cursive',
              fontSize: '32px',
              color: '#8a9bb5',
              letterSpacing: '4px'
            }}>VS</div>
            <div style={{
              fontSize: '11px',
              color: '#c9a84c',
              fontWeight: '700',
              letterSpacing: '1px',
              marginTop: '4px'
            }}>
              {match.time}
            </div>
          </div>

          {/* Away Team */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '52px', marginBottom: '8px', lineHeight: 1 }}>
              {match.awayTeam.flag}
            </div>
            <div style={{
              fontFamily: 'Oswald, sans-serif',
              fontSize: '20px',
              fontWeight: '700',
              color: '#ffffff',
              letterSpacing: '1px'
            }}>
              {match.awayTeam.name}
            </div>
            {match.awayTeam.ranking && (
              <div style={{ fontSize: '11px', color: '#8a9bb5', marginTop: '4px' }}>
                FIFA #{match.awayTeam.ranking}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Match Info */}
      <div style={{
        padding: '0 20px 16px',
        display: 'flex',
        gap: '16px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <span style={{ fontSize: '12px', color: '#8a9bb5', display: 'flex', alignItems: 'center', gap: '6px' }}>
          📅 {match.date}
        </span>
        <span style={{ fontSize: '12px', color: '#8a9bb5', display: 'flex', alignItems: 'center', gap: '6px' }}>
          🏟️ {match.venue}
        </span>
      </div>

      {/* Players to Watch Toggle */}
      {showPlayers && match.playersToWatch && (
        <>
          <div style={{
            background: 'rgba(201,168,76,0.08)',
            borderTop: '1px solid rgba(201,168,76,0.15)',
            padding: '10px 20px',
            textAlign: 'center',
            fontSize: '12px',
            color: '#c9a84c',
            fontWeight: '600',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>
            {expanded ? '▲ Hide' : '▼ Players to Watch'}
          </div>

          {expanded && (
            <div style={{
              padding: '16px 20px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              borderTop: '1px solid rgba(201,168,76,0.1)'
            }}>
              {match.playersToWatch.map((player, idx) => (
                <div key={idx} style={{
                  background: 'rgba(0,13,46,0.6)',
                  border: '1px solid rgba(201,168,76,0.15)',
                  borderRadius: '10px',
                  padding: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #001f5b, #0a3080)',
                    border: '2px solid #c9a84c',
                    margin: '0 auto 8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px'
                  }}>
                    ⚽
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '13px', color: '#fff', marginBottom: '4px' }}>
                    {player.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#c9a84c', marginBottom: '4px' }}>
                    {player.team} · {player.position} #{player.number}
                  </div>
                  <div style={{ fontSize: '10px', color: '#8a9bb5' }}>{player.stat}</div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

const MatchSchedule = () => {
  const [activeTab, setActiveTab] = useState('Group Stage');

  const getMatchesForTab = () => {
    if (activeTab === 'Group Stage') return groupStageMatches;
    if (activeTab === 'Round of 16') return knockoutMatches.filter(m => m.round === 'Round of 16');
    if (activeTab === 'Quarterfinals') return knockoutMatches.filter(m => m.round === 'Quarterfinal');
    if (activeTab === 'Semifinals') return knockoutMatches.filter(m => m.round === 'Semifinal');
    if (activeTab === 'Final') return knockoutMatches.filter(m => m.round === 'Final');
    return [];
  };

  const matches = getMatchesForTab();

  return (
    <section id="schedule" style={{ padding: '80px 0', background: '#000d2e' }}>
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
            📅 Full Tournament
          </div>
          <h2 className="section-title">
            MATCH SCHEDULE
          </h2>
          <p style={{ color: '#8a9bb5', marginTop: '12px', fontSize: '15px' }}>
            All times in Eastern Standard Time (EST) · June 11 – July 19, 2026
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '40px',
          overflowX: 'auto',
          paddingBottom: '8px'
        }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab
                  ? 'linear-gradient(135deg, #c9a84c, #f0c060)'
                  : 'rgba(255,255,255,0.05)',
                color: activeTab === tab ? '#001f5b' : '#8a9bb5',
                border: activeTab === tab ? 'none' : '1px solid rgba(255,255,255,0.1)',
                padding: '10px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'Oswald, sans-serif',
                fontSize: '14px',
                fontWeight: '600',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              {tab}
              {tab === 'Final' && ' 🏆'}
            </button>
          ))}
        </div>

        {/* Matches Grid */}
        {matches.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px'
          }}>
            {matches.map(match => (
              <MatchCard
                key={match.id}
                match={match}
                showPlayers={activeTab === 'Group Stage'}
              />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            color: '#8a9bb5'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏆</div>
            <div style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '24px', letterSpacing: '3px', color: '#c9a84c' }}>
              TBD — ADVANCING TEAMS
            </div>
            <p style={{ marginTop: '8px' }}>Matchups to be determined based on group stage results</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MatchSchedule;
