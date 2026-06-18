export const matchSummaries = [
  {
    id: 1,
    matchId: 3,
    teamA: { name: "Spain", flag: "🇪🇸", score: 2 },
    teamB: { name: "Brazil", flag: "🇧🇷", score: 1 },
    date: "June 13, 2026",
    venue: "Estadio Azteca, Mexico City",
    attendance: "87,543",
    manOfMatch: { name: "Lamine Yamal", team: "Spain", flag: "🇪🇸" },
    headline: "Yamal's Magic Sinks Brazil in Azteca Classic",
    summary: "In a pulsating Group B opener at the iconic Estadio Azteca, Spain edged Brazil 2-1 in what may already be the match of the tournament. Teenager Lamine Yamal was simply unplayable, opening the scoring with a stunning curler before setting up Pedri for the winner. Brazil's response, through a Rodrygo header on the stroke of half-time, threatened an upset but La Roja held firm under intense pressure in the second half.",
    timeline: [
      { minute: 23, type: "goal", player: "Lamine Yamal", team: "ESP", flag: "🇪🇸", detail: "Stunning curler, top right corner" },
      { minute: 45, type: "goal", player: "Rodrygo", team: "BRA", flag: "🇧🇷", detail: "Glancing header from Vinícius cross" },
      { minute: 58, type: "yellow", player: "Casemiro", team: "BRA", flag: "🇧🇷", detail: "Cynical foul on Pedri" },
      { minute: 67, type: "substitution", player: "Morata → Ferran Torres", team: "ESP", flag: "🇪🇸", detail: "Tactical switch" },
      { minute: 78, type: "goal", player: "Pedri", team: "ESP", flag: "🇪🇸", detail: "Clinical finish, Yamal assist" },
      { minute: 84, type: "yellow", player: "Vinícius Jr.", team: "BRA", flag: "🇧🇷", detail: "Dissent" },
      { minute: 90, type: "fulltime", player: null, team: null, flag: null, detail: "Full Time — Spain Win" }
    ],
    stats: {
      possession: { esp: 54, bra: 46 },
      shots: { esp: 14, bra: 11 },
      shotsOnTarget: { esp: 6, bra: 4 },
      corners: { esp: 7, bra: 5 },
      fouls: { esp: 12, bra: 15 },
      passes: { esp: 478, bra: 412 }
    }
  },
  {
    id: 2,
    matchId: 4,
    teamA: { name: "Argentina", flag: "🇦🇷", score: 3 },
    teamB: { name: "Nigeria", flag: "🇳🇬", score: 0 },
    date: "June 14, 2026",
    venue: "BC Place, Vancouver",
    attendance: "54,320",
    manOfMatch: { name: "Lionel Messi", team: "Argentina", flag: "🇦🇷" },
    headline: "Messi Masterclass Destroys Nigeria — 3-0",
    summary: "Lionel Messi reminded the world exactly why he is the greatest player to ever grace a football pitch. The eight-time Ballon d'Or winner was in imperious form at BC Place, scoring twice and orchestrating everything that was good about this dominant Argentina performance. Messi's first was a free-kick of breathtaking precision, his second a poacher's finish after a mazy dribble. Julián Álvarez added the third to complete a perfect evening for the reigning World Champions.",
    timeline: [
      { minute: 12, type: "goal", player: "Lionel Messi", team: "ARG", flag: "🇦🇷", detail: "Trademark free kick, top corner" },
      { minute: 28, type: "yellow", player: "William Ekong", team: "NGA", flag: "🇳🇬", detail: "Cynical takedown on Messi" },
      { minute: 34, type: "goal", player: "Lionel Messi", team: "ARG", flag: "🇦🇷", detail: "Clinical finish after dribble" },
      { minute: 46, type: "substitution", player: "Di María → Mac Allister", team: "ARG", flag: "🇦🇷", detail: "Half-time change" },
      { minute: 67, type: "goal", player: "Julián Álvarez", team: "ARG", flag: "🇦🇷", detail: "Header from Messi cross" },
      { minute: 75, type: "red", player: "Wilfred Ndidi", team: "NGA", flag: "🇳🇬", detail: "Second yellow — reckless tackle" },
      { minute: 90, type: "fulltime", player: null, team: null, flag: null, detail: "Full Time — Argentina Dominant" }
    ],
    stats: {
      possession: { arg: 62, nga: 38 },
      shots: { arg: 18, nga: 6 },
      shotsOnTarget: { arg: 9, nga: 1 },
      corners: { arg: 9, nga: 2 },
      fouls: { arg: 8, nga: 18 },
      passes: { arg: 521, nga: 289 }
    }
  }
];
