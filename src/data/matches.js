export const matches = [
  {
    id: 1,
    group: "Group A",
    date: "June 11, 2026",
    timeEST: "5:00 PM EST",
    status: "upcoming",
    venue: "MetLife Stadium",
    city: "New York / New Jersey",
    country: "USA",
    teamA: { name: "Mexico", flag: "🇲🇽", code: "MEX" },
    teamB: { name: "Ecuador", flag: "🇪🇨", code: "ECU" },
    scoreA: null,
    scoreB: null,
    playersToWatch: [
      {
        name: "Hirving Lozano",
        team: "Mexico",
        flag: "🇲🇽",
        position: "FW",
        stat: "23 caps, 10 goals",
        image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&h=200&fit=crop&crop=face",
        description: "Pacey winger with lethal finishing"
      },
      {
        name: "Moisés Caicedo",
        team: "Ecuador",
        flag: "🇪🇨",
        position: "CM",
        stat: "Chelsea | 85 rating",
        image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=200&h=200&fit=crop&crop=face",
        description: "Box-to-box dynamo controlling midfield"
      }
    ]
  },
  {
    id: 2,
    group: "Group A",
    date: "June 12, 2026",
    timeEST: "8:00 PM EST",
    status: "upcoming",
    venue: "SoFi Stadium",
    city: "Los Angeles",
    country: "USA",
    teamA: { name: "USA", flag: "🇺🇸", code: "USA" },
    teamB: { name: "Canada", flag: "🇨🇦", code: "CAN" },
    scoreA: null,
    scoreB: null,
    playersToWatch: [
      {
        name: "Christian Pulisic",
        team: "USA",
        flag: "🇺🇸",
        position: "FW",
        stat: "AC Milan | 12 WC goals",
        image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=200&h=200&fit=crop&crop=face",
        description: "Captain America — electric dribbler"
      },
      {
        name: "Alphonso Davies",
        team: "Canada",
        flag: "🇨🇦",
        position: "LB",
        stat: "Bayern Munich | 34 mph",
        image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=200&h=200&fit=crop&crop=face",
        description: "Fastest player in the tournament"
      }
    ]
  },
  {
    id: 3,
    group: "Group B",
    date: "June 13, 2026",
    timeEST: "3:00 PM EST",
    status: "completed",
    venue: "Estadio Azteca",
    city: "Mexico City",
    country: "Mexico",
    teamA: { name: "Spain", flag: "🇪🇸", code: "ESP" },
    teamB: { name: "Brazil", flag: "🇧🇷", code: "BRA" },
    scoreA: 2,
    scoreB: 1,
    goals: [
      { player: "Yamal", team: "ESP", minute: 23 },
      { player: "Modrić", team: "BRA", minute: 45 },
      { player: "Pedri", team: "ESP", minute: 78 }
    ],
    manOfMatch: "Lamine Yamal",
    playersToWatch: [
      {
        name: "Lamine Yamal",
        team: "Spain",
        flag: "🇪🇸",
        position: "RW",
        stat: "Barcelona | 3 goals",
        image: "https://images.unsplash.com/photo-1546961342-ea5f62d951f2?w=200&h=200&fit=crop&crop=face",
        description: "Teen prodigy terrorizing defenses"
      },
      {
        name: "Vinícius Jr.",
        team: "Brazil",
        flag: "🇧🇷",
        position: "LW",
        stat: "Real Madrid | 8 dribbles/game",
        image: "https://images.unsplash.com/photo-1543357480-c60d40f2abc1?w=200&h=200&fit=crop&crop=face",
        description: "Unstoppable on the wing"
      }
    ]
  },
  {
    id: 4,
    group: "Group C",
    date: "June 14, 2026",
    timeEST: "12:00 PM EST",
    status: "completed",
    venue: "BC Place",
    city: "Vancouver",
    country: "Canada",
    teamA: { name: "Argentina", flag: "🇦🇷", code: "ARG" },
    teamB: { name: "Nigeria", flag: "🇳🇬", code: "NGA" },
    scoreA: 3,
    scoreB: 0,
    goals: [
      { player: "Messi", team: "ARG", minute: 12 },
      { player: "Messi", team: "ARG", minute: 34 },
      { player: "Álvarez", team: "ARG", minute: 67 }
    ],
    manOfMatch: "Lionel Messi",
    playersToWatch: [
      {
        name: "Lionel Messi",
        team: "Argentina",
        flag: "🇦🇷",
        position: "CF",
        stat: "Inter Miami | 2 goals today",
        image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=200&h=200&fit=crop&crop=face",
        description: "GOAT defending his crown"
      },
      {
        name: "Victor Osimhen",
        team: "Nigeria",
        flag: "🇳🇬",
        position: "ST",
        stat: "Galatasaray | 31 goals/season",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        description: "African powerhouse striker"
      }
    ]
  },
  {
    id: 5,
    group: "Group D",
    date: "June 15, 2026",
    timeEST: "6:00 PM EST",
    status: "upcoming",
    venue: "Estadio Guadalajara",
    city: "Guadalajara",
    country: "Mexico",
    teamA: { name: "France", flag: "🇫🇷", code: "FRA" },
    teamB: { name: "Portugal", flag: "🇵🇹", code: "POR" },
    scoreA: null,
    scoreB: null,
    playersToWatch: [
      {
        name: "Kylian Mbappé",
        team: "France",
        flag: "🇫🇷",
        position: "ST",
        stat: "Real Madrid | 45 intl goals",
        image: "https://images.unsplash.com/photo-1568470662440-cd63adf6e7bb?w=200&h=200&fit=crop&crop=face",
        description: "Lightning-fast complete forward"
      },
      {
        name: "Cristiano Ronaldo",
        team: "Portugal",
        flag: "🇵🇹",
        position: "ST",
        stat: "Al Nassr | 133 intl goals",
        image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=200&h=200&fit=crop&crop=face",
        description: "CR7's last dance on biggest stage"
      }
    ]
  },
  {
    id: 6,
    group: "Group E",
    date: "June 16, 2026",
    timeEST: "9:00 AM EST",
    status: "upcoming",
    venue: "Estadio BBVA",
    city: "Monterrey",
    country: "Mexico",
    teamA: { name: "Germany", flag: "🇩🇪", code: "GER" },
    teamB: { name: "Japan", flag: "🇯🇵", code: "JPN" },
    scoreA: null,
    scoreB: null,
    playersToWatch: [
      {
        name: "Jamal Musiala",
        team: "Germany",
        flag: "🇩🇪",
        position: "AM",
        stat: "Bayern Munich | 22 yrs",
        image: "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?w=200&h=200&fit=crop&crop=face",
        description: "Germany's creative heartbeat"
      },
      {
        name: "Takefusa Kubo",
        team: "Japan",
        flag: "🇯🇵",
        position: "RW",
        stat: "Real Sociedad | 14 Liga goals",
        image: "https://images.unsplash.com/photo-1485395037613-e83d5c1f5290?w=200&h=200&fit=crop&crop=face",
        description: "Japan's tricky magic man"
      }
    ]
  },
  {
    id: 7,
    group: "Group F",
    date: "June 17, 2026",
    timeEST: "3:00 PM EST",
    status: "upcoming",
    venue: "AT&T Stadium",
    city: "Dallas",
    country: "USA",
    teamA: { name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", code: "ENG" },
    teamB: { name: "Netherlands", flag: "🇳🇱", code: "NED" },
    scoreA: null,
    scoreB: null,
    playersToWatch: [
      {
        name: "Jude Bellingham",
        team: "England",
        flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        position: "AM",
        stat: "Real Madrid | 23 goals/season",
        image: "https://images.unsplash.com/photo-1529516548873-9ce57c8f155e?w=200&h=200&fit=crop&crop=face",
        description: "England's box-to-box superstar"
      },
      {
        name: "Xavi Simons",
        team: "Netherlands",
        flag: "🇳🇱",
        position: "AM",
        stat: "PSG | 8 assists this season",
        image: "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?w=200&h=200&fit=crop&crop=face",
        description: "Dutch maestro with flair"
      }
    ]
  },
  {
    id: 8,
    group: "Group G",
    date: "June 18, 2026",
    timeEST: "12:00 PM EST",
    status: "upcoming",
    venue: "Levi's Stadium",
    city: "San Francisco",
    country: "USA",
    teamA: { name: "Morocco", flag: "🇲🇦", code: "MAR" },
    teamB: { name: "Colombia", flag: "🇨🇴", code: "COL" },
    scoreA: null,
    scoreB: null,
    playersToWatch: [
      {
        name: "Achraf Hakimi",
        team: "Morocco",
        flag: "🇲🇦",
        position: "RB",
        stat: "PSG | World's best RB",
        image: "https://images.unsplash.com/photo-1565992441121-4367e2049a95?w=200&h=200&fit=crop&crop=face",
        description: "Morocco's attacking fullback"
      },
      {
        name: "James Rodríguez",
        team: "Colombia",
        flag: "🇨🇴",
        position: "AM",
        stat: "Rayo Vallecano | WC icon",
        image: "https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?w=200&h=200&fit=crop&crop=face",
        description: "Golden Boot 2014 chasing glory"
      }
    ]
  }
];

export const groups = ["All", "Group A", "Group B", "Group C", "Group D", "Group E", "Group F", "Group G"];
