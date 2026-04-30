const App = {
    currentPage: null, currentTopic: null, quizAnswers: [],
    currentQ: 0, selectedOption: null, voiceTranscript: null,
    recognition: null, lastClassification: null, ttsUtterance: null,
    selectedCharacter: null, charAutoTimer: null,

    show(id) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        const el = document.getElementById('page-' + id);
        el.classList.add('active');
        this.currentPage = id;
        el.scrollTop = 0;
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    },

    initLanding() {
        const role = Storage.getRole();
        if (!role) { this.show('role'); this.renderRolePage(); return; }

        if (role === 'teacher') {
            if (!Storage.isTeacherSetup()) { this.renderLanding(Storage.getLang()); this.show('landing'); return; }
            if (!Storage.isLoggedIn()) { this.show('login'); this.renderLoginPage(); return; }
            this.show('teacher-dashboard'); TeacherDashboard.render();
            return;
        }

        // Student
        if (!Storage.isSetup()) { this.renderLanding(Storage.getLang()); this.show('landing'); return; }
        if (!Storage.isLoggedIn()) { this.show('login'); this.renderLoginPage(); return; }
        this.show('home'); this.renderHome();
    },

    renderRolePage() {
        document.getElementById('role-student').onclick = () => {
            Storage.setRole('student');
            this.renderLanding(Storage.getLang()); this.show('landing');
        };
        document.getElementById('role-teacher').onclick = () => {
            Storage.setRole('teacher');
            this.renderLanding(Storage.getLang()); this.show('landing');
        };
    },

    renderLanding(sel) {
        const L = UI[sel] || UI.en;
        const role = Storage.getRole();
        document.getElementById('greeting-text').textContent = role === 'teacher' ? '👩‍🏫 Welcome, Teacher!' : L.greeting;
        document.getElementById('app-title').textContent = L.appName;
        document.getElementById('app-tagline').textContent = L.tagline;
        document.getElementById('lang-label').textContent = L.selectLang;
        document.getElementById('btn-continue').textContent = L.continue;
        const grid = document.getElementById('lang-grid');
        grid.innerHTML = '';
        Object.entries(LANGUAGES).forEach(([code, info]) => {
            const btn = document.createElement('button');
            btn.className = 'lang-btn' + (code === sel ? ' selected' : '');
            btn.id = 'lang-' + code;
            btn.innerHTML = `<span class="lang-native">${info.label}</span><span class="lang-en">${code.toUpperCase()}</span>`;
            btn.onclick = () => { Storage.setLang(code); document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('selected')); btn.classList.add('selected'); this.renderLanding(code); };
            grid.appendChild(btn);
        });
        document.getElementById('btn-continue').onclick = () => {
            if (role === 'teacher') { this.show('teacher-setup'); this.renderTeacherSetup(); }
            else { this.show('setup'); this.renderSetup(); }
        };
    },

    renderSetup() {
        const L = UI[Storage.getLang()] || UI.en;
        document.getElementById('setup-title').textContent = L.enterName;
        document.getElementById('name-input').placeholder = L.namePlaceholder;
        document.getElementById('class-label').textContent = L.selectClass;
        document.getElementById('btn-start').textContent = L.startLearning;
        const cg = document.getElementById('class-grid'); cg.innerHTML = '';
        [3, 4, 5, 6, 7].forEach(c => {
            const btn = document.createElement('button');
            btn.className = 'class-btn' + (Storage.getClass() == c ? ' selected' : '');
            btn.textContent = L.classLabel + ' ' + c;
            btn.onclick = () => { Storage.setClass(c); document.querySelectorAll('.class-btn').forEach(b => b.classList.remove('selected')); btn.classList.add('selected'); };
            cg.appendChild(btn);
        });
        document.getElementById('btn-start').onclick = () => {
            const name = document.getElementById('name-input').value.trim();
            const pin = document.getElementById('pin-input')?.value.trim();
            if (!name) { document.getElementById('name-input').focus(); return; }
            if (pin && pin.length === 4) Storage.setPin(pin);
            Storage.setName(name); Storage.login();
            this.show('home'); this.renderHome();
        };
    },

    renderTeacherSetup() {
        const n = document.getElementById('tname-input');
        const s = document.getElementById('tschool-input');
        if (Storage.getTeacherName()) n.value = Storage.getTeacherName();
        if (Storage.getTeacherSchool()) s.value = Storage.getTeacherSchool();
        document.getElementById('btn-teacher-start').onclick = () => {
            const name = n.value.trim() || 'Teacher';
            const school = s.value.trim() || 'School';
            const pin = document.getElementById('tpin-input')?.value.trim();
            if (pin && pin.length === 4) Storage.setPin(pin);
            Storage.setTeacherName(name); Storage.setTeacherSchool(school);
            Storage.login();
            this.show('teacher-dashboard'); TeacherDashboard.render();
        };
    },

    renderLoginPage() {
        const role = Storage.getRole();
        const isTeacher = role === 'teacher';
        const name = isTeacher ? Storage.getTeacherName() : Storage.getName();
        const hasPin = Storage.hasPin();
        const page = document.getElementById('page-login');
        page.innerHTML = `
        <div class="login-card">
            <div class="login-avatar">${(name || '?')[0].toUpperCase()}</div>
            <div class="login-name">Welcome back, <strong>${name || 'User'}</strong>!</div>
            <div class="login-role-badge">${isTeacher ? '👩‍🏫 Teacher' : '🎒 Student'}</div>
            ${hasPin ? `
            <div class="login-pin-wrap">
                <label class="form-label">Enter your 4-digit PIN</label>
                <input id="login-pin" class="form-input login-pin-input" type="password"
                    inputmode="numeric" maxlength="4" placeholder="••••" autocomplete="off" />
                <p class="login-pin-error" id="login-err" style="display:none;">Wrong PIN. Try again.</p>
            </div>
            <button class="btn-primary" id="btn-login-pin" style="width:100%;justify-content:center;">🔓 Login</button>
            ` : `
            <button class="btn-primary" id="btn-login-skip" style="width:100%;justify-content:center;">Continue →</button>
            `}
            <button class="btn-login-switch" id="btn-login-switch">Not you? Switch account</button>
        </div>`;

        if (hasPin) {
            const pinInput = document.getElementById('login-pin');
            const loginBtn = document.getElementById('btn-login-pin');
            const doLogin = () => {
                const pin = pinInput.value.trim();
                if (Storage.verifyPin(pin)) {
                    Storage.login();
                    if (isTeacher) { this.show('teacher-dashboard'); TeacherDashboard.render(); }
                    else { this.show('home'); this.renderHome(); }
                } else {
                    document.getElementById('login-err').style.display = 'block';
                    pinInput.value = ''; pinInput.focus();
                }
            };
            loginBtn.onclick = doLogin;
            pinInput.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
            setTimeout(() => pinInput.focus(), 100);
        } else {
            document.getElementById('btn-login-skip').onclick = () => {
                Storage.login();
                if (isTeacher) { this.show('teacher-dashboard'); TeacherDashboard.render(); }
                else { this.show('home'); this.renderHome(); }
            };
        }
        document.getElementById('btn-login-switch').onclick = () => {
            Storage.fullReset();
            location.reload();
        };
    },

    logout() {
        Storage.logout();
        this.show('login'); this.renderLoginPage();
    },

    renderHome() {
        const L = UI[Storage.getLang()] || UI.en;
        const name = Storage.getName();
        document.getElementById('home-greeting').textContent = L.homeGreeting + ', ' + name + '!';
        document.getElementById('home-logo').textContent = L.appName;
        document.getElementById('avatar-letter').textContent = name[0].toUpperCase();
        document.getElementById('topics-label').textContent = L.chooseTopic;
        document.getElementById('tab-science').textContent = L.subjects.science;
        document.getElementById('tab-math').textContent = L.subjects.math;
        // Logout button on avatar click
        const avatarBtn = document.getElementById('home-avatar-btn');
        if (avatarBtn) avatarBtn.onclick = () => this._showLogoutMenu();
        // Leaderboard strip
        const lb = Storage.getLeaderboard();
        if (lb.quiz > 0 || lb.teach > 0) {
            document.getElementById('lb-strip').style.display = 'flex';
            document.getElementById('lb-quiz-pts').textContent = lb.quiz;
            document.getElementById('lb-teach-pts').textContent = lb.teach;
        }
        // Dashboard button — show after first topic completed
        const completed = Storage.getCompletedConcepts();
        const existingBtn = document.getElementById('home-dash-btn');
        if (existingBtn) existingBtn.remove();
        if (completed.length > 0) {
            const dashBtn = document.createElement('button');
            dashBtn.id = 'home-dash-btn';
            dashBtn.className = 'home-dashboard-btn';
            dashBtn.innerHTML = '📊 My Dashboard';
            dashBtn.onclick = () => { StudentDashboard.render('page-student-dashboard'); this.show('student-dashboard'); };
            document.getElementById('home-greeting').insertAdjacentElement('afterend', dashBtn);
        }
        this.renderTopics('science');
        document.getElementById('tab-science').onclick = () => { document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active')); document.getElementById('tab-science').classList.add('active'); this.renderTopics('science'); };
        document.getElementById('tab-math').onclick = () => { document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active')); document.getElementById('tab-math').classList.add('active'); this.renderTopics('math'); };
    },

    _showLogoutMenu() {
        // Remove any existing menu
        document.getElementById('logout-menu')?.remove();
        const menu = document.createElement('div');
        menu.id = 'logout-menu';
        menu.className = 'logout-menu';
        menu.innerHTML = `
            <div class="logout-menu-name">${Storage.getName() || Storage.getTeacherName() || 'User'}</div>
            <button class="logout-menu-btn" id="lm-logout">🔒 Lock / Logout</button>
            <button class="logout-menu-btn danger" id="lm-switch">🔄 Switch Account</button>`;
        document.body.appendChild(menu);
        document.getElementById('lm-logout').onclick = () => { menu.remove(); this.logout(); };
        document.getElementById('lm-switch').onclick = () => { Storage.fullReset(); location.reload(); };
        // Close on outside click
        setTimeout(() => document.addEventListener('click', () => menu.remove(), { once: true }), 0);
    },

    renderTopics(subject) {
        const L = UI[Storage.getLang()] || UI.en;
        const lang = Storage.getLang();
        const watchLog = Storage.getWatchLog();
        const icons = { photosynthesis: '🌿', water_cycle: '💧', fractions: '🍕' };
        const grid = document.getElementById('topics-grid'); grid.innerHTML = '';
        Object.values(CURRICULUM[subject]).forEach(topic => {
            const card = document.createElement('div');
            card.className = 'topic-card'; card.id = 'topic-' + topic.id;
            const watched = watchLog[topic.id]?.watched;
            const title = topic.title[lang] || topic.title.en;
            card.innerHTML = `<div class="topic-icon">${icons[topic.id] || '📚'}</div><div class="topic-title">${title}</div><div class="topic-layers"><span class="layer-badge">${L.layer1}</span><span class="layer-badge">${L.layer2}</span><span class="layer-badge">${L.layer3}</span></div><div class="topic-status${watched ? ' watched' : ''}">${watched ? '✓ ' + L.watched : '▶ ' + L.watchVideo}</div>`;
            card.onclick = () => this.startVideo(topic);
            grid.appendChild(card);
        });
    },

    // ── VIDEO ──
    startVideo(topic) {
        this.currentTopic = topic;
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        document.getElementById('video-topic-title').textContent = topic.title[Storage.getLang()] || topic.title.en;
        document.getElementById('ai-video-section').style.display = 'none';
        document.getElementById('offline-video-section').style.display = 'none';
        document.getElementById('layer-summary-section').style.display = 'none';
        document.getElementById('quiz-launch-wrap').style.display = 'none';
        this.show('video');
        if (navigator.onLine) this.renderAIVideo(topic);
        else this.renderOfflineVideo(topic);
        document.getElementById('btn-video-back').onclick = () => {
            if (window.speechSynthesis) window.speechSynthesis.cancel();
            Storage.logWatch(topic.id, false); this.show('home'); this.renderHome();
        };
    },

    renderAIVideo(topic) {
        const lang = Storage.getLang();
        const text = topic.video.layer1[lang] || topic.video.layer1.en;
        document.getElementById('ai-video-section').style.display = 'block';
        const stage = document.getElementById('ai-anim-stage');
        stage.innerHTML = this.getAnimation(topic.id);
        document.getElementById('ai-narrator-text').textContent = text;
        // TTS voiceover
        if ('speechSynthesis' in window) {
            const utter = new SpeechSynthesisUtterance(text);
            utter.lang = LANGUAGES[lang]?.code || 'en-IN';
            utter.rate = 0.9;
            utter.onend = () => { setTimeout(() => this.showLayerSummary(topic), 600); };
            window.speechSynthesis.speak(utter);
        } else {
            setTimeout(() => this.showLayerSummary(topic), 5000);
        }
    },

    renderOfflineVideo(topic) {
        const lang = Storage.getLang();
        const text = topic.video.layer1[lang] || topic.video.layer1.en;
        document.getElementById('offline-video-section').style.display = 'block';
        document.getElementById('offline-anim-stage').innerHTML = this.getAnimation(topic.id);
        document.getElementById('offline-caption-text').textContent = text;
        // Fake timer
        let sec = 0; const dur = 30;
        const timer = setInterval(() => {
            sec++;
            const m = Math.floor(sec / 60), s = sec % 60;
            document.getElementById('fake-time').textContent = m + ':' + (s < 10 ? '0' : '') + s;
            if (sec >= dur) { clearInterval(timer); setTimeout(() => this.showLayerSummary(topic), 600); }
        }, 1000);
        // Also show after 8s for demo
        setTimeout(() => { clearInterval(timer); this.showLayerSummary(topic); }, 8000);
    },

    showLayerSummary(topic) {
        const L = UI[Storage.getLang()] || UI.en;
        const lang = Storage.getLang();
        const ls = document.getElementById('layer-summary-section');
        const grid = document.getElementById('layer-summary-grid');
        ls.style.display = 'block';
        const layers = [
            { key: 'layer1', cls: 'l1', icon: '🎬', label: L.layer1 },
            { key: 'layer2', cls: 'l2', icon: '🤔', label: L.layer2 },
            { key: 'layer3', cls: 'l3', icon: '📖', label: L.layer3 }
        ];
        grid.innerHTML = '';
        layers.forEach(({ key, cls, icon, label }) => {
            const text = topic.video[key][lang] || topic.video[key].en;
            const card = document.createElement('div');
            card.className = 'layer-summary-card ' + cls;
            card.innerHTML = `<div class="ls-icon">${icon}</div><div class="ls-label">${label}</div><div class="ls-text">${text}</div>`;
            grid.appendChild(card);
        });
        const wrap = document.getElementById('quiz-launch-wrap');
        wrap.style.display = 'flex';
        document.getElementById('btn-start-quiz').textContent = L.startQuiz;
        document.getElementById('btn-start-quiz').onclick = () => { Storage.logWatch(topic.id, true); this.startQuiz(); };
        ls.scrollIntoView({ behavior: 'smooth' });
    },

    // ── TOPIC ANIMATIONS ──
    getAnimation(id) {
        if (id === 'photosynthesis') return `
      <div class="anim-photo" style="width:100%;height:100%;position:relative;">
        <div class="sun"></div>
        ${[0, 1, 2, 3, 4].map(i => `<div class="sun-ray" style="left:calc(50% + ${(i - 2) * 18}px);top:80px;animation-delay:${i * 0.3}s;height:${40 + i * 5}px"></div>`).join('')}
        <svg class="leaf-svg" width="80" height="80" viewBox="0 0 80 80"><ellipse cx="40" cy="50" rx="32" ry="22" fill="#16a34a"/><ellipse cx="40" cy="50" rx="22" ry="14" fill="#22c55e"/><line x1="40" y1="72" x2="40" y2="28" stroke="#15803d" stroke-width="2"/></svg>
        <div class="glucose-dot" style="left:52%;animation-delay:1s"></div>
        <div class="glucose-dot" style="left:48%;animation-delay:2s"></div>
        <div class="o2-bubble" style="width:14px;height:14px;left:58%;animation-delay:0.5s"></div>
        <div class="o2-bubble" style="width:10px;height:10px;left:44%;animation-delay:1.5s"></div>
        <div class="photo-label" style="bottom:15px;left:10px;">☀️ Sunlight → Energy</div>
        <div class="photo-label" style="top:140px;right:10px;">O₂ Released</div>
      </div>`;
        if (id === 'water_cycle') return `
      <div class="anim-water" style="width:100%;height:100%;position:relative;background:linear-gradient(to bottom,#0f172a,#1e3a5f);">
        <div class="cloud-shape">☁️ <span style="font-size:2.5rem;">☁️</span></div>
        ${[0, 1, 2].map(i => `<div class="droplet" style="left:calc(45% + ${(i - 1) * 25}px);animation-delay:${i * 1.2}s;">💧</div>`).join('')}
        ${[0, 1, 2, 3, 4].map(i => `<div class="rain-drop" style="left:calc(43% + ${i * 12}px);animation-delay:${i * 0.3}s;"></div>`).join('')}
        <div style="position:absolute;bottom:10px;left:50%;transform:translateX(-50%);font-size:0.7rem;color:var(--secondary);font-weight:700;">Evaporation → Cloud → Rain</div>
      </div>`;
        if (id === 'fractions') return `
      <div class="anim-frac">
        <div class="chapati" id="chapati-anim">
          <div class="cut-line" style="width:100%;height:3px;top:50%;left:0;animation-delay:0.5s;"></div>
          <div class="cut-line" style="width:3px;height:100%;top:0;left:50%;animation-delay:1s;"></div>
        </div>
        <div class="fraction-label">
          <span class="frac-num">3</span>
          <div class="frac-bar"></div>
          <span class="frac-den">4</span>
          <div class="frac-word">Three-fourths</div>
        </div>
      </div>`;
        return `<div style="font-size:4rem;text-align:center;padding:2rem;">📚</div>`;
    },

    // ── QUIZ ──
    startQuiz() {
        this.quizAnswers = []; this.currentQ = 0;
        this.show('quiz'); this.renderQuestion();
    },

    renderQuestion() {
        const L = UI[Storage.getLang()] || UI.en;
        const lang = Storage.getLang();
        const topic = this.currentTopic;
        const questions = topic.quiz;
        const q = questions[this.currentQ];
        const total = questions.length;
        this.selectedOption = null; this.voiceTranscript = null;

        document.getElementById('quiz-topic-name').textContent = topic.title[lang] || topic.title.en;
        const dotsEl = document.getElementById('quiz-dots'); dotsEl.innerHTML = '';
        questions.forEach((_, i) => {
            const d = document.createElement('div');
            d.className = 'q-dot' + (i === this.currentQ ? ' current' : i < this.currentQ ? ' done' : '');
            dotsEl.appendChild(d);
        });
        document.getElementById('q-counter').textContent = `Q${this.currentQ + 1} / ${total}`;
        document.getElementById('q-text').textContent = q.q[lang] || q.q.en;

        const opts = q.options[lang] || q.options.en;
        const letters = ['A', 'B', 'C', 'D'];
        const optGrid = document.getElementById('options-grid'); optGrid.innerHTML = '';
        opts.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn'; btn.id = 'opt-' + i;
            btn.innerHTML = `<span class="option-letter">${letters[i]}</span><span>${opt}</span>`;
            btn.onclick = () => {
                document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected'); this.selectedOption = i; this.showVoiceSection();
            };
            optGrid.appendChild(btn);
        });

        document.getElementById('voice-section').style.display = 'none';
        const nextBtn = document.getElementById('btn-next-q');
        nextBtn.style.display = 'none'; nextBtn.disabled = true;
        const isLast = this.currentQ === total - 1;
        nextBtn.textContent = isLast ? L.submit : L.next;
        nextBtn.onclick = () => this.submitAnswer(isLast);
        document.getElementById('voice-prompt-text').textContent = L.voicePrompt;
        document.getElementById('voice-required-text').textContent = 'Voice explanation required before continuing';
        document.getElementById('btn-voice-record').innerHTML = `<span class="mic-icon">🎤</span> ${L.voiceBtn}`;
        document.getElementById('voice-transcript').value = '';
        document.getElementById('voice-meta').textContent = '';
    },

    showVoiceSection() {
        const L = UI[Storage.getLang()] || UI.en;
        document.getElementById('voice-section').style.display = 'block';
        const nextBtn = document.getElementById('btn-next-q');
        nextBtn.style.display = 'flex'; nextBtn.disabled = true;
        document.getElementById('voice-required-note').style.display = 'flex';
        document.getElementById('voice-meta').textContent = '';

        const ta = document.getElementById('voice-transcript');
        ta.oninput = () => { this.checkVoiceReady(); };

        const recBtn = document.getElementById('btn-voice-record');
        recBtn.onclick = () => this.toggleVoice(recBtn, L);
    },

    checkVoiceReady() {
        const val = document.getElementById('voice-transcript').value.trim();
        const ready = val.length >= 5;
        const nextBtn = document.getElementById('btn-next-q');
        nextBtn.disabled = !ready;
        document.getElementById('voice-required-note').style.display = ready ? 'none' : 'flex';
        document.getElementById('voice-meta').textContent = ready ? '✓ Ready to continue' : '';
        if (ready) document.getElementById('voice-meta').className = 'voice-captured-note';
        else document.getElementById('voice-meta').className = 'voice-meta';
    },

    toggleVoice(btn, L) {
        if (this.recognition?.listening) { this.recognition.stop(); return; }
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            document.getElementById('voice-transcript').focus(); return;
        }
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SR();
        this.recognition.lang = LANGUAGES[Storage.getLang()]?.code || 'en-IN';
        this.recognition.interimResults = true;
        this.recognition.listening = true;
        btn.classList.add('listening');
        btn.innerHTML = `<span class="mic-icon">⏹</span> ${L.voiceListening}`;
        this.recognition.onresult = (e) => {
            let t = ''; for (let r of e.results) t += r[0].transcript;
            document.getElementById('voice-transcript').value = t;
            this.checkVoiceReady();
        };
        this.recognition.onend = () => {
            this.recognition.listening = false;
            btn.classList.remove('listening');
            btn.innerHTML = `<span class="mic-icon">🎤</span> ${L.voiceBtn}`;
            this.checkVoiceReady();
        };
        this.recognition.onerror = () => {
            this.recognition.listening = false;
            btn.classList.remove('listening');
            btn.innerHTML = `<span class="mic-icon">🎤</span> ${L.voiceBtn}`;
            document.getElementById('voice-meta').textContent = 'Voice unavailable — please type below.';
        };
        this.recognition.start();
    },

    submitAnswer(isLast) {
        if (this.selectedOption === null) return;
        const transcript = document.getElementById('voice-transcript').value || '';
        if (transcript.trim().length < 5) return;
        this.quizAnswers.push({ mcqIdx: this.selectedOption, voicePattern: QuizEngine.analyzeVoice(transcript) });
        if (isLast) this.showResult();
        else { this.currentQ++; this.renderQuestion(); }
    },

    // ── RESULT ──
    showResult() {
        const L = UI[Storage.getLang()] || UI.en;
        const lang = Storage.getLang();
        const classification = QuizEngine.aggregateSession(this.quizAnswers);
        this.lastClassification = classification;
        const topic = this.currentTopic;
        Storage.saveResult({ conceptId: topic.id, subject: topic.subject, classification });
        // Award quiz points
        const pts = { understood: 5, rote: 3, confused: 2, misconception: 2, understood_expression_gap: 4 };
        Storage.addQuizPoints(pts[classification] || 2);
        const normClass = classification === 'understood_expression_gap' ? 'understood' : classification;
        this.show('result');
        // Achievement bot (after normClass is defined)
        StudentDashboard.checkAndFireAchievement(normClass, topic.id);
        const icons = { understood: '🌟', confused: '🤔', misconception: '🔄', rote: '📚', understood_expression_gap: '💡' };
        const label = L[normClass] || normClass;
        const msg = L.resultMsgs?.[normClass] || '';
        document.getElementById('result-icon').textContent = icons[classification] || '📋';
        document.getElementById('result-badge').className = 'result-badge ' + normClass;
        document.getElementById('result-badge').textContent = label;
        document.getElementById('result-title').textContent = L.result;
        document.getElementById('result-msg').textContent = msg;
        document.getElementById('btn-exit').onclick = () => { this.show('home'); this.renderHome(); };
        document.getElementById('btn-retry').textContent = L.startQuiz;
        document.getElementById('btn-retry').onclick = () => this.startQuiz();
        // Route to character picker first
        document.getElementById('btn-explain').onclick = () => this.showCharacterPicker(normClass, topic);
        // Peer Learning Banner — always shown, role adapts by classification
        const peerRole = PEER_ROLES[normClass] || PEER_ROLES.confused;
        document.getElementById('plb-icon').textContent = peerRole.icon;
        document.getElementById('plb-title').textContent = peerRole.title[lang] || peerRole.title.en;
        document.getElementById('plb-desc').textContent = peerRole.desc[lang] || peerRole.desc.en;
        document.getElementById('btn-peer-learn').textContent = peerRole.btnLabel[lang] || peerRole.btnLabel.en;
        // All types go to peer battle
        document.getElementById('btn-peer-learn').onclick = () => this.showPeerMatch(topic, normClass);
    },

    // ── STAGE 4: CHARACTER PICKER ──

    showCharacterPicker(classification, topic) {
        const lang = Storage.getLang();
        const cls = parseInt(Storage.getClass()) || 5;
        this.show('character');
        const chars = getCharactersForClass(cls);
        const grid = document.getElementById('char-grid');
        grid.innerHTML = '';
        let selected = null;
        // Pre-select stored character if any
        const storedId = Storage.getCharacter();
        if (storedId) {
            const found = chars.find(c => c.id === storedId);
            if (found) { selected = found; this.selectedCharacter = found; }
        }
        chars.forEach(ch => {
            const card = document.createElement('div');
            card.className = 'char-card' + (selected?.id === ch.id ? ' selected' : '');
            card.style.color = ch.color;
            card.style.borderColor = selected?.id === ch.id ? ch.color : '';
            card.innerHTML = `<span class="char-emoji">${ch.emoji}</span><div class="char-name">${ch.name}</div><div class="char-tag">${ch.tagline[lang] || ch.tagline.en}</div>`;
            card.onclick = () => {
                selected = ch; this.selectedCharacter = ch;
                Storage.setCharacter(ch.id);
                grid.querySelectorAll('.char-card').forEach(c => { c.classList.remove('selected'); c.style.borderColor = ''; });
                card.classList.add('selected'); card.style.borderColor = ch.color;
                clearTimeout(this.charAutoTimer);
                document.getElementById('char-auto-timer').style.display = 'none';
            };
            grid.appendChild(card);
        });
        // Auto-assign timer
        let countdown = 5;
        const timerEl = document.getElementById('char-timer-text');
        document.getElementById('char-auto-timer').style.display = 'flex';
        this.charAutoTimer = setInterval(() => {
            countdown--;
            timerEl.textContent = `Auto-selecting in ${countdown}s…`;
            if (countdown <= 0) {
                clearInterval(this.charAutoTimer);
                if (!this.selectedCharacter) {
                    const auto = autoAssignCharacter(cls);
                    this.selectedCharacter = auto;
                    Storage.setCharacter(auto.id);
                    grid.querySelectorAll('.char-card').forEach(c => c.classList.remove('selected'));
                    const autoCard = [...grid.children].find(c => c.querySelector('.char-name')?.textContent === auto.name);
                    if (autoCard) { autoCard.classList.add('selected'); autoCard.style.borderColor = auto.color; }
                }
                document.getElementById('char-auto-timer').style.display = 'none';
                this.showStoryExplanation(classification, topic);
            }
        }, 1000);
        document.getElementById('btn-char-back').onclick = () => {
            clearInterval(this.charAutoTimer);
            this.showResult();
        };
        document.getElementById('btn-char-confirm').onclick = () => {
            clearInterval(this.charAutoTimer);
            if (!this.selectedCharacter) this.selectedCharacter = autoAssignCharacter(cls);
            this.showStoryExplanation(classification, topic);
        };
    },

    // ── STAGE 4: STORY EXPLANATION ──
    showStoryExplanation(classification, topic) {
        const lang = Storage.getLang();
        const char = this.selectedCharacter || autoAssignCharacter(parseInt(Storage.getClass()) || 5);
        const online = navigator.onLine;
        this.show('story');
        // Mode badge
        const badge = document.getElementById('story-mode-badge');
        if (online) { badge.textContent = '✨ Online'; badge.className = 'story-mode-badge online'; }
        else { badge.textContent = '📁 Offline'; badge.className = 'story-mode-badge offline'; }
        // Character banner
        const banner = document.getElementById('story-char-banner');
        banner.style.background = `linear-gradient(135deg, ${char.color}18, ${char.color}08)`;
        banner.style.borderColor = `${char.color}40`;
        const avatarEl = document.getElementById('story-char-avatar');
        avatarEl.textContent = char.emoji;
        avatarEl.style.background = `${char.color}22`;
        avatarEl.style.borderColor = `${char.color}60`;
        document.getElementById('story-char-name').textContent = char.name;
        document.getElementById('story-char-tagline').textContent = char.tagline[lang] || char.tagline.en;
        // Story text
        const story = StoryEngine.generate(char, topic.id, classification, lang, online);
        document.getElementById('story-text').textContent = story || 'Let me explain this in my own way...';
        // Step-by-step breakdown from REMEDIATION data
        const R = REMEDIATION[topic.id]?.[classification];
        const stepsEl = document.getElementById('story-steps');
        stepsEl.innerHTML = '';
        if (R) {
            const steps = R.correction[lang] || R.correction.en;
            steps.forEach((step, i) => {
                const div = document.createElement('div');
                div.className = 'story-step';
                div.style.animationDelay = (i * 0.12) + 's';
                div.innerHTML = `<div class="step-num">${i + 1}</div><div class="step-text">${step}</div>`;
                stepsEl.appendChild(div);
            });
            document.getElementById('story-analogy').textContent = R.analogy[lang] || R.analogy.en;
        }
        document.getElementById('story-header-title').textContent = topic.title[lang] || topic.title.en;
        document.getElementById('btn-story-back').onclick = () => this.showCharacterPicker(classification, topic);
        document.getElementById('btn-story-retry').onclick = () => this.startQuiz();
        document.getElementById('btn-story-home').onclick = () => { this.show('home'); this.renderHome(); };
    },

    // ── STAGE 5: PEER LEARNING ──
    showPeerLearning(topic) {
        const lang = Storage.getLang();
        this.show('peer');
        document.getElementById('btn-peer-back').onclick = () => this.showResult();
        const bullets = PeerLearning.getPromptCard(topic.id, lang);
        const questions = PeerLearning.getCheckQuestions(topic.id, lang);
        // Prompt card
        document.getElementById('peer-card-title').textContent = (topic.title[lang] || topic.title.en) + ' — Key Ideas';
        const ul = document.getElementById('peer-bullets'); ul.innerHTML = '';
        bullets.forEach((b, i) => {
            const li = document.createElement('li');
            li.innerHTML = `<span class="prompt-bullet-num">${i + 1}</span><span>${b}</span>`;
            ul.appendChild(li);
        });
        const checkQs = document.getElementById('peer-check-qs'); checkQs.innerHTML = '';
        questions.forEach(q => {
            const d = document.createElement('div'); d.className = 'check-q'; d.textContent = q;
            checkQs.appendChild(d);
        });
        // Mode tabs
        const physTab = document.getElementById('tab-physical');
        const remTab = document.getElementById('tab-remote');
        const physSec = document.getElementById('peer-physical-section');
        const remSec = document.getElementById('peer-remote-section');
        physTab.onclick = () => { physTab.classList.add('active'); remTab.classList.remove('active'); physSec.style.display = 'block'; remSec.style.display = 'none'; };
        remTab.onclick = () => { remTab.classList.add('active'); physTab.classList.remove('active'); remSec.style.display = 'block'; physSec.style.display = 'none'; };
        // Physical: peer understood
        document.getElementById('btn-peer-yes').onclick = () => {
            Storage.addTeachPoints(3);
            this.showToast('+3 Teaching Points! 🎉');
            setTimeout(() => { this.show('home'); this.renderHome(); }, 1800);
        };
        document.getElementById('btn-peer-no').onclick = () => { this.show('home'); this.renderHome(); };
        // Async voice
        const asyncBtn = document.getElementById('btn-async-record');
        const asyncTA = document.getElementById('async-transcript');
        const submitBtn = document.getElementById('btn-async-submit');
        const stars = document.getElementById('async-stars').querySelectorAll('.star-icon');
        const updateStars = (score) => { stars.forEach((s, i) => s.classList.toggle('lit', i < score)); };
        asyncTA.oninput = () => {
            const score = PeerLearning.scoreExplanation(asyncTA.value, topic.id);
            updateStars(score);
            submitBtn.disabled = asyncTA.value.trim().length < 10;
        };
        asyncBtn.onclick = () => {
            asyncBtn.innerHTML = '<span class="mic-icon">⏹</span> Recording…';
            asyncBtn.classList.add('listening');
            PeerLearning.startRecording((text) => {
                asyncBtn.innerHTML = '<span class="mic-icon">🎤</span> Tap to Record';
                asyncBtn.classList.remove('listening');
                if (text && text !== 'voice_unavailable') {
                    asyncTA.value = text;
                    const score = PeerLearning.scoreExplanation(text, topic.id);
                    updateStars(score);
                    submitBtn.disabled = false;
                }
            });
        };
        submitBtn.onclick = () => {
            const score = PeerLearning.scoreExplanation(asyncTA.value, topic.id);
            const pts = score;
            Storage.addTeachPoints(pts);
            this.showToast(`+${pts} Teaching Points! 🌟`);
            setTimeout(() => { this.show('home'); this.renderHome(); }, 1800);
        };
    },

    showToast(msg) {
        const t = document.createElement('div');
        t.className = 'points-toast';
        t.textContent = msg;
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 2500);
    },

    // ── FURTHER EXPLANATION ──
    showExplanation(classification, topic) {
        const lang = Storage.getLang();
        const R = REMEDIATION[topic.id]?.[classification];
        if (!R) { this.show('home'); this.renderHome(); return; }
        this.show('explain');
        document.getElementById('explain-header-title').textContent = topic.title[lang] || topic.title.en;
        document.getElementById('explain-badge').className = 'explain-badge ' + classification;
        document.getElementById('explain-badge').textContent = (UI[lang] || UI.en)[classification] || classification;
        document.getElementById('explain-title').textContent = R.title[lang] || R.title.en;
        document.getElementById('explain-what').textContent = R.what[lang] || R.what.en;
        // Animation
        document.getElementById('explain-anim-wrap').innerHTML = this.getAnimation(topic.id);
        // Correction points
        const points = R.correction[lang] || R.correction.en;
        const ul = document.getElementById('correction-list'); ul.innerHTML = '';
        points.forEach((pt, i) => {
            const li = document.createElement('li');
            li.textContent = pt; li.style.animationDelay = (i * 0.1) + 's';
            ul.appendChild(li);
        });
        document.getElementById('analogy-card').textContent = R.analogy[lang] || R.analogy.en;
        document.getElementById('btn-explain-back').onclick = () => this.showResult();
        document.getElementById('btn-explain-retry').onclick = () => this.startQuiz();
        document.getElementById('btn-explain-home').onclick = () => { this.show('home'); this.renderHome(); };
    },

    // ── PEER FIND MODAL (for non-understood learners) ──
    showPeerFindModal(classification, topic) {
        const lang = Storage.getLang();
        const peerRole = PEER_ROLES[classification] || PEER_ROLES.confused;
        // Populate modal
        document.getElementById('pfm-icon').textContent = peerRole.icon;
        document.getElementById('pfm-title').textContent = peerRole.title[lang] || peerRole.title.en;
        document.getElementById('pfm-desc').textContent = peerRole.desc[lang] || peerRole.desc.en;
        // Show topic prompt card bullets so they know what to ask the peer
        const bullets = PeerLearning.getPromptCard(topic.id, lang);
        const ul = document.getElementById('pfm-bullets');
        ul.innerHTML = '';
        bullets.forEach((b, i) => {
            const li = document.createElement('li');
            li.innerHTML = `<span class="pfm-bullet-num">${i + 1}</span><span>${b}</span>`;
            ul.appendChild(li);
        });
        // Show overlay
        const overlay = document.getElementById('peer-find-overlay');
        overlay.style.display = 'flex';
        const close = () => { overlay.style.display = 'none'; };
        document.getElementById('pfm-close').onclick = close;
        document.getElementById('btn-pfm-close').onclick = close;
        overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); }, { once: true });
    },

    // ── PEER BATTLE: MATCHMAKING ──
    showPeerMatch(topic, classification) {
        PeerBattle.reset();
        PeerBattle.topic = topic;
        PeerBattle.classification = classification;
        PeerBattle.peer = PeerBattle.getRandomPeer();
        PeerBattle.questions = PeerBattle.getBattleQuestions(topic);
        const name = Storage.getName();
        const lang = Storage.getLang();
        this.show('peer-match');
        document.getElementById('match-search-section').style.display = 'flex';
        document.getElementById('match-found-section').style.display = 'none';
        document.getElementById('match-topic').textContent = topic.title[lang] || topic.title.en;
        document.getElementById('match-player-letter').textContent = name[0].toUpperCase();
        document.getElementById('match-player-name').textContent = name;
        // Animate dots
        let d = 0;
        const searchEl = document.getElementById('match-search-text');
        const dotsInterval = setInterval(() => {
            d = (d + 1) % 4;
            searchEl.textContent = 'Searching for a peer across India' + '.'.repeat(d);
        }, 500);
        setTimeout(() => { clearInterval(dotsInterval); this.showPeerFound(); }, 3000 + Math.random() * 1500);
    },

    showPeerFound() {
        const peer = PeerBattle.peer;
        const name = Storage.getName();
        document.getElementById('match-search-section').style.display = 'none';
        document.getElementById('match-found-section').style.display = 'flex';
        document.getElementById('match-self-letter').textContent = name[0].toUpperCase();
        document.getElementById('match-self-name').textContent = name;
        document.getElementById('match-peer-avatar').textContent = peer.avatar;
        document.getElementById('match-peer-name').textContent = peer.name;
        document.getElementById('match-peer-city').textContent = '📍 ' + peer.city;
        let count = 3;
        const countEl = document.getElementById('match-countdown');
        countEl.textContent = count;
        const cd = setInterval(() => {
            count--;
            if (count > 0) { countEl.textContent = count; }
            else { clearInterval(cd); this.startPeerBattle(); }
        }, 1000);
    },

    // ── PEER BATTLE: QUIZ ──
    startPeerBattle() {
        PeerBattle.currentQ = 0;
        this.show('peer-battle');
        this.renderBattleQuestion();
    },

    renderBattleQuestion() {
        const lang = Storage.getLang();
        const q = PeerBattle.questions[PeerBattle.currentQ];
        const total = PeerBattle.questions.length;
        const peer = PeerBattle.peer;
        document.getElementById('battle-player-name').textContent = Storage.getName();
        document.getElementById('battle-peer-name').textContent = peer.name;
        document.getElementById('battle-player-score').textContent = PeerBattle.playerScore;
        document.getElementById('battle-peer-score').textContent = PeerBattle.peerScore;
        document.getElementById('battle-q-num').textContent = 'Q' + (PeerBattle.currentQ + 1) + ' of ' + total;
        document.getElementById('battle-q-text').textContent = q.q[lang] || q.q.en;
        const statusEl = document.getElementById('battle-peer-status');
        statusEl.textContent = peer.name + ' is thinking...';
        statusEl.className = 'battle-peer-status thinking';
        // Options
        const opts = q.options[lang] || q.options.en;
        const letters = ['A', 'B', 'C', 'D'];
        const grid = document.getElementById('battle-options'); grid.innerHTML = '';
        opts.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'battle-option-btn'; btn.id = 'battle-opt-' + i;
            btn.innerHTML = '<span class="battle-option-letter">' + letters[i] + '</span><span>' + opt + '</span>';
            btn.onclick = () => this.playerAnswerBattle(i);
            grid.appendChild(btn);
        });
        // Countdown timer
        let timeLeft = 30;
        document.getElementById('battle-timer').textContent = 30;
        document.getElementById('battle-timer-fill').style.width = '100%';
        clearInterval(PeerBattle.questionTimer);
        PeerBattle.questionTimer = setInterval(() => {
            timeLeft--;
            document.getElementById('battle-timer').textContent = timeLeft;
            document.getElementById('battle-timer-fill').style.width = (timeLeft / 30 * 100) + '%';
            if (timeLeft <= 0) { clearInterval(PeerBattle.questionTimer); this.playerAnswerBattle(-1); }
        }, 1000);
        // Simulate peer answering at a random realistic time
        clearTimeout(PeerBattle.peerAnswerTimer);
        const thinkMs = Math.min(4000 + Math.random() * 18000, 27000);
        PeerBattle.peerAnswers[PeerBattle.currentQ] = undefined;
        PeerBattle.peerAnswerTimer = setTimeout(() => {
            const pAns = PeerBattle.simulatePeerAnswer(PeerBattle.classification);
            PeerBattle.peerAnswers[PeerBattle.currentQ] = pAns;
            if (PeerBattle.isCorrect(pAns)) {
                PeerBattle.peerScore++;
                document.getElementById('battle-peer-score').textContent = PeerBattle.peerScore;
            }
            statusEl.textContent = peer.name + (PeerBattle.isCorrect(pAns) ? ' answered ✓' : ' answered ✗');
            statusEl.className = 'battle-peer-status ' + (PeerBattle.isCorrect(pAns) ? 'correct' : 'wrong');
        }, thinkMs);
    },

    playerAnswerBattle(optionIdx) {
        clearInterval(PeerBattle.questionTimer);
        clearTimeout(PeerBattle.peerAnswerTimer);
        document.querySelectorAll('.battle-option-btn').forEach(b => b.disabled = true);
        if (optionIdx >= 0) document.getElementById('battle-opt-' + optionIdx)?.classList.add('selected');
        // Score player
        const playerCorrect = optionIdx >= 0 && PeerBattle.isCorrect(optionIdx);
        if (playerCorrect) PeerBattle.playerScore++;
        document.getElementById('battle-player-score').textContent = PeerBattle.playerScore;
        // Reveal correct answer
        document.getElementById('battle-opt-0')?.classList.add('correct-ans');
        if (optionIdx > 0) document.getElementById('battle-opt-' + optionIdx)?.classList.add('wrong-ans');
        // Resolve peer answer if not yet done
        setTimeout(() => {
            const statusEl = document.getElementById('battle-peer-status');
            if (PeerBattle.peerAnswers[PeerBattle.currentQ] === undefined) {
                const pAns = PeerBattle.simulatePeerAnswer(PeerBattle.classification);
                PeerBattle.peerAnswers[PeerBattle.currentQ] = pAns;
                if (PeerBattle.isCorrect(pAns)) {
                    PeerBattle.peerScore++;
                    document.getElementById('battle-peer-score').textContent = PeerBattle.peerScore;
                }
                statusEl.textContent = PeerBattle.peer.name + (PeerBattle.isCorrect(pAns) ? ' answered ✓' : ' answered ✗');
                statusEl.className = 'battle-peer-status ' + (PeerBattle.isCorrect(pAns) ? 'correct' : 'wrong');
            }
            PeerBattle.currentQ++;
            if (PeerBattle.currentQ < PeerBattle.questions.length) {
                setTimeout(() => this.renderBattleQuestion(), 800);
            } else {
                setTimeout(() => this.showBattleResult(), 1000);
            }
        }, 1800);
    },

    // ── PEER BATTLE: RESULT ──
    showBattleResult() {
        const ps = PeerBattle.playerScore, peerS = PeerBattle.peerScore;
        const peer = PeerBattle.peer;
        const result = ps > peerS ? 'win' : ps === peerS ? 'draw' : 'lose';
        const pts = result === 'win' ? PeerBattle.POINTS_WIN : result === 'draw' ? PeerBattle.POINTS_DRAW : PeerBattle.POINTS_LOSE;
        Storage.addQuizPoints(pts);
        const badge = PeerBattle.getBadge(result);
        this.show('peer-result');
        const msgs = { win: '🏆 You Beat ' + peer.name + '!', draw: '🤝 Draw with ' + peer.name + '!', lose: '💪 ' + peer.name + ' Wins This Round!' };
        const banner = document.getElementById('battle-result-banner');
        banner.textContent = msgs[result]; banner.className = 'battle-result-banner ' + result;
        document.getElementById('battle-res-player-name').textContent = Storage.getName();
        document.getElementById('battle-res-player-score').textContent = ps;
        document.getElementById('battle-res-peer-name').textContent = peer.name;
        document.getElementById('battle-res-peer-score').textContent = peerS;
        document.getElementById('battle-res-peer-city').textContent = '📍 ' + peer.city;
        const badgeIcon = document.getElementById('battle-badge-icon');
        badgeIcon.textContent = badge.icon; badgeIcon.style.color = badge.color;
        document.getElementById('battle-badge-label').textContent = badge.label;
        document.getElementById('battle-pts-earned').textContent = '+' + pts;
        document.getElementById('btn-battle-home').onclick = () => { this.show('home'); this.renderHome(); };
        document.getElementById('btn-battle-rematch').onclick = () => this.showPeerMatch(PeerBattle.topic, PeerBattle.classification);
        this.showToast(badge.icon + ' ' + badge.label + '! +' + pts + ' pts');
    }
};

document.addEventListener('DOMContentLoaded', () => App.initLanding());