/* =========================================
   FIFA WORLD CUP 2026 - FAN HUB
   Main Application Script
   ========================================= */

// ─── DATA ───────────────────────────────────────────────────────────────────

const MATCHES = [
    {
        id: 1, stage: 'Group A', type: 'group',
        date: 'Jun 11, 2026', time: '5:00 PM EST',
        team1: { name: 'USA', flag: '🇺🇸' },
        team2: { name: 'Mexico', flag: '🇲🇽' },
        venue: 'MetLife Stadium, New York',
        status: 'upcoming',
        watchPlayers: ['Christian Pulisic', 'Hirving Lozano']
    },
    {
        id: 2, stage: 'Group B', type: 'group',
        date: 'Jun 12, 2026', time: '8:00 PM EST',
        team1: { name: 'Brazil', flag: '🇧🇷' },
        team2: { name: 'Germany', flag: '🇩🇪' },
        venue: 'Rose Bowl, Los Angeles',
        status: 'upcoming',
        watchPlayers: ['Vinícius Jr.', 'Jamal Musiala']
    },
    {
        id: 3, stage: 'Group C', type: 'group',
        date: 'Jun 12, 2026', time: '11:00 AM EST',
        team1: { name: 'France', flag: '🇫🇷' },
        team2: { name: 'Argentina', flag: '🇦🇷' },
        venue: 'AT&T Stadium, Dallas',
        status: 'live',
        watchPlayers: ['Kylian Mbappé', 'Lionel Messi']
    },
    {
        id: 4, stage: 'Group D', type: 'group',
        date: 'Jun 13, 2026', time: '2:00 PM EST',
        team1: { name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
        team2: { name: 'Spain', flag: '🇪🇸' },
        venue: 'Levi\'s Stadium, San Francisco',
        status: 'upcoming',
        watchPlayers: ['Jude Bellingham', 'Pedri']
    },
    {
        id: 5, stage: 'Group E', type: 'group',
        date: 'Jun 14, 2026', time: '6:00 PM EST',
        team1: { name: 'Portugal', flag: '🇵🇹' },
        team2: { name: 'Netherlands', flag: '🇳🇱' },
        venue: 'SoFi Stadium, Los Angeles',
        status: 'upcoming',
        watchPlayers: ['Cristiano Ronaldo', 'Cody Gakpo']
    },
    {
        id: 6, stage: 'Group F', type: 'group',
        date: 'Jun 15, 2026', time: '9:00 PM EST',
        team1: { name: 'Morocco', flag: '🇲🇦' },
        team2: { name: 'Japan', flag: '🇯🇵' },
        venue: 'Estadio Azteca, Mexico City',
        status: 'upcoming',
        watchPlayers: ['Achraf Hakimi', 'Takefusa Kubo']
    },
    {
        id: 7, stage: 'Quarter-Final', type: 'knockout',
        date: 'Jul 4, 2026', time: '3:00 PM EST',
        team1: { name: 'Brazil', flag: '🇧🇷' },
        team2: { name: 'France', flag: '🇫🇷' },
        venue: 'MetLife Stadium, New York',
        status: 'upcoming',
        watchPlayers: ['Rodrygo', 'Ousmane Dembélé']
    },
    {
        id: 8, stage: 'Semi-Final', type: 'knockout',
        date: 'Jul 10, 2026', time: '7:00 PM EST',
        team1: { name: 'Argentina', flag: '🇦🇷' },
        team2: { name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
        venue: 'Rose Bowl, Los Angeles',
        status: 'upcoming',
        watchPlayers: ['Lionel Messi', 'Harry Kane']
    },
    {
        id: 9, stage: 'FINAL', type: 'final',
        date: 'Jul 19, 2026', time: '6:00 PM EST',
        team1: { name: 'TBD', flag: '🏆' },
        team2: { name: 'TBD', flag: '🏆' },
        venue: 'MetLife Stadium, New York',
        status: 'upcoming',
        watchPlayers: ['TBD', 'TBD']
    }
];

const PLAYERS_TO_WATCH = [
    {
        name: 'Kylian Mbappé', country: 'France', flag: '🇫🇷',
        position: 'Forward', avatar: '⚡', goals: 6, assists: 3,
        match: 'France vs Argentina', isGoldenBoot: true,
        reason: 'Lightning quick and lethal in front of goal. Mbappé is the tournament\'s standout performer and on course for the Golden Boot.'
    },
    {
        name: 'Lionel Messi', country: 'Argentina', flag: '🇦🇷',
        position: 'Forward', avatar: '🐐', goals: 5, assists: 6,
        match: 'Argentina vs France', isGoldenBoot: false,
        reason: 'The GOAT\'s final World Cup campaign. Messi continues to dazzle with his vision, dribbling, and clutch performances.'
    },
    {
        name: 'Vinícius Jr.', country: 'Brazil', flag: '🇧🇷',
        position: 'Winger', avatar: '🌟', goals: 4, assists: 4,
        match: 'Brazil vs Germany', isGoldenBoot: false,
        reason: 'Brazil\'s explosive winger causes nightmares for defenders with his pace, creativity and incredible footwork.'
    },
    {
        name: 'Jude Bellingham', country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
        position: 'Midfielder', avatar: '👑', goals: 3, assists: 5,
        match: 'England vs Spain', isGoldenBoot: false,
        reason: 'England\'s heartbeat and creative engine. Bellingham\'s box-to-box dynamism and leadership are world class.'
    },
    {
        name: 'Cristiano Ronaldo', country: 'Portugal', flag: '🇵🇹',
        position: 'Forward', avatar: '🏅', goals: 5, assists: 2,
        match: 'Portugal vs Netherlands', isGoldenBoot: true,
        reason: 'CR7 chasing history at his final World Cup. His experience and goal-scoring instinct remain unmatched at 41.'
    },
    {
        name: 'Jamal Musiala', country: 'Germany', flag: '🇩🇪',
        position: 'Attacking Mid', avatar: '✨', goals: 3, assists: 4,
        match: 'Germany vs Brazil', isGoldenBoot: false,
        reason: 'Germany\'s 22-year-old phenom lights up every match with his technique, dribbling and uncanny ability to read space.'
    },
    {
        name: 'Pedri', country: 'Spain', flag: '🇪🇸',
        position: 'Midfielder', avatar: '🎯', goals: 2, assists: 5,
        match: 'Spain vs England', isGoldenBoot: false,
        reason: 'The heir to Spain\'s great midfield tradition. Pedri\'s passing range, composure and press resistance are elite.'
    },
    {
        name: 'Achraf Hakimi', country: 'Morocco', flag: '🇲🇦',
        position: 'Right Back', avatar: '🚀', goals: 2, assists: 3,
        match: 'Morocco vs Japan', isGoldenBoot: false,
        reason: 'Africa\'s best defender and one of the world\'s most dynamic full-backs. Hakimi can single-handedly turn a match.'
    }
];

const LEADERBOARD_DATA = {
    goals: [
        { name: 'Kylian Mbappé', country: 'France', flag: '🇫🇷', avatar: '⚡', value: 6, badge: 'boot', badgeText: '🥇 Golden Boot' },
        { name: 'Cristiano Ronaldo', country: 'Portugal', flag: '🇵🇹', avatar: '🏅', value: 5, badge: 'boot', badgeText: '🥈 Contender' },
        { name: 'Lionel Messi', country: 'Argentina', flag: '🇦🇷', avatar: '🐐', value: 5, badge: 'contender', badgeText: '🥈 Contender' },
        { name: 'Vinícius Jr.', country: 'Brazil', flag: '🇧🇷', avatar: '🌟', value: 4, badge: 'contender', badgeText: '🥉 Contender' },
        { name: 'Harry Kane', country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', avatar: '🎯', value: 4, badge: 'contender', badgeText: '🥉 Contender' },
        { name: 'Takumi Minamino', country: 'Japan', flag: '🇯🇵', avatar: '⚡', value: 3, badge: '', badgeText: '' },
        { name: 'Jamal Musiala', country: 'Germany', flag: '🇩🇪', avatar: '✨', value: 3, badge: '', badgeText: '' }
    ],
    assists: [
        { name: 'Lionel Messi', country: 'Argentina', flag: '🇦🇷', avatar: '🐐', value: 6, badge: 'boot', badgeText: '🥇 Top Creator' },
        { name: 'Jude Bellingham', country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', avatar: '👑', value: 5, badge: 'contender', badgeText: '🥈 2nd' },
        { name: 'Pedri', country: 'Spain', flag: '🇪🇸', avatar: '🎯', value: 5, badge: 'contender', badgeText: '🥈 2nd' },
        { name: 'Vinícius Jr.', country: 'Brazil', flag: '🇧🇷', avatar: '🌟', value: 4, badge: 'contender', badgeText: '🥉 3rd' },
        { name: 'Kylian Mbappé', country: 'France', flag: '🇫🇷', avatar: '⚡', value: 3, badge: '', badgeText: '' },
        { name: 'Jamal Musiala', country: 'Germany', flag: '🇩🇪', avatar: '✨', value: 4, badge: 'contender', badgeText: '🥉 3rd' },
        { name: 'Achraf Hakimi', country: 'Morocco', flag: '🇲🇦', avatar: '🚀', value: 3, badge: '', badgeText: '' }
    ],
    ratings: [
        { name: 'Kylian Mbappé', country: 'France', flag: '🇫🇷', avatar: '⚡', value: '9.4', badge: 'boot', badgeText: '🌟 Best Player' },
        { name: 'Lionel Messi', country: 'Argentina', flag: '🇦🇷', avatar: '🐐', value: '9.2', badge: 'boot', badgeText: '🌟 Elite' },
        { name: 'Jude Bellingham', country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', avatar: '👑', value: '8.9', badge: 'contender', badgeText: '⭐ Top Rated' },
        { name: 'Vinícius Jr.', country: 'Brazil', flag: '🇧🇷', avatar: '🌟', value: '8.8', badge: 'contender', badgeText: '⭐ Top Rated' },
        { name: 'Jamal Musiala', country: 'Germany', flag: '🇩🇪', avatar: '✨', value: '8.6', badge: 'contender', badgeText: '⭐ Top Rated' },
        { name: 'Pedri', country: 'Spain', flag: '🇪🇸', avatar: '🎯', value: '8.5', badge: '', badgeText: '' },
        { name: 'Achraf Hakimi', country: 'Morocco', flag: '🇲🇦', avatar: '🚀', value: '8.4', badge: '', badgeText: '' }
    ]
};

const RESULTS = [
    {
        stage: 'Group A – Matchday 1',
        date: 'Jun 11, 2026',
        team1: { name: 'Brazil', flag: '🇧🇷', score: 3, scorers: ['Vinícius Jr. 12\'', 'Rodrygo 45\'', 'Endrick 78\''] },
        team2: { name: 'Serbia', flag: '🇷🇸', score: 1, scorers: ['Vlahović 67\''] },
        venue: 'SoFi Stadium, LA',
        rating: '8.5 / 10',
        summary: 'Brazil announced themselves in style as Vinícius Jr. opened the scoring with a stunning solo effort in the 12th minute. Rodrygo doubled the lead before the break, and teenage sensation Endrick sealed all three points with a composed finish. Serbia pulled one back through Vlahović but couldn\'t find a second.'
    },
    {
        stage: 'Group B – Matchday 1',
        date: 'Jun 12, 2026',
        team1: { name: 'France', flag: '🇫🇷', score: 4, scorers: ['Mbappé 8\'', 'Mbappé 34\'', 'Griezmann 56\'', 'Dembélé 89\''] },
        team2: { name: 'Poland', flag: '🇵🇱', score: 1, scorers: ['Lewandowski 71\' (pen)'] },
        venue: 'AT&T Stadium, Dallas',
        rating: '9.1 / 10',
        summary: 'Mbappé was unstoppable as France demolished Poland in a masterclass display. The PSG star netted twice in the first half before Griezmann added a third. Lewandowski pulled one back from the spot but Dembélé\'s late goal put the icing on the cake for Deschamps\' side.'
    },
    {
        stage: 'Group C – Matchday 1',
        date: 'Jun 13, 2026',
        team1: { name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', score: 2, scorers: ['Kane 33\'', 'Bellingham 77\''] },
        team2: { name: 'Italy', flag: '🇮🇹', score: 2, scorers: ['Barella 45\'', 'Raspadori 88\''] },
        venue: 'Levi\'s Stadium, San Francisco',
        rating: '8.8 / 10',
        summary: 'A thrilling contest between two heavyweights ended level. England looked set for all three points after Bellingham\'s superb 77th-minute volley, only for Raspadori to break English hearts with a last-gasp equaliser. Both sides showed tremendous quality throughout.'
    },
    {
        stage: 'Group D – Matchday 1',
        date: 'Jun 14, 2026',
        team1: { name: 'Portugal', flag: '🇵🇹', score: 5, scorers: ['Ronaldo 22\' (pen)', 'Ronaldo 44\'', 'Bruno 60\'', 'Leão 72\'', 'Neves 85\''] },
        team2: { name: 'Nigeria', flag: '🇳🇬', score: 1, scorers: ['Osimhen 55\''] },
        venue: 'MetLife Stadium, New York',
        rating: '8.7 / 10',
        summary: 'Cristiano Ronaldo stole the show with a brace as Portugal put on a spectacular attacking show. The legendary forward opened from the penalty spot before adding a second before half-time. Bruno Fernandes, Leão and Neves compounded Nigeria\'s misery in the second half in what was a statement win.'
    }
];

const NEWS = [
    {
        tag: 'breaking', tagText: 'BREAKING',
        source: 'FIFA Official', time: '2 hours ago',
        emoji: '🔴',
        title: 'Mbappé Breaks World Cup Scoring Record with Hat-Trick Against Poland',
        excerpt: 'Kylian Mbappé etched his name into World Cup history by becoming the fastest player to 6 goals in a single tournament, surpassing the previous record set by Just Fontaine in 1958. France captain was unstoppable and led his team to a commanding 4-1 victory.',
        featured: true
    },
    {
        tag: 'analysis', tagText: 'ANALYSIS',
        source: 'ESPN FC', time: '4 hours ago',
        emoji: '📊',
        title: 'How Brazil\'s New Generation Is Redefining South American Football',
        excerpt: 'Endrick, Rodrygo and Vinícius Jr. are spearheading a Brazilian revolution. Our analysts break down the tactical genius behind Dorival Jr.\'s 4-3-3 system.',
        featured: false
    },
    {
        tag: 'news', tagText: 'NEWS',
        source: 'Goal.com', time: '5 hours ago',
        emoji: '🌟',
        title: 'Messi: "This is My Last World Cup & I Want to Win it For Argentina"',
        excerpt: 'In an emotional pre-match interview, Lionel Messi opened up about his final World Cup campaign and the burning desire to deliver glory for his nation one more time.',
        featured: false
    },
    {
        tag: 'feature', tagText: 'FEATURE',
        source: 'The Athletic', time: '8 hours ago',
        emoji: '🏟️',
        title: 'MetLife Stadium Set to Host Biggest Match in World Cup History with 92,000 Fans',
        excerpt: 'The iconic New Jersey venue has been transformed into a festival of football. We take an exclusive behind-the-scenes look at preparations for the World Cup Final.',
        featured: false
    },
    {
        tag: 'analysis', tagText: 'ANALYSIS',
        source: 'BBC Sport', time: '12 hours ago',
        emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
        title: 'Bellingham\'s World Class Display Gives England Hope of Ending 60-Year Wait',
        excerpt: 'Jude Bellingham was imperious against Italy, capping a man-of-the-match performance with a stunning volley. England\'s talisman is playing the best football of his career.',
        featured: false
    },
    {
        tag: 'news', tagText: 'NEWS',
        source: 'AS USA', time: '1 day ago',
        emoji: '🇺🇸',
        title: 'USMNT Draw Capacity Crowd as Host Nation Fever Grips the United States',
        excerpt: 'Over 82,000 fans packed MetLife Stadium for the USA\'s opening match. Christian Pulisic inspired the host nation with a stunning brace as America dreams of glory on home soil.',
        featured: false
    }
];

// ─── PRELOADER ───────────────────────────────────────────────────────────────
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
        initParticles();
        initRevealObserver();
    }, 2000);
});

// ─── PARTICLES ───────────────────────────────────────────────────────────────
function initParticles() {
    const container = document.getElementById('particles');
    const colors = ['rgba(201,168,76,0.6)', 'rgba(255,215,0,0.4)', 'rgba(255,255,255,0.3)', 'rgba(192,57,43,0.4)'];
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 4 + 1;
        p.style.cssText = `
            width: ${size}px; height: ${size}px;
            left: ${Math.random() * 100}%;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            animation-duration: ${Math.random() * 15 + 10}s;
            animation-delay: ${Math.random() * 10}s;
        `;
        container.appendChild(p);
    }
}

// ─── NAVBAR SCROLL ───────────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    nav.classList.toggle('scrolled', window.scrollY > 80);
    updateActiveNavLink();
});

function updateActiveNavLink() {
    const sections = ['schedule', 'players-watch', 'leaderboard', 'results', 'news'];
    const scrollPos = window.scrollY + 100;
    sections.forEach(id => {
        const section = document.getElementById(id);
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (section && link) {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            link.style.color = scrollPos >= top && scrollPos < bottom ? 'var(--gold)' : '';
        }
    });
}

// ─── HAMBURGER MENU ──────────────────────────────────────────────────────────
document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.toggle('open');
});
function closeMobile() {
    document.getElementById('mobileMenu').classList.remove('open');
}

// ─── RENDER SCHEDULE ─────────────────────────────────────────────────────────
function renderSchedule(filter = 'all') {
    const grid = document.getElementById('scheduleGrid');
    const filtered = filter === 'all' ? MATCHES : MATCHES.filter(m => m.type === filter);
    grid.innerHTML = filtered.map(match => `
        <div class="match-card reveal" onclick="openMatchModal(${match.id})" data-type="${match.type}">
            ${match.status === 'live' ? '<span class="match-status-badge status-live">🔴 LIVE</span>' :
              match.status === 'finished' ? '<span class="match-status-badge status-finished">FT</span>' :
              '<span class="match-status-badge status-upcoming">UPCOMING</span>'}
            <div class="match-card-header">
                <span class="match-stage">${match.stage}</span>
                <span class="match-date">${match.date}</span>
            </div>
            <div class="match-card-body">
                <div class="teams-row">
                    <div class="team-info">
                        <div class="team-flag">${match.team1.flag}</div>
                        <div class="team-name">${match.team1.name}</div>
                    </div>
                    <div class="match-vs">VS</div>
                    <div class="team-info">
                        <div class="team-flag">${match.team2.flag}</div>
                        <div class="team-name">${match.team2.name}</div>
                    </div>
                </div>
            </div>
            <div class="match-card-footer">
                <div class="match-time">
                    <i class="fas fa-clock"></i>
                    ${match.time}
                </div>
                <div class="match-venue">${match.venue}</div>
            </div>
        </div>
    `).join('');
    reobserveReveal();
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderSchedule(btn.dataset.filter);
    });
});

// ─── MATCH MODAL ─────────────────────────────────────────────────────────────
function openMatchModal(id) {
    const match = MATCHES.find(m => m.id === id);
    if (!match) return;
    const playersData = match.watchPlayers.map(name => {
        return PLAYERS_TO_WATCH.find(p => p.name === name) || { name, avatar: '⚽', position: 'Player', goals: '-', assists: '-', country: '', flag: '' };
    });
    document.getElementById('modalContent').innerHTML = `
        <div class="modal-match-header">
            <div class="modal-stage">${match.stage} &nbsp;·&nbsp; ${match.date} &nbsp;·&nbsp; ${match.time}</div>
            <div class="modal-teams">
                <div class="modal-team">
                    <div class="modal-flag">${match.team1.flag}</div>
                    <div class="modal-team-name">${match.team1.name}</div>
                </div>
                <div class="modal-vs">VS</div>
                <div class="modal-team">
                    <div class="modal-flag">${match.team2.flag}</div>
                    <div class="modal-team-name">${match.team2.name}</div>
                </div>
            </div>
        </div>
        <div class="modal-body">
            <div class="modal-info-grid">
                <div class="modal-info-item"><label>Kickoff (EST)</label><span>⏰ ${match.time}</span></div>
                <div class="modal-info-item"><label>Status</label><span>${match.status === 'live' ? '🔴 LIVE NOW' : match.status === 'upcoming' ? '📅 Upcoming' : '✅ Full Time'}</span></div>
                <div class="modal-info-item"><label>Venue</label><span>🏟️ ${match.venue}</span></div>
                <div class="modal-info-item"><label>Stage</label><span>🏆 ${match.stage}</span></div>
            </div>
            <div class="modal-players-title">⭐ Players to Watch</div>
            <div class="modal-player-list">
                ${playersData.map(p => `
                    <div class="modal-player-item">
                        <div class="modal-player-avatar">${p.avatar}</div>
                        <div class="modal-player-details">
                            <div class="modal-player-name">${p.name} ${p.flag}</div>
                            <div class="modal-player-meta">${p.country} · ${p.position}</div>
                        </div>
                        <div class="modal-player-stat">${p.goals !== '-' ? p.goals + ' ⚽' : '⭐'}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    document.getElementById('matchModal').classList.add('open');
}

document.getElementById('modalClose').addEventListener('click', () => {
    document.getElementById('matchModal').classList.remove('open');
});
document.getElementById('matchModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('matchModal')) {
        document.getElementById('matchModal').classList.remove('open');
    }
});

// ─── RENDER PLAYERS TO WATCH ─────────────────────────────────────────────────
function renderPlayersToWatch() {
    const grid = document.getElementById('playersWatchGrid');
    grid.innerHTML = PLAYERS_TO_WATCH.map((player, i) => `
        <div class="player-watch-card reveal reveal-delay-${(i % 3) + 1}">
            ${player.isGoldenBoot ? '<div class="golden-boot-badge">🥇 Golden Boot</div>' : ''}
            <div class="player-watch-header">
                <div class="player-country-flag">${player.flag}</div>
                <div class="player-avatar">${player.avatar}</div>
                <div class="player-watch-name">${player.name}</div>
                <div class="player-watch-country">${player.country}</div>
                <span class="player-watch-pos">${player.position}</span>
            </div>
            <div class="player-watch-body">
                <div class="player-stats-row">
                    <div class="player-stat-item">
                        <span class="pstat-num">${player.goals}</span>
                        <span class="pstat-label">Goals</span>
                    </div>
                    <div class="player-stat-item">
                        <span class="pstat-num">${player.assists}</span>
                        <span class="pstat-label">Assists</span>
                    </div>
                    <div class="player-stat-item">
                        <span class="pstat-num">${player.goals + player.assists}</span>
                        <span class="pstat-label">G+A</span>
                    </div>
                </div>
                <div class="player-match-preview">
                    <span>Next Match</span>
                    <span>${player.match}</span>
                </div>
            </div>
            <div class="player-watch-footer">
                <div class="watch-reason">${player.reason}</div>
            </div>
        </div>
    `).join('');
}

// ─── RENDER LEADERBOARD ──────────────────────────────────────────────────────
function renderLeaderboard(tab = 'goals') {
    const data = LEADERBOARD_DATA[tab];
    const rankClasses = ['gold-rank', 'silver-rank', 'bronze-rank'];
    const label = tab === 'goals' ? 'Goals' : tab === 'assists' ? 'Assists' : 'Rating';
    document.getElementById('leaderboardContainer').innerHTML = `
        <table class="lb-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Player</th>
                    <th>Nation</th>
                    <th>${label}</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                ${data.map((player, i) => `
                    <tr class="lb-row">
                        <td class="lb-rank ${rankClasses[i] || ''}">${i + 1}</td>
                        <td>
                            <div class="lb-player-info">
                                <div class="lb-avatar">${player.avatar}</div>
                                <div>
                                    <div class="lb-player-name">${player.name}</div>
                                    <div class="lb-player-country">${player.country}</div>
                                </div>
                            </div>
                        </td>
                        <td class="lb-nation-flag">${player.flag}</td>
                        <td class="lb-stat-value">${player.value}</td>
                        <td>${player.badge ? `<span class="lb-badge badge-${player.badge}">${player.badgeText}</span>` : '—'}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

document.querySelectorAll('.lb-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.lb-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderLeaderboard(tab.dataset.tab);
    });
});

// ─── RENDER RESULTS ──────────────────────────────────────────────────────────
function renderResults() {
    const grid = document.getElementById('resultsGrid');
    grid.innerHTML = RESULTS.map((result, i) => `
        <div class="result-card reveal reveal-delay-${(i % 2) + 1}">
            <div class="result-card-header">
                <span class="result-stage">${result.stage}</span>
                <span class="result-date">${result.date}</span>
            </div>
            <div class="result-scoreline">
                <div class="result-team">
                    <div class="result-flag">${result.team1.flag}</div>
                    <div class="result-team-name">${result.team1.name}</div>
                </div>
                <div class="result-score-box">
                    <div class="score-display">${result.team1.score} – ${result.team2.score}</div>
                    <span class="score-label">FULL TIME</span>
                </div>
                <div class="result-team">
                    <div class="result-flag">${result.team2.flag}</div>
                    <div class="result-team-name">${result.team2.name}</div>
                </div>
            </div>
            <div class="result-details">
                <div class="result-scorers">
                    <div class="scorer-list">
                        ${result.team1.scorers.map(s => `<p>${s}</p>`).join('')}
                    </div>
                    <div class="scorer-list" style="text-align:right;">
                        ${result.team2.scorers.map(s => `<p style="flex-direction:row-reverse;">${s}</p>`).join('')}
                    </div>
                </div>
                <div class="result-summary">${result.summary}</div>
                <div class="result-footer">
                    <div class="result-rating"><i class="fas fa-star"></i> Match Rating: ${result.rating}</div>
                    <div class="result-venue"><i class="fas fa-map-marker-alt"></i> ${result.venue}</div>
                </div>
            </div>
        </div>
    `).join('');
}

// ─── RENDER NEWS ─────────────────────────────────────────────────────────────
function renderNews() {
    const grid = document.getElementById('newsGrid');
    grid.innerHTML = NEWS.map((article, i) => `
        <div class="news-card ${article.featured ? 'featured' : ''} reveal">
            <div class="news-thumbnail">
                <div class="news-thumb-emoji">${article.emoji}</div>
                <div class="news-thumb-overlay"></div>
                <span class="news-tag tag-${article.tag}">${article.tagText}</span>
            </div>
            <div class="news-body">
                <div class="news-meta">
                    <span class="news-source">${article.source}</span>
                    <span class="news-time"><i class="fas fa-clock"></i> ${article.time}</span>
                </div>
                <h3 class="news-title">${article.title}</h3>
                <p class="news-excerpt">${article.excerpt}</p>
                <a href="#" class="news-read-more">Read More <i class="fas fa-arrow-right"></i></a>
            </div>
        </div>
    `).join('');
    reobserveReveal();
}

// ─── SCROLL REVEAL ───────────────────────────────────────────────────────────
let revealObserver;
function initRevealObserver() {
    revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}
function reobserveReveal() {
    if (!revealObserver) return;
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// ─── KEYBOARD ESC MODAL ──────────────────────────────────────────────────────
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.getElementById('matchModal').classList.remove('open');
});

// ─── SMOOTH SCROLL FOR NAV LINKS ─────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ─── ACTIVE LEADERBOARD TAB HIGHLIGHT ────────────────────────────────────────
function setActiveTab(tabEl) {
    document.querySelectorAll('.lb-tab').forEach(t => t.classList.remove('active'));
    tabEl.classList.add('active');
}

// ─── INITIALIZE ALL SECTIONS ─────────────────────────────────────────────────
function init() {
    renderSchedule();
    renderPlayersToWatch();
    renderLeaderboard('goals');
    renderResults();
    renderNews();
}
init();
