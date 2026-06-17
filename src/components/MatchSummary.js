import React, { useState } from 'react';
import { matchSummaries } from '../data/matchSummaries';
import './MatchSummary.css';

const StatBar = ({ label, home, away, homeVal, awayVal }) => {
  const total = homeVal + awayVal || 1;
  return (
    <div className="ms-stat-row">
      <span className="ms-stat-val ms-stat-val--home">{home}</span>
      <div className="ms-stat-bar-wrap">
        <div className="ms-stat-bar">
          <div
            className="ms-stat-bar__home"
            style={{ width: `${(homeVal / total) * 100}%` }}
          />
          <div
            className="ms-stat-bar__away"
            style={{ width: `${(awayVal / total) * 100}%` }}
          />
        </div>
        <span className="ms-stat-label">{label}</span>
      </div>
      <span className="ms-stat-val ms-stat-val--away">{away}</span>
    </div>
  );
};

const MatchSummary = () => {
  const [activeMatch, setActiveMatch] = useState(0);
  const match = matchSummaries[activeMatch];

  return (
    <section id="summaries" className="match-summary light-section">
      <div className="container">
        <div className="section-header">
          <p className="section-subtitle" style={{ color: 'var(--fifa-gray)' }}>Official Reports</p>
          <h2 className="section-title" style={{ color: 'var(--fifa-navy)' }}>
            Match <span>Summaries</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="ms-tabs">
          {matchSummaries.map((m, i) => (
            <button
              key={m.id}
              className={`ms-tab${activeMatch === i ? ' ms-tab--active' : ''}`}
              onClick={() => setActiveMatch(i)}
            >
              <span className="ms-tab-flags">
                {m.homeflag} vs {m.awayflag}
              </span>
              <span className="ms-tab-score">
                {m.homeScore} – {m.awayScore}
              </span>
            </button>
          ))}
        </div>

        <div className="ms-card">
          <div className="ms-header">
            <div className="ms-header-meta">
              <span className="ms-stage">{match.stage}</span>
              <span className="ms-date">📅 {match.date}</span>
              <span className="ms-venue">📍 {match.venue}</span>
            </div>
            <div className="ms-scoreline">
              <div className="ms-team ms-team--home">
                <span className="ms-flag">{match.homeflag}</span>
                <span className="ms-team-name">{match.homeTeam}</span>
              </div>
              <div className="ms-score">
                <span className="ms-score-home">{match.homeScore}</span>
                <span className="ms-score-sep">–</span>
                <span className="ms-score-away">{match.awayScore}</span>
              </div>
              <div className="ms-team ms-team--away">
                <span className="ms-team-name">{match.awayTeam}</span>
                <span className="ms-flag">{match.awayflag}</span>
              </div>
            </div>
            <div className="ms-mom">
              <span className="ms-mom-label">⭐ Man of the Match</span>
              <span className="ms-mom-name">{match.manOfMatch}</span>
            </div>
          </div>

          <div className="ms-body">
            <div className="ms-events">
              <h3 className="ms-section-title">⚽ Goal Events</h3>
              <div className="ms-timeline">
                {match.scorers.map((s, i) => (
                  <div key={i} className={`ms-event ms-event--${s.team}`}>
                    <div className="ms-event__minute">{s.minute}'</div>
                    <div className="ms-event__dot">
                      <span>{s.type === 'goal' ? '⚽' : '🎯'}</span>
                    </div>
                    <div className="ms-event__info">
                      <span className="ms-event__player">{s.player}</span>
                      <span className="ms-event__team">
                        {s.team === 'home' ? match.homeTeam : match.awayTeam}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {match.cards.length > 0 && (
                <>
                  <h3 className="ms-section-title">🟨 Disciplinary</h3>
                  <div className="ms-timeline">
                    {match.cards.map((c, i) => (
                      <div key={i} className={`ms-event ms-event--${c.team}`}>
                        <div className="ms-event__minute">{c.minute}'</div>
                        <div className="ms-event__dot">
                          <span>{c.type === 'yellow' ? '🟨' : '🟥'}</span>
                        </div>
                        <div className="ms-event__info">
                          <span className="ms-event__player">{c.player}</span>
                          <span className="ms-event__team">
                            {c.type === 'yellow' ? 'Yellow Card' : 'Red Card'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="ms-stats">
              <h3 className="ms-section-title">📊 Match Stats</h3>
              <div className="ms-stats-teams">
                <span>{match.homeflag} {match.homeTeam}</span>
                <span>{match.awayTeam} {match.awayflag}</span>
              </div>
              <div className="ms-stats-list">
                <StatBar
                  label="Possession %"
                  home={`${match.stats.possession[0]}%`}
                  away={`${match.stats.possession[1]}%`}
                  homeVal={match.stats.possession[0]}
                  awayVal={match.stats.possession[1]}
                />
                <StatBar
                  label="Total Shots"
                  home={match.stats.shots[0]}
                  away={match.stats.shots[1]}
                  homeVal={match.stats.shots[0]}
                  awayVal={match.stats.shots[1]}
                />
                <StatBar
                  label="Shots on Target"
                  home={match.stats.shotsOnTarget[0]}
                  away={match.stats.shotsOnTarget[1]}
                  homeVal={match.stats.shotsOnTarget[0]}
                  awayVal={match.stats.shotsOnTarget[1]}
                />
                <StatBar
                  label="Corners"
                  home={match.stats.corners[0]}
                  away={match.stats.corners[1]}
                  homeVal={match.stats.corners[0]}
                  awayVal={match.stats.corners[1]}
                />
                <StatBar
                  label="Passes"
                  home={match.stats.passes[0]}
                  away={match.stats.passes[1]}
                  homeVal={match.stats.passes[0]}
                  awayVal={match.stats.passes[1]}
                />
                <StatBar
                  label="Pass Accuracy"
                  home={`${match.stats.passAccuracy[0]}%`}
                  away={`${match.stats.passAccuracy[1]}%`}
                  homeVal={match.stats.passAccuracy[0]}
                  awayVal={match.stats.passAccuracy[1]}
                />
              </div>
            </div>
          </div>

          <div className="ms-narrative">
            <div className="ms-narrative-label">📝 Match Report</div>
            <p>{match.summary}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MatchSummary;
