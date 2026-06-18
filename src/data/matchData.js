export const groupStageMatches = [
  {
    id: 1,
    group: "Group A",
    date: "June 11, 2026",
    time: "3:00 PM EST",
    venue: "SoFi Stadium, Los Angeles",
    homeTeam: { name: "USA", flag: "🇺🇸", ranking: 11 },
    awayTeam: { name: "Mexico", flag: "🇲🇽", ranking: 15 },
    status: "upcoming",
    playersToWatch: [
      { name: "Christian Pulisic", team: "USA", position: "FW", number: 10, stat: "12 goals in qualifiers" },
      { name: "Hirving Lozano", team: "Mexico", position: "FW", number: 7, stat: "8 goals, 6 assists" }
    ]
  },
  {
    id: 2,
    group: "Group A",
    date: "June 12, 2026",
    time: "6:00 PM EST",
    venue: "Estadio Azteca, Mexico City",
    homeTeam: { name: "Brazil", flag: "🇧🇷", ranking: 1 },
    awayTeam: { name: "Croatia", flag: "🇭🇷", ranking: 9 },
    status: "upcoming",
    playersToWatch: [
      { name: "Vinicius Jr.", team: "Brazil", position: "FW", number: 7, stat: "22 goals this season" },
      { name: "Luka Modrić", team: "Croatia", position: "MF", number: 10, stat: "Tournament veteran" }
    ]
  },
  {
    id: 3,
    group: "Group B",
    date: "June 13, 2026",
    time: "9:00 AM EST",
    venue: "BC Place, Vancouver",
    homeTeam: { name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", ranking: 5 },
    awayTeam: { name: "Argentina", flag: "🇦🇷", ranking: 2 },
    status: "upcoming",
    playersToWatch: [
      { name: "Jude Bellingham", team: "England", position: "MF", number: 10, stat: "28 goals this season" },
      { name: "Lionel Messi", team: "Argentina", position: "FW", number: 10, stat: "Defending champion" }
    ]
  },
  {
    id: 4,
    group: "Group B",
    date: "June 14, 2026",
    time: "12:00 PM EST",
    venue: "MetLife Stadium, New York",
    homeTeam: { name: "France", flag: "🇫🇷", ranking: 3 },
    awayTeam: { name: "Spain", flag: "🇪🇸", ranking: 4 },
    status: "upcoming",
    playersToWatch: [
      { name: "Kylian Mbappé", team: "France", position: "FW", number: 10, stat: "Current Ballon d'Or" },
      { name: "Pedri", team: "Spain", position: "MF", number: 8, stat: "Best young player" }
    ]
  },
  {
    id: 5,
    group: "Group C",
    date: "June 15, 2026",
    time: "3:00 PM EST",
    venue: "AT&T Stadium, Dallas",
    homeTeam: { name: "Germany", flag: "🇩🇪", ranking: 7 },
    awayTeam: { name: "Portugal", flag: "🇵🇹", ranking: 6 },
    status: "upcoming",
    playersToWatch: [
      { name: "Florian Wirtz", team: "Germany", position: "MF", number: 10, stat: "30+ goal contributions" },
      { name: "Rafael Leão", team: "Portugal", position: "FW", number: 17, stat: "Post-Ronaldo era leader" }
    ]
  },
  {
    id: 6,
    group: "Group C",
    date: "June 16, 2026",
    time: "6:00 PM EST",
    venue: "Estadio BBVA, Monterrey",
    homeTeam: { name: "Netherlands", flag: "🇳🇱", ranking: 8 },
    awayTeam: { name: "Morocco", flag: "🇲🇦", ranking: 13 },
    status: "upcoming",
    playersToWatch: [
      { name: "Xavi Simons", team: "Netherlands", position: "MF", number: 10, stat: "Rising star, 20 goals" },
      { name: "Achraf Hakimi", team: "Morocco", position: "DF", number: 2, stat: "World's best right-back" }
    ]
  }
];

export const knockoutMatches = [
  {
    id: 101,
    round: "Round of 16",
    date: "July 2, 2026",
    time: "3:00 PM EST",
    venue: "Levi's Stadium, San Francisco",
    homeTeam: { name: "Brazil", flag: "🇧🇷" },
    awayTeam: { name: "USA", flag: "🇺🇸" },
    status: "upcoming"
  },
  {
    id: 102,
    round: "Round of 16",
    date: "July 3, 2026",
    time: "6:00 PM EST",
    venue: "Rose Bowl, Los Angeles",
    homeTeam: { name: "France", flag: "🇫🇷" },
    awayTeam: { name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    status: "upcoming"
  },
  {
    id: 103,
    round: "Quarterfinal",
    date: "July 10, 2026",
    time: "3:00 PM EST",
    venue: "Mercedes-Benz Stadium, Atlanta",
    homeTeam: { name: "Argentina", flag: "🇦🇷" },
    awayTeam: { name: "Germany", flag: "🇩🇪" },
    status: "upcoming"
  },
  {
    id: 104,
    round: "Semifinal",
    date: "July 14, 2026",
    time: "6:00 PM EST",
    venue: "MetLife Stadium, New York",
    homeTeam: { name: "TBD", flag: "🏴" },
    awayTeam: { name: "TBD", flag: "🏴" },
    status: "upcoming"
  },
  {
    id: 105,
    round: "Final",
    date: "July 19, 2026",
    time: "3:00 PM EST",
    venue: "MetLife Stadium, New York",
    homeTeam: { name: "TBD", flag: "🏳️" },
    awayTeam: { name: "TBD", flag: "🏳️" },
    status: "upcoming"
  }
];

export const completedMatches = [
  {
    id: 201,
    date: "June 8, 2026",
    venue: "Estadio Azteca, Mexico City",
    homeTeam: { name: "Mexico", flag: "🇲🇽", score: 2 },
    awayTeam: { name: "Canada", flag: "🇨🇦", score: 1 },
    goalScorers: ["Jiménez 23'", "Corona 67'", "Davies 88' (pen)"],
    possession: { home: 58, away: 42 },
    shots: { home: 14, away: 9 },
    rating: 7.8,
    summary: "A thrilling opener with Mexico dominating possession. Jiménez opened scoring with a clinical finish before Corona doubled the lead. Davies pulled one back from the spot late on but Mexico held firm for a deserved victory.",
    highlights: ["Jiménez thunderous opener", "Corona's solo run and finish", "Late penalty drama"]
  },
  {
    id: 202,
    date: "June 9, 2026",
    venue: "AT&T Stadium, Dallas",
    homeTeam: { name: "Spain", flag: "🇪🇸", score: 3 },
    awayTeam: { name: "Morocco", flag: "🇲🇦", score: 0 },
    goalScorers: ["Pedri 12'", "Morata 45+2'", "Yamal 78'"],
    possession: { home: 71, away: 29 },
    shots: { home: 22, away: 4 },
    rating: 8.5,
    summary: "Spain put on a tiki-taka masterclass, controlling the game from start to finish. Pedri's early goal set the tone, Morata added a second before half time, and teenage sensation Yamal capped a brilliant performance with a goal of the tournament contender.",
    highlights: ["Pedri's precision strike", "Morata's acrobatic volley", "Yamal's wonder goal"]
  },
  {
    id: 203,
    date: "June 10, 2026",
    venue: "BC Place, Vancouver",
    homeTeam: { name: "Argentina", flag: "🇦🇷", score: 1 },
    awayTeam: { name: "Saudi Arabia", flag: "🇸🇦", score: 1 },
    goalScorers: ["Messi 55' (pen)", "Al-Dawsari 90+3'"],
    possession: { home: 65, away: 35 },
    shots: { home: 18, away: 6 },
    rating: 9.1,
    summary: "History repeated itself as Argentina were held by Saudi Arabia in another stunning World Cup shock. Messi's penalty looked to have secured all three points until Al-Dawsari's dramatic last-gasp equalizer sent the stadium into frenzy.",
    highlights: ["Messi's ice-cold penalty", "Saudi Arabia's tactical masterclass", "Al-Dawsari's 93rd-minute stunner"]
  }
];
