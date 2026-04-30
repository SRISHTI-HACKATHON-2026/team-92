/* ── TEACHER DASHBOARD — Stage 8 ── */

const URGENCY_COLOR = { misconception: '#f87171', confused: '#fbbf24', rote: '#a78bfa', understood: '#00d4aa' };
const URGENCY_LABEL = { misconception: '🔴 Misconception', confused: '🟡 Confusion', rote: '🟣 Rote', understood: '🟢 Understood' };
const CELL_COLOR = { misconception: '#f8717130', confused: '#fbbf2430', rote: '#a78bfa30', understood: '#00d4aa30', null: 'var(--surface2)' };
const CELL_TEXT = { misconception: '#f87171', confused: '#fbbf24', rote: '#a78bfa', understood: '#00d4aa', null: 'var(--text-dim)' };
const CELL_ICON = { misconception: '🔴', confused: '🟡', rote: '🟣', understood: '🟢', null: '⬜' };

const TeacherDashboard = {

    currentTab: 'triage',

    render() {
        const tname = Storage.getTeacherName() || MOCK_CLASS.teacher.name;
        const tschool = Storage.getTeacherSchool() || MOCK_CLASS.teacher.school;
        const lang = Storage.getLang();

        const page = document.getElementById('page-teacher-dashboard');
        page.innerHTML = this._buildShell(tname, tschool);
        this._bindTabs();
        this._renderTab('triage');
    },

    _buildShell(tname, tschool) {
        return `
        <div class="tdash-header">
            <div class="tdash-header-left">
                <div class="tdash-avatar">${tname[0] || 'T'}</div>
                <div>
                    <div class="tdash-teacher-name">${tname}</div>
                    <div class="tdash-teacher-school">${tschool} · ${MOCK_CLASS.teacher.classSection}</div>
                </div>
            </div>
            <div class="tdash-header-right">
                <div class="tdash-stat-pill">👥 ${MOCK_CLASS.students.length} Students</div>
                <button class="back-btn" id="btn-tdash-back">← Exit</button>
            </div>
        </div>
        <div class="tdash-tabs">
            <button class="tdash-tab active" data-tab="triage">🚨 Triage</button>
            <button class="tdash-tab" data-tab="fingerprint">🔍 Misconceptions</button>
            <button class="tdash-tab" data-tab="healthmap">🗺️ Health Map</button>
            <button class="tdash-tab" data-tab="weekly">📋 Weekly</button>
        </div>
        <div class="tdash-body" id="tdash-body"></div>`;
    },

    _bindTabs() {
        document.getElementById('btn-tdash-back').onclick = () => App.logout();
        document.querySelectorAll('.tdash-tab').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('.tdash-tab').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this._renderTab(btn.dataset.tab);
            };
        });
    },

    _renderTab(tab) {
        const body = document.getElementById('tdash-body');
        this.currentTab = tab;
        if (tab === 'triage') body.innerHTML = this._buildTriage();
        if (tab === 'fingerprint') body.innerHTML = this._buildFingerprint();
        if (tab === 'healthmap') body.innerHTML = this._buildHealthMap();
        if (tab === 'weekly') body.innerHTML = this._buildWeekly();
    },

    // ── TRIAGE VIEW ──────────────────────────────────────
    _buildTriage() {
        const urgent = getTriageStudents(5);
        const total = MOCK_CLASS.students.length;
        const needsAttention = MOCK_CLASS.students.filter(s => Object.values(s.results).some(v => v === 'misconception' || v === 'confused')).length;

        const statsRow = `
        <div class="tdash-triage-stats">
            <div class="tdash-tri-stat red"><div class="tdash-tri-num">${MOCK_CLASS.students.filter(s => Object.values(s.results).some(v => v === 'misconception')).length}</div><div>Have Misconceptions</div></div>
            <div class="tdash-tri-stat yellow"><div class="tdash-tri-num">${MOCK_CLASS.students.filter(s => Object.values(s.results).some(v => v === 'confused')).length}</div><div>Confused</div></div>
            <div class="tdash-tri-stat green"><div class="tdash-tri-num">${MOCK_CLASS.students.filter(s => Object.values(s.results).some(v => v === 'understood')).length}</div><div>Understanding</div></div>
            <div class="tdash-tri-stat purple"><div class="tdash-tri-num">${MOCK_CLASS.students.filter(s => Object.values(s.results).every(v => !v)).length}</div><div>Not Started</div></div>
        </div>`;

        const cards = urgent.map((s, i) => {
            const worst = Object.entries(s.results).filter(([, v]) => v).sort((a, b) => {
                const w = { misconception: 3, confused: 2, rote: 1, understood: 0 }; return (w[b[1]] || 0) - (w[a[1]] || 0);
            });
            const topIssue = worst[0];
            const issueLabel = topIssue ? `${CELL_ICON[topIssue[1]]} ${topIssue[0].replace('_', ' ')} — ${topIssue[1]}` : '';
            const urgencyScore = getUrgencyScore(s);
            const conceptBadges = Object.entries(s.results).map(([cid, cls]) => {
                if (!cls) return '';
                return `<span class="tri-concept-badge" style="background:${CELL_COLOR[cls]};color:${CELL_TEXT[cls]}">${cid.replace('_', ' ')} ${CELL_ICON[cls]}</span>`;
            }).join('');
            return `
            <div class="tdash-triage-card ${i === 0 ? 'most-urgent' : ''}">
                <div class="tdash-tri-rank">${i + 1}</div>
                <div class="tdash-tri-avatar">${s.name[0]}</div>
                <div class="tdash-tri-info">
                    <div class="tdash-tri-name">${s.name} ${i === 0 ? '<span class="tri-urgent-tag">Most Urgent</span>' : ''}</div>
                    <div class="tdash-tri-issue">${issueLabel}</div>
                    <div class="tdash-tri-badges">${conceptBadges}</div>
                </div>
                <div class="tdash-tri-score">
                    <div class="tdash-tri-score-val" style="color:${urgencyScore > 5 ? '#f87171' : urgencyScore > 3 ? '#fbbf24' : '#a78bfa'}">${urgencyScore}</div>
                    <div style="font-size:0.7rem;color:var(--text-muted)">urgency</div>
                </div>
            </div>`;
        }).join('');

        return `
        <div class="tdash-tab-inner">
            <div class="tdash-section-head">
                <h3>🚨 Students Needing Attention Today</h3>
                <p>${needsAttention} of ${total} students need intervention. Focus on these ${urgent.length} first.</p>
            </div>
            ${statsRow}
            <div class="tdash-triage-list">${cards}</div>
        </div>`;
    },

    // ── MISCONCEPTION FINGERPRINT ──────────────────────────
    _buildFingerprint() {
        const prints = getMisconceptionFingerprints();
        const cards = prints.map(fp => {
            const pct = Math.round((fp.count / fp.total) * 100);
            const barHtml = `
            <div class="fp-bar-wrap">
                <div class="fp-bar-label"><span>${fp.count} students (${pct}%)</span><span>${fp.total} total</span></div>
                <div class="fp-bar-bg"><div class="fp-bar-fill" style="width:${pct}%"></div></div>
            </div>`;
            return `
            <div class="tdash-fp-card">
                <div class="tdash-fp-top">
                    <div class="tdash-fp-alert-dot"></div>
                    <div class="tdash-fp-concept">${fp.label}</div>
                    <div class="tdash-fp-count-badge">${fp.count} students</div>
                </div>
                <div class="tdash-fp-belief">"Many students believe <strong>${fp.belief}</strong>"</div>
                ${barHtml}
                <div class="tdash-fp-action">
                    <span class="fp-action-label">💡 Recommended Action</span>
                    <p>${fp.action}</p>
                </div>
                <div class="tdash-fp-names">
                    <span class="fp-names-label">Students affected:</span>
                    ${MOCK_CLASS.students.filter(s => s.results[fp.concept] === 'misconception').map(s => `<span class="fp-name-tag">${s.name.split(' ')[0]}</span>`).join('')}
                </div>
            </div>`;
        }).join('');

        return `
        <div class="tdash-tab-inner">
            <div class="tdash-section-head">
                <h3>🔍 Misconception Fingerprint Alerts</h3>
                <p>These are the most common wrong beliefs in your class right now. Address them directly.</p>
            </div>
            ${cards || '<p class="tdash-empty">No widespread misconceptions detected. Great class!</p>'}
        </div>`;
    },

    // ── CONCEPT HEALTH MAP ──────────────────────────────────
    _buildHealthMap() {
        const { concepts, conceptLabels, students } = getConceptHealthMap();
        const legend = ['understood', 'rote', 'confused', 'misconception', 'null'].map(k =>
            `<div class="hm-legend-item"><div class="hm-legend-dot" style="background:${k === 'null' ? 'var(--surface2)' : URGENCY_COLOR[k]}"></div>${k === 'null' ? 'Not started' : URGENCY_LABEL[k].replace(/^../, '')}</div>`
        ).join('');

        const headerCells = concepts.map(c => `<div class="hm-col-head">${conceptLabels[c]}</div>`).join('');
        const rows = students.map(s => {
            const cells = concepts.map(c => {
                const cls = s.results[c] || 'null';
                return `<div class="hm-cell" style="background:${CELL_COLOR[cls]}" title="${s.name} · ${c.replace('_', ' ')} · ${cls}">${CELL_ICON[cls]}</div>`;
            }).join('');
            return `<div class="hm-row"><div class="hm-student-name">${s.name.split(' ')[0]}</div>${cells}</div>`;
        }).join('');

        return `
        <div class="tdash-tab-inner">
            <div class="tdash-section-head">
                <h3>🗺️ Concept Health Map</h3>
                <p>One glance shows where every student stands on every topic. Click any cell for details.</p>
            </div>
            <div class="hm-legend">${legend}</div>
            <div class="hm-grid-wrap">
                <div class="hm-grid">
                    <div class="hm-row hm-header-row"><div class="hm-student-name"></div>${headerCells}</div>
                    ${rows}
                </div>
            </div>
        </div>`;
    },

    // ── WEEKLY SUMMARY ──────────────────────────────────────
    _buildWeekly() {
        const { totalAttempted, understood, needsHelp, counts, peerSessions } = getWeeklySummary();
        const now = new Date();
        const weekStr = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
        const bars = [
            { label: '🟢 True Understanding', count: counts.understood || 0, color: 'var(--understood)' },
            { label: '🟣 Rote Learning', count: counts.rote || 0, color: 'var(--rote)' },
            { label: '🟡 Concept Confusion', count: counts.confused || 0, color: 'var(--confused)' },
            { label: '🔴 Misconception', count: counts.misconception || 0, color: 'var(--misconception)' }
        ];
        const maxCount = Math.max(...bars.map(b => b.count), 1);
        const barHtml = bars.map(b => `
            <div class="weekly-bar-row">
                <div class="weekly-bar-label">${b.label}</div>
                <div class="weekly-bar-wrap">
                    <div class="weekly-bar-fill" style="width:${(b.count / maxCount) * 100}%;background:${b.color}"></div>
                    <span class="weekly-bar-num">${b.count}</span>
                </div>
            </div>`).join('');

        const summaryText = `This week, ${totalAttempted} students attempted at least one topic. ${understood} achieved True Understanding on at least one concept. ${needsHelp} students still have active misconceptions that need direct intervention. ${peerSessions} peer teaching sessions were completed.`;

        const actions = needsHelp > 5
            ? `⚠️ ${needsHelp} students have misconceptions — consider a whole-class correction session on ${getMisconceptionFingerprints()[0]?.label || 'a key topic'}.`
            : understood > totalAttempted * 0.6
                ? `✅ Over 60% of students reached Understanding. Excellent week! Consider introducing extension challenges.`
                : `📌 Mixed progress this week. Focus on ${getTriageStudents(1)[0]?.name || 'the most urgent students'} first.`;

        return `
        <div class="tdash-tab-inner">
            <div class="tdash-section-head">
                <h3>📋 Weekly Summary</h3>
                <p>Auto-generated — no data entry required. Week ending ${weekStr}.</p>
            </div>
            <div class="weekly-summary-card">
                <div class="weekly-summary-text">${summaryText}</div>
                <div class="weekly-action-box">${actions}</div>
            </div>
            <div class="weekly-stats-row">
                <div class="weekly-stat"><div class="weekly-stat-num">${totalAttempted}</div><div>Students Active</div></div>
                <div class="weekly-stat"><div class="weekly-stat-num" style="color:var(--understood)">${understood}</div><div>Achieved Understanding</div></div>
                <div class="weekly-stat"><div class="weekly-stat-num" style="color:var(--misconception)">${needsHelp}</div><div>Need Help</div></div>
                <div class="weekly-stat"><div class="weekly-stat-num" style="color:var(--secondary)">${peerSessions}</div><div>Peer Sessions</div></div>
            </div>
            <div class="tdash-section-head" style="margin-top:2rem;">
                <h3>📊 Classification Distribution</h3>
            </div>
            <div class="weekly-bars">${barHtml}</div>
        </div>`;
    }
};