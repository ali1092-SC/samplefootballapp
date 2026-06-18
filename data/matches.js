/**
 * FIFA World Cup 2026™ — Match Data
 * Structured mock fixtures for today, tomorrow, and recent results.
 */

export const todayMatches = [
  {
    id: 'match-001',
    homeTeam: 'Brazil', homeFlag: '🇧🇷', homeScore: 2,
    awayTeam: 'France', awayFlag: '🇫🇷', awayScore: 1,
    status: 'LIVE', minute: 67,
    venue: 'MetLife Stadium, New Jersey', date: 'Jun 18', time: '20:00',
    group: 'Group A', round: 'Group Stage',
  },
  {
    id: 'match-002',
    homeTeam: 'Germany', homeFlag: '🇩🇪', homeScore: 0,
    awayTeam: 'Spain',   awayFlag: '🇪🇸', awayScore: 0,
    status: 'LIVE', minute: 34,
    venue: 'SoFi Stadium, Los Angeles', date: 'Jun 18', time: '21:00',
    group: 'Group B', round: 'Group Stage',
  },
  {
    id: 'match-003',
    homeTeam: 'Argentina', homeFlag: '🇦🇷', homeScore: 3,
    awayTeam: 'England',   awayFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', awayScore: 1,
    status: 'FT', minute: 90,
    venue: 'AT&T Stadium, Dallas', date: 'Jun 18', time: '17:00',
    group: 'Group C', round: 'Group Stage',
  },
  {
    id: 'match-004',
    homeTeam: 'Netherlands', homeFlag: '🇳🇱', homeScore: 0,
    awayTeam: 'Portugal',    awayFlag: '🇵🇹', awayScore: 0,
    status: 'UPCOMING', minute: 0,
    venue: 'Rose Bowl, Los Angeles', date: 'Jun 18', time: '23:00',
    group: 'Group D', round: 'Group Stage',
  },
  {
    id: 'match-005',
    homeTeam: 'USA',    homeFlag: '🇺🇸', homeScore: 1,
    awayTeam: 'Mexico', awayFlag: '🇲🇽', awayScore: 1,
    status: 'LIVE', minute: 78,
    venue: 'Arrowhead Stadium, Kansas City', date: 'Jun 18', time: '19:00',
    group: 'Group E', round: 'Group Stage',
  },
  {
    id: 'match-006',
    homeTeam: 'Japan',   homeFlag: '🇯🇵', homeScore: 2,
    awayTeam: 'Morocco', awayFlag: '🇲🇦', awayScore: 0,
    status: 'FT', minute: 90,
    venue: 'Levi\'s Stadium, San Francisco', date: 'Jun 18', time: '15:00',
    group: 'Group F', round: 'Group Stage',
  },
];

export const tomorrowMatches = [
  {
    id: 'match-007',
    homeTeam: 'Italy',  homeFlag: '🇮🇹', homeScore: 0,
    awayTeam: 'Croatia', awayFlag: '🇭🇷', awayScore: 0,
    status: 'UPCOMING', minute: 0,
    venue: 'Allegiant Stadium, Las Vegas', date: 'Jun 19', time: '18:00',
    group: 'Group G', round: 'Group Stage',
  },
  {
    id: 'match-008',
    homeTeam: 'Belgium',   homeFlag: '🇧🇪', homeScore: 0,
    awayTeam: 'Senegal',   awayFlag: '🇸🇳', awayScore: 0,
    status: 'UPCOMING', minute: 0,
    venue: 'Mercedes-Benz Stadium, Atlanta', date: 'Jun 19', time: '20:00',
    group: 'Group H', round: 'Group Stage',
  },
  {
    id: 'match-009',
    homeTeam: 'Canada',    homeFlag: '🇨🇦', homeScore: 0,
    awayTeam: 'Australia', awayFlag: '🇦🇺', awayScore: 0,
    status: 'UPCOMING', minute: 0,
    venue: 'BC Place, Vancouver', date: 'Jun 19', time: '16:00',
    group: 'Group A', round: 'Group Stage',
  },
  {
    id: 'match-010',
    homeTeam: 'South Korea', homeFlag: '🇰🇷', homeScore: 0,
    awayTeam: 'Nigeria',     awayFlag: '🇳🇬', awayScore: 0,
    status: 'UPCOMING', minute: 0,
    venue: 'Estadio Azteca, Mexico City', date: 'Jun 19', time: '22:00',
    group: 'Group B', round: 'Group Stage',
  },
  {
    id: 'match-011',
    homeTeam: 'Colombia', homeFlag: '🇨🇴', homeScore: 0,
    awayTeam: 'Ecuador',  awayFlag: '🇪🇨', awayScore: 0,
    status: 'UPCOMING', minute: 0,
    venue: 'Gillette Stadium, Boston', date: 'Jun 19', time: '14:00',
    group: 'Group C', round: 'Group Stage',
  },
  {
    id: 'match-012',
    homeTeam: 'Saudi Arabia', homeFlag: '🇸🇦', homeScore: 0,
    awayTeam: 'Ghana',        awayFlag: '🇬🇭', awayScore: 0,
    status: 'UPCOMING', minute: 0,
    venue: 'NRG Stadium, Houston', date: 'Jun 19', time: '21:00',
    group: 'Group D', round: 'Group Stage',
  },
];

export const recentResults = [
  {
    id: 'match-r01',
    homeTeam: 'England',    homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', homeScore: 2,
    awayTeam: 'Iran',       awayFlag: '🇮🇷', awayScore: 1,
    status: 'FT', minute: 90,
    venue: 'MetLife Stadium, New Jersey', date: 'Jun 17', time: '17:00',
    group: 'Group B', round: 'Group Stage',
  },
  {
    id: 'match-r02',
    homeTeam: 'France',   homeFlag: '🇫🇷', homeScore: 4,
    awayTeam: 'Denmark',  awayFlag: '🇩🇰', awayScore: 1,
    status: 'FT', minute: 90,
    venue: 'SoFi Stadium, Los Angeles', date: 'Jun 17', time: '21:00',
    group: 'Group D', round: 'Group Stage',
  },
  {
    id: 'match-r03',
    homeTeam: 'Spain',   homeFlag: '🇪🇸', homeScore: 7,
    awayTeam: 'Costa Rica', awayFlag: '🇨🇷', awayScore: 0,
    status: 'FT', minute: 90,
    venue: 'AT&T Stadium, Dallas', date: 'Jun 16', time: '18:00',
    group: 'Group E', round: 'Group Stage',
  },
  {
    id: 'match-r04',
    homeTeam: 'Brazil',  homeFlag: '🇧🇷', homeScore: 2,
    awayTeam: 'Serbia',  awayFlag: '🇷🇸', awayScore: 0,
    status: 'FT', minute: 90,
    venue: 'Estadio Azteca, Mexico City', date: 'Jun 16', time: '22:00',
    group: 'Group G', round: 'Group Stage',
  },
  {
    id: 'match-r05',
    homeTeam: 'Portugal',   homeFlag: '🇵🇹', homeScore: 3,
    awayTeam: 'Ghana',      awayFlag: '🇬🇭', awayScore: 2,
    status: 'FT', minute: 90,
    venue: 'Stadium 974, Qatar', date: 'Jun 15', time: '19:00',
    group: 'Group H', round: 'Group Stage',
  },
  {
    id: 'match-r06',
    homeTeam: 'Argentina',  homeFlag: '🇦🇷', homeScore: 1,
    awayTeam: 'Saudi Arabia', awayFlag: '🇸🇦', awayScore: 2,
    status: 'FT', minute: 90,
    venue: 'NRG Stadium, Houston', date: 'Jun 15', time: '13:00',
    group: 'Group C', round: 'Group Stage',
  },
];

export const groupStandings = [
  {
    name: 'A',
    teams: [
      { name: 'Brazil',    flag: '🇧🇷', played: 3, won: 3, drawn: 0, lost: 0, gd: +8, pts: 9 },
      { name: 'France',    flag: '🇫🇷', played: 3, won: 2, drawn: 0, lost: 1, gd: +4, pts: 6 },
      { name: 'Australia', flag: '🇦🇺', played: 3, won: 1, drawn: 0, lost: 2, gd: -3, pts: 3 },
      { name: 'Canada',    flag: '🇨🇦', played: 3, won: 0, drawn: 0, lost: 3, gd: -9, pts: 0 },
    ],
  },
  {
    name: 'B',
    teams: [
      { name: 'Spain',       flag: '🇪🇸', played: 3, won: 3, drawn: 0, lost: 0, gd: +9, pts: 9 },
      { name: 'Germany',     flag: '🇩🇪', played: 3, won: 2, drawn: 0, lost: 1, gd: +2, pts: 6 },
      { name: 'Japan',       flag: '🇯🇵', played: 3, won: 1, drawn: 0, lost: 2, gd: -3, pts: 3 },
      { name: 'South Korea', flag: '🇰🇷', played: 3, won: 0, drawn: 0, lost: 3, gd: -8, pts: 0 },
    ],
  },
  {
    name: 'C',
    teams: [
      { name: 'Argentina', flag: '🇦🇷', played: 3, won: 2, drawn: 1, lost: 0, gd: +5, pts: 7 },
      { name: 'England',   flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', played: 3, won: 2, drawn: 0, lost: 1, gd: +3, pts: 6 },
      { name: 'Colombia',  flag: '🇨🇴', played: 3, won: 0, drawn: 1, lost: 2, gd: -3, pts: 1 },
      { name: 'Ecuador',   flag: '🇪🇨', played: 3, won: 0, drawn: 0, lost: 3, gd: -5, pts: 0 },
    ],
  },
  {
    name: 'D',
    teams: [
      { name: 'France',     flag: '🇫🇷', played: 3, won: 3, drawn: 0, lost: 0, gd: +7, pts: 9 },
      { name: 'Portugal',   flag: '🇵🇹', played: 3, won: 2, drawn: 0, lost: 1, gd: +2, pts: 6 },
      { name: 'Denmark',    flag: '🇩🇰', played: 3, won: 1, drawn: 0, lost: 2, gd: -3, pts: 3 },
      { name: 'Tunisia',    flag: '🇹🇳', played: 3, won: 0, drawn: 0, lost: 3, gd: -6, pts: 0 },
    ],
  },
  {
    name: 'E',
    teams: [
      { name: 'USA',     flag: '🇺🇸', played: 2, won: 1, drawn: 1, lost: 0, gd: +1, pts: 4 },
      { name: 'Mexico',  flag: '🇲🇽', played: 2, won: 1, drawn: 1, lost: 0, gd: +2, pts: 4 },
      { name: 'Poland',  flag: '🇵🇱', played: 2, won: 0, drawn: 1, lost: 1, gd: -1, pts: 1 },
      { name: 'Morocco', flag: '🇲🇦', played: 2, won: 0, drawn: 1, lost: 1, gd: -2, pts: 1 },
    ],
  },
  {
    name: 'F',
    teams: [
      { name: 'Belgium',      flag: '🇧🇪', played: 2, won: 2, drawn: 0, lost: 0, gd: +4, pts: 6 },
      { name: 'Croatia',      flag: '🇭🇷', played: 2, won: 1, drawn: 0, lost: 1, gd: +1, pts: 3 },
      { name: 'Senegal',      flag: '🇸🇳', played: 2, won: 1, drawn: 0, lost: 1, gd: 0,  pts: 3 },
      { name: 'Saudi Arabia', flag: '🇸🇦', played: 2, won: 0, drawn: 0, lost: 2, gd: -5, pts: 0 },
    ],
  },
];

export const topScorers = [
  { name: 'Kylian Mbappé',       flag: '🇫🇷', team: 'France',    goals: 7, assists: 3 },
  { name: 'Erling Haaland',      flag: '🇳🇴', team: 'Norway',    goals: 6, assists: 2 },
  { name: 'Lionel Messi',        flag: '🇦🇷', team: 'Argentina', goals: 5, assists: 5 },
  { name: 'Neymar Jr.',          flag: '🇧🇷', team: 'Brazil',    goals: 5, assists: 3 },
  { name: 'Karim Benzema',       flag: '🇫🇷', team: 'France',    goals: 4, assists: 2 },
  { name: 'Vinicius Jr.',        flag: '🇧🇷', team: 'Brazil',    goals: 4, assists: 4 },
  { name: 'Cristiano Ronaldo',   flag: '🇵🇹', team: 'Portugal',  goals: 4, assists: 1 },
  { name: 'Harry Kane',          flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', team: 'England',   goals: 3, assists: 2 },
  { name: 'Lamine Yamal',        flag: '🇪🇸', team: 'Spain',     goals: 3, assists: 5 },
  { name: 'Bukayo Saka',         flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', team: 'England',   goals: 3, assists: 3 },
];

export const hostCities = [
  { name: 'New York / New Jersey', country: 'USA',    countryFlag: '🇺🇸', stadium: 'MetLife Stadium',            matches: 8, emoji: '🗽' },
  { name: 'Los Angeles',           country: 'USA',    countryFlag: '🇺🇸', stadium: 'SoFi Stadium',               matches: 7, emoji: '🌴' },
  { name: 'Dallas',                country: 'USA',    countryFlag: '🇺🇸', stadium: 'AT&T Stadium',               matches: 6, emoji: '⭐' },
  { name: 'San Francisco',         country: 'USA',    countryFlag: '🇺🇸', stadium: "Levi's Stadium",             matches: 6, emoji: '🌉' },
  { name: 'Kansas City',           country: 'USA',    countryFlag: '🇺🇸', stadium: 'Arrowhead Stadium',          matches: 5, emoji: '🏈' },
  { name: 'Seattle',               country: 'USA',    countryFlag: '🇺🇸', stadium: 'Lumen Field',                matches: 5, emoji: '☕' },
  { name: 'Houston',               country: 'USA',    countryFlag: '🇺🇸', stadium: 'NRG Stadium',                matches: 5, emoji: '🚀' },
  { name: 'Atlanta',               country: 'USA',    countryFlag: '🇺🇸', stadium: 'Mercedes-Benz Stadium',     matches: 5, emoji: '🍑' },
  { name: 'Philadelphia',          country: 'USA',    countryFlag: '🇺🇸', stadium: 'Lincoln Financial Field',   matches: 5, emoji: '🔔' },
  { name: 'Boston',                country: 'USA',    countryFlag: '🇺🇸', stadium: 'Gillette Stadium',           matches: 5, emoji: '🦞' },
  { name: 'Miami',                 country: 'USA',    countryFlag: '🇺🇸', stadium: 'Hard Rock Stadium',         matches: 4, emoji: '🌊' },
  { name: 'Toronto',               country: 'Canada', countryFlag: '🇨🇦', stadium: 'BMO Field (expanded)',      matches: 6, emoji: '🍁' },
  { name: 'Vancouver',             country: 'Canada', countryFlag: '🇨🇦', stadium: 'BC Place',                  matches: 6, emoji: '🏔️' },
  { name: 'Mexico City',           country: 'Mexico', countryFlag: '🇲🇽', stadium: 'Estadio Azteca',             matches: 7, emoji: '🦅' },
  { name: 'Guadalajara',           country: 'Mexico', countryFlag: '🇲🇽', stadium: 'Estadio Akron',              matches: 5, emoji: '🌺' },
  { name: 'Monterrey',             country: 'Mexico', countryFlag: '🇲🇽', stadium: 'Estadio BBVA',               matches: 5, emoji: '🏜️' },
];
