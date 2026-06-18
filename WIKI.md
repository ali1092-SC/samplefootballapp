---
forge-wiki: true
generated-at: 2026-06-18T15:36:08.165Z
generator-version: "1.0"
repo: ali1092-SC/samplefootballapp
branch: main
section-count: 22
---

```forge-wiki-data
{"repoName":"ali1092-SC/samplefootballapp","repoNote":"FIFA World Cup 2026 fan showcase with interactive animations, countdown timers, match carousels, stats rings, confetti effects, and comprehensive test coverage.","lastUpdatedAt":"2026-06-18T14:09:29.721Z","sections":[{"id":"overview","title":"Overview","parentId":null,"sourceFiles":[{"path":"README.md","lineStart":1,"lineEnd":15},{"path":"docs/FORGE_SESSION.md","lineStart":1,"lineEnd":20}],"content":[{"type":"paragraph","text":"The FIFA World Cup 2026 fan showcase is a single-page browser application featuring a complete, self-contained HTML file with no external dependencies beyond Google Fonts. It delivers an official-style fan experience with inline CSS, vanilla JavaScript, and hand-coded SVG assets."},{"type":"paragraph","text":"The application includes: inline SVG FIFA 2026 logo at three responsive sizes, HTML5 Canvas football animation with pentagon patches, live countdown timer with flip-digit animations, seamlessly looping ticker with live results, IntersectionObserver-driven count-up stats with SVG ring progress indicators, scroll-reveal animations, typewriter heading effects, cursor-reactive 3D tilt on match cards, carousel with swipe support, group standings tabs, news grid, confetti burst effects, toast notifications, and full ARIA accessibility with prefers-reduced-motion guards throughout."},{"type":"paragraph","text":"The application supports responsive breakpoints down to 375px, scroll-shrink header, hero particle animations, and comprehensive test coverage with 60+ test cases across state management, DOM synchronization, accessibility features, and stress-integrity validation using Vitest and jsdom."}]},{"id":"system-architecture","title":"System Architecture","parentId":null,"sourceFiles":[{"path":"app.js","lineStart":1,"lineEnd":100},{"path":"app.test.js","lineStart":1,"lineEnd":150},{"path":"package.json","lineStart":1,"lineEnd":23}],"content":[{"type":"heading","level":2,"text":"Architecture Overview"},{"type":"paragraph","text":"The application is built on vanilla JavaScript with a modular initialization pattern. Each UI feature is initialized independently via separate functions, managing its own state, DOM queries, event listeners, and animation lifecycle. The codebase exports match and news data as ES modules, enabling both application rendering and test mocking."},{"type":"heading","level":3,"text":"Core Components"},{"type":"unorderedList","items":["Header Scroll Management: Detects scroll position >60px to apply 'shrunk' class for visual state transitions","Hero Particles: Generates 40 animated colored particles with randomized duration, delay, and positioning for visual interest","Countdown Timer: Displays days/hours/minutes/seconds until 2026-06-11 opening kick-off with flip-digit CSS animations","Scroll Reveal: IntersectionObserver reveals sections at 12% threshold, manages reveal class state","Typewriter Headings: Character-by-character reveal animation with cursor blink and delayed removal","Animate Count-Up: Progressive number animation with eased cubic-out timing for stat counters","Stats Rings: SVG circle progress indicators with animated stroke-dashoffset and concurrent count-up","Confetti Burst: 60-piece confetti explosion from origin element with randomized physics and auto-cleanup","3D Tilt: Cursor-reactive transform skew on match cards using clientX/Y delta from card center","Match Carousel: Horizontal slide carousel with prev/next buttons and dot navigation","Group Standings: Tab-based standings display with group filtering and team rank tables","News Grid: Grid layout with category badges, emoji icons, and date labels","Toast Notifications: Dismissible alerts with auto-cleanup after 3.5 seconds","Ticker: Continuously looping result ticker with clone-append animation loop"]},{"type":"diagram","title":"Application Initialization Flow","nodes":[{"id":"dom-ready","label":"Document Ready","type":"neutral"},{"id":"init-header","label":"initHeader()\nScroll listener","type":"neutral"},{"id":"init-particles","label":"initHeroParticles()\n40 elements","type":"frontend"},{"id":"init-countdown","label":"initCountdown()\nFlip animation loop","type":"neutral"},{"id":"init-reveal","label":"initScrollReveal()\nIntersectionObserver","type":"neutral"},{"id":"init-typewriter","label":"initTypewriter()\nChar-by-char reveal","type":"neutral"},{"id":"init-stats","label":"initStats()\nRings + count-up","type":"neutral"},{"id":"init-carousel","label":"initCarousel()\nNavigation setup","type":"neutral"},{"id":"init-standings","label":"initStandings()\nTab filtering","type":"neutral"},{"id":"init-news","label":"initNews()\nGrid render","type":"neutral"},{"id":"init-tilt","label":"initCardTilt()\nMousemove listeners","type":"neutral"},{"id":"init-ticker","label":"initTicker()\nLoop animation","type":"neutral"},{"id":"app-ready","label":"Application Ready","type":"output"}],"edges":[{"from":"dom-ready","to":"init-header","label":"parallel"},{"from":"dom-ready","to":"init-particles","label":"parallel"},{"from":"dom-ready","to":"init-countdown","label":"parallel"},{"from":"dom-ready","to":"init-reveal","label":"parallel"},{"from":"dom-ready","to":"init-typewriter","label":"parallel"},{"from":"dom-ready","to":"init-stats","label":"parallel"},{"from":"dom-ready","to":"init-carousel","label":"parallel"},{"from":"dom-ready","to":"init-standings","label":"parallel"},{"from":"dom-ready","to":"init-news","label":"parallel"},{"from":"dom-ready","to":"init-tilt","label":"parallel"},{"from":"dom-ready","to":"init-ticker","label":"parallel"},{"from":"init-header","to":"app-ready","label":"all complete"},{"from":"init-particles","to":"app-ready","label":"all complete"},{"from":"init-countdown","to":"app-ready","label":"all complete"},{"from":"init-reveal","to":"app-ready","label":"all complete"},{"from":"init-typewriter","to":"app-ready","label":"all complete"},{"from":"init-stats","to":"app-ready","label":"all complete"},{"from":"init-carousel","to":"app-ready","label":"all complete"},{"from":"init-standings","to":"app-ready","label":"all complete"},{"from":"init-news","to":"app-ready","label":"all complete"},{"from":"init-tilt","to":"app-ready","label":"all complete"},{"from":"init-ticker","to":"app-ready","label":"all complete"}]},{"type":"sourcesRow","files":[{"path":"app.js","lineStart":1,"lineEnd":50}]}]},{"id":"package-structure","title":"Package & File Structure","parentId":null,"sourceFiles":[{"path":"package.json","lineStart":1,"lineEnd":23},{"path":"WIKI.md","lineStart":1,"lineEnd":35}],"content":[{"type":"table","headers":["File/Directory","Type","Purpose"],"rows":[["app.js","Application Core","1200+ lines of vanilla JS: header scroll, hero particles, countdown, typewriter, stats rings, carousels, standings, news grid, tilt effects, confetti, ticker, toasts"],["app.test.js","Test Suite","60+ comprehensive test cases covering DOM setup, initialization, event handling, animations, accessibility (ARIA), scroll behavior, carousel navigation"],["data/matches.js","Data Module","12 FIFA 2026 match objects with home/away teams, flags, scores, venue, date, status (final/live/upcoming)"],["data/news.js","Data Module","9 news articles with title, excerpt, category, date, tag, emoji for grid rendering"],["vitest.config.js","Test Config","Vitest configuration: jsdom environment, coverage thresholds (70% lines/functions/statements, 60% branches), reporters (verbose, text, json, html, lcov)"],["package.json","Manifest","Project metadata, version 2.0.0, ES modules, scripts (dev, build, preview, test, test:watch, test:coverage, test:ui), devDependencies (vite, vitest, jsdom, coverage)"],["docs/API.md","Documentation","Developer API reference: functions, DOM structure, event API, animation states, CSS properties, configuration, error handling"],["docs/FORGE_SESSION.md","Documentation","Forge session solution: overview, task description, brand identity, logo layers, colors, typography, animations, page sections"],["docs/FORGE_WIKI.md","Documentation","Knowledge base entry: summary, architecture, generated files, implementation notes"],["docs/wiki.md","Documentation","Forge wiki metadata with generated-at timestamp, repo name, branch, section count"],["README.md","Documentation","Project overview: deliverable description, recent changes, build prompt content"],["WIKI.md","Documentation","Repository structure inventory with directory layout and key files"]]},{"type":"sourcesRow","files":[{"path":"package.json","lineStart":1,"lineEnd":23},{"path":"WIKI.md","lineStart":1,"lineEnd":35}]}]},{"id":"header-scroll-management","title":"Header Scroll Management","parentId":null,"sourceFiles":[{"path":"app.js","lineStart":23,"lineEnd":31}],"content":[{"type":"heading","level":2,"text":"Implementation"},{"type":"paragraph","text":"Monitors window scroll position and applies visual state transitions to the site header. When scrollY exceeds 60px, adds 'shrunk' class for responsive header styling (typically smaller padding, border emphasis)."},{"type":"code","language":"javascript","content":"function initHeader() {\n  const header = $('#siteHeader');\n  if (!header) return;\n  window.addEventListener('scroll', () => {\n    header.classList.toggle('shrunk', window.scrollY > 60);\n  }, { passive: true });\n}"},{"type":"paragraph","text":"Uses passive: true for scroll listener performance optimization, avoiding potential blocking during scroll."},{"type":"sourcesRow","files":[{"path":"app.js","lineStart":23,"lineEnd":31}]}]},{"id":"hero-particles","title":"Hero Particles Animation","parentId":null,"sourceFiles":[{"path":"app.js","lineStart":33,"lineEnd":58}],"content":[{"type":"heading","level":2,"text":"Overview"},{"type":"paragraph","text":"Generates 40 animated colored particles that float in the hero section with varying durations, delays, and opacities. Each particle is a div with CSS animation properties set via style attributes."},{"type":"heading","level":3,"text":"Implementation Details"},{"type":"unorderedList","items":["Creates 40 particle elements with class 'hero-particle'","Randomizes size (3–10px), color (6-color palette), opacity (0.3–0.85)","Sets position left (0–100%) and top (10–90%) for viewport coverage","Assigns animation duration (4–10s) and delay (0–8s) via CSS custom properties","Uses CSS animation (external stylesheet) to animate float/fade lifecycle"]},{"type":"code","language":"javascript","content":"function initHeroParticles() {\n  const container = $('#heroParticles');\n  if (!container) return;\n  const colours = ['#f7c948', '#00e5ff', '#1a73e8', '#ff8a65', '#81c784', '#ce93d8'];\n  const TOTAL = 40;\n\n  for (let i = 0; i < TOTAL; i++) {\n    const p = document.createElement('div');\n    p.className = 'hero-particle';\n    const size = randBetween(3, 10);\n    const col  = colours[Math.floor(Math.random() * colours.length)];\n    p.style.cssText = `\n      left: ${randBetween(0, 100)}%;\n      top:  ${randBetween(10, 90)}%;\n      width: ${size}px;\n      height: ${size}px;\n      background: ${col};\n      opacity: ${randBetween(0.3, 0.85)};\n      --dur:   ${randBetween(4, 10)}s;\n      --delay: ${randBetween(0, 8)}s;\n    `;\n    container.appendChild(p);\n  }\n}"},{"type":"sourcesRow","files":[{"path":"app.js","lineStart":33,"lineEnd":58}]}]},{"id":"countdown-timer","title":"Countdown Timer with Flip Animation","parentId":null,"sourceFiles":[{"path":"app.js","lineStart":60,"lineEnd":115}],"content":[{"type":"heading","level":2,"text":"Overview"},{"type":"paragraph","text":"Displays a live countdown to the 2026 FIFA World Cup opening kick-off (2026-06-11 18:00 EDT). Each digit unit (days, hours, minutes, seconds) triggers a CSS flip animation when the value changes."},{"type":"heading","level":3,"text":"Key Features"},{"type":"unorderedList","items":["Target date: 2026-06-11T18:00:00-05:00 (opening match)","Updates every 1000ms via setInterval","Calculates remaining days (3 digits), hours, minutes, seconds (2 digits each)","Pads values with leading zeros (days=3 digits, others=2 digits)","Triggers flip class only on value change to minimize animation reflows","Uses requestAnimationFrame/offsetWidth trick to force layout recalculation"]},{"type":"code","language":"javascript","content":"function initCountdown() {\n  const TARGET_DATE = new Date('2026-06-11T18:00:00-05:00');\n  const els = { days: $('#cdDaysVal'), hours: $('#cdHoursVal'), mins: $('#cdMinsVal'), secs: $('#cdSecsVal') };\n  if (!els.days) return;\n  const prev = { days: null, hours: null, mins: null, secs: null };\n  \n  function pad(n, digits = 2) { return String(n).padStart(digits, '0'); }\n  \n  function tick() {\n    const now  = Date.now();\n    const diff = Math.max(0, TARGET_DATE - now);\n    const d = Math.floor(diff / 86400000);\n    const h = Math.floor((diff % 86400000) / 3600000);\n    const m = Math.floor((diff % 3600000) / 60000);\n    const s = Math.floor((diff % 60000) / 1000);\n    \n    const vals = { days: pad(d, 3), hours: pad(h), mins: pad(m), secs: pad(s) };\n    Object.entries(vals).forEach(([k, v]) => {\n      if (v !== prev[k]) {\n        const el = els[k];\n        el.textContent = v;\n        el.classList.remove('flip');\n        void el.offsetWidth; // reflow for CSS animation retrigger\n        el.classList.add('flip');\n        prev[k] = v;\n      }\n    });\n  }\n  \n  tick();\n  setInterval(tick, 1000);\n}"},{"type":"heading","level":3,"text":"CSS Animation Hook"},{"type":"paragraph","text":"The flip animation (defined in external CSS) rotates/scales the digit element when the 'flip' class is applied. Removing the class before re-adding it forces CSS animation restart."},{"type":"sourcesRow","files":[{"path":"app.js","lineStart":60,"lineEnd":115}]}]},{"id":"intersection-observer-scroll-reveal","title":"Intersection Observer & Scroll Reveal","parentId":null,"sourceFiles":[{"path":"app.js","lineStart":117,"lineEnd":131}],"content":[{"type":"heading","level":2,"text":"Overview"},{"type":"paragraph","text":"Detects when sections enter the viewport and applies 'revealed' class to trigger CSS fade/slide animations. Uses IntersectionObserver API with 12% threshold to detect visibility."},{"type":"code","language":"javascript","content":"let scrollObserver;\n\nfunction initScrollReveal() {\n  const items = $$('.section-reveal');\n  scrollObserver = new IntersectionObserver((entries) => {\n    entries.forEach((entry) => {\n      if (entry.isIntersecting) {\n        entry.target.classList.add('revealed');\n        scrollObserver.unobserve(entry.target);\n      }\n    });\n  }, { threshold: 0.12 });\n  items.forEach(el => scrollObserver.observe(el));\n}"},{"type":"paragraph","text":"Once a section is revealed, it is unobserved to prevent re-triggering and improve performance."},{"type":"sourcesRow","files":[{"path":"app.js","lineStart":117,"lineEnd":131}]}]},{"id":"typewriter-headings","title":"Typewriter Headings Effect","parentId":null,"sourceFiles":[{"path":"app.js","lineStart":133,"lineEnd":173}],"content":[{"type":"heading","level":2,"text":"Overview"},{"type":"paragraph","text":"Reveals section headings character-by-character with a typewriter effect when they enter the viewport. Includes cursor blink animation and delayed removal."},{"type":"heading","level":3,"text":"Implementation"},{"type":"unorderedList","items":["Observes elements with class 'typewriter-target' via IntersectionObserver (threshold: 0.5)","Clears original text content and applies 'typewriter-active' class","Appends characters one-by-one via setTimeout with 38ms delay between characters","Applies 'done' class after final character for CSS cursor state","Removes border-right and animation classes after 3.2s (cursor blink duration)","Triggers parent <h2> reveal class and unobserves to prevent re-runs"]},{"type":"code","language":"javascript","content":"function initTypewriter() {\n  const targets = $$('.typewriter-target');\n  const observer = new IntersectionObserver((entries) => {\n    entries.forEach(entry => {\n      if (!entry.isIntersecting) return;\n      const el = entry.target;\n      const text = el.textContent;\n      el.textContent = '';\n      el.classList.add('typewriter-active');\n      let i = 0;\n      function addChar() {\n        if (i < text.length) {\n          el.textContent += text[i];\n          i++;\n          setTimeout(addChar, 38);\n        } else {\n          el.classList.add('done');\n          setTimeout(() => {\n            el.style.borderRight = 'none';\n            el.classList.remove('typewriter-active', 'done');\n          }, 3200);\n        }\n      }\n      addChar();\n      const h2 = el.closest('h2');\n      if (h2) h2.classList.add('revealed');\n      observer.unobserve(el);\n    });\n  }, { threshold: 0.5 });\n  targets.forEach(el => observer.observe(el));\n}"},{"type":"sourcesRow","files":[{"path":"app.js","lineStart":133,"lineEnd":173}]}]},{"id":"animate-count-up","title":"Animate Count-Up for Stats","parentId":null,"sourceFiles":[{"path":"app.js","lineStart":175,"lineEnd":192}],"content":[{"type":"heading","level":2,"text":"Overview"},{"type":"paragraph","text":"Animates a numeric counter from 0 to a target value with eased cubic-out timing. Used to display tournament statistics (teams, matches, goals, stadiums) with smooth visual progression."},{"type":"code","language":"javascript","content":"function animateCountUp(el, target, duration = 1600, suffix = '') {\n  const start  = performance.now();\n  const from   = 0;\n\n  function step(now) {\n    const elapsed = now - start;\n    const progress = clamp(elapsed / duration, 0, 1);\n    // Ease out cubic\n    const eased = 1 - Math.pow(1 - progress, 3);\n    const current = Math.round(from + (target - from) * eased);\n    el.textContent = current + suffix;\n    if (progress < 1) requestAnimationFrame(step);\n    else el.classList.add('bounced');\n  }\n  requestAnimationFrame(step);\n}"},{"type":"heading","level":3,"text":"Parameters"},{"type":"unorderedList","items":["el: DOM element to update","target: final numeric value","duration: animation time in milliseconds (default: 1600ms)","suffix: appended to number (e.g., '+' for 312+)"]},{"type":"paragraph","text":"Uses easing function: 1 - (1 - t)³ for cubic-out acceleration. Adds 'bounced' class on completion for optional visual emphasis."},{"type":"sourcesRow","files":[{"path":"app.js","lineStart":175,"lineEnd":192}]}]},{"id":"stats-rings","title":"Stats Rings with SVG Progress","parentId":null,"sourceFiles":[{"path":"app.js","lineStart":194,"lineEnd":228}],"content":[{"type":"heading","level":2,"text":"Overview"},{"type":"paragraph","text":"Displays tournament statistics (48 teams, 104 matches, 312+ goals, 16 stadiums) with animated SVG ring progress indicators and concurrent count-up animations."},{"type":"heading","level":3,"text":"SVG Ring Calculation"},{"type":"unorderedList","items":["Circle radius: 50px → circumference ≈ 314px","Data attribute 'data-percent' stores progress percentage (48→100%, 104→88%, 312→75%, 16→60%)","strokeDashoffset = CIRCUMFERENCE × (1 - percent) reveals ring fill from offset"]},{"type":"code","language":"javascript","content":"function initStats() {\n  const cards = $$('.stat-card');\n  const CIRCUMFERENCE = 2 * Math.PI * 50; // r=50 → ~314\n\n  const statsObserver = new IntersectionObserver((entries) => {\n    entries.forEach(entry => {\n      if (!entry.isIntersecting) return;\n\n      const card      = entry.target;\n      const ringFill  = $('.ring-fill', card);\n      const countEl   = $('.stat-count', card);\n      const target    = parseInt(countEl.dataset.target, 10);\n      const suffix    = countEl.dataset.suffix || '';\n      const percent   = parseFloat(ringFill.dataset.percent || '100') / 100;\n      const offset    = CIRCUMFERENCE * (1 - percent);\n\n      // Animate ring\n      ringFill.style.strokeDashoffset = offset;\n\n      // Animate count\n      animateCountUp(countEl, target, 1800, suffix);\n\n      statsObserver.unobserve(card);\n    });\n  }, { threshold: 0.3 });\n\n  cards.forEach(c => statsObserver.observe(c));\n}"},{"type":"sourcesRow","files":[{"path":"app.js","lineStart":194,"lineEnd":228}]}]},{"id":"confetti-burst","title":"Confetti Burst Effect","parentId":null,"sourceFiles":[{"path":"app.js","lineStart":230,"lineEnd":270}],"content":[{"type":"heading","level":2,"text":"Overview"},{"type":"paragraph","text":"Spawns 60-piece confetti explosion from a given element origin, animating each piece with randomized physics (fall duration 1.8–3.2s, sway duration 0.8–1.6s) and auto-cleanup."},{"type":"heading","level":3,"text":"Implementation"},{"type":"unorderedList","items":["Calculates origin center from element bounding rect (left + width/2, top + height/2)","Creates 60 span elements with class 'confetti-piece'","Randomizes: position offset (±80px), color (8-color palette), size (7–14px width, 10–18px height), shape (50% circles)","Sets animation CSS properties: --fall-dur (gravity), --fall-delay (stagger), --sway-dur (horizontal oscillation)","Removes all pieces after 3.8s via setTimeout"]},{"type":"code","language":"javascript","content":"const CONFETTI_COLOURS = ['#f7c948', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];\n\nfunction burstConfetti(originEl) {\n  const container = $('#confettiContainer');\n  if (!container) return;\n\n  const rect  = originEl.getBoundingClientRect();\n  const originX = rect.left + rect.width  / 2;\n  const originY = rect.top  + rect.height / 2;\n  const pieces = [];\n\n  for (let i = 0; i < 60; i++) {\n    const span = document.createElement('span');\n    span.className = 'confetti-piece';\n    span.style.cssText = `\n      left: ${originX + randBetween(-80, 80)}px;\n      background: ${CONFETTI_COLOURS[Math.floor(Math.random() * CONFETTI_COLOURS.length)]};\n      width: ${randBetween(7, 14)}px;\n      height: ${randBetween(10, 18)}px;\n      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};\n      --fall-dur: ${randBetween(1.8, 3.2)}s;\n      --fall-delay: ${randBetween(0, 0.6)}s;\n      --sway-dur: ${randBetween(0.8, 1.6)}s;\n    `;\n    container.appendChild(span);\n    pieces.push(span);\n  }\n\n  setTimeout(() => { pieces.forEach(p => p.remove()); }, 3800);\n}"},{"type":"sourcesRow","files":[{"path":"app.js","lineStart":230,"lineEnd":270}]}]},{"id":"match-carousel","title":"Match Carousel with Swipe & Dots","parentId":null,"sourceFiles":[{"path":"app.js","lineStart":272,"lineEnd":380}],"content":[{"type":"heading","level":2,"text":"Overview"},{"type":"paragraph","text":"Horizontal carousel displaying FIFA 2026 match cards with prev/next button navigation, dot indicators, keyboard support, and touch swipe gestures."},{"type":"heading","level":3,"text":"Features"},{"type":"unorderedList","items":["Renders 10 match cards from data/matches.js with home/away teams, flags, scores, venue, date","Prev/Next buttons navigate by single slide with wrap-around","Dot indicator navigation: click dot to jump to slide, active dot highlights current index","Keyboard: ArrowLeft/Right to navigate, ArrowUp/Down to focus first focusable element in slide","Touch swipe: horizontal drag to slide, velocity-based continuation","Confetti burst on final match (index 9) for celebration effect","Auto-scroll: optional ticker at bottom with cloned content for continuous loop"]},{"type":"heading","level":3,"text":"HTML Data Structure"},{"type":"code","language":"javascript","content":"const matchCard = `\n  <div class=\"match-card\">\n    <div class=\"match-status ${match.status}\">${match.status.toUpperCase()}</div>\n    <div class=\"match-stage\">${match.stage}</div>\n    <div class=\"match-score\">\n      <div class=\"team home\">\n        <div class=\"flag\">${match.homeFlag}</div>\n        <div class=\"name\">${match.home}</div>\n        <div class=\"score\">${match.homeScore}</div>\n      </div>\n      <div class=\"divider\">vs</div>\n      <div class=\"team away\">\n        <div class=\"score\">${match.awayScore}</div>\n        <div class=\"name\">${match.away}</div>\n        <div class=\"flag\">${match.awayFlag}</div>\n      </div>\n    </div>\n    <div class=\"match-footer\">\n      <div class=\"venue\">${match.venue}</div>\n      <div class=\"datetime\"><span class=\"date\">${match.date}</span> · <span class=\"time\">${match.time}</span></div>\n    </div>\n  </div>\n`"},{"type":"sourcesRow","files":[{"path":"app.js","lineStart":272,"lineEnd":380}]}]},{"id":"group-standings","title":"Group Standings with Tab Filtering","parentId":null,"sourceFiles":[{"path":"app.js","lineStart":382,"lineEnd":480}],"content":[{"type":"heading","level":2,"text":"Overview"},{"type":"paragraph","text":"Displays FIFA 2026 group standings with tab-based filtering. Users select group (A–H) to view participating teams with rank, points, goals for/against."},{"type":"heading","level":3,"text":"Data Structure"},{"type":"code","language":"javascript","content":"const standings = {\n  'A': [\n    { rank: 1, country: 'Canada', flag: '🇨🇦', points: 9, played: 3, wins: 3, draws: 0, losses: 0, gf: 8, ga: 2, gd: 6 },\n    { rank: 2, country: 'Mexico', flag: '🇲🇽', points: 6, played: 3, wins: 2, draws: 0, losses: 1, gf: 5, ga: 4, gd: 1 },\n    { rank: 3, country: 'USA', flag: '🇺🇸', points: 3, played: 3, wins: 1, draws: 0, losses: 2, gf: 6, ga: 7, gd: -1 },\n    { rank: 4, country: 'Panama', flag: '🇵🇦', points: 0, played: 3, wins: 0, draws: 0, losses: 3, gf: 2, ga: 8, gd: -6 }\n  ],\n  // ... groups B through H\n}"},{"type":"heading","level":3,"text":"Interaction"},{"type":"unorderedList","items":["Renders tab buttons for groups A–H","Default active tab: Group A","Click tab → updates standings table with group teams","Table shows rank, flag, country, played, wins-draws-losses, goals for/against, goal difference, points","Points calculated: 3 per win, 1 per draw, 0 per loss"]},{"type":"sourcesRow","files":[{"path":"app.js","lineStart":382,"lineEnd":480}]}]},{"id":"news-grid","title":"News Grid & Article Display","parentId":null,"sourceFiles":[{"path":"app.js","lineStart":482,"lineEnd":540},{"path":"data/news.js","lineStart":1,"lineEnd":90}],"content":[{"type":"heading","level":2,"text":"Overview"},{"type":"paragraph","text":"Renders 9 news articles in a grid layout with category badges, emoji icons, titles, excerpts, and publication dates."},{"type":"heading","level":3,"text":"Article Data"},{"type":"table","headers":["Field","Type","Example"],"rows":[["title","string","Brazil Edge Argentina in Quarter-Final Thriller"],["excerpt","string","Neymar scored twice as Brazil overcame..."],["category","string","Match Report | Awards | Broadcast | Tactics"],["date","string","Jul 5, 2026"],["tag","string","Final Score | Award | Stats | Deep Dive"],["emoji","string","⚽ | 🏆 | 📺 | 🎯 | 🌟 | 🗺️ | 🎬 | 🌱"]]},{"type":"heading","level":3,"text":"HTML Structure"},{"type":"code","language":"javascript","content":"const newsCard = `\n  <article class=\"news-card\">\n    <div class=\"news-icon\">${item.emoji}</div>\n    <div class=\"news-badge\" data-category=\"${item.category}\">${item.category}</div>\n    <h3 class=\"news-title\">${item.title}</h3>\n    <p class=\"news-excerpt\">${item.excerpt}</p>\n    <footer class=\"news-footer\">\n      <span class=\"news-tag\">${item.tag}</span>\n      <time class=\"news-date\">${item.date}</time>\n    </footer>\n  </article>\n`"},{"type":"sourcesRow","files":[{"path":"app.js","lineStart":482,"lineEnd":540},{"path":"data/news.js","lineStart":1,"lineEnd":90}]}]},{"id":"toast-notifications","title":"Toast Notifications","parentId":null,"sourceFiles":[{"path":"app.js","lineStart":542,"lineEnd":570}],"content":[{"type":"heading","level":2,"text":"Overview"},{"type":"paragraph","text":"Displays dismissible toast notifications for user feedback (e.g., 'Tickets purchased!', 'Group selected'). Auto-removes after 3.5 seconds or on user dismiss."},{"type":"code","language":"javascript","content":"function showToast(message, type = 'info', duration = 3500) {\n  const container = $('#toastContainer');\n  if (!container) return;\n\n  const toast = document.createElement('div');\n  toast.className = `toast toast--${type}`;\n  toast.textContent = message;\n  toast.setAttribute('role', 'alert');\n  toast.setAttribute('aria-live', 'polite');\n\n  container.appendChild(toast);\n\n  // Trigger entrance animation via reflow\n  void toast.offsetHeight;\n  toast.classList.add('shown');\n\n  // Auto-remove after duration\n  const timeout = setTimeout(() => {\n    toast.classList.remove('shown');\n    setTimeout(() => toast.remove(), 300);\n  }, duration);\n\n  // Allow manual dismiss\n  toast.addEventListener('click', () => {\n    clearTimeout(timeout);\n    toast.classList.remove('shown');\n    setTimeout(() => toast.remove(), 300);\n  });\n}"},{"type":"heading","level":3,"text":"Accessibility"},{"type":"unorderedList","items":["role='alert' announces toast to screen readers","aria-live='polite' ensures async announcement","Manual dismiss on click for user control"]},{"type":"sourcesRow","files":[{"path":"app.js","lineStart":542,"lineEnd":570}]}]},{"id":"ticker-animation","title":"Ticker: Continuous Result Loop","parentId":null,"sourceFiles":[{"path":"app.js","lineStart":572,"lineEnd":615}],"content":[{"type":"heading","level":2,"text":"Overview"},{"type":"paragraph","text":"Displays live match results in a horizontally scrolling ticker with seamless loop. Content clones append to create infinite scroll effect."},{"type":"heading","level":3,"text":"Implementation"},{"type":"unorderedList","items":["Ticker content div contains result items (e.g., '🇧🇷 Brazil 3–1 Argentina 🇦🇷')","Clones entire content and appends to create double-length track","CSS animation: translate X from 0 to -50% over 20–30s (seamless loop duration)","When animation completes (or during reset), swaps position back to start without visible glitch","Optional: add/remove items dynamically by updating content and re-cloning"]},{"type":"code","language":"javascript","content":"function initTicker() {\n  const track = $('#tickerTrack');\n  const content = $('#tickerContent');\n  if (!track || !content) return;\n\n  // Clone content for seamless loop\n  const clone = content.cloneNode(true);\n  track.appendChild(clone);\n\n  // Optional: Handle animation restart for true seamless loop\n  let animationPaused = false;\n  track.addEventListener('animationiteration', () => {\n    // Track completes one cycle; could add logic here to update results\n  });\n\n  // Pause on hover for readability\n  track.addEventListener('mouseenter', () => {\n    track.style.animationPlayState = 'paused';\n  });\n  track.addEventListener('mouseleave', () => {\n    track.style.animationPlayState = 'running';\n  });\n}"},{"type":"sourcesRow","files":[{"path":"app.js","lineStart":572,"lineEnd":615}]}]},{"id":"3d-tilt-effect","title":"3D Tilt Effect on Match Cards","parentId":null,"sourceFiles":[{"path":"app.js","lineStart":617,"lineEnd":680}],"content":[{"type":"heading","level":2,"text":"Overview"},{"type":"paragraph","text":"Cursor-reactive 3D tilt effect on match cards. As user moves mouse over card, the card perspective skews toward cursor position, creating parallax illusion."},{"type":"heading","level":3,"text":"Implementation"},{"type":"unorderedList","items":["Listens for mousemove on match-card elements","Calculates mouse offset from card center (clientX/Y - card rect center)","Maps offset range (±width/2, ±height/2) to tilt range (±max-angle, typically ±8–12°)","Applies CSS transform: skew/rotateX/rotateY based on delta","On mouseleave: resets transform to neutral position","Uses requestAnimationFrame for smooth updates"]},{"type":"code","language":"javascript","content":"function initCardTilt() {\n  const cards = $$('.match-card');\n  const MAX_TILT = 8; // degrees\n\n  cards.forEach(card => {\n    card.addEventListener('mousemove', (e) => {\n      const rect = card.getBoundingClientRect();\n      const centerX = rect.left + rect.width / 2;\n      const centerY = rect.top + rect.height / 2;\n      const deltaX = e.clientX - centerX;\n      const deltaY = e.clientY - centerY;\n\n      const tiltX = (deltaY / (rect.height / 2)) * MAX_TILT;\n      const tiltY = (deltaX / (rect.width / 2)) * MAX_TILT;\n\n      card.style.transform = `perspective(1000px) rotateX(${-tiltX}deg) rotateY(${tiltY}deg)`;\n    });\n\n    card.addEventListener('mouseleave', () => {\n      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';\n    });\n  });\n}"},{"type":"sourcesRow","files":[{"path":"app.js","lineStart":617,"lineEnd":680}]}]},{"id":"test-suite-overview","title":"Test Suite Overview","parentId":null,"sourceFiles":[{"path":"app.test.js","lineStart":1,"lineEnd":100},{"path":"vitest.config.js","lineStart":1,"lineEnd":28}],"content":[{"type":"heading","level":2,"text":"Test Infrastructure"},{"type":"paragraph","text":"Comprehensive test suite using Vitest with jsdom environment. 60+ test cases covering DOM setup, initialization, event handling, animations, accessibility, and stress testing."},{"type":"heading","level":3,"text":"Vitest Configuration"},{"type":"table","headers":["Setting","Value","Purpose"],"rows":[["environment","jsdom","Browser-like DOM simulation"],["globals","true","Enables describe/it/expect without imports"],["testTimeout","10000","Allow long-running animation tests"],["coverage.provider","v8","JavaScript coverage instrumentation"],["coverage.reporters","[text, json, html, lcov]","Multiple report formats"],["coverage.thresholds.lines","70","Minimum 70% line coverage required"],["coverage.thresholds.functions","70","Minimum 70% function coverage required"],["coverage.thresholds.branches","60","Minimum 60% branch coverage required"],["coverage.thresholds.statements","70","Minimum 70% statement coverage required"]]},{"type":"heading","level":3,"text":"Test Structure"},{"type":"unorderedList","items":["setupDOM(): Creates complete HTML structure matching production layout","Mock data: vitest mocks data/matches.js and data/news.js with fixture data","Parallel execution: Independent test suites cover isolated concerns","Async handling: setInterval/setTimeout tests managed via vi.useFakeTimers()"]},{"type":"sourcesRow","files":[{"path":"app.test.js","lineStart":1,"lineEnd":100},{"path":"vitest.config.js","lineStart":1,"lineEnd":28}]}]},{"id":"test-coverage-areas","title":"Test Coverage Areas","parentId":null,"sourceFiles":[{"path":"app.test.js","lineStart":100,"lineEnd":600}],"content":[{"type":"heading","level":2,"text":"Test Categories"},{"type":"heading","level":3,"text":"DOM Setup & Initialization"},{"type":"unorderedList","items":["Verifies all required elements are present (header, hero, countdown, stats, carousel, standings, news, toasts, confetti)","Validates element IDs and classes match selectors used by app.js","Tests setupDOM resilience to missing optional elements"]},{"type":"heading","level":3,"text":"Countdown Timer"},{"type":"unorderedList","items":["Tests initial countdown calculation (days, hours, minutes, seconds from target date)","Verifies padding (3 digits for days, 2 digits for hours/mins/secs)","Validates flip class applies and removes correctly on value change","Checks zero-floor on negative remaining time"]},{"type":"heading","level":3,"text":"Scroll Reveal & Intersection Observer"},{"type":"unorderedList","items":["Mocks IntersectionObserver to simulate scroll events","Verifies 'revealed' class applied on intersection","Confirms unobserve called after reveal to prevent re-triggering"]},{"type":"heading","level":3,"text":"Hero Particles"},{"type":"unorderedList","items":["Tests 40 particles created with correct class","Validates randomized size, color, opacity, duration, delay","Checks CSS properties set via style attribute"]},{"type":"heading","level":3,"text":"Match Carousel Navigation"},{"type":"unorderedList","items":["Tests prev/next button click events advance carousel index","Verifies wrap-around: next at end goes to 0, prev at 0 goes to last","Validates dot navigation: clicking dot jumps to corresponding slide","Tests keyboard ArrowLeft/ArrowRight navigation","Checks touch swipe delta and velocity calculations"]},{"type":"heading","level":3,"text":"Group Standings Tab Filtering"},{"type":"unorderedList","items":["Tests tab button creation for groups A–H","Verifies click updates table with correct group teams","Validates team rank, points, goal differential calculations","Checks active tab visual state updates"]},{"type":"heading","level":3,"text":"News Grid Rendering"},{"type":"unorderedList","items":["Tests 9 news articles rendered with correct structure","Validates title, excerpt, category, tag, date, emoji fields","Checks category badge data-attributes for filtering capability"]},{"type":"heading","level":3,"text":"Stats Count-Up & Rings"},{"type":"unorderedList","items":["Tests animateCountUp() easing calculation (cubic-out)","Validates final count matches target value","Checks SVG ring strokeDashoffset calculation from percent data","Verifies 'bounced' class applied on animation complete"]},{"type":"heading","level":3,"text":"Typewriter Heading Animation"},{"type":"unorderedList","items":["Tests character-by-character reveal with correct timing (38ms intervals)","Validates 'typewriter-active' and 'done' classes applied/removed","Checks border-right style cleared after cursor blink duration"]},{"type":"heading","level":3,"text":"Toast Notifications"},{"type":"unorderedList","items":["Tests showToast() creates notification div with message","Validates toast type class (info/success/error/warning)","Checks auto-removal after duration (3.5s default)","Tests manual dismiss on click with cleanup"]},{"type":"heading","level":3,"text":"Confetti Burst"},{"type":"unorderedList","items":["Tests 60 confetti pieces created from origin element","Validates randomized physics (fall duration, sway duration)","Checks auto-cleanup after 3.8s","Verifies color palette selection and shape variation"]},{"type":"heading","level":3,"text":"3D Tilt Effect"},{"type":"unorderedList","items":["Tests mousemove updates transform perspective/rotateX/rotateY","Validates tilt angle calculation from cursor delta","Checks mouseleave resets transform to neutral"]},{"type":"heading","level":3,"text":"Accessibility (ARIA)"},{"type":"unorderedList","items":["Verifies status elements have role='status' and aria-live='polite'","Tests button elements have aria-label or accessible text","Checks ARIA attributes persist after DOM updates","Validates semantic HTML (nav, section, article, footer)"]},{"type":"heading","level":3,"text":"Motion Preferences & Animations"},{"type":"unorderedList","items":["Tests prefers-reduced-motion: reduce disables animations","Validates countdown, particles, stats, confetti skip when motion-reduce","Checks keyboard users can bypass animations via interaction"]},{"type":"heading","level":3,"text":"Stress & Integrity Tests"},{"type":"unorderedList","items":["Rapid carousel navigation without race conditions","Simultaneous carousel + stats animation without overlap","Multiple toast notifications queue correctly","Memory cleanup: no lingering event listeners after unobserve","DOM element reuse: carousel dots re-render without duplicates"]},{"type":"sourcesRow","files":[{"path":"app.test.js","lineStart":100,"lineEnd":600}]}]},{"id":"data-modules","title":"Data Modules: Matches & News","parentId":null,"sourceFiles":[{"path":"data/matches.js","lineStart":1,"lineEnd":150},{"path":"data/news.js","lineStart":1,"lineEnd":90}],"content":[{"type":"heading","level":2,"text":"Matches Data"},{"type":"paragraph","text":"Exports array of 12 FIFA 2026 match fixtures with complete tournament metadata."},{"type":"heading","level":3,"text":"Match Object Schema"},{"type":"table","headers":["Field","Type","Example"],"rows":[["id","number","1–12"],["home","string","Brazil"],["away","string","Argentina"],["homeFlag","emoji","🇧🇷"],["awayFlag","emoji","🇦🇷"],["homeScore","number","3"],["awayScore","number","1"],["status","enum","final | live | upcoming"],["stage","string","Quarter Final | Group Stage · Group B"],["venue","string","MetLife Stadium, New Jersey"],["date","string","Jul 5, 2026"],["time","string","FT | 72' | 15:00 ET"]]},{"type":"heading","level":3,"text":"Sample Data"},{"type":"code","language":"javascript","content":"export const matches = [\n  {\n    id: 1,\n    home: 'Brazil',\n    away: 'Argentina',\n    homeFlag: '🇧🇷',\n    awayFlag: '🇦🇷',\n    homeScore: 3,\n    awayScore: 1,\n    status: 'final',\n    stage: 'Quarter Final',\n    venue: 'MetLife Stadium, New Jersey',\n    date: 'Jul 5, 2026',\n    time: 'FT',\n  },\n  // ... 11 more matches\n];"},{"type":"heading","level":2,"text":"News Data"},{"type":"paragraph","text":"Exports array of 9 FIFA 2026 news articles with category, tags, and emoji icons."},{"type":"heading","level":3,"text":"News Object Schema"},{"type":"table","headers":["Field","Type","Example"],"rows":[["title","string","Brazil Edge Argentina in Quarter-Final Thriller"],["excerpt","string","Neymar scored twice as Brazil overcame..."],["category","string","Match Report | Awards | Broadcast | Tactics"],["date","string","Jul 5, 2026"],["tag","string","Final Score | Award | Stats | Deep Dive"],["emoji","string","⚽ | 🏆 | 📺 | 🎯"]]},{"type":"heading","level":3,"text":"Sample Data"},{"type":"code","language":"javascript","content":"export const newsItems = [\n  {\n    title: 'Brazil Edge Argentina in Quarter-Final Thriller',\n    excerpt: 'Neymar scored twice as Brazil overcame their fiercest rivals in a pulsating 3–1 victory at MetLife Stadium.',\n    category: 'Match Report',\n    date: 'Jul 5, 2026',\n    tag: 'Final Score',\n    emoji: '⚽',\n  },\n  {\n    title: \"Mbappé Named Player of the Tournament\",\n    excerpt: \"France's captain delivered a sensational campaign with 8 goals and 4 assists — the most lethal performer in 2026.\",\n    category: 'Awards',\n    date: 'Jul 12, 2026',\n    tag: 'Award',\n    emoji: '🏆',\n  },\n  // ... 7 more articles\n];"},{"type":"sourcesRow","files":[{"path":"data/matches.js","lineStart":1,"lineEnd":150},{"path":"data/news.js","lineStart":1,"lineEnd":90}]}]},{"id":"npm-scripts","title":"NPM Scripts & Development","parentId":null,"sourceFiles":[{"path":"package.json","lineStart":7,"lineEnd":14}],"content":[{"type":"heading","level":2,"text":"Available Scripts"},{"type":"table","headers":["Command","Purpose","Details"],"rows":[["npm run dev","Development server","Launches Vite dev server with HMR (hot module replacement) for instant refresh on file changes"],["npm run build","Production build","Creates optimized bundle for deployment via Vite (minification, tree-shaking, code splitting)"],["npm run preview","Preview build","Serves production-ready build locally to verify build output before deployment"],["npm test","Run tests once","Executes full Vitest suite with coverage report (70% line/function/statement, 60% branch thresholds)"],["npm run test:watch","Watch mode","Vitest watch mode: re-runs tests on file change for TDD development"],["npm run test:coverage","Coverage analysis","Generates detailed coverage reports in ./coverage directory (text, JSON, HTML, LCOV formats)"],["npm run test:ui","Test UI dashboard","Launches interactive Vitest UI for visual test exploration and debugging"]]},{"type":"heading","level":2,"text":"Dependencies"},{"type":"table","headers":["Package","Version","Purpose"],"rows":[["vite","^5.2.0","Modern bundler and dev server"],["vitest","^1.6.0","Unit test framework (Vitest core)"],["@vitest/ui","^1.6.0","Interactive UI for test visualization"],["@vitest/coverage-v8","^1.6.0","V8 coverage instrumentation and reporting"],["jsdom","^24.0.0","Browser-like DOM simulation for testing"]]},{"type":"sourcesRow","files":[{"path":"package.json","lineStart":7,"lineEnd":14}]}]},{"id":"utility-functions","title":"Utility Functions","parentId":null,"sourceFiles":[{"path":"app.js","lineStart":15,"lineEnd":21}],"content":[{"type":"heading","level":2,"text":"DOM Query Helpers"},{"type":"code","language":"javascript","content":"const $ = (sel, ctx = document) => ctx.querySelector(sel);\nconst $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];"},{"type":"paragraph","text":"Shorthand functions for single and multiple element selection. The $$ function converts NodeList to Array for easier iteration."},{"type":"heading","level":2,"text":"Math Helpers"},{"type":"code","language":"javascript","content":"function lerp(a, b, t) { return a + (b - a) * t; }\n\nfunction clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }\n\nfunction randBetween(a, b) { return a + Math.random() * (b - a); }"},{"type":"paragraph","text":"lerp: Linear interpolation between two values (used for smooth transitions). clamp: Constrains value within min/max range. randBetween: Random float between two values (used for particle/animation randomization)."},{"type":"sourcesRow","files":[{"path":"app.js","lineStart":15,"lineEnd":21}]}]}]}
```

# ali1092-SC/samplefootballapp

> FIFA World Cup 2026 fan showcase with interactive animations, countdown timers, match carousels, stats rings, confetti effects, and comprehensive test coverage.

## Overview

The FIFA World Cup 2026 fan showcase is a single-page browser application featuring a complete, self-contained HTML file with no external dependencies beyond Google Fonts. It delivers an official-style fan experience with inline CSS, vanilla JavaScript, and hand-coded SVG assets.

The application includes: inline SVG FIFA 2026 logo at three responsive sizes, HTML5 Canvas football animation with pentagon patches, live countdown timer with flip-digit animations, seamlessly looping ticker with live results, IntersectionObserver-driven count-up stats with SVG ring progress indicators, scroll-reveal animations, typewriter heading effects, cursor-reactive 3D tilt on match cards, carousel with swipe support, group standings tabs, news grid, confetti burst effects, toast notifications, and full ARIA accessibility with prefers-reduced-motion guards throughout.

The application supports responsive breakpoints down to 375px, scroll-shrink header, hero particle animations, and comprehensive test coverage with 60+ test cases across state management, DOM synchronization, accessibility features, and stress-integrity validation using Vitest and jsdom.

## System Architecture

### Architecture Overview

The application is built on vanilla JavaScript with a modular initialization pattern. Each UI feature is initialized independently via separate functions, managing its own state, DOM queries, event listeners, and animation lifecycle. The codebase exports match and news data as ES modules, enabling both application rendering and test mocking.

#### Core Components

- Header Scroll Management: Detects scroll position >60px to apply 'shrunk' class for visual state transitions
- Hero Particles: Generates 40 animated colored particles with randomized duration, delay, and positioning for visual interest
- Countdown Timer: Displays days/hours/minutes/seconds until 2026-06-11 opening kick-off with flip-digit CSS animations
- Scroll Reveal: IntersectionObserver reveals sections at 12% threshold, manages reveal class state
- Typewriter Headings: Character-by-character reveal animation with cursor blink and delayed removal
- Animate Count-Up: Progressive number animation with eased cubic-out timing for stat counters
- Stats Rings: SVG circle progress indicators with animated stroke-dashoffset and concurrent count-up
- Confetti Burst: 60-piece confetti explosion from origin element with randomized physics and auto-cleanup
- 3D Tilt: Cursor-reactive transform skew on match cards using clientX/Y delta from card center
- Match Carousel: Horizontal slide carousel with prev/next buttons and dot navigation
- Group Standings: Tab-based standings display with group filtering and team rank tables
- News Grid: Grid layout with category badges, emoji icons, and date labels
- Toast Notifications: Dismissible alerts with auto-cleanup after 3.5 seconds
- Ticker: Continuously looping result ticker with clone-append animation loop

## Package & File Structure

| File/Directory | Type | Purpose |
| --- | --- | --- |
| app.js | Application Core | 1200+ lines of vanilla JS: header scroll, hero particles, countdown, typewriter, stats rings, carousels, standings, news grid, tilt effects, confetti, ticker, toasts |
| app.test.js | Test Suite | 60+ comprehensive test cases covering DOM setup, initialization, event handling, animations, accessibility (ARIA), scroll behavior, carousel navigation |
| data/matches.js | Data Module | 12 FIFA 2026 match objects with home/away teams, flags, scores, venue, date, status (final/live/upcoming) |
| data/news.js | Data Module | 9 news articles with title, excerpt, category, date, tag, emoji for grid rendering |
| vitest.config.js | Test Config | Vitest configuration: jsdom environment, coverage thresholds (70% lines/functions/statements, 60% branches), reporters (verbose, text, json, html, lcov) |
| package.json | Manifest | Project metadata, version 2.0.0, ES modules, scripts (dev, build, preview, test, test:watch, test:coverage, test:ui), devDependencies (vite, vitest, jsdom, coverage) |
| docs/API.md | Documentation | Developer API reference: functions, DOM structure, event API, animation states, CSS properties, configuration, error handling |
| docs/FORGE_SESSION.md | Documentation | Forge session solution: overview, task description, brand identity, logo layers, colors, typography, animations, page sections |
| docs/FORGE_WIKI.md | Documentation | Knowledge base entry: summary, architecture, generated files, implementation notes |
| docs/wiki.md | Documentation | Forge wiki metadata with generated-at timestamp, repo name, branch, section count |
| README.md | Documentation | Project overview: deliverable description, recent changes, build prompt content |
| WIKI.md | Documentation | Repository structure inventory with directory layout and key files |

## Header Scroll Management

### Implementation

Monitors window scroll position and applies visual state transitions to the site header. When scrollY exceeds 60px, adds 'shrunk' class for responsive header styling (typically smaller padding, border emphasis).

```javascript
function initHeader() {
  const header = $('#siteHeader');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('shrunk', window.scrollY > 60);
  }, { passive: true });
}
```

Uses passive: true for scroll listener performance optimization, avoiding potential blocking during scroll.

## Hero Particles Animation

### Overview

Generates 40 animated colored particles that float in the hero section with varying durations, delays, and opacities. Each particle is a div with CSS animation properties set via style attributes.

#### Implementation Details

- Creates 40 particle elements with class 'hero-particle'
- Randomizes size (3–10px), color (6-color palette), opacity (0.3–0.85)
- Sets position left (0–100%) and top (10–90%) for viewport coverage
- Assigns animation duration (4–10s) and delay (0–8s) via CSS custom properties
- Uses CSS animation (external stylesheet) to animate float/fade lifecycle

```javascript
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
```

## Countdown Timer with Flip Animation

### Overview

Displays a live countdown to the 2026 FIFA World Cup opening kick-off (2026-06-11 18:00 EDT). Each digit unit (days, hours, minutes, seconds) triggers a CSS flip animation when the value changes.

#### Key Features

- Target date: 2026-06-11T18:00:00-05:00 (opening match)
- Updates every 1000ms via setInterval
- Calculates remaining days (3 digits), hours, minutes, seconds (2 digits each)
- Pads values with leading zeros (days=3 digits, others=2 digits)
- Triggers flip class only on value change to minimize animation reflows
- Uses requestAnimationFrame/offsetWidth trick to force layout recalculation

```javascript
function initCountdown() {
  const TARGET_DATE = new Date('2026-06-11T18:00:00-05:00');
  const els = { days: $('#cdDaysVal'), hours: $('#cdHoursVal'), mins: $('#cdMinsVal'), secs: $('#cdSecsVal') };
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
    
    const vals = { days: pad(d, 3), hours: pad(h), mins: pad(m), secs: pad(s) };
    Object.entries(vals).forEach(([k, v]) => {
      if (v !== prev[k]) {
        const el = els[k];
        el.textContent = v;
        el.classList.remove('flip');
        void el.offsetWidth; // reflow for CSS animation retrigger
        el.classList.add('flip');
        prev[k] = v;
      }
    });
  }
  
  tick();
  setInterval(tick, 1000);
}
```

#### CSS Animation Hook

The flip animation (defined in external CSS) rotates/scales the digit element when the 'flip' class is applied. Removing the class before re-adding it forces CSS animation restart.

## Intersection Observer & Scroll Reveal

### Overview

Detects when sections enter the viewport and applies 'revealed' class to trigger CSS fade/slide animations. Uses IntersectionObserver API with 12% threshold to detect visibility.

```javascript
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
```

Once a section is revealed, it is unobserved to prevent re-triggering and improve performance.

## Typewriter Headings Effect

### Overview

Reveals section headings character-by-character with a typewriter effect when they enter the viewport. Includes cursor blink animation and delayed removal.

#### Implementation

- Observes elements with class 'typewriter-target' via IntersectionObserver (threshold: 0.5)
- Clears original text content and applies 'typewriter-active' class
- Appends characters one-by-one via setTimeout with 38ms delay between characters
- Applies 'done' class after final character for CSS cursor state
- Removes border-right and animation classes after 3.2s (cursor blink duration)
- Triggers parent <h2> reveal class and unobserves to prevent re-runs

```javascript
function initTypewriter() {
  const targets = $$('.typewriter-target');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const text = el.textContent;
      el.textContent = '';
      el.classList.add('typewriter-active');
      let i = 0;
      function addChar() {
        if (i < text.length) {
          el.textContent += text[i];
          i++;
          setTimeout(addChar, 38);
        } else {
          el.classList.add('done');
          setTimeout(() => {
            el.style.borderRight = 'none';
            el.classList.remove('typewriter-active', 'done');
          }, 3200);
        }
      }
      addChar();
      const h2 = el.closest('h2');
      if (h2) h2.classList.add('revealed');
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  targets.forEach(el => observer.observe(el));
}
```

## Animate Count-Up for Stats

### Overview

Animates a numeric counter from 0 to a target value with eased cubic-out timing. Used to display tournament statistics (teams, matches, goals, stadiums) with smooth visual progression.

```javascript
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
```

#### Parameters

- el: DOM element to update
- target: final numeric value
- duration: animation time in milliseconds (default: 1600ms)
- suffix: appended to number (e.g., '+' for 312+)

Uses easing function: 1 - (1 - t)³ for cubic-out acceleration. Adds 'bounced' class on completion for optional visual emphasis.

## Stats Rings with SVG Progress

### Overview

Displays tournament statistics (48 teams, 104 matches, 312+ goals, 16 stadiums) with animated SVG ring progress indicators and concurrent count-up animations.

#### SVG Ring Calculation

- Circle radius: 50px → circumference ≈ 314px
- Data attribute 'data-percent' stores progress percentage (48→100%, 104→88%, 312→75%, 16→60%)
- strokeDashoffset = CIRCUMFERENCE × (1 - percent) reveals ring fill from offset

```javascript
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
```

## Confetti Burst Effect

### Overview

Spawns 60-piece confetti explosion from a given element origin, animating each piece with randomized physics (fall duration 1.8–3.2s, sway duration 0.8–1.6s) and auto-cleanup.

#### Implementation

- Calculates origin center from element bounding rect (left + width/2, top + height/2)
- Creates 60 span elements with class 'confetti-piece'
- Randomizes: position offset (±80px), color (8-color palette), size (7–14px width, 10–18px height), shape (50% circles)
- Sets animation CSS properties: --fall-dur (gravity), --fall-delay (stagger), --sway-dur (horizontal oscillation)
- Removes all pieces after 3.8s via setTimeout

```javascript
const CONFETTI_COLOURS = ['#f7c948', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];

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

  setTimeout(() => { pieces.forEach(p => p.remove()); }, 3800);
}
```

## Match Carousel with Swipe & Dots

### Overview

Horizontal carousel displaying FIFA 2026 match cards with prev/next button navigation, dot indicators, keyboard support, and touch swipe gestures.

#### Features

- Renders 10 match cards from data/matches.js with home/away teams, flags, scores, venue, date
- Prev/Next buttons navigate by single slide with wrap-around
- Dot indicator navigation: click dot to jump to slide, active dot highlights current index
- Keyboard: ArrowLeft/Right to navigate, ArrowUp/Down to focus first focusable element in slide
- Touch swipe: horizontal drag to slide, velocity-based continuation
- Confetti burst on final match (index 9) for celebration effect
- Auto-scroll: optional ticker at bottom with cloned content for continuous loop

#### HTML Data Structure

```javascript
const matchCard = `
  <div class="match-card">
    <div class="match-status ${match.status}">${match.status.toUpperCase()}</div>
    <div class="match-stage">${match.stage}</div>
    <div class="match-score">
      <div class="team home">
        <div class="flag">${match.homeFlag}</div>
        <div class="name">${match.home}</div>
        <div class="score">${match.homeScore}</div>
      </div>
      <div class="divider">vs</div>
      <div class="team away">
        <div class="score">${match.awayScore}</div>
        <div class="name">${match.away}</div>
        <div class="flag">${match.awayFlag}</div>
      </div>
    </div>
    <div class="match-footer">
      <div class="venue">${match.venue}</div>
      <div class="datetime"><span class="date">${match.date}</span> · <span class="time">${match.time}</span></div>
    </div>
  </div>
`
```

## Group Standings with Tab Filtering

### Overview

Displays FIFA 2026 group standings with tab-based filtering. Users select group (A–H) to view participating teams with rank, points, goals for/against.

#### Data Structure

```javascript
const standings = {
  'A': [
    { rank: 1, country: 'Canada', flag: '🇨🇦', points: 9, played: 3, wins: 3, draws: 0, losses: 0, gf: 8, ga: 2, gd: 6 },
    { rank: 2, country: 'Mexico', flag: '🇲🇽', points: 6, played: 3, wins: 2, draws: 0, losses: 1, gf: 5, ga: 4, gd: 1 },
    { rank: 3, country: 'USA', flag: '🇺🇸', points: 3, played: 3, wins: 1, draws: 0, losses: 2, gf: 6, ga: 7, gd: -1 },
    { rank: 4, country: 'Panama', flag: '🇵🇦', points: 0, played: 3, wins: 0, draws: 0, losses: 3, gf: 2, ga: 8, gd: -6 }
  ],
  // ... groups B through H
}
```

#### Interaction

- Renders tab buttons for groups A–H
- Default active tab: Group A
- Click tab → updates standings table with group teams
- Table shows rank, flag, country, played, wins-draws-losses, goals for/against, goal difference, points
- Points calculated: 3 per win, 1 per draw, 0 per loss

## News Grid & Article Display

### Overview

Renders 9 news articles in a grid layout with category badges, emoji icons, titles, excerpts, and publication dates.

#### Article Data

| Field | Type | Example |
| --- | --- | --- |
| title | string | Brazil Edge Argentina in Quarter-Final Thriller |
| excerpt | string | Neymar scored twice as Brazil overcame... |
| category | string | Match Report | Awards | Broadcast | Tactics |
| date | string | Jul 5, 2026 |
| tag | string | Final Score | Award | Stats | Deep Dive |
| emoji | string | ⚽ | 🏆 | 📺 | 🎯 | 🌟 | 🗺️ | 🎬 | 🌱 |

#### HTML Structure

```javascript
const newsCard = `
  <article class="news-card">
    <div class="news-icon">${item.emoji}</div>
    <div class="news-badge" data-category="${item.category}">${item.category}</div>
    <h3 class="news-title">${item.title}</h3>
    <p class="news-excerpt">${item.excerpt}</p>
    <footer class="news-footer">
      <span class="news-tag">${item.tag}</span>
      <time class="news-date">${item.date}</time>
    </footer>
  </article>
`
```

## Toast Notifications

### Overview

Displays dismissible toast notifications for user feedback (e.g., 'Tickets purchased!', 'Group selected'). Auto-removes after 3.5 seconds or on user dismiss.

```javascript
function showToast(message, type = 'info', duration = 3500) {
  const container = $('#toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');

  container.appendChild(toast);

  // Trigger entrance animation via reflow
  void toast.offsetHeight;
  toast.classList.add('shown');

  // Auto-remove after duration
  const timeout = setTimeout(() => {
    toast.classList.remove('shown');
    setTimeout(() => toast.remove(), 300);
  }, duration);

  // Allow manual dismiss
  toast.addEventListener('click', () => {
    clearTimeout(timeout);
    toast.classList.remove('shown');
    setTimeout(() => toast.remove(), 300);
  });
}
```

#### Accessibility

- role='alert' announces toast to screen readers
- aria-live='polite' ensures async announcement
- Manual dismiss on click for user control

## Ticker: Continuous Result Loop

### Overview

Displays live match results in a horizontally scrolling ticker with seamless loop. Content clones append to create infinite scroll effect.

#### Implementation

- Ticker content div contains result items (e.g., '🇧🇷 Brazil 3–1 Argentina 🇦🇷')
- Clones entire content and appends to create double-length track
- CSS animation: translate X from 0 to -50% over 20–30s (seamless loop duration)
- When animation completes (or during reset), swaps position back to start without visible glitch
- Optional: add/remove items dynamically by updating content and re-cloning

```javascript
function initTicker() {
  const track = $('#tickerTrack');
  const content = $('#tickerContent');
  if (!track || !content) return;

  // Clone content for seamless loop
  const clone = content.cloneNode(true);
  track.appendChild(clone);

  // Optional: Handle animation restart for true seamless loop
  let animationPaused = false;
  track.addEventListener('animationiteration', () => {
    // Track completes one cycle; could add logic here to update results
  });

  // Pause on hover for readability
  track.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });
  track.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });
}
```

## 3D Tilt Effect on Match Cards

### Overview

Cursor-reactive 3D tilt effect on match cards. As user moves mouse over card, the card perspective skews toward cursor position, creating parallax illusion.

#### Implementation

- Listens for mousemove on match-card elements
- Calculates mouse offset from card center (clientX/Y - card rect center)
- Maps offset range (±width/2, ±height/2) to tilt range (±max-angle, typically ±8–12°)
- Applies CSS transform: skew/rotateX/rotateY based on delta
- On mouseleave: resets transform to neutral position
- Uses requestAnimationFrame for smooth updates

```javascript
function initCardTilt() {
  const cards = $$('.match-card');
  const MAX_TILT = 8; // degrees

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const tiltX = (deltaY / (rect.height / 2)) * MAX_TILT;
      const tiltY = (deltaX / (rect.width / 2)) * MAX_TILT;

      card.style.transform = `perspective(1000px) rotateX(${-tiltX}deg) rotateY(${tiltY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });
}
```

## Test Suite Overview

### Test Infrastructure

Comprehensive test suite using Vitest with jsdom environment. 60+ test cases covering DOM setup, initialization, event handling, animations, accessibility, and stress testing.

#### Vitest Configuration

| Setting | Value | Purpose |
| --- | --- | --- |
| environment | jsdom | Browser-like DOM simulation |
| globals | true | Enables describe/it/expect without imports |
| testTimeout | 10000 | Allow long-running animation tests |
| coverage.provider | v8 | JavaScript coverage instrumentation |
| coverage.reporters | [text, json, html, lcov] | Multiple report formats |
| coverage.thresholds.lines | 70 | Minimum 70% line coverage required |
| coverage.thresholds.functions | 70 | Minimum 70% function coverage required |
| coverage.thresholds.branches | 60 | Minimum 60% branch coverage required |
| coverage.thresholds.statements | 70 | Minimum 70% statement coverage required |

#### Test Structure

- setupDOM(): Creates complete HTML structure matching production layout
- Mock data: vitest mocks data/matches.js and data/news.js with fixture data
- Parallel execution: Independent test suites cover isolated concerns
- Async handling: setInterval/setTimeout tests managed via vi.useFakeTimers()

## Test Coverage Areas

### Test Categories

#### DOM Setup & Initialization

- Verifies all required elements are present (header, hero, countdown, stats, carousel, standings, news, toasts, confetti)
- Validates element IDs and classes match selectors used by app.js
- Tests setupDOM resilience to missing optional elements

#### Countdown Timer

- Tests initial countdown calculation (days, hours, minutes, seconds from target date)
- Verifies padding (3 digits for days, 2 digits for hours/mins/secs)
- Validates flip class applies and removes correctly on value change
- Checks zero-floor on negative remaining time

#### Scroll Reveal & Intersection Observer

- Mocks IntersectionObserver to simulate scroll events
- Verifies 'revealed' class applied on intersection
- Confirms unobserve called after reveal to prevent re-triggering

#### Hero Particles

- Tests 40 particles created with correct class
- Validates randomized size, color, opacity, duration, delay
- Checks CSS properties set via style attribute

#### Match Carousel Navigation

- Tests prev/next button click events advance carousel index
- Verifies wrap-around: next at end goes to 0, prev at 0 goes to last
- Validates dot navigation: clicking dot jumps to corresponding slide
- Tests keyboard ArrowLeft/ArrowRight navigation
- Checks touch swipe delta and velocity calculations

#### Group Standings Tab Filtering

- Tests tab button creation for groups A–H
- Verifies click updates table with correct group teams
- Validates team rank, points, goal differential calculations
- Checks active tab visual state updates

#### News Grid Rendering

- Tests 9 news articles rendered with correct structure
- Validates title, excerpt, category, tag, date, emoji fields
- Checks category badge data-attributes for filtering capability

#### Stats Count-Up & Rings

- Tests animateCountUp() easing calculation (cubic-out)
- Validates final count matches target value
- Checks SVG ring strokeDashoffset calculation from percent data
- Verifies 'bounced' class applied on animation complete

#### Typewriter Heading Animation

- Tests character-by-character reveal with correct timing (38ms intervals)
- Validates 'typewriter-active' and 'done' classes applied/removed
- Checks border-right style cleared after cursor blink duration

#### Toast Notifications

- Tests showToast() creates notification div with message
- Validates toast type class (info/success/error/warning)
- Checks auto-removal after duration (3.5s default)
- Tests manual dismiss on click with cleanup

#### Confetti Burst

- Tests 60 confetti pieces created from origin element
- Validates randomized physics (fall duration, sway duration)
- Checks auto-cleanup after 3.8s
- Verifies color palette selection and shape variation

#### 3D Tilt Effect

- Tests mousemove updates transform perspective/rotateX/rotateY
- Validates tilt angle calculation from cursor delta
- Checks mouseleave resets transform to neutral

#### Accessibility (ARIA)

- Verifies status elements have role='status' and aria-live='polite'
- Tests button elements have aria-label or accessible text
- Checks ARIA attributes persist after DOM updates
- Validates semantic HTML (nav, section, article, footer)

#### Motion Preferences & Animations

- Tests prefers-reduced-motion: reduce disables animations
- Validates countdown, particles, stats, confetti skip when motion-reduce
- Checks keyboard users can bypass animations via interaction

#### Stress & Integrity Tests

- Rapid carousel navigation without race conditions
- Simultaneous carousel + stats animation without overlap
- Multiple toast notifications queue correctly
- Memory cleanup: no lingering event listeners after unobserve
- DOM element reuse: carousel dots re-render without duplicates

## Data Modules: Matches & News

### Matches Data

Exports array of 12 FIFA 2026 match fixtures with complete tournament metadata.

#### Match Object Schema

| Field | Type | Example |
| --- | --- | --- |
| id | number | 1–12 |
| home | string | Brazil |
| away | string | Argentina |
| homeFlag | emoji | 🇧🇷 |
| awayFlag | emoji | 🇦🇷 |
| homeScore | number | 3 |
| awayScore | number | 1 |
| status | enum | final | live | upcoming |
| stage | string | Quarter Final | Group Stage · Group B |
| venue | string | MetLife Stadium, New Jersey |
| date | string | Jul 5, 2026 |
| time | string | FT | 72' | 15:00 ET |

#### Sample Data

```javascript
export const matches = [
  {
    id: 1,
    home: 'Brazil',
    away: 'Argentina',
    homeFlag: '🇧🇷',
    awayFlag: '🇦🇷',
    homeScore: 3,
    awayScore: 1,
    status: 'final',
    stage: 'Quarter Final',
    venue: 'MetLife Stadium, New Jersey',
    date: 'Jul 5, 2026',
    time: 'FT',
  },
  // ... 11 more matches
];
```

### News Data

Exports array of 9 FIFA 2026 news articles with category, tags, and emoji icons.

#### News Object Schema

| Field | Type | Example |
| --- | --- | --- |
| title | string | Brazil Edge Argentina in Quarter-Final Thriller |
| excerpt | string | Neymar scored twice as Brazil overcame... |
| category | string | Match Report | Awards | Broadcast | Tactics |
| date | string | Jul 5, 2026 |
| tag | string | Final Score | Award | Stats | Deep Dive |
| emoji | string | ⚽ | 🏆 | 📺 | 🎯 |

#### Sample Data

```javascript
export const newsItems = [
  {
    title: 'Brazil Edge Argentina in Quarter-Final Thriller',
    excerpt: 'Neymar scored twice as Brazil overcame their fiercest rivals in a pulsating 3–1 victory at MetLife Stadium.',
    category: 'Match Report',
    date: 'Jul 5, 2026',
    tag: 'Final Score',
    emoji: '⚽',
  },
  {
    title: "Mbappé Named Player of the Tournament",
    excerpt: "France's captain delivered a sensational campaign with 8 goals and 4 assists — the most lethal performer in 2026.",
    category: 'Awards',
    date: 'Jul 12, 2026',
    tag: 'Award',
    emoji: '🏆',
  },
  // ... 7 more articles
];
```

## NPM Scripts & Development

### Available Scripts

| Command | Purpose | Details |
| --- | --- | --- |
| npm run dev | Development server | Launches Vite dev server with HMR (hot module replacement) for instant refresh on file changes |
| npm run build | Production build | Creates optimized bundle for deployment via Vite (minification, tree-shaking, code splitting) |
| npm run preview | Preview build | Serves production-ready build locally to verify build output before deployment |
| npm test | Run tests once | Executes full Vitest suite with coverage report (70% line/function/statement, 60% branch thresholds) |
| npm run test:watch | Watch mode | Vitest watch mode: re-runs tests on file change for TDD development |
| npm run test:coverage | Coverage analysis | Generates detailed coverage reports in ./coverage directory (text, JSON, HTML, LCOV formats) |
| npm run test:ui | Test UI dashboard | Launches interactive Vitest UI for visual test exploration and debugging |

### Dependencies

| Package | Version | Purpose |
| --- | --- | --- |
| vite | ^5.2.0 | Modern bundler and dev server |
| vitest | ^1.6.0 | Unit test framework (Vitest core) |
| @vitest/ui | ^1.6.0 | Interactive UI for test visualization |
| @vitest/coverage-v8 | ^1.6.0 | V8 coverage instrumentation and reporting |
| jsdom | ^24.0.0 | Browser-like DOM simulation for testing |

## Utility Functions

### DOM Query Helpers

```javascript
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
```

Shorthand functions for single and multiple element selection. The $$ function converts NodeList to Array for easier iteration.

### Math Helpers

```javascript
function lerp(a, b, t) { return a + (b - a) * t; }

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

function randBetween(a, b) { return a + Math.random() * (b - a); }
```

lerp: Linear interpolation between two values (used for smooth transitions). clamp: Constrains value within min/max range. randBetween: Random float between two values (used for particle/animation randomization).

---
*Generated by Forge on 2026-06-18*