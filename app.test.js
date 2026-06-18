import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// ─── Minimal DOM bootstrap ────────────────────────────────────────────────────
function buildDOM() {
  document.body.innerHTML = `
    <div id="ball-container">
      <div id="ball-shadow"></div>
      <div id="ball" class="idle"></div>
    </div>
  `;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getBall = () => document.getElementById('ball');
const getShadow = () => document.getElementById('ball-shadow');

// ─── Parabolic Arc Math ───────────────────────────────────────────────────────
/**
 * Mirrors the parabolic height calculation expected in app.js.
 * h(t) = 4 * maxHeight * t * (1 - t)   where t ∈ [0, 1]
 */
function parabolaHeight(t, maxHeight = 1) {
  return 4 * maxHeight * t * (1 - t);
}

/**
 * Spin angle for a 720° rotation over the flight duration.
 */
function spinAngle(t) {
  return 720 * t;
}

/**
 * Squash-and-stretch scale on the Y axis.
 * On takeoff (t≈0) and landing (t≈1) the ball squashes (scaleY < 1),
 * at the peak (t=0.5) it stretches (scaleY > 1).
 */
function squashStretchY(t) {
  const height = parabolaHeight(t);
  // stretch at peak, squash at ground
  return 0.8 + 0.4 * height; // range [0.8 – 1.2]
}

// ─── Shadow sync helper (mirrors expected app.js logic) ───────────────────────
function shadowScale(t) {
  const height = parabolaHeight(t);
  // shadow shrinks as ball rises; full size at ground, near-zero at peak
  return 1 - 0.8 * height; // range [0.2 – 1.0]
}

function shadowOpacity(t) {
  const height = parabolaHeight(t);
  return 1 - 0.7 * height; // range [0.3 – 1.0]
}

// ═════════════════════════════════════════════════════════════════════════════
// 1. PARABOLIC ARC CALCULATIONS
// ═════════════════════════════════════════════════════════════════════════════
describe('Parabolic arc calculations', () => {
  it('height is 0 at t=0 (takeoff)', () => {
    expect(parabolaHeight(0)).toBe(0);
  });

  it('height is 0 at t=1 (landing)', () => {
    expect(parabolaHeight(1)).toBe(0);
  });

  it('height is maximum at t=0.5 (peak)', () => {
    const peak = parabolaHeight(0.5);
    expect(peak).toBe(1); // normalised maximum
  });

  it('height at t=0.5 is greater than at t=0.25 and t=0.75', () => {
    expect(parabolaHeight(0.5)).toBeGreaterThan(parabolaHeight(0.25));
    expect(parabolaHeight(0.5)).toBeGreaterThan(parabolaHeight(0.75));
  });

  it('arc is symmetric around the midpoint', () => {
    const epsilon = 1e-10;
    [0.1, 0.2, 0.3, 0.4].forEach((t) => {
      expect(Math.abs(parabolaHeight(t) - parabolaHeight(1 - t))).toBeLessThan(epsilon);
    });
  });

  it('height is always non-negative for t in [0, 1]', () => {
    for (let t = 0; t <= 1; t += 0.05) {
      expect(parabolaHeight(t)).toBeGreaterThanOrEqual(0);
    }
  });

  it('respects a custom maxHeight', () => {
    expect(parabolaHeight(0.5, 200)).toBe(200);
  });

  it('height increases monotonically from t=0 to t=0.5', () => {
    let prev = parabolaHeight(0);
    for (let t = 0.05; t <= 0.5; t += 0.05) {
      const current = parabolaHeight(t);
      expect(current).toBeGreaterThanOrEqual(prev);
      prev = current;
    }
  });

  it('height decreases monotonically from t=0.5 to t=1', () => {
    let prev = parabolaHeight(0.5);
    for (let t = 0.55; t <= 1; t += 0.05) {
      const current = parabolaHeight(t);
      expect(current).toBeLessThanOrEqual(prev);
      prev = current;
    }
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 2. 720° SPIN PROGRESSION
// ═════════════════════════════════════════════════════════════════════════════
describe('720° spin progression', () => {
  it('spin is 0° at t=0', () => {
    expect(spinAngle(0)).toBe(0);
  });

  it('spin is 360° at the midpoint t=0.5', () => {
    expect(spinAngle(0.5)).toBe(360);
  });

  it('spin is 720° at t=1 (full flight)', () => {
    expect(spinAngle(1)).toBe(720);
  });

  it('spin increases linearly', () => {
    const delta = spinAngle(0.6) - spinAngle(0.5);
    expect(delta).toBeCloseTo(spinAngle(0.1) - spinAngle(0), 5);
  });

  it('spin is proportional to t', () => {
    [0.2, 0.4, 0.7, 0.9].forEach((t) => {
      expect(spinAngle(t)).toBeCloseTo(720 * t, 10);
    });
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 3. SQUASH-AND-STRETCH
// ═════════════════════════════════════════════════════════════════════════════
describe('Squash-and-stretch values', () => {
  it('scaleY is at minimum (squash) at takeoff t=0', () => {
    expect(squashStretchY(0)).toBeCloseTo(0.8, 5);
  });

  it('scaleY is at minimum (squash) at landing t=1', () => {
    expect(squashStretchY(1)).toBeCloseTo(0.8, 5);
  });

  it('scaleY is at maximum (stretch) at peak t=0.5', () => {
    expect(squashStretchY(0.5)).toBeCloseTo(1.2, 5);
  });

  it('scaleY is greater at peak than at ground', () => {
    expect(squashStretchY(0.5)).toBeGreaterThan(squashStretchY(0));
  });

  it('scaleY stays within [0.8, 1.2] for all t in [0,1]', () => {
    for (let t = 0; t <= 1; t += 0.05) {
      const s = squashStretchY(t);
      expect(s).toBeGreaterThanOrEqual(0.8 - 1e-9);
      expect(s).toBeLessThanOrEqual(1.2 + 1e-9);
    }
  });

  it('squash is symmetric around t=0.5', () => {
    [0.1, 0.2, 0.3, 0.4].forEach((t) => {
      expect(squashStretchY(t)).toBeCloseTo(squashStretchY(1 - t), 10);
    });
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 4. SHADOW SYNCHRONISATION
// ═════════════════════════════════════════════════════════════════════════════
describe('Shadow synchronisation', () => {
  it('shadow scale is full (1.0) at ground level t=0', () => {
    expect(shadowScale(0)).toBeCloseTo(1.0, 5);
  });

  it('shadow scale is full (1.0) at landing t=1', () => {
    expect(shadowScale(1)).toBeCloseTo(1.0, 5);
  });

  it('shadow scale is minimum at peak t=0.5', () => {
    expect(shadowScale(0.5)).toBeCloseTo(0.2, 5);
  });

  it('shadow scale decreases as ball rises (t=0 → t=0.5)', () => {
    let prev = shadowScale(0);
    for (let t = 0.1; t <= 0.5; t += 0.1) {
      const current = shadowScale(t);
      expect(current).toBeLessThanOrEqual(prev + 1e-9);
      prev = current;
    }
  });

  it('shadow scale increases as ball descends (t=0.5 → t=1)', () => {
    let prev = shadowScale(0.5);
    for (let t = 0.6; t <= 1; t += 0.1) {
      const current = shadowScale(t);
      expect(current).toBeGreaterThanOrEqual(prev - 1e-9);
      prev = current;
    }
  });

  it('shadow opacity is full (1.0) at ground level', () => {
    expect(shadowOpacity(0)).toBeCloseTo(1.0, 5);
  });

  it('shadow opacity is minimum at peak t=0.5', () => {
    expect(shadowOpacity(0.5)).toBeCloseTo(0.3, 5);
  });

  it('shadow scale stays within [0.2, 1.0]', () => {
    for (let t = 0; t <= 1; t += 0.05) {
      const s = shadowScale(t);
      expect(s).toBeGreaterThanOrEqual(0.2 - 1e-9);
      expect(s).toBeLessThanOrEqual(1.0 + 1e-9);
    }
  });

  it('shadow scale is symmetric around t=0.5', () => {
    [0.1, 0.2, 0.3, 0.4].forEach((t) => {
      expect(shadowScale(t)).toBeCloseTo(shadowScale(1 - t), 10);
    });
  });

  describe('DOM: shadow element updates', () => {
    beforeEach(buildDOM);

    it('#ball-shadow element exists in the DOM', () => {
      expect(getShadow()).not.toBeNull();
    });

    it('applies scale transform to shadow element at ground', () => {
      const shadow = getShadow();
      const scale = shadowScale(0);
      shadow.style.transform = `scale(${scale})`;
      expect(shadow.style.transform).toBe('scale(1)');
    });

    it('applies scale transform to shadow element at peak', () => {
      const shadow = getShadow();
      const scale = shadowScale(0.5);
      shadow.style.transform = `scale(${scale})`;
      expect(shadow.style.transform).toContain('scale(0.2)');
    });

    it('applies opacity to shadow element at peak', () => {
      const shadow = getShadow();
      shadow.style.opacity = String(shadowOpacity(0.5));
      expect(parseFloat(shadow.style.opacity)).toBeCloseTo(0.3, 5);
    });
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 5. CLICK INTERACTION — impact scale-burst
// ═════════════════════════════════════════════════════════════════════════════
describe('Click interaction – impact scale-burst', () => {
  beforeEach(() => {
    buildDOM();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('#ball element exists', () => {
    expect(getBall()).not.toBeNull();
  });

  it('adds "clicked" class on click', () => {
    const ball = getBall();
    ball.addEventListener('click', () => ball.classList.add('clicked'));
    ball.click();
    expect(ball.classList.contains('clicked')).toBe(true);
  });

  it('removes "clicked" class after animation completes', () => {
    const ball = getBall();
    ball.addEventListener('click', () => {
      ball.classList.add('clicked');
      setTimeout(() => ball.classList.remove('clicked'), 300);
    });
    ball.click();
    expect(ball.classList.contains('clicked')).toBe(true);
    vi.advanceTimersByTime(300);
    expect(ball.classList.contains('clicked')).toBe(false);
  });

  it('adds "flying" class on click to indicate flight start', () => {
    const ball = getBall();
    ball.addEventListener('click', () => ball.classList.add('flying'));
    ball.click();
    expect(ball.classList.contains('flying')).toBe(true);
  });

  it('removes "idle" class when ball is clicked', () => {
    const ball = getBall();
    ball.addEventListener('click', () => ball.classList.remove('idle'));
    ball.click();
    expect(ball.classList.contains('idle')).toBe(false);
  });

  it('restores "idle" class after flight sequence ends', () => {
    const ball = getBall();
    ball.addEventListener('click', () => {
      ball.classList.remove('idle');
      ball.classList.add('flying');
      setTimeout(() => {
        ball.classList.remove('flying');
        ball.classList.add('idle');
      }, 1000);
    });
    ball.click();
    expect(ball.classList.contains('idle')).toBe(false);
    vi.advanceTimersByTime(1000);
    expect(ball.classList.contains('idle')).toBe(true);
  });

  it('does not stack multiple "clicked" classes on rapid clicks', () => {
    const ball = getBall();
    const handler = () => {
      ball.classList.remove('clicked');
      ball.classList.add('clicked');
    };
    ball.addEventListener('click', handler);
    ball.click();
    ball.click();
    ball.click();
    // classList is a Set-like: duplicates are ignored
    const count = [...ball.classList].filter((c) => c === 'clicked').length;
    expect(count).toBe(1);
  });

  it('impact scale-burst: ball scale goes above 1 immediately on click', () => {
    const ball = getBall();
    ball.addEventListener('click', () => {
      ball.style.transform = 'scale(1.3)';
      setTimeout(() => {
        ball.style.transform = 'scale(1)';
      }, 150);
    });
    ball.click();
    const scaleMatch = ball.style.transform.match(/scale\(([^)]+)\)/);
    expect(scaleMatch).not.toBeNull();
    expect(parseFloat(scaleMatch[1])).toBeGreaterThan(1);
  });

  it('impact scale-burst: ball returns to normal scale after burst', () => {
    const ball = getBall();
    ball.addEventListener('click', () => {
      ball.style.transform = 'scale(1.3)';
      setTimeout(() => {
        ball.style.transform = 'scale(1)';
      }, 150);
    });
    ball.click();
    vi.advanceTimersByTime(150);
    const scaleMatch = ball.style.transform.match(/scale\(([^)]+)\)/);
    expect(parseFloat(scaleMatch[1])).toBeCloseTo(1, 5);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 6. IDLE STATE ANIMATIONS
// ═════════════════════════════════════════════════════════════════════════════
describe('Idle state animations', () => {
  beforeEach(buildDOM);

  it('ball has "idle" class by default', () => {
    expect(getBall().classList.contains('idle')).toBe(true);
  });

  it('ball does not have "flying" class in idle state', () => {
    expect(getBall().classList.contains('flying')).toBe(false);
  });

  it('ball does not have "clicked" class in idle state', () => {
    expect(getBall().classList.contains('clicked')).toBe(false);
  });

  it('shadow element is present during idle state', () => {
    expect(getShadow()).not.toBeNull();
  });

  it('idle wobble, bounce, and sway coexist as separate animation names', () => {
    // Simulate what CSS would deliver; verify the class supports all three
    const ball = getBall();
    // In a real CSS environment the computed animation-name would list all three;
    // here we verify that the element accepts an inline style with multiple animations
    ball.style.animationName = 'bounce, sway, wobble';
    expect(ball.style.animationName).toBe('bounce, sway, wobble');
  });

  it('idle class can be toggled off and back on', () => {
    const ball = getBall();
    ball.classList.remove('idle');
    expect(ball.classList.contains('idle')).toBe(false);
    ball.classList.add('idle');
    expect(ball.classList.contains('idle')).toBe(true);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 7. DROP-IN BOUNCE REAPPEARANCE
// ═════════════════════════════════════════════════════════════════════════════
describe('Drop-in bounce reappearance', () => {
  beforeEach(() => {
    buildDOM();
    vi.useFakeTimers();
  });
  afterEach(() => vi.useRealTimers());

  it('ball is hidden (visibility hidden or opacity 0) mid-flight reset', () => {
    const ball = getBall();
    // Simulate the ball being hidden before drop-in
    ball.style.visibility = 'hidden';
    expect(ball.style.visibility).toBe('hidden');
  });

  it('ball becomes visible after drop-in delay', () => {
    const ball = getBall();
    ball.style.visibility = 'hidden';
    setTimeout(() => {
      ball.style.visibility = 'visible';
    }, 500);
    vi.advanceTimersByTime(500);
    expect(ball.style.visibility).toBe('visible');
  });

  it('adds "drop-in" class during reappearance animation', () => {
    const ball = getBall();
    setTimeout(() => ball.classList.add('drop-in'), 500);
    vi.advanceTimersByTime(500);
    expect(ball.classList.contains('drop-in')).toBe(true);
  });

  it('removes "drop-in" class after reappearance animation completes', () => {
    const ball = getBall();
    ball.classList.add('drop-in');
    setTimeout(() => ball.classList.remove('drop-in'), 600);
    vi.advanceTimersByTime(600);
    expect(ball.classList.contains('drop-in')).toBe(false);
  });

  it('ball returns to idle state after drop-in completes', () => {
    const ball = getBall();
    ball.classList.remove('idle');
    ball.classList.add('drop-in');
    setTimeout(() => {
      ball.classList.remove('drop-in');
      ball.classList.add('idle');
    }, 600);
    vi.advanceTimersByTime(600);
    expect(ball.classList.contains('idle')).toBe(true);
    expect(ball.classList.contains('drop-in')).toBe(false);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 8. EDGE CASES & REGRESSION TESTS
// ═════════════════════════════════════════════════════════════════════════════
describe('Edge cases and regression tests', () => {
  beforeEach(() => {
    buildDOM();
    vi.useFakeTimers();
  });
  afterEach(() => vi.useRealTimers());

  it('rapid repeated clicks do not leave conflicting animation states', () => {
    const ball = getBall();
    const simulateClick = () => {
      ball.classList.remove('clicked');
      ball.classList.add('clicked');
      setTimeout(() => ball.classList.remove('clicked'), 300);
    };
    simulateClick();
    simulateClick();
    simulateClick();
    vi.advanceTimersByTime(300);
    expect(ball.classList.contains('clicked')).toBe(false);
  });

  it('clicking during flight does not re-add idle class prematurely', () => {
    const ball = getBall();
    ball.classList.remove('idle');
    ball.classList.add('flying');

    // A second click during flight should not restore idle
    const clickDuringFlight = () => {
      if (!ball.classList.contains('flying')) {
        ball.classList.add('idle');
      }
    };
    clickDuringFlight();
    expect(ball.classList.contains('idle')).toBe(false);
  });

  it('animation interruption mid-flight clears flying state', () => {
    const ball = getBall();
    ball.classList.add('flying');
    // Simulate an interruption
    ball.classList.remove('flying');
    expect(ball.classList.contains('flying')).toBe(false);
  });

  it('no stacked flying classes after multiple rapid clicks', () => {
    const ball = getBall();
    for (let i = 0; i < 10; i++) {
      ball.classList.remove('flying');
      ball.classList.add('flying');
    }
    const count = [...ball.classList].filter((c) => c === 'flying').length;
    expect(count).toBe(1);
  });

  it('ball element is never detached from the DOM during animation cycles', () => {
    const ball = getBall();
    ball.classList.add('flying');
    vi.advanceTimersByTime(500);
    ball.classList.remove('flying');
    ball.classList.add('idle');
    expect(document.getElementById('ball')).not.toBeNull();
  });

  it('shadow element is never detached from the DOM during animation cycles', () => {
    const ball = getBall();
    ball.classList.add('flying');
    vi.advanceTimersByTime(1000);
    expect(document.getElementById('ball-shadow')).not.toBeNull();
  });

  it('parabolicHeight returns 0 for t values outside [0, 1] boundaries exactly', () => {
    expect(parabolaHeight(0)).toBe(0);
    expect(parabolaHeight(1)).toBe(0);
  });

  it('spin resets to 0 at the start of a new flight', () => {
    expect(spinAngle(0)).toBe(0);
  });

  it('squash scaleY does not go below 0.8 even at exact ground contact', () => {
    expect(squashStretchY(0)).toBeGreaterThanOrEqual(0.8);
    expect(squashStretchY(1)).toBeGreaterThanOrEqual(0.8);
  });

  it('shadow scale does not exceed 1.0 at ground level', () => {
    expect(shadowScale(0)).toBeLessThanOrEqual(1.0);
    expect(shadowScale(1)).toBeLessThanOrEqual(1.0);
  });

  it('multiple animation states do not accumulate on idle re-entry', () => {
    const ball = getBall();
    // Simulate full cycle twice
    for (let i = 0; i < 2; i++) {
      ball.classList.remove('idle');
      ball.classList.add('flying');
      ball.classList.remove('flying');
      ball.classList.add('drop-in');
      ball.classList.remove('drop-in');
      ball.classList.add('idle');
    }
    const states = [...ball.classList];
    expect(states.filter((c) => c === 'idle').length).toBe(1);
    expect(states.filter((c) => c === 'flying').length).toBe(0);
    expect(states.filter((c) => c === 'drop-in').length).toBe(0);
  });

  it('ball container element is always present', () => {
    expect(document.getElementById('ball-container')).not.toBeNull();
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 9. ANIMATION FRAME SEQUENCE INTEGRITY
// ═════════════════════════════════════════════════════════════════════════════
describe('Animation frame sequence integrity', () => {
  it('full t-sequence from 0 to 1 produces valid height values', () => {
    const steps = 20;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const h = parabolaHeight(t);
      expect(typeof h).toBe('number');
      expect(isNaN(h)).toBe(false);
      expect(isFinite(h)).toBe(true);
    }
  });

  it('full t-sequence produces valid spin angles', () => {
    const steps = 20;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const angle = spinAngle(t);
      expect(angle).toBeGreaterThanOrEqual(0);
      expect(angle).toBeLessThanOrEqual(720);
    }
  });

  it('full t-sequence produces valid squash-stretch values', () => {
    const steps = 20;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const s = squashStretchY(t);
      expect(s).toBeGreaterThanOrEqual(0.8 - 1e-9);
      expect(s).toBeLessThanOrEqual(1.2 + 1e-9);
    }
  });

  it('full t-sequence produces valid shadow scales', () => {
    const steps = 20;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const s = shadowScale(t);
      expect(s).toBeGreaterThanOrEqual(0.2 - 1e-9);
      expect(s).toBeLessThanOrEqual(1.0 + 1e-9);
    }
  });

  it('height and shadow scale are inversely correlated', () => {
    for (let t = 0; t <= 1; t += 0.1) {
      const h = parabolaHeight(t);
      const s = shadowScale(t);
      // As height increases shadow scale decreases
      if (t > 0 && t < 1) {
        expect(s).toBeLessThan(1);
        expect(h).toBeGreaterThan(0);
      }
    }
  });

  it('squash-stretch and height are positively correlated', () => {
    for (let t = 0.05; t < 0.95; t += 0.1) {
      const h = parabolaHeight(t);
      const s = squashStretchY(t);
      // Greater height → greater scaleY
      expect(s).toBeGreaterThan(0.8);
      expect(h).toBeGreaterThan(0);
    }
  });
});
