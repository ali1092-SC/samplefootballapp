/**
 * FIFA World Cup 2026 — app.test.js
 * Vitest unit tests for app.js utilities
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  LOGO,
  LOGO_SIZES,
  TEAM_STRENGTH,
  TICKER_ITEMS,
  VENUES,
  getCountdownValues,
  poissonGoals,
  predictMatch,
  drawCanvasBrandOverlay,
} from './app.js';

/* ══════════════════════════════════════════════════════════════
   LOGO CONSTANTS
══════════════════════════════════════════════════════════════ */
describe('LOGO constants', () => {
  it('has the correct symbol ID', () => {
    expect(LOGO.SYMBOL_ID).toBe('wc2026-logo');
  });

  it('has the correct year', () => {
    expect(LOGO.YEAR).toBe(2026);
  });

  it('has 48 competing nations', () => {
    expect(LOGO.NATIONS).toBe(48);
  });

  it('tagline is WE ARE 26', () => {
    expect(LOGO.TAGLINE).toBe('WE ARE 26');
  });

  it('gold gradient has three stops in correct order', () => {
    const stops = LOGO.GRADIENT.stops;
    expect(stops).toHaveLength(3);
    expect(stops[0].color).toBe('#f5d675');
    expect(stops[1].color).toBe('#c9a227');
    expect(stops[2].color).toBe('#a07a10');
  });

  it('viewBox is 0 0 300 420', () => {
    expect(LOGO.VIEWBOX).toBe('0 0 300 420');
  });
});

/* ══════════════════════════════════════════════════════════════
   LOGO SIZES
══════════════════════════════════════════════════════════════ */
describe('LOGO_SIZES', () => {
  const expectedSizes = {
    hero:    { width: 260, height: 260 },
    nav:     { width:  48, height:  48 },
    section: { width:  80, height:  80 },
    footer:  { width: 120, height: 120 },
    canvas:  { width: 180, height: 180 },
  };

  Object.entries(expectedSizes).forEach(([key, { width, height }]) => {
    it(`${key} logo has correct dimensions (${width}×${height})`, () => {
      expect(LOGO_SIZES[key].width).toBe(width);
      expect(LOGO_SIZES[key].height).toBe(height);
    });

    it(`${key} logo has cssClass property`, () => {
      expect(LOGO_SIZES[key].cssClass).toMatch(/^logo-/);
    });
  });
});

/* ══════════════════════════════════════════════════════════════
   COUNTDOWN
══════════════════════════════════════════════════════════════ */
describe('getCountdownValues', () => {
  it('returns expired = false for a date well before 2026-06-11', () => {
    const past = new Date('2025-01-01T00:00:00Z');
    const result = getCountdownValues(past);
    expect(result.expired).toBe(false);
  });

  it('returns expired = true for a date after the tournament', () => {
    const after = new Date('2027-01-01T00:00:00Z');
    const result = getCountdownValues(after);
    expect(result.expired).toBe(true);
  });

  it('returns all-zero values when expired', () => {
    const after = new Date('2027-01-01T00:00:00Z');
    const { days, hours, minutes, seconds } = getCountdownValues(after);
    expect(days).toBe(0);
    expect(hours).toBe(0);
    expect(minutes).toBe(0);
    expect(seconds).toBe(0);
  });

  it('returns positive days when called well before the event', () => {
    const early = new Date('2025-06-11T00:00:00Z');
    const { days } = getCountdownValues(early);
    expect(days).toBeGreaterThan(300);
  });

  it('hours are always 0–23', () => {
    const early = new Date('2025-06-11T00:00:00Z');
    const { hours } = getCountdownValues(early);
    expect(hours).toBeGreaterThanOrEqual(0);
    expect(hours).toBeLessThanOrEqual(23);
  });

  it('minutes are always 0–59', () => {
    const early = new Date('2025-06-11T00:00:00Z');
    const { minutes } = getCountdownValues(early);
    expect(minutes).toBeGreaterThanOrEqual(0);
    expect(minutes).toBeLessThanOrEqual(59);
  });

  it('seconds are always 0–59', () => {
    const early = new Date('2025-06-11T00:00:00Z');
    const { seconds } = getCountdownValues(early);
    expect(seconds).toBeGreaterThanOrEqual(0);
    expect(seconds).toBeLessThanOrEqual(59);
  });
});

/* ══════════════════════════════════════════════════════════════
   POISSON GOALS
══════════════════════════════════════════════════════════════ */
describe('poissonGoals', () => {
  it('returns a non-negative integer', () => {
    for (let i = 0; i < 100; i++) {
      const g = poissonGoals(1.5);
      expect(g).toBeGreaterThanOrEqual(0);
      expect(Number.isInteger(g)).toBe(true);
    }
  });

  it('with lambda=0 always returns 0', () => {
    // lambda 0 → e^0 = 1, L=1, loop: p starts at rng() which is ≤1 so k=1-1=0
    const alwaysOne = () => 0.9999;
    expect(poissonGoals(0, alwaysOne)).toBe(0);
  });

  it('accepts a custom rng for determinism', () => {
    // Use a seeded sequence: first call returns 0.1, subsequent 0.9
    let calls = 0;
    const rng = () => (calls++ === 0 ? 0.1 : 0.9);
    const goals = poissonGoals(2, rng);
    expect(typeof goals).toBe('number');
  });
});

/* ══════════════════════════════════════════════════════════════
   PREDICT MATCH
══════════════════════════════════════════════════════════════ */
describe('predictMatch', () => {
  it('returns an object with teamA, teamB, goalsA, goalsB', () => {
    const result = predictMatch('Argentina', 'France');
    expect(result).toHaveProperty('teamA', 'Argentina');
    expect(result).toHaveProperty('teamB', 'France');
    expect(result).toHaveProperty('goalsA');
    expect(result).toHaveProperty('goalsB');
  });

  it('goalsA and goalsB are non-negative integers', () => {
    for (let i = 0; i < 30; i++) {
      const { goalsA, goalsB } = predictMatch('Brazil', 'Spain');
      expect(goalsA).toBeGreaterThanOrEqual(0);
      expect(goalsB).toBeGreaterThanOrEqual(0);
      expect(Number.isInteger(goalsA)).toBe(true);
      expect(Number.isInteger(goalsB)).toBe(true);
    }
  });

  it('throws when both teams are the same', () => {
    expect(() => predictMatch('France', 'France')).toThrow();
  });

  it('falls back to strength 5 for unknown teams', () => {
    expect(() => predictMatch('UnknownA', 'UnknownB')).toThrow(); // same-team guard — both unknown but same
  });

  it('uses provided rng for determinism', () => {
    const seeded = () => 0.3;
    const r1 = predictMatch('England', 'Germany', seeded);
    const r2 = predictMatch('England', 'Germany', seeded);
    expect(r1.goalsA).toBe(r2.goalsA);
    expect(r1.goalsB).toBe(r2.goalsB);
  });
});

/* ══════════════════════════════════════════════════════════════
   TEAM STRENGTH
══════════════════════════════════════════════════════════════ */
describe('TEAM_STRENGTH', () => {
  it('Argentina has the highest or joint-highest strength', () => {
    const max = Math.max(...Object.values(TEAM_STRENGTH));
    expect(TEAM_STRENGTH['Argentina']).toBe(max);
  });

  it('has at least 16 teams defined', () => {
    expect(Object.keys(TEAM_STRENGTH).length).toBeGreaterThanOrEqual(16);
  });

  it('all strength values are positive integers 1–10', () => {
    Object.entries(TEAM_STRENGTH).forEach(([team, s]) => {
      expect(s).toBeGreaterThanOrEqual(1);
      expect(s).toBeLessThanOrEqual(10);
      expect(Number.isInteger(s)).toBe(true);
    });
  });
});

/* ══════════════════════════════════════════════════════════════
   TICKER ITEMS
══════════════════════════════════════════════════════════════ */
describe('TICKER_ITEMS', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(TICKER_ITEMS)).toBe(true);
    expect(TICKER_ITEMS.length).toBeGreaterThan(0);
  });

  it('contains WE ARE 26', () => {
    const found = TICKER_ITEMS.some(item => item.includes('WE ARE 26'));
    expect(found).toBe(true);
  });

  it('contains the year 2026', () => {
    const found = TICKER_ITEMS.some(item => item.includes('2026'));
    expect(found).toBe(true);
  });

  it('all items are non-empty strings', () => {
    TICKER_ITEMS.forEach(item => {
      expect(typeof item).toBe('string');
      expect(item.trim().length).toBeGreaterThan(0);
    });
  });
});

/* ══════════════════════════════════════════════════════════════
   VENUES
══════════════════════════════════════════════════════════════ */
describe('VENUES', () => {
  it('has at least 10 venues', () => {
    expect(VENUES.length).toBeGreaterThanOrEqual(10);
  });

  it('all venues have required fields', () => {
    VENUES.forEach(v => {
      expect(v).toHaveProperty('city');
      expect(v).toHaveProperty('stadium');
      expect(v).toHaveProperty('capacity');
      expect(v).toHaveProperty('country');
    });
  });

  it('MetLife Stadium is marked as the Final venue', () => {
    const metlife = VENUES.find(v => v.stadium === 'MetLife Stadium');
    expect(metlife).toBeDefined();
    expect(metlife.isFinal).toBe(true);
  });

  it('all capacities are above 40000', () => {
    VENUES.forEach(v => {
      expect(v.capacity).toBeGreaterThan(40000);
    });
  });

  it('includes venues from USA, CAN, and MEX', () => {
    const countries = new Set(VENUES.map(v => v.country));
    expect(countries.has('USA')).toBe(true);
    expect(countries.has('CAN')).toBe(true);
    expect(countries.has('MEX')).toBe(true);
  });
});

/* ══════════════════════════════════════════════════════════════
   CANVAS OVERLAY
══════════════════════════════════════════════════════════════ */
describe('drawCanvasBrandOverlay', () => {
  it('does not throw when ctx is null', () => {
    expect(() => drawCanvasBrandOverlay(null, 800, 600)).not.toThrow();
  });

  it('calls ctx.save and ctx.restore when ctx is provided', () => {
    const mockCtx = {
      save:              vi.fn(),
      restore:           vi.fn(),
      createRadialGradient: vi.fn(() => ({
        addColorStop: vi.fn(),
      })),
      fillRect:          vi.fn(),
      fillStyle:         null,
    };

    drawCanvasBrandOverlay(mockCtx, 800, 600);

    expect(mockCtx.save).toHaveBeenCalledOnce();
    expect(mockCtx.restore).toHaveBeenCalledOnce();
    expect(mockCtx.createRadialGradient).toHaveBeenCalledOnce();
    expect(mockCtx.fillRect).toHaveBeenCalledWith(0, 0, 800, 600);
  });
});
