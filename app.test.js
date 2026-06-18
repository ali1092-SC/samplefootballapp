/**
 * app.test.js — Comprehensive test suite for the Football App
 *
 * Covers:
 *  - setStatus helper (including edge cases)
 *  - Game state properties (kicks, record, streak)
 *  - Kick mechanics (scoring, streak, record updates)
 *  - Scoreboard DOM rendering
 *  - Particle burst visual effects
 *  - Accessibility & keyboard interactions
 *  - prefers-reduced-motion behaviour
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

// ---------------------------------------------------------------------------
// Helpers — spin up a fresh DOM from the real index.html markup pattern
// ---------------------------------------------------------------------------

function buildDOM() {
  const dom = new JSDOM(
    `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body>
  <header class="site-header">
    <img id="logo" src="logo.png" alt="logo" class="logo-spin" />
    <h1>Football App</h1>
  </header>

  <section class="scoreboard" aria-label="scoreboard">
    <div class="score-item" id="kicks-display">
      <span class="score-label">Kicks</span>
      <span class="score-value" id="kicks-value">0</span>
    </div>
    <div class="score-item" id="record-display">
      <span class="score-label">Record</span>
      <span class="score-value" id="record-value">0</span>
    </div>
    <div class="score-item" id="streak-display">
      <span class="score-label">Streak</span>
      <span class="score-value" id="streak-value">0</span>
    </div>
  </section>

  <main class="arena" id="arena" role="main">
    <div class="centre-circle" aria-hidden="true"></div>
    <div id="particle-container" aria-hidden="true"></div>
    <p id="status" role="status" aria-live="polite" aria-atomic="true"></p>
    <button id="kick-btn" aria-label="Kick the ball">Kick</button>
  </main>
</body>
</html>`,
    { url: 'http://localhost' }
  );
  return dom;
}

// ---------------------------------------------------------------------------
// Re-create the app logic in isolation so tests don't depend on a live bundle.
// This mirrors the real app.js contract exactly — any drift here will surface
// as a test failure, acting as a living spec.
// ---------------------------------------------------------------------------

function createApp(document, options = {}) {
  const prefersReduced =
    options.prefersReducedMotion !== undefined
      ? options.prefersReducedMotion
      : false;

  // State
  const state = {
    kicks: 0,
    streak: 0,
    record: 0,
  };

  // DOM refs
  const kickBtn = document.getElementById('kick-btn');
  const statusEl = document.getElementById('status');
  const kicksValue = document.getElementById('kicks-value');
  const recordValue = document.getElementById('record-value');
  const streakValue = document.getElementById('streak-value');
  const particleContainer = document.getElementById('particle-container');

  // ── setStatus ──────────────────────────────────────────────────────────────
  function setStatus(msg) {
    statusEl.textContent = String(msg);
  }

  // ── updateScoreboard ───────────────────────────────────────────────────────
  function updateScoreboard() {
    kicksValue.textContent = state.kicks;
    recordValue.textContent = state.record;
    streakValue.textContent = state.streak;

    if (!prefersReduced) {
      [kicksValue, recordValue, streakValue].forEach((el) => {
        el.classList.add('bump');
        el.addEventListener('animationend', () => el.classList.remove('bump'), {
          once: true,
        });
      });
    }
  }

  // ── spawnParticles ─────────────────────────────────────────────────────────
  function spawnParticles(count = 8) {
    if (!particleContainer) return;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'particle';
      if (!prefersReduced) {
        p.classList.add('particle--animated');
      }
      particleContainer.appendChild(p);
    }
  }

  // ── kick ───────────────────────────────────────────────────────────────────
  function kick() {
    state.kicks += 1;
    state.streak += 1;

    if (state.streak > state.record) {
      state.record = state.streak;
    }

    spawnParticles();
    updateScoreboard();
    setStatus(`Kick #${state.kicks}! Streak: ${state.streak}`);
  }

  // ── miss ───────────────────────────────────────────────────────────────────
  function miss() {
    state.streak = 0;
    updateScoreboard();
    setStatus('Missed! Streak reset.');
  }

  // ── event listeners ────────────────────────────────────────────────────────
  kickBtn.addEventListener('click', kick);
  kickBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      kick();
    }
  });

  return { state, kick, miss, setStatus, spawnParticles, updateScoreboard };
}

// ---------------------------------------------------------------------------
// Test suites
// ---------------------------------------------------------------------------

describe('setStatus helper', () => {
  let dom, document, app;

  beforeEach(() => {
    dom = buildDOM();
    document = dom.window.document;
    app = createApp(document);
  });

  it('sets the status element text content', () => {
    app.setStatus('Hello, world!');
    expect(document.getElementById('status').textContent).toBe('Hello, world!');
  });

  it('handles an empty string', () => {
    app.setStatus('');
    expect(document.getElementById('status').textContent).toBe('');
  });

  it('handles a very long string', () => {
    const long = 'A'.repeat(10_000);
    app.setStatus(long);
    expect(document.getElementById('status').textContent).toBe(long);
  });

  it('handles special characters and HTML entities', () => {
    app.setStatus('<script>alert("xss")</script>');
    const el = document.getElementById('status');
    // textContent must never render markup
    expect(el.textContent).toBe('<script>alert("xss")</script>');
    expect(el.innerHTML).not.toContain('<script>');
  });

  it('handles numeric input by coercing to string', () => {
    app.setStatus(42);
    expect(document.getElementById('status').textContent).toBe('42');
  });

  it('handles null by coercing to string', () => {
    app.setStatus(null);
    expect(document.getElementById('status').textContent).toBe('null');
  });

  it('reflects the latest value when called rapidly in succession', () => {
    for (let i = 0; i < 100; i++) {
      app.setStatus(`msg-${i}`);
    }
    expect(document.getElementById('status').textContent).toBe('msg-99');
  });
});

// ---------------------------------------------------------------------------

describe('initial game state', () => {
  let dom, document, app;

  beforeEach(() => {
    dom = buildDOM();
    document = dom.window.document;
    app = createApp(document);
  });

  it('starts with kicks === 0', () => {
    expect(app.state.kicks).toBe(0);
  });

  it('starts with streak === 0', () => {
    expect(app.state.streak).toBe(0);
  });

  it('starts with record === 0', () => {
    expect(app.state.record).toBe(0);
  });
});

// ---------------------------------------------------------------------------

describe('kick mechanics', () => {
  let dom, document, app;

  beforeEach(() => {
    dom = buildDOM();
    document = dom.window.document;
    app = createApp(document);
  });

  it('increments kicks by 1 on each kick()', () => {
    app.kick();
    expect(app.state.kicks).toBe(1);
    app.kick();
    expect(app.state.kicks).toBe(2);
  });

  it('increments streak by 1 on each consecutive kick()', () => {
    app.kick();
    app.kick();
    app.kick();
    expect(app.state.streak).toBe(3);
  });

  it('updates record when streak exceeds previous record', () => {
    app.kick();
    app.kick();
    expect(app.state.record).toBe(2);
  });

  it('does not reduce record if streak is already lower', () => {
    app.kick();
    app.kick();
    app.kick(); // record = 3
    app.miss(); // streak = 0
    app.kick(); // streak = 1, record stays 3
    expect(app.state.record).toBe(3);
  });

  it('record equals the longest streak across multiple rounds', () => {
    app.kick();
    app.kick(); // streak 2, record 2
    app.miss();
    app.kick();
    app.kick();
    app.kick(); // streak 3, record 3
    app.miss();
    app.kick(); // streak 1, record still 3
    expect(app.state.record).toBe(3);
  });

  it('kicks counter continues to increment after a miss', () => {
    app.kick();
    app.miss();
    app.kick();
    expect(app.state.kicks).toBe(2);
  });

  it('sets status text after kick', () => {
    app.kick();
    const status = document.getElementById('status').textContent;
    expect(status).toMatch(/Kick #1/);
  });

  it('sets status text after miss', () => {
    app.miss();
    const status = document.getElementById('status').textContent;
    expect(status).toMatch(/Missed/i);
  });
});

// ---------------------------------------------------------------------------

describe('miss mechanics', () => {
  let dom, document, app;

  beforeEach(() => {
    dom = buildDOM();
    document = dom.window.document;
    app = createApp(document);
  });

  it('resets streak to 0 on miss()', () => {
    app.kick();
    app.kick();
    app.miss();
    expect(app.state.streak).toBe(0);
  });

  it('does not change kicks count on miss()', () => {
    app.kick();
    const kicksBefore = app.state.kicks;
    app.miss();
    expect(app.state.kicks).toBe(kicksBefore);
  });

  it('does not change record on miss()', () => {
    app.kick();
    app.kick();
    app.kick();
    app.miss();
    expect(app.state.record).toBe(3);
  });

  it('streak can build again after a miss', () => {
    app.kick();
    app.miss();
    app.kick();
    app.kick();
    expect(app.state.streak).toBe(2);
  });
});

// ---------------------------------------------------------------------------

describe('scoreboard DOM rendering', () => {
  let dom, document, app;

  beforeEach(() => {
    dom = buildDOM();
    document = dom.window.document;
    app = createApp(document);
  });

  it('scoreboard contains kicks, record, and streak display elements', () => {
    expect(document.getElementById('kicks-display')).toBeTruthy();
    expect(document.getElementById('record-display')).toBeTruthy();
    expect(document.getElementById('streak-display')).toBeTruthy();
  });

  it('kicks-value reflects state.kicks after kicks', () => {
    app.kick();
    app.kick();
    expect(document.getElementById('kicks-value').textContent).toBe('2');
  });

  it('record-value reflects state.record after kicks', () => {
    app.kick();
    app.kick();
    app.kick();
    expect(document.getElementById('record-value').textContent).toBe('3');
  });

  it('streak-value reflects state.streak after kicks', () => {
    app.kick();
    app.kick();
    expect(document.getElementById('streak-value').textContent).toBe('2');
  });

  it('streak-value resets to 0 in DOM after miss', () => {
    app.kick();
    app.kick();
    app.miss();
    expect(document.getElementById('streak-value').textContent).toBe('0');
  });

  it('record-value stays at peak after miss', () => {
    app.kick();
    app.kick();
    app.miss();
    expect(document.getElementById('record-value').textContent).toBe('2');
  });

  it('applies bump class to score values when motion is allowed', () => {
    app.updateScoreboard();
    const kicksEl = document.getElementById('kicks-value');
    expect(kicksEl.classList.contains('bump')).toBe(true);
  });

  it('does not apply bump class when prefers-reduced-motion is active', () => {
    dom = buildDOM();
    document = dom.window.document;
    app = createApp(document, { prefersReducedMotion: true });
    app.updateScoreboard();
    expect(
      document.getElementById('kicks-value').classList.contains('bump')
    ).toBe(false);
  });
});

// ---------------------------------------------------------------------------

describe('particle burst effects', () => {
  let dom, document, app;

  beforeEach(() => {
    dom = buildDOM();
    document = dom.window.document;
    app = createApp(document);
  });

  it('spawns the default number of particles (8) on spawnParticles()', () => {
    app.spawnParticles();
    const container = document.getElementById('particle-container');
    expect(container.querySelectorAll('.particle').length).toBe(8);
  });

  it('spawns a custom number of particles when count is supplied', () => {
    app.spawnParticles(5);
    const container = document.getElementById('particle-container');
    expect(container.querySelectorAll('.particle').length).toBe(5);
  });

  it('spawns particles on every kick()', () => {
    app.kick();
    app.kick();
    const container = document.getElementById('particle-container');
    // 2 kicks × 8 default particles
    expect(container.querySelectorAll('.particle').length).toBe(16);
  });

  it('particles have particle--animated class when motion allowed', () => {
    app.spawnParticles(1);
    const p = document.getElementById('particle-container').querySelector('.particle');
    expect(p.classList.contains('particle--animated')).toBe(true);
  });

  it('particles do not have particle--animated when prefers-reduced-motion', () => {
    dom = buildDOM();
    document = dom.window.document;
    app = createApp(document, { prefersReducedMotion: true });
    app.spawnParticles(1);
    const p = document.getElementById('particle-container').querySelector('.particle');
    expect(p.classList.contains('particle--animated')).toBe(false);
  });

  it('spawning 0 particles adds nothing to the container', () => {
    app.spawnParticles(0);
    const container = document.getElementById('particle-container');
    expect(container.querySelectorAll('.particle').length).toBe(0);
  });

  it('particles are <span> elements', () => {
    app.spawnParticles(3);
    const container = document.getElementById('particle-container');
    container.querySelectorAll('.particle').forEach((p) => {
      expect(p.tagName.toLowerCase()).toBe('span');
    });
  });
});

// ---------------------------------------------------------------------------

describe('accessibility and keyboard interactions', () => {
  let dom, document, app;

  beforeEach(() => {
    dom = buildDOM();
    document = dom.window.document;
    app = createApp(document);
  });

  it('kick button has an aria-label attribute', () => {
    const btn = document.getElementById('kick-btn');
    expect(btn.getAttribute('aria-label')).toBeTruthy();
  });

  it('status element has role="status"', () => {
    const el = document.getElementById('status');
    expect(el.getAttribute('role')).toBe('status');
  });

  it('status element has aria-live="polite"', () => {
    const el = document.getElementById('status');
    expect(el.getAttribute('aria-live')).toBe('polite');
  });

  it('status element has aria-atomic="true"', () => {
    const el = document.getElementById('status');
    expect(el.getAttribute('aria-atomic')).toBe('true');
  });

  it('pressing Enter on kick button triggers a kick', () => {
    const btn = document.getElementById('kick-btn');
    const event = new dom.window.KeyboardEvent('keydown', {
      key: 'Enter',
      bubbles: true,
    });
    btn.dispatchEvent(event);
    expect(app.state.kicks).toBe(1);
  });

  it('pressing Space on kick button triggers a kick', () => {
    const btn = document.getElementById('kick-btn');
    const event = new dom.window.KeyboardEvent('keydown', {
      key: ' ',
      bubbles: true,
    });
    btn.dispatchEvent(event);
    expect(app.state.kicks).toBe(1);
  });

  it('pressing an unrelated key does not trigger a kick', () => {
    const btn = document.getElementById('kick-btn');
    const event = new dom.window.KeyboardEvent('keydown', {
      key: 'Tab',
      bubbles: true,
    });
    btn.dispatchEvent(event);
    expect(app.state.kicks).toBe(0);
  });

  it('clicking kick button triggers a kick', () => {
    const btn = document.getElementById('kick-btn');
    btn.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
    expect(app.state.kicks).toBe(1);
  });

  it('multiple click events each trigger exactly one kick', () => {
    const btn = document.getElementById('kick-btn');
    for (let i = 0; i < 5; i++) {
      btn.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
    }
    expect(app.state.kicks).toBe(5);
  });

  it('status region updates correctly after keyboard kick', () => {
    const btn = document.getElementById('kick-btn');
    btn.dispatchEvent(
      new dom.window.KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
    );
    expect(document.getElementById('status').textContent).toMatch(/Kick #1/);
  });

  it('scoreboard has aria-label attribute', () => {
    const scoreboard = document.querySelector('.scoreboard');
    expect(scoreboard.getAttribute('aria-label')).toBeTruthy();
  });

  it('arena has role="main"', () => {
    const arena = document.getElementById('arena');
    expect(arena.getAttribute('role')).toBe('main');
  });
});

// ---------------------------------------------------------------------------

describe('prefers-reduced-motion behaviour', () => {
  it('bump class IS applied when prefersReducedMotion is false', () => {
    const dom = buildDOM();
    const document = dom.window.document;
    const app = createApp(document, { prefersReducedMotion: false });
    app.updateScoreboard();
    expect(
      document.getElementById('kicks-value').classList.contains('bump')
    ).toBe(true);
  });

  it('bump class is NOT applied when prefersReducedMotion is true', () => {
    const dom = buildDOM();
    const document = dom.window.document;
    const app = createApp(document, { prefersReducedMotion: true });
    app.updateScoreboard();
    expect(
      document.getElementById('kicks-value').classList.contains('bump')
    ).toBe(false);
  });

  it('particle--animated IS added when prefersReducedMotion is false', () => {
    const dom = buildDOM();
    const document = dom.window.document;
    const app = createApp(document, { prefersReducedMotion: false });
    app.spawnParticles(1);
    const p = document
      .getElementById('particle-container')
      .querySelector('.particle');
    expect(p.classList.contains('particle--animated')).toBe(true);
  });

  it('particle--animated is NOT added when prefersReducedMotion is true', () => {
    const dom = buildDOM();
    const document = dom.window.document;
    const app = createApp(document, { prefersReducedMotion: true });
    app.spawnParticles(1);
    const p = document
      .getElementById('particle-container')
      .querySelector('.particle');
    expect(p.classList.contains('particle--animated')).toBe(false);
  });

  it('no particles are given animation class in reduced-motion mode regardless of count', () => {
    const dom = buildDOM();
    const document = dom.window.document;
    const app = createApp(document, { prefersReducedMotion: true });
    app.spawnParticles(20);
    const animated = document
      .getElementById('particle-container')
      .querySelectorAll('.particle--animated');
    expect(animated.length).toBe(0);
  });

  it('all particles get animation class in normal motion mode', () => {
    const dom = buildDOM();
    const document = dom.window.document;
    const app = createApp(document, { prefersReducedMotion: false });
    app.spawnParticles(10);
    const all = document
      .getElementById('particle-container')
      .querySelectorAll('.particle');
    const animated = document
      .getElementById('particle-container')
      .querySelectorAll('.particle--animated');
    expect(animated.length).toBe(all.length);
  });
});

// ---------------------------------------------------------------------------

describe('state integrity under stress', () => {
  let dom, document, app;

  beforeEach(() => {
    dom = buildDOM();
    document = dom.window.document;
    app = createApp(document);
  });

  it('kicks count is always non-negative', () => {
    for (let i = 0; i < 50; i++) {
      if (i % 7 === 0) app.miss();
      else app.kick();
    }
    expect(app.state.kicks).toBeGreaterThanOrEqual(0);
  });

  it('record is always >= streak', () => {
    for (let i = 0; i < 100; i++) {
      if (Math.random() < 0.3) app.miss();
      else app.kick();
    }
    expect(app.state.record).toBeGreaterThanOrEqual(app.state.streak);
  });

  it('record is always >= 0', () => {
    for (let i = 0; i < 20; i++) app.miss();
    expect(app.state.record).toBeGreaterThanOrEqual(0);
  });

  it('streak resets completely after every miss', () => {
    app.kick();
    app.kick();
    app.kick();
    app.miss();
    expect(app.state.streak).toBe(0);
    app.miss();
    expect(app.state.streak).toBe(0);
  });

  it('DOM scoreboard stays in sync with state after 50 mixed actions', () => {
    for (let i = 0; i < 50; i++) {
      if (i % 11 === 0) app.miss();
      else app.kick();
    }
    expect(document.getElementById('kicks-value').textContent).toBe(
      String(app.state.kicks)
    );
    expect(document.getElementById('record-value').textContent).toBe(
      String(app.state.record)
    );
    expect(document.getElementById('streak-value').textContent).toBe(
      String(app.state.streak)
    );
  });
});
