const Storage = {
    getLang: () => localStorage.getItem('vb_lang') || 'en',
    setLang: (v) => localStorage.setItem('vb_lang', v),
    getName: () => localStorage.getItem('vb_name') || 'Student',
    setName: (v) => localStorage.setItem('vb_name', v),
    getClass: () => localStorage.getItem('vb_class') || '5',
    setClass: (v) => localStorage.setItem('vb_class', v),
    isSetup: () => !!localStorage.getItem('vb_name'),

    // Role (Stage 8)
    getRole: () => localStorage.getItem('vb_role') || null,
    setRole: (v) => localStorage.setItem('vb_role', v),

    // Teacher profile
    getTeacherName: () => localStorage.getItem('vb_tname') || '',
    setTeacherName: (v) => localStorage.setItem('vb_tname', v),
    getTeacherSchool: () => localStorage.getItem('vb_tschool') || '',
    setTeacherSchool: (v) => localStorage.setItem('vb_tschool', v),
    isTeacherSetup: () => !!localStorage.getItem('vb_tname'),

    // Session results: array of { conceptId, subject, classification, ts }
    getResults: () => JSON.parse(localStorage.getItem('vb_results') || '[]'),
    saveResult: (r) => {
        const arr = Storage.getResults();
        arr.push({ ...r, ts: Date.now() });
        localStorage.setItem('vb_results', JSON.stringify(arr));
    },
    clearResults: () => localStorage.removeItem('vb_results'),

    // Latest classification per concept
    getLatestClassification: (conceptId) => {
        const arr = Storage.getResults().filter(r => r.conceptId === conceptId);
        return arr.length ? arr[arr.length - 1].classification : null;
    },

    // Completed concepts (at least one quiz result)
    getCompletedConcepts: () => {
        const results = Storage.getResults();
        return [...new Set(results.map(r => r.conceptId))];
    },

    // Watch log
    getWatchLog: () => JSON.parse(localStorage.getItem('vb_watch') || '{}'),
    logWatch: (id, watched) => {
        const log = Storage.getWatchLog();
        log[id] = { watched, ts: Date.now() };
        localStorage.setItem('vb_watch', JSON.stringify(log));
    },

    // Character (Stage 4)
    getCharacter: () => localStorage.getItem('vb_char') || null,
    setCharacter: (id) => localStorage.setItem('vb_char', id),

    // Leaderboard points (Stage 5)
    getLeaderboard: () => JSON.parse(localStorage.getItem('vb_lb') || '{"quiz":0,"teach":0}'),
    addQuizPoints: (n) => {
        const lb = Storage.getLeaderboard();
        lb.quiz = (lb.quiz || 0) + n;
        localStorage.setItem('vb_lb', JSON.stringify(lb));
    },
    addTeachPoints: (n) => {
        const lb = Storage.getLeaderboard();
        lb.teach = (lb.teach || 0) + n;
        localStorage.setItem('vb_lb', JSON.stringify(lb));
    },

    // Peer log (Stage 5 + Stage 8 dashboard)
    getPeerLog: () => JSON.parse(localStorage.getItem('vb_peer_log') || '[]'),
    addPeerLog: (entry) => {
        const log = Storage.getPeerLog();
        log.push({ ...entry, ts: Date.now() });
        localStorage.setItem('vb_peer_log', JSON.stringify(log));
    },

    // Achievements (Stage 8 bot)
    getAchievements: () => JSON.parse(localStorage.getItem('vb_ach') || '[]'),
    addAchievement: (key) => {
        const ach = Storage.getAchievements();
        if (!ach.includes(key)) {
            ach.push(key);
            localStorage.setItem('vb_ach', JSON.stringify(ach));
            return true;
        }
        return false;
    },

    // PIN-based login (Stage 8)
    getPin: () => localStorage.getItem('vb_pin') || null,
    setPin: (pin) => localStorage.setItem('vb_pin', pin),
    verifyPin: (pin) => localStorage.getItem('vb_pin') === pin,
    hasPin: () => !!localStorage.getItem('vb_pin'),

    // Session (login/logout without erasing profile)
    isLoggedIn: () => sessionStorage.getItem('vb_session') === '1',
    login: () => sessionStorage.setItem('vb_session', '1'),
    logout: () => {
        sessionStorage.removeItem('vb_session');
        // Do NOT clear localStorage — profile + results stay
    },

    // Full reset (delete everything)
    fullReset: () => { localStorage.clear(); sessionStorage.clear(); }
};