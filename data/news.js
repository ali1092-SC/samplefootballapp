/**
 * FIFA World Cup 2026™ — Mock News Data
 */

export const NEWS_CATEGORY = {
  MATCH:    'match',
  TEAM:     'team',
  TRANSFER: 'transfer',
  PREVIEW:  'preview',
  GENERAL:  'general',
};

const BADGE_MAP = {
  match:    'badge-match',
  team:     'badge-team',
  transfer: 'badge-transfer',
  preview:  'badge-preview',
  general:  'badge-general',
};

export function getCategoryBadgeClass(category) {
  return BADGE_MAP[category] ?? BADGE_MAP.general;
}

export function getCategoryLabel(category) {
  const labels = {
    match:    'Match Report',
    team:     'Team News',
    transfer: 'Transfer',
    preview:  'Preview',
    general:  'General',
  };
  return labels[category] ?? 'News';
}

export function timeAgo(dateStr) {
  const now   = Date.now();
  const past  = new Date(dateStr).getTime();
  const diff  = Math.floor((now - past) / 1000);
  if (diff < 60)   return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

const now = new Date();
function minsAgo(n)  { return new Date(now - n * 60000).toISOString(); }
function hoursAgo(n) { return new Date(now - n * 3600000).toISOString(); }
function daysAgo(n)  { return new Date(now - n * 86400000).toISOString(); }

export const allNews = [
  // ── HERO / FEATURED ─────────────────────────────────────────────────
  {
    id: 'n-001',
    category: NEWS_CATEGORY.MATCH,
    title: 'Brazil Cruise Past Serbia With Brilliant Vinicius Jr Brace to Open World Cup 2026',
    excerpt: 'Vinicius Jr put on a world-class display at MetLife Stadium, netting twice in the first half as Brazil dominated Serbia in their Group A opener. The Seleção look every inch the tournament favourites.',
    icon: '🇧🇷',
    author: { name: 'Carlos Mendes', initials: 'CM' },
    publishedAt: minsAgo(22),
    readTime: '4 min read',
    isFeatured: true,
    tags: ['Brazil', 'Serbia', 'Group A', 'Match Report'],
  },
  // ── REGULAR ─────────────────────────────────────────────────────────
  {
    id: 'n-002',
    category: NEWS_CATEGORY.TEAM,
    title: 'Mbappé Named France Captain for 2026 World Cup Campaign',
    excerpt: 'The PSG forward has been officially handed the armband following Hugo Lloris's retirement from international football.',
    icon: '🇫🇷',
    author: { name: 'Sophie Laurent', initials: 'SL' },
    publishedAt: hoursAgo(2),
    readTime: '3 min read',
    isFeatured: false,
    tags: ['France', 'Mbappé', 'Team News'],
  },
  {
    id: 'n-003',
    category: NEWS_CATEGORY.PREVIEW,
    title: 'England vs Iran: Three Key Battles That Will Decide the Group B Opener',
    excerpt: 'Bellingham against Ansarifard, Walker vs Azmoun, and the tactical shape Southgate deploys in midfield — here's what to watch.',
    icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    author: { name: 'James Hargreaves', initials: 'JH' },
    publishedAt: hoursAgo(3),
    readTime: '6 min read',
    isFeatured: false,
    tags: ['England', 'Iran', 'Preview', 'Group B'],
  },
  {
    id: 'n-004',
    category: NEWS_CATEGORY.GENERAL,
    title: 'MetLife Stadium Breaks Record 92,000 Attendance for World Cup Opening Match',
    excerpt: 'The iconic New Jersey venue set a new World Cup attendance record as fans flooded in for the tournament opener between Brazil and Serbia.',
    icon: '🏟️',
    author: { name: 'FIFA Media', initials: 'FM' },
    publishedAt: hoursAgo(4),
    readTime: '2 min read',
    isFeatured: false,
    tags: ['Stadium', 'Attendance', 'Record'],
  },
  {
    id: 'n-005',
    category: NEWS_CATEGORY.TEAM,
    title: 'Messi Confirms This Will Be His Final World Cup — "Every Game Feels Like a Gift"',
    excerpt: 'The eight-time Ballon d'Or winner spoke candidly ahead of Argentina's Group C opener, expressing his desire to win the trophy one last time on North American soil.',
    icon: '🇦🇷',
    author: { name: 'Ana Gómez', initials: 'AG' },
    publishedAt: hoursAgo(5),
    readTime: '5 min read',
    isFeatured: false,
    tags: ['Messi', 'Argentina', 'Interview'],
  },
  {
    id: 'n-006',
    category: NEWS_CATEGORY.MATCH,
    title: 'France 4–1 Australia: Les Bleus Send Dominant Statement in Atlanta',
    excerpt: 'Giroud, Griezmann (brace) and Mbappé scored as France put four past a shell-shocked Australia side in a stunning Group D performance.',
    icon: '🇫🇷',
    author: { name: 'Sophie Laurent', initials: 'SL' },
    publishedAt: hoursAgo(6),
    readTime: '4 min read',
    isFeatured: false,
    tags: ['France', 'Australia', 'Match Report', 'Group D'],
  },
  {
    id: 'n-007',
    category: NEWS_CATEGORY.TRANSFER,
    title: 'Haaland Reveals He Rejected Three Club Offers to Focus Entirely on World Cup',
    excerpt: 'The Norwegian striker says winning the World Cup with Norway — who qualified for the first time since 1998 — is the "only thing that matters" this summer.',
    icon: '🇳🇴',
    author: { name: 'Erik Andersen', initials: 'EA' },
    publishedAt: hoursAgo(8),
    readTime: '3 min read',
    isFeatured: false,
    tags: ['Haaland', 'Norway', 'Transfer'],
  },
  {
    id: 'n-008',
    category: NEWS_CATEGORY.PREVIEW,
    title: 'USA vs Wales: Pulisic and Bale Set for Epic Showdown in Houston',
    excerpt: 'Two veterans with point-to-prove face off as the United States and Wales meet in a pivotal Group B clash at NRG Stadium.',
    icon: '🇺🇸',
    author: { name: 'Tyler Reed', initials: 'TR' },
    publishedAt: hoursAgo(9),
    readTime: '5 min read',
    isFeatured: false,
    tags: ['USA', 'Wales', 'Preview', 'Group B'],
  },
  {
    id: 'n-009',
    category: NEWS_CATEGORY.GENERAL,
    title: 'Mexico City's Estadio Azteca Becomes First Venue to Host Three World Cups',
    excerpt: 'The legendary stadium, previously the centrepiece of 1970 and 1986 editions, writes its name further into history as 2026 matches begin.',
    icon: '🏛️',
    author: { name: 'FIFA Media', initials: 'FM' },
    publishedAt: daysAgo(1),
    readTime: '3 min read',
    isFeatured: false,
    tags: ['Azteca', 'Mexico', 'History'],
  },
  {
    id: 'n-010',
    category: NEWS_CATEGORY.TEAM,
    title: 'Japan Stun Expectations With Brilliant Tactical Display in Training Camp',
    excerpt: 'Hajime Moriyasu's high-pressing system has impressed scouts from multiple European nations who watched Japan's final pre-tournament sessions.',
    icon: '🇯🇵',
    author: { name: 'Kenji Tanaka', initials: 'KT' },
    publishedAt: daysAgo(1),
    readTime: '4 min read',
    isFeatured: false,
    tags: ['Japan', 'Tactics', 'Team News'],
  },
  {
    id: 'n-011',
    category: NEWS_CATEGORY.MATCH,
    title: 'Switzerland Hold Brazil Rivals Cameroon to Dramatic 1-1 Draw',
    excerpt: 'Substitute Embolo equalised in the 85th minute to snatch a point for Switzerland as Cameroon's Aboubakar struck a thunderous opener.',
    icon: '🇨🇭',
    author: { name: 'Marc Dupont', initials: 'MD' },
    publishedAt: minsAgo(45),
    readTime: '4 min read',
    isFeatured: false,
    tags: ['Switzerland', 'Cameroon', 'Group A', 'Match Report'],
  },
  {
    id: 'n-012',
    category: NEWS_CATEGORY.GENERAL,
    title: 'FIFA Announces Record-Breaking $7.5 Billion Prize Pool for 2026 Tournament',
    excerpt: 'The winning nation will take home $125 million — more than double the 2022 prize fund — as commercial revenues hit an all-time high.',
    icon: '💰',
    author: { name: 'FIFA Media', initials: 'FM' },
    publishedAt: daysAgo(2),
    readTime: '2 min read',
    isFeatured: false,
    tags: ['Prize Fund', 'FIFA', 'Revenue'],
  },
];

export function getNewsByCategory(category) {
  if (category === 'all') return allNews;
  return allNews.filter(n => n.category === category);
}

export const topScorers = [
  { rank: 1, name: 'Vinicius Jr',    team: 'Brazil',     flag: '🇧🇷', goals: 2, assists: 1 },
  { rank: 2, name: 'Antoine Griezmann', team: 'France',  flag: '🇫🇷', goals: 2, assists: 0 },
  { rank: 3, name: 'Kylian Mbappé',  team: 'France',     flag: '🇫🇷', goals: 1, assists: 1 },
  { rank: 4, name: 'Giroud',         team: 'France',     flag: '🇫🇷', goals: 1, assists: 0 },
  { rank: 5, name: 'Karl Toko Ekambi', team: 'Cameroon', flag: '🇨🇲', goals: 1, assists: 0 },
  { rank: 6, name: 'Breel Embolo',   team: 'Switzerland',flag: '🇨🇭', goals: 1, assists: 0 },
];
