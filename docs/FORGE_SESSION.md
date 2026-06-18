# Forge Session Solution

## Overview

Generated 4 files implementing the approved plan.

## Task Description

> # FIFA World Cup 2026 — Full Devin Build Prompt

## How to use
Paste the content below directly into Devin as a new session prompt.

---

```
## Project: FIFA World Cup 2026 — Official-Style Single-Page Web Application

### Role
You are a senior front-end engineer. Build a single self-contained HTML
file (no build tools, no npm, no frameworks — pure HTML + CSS + vanilla
JavaScript). Surface a plan before writing any code. Do not start
implementation until I type "approved".

Deliverable: one file — index.html

---

## BRAND AND VISUAL IDENTITY

### FIFA World Cup 2026 Official Logo (build as inline SVG)
The 2026 logo was designed by Toronto agency Public Address and unveiled
May 17, 2023 at Griffith Observatory, Los Angeles. It features:
  - The actual FIFA World Cup trophy rendered photorealistically in gold
  - Stacked "2" and "6" numerals built from 48 geometric units (squares
    and quarter-circles), referencing the 48 competing nations
  - Primary palette: black background, gold numerals, gold trophy
  - "FIFA" wordmark in bold geometric sans-serif with diagonal-cut F bars
  - "WE ARE 26" campaign tagline

Build the logo as a reusable SVG with these exact layers:

  LAYER 1 — Stacked "2" (top numeral):
    Bold block "2" built from a 6×8 grid of squares + quarter-circle arcs
    Height ≈ 55% of total SVG height (top half)
    Fill: linear gradient id="goldGrad" #f5d675 → #c9a227 → #a07a10
    Stroke: none

  LAYER 2 — Stacked "6" (bottom numeral, directly below "2"):
    Bold block "6" in same geometric grid style, same proportions
    Height ≈ 55% of total SVG height (bottom half, overlapping slightly)
    Same goldGrad fill

  LAYER 3 — Trophy SVG path (centered, spanning both numerals):
    Draw the FIFA World Cup Trophy silhouette as SVG paths:
      - Pedestal/base: wide trapezoid at bottom, 3 tiers
      - Stem: narrow tapered column rising from base
      - Cup body: wide symmetrical bowl shape
      - Crown: two simplified human figures with arms raised
        holding a globe/circle at the top
    The trophy overlays the center of the "26" and extends above it
    Fill: radial gradient from #f5e88a (bright center) to #c9a227 (edge)
    Drop-shadow filter: feDropShadow dx=0 dy=4 stdDeviation=8
      flood-color=#c9a227 flood-opacity=0.7
    Trophy height: ~80% of total SVG height, centered horizontally

  LAYER 4 — "FIFA" wordmark:
    <text> element: "FIFA"
    Font-family: 'Bebas Neue', sans-serif
    Font-size: proportional (≈ 14% of SVG width)
    Fill: #ffffff, letter-spacing: 4
    Positioned below the "6", centered horizontally
    Style the two "F" letters with diagonal cuts using a <clipPath>
    or by noting in a comment that Bebas Neue naturally renders this style

  LAYER 5 — Host nations line:
    <text>: "CANADA · MEXICO · USA"
    Font: 'Inter', 9px, fill: #b0b8c8, letter-spacing: 2
    Centered, below "FIFA" wordmark

  OUTER FRAME:
    SVG viewBox="0 0 280 380"
    Background <rect>: fill #0a1628, rx=4
    Gold border <rect>: fill none, stroke #c9a227, strokeWidth 2, rx=4

  THREE SIZES via CSS classes:
    .logo-hero   { width: 220px }   — hero section
    .logo-nav    { height: 36px }   — navigation bar
    .logo-footer { width: 80px }    — footer
    .logo-stamp  { width: 60px }    — section cards + predictor
    .logo-section{ height: 44px }   — section headers (desktop only)
    .logo-ticker { height: 28px }   — live scores banner

### OFFICIAL LOGO PLACEMENT — USE EVERYWHERE
The FIFA World Cup 2026 SVG logo is the OFFICIAL emblem of the
tournament. It MUST appear in every major section of the page as a
branded anchor point. No section should be left unbranded.

  Mandatory placements (do not omit any):
  1.  NAV BAR (left side)                — class="logo-nav"
  2.  HERO SECTION (centered, floating)  — class="logo-hero"
  3.  LIVE SCORES BANNER (left label)    — class="logo-ticker"
                                            inside the left anchor div
  4.  STATS STRIP (centered above grid)  — class="logo-stamp"
  5.  VENUES SECTION header area         — class="logo-section"
                                            right-aligned next to h2
  6.  GROUPS SECTION header area         — class="logo-section"
  7.  PLAYERS SECTION header area        — class="logo-section"
  8.  SCHEDULE SECTION header area       — class="logo-section"
  9.  PREDICTOR CARD (top, centered)     — class="logo-stamp"
  10. FOOTER (centered)                  — class="logo-footer"

  Section header pattern (sections 5–8):
    <div class="section-brand-row">
      <img/svg class="logo-section" .../>
      <div class="section-brand-divider"></div>  ← 1px gold vertical line, height 44px
      <div class="section-brand-text">
        <span class="section-label">HOST STADIUMS</span>
        <h2 class="section-title">ICONIC <em>VENUES</em></h2>
      </div>
    </div>
    .section-brand-row: display flex, align-items center, gap 20px, margin-bottom 8px
    .section-brand-divider: width 1px, height 44px, background --fifa-gold, opacity 0.5
    On mobile (< 768px): .logo-section display:none — hide to avoid crowding

### Color Palette (CSS custom properties in :root)
  --fifa-navy:       #0a1628
  --fifa-blue:       #1a3a6e
  --fifa-gold:       #c9a227
  --fifa-gold-light: #f5d675
  --fifa-red:        #c1272d
  --fifa-white:      #f5f5f0
  --fifa-silver:     #b0b8c8
  --glow-gold: 0 0 40px rgba(201,162,39,0.4)

### Typography (Google Fonts — import in <head>)
  Display/hero: 'Bebas Neue'
  Body/UI:      'Inter' (weights 300,400,500,600,700)
  Names/labels: 'Oswald' (weights 400,500,600,700)

---

## ANIMATED FOOTBALL

Implement using HTML5 Canvas:

  <canvas id="ball-canvas">:
    position: fixed, top:0, left:0, width:100%, height:100%
    z-index: 1, pointer-events: none
    opacity: 0.16

  5 ball objects, each with:
    x, y: random start within viewport
    vx, vy: random velocity ±0.4 to ±1.8
    r: radius 16px to 44px (5 different sizes: 16,24,32,38,44)
    rotation: 0
    rotSpeed: random ±0.015 to ±0.03

  drawBall(ctx, ball) function:
    ctx.save() + ctx.translate(ball.x, ball.y) + ctx.rotate(ball.rot)

    1. Main circle:
       ctx.beginPath(); arc(0,0,r,0,2π)
       strokeStyle: 'rgba(201,162,39,0.65)', lineWidth: 1.5

    2. 5 pentagon patches at these relative positions:
       Center: [0, -r*0.52]
       Other 4: evenly around at radius r*0.52 from center
       Each pentagon: 5 sides, vertex radius = r*0.2
       strokeStyle: 'rgba(201,162,39,0.4)', lineWidth: 1.0

    3. Lines connecting pentagon centers:
       Draw 5 lines from center pentagon to each outer pentagon
       strokeStyle: 'rgba(201,162,39,0.2)', lineWidth: 0.7

    4. Shadow glow:
       ctx.shadowBlur = 14
       ctx.shadowColor = 'rgba(201,162,39,0.35)'

    ctx.restore()

  Tick loop (requestAnimationFrame):
    ctx.clearRect(0,0,W,H)
    for each ball: update x+=vx, y+=vy, rot+=rotSpeed
    Edge wrap: if x < -r set x = W+r (all 4 edges)
    Draw each ball

  Resize handler: update W,H on window resize

  prefers-reduced-motion: if matchMedia('(prefers-reduced-motion: reduce)')
    .matches — do not start the animation at all

  Visibility: cancelAnimationFrame when document.hidden = true
    Resume when visible again (visibilitychange event)

---

## PAGE SECTIONS

### SECTION 1 — NAVIGATION
  position: fixed, top:0, left:0, right:0, z-index: 100
  height: 64px, padding: 0 40px
  Background: rgba(10,22,40,0.93), backdrop-filter: blur(14px)
  Border-bottom: 1px solid rgba(201,162,39,0.18)
  Transition: border-color 0.3s on scroll

  Left:   Logo SVG with class="logo-nav"
  Center: <ul> nav links
    Venues | Groups | Stars | Schedule | Predictor
    Font: Inter 12px weight 600, uppercase, letter-spacing 0.6px
    Default: --fifa-silver
    Hover: --fifa-gold, transition 0.2s
    Active (current section in view): --fifa-gold + 2px solid gold border-bottom
    Each link: padding-bottom 4px, border-bottom 2px solid transparent by default

  NAV LINK BEHAVIOUR — smooth scroll with offset:
    Every nav link uses onclick="navTo(event,'sectionId')"
    Do NOT rely on default browser anchor jump (it doesn't account for fixed nav)

    JavaScript function navTo(e, sectionId):
      e.preventDefault()
      const target = document.getElementById(sectionId)
      if (!target) return
      const navHeight = document.querySelector('nav').offsetHeight     // 64px
      const bannerHeight = 38                                          // fixed banner
      const gap = 12                                                   // breathing room
      const offset = navHeight + bannerHeight + gap
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset
      window.scrollTo({ top, behavior: 'smooth' })
      // Immediately mark the clicked link as active without waiting for scroll
      document.querySelectorAll('.nav-links a').forEach(a =>
        a.classList.toggle('active', a.getAttribute('href') === '#' + sectionId)
      )

    ARIA:
      Each link: aria-label="Go to [Section Name] section"
      e.g. aria-label="Go to Venues section"

  ACTIVE NAV HIGHLIGHT — highlightActiveNav():
    Runs on every scroll event (passive listener for performance)
    Sections to watch: ['venues','groups','players','schedule','predictor']
    Trigger line: navHeight + bannerHeight + 80px from viewport top
    Logic: for each section id, if section.getBoundingClientRect().top ≤ trigger
      → set that section as current (last one that passes wins)
    Toggle .active class on the matching nav link
    .active CSS: color --fifa-gold, border-bottom 2px solid --fifa-gold

    CSS for active state:
      .nav-links a.active {
        color: var(--fifa-gold);
        border-bottom-color: var(--fifa-gold);
      }

  Mobile nav smooth scroll:
    Mobile menu links also use navTo() onclick
    After navTo() fires on mobile: close the mobile menu
      (set menu display:none or toggle .menu-open class on nav)
  Right:  "GET TICKETS" button
    Background: --fifa-gold, color: --fifa-navy
    Padding: 8px 20px, border-radius: 3px
    Font: 11px bold uppercase letter-spacing 1.2px
    href: "https://www.ticketmaster.com/fifaworldcup2026"
    target: "_blank", rel: "noopener noreferrer"
    aria-label: "Get FIFA World Cup 2026 tickets on Ticketmaster (opens in new tab)"
    On hover: opacity 0.88, add small external link icon ↗ after label text

  On scroll > 50px: nav gets box-shadow: 0 4px 20px rgba(0,0,0,0.6)

  Mobile (< 768px): hide nav links, show hamburger (☰)
    Hamburger click → slide-down mobile menu (full-width, navy bg)

### SECTION 1B — LIVE SCORES ROTATION BANNER
  POSITION: immediately below the fixed nav bar (not after the hero).
  This banner is FIXED to the top of the viewport, directly under the nav.

  Layout:
    position: fixed
    top: 64px                        ← nav height
    left: 0, right: 0
    z-index: 99                      ← just below nav (z-index 100)
    height: 38px
    overflow: hidden

  This means the main content top padding must be:
    body or .page-content: padding-top: 102px  (64px nav + 38px banner)
    Hero section: padding-top: 102px minimum before its own 80px top padding

  Banner visual:
    Background: --fifa-red
    Border-bottom: 2px solid rgba(255,255,255,0.12)

  Left anchor (fixed, does not scroll):
    position: absolute or flex-shrink: 0
    width: 130px, height: 38px
    background: rgba(0,0,0,0.35)
    display: flex, align-items: center, gap: 8px
    padding: 0 12px
    border-right: 1px solid rgba(255,255,255,0.18)
    Contains:
      FIFA 2026 logo SVG — class="logo-ticker" (height 24px)
      "LIVE" text: Inter 10px weight 700 uppercase letter-spacing 1.5px
                   color #ffffff
      Pulsing red dot: 6px circle, background #ff4444
        animation: opacity 1→0.2→1, 0.9s ease-in-out infinite

  Rotating match items (ROTATION mode — not linear scroll):
    Each match item is shown one at a time, fading in/out on a timer.
    Display one item for 3.5 seconds, then crossfade to the next.
    The transition is: opacity 0→1 (0.4s) · hold · opacity 1→0 (0.4s)

    Implementation:
      Array of match objects in JavaScript:
      const matches = [
        { home:'🇦🇷 Argentina', score:'2 - 1', away:'🇫🇷 France',   status:'LIVE 67\'', live:true },
        { home:'🇧🇷 Brazil',    score:'3 - 0', away:'🇷🇸 Serbia',   status:'LIVE 82\'', live:true },
        { home:'🇩🇪 Germany',   score:'1 - 1', away:'🇪🇸 Spain',    status:'LIVE 55\'', live:true },
        { home:'🏴󠁧󠁢󠁥󠁮󠁧󠁿 England',  score:'2 - 0', away:'🇲🇦 Morocco',  status:'LIVE 71\'', live:true },
        { home:'🇵🇹 Portugal', score:'1 - 0', away:'🇯🇵 Japan',    status:'FT',         live:false },
        { home:'🇳🇱 Netherlands',score:'2-2', away:'🇲🇽 Mexico',   status:'FT',         live:false },
        { home:'🇺🇸 USA',       score:'1 - 0', away:'🇨🇦 Canada',  status:'LIVE 43\'', live:true  },
        { home:'🇭🇷 Croatia',   score:'0 - 0', away:'🇧🇪 Belgium',  status:'LIVE 28\'', live:true  },
      ]

      let currentIndex = 0
      function rotateBanner() {
        const item = matches[currentIndex]
        const el = document.getElementById('ticker-item')
        el.style.opacity = '0'
        setTimeout(() => {
          el.innerHTML = buildMatchHTML(item)
          el.style.opacity = '1'
        }, 400)
        currentIndex = (currentIndex + 1) % matches.length
      }
      setInterval(rotateBanner, 3500)
      rotateBanner() // show immediately on load

      CSS: #ticker-item { transition: opacity 0.4s ease }

    Match item HTML (rendered inside the rotating div):
      Centered in the banner, margin-left: 130px (after the left anchor)
      display: flex, align-items: center, justify-content: center, gap: 16px
      height: 38px

      Home team: flag emoji + name, Inter 13px weight 600 --fifa-white
      Score pill: Bebas Neue 20px, background rgba(0,0,0,0.28),
                  padding: 2px 12px, border-radius: 3px, color --fifa-white
      Away team: name + flag emoji, Inter 13px weight 600 --fifa-white
      Status badge (right of away team):
        If live=true:  background #fff, color --fifa-red, font 9px bold
                       text: status value e.g. "LIVE 67'"
                       animation: opacity 1→0.3→1, 1.1s infinite (pulse)
        If live=false: background rgba(255,255,255,0.15), color #fff
                       font 9px bold, text: "FT" (no pulse)

    Navigation dots (optional, right side of banner):
      8 small dots (4px circles), one per match
      Active dot: white, opacity 1
      Inactive dots: white, opacity 0.3
      Position: absolute right 16px, vertically centered
      On mobile (< 480px): hide dots

  Accessibility:
    role="marquee" on the banner container
    aria-live="polite" aria-atomic="true" on #ticker-item
    aria-label="Live match scores" on the banner container
    Keyboard: banner is not interactive — no focusable elements inside

### SECTION 2 — HERO
  min-height: 100vh, position: relative, z-index: 2
  display: flex flex-direction:column align-items:center justify-content:center
  text-align: center
  padding: 102px 20px 60px   ← top offset = 64px nav + 38px banner (CRITICAL)

  Background layers:
    1. var(--fifa-navy) base
    2. radial-gradient ellipse 75% 55% at 50% 62%,
       rgba(26,58,110,0.5) → transparent
    3. SVG pitch lines overlay (subtle): horizontal and vertical lines
       forming a football pitch grid at 4% opacity — implement as an
       absolutely-positioned SVG or background-image data URI
    4. Linear-gradient: transparent top → var(--fifa-navy) bottom 25%

  Content stack:
    a. Live event badge:
       Pulsing red dot (animation: scale 1→1.4 every 1.2s ease-in-out)
       + "LIVE NOW · 2026 TOURNAMENT IN PROGRESS"
       Pill shape: rgba(193,39,45,0.12) bg, border 1px solid rgba(193,39,45,0.35)
       Font: Inter 11px weight 600, color: #ff6b6b
       Margin-bottom: 28px

    b. FIFA 2026 Logo SVG — class="logo-hero"
       Drop shadow: var(--glow-gold)
       Animation: gentle float up/down 6px, 4s ease-in-out infinite
       Margin-bottom: 24px

    c. Hero headline: "WE ARE 26"
       Font: Bebas Neue, clamp(72px, 14vw, 190px)
       Line-height: 0.86, letter-spacing: -1px
       Fill: clip-text gradient: #ffffff 0% → #c9a227 55% → #ffffff 100%
       -webkit-background-clip: text, -webkit-text-fill-color: transparent
       Margin-bottom: 4px

    d. Subheading: "USA · CANADA · MEXICO · 2026"
       Font: Bebas Neue, clamp(18px, 3.5vw, 48px)
       Color: --fifa-silver, letter-spacing: 5px
       Margin-bottom: 28px

    e. Host nation flags strip:
       "🇺🇸 United States  ✦  🇨🇦 Canada  ✦  🇲🇽 Mexico"
       Font: Inter 14px weight 600
       Margin-bottom: 44px

    f. LIVE COUNTDOWN (target: 2026-06-11T20:00:00Z):
       Four cd-block divs: DAYS / HOURS / MINUTES / SECONDS
       Each block:
         background: rgba(255,255,255,0.05)
         border: 1px solid rgba(201,162,39,0.2)
         border-radius: 6px, padding: 16px 22px
         Number span: Bebas Neue 54px --fifa-gold
         Label span: Inter 10px --fifa-silver uppercase letter-spacing 2px
       Gap: 10px, flex-wrap: wrap
       Margin-bottom: 48px
       Update with setInterval(fn, 1000)

    g. Hero CTA buttons:
       "EXPLORE THE DRAW" — background: --fifa-gold, color: --fifa-navy
       "MAKE A PREDICTION" — transparent, border: 1px solid rgba(255,255,255,0.3)
       Both: padding 13px 34px, border-radius 3px, font 12px bold uppercase
       Hover primary: translateY(-2px) + box-shadow var(--glow-gold)
       Hover secondary: border-color --fifa-gold, color --fifa-gold
       Gap: 14px, flex-wrap wrap

    h. Scroll indicator (position absolute, bottom 28px):
       "SCROLL" text 10px silver + animated down line
       animation: translateY 0→6px→0, 2s ease-in-out infinite

  NOTE: The live scores banner is FIXED below the nav (Section 1B above).
  There is NO additional ticker section here. The fixed banner handles all
  live scores display throughout the page scrolling experience.

### SECTION 3 — STATS STRIP
  Background: --fifa-blue
  Border-top + bottom: 3px solid --fifa-gold

  6-column CSS grid (repeat(auto-fit, minmax(160px, 1fr)))
  Each stat-item:
    padding: 30px 16px, text-align: center
    border-right: 1px solid rgba(255,255,255,0.07)
    Number: Bebas Neue 56px --fifa-gold, data-target attribute
    Label: Inter 11px --fifa-silver uppercase letter-spacing 1.5px

  Stats data:
    48     — Teams
    104    — Matches
    16     — Host Cities
    5B+    — Expected Viewers (skip counter for this one — just display)
    3      — Host Nations
    $100M  — Prize Fund (skip counter — just display)

  Counter animation:
    IntersectionObserver on .stats-strip
    On first intersection: animate each [data-target] from 0 → value
    Duration: 1600ms, requestAnimationFrame loop
    Easing: easeOutCubic = t => 1 - Math.pow(1-t, 3)
    Only trigger once (observer.unobserve after firing)

### SECTION 5 — VENUES (id="venues")
  Section label: "HOST STADIUMS" (gold, uppercase, border-bottom gold)
  h2: "ICONIC <em>VENUES</em>" — em = --fifa-gold
  Subtext: Inter 15px --fifa-silver

  6-card responsive grid: auto-fit minmax(280px, 1fr), gap 16px

  Each venue-card:
    border: 0.5px solid rgba(255,255,255,0.08)
    border-radius: 8px, overflow hidden
    transition: transform 0.25s, border-color 0.25s
    Hover: translateY(-5px), border-color rgba(201,162,39,0.5)

    Top area (height 155px):
      Background: linear gradient --fifa-blue → #0d2140
      Contains: large stadium emoji centered (font-size 56px)
      Gradient overlay bottom: rgba(10,22,40,0) → rgba(10,22,40,0.8)

    Info area (padding 18px 20px):
      City: Bebas Neue 22px --fifa-white
      Stadium name: Inter 13px --fifa-silver, margin-bottom 10px
      Capacity badge: "⚽ [N] seats · [DESIGNATION]"
        Font: Inter 12px weight 600 --fifa-gold

  Venues:
    🏟️ New York/NJ — MetLife Stadium      — 82,500 — FINAL
    🏟️ Mexico City  — Estadio Azteca       — 87,523 — OPENING MATCH
    🏟️ Los Angeles  — SoFi Stadium         — 70,000 — SEMI-FINAL
    🏟️ Dallas        — AT&T Stadium         — 80,000 — QUARTER-FINAL
    🏟️ Vancouver     — BC Place             — 54,500 — GROUP STAGE
    🏟️ San Francisco — Levi's Stadium       — 68,500 — GROUP STAGE

### SECTION 6 — GROUP STAGE DRAW (id="groups")
  Background: linear-gradient navy → --fifa-blue → navy
  h2: "THE <em>DRAW</em>"

  Groups grid: auto-fill minmax(210px, 1fr), gap 14px, margin-top 40px

  Each group-card (show 6 initially, hide 6 with class .hidden-group):
    background: rgba(10,22,40,0.65)
    border: 1px solid rgba(201,162,39,0.18)
    border-radius: 8px, padding 20px
    Hover: border-color rgba(201,162,39,0.45)

    Header row:
      Group letter: Bebas Neue 34px --fifa-gold, line-height 1
      Group badge: "GROUP X" 10px silver bg rgba(255,255,255,0.07) padding 3px 8px

    4 team rows each:
      Flag emoji (20px) + team name (Inter 13px) + points (gold right)
      padding: 7px 0, border-bottom: 1px solid rgba(255,255,255,0.06)
      Last row: no border

  Groups A–F visible, G–L hidden initially

  "VIEW ALL 12 GROUPS ↓" link below grid:
    On click: toggle .hidden-group display (CSS max-height transition)
    Text changes to "SHOW LESS ↑"

  Groups A–L data (realistic teams + points):
    A: USA 6, England 4, Iran 3, Wales 0
    B: Argentina 9, Mexico 4, Poland 3, Saudi Arabia 1
    C: France 7, Denmark 5, Tunisia 2, Australia 1
    D: Brazil 9, Switzerland 4, Cameroon 3, Serbia 0
    E: Spain 7, Japan 6, Germany 3, Costa Rica 0
    F: Belgium 6, Canada 4, Croatia 4, Morocco 3
    G: Netherlands 7, Ecuador 4, Senegal 3, Qatar 0
    H: Portugal 9, Uruguay 5, Ghana 1, South Korea 1
    I: Croatia wins group... etc. (invent realistic data for G-L)

### SECTION 7 — PLAYER SPOTLIGHT (id="players")
  h2: "WORLD <em>STARS</em>"
  Subtext about legends of the game

  6-card grid: auto-fill minmax(185px, 1fr), gap 20px

  Each player-card — TWO ZONES:

  ZONE 1 — Jersey illustration area (top, height 160px):
    position relative, overflow hidden, display flex
    align-items center, justify-content center

    Background wash (fills the zone):
      <svg class="player-jersey-bg" viewBox="0 0 200 160" preserveAspectRatio="xMidYMid slice">
        <rect width="200" height="160" fill="[kit primary colour]" opacity="0.18"/>
      </svg>
      position absolute, inset 0 — bleeds to card edges, sets the mood

    Jersey SVG (foreground, centered):
      <svg class="player-jersey-svg" viewBox="0 0 100 120" aria-hidden="true">
      width: 100px, height: 120px
      filter: drop-shadow(0 4px 12px rgba(0,0,0,0.5))
      transition: transform 0.28s
      On card hover: scale(1.06) translateY(-3px)

      JERSEY SVG STRUCTURE (draw for each player):
        Body path:
          M20,30 L10,55 L18,57 L18,105 L82,105 L82,57 L90,55 L80,30
          Q70,20 62,22 Q58,36 50,38 Q42,36 38,22 Q30,20 20,30 Z
          Fill: linear gradient (kit primary → darker shade)
          Stroke: slightly darker kit colour, stroke-width 0.5

        Collar path (V-neck or round):
          M38,22 Q42,30 50,32 Q58,30 62,22 Q56,18 50,18 Q44,18 38,22 Z
          Fill: kit accent colour (collar colour varies per nation)

        Jersey number (centered chest area):
          <text x="50" y="80" text-anchor="middle"
                font-family="Arial Black, sans-serif" font-size="22"
                font-weight="900" fill="white" opacity="0.95">
            [shirt number]
          </text>

        Name bar (below number):
          <rect x="22" y="87" width="56" height="12" rx="2"
                fill="rgba(255,255,255,0.12)"/>
          <text x="50" y="97" text-anchor="middle"
                font-family="Arial, sans-serif" font-size="7"
                fill="white" letter-spacing="1.5">
            [PLAYER SURNAME]
          </text>

    Jersey number ghost (decorative, behind jersey):
      position absolute, bottom 8px, right 12px
      Bebas Neue 38px, color rgba(255,255,255,0.1), z-index 1

  ZONE 2 — Player info strip (bottom, padding 14px 16px 18px):
    Name:   Oswald 16px weight 600 --fifa-white, margin-bottom 3px
    Nation: flag emoji (16px) + country name, Inter 12px --fifa-silver, gap 5px
            margin-bottom 10px
    Stat row: Bebas Neue 28px --fifa-gold + Inter 10px --fifa-silver uppercase
              display flex, align-items baseline, gap 5px

  Card outer:
    border-radius: 12px, overflow: hidden (so jersey fills top cleanly)
    border: 1px solid rgba(255,255,255,0.08)
    transition: all 0.28s
    ::before top accent: 3px gold, scaleX(0)→scaleX(1) on hover
    Hover: translateY(-5px), border-color rgba(201,162,39,0.45)
           box-shadow: 0 16px 40px rgba(0,0,0,0.4)

  JERSEY DESIGNS — draw accurately per kit:

  1. Kylian Mbappé — France — kit: navy blue, red accents
     background wash: #00209F opacity 0.18
     body gradient: #0033A0 → #001F6B
     collar: solid #ED2939 (red)
     sleeve cuffs (small path at sleeve ends): #ED2939
     no chest pattern
     number: 10, fill white
     name: MBAPPÉ, fill white

  2. Erling Haaland — Norway — kit: red, white accents
     background wash: #EF2B2D opacity 0.18
     body gradient: #EF2B2D → #C0111A
     collar: white (round neck)
     optional: subtle white Nordic cross outline on chest (opacity 0.15)
       drawn as two crossing rect elements
     number: 9, fill white
     name: HAALAND, fill white

  3. Vinícius Jr. — Brazil — kit: yellow, green accents, blue number
     background wash: #009C3B opacity 0.18
     body gradient: #F5E225 → #E8C800
     collar: #009C3B (green)
     yoke band across chest: #002776 opacity 0.22 (blue horizontal stripe)
     number: 11, fill #002776 (navy blue)
     name: VINÍCIUS JR., fill #002776

  4. Pedri — Spain — kit: red, gold accents
     background wash: #AA151B opacity 0.18
     body gradient: #AA151B → #8B0F14
     collar: #F1BF00 (gold/yellow)
     thin horizontal gold band at waist: #F1BF00 opacity 0.45
     number: 8, fill white
     name: PEDRI, fill white

  5. Bukayo Saka — England — kit: white, navy/red accents
     background wash: #003399 opacity 0.18
     body gradient: #F8F8F8 → #E8E8E8
     collar: #003399 (navy)
     St George cross on chest:
       two rect elements crossing at center (x:40 y:48, 20×3 and 49 43 3×14)
       fill: #CF081F opacity 0.65
     number: 7, fill #003399
     name: SAKA, fill #003399

  6. Jude Bellingham — England — kit: white with navy panels, gold trim
     background wash: #003399 opacity 0.15
     body gradient: #FFFFFF → #ECECEC
     side panels (left and right narrow trapezoids): #003399 opacity 0.15
     collar: #003399 with gold stroke 0.8px (#C9A227)
     St George cross on chest (same as Saka): #CF081F opacity 0.65
     number: 10, fill #003399
     name: BELLINGHAM, fill #003399 font-size 6px (long name)

### SECTION 8 — TOURNAMENT TIMELINE (id="schedule")
  Background: linear-gradient --fifa-navy → --fifa-blue
  h2: "ROAD TO <em>GLORY</em>"

  Timeline container (max-width 800px, margin auto):
    padding-left: 44px, position relative
    ::before: left 14px, top 0, bottom 0, width 2px
      background: linear-gradient --fifa-gold → rgba(201,162,39,0.1)

  7 timeline events:
    .t-event: position relative, margin-bottom 36px

    Gold dot marker:
      position absolute, left -36px, top 4px
      width 16px, height 16px, border-radius 50%
      background: --fifa-gold
      box-shadow: 0 0 0 5px rgba(201,162,39,0.18)

    Date: Inter 11px weight 700 letter-spacing 1.5px --fifa-gold uppercase
    Title: Oswald 19px weight 600 --fifa-white, margin 3px 0
    Description: Inter 13px --fifa-silver

    Animation: fade-in from left (translateX(-20px) → 0, opacity 0→1)
      triggered by IntersectionObserver, staggered 0.1s per event

  Events:
    June 11, 2026        Opening Match — Estadio Azteca, Mexico City
    June 11–July 2       Group Stage — 48 nations, 12 groups, 64 matches
    July 4–9, 2026       Round of 32 — Knockout begins
    July 11–14, 2026     Round of 16 and Quarter-Finals
    July 18–19, 2026     Semi-Finals — New York and Los Angeles
    July 22, 2026        Third Place Play-off
    July 23, 2026 🏆     THE FINAL — MetLife Stadium, New Jersey

### SECTION 9 — MATCH PREDICTOR (id="predictor")
  Background: --fifa-navy
  h2: "WHO WINS <em>TODAY?</em>"

  Predictor card (max-width 580px, margin auto, margin-top 40px):
    background: rgba(26,58,110,0.38)
    border: 1px solid rgba(201,162,39,0.22)
    border-radius: 12px, padding 40px
    text-align center

    Match display:
      Flex row, justify-content center, align-items center, gap 20px
      Team A: 🇦🇷 (48px) + "Argentina" Oswald 20px
      VS: Bebas Neue 38px --fifa-gold, opacity 0.55
      Team B: 🇫🇷 (48px) + "France" Oswald 20px

    Score instruction: "Pick your predicted score:" Inter 13px --fifa-silver

    8 score buttons in a flex-wrap row (justify center, gap 8px):
      1–0  2–0  1–1  2–1  0–1  0–2  3–1  1–3
      Default: background rgba(255,255,255,0.07), border 1px solid rgba(255,255,255,0.15)
      Active: background --fifa-gold, color --fifa-navy, border transparent
      Padding: 10px 18px, border-radius 4px, font 15px weight 600
      Transition: all 0.15s
      aria-pressed attribute toggled on click

    Submit button: "LOCK IN PREDICTION"
      Full width, background --fifa-gold, color --fifa-navy
      Padding: 14px, border-radius 4px
      Font: Inter 13px weight 700 uppercase letter-spacing 1px
      Border: none, cursor pointer
      Hover: opacity 0.87

    Result paragraph (#predict-result):
      margin-top 16px, min-height 28px
      Font: Inter 14px --fifa-silver
      Fade in with CSS transition on opacity/transform
      After submit: button text → "✓ Prediction Locked!"
        button background → #1D9E75 (green)

    JavaScript logic:
      let selectedScore = null
      function pickScore(btn, score): deactivate all, activate clicked
      function submitPrediction():
        if !selectedScore: show "Please pick a score first ⚽"
        [a, b] = selectedScore.split('-').map(Number)
        if a > b: "🇦🇷 Argentina win! The Albiceleste faithful will love you."
        if b > a: "🇫🇷 France take it! Vive la France — Les Bleus march on."
        if a === b: "⚖️ All square! You're predicting extra-time drama."

### SECTION 10 — FOOTER
  Background: rgba(0,0,0,0.42)
  Border-top: 1px solid rgba(201,162,39,0.18)
  Padding: 40px 24px, text-align center

  FIFA 2026 logo SVG — class="logo-footer"
  Margin-bottom: 16px

  Nav links row: same 5 links as nav bar
    Flex row, justify center, gap 24px, list-style none, margin-bottom 18px
    Font: Inter 12px --fifa-silver, hover --fifa-gold

  Host nation flags: 🇺🇸 🇨🇦 🇲🇽  Inter 18px, margin-bottom 16px

  Copyright: Inter 12px rgba(255,255,255,0.22)
  "© 2026 FIFA™ — This is a fan-made showcase for educational purposes.
   FIFA™ and FIFA World Cup™ are registered trademarks of Fédération
   Internationale de Football Association."

---

## SCROLL ANIMATIONS (IntersectionObserver)

  Apply class .fade-up to: venue cards, stat items, group cards,
  player cards, timeline events, section headers

  Default state: opacity 0, transform translateY(28px), transition 0.55s ease
  In-view state: opacity 1, transform translateY(0)
  Threshold: 0.12, triggerOnce: true (unobserve after triggering)

  Stagger via nth-child: add delay 0.08s per sibling
    Apply inline style: transitionDelay: `${index * 0.08}s`

  Section titles: fade-in from left (translateX(-24px) → 0)

---

## ACCESSIBILITY

  - <html lang="en">
  - All <section> elements have id and aria-labelledby pointing to their <h2>
  - Nav: role="navigation" aria-label="Main navigation"
  - Countdown: role="timer" aria-live="polite" aria-atomic="true"
  - Ticker: aria-hidden="true" (decorative animation)
  - Canvas: aria-hidden="true"
  - Score buttons: role="radio" in a role="radiogroup"
  - All emoji used decoratively: aria-hidden="true"
  - All interactive elements: :focus-visible outline 2px solid #c9a227
  - Color contrast: all body text >= 4.5:1 against backgrounds
  - Smooth scroll: html { scroll-behavior: smooth }

---

## PERFORMANCE AND COMPATIBILITY

  - Single HTML file, no external JS, no build tools
  - Google Fonts via <link rel="preconnect"> + <link rel="stylesheet">
    font-display: swap (add &display=swap to the Google Fonts URL)
  - Canvas RAF loop: pause when document.hidden via visibilitychange
  - prefers-reduced-motion: wrap all CSS transitions and animations
    in @media (prefers-reduced-motion: no-preference)
    Canvas: check matchMedia before starting RAF loop
  - No placeholder text — use real World Cup 2026 content throughout
  - Responsive breakpoints:
    Desktop (> 1024px): full layout
    Tablet (768–1024px): 2-col grids
    Mobile (< 768px): single column, hide nav links, show hamburger

---

## FINAL DELIVERABLE CHECKLIST

[ ] Single index.html file, opens without a server
[ ] FIFA 2026 logo built as inline SVG: trophy over stacked 26 over FIFA wordmark
[ ] Logo appears in ALL 10 placements: nav, hero, ticker banner, stats strip,
    venues header, groups header, players header, schedule header,
    predictor card, footer
[ ] Logo renders at 6 sizes via CSS classes:
    logo-nav (36px h), logo-hero (220px w), logo-footer (80px w),
    logo-stamp (60px w), logo-section (44px h), logo-ticker (28px h)
[ ] Section headers use .section-brand-row layout with logo + divider + text
[ ] 5 animated canvas footballs with pentagon patch pattern, gold outline
[ ] Balls wrap around screen edges, rotate as they move
[ ] prefers-reduced-motion stops the canvas animation
[ ] Live rotation banner FIXED below nav (top: 64px), not after hero
[ ] Banner shows one match at a time with 3.5s crossfade rotation
[ ] Banner left anchor: FIFA logo + "LIVE" + pulsing dot — stays still
[ ] Banner navigation dots show current match index
[ ] GET TICKETS links to https://www.ticketmaster.com/fifaworldcup2026
[ ] GET TICKETS opens in new tab with rel="noopener noreferrer"
[ ] NAV LINKS — smooth scroll via navTo() with fixed nav + banner offset (64+38+12px)
[ ] NAV LINKS — each has onclick="navTo(event,'sectionId')" NOT default anchor jump
[ ] NAV LINKS — active state (.active class) highlights current section gold border-bottom
[ ] NAV LINKS — highlightActiveNav() updates active state on scroll (passive listener)
[ ] NAV LINKS — mobile menu links also use navTo() and close the menu after click
[ ] PLAYER CARDS — two-zone layout: jersey area (top 160px) + info strip (bottom)
[ ] PLAYER CARDS — jersey SVG drawn accurately per nation kit (6 different jerseys)
[ ] PLAYER CARDS — background wash matches kit primary colour (opacity 0.18)
[ ] PLAYER CARDS — jersey body: correct gradient colours per kit
[ ] PLAYER CARDS — collar: correct colour per nation (red FR, white NOR, green BRA, gold ESP, navy ENG)
[ ] PLAYER CARDS — chest details: cross on England, cross-stripe on Brazil, gold band on Spain
[ ] PLAYER CARDS — jersey number and surname text inside SVG, accurate per player
[ ] PLAYER CARDS — hover: jersey scales 1.06 + lifts 3px, gold top-border slides in
[ ] Live countdown to June 11, 2026 — updates every second in real time
[ ] Stats strip — numbers count up on scroll into view
[ ] 6 venue cards with hover lift and gold border glow
[ ] Group stage draw — 6 groups shown, expand button reveals all 12
[ ] Tournament timeline — 7 events with staggered fade-in
[ ] Match predictor — interactive score picker, personalised response
[ ] All scroll animations (fade-up, fade-left) with staggered timing
[ ] Fully responsive down to 375px
[ ] Accessible (ARIA, semantic HTML, focus styles, reduced motion)
[ ] No external JS dependencies
[ ] No Lorem ipsum — all real World Cup 2026 content

---

## CONSTRAINTS
- Output must be a single .html file — no .css or .js files alongside it
- No React, Vue, Angular, or any JS framework
- No npm, no package.json, no build step
- SVG logo must be hand-coded — no base64 images or external image src
- Logo MUST appear in all 10 specified placements — missing any is a failure
- Live scores banner MUST be fixed below nav, not after hero or mid-page
- GET TICKETS must link to https://www.ticketmaster.com/fifaworldcup2026
  with target="_blank" rel="noopener noreferrer" — no other tickets URL
- Nav links MUST use navTo() smooth scroll — never default browser anchor jump
  The offset calculation must account for BOTH the nav (64px) AND the banner (38px)
- Player cards MUST use SVG jersey illustrations — no emoji, no placeholder shapes
  Each jersey must use the correct kit colours for that nation
  Jersey SVGs must be hand-coded inline — no external images or base64
- All content must be real World Cup 2026 data (not placeholder text)
- Do not proceed past planning without my "approved"
```

## Changes Made

| File | Type | Size |
|------|------|------|
| `index.html` | .html | 1792 lines |
| `3.5s` | .5s | 590 lines |
| `index.html` | .html | 1570 lines |
| `index.html` | .html | 2631 lines |

## Setup & Usage

1. Pull the latest changes from the feature branch
2. Install dependencies: `npm install` or `pnpm install`
3. Run the development server: `npm run dev` or `pnpm dev`
4. Run tests: `npm test` or `pnpm test`
5. Build for production: `npm run build` or `pnpm build`

## Architecture Notes

- Total files generated: **4**
- Solution type: General

## Changelog

| Date | Change |
|------|--------|
| 2026-06-18 16:24:42 UTC | Initial solution generated by Forge |

---

*Generated by Forge on 2026-06-18 16:24:42 UTC*
