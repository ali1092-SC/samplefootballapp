/* ──────────────────────────────────────────────────────────────────
   FIFA World Cup 2026™ — app.js
   Complete interactive SPA with:
   - Countdown timer with flip-digit animation
   - Hero floating particles
   - Cursor-reactive 3D tilt on match cards
   - IntersectionObserver scroll-reveal
   - Typewriter headings
   - AnimateCountUp + SVG ring progress for stats
   - Confetti burst on final match cards
   - Carousel with swipe support
   - Standings tabs
   - News grid
   - Toast notifications
   - Scroll-shrink header
   ────────────────────────────────────────────────────────────────── */

import { matches }  from './data/matches.js';
import { newsItems } from './data/news.js';

/* ─── UTILITIES ──────────────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function lerp(a, b, t) { return a + (b - a) * t; }

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

function randBetween(a, b) { return a + Math.random() * (b - a); }

/* ─── SCROLL-SHRINK HEADER ───────────────────────────────────────── */
function initHeader() {
  const header = $('#siteHeader');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('shrunk', window.scrollY > 60);
  }, { passive: true });
}

/* ─── HERO PARTICLES ─────────────────────────────────────────────── */
function initHeroParticles() {
  const container = $('#heroParticles');
  if (!container) return;
  const colours = ['#f7c948', '#00e5ff', '#1a73e8', '#ff8a65', '#81c784', '#ce93d8'];
  const TOTAL = 40;

  for (let i = 0; i < TOTAL; i++) {
    const p = document.createElement('div');
    p.className = 'hero-particle';
    const size = randBetween(3, 10);
    const col  = colours[Math.floor(Math.random() * colours.length)];
    p.style.cssText = `
      left: ${randBetween(0, 100)}%;
      top:  ${randBetween(10, 90)}%;
      width: ${size}px;
      height: ${size}px;
      background: ${col};
      opacity: ${randBetween(0.3, 0.85)};
      --dur:   ${randBetween(4, 10)}s;
      --delay: ${randBetween(0, 8)}s;
    `;
    container.appendChild(p);
  }
}

/* ─── COUNTDOWN ──────────────────────────────────────────────────── */
function initCountdown() {
  const TARGET_DATE = new Date('2026-06-11T18:00:00-05:00'); // Opening kick-off

  const els = {
    days:  $('#cdDaysVal'),
    hours: $('#cdHoursVal'),
    mins:  $('#cdMinsVal'),
    secs:  $('#cdSecsVal'),
  };

  if (!els.days) return;

  const prev = { days: null, hours: null, mins: null, secs: null };

  function pad(n, digits = 2) { return String(n).padStart(digits, '0'); }

  function tick() {
    const now  = Date.now();
    const diff = Math.max(0, TARGET_DATE - now);

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    const vals = {
      days:  pad(d, 3),
      hours: pad(h),
      mins:  pad(m),
      secs:  pad(s),
    };

    Object.entries(vals).forEach(([k, v]) => {
      if (v !== prev[k]) {
        const el = els[k];
        el.textContent = v;
        el.classList.remove('flip');
        void el.offsetWidth; // reflow
        el.classList.add('flip');
        prev[k] = v;
      }
    });
  }

  tick();
  setInterval(tick, 1000);
}

/* ─── INTERSECTION OBSERVER ──────────────────────────────────────── */
let scrollObserver;

function initScrollReveal() {
  const items = $$('.section-reveal');
  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(el => scrollObserver.observe(el));
}

/* ─── TYPEWRITER HEADINGS ────────────────────────────────────────── */
function initTypewriter() {
  const targets = $$('.typewriter-target');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const text = el.textContent;
      el.textContent = '';
      el.classList.add('typewriter-active');
      // reveal char-by-char using CSS width animation driven by char count step
      // We use a simple setTimeout character approach for reliability
      let i = 0;
      el.textContent = '';
      function addChar() {
        if (i < text.length) {
          el.textContent += text[i];
          i++;
          setTimeout(addChar, 38);
        } else {
          el.classList.add('done');
          // Remove border after cursor blink ends
          setTimeout(() => {
            el.style.borderRight = 'none';
            el.classList.remove('typewriter-active', 'done');
          }, 3200);
        }
      }
      addChar();

      // Also trigger h2 underline
      const h2 = el.closest('h2');
      if (h2) h2.classList.add('revealed');

      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  targets.forEach(el => observer.observe(el));
}

/* ─── ANIMATE COUNT-UP ───────────────────────────────────────────── */
function animateCountUp(el, target, duration = 1600, suffix = '') {
  const start  = performance.now();
  const from   = 0;

  function step(now) {
    const elapsed = now - start;
    const progress = clamp(elapsed / duration, 0, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(from + (target - from) * eased);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.classList.add('bounced');
  }
  requestAnimationFrame(step);
}

/* ─── STATS RINGS ────────────────────────────────────────────────── */
function initStats() {
  const cards = $$('.stat-card');
  const CIRCUMFERENCE = 2 * Math.PI * 50; // r=50 → ~314

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const card      = entry.target;
      const ringFill  = $('.ring-fill', card);
      const countEl   = $('.stat-count', card);
      const target    = parseInt(countEl.dataset.target, 10);
      const suffix    = countEl.dataset.suffix || '';
      const percent   = parseFloat(ringFill.dataset.percent || '100') / 100;
      const offset    = CIRCUMFERENCE * (1 - percent);

      // Animate ring
      ringFill.style.strokeDashoffset = offset;

      // Animate count
      animateCountUp(countEl, target, 1800, suffix);

      statsObserver.unobserve(card);
    });
  }, { threshold: 0.3 });

  cards.forEach(c => statsObserver.observe(c));
}

/* ─── CONFETTI ───────────────────────────────────────────────────── */
const CONFETTI_COLOURS = [
  '#f7c948', '#ff6b6b', '#4ecdc4', '#45b7d1',
  '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff',
];

function burstConfetti(originEl) {
  const container = $('#confettiContainer');
  if (!container) return;

  const rect  = originEl.getBoundingClientRect();
  const originX = rect.left + rect.width  / 2;
  const originY = rect.top  + rect.height / 2;
  const pieces = [];

  for (let i = 0; i < 60; i++) {
    const span = document.createElement('span');
    span.className = 'confetti-piece';
    span.style.cssText = `
      left: ${originX + randBetween(-80, 80)}px;
      background: ${CONFETTI_COLOURS[Math.floor(Math.random() * CONFETTI_COLOURS.length)]};
      width: ${randBetween(7, 14)}px;
      height: ${randBetween(10, 18)}px;
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      --fall-dur: ${randBetween(1.8, 3.2)}s;
      --fall-delay: ${randBetween(0, 0.6)}s;
      --sway-dur: ${randBetween(0.8, 1.6)}s;
    `;
    container.appendChild(span);
    pieces.push(span);
  }

  // Clean up
  setTimeout(() => {
    pieces.forEach(p => p.remove());
  }, 3800);
}

/* ─── 3D TILT ON MATCH CARDS ─────────────────────────────────────── */
function applyCardTilt(card) {
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  let rafId;

  function animate() {
    currentX = lerp(currentX, targetX, 0.12);
    currentY = lerp(currentY, targetY, 0.12);
    card.style.transform = `perspective(800px) rotateX(${currentX}deg) rotateY(${currentY}deg)`;
    if (Math.abs(currentX - targetX) > 0.01 || Math.abs(currentY - targetY) > 0.01) {
      rafId = requestAnimationFrame(animate);
    } else {
      card.style.transform = `perspective(800px) rotateX(${targetX}deg) rotateY(${targetY}deg)`;
    }
  }

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = e.clientX - cx;
    const dy   = e.clientY - cy;
    targetX = clamp((-dy / (rect.height / 2)) * 10, -10, 10);
    targetY = clamp(( dx / (rect.width  / 2)) * 10, -10, 10);
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(animate);
  });

  card.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(animate);
    card.style.boxShadow = '';
  });

  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = '0 20px 60px rgba(0,229,255,0.2), 0 8px 32px rgba(0,0,0,0.5)';
  });
}

/* ─── GOAL BAR ANIMATION ─────────────────────────────────────────── */
function initGoalBars(card) {
  const bars = $$('.goal-bar-fill', card);
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const bar = entry.target;
      const pct = bar.dataset.pct || '50';
      requestAnimationFrame(() => { bar.style.width = pct + '%'; });
      barObserver.unobserve(bar);
    });
  }, { threshold: 0.5 });
  bars.forEach(b => barObserver.observe(b));
}

/* ─── TOAST ──────────────────────────────────────────────────────── */
function showToast(icon, title, msg, duration = 4000) {
  const container = $('#toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${msg}</div>
    </div>
  `;
  container.appendChild(toast);

  const dismiss = () => {
    toast.classList.add('dismiss');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  };

  const timer = setTimeout(dismiss, duration);
  toast.addEventListener('click', () => { clearTimeout(timer); dismiss(); });
}

/* ─── MATCH CARDS ────────────────────────────────────────────────── */
function buildMatchCard(match) {
  const isLive   = match.status === 'live';
  const isFinal  = match.status === 'final';
  const hasScore = isLive || isFinal;

  const homePct = hasScore ? clamp(Math.round((match.homeScore / Math.max(match.homeScore + match.awayScore, 1)) * 100), 10, 90) : 50;
  const awayPct = 100 - homePct;

  const card = document.createElement('div');
  card.className = 'match-card section-reveal' + (isLive ? ' live' : '');
  card.dataset.matchId = match.id;
  card.dataset.status  = match.status;

  card.innerHTML = `
    ${isLive ? `
      <div class="live-indicator" title="Live">
        <div class="ripple-ring"></div>
        <div class="ripple-ring"></div>
        <div class="ripple-ring"></div>
        <div class="live-dot"></div>
      </div>` : ''}
    <div class="match-stage">${match.stage || 'Group Stage'}</div>
    <div class="match-teams">
      <div class="team">
        <span class="team-flag">${match.homeFlag || '🏳️'}</span>
        <span class="team-name">${match.home}</span>
      </div>
      <div class="score-block">
        <span class="score">${hasScore ? `${match.homeScore}–${match.awayScore}` : 'vs'}</span>
        <span class="match-time">${match.time || match.date || ''}</span>
      </div>
      <div class="team">
        <span class="team-flag">${match.awayFlag || '🏳️'}</span>
        <span class="team-name">${match.away}</span>
      </div>
    </div>
    ${hasScore ? `
    <div class="goal-bars">
      <div class="goal-bar-row">
        <span>${match.home}</span>
        <div class="goal-bar-track">
          <div class="goal-bar-fill home" data-pct="${homePct}"></div>
        </div>
        <span>${match.homeScore}</span>
      </div>
      <div class="goal-bar-row">
        <span>${match.away}</span>
        <div class="goal-bar-track">
          <div class="goal-bar-fill away" data-pct="${awayPct}"></div>
        </div>
        <span>${match.awayScore}</span>
      </div>
    </div>` : ''}
    <div class="match-venue">📍 ${match.venue || 'TBD'}</div>
  `;

  // Click handler
  card.addEventListener('click', () => {
    if (isFinal) {
      burstConfetti(card);
      showToast('🎉', 'Full Time!', `${match.home} ${match.homeScore}–${match.awayScore} ${match.away}`);
    } else if (isLive) {
      showToast('⚽', 'Match is Live!', `${match.home} vs ${match.away} — Watch now`);
    } else {
      showToast('📅', 'Match Info', `${match.home} vs ${match.away} · ${match.date || 'TBD'}`);
    }
  });

  applyCardTilt(card);
  initGoalBars(card);

  return card;
}

/* ─── CAROUSEL ───────────────────────────────────────────────────── */
function initMatchCarousel() {
  const carousel = $('#matchesCarousel');
  const dotsWrap = $('#matchDots');
  const prevBtn  = $('#matchPrev');
  const nextBtn  = $('#matchNext');
  if (!carousel) return;

  const PAGE_SIZE = 3;
  let currentPage = 0;
  const totalPages = Math.ceil(matches.length / PAGE_SIZE);

  function renderPage(page) {
    carousel.innerHTML = '';
    const start = page * PAGE_SIZE;
    const slice = matches.slice(start, start + PAGE_SIZE);
    slice.forEach(m => {
      const card = buildMatchCard(m);
      carousel.appendChild(card);
      // Trigger scroll reveal for new cards
      requestAnimationFrame(() => card.classList.add('revealed'));
    });

    // Update dots
    $$('.dot', dotsWrap).forEach((d, i) => {
      d.classList.toggle('active', i === page);
    });
  }

  // Build dots
  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Page ${i + 1}`);
    dot.addEventListener('click', () => { currentPage = i; renderPage(i); });
    dotsWrap.appendChild(dot);
  }

  prevBtn?.addEventListener('click', () => {
    currentPage = (currentPage - 1 + totalPages) % totalPages;
    renderPage(currentPage);
  });

  nextBtn?.addEventListener('click', () => {
    currentPage = (currentPage + 1) % totalPages;
    renderPage(currentPage);
  });

  // Swipe support
  let touchStartX = 0;
  carousel.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  carousel.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      currentPage = dx < 0
        ? (currentPage + 1) % totalPages
        : (currentPage - 1 + totalPages) % totalPages;
      renderPage(currentPage);
    }
  }, { passive: true });

  renderPage(0);
}

/* ─── STANDINGS ──────────────────────────────────────────────────── */
const standingsData = {
  'Group A': [
    { team: '🇧🇷 Brazil',    p:3, w:3, d:0, l:0, gf:7, ga:1, pts:9, status:'q' },
    { team: '🇦🇷 Argentina', p:3, w:2, d:0, l:1, gf:5, ga:3, pts:6, status:'q' },
    { team: '🇲🇽 Mexico',    p:3, w:1, d:0, l:2, gf:2, ga:4, pts:3, status:'n' },
    { team: '🇸🇦 Saudi Arabia', p:3, w:0, d:0, l:3, gf:0, ga:6, pts:0, status:'r' },
  ],
  'Group B': [
    { team: '🇫🇷 France',    p:3, w:3, d:0, l:0, gf:9, ga:2, pts:9, status:'q' },
    { team: '🇩🇪 Germany',   p:3, w:1, d:1, l:1, gf:4, ga:5, pts:4, status:'e' },
    { team: '🇯🇵 Japan',     p:3, w:1, d:1, l:1, gf:3, ga:4, pts:4, status:'e' },
    { team: '🇦🇺 Australia', p:3, w:0, d:0, l:3, gf:1, ga:6, pts:0, status:'r' },
  ],
  'Group C': [
    { team: '🇪🇸 Spain',     p:3, w:3, d:0, l:0, gf:8, ga:1, pts:9, status:'q' },
    { team: '🇵🇹 Portugal',  p:3, w:2, d:0, l:1, gf:6, ga:3, pts:6, status:'q' },
    { team: '🇲🇦 Morocco',   p:3, w:1, d:0, l:2, gf:2, ga:4, pts:3, status:'n' },
    { team: '🇨🇦 Canada',    p:3, w:0, d:0, l:3, gf:1, ga:9, pts:0, status:'r' },
  ],
};

function initStandings() {
  const tabsEl  = $('#standingsTabs');
  const tableEl = $('#standingsTable');
  if (!tabsEl || !tableEl) return;

  const groups = Object.keys(standingsData);
  let active = groups[0];

  function posClass(status) {
    const map = { q: 'q', e: 'e', r: 'r', n: 'n' };
    return map[status] || 'n';
  }

  function renderTable(group) {
    const rows = standingsData[group];
    tableEl.innerHTML = `
      <table class="standings-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>P</th><th>W</th><th>D</th><th>L</th>
            <th>GF</th><th>GA</th><th>PTS</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((r, i) => `
            <tr>
              <td><span class="pos-badge ${posClass(r.status)}">${i + 1}</span></td>
              <td>${r.team}</td>
              <td>${r.p}</td><td>${r.w}</td><td>${r.d}</td><td>${r.l}</td>
              <td>${r.gf}</td><td>${r.ga}</td>
              <td><strong>${r.pts}</strong></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  groups.forEach(g => {
    const btn = document.createElement('button');
    btn.className = 'tab-btn' + (g === active ? ' active' : '');
    btn.textContent = g;
    btn.addEventListener('click', () => {
      active = g;
      $$('.tab-btn', tabsEl).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderTable(g);
    });
    tabsEl.appendChild(btn);
  });

  renderTable(active);
}

/* ─── NEWS GRID ──────────────────────────────────────────────────── */
function initNews() {
  const grid = $('#newsGrid');
  if (!grid) return;

  newsItems.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'news-card section-reveal';
    card.style.transitionDelay = `${idx * 0.08}s`;

    card.innerHTML = `
      <div class="news-hero">
        <div class="news-hero-emoji">${item.emoji || '⚽'}</div>
      </div>
      <div class="news-body">
        <div class="news-category">${item.category || 'World Cup'}</div>
        <h3 class="news-title">${item.title}</h3>
        <p class="news-excerpt">${item.excerpt || item.summary || ''}</p>
        <div class="news-meta">
          <span>${item.date || ''}</span>
          <span class="news-tag">${item.tag || 'News'}</span>
        </div>
      </div>
    `;

    card.addEventListener('click', () => {
      showToast('📰', item.title, item.excerpt || 'Read more on the official site.', 5000);
    });

    grid.appendChild(card);
  });
}

/* ─── LIVE SCORE GLOW ────────────────────────────────────────────── */
function initLiveGlow() {
  // Already handled by CSS animation on .match-card.live
  // Pulse every 30s for UX feedback
  setInterval(() => {
    $$('.match-card.live').forEach(card => {
      const score = $('.score', card);
      if (score) {
        score.style.transform = 'scale(1.2)';
        setTimeout(() => { score.style.transform = ''; }, 300);
      }
    });
  }, 30000);
}

/* ─── INIT ALL ───────────────────────────────────────────────────── */
function init() {
  initHeader();
  initHeroParticles();
  initCountdown();
  initScrollReveal();
  initTypewriter();
  initStats();
  initMatchCarousel();
  initStandings();
  initNews();
  initLiveGlow();

  // Welcome toast after short delay
  setTimeout(() => {
    showToast('⚽', 'Welcome!', 'FIFA World Cup 2026™ — USA · Canada · Mexico');
  }, 1200);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

/* ─── EXPORTS for testing ────────────────────────────────────────── */
export {
  animateCountUp,
  burstConfetti,
  showToast,
  buildMatchCard,
  applyCardTilt,
  lerp,
  clamp,
  randBetween,
};
