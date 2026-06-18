/**
 * FIFA World Cup 2026™ — Application Controller
 * Handles all dynamic UI rendering, live score simulation, and interactions.
 */

import {
  todayMatches,
  tomorrowMatches,
  groupStandings,
  hostCities,
  formatKickOff,
  MATCH_STATUS,
} from './data/matches.js';

import {
  allNews,
  topScorers,
  getNewsByCategory,
  getCategoryBadgeClass,
  getCategoryLabel,
  timeAgo,
} from './data/news.js';

/* ── STATE ─────────────────────────────────────────────────────────── */
const state = {
  activeDay:         'today',
  activeNewsCategory:'all',
  newsPage:          1,
  NEWS_PAGE_SIZE:    6,
  liveMatches:       new Map(), // id → live score data
  countdownInterval: null,
  tickerInterval:    null,
  liveInterval:      null,
};

// Deep-clone matches so we can mutate scores
const liveMatchData = todayMatches.map(m => ({ ...m, score: { ...m.score } }));
liveMatchData.forEach(m => state.liveMatches.set(m.id, m));

/* ── TOURNAMENT START DATE ─────────────────────────────────────────── */
const TOURNAMENT_START = new Date('2026-06-11T14:00:00-05:00'); // Opening match

/* ─────────────────────────────────────────────────────────────────── */
/*  COUNTDOWN                                                          */
/* ─────────────────────────────────────────────────────────────────── */
export function updateCountdown() {
  const now  = Date.now();
  const diff = TOURNAMENT_START.getTime() - now;

  const elDays  = document.getElementById('cdDays');
  const elHours = document.getElementById('cdHours');
  const elMins  = document.getElementById('cdMins');
  const elSecs  = document.getElementById('cdSecs');

  if (!elDays) return;

  if (diff <= 0) {
    elDays.textContent  = '00';
    elHours.textContent = '00';
    elMins.textContent  = '00';
    elSecs.textContent  = '00';
    return;
  }

  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000)  / 60000);
  const secs  = Math.floor((diff % 60000)    / 1000);

  elDays.textContent  = String(days).padStart(2, '0');
  elHours.textContent = String(hours).padStart(2, '0');
  elMins.textContent  = String(mins).padStart(2, '0');
  elSecs.textContent  = String(secs).padStart(2, '0');
}

/* ─────────────────────────────────────────────────────────────────── */
/*  MATCH CARD RENDERING                                               */
/* ─────────────────────────────────────────────────────────────────── */
export function buildMatchStatusBadge(match) {
  if (match.status === MATCH_STATUS.LIVE) {
    return `<span class="match-status status-live" aria-label="Live match, minute ${match.minute}">● ${match.minute}'</span>`;
  }
  if (match.status === MATCH_STATUS.HT) {
    return `<span class="match-status status-live" aria-label="Half time">HT</span>`;
  }
  if (match.status === MATCH_STATUS.FINISHED) {
    return `<span class="match-status status-finished" aria-label="Match finished">FT</span>`;
  }
  return `<span class="match-status status-upcoming" aria-label="Kick off at ${formatKickOff(match.kickOff)}">${formatKickOff(match.kickOff)}</span>`;
}

export function buildMatchCard(match) {
  const isLive     = match.status === MATCH_STATUS.LIVE || match.status === MATCH_STATUS.HT;
  const scoreDisp  = (match.status === MATCH_STATUS.LIVE || match.status === MATCH_STATUS.HT || match.status === MATCH_STATUS.FINISHED)
    ? `${match.score.home} - ${match.score.away}`
    : 'vs';
  const timeClass  = isLive ? 'match-time-display live-min' : 'match-time-display';

  return `
    <article class="match-card ${isLive ? 'is-live' : ''}" data-match-id="${match.id}" aria-label="${match.homeTeam.name} vs ${match.awayTeam.name}">
      <div class="match-card-header">
        <span class="match-meta">${match.group} · ${match.venue}</span>
        ${buildMatchStatusBadge(match)}
      </div>
      <div class="match-teams">
        <div class="match-team home">
          <div class="team-flag" aria-hidden="true">${match.homeTeam.flag}</div>
          <div class="team-name">${match.homeTeam.name}</div>
          <div class="team-abbr">${match.homeTeam.abbr}</div>
        </div>
        <div class="match-score-block">
          <div class="match-score" aria-label="Score: ${scoreDisp}" aria-live="polite">${scoreDisp}</div>
          <div class="${timeClass}" aria-hidden="true">${isLive ? `${match.minute}'` : formatKickOff(match.kickOff)}</div>
        </div>
        <div class="match-team away">
          <div class="team-flag" aria-hidden="true">${match.awayTeam.flag}</div>
          <div class="div-name team-name">${match.awayTeam.name}</div>
          <div class="team-abbr">${match.awayTeam.abbr}</div>
        </div>
      </div>
      <div class="match-venue" aria-label="Venue: ${match.venue}, ${match.city}">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        ${match.city}
      </div>
    </article>`;
}

export function renderMatchCards(day = 'today') {
  const grid = document.getElementById('matchesGrid');
  if (!grid) return;

  const matches = day === 'today' ? liveMatchData : tomorrowMatches;
  grid.innerHTML = matches.map(buildMatchCard).join('');
}

/* ─────────────────────────────────────────────────────────────────── */
/*  FEATURED MATCH                                                     */
/* ─────────────────────────────────────────────────────────────────── */
export function renderFeaturedMatch() {
  const container = document.getElementById('featuredMatchCard');
  if (!container) return;

  const featured = liveMatchData.find(m => m.isFeatured) ?? tomorrowMatches.find(m => m.isFeatured) ?? liveMatchData[2];
  if (!featured) return;

  const scoreDisp = (featured.status === MATCH_STATUS.LIVE || featured.status === MATCH_STATUS.FINISHED)
    ? `${featured.score.home} - ${featured.score.away}`
    : 'vs';

  container.innerHTML = `
    <div class="featured-inner">
      <div class="featured-team">
        <div class="featured-flag" aria-hidden="true">${featured.homeTeam.flag}</div>
        <div class="featured-team-name">${featured.homeTeam.name}</div>
      </div>
      <div class="featured-score-block">
        <div class="featured-score" aria-label="Score ${scoreDisp}" aria-live="polite">${scoreDisp}</div>
        <div class="featured-vs">${featured.group}</div>
        ${buildMatchStatusBadge(featured)}
      </div>
      <div class="featured-team">
        <div class="featured-flag" aria-hidden="true">${featured.awayTeam.flag}</div>
        <div class="featured-team-name">${featured.awayTeam.name}</div>
      </div>
    </div>
    <div class="featured-match-info">
      <div class="featured-info-item">
        <span class="featured-info-label">Venue</span>
        <span class="featured-info-value">${featured.venue}</span>
      </div>
      <div class="featured-info-item">
        <span class="featured-info-label">City</span>
        <span class="featured-info-value">${featured.city}</span>
      </div>
      <div class="featured-info-item">
        <span class="featured-info-label">Kick-off</span>
        <span class="featured-info-value">${formatKickOff(featured.kickOff)}</span>
      </div>
    </div>`;
}

/* ─────────────────────────────────────────────────────────────────── */
/*  TICKER BAR                                                         */
/* ─────────────────────────────────────────────────────────────────── */
export function buildTickerItems(matches) {
  return matches.map(m => {
    const score = (m.status === MATCH_STATUS.LIVE || m.status === MATCH_STATUS.HT || m.status === MATCH_STATUS.FINISHED)
      ? `<span class="ticker-score">${m.score.home}–${m.score.away}</span>`
      : `<span class="ticker-score">${formatKickOff(m.kickOff)}</span>`;
    const time = m.status === MATCH_STATUS.LIVE
      ? `<span class="ticker-time">${m.minute}'</span>`
      : m.status === MATCH_STATUS.HT
        ? `<span class="ticker-time">HT</span>`
        : m.status === MATCH_STATUS.FINISHED
          ? `<span class="ticker-time">FT</span>`
          : '';
    return `<span class="ticker-item">${m.homeTeam.flag} ${m.homeTeam.abbr} ${score} ${m.awayTeam.abbr} ${m.awayTeam.flag} ${time}</span>`;
  }).join('');
}

export function renderTicker() {
  const el = document.getElementById('tickerItems');
  if (!el) return;
  // Duplicate for seamless loop
  const html = buildTickerItems(liveMatchData);
  el.innerHTML = html + html;
}

/* ─────────────────────────────────────────────────────────────────── */
/*  GROUP STANDINGS                                                    */
/* ─────────────────────────────────────────────────────────────────── */
export function buildStandingCard(group) {
  const rows = group.rows.map(r => `
    <div class="standing-row ${r.qualified ? 'qualified' : ''}" role="row">
      <span class="standing-pos" role="cell">${r.pos}</span>
      <span class="standing-team-flag" aria-hidden="true">${r.flag}</span>
      <span class="standing-team-name" role="cell">${r.team}</span>
      <span class="standing-pts" role="cell" aria-label="${r.pts} points">${r.pts}</span>
      <span class="standing-gd" role="cell" aria-label="Goal difference ${r.gd}">${r.gd}</span>
    </div>`).join('');

  return `
    <div class="standing-card" role="table" aria-label="${group.group} standings">
      <div class="standing-group-label">${group.group}</div>
      ${rows}
    </div>`;
}

export function renderStandings() {
  const el = document.getElementById('standingsScroll');
  if (!el) return;
  el.innerHTML = groupStandings.map(buildStandingCard).join('');
}

/* ─────────────────────────────────────────────────────────────────── */
/*  NEWS SECTION                                                       */
/* ─────────────────────────────────────────────────────────────────── */
export function buildNewsHeroCard(article) {
  const badgeClass = getCategoryBadgeClass(article.category);
  const label      = getCategoryLabel(article.category);
  return `
    <div class="news-hero-img-placeholder" aria-hidden="true">${article.icon}</div>
    <div class="news-hero-body">
      <span class="news-category-badge ${badgeClass}">${label}</span>
      <h3 class="news-hero-title">${article.title}</h3>
      <p class="news-hero-excerpt">${article.excerpt}</p>
      <div class="news-meta">
        <div class="news-author-avatar" aria-hidden="true">${article.author.initials}</div>
        <span>${article.author.name}</span>
        <span aria-label="Published ${timeAgo(article.publishedAt)}">${timeAgo(article.publishedAt)}</span>
        <span>${article.readTime}</span>
      </div>
    </div>`;
}

export function buildNewsCard(article) {
  const badgeClass = getCategoryBadgeClass(article.category);
  const label      = getCategoryLabel(article.category);
  return `
    <article class="news-card" data-news-id="${article.id}" aria-label="${article.title}">
      <div class="news-card-img-placeholder" aria-hidden="true">${article.icon}</div>
      <div class="news-card-body">
        <span class="news-category-badge ${badgeClass}">${label}</span>
        <h3 class="news-card-title">${article.title}</h3>
        <div class="news-card-meta">
          <span>${article.author.name}</span>
          <span aria-label="Published ${timeAgo(article.publishedAt)}">${timeAgo(article.publishedAt)}</span>
        </div>
      </div>
    </article>`;
}

export function renderNewsSection(category = 'all', page = 1, pageSize = 6) {
  const heroEl = document.getElementById('newsHeroCard');
  const gridEl = document.getElementById('newsGrid');
  if (!heroEl || !gridEl) return;

  const articles = getNewsByCategory(category);
  const featured = articles.find(a => a.isFeatured) ?? articles[0];
  const rest      = articles.filter(a => a !== featured);
  const paged     = rest.slice(0, page * pageSize);

  if (featured) heroEl.innerHTML = buildNewsHeroCard(featured);
  gridEl.innerHTML = paged.map(buildNewsCard).join('');

  const loadMore = document.getElementById('loadMoreNews');
  if (loadMore) {
    loadMore.style.display = paged.length >= rest.length ? 'none' : 'block';
  }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  TOP SCORERS                                                        */
/* ─────────────────────────────────────────────────────────────────── */
export function buildScorerRow(scorer) {
  return `
    <div class="scorer-row" role="listitem" aria-label="${scorer.name}, ${scorer.goals} goals">
      <div class="scorer-rank rank-${scorer.rank}" aria-hidden="true">${scorer.rank}</div>
      <div class="scorer-info">
        <div class="scorer-name">${scorer.flag} ${scorer.name}</div>
        <div class="scorer-team">${scorer.team}</div>
      </div>
      <div class="scorer-goals-block">
        <div class="scorer-goals-num">${scorer.goals}</div>
        <div class="scorer-goals-label">Goals</div>
      </div>
    </div>`;
}

export function renderTopScorers() {
  const el = document.getElementById('scorersList');
  if (!el) return;
  el.setAttribute('role', 'list');
  el.innerHTML = topScorers.map(buildScorerRow).join('');
}

/* ─────────────────────────────────────────────────────────────────── */
/*  HOST CITIES                                                        */
/* ─────────────────────────────────────────────────────────────────── */
export function buildCityCard(city) {
  return `
    <div class="city-card" role="button" tabindex="0" aria-label="${city.name}, ${city.country}, ${city.matches} matches">
      <div class="city-icon" aria-hidden="true">${city.icon}</div>
      <div class="city-name">${city.name}</div>
      <div class="city-country">${city.country}</div>
      <div class="city-matches">${city.matches} Matches</div>
    </div>`;
}

export function renderHostCities() {
  const el = document.getElementById('citiesScroll');
  if (!el) return;
  el.innerHTML = hostCities.map(buildCityCard).join('');
}

/* ─────────────────────────────────────────────────────────────────── */
/*  LIVE SCORE SIMULATION                                              */
/* ─────────────────────────────────────────────────────────────────── */
export function simulateLiveUpdates() {
  const liveGames = liveMatchData.filter(m => m.status === MATCH_STATUS.LIVE);
  if (!liveGames.length) return;

  liveGames.forEach(match => {
    // Advance minute
    if (match.minute < 90) {
      match.minute += 1;
    } else {
      match.status = MATCH_STATUS.FINISHED;
    }

    // Random goal with low probability
    if (match.status === MATCH_STATUS.LIVE && Math.random() < 0.04) {
      const scoringTeam = Math.random() < 0.6 ? 'home' : 'away';
      match.score[scoringTeam] += 1;
      const scorer  = scoringTeam === 'home' ? match.homeTeam : match.awayTeam;
      showToast(`⚽ GOAL! ${scorer.flag} ${scorer.name}! ${match.score.home}–${match.score.away}`, 'toast-goal');
    }
  });

  // Re-render cards in place (only update live match elements)
  updateLiveMatchCards();
  renderTicker();
}

function updateLiveMatchCards() {
  const grid = document.getElementById('matchesGrid');
  if (!grid || state.activeDay !== 'today') return;

  liveMatchData.forEach(match => {
    const card = grid.querySelector(`[data-match-id="${match.id}"]`);
    if (!card) return;

    const scoreEl  = card.querySelector('.match-score');
    const statusEl = card.querySelector('.match-status');
    const timeEl   = card.querySelector('.match-time-display');
    const isLive   = match.status === MATCH_STATUS.LIVE || match.status === MATCH_STATUS.HT;

    if (scoreEl && (isLive || match.status === MATCH_STATUS.FINISHED)) {
      scoreEl.textContent = `${match.score.home} - ${match.score.away}`;
      scoreEl.setAttribute('aria-label', `Score: ${match.score.home} - ${match.score.away}`);
    }

    if (statusEl) {
      statusEl.outerHTML = buildMatchStatusBadge(match);
    }

    if (timeEl && isLive) {
      timeEl.textContent = `${match.minute}'`;
    }

    card.classList.toggle('is-live', isLive);
  });
}

/* ─────────────────────────────────────────────────────────────────── */
/*  TOAST NOTIFICATIONS                                                */
/* ─────────────────────────────────────────────────────────────────── */
export function showToast(message, type = 'toast-info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.textContent = message;

  container.appendChild(toast);

  const remove = () => {
    toast.classList.add('toast-exit');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  };

  setTimeout(remove, 4500);
}

/* ─────────────────────────────────────────────────────────────────── */
/*  EVENT WIRING                                                       */
/* ─────────────────────────────────────────────────────────────────── */
function wireMatchTabs() {
  const pills = document.querySelectorAll('.tab-pills .pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => { p.classList.remove('active'); p.setAttribute('aria-selected', 'false'); });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');

      const panel = document.getElementById('matches-panel');
      if (panel) panel.setAttribute('aria-labelledby', `tab-${pill.dataset.day}`);

      state.activeDay = pill.dataset.day;
      renderMatchCards(state.activeDay);
    });
  });
}

function wireNewsFilters() {
  const pills = document.querySelectorAll('.news-filter-pills .pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.activeNewsCategory = pill.dataset.category;
      state.newsPage = 1;
      renderNewsSection(state.activeNewsCategory, state.newsPage, state.NEWS_PAGE_SIZE);
    });
  });
}

function wireLoadMore() {
  const btn = document.getElementById('loadMoreNews');
  if (!btn) return;
  btn.addEventListener('click', () => {
    state.newsPage += 1;
    renderNewsSection(state.activeNewsCategory, state.newsPage, state.NEWS_PAGE_SIZE);
  });
}

function wireHeaderNav() {
  const navBtns = document.querySelectorAll('.nav-btn, .bnav-item');
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navBtns.forEach(b => {
        if (b.dataset.tab === btn.dataset.tab) {
          b.classList.add('active');
          b.setAttribute('aria-current', 'page');
        } else {
          b.classList.remove('active');
          b.removeAttribute('aria-current');
        }
      });
    });
  });
}

function wireHeroCta() {
  const btn = document.getElementById('heroCtaBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const section = document.getElementById('matches-panel');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  });
}

function wireKeyboard() {
  // City cards keyboard activation
  document.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('city-card')) {
      e.preventDefault();
      showToast(`🏙️ ${e.target.querySelector('.city-name')?.textContent} selected`, 'toast-info');
    }
  });
}

/* ─────────────────────────────────────────────────────────────────── */
/*  INIT                                                               */
/* ─────────────────────────────────────────────────────────────────── */
export function initApp() {
  // Initial renders
  renderMatchCards('today');
  renderFeaturedMatch();
  renderTicker();
  renderStandings();
  renderNewsSection('all', 1, 6);
  renderTopScorers();
  renderHostCities();

  // Countdown
  updateCountdown();
  state.countdownInterval = setInterval(updateCountdown, 1000);

  // Live score simulation
  state.liveInterval = setInterval(simulateLiveUpdates, 8000);

  // Wire events
  wireMatchTabs();
  wireNewsFilters();
  wireLoadMore();
  wireHeaderNav();
  wireHeroCta();
  wireKeyboard();

  // Welcome toast
  const liveCount = liveMatchData.filter(m => m.status === MATCH_STATUS.LIVE).length;
  if (liveCount > 0) {
    setTimeout(() => showToast(`⚽ ${liveCount} match${liveCount > 1 ? 'es' : ''} LIVE now!`, 'toast-goal'), 600);
  }
}

// Boot when DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
}
