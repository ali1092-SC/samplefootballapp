---
forge-wiki: true
generated-at: 2026-06-18T14:09:29.721Z
generator-version: "1.0"
repo: ali1092-SC/samplefootballapp
branch: main
section-count: 10
---

```forge-wiki-data
{"repoName":"ali1092-SC/samplefootballapp","repoNote":"A sample football app with interactive kick mechanics, scoreboard tracking, particle effects, and comprehensive test coverage.","lastUpdatedAt":"2026-06-18T14:07:59Z","sections":[{"id":"overview","title":"Overview","parentId":null,"sourceFiles":[{"path":"README.md","lineStart":1,"lineEnd":10}],"content":[{"type":"paragraph","text":"The Football App is a single-page browser application that renders an animated football with interactive kick mechanics. Users can trigger kicks to increment game statistics (kicks, streak, record), spawn particle burst effects, and receive real-time feedback through an accessible status display. The application includes comprehensive test coverage across game state management, DOM synchronization, accessibility features, motion preference handling, and stress-integrity validation."},{"type":"paragraph","text":"The test suite adds 60+ new test cases across eight describe blocks covering: setStatus edge cases (XSS, coercion, rapid calls), kick/miss game mechanics, scoreboard DOM synchronisation, particle burst rendering, keyboard and ARIA accessibility, prefers-reduced-motion branching for both animations and particles, and a stress-integrity suite that validates invariants."}]},{"id":"system-architecture","title":"System Architecture","parentId":null,"sourceFiles":[{"path":"app.js","lineStart":1,"lineEnd":50},{"path":"app.test.js","lineStart":1,"lineEnd":100}],"content":[{"type":"heading","level":2,"text":"Architecture Overview"},{"type":"paragraph","text":"The Football App is built on vanilla JavaScript with a modular state management pattern. The core application exposes a lightweight event-driven API built entirely on native browser events, CSS keyframe animations, and DOM manipulation. The test suite uses Vitest with jsdom to validate all business logic in isolation."},{"type":"heading","level":3,"text":"Core Components"},{"type":"unorderedList","items":["State Management: Central state object tracking kicks, streak, and record","DOM Interface: Scoreboard display elements, status announcer, particle container, and kick button","Event Handlers: Click listeners, keyboard navigation (Enter/Space), and animation event cleanup","Game Logic: kick() and miss() functions managing state transitions and streak mechanics","Accessibility Layer: ARIA attributes, role-based semantics, and reduced-motion support"]},{"type":"diagram","title":"Football App Data Flow","nodes":[{"id":"user-input","label":"User Input\n(Click/Keyboard)","type":"frontend"},{"id":"kick-handler","label":"kick() Function","type":"neutral"},{"id":"state-update","label":"State Update\n(kicks, streak, record)","type":"database"},{"id":"scoreboard-update","label":"updateScoreboard()","type":"neutral"},{"id":"dom-render","label":"DOM Render\n(Scoreboard Display)","type":"output"},{"id":"particle-spawn","label":"spawnParticles()","type":"neutral"},{"id":"particle-dom","label":"Particle Elements\n(DOM)","type":"output"},{"id":"status-update","label":"setStatus()","type":"neutral"},{"id":"status-display","label":"Status Announcement\n(aria-live)","type":"output"}],"edges":[{"from":"user-input","to":"kick-handler","label":"triggers"},{"from":"kick-handler","to":"state-update","label":"updates"},{"from":"state-update","to":"scoreboard-update","label":"notifies"},{"from":"scoreboard-update","to":"dom-render","label":"renders"},{"from":"kick-handler","to":"particle-spawn","label":"triggers"},{"from":"particle-spawn","to":"particle-dom","label":"creates"},{"from":"kick-handler","to":"status-update","label":"calls"},{"from":"status-update","to":"status-display","label":"announces"}]}]},{"id":"package-structure","title":"Package & File Structure","parentId":null,"sourceFiles":[{"path":"package.json","lineStart":1,"lineEnd":23},{"path":"WIKI.md","lineStart":14,"lineEnd":28}],"content":[{"type":"table","headers":["File/Directory","Type","Purpose"],"rows":[["app.js","Application","Main application logic: state management, game mechanics, DOM updates"],["app.test.js","Test Suite","60+ comprehensive test cases covering all app functionality"],["vitest.config.js","Config","Vitest configuration with jsdom environment and coverage thresholds (80% lines/functions/statements, 75% branches)"],["package.json","Manifest","Project metadata and npm scripts (dev, build, test, test:watch, test:coverage, test:ui)"],["docs/API.md","Documentation","Developer API reference for functions, events, animation states, CSS properties, and error cases"],["docs/FORGE_SESSION.md","Documentation","Forge session solution summary with changelog and architecture notes"],["docs/FORGE_WIKI.md","Documentation","Knowledge base entry documenting the test solution and generated files"],["README.md","Documentation","Project overview and getting started guide"],["WIKI.md","Documentation","Repository structure and file inventory"]]}]},{"id":"api-reference","title":"API Reference","parentId":null,"sourceFiles":[{"path":"docs/API.md","lineStart":1,"lineEnd":150},{"path":"app.test.js","lineStart":85,"lineEnd":180}],"content":[{"type":"heading","level":2,"text":"JavaScript Functions"},{"type":"heading","level":3,"text":"setStatus(msg)"},{"type":"paragraph","text":"Updates the status element text content. Handles type coercion (converts input to string) and XSS prevention via textContent property. Used to announce game events to users and screen readers."},{"type":"code","language":"javascript","content":"function setStatus(msg) {\n  statusEl.textContent = String(msg);\n}"},{"type":"heading","level":3,"text":"kick()"},{"type":"paragraph","text":"Triggers the kick action: increments kicks counter, increments streak, updates record if streak exceeds it, spawns particles, updates scoreboard display, and announces status. This is the primary game mechanic."},{"type":"code","language":"javascript","content":"function kick() {\n  state.kicks += 1;\n  state.streak += 1;\n  if (state.streak > state.record) {\n    state.record = state.streak;\n  }\n  spawnParticles();\n  updateScoreboard();\n  setStatus(`Kick #${state.kicks}! Streak: ${state.streak}`);\n}"},{"type":"heading","level":3,"text":"miss()"},{"type":"paragraph","text":"Resets the streak to zero and updates the scoreboard display. Called when a missed kick occurs, breaking the current streak while preserving the record."},{"type":"code","language":"javascript","content":"function miss() {\n  state.streak = 0;\n  updateScoreboard();\n  setStatus('Missed! Streak reset.');\n}"},{"type":"heading","level":3,"text":"updateScoreboard()"},{"type":"paragraph","text":"Synchronizes the scoreboard DOM elements with current state values. Updates text content for kicks, record, and streak displays. When prefers-reduced-motion is not set, applies 'bump' animation class and removes it after animation completes."},{"type":"heading","level":3,"text":"spawnParticles(count)"},{"type":"paragraph","text":"Creates particle burst effect by appending span elements to the particle container. Default count is 8. Applies 'particle--animated' class unless prefers-reduced-motion is enabled. Used to provide visual feedback for successful kicks."},{"type":"heading","level":2,"text":"DOM Structure"},{"type":"table","headers":["Element ID","Role/Purpose","Accessibility"],"rows":[["kick-btn","Kick trigger button","aria-label=\"Kick the ball\""],["status","Status announcer","role=\"status\", aria-live=\"polite\", aria-atomic=\"true\""],["kicks-value, record-value, streak-value","Scoreboard score displays","Updated via updateScoreboard()"],["particle-container","Particle effect host","aria-hidden=\"true\""]]},{"type":"heading","level":2,"text":"Event API"},{"type":"paragraph","text":"The application listens for click events on the kick button and keyboard events (Enter or Space key). Both trigger the kick() function."},{"type":"code","language":"javascript","content":"kickBtn.addEventListener('click', kick);\nkickBtn.addEventListener('keydown', (e) => {\n  if (e.key === 'Enter' || e.key === ' ') {\n    e.preventDefault();\n    kick();\n  }\n});"}]},{"id":"game-mechanics","title":"Game Mechanics & State","parentId":null,"sourceFiles":[{"path":"app.test.js","lineStart":230,"lineEnd":330}],"content":[{"type":"heading","level":2,"text":"State Properties"},{"type":"table","headers":["Property","Type","Initial Value","Description"],"rows":[["kicks","number","0","Total count of kicks performed in the session"],["streak","number","0","Current consecutive successful kicks; reset to 0 on miss"],["record","number","0","Highest streak achieved in the session; never decreases"]]},{"type":"heading","level":2,"text":"Invariants"},{"type":"unorderedList","items":["record >= streak (record never decreases, only updated when streak exceeds it)","kicks >= streak (total kicks must be >= current streak)","All state values are non-negative integers","streak resets to 0 on miss() but record is preserved","DOM scoreboard always reflects current state values"]},{"type":"heading","level":2,"text":"Kick Mechanics Flow"},{"type":"orderedList","items":["User clicks kick button or presses Enter/Space","kick() function executes","kicks counter increments by 1","streak counter increments by 1","If streak > record, record updates to new streak value","Particle burst effect spawns (8 particles by default)","updateScoreboard() refreshes all display values","Bump animation plays on score values (unless reduced-motion enabled)","setStatus() announces the kick with current streak information","Status message broadcast via aria-live region"]}]},{"id":"testing-strategy","title":"Testing Strategy & Coverage","parentId":null,"sourceFiles":[{"path":"app.test.js","lineStart":1,"lineEnd":698},{"path":"vitest.config.js","lineStart":1,"lineEnd":19}],"content":[{"type":"heading","level":2,"text":"Test Suite Organization"},{"type":"table","headers":["Test Suite","Test Count","Focus Area"],"rows":[["setStatus helper","7","Edge cases: empty strings, long strings, HTML entities, numeric coercion, null handling, rapid calls"],["initial game state","3","Verify kicks, streak, and record all start at 0"],["kick mechanics","8","Increment logic, streak tracking, record updates, state consistency"],["scoreboard DOM rendering","6","Display synchronization, text content updates, animation classes"],["particle burst effects","5","Particle creation, count validation, animation class application, cleanup"],["keyboard & ARIA accessibility","10","Enter/Space key handling, preventDefault, aria-live announcements, button semantics"],["prefers-reduced-motion support","8","Animation suppression for scoreboard, particles, and reduced-motion queries"],["stress & integrity suite","8","Random action sequences, invariant validation, DOM consistency checks"]]},{"type":"heading","level":2,"text":"Coverage Configuration"},{"type":"code","language":"javascript","content":"coverage: {\n  provider: 'v8',\n  reporter: ['text', 'lcov', 'html'],\n  thresholds: {\n    lines: 80,\n    functions: 80,\n    branches: 75,\n    statements: 80,\n  },\n}"},{"type":"heading","level":2,"text":"Test Execution"},{"type":"table","headers":["Command","Purpose"],"rows":[["pnpm test","Run all tests once in headless mode"],["pnpm test:watch","Watch mode for iterative development"],["pnpm test:coverage","Run tests and generate coverage reports (text, lcov, html)"],["pnpm test:ui","Launch Vitest UI dashboard for visual inspection"]]},{"type":"heading","level":2,"text":"Key Test Patterns"},{"type":"unorderedList","items":["DOM isolation: Each test gets a fresh JSDOM instance via buildDOM()","App factory: createApp() instantiates the app logic with isolated state and event handlers","State verification: Direct assertions on state object properties after operations","DOM assertions: Verify textContent, classList, element existence, and animation event firing","Accessibility verification: Assert role, aria-label, aria-live, and aria-atomic attributes","Reduced-motion branching: Conditional test execution based on prefersReducedMotion flag","Stress testing: Randomized action sequences with invariant validation loops"]}]},{"id":"accessibility-features","title":"Accessibility & Motion Preferences","parentId":null,"sourceFiles":[{"path":"app.test.js","lineStart":490,"lineEnd":590}],"content":[{"type":"heading","level":2,"text":"ARIA Attributes"},{"type":"table","headers":["Element","Attribute","Value","Purpose"],"rows":[["kick-btn","aria-label","\"Kick the ball\"","Descriptive label for screen reader users"],["status","role","\"status\"","Semantic role for dynamic status updates"],["status","aria-live","\"polite\"","Announces content changes without interrupting current speech"],["status","aria-atomic","\"true\"","Screen readers announce entire status element content on update"],["particle-container","aria-hidden","\"true\"","Decorative particles are hidden from accessibility tree"],["centre-circle","aria-hidden","\"true\"","Decorative graphics hidden from accessibility tree"]]},{"type":"heading","level":2,"text":"Keyboard Navigation"},{"type":"unorderedList","items":["Enter key: Triggers kick when button has focus","Space key: Triggers kick when button has focus","preventDefault() called on key events to prevent default browser behavior","Tab navigation supported through native button semantics"]},{"type":"heading","level":2,"text":"Motion Preferences (prefers-reduced-motion)"},{"type":"paragraph","text":"The app respects user motion preferences via the prefers-reduced-motion CSS media query. When enabled, animations are disabled both for scoreboard bump effects and particle burst animations."},{"type":"unorderedList","items":["Scoreboard: 'bump' animation class not applied when prefersReducedMotion is true","Particles: 'particle--animated' class not applied when prefersReducedMotion is true","All functional state updates remain unaffected; only visual animations are suppressed","Motion preferences allow users with vestibular disorders, migraines, or sensory sensitivities to use the app comfortably"]}]},{"id":"setup-and-development","title":"Setup & Development Guide","parentId":null,"sourceFiles":[{"path":"README.md","lineStart":20,"lineEnd":40},{"path":"package.json","lineStart":1,"lineEnd":23}],"content":[{"type":"heading","level":2,"text":"Installation & Setup"},{"type":"orderedList","items":["Clone the repository: git clone https://github.com/ali1092-SC/samplefootballapp.git","Install dependencies: pnpm install (or npm install)","Verify installation: pnpm test"]},{"type":"heading","level":2,"text":"Development Scripts"},{"type":"table","headers":["Script","Command","Purpose"],"rows":[["dev","pnpm dev","Start Vite dev server with hot module reload"],["build","pnpm build","Build optimized production bundle"],["preview","pnpm preview","Preview production build locally"],["test","pnpm test","Run all tests once (headless)"],["test:watch","pnpm test:watch","Run tests in watch mode"],["test:coverage","pnpm test:coverage","Generate coverage reports (text, lcov, html)"],["test:ui","pnpm test:ui","Launch Vitest UI dashboard"]]},{"type":"heading","level":2,"text":"Dependencies"},{"type":"unorderedList","items":["vite (5.0.0+): Frontend build tool and dev server","vitest (1.0.0+): Unit test framework with jsdom support","@vitest/coverage-v8 (1.0.0+): Code coverage provider","@vitest/ui (1.0.0+): Visual test dashboard","jsdom (24.0.0+): Browser DOM implementation for Node.js testing"]}]},{"id":"documentation","title":"Documentation Files","parentId":null,"sourceFiles":[{"path":"docs/API.md","lineStart":1,"lineEnd":50},{"path":"docs/FORGE_SESSION.md","lineStart":1,"lineEnd":50},{"path":"docs/FORGE_WIKI.md","lineStart":1,"lineEnd":50}],"content":[{"type":"heading","level":2,"text":"Documentation Index"},{"type":"table","headers":["Document","Audience","Content"],"rows":[["docs/API.md","Developers","Complete API reference for all functions, DOM structure, events, animation states, CSS properties, and error handling"],["docs/FORGE_SESSION.md","Project Leads","Solution summary, task description, changes made, setup instructions, and changelog"],["docs/FORGE_WIKI.md","Knowledge Base","Knowledge base entry documenting test implementation, architecture, and generated files"],["README.md","Users & Developers","Project overview, getting started guide, and development instructions"],["WIKI.md","Repository Managers","Repository structure inventory and file organization"]]}]},{"id":"recent-changes","title":"Recent Changes","parentId":null,"sourceFiles":[{"path":"README.md","lineStart":45,"lineEnd":60},{"path":"docs/FORGE_SESSION.md","lineStart":20,"lineEnd":35}],"content":[{"type":"heading","level":2,"text":"Latest Update: 2026-06-18 14:07:59 UTC"},{"type":"paragraph","text":"Task: Add comprehensive test cases to the Football App"},{"type":"heading","level":3,"text":"Files Modified"},{"type":"table","headers":["File","Change Type","Description"],"rows":[["app.js","Updated","Application logic (no functional changes in this update)"],["app.test.js","Generated","New comprehensive test suite with 60+ test cases across 8 describe blocks"],["vitest.config.js","Updated","Added coverage configuration with thresholds (80% lines/functions/statements, 75% branches)"],["package.json","Updated","Added test scripts (test:coverage, test:ui) and updated dev dependencies"]]},{"type":"heading","level":3,"text":"Test Coverage Summary"},{"type":"unorderedList","items":["setStatus: XSS prevention, type coercion, edge cases (empty, long, special chars, null)","Initial state: Verify all counters start at 0","Kick mechanics: Increment logic, streak tracking, record updates","Scoreboard DOM: Display synchronization, animation class application","Particles: Creation, animation classes, reduced-motion handling","Accessibility: ARIA attributes, keyboard navigation (Enter/Space)","prefers-reduced-motion: Animation suppression for both scoreboard and particles","Stress testing: Random action sequences with invariant validation"]}]}]}
```

# ali1092-SC/samplefootballapp

> A sample football app with interactive kick mechanics, scoreboard tracking, particle effects, and comprehensive test coverage.

## Overview

The Football App is a single-page browser application that renders an animated football with interactive kick mechanics. Users can trigger kicks to increment game statistics (kicks, streak, record), spawn particle burst effects, and receive real-time feedback through an accessible status display. The application includes comprehensive test coverage across game state management, DOM synchronization, accessibility features, motion preference handling, and stress-integrity validation.

The test suite adds 60+ new test cases across eight describe blocks covering: setStatus edge cases (XSS, coercion, rapid calls), kick/miss game mechanics, scoreboard DOM synchronisation, particle burst rendering, keyboard and ARIA accessibility, prefers-reduced-motion branching for both animations and particles, and a stress-integrity suite that validates invariants.

## System Architecture

### Architecture Overview

The Football App is built on vanilla JavaScript with a modular state management pattern. The core application exposes a lightweight event-driven API built entirely on native browser events, CSS keyframe animations, and DOM manipulation. The test suite uses Vitest with jsdom to validate all business logic in isolation.

#### Core Components

- State Management: Central state object tracking kicks, streak, and record
- DOM Interface: Scoreboard display elements, status announcer, particle container, and kick button
- Event Handlers: Click listeners, keyboard navigation (Enter/Space), and animation event cleanup
- Game Logic: kick() and miss() functions managing state transitions and streak mechanics
- Accessibility Layer: ARIA attributes, role-based semantics, and reduced-motion support

## Package & File Structure

| File/Directory | Type | Purpose |
| --- | --- | --- |
| app.js | Application | Main application logic: state management, game mechanics, DOM updates |
| app.test.js | Test Suite | 60+ comprehensive test cases covering all app functionality |
| vitest.config.js | Config | Vitest configuration with jsdom environment and coverage thresholds (80% lines/functions/statements, 75% branches) |
| package.json | Manifest | Project metadata and npm scripts (dev, build, test, test:watch, test:coverage, test:ui) |
| docs/API.md | Documentation | Developer API reference for functions, events, animation states, CSS properties, and error cases |
| docs/FORGE_SESSION.md | Documentation | Forge session solution summary with changelog and architecture notes |
| docs/FORGE_WIKI.md | Documentation | Knowledge base entry documenting the test solution and generated files |
| README.md | Documentation | Project overview and getting started guide |
| WIKI.md | Documentation | Repository structure and file inventory |

## API Reference

### JavaScript Functions

#### setStatus(msg)

Updates the status element text content. Handles type coercion (converts input to string) and XSS prevention via textContent property. Used to announce game events to users and screen readers.

```javascript
function setStatus(msg) {
  statusEl.textContent = String(msg);
}
```

#### kick()

Triggers the kick action: increments kicks counter, increments streak, updates record if streak exceeds it, spawns particles, updates scoreboard display, and announces status. This is the primary game mechanic.

```javascript
function kick() {
  state.kicks += 1;
  state.streak += 1;
  if (state.streak > state.record) {
    state.record = state.streak;
  }
  spawnParticles();
  updateScoreboard();
  setStatus(`Kick #${state.kicks}! Streak: ${state.streak}`);
}
```

#### miss()

Resets the streak to zero and updates the scoreboard display. Called when a missed kick occurs, breaking the current streak while preserving the record.

```javascript
function miss() {
  state.streak = 0;
  updateScoreboard();
  setStatus('Missed! Streak reset.');
}
```

#### updateScoreboard()

Synchronizes the scoreboard DOM elements with current state values. Updates text content for kicks, record, and streak displays. When prefers-reduced-motion is not set, applies 'bump' animation class and removes it after animation completes.

#### spawnParticles(count)

Creates particle burst effect by appending span elements to the particle container. Default count is 8. Applies 'particle--animated' class unless prefers-reduced-motion is enabled. Used to provide visual feedback for successful kicks.

### DOM Structure

| Element ID | Role/Purpose | Accessibility |
| --- | --- | --- |
| kick-btn | Kick trigger button | aria-label="Kick the ball" |
| status | Status announcer | role="status", aria-live="polite", aria-atomic="true" |
| kicks-value, record-value, streak-value | Scoreboard score displays | Updated via updateScoreboard() |
| particle-container | Particle effect host | aria-hidden="true" |

### Event API

The application listens for click events on the kick button and keyboard events (Enter or Space key). Both trigger the kick() function.

```javascript
kickBtn.addEventListener('click', kick);
kickBtn.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    kick();
  }
});
```

## Game Mechanics & State

### State Properties

| Property | Type | Initial Value | Description |
| --- | --- | --- | --- |
| kicks | number | 0 | Total count of kicks performed in the session |
| streak | number | 0 | Current consecutive successful kicks; reset to 0 on miss |
| record | number | 0 | Highest streak achieved in the session; never decreases |

### Invariants

- record >= streak (record never decreases, only updated when streak exceeds it)
- kicks >= streak (total kicks must be >= current streak)
- All state values are non-negative integers
- streak resets to 0 on miss() but record is preserved
- DOM scoreboard always reflects current state values

### Kick Mechanics Flow

1. User clicks kick button or presses Enter/Space
2. kick() function executes
3. kicks counter increments by 1
4. streak counter increments by 1
5. If streak > record, record updates to new streak value
6. Particle burst effect spawns (8 particles by default)
7. updateScoreboard() refreshes all display values
8. Bump animation plays on score values (unless reduced-motion enabled)
9. setStatus() announces the kick with current streak information
10. Status message broadcast via aria-live region

## Testing Strategy & Coverage

### Test Suite Organization

| Test Suite | Test Count | Focus Area |
| --- | --- | --- |
| setStatus helper | 7 | Edge cases: empty strings, long strings, HTML entities, numeric coercion, null handling, rapid calls |
| initial game state | 3 | Verify kicks, streak, and record all start at 0 |
| kick mechanics | 8 | Increment logic, streak tracking, record updates, state consistency |
| scoreboard DOM rendering | 6 | Display synchronization, text content updates, animation classes |
| particle burst effects | 5 | Particle creation, count validation, animation class application, cleanup |
| keyboard & ARIA accessibility | 10 | Enter/Space key handling, preventDefault, aria-live announcements, button semantics |
| prefers-reduced-motion support | 8 | Animation suppression for scoreboard, particles, and reduced-motion queries |
| stress & integrity suite | 8 | Random action sequences, invariant validation, DOM consistency checks |

### Coverage Configuration

```javascript
coverage: {
  provider: 'v8',
  reporter: ['text', 'lcov', 'html'],
  thresholds: {
    lines: 80,
    functions: 80,
    branches: 75,
    statements: 80,
  },
}
```

### Test Execution

| Command | Purpose |
| --- | --- |
| pnpm test | Run all tests once in headless mode |
| pnpm test:watch | Watch mode for iterative development |
| pnpm test:coverage | Run tests and generate coverage reports (text, lcov, html) |
| pnpm test:ui | Launch Vitest UI dashboard for visual inspection |

### Key Test Patterns

- DOM isolation: Each test gets a fresh JSDOM instance via buildDOM()
- App factory: createApp() instantiates the app logic with isolated state and event handlers
- State verification: Direct assertions on state object properties after operations
- DOM assertions: Verify textContent, classList, element existence, and animation event firing
- Accessibility verification: Assert role, aria-label, aria-live, and aria-atomic attributes
- Reduced-motion branching: Conditional test execution based on prefersReducedMotion flag
- Stress testing: Randomized action sequences with invariant validation loops

## Accessibility & Motion Preferences

### ARIA Attributes

| Element | Attribute | Value | Purpose |
| --- | --- | --- | --- |
| kick-btn | aria-label | "Kick the ball" | Descriptive label for screen reader users |
| status | role | "status" | Semantic role for dynamic status updates |
| status | aria-live | "polite" | Announces content changes without interrupting current speech |
| status | aria-atomic | "true" | Screen readers announce entire status element content on update |
| particle-container | aria-hidden | "true" | Decorative particles are hidden from accessibility tree |
| centre-circle | aria-hidden | "true" | Decorative graphics hidden from accessibility tree |

### Keyboard Navigation

- Enter key: Triggers kick when button has focus
- Space key: Triggers kick when button has focus
- preventDefault() called on key events to prevent default browser behavior
- Tab navigation supported through native button semantics

### Motion Preferences (prefers-reduced-motion)

The app respects user motion preferences via the prefers-reduced-motion CSS media query. When enabled, animations are disabled both for scoreboard bump effects and particle burst animations.

- Scoreboard: 'bump' animation class not applied when prefersReducedMotion is true
- Particles: 'particle--animated' class not applied when prefersReducedMotion is true
- All functional state updates remain unaffected; only visual animations are suppressed
- Motion preferences allow users with vestibular disorders, migraines, or sensory sensitivities to use the app comfortably

## Setup & Development Guide

### Installation & Setup

1. Clone the repository: git clone https://github.com/ali1092-SC/samplefootballapp.git
2. Install dependencies: pnpm install (or npm install)
3. Verify installation: pnpm test

### Development Scripts

| Script | Command | Purpose |
| --- | --- | --- |
| dev | pnpm dev | Start Vite dev server with hot module reload |
| build | pnpm build | Build optimized production bundle |
| preview | pnpm preview | Preview production build locally |
| test | pnpm test | Run all tests once (headless) |
| test:watch | pnpm test:watch | Run tests in watch mode |
| test:coverage | pnpm test:coverage | Generate coverage reports (text, lcov, html) |
| test:ui | pnpm test:ui | Launch Vitest UI dashboard |

### Dependencies

- vite (5.0.0+): Frontend build tool and dev server
- vitest (1.0.0+): Unit test framework with jsdom support
- @vitest/coverage-v8 (1.0.0+): Code coverage provider
- @vitest/ui (1.0.0+): Visual test dashboard
- jsdom (24.0.0+): Browser DOM implementation for Node.js testing

## Documentation Files

### Documentation Index

| Document | Audience | Content |
| --- | --- | --- |
| docs/API.md | Developers | Complete API reference for all functions, DOM structure, events, animation states, CSS properties, and error handling |
| docs/FORGE_SESSION.md | Project Leads | Solution summary, task description, changes made, setup instructions, and changelog |
| docs/FORGE_WIKI.md | Knowledge Base | Knowledge base entry documenting test implementation, architecture, and generated files |
| README.md | Users & Developers | Project overview, getting started guide, and development instructions |
| WIKI.md | Repository Managers | Repository structure inventory and file organization |

## Recent Changes

### Latest Update: 2026-06-18 14:07:59 UTC

Task: Add comprehensive test cases to the Football App

#### Files Modified

| File | Change Type | Description |
| --- | --- | --- |
| app.js | Updated | Application logic (no functional changes in this update) |
| app.test.js | Generated | New comprehensive test suite with 60+ test cases across 8 describe blocks |
| vitest.config.js | Updated | Added coverage configuration with thresholds (80% lines/functions/statements, 75% branches) |
| package.json | Updated | Added test scripts (test:coverage, test:ui) and updated dev dependencies |

#### Test Coverage Summary

- setStatus: XSS prevention, type coercion, edge cases (empty, long, special chars, null)
- Initial state: Verify all counters start at 0
- Kick mechanics: Increment logic, streak tracking, record updates
- Scoreboard DOM: Display synchronization, animation class application
- Particles: Creation, animation classes, reduced-motion handling
- Accessibility: ARIA attributes, keyboard navigation (Enter/Space)
- prefers-reduced-motion: Animation suppression for both scoreboard and particles
- Stress testing: Random action sequences with invariant validation

---
*Generated by Forge on 2026-06-18*