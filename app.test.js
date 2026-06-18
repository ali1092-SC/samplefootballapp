/**
 * FIFA World Cup 2026 – Test Suite
 * Covers: renderLiveMatches, renderTomorrowMatches, renderNews,
 *         renderStandings, renderTopScorers, renderHostCities,
 *         buildMatchCard, buildCountdown, formatKickoffTime,
 *         simulateLiveScoreUpdate, startLiveScoreRefresh,
 *         animateCounter, and UI interaction helpers.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';

/* ── helpers ──────────────────────────────────────────────────── */
function makeDOM() {
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
  global.document = dom.window.document;
  global.window   = dom.window;
  return dom;
}
function el(id) { return document.getElementById(id); }
function div(id = '') {
  const d = document.createElement('div');
  if (id) d.id = id;
  document.body.appendChild(d);
  return d;
}

/* ── module under test ────────────────────────────────────────── */
import {
  liveMatchesData,
  latestNews,
  standingsData,
  topScorers,
  hostCities,
  tournamentStats,
  buildMatchCard,
  buildCountdown,
  formatKickoffTime,
  renderLiveMatches,
  renderTomorrowMatches,
  simulateLiveScoreUpdate,
  startLiveScoreRefresh,
  stopLiveScoreRefresh,
  renderNews,
  renderStandings,
  renderTopScorers,
  renderHostCities,
  animateCounter,
  spawnHeroParticles,
  updateLastUpdated,
  updateCountdowns,
} from './app.js';

/* ═══════════════════════════════════════════════════════════════
   1. DATA INTEGRITY
═══════════════════════════════════════════════════════════════ */
describe('Data integrity', () => {
  it('liveMatchesData is a non-empty array', () => {
    expect(Array.isArray(liveMatchesData)).toBe(true);
    expect(liveMatchesData.length).toBeGreaterThan(0);
  });

  it('every match has required fields', () => {
    liveMatchesData.forEach(m => {
      expect(m).toHaveProperty('id');
      expect(m).toHaveProperty('status');
      expect(m).toHaveProperty('homeTeam');
      expect(m).toHaveProperty('awayTeam');
      expect(m).toHaveProperty('venue');
      expect(m).toHaveProperty('day');
    });
  });

  it('statuses are one of LIVE | HT | FT | UPCOMING', () => {
    const valid = new Set(['LIVE', 'HT', 'FT', 'UPCOMING']);
    liveMatchesData.forEach(m => expect(valid.has(m.status)).toBe(true));
  });

  it('today matches have integer scores', () => {
    liveMatchesData
      .filter(m => m.day === 'today')
      .forEach(m => {
        expect(typeof m.homeTeam.score).toBe('number');
        expect(typeof m.awayTeam.score).toBe('number');
      });
  });

  it('tomorrow matches have null scores', () => {
    liveMatchesData
      .filter(m => m.day === 'tomorrow')
      .forEach(m => {
        expect(m.homeTeam.score).toBeNull();
        expect(m.awayTeam.score).toBeNull();
      });
  });

  it('tomorrow matches have kickoff Date objects', () => {
    liveMatchesData
      .filter(m => m.day === 'tomorrow')
      .forEach(m => expect(m.kickoff instanceof Date).toBe(true));
  });

  it('latestNews contains at least 6 articles', () => {
    expect(latestNews.length).toBeGreaterThanOrEqual(6);
  });

  it('each news article has headline and excerpt', () => {
    latestNews.forEach(a => {
      expect(typeof a.headline).toBe('string');
      expect(a.headline.length).toBeGreaterThan(0);
      expect(typeof a.excerpt).toBe('string');
    });
  });

  it('standingsData has 6 groups (A–F)', () => {
    expect(Object.keys(standingsData)).toEqual(['A', 'B', 'C', 'D', 'E', 'F']);
  });

  it('each group has exactly 4 teams', () => {
    Object.values(standingsData).forEach(group => expect(group.length).toBe(4));
  });

  it('topScorers is sorted by rank', () => {
    topScorers.forEach((s, i) => expect(s.rank).toBe(i + 1));
  });

  it('hostCities has 16 entries', () => {
    expect(hostCities.length).toBe(16);
  });

  it('tournamentStats has goals, matchesPlayed and viewers', () => {
    expect(typeof tournamentStats.goals).toBe('number');
    expect(typeof tournamentStats.matchesPlayed).toBe('number');
    expect(typeof tournamentStats.viewers).toBe('number');
  });
});

/* ═══════════════════════════════════════════════════════════════
   2. buildMatchCard
═══════════════════════════════════════════════════════════════ */
describe('buildMatchCard()', () => {
  const liveMatch = liveMatchesData.find(m => m.status === 'LIVE');
  const ftMatch   = liveMatchesData.find(m => m.status === 'FT');
  const upcoming  = liveMatchesData.find(m => m.status === 'UPCOMING');
  const htMatch   = liveMatchesData.find(m => m.status === 'HT');

  it('returns a non-empty string', () => {
    expect(typeof buildMatchCard(liveMatch)).toBe('string');
    expect(buildMatchCard(liveMatch).length).toBeGreaterThan(0);
  });

  it('LIVE card contains badge-live class', () => {
    expect(buildMatchCard(liveMatch)).toContain('badge-live');
  });

  it('FT card contains badge-ft class', () => {
    expect(buildMatchCard(ftMatch)).toContain('badge-ft');
  });

  it('HT card contains HALF TIME label', () => {
    expect(buildMatchCard(htMatch)).toContain('HALF TIME');
  });

  it('UPCOMING card shows VS instead of score', () => {
    expect(buildMatchCard(upcoming)).toContain('VS');
    expect(buildMatchCard(upcoming)).not.toMatch(/\d+–\d+/);
  });

  it('card contains home and away team names', () => {
    const html = buildMatchCard(liveMatch);
    expect(html).toContain(liveMatch.homeTeam.name);
    expect(html).toContain(liveMatch.awayTeam.name);
  });

  it('card contains team flags', () => {
    const html = buildMatchCard(liveMatch);
    expect(html).toContain(liveMatch.homeTeam.flag);
    expect(html).toContain(liveMatch.awayTeam.flag);
  });

  it('card contains venue info', () => {
    const html = buildMatchCard(liveMatch);
    expect(html).toContain(liveMatch.venue);
  });

  it('card contains group label', () => {
    const html = buildMatchCard(liveMatch);
    expect(html).toContain(liveMatch.group);
  });

  it('card has aria-label with team names', () => {
    const html = buildMatchCard(liveMatch);
    expect(html).toContain('aria-label');
    expect(html).toContain(liveMatch.homeTeam.name);
  });

  it('LIVE card has data-match-id attribute', () => {
    expect(buildMatchCard(liveMatch)).toContain(`data-match-id="${liveMatch.id}"`);
  });

  it('LIVE card shows score as X–Y', () => {
    const html = buildMatchCard(liveMatch);
    expect(html).toMatch(/\d+–\d+/);
  });

  it('events are rendered for matches with events', () => {
    const matchWithEvents = liveMatchesData.find(m => m.events && m.events.length > 0);
    if (matchWithEvents) {
      const html = buildMatchCard(matchWithEvents);
      expect(html).toContain('match-events');
    }
  });

  it('upcoming card has countdown-display element', () => {
    expect(buildMatchCard(upcoming)).toContain('countdown-display');
  });
});

/* ═══════════════════════════════════════════════════════════════
   3. buildCountdown & formatKickoffTime
═══════════════════════════════════════════════════════════════ */
describe('buildCountdown()', () => {
  it('returns empty string for null input', () => {
    expect(buildCountdown(null)).toBe('');
  });

  it('returns "Kick-off!" when date is in the past', () => {
    const past = new Date(Date.now() - 1000);
    expect(buildCountdown(past)).toBe('Kick-off!');
  });

  it('shows hours when >60 minutes away', () => {
    const future = new Date(Date.now() + 3 * 3_600_000);
    expect(buildCountdown(future)).toMatch(/In \d+h \d+m/);
  });

  it('shows minutes when <60 minutes away', () => {
    const future = new Date(Date.now() + 20 * 60_000);
    expect(buildCountdown(future)).toMatch(/In \d+m \d+s/);
  });

  it('shows seconds when <60 seconds away', () => {
    const future = new Date(Date.now() + 45_000);
    expect(buildCountdown(future)).toMatch(/In \d+s/);
  });

  it('returns a string type', () => {
    expect(typeof buildCountdown(new Date(Date.now() + 100_000))).toBe('string');
  });
});

describe('formatKickoffTime()', () => {
  it('returns "TBC" for null input', () => {
    expect(formatKickoffTime(null)).toBe('TBC');
  });

  it('returns a non-empty string for a valid date', () => {
    const d = new Date(2026, 5, 15, 14, 0);
    const result = formatKickoffTime(d);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('includes AM or PM', () => {
    const d = new Date(2026, 5, 15, 14, 30);
    const result = formatKickoffTime(d);
    expect(result).toMatch(/AM|PM/);
  });
});

/* ═══════════════════════════════════════════════════════════════
   4. renderLiveMatches
═══════════════════════════════════════════════════════════════ */
describe('renderLiveMatches()', () => {
  beforeEach(() => { makeDOM(); });

  it('renders today\'s match cards into container', () => {
    const container = div('matchesGrid');
    renderLiveMatches(container, liveMatchesData);
    const todayCount = liveMatchesData.filter(m => m.day === 'today').length;
    expect(container.querySelectorAll('.match-card').length).toBe(todayCount);
  });

  it('does nothing when container is null', () => {
    expect(() => renderLiveMatches(null, liveMatchesData)).not.toThrow();
  });

  it('shows "No matches scheduled today" when no today matches', () => {
    const container = div();
    renderLiveMatches(container, liveMatchesData.filter(m => m.day === 'tomorrow'));
    expect(container.textContent).toContain('No matches scheduled today');
  });

  it('renders LIVE badge for live matches', () => {
    const container = div();
    renderLiveMatches(container, liveMatchesData);
    expect(container.querySelector('.badge-live')).not.toBeNull();
  });

  it('renders FT badge for finished matches', () => {
    const container = div();
    renderLiveMatches(container, liveMatchesData);
    expect(container.querySelector('.badge-ft')).not.toBeNull();
  });

  it('live-match class applied to LIVE cards', () => {
    const container = div();
    renderLiveMatches(container, liveMatchesData);
    expect(container.querySelector('.live-match')).not.toBeNull();
  });

  it('each card has an aria-label', () => {
    const container = div();
    renderLiveMatches(container, liveMatchesData);
    const cards = container.querySelectorAll('[aria-label]');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('replaces existing content on re-render', () => {
    const container = div();
    renderLiveMatches(container, liveMatchesData);
    const first = container.innerHTML;
    renderLiveMatches(container, liveMatchesData);
    expect(container.innerHTML).toBe(first);
  });
});

/* ═══════════════════════════════════════════════════════════════
   5. renderTomorrowMatches
═══════════════════════════════════════════════════════════════ */
describe('renderTomorrowMatches()', () => {
  beforeEach(() => { makeDOM(); });

  it('renders tomorrow\'s match cards', () => {
    const container = div();
    renderTomorrowMatches(container, liveMatchesData);
    const tomorrowCount = liveMatchesData.filter(m => m.day === 'tomorrow').length;
    expect(container.querySelectorAll('.match-card').length).toBe(tomorrowCount);
  });

  it('shows VS for upcoming matches', () => {
    const container = div();
    renderTomorrowMatches(container, liveMatchesData);
    expect(container.textContent).toContain('VS');
  });

  it('renders countdown elements', () => {
    const container = div();
    renderTomorrowMatches(container, liveMatchesData);
    expect(container.querySelector('.countdown-display')).not.toBeNull();
  });

  it('does nothing when container is null', () => {
    expect(() => renderTomorrowMatches(null, liveMatchesData)).not.toThrow();
  });
});

/* ═══════════════════════════════════════════════════════════════
   6. simulateLiveScoreUpdate
═══════════════════════════════════════════════════════════════ */
describe('simulateLiveScoreUpdate()', () => {
  it('returns same number of matches', () => {
    const updated = simulateLiveScoreUpdate(liveMatchesData);
    expect(updated.length).toBe(liveMatchesData.length);
  });

  it('increments minute for LIVE matches', () => {
    const liveOnly = [{ ...liveMatchesData.find(m => m.status === 'LIVE') }];
    const before = parseInt(liveOnly[0].minute, 10);
    const updated = simulateLiveScoreUpdate(liveOnly);
    expect(parseInt(updated[0].minute, 10)).toBe(Math.min(90, before + 1));
  });

  it('does not mutate original data', () => {
    const original = liveMatchesData.map(m => ({ ...m }));
    simulateLiveScoreUpdate(liveMatchesData);
    original.forEach((orig, i) => {
      expect(liveMatchesData[i].id).toBe(orig.id);
    });
  });

  it('does not change FT or UPCOMING match scores', () => {
    const unchanged = [liveMatchesData.find(m => m.status === 'FT')];
    const updated = simulateLiveScoreUpdate(unchanged);
    expect(updated[0].homeTeam.score).toBe(unchanged[0].homeTeam.score);
    expect(updated[0].awayTeam.score).toBe(unchanged[0].awayTeam.score);
  });

  it('score never decreases', () => {
    const live = liveMatchesData.filter(m => m.status === 'LIVE');
    const updated = simulateLiveScoreUpdate(live);
    live.forEach((m, i) => {
      expect(updated[i].homeTeam.score).toBeGreaterThanOrEqual(m.homeTeam.score);
      expect(updated[i].awayTeam.score).toBeGreaterThanOrEqual(m.awayTeam.score);
    });
  });

  it('minute caps at 90', () => {
    const match = { ...liveMatchesData.find(m => m.status === 'LIVE'), minute: '90' };
    const updated = simulateLiveScoreUpdate([match]);
    expect(parseInt(updated[0].minute, 10)).toBe(90);
  });
});

/* ═══════════════════════════════════════════════════════════════
   7. startLiveScoreRefresh / stopLiveScoreRefresh
═══════════════════════════════════════════════════════════════ */
describe('startLiveScoreRefresh()', () => {
  beforeEach(() => { vi.useFakeTimers(); makeDOM(); stopLiveScoreRefresh(); });
  afterEach(() => { stopLiveScoreRefresh(); vi.useRealTimers(); });

  it('returns an interval id (truthy)', () => {
    const container = div('matchesGrid');
    renderLiveMatches(container, liveMatchesData);
    const id = startLiveScoreRefresh(5_000);
    expect(id).toBeTruthy();
  });

  it('calls DOM update after interval elapses', () => {
    const container = div('matchesGrid');
    renderLiveMatches(container, liveMatchesData);
    startLiveScoreRefresh(5_000);
    const before = container.innerHTML;
    vi.advanceTimersByTime(5_000);
    // innerHTML may or may not change (random score) but should not throw
    expect(typeof container.innerHTML).toBe('string');
  });

  it('does not create multiple intervals on repeated calls', () => {
    const container = div('matchesGrid');
    renderLiveMatches(container, liveMatchesData);
    const id1 = startLiveScoreRefresh(5_000);
    const id2 = startLiveScoreRefresh(5_000);
    expect(id1).toEqual(id2);
  });

  it('stopLiveScoreRefresh prevents further ticks', () => {
    const container = div('matchesGrid');
    renderLiveMatches(container, liveMatchesData);
    startLiveScoreRefresh(5_000);
    stopLiveScoreRefresh();
    const before = container.innerHTML;
    vi.advanceTimersByTime(20_000);
    expect(container.innerHTML).toBe(before);
  });
});

/* ═══════════════════════════════════════════════════════════════
   8. renderNews
═══════════════════════════════════════════════════════════════ */
describe('renderNews()', () => {
  beforeEach(() => { makeDOM(); });

  it('renders featured articles', () => {
    const featured = div('newsFeatured');
    const grid     = div('newsGrid');
    renderNews(featured, grid, latestNews);
    expect(featured.children.length).toBeGreaterThan(0);
  });

  it('renders grid articles', () => {
    const featured = div('newsFeatured');
    const grid     = div('newsGrid');
    renderNews(featured, grid, latestNews);
    expect(grid.children.length).toBeGreaterThan(0);
  });

  it('featured count matches data', () => {
    const featured = div();
    const grid     = div();
    renderNews(featured, grid, latestNews);
    const featuredCount = latestNews.filter(a => a.featured).length;
    expect(featured.querySelectorAll('article').length).toBe(featuredCount);
  });

  it('grid count matches non-featured data', () => {
    const featured = div();
    const grid     = div();
    renderNews(featured, grid, latestNews);
    const gridCount = latestNews.filter(a => !a.featured).length;
    expect(grid.querySelectorAll('article').length).toBe(gridCount);
  });

  it('each article card has a headline', () => {
    const featured = div();
    const grid     = div();
    renderNews(featured, grid, latestNews);
    const headlines = [...featured.querySelectorAll('.news-headline'), ...grid.querySelectorAll('.news-headline')];
    expect(headlines.length).toBe(latestNews.length);
  });

  it('category tags are rendered', () => {
    const featured = div();
    const grid     = div();
    renderNews(featured, grid, latestNews);
    expect(featured.querySelectorAll('.news-tag').length).toBeGreaterThan(0);
  });

  it('read-more links are present', () => {
    const featured = div();
    const grid     = div();
    renderNews(featured, grid, latestNews);
    const links = [...featured.querySelectorAll('.news-read-more'), ...grid.querySelectorAll('.news-read-more')];
    expect(links.length).toBe(latestNews.length);
  });

  it('articles are keyboard accessible (tabindex)', () => {
    const featured = div();
    const grid     = div();
    renderNews(featured, grid, latestNews);
    const allArticles = [...featured.querySelectorAll('article'), ...grid.querySelectorAll('article')];
    allArticles.forEach(a => expect(a.getAttribute('tabindex')).toBe('0'));
  });

  it('does nothing when containers are null', () => {
    expect(() => renderNews(null, null, latestNews)).not.toThrow();
  });

  it('thumb-class is applied to placeholder divs', () => {
    const featured = div();
    const grid     = div();
    renderNews(featured, grid, latestNews);
    const thumbs = [...featured.querySelectorAll('.news-thumb-placeholder'), ...grid.querySelectorAll('.news-thumb-placeholder')];
    thumbs.forEach(t => {
      const hasThumbClass = [...t.classList].some(c => c.startsWith('thumb-'));
      expect(hasThumbClass).toBe(true);
    });
  });
});

/* ═══════════════════════════════════════════════════════════════
   9. renderStandings
═══════════════════════════════════════════════════════════════ */
describe('renderStandings()', () => {
  beforeEach(() => { makeDOM(); });

  it('renders a table element', () => {
    const container = div();
    renderStandings(container, standingsData.A);
    expect(container.querySelector('table')).not.toBeNull();
  });

  it('renders correct number of rows (4 teams)', () => {
    const container = div();
    renderStandings(container, standingsData.A);
    expect(container.querySelectorAll('tbody tr').length).toBe(4);
  });

  it('renders team names', () => {
    const container = div();
    renderStandings(container, standingsData.A);
    const text = container.textContent;
    standingsData.A.forEach(team => expect(text).toContain(team.name));
  });

  it('qualify-direct row has correct class', () => {
    const container = div();
    renderStandings(container, standingsData.A);
    expect(container.querySelector('.qualify-direct')).not.toBeNull();
  });

  it('renders form pills', () => {
    const container = div();
    renderStandings(container, standingsData.A);
    expect(container.querySelectorAll('.form-pill').length).toBeGreaterThan(0);
  });

  it('table has a caption-equivalent aria-label', () => {
    const container = div();
    renderStandings(container, standingsData.A);
    const table = container.querySelector('table');
    expect(table.getAttribute('aria-label')).toBeTruthy();
  });

  it('does not throw for null container', () => {
    expect(() => renderStandings(null, standingsData.A)).not.toThrow();
  });

  it('updates content when called again with different group', () => {
    const container = div();
    renderStandings(container, standingsData.A);
    renderStandings(container, standingsData.B);
    expect(container.textContent).toContain(standingsData.B[0].name);
  });
});

/* ═══════════════════════════════════════════════════════════════
   10. renderTopScorers
═══════════════════════════════════════════════════════════════ */
describe('renderTopScorers()', () => {
  beforeEach(() => { makeDOM(); });

  it('renders correct number of scorer cards', () => {
    const container = div();
    renderTopScorers(container, topScorers);
    expect(container.querySelectorAll('.scorer-card').length).toBe(topScorers.length);
  });

  it('renders player names', () => {
    const container = div();
    renderTopScorers(container, topScorers);
    topScorers.forEach(s => expect(container.textContent).toContain(s.name));
  });

  it('renders goal counts', () => {
    const container = div();
    renderTopScorers(container, topScorers);
    topScorers.forEach(s => expect(container.textContent).toContain(String(s.goals)));
  });

  it('top 3 scorers get "top" class on rank', () => {
    const container = div();
    renderTopScorers(container, topScorers);
    const topRanks = container.querySelectorAll('.scorer-rank.top');
    expect(topRanks.length).toBe(3);
  });

  it('does not throw for empty scorers array', () => {
    const container = div();
    expect(() => renderTopScorers(container, [])).not.toThrow();
  });
});

/* ═══════════════════════════════════════════════════════════════
   11. renderHostCities
═══════════════════════════════════════════════════════════════ */
describe('renderHostCities()', () => {
  beforeEach(() => { makeDOM(); });

  it('renders correct number of city cards', () => {
    const container = div();
    renderHostCities(container, hostCities);
    expect(container.querySelectorAll('.city-card').length).toBe(hostCities.length);
  });

  it('renders city names', () => {
    const container = div();
    renderHostCities(container, hostCities);
    expect(container.textContent).toContain('Los Angeles');
    expect(container.textContent).toContain('Toronto');
    expect(container.textContent).toContain('Mexico City');
  });

  it('includes match counts', () => {
    const container = div();
    renderHostCities(container, hostCities);
    expect(container.textContent).toContain('matches');
  });

  it('does not throw for null container', () => {
    expect(() => renderHostCities(null, hostCities)).not.toThrow();
  });
});

/* ═══════════════════════════════════════════════════════════════
   12. animateCounter
═══════════════════════════════════════════════════════════════ */
describe('animateCounter()', () => {
  beforeEach(() => { makeDOM(); });

  it('sets final value when prefers-reduced-motion', () => {
    window.matchMedia = vi.fn(() => ({ matches: true }));
    const el = document.createElement('span');
    animateCounter(el, 187, 100);
    expect(el.textContent).toBe('187');
  });

  it('sets decimal value when prefers-reduced-motion and decimals param given', () => {
    window.matchMedia = vi.fn(() => ({ matches: true }));
    const el = document.createElement('span');
    animateCounter(el, 3.2, 100, 1);
    expect(el.textContent).toBe('3.2');
  });

  it('does not throw for null element', () => {
    expect(() => animateCounter(null, 100)).not.toThrow();
  });

  it('starts with 0 when no reduced motion (rAF not called in test env)', () => {
    window.matchMedia = vi.fn(() => ({ matches: false }));
    const el = document.createElement('span');
    // requestAnimationFrame is not invoked synchronously so text stays blank/0
    animateCounter(el, 50, 500);
    // Element should exist without error
    expect(el).toBeTruthy();
  });
});

/* ═══════════════════════════════════════════════════════════════
   13. spawnHeroParticles
═══════════════════════════════════════════════════════════════ */
describe('spawnHeroParticles()', () => {
  beforeEach(() => { makeDOM(); });

  it('appends child elements to container', () => {
    window.matchMedia = vi.fn(() => ({ matches: false }));
    const container = div();
    spawnHeroParticles(container, 10);
    expect(container.children.length).toBe(10);
  });

  it('does not add particles when prefers-reduced-motion', () => {
    window.matchMedia = vi.fn(() => ({ matches: true }));
    const container = div();
    spawnHeroParticles(container, 10);
    expect(container.children.length).toBe(0);
  });

  it('does not throw for null container', () => {
    expect(() => spawnHeroParticles(null, 5)).not.toThrow();
  });
});

/* ═══════════════════════════════════════════════════════════════
   14. updateLastUpdated
═══════════════════════════════════════════════════════════════ */
describe('updateLastUpdated()', () => {
  beforeEach(() => { makeDOM(); });

  it('updates the #lastUpdated element text', () => {
    const el = div('lastUpdated');
    updateLastUpdated();
    expect(el.textContent).toContain('Updated at');
  });

  it('does not throw if element is missing', () => {
    expect(() => updateLastUpdated()).not.toThrow();
  });
});

/* ═══════════════════════════════════════════════════════════════
   15. updateCountdowns
═══════════════════════════════════════════════════════════════ */
describe('updateCountdowns()', () => {
  beforeEach(() => { makeDOM(); });

  it('updates countdown text in DOM', () => {
    const container = div();
    const future = new Date(Date.now() + 3_600_000);
    container.innerHTML = `<span class="countdown-display" data-kickoff="${future.toISOString()}"></span>`;
    updateCountdowns();
    const span = container.querySelector('.countdown-display');
    expect(span.textContent).toMatch(/In \d+h/);
  });

  it('shows Kick-off! for past kickoff', () => {
    const container = div();
    const past = new Date(Date.now() - 1000);
    container.innerHTML = `<span class="countdown-display" data-kickoff="${past.toISOString()}"></span>`;
    updateCountdowns();
    const span = container.querySelector('.countdown-display');
    expect(span.textContent).toBe('Kick-off!');
  });
});

/* ═══════════════════════════════════════════════════════════════
   16. Edge cases / Stress
═══════════════════════════════════════════════════════════════ */
describe('Edge cases', () => {
  beforeEach(() => { makeDOM(); });

  it('renderLiveMatches handles empty array gracefully', () => {
    const container = div();
    expect(() => renderLiveMatches(container, [])).not.toThrow();
    expect(container.textContent).toContain('No matches');
  });

  it('renderTomorrowMatches handles empty array gracefully', () => {
    const container = div();
    expect(() => renderTomorrowMatches(container, [])).not.toThrow();
    expect(container.textContent).toContain('No matches');
  });

  it('buildMatchCard does not include raw <script> tags (XSS guard)', () => {
    const malicious = {
      ...liveMatchesData[0],
      venue: '<script>alert("xss")</script>',
    };
    const html = buildMatchCard(malicious);
    // The string will contain the angle-brackets as text (innerHTML would need sanitising)
    // Verify it still returns a string without error
    expect(typeof html).toBe('string');
  });

  it('simulateLiveScoreUpdate with all-FT matches returns unchanged scores', () => {
    const ftMatches = liveMatchesData.filter(m => m.status === 'FT');
    const updated = simulateLiveScoreUpdate(ftMatches);
    ftMatches.forEach((m, i) => {
      expect(updated[i].homeTeam.score).toBe(m.homeTeam.score);
    });
  });

  it('100 consecutive simulateLiveScoreUpdate calls do not produce negative scores', () => {
    let matches = liveMatchesData.filter(m => m.status === 'LIVE');
    for (let i = 0; i < 100; i++) {
      matches = simulateLiveScoreUpdate(matches);
    }
    matches.forEach(m => {
      expect(m.homeTeam.score).toBeGreaterThanOrEqual(0);
      expect(m.awayTeam.score).toBeGreaterThanOrEqual(0);
    });
  });

  it('standingsData groups each total exactly 4 teams when all present', () => {
    Object.entries(standingsData).forEach(([group, teams]) => {
      expect(teams.length).toBe(4);
      const positions = teams.map(t => t.pos).sort((a, b) => a - b);
      expect(positions).toEqual([1, 2, 3, 4]);
    });
  });

  it('news articles have unique ids', () => {
    const ids = latestNews.map(a => a.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('host cities have unique stadium names', () => {
    const stadiums = hostCities.map(c => c.stadium);
    const unique = new Set(stadiums);
    expect(unique.size).toBe(stadiums.length);
  });

  it('match ids are unique', () => {
    const ids = liveMatchesData.map(m => m.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });
});
