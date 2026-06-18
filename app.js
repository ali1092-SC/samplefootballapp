/* =============================================
   FIFA WORLD CUP 2026 — Fan Hub Application
   ============================================= */

// ── Data ──────────────────────────────────────────────────────────────────────

const matchesData = [
  {
    id: 1, group: 'group-a',
    teamA: { name: 'Argentina', flag: '🇦🇷' },
    teamB: { name: 'France', flag: '🇫🇷' },
    date: 'June 20, 2026', time: '3:00 PM EST',
    venue: 'MetLife Stadium, New York',
    stadium: 'MetLife Stadium', capacity: '82,500',
    players: [
      { name: 'L. Messi', role: 'Forward', emoji: '🌟' },
      { name: 'K. Mbappé', role: 'Forward', emoji: '⚡' },
      { name: 'J. Álvarez', role: 'Striker', emoji: '🔥' },
      { name: 'A. Griezmann', role: 'Midfielder', emoji: '🎯' }
    ]
  },
  {
    id: 2, group: 'group-b',
    teamA: { name: 'Brazil', flag: '🇧🇷' },
    teamB: { name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    date: 'June 20, 2026', time: '6:00 PM EST',
    venue: 'Rose Bowl, Los Angeles',
    stadium: 'Rose Bowl', capacity: '90,888',
    players: [
      { name: 'Vinicius Jr', role: 'Forward', emoji: '💫' },
      { name: 'H. Kane', role: 'Striker', emoji: '⚽' },
      { name: 'Rodrygo', role: 'Winger', emoji: '🚀' },
      { name: 'J. Bellingham', role: 'Midfielder', emoji: '🌠' }
    ]
  },
  {
    id: 3, group: 'group-c',
    teamA: { name: 'Spain', flag: '🇪🇸' },
    teamB: { name: 'Germany', flag: '🇩🇪' },
    date: 'June 21, 2026', time: '3:00 PM EST',
    venue: 'AT&T Stadium, Dallas',
    stadium: 'AT&T Stadium', capacity: '80,000',
    players: [
      { name: 'Pedri', role: 'Midfielder', emoji: '🎪' },
      { name: 'K. Havertz', role: 'Forward', emoji: '💥' },
      { name: 'Y. Yamal', role: 'Winger', emoji: '🌟' },
      { name: 'J. Kimmich', role: 'Midfielder', emoji: '🧠' }
    ]
  },
  {
    id: 4, group: 'group-d',
    teamA: { name: 'Portugal', flag: '🇵🇹' },
    teamB: { name: 'Morocco', flag: '🇲🇦' },
    date: 'June 21, 2026', time: '6:00 PM EST',
    venue: 'SoFi Stadium, Los Angeles',
    stadium: 'SoFi Stadium', capacity: '70,240',
    players: [
      { name: 'C. Ronaldo', role: 'Forward', emoji: '👑' },
      { name: 'H. Ziyech', role: 'Winger', emoji: '✨' },
      { name: 'B. Fernandes', role: 'Midfielder', emoji: '🎯' },
      { name: 'A. Hakimi', role: 'Defender', emoji: '🛡️' }
    ]
  },
  {
    id: 5, group: 'group-a',
    teamA: { name: 'Mexico', flag: '🇲🇽' },
    teamB: { name: 'Canada', flag: '🇨🇦' },
    date: 'June 22, 2026', time: '1:00 PM EST',
    venue: 'Estadio Azteca, Mexico City',
    stadium: 'Estadio Azteca', capacity: '87,523',
    players: [
      { name: 'H. Lozano', role: 'Winger', emoji: '🌶️' },
      { name: 'A. Davies', role: 'Defender', emoji: '⚡' },
      { name: 'R. Jiménez', role: 'Striker', emoji: '🦅' },
      { name: 'J. David', role: 'Forward', emoji: '🎯' }
    ]
  },
  {
    id: 6, group: 'group-b',
    teamA: { name: 'Netherlands', flag: '🇳🇱' },
    teamB: { name: 'USA', flag: '🇺🇸' },
    date: 'June 22, 2026', time: '4:00 PM EST',
    venue: 'Levi\'s Stadium, San Francisco',
    stadium: "Levi's Stadium", capacity: '68,500',
    players: [
      { name: 'V. van Dijk', role: 'Defender', emoji: '🏰' },
      { name: 'C. Pulisic', role: 'Winger', emoji: '🦅' },
      { name: 'C. Gakpo', role: 'Forward', emoji: '💫' },
      { name: 'F. Adams', role: 'Midfielder', emoji: '⭐' }
    ]
  },
  {
    id: 7, group: 'knockout',
    teamA: { name: 'TBD', flag: '🏳️' },
    teamB: { name: 'TBD', flag: '🏳️' },
    date: 'July 10, 2026', time: '5:00 PM EST',
    venue: 'MetLife Stadium, New York',
    stadium: 'MetLife Stadium', capacity: '82,500',
    players: [
      { name: 'TBD', role: 'TBD', emoji: '❓' },
      { name: 'TBD', role: 'TBD', emoji: '❓' },
      { name: 'TBD', role: 'TBD', emoji: '❓' },
      { name: 'TBD', role: 'TBD', emoji: '❓' }
    ]
  },
  {
    id: 8, group: 'knockout',
    teamA: { name: 'TBD', flag: '🏳️' },
    teamB: { name: 'TBD', flag: '🏳️' },
    date: 'July 14, 2026', time: '8:00 PM EST',
    venue: 'SoFi Stadium, Los Angeles',
    stadium: 'SoFi Stadium', capacity: '70,240',
    players: [
      { name: 'TBD', role: 'TBD', emoji: '❓' },
      { name: 'TBD', role: 'TBD', emoji: '❓' },
      { name: 'TBD', role: 'TBD', emoji: '❓' },
      { name: 'TBD', role: 'TBD', emoji: '❓' }
    ]
  }
];

const playersData = [
  { name: 'Lionel Messi', country: '🇦🇷 Argentina', position: 'Forward',   emoji: '🌟', number: '10', goals: 4, assists: 3 },
  { name: 'Kylian Mbappé', country: '🇫🇷 France',   position: 'Forward',   emoji: '⚡', number: '7',  goals: 5, assists: 2 },
  { name: 'Vinicius Jr',   country: '🇧🇷 Brazil',    position: 'Winger',    emoji: '💫', number: '7',  goals: 3, assists: 4 },
  { name: 'Erling Haaland',country: '🇳🇴 Norway',    position: 'Striker',   emoji: '🔨', number: '9',  goals: 4, assists: 1 },
  { name: 'Pedri',         country: '🇪🇸 Spain',     position: 'Midfielder',emoji: '🎪', number: '8',  goals: 2, assists: 5 },
  { name: 'Lamine Yamal',  country: '🇪🇸 Spain',     position: 'Winger',    emoji: '👶', number: '11', goals: 3, assists: 3 },
  { name: 'Jude Bellingham',country:'🏴󠁧󠁢󠁥󠁮󠁧󠁿 England',  position: 'Midfielder',emoji: '🌠', number: '10', goals: 3, assists: 2 },
  { name: 'Cristiano Ronaldo',country:'🇵🇹 Portugal',position: 'Forward',   emoji: '👑', number: '7',  goals: 2, assists: 1 }
];

const scorersData = [
  { rank: 1, name: 'Kylian Mbappé',   country: '🇫🇷 France',    emoji: '⚡', goals: 5, matches: 4 },
  { rank: 2, name: 'Erling Haaland',  country: '🇳🇴 Norway',    emoji: '🔨', goals: 4, matches: 4 },
  { rank: 3, name: 'Lionel Messi',    country: '🇦🇷 Argentina', emoji: '🌟', goals: 4, matches: 3 },
  { rank: 4, name: 'Lamine Yamal',    country: '🇪🇸 Spain',     emoji: '👶', goals: 3, matches: 4 },
  { rank: 5, name: 'Vinicius Jr',     country: '🇧🇷 Brazil',    emoji: '💫', goals: 3, matches: 4 },
  { rank: 6, name: 'Jude Bellingham', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England',  emoji: '🌠', goals: 3, matches: 3 },
  { rank: 7, name: 'Harry Kane',      country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England',  emoji: '⚽', goals: 2, matches: 4 },
  { rank: 8, name: 'Pedri',           country: '🇪🇸 Spain',     emoji: '🎪', goals: 2, matches: 4 }
];

const assistsData = [
  { rank: 1, name: 'Pedri',           country: '🇪🇸 Spain',     emoji: '🎪', assists: 5, matches: 4 },
  { rank: 2, name: 'Vinicius Jr',     country: '🇧🇷 Brazil',    emoji: '💫', assists: 4, matches: 4 },
  { rank: 3, name: 'Lionel Messi',    country: '🇦🇷 Argentina', emoji: '🌟', assists: 3, matches: 3 },
  { rank: 4, name: 'Lamine Yamal',    country: '🇪🇸 Spain',     emoji: '👶', assists: 3, matches: 4 },
  { rank: 5, name: 'Kevin De Bruyne', country: '🇧🇪 Belgium',   emoji: '🧠', assists: 3, matches: 3 },
  { rank: 6, name: 'Kylian Mbappé',   country: '🇫🇷 France',    emoji: '⚡', assists: 2, matches: 4 },
  { rank: 7, name: 'Achraf Hakimi',   country: '🇲🇦 Morocco',   emoji: '🛡️', assists: 2, matches: 4 },
  { rank: 8, name: 'Jude Bellingham', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England',  emoji: '🌠', assists: 2, matches: 3 }
];

const groupStandingsData = [
  { group: 'A', team: '🇦🇷 Argentina', p: 3, w: 2, d: 1, l: 0, gf: 7, ga: 3, pts: 7 },
  { group: 'A', team: '🇫🇷 France',    p: 3, w: 2, d: 0, l: 1, gf: 6, ga: 4, pts: 6 },
  { group: 'A', team: '🇲🇽 Mexico',    p: 3, w: 1, d: 1, l: 1, gf: 4, ga: 5, pts: 4 },
  { group: 'A', team: '🇨🇦 Canada',    p: 3, w: 0, d: 0, l: 3, gf: 2, ga: 7, pts: 0 },
  { group: 'B', team: '🇧🇷 Brazil',    p: 3, w: 3, d: 0, l: 0, gf: 9, ga: 2, pts: 9 },
  { group: 'B', team: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England',  p: 3, w: 2, d: 0, l: 1, gf: 5, ga: 4, pts: 6 },
  { group: 'B', team: '🇳🇱 Netherlands',p: 3,w: 1, d: 0, l: 2, gf: 3, ga: 5, pts: 3 },
  { group: 'B', team: '🇺🇸 USA',        p: 3, w: 0, d: 0, l: 3, gf: 1, ga: 7, pts: 0 }
];

const resultsData = [
  {
    group: 'Group B — Matchday 1', date: 'June 15, 2026',
    teamA: { name: 'Brazil', flag: '🇧🇷' }, scoreA: 3,
    teamB: { name: 'Mexico', flag: '🇲🇽' }, scoreB: 0,
    scorers: [
      { team: 'Brazil', player: 'Vinicius Jr', time: "23'" },
      { team: 'Brazil', player: 'Rodrygo',     time: "58'" },
      { team: 'Brazil', player: 'Endrick',     time: "79'" }
    ]
  },
  {
    group: 'Group A — Matchday 1', date: 'June 15, 2026',
    teamA: { name: 'France', flag: '🇫🇷' }, scoreA: 4,
    teamB: { name: 'Canada', flag: '🇨🇦' }, scoreB: 1,
    scorers: [
      { team: 'France', player: 'Mbappé',     time: "12'" },
      { team: 'France', player: 'Mbappé',     time: "34'" },
      { team: 'France', player: 'Griezmann',  time: "67'" },
      { team: 'France', player: 'Mbappé',     time: "88'" },
      { team: 'Canada', player: 'J. David',   time: "45+2'" }
    ]
  },
  {
    group: 'Group C — Matchday 1', date: 'June 16, 2026',
    teamA: { name: 'Morocco', flag: '🇲🇦' }, scoreA: 2,
    teamB: { name: 'Italy',   flag: '🇮🇹' }, scoreB: 1,
    scorers: [
      { team: 'Morocco', player: 'Ziyech',    time: "29'" },
      { team: 'Morocco', player: 'En-Nesyri', time: "71'" },
      { team: 'Italy',   player: 'Retegui',   time: "55'" }
    ]
  },
  {
    group: 'Group D — Matchday 1', date: 'June 16, 2026',
    teamA: { name: 'Argentina', flag: '🇦🇷' }, scoreA: 2,
    teamB: { name: 'Australia', flag: '🇦🇺' }, scoreB: 0,
    scorers: [
      { team: 'Argentina', player: 'Messi',    time: "10'" },
      { team: 'Argentina', player: 'Álvarez',  time: "62'" }
    ]
  },
  {
    group: 'Group B — Matchday 2', date: 'June 19, 2026',
    teamA: { name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' }, scoreA: 2,
    teamB: { name: 'USA',     flag: '🇺🇸' },    scoreB: 1,
    scorers: [
      { team: 'England', player: 'Kane',       time: "33'" },
      { team: 'England', player: 'Bellingham', time: "74'" },
      { team: 'USA',     player: 'Pulisic',    time: "56'" }
    ]
  },
  {
    group: 'Group A — Matchday 2', date: 'June 19, 2026',
    teamA: { name: 'Argentina', flag: '🇦🇷' }, scoreA: 1,
    teamB: { name: 'Mexico',    flag: '🇲🇽' }, scoreB: 1,
    scorers: [
      { team: 'Argentina', player: 'Messi',   time: "45'" },
      { team: 'Mexico',    player: 'Lozano',  time: "78'" }
    ]
  }
];

const newsData = [
  {
    featured: true, category: 'BREAKING',
    image: '🏆', date: 'June 18, 2026', source: 'FIFA Official',
    title: 'BRAZIL EYES RECORD SEVENTH WORLD CUP TITLE AS SELEÇÃO DOMINATE',
    excerpt: 'With three wins from three, Brazil look unstoppable in Group B. Vinicius Jr has been in scintillating form, racking up three goals and four assists as the five-time champions march towards a historic seventh trophy.'
  },
  {
    featured: false, category: 'MATCH REPORT',
    image: '⚡', date: 'June 17, 2026', source: 'FIFA News',
    title: 'MBAPPÉ HAT-TRICK SINKS CANADA IN OPENING ROUT',
    excerpt: 'Kylian Mbappé became the fastest player to score three goals at this World Cup, netting a stunning hat-trick inside 88 minutes as France cruised to a 4-1 victory over Canada in New York.'
  },
  {
    featured: false, category: 'FEATURE',
    image: '🌟', date: 'June 17, 2026', source: 'Fan Hub',
    title: 'THE MESSI FACTOR: HOW ARGENTINA\'S LEGEND DEFIES TIME',
    excerpt: 'At 38, Lionel Messi continues to bewitch defenders and inspire teammates. We look at how the greatest of all time is still making the difference when it matters most on the biggest stage.'
  },
  {
    featured: false, category: 'UPSET',
    image: '🇲🇦', date: 'June 16, 2026', source: 'FIFA News',
    title: 'MOROCCO STUN ITALY IN STUNNING GROUP C UPSET',
    excerpt: "The Atlas Lions produced a tactical masterclass to beat Italy 2-1, with Hakim Ziyech's thunderbolt opener and Youssef En-Nesyri's clinical finish sending shockwaves through the tournament."
  },
  {
    featured: false, category: 'RISING STAR',
    image: '👶', date: 'June 15, 2026', source: 'Fan Hub',
    title: 'LAMINE YAMAL: THE TEENAGE SENSATION TAKING THE WORLD BY STORM',
    excerpt: "Spain's 18-year-old prodigy has been unplayable in Group C. With three goals and three assists already, Yamal is the talk of the tournament and a strong contender for the Golden Boot."
  },
  {
    featured: false, category: 'STADIUM',
    image: '🏟️', date: 'June 14, 2026', source: 'Fan Hub',
    title: 'INSIDE THE VENUES: THE MOST SPECTACULAR WORLD CUP STADIUMS EVER',
    excerpt: "From the iconic Rose Bowl to the futuristic SoFi Stadium, the 2026 World Cup boasts 16 world-class venues across three nations. We take you inside the arenas that will define football history."
  }
];

// ── Utilities ─────────────────────────────────────────────────────────────────

function groupLabel(key) {
  const map = { 'group-a': 'Group A', 'group-b': 'Group B', 'group-c': 'Group C', 'group-d': 'Group D', 'knockout': 'Knockout Stage' };
  return map[key] || key.toUpperCase();
}

// ── Preloader ─────────────────────────────────────────────────────────────────

window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
  }, 2200);
});

// ── Navbar ────────────────────────────────────────────────────────────────────

const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Scroll Reveal ─────────────────────────────────────────────────────────────

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Match Schedule ────────────────────────────────────────────────────────────

function renderMatches(filter = 'all') {
  const grid = document.getElementById('matchesGrid');
  const data = filter === 'all' ? matchesData : matchesData.filter(m => m.group === filter);
  grid.innerHTML = data.map((m, i) => `
    <div class="match-card reveal" style="animation-delay:${i * 0.08}s" data-id="${m.id}">
      <div class="match-card-header">
        <span class="match-group">${groupLabel(m.group)}</span>
        <span class="match-date">${m.date}</span>
      </div>
      <div class="match-card-body">
        <div class="match-teams">
          <div class="team">
            <div class="team-flag">${m.teamA.flag}</div>
            <div class="team-name">${m.teamA.name}</div>
          </div>
          <div class="match-vs">VS</div>
          <div class="team">
            <div class="team-flag">${m.teamB.flag}</div>
            <div class="team-name">${m.teamB.name}</div>
          </div>
        </div>
      </div>
      <div class="match-card-footer">
        <div>
          <div class="match-time">⏰ ${m.time}</div>
          <div class="match-venue">📍 ${m.venue}</div>
        </div>
        <div class="match-cta">Details</div>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.match-card').forEach(card => {
    revealObserver.observe(card);
    card.addEventListener('click', () => openModal(parseInt(card.dataset.id)));
  });
}

document.querySelectorAll('[data-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMatches(btn.dataset.filter);
  });
});

renderMatches();

// ── Match Modal ───────────────────────────────────────────────────────────────

function openModal(id) {
  const match   = matchesData.find(m => m.id === id);
  if (!match) return;
  const overlay = document.getElementById('matchModal');
  const body    = document.getElementById('modalBody');

  body.innerHTML = `
    <div class="modal-header">
      <div class="modal-group">${groupLabel(match.group)} · ${match.date}</div>
      <div class="modal-teams">
        <div class="modal-team">
          <span class="modal-team-flag">${match.teamA.flag}</span>
          <div class="modal-team-name">${match.teamA.name}</div>
        </div>
        <div class="modal-vs">VS</div>
        <div class="modal-team">
          <span class="modal-team-flag">${match.teamB.flag}</span>
          <div class="modal-team-name">${match.teamB.name}</div>
        </div>
      </div>
    </div>
    <div class="modal-body">
      <div class="modal-info-grid">
        <div class="modal-info-item">
          <div class="modal-info-label">Kick-off Time</div>
          <div class="modal-info-value">⏰ ${match.time}</div>
        </div>
        <div class="modal-info-item">
          <div class="modal-info-label">Venue</div>
          <div class="modal-info-value">🏟️ ${match.stadium}</div>
        </div>
        <div class="modal-info-item">
          <div class="modal-info-label">Location</div>
          <div class="modal-info-value">📍 ${match.venue}</div>
        </div>
        <div class="modal-info-item">
          <div class="modal-info-label">Capacity</div>
          <div class="modal-info-value">👥 ${match.capacity}</div>
        </div>
      </div>
      <div class="modal-players-title">⭐ Players to Watch</div>
      <div class="modal-players-grid">
        ${match.players.map(p => `
          <div class="modal-player">
            <div class="modal-player-avatar">${p.emoji}</div>
            <div>
              <div class="modal-player-name">${p.name}</div>
              <div class="modal-player-role">${p.role}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('matchModal').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

function closeModal() {
  document.getElementById('matchModal').classList.remove('active');
  document.body.style.overflow = '';
}

// ── Players to Watch ──────────────────────────────────────────────────────────

(function renderPlayers() {
  document.getElementById('playersGrid').innerHTML = playersData.map((p, i) => `
    <div class="player-card reveal" style="animation-delay:${i * 0.07}s">
      <div class="player-card-banner">
        <div class="player-number">${p.number}</div>
      </div>
      <div class="player-avatar-wrap">
        <div class="player-avatar">${p.emoji}</div>
      </div>
      <div class="player-info">
        <div class="player-name">${p.name}</div>
        <div class="player-country">${p.country}</div>
        <div class="player-position">${p.position}</div>
        <div class="player-stats">
          <div class="player-stat-item">
            <div class="player-stat-val">${p.goals}</div>
            <div class="player-stat-lbl">Goals</div>
          </div>
          <div class="player-stat-item">
            <div class="player-stat-val">${p.assists}</div>
            <div class="player-stat-lbl">Assists</div>
          </div>
        </div>
      </div>
    </div>
  `).join('');
  document.querySelectorAll('.player-card').forEach(el => revealObserver.observe(el));
})();

// ── Leaderboard ───────────────────────────────────────────────────────────────

function renderScorers() {
  return `<table class="lb-table">
    <thead><tr>
      <th>#</th><th>Player</th><th>Matches</th><th>Goals</th>
    </tr></thead>
    <tbody>
      ${scorersData.map(p => `
        <tr>
          <td><span class="lb-rank ${p.rank===1?'gold':p.rank===2?'silver':p.rank===3?'bronze':''}">${p.rank}</span></td>
          <td><div class="lb-player-cell">
            <div class="lb-avatar">${p.emoji}</div>
            <div><div class="lb-name">${p.name}</div><div class="lb-country">${p.country}</div></div>
          </div></td>
          <td>${p.matches}</td>
          <td><span class="lb-goals">${p.goals}</span></td>
        </tr>`).join('')}
    </tbody>
  </table>`;
}

function renderAssists() {
  return `<table class="lb-table">
    <thead><tr>
      <th>#</th><th>Player</th><th>Matches</th><th>Assists</th>
    </tr></thead>
    <tbody>
      ${assistsData.map(p => `
        <tr>
          <td><span class="lb-rank ${p.rank===1?'gold':p.rank===2?'silver':p.rank===3?'bronze':''}">${p.rank}</span></td>
          <td><div class="lb-player-cell">
            <div class="lb-avatar">${p.emoji}</div>
            <div><div class="lb-name">${p.name}</div><div class="lb-country">${p.country}</div></div>
          </div></td>
          <td>${p.matches}</td>
          <td><span class="lb-goals">${p.assists}</span></td>
        </tr>`).join('')}
    </tbody>
  </table>`;
}

function renderGroupStandings() {
  const groups = ['A', 'B'];
  return groups.map(g => {
    const rows = groupStandingsData.filter(t => t.group === g);
    return `
      <h3 style="font-family:'Bebas Neue',sans-serif;font-size:22px;color:var(--navy);letter-spacing:2px;margin:28px 0 12px">Group ${g}</h3>
      <table class="lb-table" style="margin-bottom:0">
        <thead><tr>
          <th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GF</th><th>GA</th><th>Pts</th>
        </tr></thead>
        <tbody>
          ${rows.map(t => `
            <tr>
              <td><strong>${t.team}</strong></td>
              <td>${t.p}</td><td>${t.w}</td><td>${t.d}</td><td>${t.l}</td>
              <td>${t.gf}</td><td>${t.ga}</td>
              <td><strong style="color:var(--navy)">${t.pts}</strong></td>
            </tr>`).join('')}
        </tbody>
      </table>`;
  }).join('');
}

function renderLeaderboard(type) {
  const el = document.getElementById('leaderboardContent');
  if (type === 'scorers')  el.innerHTML = renderScorers();
  if (type === 'assists')  el.innerHTML = renderAssists();
  if (type === 'groups')   el.innerHTML = renderGroupStandings();
}

document.querySelectorAll('[data-board]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-board]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderLeaderboard(btn.dataset.board);
  });
});

renderLeaderboard('scorers');

// ── Match Results ─────────────────────────────────────────────────────────────

(function renderResults() {
  document.getElementById('resultsGrid').innerHTML = resultsData.map((r, i) => {
    const scorerLines = r.scorers.map(s =>
      `<strong>${s.team}:</strong> ${s.player} ${s.time}`
    ).join(' &nbsp;|&nbsp; ');
    return `
      <div class="result-card reveal" style="animation-delay:${i * 0.08}s">
        <div class="result-header">
          <span class="result-group">${r.group}</span>
          <span class="result-date">${r.date}</span>
        </div>
        <div class="result-body">
          <div class="result-scoreline">
            <div class="result-team">
              <div class="result-flag">${r.teamA.flag}</div>
              <div class="result-team-name">${r.teamA.name}</div>
            </div>
            <div class="result-score">${r.scoreA} – ${r.scoreB}</div>
            <div class="result-team">
              <div class="result-flag">${r.teamB.flag}</div>
              <div class="result-team-name">${r.teamB.name}</div>
            </div>
          </div>
        </div>
        <div class="result-footer">
          <div class="result-scorers">⚽ ${scorerLines}</div>
        </div>
      </div>`;
  }).join('');
  document.querySelectorAll('.result-card').forEach(el => revealObserver.observe(el));
})();

// ── News Feed ─────────────────────────────────────────────────────────────────

(function renderNews() {
  document.getElementById('newsGrid').innerHTML = newsData.map((n, i) => `
    <div class="news-card${n.featured ? ' featured' : ''} reveal" style="animation-delay:${i * 0.07}s">
      <div class="news-image">
        <span class="news-image-emoji">${n.image}</span>
        <span class="news-category">${n.category}</span>
      </div>
      <div class="news-body">
        <div class="news-meta">
          <span class="news-date">${n.date}</span>
          <span class="news-source">${n.source}</span>
        </div>
        <h3 class="news-title">${n.title}</h3>
        <p class="news-excerpt">${n.excerpt}</p>
        <a href="#" class="news-read-more">Read More</a>
      </div>
    </div>
  `).join('');
  document.querySelectorAll('.news-card').forEach(el => revealObserver.observe(el));
})();

// ══════════════════════════════════════════════════════════════════════════════
// ⚽  FOOTBALL ANIMATION — Click to Kick Interaction
// ══════════════════════════════════════════════════════════════════════════════

(function initFootballAnimation() {
  const football = document.getElementById('footballAnimation');
  if (!football) return;

  let kickCooldown = false;

  football.addEventListener('click', () => {
    if (kickCooldown) return;
    kickCooldown = true;

    // Add kicked class to trigger burst animation on the SVG
    football.classList.add('kicked');

    // Remove after animation completes (450ms) then restore normal spin
    setTimeout(() => {
      football.classList.remove('kicked');
      // Brief cooldown so clicks don't stack
      setTimeout(() => { kickCooldown = false; }, 200);
    }, 450);
  });

  // Optional: pause spin when page is hidden to save resources
  document.addEventListener('visibilitychange', () => {
    const svg = football.querySelector('.football-svg');
    if (!svg) return;
    svg.style.animationPlayState = document.hidden ? 'paused' : 'running';
  });
})();
