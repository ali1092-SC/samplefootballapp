/**
 * FIFA World Cup 2026™ — App Controller
 * Handles: rendering, live-score simulation, countdown, scroll-reveal,
 *          carousels, tabs, toast notifications, animated counters, and more.
 */

import { todayMatches, tomorrowMatches, recentResults, groupStandings, hostCities, topScorers } from './data/matches.js';
import { newsArticles } from './data/news.js';

/* ═══════════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════════ */
const TOURNAMENT_START = new Date('2026-06-11T16:00:00Z');
const NEWS_PER_PAGE    = 6;
const LIVE_POLL_MS     = 8000;

/* ═══════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════ */
const state = {
  liveMatches:      JSON.parse(JSON.stringify(todayMatches)),
  newsPage:         1,
  newsCategory:     'all',
  standingsPage:    0,
  citiesPage:       0,
  liveInterval:     null,
  countdownInterval: null,
};

/* ═══════════════════════════════════════════════════
   UTILITY HELPERS
═══════════════════════════════════════════════════ */
export function pad(n, len = 2) {
  return String(n).padStart(len, '0');
}

export function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 60000);
  if (diff < 1)  return 'just now';
  if (diff < 60) return `${diff}m ago`;
  const h = Math.floor(diff / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export function getCountdownValues(targetDate) {
  const now   = Date.now();
  const delta = Math.max(0, Math.floor((targetDate - now) / 1000));
  const days  = Math.floor(delta / 86400);
  const hours = Math.floor((delta % 86400) / 3600);
  const mins  = Math.floor((delta % 3600) / 60);
  const secs  = delta % 60;
  return { days, hours, mins, secs, delta };
}

export function animatedCounter(el, target, duration = 1200) {
  if (!el) return;
  const start    = performance.now();
  const startVal = parseInt(el.textContent, 10) || 0;
  const update   = (ts) => {
    const progress = Math.min((ts - start) / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(startVal + (target - startVal) * ease);
    el.classList.add('number-count');
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}

/* ═══════════════════════════════════════════════════
   SCROLL-REVEAL  (IntersectionObserver)
═══════════════════════════════════════════════════ */
export function initScrollReveal() {
  if (typeof IntersectionObserver === 'undefined') {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
      .forEach(el => el.classList.add('visible'));
    return;
  }

  const opts = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };
  const io   = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // animate section-title underline
        const title = entry.target.querySelector?.('.section-title');
        if (title) title.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, opts);

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    .forEach(el => io.observe(el));

  // Also observe goal bars
  const barIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.goal-bar-fill');
        if (fill) {
          const pct = fill.dataset.pct || '0';
          setTimeout(() => { fill.style.width = pct + '%'; }, 150);
        }
        barIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.scorer-row').forEach(el => barIO.observe(el));
}

/* ═══════════════════════════════════════════════════
   HEADER — scroll & mobile nav
═══════════════════════════════════════════════════ */
export function initHeader() {
  const header    = document.getElementById('site-header');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const scrollTop = document.getElementById('scroll-top');

  if (!header) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        header.classList.toggle('scrolled', y > 60);
        if (scrollTop) scrollTop.classList.toggle('visible', y > 400);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  if (scrollTop) {
    scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Highlight active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');
  const sectionIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(s => sectionIO.observe(s));
}

export function closeMobileNav() {
  const mobileNav = document.getElementById('mobile-nav');
  const hamburger = document.getElementById('hamburger');
  if (mobileNav) mobileNav.classList.remove('open');
  if (hamburger) { hamburger.classList.remove('open'); hamburger.setAttribute('aria-expanded', 'false'); }
  document.body.style.overflow = '';
}
// Expose for inline onclick
window.closeMobileNav = closeMobileNav;

/* ═══════════════════════════════════════════════════
   HERO PARTICLES
═══════════════════════════════════════════════════ */
export function initParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;

  const colors = ['#F0A500','#C8102E','#ffffff','#FFD060'];
  const count  = 22;

  for (let i = 0; i < count; i++) {
    const p   = document.createElement('div');
    p.className = 'particle';
    const size = 3 + Math.random() * 7;
    const left = Math.random() * 100;
    const top  = 20 + Math.random() * 70;
    const dur  = 4 + Math.random() * 6;
    const del  = Math.random() * 8;
    const col  = colors[Math.floor(Math.random() * colors.length)];

    p.style.cssText = [
      `width:${size}px`, `height:${size}px`,
      `left:${left}%`,   `top:${top}%`,
      `background:${col}`,
      `animation-duration:${dur}s`,
      `animation-delay:${del}s`,
      `animation-iteration-count:infinite`,
    ].join(';');

    container.appendChild(p);
  }
}

/* ═══════════════════════════════════════════════════
   COUNTDOWN TIMER
═══════════════════════════════════════════════════ */
export function initCountdown(target = TOURNAMENT_START) {
  const els = {
    days:  document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    mins:  document.getElementById('cd-mins'),
    secs:  document.getElementById('cd-secs'),
  };
  const prevValues = { days: -1, hours: -1, mins: -1, secs: -1 };

  function update() {
    const { days, hours, mins, secs } = getCountdownValues(target);
    const map = { days, hours, mins, secs };
    Object.entries(map).forEach(([k, v]) => {
      const el = els[k];
      if (!el) return;
      const span = el.querySelector('span');
      if (!span) return;
      const newVal = pad(v, k === 'days' ? 3 : 2);
      if (prevValues[k] !== v) {
        el.classList.remove('flipping');
        void el.offsetWidth; // reflow
        el.classList.add('flipping');
        span.textContent = newVal;
        prevValues[k] = v;
      }
    });
  }

  update();
  state.countdownInterval = setInterval(update, 1000);
}

/* ═══════════════════════════════════════════════════
   LIVE SCORE TICKER
═══════════════════════════════════════════════════ */
export function buildTickerItem(match) {
  const item = document.createElement('div');
  item.className = 'ticker-item';
  item.setAttribute('role', 'listitem');
  item.dataset.matchId = match.id;

  const statusClass = match.status === 'LIVE' ? 'live' : match.status === 'FT' ? 'ft' : 'soon';
  const statusLabel = match.status === 'LIVE' ? 'Live' : match.status === 'FT' ? 'FT' : match.time;
  const scoreStr    = match.status === 'UPCOMING'
    ? `${match.time}`
    : `${match.homeScore} - ${match.awayScore}`;

  item.innerHTML = `
    <span class="teams">${match.homeFlag} ${match.homeTeam} <span class="score" id="ticker-score-${match.id}">${scoreStr}</span> ${match.awayTeam} ${match.awayFlag}</span>
    ${match.status === 'LIVE' ? `<span class="minute">${match.minute}'</span>` : ''}
    <span class="status-badge ${statusClass}">${statusLabel}</span>
  `;
  return item;
}

export function renderTicker(matches) {
  const track = document.getElementById('ticker-track');
  if (!track) return;
  track.innerHTML = '';

  // Double the items for seamless infinite scroll
  const allMatches = [...matches, ...matches];
  allMatches.forEach(m => track.appendChild(buildTickerItem(m)));
}

export function updateTickerScore(matchId, homeScore, awayScore) {
  const scoreEls = document.querySelectorAll(`#ticker-score-${matchId}`);
  scoreEls.forEach(el => {
    el.textContent = `${homeScore} - ${awayScore}`;
    el.classList.remove('updated');
    void el.offsetWidth;
    el.classList.add('updated');
    setTimeout(() => el.classList.remove('updated'), 800);
  });
}

/* ═══════════════════════════════════════════════════
   MATCH CARDS
═══════════════════════════════════════════════════ */
export function buildMatchCard(match) {
  const card = document.createElement('article');
  card.className = `match-card reveal${match.status === 'LIVE' ? ' live-card' : ''}`;
  card.setAttribute('role', 'listitem');
  card.dataset.matchId = match.id;
  card.tabIndex = 0;
  card.setAttribute('aria-label', `${match.homeTeam} vs ${match.awayTeam}`);

  const statusClass = match.status === 'LIVE' ? 'live' : match.status === 'FT' ? 'ft' : 'upcoming';
  const statusLabel = match.status === 'LIVE'
    ? `🔴 ${match.minute}'`
    : match.status === 'FT' ? 'Full Time' : match.time;

  const scoreOrVs = match.status === 'UPCOMING'
    ? `<span class="vs-label">VS</span>`
    : `<div class="score-display" id="score-${match.id}">${match.homeScore} - ${match.awayScore}</div>
       ${match.status === 'LIVE' ? `<div class="match-minute">${match.minute}'</div>` : ''}`;

  card.innerHTML = `
    <div class="match-card-header">
      <span class="match-group-label">${match.group || match.round || 'Group Stage'}</span>
      <span class="match-status ${statusClass}">${statusLabel}</span>
    </div>
    <div class="match-card-body">
      <div class="match-teams">
        <div class="team-block">
          <div class="team-flag" aria-hidden="true">${match.homeFlag}</div>
          <div class="team-name">${match.homeTeam}</div>
        </div>
        <div class="score-block">${scoreOrVs}</div>
        <div class="team-block">
          <div class="team-flag" aria-hidden="true">${match.awayFlag}</div>
          <div class="team-name">${match.awayTeam}</div>
        </div>
      </div>
    </div>
    <div class="match-card-footer">
      <span class="match-venue">📍 ${match.venue}</span>
      <span class="match-time">${match.date}</span>
    </div>
  `;

  card.addEventListener('click', () => {
    showToast(
      `${match.homeTeam} vs ${match.awayTeam}`,
      match.status === 'UPCOMING'
        ? `Kick-off at ${match.time} — ${match.venue}`
        : `Score: ${match.homeScore} - ${match.awayScore}`,
      match.status === 'LIVE' ? '🔴' : '⚽',
      match.status === 'LIVE' ? 'toast-goal' : 'toast-info'
    );
  });

  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') card.click();
  });

  return card;
}

export function renderMatchGrid(containerId, matches) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  if (!matches || matches.length === 0) {
    container.innerHTML = `<p style="color:var(--gray-400);padding:24px 0;">No matches available.</p>`;
    return;
  }

  matches.forEach((m, i) => {
    const card = buildMatchCard(m);
    card.style.transitionDelay = `${i * 0.07}s`;
    container.appendChild(card);
  });

  // Re-observe newly added reveal elements
  setTimeout(initScrollReveal, 50);
}

export function updateMatchCard(matchId, homeScore, awayScore, minute) {
  const scoreEl = document.getElementById(`score-${matchId}`);
  if (scoreEl) {
    const prev = scoreEl.textContent;
    const next = `${homeScore} - ${awayScore}`;
    if (prev !== next) {
      scoreEl.textContent = next;
      scoreEl.classList.remove('updated');
      void scoreEl.offsetWidth;
      scoreEl.classList.add('updated');
      const card = scoreEl.closest('.match-card');
      if (card) {
        card.classList.remove('score-updated');
        void card.offsetWidth;
        card.classList.add('score-updated');
      }
    }
  }
  const minEl = document.querySelector(`[data-match-id="${matchId}"] .match-minute`);
  if (minEl && minute !== undefined) minEl.textContent = `${minute}'`;
}

/* ═══════════════════════════════════════════════════
   MATCH TABS
═══════════════════════════════════════════════════ */
export function initMatchTabs() {
  const tabs   = document.querySelectorAll('[role="tab"]');
  const panels = document.querySelectorAll('[role="tabpanel"]');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const panelId = tab.getAttribute('aria-controls');
      const panel   = document.getElementById(panelId);
      if (panel) {
        panel.classList.add('active');
        // trigger scroll reveal on newly visible cards
        setTimeout(initScrollReveal, 80);
      }
    });

    // Keyboard navigation
    tab.addEventListener('keydown', (e) => {
      const idx = [...tabs].indexOf(tab);
      if (e.key === 'ArrowRight') { tabs[(idx + 1) % tabs.length].focus(); tabs[(idx + 1) % tabs.length].click(); }
      if (e.key === 'ArrowLeft')  { tabs[(idx - 1 + tabs.length) % tabs.length].focus(); tabs[(idx - 1 + tabs.length) % tabs.length].click(); }
    });
  });
}

/* ═══════════════════════════════════════════════════
   LIVE SCORE SIMULATION
═══════════════════════════════════════════════════ */
export function simulateLiveScores() {
  const liveMatches = state.liveMatches.filter(m => m.status === 'LIVE');
  if (liveMatches.length === 0) return;

  liveMatches.forEach(match => {
    // Advance minute
    match.minute = Math.min(90, (match.minute || 45) + Math.floor(Math.random() * 3) + 1);

    // ~20% chance of a goal per poll
    if (Math.random() < 0.2) {
      const isHome = Math.random() > 0.5;
      if (isHome) match.homeScore++;
      else        match.awayScore++;

      const scorer = isHome ? match.homeTeam : match.awayTeam;
      showToast(
        `⚽ GOAL! ${scorer}`,
        `${match.homeTeam} ${match.homeScore} - ${match.awayScore} ${match.awayTeam} (${match.minute}')`,
        '⚽',
        'toast-goal'
      );
    }

    updateMatchCard(match.id, match.homeScore, match.awayScore, match.minute);
    updateTickerScore(match.id, match.homeScore, match.awayScore);
  });
}

export function startLivePolling() {
  if (state.liveInterval) clearInterval(state.liveInterval);
  state.liveInterval = setInterval(simulateLiveScores, LIVE_POLL_MS);
}

export function stopLivePolling() {
  if (state.liveInterval) clearInterval(state.liveInterval);
  state.liveInterval = null;
}

/* ═══════════════════════════════════════════════════
   GROUP STANDINGS
═══════════════════════════════════════════════════ */
export function buildGroupCard(group) {
  const card = document.createElement('div');
  card.className = 'group-card reveal-scale';
  card.setAttribute('role', 'listitem');
  card.setAttribute('aria-label', `Group ${group.name} standings`);

  const rows = group.teams.map((t, i) => `
    <tr class="${i < 2 ? 'qualified' : ''}" role="row">
      <td class="team-cell">
        <span class="pos-num">${i + 1}</span>
        <span>${t.flag}</span>
        <span>${t.name}</span>
      </td>
      <td>${t.played}</td>
      <td>${t.won}</td>
      <td>${t.drawn}</td>
      <td>${t.lost}</td>
      <td>${t.gd > 0 ? '+' : ''}${t.gd}</td>
      <td class="pts-cell">${t.pts}</td>
    </tr>
  `).join('');

  card.innerHTML = `
    <div class="group-card-header">
      <span class="group-label">Group ${group.name}</span>
      <span class="group-teams-count">${group.teams.length} Teams</span>
    </div>
    <table class="standings-table" aria-label="Group ${group.name} standings">
      <thead>
        <tr>
          <th scope="col">Team</th>
          <th scope="col" title="Played">P</th>
          <th scope="col" title="Won">W</th>
          <th scope="col" title="Drawn">D</th>
          <th scope="col" title="Lost">L</th>
          <th scope="col" title="Goal Difference">GD</th>
          <th scope="col" title="Points">Pts</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
  return card;
}

export function renderStandings() {
  const track = document.getElementById('standings-track');
  if (!track) return;
  track.innerHTML = '';
  groupStandings.forEach((g, i) => {
    const card = buildGroupCard(g);
    card.style.transitionDelay = `${i * 0.08}s`;
    track.appendChild(card);
  });
  initCarousel('standings', groupStandings.length, 3);
  setTimeout(initScrollReveal, 80);
}

/* ═══════════════════════════════════════════════════
   GENERIC CAROUSEL
═══════════════════════════════════════════════════ */
export function initCarousel(name, totalItems, visibleCount) {
  const track   = document.getElementById(`${name}-track`);
  const prevBtn = document.getElementById(`${name}-prev`);
  const nextBtn = document.getElementById(`${name}-next`);
  const dotsEl  = document.getElementById(`${name}-dots`);
  if (!track) return;

  const pageCount   = Math.ceil(totalItems / visibleCount);
  let   currentPage = 0;

  // Build dots
  if (dotsEl) {
    dotsEl.innerHTML = '';
    for (let i = 0; i < pageCount; i++) {
      const dot = document.createElement('button');
      dot.className  = `carousel-dot${i === 0 ? ' active' : ''}`;
      dot.type       = 'button';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Page ${i + 1}`);
      dot.setAttribute('aria-selected', String(i === 0));
      dot.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(dot);
    }
  }

  function goTo(page) {
    currentPage = Math.max(0, Math.min(page, pageCount - 1));
    const cardWidth = track.firstElementChild?.offsetWidth || 300;
    const gap       = 20;
    track.style.transform = `translateX(-${currentPage * visibleCount * (cardWidth + gap)}px)`;

    if (prevBtn) prevBtn.disabled = currentPage === 0;
    if (nextBtn) nextBtn.disabled = currentPage >= pageCount - 1;

    if (dotsEl) {
      [...dotsEl.children].forEach((d, i) => {
        d.classList.toggle('active', i === currentPage);
        d.setAttribute('aria-selected', String(i === currentPage));
      });
    }
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(currentPage - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(currentPage + 1));

  // Touch/swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(currentPage + (diff > 0 ? 1 : -1));
  });

  goTo(0);
}

/* ═══════════════════════════════════════════════════
   HOST CITIES
═══════════════════════════════════════════════════ */
export function buildCityCard(city) {
  const card = document.createElement('div');
  card.className = 'city-card reveal-scale';
  card.setAttribute('role', 'listitem');
  card.setAttribute('aria-label', `${city.name}, ${city.country}`);
  card.tabIndex = 0;

  card.innerHTML = `
    <div class="city-bg">
      <div class="city-bg-emoji" aria-hidden="true">${city.emoji || '🏟️'}</div>
    </div>
    <div class="city-overlay"></div>
    <div class="city-content">
      <div class="city-country-flag" aria-hidden="true">${city.countryFlag}</div>
      <div class="city-name">${city.name}</div>
      <div class="city-country">${city.country}</div>
      <div class="city-stadium">🏟️ ${city.stadium}</div>
    </div>
    <div class="city-matches-count">${city.matches} Matches</div>
  `;

  card.addEventListener('click', () => {
    showToast(city.name, `${city.stadium} — ${city.matches} matches`, city.countryFlag, 'toast-info');
  });
  card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') card.click(); });

  return card;
}

export function renderCities() {
  const track = document.getElementById('cities-track');
  if (!track) return;
  track.innerHTML = '';
  hostCities.forEach((c, i) => {
    const card = buildCityCard(c);
    card.style.transitionDelay = `${i * 0.06}s`;
    track.appendChild(card);
  });
  initCarousel('cities', hostCities.length, 4);
  setTimeout(initScrollReveal, 80);
}

/* ═══════════════════════════════════════════════════
   TOP SCORERS
═══════════════════════════════════════════════════ */
export function buildScorerRow(scorer, index) {
  const row = document.createElement('div');
  row.className = 'scorer-row reveal';
  row.setAttribute('role', 'listitem');
  row.tabIndex = 0;
  row.setAttribute('aria-label', `${scorer.name}, ${scorer.goals} goals`);

  const maxGoals = topScorers[0]?.goals || 1;
  const pct      = Math.round((scorer.goals / maxGoals) * 100);

  row.innerHTML = `
    <div class="rank-badge" aria-hidden="true">${index + 1}</div>
    <div class="scorer-info">
      <div class="scorer-name">${scorer.flag} ${scorer.name}</div>
      <div class="scorer-detail">
        <span>${scorer.team}</span>
        <span>·</span>
        <span>${scorer.assists} assists</span>
      </div>
    </div>
    <div class="goal-bar-wrap">
      <div class="goal-count">${scorer.goals} goals</div>
      <div class="goal-bar" role="progressbar" aria-valuenow="${scorer.goals}" aria-valuemax="${maxGoals}" aria-label="${scorer.goals} goals">
        <div class="goal-bar-fill" data-pct="${pct}"></div>
      </div>
    </div>
    <div class="goals-num" aria-hidden="true">${scorer.goals}</div>
  `;

  row.addEventListener('click', () => {
    showToast(scorer.name, `${scorer.goals} goals · ${scorer.assists} assists — ${scorer.team}`, scorer.flag, 'toast-info');
  });
  row.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') row.click(); });

  return row;
}

export function renderScorers() {
  const list = document.getElementById('scorers-list');
  if (!list) return;
  list.innerHTML = '';
  topScorers.forEach((s, i) => {
    const row = buildScorerRow(s, i);
    row.style.transitionDelay = `${i * 0.07}s`;
    list.appendChild(row);
  });
  setTimeout(initScrollReveal, 80);
}

/* ═══════════════════════════════════════════════════
   NEWS FEED
═══════════════════════════════════════════════════ */
export function getCategories() {
  const cats = ['all', ...new Set(newsArticles.map(a => a.category.toLowerCase()))];
  return cats;
}

export function filterNews(category, page = 1) {
  const filtered = category === 'all'
    ? newsArticles
    : newsArticles.filter(a => a.category.toLowerCase() === category);
  const total = filtered.length;
  const pages = Math.ceil(total / NEWS_PER_PAGE);
  const items = filtered.slice((page - 1) * NEWS_PER_PAGE, page * NEWS_PER_PAGE);
  return { items, total, pages };
}

export function buildNewsHeroCard(article) {
  const a = document.createElement('a');
  a.className = 'news-hero-card reveal';
  a.href      = article.url || '#';
  a.setAttribute('aria-label', article.title);

  a.innerHTML = `
    <div class="card-image-wrap">
      <div class="card-image-placeholder" aria-hidden="true">${article.emoji || '📰'}</div>
    </div>
    <div class="card-overlay"></div>
    <div class="card-content">
      <span class="article-category">${article.category}</span>
      <h3 class="article-title">${article.title}</h3>
      <div class="article-meta">
        <span>${article.author}</span>
        <span class="dot-sep">·</span>
        <span>${timeAgo(article.publishedAt)}</span>
        <span class="dot-sep">·</span>
        <span>${article.readTime} min read</span>
      </div>
      <div class="article-read-more">Read Story</div>
    </div>
  `;
  return a;
}

export function buildNewsCard(article) {
  const a = document.createElement('a');
  a.className = 'news-card reveal';
  a.href      = article.url || '#';
  a.setAttribute('aria-label', article.title);

  a.innerHTML = `
    <div class="card-thumb">
      <div class="thumb-emoji" aria-hidden="true">${article.emoji || '📰'}</div>
    </div>
    <div class="card-body">
      <span class="article-category">${article.category}</span>
      <h3 class="article-title">${article.title}</h3>
      <p class="article-excerpt">${article.excerpt}</p>
      <div class="article-meta">
        <span>${article.author}</span>
        <span class="dot-sep">·</span>
        <span>${timeAgo(article.publishedAt)}</span>
      </div>
    </div>
  `;
  return a;
}

export function renderNewsFilters() {
  const container = document.getElementById('news-filters');
  if (!container) return;
  container.innerHTML = '';

  getCategories().forEach(cat => {
    const btn = document.createElement('button');
    btn.type      = 'button';
    btn.className = `filter-btn${cat === state.newsCategory ? ' active' : ''}`;
    btn.textContent = cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1);
    btn.setAttribute('aria-pressed', String(cat === state.newsCategory));
    btn.addEventListener('click', () => {
      state.newsCategory = cat;
      state.newsPage     = 1;
      renderNews();
      renderNewsFilters();
    });
    container.appendChild(btn);
  });
}

export function renderNewsPagination(pages) {
  const container = document.getElementById('news-pagination');
  if (!container) return;
  container.innerHTML = '';
  if (pages <= 1) return;

  const prev = document.createElement('button');
  prev.type      = 'button';
  prev.className = 'page-btn prev';
  prev.textContent = '← Prev';
  prev.disabled  = state.newsPage === 1;
  prev.addEventListener('click', () => { state.newsPage--; renderNews(); });
  container.appendChild(prev);

  for (let i = 1; i <= pages; i++) {
    const btn = document.createElement('button');
    btn.type      = 'button';
    btn.className = `page-btn${i === state.newsPage ? ' active' : ''}`;
    btn.textContent = String(i);
    btn.setAttribute('aria-label', `Page ${i}`);
    btn.setAttribute('aria-current', String(i === state.newsPage));
    btn.addEventListener('click', () => { state.newsPage = i; renderNews(); });
    container.appendChild(btn);
  }

  const next = document.createElement('button');
  next.type      = 'button';
  next.className = 'page-btn next';
  next.textContent = 'Next →';
  next.disabled  = state.newsPage === pages;
  next.addEventListener('click', () => { state.newsPage++; renderNews(); });
  container.appendChild(next);
}

export function renderNews() {
  const layout = document.getElementById('news-layout');
  if (!layout) return;
  layout.innerHTML = '';

  const { items, pages } = filterNews(state.newsCategory, state.newsPage);
  if (items.length === 0) {
    layout.innerHTML = `<p style="color:var(--gray-400);padding:24px 0;">No articles found.</p>`;
    renderNewsPagination(0);
    return;
  }

  // First item = hero card
  const heroWrap = document.createElement('div');
  heroWrap.className = 'news-hero-col';
  heroWrap.appendChild(buildNewsHeroCard(items[0]));
  layout.appendChild(heroWrap);

  // Remaining = regular cards
  items.slice(1).forEach((article, i) => {
    const card = buildNewsCard(article);
    card.style.transitionDelay = `${i * 0.07}s`;
    layout.appendChild(card);
  });

  renderNewsPagination(pages);
  setTimeout(initScrollReveal, 80);
}

/* ═══════════════════════════════════════════════════
   TOAST NOTIFICATIONS
═══════════════════════════════════════════════════ */
export function showToast(title, message, icon = 'ℹ️', type = 'toast-info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');

  toast.innerHTML = `
    <div class="toast-icon" aria-hidden="true">${icon}</div>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${message}</div>
    </div>
    <button class="toast-close" aria-label="Dismiss notification" type="button">✕</button>
  `;

  const closeBtn = toast.querySelector('.toast-close');
  const dismiss  = () => {
    toast.classList.add('removing');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  };
  closeBtn.addEventListener('click', dismiss);

  container.appendChild(toast);
  setTimeout(dismiss, 5000);
  return toast;
}
// Expose globally for inline event handlers
window.showToast = showToast;

/* ═══════════════════════════════════════════════════
   ANIMATED SECTION TITLE UNDERLINES
═══════════════════════════════════════════════════ */
function initSectionTitles() {
  const titles = document.querySelectorAll('.section-title');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.4 });
  titles.forEach(t => io.observe(t));
}

/* ═══════════════════════════════════════════════════
   STAGGER MATCH CARDS ENTRANCE
═══════════════════════════════════════════════════ */
function addStaggerClasses(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  [...container.children].forEach((child, i) => {
    child.classList.add(`stagger-${Math.min(i + 1, 6)}`);
  });
}

/* ═══════════════════════════════════════════════════
   MAIN INIT
═══════════════════════════════════════════════════ */
export function init() {
  // Header & nav
  initHeader();

  // Hero particles
  initParticles();

  // Countdown
  initCountdown(TOURNAMENT_START);

  // Ticker
  const allTickerMatches = [
    ...todayMatches.filter(m => m.status === 'LIVE' || m.status === 'FT'),
    ...todayMatches.filter(m => m.status === 'UPCOMING'),
    ...tomorrowMatches,
  ];
  renderTicker(allTickerMatches.length > 0 ? allTickerMatches : todayMatches);

  // Match grids
  renderMatchGrid('today-matches',    todayMatches);
  renderMatchGrid('tomorrow-matches', tomorrowMatches);
  renderMatchGrid('results-matches',  recentResults);
  initMatchTabs();
  addStaggerClasses('today-matches');
  addStaggerClasses('tomorrow-matches');
  addStaggerClasses('results-matches');

  // Standings
  renderStandings();

  // News
  renderNewsFilters();
  renderNews();

  // Scorers
  renderScorers();

  // Cities
  renderCities();

  // Scroll reveal (initial pass)
  initScrollReveal();
  initSectionTitles();

  // Live polling
  startLivePolling();

  // Welcome toast
  setTimeout(() => {
    showToast('Welcome!', 'FIFA World Cup 2026™ live updates are active.', '🏆', 'toast-info');
  }, 1200);
}

// Boot on DOM ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}
