# Project

bash
   git clone https://github.com/ali1092-SC/samplefootballapp.git
   cd samplefootballapp
   bash
   # Simply open index.html in your browser
   open index.html          # macOS
   start index.html         # Windows
   xdg-open index.html      # Linux
   
samplefootballapp/
├── index.html        # Entry point — HTML structure and element IDs
├── app.js            # All JavaScript logic (init, kick, reset, idle state)
├── styles.css        # All CSS animations, variables, and state classes
├── docs/
│   ├── API.md        # Full API reference for all exported functions
│   ├── FORGE_SESSION.md  # Development session notes
│   └── FORGE_WIKI.md     # Extended project wiki and design decisions
└── README.md         # This file
js
// app.js
const KICK_DURATION_MS = 2000;  // 2 seconds — keep in sync with --kick-duration in CSS
const RESET_DELAY_MS   = 400;   // pause at right edge before snap-back
css
/* styles.css */
:root {
  --ball-size:            64px;
  --kick-duration:        2s;
  --idle-bounce-duration: 0.6s;
  --idle-sway-duration:   1.0s;
}
js
// Programmatic usage examples
kickFootball();     // trigger a kick without a click
resetFootball();    // force a reset from any state
setIdleState();     // force ball back to idle

User clicks #football
        │
        ▼
┌─────────────────────────────────────────────────────┐
│  kickFootball()                                     │
│  classes : ["football", "kicked"]                   │
│  opacity : 1                                        │
│  animation: footballKickAcross                      │
│  pointer-events: none                               │
└──────────────────────┬──────────────────────────────┘
                       │  ~KICK_DURATION_MS (2000ms)
                       │  animationend fires → resetFootball()
                       ▼
┌─────────────────────────────────────────────────────┐
│  Resetting                                          │
│  classes : ["football", "resetting"]                │
│  opacity : 0  ← ball invisible                      │
│  animation: none                                    │
│  position : snapped back to left origin             │
│  pointer-events: none                               │
└──────────────────────┬──────────────────────────────┘
                       │  ~RESET_DELAY_MS (400ms)
                       │  setTimeout → setIdleState()
                       ▼
┌─────────────────────────────────────────────────────┐
│  Idle (ready for next kick)                         │
│  classes : ["football", "idle"]                     │
│  opacity : 1                                        │
│  animations: idleBounce, idleSway                   │
│  pointer-events: auto                               │
└─────────────────────────────────────────────────────┘
        │
        ▼
   Awaiting next click
html
<!-- Root element targeted by all JavaScript selectors -->
<div id="football-container">
  <div id="football" class="football idle">
    <!-- Football SVG or emoji content -->
  </div>
</div>


The `README.md` has been fully rewritten and expanded from a bare technical reference into a comprehensive developer guide. It now includes a project overview, features list, getting started instructions, project structure table, configuration reference for both JS constants and CSS custom properties, an API summary table, an improved annotated state diagram, HTML structure docs, browser support, and contributing guidelines.

## Recent Changes

### 2026-06-18 02:00:14 UTC

**Task:** add more contents to the readme file

**Files modified:**


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

*Last updated by Forge on 2026-06-18 02:00:14 UTC*
