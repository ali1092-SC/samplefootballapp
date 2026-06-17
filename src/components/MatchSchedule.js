import React, { useState } from 'react';
import { groups, knockoutMatches } from '../data/matchData';
import './MatchSchedule.css';

const MatchCard = ({ match }) => (
  <div className={`match-card${match.featured ? ' match-card--featured' : ''}${match.status === 'tbd' ? ' match-card--tbd' : ''}`}>
    {match.featured && <div className="match-card__featured-tag">⭐ Featured Match</div>}
    <div className="match-card__stage">{match.stage}</div>
    <div className="match-card__teams">
      <div className="match-card__team match-card__team--home">
        <span className="match-card__flag">{match.homeflag}</span>
        <span className="match-card__team-name">{match.homeTeam}</span>
      </div>
      <div className="match-card__vs">
        <span className="match-card__vs-text">VS</span>
        {match.status === 'live' && <span className="match-card__live-dot" />}
      </div>
      <div className="match-card__team match-card__team--away">
        <span className="match-card__flag">{match.awayflag}</span>
        <span className="match-card__team-name">{match.awayTeam}</span>
      </div>
    </div>
    <div className="match-card__info">
      <div className="match-card__info-item">
        <span className="match-card__info-icon">📅</span>
        <span>{match.date}</span>
      </div>
      <div className="match-card__info-item match-card__info-item--highlight">
        <span className="match-card__info-icon">🕐</span>
        <span>{match.time}</span>
      </div>
      <div className="match-card__info-item">
        <span className="match-card__info-icon">📍</span>
        <span>{match.city}</span>
      </div>
    </div>
    <div className="match-card__venue">
      <span>🏟️ {match.venue}</span>
    </div>
  </div>
);

const MatchSchedule = () => {
  const [activeTab, setActiveTab] = useState('group');
  const [activeGroup, setActiveGroup] = useState('all');

  const tabs = [
    { id: 'group', label: 'Group Stage', icon: '🏟️' },
    { id: 'knockout', label: 'Knockout', icon: '🏆' },
  ];

  const getGroupMatches = () => {
    if (activeGroup === 'all') return groups.flatMap(g => g.matches);
    const group = groups.find(g => g.id === activeGroup);
    return group ? group.matches : [];
  };

  return (
    <section id="schedule" className="schedule dark-section">
      <div className="container">
        <div className="section-header">
          <p className="section-subtitle">FIFA World Cup 2026™</p>
          <h2 className="section-title">Match <span>Schedule</span></h2>
          <div className="section-divider" />
        </div>

        <div className="schedule__tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`schedule__tab${activeTab === tab.id ? ' schedule__tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'group' && (
          <>
            <div className="schedule__group-filter">
              <button
                className={`schedule__group-btn${activeGroup === 'all' ? ' active' : ''}`}
                onClick={() => setActiveGroup('all')}
              >All Groups</button>
              {groups.map(g => (
                <button
                  key={g.id}
                  className={`schedule__group-btn${activeGroup === g.id ? ' active' : ''}`}
                  onClick={() => setActiveGroup(g.id)}
                >
                  Group {g.id}
                </button>
              ))}
            </div>

            {activeGroup === 'all' ? (
              groups.map(group => (
                <div key={group.id} className="schedule__group">
                  <div className="schedule__group-header">
                    <h3>Group {group.id}</h3>
                    <div className="schedule__group-teams">
                      {group.teams.map(t => <span key={t}>{t}</span>)}
                    </div>
                  </div>
                  <div className="schedule__grid">
                    {group.matches.map(m => <MatchCard key={m.id} match={m} />)}
                  </div>
                </div>
              ))
            ) : (
              <div className="schedule__grid">
                {getGroupMatches().map(m => <MatchCard key={m.id} match={m} />)}
              </div>
            )}
          </>
        )}

        {activeTab === 'knockout' && (
          <>
            <div className="schedule__knockout-banner">
              <span>🏆 Knockout Stage — The Road to Glory</span>
            </div>
            <div className="schedule__grid">
              {knockoutMatches.map(m => <MatchCard key={m.id} match={m} />)}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default MatchSchedule;
