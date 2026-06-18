/**
 * FIFA World Cup 2026™ — Mock Match Fixtures
 * Covers Today and Tomorrow's schedule with live state simulation
 */

export const MATCH_STATUS = {
  LIVE:     'live',
  UPCOMING: 'upcoming',
  FINISHED: 'finished',
  HT:       'ht',
};

/** @returns {Date} today's date at a given hour:minute */
function today(h, m = 0) {
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}

/** @returns {Date} tomorrow's date at a given hour:minute */
function tomorrow(h, m = 0) {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(h, m, 0, 0);
  return d;
}

/** Format kick-off time to HH:MM (local) */
export function formatKickOff(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}

export const todayMatches = [
  {
    id: 'td-01',
    group: 'GROUP A',
    status: MATCH_STATUS.LIVE,
    minute: 67,
    homeTeam: { name: 'Brazil',    abbr: 'BRA', flag: '🇧🇷' },
    awayTeam: { name: 'Serbia',    abbr: 'SRB', flag: '🇷🇸' },
    score: { home: 2, away: 0 },
    kickOff: today(12, 0),
    venue: 'MetLife Stadium',
    city: 'New York / New Jersey',
    isFeatured: false,
  },
  {
    id: 'td-02',
    group: 'GROUP A',
    status: MATCH_STATUS.LIVE,
    minute: 72,
    homeTeam: { name: 'Switzerland', abbr: 'SUI', flag: '🇨🇭' },
    awayTeam: { name: 'Cameroon',   abbr: 'CMR', flag: '🇨🇲' },
    score: { home: 1, away: 1 },
    kickOff: today(12, 0),
    venue: 'AT&T Stadium',
    city: 'Dallas / Fort Worth',
    isFeatured: false,
  },
  {
    id: 'td-03',
    group: 'GROUP B',
    status: MATCH_STATUS.UPCOMING,
    minute: null,
    homeTeam: { name: 'England',   abbr: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    awayTeam: { name: 'Iran',      abbr: 'IRN', flag: '🇮🇷' },
    score: { home: 0, away: 0 },
    kickOff: today(15, 0),
    venue: 'SoFi Stadium',
    city: 'Los Angeles',
    isFeatured: true,
  },
  {
    id: 'td-04',
    group: 'GROUP B',
    status: MATCH_STATUS.UPCOMING,
    minute: null,
    homeTeam: { name: 'USA',       abbr: 'USA', flag: '🇺🇸' },
    awayTeam: { name: 'Wales',     abbr: 'WAL', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿' },
    score: { home: 0, away: 0 },
    kickOff: today(15, 0),
    venue: 'Ahmad Bin Ali Stadium',
    city: 'Houston',
    isFeatured: false,
  },
  {
    id: 'td-05',
    group: 'GROUP C',
    status: MATCH_STATUS.UPCOMING,
    minute: null,
    homeTeam: { name: 'Argentina',  abbr: 'ARG', flag: '🇦🇷' },
    awayTeam: { name: 'Saudi Arabia', abbr: 'KSA', flag: '🇸🇦' },
    score: { home: 0, away: 0 },
    kickOff: today(18, 0),
    venue: 'Estadio Azteca',
    city: 'Mexico City',
    isFeatured: false,
  },
  {
    id: 'td-06',
    group: 'GROUP C',
    status: MATCH_STATUS.FINISHED,
    minute: 90,
    homeTeam: { name: 'Mexico',   abbr: 'MEX', flag: '🇲🇽' },
    awayTeam: { name: 'Poland',   abbr: 'POL', flag: '🇵🇱' },
    score: { home: 0, away: 0 },
    kickOff: today(9, 0),
    venue: 'Estadio Guadalajara',
    city: 'Guadalajara',
    isFeatured: false,
  },
  {
    id: 'td-07',
    group: 'GROUP D',
    status: MATCH_STATUS.FINISHED,
    minute: 90,
    homeTeam: { name: 'France',   abbr: 'FRA', flag: '🇫🇷' },
    awayTeam: { name: 'Australia', abbr: 'AUS', flag: '🇦🇺' },
    score: { home: 4, away: 1 },
    kickOff: today(9, 0),
    venue: 'Mercedes-Benz Stadium',
    city: 'Atlanta',
    isFeatured: false,
  },
  {
    id: 'td-08',
    group: 'GROUP D',
    status: MATCH_STATUS.UPCOMING,
    minute: null,
    homeTeam: { name: 'Denmark',  abbr: 'DEN', flag: '🇩🇰' },
    awayTeam: { name: 'Tunisia',  abbr: 'TUN', flag: '🇹🇳' },
    score: { home: 0, away: 0 },
    kickOff: today(21, 0),
    venue: 'BC Place',
    city: 'Vancouver',
    isFeatured: false,
  },
];

export const tomorrowMatches = [
  {
    id: 'tm-01',
    group: 'GROUP E',
    status: MATCH_STATUS.UPCOMING,
    minute: null,
    homeTeam: { name: 'Spain',     abbr: 'ESP', flag: '🇪🇸' },
    awayTeam: { name: 'Costa Rica', abbr: 'CRC', flag: '🇨🇷' },
    score: { home: 0, away: 0 },
    kickOff: tomorrow(12, 0),
    venue: 'Hard Rock Stadium',
    city: 'Miami',
    isFeatured: false,
  },
  {
    id: 'tm-02',
    group: 'GROUP E',
    status: MATCH_STATUS.UPCOMING,
    minute: null,
    homeTeam: { name: 'Germany',   abbr: 'GER', flag: '🇩🇪' },
    awayTeam: { name: 'Japan',     abbr: 'JPN', flag: '🇯🇵' },
    score: { home: 0, away: 0 },
    kickOff: tomorrow(12, 0),
    venue: 'Allegiant Stadium',
    city: 'Las Vegas',
    isFeatured: false,
  },
  {
    id: 'tm-03',
    group: 'GROUP F',
    status: MATCH_STATUS.UPCOMING,
    minute: null,
    homeTeam: { name: 'Belgium',   abbr: 'BEL', flag: '🇧🇪' },
    awayTeam: { name: 'Canada',    abbr: 'CAN', flag: '🇨🇦' },
    score: { home: 0, away: 0 },
    kickOff: tomorrow(15, 0),
    venue: 'BMO Field',
    city: 'Toronto',
    isFeatured: true,
  },
  {
    id: 'tm-04',
    group: 'GROUP F',
    status: MATCH_STATUS.UPCOMING,
    minute: null,
    homeTeam: { name: 'Morocco',   abbr: 'MAR', flag: '🇲🇦' },
    awayTeam: { name: 'Croatia',   abbr: 'CRO', flag: '🇭🇷' },
    score: { home: 0, away: 0 },
    kickOff: tomorrow(15, 0),
    venue: 'Lumen Field',
    city: 'Seattle',
    isFeatured: false,
  },
  {
    id: 'tm-05',
    group: 'GROUP G',
    status: MATCH_STATUS.UPCOMING,
    minute: null,
    homeTeam: { name: 'Portugal', abbr: 'POR', flag: '🇵🇹' },
    awayTeam: { name: 'Ghana',    abbr: 'GHA', flag: '🇬🇭' },
    score: { home: 0, away: 0 },
    kickOff: tomorrow(18, 0),
    venue: 'Lincoln Financial Field',
    city: 'Philadelphia',
    isFeatured: false,
  },
  {
    id: 'tm-06',
    group: 'GROUP G',
    status: MATCH_STATUS.UPCOMING,
    minute: null,
    homeTeam: { name: 'South Korea', abbr: 'KOR', flag: '🇰🇷' },
    awayTeam: { name: 'Uruguay',   abbr: 'URU', flag: '🇺🇾' },
    score: { home: 0, away: 0 },
    kickOff: tomorrow(18, 0),
    venue: 'Arrowhead Stadium',
    city: 'Kansas City',
    isFeatured: false,
  },
  {
    id: 'tm-07',
    group: 'GROUP H',
    status: MATCH_STATUS.UPCOMING,
    minute: null,
    homeTeam: { name: 'Netherlands', abbr: 'NED', flag: '🇳🇱' },
    awayTeam: { name: 'Senegal',  abbr: 'SEN', flag: '🇸🇳' },
    score: { home: 0, away: 0 },
    kickOff: tomorrow(21, 0),
    venue: 'Gillette Stadium',
    city: 'Boston',
    isFeatured: false,
  },
  {
    id: 'tm-08',
    group: 'GROUP H',
    status: MATCH_STATUS.UPCOMING,
    minute: null,
    homeTeam: { name: 'Ecuador',  abbr: 'ECU', flag: '🇪🇨' },
    awayTeam: { name: 'Qatar',    abbr: 'QAT', flag: '🇶🇦' },
    score: { home: 0, away: 0 },
    kickOff: tomorrow(21, 0),
    venue: 'NRG Stadium',
    city: 'Houston',
    isFeatured: false,
  },
];

export const groupStandings = [
  {
    group: 'GROUP A',
    rows: [
      { pos: 1, team: 'Brazil',      flag: '🇧🇷', mp: 2, w: 2, d: 0, l: 0, gd: '+5', pts: 6, qualified: true },
      { pos: 2, team: 'Switzerland', flag: '🇨🇭', mp: 2, w: 1, d: 1, l: 0, gd: '+2', pts: 4, qualified: true },
      { pos: 3, team: 'Serbia',      flag: '🇷🇸', mp: 2, w: 0, d: 1, l: 1, gd: '-2', pts: 1, qualified: false },
      { pos: 4, team: 'Cameroon',    flag: '🇨🇲', mp: 2, w: 0, d: 0, l: 2, gd: '-5', pts: 0, qualified: false },
    ],
  },
  {
    group: 'GROUP B',
    rows: [
      { pos: 1, team: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', mp: 1, w: 1, d: 0, l: 0, gd: '+2', pts: 3, qualified: false },
      { pos: 2, team: 'USA',     flag: '🇺🇸', mp: 1, w: 0, d: 1, l: 0, gd: '0',  pts: 1, qualified: false },
      { pos: 3, team: 'Wales',   flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', mp: 1, w: 0, d: 1, l: 0, gd: '0',  pts: 1, qualified: false },
      { pos: 4, team: 'Iran',    flag: '🇮🇷', mp: 1, w: 0, d: 0, l: 1, gd: '-2', pts: 0, qualified: false },
    ],
  },
  {
    group: 'GROUP C',
    rows: [
      { pos: 1, team: 'Argentina',   flag: '🇦🇷', mp: 1, w: 0, d: 0, l: 0, gd: '0', pts: 0, qualified: false },
      { pos: 2, team: 'Poland',      flag: '🇵🇱', mp: 1, w: 0, d: 1, l: 0, gd: '0', pts: 1, qualified: false },
      { pos: 3, team: 'Mexico',      flag: '🇲🇽', mp: 1, w: 0, d: 1, l: 0, gd: '0', pts: 1, qualified: false },
      { pos: 4, team: 'Saudi Arabia',flag: '🇸🇦', mp: 0, w: 0, d: 0, l: 0, gd: '0', pts: 0, qualified: false },
    ],
  },
  {
    group: 'GROUP D',
    rows: [
      { pos: 1, team: 'France',    flag: '🇫🇷', mp: 1, w: 1, d: 0, l: 0, gd: '+3', pts: 3, qualified: false },
      { pos: 2, team: 'Denmark',   flag: '🇩🇰', mp: 0, w: 0, d: 0, l: 0, gd: '0',  pts: 0, qualified: false },
      { pos: 3, team: 'Tunisia',   flag: '🇹🇳', mp: 0, w: 0, d: 0, l: 0, gd: '0',  pts: 0, qualified: false },
      { pos: 4, team: 'Australia', flag: '🇦🇺', mp: 1, w: 0, d: 0, l: 1, gd: '-3', pts: 0, qualified: false },
    ],
  },
];

export const hostCities = [
  { name: 'New York / New Jersey', country: 'USA',    icon: '🗽', matches: 8 },
  { name: 'Los Angeles',           country: 'USA',    icon: '🌴', matches: 8 },
  { name: 'Dallas',                country: 'USA',    icon: '⭐', matches: 7 },
  { name: 'San Francisco',         country: 'USA',    icon: '🌉', matches: 6 },
  { name: 'Miami',                 country: 'USA',    icon: '🏖️', matches: 6 },
  { name: 'Atlanta',               country: 'USA',    icon: '🍑', matches: 6 },
  { name: 'Seattle',               country: 'USA',    icon: '🌲', matches: 6 },
  { name: 'Houston',               country: 'USA',    icon: '🚀', matches: 6 },
  { name: 'Philadelphia',          country: 'USA',    icon: '🔔', matches: 6 },
  { name: 'Kansas City',           country: 'USA',    icon: '🎷', matches: 6 },
  { name: 'Boston',                country: 'USA',    icon: '🦞', matches: 6 },
  { name: 'Toronto',               country: 'Canada', icon: '🍁', matches: 6 },
  { name: 'Vancouver',             country: 'Canada', icon: '🏔️', matches: 6 },
  { name: 'Guadalajara',           country: 'Mexico', icon: '🎺', matches: 6 },
  { name: 'Mexico City',           country: 'Mexico', icon: '🏛️', matches: 7 },
  { name: 'Monterrey',             country: 'Mexico', icon: '🦋', matches: 6 },
];
