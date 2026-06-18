/**
 * app.js — Football App UI logic
 *
 * State managed here:
 *  - kickCount   : total kicks this session
 *  - record      : highest kick streak achieved
 *  - streak      : consecutive kicks without reset
 *  - isFlying    : ball currently in animation
 */

// ─── DOM References ─────────────────────────────────────────────────────────
const football        = document.getElementById('football');
const footballWrapper = document.getElementById('football-wrapper');
const shadow          = document.getElementById('shadow');
const kickCountEl     = document.getElementById('kick-count');
const recordCountEl   = document.getElementById('record-count');
const streakCountEl   = document.getElementById('streak-count');
const statusMessage   = document.getElementById('status-message');
const kickBtn         = document.getElementById('kick-btn');
const resetBtn        = document.getElementById('reset-btn');
const burstContainer  = document.getElementById('burst-container');

// ─── State ───────────────────────────────────────────────────────────────────
export let state = {
  kickCount: 0,
  record:    0,
  streak:    0,
  isFlying:  false,
};

// ─── Constants ───────────────────────────────────────────────────────────────
const PARTICLE_POOL   = ['⭐', '✨', '💫', '🌟', '🔥', '💥', '🎉'];
const PARTICLE_COUNT  = 8;
const STATUS_MESSAGES = [
  'Nice kick! 🎯',
  'Booom! 💥',
  'What a strike! ⚡',
  'Unstoppable! 🔥',
  'In the net! 🥅',
  'Thunderbolt! ⛈️',
  'Legendary! 🌟',
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Temporarily add a CSS class to an element, removing it after the
 * animation completes (via animationend) or after a fallback timeout.
 */
function addAnimClass(el, cls, fallbackMs = 1000) {
  el.classList.remove(cls);
  // Force reflow so removing + re-adding actually restarts the animation
  void el.offsetWidth; // eslint-disable-line no-void
  el.classList.add(cls);

  return new Promise((resolve) => {
    const cleanup = () => {
      el.classList.remove(cls);
      resolve();
    };
    const onEnd = (e) => {
      if (e.target !== el) return;
      el.removeEventListener('animationend', onEnd);
      clearTimeout(timer);
      cleanup();
    };
    const timer = setTimeout(() => {
      el.removeEventListener('animationend', onEnd);
      cleanup();
    }, fallbackMs);
    el.addEventListener('animationend', onEnd);
  });
}

/** Bump a score counter with a visual pop. */
function bumpCounter(el, newValue) {
  el.textContent = String(newValue);
  el.classList.remove('bump');
  void el.offsetWidth;
  el.classList.add('bump');
  setTimeout(() => el.classList.remove('bump'), 300);
}

/** Pick a random item from an array. */
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Compute parabolic arc height for a normalised time t ∈ [0,1].
 * Returns value in range [0, 1] — peaks at t = 0.5.
 */
export function parabolicHeight(t) {
  return 4 * t * (1 - t);
}

/**
 * Compute spin angle (degrees) for a 720° rotation over t ∈ [0,1].
 */
export function spinAngle(t) {
  return t * 720;
}

/**
 * Squash value at landing (t = 1): scaleX grows, scaleY shrinks.
 * Returns { scaleX, scaleY }.
 */
export function squashValues(t) {
  const squash = 1 - Math.max(0, t);
  return {
    scaleX: 1 + 0.3 * (1 - squash),
    scaleY: 1 - 0.3 * (1 - squash),
  };
}

/**
 * Shadow scale — inversely proportional to ball height.
 * At peak (height=1) shadow is tiny; at ground (height=0) shadow is full.
 */
export function shadowScale(height) {
  return 1 - height * 0.75;
}

/** Spawn emoji particles around the arena centre. */
function spawnParticles() {
  burstContainer.innerHTML = '';
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    p.textContent = pick(PARTICLE_POOL);
    // Random angle spread
    const angle  = (i / PARTICLE_COUNT) * 360 + (Math.random() * 30 - 15);
    const dist   = 60 + Math.random() * 80;
    const rad    = (angle * Math.PI) / 180;
    const dx     = Math.round(Math.cos(rad) * dist);
    const dy     = Math.round(Math.sin(rad) * dist);
    p.style.setProperty('--p-end', `translate(${dx}px, ${dy}px)`);
    // Place near centre of burst container
    p.style.left = '50%';
    p.style.top  = '50%';
    p.style.transform = 'translate(-50%, -50%)';
    burstContainer.appendChild(p);
  }
  // Clean up after animation
  setTimeout(() => { burstContainer.innerHTML = ''; }, 900);
}

/** Update the status message text. */
export function setStatus(msg, highlight = false) {
  if (!statusMessage) return;
  statusMessage.textContent = msg;
  statusMessage.classList.toggle('highlight', highlight);
}

// ─── Core Kick Logic ─────────────────────────────────────────────────────────

export async function kickBall() {
  if (state.isFlying) return;

  state.isFlying = true;
  state.kickCount += 1;
  state.streak   += 1;
  if (state.streak > state.record) {
    state.record = state.streak;
  }

  // Update counters
  bumpCounter(kickCountEl, state.kickCount);
  bumpCounter(streakCountEl, state.streak);
  if (state.streak >= state.record) {
    bumpCounter(recordCountEl, state.record);
  }

  // Status feedback
  const msg = state.streak >= 5
    ? '🔥 On fire! ' + state.streak + ' in a row!'
    : pick(STATUS_MESSAGES);
  setStatus(msg, true);

  // Disable kick button during flight
  kickBtn.disabled = true;
  kickBtn.setAttribute('aria-disabled', 'true');

  // Remove idle animation
  football.classList.remove('idle-bounce');

  // Ripple on wrapper
  footballWrapper.classList.add('ripple');
  setTimeout(() => footballWrapper.classList.remove('ripple'), 600);

  // Shadow shrinks as ball goes up
  shadow.classList.add('shadow-small');

  // Particles
  spawnParticles();

  // Fly!
  await addAnimClass(football, 'flying', 1100);

  // Landing squash
  shadow.classList.remove('shadow-small');
  shadow.classList.add('shadow-large');
  await addAnimClass(football, 'squash', 300);
  shadow.classList.remove('shadow-large');

  // Re-enable
  state.isFlying = false;
  kickBtn.disabled = false;
  kickBtn.removeAttribute('aria-disabled');

  setStatus('Click the ball to kick!', false);

  // Resume idle
  football.classList.add('idle-bounce');
}

export function resetGame() {
  // Stop any flight
  state.isFlying  = false;
  state.kickCount = 0;
  state.streak    = 0;
  // Record persists as high score

  kickCountEl.textContent  = '0';
  streakCountEl.textContent = '0';

  kickBtn.disabled = false;
  kickBtn.removeAttribute('aria-disabled');

  setStatus('Click the ball to kick!', false);
  football.classList.remove('flying', 'squash', 'stretch', 'idle-bounce');
  shadow.classList.remove('shadow-small', 'shadow-large');

  // Drop ball back in
  addAnimClass(football, 'drop-in', 800).then(() => {
    football.classList.add('idle-bounce');
  });
}

// ─── Event Listeners ─────────────────────────────────────────────────────────

footballWrapper.addEventListener('click', kickBall);
footballWrapper.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    kickBall();
  }
});

kickBtn.addEventListener('click', kickBall);
resetBtn.addEventListener('click', resetGame);

// Nav buttons (view toggle placeholder)
document.querySelectorAll('.nav-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach((b) => {
      b.classList.remove('active');
      b.removeAttribute('aria-current');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-current', 'page');
  });
});

// ─── Init ────────────────────────────────────────────────────────────────────
function init() {
  // Kick counter starts at 0 — display already set in HTML
  // Drop the ball in on load
  addAnimClass(football, 'drop-in', 800).then(() => {
    football.classList.add('idle-bounce');
  });
}

init();
