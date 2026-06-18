import { matches } from './data/matches.js';
import { news } from './data/news.js';

// ─── Player Card Data ────────────────────────────────────────────────────────
export const playerCardData = [
  {
    name: 'Lionel Messi',
    country: 'Argentina',
    jerseyImageUrl:
      'https://img.a.transfermarkt.technology/portrait/big/28003-1682683695.jpg',
    sectionTarget: '#players',
  },
  {
    name: 'Cristiano Ronaldo',
    country: 'Portugal',
    jerseyImageUrl:
      'https://img.a.transfermarkt.technology/portrait/big/8198-1701955611.jpg',
    sectionTarget: '#players',
  },
  {
    name: 'Kylian Mbappé',
    country: 'France',
    jerseyImageUrl:
      'https://img.a.transfermarkt.technology/portrait/big/342229-1682683755.jpg',
    sectionTarget: '#players',
  },
  {
    name: 'Erling Haaland',
    country: 'Norway',
    jerseyImageUrl:
      'https://img.a.transfermarkt.technology/portrait/big/418560-1682683867.jpg',
    sectionTarget: '#players',
  },
  {
    name: 'Vinicius Jr',
    country: 'Brazil',
    jerseyImageUrl:
      'https://img.a.transfermarkt.technology/portrait/big/371998-1682683926.jpg',
    sectionTarget: '#players',
  },
  {
    name: 'Pedri',
    country: 'Spain',
    jerseyImageUrl:
      'https://img.a.transfermarkt.technology/portrait/big/608892-1682683978.jpg',
    sectionTarget: '#players',
  },
];

// ─── Smooth-Scroll Helper ────────────────────────────────────────────────────
/**
 * Smoothly scrolls the page to the element identified by `targetSelector`.
 * Accounts for any fixed/sticky nav bar height so the section isn't hidden.
 *
 * @param {string} targetSelector – CSS selector, e.g. "#players"
 * @returns {boolean} true when target was found and scrolled to, false otherwise
 */
export function smoothScrollTo(targetSelector) {
  const target = document.querySelector(targetSelector);
  if (!target) return false;

  const nav = document.querySelector('nav') || document.querySelector('header');
  const navHeight = nav ? nav.getBoundingClientRect().height : 0;
  const elementTop = target.getBoundingClientRect().top + window.pageYOffset;

  window.scrollTo({
    top: elementTop - navHeight,
    behavior: 'smooth',
  });

  return true;
}

// ─── Nav Player Link Wiring ──────────────────────────────────────────────────
/**
 * Attaches smooth-scroll click handlers to every nav link that points to
 * "#players" (or carries a data-scroll="#players" attribute).
 */
function wireNavPlayerLinks() {
  const navLinks = document.querySelectorAll(
    'nav a[href="#players"], nav [data-scroll="#players"]'
  );

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target =
        link.getAttribute('href') || link.getAttribute('data-scroll');
      smoothScrollTo(target);
    });
  });
}

// ─── Active-State via IntersectionObserver ───────────────────────────────────
/**
 * Observes the players section and toggles an `active` class on matching nav
 * links whenever the section enters / leaves the viewport.
 */
function observePlayersSection() {
  const playersSection = document.querySelector('#players');
  if (!playersSection) return;

  const navLinks = document.querySelectorAll(
    'nav a[href="#players"], nav [data-scroll="#players"]'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        navLinks.forEach((link) => {
          link.classList.toggle('active', entry.isIntersecting);
        });
      });
    },
    {
      // Fire when at least 20 % of the section is visible
      threshold: 0.2,
    }
  );

  observer.observe(playersSection);
}

// ─── Countdown Timer ─────────────────────────────────────────────────────────
/**
 * Returns the formatted time remaining until `kickoffDate`.
 * Returns an object with { days, hours, minutes, seconds } as zero-padded
 * strings, plus `expired: true` when the date is in the past.
 *
 * @param {Date} kickoffDate
 * @param {Date} [now] – injectable "current time" for testing
 * @returns {{ days: string, hours: string, minutes: string, seconds: string, expired: boolean }}
 */
export function getCountdownValues(kickoffDate, now = new Date()) {
  const diff = kickoffDate - now;

  if (diff <= 0) {
    return { days: '00', hours: '00', minutes: '00', seconds: '00', expired: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n) => String(n).padStart(2, '0');

  return {
    days: pad(days),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
    expired: false,
  };
}

/**
 * Starts a live countdown inside `containerEl`, updating every second.
 * Reads the target date from `containerEl.dataset.kickoff` (ISO string).
 *
 * @param {HTMLElement} containerEl
 * @returns {number|null} The interval ID (or null if no valid kickoff found)
 */
export function startCountdown(containerEl) {
  if (!containerEl) return null;

  const kickoffIso = containerEl.dataset.kickoff;
  if (!kickoffIso) return null;

  const kickoffDate = new Date(kickoffIso);
  if (isNaN(kickoffDate.getTime())) return null;

  function render() {
    const values = getCountdownValues(kickoffDate);

    containerEl.innerHTML = values.expired
      ? '<span class="countdown__expired">Kick-off!</span>'
      : `<span class="countdown__segment"><span class="countdown__value">${values.days}</span><span class="countdown__label">Days</span></span>` +
        `<span class="countdown__segment"><span class="countdown__value">${values.hours}</span><span class="countdown__label">Hrs</span></span>` +
        `<span class="countdown__segment"><span class="countdown__value">${values.minutes}</span><span class="countdown__label">Min</span></span>` +
        `<span class="countdown__segment"><span class="countdown__value">${values.seconds}</span><span class="countdown__label">Sec</span></span>`;
  }

  render();
  return setInterval(render, 1000);
}

// ─── Render Helpers ──────────────────────────────────────────────────────────
export function renderMatches() {
  const container = document.getElementById('matches-list');
  if (!container) return;

  container.innerHTML = matches
    .map(
      (m) => `
      <article class="match-card">
        <div class="match-teams">
          <span class="team home">${m.homeTeam}</span>
          <span class="match-score">${m.score ?? 'vs'}</span>
          <span class="team away">${m.awayTeam}</span>
        </div>
        <div class="match-meta">
          <span class="match-date">${new Date(m.date).toLocaleDateString(undefined, {
            weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
          })}</span>
          <span class="match-venue">${m.venue ?? ''}</span>
        </div>
      </article>`
    )
    .join('');
}

export function renderNews() {
  const container = document.getElementById('news-list');
  if (!container) return;

  container.innerHTML = news
    .map(
      (n) => `
      <article class="news-card">
        ${n.imageUrl ? `<img src="${n.imageUrl}" alt="${n.title}" class="news-card__image" loading="lazy" />` : ''}
        <div class="news-card__body">
          <h3 class="news-card__title">${n.title}</h3>
          <p class="news-card__summary">${n.summary ?? ''}</p>
          <time class="news-card__date" datetime="${n.date}">${new Date(n.date).toLocaleDateString()}</time>
        </div>
      </article>`
    )
    .join('');
}

export function renderPlayerCards() {
  const container = document.querySelector('#players .players-grid');
  if (!container) return;

  container.innerHTML = playerCardData
    .map(
      (p) => `
      <article class="player-card">
        <div class="player-card__image-wrap">
          <img
            src="${p.jerseyImageUrl}"
            alt="${p.name} – ${p.country} jersey"
            class="player-card__image"
            loading="lazy"
            onerror="this.src='https://via.placeholder.com/200x200?text=${encodeURIComponent(p.name)}'"
          />
        </div>
        <div class="player-card__info">
          <h3 class="player-card__name">${p.name}</h3>
          <span class="player-card__country">${p.country}</span>
        </div>
      </article>`
    )
    .join('');
}

// ─── Boot ────────────────────────────────────────────────────────────────────
function init() {
  renderMatches();
  renderNews();
  renderPlayerCards();
  wireNavPlayerLinks();
  observePlayersSection();

  // Start countdown for every element carrying a data-kickoff attribute
  document.querySelectorAll('[data-kickoff]').forEach((el) => {
    startCountdown(el);
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}
