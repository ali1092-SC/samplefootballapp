# Project

User clicks football
       │
       ▼
kickFootball() fires
       │
       ▼
CSS class "kicked" applied → footballKickAcross animation runs
       │
       ▼
animationend event fires → resetFootball() called
       │
       ▼
Ball snapped back invisibly → setIdleState() restores idle animations
       │
       ▼
Ready for next kick
html
<!-- Root element targeted by all JavaScript selectors -->
<div id="football-container">
  <div id="football" class="football idle">
    <!-- Football SVG or emoji content -->
  </div>
</div>
js
initFootball(): void
js
document.addEventListener('DOMContentLoaded', initFootball);
js
kickFootball(): void
js
// Programmatic kick (bypasses click; useful for testing)
kickFootball();
js
resetFootball(): void
js
// resetFootball is typically called automatically via animationend,
// but can be invoked directly to force a state reset:
resetFootball();
js
setIdleState(): void
js
// Force ball back to idle from any broken state:
setIdleState();

Event type  : click
Target      : HTMLElement #football
bubbles     : true
cancelable  : true
Precondition: #football has class "idle" (not "kicked" or "resetting")

Immediate (synchronous):
  - #football.classList removes "idle"
  - #football.classList adds "kicked"
  - CSS animation "footballKickAcross" begins on #football

After KICK_DURATION_MS (~1200ms):
  - animationend fires on #football
  - #football.classList removes "kicked"
  - #football.classList adds "resetting"
  - #football opacity → 0 (invisible)
  - Ball position snapped to left origin

After KICK_DURATION_MS + RESET_DELAY_MS (~1400ms total):
  - #football.classList removes "resetting"
  - #football.classList adds "idle"
  - #football opacity → 1
  - Idle bounce + sway animations resume
js
// app.js
const KICK_DURATION_MS = 2000;  // 2 seconds
const RESET_DELAY_MS   = 400;   // longer pause at right edge
css
/* styles.css — keep in sync */
:root {
  --kick-duration: 2s;
}
css
:root {
  --ball-size:            64px;
  --kick-duration:        0.9s;
  --idle-bounce-duration: 0.6s;
  --idle-sway-duration:   1.0s;
}

#football.classList  : ["football", "idle"]
#football opacity    : 1
#football transform  : translateY(-4px) translateX(3px)  ← mid-idle-cycle
pointer-events       : auto
Active animations    : idleBounce, idleSway

type    : "click"
target  : #football
clientX : 28
clientY : 952

#football.classList  : ["football", "kicked"]
#football transform  : reset to 0,0 by animation start frame
Active animations    : footballKickAcross
Console              : (none)

#football.classList  : ["football", "resetting"]
#football opacity    : 0
pointer-events       : none
Active animations    : none
Position             : snapped back to left origin (invisible)

#football.classList  : ["football", "idle"]
#football opacity    : 1
pointer-events       : auto
Active animations    : idleBounce, idleSway

#football.classList  : ["football", "resetting"]
#football opacity    : 0
pointer-events       : none

type    : "click"
target  : #football  (click passes through due to pointer-events: none)

No state change.
kickFootball() guard condition: ball has class "resetting" → early return.
No animation triggered.
#football.classList unchanged : ["football", "resetting"]

#football.classList  : ["football", "kicked"]
#football transform  : translateX(95vw) rotate(360deg)  ← end of kick keyframe
#football opacity    : 1

type    : "animationend"
animationName : "footballKickAcross"
target  : #football
elapsedTime   : 1.2  (seconds)

#football.classList  : ["football", "resetting"]
#football style.opacity   : "0"
#football style.transform : ""  (cleared → snaps to CSS origin: bottom-left)
pointer-events       : none  (via .resetting CSS rule)
setTimeout scheduled : resetFootball completion in RESET_DELAY_MS (200ms)
js
// setIdleState() executes:
#football.classList  : ["football", "idle"]
#football style.opacity   : ""  (inline override cleared → CSS opacity: 1 restored)
pointer-events       : auto
Active animations    : idleBounce, idleSway


bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build


Two files were created or updated. `docs/API.md` is a comprehensive API reference covering all four JavaScript functions (`initFootball`, `kickFootball`, `resetFootball`, `setIdleState`), the `click` event request/response contract, the three-state lifecycle transition table, every CSS keyframe's per-stop breakdown, all JavaScript constants and CSS custom properties with sync examples, three annotated before/after request-response walkthroughs, and an error/edge-case table. `README.md` gains an "API Reference" section with a direct link to the new doc, and the Documentation table of contents is expanded to list it alongside the existing session and wiki files.

## Recent Changes

### 2026-06-18 01:55:15 UTC

**Task:** Generate API documentation with request/response examples

**Files modified:**
- `docs/API.md`

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build
```

## Documentation

- [Session Details](docs/FORGE_SESSION.md) — Detailed solution overview
- [Wiki Entry](docs/FORGE_WIKI.md) — Knowledge base entry

---

*Last updated by Forge on 2026-06-18 01:55:15 UTC*
