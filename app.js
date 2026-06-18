/**
 * app.js
 * Handles the kick-across animation for the football widget.
 * The ball starts at the left-bottom corner, and on click it
 * flies across the screen to the right-bottom corner, then
 * quietly snaps back and resumes its idle bounce/sway loop.
 */

(function () {
  'use strict';

  /* ── State ── */
  let isKicking   = false;   // true while the kick animation is running
  let resetTimer  = null;    // timer reference for the invisible reset

  /* ── DOM ── */
  const football = document.getElementById('football-container');

  if (!football) {
    console.warn('[football] #football-container not found in DOM.');
    return;
  }

  /* ── Helpers ── */

  /**
   * Remove the `.kicked` and `.resetting` helper classes cleanly.
   * Forcing a reflow between removes/adds prevents the browser from
   * batching the class changes and skipping the animation restart.
   */
  function clearAnimationClasses() {
    football.classList.remove('kicked');
    football.classList.remove('resetting');
    // Force reflow so subsequent class additions restart animations.
    void football.offsetWidth; // eslint-disable-line no-void
  }

  /**
   * Reset the ball invisibly to the left-bottom corner, then fade it
   * back in and re-enable the idle animations.
   */
  function resetToLeftCorner() {
    // 1. Make invisible and disable all animations immediately.
    football.classList.add('resetting');

    // 2. After one frame the browser has painted the invisible state;
    //    now we can safely strip all classes and restore idle mode.
    resetTimer = setTimeout(() => {
      clearAnimationClasses();
      isKicking = false;

      // Brief fade-in so the reappearance isn't jarring.
      football.style.transition = 'opacity 0.35s ease';
      football.style.opacity    = '1';

      // Clean up the inline transition after it fires.
      setTimeout(() => {
        football.style.transition = '';
      }, 380);
    }, 50); // 50 ms is enough for one paint cycle
  }

  /* ── Kick trigger ── */

  function kick() {
    if (isKicking) return;   // cooldown: ignore clicks mid-flight
    isKicking = true;

    // Clear any in-progress reset timer to avoid race conditions.
    if (resetTimer !== null) {
      clearTimeout(resetTimer);
      resetTimer = null;
    }

    // Ensure we start clean (e.g. if a previous reset was interrupted).
    clearAnimationClasses();

    // Apply the kick animation class.
    football.classList.add('kicked');
  }

  /* ── Animation-end handler ── */

  football.addEventListener('animationend', function onAnimEnd(e) {
    // Only react to the kick-across animation finishing.
    if (!e.animationName || e.animationName !== 'footballKickAcross') return;
    if (!isKicking) return;

    // Hold the ball visible at the right edge for a short moment so it
    // "settles" before flying back.
    resetTimer = setTimeout(resetToLeftCorner, 420);
  });

  /* ── Click / tap handler ── */

  football.addEventListener('click', kick);

  // Keyboard accessibility: allow triggering with Enter / Space.
  football.setAttribute('role',     'button');
  football.setAttribute('tabindex', '0');
  football.setAttribute('aria-label', 'Click to kick the football across the screen');

  football.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      kick();
    }
  });

  /* ── Guard: if the animation never fires animationend (hidden tab etc.)
        reset the lock after a generous timeout so the ball isn't stuck. ── */
  football.addEventListener('click', function () {
    if (!isKicking) return;
    setTimeout(() => {
      if (isKicking) {
        // Force reset if animationend never fired.
        resetToLeftCorner();
      }
    }, 4000);
  });

})();
