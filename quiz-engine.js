const QuizEngine = {
    ROTE_KW: ['teacher told', 'book says', 'i remember', 'i read', 'we learned', 'i memorized',
        'teacher ne bataya', 'kitab mein', 'yaad hai', 'padha tha', 'रटा', 'याद है', 'किताब में',
        'pustakam lo', 'teacher chepparu', 'nenapu', 'kitabiyo', 'শেখানো হয়েছিল', 'लक्षात आहे'],
    ANALOGY_KW: ['i thought', 'it seemed', 'similar to', 'like how', 'mujhe laga', 'aisa laga',
        'nenu anukunnanu', 'nenu anipinchindi', 'मला वाटले', 'আমার মনে হয়েছিল', 'ennakku thonuthu'],
    MISCONCEPTION_KW: ['plants eat', 'soil gives energy', 'plants drink food', 'chlorophyll is food',
        'water gives energy', 'पौधे खाते', 'मिट्टी से ऊर्जा', 'chedalu tinunu', 'gaali nundi',
        'উদ্ভিদ খায়', 'झाडे खातात'],
    UNDERSTAND_KW: ['sunlight gives', 'leaves make', 'photosynthesis', 'chlorophyll captures',
        'energy from sun', 'because the leaf', 'because sunlight', 'सूर्यप्रकाश देता', 'पत्तियां बनाती',
        'aaకులు తయారు', 'இலைகள் செய்கின்றன', 'পাতা তৈরি করে', 'पाने तयार करतात'],

    analyzeVoice(transcript) {
        if (!transcript || transcript.trim().length < 3) return null;
        const t = transcript.toLowerCase();
        let scores = { rote: 0, confused: 0, misconception: 0, understood: 0 };
        this.ROTE_KW.forEach(kw => { if (t.includes(kw)) scores.rote += 2; });
        this.ANALOGY_KW.forEach(kw => { if (t.includes(kw)) scores.confused += 1; });
        this.MISCONCEPTION_KW.forEach(kw => { if (t.includes(kw)) scores.misconception += 2; });
        this.UNDERSTAND_KW.forEach(kw => { if (t.includes(kw)) scores.understood += 2; });
        const top = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
        return top[1] > 0 ? top[0] : null;
    },

    // MCQ option index → pattern: 0=understood, 1=confused, 2=misconception, 3=rote
    MCQ_PATTERNS: ['understood', 'confused', 'misconception', 'rote'],

    classify(mcqIdx, voicePattern) {
        const mcqP = this.MCQ_PATTERNS[mcqIdx];
        if (!voicePattern) return mcqP;
        // Voice overrides if it clearly contradicts MCQ
        if (voicePattern === 'understood' && mcqP !== 'understood') return 'understood_expression_gap';
        if (voicePattern === 'misconception') return 'misconception';
        if (voicePattern === 'rote' && mcqP === 'understood') return 'rote';
        return mcqP;
    },

    // Aggregate across all questions for a session
    aggregateSession(answers) {
        // answers: [{mcqIdx, voicePattern}]
        const counts = { understood: 0, confused: 0, misconception: 0, rote: 0, understood_expression_gap: 0 };
        answers.forEach(a => {
            const c = this.classify(a.mcqIdx, a.voicePattern);
            if (counts[c] !== undefined) counts[c]++;
            else counts['confused']++;
        });
        // Final classification: majority wins, with priority order
        const total = answers.length;
        if (counts.misconception / total >= 0.4) return 'misconception';
        if (counts.rote / total >= 0.4) return 'rote';
        if ((counts.understood + counts.understood_expression_gap) / total >= 0.5) return 'understood';
        return 'confused';
    }
};