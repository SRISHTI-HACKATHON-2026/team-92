/* ── STUDENT DASHBOARD — Stage 8 ── */

const JOURNEY_LEVELS = ['misconception', 'confused', 'rote', 'understood'];
const JOURNEY_LABELS = {
    misconception: { en: 'Misconception', hi: 'गलत धारणा', label: '❌', color: '#f87171' },
    confused: { en: 'Confusion', hi: 'भ्रम', label: '🤔', color: '#fbbf24' },
    rote: { en: 'Rote', hi: 'रटना', label: '📚', color: '#a78bfa' },
    understood: { en: 'Understanding', hi: 'समझ', label: '✅', color: '#00d4aa' }
};
const CONCEPT_LABELS = {
    photosynthesis: { en: 'Photosynthesis', icon: '🌿' },
    water_cycle: { en: 'Water Cycle', icon: '💧' },
    fractions: { en: 'Fractions', icon: '🍕' }
};

// Achievement definitions
const ACHIEVEMENTS = {
    first_complete: { icon: '🏅', title: 'First Step!', msg: 'Hurray! You completed your first topic! That\'s how every expert begins!' },
    first_understood: { icon: '🌟', title: 'True Understanding!', msg: 'Wow, you really understood that! You\'re thinking like a scientist now!' },
    first_teach: { icon: '🤝', title: 'Teacher Mode!', msg: 'Amazing! You taught someone else. Teaching is the highest form of learning!' },
    all_three: { icon: '🏆', title: 'All Topics Done!', msg: 'Incredible! You\'ve completed all three topics. You\'re a VidyaBodh champion!' },
    five_quiz_pts: { icon: '⭐', title: 'Point Collector!', msg: 'Great job! You\'ve earned 5 quiz points. Keep going!' }
};

const StudentDashboard = {

    render(containerPage) {
        const lang = Storage.getLang();
        const name = Storage.getName();
        const completed = Storage.getCompletedConcepts();
        const lb = Storage.getLeaderboard();
        const peerLog = Storage.getPeerLog();
        const results = Storage.getResults();

        const page = document.getElementById(containerPage);
        page.innerHTML = this._buildHTML(name, completed, lb, peerLog, results, lang);
        this._bindBack(containerPage);
        this._drawMiniCharts();
    },

    _buildHTML(name, completed, lb, peerLog, results, lang) {
        const totalTopics = Object.keys(CONCEPT_LABELS).length;
        const pct = Math.round((completed.length / totalTopics) * 100);

        // Leaderboard mock rank (based on teach pts vs simulated peers)
        const mockPeers = [12, 9, 7, 6, 5, 4, 3, 2, 1];
        const rank = mockPeers.filter(p => p > lb.teach).length + 1;

        return `
        <div class="sdash-header">
            <button class="back-btn" id="btn-sdash-back">← Home</button>
            <div class="sdash-header-title">
                <h2>📊 My Dashboard</h2>
                <p>${name}'s Learning Journey</p>
            </div>
        </div>
        <div class="sdash-body">

            <!-- HERO STATS ROW -->
            <div class="sdash-stats-row">
                <div class="sdash-stat-card">
                    <div class="sdash-stat-icon">📚</div>
                    <div class="sdash-stat-val">${completed.length}/${totalTopics}</div>
                    <div class="sdash-stat-label">Topics Done</div>
                    <div class="sdash-mini-progress">
                        <div class="sdash-mini-fill" style="width:${pct}%;background:var(--primary)"></div>
                    </div>
                </div>
                <div class="sdash-stat-card">
                    <div class="sdash-stat-icon">⭐</div>
                    <div class="sdash-stat-val">${lb.quiz}</div>
                    <div class="sdash-stat-label">Quiz Points</div>
                </div>
                <div class="sdash-stat-card sdash-teach-card">
                    <div class="sdash-stat-icon">🤝</div>
                    <div class="sdash-stat-val">${lb.teach}</div>
                    <div class="sdash-stat-label">Teaching Points</div>
                </div>
                <div class="sdash-stat-card">
                    <div class="sdash-stat-icon">🏆</div>
                    <div class="sdash-stat-val">#${rank}</div>
                    <div class="sdash-stat-label">Class Rank</div>
                </div>
            </div>

            <!-- UNDERSTANDING JOURNEY PER CONCEPT -->
            <div class="sdash-section">
                <div class="sdash-section-title">🗺️ Understanding Journey</div>
                <p class="sdash-section-sub">Your progress from misconception to true understanding for each topic</p>
                ${this._buildJourneyCards(lang)}
            </div>

            <!-- CONCEPT DONUT CHARTS -->
            <div class="sdash-section">
                <div class="sdash-section-title">📈 Score Breakdown</div>
                <div class="sdash-donut-row" id="sdash-donut-row">
                    ${this._buildDonutCharts(results)}
                </div>
            </div>

            <!-- PEER TEACHING RECORD -->
            <div class="sdash-section">
                <div class="sdash-section-title">🤝 Peer Teaching Record</div>
                ${this._buildPeerTable(peerLog, lang)}
            </div>

            <!-- LEADERBOARD -->
            <div class="sdash-section">
                <div class="sdash-section-title">🏆 Class Leaderboard <span style="font-size:0.75rem;color:var(--text-muted);font-weight:400;">(based on teaching, not scoring)</span></div>
                ${this._buildLeaderboard(lb, name, rank)}
            </div>

            <!-- ACHIEVEMENTS -->
            <div class="sdash-section">
                <div class="sdash-section-title">🎖️ Achievements</div>
                ${this._buildAchievements()}
            </div>

        </div>`;
    },

    _buildJourneyCards(lang) {
        const allConcepts = Object.keys(CONCEPT_LABELS);
        return allConcepts.map(cid => {
            const info = CONCEPT_LABELS[cid];
            const classification = Storage.getLatestClassification(cid);
            const currentIdx = classification ? JOURNEY_LEVELS.indexOf(classification) : -1;
            const attempts = Storage.getResults().filter(r => r.conceptId === cid).length;
            const stepsHtml = JOURNEY_LEVELS.map((lv, i) => {
                const jl = JOURNEY_LABELS[lv];
                const done = i <= currentIdx;
                const current = i === currentIdx;
                return `<div class="journey-step ${done ? 'done' : ''} ${current ? 'current' : ''}">
                    <div class="journey-dot" style="${done ? `background:${jl.color};box-shadow:0 0 10px ${jl.color}60` : ''}">
                        ${done ? jl.label : (i + 1)}
                    </div>
                    <div class="journey-label">${jl.en}</div>
                </div>`;
            }).join('<div class="journey-line"></div>');
            return `
            <div class="journey-card">
                <div class="journey-card-top">
                    <span class="journey-concept-icon">${info.icon}</span>
                    <div>
                        <div class="journey-concept-name">${info.en}</div>
                        <div class="journey-concept-meta">${attempts > 0 ? `${attempts} attempt${attempts > 1 ? 's' : ''}` : 'Not started'}</div>
                    </div>
                    ${classification ? `<div class="journey-badge" style="background:${JOURNEY_LABELS[classification].color}22;color:${JOURNEY_LABELS[classification].color};border:1px solid ${JOURNEY_LABELS[classification].color}40">${JOURNEY_LABELS[classification].label} ${JOURNEY_LABELS[classification].en}</div>` : '<div class="journey-badge-grey">Not started</div>'}
                </div>
                <div class="journey-steps">${stepsHtml}</div>
            </div>`;
        }).join('');
    },

    _buildDonutCharts(results) {
        const conceptIds = Object.keys(CONCEPT_LABELS);
        if (!results.length) return '<p style="color:var(--text-muted);font-size:0.88rem;">Complete a quiz to see your breakdown.</p>';
        return conceptIds.map(cid => {
            const conceptResults = results.filter(r => r.conceptId === cid);
            if (!conceptResults.length) return '';
            const counts = { understood: 0, rote: 0, confused: 0, misconception: 0 };
            conceptResults.forEach(r => { if (counts[r.classification] !== undefined) counts[r.classification]++; });
            const total = conceptResults.length;
            const pct = total ? Math.round((counts.understood / total) * 100) : 0;
            const info = CONCEPT_LABELS[cid];
            return `
            <div class="sdash-donut-card">
                <div class="sdash-donut-wrap">
                    <svg viewBox="0 0 36 36" class="sdash-donut-svg">
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--surface2)" stroke-width="3.8"/>
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--understood)" stroke-width="3.8"
                            stroke-dasharray="${pct} ${100 - pct}" stroke-dashoffset="25" stroke-linecap="round"/>
                    </svg>
                    <div class="sdash-donut-pct">${pct}%</div>
                </div>
                <div class="sdash-donut-label">${info.icon} ${info.en}</div>
                <div class="sdash-donut-sub">${counts.understood}/${total} understood</div>
            </div>`;
        }).join('');
    },

    _buildPeerTable(peerLog, lang) {
        if (!peerLog.length) return '<p class="sdash-empty">You haven\'t taught any peers yet. Complete a topic to True Understanding to unlock peer teaching!</p>';
        return `<div class="sdash-peer-table">
            <div class="sdash-peer-row sdash-peer-header">
                <span>Concept</span><span>Taught to</span><span>Result</span><span>When</span>
            </div>
            ${peerLog.map(p => {
            const d = new Date(p.ts);
            const dateStr = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
            const conceptInfo = CONCEPT_LABELS[p.concept] || { icon: '📚', en: p.concept };
            return `<div class="sdash-peer-row">
                    <span>${conceptInfo.icon} ${conceptInfo.en}</span>
                    <span>${p.learnerName || 'A classmate'}</span>
                    <span class="${p.success ? 'peer-success' : 'peer-pending'}">${p.success ? '✅ Got it' : '🔄 In progress'}</span>
                    <span>${dateStr}</span>
                </div>`;
        }).join('')}
        </div>`;
    },

    _buildLeaderboard(lb, name, rank) {
        const mockBoard = [
            { rank: 1, name: 'Priya N.', pts: 12, you: false },
            { rank: 2, name: 'Pooja I.', pts: 9, you: false },
            { rank: 3, name: 'Deepa N.', pts: 7, you: false },
            { rank: 4, name: 'Tanvi J.', pts: 6, you: false },
            { rank: 5, name: 'Rekha S.', pts: 5, you: false }
        ];
        // Insert student at correct rank
        const you = { rank, name: name + ' (You)', pts: lb.teach, you: true };
        const board = [...mockBoard.filter(m => m.rank < rank), you, ...mockBoard.filter(m => m.rank >= rank)].slice(0, 7);
        return `
        <div class="sdash-lb-note">🏅 Points are earned by teaching peers, not just scoring well.</div>
        <div class="sdash-lb-list">
            ${board.map(row => `
            <div class="sdash-lb-row ${row.you ? 'you' : ''}">
                <div class="sdash-lb-rank">#${row.rank}</div>
                <div class="sdash-lb-name">${row.name}</div>
                <div class="sdash-lb-bar-wrap">
                    <div class="sdash-lb-bar" style="width:${Math.max(5, (row.pts / 12) * 100)}%;background:${row.you ? 'var(--secondary)' : 'var(--primary)'}"></div>
                </div>
                <div class="sdash-lb-pts">${row.pts} pts</div>
            </div>`).join('')}
        </div>`;
    },

    _buildAchievements() {
        const earned = Storage.getAchievements();
        return `<div class="sdash-ach-grid">
            ${Object.entries(ACHIEVEMENTS).map(([key, ach]) => {
            const has = earned.includes(key);
            return `<div class="sdash-ach-badge ${has ? 'earned' : 'locked'}">
                    <div class="sdash-ach-icon">${has ? ach.icon : '🔒'}</div>
                    <div class="sdash-ach-title">${ach.title}</div>
                </div>`;
        }).join('')}
        </div>`;
    },

    _bindBack(containerPage) {
        document.getElementById('btn-sdash-back').onclick = () => { App.show('home'); App.renderHome(); };
    },

    _drawMiniCharts() { /* SVG donuts rendered inline */ },

    // Achievement bot — call after classification
    checkAndFireAchievement(classification, conceptId) {
        const completed = Storage.getCompletedConcepts();
        const lb = Storage.getLeaderboard();
        let fired = false;

        if (Storage.addAchievement('first_complete') && completed.length >= 1) {
            this.fireAchievementBot('first_complete'); fired = true;
        }
        if (!fired && classification === 'understood' && Storage.addAchievement('first_understood')) {
            this.fireAchievementBot('first_understood'); fired = true;
        }
        if (!fired && completed.length >= 3 && Storage.addAchievement('all_three')) {
            this.fireAchievementBot('all_three'); fired = true;
        }
        if (!fired && lb.quiz >= 5 && Storage.addAchievement('five_quiz_pts')) {
            this.fireAchievementBot('five_quiz_pts'); fired = true;
        }
    },

    checkTeachAchievement() {
        if (Storage.addAchievement('first_teach')) this.fireAchievementBot('first_teach');
    },

    fireAchievementBot(key) {
        const ach = ACHIEVEMENTS[key];
        if (!ach) return;

        // Remove any existing bot
        document.getElementById('achievement-bot')?.remove();

        const bot = document.createElement('div');
        bot.id = 'achievement-bot';
        bot.className = 'ach-bot';
        bot.innerHTML = `
            <div class="ach-bot-char">${ach.icon}</div>
            <div class="ach-bot-bubble">
                <div class="ach-bot-title">${ach.title}</div>
                <div class="ach-bot-msg">${ach.msg}</div>
                <button class="ach-bot-close" onclick="this.parentElement.parentElement.remove()">✕</button>
            </div>`;
        document.body.appendChild(bot);

        // Voice
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utter = new SpeechSynthesisUtterance(ach.msg);
            utter.lang = LANGUAGES[Storage.getLang()]?.code || 'en-IN';
            utter.rate = 0.92; utter.pitch = 1.2;
            window.speechSynthesis.speak(utter);
        }

        setTimeout(() => bot?.remove(), 8000);
    }
};