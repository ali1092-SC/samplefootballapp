/**
 * app.js — Football kick animation controller
 *
 * State machine:  idle → kicked → resetting → dropping → idle
 *
 * Timing constants must stay in sync with CSS:
 *   KICK_DURATION_MS   ↔  --kick-duration       (2 s)
 *   IMPACT_DURATION_MS ↔  --impact-duration      (0.15 s)
 *   RESET_DELAY_MS     — pause while ball is invisible before drop-in
 *   DROP_DURATION_MS   ↔  fadeInDrop duration    (0.45 s)
 */

const KICK_DURATION_MS   = 2000;   // total kick-across travel time
const IMPACT_DURATION_MS = 150;    // kickImpact flash at start of kick
const RESET_DELAY_MS     = 300;    // invisible pause before reappearing
const DROP_DURATION_MS   = 450;    // fadeInDrop animation length

// ─── Element references ────────────────────────────────────────────────────
const ball       = document.getElementById('football');
const shadow     = document.getElementById('ball-shadow');

if (!ball) {
  console.error('[app.js] #football element not found — check index.html');
}

// ─── State helpers ─────────────────────────────────────────────────────────

/**
 * Remove every state class and apply only the supplied ones.
 * @param {...string} classes
 */
function applyState(...classes) {
  ball.classList.remove('idle', 'kicked', 'resetting', 'dropping');
  ball.classList.add(...classes);
}

// ─── Public API ────────────────────────────────────────────────────────────

/**
 * Trigger a kick from the idle position.
 * Safe to call programmatically — guards against double-firing.
 */
function kickFootball() {
  if (!ball.classList.contains('idle')) return;

  applyState('kicked');

  // Total animation time = impact flash + kick-across travel
  const totalKickMs = IMPACT_DURATION_MS + KICK_DURATION_MS;

  // Listen for the main kick animation to end, then reset
  // We use a one-shot listener keyed to the 'footballKickAcross' animation
  function onKickEnd(e) {
    if (e.animationName !== 'footballKickAcross') return;
    ball.removeEventListener('animationend', onKickEnd);
    resetFootball();
  }

  ball.addEventListener('animationend', onKickEnd);

  // Safety fallback in case animationend misfires (e.g. tab hidden)
  setTimeout(() => {
    if (ball.classList.contains('kicked')) {
      ball.removeEventListener('animationend', onKickEnd);
      resetFootball();
    }
  }, totalKickMs + 200);
}

/**
 * Snap the ball back to its origin (invisible) then call setIdleState.
 * Can be called from any state to force a clean reset.
 */
function resetFootball() {
  applyState('resetting');

  setTimeout(() => {
    dropInFootball();
  }, RESET_DELAY_MS);
}

/**
 * Play the drop-in animation then hand off to setIdleState.
 * Intermediate step between resetting and idle.
 */
function dropInFootball() {
  applyState('dropping');

  setTimeout(() => {
    setIdleState();
  }, DROP_DURATION_MS);
}

/**
 * Put the ball directly into idle (bouncing/swaying) state.
 * Skips the drop-in — useful for programmatic resets.
 */
function setIdleState() {
  applyState('idle');
}

// ─── Event binding ─────────────────────────────────────────────────────────

if (ball) {
  ball.addEventListener('click', kickFootball);
}

// ─── Boot ──────────────────────────────────────────────────────────────────

// Ensure the ball starts in idle on page load regardless of HTML class attr
window.addEventListener('DOMContentLoaded', () => {
  setIdleState();
});
