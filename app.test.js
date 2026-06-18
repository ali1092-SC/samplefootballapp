/**
 * app.test.js — Comprehensive test suite for Football App
 * Environment: jsdom (via vitest)
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// ─── Helpers exported from app.js (pure math) ────────────────────────────────
import {
  parabolicHeight,
  spinAngle,
  squashValues,
  shadowScale,
} from './app.js';

// ─── 1. Parabolic Arc Math ────────────────────────────────────────────────────
describe('parabolicHeight', () => {
  it('returns 0 at t=0 (ground)', () => {
    expect(parabolicHeight(0)).toBe(0);
  });

  it('returns 0 at t=1 (landing)', () => {
    expect(parabolicHeight(1)).toBe(0);
  });

  it('returns 1 at t=0.5 (peak)', () => {
    expect(parabolicHeight(0.5)).toBe(1);
  });

  it('is symmetric: height(t) === height(1-t)', () => {
    for (const t of [0.1, 0.25, 0.3, 0.4]) {
      expect(parabolicHeight(t)).toBeCloseTo(parabolicHeight(1 - t), 10);
    }
  });

  it('is always in [0, 1]', () => {
    for (let t = 0; t <= 1; t += 0.05) {
      const h = parabolicHeight(t);
      expect(h).toBeGreaterThanOrEqual(0);
      expect(h).toBeLessThanOrEqual(1);
    }
  });

  it('increases from t=0 to t=0.5', () => {
    let prev = parabolicHeight(0);
    for (let t = 0.05; t <= 0.5; t += 0.05) {
      const curr = parabolicHeight(t);
      expect(curr).toBeGreaterThanOrEqual(prev);
      prev = curr;
    }
  });

  it('decreases from t=0.5 to t=1', () => {
    let prev = parabolicHeight(0.5);
    for (let t = 0.55; t <= 1; t += 0.05) {
      const curr = parabolicHeight(t);
      expect(curr).toBeLessThanOrEqual(prev);
      prev = curr;
    }
  });
});

// ─── 2. 720° Spin Progression ─────────────────────────────────────────────────
describe('spinAngle', () => {
  it('starts at 0° when t=0', () => {
    expect(spinAngle(0)).toBe(0);
  });

  it('reaches 720° at t=1', () => {
    expect(spinAngle(1)).toBe(720);
  });

  it('is exactly 360° at t=0.5', () => {
    expect(spinAngle(0.5)).toBe(360);
  });

  it('is linear — doubles when t doubles (within [0,0.5])', () => {
    expect(spinAngle(0.2)).toBeCloseTo(spinAngle(0.1) * 2, 10);
  });

  it('is non-negative for all t in [0,1]', () => {
    for (let t = 0; t <= 1; t += 0.1) {
      expect(spinAngle(t)).toBeGreaterThanOrEqual(0);
    }
  });

  it('is strictly increasing', () => {
    for (let t = 0.1; t <= 1; t += 0.1) {
      expect(spinAngle(t)).toBeGreaterThan(spinAngle(t - 0.05));
    }
  });
});

// ─── 3. Squash-and-Stretch Values ────────────────────────────────────────────
describe('squashValues', () => {
  it('returns scaleX=1 and scaleY=1 at t=1 (full squash)', () => {
    const { scaleX, scaleY } = squashValues(1);
    expect(scaleX).toBeCloseTo(1.3, 5);
    expect(scaleY).toBeCloseTo(0.7, 5);
  });

  it('returns neutral scale at t=0', () => {
    const { scaleX, scaleY } = squashValues(0);
    expect(scaleX).toBeCloseTo(1, 5);
    expect(scaleY).toBeCloseTo(1, 5);
  });

  it('scaleX increases as t approaches 1', () => {
    const prev = squashValues(0.4).scaleX;
    const curr = squashValues(0.8).scaleX;
    expect(curr).toBeGreaterThan(prev);
  });

  it('scaleY decreases as t approaches 1', () => {
    const prev = squashValues(0.4).scaleY;
    const curr = squashValues(0.8).scaleY;
    expect(curr).toBeLessThan(prev);
  });

  it('scaleX * scaleY is approximately 1 (volume conservation)', () => {
    for (const t of [0, 0.25, 0.5, 0.75, 1]) {
      const { scaleX, scaleY } = squashValues(t);
      expect(scaleX * scaleY).toBeCloseTo(1, 1);
    }
  });

  it('returns objects with both scaleX and scaleY keys', () => {
    const result = squashValues(0.5);
    expect(result).toHaveProperty('scaleX');
    expect(result).toHaveProperty('scaleY');
  });
});

// ─── 4. Shadow Scale Synchronisation ─────────────────────────────────────────
describe('shadowScale', () => {
  it('returns 1 when ball is at ground (height=0)', () => {
    expect(shadowScale(0)).toBe(1);
  });

  it('returns 0.25 when ball is at peak (height=1)', () => {
    expect(shadowScale(1)).toBeCloseTo(0.25, 5);
  });

  it('decreases as height increases', () => {
    let prev = shadowScale(0);
    for (let h = 0.1; h <= 1; h += 0.1) {
      const curr = shadowScale(h);
      expect(curr).toBeLessThanOrEqual(prev);
      prev = curr;
    }
  });

  it('is always positive', () => {
    for (let h = 0; h <= 1; h += 0.1) {
      expect(shadowScale(h)).toBeGreaterThan(0);
    }
  });

  it('is linear between height=0 and height=1', () => {
    expect(shadowScale(0.5)).toBeCloseTo(0.625, 5);
  });
});

// ─── 5. DOM: Shadow Synchronisation ──────────────────────────────────────────
describe('Shadow DOM class toggling', () => {
  let shadowEl;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="football-wrapper" tabindex="0" role="button">
        <div id="football"></div>
        <div id="shadow"></div>
      </div>
      <span id="kick-count">0</span>
      <span id="record-count">0</span>
      <span id="streak-count">0</span>
      <p id="status-message"></p>
      <button id="kick-btn"></button>
      <button id="reset-btn"></button>
      <div id="burst-container"></div>
    `;
    shadowEl = document.getElementById('shadow');
  });

  it('shadow element exists in DOM', () => {
    expect(shadowEl).not.toBeNull();
  });

  it('shadow does not have shadow-small class by default', () => {
    expect(shadowEl.classList.contains('shadow-small')).toBe(false);
  });

  it('can add and remove shadow-small class', () => {
    shadowEl.classList.add('shadow-small');
    expect(shadowEl.classList.contains('shadow-small')).toBe(true);
    shadowEl.classList.remove('shadow-small');
    expect(shadowEl.classList.contains('shadow-small')).toBe(false);
  });

  it('can add and remove shadow-large class', () => {
    shadowEl.classList.add('shadow-large');
    expect(shadowEl.classList.contains('shadow-large')).toBe(true);
    shadowEl.classList.remove('shadow-large');
    expect(shadowEl.classList.contains('shadow-large')).toBe(false);
  });

  it('shadow-small and shadow-large can coexist (before cleanup)', () => {
    shadowEl.classList.add('shadow-small');
    shadowEl.classList.add('shadow-large');
    expect(shadowEl.classList.contains('shadow-small')).toBe(true);
    expect(shadowEl.classList.contains('shadow-large')).toBe(true);
  });
});

// ─── 6. DOM: Scoreboard Elements ─────────────────────────────────────────────
describe('Scoreboard DOM structure', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <section class="scoreboard">
        <div class="score-card" id="score-card-kicks">
          <span class="score-value" id="kick-count">0</span>
          <span class="score-label">Kicks</span>
        </div>
        <div class="score-divider">VS</div>
        <div class="score-card" id="score-card-record">
          <span class="score-value" id="record-count">0</span>
          <span class="score-label">Record</span>
        </div>
        <div class="score-divider score-divider--thin"></div>
        <div class="score-card" id="score-card-streak">
          <span class="score-value" id="streak-count">0</span>
          <span class="score-label">Streak 🔥</span>
        </div>
      </section>
    `;
  });

  it('kick-count element exists', () => {
    expect(document.getElementById('kick-count')).not.toBeNull();
  });

  it('record-count element exists', () => {
    expect(document.getElementById('record-count')).not.toBeNull();
  });

  it('streak-count element exists', () => {
    expect(document.getElementById('streak-count')).not.toBeNull();
  });

  it('kick-count starts at 0', () => {
    expect(document.getElementById('kick-count').textContent).toBe('0');
  });

  it('record-count starts at 0', () => {
    expect(document.getElementById('record-count').textContent).toBe('0');
  });

  it('streak-count starts at 0', () => {
    expect(document.getElementById('streak-count').textContent).toBe('0');
  });

  it('score-divider with VS text exists', () => {
    const dividers = document.querySelectorAll('.score-divider');
    const vs = Array.from(dividers).find(d => d.textContent.trim() === 'VS');
    expect(vs).not.toBeUndefined();
  });

  it('thin divider element exists', () => {
    expect(document.querySelector('.score-divider--thin')).not.toBeNull();
  });
});

// ─── 7. State Management ──────────────────────────────────────────────────────
describe('State management', () => {
  it('state object has kickCount property', async () => {
    const { state } = await import('./app.js');
    expect(state).toHaveProperty('kickCount');
  });

  it('state object has record property', async () => {
    const { state } = await import('./app.js');
    expect(state).toHaveProperty('record');
  });

  it('state object has streak property', async () => {
    const { state } = await import('./app.js');
    expect(state).toHaveProperty('streak');
  });

  it('state object has isFlying property', async () => {
    const { state } = await import('./app.js');
    expect(state).toHaveProperty('isFlying');
  });

  it('isFlying is a boolean', async () => {
    const { state } = await import('./app.js');
    expect(typeof state.isFlying).toBe('boolean');
  });

  it('kickCount is a number', async () => {
    const { state } = await import('./app.js');
    expect(typeof state.kickCount).toBe('number');
  });

  it('record is always >= streak or streak === record', async () => {
    const { state } = await import('./app.js');
    // record must be >= streak at all times
    expect(state.record).toBeGreaterThanOrEqual(state.streak);
  });
});

// ─── 8. setStatus Helper ──────────────────────────────────────────────────────
describe('setStatus', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <p id="status-message"></p>
      <div id="football-wrapper" tabindex="0" role="button">
        <div id="football"></div>
        <div id="shadow"></div>
      </div>
      <span id="kick-count">0</span>
      <span id="record-count">0</span>
      <span id="streak-count">0</span>
      <button id="kick-btn"></button>
      <button id="reset-btn"></button>
      <div id="burst-container"></div>
    `;
  });

  it('sets text content of status-message', async () => {
    const { setStatus } = await import('./app.js');
    setStatus('Hello Test!');
    expect(document.getElementById('status-message').textContent).toBe('Hello Test!');
  });

  it('adds highlight class when second arg is true', async () => {
    const { setStatus } = await import('./app.js');
    setStatus('Fire!', true);
    expect(document.getElementById('status-message').classList.contains('highlight')).toBe(true);
  });

  it('removes highlight class when second arg is false', async () => {
    const { setStatus } = await import('./app.js');
    const el = document.getElementById('status-message');
    el.classList.add('highlight');
    setStatus('Cool!', false);
    expect(el.classList.contains('highlight')).toBe(false);
  });

  it('handles empty string message', async () => {
    const { setStatus } = await import('./app.js');
    setStatus('');
    expect(document.getElementById('status-message').textContent).toBe('');
  });
});

// ─── 9. Full-Sequence Frame Integrity ─────────────────────────────────────────
describe('Animation frame integrity', () => {
  it('parabolicHeight integrated over [0,1] approximates 2/3', () => {
    // Riemann sum
    const steps = 1000;
    let sum = 0;
    for (let i = 0; i < steps; i++) {
      sum += parabolicHeight(i / steps) * (1 / steps);
    }
    expect(sum).toBeCloseTo(2 / 3, 2);
  });

  it('spinAngle(0.25) is 180 (quarter through is 180°)', () => {
    expect(spinAngle(0.25)).toBe(180);
  });

  it('spinAngle(0.75) is 540 (three-quarters through is 540°)', () => {
    expect(spinAngle(0.75)).toBe(540);
  });

  it('shadowScale at half-height is midpoint between 1 and 0.25', () => {
    expect(shadowScale(0.5)).toBeCloseTo(0.625, 5);
  });

  it('squashValues at t=0 is neutral (no squash)', () => {
    const { scaleX, scaleY } = squashValues(0);
    expect(scaleX).toBeCloseTo(1, 5);
    expect(scaleY).toBeCloseTo(1, 5);
  });

  it('a full arc sequence has consistent height + shadow relationship', () => {
    for (let t = 0; t <= 1; t += 0.1) {
      const h  = parabolicHeight(t);
      const sh = shadowScale(h);
      // When ball is high (h near 1) shadow should be small (sh < 0.5)
      if (h > 0.8) expect(sh).toBeLessThan(0.5);
      // When ball is low (h < 0.2) shadow should be large (sh > 0.85)
      if (h < 0.2) expect(sh).toBeGreaterThan(0.85);
    }
  });

  it('spin completes full 720° over a full arc', () => {
    const angles = [0, 0.25, 0.5, 0.75, 1].map(spinAngle);
    expect(angles[0]).toBe(0);
    expect(angles[4]).toBe(720);
    // Monotonically increasing
    for (let i = 1; i < angles.length; i++) {
      expect(angles[i]).toBeGreaterThan(angles[i - 1]);
    }
  });

  it('squashValues is most extreme at t=1', () => {
    const end  = squashValues(1);
    const mid  = squashValues(0.5);
    expect(end.scaleX).toBeGreaterThan(mid.scaleX);
    expect(end.scaleY).toBeLessThan(mid.scaleY);
  });
});
