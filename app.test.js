import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getCountdownString,
  playerCardData,
  smoothScrollToSection,
} from './app.js';

// ---------------------------------------------------------------------------
// playerCardData – structure tests
// ---------------------------------------------------------------------------
describe('playerCardData', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(playerCardData)).toBe(true);
    expect(playerCardData.length).toBeGreaterThan(0);
  });

  it('every entry has a non-empty name string', () => {
    playerCardData.forEach((player) => {
      expect(typeof player.name).toBe('string');
      expect(player.name.trim().length).toBeGreaterThan(0);
    });
  });

  it('every entry has a non-empty country string', () => {
    playerCardData.forEach((player) => {
      expect(typeof player.country).toBe('string');
      expect(player.country.trim().length).toBeGreaterThan(0);
    });
  });

  it('every entry has a jerseyImage URL string starting with http', () => {
    playerCardData.forEach((player) => {
      expect(typeof player.jerseyImage).toBe('string');
      expect(player.jerseyImage.trim()).toMatch(/^https?:\/\//);
    });
  });

  it('every entry has a sectionTarget that starts with #', () => {
    playerCardData.forEach((player) => {
      expect(typeof player.sectionTarget).toBe('string');
      expect(player.sectionTarget.startsWith('#')).toBe(true);
    });
  });
});

// ---------------------------------------------------------------------------
// getCountdownString – countdown timer helper
// ---------------------------------------------------------------------------
describe('getCountdownString', () => {
  it('returns a string', () => {
    const future = new Date(Date.now() + 100_000);
    expect(typeof getCountdownString(future)).toBe('string');
  });

  it('returns "Match has started!" when the target is in the past', () => {
    const past = new Date(Date.now() - 1000);
    expect(getCountdownString(past)).toBe('Match has started!');
  });

  it('returns "Match has started!" when target equals now', () => {
    const now = new Date(Date.now());
    // Allow tiny execution delay – treat ≤ 0 as started
    const result = getCountdownString(now);
    expect(result).toBe('Match has started!');
  });

  it('formats days, hours, minutes and seconds correctly', () => {
    // Freeze time so arithmetic is deterministic
    const BASE = 1_700_000_000_000;
    vi.useFakeTimers();
    vi.setSystemTime(BASE);

    const twoHoursAhead = new Date(BASE + 2 * 60 * 60 * 1000); // exactly 2 h
    const result = getCountdownString(twoHoursAhead);

    expect(result).toMatch(/0d/);
    expect(result).toMatch(/2h/);
    expect(result).toMatch(/0m/);
    expect(result).toMatch(/0s/);

    vi.useRealTimers();
  });

  it('handles exactly one day remaining', () => {
    const BASE = 1_700_000_000_000;
    vi.useFakeTimers();
    vi.setSystemTime(BASE);

    const oneDayAhead = new Date(BASE + 24 * 60 * 60 * 1000);
    const result = getCountdownString(oneDayAhead);

    expect(result).toMatch(/1d/);
    expect(result).toMatch(/0h/);

    vi.useRealTimers();
  });

  it('counts seconds correctly for a 90-second window', () => {
    const BASE = 1_700_000_000_000;
    vi.useFakeTimers();
    vi.setSystemTime(BASE);

    const ninetySeconds = new Date(BASE + 90_000);
    const result = getCountdownString(ninetySeconds);

    expect(result).toMatch(/1m/);
    expect(result).toMatch(/30s/);

    vi.useRealTimers();
  });
});

// ---------------------------------------------------------------------------
// smoothScrollToSection – nav click helper
// ---------------------------------------------------------------------------
describe('smoothScrollToSection', () => {
  let target;

  beforeEach(() => {
    // Create a real DOM element to scroll into view
    target = document.createElement('div');
    target.id = 'players';
    document.body.appendChild(target);

    // jsdom doesn't implement scrollIntoView – provide a spy
    target.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    document.body.removeChild(target);
    vi.restoreAllMocks();
  });

  it('calls scrollIntoView on the matching element', () => {
    smoothScrollToSection('#players');
    expect(target.scrollIntoView).toHaveBeenCalledTimes(1);
  });

  it('calls scrollIntoView with smooth behavior', () => {
    smoothScrollToSection('#players');
    expect(target.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it('does nothing when the selector matches no element', () => {
    // Should not throw
    expect(() => smoothScrollToSection('#nonexistent')).not.toThrow();
  });

  it('accepts a bare id string without leading #', () => {
    // Implementation should normalise "players" → "#players"
    smoothScrollToSection('players');
    expect(target.scrollIntoView).toHaveBeenCalledTimes(1);
  });
});
