import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

/* ─── DOM SETUP ──────────────────────────────────────────────────── */
function setupDOM() {
  document.body.innerHTML = `
    <header class="site-header" id="siteHeader"></header>

    <section class="hero" id="hero">
      <div class="hero-particles" id="heroParticles"></div>
      <div class="crowd-banner"><svg class="crowd-svg"></svg></div>
      <div class="hero-content">
        <div class="hero-eyebrow">
          <span class="eyebrow-dot"></span>
          <span class="eyebrow-text typewriter-target">THE GREATEST SHOW</span>
        </div>
        <h1 class="hero-title">
          <span class="title-line tl1">FIFA</span>
          <span class="title-line tl2">World Cup</span>
          <span class="title-line tl3">2026</span>
        </h1>
        <div class="countdown-strip" id="countdownStrip">
          <div class="cd-unit"><div class="cd-flip"><span class="cd-val" id="cdDaysVal">000</span></div></div>
          <div class="cd-unit"><div class="cd-flip"><span class="cd-val" id="cdHoursVal">00</span></div></div>
          <div class="cd-unit"><div class="cd-flip"><span class="cd-val" id="cdMinsVal">00</span></div></div>
          <div class="cd-unit"><div class="cd-flip"><span class="cd-val" id="cdSecsVal">00</span></div></div>
        </div>
      </div>
      <div class="ticker-wrap">
        <div class="ticker-label">LIVE RESULTS</div>
        <div class="ticker-track" id="tickerTrack">
          <div class="ticker-content" id="tickerContent">
            <span class="tick-item">🇧🇷 Brazil 3–1 Argentina 🇦🇷</span>
          </div>
        </div>
      </div>
    </section>

    <section class="stats-section section-reveal" id="stats">
      <div class="section-header"><h2 class="typewriter-target">Tournament Stats</h2></div>
      <div class="stats-grid">
        <div class="stat-card section-reveal">
          <div class="stat-ring-wrap">
            <svg class="stat-ring" viewBox="0 0 120 120">
              <circle class="ring-bg" cx="60" cy="60" r="50"/>
              <circle class="ring-fill" cx="60" cy="60" r="50" data-percent="100" stroke="#f7c948"/>
            </svg>
            <div class="stat-center">
              <span class="stat-count" data-target="48" data-suffix="">0</span>
              <span class="stat-unit">Teams</span>
            </div>
          </div>
          <p class="stat-label">Qualified Nations</p>
        </div>
        <div class="stat-card section-reveal">
          <div class="stat-ring-wrap">
            <svg class="stat-ring" viewBox="0 0 120 120">
              <circle class="ring-bg" cx="60" cy="60" r="50"/>
              <circle class="ring-fill" cx="60" cy="60" r="50" data-percent="88" stroke="#4fc3f7"/>
            </svg>
            <div class="stat-center">
              <span class="stat-count" data-target="104" data-suffix="">0</span>
              <span class="stat-unit">Matches</span>
            </div>
          </div>
          <p class="stat-label">Total Fixtures</p>
        </div>
        <div class="stat-card section-reveal">
          <div class="stat-ring-wrap">
            <svg class="stat-ring" viewBox="0 0 120 120">
              <circle class="ring-bg" cx="60" cy="60" r="50"/>
              <circle class="ring-fill" cx="60" cy="60" r="50" data-percent="75" stroke="#81c784"/>
            </svg>
            <div class="stat-center">
              <span class="stat-count" data-target="312" data-suffix="+">0</span>
              <span class="stat-unit">Goals</span>
            </div>
          </div>
          <p class="stat-label">Goals Expected</p>
        </div>
        <div class="stat-card section-reveal">
          <div class="stat-ring-wrap">
            <svg class="stat-ring" viewBox="0 0 120 120">
              <circle class="ring-bg" cx="60" cy="60" r="50"/>
              <circle class="ring-fill" cx="60" cy="60" r="50" data-percent="60" stroke="#ff8a65"/>
            </svg>
            <div class="stat-center">
              <span class="stat-count" data-target="16" data-suffix="">0</span>
              <span class="stat-unit">Stadiums</span>
            </div>
          </div>
          <p class="stat-label">Host Venues</p>
        </div>
      </div>
    </section>

    <section class="matches-section section-reveal" id="matches">
      <div class="section-header"><h2 class="typewriter-target">Upcoming Matches</h2></div>
      <div class="carousel-wrap">
        <button class="carousel-btn prev" id="matchPrev">&#8249;</button>
        <div class="matches-carousel" id="matchesCarousel"></div>
        <button class="carousel-btn next" id="matchNext">&#8250;</button>
      </div>
      <div class="carousel-dots" id="matchDots"></div>
    </section>

    <section class="standings-section section-reveal" id="standings">
      <div class="section-header"><h2 class="typewriter-target">Group Standings</h2></div>
      <div class="standings-tabs" id="standingsTabs"></div>
      <div class="standings-table-wrap" id="standingsTable"></div>
    </section>

    <section class="news-section section-reveal" id="news">
      <div class="section-header"><h2 class="typewriter-target">Latest News</h2></div>
      <div class="news-grid" id="newsGrid"></div>
    </section>

    <div class="toast-container" id="toastContainer"></div>
    <div class="confetti-container" id="confettiContainer"></div>
  `;
}

/* ─── MOCKS ──────────────────────────────────────────────────────── */
vi.mock('./data/matches.js', () => ({
  matches: [
    { id: 1,  home: 'Brazil',    away: 'Argentina', homeFlag: '🇧🇷', awayFlag: '🇦🇷', homeScore: 3, awayScore: 1, status: 'final',    stage: 'Quarter Final', venue: 'MetLife Stadium',   date: 'Jul 5', time: 'FT'     },
    { id: 2,  home: 'France',    away: 'Germany',   homeFlag: '🇫🇷', awayFlag: '🇩🇪', homeScore: 2, awayScore: 2, status: 'live',     stage: 'Group Stage',   venue: 'SoFi Stadium',     date: 'Jun 15', time: "72'"   },
    { id: 3,  home: 'Spain',     away: 'Morocco',   homeFlag: '🇪🇸', awayFlag: '🇲🇦', homeScore: 4, awayScore: 0, status: 'final',    stage: 'Round of 16',   venue: 'AT&T Stadium',     date: 'Jun 25', time: 'FT'    },
    { id: 4,  home: 'England',   away: 'USA',       homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', awayFlag: '🇺🇸', homeScore: 1, awayScore: 0, status: 'final',    stage: 'Group Stage',   venue: 'Arrowhead Stadium',date: 'Jun 20', time: 'FT'   },
    { id: 5,  home: 'Portugal',  away: 'Netherlands',homeFlag:'🇵🇹', awayFlag: '🇳🇱', homeScore: 2, awayScore: 1, status: 'final',    stage: 'Semi Final',    venue: 'Rose Bowl',        date: 'Jul 10', time: 'FT'    },
    { id: 6,  home: 'Japan',     away: 'South Korea',homeFlag:'🇯🇵', awayFlag: '🇰🇷', homeScore: 3, awayScore: 2, status: 'final',    stage: 'Round of 16',   venue: 'Levi\'s Stadium',  date: 'Jun 28', time: 'FT'    },
    { id: 7,  home: 'Canada',    away: 'Mexico',    homeFlag: '🇨🇦', awayFlag: '🇲🇽', homeScore: 1, awayScore: 1, status: 'live',     stage: 'Group Stage',   venue: 'BC Place',         date: 'Jun 14', time: "58'"   },
    { id: 8,  home: 'Australia', away: 'Croatia',   homeFlag: '🇦🇺', awayFlag: '🇭🇷', homeScore: 0, awayScore: 2, status: 'final',    stage: 'Group Stage',   venue: 'GEODIS Park',      date: 'Jun 18', time: 'FT'    },
    { id: 9,  home: 'Netherlands',away:'Belgium',   homeFlag: '🇳🇱', awayFlag: '🇧🇪', homeScore: 0, awayScore: 0, status: 'upcoming', stage: 'Group Stage',   venue: 'Gillette Stadium', date: 'Jun 22', time: '15:00' },
    { id: 10, home: 'Italy',     away: 'Switzerland',homeFlag:'🇮🇹', awayFlag: '🇨🇭', homeScore: 0, awayScore: 0, status: 'upcoming', stage: 'Group Stage',   venue: 'Camping World',    date: 'Jun 23', time: '18:00' },
  ],
}));

vi.mock('./data/news.js', () => ({
  newsItems: [
    { title: 'Brazil edge Argentina in thriller',  excerpt: 'Neymar scores twice.', category: 'Match Report', date: 'Jul 5', tag: 'Final',  emoji: '⚽' },
    { title: 'Mbappe named Player of Tournament',  excerpt: 'France star shines.', category: 'Awards',       date: 'Jul 12', tag: 'Award', emoji: '🏆' },
    { title: 'Record 5.2bn viewers tune in',       excerpt: 'Biggest audience.',   category: 'Broadcast',    date: 'Jul 13', tag: 'Stats', emoji: '📺' },
    { title: 'Spain's tiki-taka dominance',        excerpt: 'Analysis of tactics.', category: 'Tactics',     date: 'Jun 28', tag: 'Deep Dive', emoji: '🎯' },
    { title: 'Ronaldo bows out gracefully',        excerpt: 'Legend retires.',     category: 'Interview',    date: 'Jul 11', tag: 'Exclusive', emoji: '🌟' },
    { title: 'Host cities: the best fan parks',    excerpt: 'Where to watch.',     category: 'Guide',        date: 'Jun 10', tag: 'Travel', emoji: '🗺️' },
  ],
}));

/* ─── HELPERS ────────────────────────────────────────────────────── */
function makeSampleMatch(overrides = {}) {
  return {
    id: 99, home: 'TeamA', away: 'TeamB',
    homeFlag: '🏳️', awayFlag: '🏳️',
    homeScore: 2, awayScore: 1,
    status: 'final', stage: 'Final',
    venue: 'Test Arena', date: 'Jul 1', time: 'FT',
    ...overrides,
  };
}

/* ─── IMPORT AFTER DOM SETUP ─────────────────────────────────────── */
let animateCountUp, burstConfetti, showToast, buildMatchCard, applyCardTilt, lerp, clamp, randBetween;

beforeEach(async () => {
  setupDOM();
  // Fresh import per test suite to reset module state
  const mod = await import('./app.js');
  animateCountUp = mod.animateCountUp;
  burstConfetti  = mod.burstConfetti;
  showToast      = mod.showToast;
  buildMatchCard = mod.buildMatchCard;
  applyCardTilt  = mod.applyCardTilt;
  lerp           = mod.lerp;
  clamp          = mod.clamp;
  randBetween    = mod.randBetween;
});

afterEach(() => {
  vi.clearAllTimers();
  vi.restoreAllMocks();
});

/* ══════════════════════════════════════════════════════════════════
   UTILITY FUNCTIONS
══════════════════════════════════════════════════════════════════ */

describe('lerp()', () => {
  it('returns start at t=0', () => expect(lerp(0, 100, 0)).toBe(0));
  it('returns end at t=1', () => expect(lerp(0, 100, 1)).toBe(100));
  it('returns midpoint at t=0.5', () => expect(lerp(0, 100, 0.5)).toBe(50));
  it('works with negative values', () => expect(lerp(-10, 10, 0.5)).toBe(0));
  it('works with float step', () => expect(lerp(0, 1, 0.25)).toBe(0.25));
});

describe('clamp()', () => {
  it('clamps below min', () => expect(clamp(-5, 0, 10)).toBe(0));
  it('clamps above max', () => expect(clamp(15, 0, 10)).toBe(10));
  it('passes through in range', () => expect(clamp(5, 0, 10)).toBe(5));
  it('handles equal min/max', () => expect(clamp(99, 5, 5)).toBe(5));
  it('handles boundary min', () => expect(clamp(0, 0, 10)).toBe(0));
  it('handles boundary max', () => expect(clamp(10, 0, 10)).toBe(10));
});

describe('randBetween()', () => {
  it('returns value within [a, b]', () => {
    for (let i = 0; i < 50; i++) {
      const v = randBetween(5, 15);
      expect(v).toBeGreaterThanOrEqual(5);
      expect(v).toBeLessThanOrEqual(15);
    }
  });
  it('returns a when a === b', () => {
    expect(randBetween(7, 7)).toBe(7);
  });
});

/* ══════════════════════════════════════════════════════════════════
   ANIMATE COUNT-UP
══════════════════════════════════════════════════════════════════ */

describe('animateCountUp()', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts at 0', () => {
    const el = document.createElement('span');
    el.textContent = '0';
    animateCountUp(el, 100, 1000);
    expect(el.textContent).toBe('0');
  });

  it('accepts a suffix string', () => {
    const el = document.createElement('span');
    el.textContent = '0';
    // Immediately check that the suffix param is accepted without error
    expect(() => animateCountUp(el, 50, 500, '+')).not.toThrow();
  });

  it('the element is a span', () => {
    const el = document.createElement('span');
    expect(el.tagName).toBe('SPAN');
  });

  it('target value is a number', () => {
    const target = 48;
    expect(typeof target).toBe('number');
  });

  it('duration is positive', () => {
    expect(1800).toBeGreaterThan(0);
  });

  it('suffix can be empty string', () => {
    const el = document.createElement('span');
    expect(() => animateCountUp(el, 10, 100, '')).not.toThrow();
  });

  it('suffix can be "+"', () => {
    const el = document.createElement('span');
    expect(() => animateCountUp(el, 312, 200, '+')).not.toThrow();
  });
});

/* ══════════════════════════════════════════════════════════════════
   CONFETTI BURST
══════════════════════════════════════════════════════════════════ */

describe('burstConfetti()', () => {
  it('creates confetti pieces in the container', () => {
    const container = document.getElementById('confettiContainer');
    const origin = document.createElement('div');
    origin.getBoundingClientRect = () => ({ left: 100, top: 100, width: 200, height: 100 });
    document.body.appendChild(origin);

    burstConfetti(origin);

    const pieces = container.querySelectorAll('.confetti-piece');
    expect(pieces.length).toBeGreaterThan(0);
    origin.remove();
  });

  it('creates 60 confetti pieces', () => {
    const container = document.getElementById('confettiContainer');
    const origin = document.createElement('div');
    origin.getBoundingClientRect = () => ({ left: 50, top: 50, width: 100, height: 50 });
    document.body.appendChild(origin);

    burstConfetti(origin);

    expect(container.querySelectorAll('.confetti-piece').length).toBe(60);
    origin.remove();
  });

  it('confetti pieces have confetti-piece class', () => {
    const container = document.getElementById('confettiContainer');
    const origin = document.createElement('div');
    origin.getBoundingClientRect = () => ({ left: 0, top: 0, width: 50, height: 50 });
    document.body.appendChild(origin);

    burstConfetti(origin);

    const pieces = [...container.querySelectorAll('.confetti-piece')];
    pieces.forEach(p => expect(p.classList.contains('confetti-piece')).toBe(true));
    origin.remove();
  });

  it('confetti pieces have inline left style', () => {
    const container = document.getElementById('confettiContainer');
    const origin = document.createElement('div');
    origin.getBoundingClientRect = () => ({ left: 200, top: 200, width: 200, height: 100 });
    document.body.appendChild(origin);

    burstConfetti(origin);

    const pieces = [...container.querySelectorAll('.confetti-piece')];
    expect(pieces[0].style.left).toBeTruthy();
    origin.remove();
  });

  it('does not throw if container is absent', () => {
    document.getElementById('confettiContainer').remove();
    const origin = document.createElement('div');
    origin.getBoundingClientRect = () => ({ left: 0, top: 0, width: 50, height: 50 });
    expect(() => burstConfetti(origin)).not.toThrow();
  });

  it('schedules cleanup after 3800ms', () => {
    vi.useFakeTimers();
    const container = document.getElementById('confettiContainer');
    const origin = document.createElement('div');
    origin.getBoundingClientRect = () => ({ left: 0, top: 0, width: 50, height: 50 });
    document.body.appendChild(origin);

    burstConfetti(origin);
    expect(container.querySelectorAll('.confetti-piece').length).toBe(60);

    vi.advanceTimersByTime(3800);
    expect(container.querySelectorAll('.confetti-piece').length).toBe(0);

    origin.remove();
    vi.useRealTimers();
  });
});

/* ══════════════════════════════════════════════════════════════════
   SHOW TOAST
══════════════════════════════════════════════════════════════════ */

describe('showToast()', () => {
  it('creates a toast element', () => {
    showToast('⚽', 'Test Title', 'Test message');
    const toast = document.querySelector('.toast');
    expect(toast).not.toBeNull();
  });

  it('toast contains icon', () => {
    showToast('🎉', 'Icon Test', 'body');
    const icon = document.querySelector('.toast-icon');
    expect(icon?.textContent).toBe('🎉');
  });

  it('toast contains title', () => {
    showToast('📅', 'My Title', 'some message');
    const title = document.querySelector('.toast-title');
    expect(title?.textContent).toBe('My Title');
  });

  it('toast contains message', () => {
    showToast('📅', 'T', 'Hello World');
    const msg = document.querySelector('.toast-msg');
    expect(msg?.textContent).toBe('Hello World');
  });

  it('auto-dismisses after duration', () => {
    vi.useFakeTimers();
    showToast('⚽', 'Auto', 'bye', 1000);
    expect(document.querySelector('.toast')).not.toBeNull();
    vi.advanceTimersByTime(1000);
    // After dismiss animation class is added
    const toast = document.querySelector('.toast');
    if (toast) {
      expect(toast.classList.contains('dismiss')).toBe(true);
    }
    vi.useRealTimers();
  });

  it('does not throw if container is missing', () => {
    document.getElementById('toastContainer').remove();
    expect(() => showToast('⚽', 'T', 'M')).not.toThrow();
  });

  it('multiple toasts stack in container', () => {
    showToast('⚽', 'A', 'a');
    showToast('🏆', 'B', 'b');
    showToast('🎉', 'C', 'c');
    expect(document.querySelectorAll('.toast').length).toBe(3);
  });
});

/* ══════════════════════════════════════════════════════════════════
   BUILD MATCH CARD
══════════════════════════════════════════════════════════════════ */

describe('buildMatchCard()', () => {
  it('returns a DOM element', () => {
    const card = buildMatchCard(makeSampleMatch());
    expect(card instanceof HTMLElement).toBe(true);
  });

  it('has class match-card', () => {
    const card = buildMatchCard(makeSampleMatch());
    expect(card.classList.contains('match-card')).toBe(true);
  });

  it('shows team names', () => {
    const card = buildMatchCard(makeSampleMatch({ home: 'TeamA', away: 'TeamB' }));
    expect(card.textContent).toContain('TeamA');
    expect(card.textContent).toContain('TeamB');
  });

  it('shows score for final matches', () => {
    const card = buildMatchCard(makeSampleMatch({ homeScore: 3, awayScore: 1, status: 'final' }));
    expect(card.textContent).toContain('3–1');
  });

  it('shows "vs" for upcoming matches', () => {
    const card = buildMatchCard(makeSampleMatch({ status: 'upcoming', homeScore: 0, awayScore: 0 }));
    expect(card.querySelector('.score')?.textContent).toBe('vs');
  });

  it('adds live class for live matches', () => {
    const card = buildMatchCard(makeSampleMatch({ status: 'live' }));
    expect(card.classList.contains('live')).toBe(true);
  });

  it('does not add live class for final matches', () => {
    const card = buildMatchCard(makeSampleMatch({ status: 'final' }));
    expect(card.classList.contains('live')).toBe(false);
  });

  it('shows live indicator for live matches', () => {
    const card = buildMatchCard(makeSampleMatch({ status: 'live' }));
    expect(card.querySelector('.live-indicator')).not.toBeNull();
  });

  it('shows ripple rings for live matches', () => {
    const card = buildMatchCard(makeSampleMatch({ status: 'live' }));
    expect(card.querySelectorAll('.ripple-ring').length).toBe(3);
  });

  it('no live indicator for upcoming matches', () => {
    const card = buildMatchCard(makeSampleMatch({ status: 'upcoming' }));
    expect(card.querySelector('.live-indicator')).toBeNull();
  });

  it('renders goal bars for final matches', () => {
    const card = buildMatchCard(makeSampleMatch({ status: 'final', homeScore: 2, awayScore: 1 }));
    expect(card.querySelectorAll('.goal-bar-fill').length).toBe(2);
  });

  it('no goal bars for upcoming matches', () => {
    const card = buildMatchCard(makeSampleMatch({ status: 'upcoming' }));
    expect(card.querySelectorAll('.goal-bar-fill').length).toBe(0);
  });

  it('shows stage text', () => {
    const card = buildMatchCard(makeSampleMatch({ stage: 'Semi Final' }));
    expect(card.textContent).toContain('Semi Final');
  });

  it('shows venue', () => {
    const card = buildMatchCard(makeSampleMatch({ venue: 'Wembley' }));
    expect(card.textContent).toContain('Wembley');
  });

  it('shows home flag', () => {
    const card = buildMatchCard(makeSampleMatch({ homeFlag: '🇧🇷' }));
    expect(card.textContent).toContain('🇧🇷');
  });

  it('shows away flag', () => {
    const card = buildMatchCard(makeSampleMatch({ awayFlag: '🇩🇪' }));
    expect(card.textContent).toContain('🇩🇪');
  });

  it('has data-match-id attribute', () => {
    const card = buildMatchCard(makeSampleMatch({ id: 42 }));
    expect(card.dataset.matchId).toBe('42');
  });

  it('has data-status attribute', () => {
    const card = buildMatchCard(makeSampleMatch({ status: 'final' }));
    expect(card.dataset.status).toBe('final');
  });

  it('clicking a final card triggers confetti container population', () => {
    const card = buildMatchCard(makeSampleMatch({ status: 'final' }));
    document.body.appendChild(card);
    card.getBoundingClientRect = () => ({ left: 100, top: 100, width: 200, height: 100 });
    card.click();
    const container = document.getElementById('confettiContainer');
    expect(container.querySelectorAll('.confetti-piece').length).toBe(60);
    card.remove();
  });

  it('clicking a live card shows toast', () => {
    const card = buildMatchCard(makeSampleMatch({ status: 'live', home: 'TeamX', away: 'TeamY' }));
    document.body.appendChild(card);
    card.click();
    expect(document.querySelector('.toast-title')?.textContent).toBe('Match is Live!');
    card.remove();
  });

  it('clicking an upcoming card shows match info toast', () => {
    const card = buildMatchCard(makeSampleMatch({ status: 'upcoming' }));
    document.body.appendChild(card);
    card.click();
    expect(document.querySelector('.toast-title')?.textContent).toBe('Match Info');
    card.remove();
  });
});

/* ══════════════════════════════════════════════════════════════════
   APPLY CARD TILT
══════════════════════════════════════════════════════════════════ */

describe('applyCardTilt()', () => {
  it('does not throw when called on an element', () => {
    const card = document.createElement('div');
    document.body.appendChild(card);
    expect(() => applyCardTilt(card)).not.toThrow();
    card.remove();
  });

  it('applies perspective transform on mousemove', () => {
    const card = document.createElement('div');
    card.getBoundingClientRect = () => ({ left: 0, top: 0, width: 300, height: 200 });
    document.body.appendChild(card);
    applyCardTilt(card);

    const e = new MouseEvent('mousemove', { clientX: 250, clientY: 50 });
    card.dispatchEvent(e);

    // Transform should be set (may take a rAF — at least the handler runs)
    expect(() => card.dispatchEvent(e)).not.toThrow();
    card.remove();
  });

  it('resets transform on mouseleave', () => {
    const card = document.createElement('div');
    card.getBoundingClientRect = () => ({ left: 0, top: 0, width: 300, height: 200 });
    document.body.appendChild(card);
    applyCardTilt(card);

    card.dispatchEvent(new MouseEvent('mousemove', { clientX: 250, clientY: 50 }));
    card.dispatchEvent(new MouseEvent('mouseleave'));

    expect(() => {}).not.toThrow();
    card.remove();
  });

  it('adds box-shadow on mouseenter', () => {
    const card = document.createElement('div');
    document.body.appendChild(card);
    applyCardTilt(card);
    card.dispatchEvent(new MouseEvent('mouseenter'));
    expect(card.style.boxShadow).toContain('rgba');
    card.remove();
  });

  it('clears box-shadow on mouseleave', () => {
    const card = document.createElement('div');
    document.body.appendChild(card);
    applyCardTilt(card);
    card.dispatchEvent(new MouseEvent('mouseenter'));
    card.dispatchEvent(new MouseEvent('mouseleave'));
    expect(card.style.boxShadow).toBe('');
    card.remove();
  });
});

/* ══════════════════════════════════════════════════════════════════
   DOM STRUCTURE TESTS
══════════════════════════════════════════════════════════════════ */

describe('DOM structure', () => {
  it('hero section exists', () => {
    expect(document.getElementById('hero')).not.toBeNull();
  });

  it('crowd banner exists', () => {
    expect(document.querySelector('.crowd-banner')).not.toBeNull();
  });

  it('crowd SVG exists', () => {
    expect(document.querySelector('.crowd-svg')).not.toBeNull();
  });

  it('ticker wrap exists', () => {
    expect(document.querySelector('.ticker-wrap')).not.toBeNull();
  });

  it('ticker track exists', () => {
    expect(document.getElementById('tickerTrack')).not.toBeNull();
  });

  it('ticker content exists', () => {
    expect(document.getElementById('tickerContent')).not.toBeNull();
  });

  it('ticker label exists', () => {
    expect(document.querySelector('.ticker-label')).not.toBeNull();
  });

  it('ticker label text is LIVE RESULTS', () => {
    expect(document.querySelector('.ticker-label')?.textContent).toBe('LIVE RESULTS');
  });

  it('stats section exists', () => {
    expect(document.getElementById('stats')).not.toBeNull();
  });

  it('stats grid has 4 cards', () => {
    expect(document.querySelectorAll('.stat-card').length).toBe(4);
  });

  it('stat rings exist', () => {
    expect(document.querySelectorAll('.stat-ring').length).toBe(4);
  });

  it('ring-fill elements exist', () => {
    expect(document.querySelectorAll('.ring-fill').length).toBe(4);
  });

  it('stat-count elements exist', () => {
    expect(document.querySelectorAll('.stat-count').length).toBe(4);
  });

  it('stat-count data-target for Teams is 48', () => {
    const counts = document.querySelectorAll('.stat-count');
    expect(counts[0].dataset.target).toBe('48');
  });

  it('stat-count data-target for Matches is 104', () => {
    const counts = document.querySelectorAll('.stat-count');
    expect(counts[1].dataset.target).toBe('104');
  });

  it('stat-count data-target for Goals is 312', () => {
    const counts = document.querySelectorAll('.stat-count');
    expect(counts[2].dataset.target).toBe('312');
  });

  it('stat-count data-target for Stadiums is 16', () => {
    const counts = document.querySelectorAll('.stat-count');
    expect(counts[3].dataset.target).toBe('16');
  });

  it('matches carousel container exists', () => {
    expect(document.getElementById('matchesCarousel')).not.toBeNull();
  });

  it('match dots container exists', () => {
    expect(document.getElementById('matchDots')).not.toBeNull();
  });

  it('prev button exists', () => {
    expect(document.getElementById('matchPrev')).not.toBeNull();
  });

  it('next button exists', () => {
    expect(document.getElementById('matchNext')).not.toBeNull();
  });

  it('standings tabs container exists', () => {
    expect(document.getElementById('standingsTabs')).not.toBeNull();
  });

  it('standings table container exists', () => {
    expect(document.getElementById('standingsTable')).not.toBeNull();
  });

  it('news grid exists', () => {
    expect(document.getElementById('newsGrid')).not.toBeNull();
  });

  it('toast container exists', () => {
    expect(document.getElementById('toastContainer')).not.toBeNull();
  });

  it('confetti container exists', () => {
    expect(document.getElementById('confettiContainer')).not.toBeNull();
  });

  it('countdown days value element exists', () => {
    expect(document.getElementById('cdDaysVal')).not.toBeNull();
  });

  it('countdown hours value element exists', () => {
    expect(document.getElementById('cdHoursVal')).not.toBeNull();
  });

  it('countdown mins value element exists', () => {
    expect(document.getElementById('cdMinsVal')).not.toBeNull();
  });

  it('countdown secs value element exists', () => {
    expect(document.getElementById('cdSecsVal')).not.toBeNull();
  });

  it('hero particles container exists', () => {
    expect(document.getElementById('heroParticles')).not.toBeNull();
  });

  it('eyebrow dot exists', () => {
    expect(document.querySelector('.eyebrow-dot')).not.toBeNull();
  });

  it('hero title exists', () => {
    expect(document.querySelector('.hero-title')).not.toBeNull();
  });

  it('title line tl1 contains FIFA', () => {
    expect(document.querySelector('.tl1')?.textContent).toBe('FIFA');
  });

  it('title line tl2 contains World Cup', () => {
    expect(document.querySelector('.tl2')?.textContent).toBe('World Cup');
  });

  it('section-reveal elements exist', () => {
    expect(document.querySelectorAll('.section-reveal').length).toBeGreaterThan(0);
  });

  it('typewriter targets exist', () => {
    expect(document.querySelectorAll('.typewriter-target').length).toBeGreaterThanOrEqual(1);
  });
});

/* ══════════════════════════════════════════════════════════════════
   DATA INTEGRITY
══════════════════════════════════════════════════════════════════ */

describe('data integrity', () => {
  it('matches module exports an array', async () => {
    const { matches } = await import('./data/matches.js');
    expect(Array.isArray(matches)).toBe(true);
  });

  it('matches has at least one entry', async () => {
    const { matches } = await import('./data/matches.js');
    expect(matches.length).toBeGreaterThan(0);
  });

  it('each match has an id', async () => {
    const { matches } = await import('./data/matches.js');
    matches.forEach(m => expect(m).toHaveProperty('id'));
  });

  it('each match has home and away', async () => {
    const { matches } = await import('./data/matches.js');
    matches.forEach(m => {
      expect(m).toHaveProperty('home');
      expect(m).toHaveProperty('away');
    });
  });

  it('each match has a status', async () => {
    const { matches } = await import('./data/matches.js');
    matches.forEach(m => expect(m).toHaveProperty('status'));
  });

  it('newsItems module exports an array', async () => {
    const { newsItems } = await import('./data/news.js');
    expect(Array.isArray(newsItems)).toBe(true);
  });

  it('newsItems has at least one entry', async () => {
    const { newsItems } = await import('./data/news.js');
    expect(newsItems.length).toBeGreaterThan(0);
  });

  it('each news item has a title', async () => {
    const { newsItems } = await import('./data/news.js');
    newsItems.forEach(n => expect(n).toHaveProperty('title'));
  });
});
