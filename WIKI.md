---
forge-wiki: true
generated-at: 2026-06-18T16:27:27.088Z
generator-version: "1.0"
repo: ali1092-SC/samplefootballapp
branch: main
section-count: 12
---

```forge-wiki-data
{"repoName":"ali1092-SC/samplefootballapp","repoNote":"FIFA World Cup 2026 fan application featuring interactive player cards, live countdown timers, match carousels, and comprehensive test coverage using Vitest.","lastUpdatedAt":"2026-06-18T16:24:42Z","sections":[{"id":"overview","title":"Overview","parentId":null,"sourceFiles":[{"path":"README.md","lineStart":1,"lineEnd":30},{"path":"package.json","lineStart":1,"lineEnd":10}],"content":[{"type":"paragraph","text":"The Sample Football App is a FIFA World Cup 2026 fan showcase built as a single-page browser application with inline CSS, vanilla JavaScript, and modular data imports. It delivers an official-style fan experience with interactive features including player cards with country jersey images, live countdown timers with flip-digit animations, seamlessly looping match ticker, carousel navigation with swipe support, group standings tabs, and comprehensive test coverage."},{"type":"paragraph","text":"The application supports smooth-scroll navigation where clicking on player links in the top navigation bar scrolls to the players section. Player cards display actual player faces with their country jersey images sourced from Transfermarkt. The rotation banner and kickoff countdown timer are positioned below the top navigation bar. The solution includes 60+ test cases across state management, DOM synchronization, accessibility features, and stress-integrity validation using Vitest and jsdom."},{"type":"heading","level":2,"text":"Recent Task (2026-06-18)"},{"type":"paragraph","text":"Move the rotation banner and kickoff countdown timer below the top navigation bar; clicking on players in top bar takes users to the players section on the page; cards show actual player faces with their country jersey images."},{"type":"unorderedList","items":["Files modified: index.html, styles.css, app.js, app.test.js","Player card data includes jersey image URLs and section targets","Smooth-scroll implementation with nav offset calculation","IntersectionObserver for active state management"]}]},{"id":"system-architecture","title":"System Architecture","parentId":null,"sourceFiles":[{"path":"app.js","lineStart":1,"lineEnd":100},{"path":"app.test.js","lineStart":1,"lineEnd":80},{"path":"data/matches.js","lineStart":1,"lineEnd":30},{"path":"data/news.js","lineStart":1,"lineEnd":30}],"content":[{"type":"heading","level":2,"text":"Architecture Overview"},{"type":"paragraph","text":"The application is built on vanilla JavaScript with a modular initialization and rendering pattern. Core features are separated into independent functions managing their own DOM queries, event listeners, and animation lifecycle. Data is exported as ES modules (matches, news, playerCardData), enabling both application rendering and test mocking. The architecture uses a utility-first approach with helper functions for common tasks like smooth scrolling and countdown calculations."},{"type":"heading","level":3,"text":"Core Modules & Components"},{"type":"unorderedList","items":["Player Card System: Displays 6 featured players with jersey images, names, countries, and smooth-scroll navigation targets","Smooth-Scroll Navigation: Helper function accounting for fixed/sticky nav bar height to prevent content overlap","Nav Player Link Wiring: Attaches click handlers to nav links pointing to #players section","Players Section Observer: IntersectionObserver toggles 'active' class on nav links when section enters viewport (20% threshold)","Countdown Timer: Live countdown to 2026-06-11 kick-off with days/hours/minutes/seconds display, update every 1000ms","Match Rendering: Renders 12 match objects with home/away teams, scores, venue, date, status","News Rendering: Renders 9 news articles with title, excerpt, category, date, tag, emoji","Test Suite: 60+ comprehensive test cases covering DOM setup, data structures, event handling, accessibility"]},{"type":"diagram","title":"Application Data Flow","nodes":[{"id":"user-nav","label":"User Clicks\nNav Player Link","type":"frontend"},{"id":"nav-handler","label":"wireNavPlayerLinks()\nClick Handler","type":"neutral"},{"id":"scroll-calc","label":"smoothScrollTo()\nCalculate nav height offset","type":"neutral"},{"id":"window-scroll","label":"window.scrollTo()\nSmooth behavior","type":"output"},{"id":"intersection","label":"IntersectionObserver\nDetects #players visibility","type":"neutral"},{"id":"nav-active","label":"Update Nav Link\n'active' class","type":"output"},{"id":"countdown-init","label":"startCountdown()\nReads data-kickoff","type":"neutral"},{"id":"countdown-loop","label":"setInterval(render, 1000ms)\ngetCountdownValues()","type":"neutral"},{"id":"countdown-display","label":"Update DOM\nDays/Hours/Mins/Secs","type":"output"},{"id":"render-matches","label":"renderMatches()\nMaps match data","type":"neutral"},{"id":"matches-dom","label":"#matches-list\nMatch cards rendered","type":"output"},{"id":"render-news","label":"renderNews()\nMaps news data","type":"neutral"},{"id":"news-dom","label":"#news-list\nNews cards rendered","type":"output"},{"id":"render-players","label":"renderPlayerCards()\nMaps playerCardData","type":"neutral"},{"id":"players-dom","label":"#players .players-grid\nPlayer cards rendered","type":"output"}],"edges":[{"from":"user-nav","to":"nav-handler","label":"triggers"},{"from":"nav-handler","to":"scroll-calc","label":"calls"},{"from":"scroll-calc","to":"window-scroll","label":"executes"},{"from":"window-scroll","to":"intersection","label":"scroll position changes"},{"from":"intersection","to":"nav-active","label":"detects entry/exit"},{"from":"countdown-init","to":"countdown-loop","label":"starts interval"},{"from":"countdown-loop","to":"countdown-display","label":"updates every 1s"},{"from":"render-matches","to":"matches-dom","label":"innerHTML"},{"from":"render-news","to":"news-dom","label":"innerHTML"},{"from":"render-players","to":"players-dom","label":"innerHTML"}]}]},{"id":"package-structure","title":"Package & File Structure","parentId":null,"sourceFiles":[{"path":"package.json","lineStart":1,"lineEnd":23},{"path":"WIKI.md","lineStart":1,"lineEnd":30}],"content":[{"type":"table","headers":["File/Directory","Type","Purpose"],"rows":[["app.js","Application","Main application logic: player data, smooth-scroll helpers, countdown timer, render functions for matches/news/players"],["app.test.js","Test Suite","60+ comprehensive test cases covering playerCardData structure, countdown calculations, scroll navigation, DOM synchronization"],["vitest.config.js","Config","Vitest configuration with jsdom environment and coverage thresholds (70% lines/functions/statements, 60% branches)"],["package.json","Manifest","Project metadata (v2.0.0) and npm scripts (dev, build, preview, test, test:watch, test:coverage, test:ui)"],["data/matches.js","Data Module","Exports 12 match objects with home/away teams, scores, status, venue, date, flags, and tournament stage information"],["data/news.js","Data Module","Exports 9 news article objects with title, excerpt, category, date, tag, and emoji for tournament coverage"],["docs/API.md","Documentation","Developer API reference for functions, events, animation states, CSS properties, and error cases"],["docs/FORGE_SESSION.md","Documentation","Forge session solution summary documenting the approved build plan and FIFA 2026 brand identity specifications"],["docs/FORGE_WIKI.md","Documentation","Knowledge base entry documenting the Forge solution, generated files, and architectural notes"],["docs/wiki.md","Documentation","Generated wiki data in JSON format capturing repo structure and major sections"],["README.md","Documentation","Project overview, recent changes log, and FIFA World Cup 2026 full build prompt instructions"],["WIKI.md","Documentation","Repository structure documentation with section inventory and file metadata"]]}]},{"id":"player-card-system","title":"Player Card System","parentId":"system-architecture","sourceFiles":[{"path":"app.js","lineStart":1,"lineEnd":48},{"path":"app.test.js","lineStart":6,"lineEnd":48}],"content":[{"type":"heading","level":2,"text":"Player Card Data Structure"},{"type":"paragraph","text":"The application exports playerCardData as an array of 6 objects. Each player object contains: name (string), country (string), jerseyImageUrl (HTTPS image URL from Transfermarkt), and sectionTarget (CSS selector like '#players'). The jerseyImageUrl points to actual player portrait images with player IDs."},{"type":"table","headers":["Player Name","Country","Transfermarkt ID","Section Target"],"rows":[["Lionel Messi","Argentina","28003","#players"],["Cristiano Ronaldo","Portugal","8198","#players"],["Kylian Mbappé","France","342229","#players"],["Erling Haaland","Norway","418560","#players"],["Vinicius Jr","Brazil","371998","#players"],["Pedri","Spain","608892","#players"]]},{"type":"code","language":"javascript","content":"export const playerCardData = [\n  {\n    name: 'Lionel Messi',\n    country: 'Argentina',\n    jerseyImageUrl: 'https://img.a.transfermarkt.technology/portrait/big/28003-1682683695.jpg',\n    sectionTarget: '#players',\n  },\n  {\n    name: 'Cristiano Ronaldo',\n    country: 'Portugal',\n    jerseyImageUrl: 'https://img.a.transfermarkt.technology/portrait/big/8198-1701955611.jpg',\n    sectionTarget: '#players',\n  },\n  // ... 4 more players\n];"},{"type":"heading","level":3,"text":"Rendering Logic"},{"type":"paragraph","text":"The renderPlayerCards() function maps over playerCardData and generates player-card article elements with image-wrap divs containing img elements sourced from jerseyImageUrl. Each card is appended to the #players .players-grid container via innerHTML template literal. Player names and countries are displayed in card text overlays."},{"type":"sourcesRow","files":[{"path":"app.js","lineStart":238,"lineEnd":260}]}]},{"id":"smooth-scroll-navigation","title":"Smooth-Scroll Navigation","parentId":"system-architecture","sourceFiles":[{"path":"app.js","lineStart":51,"lineEnd":118},{"path":"app.test.js","lineStart":77,"lineEnd":130}],"content":[{"type":"heading","level":2,"text":"Navigation Helpers"},{"type":"heading","level":3,"text":"smoothScrollTo(targetSelector)"},{"type":"paragraph","text":"Smoothly scrolls the page to the element identified by targetSelector. Accounts for fixed/sticky nav bar height using getBoundingClientRect() so the section isn't hidden behind navigation. Returns true when target was found and scrolled to, false otherwise."},{"type":"code","language":"javascript","content":"export function smoothScrollTo(targetSelector) {\n  const target = document.querySelector(targetSelector);\n  if (!target) return false;\n\n  const nav = document.querySelector('nav') || document.querySelector('header');\n  const navHeight = nav ? nav.getBoundingClientRect().height : 0;\n  const elementTop = target.getBoundingClientRect().top + window.pageYOffset;\n\n  window.scrollTo({\n    top: elementTop - navHeight,\n    behavior: 'smooth',\n  });\n\n  return true;\n}"},{"type":"heading","level":3,"text":"wireNavPlayerLinks()"},{"type":"paragraph","text":"Attaches smooth-scroll click handlers to every nav link that points to '#players' or carries a data-scroll='#players' attribute. Prevents default link behavior and calls smoothScrollTo() with the target selector."},{"type":"code","language":"javascript","content":"function wireNavPlayerLinks() {\n  const navLinks = document.querySelectorAll(\n    'nav a[href=\"#players\"], nav [data-scroll=\"#players\"]'\n  );\n\n  navLinks.forEach((link) => {\n    link.addEventListener('click', (e) => {\n      e.preventDefault();\n      const target = link.getAttribute('href') || link.getAttribute('data-scroll');\n      smoothScrollTo(target);\n    });\n  });\n}"},{"type":"heading","level":3,"text":"observePlayersSection()"},{"type":"paragraph","text":"Uses IntersectionObserver to monitor the #players section. Toggles an 'active' class on matching nav links whenever the section enters or leaves the viewport. Threshold set to 0.2 (20% of section visible triggers callback)."},{"type":"code","language":"javascript","content":"function observePlayersSection() {\n  const playersSection = document.querySelector('#players');\n  if (!playersSection) return;\n\n  const navLinks = document.querySelectorAll(\n    'nav a[href=\"#players\"], nav [data-scroll=\"#players\"]'\n  );\n\n  const observer = new IntersectionObserver(\n    (entries) => {\n      entries.forEach((entry) => {\n        navLinks.forEach((link) => {\n          link.classList.toggle('active', entry.isIntersecting);\n        });\n      });\n    },\n    { threshold: 0.2 }\n  );\n\n  observer.observe(playersSection);\n}"}]},{"id":"countdown-timer","title":"Countdown Timer System","parentId":"system-architecture","sourceFiles":[{"path":"app.js","lineStart":121,"lineEnd":195},{"path":"app.test.js","lineStart":62,"lineEnd":120}],"content":[{"type":"heading","level":2,"text":"Countdown Implementation"},{"type":"heading","level":3,"text":"getCountdownValues(kickoffDate, now)"},{"type":"paragraph","text":"Returns the formatted time remaining until kickoffDate. Calculates diff in milliseconds and breaks down into days, hours, minutes, seconds as zero-padded strings. Returns an object with { days, hours, minutes, seconds, expired: boolean }. When diff <= 0, all values are '00' and expired is true."},{"type":"code","language":"javascript","content":"export function getCountdownValues(kickoffDate, now = new Date()) {\n  const diff = kickoffDate - now;\n\n  if (diff <= 0) {\n    return { days: '00', hours: '00', minutes: '00', seconds: '00', expired: true };\n  }\n\n  const totalSeconds = Math.floor(diff / 1000);\n  const days = Math.floor(totalSeconds / 86400);\n  const hours = Math.floor((totalSeconds % 86400) / 3600);\n  const minutes = Math.floor((totalSeconds % 3600) / 60);\n  const seconds = totalSeconds % 60;\n\n  const pad = (n) => String(n).padStart(2, '0');\n\n  return {\n    days: pad(days),\n    hours: pad(hours),\n    minutes: pad(minutes),\n    seconds: pad(seconds),\n    expired: false,\n  };\n}"},{"type":"heading","level":3,"text":"startCountdown(containerEl)"},{"type":"paragraph","text":"Starts a live countdown inside containerEl, updating every 1000ms. Reads the target date from containerEl.dataset.kickoff (ISO string). Returns the interval ID on success, null if no valid kickoff date found. Displays 'Kick-off!' when countdown expires."},{"type":"code","language":"javascript","content":"export function startCountdown(containerEl) {\n  if (!containerEl) return null;\n\n  const kickoffIso = containerEl.dataset.kickoff;\n  if (!kickoffIso) return null;\n\n  const kickoffDate = new Date(kickoffIso);\n  if (isNaN(kickoffDate.getTime())) return null;\n\n  function render() {\n    const values = getCountdownValues(kickoffDate);\n\n    containerEl.innerHTML = values.expired\n      ? '<span class=\"countdown__expired\">Kick-off!</span>'\n      : `<span class=\"countdown__segment\"><span class=\"countdown__value\">${values.days}</span><span class=\"countdown__label\">Days</span></span>` +\n        `<span class=\"countdown__segment\"><span class=\"countdown__value\">${values.hours}</span><span class=\"countdown__label\">Hrs</span></span>` +\n        `<span class=\"countdown__segment\"><span class=\"countdown__value\">${values.minutes}</span><span class=\"countdown__label\">Min</span></span>` +\n        `<span class=\"countdown__segment\"><span class=\"countdown__value\">${values.seconds}</span><span class=\"countdown__label\">Sec</span></span>`;\n  }\n\n  render();\n  return setInterval(render, 1000);\n}"},{"type":"heading","level":3,"text":"Kickoff Target Date"},{"type":"paragraph","text":"The countdown targets 2026-06-11 (FIFA World Cup 2026 opening match date). Container element passes this as data-kickoff='2026-06-11T00:00:00Z' attribute."}]},{"id":"data-modules","title":"Data Modules","parentId":null,"sourceFiles":[{"path":"data/matches.js","lineStart":1,"lineEnd":100},{"path":"data/news.js","lineStart":1,"lineEnd":80}],"content":[{"type":"heading","level":2,"text":"Match Data Module"},{"type":"paragraph","text":"The data/matches.js module exports a matches array containing 12 match objects. Each match object includes: id, home/away team names, homeFlag/awayFlag emoji, homeScore/awayScore, status (final/live/upcoming), stage (tournament round), venue (stadium name + city), date, and time (FT/live minute/'kickoff time)."},{"type":"table","headers":["Field","Type","Example","Purpose"],"rows":[["id","number","1","Unique match identifier"],["home / away","string","Brazil / Argentina","Team names"],["homeFlag / awayFlag","emoji","🇧🇷 / 🇦🇷","Country flag for visual display"],["homeScore / awayScore","number","3 / 1","Match score (null if upcoming)"],["status","enum","final | live | upcoming","Match state indicator"],["stage","string","Quarter Final","Tournament phase (Group/Round of 16/etc)"],["venue","string","MetLife Stadium, New Jersey","Hosting stadium and city"],["date","string","Jul 5, 2026","Match date"],["time","string","FT / 72' / 15:00 ET","Match status time"]]},{"type":"heading","level":3,"text":"Sample Match Object"},{"type":"code","language":"javascript","content":"{\n  id: 1,\n  home: 'Brazil',\n  away: 'Argentina',\n  homeFlag: '🇧🇷',\n  awayFlag: '🇦🇷',\n  homeScore: 3,\n  awayScore: 1,\n  status: 'final',\n  stage: 'Quarter Final',\n  venue: 'MetLife Stadium, New Jersey',\n  date: 'Jul 5, 2026',\n  time: 'FT',\n}"},{"type":"heading","level":2,"text":"News Data Module"},{"type":"paragraph","text":"The data/news.js module exports a newsItems array containing 9 news article objects. Each article includes: title, excerpt (summary), category (Match Report/Awards/Tactics/etc), date, tag (Final Score/Award/Video/etc), and emoji for visual categorization."},{"type":"table","headers":["Field","Type","Example","Purpose"],"rows":[["title","string","Brazil Edge Argentina in Quarter-Final Thriller","Article headline"],["excerpt","string","Neymar scored twice as Brazil overcame...","Article summary/preview"],["category","string","Match Report / Awards / Tactics","Article type/section"],["date","string","Jul 5, 2026","Publication date"],["tag","string","Final Score / Award / Video","Content tag/label"],["emoji","emoji","⚽ / 🏆 / 🎬","Visual category icon"]]},{"type":"heading","level":3,"text":"Sample News Object"},{"type":"code","language":"javascript","content":"{\n  title: 'Brazil Edge Argentina in Quarter-Final Thriller',\n  excerpt: 'Neymar scored twice as Brazil overcame their fiercest rivals in a pulsating 3–1 victory at MetLife Stadium.',\n  category: 'Match Report',\n  date: 'Jul 5, 2026',\n  tag: 'Final Score',\n  emoji: '⚽',\n}"}]},{"id":"render-functions","title":"Render Functions","parentId":"system-architecture","sourceFiles":[{"path":"app.js","lineStart":197,"lineEnd":280}],"content":[{"type":"heading","level":2,"text":"DOM Rendering"},{"type":"heading","level":3,"text":"renderMatches()"},{"type":"paragraph","text":"Maps the matches array to HTML match-card articles and inserts into #matches-list container via innerHTML. Each card displays home/away teams, score, match meta (date, venue), and status indicator."},{"type":"code","language":"javascript","content":"export function renderMatches() {\n  const container = document.getElementById('matches-list');\n  if (!container) return;\n\n  container.innerHTML = matches\n    .map(\n      (m) => `\n      <article class=\"match-card\">\n        <div class=\"match-teams\">\n          <span class=\"team home\">${m.homeTeam}</span>\n          <span class=\"match-score\">${m.score ?? 'vs'}</span>\n          <span class=\"team away\">${m.awayTeam}</span>\n        </div>\n        <div class=\"match-meta\">\n          <span class=\"match-date\">${new Date(m.date).toLocaleDateString()}</span>\n          <span class=\"match-venue\">${m.venue ?? ''}</span>\n        </div>\n      </article>`\n    )\n    .join('');\n}"},{"type":"heading","level":3,"text":"renderNews()"},{"type":"paragraph","text":"Maps the news array to HTML news-card articles and inserts into #news-list container. Each card displays title, summary excerpt, optional image, publication date, and category tag."},{"type":"code","language":"javascript","content":"export function renderNews() {\n  const container = document.getElementById('news-list');\n  if (!container) return;\n\n  container.innerHTML = news\n    .map(\n      (n) => `\n      <article class=\"news-card\">\n        ${n.imageUrl ? `<img src=\"${n.imageUrl}\" alt=\"${n.title}\" class=\"news-card__image\" loading=\"lazy\" />` : ''}\n        <div class=\"news-card__body\">\n          <h3 class=\"news-card__title\">${n.title}</h3>\n          <p class=\"news-card__summary\">${n.summary ?? ''}</p>\n          <time class=\"news-card__date\" datetime=\"${n.date}\">${new Date(n.date).toLocaleDateString()}</time>\n        </div>\n      </article>`\n    )\n    .join('');\n}"},{"type":"heading","level":3,"text":"renderPlayerCards()"},{"type":"paragraph","text":"Maps the playerCardData array to player-card article elements and inserts into #players .players-grid container. Each card displays player image sourced from jerseyImageUrl, name, and country."},{"type":"code","language":"javascript","content":"export function renderPlayerCards() {\n  const container = document.querySelector('#players .players-grid');\n  if (!container) return;\n\n  container.innerHTML = playerCardData\n    .map(\n      (p) => `\n      <article class=\"player-card\">\n        <div class=\"player-card__image-wrap\">\n          <img\n            src=\"${p.jerseyImageUrl}\"\n            alt=\"${p.name} – ${p.country}\"\n            class=\"player-card__image\"\n            loading=\"lazy\"\n          />\n        </div>\n        <div class=\"player-card__info\">\n          <h3 class=\"player-card__name\">${p.name}</h3>\n          <p class=\"player-card__country\">${p.country}</p>\n        </div>\n      </article>`\n    )\n    .join('');\n}"}]},{"id":"test-suite","title":"Test Suite","parentId":null,"sourceFiles":[{"path":"app.test.js","lineStart":1,"lineEnd":150},{"path":"vitest.config.js","lineStart":1,"lineEnd":30}],"content":[{"type":"heading","level":2,"text":"Testing Infrastructure"},{"type":"paragraph","text":"The test suite uses Vitest with jsdom environment for DOM testing. Configuration defines globals: true, environment: 'jsdom', coverage thresholds of 70% lines/functions/statements and 60% branches. Test files include glob patterns **/*.test.js and **/*.spec.js."},{"type":"heading","level":3,"text":"Test Coverage Areas"},{"type":"unorderedList","items":["playerCardData: Validates structure (non-empty array, string fields, URL validation, section targets)","getCountdownString: Tests countdown calculation with fake timers, edge cases (past dates, zero time, 1+ day intervals)","smoothScrollToSection: Validates scrollIntoView calls, smooth behavior parameter, selector normalization, missing elements","DOM Synchronization: Verifies render functions populate containers with expected HTML structure","Data Integrity: Checks matches and news exports match expected schemas","Navigation Interaction: Tests click handlers, nav link state management, IntersectionObserver callbacks"]},{"type":"heading","level":3,"text":"Sample Test Cases"},{"type":"code","language":"javascript","content":"describe('playerCardData', () => {\n  it('is a non-empty array', () => {\n    expect(Array.isArray(playerCardData)).toBe(true);\n    expect(playerCardData.length).toBeGreaterThan(0);\n  });\n\n  it('every entry has a non-empty name string', () => {\n    playerCardData.forEach((player) => {\n      expect(typeof player.name).toBe('string');\n      expect(player.name.trim().length).toBeGreaterThan(0);\n    });\n  });\n\n  it('every entry has a jerseyImage URL string starting with http', () => {\n    playerCardData.forEach((player) => {\n      expect(typeof player.jerseyImage).toBe('string');\n      expect(player.jerseyImage.trim()).toMatch(/^https?:\\/\\//);\n    });\n  });\n});\n\ndescribe('getCountdownString', () => {\n  it('returns \"Match has started!\" when the target is in the past', () => {\n    const past = new Date(Date.now() - 1000);\n    expect(getCountdownString(past)).toBe('Match has started!');\n  });\n\n  it('formats days, hours, minutes and seconds correctly', () => {\n    const BASE = 1_700_000_000_000;\n    vi.useFakeTimers();\n    vi.setSystemTime(BASE);\n\n    const twoHoursAhead = new Date(BASE + 2 * 60 * 60 * 1000);\n    const result = getCountdownString(twoHoursAhead);\n\n    expect(result).toMatch(/0d/);\n    expect(result).toMatch(/2h/);\n    expect(result).toMatch(/0m/);\n    expect(result).toMatch(/0s/);\n\n    vi.useRealTimers();\n  });\n});\n\ndescribe('smoothScrollToSection', () => {\n  it('calls scrollIntoView with smooth behavior', () => {\n    const target = document.createElement('div');\n    target.id = 'players';\n    document.body.appendChild(target);\n    target.scrollIntoView = vi.fn();\n\n    smoothScrollToSection('#players');\n    expect(target.scrollIntoView).toHaveBeenCalledWith({\n      behavior: 'smooth',\n      block: 'start',\n    });\n\n    document.body.removeChild(target);\n  });\n});"},{"type":"heading","level":3,"text":"Vitest Configuration"},{"type":"code","language":"javascript","content":"import { defineConfig } from 'vitest/config';\n\nexport default defineConfig({\n  test: {\n    globals: true,\n    environment: 'jsdom',\n    setupFiles: [],\n    include: ['**/*.test.js', '**/*.spec.js'],\n    exclude: ['node_modules/**', 'dist/**'],\n    coverage: {\n      provider: 'v8',\n      reporter: ['text', 'json', 'html', 'lcov'],\n      include: ['app.js', 'data/**/*.js'],\n      exclude: ['node_modules/**', 'dist/**', '**/*.test.js'],\n      thresholds: {\n        lines:     70,\n        functions: 70,\n        branches:  60,\n        statements:70,\n      },\n      reportsDirectory: './coverage',\n    },\n    testTimeout: 10000,\n    reporters: ['verbose'],\n  },\n});"}]},{"id":"npm-scripts","title":"NPM Scripts & Build","parentId":null,"sourceFiles":[{"path":"package.json","lineStart":7,"lineEnd":15}],"content":[{"type":"heading","level":2,"text":"Available Commands"},{"type":"table","headers":["Script","Command","Purpose"],"rows":[["dev","vite","Start development server with hot module replacement"],["build","vite build","Create production-optimized bundle"],["preview","vite preview","Preview production build locally"],["test","vitest run","Run all tests once (CI mode)"],["test:watch","vitest","Run tests in watch mode with auto-rerun on changes"],["test:coverage","vitest run --coverage","Generate coverage reports (text, JSON, HTML, LCOV)"],["test:ui","vitest --ui","Launch interactive test UI dashboard"]]},{"type":"heading","level":3,"text":"Development Workflow"},{"type":"orderedList","items":["Run `npm install` to install dependencies (Vite, Vitest, jsdom, coverage provider)","Execute `npm run dev` to start local development server","Edit app.js, data modules, or tests; changes auto-reload","Run `npm test` to verify all tests pass before committing","Run `npm run test:coverage` to check coverage thresholds","Execute `npm run build` to generate production bundle","Run `npm run preview` to test production build locally"]}]},{"id":"documentation","title":"Documentation Files","parentId":null,"sourceFiles":[{"path":"docs/API.md","lineStart":1,"lineEnd":50},{"path":"docs/FORGE_SESSION.md","lineStart":1,"lineEnd":80},{"path":"docs/FORGE_WIKI.md","lineStart":1,"lineEnd":30}],"content":[{"type":"heading","level":2,"text":"API Reference (docs/API.md)"},{"type":"paragraph","text":"Comprehensive developer-facing documentation covering: JavaScript API (initFootball, kickFootball, resetFootball, setIdleState functions), event API (click triggers, keyboard handlers), animation state lifecycle (idle → kicked → resetting), CSS animation interfaces (footballKickAcross keyframe, idleBounce, idleSway), configuration constants (JavaScript state, CSS custom properties), and request/response examples with error cases."},{"type":"heading","level":2,"text":"Forge Session Solution (docs/FORGE_SESSION.md)"},{"type":"paragraph","text":"Documents the approved build plan and FIFA World Cup 2026 specifications including brand identity (official logo SVG with inline implementation, color palette, typography), animated football canvas implementation, page section layouts (navigation, hero, live scores, stats, venues, groups, players, schedule, predictor, footer), and accessibility requirements. Serves as the reference for implementation details."},{"type":"heading","level":2,"text":"Forge Wiki (docs/FORGE_WIKI.md)"},{"type":"paragraph","text":"Knowledge base entry summarizing the Forge solution, listing generated files (index.html, docs, configs), and noting implementation status. Includes task description, generated file inventory, and pre-merge verification checklist."},{"type":"heading","level":2,"text":"Generated Wiki (docs/wiki.md)"},{"type":"paragraph","text":"Automatically generated documentation in JSON format capturing repository structure, section inventory, and metadata. Contains forge-wiki metadata tags and structured section definitions for automated documentation pipeline."}]},{"id":"project-metadata","title":"Project Metadata","parentId":null,"sourceFiles":[{"path":"package.json","lineStart":1,"lineEnd":6},{"path":"WIKI.md","lineStart":1,"lineEnd":10}],"content":[{"type":"heading","level":2,"text":"Package Information"},{"type":"table","headers":["Field","Value","Description"],"rows":[["name","samplefootballapp","NPM package identifier"],["private","true","Not published to NPM registry"],["version","2.0.0","Semantic version tracking major updates"],["description","FIFA World Cup 2026™ — Official-style fan application","Project purpose and scope"],["type","module","Uses ES6 import/export syntax"]]},{"type":"heading","level":2,"text":"Repository Information"},{"type":"table","headers":["Property","Value"],"rows":[["Repository","ali1092-SC/samplefootballapp"],["Branch","main"],["Last Updated","2026-06-18T16:24:42Z"],["Generator Version","1.0"],["Documentation Sections","11 major sections with subsections"]]},{"type":"heading","level":2,"text":"Development Dependencies"},{"type":"unorderedList","items":["Vite ^5.2.0 — Fast build tool and dev server","Vitest ^1.6.0 — Unit test framework with Vite integration","@vitest/ui ^1.6.0 — Interactive test dashboard","@vitest/coverage-v8 ^1.6.0 — Code coverage reporting using V8 engine","jsdom ^24.0.0 — DOM implementation for Node.js test environment"]}]}]}
```

# ali1092-SC/samplefootballapp

> FIFA World Cup 2026 fan application featuring interactive player cards, live countdown timers, match carousels, and comprehensive test coverage using Vitest.

## Overview

The Sample Football App is a FIFA World Cup 2026 fan showcase built as a single-page browser application with inline CSS, vanilla JavaScript, and modular data imports. It delivers an official-style fan experience with interactive features including player cards with country jersey images, live countdown timers with flip-digit animations, seamlessly looping match ticker, carousel navigation with swipe support, group standings tabs, and comprehensive test coverage.

The application supports smooth-scroll navigation where clicking on player links in the top navigation bar scrolls to the players section. Player cards display actual player faces with their country jersey images sourced from Transfermarkt. The rotation banner and kickoff countdown timer are positioned below the top navigation bar. The solution includes 60+ test cases across state management, DOM synchronization, accessibility features, and stress-integrity validation using Vitest and jsdom.

### Recent Task (2026-06-18)

Move the rotation banner and kickoff countdown timer below the top navigation bar; clicking on players in top bar takes users to the players section on the page; cards show actual player faces with their country jersey images.

- Files modified: index.html, styles.css, app.js, app.test.js
- Player card data includes jersey image URLs and section targets
- Smooth-scroll implementation with nav offset calculation
- IntersectionObserver for active state management

## System Architecture

### Architecture Overview

The application is built on vanilla JavaScript with a modular initialization and rendering pattern. Core features are separated into independent functions managing their own DOM queries, event listeners, and animation lifecycle. Data is exported as ES modules (matches, news, playerCardData), enabling both application rendering and test mocking. The architecture uses a utility-first approach with helper functions for common tasks like smooth scrolling and countdown calculations.

#### Core Modules & Components

- Player Card System: Displays 6 featured players with jersey images, names, countries, and smooth-scroll navigation targets
- Smooth-Scroll Navigation: Helper function accounting for fixed/sticky nav bar height to prevent content overlap
- Nav Player Link Wiring: Attaches click handlers to nav links pointing to #players section
- Players Section Observer: IntersectionObserver toggles 'active' class on nav links when section enters viewport (20% threshold)
- Countdown Timer: Live countdown to 2026-06-11 kick-off with days/hours/minutes/seconds display, update every 1000ms
- Match Rendering: Renders 12 match objects with home/away teams, scores, venue, date, status
- News Rendering: Renders 9 news articles with title, excerpt, category, date, tag, emoji
- Test Suite: 60+ comprehensive test cases covering DOM setup, data structures, event handling, accessibility

## Package & File Structure

| File/Directory | Type | Purpose |
| --- | --- | --- |
| app.js | Application | Main application logic: player data, smooth-scroll helpers, countdown timer, render functions for matches/news/players |
| app.test.js | Test Suite | 60+ comprehensive test cases covering playerCardData structure, countdown calculations, scroll navigation, DOM synchronization |
| vitest.config.js | Config | Vitest configuration with jsdom environment and coverage thresholds (70% lines/functions/statements, 60% branches) |
| package.json | Manifest | Project metadata (v2.0.0) and npm scripts (dev, build, preview, test, test:watch, test:coverage, test:ui) |
| data/matches.js | Data Module | Exports 12 match objects with home/away teams, scores, status, venue, date, flags, and tournament stage information |
| data/news.js | Data Module | Exports 9 news article objects with title, excerpt, category, date, tag, and emoji for tournament coverage |
| docs/API.md | Documentation | Developer API reference for functions, events, animation states, CSS properties, and error cases |
| docs/FORGE_SESSION.md | Documentation | Forge session solution summary documenting the approved build plan and FIFA 2026 brand identity specifications |
| docs/FORGE_WIKI.md | Documentation | Knowledge base entry documenting the Forge solution, generated files, and architectural notes |
| docs/wiki.md | Documentation | Generated wiki data in JSON format capturing repo structure and major sections |
| README.md | Documentation | Project overview, recent changes log, and FIFA World Cup 2026 full build prompt instructions |
| WIKI.md | Documentation | Repository structure documentation with section inventory and file metadata |

### Player Card System

### Player Card Data Structure

The application exports playerCardData as an array of 6 objects. Each player object contains: name (string), country (string), jerseyImageUrl (HTTPS image URL from Transfermarkt), and sectionTarget (CSS selector like '#players'). The jerseyImageUrl points to actual player portrait images with player IDs.

| Player Name | Country | Transfermarkt ID | Section Target |
| --- | --- | --- | --- |
| Lionel Messi | Argentina | 28003 | #players |
| Cristiano Ronaldo | Portugal | 8198 | #players |
| Kylian Mbappé | France | 342229 | #players |
| Erling Haaland | Norway | 418560 | #players |
| Vinicius Jr | Brazil | 371998 | #players |
| Pedri | Spain | 608892 | #players |

```javascript
export const playerCardData = [
  {
    name: 'Lionel Messi',
    country: 'Argentina',
    jerseyImageUrl: 'https://img.a.transfermarkt.technology/portrait/big/28003-1682683695.jpg',
    sectionTarget: '#players',
  },
  {
    name: 'Cristiano Ronaldo',
    country: 'Portugal',
    jerseyImageUrl: 'https://img.a.transfermarkt.technology/portrait/big/8198-1701955611.jpg',
    sectionTarget: '#players',
  },
  // ... 4 more players
];
```

#### Rendering Logic

The renderPlayerCards() function maps over playerCardData and generates player-card article elements with image-wrap divs containing img elements sourced from jerseyImageUrl. Each card is appended to the #players .players-grid container via innerHTML template literal. Player names and countries are displayed in card text overlays.

### Smooth-Scroll Navigation

### Navigation Helpers

#### smoothScrollTo(targetSelector)

Smoothly scrolls the page to the element identified by targetSelector. Accounts for fixed/sticky nav bar height using getBoundingClientRect() so the section isn't hidden behind navigation. Returns true when target was found and scrolled to, false otherwise.

```javascript
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
```

#### wireNavPlayerLinks()

Attaches smooth-scroll click handlers to every nav link that points to '#players' or carries a data-scroll='#players' attribute. Prevents default link behavior and calls smoothScrollTo() with the target selector.

```javascript
function wireNavPlayerLinks() {
  const navLinks = document.querySelectorAll(
    'nav a[href="#players"], nav [data-scroll="#players"]'
  );

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href') || link.getAttribute('data-scroll');
      smoothScrollTo(target);
    });
  });
}
```

#### observePlayersSection()

Uses IntersectionObserver to monitor the #players section. Toggles an 'active' class on matching nav links whenever the section enters or leaves the viewport. Threshold set to 0.2 (20% of section visible triggers callback).

```javascript
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
    { threshold: 0.2 }
  );

  observer.observe(playersSection);
}
```

### Countdown Timer System

### Countdown Implementation

#### getCountdownValues(kickoffDate, now)

Returns the formatted time remaining until kickoffDate. Calculates diff in milliseconds and breaks down into days, hours, minutes, seconds as zero-padded strings. Returns an object with { days, hours, minutes, seconds, expired: boolean }. When diff <= 0, all values are '00' and expired is true.

```javascript
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
```

#### startCountdown(containerEl)

Starts a live countdown inside containerEl, updating every 1000ms. Reads the target date from containerEl.dataset.kickoff (ISO string). Returns the interval ID on success, null if no valid kickoff date found. Displays 'Kick-off!' when countdown expires.

```javascript
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
```

#### Kickoff Target Date

The countdown targets 2026-06-11 (FIFA World Cup 2026 opening match date). Container element passes this as data-kickoff='2026-06-11T00:00:00Z' attribute.

## Data Modules

### Match Data Module

The data/matches.js module exports a matches array containing 12 match objects. Each match object includes: id, home/away team names, homeFlag/awayFlag emoji, homeScore/awayScore, status (final/live/upcoming), stage (tournament round), venue (stadium name + city), date, and time (FT/live minute/'kickoff time).

| Field | Type | Example | Purpose |
| --- | --- | --- | --- |
| id | number | 1 | Unique match identifier |
| home / away | string | Brazil / Argentina | Team names |
| homeFlag / awayFlag | emoji | 🇧🇷 / 🇦🇷 | Country flag for visual display |
| homeScore / awayScore | number | 3 / 1 | Match score (null if upcoming) |
| status | enum | final | live | upcoming | Match state indicator |
| stage | string | Quarter Final | Tournament phase (Group/Round of 16/etc) |
| venue | string | MetLife Stadium, New Jersey | Hosting stadium and city |
| date | string | Jul 5, 2026 | Match date |
| time | string | FT / 72' / 15:00 ET | Match status time |

#### Sample Match Object

```javascript
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
}
```

### News Data Module

The data/news.js module exports a newsItems array containing 9 news article objects. Each article includes: title, excerpt (summary), category (Match Report/Awards/Tactics/etc), date, tag (Final Score/Award/Video/etc), and emoji for visual categorization.

| Field | Type | Example | Purpose |
| --- | --- | --- | --- |
| title | string | Brazil Edge Argentina in Quarter-Final Thriller | Article headline |
| excerpt | string | Neymar scored twice as Brazil overcame... | Article summary/preview |
| category | string | Match Report / Awards / Tactics | Article type/section |
| date | string | Jul 5, 2026 | Publication date |
| tag | string | Final Score / Award / Video | Content tag/label |
| emoji | emoji | ⚽ / 🏆 / 🎬 | Visual category icon |

#### Sample News Object

```javascript
{
  title: 'Brazil Edge Argentina in Quarter-Final Thriller',
  excerpt: 'Neymar scored twice as Brazil overcame their fiercest rivals in a pulsating 3–1 victory at MetLife Stadium.',
  category: 'Match Report',
  date: 'Jul 5, 2026',
  tag: 'Final Score',
  emoji: '⚽',
}
```

### Render Functions

### DOM Rendering

#### renderMatches()

Maps the matches array to HTML match-card articles and inserts into #matches-list container via innerHTML. Each card displays home/away teams, score, match meta (date, venue), and status indicator.

```javascript
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
          <span class="match-date">${new Date(m.date).toLocaleDateString()}</span>
          <span class="match-venue">${m.venue ?? ''}</span>
        </div>
      </article>`
    )
    .join('');
}
```

#### renderNews()

Maps the news array to HTML news-card articles and inserts into #news-list container. Each card displays title, summary excerpt, optional image, publication date, and category tag.

```javascript
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
```

#### renderPlayerCards()

Maps the playerCardData array to player-card article elements and inserts into #players .players-grid container. Each card displays player image sourced from jerseyImageUrl, name, and country.

```javascript
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
            alt="${p.name} – ${p.country}"
            class="player-card__image"
            loading="lazy"
          />
        </div>
        <div class="player-card__info">
          <h3 class="player-card__name">${p.name}</h3>
          <p class="player-card__country">${p.country}</p>
        </div>
      </article>`
    )
    .join('');
}
```

## Test Suite

### Testing Infrastructure

The test suite uses Vitest with jsdom environment for DOM testing. Configuration defines globals: true, environment: 'jsdom', coverage thresholds of 70% lines/functions/statements and 60% branches. Test files include glob patterns **/*.test.js and **/*.spec.js.

#### Test Coverage Areas

- playerCardData: Validates structure (non-empty array, string fields, URL validation, section targets)
- getCountdownString: Tests countdown calculation with fake timers, edge cases (past dates, zero time, 1+ day intervals)
- smoothScrollToSection: Validates scrollIntoView calls, smooth behavior parameter, selector normalization, missing elements
- DOM Synchronization: Verifies render functions populate containers with expected HTML structure
- Data Integrity: Checks matches and news exports match expected schemas
- Navigation Interaction: Tests click handlers, nav link state management, IntersectionObserver callbacks

#### Sample Test Cases

```javascript
describe('playerCardData', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(playerCardData)).toBe(true);
    expect(playerCardData.length).toBeGreaterThan(0);
  });

  it('every entry has a non-empty name string', () => {
    playerCardData.forEach((player) => {
      expect(typeof player.name).toBe('string');
      expect(player.name.trim().length).toBeGreaterThan(0);
    });
  });

  it('every entry has a jerseyImage URL string starting with http', () => {
    playerCardData.forEach((player) => {
      expect(typeof player.jerseyImage).toBe('string');
      expect(player.jerseyImage.trim()).toMatch(/^https?:\/\//);
    });
  });
});

describe('getCountdownString', () => {
  it('returns "Match has started!" when the target is in the past', () => {
    const past = new Date(Date.now() - 1000);
    expect(getCountdownString(past)).toBe('Match has started!');
  });

  it('formats days, hours, minutes and seconds correctly', () => {
    const BASE = 1_700_000_000_000;
    vi.useFakeTimers();
    vi.setSystemTime(BASE);

    const twoHoursAhead = new Date(BASE + 2 * 60 * 60 * 1000);
    const result = getCountdownString(twoHoursAhead);

    expect(result).toMatch(/0d/);
    expect(result).toMatch(/2h/);
    expect(result).toMatch(/0m/);
    expect(result).toMatch(/0s/);

    vi.useRealTimers();
  });
});

describe('smoothScrollToSection', () => {
  it('calls scrollIntoView with smooth behavior', () => {
    const target = document.createElement('div');
    target.id = 'players';
    document.body.appendChild(target);
    target.scrollIntoView = vi.fn();

    smoothScrollToSection('#players');
    expect(target.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });

    document.body.removeChild(target);
  });
});
```

#### Vitest Configuration

```javascript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [],
    include: ['**/*.test.js', '**/*.spec.js'],
    exclude: ['node_modules/**', 'dist/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['app.js', 'data/**/*.js'],
      exclude: ['node_modules/**', 'dist/**', '**/*.test.js'],
      thresholds: {
        lines:     70,
        functions: 70,
        branches:  60,
        statements:70,
      },
      reportsDirectory: './coverage',
    },
    testTimeout: 10000,
    reporters: ['verbose'],
  },
});
```

## NPM Scripts & Build

### Available Commands

| Script | Command | Purpose |
| --- | --- | --- |
| dev | vite | Start development server with hot module replacement |
| build | vite build | Create production-optimized bundle |
| preview | vite preview | Preview production build locally |
| test | vitest run | Run all tests once (CI mode) |
| test:watch | vitest | Run tests in watch mode with auto-rerun on changes |
| test:coverage | vitest run --coverage | Generate coverage reports (text, JSON, HTML, LCOV) |
| test:ui | vitest --ui | Launch interactive test UI dashboard |

#### Development Workflow

1. Run `npm install` to install dependencies (Vite, Vitest, jsdom, coverage provider)
2. Execute `npm run dev` to start local development server
3. Edit app.js, data modules, or tests; changes auto-reload
4. Run `npm test` to verify all tests pass before committing
5. Run `npm run test:coverage` to check coverage thresholds
6. Execute `npm run build` to generate production bundle
7. Run `npm run preview` to test production build locally

## Documentation Files

### API Reference (docs/API.md)

Comprehensive developer-facing documentation covering: JavaScript API (initFootball, kickFootball, resetFootball, setIdleState functions), event API (click triggers, keyboard handlers), animation state lifecycle (idle → kicked → resetting), CSS animation interfaces (footballKickAcross keyframe, idleBounce, idleSway), configuration constants (JavaScript state, CSS custom properties), and request/response examples with error cases.

### Forge Session Solution (docs/FORGE_SESSION.md)

Documents the approved build plan and FIFA World Cup 2026 specifications including brand identity (official logo SVG with inline implementation, color palette, typography), animated football canvas implementation, page section layouts (navigation, hero, live scores, stats, venues, groups, players, schedule, predictor, footer), and accessibility requirements. Serves as the reference for implementation details.

### Forge Wiki (docs/FORGE_WIKI.md)

Knowledge base entry summarizing the Forge solution, listing generated files (index.html, docs, configs), and noting implementation status. Includes task description, generated file inventory, and pre-merge verification checklist.

### Generated Wiki (docs/wiki.md)

Automatically generated documentation in JSON format capturing repository structure, section inventory, and metadata. Contains forge-wiki metadata tags and structured section definitions for automated documentation pipeline.

## Project Metadata

### Package Information

| Field | Value | Description |
| --- | --- | --- |
| name | samplefootballapp | NPM package identifier |
| private | true | Not published to NPM registry |
| version | 2.0.0 | Semantic version tracking major updates |
| description | FIFA World Cup 2026™ — Official-style fan application | Project purpose and scope |
| type | module | Uses ES6 import/export syntax |

### Repository Information

| Property | Value |
| --- | --- |
| Repository | ali1092-SC/samplefootballapp |
| Branch | main |
| Last Updated | 2026-06-18T16:24:42Z |
| Generator Version | 1.0 |
| Documentation Sections | 11 major sections with subsections |

### Development Dependencies

- Vite ^5.2.0 — Fast build tool and dev server
- Vitest ^1.6.0 — Unit test framework with Vite integration
- @vitest/ui ^1.6.0 — Interactive test dashboard
- @vitest/coverage-v8 ^1.6.0 — Code coverage reporting using V8 engine
- jsdom ^24.0.0 — DOM implementation for Node.js test environment

---
*Generated by Forge on 2026-06-18*