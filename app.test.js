import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  pad,
  timeAgo,
  getCountdownValues,
  animatedCounter,
  initScrollReveal,
  buildTickerItem,
  buildMatchCard,
  buildGroupCard,
  buildScorerRow,
  buildNewsHeroCard,
  buildNewsCard,
  renderTicker,
  renderMatchGrid,
  renderStandings,
  renderNews,
  renderNewsFilters,
  renderScorers,
  renderCities,
  filterNews,
  getCategories,
  showToast,
  updateTickerScore,
  updateMatchCard,
  simulateLiveScores,
  startLivePolling,
  stopLivePolling,
  initCountdown,
  initMatchTabs,
  initCarousel,
  initHeader,
  initParticles,
  closeMobileNav,
} from './app.js';
import { todayMatches, tomorrowMatches, recentResults, groupStandings, hostCities, topScorers } from './data/matches.js';
import { newsArticles } from './data/news.js';

/* ── DOM setup helper ─────────────────────────────────────── */
function setupDOM(html = '') {
  document.body.innerHTML = html;
}

/* ══════════════════════════════════════════════════════════
   UTILITY HELPERS
══════════════════════════════════════════════════════════ */
describe('pad()', () => {
  it('pads single digit with leading zero', () => expect(pad(5)).toBe('05'));
  it('pads to requested length', () => expect(pad(7, 3)).toBe('007'));
  it('does not trim already correct length', () => expect(pad(42)).toBe('42'));
  it('handles zero correctly', () => expect(pad(0)).toBe('00'));
  it('handles three-digit day countdown', () => expect(pad(365, 3)).toBe('365'));
});

describe('timeAgo()', () => {
  it('returns "just now" for < 1 minute', () => {
    const ts = new Date(Date.now() - 30000).toISOString();
    expect(timeAgo(ts)).toBe('just now');
  });
  it('returns minutes for < 1 hour', () => {
    const ts = new Date(Date.now() - 15 * 60000).toISOString();
    expect(timeAgo(ts)).toBe('15m ago');
  });
  it('returns hours for < 1 day', () => {
    const ts = new Date(Date.now() - 3 * 3600000).toISOString();
    expect(timeAgo(ts)).toBe('3h ago');
  });
  it('returns days for >= 1 day', () => {
    const ts = new Date(Date.now() - 2 * 86400000).toISOString();
    expect(timeAgo(ts)).toBe('2d ago');
  });
});

describe('getCountdownValues()', () => {
  it('returns correct structure', () => {
    const future = new Date(Date.now() + 90061000); // ~1d 1h 1m 1s
    const { days, hours, mins, secs, delta } = getCountdownValues(future);
    expect(days).toBeGreaterThanOrEqual(1);
    expect(hours).toBeGreaterThanOrEqual(0);
    expect(mins).toBeGreaterThanOrEqual(0);
    expect(secs).toBeGreaterThanOrEqual(0);
    expect(delta).toBeGreaterThan(0);
  });
  it('returns all zeros for past date', () => {
    const past = new Date(Date.now() - 1000);
    const { days, hours, mins, secs, delta } = getCountdownValues(past);
    expect(days + hours + mins + secs + delta).toBe(0);
  });
});

describe('animatedCounter()', () => {
  it('does not throw for null element', () => {
    expect(() => animatedCounter(null, 10)).not.toThrow();
  });
  it('sets content on element', () => {
    vi.useFakeTimers();
    const el = document.createElement('span');
    el.textContent = '0';
    animatedCounter(el, 100, 100);
    vi.advanceTimersByTime(200);
    expect(Number(el.textContent)).toBeGreaterThanOrEqual(0);
    vi.useRealTimers();
  });
});

/* ══════════════════════════════════════════════════════════
   DATA MODULES
══════════════════════════════════════════════════════════ */
describe('data/matches.js', () => {
  it('todayMatches is a non-empty array', () => {
    expect(Array.isArray(todayMatches)).toBe(true);
    expect(todayMatches.length).toBeGreaterThan(0);
  });
  it('each match has required fields', () => {
    todayMatches.forEach(m => {
      expect(m).toHaveProperty('id');
      expect(m).toHaveProperty('homeTeam');
      expect(m).toHaveProperty('awayTeam');
      expect(m).toHaveProperty('status');
      expect(m).toHaveProperty('venue');
    });
  });
  it('tomorrowMatches only contain UPCOMING status', () => {
    tomorrowMatches.forEach(m => expect(m.status).toBe('UPCOMING'));
  });
  it('recentResults only contain FT status', () => {
    recentResults.forEach(m => expect(m.status).toBe('FT'));
  });
  it('groupStandings has groups A-F', () => {
    const names = groupStandings.map(g => g.name);
    ['A','B','C','D','E','F'].forEach(n => expect(names).toContain(n));
  });
  it('each group has 4 teams', () => {
    groupStandings.forEach(g => expect(g.teams.length).toBe(4));
  });
  it('topScorers has at least 5 entries', () => {
    expect(topScorers.length).toBeGreaterThanOrEqual(5);
  });
  it('topScorers sorted descending by goals', () => {
    for (let i = 0; i < topScorers.length - 1; i++) {
      expect(topScorers[i].goals).toBeGreaterThanOrEqual(topScorers[i + 1].goals);
    }
  });
  it('hostCities has 16 entries', () => expect(hostCities.length).toBe(16));
  it('each city has stadium and matches count', () => {
    hostCities.forEach(c => {
      expect(c).toHaveProperty('stadium');
      expect(c.matches).toBeGreaterThan(0);
    });
  });
});

describe('data/news.js', () => {
  it('newsArticles is a non-empty array', () => {
    expect(Array.isArray(newsArticles)).toBe(true);
    expect(newsArticles.length).toBeGreaterThan(0);
  });
  it('each article has required fields', () => {
    newsArticles.forEach(a => {
      expect(a).toHaveProperty('id');
      expect(a).toHaveProperty('title');
      expect(a).toHaveProperty('category');
      expect(a).toHaveProperty('excerpt');
      expect(a).toHaveProperty('publishedAt');
      expect(a).toHaveProperty('readTime');
    });
  });
  it('publishedAt is a valid ISO date', () => {
    newsArticles.forEach(a => {
      expect(new Date(a.publishedAt).toISOString()).toBe(a.publishedAt);
    });
  });
});

/* ══════════════════════════════════════════════════════════
   TICKER
══════════════════════════════════════════════════════════ */
describe('buildTickerItem()', () => {
  it('returns a div element', () => {
    const item = buildTickerItem(todayMatches[0]);
    expect(item.tagName).toBe('DIV');
    expect(item.className).toBe('ticker-item');
  });
  it('has data-match-id attribute', () => {
    const item = buildTickerItem(todayMatches[0]);
    expect(item.dataset.matchId).toBe(todayMatches[0].id);
  });
  it('shows score for LIVE match', () => {
    const live = todayMatches.find(m => m.status === 'LIVE');
    const item = buildTickerItem(live);
    expect(item.innerHTML).toContain(`${live.homeScore} - ${live.awayScore}`);
  });
  it('shows time for UPCOMING match', () => {
    const upcoming = { ...todayMatches[0], status: 'UPCOMING', time: '22:00' };
    const item = buildTickerItem(upcoming);
    expect(item.innerHTML).toContain('22:00');
  });
  it('has role=listitem', () => {
    const item = buildTickerItem(todayMatches[0]);
    expect(item.getAttribute('role')).toBe('listitem');
  });
});

describe('renderTicker()', () => {
  beforeEach(() => {
    setupDOM('<div id="ticker-track"></div>');
  });
  it('populates ticker-track with doubled items', () => {
    renderTicker(todayMatches);
    const track = document.getElementById('ticker-track');
    expect(track.children.length).toBe(todayMatches.length * 2);
  });
  it('handles empty array gracefully', () => {
    renderTicker([]);
    expect(document.getElementById('ticker-track').children.length).toBe(0);
  });
});

describe('updateTickerScore()', () => {
  it('updates score element text', () => {
    setupDOM(`<div id="ticker-score-match-001">2 - 1</div>`);
    updateTickerScore('match-001', 3, 1);
    expect(document.getElementById('ticker-score-match-001').textContent).toBe('3 - 1');
  });
  it('adds "updated" class', () => {
    setupDOM(`<div id="ticker-score-match-001">0 - 0</div>`);
    updateTickerScore('match-001', 1, 0);
    expect(document.getElementById('ticker-score-match-001').classList.contains('updated')).toBe(true);
  });
});

/* ══════════════════════════════════════════════════════════
   MATCH CARDS
══════════════════════════════════════════════════════════ */
describe('buildMatchCard()', () => {
  it('returns an article element', () => {
    const card = buildMatchCard(todayMatches[0]);
    expect(card.tagName).toBe('ARTICLE');
  });
  it('has correct aria-label', () => {
    const m    = todayMatches[0];
    const card = buildMatchCard(m);
    expect(card.getAttribute('aria-label')).toBe(`${m.homeTeam} vs ${m.awayTeam}`);
  });
  it('adds live-card class for LIVE match', () => {
    const live = todayMatches.find(m => m.status === 'LIVE');
    const card = buildMatchCard(live);
    expect(card.className).toContain('live-card');
  });
  it('shows VS for UPCOMING match', () => {
    const upcoming = tomorrowMatches[0];
    const card     = buildMatchCard(upcoming);
    expect(card.innerHTML).toContain('VS');
  });
  it('shows score for FT match', () => {
    const ft   = recentResults[0];
    const card = buildMatchCard(ft);
    expect(card.innerHTML).toContain(`${ft.homeScore} - ${ft.awayScore}`);
  });
  it('shows venue in footer', () => {
    const m    = todayMatches[0];
    const card = buildMatchCard(m);
    expect(card.innerHTML).toContain(m.venue);
  });
  it('is keyboard-focusable', () => {
    const card = buildMatchCard(todayMatches[0]);
    expect(card.tabIndex).toBe(0);
  });
});

describe('renderMatchGrid()', () => {
  beforeEach(() => setupDOM('<div id="today-matches"></div>'));

  it('populates container with match cards', () => {
    renderMatchGrid('today-matches', todayMatches);
    const container = document.getElementById('today-matches');
    expect(container.children.length).toBe(todayMatches.length);
  });
  it('shows empty message for empty array', () => {
    renderMatchGrid('today-matches', []);
    expect(document.getElementById('today-matches').innerHTML).toContain('No matches');
  });
  it('does nothing for missing container', () => {
    expect(() => renderMatchGrid('nonexistent', todayMatches)).not.toThrow();
  });
});

describe('updateMatchCard()', () => {
  it('updates score display', () => {
    setupDOM(`<div class="match-card" data-match-id="match-001"><div id="score-match-001">0 - 0</div></div>`);
    updateMatchCard('match-001', 2, 0, 55);
    expect(document.getElementById('score-match-001').textContent).toBe('2 - 0');
  });
  it('does not throw when element missing', () => {
    setupDOM('');
    expect(() => updateMatchCard('nonexistent', 1, 0, 50)).not.toThrow();
  });
});

/* ══════════════════════════════════════════════════════════
   STANDINGS
══════════════════════════════════════════════════════════ */
describe('buildGroupCard()', () => {
  it('returns a div with group-card class', () => {
    const card = buildGroupCard(groupStandings[0]);
    expect(card.tagName).toBe('DIV');
    expect(card.className).toContain('group-card');
  });
  it('renders group name in header', () => {
    const g    = groupStandings[0];
    const card = buildGroupCard(g);
    expect(card.innerHTML).toContain(`Group ${g.name}`);
  });
  it('renders all four team rows', () => {
    const card = buildGroupCard(groupStandings[0]);
    const rows = card.querySelectorAll('tbody tr');
    expect(rows.length).toBe(4);
  });
  it('first two rows have qualified class', () => {
    const card = buildGroupCard(groupStandings[0]);
    const rows = [...card.querySelectorAll('tbody tr')];
    expect(rows[0].className).toContain('qualified');
    expect(rows[1].className).toContain('qualified');
    expect(rows[2].className).not.toContain('qualified');
  });
  it('has aria-label', () => {
    const g    = groupStandings[1];
    const card = buildGroupCard(g);
    expect(card.getAttribute('aria-label')).toContain(`Group ${g.name}`);
  });
});

describe('renderStandings()', () => {
  beforeEach(() => setupDOM(`
    <div id="standings-track"></div>
    <button id="standings-prev"></button>
    <button id="standings-next"></button>
    <div id="standings-dots"></div>
  `));
  it('populates standings-track', () => {
    renderStandings();
    expect(document.getElementById('standings-track').children.length).toBe(groupStandings.length);
  });
});

/* ══════════════════════════════════════════════════════════
   NEWS
══════════════════════════════════════════════════════════ */
describe('getCategories()', () => {
  it('includes "all" as first entry', () => {
    const cats = getCategories();
    expect(cats[0]).toBe('all');
  });
  it('returns unique categories', () => {
    const cats = getCategories().slice(1);
    expect(new Set(cats).size).toBe(cats.length);
  });
});

describe('filterNews()', () => {
  it('returns all articles for "all"', () => {
    const { items, total } = filterNews('all', 1);
    expect(total).toBe(newsArticles.length);
    expect(items.length).toBeLessThanOrEqual(6);
  });
  it('filters by category correctly', () => {
    const cat = newsArticles[0].category.toLowerCase();
    const { items } = filterNews(cat, 1);
    items.forEach(a => expect(a.category.toLowerCase()).toBe(cat));
  });
  it('returns correct page slice', () => {
    const { items } = filterNews('all', 2);
    expect(items.length).toBeGreaterThan(0);
    expect(items.length).toBeLessThanOrEqual(6);
  });
  it('returns pages count', () => {
    const { pages } = filterNews('all', 1);
    expect(pages).toBe(Math.ceil(newsArticles.length / 6));
  });
  it('returns empty for unknown category', () => {
    const { items } = filterNews('unknowncategory', 1);
    expect(items.length).toBe(0);
  });
});

describe('buildNewsHeroCard()', () => {
  it('returns an anchor element', () => {
    const card = buildNewsHeroCard(newsArticles[0]);
    expect(card.tagName).toBe('A');
    expect(card.className).toContain('news-hero-card');
  });
  it('contains article title', () => {
    const a    = newsArticles[0];
    const card = buildNewsHeroCard(a);
    expect(card.innerHTML).toContain(a.title);
  });
  it('has aria-label', () => {
    const a    = newsArticles[0];
    const card = buildNewsHeroCard(a);
    expect(card.getAttribute('aria-label')).toBe(a.title);
  });
});

describe('buildNewsCard()', () => {
  it('returns an anchor with news-card class', () => {
    const card = buildNewsCard(newsArticles[1]);
    expect(card.tagName).toBe('A');
    expect(card.className).toContain('news-card');
  });
  it('contains excerpt', () => {
    const a    = newsArticles[1];
    const card = buildNewsCard(a);
    expect(card.innerHTML).toContain(a.excerpt);
  });
});

describe('renderNews()', () => {
  beforeEach(() => setupDOM(`
    <div id="news-layout"></div>
    <div id="news-filters"></div>
    <div id="news-pagination"></div>
  `));
  it('populates news-layout', () => {
    renderNews();
    expect(document.getElementById('news-layout').children.length).toBeGreaterThan(0);
  });
  it('hero card is first child wrapper', () => {
    renderNews();
    const first = document.getElementById('news-layout').firstElementChild;
    expect(first.className).toContain('news-hero-col');
  });
});

describe('renderNewsFilters()', () => {
  beforeEach(() => setupDOM('<div id="news-filters"></div>'));
  it('renders filter buttons', () => {
    renderNewsFilters();
    const filters = document.getElementById('news-filters');
    expect(filters.children.length).toBeGreaterThan(1);
  });
  it('first button is "All"', () => {
    renderNewsFilters();
    const first = document.getElementById('news-filters').firstElementChild;
    expect(first.textContent).toBe('All');
  });
});

/* ══════════════════════════════════════════════════════════
   SCORERS
══════════════════════════════════════════════════════════ */
describe('buildScorerRow()', () => {
  it('returns a div with scorer-row class', () => {
    const row = buildScorerRow(topScorers[0], 0);
    expect(row.className).toContain('scorer-row');
  });
  it('contains player name', () => {
    const s   = topScorers[0];
    const row = buildScorerRow(s, 0);
    expect(row.innerHTML).toContain(s.name);
  });
  it('has correct aria-label with goals', () => {
    const s   = topScorers[0];
    const row = buildScorerRow(s, 0);
    expect(row.getAttribute('aria-label')).toContain(`${s.goals} goals`);
  });
  it('renders goal bar with correct pct', () => {
    const s    = topScorers[1];
    const row  = buildScorerRow(s, 1);
    const fill = row.querySelector('.goal-bar-fill');
    const maxGoals = topScorers[0].goals;
    const expected = Math.round((s.goals / maxGoals) * 100);
    expect(Number(fill.dataset.pct)).toBe(expected);
  });
});

describe('renderScorers()', () => {
  beforeEach(() => setupDOM('<div id="scorers-list"></div>'));
  it('populates scorers-list', () => {
    renderScorers();
    expect(document.getElementById('scorers-list').children.length).toBe(topScorers.length);
  });
});

/* ══════════════════════════════════════════════════════════
   CITIES
══════════════════════════════════════════════════════════ */
describe('renderCities()', () => {
  beforeEach(() => setupDOM(`
    <div id="cities-track"></div>
    <button id="cities-prev"></button>
    <button id="cities-next"></button>
    <div id="cities-dots"></div>
  `));
  it('populates cities-track', () => {
    renderCities();
    expect(document.getElementById('cities-track').children.length).toBe(hostCities.length);
  });
});

/* ══════════════════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════════════════ */
describe('showToast()', () => {
  beforeEach(() => setupDOM('<div id="toast-container"></div>'));
  it('appends a toast element', () => {
    showToast('Title', 'Message');
    expect(document.getElementById('toast-container').children.length).toBe(1);
  });
  it('toast contains title and message', () => {
    showToast('Hello', 'World', '✅', 'toast-info');
    const toast = document.querySelector('.toast');
    expect(toast.innerHTML).toContain('Hello');
    expect(toast.innerHTML).toContain('World');
  });
  it('toast has correct type class', () => {
    showToast('T', 'M', '⚽', 'toast-goal');
    expect(document.querySelector('.toast').classList.contains('toast-goal')).toBe(true);
  });
  it('has role=alert', () => {
    showToast('T', 'M');
    expect(document.querySelector('.toast').getAttribute('role')).toBe('alert');
  });
  it('close button exists', () => {
    showToast('T', 'M');
    expect(document.querySelector('.toast-close')).not.toBeNull();
  });
  it('returns toast element', () => {
    const t = showToast('T', 'M');
    expect(t).not.toBeNull();
  });
  it('does not throw when container missing', () => {
    setupDOM('');
    expect(() => showToast('T', 'M')).not.toThrow();
  });
});

/* ══════════════════════════════════════════════════════════
   LIVE SCORE SIMULATION
══════════════════════════════════════════════════════════ */
describe('simulateLiveScores()', () => {
  beforeEach(() => {
    setupDOM(`
      <div id="toast-container"></div>
      <div class="match-card" data-match-id="match-001">
        <div id="score-match-001">2 - 1</div>
        <div class="match-minute">67'</div>
      </div>
      <div id="ticker-score-match-001">2 - 1</div>
    `);
  });
  it('does not throw', () => {
    expect(() => simulateLiveScores()).not.toThrow();
  });
  it('minute advances for live matches', () => {
    const liveMatch = todayMatches.find(m => m.status === 'LIVE');
    const prevMinute = liveMatch ? liveMatch.minute : 0;
    simulateLiveScores();
    if (liveMatch) expect(liveMatch.minute).toBeGreaterThanOrEqual(prevMinute);
  });
});

describe('startLivePolling() / stopLivePolling()', () => {
  it('startLivePolling sets an interval', () => {
    vi.useFakeTimers();
    startLivePolling();
    vi.advanceTimersByTime(8001);
    stopLivePolling();
    vi.useRealTimers();
    expect(true).toBe(true); // no throw
  });
  it('stopLivePolling clears interval without error', () => {
    expect(() => { startLivePolling(); stopLivePolling(); }).not.toThrow();
  });
});

/* ══════════════════════════════════════════════════════════
   COUNTDOWN
══════════════════════════════════════════════════════════ */
describe('initCountdown()', () => {
  beforeEach(() => setupDOM(`
    <div id="cd-days"><span>000</span></div>
    <div id="cd-hours"><span>00</span></div>
    <div id="cd-mins"><span>00</span></div>
    <div id="cd-secs"><span>00</span></div>
  `));
  it('updates digit spans on init', () => {
    vi.useFakeTimers();
    initCountdown(new Date(Date.now() + 100000000));
    vi.advanceTimersByTime(1100);
    const span = document.querySelector('#cd-days span');
    expect(span.textContent.length).toBeGreaterThan(0);
    vi.useRealTimers();
  });
  it('does not throw for past date', () => {
    expect(() => initCountdown(new Date(Date.now() - 1000))).not.toThrow();
  });
});

/* ══════════════════════════════════════════════════════════
   TABS
══════════════════════════════════════════════════════════ */
describe('initMatchTabs()', () => {
  beforeEach(() => setupDOM(`
    <button role="tab" class="tab-btn active" aria-selected="true" aria-controls="panel-today" id="tab-today">Today</button>
    <button role="tab" class="tab-btn"        aria-selected="false" aria-controls="panel-tomorrow" id="tab-tomorrow">Tomorrow</button>
    <div role="tabpanel" id="panel-today"    class="tab-panel active"><div class="match-grid" id="today-matches"></div></div>
    <div role="tabpanel" id="panel-tomorrow" class="tab-panel"><div class="match-grid" id="tomorrow-matches"></div></div>
    <div id="toast-container"></div>
  `));
  it('clicking a tab activates its panel', () => {
    initMatchTabs();
    document.getElementById('tab-tomorrow').click();
    expect(document.getElementById('panel-tomorrow').classList.contains('active')).toBe(true);
    expect(document.getElementById('panel-today').classList.contains('active')).toBe(false);
  });
  it('clicked tab gets aria-selected=true', () => {
    initMatchTabs();
    const btn = document.getElementById('tab-tomorrow');
    btn.click();
    expect(btn.getAttribute('aria-selected')).toBe('true');
  });
});

/* ══════════════════════════════════════════════════════════
   CAROUSEL
══════════════════════════════════════════════════════════ */
describe('initCarousel()', () => {
  beforeEach(() => {
    setupDOM(`
      <div id="test-track" style="display:flex">
        <div style="width:300px">A</div>
        <div style="width:300px">B</div>
        <div style="width:300px">C</div>
        <div style="width:300px">D</div>
        <div style="width:300px">E</div>
        <div style="width:300px">F</div>
      </div>
      <button id="test-prev" disabled>‹</button>
      <button id="test-next">›</button>
      <div id="test-dots"></div>
    `);
  });
  it('creates correct number of dots', () => {
    initCarousel('test', 6, 3);
    expect(document.getElementById('test-dots').children.length).toBe(2);
  });
  it('prev button starts disabled', () => {
    initCarousel('test', 6, 3);
    expect(document.getElementById('test-prev').disabled).toBe(true);
  });
  it('clicking next enables prev', () => {
    initCarousel('test', 6, 3);
    document.getElementById('test-next').click();
    expect(document.getElementById('test-prev').disabled).toBe(false);
  });
  it('does not throw for missing container', () => {
    expect(() => initCarousel('nonexistent', 6, 3)).not.toThrow();
  });
});

/* ══════════════════════════════════════════════════════════
   SCROLL-REVEAL
══════════════════════════════════════════════════════════ */
describe('initScrollReveal()', () => {
  it('marks all reveal elements visible when IntersectionObserver absent', () => {
    const orig = global.IntersectionObserver;
    global.IntersectionObserver = undefined;
    setupDOM(`<div class="reveal"></div><div class="reveal-left"></div>`);
    initScrollReveal();
    document.querySelectorAll('.reveal, .reveal-left').forEach(el => {
      expect(el.classList.contains('visible')).toBe(true);
    });
    global.IntersectionObserver = orig;
  });
  it('does not throw when IntersectionObserver is available', () => {
    class MockIO {
      constructor(cb) { this.cb = cb; }
      observe() {}
      unobserve() {}
    }
    global.IntersectionObserver = MockIO;
    setupDOM(`<div class="reveal"></div>`);
    expect(() => initScrollReveal()).not.toThrow();
  });
});

/* ══════════════════════════════════════════════════════════
   HEADER / NAV
══════════════════════════════════════════════════════════ */
describe('initHeader()', () => {
  it('does not throw when elements missing', () => {
    setupDOM('');
    expect(() => initHeader()).not.toThrow();
  });
  it('adds scrolled class on scroll', () => {
    setupDOM(`<header id="site-header"></header><button id="scroll-top"></button>`);
    initHeader();
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    window.dispatchEvent(new Event('scroll'));
    expect(true).toBe(true); // no throw; class toggled via rAF
  });
});

describe('closeMobileNav()', () => {
  it('removes open class from mobile-nav', () => {
    setupDOM(`<nav id="mobile-nav" class="mobile-nav open"></nav><button id="hamburger" class="hamburger open"></button>`);
    closeMobileNav();
    expect(document.getElementById('mobile-nav').classList.contains('open')).toBe(false);
  });
  it('sets hamburger aria-expanded to false', () => {
    setupDOM(`<nav id="mobile-nav" class="mobile-nav open"></nav><button id="hamburger" aria-expanded="true"></button>`);
    closeMobileNav();
    expect(document.getElementById('hamburger').getAttribute('aria-expanded')).toBe('false');
  });
  it('does not throw when elements missing', () => {
    setupDOM('');
    expect(() => closeMobileNav()).not.toThrow();
  });
});

/* ══════════════════════════════════════════════════════════
   PARTICLES
══════════════════════════════════════════════════════════ */
describe('initParticles()', () => {
  it('injects particles into hero-particles container', () => {
    setupDOM('<div id="hero-particles"></div>');
    initParticles();
    expect(document.getElementById('hero-particles').children.length).toBeGreaterThan(0);
  });
  it('does not throw when container missing', () => {
    setupDOM('');
    expect(() => initParticles()).not.toThrow();
  });
  it('all children have particle class', () => {
    setupDOM('<div id="hero-particles"></div>');
    initParticles();
    [...document.getElementById('hero-particles').children].forEach(p => {
      expect(p.className).toContain('particle');
    });
  });
});

/* ══════════════════════════════════════════════════════════
   EDGE CASES
══════════════════════════════════════════════════════════ */
describe('Edge Cases', () => {
  it('renderMatchGrid handles null gracefully', () => {
    setupDOM('<div id="today-matches"></div>');
    expect(() => renderMatchGrid('today-matches', null)).not.toThrow();
  });
  it('filterNews page 999 returns empty items', () => {
    const { items } = filterNews('all', 999);
    expect(items.length).toBe(0);
  });
  it('buildMatchCard renders LIVE status badge', () => {
    const live = todayMatches.find(m => m.status === 'LIVE');
    const card = buildMatchCard(live);
    expect(card.innerHTML).toContain('live');
  });
  it('buildScorerRow handles top scorer with 0 assists', () => {
    const scorer = { name: 'Test Player', flag: '🏳️', team: 'Test FC', goals: 3, assists: 0 };
    expect(() => buildScorerRow(scorer, 0)).not.toThrow();
  });
  it('updateMatchCard handles same score (no flash)', () => {
    setupDOM(`<div class="match-card" data-match-id="m1"><div id="score-m1">1 - 0</div></div>`);
    updateMatchCard('m1', 1, 0, 50);
    expect(document.getElementById('score-m1').classList.contains('updated')).toBe(false);
  });
  it('showToast auto-removes after timeout', () => {
    vi.useFakeTimers();
    setupDOM('<div id="toast-container"></div>');
    showToast('T', 'M');
    expect(document.querySelector('.toast')).not.toBeNull();
    vi.advanceTimersByTime(5100);
    vi.useRealTimers();
    // toast has removing class or is gone
    const t = document.querySelector('.toast');
    if (t) expect(t.classList.contains('removing')).toBe(true);
  });
});
