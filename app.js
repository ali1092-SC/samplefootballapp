/**
 * FIFA World Cup 2026 – App Engine
 * Handles live match data, news content, standings, top scorers,
 * host cities, countdown timers and periodic live-score refresh.
 */

'use strict';

/* ═══════════════════════════════════════════════════════════════
   DATA — LIVE & TODAY'S MATCHES
═══════════════════════════════════════════════════════════════ */
export const liveMatchesData = [
  {
    id: 'm001',
    group: 'Group A',
    status: 'LIVE',
    minute: '74',
    homeTeam: { name: 'Brazil', flag: '🇧🇷', score: 2 },
    awayTeam: { name: 'Croatia', flag: '🇭🇷', score: 1 },
    venue: 'SoFi Stadium, Los Angeles',
    attendance: '87,234',
    events: ['⚽ Vinícius Jr. 18\'', '⚽ Rodrygo 55\'', '⚽ Kramarić 68\''],
    day: 'today',
  },
  {
    id: 'm002',
    group: 'Group B',
    status: 'LIVE',
    minute: '45+2',
    homeTeam: { name: 'Argentina', flag: '🇦🇷', score: 0 },
    awayTeam: { name: 'Netherlands', flag: '🇳🇱', score: 0 },
    venue: 'MetLife Stadium, New Jersey',
    attendance: '82,500',
    events: [],
    day: 'today',
  },
  {
    id: 'm003',
    group: 'Group C',
    status: 'HT',
    minute: 'HT',
    homeTeam: { name: 'Germany', flag: '🇩🇪', score: 2 },
    awayTeam: { name: 'Japan', flag: '🇯🇵', score: 0 },
    venue: 'AT&T Stadium, Dallas',
    attendance: '79,000',
    events: ['⚽ Müller 22\'', '⚽ Havertz 44\''],
    day: 'today',
  },
  {
    id: 'm004',
    group: 'Group D',
    status: 'LIVE',
    minute: '88',
    homeTeam: { name: 'France', flag: '🇫🇷', score: 1 },
    awayTeam: { name: 'Denmark', flag: '🇩🇰', score: 1 },
    venue: 'Estadio Azteca, Mexico City',
    attendance: '91,000',
    events: ['⚽ Mbappé 31\'', '⚽ Eriksen 76\''],
    day: 'today',
  },
  {
    id: 'm005',
    group: 'Group E',
    status: 'FT',
    minute: 'FT',
    homeTeam: { name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', score: 3 },
    awayTeam: { name: 'Iran', flag: '🇮🇷', score: 0 },
    venue: 'Lumen Field, Seattle',
    attendance: '68,740',
    events: ['⚽ Bellingham 6\'', '⚽ Saka 43\'', '⚽ Rashford 71\''],
    day: 'today',
  },
  {
    id: 'm006',
    group: 'Group F',
    status: 'LIVE',
    minute: '61',
    homeTeam: { name: 'USA', flag: '🇺🇸', score: 1 },
    awayTeam: { name: 'Mexico', flag: '🇲🇽', score: 2 },
    venue: 'Rose Bowl, Pasadena',
    attendance: '93,420',
    events: ['⚽ Pulisic 14\'', '⚽ Martín 27\'', '⚽ Giménez 53\''],
    day: 'today',
  },
  /* TOMORROW */
  {
    id: 'm007',
    group: 'Group G',
    status: 'UPCOMING',
    kickoff: getTomorrowKickoff(14, 0),
    homeTeam: { name: 'Spain', flag: '🇪🇸', score: null },
    awayTeam: { name: 'Morocco', flag: '🇲🇦', score: null },
    venue: 'Hard Rock Stadium, Miami',
    attendance: null,
    events: [],
    day: 'tomorrow',
  },
  {
    id: 'm008',
    group: 'Group H',
    status: 'UPCOMING',
    kickoff: getTomorrowKickoff(17, 0),
    homeTeam: { name: 'Portugal', flag: '🇵🇹', score: null },
    awayTeam: { name: 'Uruguay', flag: '🇺🇾', score: null },
    venue: 'Gillette Stadium, Boston',
    attendance: null,
    events: [],
    day: 'tomorrow',
  },
  {
    id: 'm009',
    group: 'Group A',
    status: 'UPCOMING',
    kickoff: getTomorrowKickoff(20, 0),
    homeTeam: { name: 'Belgium', flag: '🇧🇪', score: null },
    awayTeam: { name: 'Australia', flag: '🇦🇺', score: null },
    venue: 'Arrowhead Stadium, Kansas City',
    attendance: null,
    events: [],
    day: 'tomorrow',
  },
  {
    id: 'm010',
    group: 'Group B',
    status: 'UPCOMING',
    kickoff: getTomorrowKickoff(22, 0),
    homeTeam: { name: 'Japan', flag: '🇯🇵', score: null },
    awayTeam: { name: 'Poland', flag: '🇵🇱', score: null },
    venue: 'BC Place, Vancouver',
    attendance: null,
    events: [],
    day: 'tomorrow',
  },
];

/** Returns a Date object for tomorrow at the given hour/minute (local time) */
function getTomorrowKickoff(hour, minute) {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(hour, minute, 0, 0);
  return d;
}

/* ═══════════════════════════════════════════════════════════════
   DATA — GROUP STANDINGS
═══════════════════════════════════════════════════════════════ */
export const standingsData = {
  A: [
    { pos: 1, flag: '🇧🇷', name: 'Brazil',     mp: 2, w: 2, d: 0, l: 0, gf: 5, ga: 1, gd: '+4', pts: 6, form: ['W','W'], qualify: 'direct' },
    { pos: 2, flag: '🇨🇭', name: 'Switzerland', mp: 2, w: 1, d: 0, l: 1, gf: 3, ga: 2, gd: '+1', pts: 3, form: ['W','L'], qualify: 'playoff' },
    { pos: 3, flag: '🇭🇷', name: 'Croatia',     mp: 2, w: 1, d: 0, l: 1, gf: 2, ga: 3, gd: '-1', pts: 3, form: ['L','W'], qualify: null },
    { pos: 4, flag: '🇨🇦', name: 'Canada',      mp: 2, w: 0, d: 0, l: 2, gf: 1, ga: 5, gd: '-4', pts: 0, form: ['L','L'], qualify: null },
  ],
  B: [
    { pos: 1, flag: '🇦🇷', name: 'Argentina',   mp: 2, w: 1, d: 1, l: 0, gf: 3, ga: 1, gd: '+2', pts: 4, form: ['W','D'], qualify: 'direct' },
    { pos: 2, flag: '🇳🇱', name: 'Netherlands', mp: 2, w: 1, d: 1, l: 0, gf: 2, ga: 1, gd: '+1', pts: 4, form: ['D','W'], qualify: 'playoff' },
    { pos: 3, flag: '🇸🇦', name: 'Saudi Arabia',mp: 2, w: 1, d: 0, l: 1, gf: 2, ga: 3, gd: '-1', pts: 3, form: ['W','L'], qualify: null },
    { pos: 4, flag: '🇲🇽', name: 'Mexico',      mp: 2, w: 0, d: 0, l: 2, gf: 2, ga: 4, gd: '-2', pts: 0, form: ['L','L'], qualify: null },
  ],
  C: [
    { pos: 1, flag: '🇩🇪', name: 'Germany',     mp: 2, w: 2, d: 0, l: 0, gf: 4, ga: 0, gd: '+4', pts: 6, form: ['W','W'], qualify: 'direct' },
    { pos: 2, flag: '🇯🇵', name: 'Japan',        mp: 2, w: 1, d: 0, l: 1, gf: 2, ga: 2, gd: '0',  pts: 3, form: ['W','L'], qualify: 'playoff' },
    { pos: 3, flag: '🇺🇸', name: 'USA',          mp: 2, w: 0, d: 1, l: 1, gf: 2, ga: 3, gd: '-1', pts: 1, form: ['D','L'], qualify: null },
    { pos: 4, flag: '🇨🇷', name: 'Costa Rica',   mp: 2, w: 0, d: 1, l: 1, gf: 1, ga: 4, gd: '-3', pts: 1, form: ['L','D'], qualify: null },
  ],
  D: [
    { pos: 1, flag: '🇫🇷', name: 'France',       mp: 2, w: 1, d: 1, l: 0, gf: 3, ga: 1, gd: '+2', pts: 4, form: ['W','D'], qualify: 'direct' },
    { pos: 2, flag: '🇩🇰', name: 'Denmark',       mp: 2, w: 1, d: 1, l: 0, gf: 2, ga: 1, gd: '+1', pts: 4, form: ['D','W'], qualify: 'playoff' },
    { pos: 3, flag: '🇹🇳', name: 'Tunisia',       mp: 2, w: 1, d: 0, l: 1, gf: 2, ga: 2, gd: '0',  pts: 3, form: ['L','W'], qualify: null },
    { pos: 4, flag: '🇦🇺', name: 'Australia',     mp: 2, w: 0, d: 0, l: 2, gf: 0, ga: 3, gd: '-3', pts: 0, form: ['L','L'], qualify: null },
  ],
  E: [
    { pos: 1, flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', name: 'England',  mp: 2, w: 2, d: 0, l: 0, gf: 5, ga: 1, gd: '+4', pts: 6, form: ['W','W'], qualify: 'direct' },
    { pos: 2, flag: '🇺🇸', name: 'USA',          mp: 2, w: 1, d: 0, l: 1, gf: 2, ga: 3, gd: '-1', pts: 3, form: ['W','L'], qualify: 'playoff' },
    { pos: 3, flag: '🇮🇷', name: 'Iran',          mp: 2, w: 0, d: 1, l: 1, gf: 1, ga: 2, gd: '-1', pts: 1, form: ['L','D'], qualify: null },
    { pos: 4, flag: '🏳', name: 'Wales',           mp: 2, w: 0, d: 1, l: 1, gf: 1, ga: 3, gd: '-2', pts: 1, form: ['D','L'], qualify: null },
  ],
  F: [
    { pos: 1, flag: '🇪🇸', name: 'Spain',        mp: 2, w: 2, d: 0, l: 0, gf: 6, ga: 1, gd: '+5', pts: 6, form: ['W','W'], qualify: 'direct' },
    { pos: 2, flag: '🇵🇹', name: 'Portugal',     mp: 2, w: 1, d: 0, l: 1, gf: 4, ga: 2, gd: '+2', pts: 3, form: ['W','L'], qualify: 'playoff' },
    { pos: 3, flag: '🇺🇾', name: 'Uruguay',      mp: 2, w: 1, d: 0, l: 1, gf: 2, ga: 3, gd: '-1', pts: 3, form: ['L','W'], qualify: null },
    { pos: 4, flag: '🇬🇭', name: 'Ghana',         mp: 2, w: 0, d: 0, l: 2, gf: 1, ga: 7, gd: '-6', pts: 0, form: ['L','L'], qualify: null },
  ],
};

/* ═══════════════════════════════════════════════════════════════
   DATA — TOP SCORERS
═══════════════════════════════════════════════════════════════ */
export const topScorers = [
  { rank: 1, name: 'Kylian Mbappé',     country: '🇫🇷 France',   goals: 5, assists: 2 },
  { rank: 2, name: 'Cristiano Ronaldo', country: '🇵🇹 Portugal', goals: 4, assists: 1 },
  { rank: 3, name: 'Erling Haaland',    country: '🇳🇴 Norway',   goals: 4, assists: 0 },
  { rank: 4, name: 'Vinícius Jr.',      country: '🇧🇷 Brazil',   goals: 3, assists: 3 },
  { rank: 5, name: 'Harry Kane',        country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England', goals: 3, assists: 1 },
  { rank: 6, name: 'Lionel Messi',      country: '🇦🇷 Argentina',goals: 3, assists: 2 },
  { rank: 7, name: 'Jude Bellingham',   country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England', goals: 2, assists: 4 },
  { rank: 8, name: 'Lautaro Martínez',  country: '🇦🇷 Argentina',goals: 2, assists: 1 },
];

/* ═══════════════════════════════════════════════════════════════
   DATA — LATEST NEWS
═══════════════════════════════════════════════════════════════ */
export const latestNews = [
  {
    id: 'n001',
    featured: true,
    category: 'Match Preview',
    categoryVariant: 'blue',
    headline: 'Mbappé's Masterclass Sets France on Course for Knockout Stage',
    excerpt: 'The PSG superstar delivered a stunning individual display against Denmark, registering a goal and constant threat throughout the 88 minutes of a gripping Group D encounter at the Estadio Azteca.',
    emoji: '⚽',
    thumbClass: 'thumb-match-preview',
    date: formatNewsDate(0),
    readTime: '4 min read',
    author: 'FIFA Media',
  },
  {
    id: 'n002',
    featured: true,
    secondary: true,
    category: 'Breaking News',
    categoryVariant: 'red',
    headline: 'England Cruise Past Iran with Bellingham's Early Strike',
    excerpt: 'Jude Bellingham headed England into the lead inside six minutes as the Three Lions dominated Iran from start to finish in Seattle.',
    emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    thumbClass: 'thumb-breaking',
    date: formatNewsDate(0),
    readTime: '3 min read',
    author: 'FIFA Media',
  },
  {
    id: 'n003',
    featured: false,
    category: 'Squad Update',
    categoryVariant: '',
    headline: 'Neymar Returns to Brazil's Starting XI After Injury',
    excerpt: 'The veteran forward is set to feature from the off for the first time at these finals after recovering from a hamstring issue.',
    emoji: '💪',
    thumbClass: 'thumb-squad-update',
    date: formatNewsDate(1),
    readTime: '2 min read',
    author: 'FIFA Medical Team',
  },
  {
    id: 'n004',
    featured: false,
    category: 'Venue News',
    categoryVariant: 'green',
    headline: 'MetLife Stadium Sets Record Attendance for Tournament Opener',
    excerpt: 'Over 82,000 fans packed into New Jersey's MetLife Stadium making it the best-attended group game in World Cup history.',
    emoji: '🏟️',
    thumbClass: 'thumb-venue',
    date: formatNewsDate(1),
    readTime: '3 min read',
    author: 'FIFA Venues',
  },
  {
    id: 'n005',
    featured: false,
    category: 'Analysis',
    categoryVariant: '',
    headline: 'How Germany's High Press is Dominating Group C',
    excerpt: 'Tactical analysis of Julian Nagelsmann's system reveals why Germany's pressing game is suffocating opponents and creating a torrent of chances.',
    emoji: '📊',
    thumbClass: 'thumb-analysis',
    date: formatNewsDate(1),
    readTime: '6 min read',
    author: 'FIFA Tactics',
  },
  {
    id: 'n006',
    featured: false,
    category: 'Interview',
    categoryVariant: '',
    headline: '"We Dream Big" – Ronaldo's Message Ahead of Portugal's Crucial Fixture',
    excerpt: 'In an exclusive FIFA+ interview, Cristiano Ronaldo opens up about his hunger for a debut World Cup title and what this tournament means to him.',
    emoji: '🎙️',
    thumbClass: 'thumb-interview',
    date: formatNewsDate(2),
    readTime: '5 min read',
    author: 'FIFA+',
  },
  {
    id: 'n007',
    featured: false,
    category: 'History',
    categoryVariant: '',
    headline: 'USA 2026: How Three Nations Unite to Host the Biggest World Cup Ever',
    excerpt: 'With 104 matches across 16 cities in three countries, this edition rewrites the record books before a ball has even been kicked.',
    emoji: '🌎',
    thumbClass: 'thumb-history',
    date: formatNewsDate(2),
    readTime: '7 min read',
    author: 'FIFA Communications',
  },
  {
    id: 'n008',
    featured: false,
    category: 'Squad Update',
    categoryVariant: '',
    headline: 'Spain's La Fábrica Pipeline Powers Dominant Group F Performance',
    excerpt: 'A new generation of Barcelona and Real Madrid academy graduates is giving Luis de la Fuente's squad a blend of youth and experience.',
    emoji: '🔴',
    thumbClass: 'thumb-squad-update',
    date: formatNewsDate(3),
    readTime: '4 min read',
    author: 'FIFA Media',
  },
];

function formatNewsDate(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/* ═══════════════════════════════════════════════════════════════
   DATA — HOST CITIES
═══════════════════════════════════════════════════════════════ */
export const hostCities = [
  { flag: '🇺🇸', name: 'New York / New Jersey', country: 'USA',    stadium: 'MetLife Stadium',       matches: 8 },
  { flag: '🇺🇸', name: 'Los Angeles',            country: 'USA',    stadium: 'SoFi Stadium',          matches: 8 },
  { flag: '🇺🇸', name: 'Dallas',                 country: 'USA',    stadium: "AT&T Stadium",          matches: 7 },
  { flag: '🇺🇸', name: 'San Francisco',          country: 'USA',    stadium: 'Levi\'s Stadium',       matches: 6 },
  { flag: '🇺🇸', name: 'Miami',                  country: 'USA',    stadium: 'Hard Rock Stadium',     matches: 6 },
  { flag: '🇺🇸', name: 'Seattle',                country: 'USA',    stadium: 'Lumen Field',           matches: 6 },
  { flag: '🇺🇸', name: 'Boston',                 country: 'USA',    stadium: 'Gillette Stadium',      matches: 6 },
  { flag: '🇺🇸', name: 'Atlanta',                country: 'USA',    stadium: 'Mercedes-Benz Stadium', matches: 6 },
  { flag: '🇺🇸', name: 'Kansas City',            country: 'USA',    stadium: 'Arrowhead Stadium',     matches: 6 },
  { flag: '🇺🇸', name: 'Houston',                country: 'USA',    stadium: 'NRG Stadium',           matches: 6 },
  { flag: '🇺🇸', name: 'Philadelphia',           country: 'USA',    stadium: 'Lincoln Financial',     matches: 6 },
  { flag: '🇺🇸', name: 'Pasadena',               country: 'USA',    stadium: 'Rose Bowl',             matches: 4 },
  { flag: '🇨🇦', name: 'Toronto',                country: 'Canada', stadium: 'BMO Field',             matches: 6 },
  { flag: '🇨🇦', name: 'Vancouver',              country: 'Canada', stadium: 'BC Place',              matches: 6 },
  { flag: '🇨🇦', name: 'Guadalajara',            country: 'Mexico', stadium: 'Estadio Akron',         matches: 6 },
  { flag: '🇲🇽', name: 'Mexico City',            country: 'Mexico', stadium: 'Estadio Azteca',        matches: 6 },
];

/* ═══════════════════════════════════════════════════════════════
   DATA — TOURNAMENT STATS (for hero counter animation)
═══════════════════════════════════════════════════════════════ */
export const tournamentStats = { goals: 187, matchesPlayed: 48, viewers: 3.2 };

/* ═══════════════════════════════════════════════════════════════
   RENDER — MATCH CARDS
═══════════════════════════════════════════════════════════════ */

/**
 * Builds a single match card HTML string.
 * @param {object} match
 * @returns {string} HTML
 */
export function buildMatchCard(match) {
  const statusBadgeMap = {
    LIVE:     { cls: 'badge-live',     label: `🔴 LIVE ${match.minute}'` },
    HT:       { cls: 'badge-ht',       label: 'HALF TIME' },
    FT:       { cls: 'badge-ft',       label: 'FULL TIME' },
    UPCOMING: { cls: 'badge-upcoming', label: 'UPCOMING' },
  };
  const badge = statusBadgeMap[match.status] || statusBadgeMap.FT;

  const cardClass = match.status === 'LIVE' ? 'match-card live-match'
    : match.status === 'UPCOMING'           ? 'match-card upcoming-match'
    : 'match-card';

  const scoreOrVs = match.status === 'UPCOMING'
    ? `<span class="match-vs" aria-label="versus">VS</span>`
    : `<span class="match-score" aria-label="Score ${match.homeTeam.score} to ${match.awayTeam.score}">${match.homeTeam.score}–${match.awayTeam.score}</span>`;

  const timeDisplay = match.status === 'LIVE'     ? `<span class="match-time">${match.minute}'</span>`
    : match.status === 'HT'                       ? `<span class="match-time ht">HT</span>`
    : match.status === 'FT'                       ? `<span class="match-time ft">FT</span>`
    : `<span class="match-time upcoming">${formatKickoffTime(match.kickoff)}</span>`;

  const eventsHTML = match.events && match.events.length
    ? `<div class="match-events" aria-label="Match events">
        ${match.events.slice(0, 3).map(e => `<span class="match-event">${e}</span>`).join('')}
       </div>`
    : '';

  const countdownHTML = match.status === 'UPCOMING'
    ? `<span class="countdown-display" data-kickoff="${match.kickoff?.toISOString()}" aria-live="polite">${buildCountdown(match.kickoff)}</span>`
    : `<span class="match-attendance" aria-label="Attendance">${match.attendance ? `👥 ${Number(match.attendance.replace(/,/g,'')).toLocaleString()}` : ''}</span>`;

  return `
    <article class="${cardClass}" data-match-id="${match.id}" aria-label="${match.homeTeam.name} vs ${match.awayTeam.name}">
      <div class="match-card-top">
        <span class="match-group-label">${match.group}</span>
        <span class="match-status-badge ${badge.cls}" aria-label="Match status: ${badge.label}">${badge.label}</span>
      </div>
      <div class="match-teams">
        <div class="match-team home" aria-label="Home team: ${match.homeTeam.name}">
          <span class="team-flag" aria-hidden="true">${match.homeTeam.flag}</span>
          <span class="team-name">${match.homeTeam.name}</span>
        </div>
        <div class="match-score-block">
          ${scoreOrVs}
          ${timeDisplay}
        </div>
        <div class="match-team away" aria-label="Away team: ${match.awayTeam.name}">
          <span class="team-flag" aria-hidden="true">${match.awayTeam.flag}</span>
          <span class="team-name">${match.awayTeam.name}</span>
        </div>
      </div>
      ${eventsHTML}
      <div class="match-card-bottom">
        <span class="match-venue" aria-label="Venue: ${match.venue}">
          <span class="match-venue-icon" aria-hidden="true">📍</span>${match.venue}
        </span>
        ${countdownHTML}
      </div>
    </article>`;
}

/** Format a Date as HH:MM local time */
export function formatKickoffTime(date) {
  if (!date) return 'TBC';
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

/** Build a countdown string to a future kickoff date */
export function buildCountdown(date) {
  if (!date) return '';
  const diff = date - Date.now();
  if (diff <= 0) return 'Kick-off!';
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1_000);
  if (h > 0) return `In ${h}h ${m}m`;
  if (m > 0) return `In ${m}m ${s}s`;
  return `In ${s}s`;
}

/**
 * Render today's matches into #matchesGrid
 * @param {HTMLElement} container
 * @param {Array} matches
 */
export function renderLiveMatches(container, matches) {
  if (!container) return;
  const todayMatches = matches.filter(m => m.day === 'today');
  if (todayMatches.length === 0) {
    container.innerHTML = '<p class="no-matches">No matches scheduled today.</p>';
    return;
  }
  container.innerHTML = todayMatches.map(buildMatchCard).join('');
}

/**
 * Render tomorrow's matches into #tomorrowMatchesGrid
 * @param {HTMLElement} container
 * @param {Array} matches
 */
export function renderTomorrowMatches(container, matches) {
  if (!container) return;
  const tomorrowMatches = matches.filter(m => m.day === 'tomorrow');
  if (tomorrowMatches.length === 0) {
    container.innerHTML = '<p class="no-matches">No matches scheduled tomorrow.</p>';
    return;
  }
  container.innerHTML = tomorrowMatches.map(buildMatchCard).join('');
}

/* ═══════════════════════════════════════════════════════════════
   RENDER — LIVE SCORE REFRESH
═══════════════════════════════════════════════════════════════ */

/** Simulates a live score update by mutating match data slightly */
export function simulateLiveScoreUpdate(matches) {
  return matches.map(match => {
    if (match.status !== 'LIVE') return match;
    const newMinute = Math.min(90, parseInt(match.minute, 10) + 1).toString();
    // 5% chance of a goal per refresh tick
    const goalChance = Math.random();
    let home = match.homeTeam.score;
    let away = match.awayTeam.score;
    if (goalChance < 0.025) home += 1;
    else if (goalChance < 0.05) away += 1;
    return {
      ...match,
      minute: newMinute,
      homeTeam: { ...match.homeTeam, score: home },
      awayTeam: { ...match.awayTeam, score: away },
    };
  });
}

let _matches = [...liveMatchesData];
let refreshIntervalId = null;

/**
 * Start auto-refreshing live scores every `interval` ms
 * @param {number} interval  milliseconds (default 30 000)
 */
export function startLiveScoreRefresh(interval = 30_000) {
  if (refreshIntervalId !== null) return; // already running
  refreshIntervalId = setInterval(() => {
    _matches = simulateLiveScoreUpdate(_matches);
    const grid = document.getElementById('matchesGrid');
    if (grid) renderLiveMatches(grid, _matches);
    updateLastUpdated();
    updateCountdowns();
  }, interval);
  return refreshIntervalId;
}

/** Stop the auto-refresh interval */
export function stopLiveScoreRefresh() {
  if (refreshIntervalId !== null) {
    clearInterval(refreshIntervalId);
    refreshIntervalId = null;
  }
}

/** Update the "Last updated" timestamp */
export function updateLastUpdated() {
  const el = document.getElementById('lastUpdated');
  if (!el) return;
  const now = new Date();
  el.textContent = `Updated at ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
}

/** Tick all countdown timers in the DOM */
export function updateCountdowns() {
  const countdownEls = document.querySelectorAll('.countdown-display[data-kickoff]');
  countdownEls.forEach(el => {
    const kickoff = new Date(el.dataset.kickoff);
    el.textContent = buildCountdown(kickoff);
  });
}

/* ═══════════════════════════════════════════════════════════════
   RENDER — GROUP STANDINGS
═══════════════════════════════════════════════════════════════ */

export function renderStandings(container, groupData) {
  if (!container || !groupData) return;
  const rowsHTML = groupData.map(team => {
    const qualifyClass = team.qualify === 'direct' ? 'qualify-direct'
      : team.qualify === 'playoff' ? 'qualify-playoff' : '';
    const formHTML = team.form.map(r => {
      const cls = r === 'W' ? 'form-w' : r === 'D' ? 'form-d' : 'form-l';
      return `<span class="form-pill ${cls}" aria-label="${r === 'W' ? 'Win' : r === 'D' ? 'Draw' : 'Loss'}">${r}</span>`;
    }).join('');
    return `
      <tr class="${qualifyClass}" aria-label="${team.name}">
        <td>
          <div class="standing-team">
            <span class="standing-pos">${team.pos}</span>
            <span class="standing-flag" aria-hidden="true">${team.flag}</span>
            <span class="standing-name">${team.name}</span>
          </div>
        </td>
        <td class="center">${team.mp}</td>
        <td class="center">${team.w}</td>
        <td class="center">${team.d}</td>
        <td class="center">${team.l}</td>
        <td class="center">${team.gf}</td>
        <td class="center">${team.ga}</td>
        <td class="center">${team.gd}</td>
        <td class="pts">${team.pts}</td>
        <td><div class="form-pills">${formHTML}</div></td>
      </tr>`;
  }).join('');

  container.innerHTML = `
    <table class="standings-table" role="table" aria-label="Group standings">
      <thead>
        <tr>
          <th scope="col">Team</th>
          <th class="center" scope="col">MP</th>
          <th class="center" scope="col">W</th>
          <th class="center" scope="col">D</th>
          <th class="center" scope="col">L</th>
          <th class="center" scope="col">GF</th>
          <th class="center" scope="col">GA</th>
          <th class="center" scope="col">GD</th>
          <th class="center" scope="col">Pts</th>
          <th scope="col">Form</th>
        </tr>
      </thead>
      <tbody>${rowsHTML}</tbody>
    </table>`;
}

/* ═══════════════════════════════════════════════════════════════
   RENDER — TOP SCORERS
═══════════════════════════════════════════════════════════════ */

export function renderTopScorers(container, scorers) {
  if (!container) return;
  container.innerHTML = scorers.map(s => `
    <div class="scorer-card" role="listitem" aria-label="${s.name}, ${s.goals} goals">
      <span class="scorer-rank${s.rank <= 3 ? ' top' : ''}" aria-hidden="true">${s.rank}</span>
      <div class="scorer-info">
        <div class="scorer-name">${s.name}</div>
        <div class="scorer-country">${s.country}</div>
      </div>
      <div style="text-align:center">
        <div class="scorer-goals" aria-label="${s.goals} goals">${s.goals}</div>
        <div class="scorer-goals-label">Goals</div>
      </div>
    </div>`).join('');
}

/* ═══════════════════════════════════════════════════════════════
   RENDER — NEWS
═══════════════════════════════════════════════════════════════ */

export function renderNews(featuredContainer, gridContainer, articles) {
  if (!featuredContainer || !gridContainer) return;

  const featuredArticles = articles.filter(a => a.featured);
  const gridArticles     = articles.filter(a => !a.featured);

  // Featured
  featuredContainer.innerHTML = featuredArticles.map((a, i) => {
    if (i === 0) {
      return `
        <article class="news-card-featured" aria-label="Featured article: ${a.headline}" tabindex="0">
          <div class="news-thumb-placeholder ${a.thumbClass}" aria-hidden="true">
            <span style="position:relative;z-index:1">${a.emoji}</span>
          </div>
          <div class="news-card-body">
            <div class="news-meta">
              <span class="news-tag ${a.categoryVariant ? 'news-tag--' + a.categoryVariant : ''}" style="background:${tagBg(a.categoryVariant)};color:${tagColor(a.categoryVariant)};border-color:${tagBorder(a.categoryVariant)}">${a.category}</span>
              <span class="news-date" aria-label="Published ${a.date}">${a.date} · ${a.readTime}</span>
            </div>
            <h3 class="news-headline">${a.headline}</h3>
            <p class="news-excerpt">${a.excerpt}</p>
            <a href="#" class="news-read-more" aria-label="Read more about ${a.headline}">Read Full Story →</a>
          </div>
        </article>`;
    }
    return `
      <article class="news-card-secondary" aria-label="Article: ${a.headline}" tabindex="0">
        <div class="news-thumb-placeholder ${a.thumbClass}" aria-hidden="true">
          <span style="position:relative;z-index:1">${a.emoji}</span>
        </div>
        <div class="news-card-body">
          <div class="news-meta">
            <span class="news-tag" style="background:${tagBg(a.categoryVariant)};color:${tagColor(a.categoryVariant)};border-color:${tagBorder(a.categoryVariant)}">${a.category}</span>
            <span class="news-date">${a.date}</span>
          </div>
          <h3 class="news-headline">${a.headline}</h3>
          <p class="news-excerpt">${a.excerpt}</p>
          <a href="#" class="news-read-more" aria-label="Read more about ${a.headline}">Read More →</a>
        </div>
      </article>`;
  }).join('');

  // Grid
  gridContainer.innerHTML = gridArticles.map(a => `
    <article class="news-card" aria-label="Article: ${a.headline}" tabindex="0">
      <div class="news-thumb-placeholder ${a.thumbClass}" aria-hidden="true">
        <span style="position:relative;z-index:1">${a.emoji}</span>
      </div>
      <div class="news-card-body">
        <div class="news-meta">
          <span class="news-tag" style="background:${tagBg(a.categoryVariant)};color:${tagColor(a.categoryVariant)};border-color:${tagBorder(a.categoryVariant)}">${a.category}</span>
          <span class="news-date">${a.date} · ${a.readTime}</span>
        </div>
        <h3 class="news-headline">${a.headline}</h3>
        <p class="news-excerpt">${a.excerpt}</p>
        <a href="#" class="news-read-more" aria-label="Read more about ${a.headline}">Read More →</a>
      </div>
    </article>`).join('');
}

function tagBg(variant)     { return variant === 'red' ? 'rgba(230,57,70,.1)' : variant === 'blue' ? 'rgba(96,165,250,.1)' : variant === 'green' ? 'rgba(45,198,83,.1)' : 'rgba(201,168,76,.12)'; }
function tagColor(variant)  { return variant === 'red' ? '#e63946' : variant === 'blue' ? '#60a5fa' : variant === 'green' ? '#2dc653' : '#c9a84c'; }
function tagBorder(variant) { return variant === 'red' ? 'rgba(230,57,70,.25)' : variant === 'blue' ? 'rgba(96,165,250,.25)' : variant === 'green' ? 'rgba(45,198,83,.25)' : 'rgba(201,168,76,.25)'; }

/* ═══════════════════════════════════════════════════════════════
   RENDER — HOST CITIES
═══════════════════════════════════════════════════════════════ */

export function renderHostCities(container, cities) {
  if (!container) return;
  container.innerHTML = cities.map(c => `
    <div class="city-card" role="listitem" aria-label="${c.name}, ${c.country}">
      <div class="city-flag" aria-hidden="true">${c.flag}</div>
      <div class="city-name">${c.name}</div>
      <div class="city-country">${c.country}</div>
      <div class="city-stadium">${c.stadium}</div>
      <div class="city-stadium" style="margin-top:.4rem;color:#c9a84c;font-style:normal;font-weight:600;font-size:.68rem">${c.matches} matches</div>
    </div>`).join('');
}

/* ═══════════════════════════════════════════════════════════════
   HERO — COUNTER ANIMATION
═══════════════════════════════════════════════════════════════ */

export function animateCounter(el, target, duration = 1800, decimals = 0) {
  if (!el) return;
  const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) { el.textContent = decimals ? target.toFixed(1) : target.toString(); return; }
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const value = target * ease;
    el.textContent = decimals ? value.toFixed(decimals) : Math.floor(value).toString();
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = decimals ? target.toFixed(decimals) : target.toString();
  };
  requestAnimationFrame(step);
}

/* ═══════════════════════════════════════════════════════════════
   HERO — BACKGROUND PARTICLES
═══════════════════════════════════════════════════════════════ */

export function spawnHeroParticles(container, count = 24) {
  if (!container) return;
  const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 6;
    const dur   = Math.random() * 6 + 6;
    p.style.cssText = `
      position:absolute;
      left:${x}%;top:${y}%;
      width:${size}px;height:${size}px;
      border-radius:50%;
      background:rgba(201,168,76,${Math.random() * 0.4 + 0.1});
      animation:particleFloat ${dur}s ${delay}s ease-in-out infinite alternate;
      pointer-events:none;
    `;
    container.appendChild(p);
  }

  if (!document.getElementById('particleStyle')) {
    const style = document.createElement('style');
    style.id = 'particleStyle';
    style.textContent = `
      @keyframes particleFloat {
        from { transform: translate(0, 0) scale(1); opacity: .2; }
        to   { transform: translate(${Math.random()*40-20}px, ${Math.random()*-60-20}px) scale(1.5); opacity: .8; }
      }`;
    document.head.appendChild(style);
  }
}

/* ═══════════════════════════════════════════════════════════════
   TICKER — DUPLICATE TRACK FOR SEAMLESS LOOP
═══════════════════════════════════════════════════════════════ */

function setupTicker() {
  const track = document.getElementById('tickerTrack');
  if (!track) return;
  // Duplicate content for seamless CSS marquee loop
  track.innerHTML += track.innerHTML;
}

/* ═══════════════════════════════════════════════════════════════
   FILTER TABS — MATCHES
═══════════════════════════════════════════════════════════════ */

function setupMatchFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab');
  const tomorrowSection = document.getElementById('tomorrowSection');
  const todayGrid = document.getElementById('matchesGrid');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const filter = tab.dataset.filter;
      if (filter === 'today') {
        renderLiveMatches(todayGrid, _matches);
        tomorrowSection?.classList.add('hidden');
      } else if (filter === 'tomorrow') {
        renderLiveMatches(todayGrid, _matches); // keep today visible
        tomorrowSection?.classList.remove('hidden');
      } else {
        renderLiveMatches(todayGrid, _matches);
        tomorrowSection?.classList.remove('hidden');
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════════════
   STANDINGS TABS
═══════════════════════════════════════════════════════════════ */

function setupStandingsTabs() {
  const tabs = document.querySelectorAll('.group-tab');
  const container = document.getElementById('standingsTable');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const group = tab.dataset.group;
      renderStandings(container, standingsData[group]);
    });
  });
}

/* ═══════════════════════════════════════════════════════════════
   REFRESH BUTTON
═══════════════════════════════════════════════════════════════ */

function setupRefreshButton() {
  const btn = document.getElementById('refreshBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    btn.classList.add('spinning');
    btn.setAttribute('aria-disabled', 'true');
    _matches = simulateLiveScoreUpdate(_matches);
    const grid = document.getElementById('matchesGrid');
    if (grid) renderLiveMatches(grid, _matches);
    updateLastUpdated();
    updateCountdowns();
    setTimeout(() => {
      btn.classList.remove('spinning');
      btn.removeAttribute('aria-disabled');
    }, 600);
  });
}

/* ═══════════════════════════════════════════════════════════════
   NAV — HAMBURGER TOGGLE
═══════════════════════════════════════════════════════════════ */

function setupNavHamburger() {
  const btn  = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
  });
  // Close on outside click
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ═══════════════════════════════════════════════════════════════
   ACTIVE NAV LINK — SCROLL SPY
═══════════════════════════════════════════════════════════════ */

function setupScrollSpy() {
  const sections = ['matches', 'news'];
  const navLinks = document.querySelectorAll('.nav-link');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

/* ═══════════════════════════════════════════════════════════════
   INITIALISE
═══════════════════════════════════════════════════════════════ */

export function init() {
  // Match grids
  const matchesGrid        = document.getElementById('matchesGrid');
  const tomorrowMatchesGrid = document.getElementById('tomorrowMatchesGrid');
  renderLiveMatches(matchesGrid, _matches);
  renderTomorrowMatches(tomorrowMatchesGrid, _matches);

  // Standings — default Group A
  renderStandings(document.getElementById('standingsTable'), standingsData.A);

  // Top scorers
  renderTopScorers(document.getElementById('scorersList'), topScorers);

  // News
  renderNews(
    document.getElementById('newsFeatured'),
    document.getElementById('newsGrid'),
    latestNews,
  );

  // Host cities
  renderHostCities(document.getElementById('citiesScroll'), hostCities);

  // Hero counters
  animateCounter(document.getElementById('statGoals'),   tournamentStats.goals,         1800);
  animateCounter(document.getElementById('statMatches'), tournamentStats.matchesPlayed, 1800);
  animateCounter(document.getElementById('statViewers'), tournamentStats.viewers,       2200, 1);

  // Hero particles
  spawnHeroParticles(document.getElementById('heroBgParticles'), 28);

  // Ticker
  setupTicker();

  // Interactions
  setupMatchFilterTabs();
  setupStandingsTabs();
  setupRefreshButton();
  setupNavHamburger();
  setupScrollSpy();

  // Start live score auto-refresh every 30 s
  startLiveScoreRefresh(30_000);

  // Countdown tick every second
  setInterval(updateCountdowns, 1_000);

  // Initial timestamp
  updateLastUpdated();
}

/* ── Boot ─────────────────────────────────────────────────────── */
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}
