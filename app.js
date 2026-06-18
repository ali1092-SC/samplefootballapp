/**
 * FIFA World Cup 2026 — app.js
 * Core application logic: logo integration helpers, canvas overlay,
 * and utility exports consumed by app.test.js / vitest.
 */

'use strict';

/* ─────────────────────────────────────────────────────────────────
   LOGO CONSTANTS
   The official FIFA World Cup 2026 logo colour palette and
   geometry constants. These are used by canvas rendering helpers
   and referenced in tests.
───────────────────────────────────────────────────────────────── */
export const LOGO = {
  SYMBOL_ID: 'wc2026-logo',

  COLORS: {
    gold_light: '#f5d675',
    gold_mid:   '#c9a227',
    gold_dark:  '#a07a10',
    black:      '#000000',
    white:      '#ffffff',
  },

  GRADIENT: {
    id:     'goldGrad',
    stops:  [
      { offset: '0%',   color: '#f5d675' },
      { offset: '50%',  color: '#c9a227' },
      { offset: '100%', color: '#a07a10' },
    ],
  },

  RADIAL_GRADIENT: {
    id:  'trophyGrad',
    cx:  '50%', cy: '35%', r: '60%',
    stops: [
      { offset: '0%',   color: '#f5e88a' },
      { offset: '60%',  color: '#c9a227' },
      { offset: '100%', color: '#a07a10' },
    ],
  },

  VIEWBOX:   '0 0 300 420',
  TAGLINE:   'WE ARE 26',
  YEAR:      2026,
  NATIONS:   48,
};

/* ─────────────────────────────────────────────────────────────────
   SIZE CONFIGURATIONS
   Canonical dimensions for each logo placement context.
───────────────────────────────────────────────────────────────── */
export const LOGO_SIZES = {
  hero:    { width: 260, height: 260, cssClass: 'logo-hero'    },
  nav:     { width:  48, height:  48, cssClass: 'logo-nav'     },
  section: { width:  80, height:  80, cssClass: 'logo-section' },
  footer:  { width: 120, height: 120, cssClass: 'logo-footer'  },
  canvas:  { width: 180, height: 180, cssClass: 'logo-canvas'  },
};

/* ─────────────────────────────────────────────────────────────────
   DOM HELPERS
───────────────────────────────────────────────────────────────── */

/**
 * Creates an SVG <use> element referencing the logo symbol.
 * @param {string} sizeKey – one of 'hero' | 'nav' | 'section' | 'footer' | 'canvas'
 * @param {string} [ariaLabel] – accessible label; omit to mark aria-hidden
 * @returns {SVGSVGElement}
 */
export function createLogoElement (sizeKey = 'nav', ariaLabel = null) {
  const cfg = LOGO_SIZES[sizeKey];
  if (!cfg) throw new RangeError(`Unknown logo size key: "${sizeKey}"`);

  const svg  = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width',   String(cfg.width));
  svg.setAttribute('height',  String(cfg.height));
  svg.setAttribute('viewBox', LOGO.VIEWBOX);
  svg.classList.add(cfg.cssClass);

  if (ariaLabel) {
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', ariaLabel);
  } else {
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable',   'false');
  }

  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', `#${LOGO.SYMBOL_ID}`);
  svg.appendChild(use);

  return svg;
}

/**
 * Injects a logo SVG into every element matching `selector`.
 * @param {string}  selector  – CSS selector for target containers
 * @param {string}  sizeKey   – logo size context
 * @param {boolean} [prepend] – if true, insert before first child
 */
export function injectLogos (selector, sizeKey = 'section', prepend = false) {
  const containers = document.querySelectorAll(selector);
  containers.forEach(container => {
    const svg = createLogoElement(sizeKey);
    if (prepend && container.firstChild) {
      container.insertBefore(svg, container.firstChild);
    } else {
      container.appendChild(svg);
    }
  });
  return containers.length;
}

/* ─────────────────────────────────────────────────────────────────
   CANVAS OVERLAY
   Draws a lightweight gold "2026" text mark on the hero canvas
   to reinforce branding alongside the football animation.
   Called after the football animation initialises.
───────────────────────────────────────────────────────────────── */

/**
 * Renders the brand overlay onto a canvas context.
 * The overlay is intentionally subtle — it does NOT replace the
 * inline SVG logo in the hero section but adds a canvas-native mark.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} width   – canvas width
 * @param {number} height  – canvas height
 */
export function drawCanvasBrandOverlay (ctx, width, height) {
  if (!ctx) return;

  ctx.save();

  // Subtle gold radial glow at centre
  const glow = ctx.createRadialGradient(
    width / 2, height / 2, 20,
    width / 2, height / 2, Math.min(width, height) * .45
  );
  glow.addColorStop(0,   'rgba(245, 214, 117, 0.06)');
  glow.addColorStop(.6,  'rgba(201, 162, 39,  0.03)');
  glow.addColorStop(1,   'rgba(0, 0, 0, 0)');

  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  ctx.restore();
}

/* ─────────────────────────────────────────────────────────────────
   COUNTDOWN UTILITY
───────────────────────────────────────────────────────────────── */

/**
 * Calculates time remaining until the FIFA World Cup 2026 opening match.
 * @param {Date} [now] – injectable current time (for testing)
 * @returns {{ days: number, hours: number, minutes: number, seconds: number, expired: boolean }}
 */
export function getCountdownValues (now = new Date()) {
  const TARGET = new Date('2026-06-11T19:00:00-04:00');
  const diff   = TARGET - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  return {
    days:    Math.floor(diff / 864e5),
    hours:   Math.floor((diff % 864e5) / 36e5),
    minutes: Math.floor((diff % 36e5)  / 6e4),
    seconds: Math.floor((diff % 6e4)   / 1e3),
    expired: false,
  };
}

/* ─────────────────────────────────────────────────────────────────
   SCORE PREDICTOR UTILITY
───────────────────────────────────────────────────────────────── */

/** FIFA-ranking-based strength table (higher = stronger) */
export const TEAM_STRENGTH = {
  Argentina:   10,
  France:       9,
  Brazil:       9,
  Spain:        8,
  England:      7,
  Germany:      7,
  Portugal:     7,
  Netherlands:  7,
  Belgium:      8,
  Croatia:      7,
  USA:          5,
  Mexico:       5,
  Canada:       4,
  Morocco:      6,
  Senegal:      5,
  Japan:        5,
};

/**
 * Simulates a Poisson-distributed goal count for one team.
 * Uses a deterministic seed for test reproducibility when provided.
 * @param {number} lambda – expected goals
 * @param {() => number} [rng] – random number generator (default: Math.random)
 * @returns {number} simulated goals
 */
export function poissonGoals (lambda, rng = Math.random) {
  const L = Math.exp(-lambda);
  let k = 0, p = 1;
  do { k++; p *= rng(); } while (p > L);
  return k - 1;
}

/**
 * Predicts a scoreline for a match between two teams.
 * @param {string}   teamA
 * @param {string}   teamB
 * @param {()=>number} [rng]
 * @returns {{ teamA: string, teamB: string, goalsA: number, goalsB: number }}
 */
export function predictMatch (teamA, teamB, rng = Math.random) {
  if (teamA === teamB) throw new Error('Teams must be different');

  const sA = TEAM_STRENGTH[teamA] ?? 5;
  const sB = TEAM_STRENGTH[teamB] ?? 5;
  const total = sA + sB;

  const lambdaA = (sA / total) * 2.8;
  const lambdaB = (sB / total) * 2.8;

  return {
    teamA,
    teamB,
    goalsA: poissonGoals(lambdaA, rng),
    goalsB: poissonGoals(lambdaB, rng),
  };
}

/* ─────────────────────────────────────────────────────────────────
   TICKER UTILITY
───────────────────────────────────────────────────────────────── */

/** Default ticker items displayed in the news ticker */
export const TICKER_ITEMS = [
  '🏆 FIFA World Cup 2026 — USA · Canada · Mexico',
  '48 Nations Competing For The First Time In History',
  'Opening Match: June 11, 2026 · MetLife Stadium, New York',
  'Final: July 19, 2026 · MetLife Stadium',
  '16 World-Class Venues Across 3 Countries',
  '104 Matches · 48 Teams · 1 Trophy',
  'WE ARE 26 — The Greatest Show On Earth Returns',
];

/* ─────────────────────────────────────────────────────────────────
   VENUE DATA
───────────────────────────────────────────────────────────────── */
export const VENUES = [
  { city: 'New York / New Jersey', stadium: 'MetLife Stadium',            capacity: 82500, country: 'USA', isFinal: true  },
  { city: 'Los Angeles',           stadium: 'SoFi Stadium',               capacity: 70240, country: 'USA', isFinal: false },
  { city: 'Dallas / Fort Worth',   stadium: 'AT&T Stadium',               capacity: 80000, country: 'USA', isFinal: false },
  { city: 'Houston',               stadium: 'NRG Stadium',                capacity: 72220, country: 'USA', isFinal: false },
  { city: 'Miami',                 stadium: 'Hard Rock Stadium',          capacity: 65326, country: 'USA', isFinal: false },
  { city: 'Denver',                stadium: 'Empower Field at Mile High', capacity: 76125, country: 'USA', isFinal: false },
  { city: 'San Francisco Bay Area',stadium: 'Levi\'s Stadium',            capacity: 68500, country: 'USA', isFinal: false },
  { city: 'Mexico City',           stadium: 'Estadio Azteca',             capacity: 87523, country: 'MEX', isFinal: false },
  { city: 'Toronto',               stadium: 'BMO Field / Rogers Centre',  capacity: 45000, country: 'CAN', isFinal: false },
  { city: 'Vancouver',             stadium: 'BC Place',                   capacity: 54500, country: 'CAN', isFinal: false },
];

/* ─────────────────────────────────────────────────────────────────
   DEFAULT EXPORT
───────────────────────────────────────────────────────────────── */
export default {
  LOGO,
  LOGO_SIZES,
  TEAM_STRENGTH,
  TICKER_ITEMS,
  VENUES,
  createLogoElement,
  injectLogos,
  drawCanvasBrandOverlay,
  getCountdownValues,
  poissonGoals,
  predictMatch,
};
