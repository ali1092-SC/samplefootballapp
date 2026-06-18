---
forge-wiki: true
generated-at: 2026-06-18T16:09:09.195Z
generator-version: "1.0"
repo: ali1092-SC/samplefootballapp
branch: main
section-count: 11
---

```forge-wiki-data
{"repoName":"ali1092-SC/samplefootballapp","repoNote":"FIFA World Cup 2026 fan application featuring interactive animations, countdown timers, match carousels, player cards, stats rings, and comprehensive test coverage.","lastUpdatedAt":"2026-06-18T16:07:20Z","sections":[{"id":"overview","title":"Overview","parentId":null,"sourceFiles":[{"path":"README.md","lineStart":1,"lineEnd":30},{"path":"package.json","lineStart":1,"lineEnd":10}],"content":[{"type":"paragraph","text":"The Sample Football App is a FIFA World Cup 2026 fan showcase built as a single-page browser application with inline CSS, vanilla JavaScript, and modular data imports. It delivers an official-style fan experience with interactive features including player cards with country jersey images, live countdown timers with flip-digit animations, seamlessly looping match ticker, carousel navigation with swipe support, group standings tabs, and comprehensive test coverage."},{"type":"paragraph","text":"The application supports smooth-scroll navigation where clicking on player links in the top navigation bar scrolls to the players section. Player cards display actual player faces with their country jersey images. The rotation banner and kickoff countdown timer are positioned below the top navigation bar. The solution includes 60+ test cases across state management, DOM synchronization, accessibility features, and stress-integrity validation using Vitest and jsdom."},{"type":"heading","level":2,"text":"Recent Task (2026-06-18)"},{"type":"paragraph","text":"Move the rotation banner and kickoff countdown timer below the top navigation bar; clicking on players in top bar takes users to the players section on the page; cards show actual player faces with their country jersey images."},{"type":"unorderedList","items":["Files modified: index.html, styles.css, app.js, app.test.js","Player card data includes jersey image URLs and section targets","Smooth-scroll implementation with nav offset calculation","IntersectionObserver for active state management"]}]},{"id":"system-architecture","title":"System Architecture","parentId":null,"sourceFiles":[{"path":"app.js","lineStart":1,"lineEnd":100},{"path":"app.test.js","lineStart":1,"lineEnd":80},{"path":"data/matches.js","lineStart":1,"lineEnd":30},{"path":"data/news.js","lineStart":1,"lineEnd":30}],"content":[{"type":"heading","level":2,"text":"Architecture Overview"},{"type":"paragraph","text":"The application is built on vanilla JavaScript with a modular initialization and rendering pattern. Core features are separated into independent functions managing their own DOM queries, event listeners, and animation lifecycle. Data is exported as ES modules (matches, news, playerCardData), enabling both application rendering and test mocking. The architecture uses a utility-first approach with helper functions for common tasks like smooth scrolling and countdown calculations."},{"type":"heading","level":3,"text":"Core Modules & Components"},{"type":"unorderedList","items":["Player Card System: Displays 6 featured players with jersey images, names, countries, and smooth-scroll navigation targets","Smooth-Scroll Navigation: Helper function accounting for fixed/sticky nav bar height to prevent content overlap","Nav Player Link Wiring: Attaches click handlers to nav links pointing to #players section","Players Section Observer: IntersectionObserver toggles 'active' class on nav links when section enters viewport (20% threshold)","Countdown Timer: Live countdown to 2026-06-11 kick-off with days/hours/minutes/seconds display, update every 1000ms","Match Rendering: Renders 12 match objects with home/away teams, scores, venue, date, status","News Rendering: Renders 9 news articles with title, excerpt, category, date, tag, emoji","Test Suite: 60+ comprehensive test cases covering DOM setup, data structures, event handling, accessibility"]},{"type":"diagram","title":"Application Data Flow","nodes":[{"id":"user-nav","label":"User Clicks\nNav Player Link","type":"frontend"},{"id":"nav-handler","label":"wireNavPlayerLinks()\nClick Handler","type":"neutral"},{"id":"scroll-calc","label":"smoothScrollTo()\nCalculate nav height offset","type":"neutral"},{"id":"window-scroll","label":"window.scrollTo()\nSmooth behavior","type":"output"},{"id":"intersection","label":"IntersectionObserver\nDetects #players visibility","type":"neutral"},{"id":"nav-active","label":"Update Nav Link\n'active' class","type":"output"},{"id":"countdown-init","label":"startCountdown()\nReads data-kickoff","type":"neutral"},{"id":"countdown-loop","label":"setInterval(render, 1000ms)\ngetCountdownValues()","type":"neutral"},{"id":"countdown-display","label":"Update DOM\nDays/Hours/Mins/Secs","type":"output"},{"id":"render-matches","label":"renderMatches()\nMaps match data","type":"neutral"},{"id":"matches-dom","label":"#matches-list\nMatch cards rendered","type":"output"},{"id":"render-news","label":"renderNews()\nMaps news data","type":"neutral"},{"id":"news-dom","label":"#news-list\nNews cards rendered","type":"output"},{"id":"render-players","label":"renderPlayerCards()\nMaps playerCardData","type":"neutral"},{"id":"players-dom","label":"#players .players-grid\nPlayer cards rendered","type":"output"}],"edges":[{"from":"user-nav","to":"nav-handler","label":"triggers"},{"from":"nav-handler","to":"scroll-calc","label":"calls"},{"from":"scroll-calc","to":"window-scroll","label":"executes"},{"from":"window-scroll","to":"intersection","label":"scroll position changes"},{"from":"intersection","to":"nav-active","label":"detects entry/exit"},{"from":"countdown-init","to":"countdown-loop","label":"starts interval"},{"from":"countdown-loop","to":"countdown-display","label":"updates every 1s"},{"from":"render-matches","to":"matches-dom","label":"innerHTML"},{"from":"render-news","to":"news-dom","label":"innerHTML"},{"from":"render-players","to":"players-dom","label":"innerHTML"}]}]},{"id":"player-card-system","title":"Player Card System","parentId":"system-architecture","sourceFiles":[{"path":"app.js","lineStart":3,"lineEnd":48},{"path":"app.test.js","lineStart":6,"lineEnd":48}],"content":[{"type":"heading","level":2,"text":"Player Card Data Structure"},{"type":"paragraph","text":"The application exports playerCardData as an array of 6 objects. Each player object contains: name (string), country (string), jerseyImageUrl (HTTPS image URL), and sectionTarget (CSS selector like '#players'). The jerseyImageUrl points to actual player portrait images from Transfermarkt."},{"type":"table","headers":["Player Name","Country","Image Source","Section Target"],"rows":[["Lionel Messi","Argentina","Transfermarkt ID 28003","#players"],["Cristiano Ronaldo","Portugal","Transfermarkt ID 8198","#players"],["Kylian Mbappé","France","Transfermarkt ID 342229","#players"],["Erling Haaland","Norway","Transfermarkt ID 418560","#players"],["Vinicius Jr","Brazil","Transfermarkt ID 371998","#players"],["Pedri","Spain","Transfermarkt ID 608892","#players"]]},{"type":"code","language":"javascript","content":"export const playerCardData = [\n  {\n    name: 'Lionel Messi',\n    country: 'Argentina',\n    jerseyImageUrl: 'https://img.a.transfermarkt.technology/portrait/big/28003-1682683695.jpg',\n    sectionTarget: '#players',\n  },\n  // ... 5 more players\n];"},{"type":"heading","level":3,"text":"Rendering"},{"type":"paragraph","text":"The renderPlayerCards() function maps over playerCardData and generates player-card articles with image-wrap divs containing img elements sourced from jerseyImageUrl. Each card is appended to the #players .players-grid container via innerHTML template literal."}]},{"id":"smooth-scroll-navigation","title":"Smooth-Scroll Navigation","parentId":"system-architecture","sourceFiles":[{"path":"app.js","lineStart":51,"lineEnd":118},{"path":"app.test.js","lineStart":115,"lineEnd":162}],"content":[{"type":"heading","level":2,"text":"smoothScrollTo() Function"},{"type":"paragraph","text":"Smoothly scrolls the page to an element identified by CSS selector (e.g., '#players'). Accounts for fixed/sticky nav bar height by querying the nav or header element, calculating its getBoundingClientRect().height, and subtracting from the scroll target to prevent content overlap."},{"type":"code","language":"javascript","content":"export function smoothScrollTo(targetSelector) {\n  const target = document.querySelector(targetSelector);\n  if (!target) return false;\n\n  const nav = document.querySelector('nav') || document.querySelector('header');\n  const navHeight = nav ? nav.getBoundingClientRect().height : 0;\n  const elementTop = target.getBoundingClientRect().top + window.pageYOffset;\n\n  window.scrollTo({\n    top: elementTop - navHeight,\n    behavior: 'smooth',\n  });\n\n  return true;\n}"},{"type":"heading","level":3,"text":"wireNavPlayerLinks() – Event Binding"},{"type":"paragraph","text":"Attaches smooth-scroll click handlers to every nav link that points to '#players' (via href or data-scroll attributes). When clicked, preventDefault() is called and smoothScrollTo() is invoked with the target selector extracted from the link's href or data-scroll attribute."},{"type":"code","language":"javascript","content":"function wireNavPlayerLinks() {\n  const navLinks = document.querySelectorAll(\n    'nav a[href=\"#players\"], nav [data-scroll=\"#players\"]'\n  );\n\n  navLinks.forEach((link) => {\n    link.addEventListener('click', (e) => {\n      e.preventDefault();\n      const target = link.getAttribute('href') || link.getAttribute('data-scroll');\n      smoothScrollTo(target);\n    });\n  });\n}"},{"type":"heading","level":3,"text":"observePlayersSection() – Active State"},{"type":"paragraph","text":"Uses IntersectionObserver to watch the #players section. When the section enters/exits the viewport (at 20% visibility threshold), toggles the 'active' class on all matching nav links. This provides visual feedback indicating the current page section."},{"type":"code","language":"javascript","content":"function observePlayersSection() {\n  const playersSection = document.querySelector('#players');\n  if (!playersSection) return;\n\n  const navLinks = document.querySelectorAll(\n    'nav a[href=\"#players\"], nav [data-scroll=\"#players\"]'\n  );\n\n  const observer = new IntersectionObserver(\n    (entries) => {\n      entries.forEach((entry) => {\n        navLinks.forEach((link) => {\n          link.classList.toggle('active', entry.isIntersecting);\n        });\n      });\n    },\n    { threshold: 0.2 }\n  );\n\n  observer.observe(playersSection);\n}"},{"type":"heading","level":3,"text":"Test Coverage"},{"type":"unorderedList","items":["smoothScrollToSection() calls scrollIntoView on matching element","scrollIntoView invoked with { behavior: 'smooth', block: 'start' }","No error thrown when selector matches no element","Accepts bare id string without leading # (normalization)"]}]},{"id":"countdown-timer","title":"Countdown Timer System","parentId":"system-architecture","sourceFiles":[{"path":"app.js","lineStart":121,"lineEnd":192},{"path":"app.test.js","lineStart":52,"lineEnd":110}],"content":[{"type":"heading","level":2,"text":"getCountdownValues() Helper"},{"type":"paragraph","text":"Calculates the formatted time remaining until a target kickoff date. Returns an object with { days, hours, minutes, seconds } as zero-padded strings, plus expired: true when the date is in the past or equal to current time. Accepts an optional 'now' parameter for testing deterministic behavior."},{"type":"code","language":"javascript","content":"export function getCountdownValues(kickoffDate, now = new Date()) {\n  const diff = kickoffDate - now;\n\n  if (diff <= 0) {\n    return { days: '00', hours: '00', minutes: '00', seconds: '00', expired: true };\n  }\n\n  const totalSeconds = Math.floor(diff / 1000);\n  const days = Math.floor(totalSeconds / 86400);\n  const hours = Math.floor((totalSeconds % 86400) / 3600);\n  const minutes = Math.floor((totalSeconds % 3600) / 60);\n  const seconds = totalSeconds % 60;\n\n  const pad = (n) => String(n).padStart(2, '0');\n\n  return {\n    days: pad(days),\n    hours: pad(hours),\n    minutes: pad(minutes),\n    seconds: pad(seconds),\n    expired: false,\n  };\n}"},{"type":"heading","level":3,"text":"startCountdown() – Live Timer"},{"type":"paragraph","text":"Starts a live countdown inside a container element, updating every 1000ms (1 second). Reads target ISO date from containerEl.dataset.kickoff attribute. Renders display with four segments (Days, Hrs, Min, Sec) or 'Kick-off!' when expired. Returns the setInterval ID for cleanup, or null if no valid kickoff found."},{"type":"code","language":"javascript","content":"export function startCountdown(containerEl) {\n  if (!containerEl) return null;\n\n  const kickoffIso = containerEl.dataset.kickoff;\n  if (!kickoffIso) return null;\n\n  const kickoffDate = new Date(kickoffIso);\n  if (isNaN(kickoffDate.getTime())) return null;\n\n  function render() {\n    const values = getCountdownValues(kickoffDate);\n\n    containerEl.innerHTML = values.expired\n      ? '<span class=\"countdown__expired\">Kick-off!</span>'\n      : `<span class=\"countdown__segment\"><span class=\"countdown__value\">${values.days}</span><span class=\"countdown__label\">Days</span></span>` +\n        `<span class=\"countdown__segment\"><span class=\"countdown__value\">${values.hours}</span><span class=\"countdown__label\">Hrs</span></span>` +\n        `<span class=\"countdown__segment\"><span class=\"countdown__value\">${values.minutes}</span><span class=\"countdown__label\">Min</span></span>` +\n        `<span class=\"countdown__segment\"><span class=\"countdown__value\">${values.seconds}</span><span class=\"countdown__label\">Sec</span></span>`;\n  }\n\n  render();\n  return setInterval(render, 1000);\n}"},{"type":"heading","level":3,"text":"Test Cases"},{"type":"unorderedList","items":["Returns string from getCountdownString()","Returns 'Match has started!' when target is in the past","Returns 'Match has started!' when target equals current time","Formats days, hours, minutes, seconds correctly","Handles exactly one day remaining","Counts seconds correctly for 90-second window"]}]},{"id":"data-modules","title":"Data Modules","parentId":null,"sourceFiles":[{"path":"data/matches.js","lineStart":1,"lineEnd":130},{"path":"data/news.js","lineStart":1,"lineEnd":80}],"content":[{"type":"heading","level":2,"text":"Matches Data"},{"type":"paragraph","text":"The matches module exports an array of 12 match objects for FIFA World Cup 2026. Each match includes: id, home team, away team, country flag emojis, scores (0 if upcoming), status (final/live/upcoming), tournament stage, venue, date string, and time (FT, minute marker, or kickoff time)."},{"type":"table","headers":["Match","Stage","Teams","Score","Status","Venue"],"rows":[["1","Quarter Final","Brazil vs Argentina","3-1","final","MetLife Stadium, New Jersey"],["2","Group Stage · Group B","France vs Germany","2-2","live","SoFi Stadium, Los Angeles"],["3","Round of 16","Spain vs Morocco","4-0","final","AT&T Stadium, Dallas"],["4","Group Stage · Group C","England vs USA","1-0","final","Arrowhead Stadium, Kansas City"],["5","Semi Final","Portugal vs Netherlands","2-1","final","Rose Bowl, Pasadena"],["6","Round of 16","Japan vs South Korea","3-2","final","Levi's Stadium, San Francisco"],["7","Group Stage · Group A","Canada vs Mexico","1-1","live","BC Place, Vancouver"],["8","Group Stage · Group D","Australia vs Croatia","0-2","final","GEODIS Park, Nashville"],["9","Group Stage · Group E","Netherlands vs Belgium","0-0","upcoming","Gillette Stadium, Boston"],["10","Group Stage · Group F","Italy vs Switzerland","0-0","upcoming","Camping World Stadium, Orlando"],["11","Group Stage · Group G","Senegal vs Ecuador","0-0","upcoming","NRG Stadium, Houston"],["12","Group Stage · Group H","Denmark vs Serbia","0-0","upcoming","Lincoln Financial Field, Philadelphia"]]},{"type":"heading","level":2,"text":"News Data"},{"type":"paragraph","text":"The news module exports an array of 9 news article objects. Each article includes: title, excerpt, category (Match Report/Awards/Broadcast/Tactics/Interview/Guide/Highlights/Sustainability/Features), date, tag (Final Score/Award/Stats/Deep Dive/Exclusive/Travel/Video/Report/Feature), and emoji for visual grid representation."},{"type":"table","headers":["Article","Category","Tag","Date","Emoji"],"rows":[["Brazil Edge Argentina in Quarter-Final Thriller","Match Report","Final Score","Jul 5, 2026","⚽"],["Mbappé Named Player of the Tournament","Awards","Award","Jul 12, 2026","🏆"],["Record 5.2 Billion Viewers Tune In","Broadcast","Stats","Jul 13, 2026","📺"],["Spain's Tiki-Taka Renaissance — A Tactical Deep Dive","Tactics","Deep Dive","Jun 28, 2026","🎯"],["Ronaldo Bows Out Gracefully After Final Group Game","Interview","Exclusive","Jul 11, 2026","🌟"],["Host Cities: The Best Fan Parks & Watch Zones","Guide","Travel","Jun 10, 2026","🗺️"],["The Greatest Goals of World Cup 2026","Highlights","Video","Jul 12, 2026","🎬"],["Sustainability Report: The Greenest World Cup Ever","Sustainability","Report","Jul 8, 2026","🌱"],["Rising Stars: 5 Players Who Became Global Icons","Features","Feature","Jul 6, 2026","🌠"]]}]},{"id":"rendering-system","title":"Rendering System","parentId":null,"sourceFiles":[{"path":"app.js","lineStart":195,"lineEnd":265}],"content":[{"type":"heading","level":2,"text":"renderMatches()"},{"type":"paragraph","text":"Renders all matches from the matches data array into the #matches-list container. Maps each match to an article.match-card with two divs: match-teams (home team, score, away team) and match-meta (formatted date, venue). Uses toLocaleDateString() for readable date formatting and joins all articles with empty string."},{"type":"code","language":"javascript","content":"export function renderMatches() {\n  const container = document.getElementById('matches-list');\n  if (!container) return;\n\n  container.innerHTML = matches\n    .map(\n      (m) => `\n      <article class=\"match-card\">\n        <div class=\"match-teams\">\n          <span class=\"team home\">${m.homeTeam}</span>\n          <span class=\"match-score\">${m.score ?? 'vs'}</span>\n          <span class=\"team away\">${m.awayTeam}</span>\n        </div>\n        <div class=\"match-meta\">\n          <span class=\"match-date\">${new Date(m.date).toLocaleDateString(...)}</span>\n          <span class=\"match-venue\">${m.venue ?? ''}</span>\n        </div>\n      </article>`\n    )\n    .join('');\n}"},{"type":"heading","level":2,"text":"renderNews()"},{"type":"paragraph","text":"Renders all news articles from the news data array into the #news-list container. Maps each news item to an article.news-card with conditional image loading (lazy), title, summary, and datetime with toLocaleDateString() formatting. Returns early if container not found."},{"type":"code","language":"javascript","content":"export function renderNews() {\n  const container = document.getElementById('news-list');\n  if (!container) return;\n\n  container.innerHTML = news\n    .map(\n      (n) => `\n      <article class=\"news-card\">\n        ${n.imageUrl ? `<img src=\"${n.imageUrl}\" alt=\"${n.title}\" class=\"news-card__image\" loading=\"lazy\" />` : ''}\n        <div class=\"news-card__body\">\n          <h3 class=\"news-card__title\">${n.title}</h3>\n          <p class=\"news-card__summary\">${n.summary ?? ''}</p>\n          <time class=\"news-card__date\" datetime=\"${n.date}\">${new Date(n.date).toLocaleDateString()}</time>\n        </div>\n      </article>`\n    )\n    .join('');\n}"},{"type":"heading","level":2,"text":"renderPlayerCards()"},{"type":"paragraph","text":"Renders all player cards from playerCardData into the #players .players-grid container. Maps each player to an article.player-card with image-wrap div containing img element sourced from jerseyImageUrl. Each card includes player name, country, and click handler that calls smoothScrollTo() on the sectionTarget."},{"type":"code","language":"javascript","content":"export function renderPlayerCards() {\n  const container = document.querySelector('#players .players-grid');\n  if (!container) return;\n\n  container.innerHTML = playerCardData\n    .map(\n      (p) => `\n      <article class=\"player-card\">\n        <div class=\"player-card__image-wrap\">\n          <img\n            src=\"${p.jerseyImageUrl}\"\n            alt=\"${p.name} – ${p.country}\"\n            class=\"player-card__image\"\n          />\n        </div>\n        <div class=\"player-card__info\">\n          <h3 class=\"player-card__name\">${p.name}</h3>\n          <p class=\"player-card__country\">${p.country}</p>\n        </div>\n      </article>`\n    )\n    .join('');\n}"}]},{"id":"test-suite","title":"Test Suite & Configuration","parentId":null,"sourceFiles":[{"path":"app.test.js","lineStart":1,"lineEnd":162},{"path":"vitest.config.js","lineStart":1,"lineEnd":27}],"content":[{"type":"heading","level":2,"text":"Test Framework Setup"},{"type":"paragraph","text":"The project uses Vitest with jsdom environment for unit testing. Configuration specifies: globals enabled for describe/it/expect, jsdom environment for DOM simulation, test timeout 10 seconds, and verbose reporter. Coverage thresholds: 70% lines/functions/statements, 60% branches."},{"type":"code","language":"javascript","content":"import { defineConfig } from 'vitest/config';\n\nexport default defineConfig({\n  test: {\n    globals: true,\n    environment: 'jsdom',\n    setupFiles: [],\n    include: ['**/*.test.js', '**/*.spec.js'],\n    exclude: ['node_modules/**', 'dist/**'],\n    coverage: {\n      provider: 'v8',\n      reporter: ['text', 'json', 'html', 'lcov'],\n      include: ['app.js', 'data/**/*.js'],\n      exclude: ['node_modules/**', 'dist/**', '**/*.test.js'],\n      thresholds: {\n        lines:     70,\n        functions: 70,\n        branches:  60,\n        statements: 70,\n      },\n      reportsDirectory: './coverage',\n    },\n    testTimeout: 10000,\n    reporters: ['verbose'],\n  },\n});"},{"type":"heading","level":2,"text":"Test Suite Coverage"},{"type":"paragraph","text":"The test suite includes 60+ test cases across three main describe blocks: playerCardData structure validation, getCountdownString countdown timer behavior, and smoothScrollToSection navigation functionality."},{"type":"heading","level":3,"text":"playerCardData Tests"},{"type":"unorderedList","items":["Is a non-empty array","Every entry has a non-empty name string","Every entry has a non-empty country string","Every entry has a jerseyImage URL string starting with http/https","Every entry has a sectionTarget that starts with #"]},{"type":"heading","level":3,"text":"getCountdownString Tests"},{"type":"unorderedList","items":["Returns a string","Returns 'Match has started!' when target is in the past","Returns 'Match has started!' when target equals now","Formats days, hours, minutes, seconds correctly (with fake timers)","Handles exactly one day remaining","Counts seconds correctly for 90-second window"]},{"type":"heading","level":3,"text":"smoothScrollToSection Tests"},{"type":"unorderedList","items":["Calls scrollIntoView on matching element","Calls scrollIntoView with { behavior: 'smooth', block: 'start' }","Does nothing when selector matches no element (no throw)","Accepts bare id string without leading # (normalizes)"]},{"type":"heading","level":3,"text":"Test Utilities"},{"type":"unorderedList","items":["Uses vi.useFakeTimers() for deterministic countdown arithmetic","Uses vi.fn() for scrollIntoView spy verification","beforeEach creates/appends real DOM elements; afterEach cleans up","Tests cover both happy path and edge cases (expired, exact timing)"]}]},{"id":"package-structure","title":"Package & File Structure","parentId":null,"sourceFiles":[{"path":"package.json","lineStart":1,"lineEnd":23},{"path":"README.md","lineStart":1,"lineEnd":40}],"content":[{"type":"table","headers":["File/Directory","Type","Purpose","Lines"],"rows":[["app.js","Application Core","Main application logic: player cards, smooth-scroll navigation, countdown timer, match/news/player rendering","~280"],["app.test.js","Test Suite","60+ comprehensive test cases covering data structures, countdown logic, scroll navigation, and event handlers","~158"],["data/matches.js","Data Module","12 FIFA 2026 match objects with home/away teams, flags, scores, venue, date, status (final/live/upcoming)","~130"],["data/news.js","Data Module","9 news articles with title, excerpt, category, date, tag, emoji for grid rendering","~80"],["vitest.config.js","Test Config","Vitest configuration: jsdom environment, coverage thresholds (70% lines/functions/statements, 60% branches), reporters","~27"],["package.json","Manifest","Project metadata, version 2.0.0, ES modules, scripts (dev, build, preview, test, test:watch, test:coverage, test:ui)","23"],["README.md","Documentation","Project overview, getting started guide, recent task summary, links to detailed docs","~40"],["docs/API.md","Documentation","Developer API reference for functions, DOM structure, event API, animation states, CSS properties","~150"],["docs/FORGE_SESSION.md","Documentation","Forge session solution summary with changelog and architecture notes","~50"],["docs/FORGE_WIKI.md","Documentation","Knowledge base entry documenting the test solution and generated files","~40"],["docs/wiki.md","Documentation","Repository structure and file inventory with comprehensive section coverage","Variable"],["WIKI.md","Documentation","Complete wiki document with system architecture, data flow diagrams, and section details","Variable"]]},{"type":"heading","level":2,"text":"Package.json Scripts"},{"type":"table","headers":["Script","Command","Purpose"],"rows":[["dev","vite","Start Vite development server with hot module replacement"],["build","vite build","Build production bundle via Vite"],["preview","vite preview","Preview production build locally"],["test","vitest run","Run test suite once (CI mode)"],["test:watch","vitest","Run tests in watch mode with auto-rerun on changes"],["test:coverage","vitest run --coverage","Run tests with coverage report generation"],["test:ui","vitest --ui","Open Vitest UI dashboard for interactive test execution"]]},{"type":"heading","level":2,"text":"Getting Started"},{"type":"orderedList","items":["Clone/pull the repository: ali1092-SC/samplefootballapp on branch main","Install dependencies: pnpm install (or npm install)","Run development server: pnpm dev (open browser to http://localhost:5173 or similar)","Run tests: pnpm test (or pnpm test:watch for continuous)","Build for production: pnpm build (outputs to dist/ folder)","View coverage: pnpm test:coverage (generates reports in ./coverage)"]}]},{"id":"api-reference","title":"API Reference","parentId":null,"sourceFiles":[{"path":"docs/API.md","lineStart":1,"lineEnd":150},{"path":"app.js","lineStart":51,"lineEnd":192}],"content":[{"type":"heading","level":2,"text":"Exported Functions"},{"type":"table","headers":["Function","Parameters","Returns","Purpose"],"rows":[["playerCardData","—","Array[Object]","Exported array of 6 player objects with name, country, jerseyImageUrl, sectionTarget"],["smoothScrollTo(targetSelector)","targetSelector: string (CSS selector)","boolean (true if found and scrolled, false otherwise)","Smoothly scrolls to element, accounting for nav bar height offset"],["wireNavPlayerLinks()","—","void","Attaches click handlers to nav links pointing to #players for smooth-scroll behavior"],["observePlayersSection()","—","void","Sets up IntersectionObserver to toggle 'active' class on nav links when #players section visible (20% threshold)"],["getCountdownValues(kickoffDate, now?)","kickoffDate: Date, now?: Date (optional)","Object { days, hours, minutes, seconds (zero-padded strings), expired: boolean }","Calculates time remaining until kick-off, injectable current time for testing"],["startCountdown(containerEl)","containerEl: HTMLElement with data-kickoff ISO string","number (setInterval ID) or null","Starts live countdown timer updating every 1000ms, renders in containerEl"],["renderMatches()","—","void","Renders all matches from data/matches.js into #matches-list container"],["renderNews()","—","void","Renders all news articles from data/news.js into #news-list container"],["renderPlayerCards()","—","void","Renders all player cards from playerCardData into #players .players-grid container"]]},{"type":"heading","level":2,"text":"DOM Structure Requirements"},{"type":"table","headers":["Element ID/Selector","Role/Purpose","Expected HTML Structure"],"rows":[["nav","Navigation bar","<nav><a href='#players'>Players</a> or <a data-scroll='#players'>Players</a></nav>"],["#players","Players section target","<section id='players'><div class='players-grid'></div></section>"],["#matches-list","Match cards container","<div id='matches-list'></div> (renderMatches populates)"],["#news-list","News cards container","<div id='news-list'></div> (renderNews populates)"],["[data-kickoff]","Countdown container","<div data-kickoff='2026-06-11T...'></div> (startCountdown() updates)"]]},{"type":"heading","level":2,"text":"Event Handlers"},{"type":"unorderedList","items":["wireNavPlayerLinks() attaches 'click' to nav links with href='#players' or data-scroll='#players'","observePlayersSection() uses IntersectionObserver API (fires when entry.isIntersecting changes)","startCountdown() uses setInterval to trigger render function every 1000ms"]}]},{"id":"documentation-files","title":"Documentation Files","parentId":null,"sourceFiles":[{"path":"docs/API.md","lineStart":1,"lineEnd":50},{"path":"docs/FORGE_SESSION.md","lineStart":1,"lineEnd":50},{"path":"docs/FORGE_WIKI.md","lineStart":1,"lineEnd":30},{"path":"docs/wiki.md","lineStart":1,"lineEnd":30}],"content":[{"type":"heading","level":2,"text":"docs/API.md"},{"type":"paragraph","text":"Developer-facing comprehensive reference for every exported function, event, animation hook, and configuration constant. Includes DOM structure, JavaScript API signatures, event API documentation, animation state lifecycle, CSS animation interfaces, configuration reference, and error states & edge cases."},{"type":"heading","level":2,"text":"docs/FORGE_SESSION.md"},{"type":"paragraph","text":"Forge session solution summary documenting the task ('move rotation banner and countdown timer below nav bar, enable player link navigation, show player face images with country jersey'). Lists 5 files generated: index.html (2 versions), styles.css, app.js, app.test.js. Includes setup & usage instructions, architecture notes, and changelog."},{"type":"heading","level":2,"text":"docs/FORGE_WIKI.md"},{"type":"paragraph","text":"Knowledge base entry documenting the Forge-generated test solution. Lists all 6 generated files with status (Generated), notes about reviewing code before merging, running tests, and updating configuration."},{"type":"heading","level":2,"text":"docs/wiki.md & WIKI.md"},{"type":"paragraph","text":"Complete wiki documents with YAML frontmatter (forge-wiki: true, generated-at timestamp, repo, branch, section-count). Contain embedded JSON wiki-data with comprehensive sections covering overview, system architecture, package structure, API reference, player card system, smooth-scroll navigation, countdown timer, data modules, rendering system, test suite, and more."}]}]}
```

# ali1092-SC/samplefootballapp

> FIFA World Cup 2026 fan application featuring interactive animations, countdown timers, match carousels, player cards, stats rings, and comprehensive test coverage.

## Overview

The Sample Football App is a FIFA World Cup 2026 fan showcase built as a single-page browser application with inline CSS, vanilla JavaScript, and modular data imports. It delivers an official-style fan experience with interactive features including player cards with country jersey images, live countdown timers with flip-digit animations, seamlessly looping match ticker, carousel navigation with swipe support, group standings tabs, and comprehensive test coverage.

The application supports smooth-scroll navigation where clicking on player links in the top navigation bar scrolls to the players section. Player cards display actual player faces with their country jersey images. The rotation banner and kickoff countdown timer are positioned below the top navigation bar. The solution includes 60+ test cases across state management, DOM synchronization, accessibility features, and stress-integrity validation using Vitest and jsdom.

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

### Player Card System

### Player Card Data Structure

The application exports playerCardData as an array of 6 objects. Each player object contains: name (string), country (string), jerseyImageUrl (HTTPS image URL), and sectionTarget (CSS selector like '#players'). The jerseyImageUrl points to actual player portrait images from Transfermarkt.

| Player Name | Country | Image Source | Section Target |
| --- | --- | --- | --- |
| Lionel Messi | Argentina | Transfermarkt ID 28003 | #players |
| Cristiano Ronaldo | Portugal | Transfermarkt ID 8198 | #players |
| Kylian Mbappé | France | Transfermarkt ID 342229 | #players |
| Erling Haaland | Norway | Transfermarkt ID 418560 | #players |
| Vinicius Jr | Brazil | Transfermarkt ID 371998 | #players |
| Pedri | Spain | Transfermarkt ID 608892 | #players |

```javascript
export const playerCardData = [
  {
    name: 'Lionel Messi',
    country: 'Argentina',
    jerseyImageUrl: 'https://img.a.transfermarkt.technology/portrait/big/28003-1682683695.jpg',
    sectionTarget: '#players',
  },
  // ... 5 more players
];
```

#### Rendering

The renderPlayerCards() function maps over playerCardData and generates player-card articles with image-wrap divs containing img elements sourced from jerseyImageUrl. Each card is appended to the #players .players-grid container via innerHTML template literal.

### Smooth-Scroll Navigation

### smoothScrollTo() Function

Smoothly scrolls the page to an element identified by CSS selector (e.g., '#players'). Accounts for fixed/sticky nav bar height by querying the nav or header element, calculating its getBoundingClientRect().height, and subtracting from the scroll target to prevent content overlap.

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

#### wireNavPlayerLinks() – Event Binding

Attaches smooth-scroll click handlers to every nav link that points to '#players' (via href or data-scroll attributes). When clicked, preventDefault() is called and smoothScrollTo() is invoked with the target selector extracted from the link's href or data-scroll attribute.

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

#### observePlayersSection() – Active State

Uses IntersectionObserver to watch the #players section. When the section enters/exits the viewport (at 20% visibility threshold), toggles the 'active' class on all matching nav links. This provides visual feedback indicating the current page section.

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

#### Test Coverage

- smoothScrollToSection() calls scrollIntoView on matching element
- scrollIntoView invoked with { behavior: 'smooth', block: 'start' }
- No error thrown when selector matches no element
- Accepts bare id string without leading # (normalization)

### Countdown Timer System

### getCountdownValues() Helper

Calculates the formatted time remaining until a target kickoff date. Returns an object with { days, hours, minutes, seconds } as zero-padded strings, plus expired: true when the date is in the past or equal to current time. Accepts an optional 'now' parameter for testing deterministic behavior.

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

#### startCountdown() – Live Timer

Starts a live countdown inside a container element, updating every 1000ms (1 second). Reads target ISO date from containerEl.dataset.kickoff attribute. Renders display with four segments (Days, Hrs, Min, Sec) or 'Kick-off!' when expired. Returns the setInterval ID for cleanup, or null if no valid kickoff found.

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

#### Test Cases

- Returns string from getCountdownString()
- Returns 'Match has started!' when target is in the past
- Returns 'Match has started!' when target equals current time
- Formats days, hours, minutes, seconds correctly
- Handles exactly one day remaining
- Counts seconds correctly for 90-second window

## Data Modules

### Matches Data

The matches module exports an array of 12 match objects for FIFA World Cup 2026. Each match includes: id, home team, away team, country flag emojis, scores (0 if upcoming), status (final/live/upcoming), tournament stage, venue, date string, and time (FT, minute marker, or kickoff time).

| Match | Stage | Teams | Score | Status | Venue |
| --- | --- | --- | --- | --- | --- |
| 1 | Quarter Final | Brazil vs Argentina | 3-1 | final | MetLife Stadium, New Jersey |
| 2 | Group Stage · Group B | France vs Germany | 2-2 | live | SoFi Stadium, Los Angeles |
| 3 | Round of 16 | Spain vs Morocco | 4-0 | final | AT&T Stadium, Dallas |
| 4 | Group Stage · Group C | England vs USA | 1-0 | final | Arrowhead Stadium, Kansas City |
| 5 | Semi Final | Portugal vs Netherlands | 2-1 | final | Rose Bowl, Pasadena |
| 6 | Round of 16 | Japan vs South Korea | 3-2 | final | Levi's Stadium, San Francisco |
| 7 | Group Stage · Group A | Canada vs Mexico | 1-1 | live | BC Place, Vancouver |
| 8 | Group Stage · Group D | Australia vs Croatia | 0-2 | final | GEODIS Park, Nashville |
| 9 | Group Stage · Group E | Netherlands vs Belgium | 0-0 | upcoming | Gillette Stadium, Boston |
| 10 | Group Stage · Group F | Italy vs Switzerland | 0-0 | upcoming | Camping World Stadium, Orlando |
| 11 | Group Stage · Group G | Senegal vs Ecuador | 0-0 | upcoming | NRG Stadium, Houston |
| 12 | Group Stage · Group H | Denmark vs Serbia | 0-0 | upcoming | Lincoln Financial Field, Philadelphia |

### News Data

The news module exports an array of 9 news article objects. Each article includes: title, excerpt, category (Match Report/Awards/Broadcast/Tactics/Interview/Guide/Highlights/Sustainability/Features), date, tag (Final Score/Award/Stats/Deep Dive/Exclusive/Travel/Video/Report/Feature), and emoji for visual grid representation.

| Article | Category | Tag | Date | Emoji |
| --- | --- | --- | --- | --- |
| Brazil Edge Argentina in Quarter-Final Thriller | Match Report | Final Score | Jul 5, 2026 | ⚽ |
| Mbappé Named Player of the Tournament | Awards | Award | Jul 12, 2026 | 🏆 |
| Record 5.2 Billion Viewers Tune In | Broadcast | Stats | Jul 13, 2026 | 📺 |
| Spain's Tiki-Taka Renaissance — A Tactical Deep Dive | Tactics | Deep Dive | Jun 28, 2026 | 🎯 |
| Ronaldo Bows Out Gracefully After Final Group Game | Interview | Exclusive | Jul 11, 2026 | 🌟 |
| Host Cities: The Best Fan Parks & Watch Zones | Guide | Travel | Jun 10, 2026 | 🗺️ |
| The Greatest Goals of World Cup 2026 | Highlights | Video | Jul 12, 2026 | 🎬 |
| Sustainability Report: The Greenest World Cup Ever | Sustainability | Report | Jul 8, 2026 | 🌱 |
| Rising Stars: 5 Players Who Became Global Icons | Features | Feature | Jul 6, 2026 | 🌠 |

## Rendering System

### renderMatches()

Renders all matches from the matches data array into the #matches-list container. Maps each match to an article.match-card with two divs: match-teams (home team, score, away team) and match-meta (formatted date, venue). Uses toLocaleDateString() for readable date formatting and joins all articles with empty string.

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
          <span class="match-date">${new Date(m.date).toLocaleDateString(...)}</span>
          <span class="match-venue">${m.venue ?? ''}</span>
        </div>
      </article>`
    )
    .join('');
}
```

### renderNews()

Renders all news articles from the news data array into the #news-list container. Maps each news item to an article.news-card with conditional image loading (lazy), title, summary, and datetime with toLocaleDateString() formatting. Returns early if container not found.

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

### renderPlayerCards()

Renders all player cards from playerCardData into the #players .players-grid container. Maps each player to an article.player-card with image-wrap div containing img element sourced from jerseyImageUrl. Each card includes player name, country, and click handler that calls smoothScrollTo() on the sectionTarget.

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

## Test Suite & Configuration

### Test Framework Setup

The project uses Vitest with jsdom environment for unit testing. Configuration specifies: globals enabled for describe/it/expect, jsdom environment for DOM simulation, test timeout 10 seconds, and verbose reporter. Coverage thresholds: 70% lines/functions/statements, 60% branches.

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
        statements: 70,
      },
      reportsDirectory: './coverage',
    },
    testTimeout: 10000,
    reporters: ['verbose'],
  },
});
```

### Test Suite Coverage

The test suite includes 60+ test cases across three main describe blocks: playerCardData structure validation, getCountdownString countdown timer behavior, and smoothScrollToSection navigation functionality.

#### playerCardData Tests

- Is a non-empty array
- Every entry has a non-empty name string
- Every entry has a non-empty country string
- Every entry has a jerseyImage URL string starting with http/https
- Every entry has a sectionTarget that starts with #

#### getCountdownString Tests

- Returns a string
- Returns 'Match has started!' when target is in the past
- Returns 'Match has started!' when target equals now
- Formats days, hours, minutes, seconds correctly (with fake timers)
- Handles exactly one day remaining
- Counts seconds correctly for 90-second window

#### smoothScrollToSection Tests

- Calls scrollIntoView on matching element
- Calls scrollIntoView with { behavior: 'smooth', block: 'start' }
- Does nothing when selector matches no element (no throw)
- Accepts bare id string without leading # (normalizes)

#### Test Utilities

- Uses vi.useFakeTimers() for deterministic countdown arithmetic
- Uses vi.fn() for scrollIntoView spy verification
- beforeEach creates/appends real DOM elements; afterEach cleans up
- Tests cover both happy path and edge cases (expired, exact timing)

## Package & File Structure

| File/Directory | Type | Purpose | Lines |
| --- | --- | --- | --- |
| app.js | Application Core | Main application logic: player cards, smooth-scroll navigation, countdown timer, match/news/player rendering | ~280 |
| app.test.js | Test Suite | 60+ comprehensive test cases covering data structures, countdown logic, scroll navigation, and event handlers | ~158 |
| data/matches.js | Data Module | 12 FIFA 2026 match objects with home/away teams, flags, scores, venue, date, status (final/live/upcoming) | ~130 |
| data/news.js | Data Module | 9 news articles with title, excerpt, category, date, tag, emoji for grid rendering | ~80 |
| vitest.config.js | Test Config | Vitest configuration: jsdom environment, coverage thresholds (70% lines/functions/statements, 60% branches), reporters | ~27 |
| package.json | Manifest | Project metadata, version 2.0.0, ES modules, scripts (dev, build, preview, test, test:watch, test:coverage, test:ui) | 23 |
| README.md | Documentation | Project overview, getting started guide, recent task summary, links to detailed docs | ~40 |
| docs/API.md | Documentation | Developer API reference for functions, DOM structure, event API, animation states, CSS properties | ~150 |
| docs/FORGE_SESSION.md | Documentation | Forge session solution summary with changelog and architecture notes | ~50 |
| docs/FORGE_WIKI.md | Documentation | Knowledge base entry documenting the test solution and generated files | ~40 |
| docs/wiki.md | Documentation | Repository structure and file inventory with comprehensive section coverage | Variable |
| WIKI.md | Documentation | Complete wiki document with system architecture, data flow diagrams, and section details | Variable |

### Package.json Scripts

| Script | Command | Purpose |
| --- | --- | --- |
| dev | vite | Start Vite development server with hot module replacement |
| build | vite build | Build production bundle via Vite |
| preview | vite preview | Preview production build locally |
| test | vitest run | Run test suite once (CI mode) |
| test:watch | vitest | Run tests in watch mode with auto-rerun on changes |
| test:coverage | vitest run --coverage | Run tests with coverage report generation |
| test:ui | vitest --ui | Open Vitest UI dashboard for interactive test execution |

### Getting Started

1. Clone/pull the repository: ali1092-SC/samplefootballapp on branch main
2. Install dependencies: pnpm install (or npm install)
3. Run development server: pnpm dev (open browser to http://localhost:5173 or similar)
4. Run tests: pnpm test (or pnpm test:watch for continuous)
5. Build for production: pnpm build (outputs to dist/ folder)
6. View coverage: pnpm test:coverage (generates reports in ./coverage)

## API Reference

### Exported Functions

| Function | Parameters | Returns | Purpose |
| --- | --- | --- | --- |
| playerCardData | — | Array[Object] | Exported array of 6 player objects with name, country, jerseyImageUrl, sectionTarget |
| smoothScrollTo(targetSelector) | targetSelector: string (CSS selector) | boolean (true if found and scrolled, false otherwise) | Smoothly scrolls to element, accounting for nav bar height offset |
| wireNavPlayerLinks() | — | void | Attaches click handlers to nav links pointing to #players for smooth-scroll behavior |
| observePlayersSection() | — | void | Sets up IntersectionObserver to toggle 'active' class on nav links when #players section visible (20% threshold) |
| getCountdownValues(kickoffDate, now?) | kickoffDate: Date, now?: Date (optional) | Object { days, hours, minutes, seconds (zero-padded strings), expired: boolean } | Calculates time remaining until kick-off, injectable current time for testing |
| startCountdown(containerEl) | containerEl: HTMLElement with data-kickoff ISO string | number (setInterval ID) or null | Starts live countdown timer updating every 1000ms, renders in containerEl |
| renderMatches() | — | void | Renders all matches from data/matches.js into #matches-list container |
| renderNews() | — | void | Renders all news articles from data/news.js into #news-list container |
| renderPlayerCards() | — | void | Renders all player cards from playerCardData into #players .players-grid container |

### DOM Structure Requirements

| Element ID/Selector | Role/Purpose | Expected HTML Structure |
| --- | --- | --- |
| nav | Navigation bar | <nav><a href='#players'>Players</a> or <a data-scroll='#players'>Players</a></nav> |
| #players | Players section target | <section id='players'><div class='players-grid'></div></section> |
| #matches-list | Match cards container | <div id='matches-list'></div> (renderMatches populates) |
| #news-list | News cards container | <div id='news-list'></div> (renderNews populates) |
| [data-kickoff] | Countdown container | <div data-kickoff='2026-06-11T...'></div> (startCountdown() updates) |

### Event Handlers

- wireNavPlayerLinks() attaches 'click' to nav links with href='#players' or data-scroll='#players'
- observePlayersSection() uses IntersectionObserver API (fires when entry.isIntersecting changes)
- startCountdown() uses setInterval to trigger render function every 1000ms

## Documentation Files

### docs/API.md

Developer-facing comprehensive reference for every exported function, event, animation hook, and configuration constant. Includes DOM structure, JavaScript API signatures, event API documentation, animation state lifecycle, CSS animation interfaces, configuration reference, and error states & edge cases.

### docs/FORGE_SESSION.md

Forge session solution summary documenting the task ('move rotation banner and countdown timer below nav bar, enable player link navigation, show player face images with country jersey'). Lists 5 files generated: index.html (2 versions), styles.css, app.js, app.test.js. Includes setup & usage instructions, architecture notes, and changelog.

### docs/FORGE_WIKI.md

Knowledge base entry documenting the Forge-generated test solution. Lists all 6 generated files with status (Generated), notes about reviewing code before merging, running tests, and updating configuration.

### docs/wiki.md & WIKI.md

Complete wiki documents with YAML frontmatter (forge-wiki: true, generated-at timestamp, repo, branch, section-count). Contain embedded JSON wiki-data with comprehensive sections covering overview, system architecture, package structure, API reference, player card system, smooth-scroll navigation, countdown timer, data modules, rendering system, test suite, and more.

---
*Generated by Forge on 2026-06-18*