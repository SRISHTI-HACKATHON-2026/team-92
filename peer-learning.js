/* ── PEER LEARNING ENGINE — Stage 5 ── */

const PEER_PROMPTS = {
    photosynthesis: {
        card: {
            en: ['Sunlight is the energy source — not soil or water.', 'Chlorophyll in leaves captures sunlight to make glucose.', 'Plants release oxygen as a by-product of making food.'],
            hi: ['सूर्यप्रकाश ऊर्जा का स्रोत है — मिट्टी या पानी नहीं।', 'पत्तियों में क्लोरोफिल सूरज की रोशनी से ग्लूकोज बनाता है।', 'पौधे खाना बनाते समय ऑक्सीजन छोड़ते हैं।']
        },
        checkQuestions: {
            en: ['What does sunlight do for the plant?', 'What does the leaf make using sunlight, water and CO₂?'],
            hi: ['सूरज की रोशनी पौधे के लिए क्या करती है?', 'पत्ती सूरज, पानी और CO₂ से क्या बनाती है?']
        }
    },
    water_cycle: {
        card: {
            en: ['Heat from the sun causes water to evaporate (turn to vapour).', 'Water vapour rises, cools, and condenses into clouds.', 'When clouds get heavy, water falls as rain — and the cycle repeats.'],
            hi: ['सूरज की गर्मी से पानी वाष्पित होता है।', 'वाष्प ऊपर जाकर ठंडा होता है और बादल बनाता है।', 'बादल भारी होने पर बारिश होती है — चक्र फिर शुरू होता है।']
        },
        checkQuestions: {
            en: ['What causes water to evaporate?', 'What are clouds actually made of?'],
            hi: ['पानी वाष्पित होने का क्या कारण है?', 'बादल वास्तव में किससे बने होते हैं?']
        }
    },
    fractions: {
        card: {
            en: ['The denominator (bottom) tells you how many equal parts the whole is cut into.', 'The numerator (top) tells you how many of those parts you have.', 'Bigger denominator = smaller each piece (more cuts = smaller slices).'],
            hi: ['हर (नीचे) बताता है कि पूरे को कितने बराबर भागों में बाँटा।', 'अंश (ऊपर) बताता है कि आपके पास कितने हैं।', 'बड़ा हर = छोटा टुकड़ा (ज्यादा कटाई = छोटे टुकड़े)।']
        },
        checkQuestions: {
            en: ['Which is bigger: 1/4 or 1/8? Why?', 'In 3/5, what does the 5 tell you?'],
            hi: ['कौन बड़ा है: 1/4 या 1/8? क्यों?', '3/5 में 5 क्या बताता है?']
        }
    }
};

/* ── PEER ROLES — per classification descriptions for the result banner ── */
const PEER_ROLES = {
    understood: {
        icon: '🌟',
        title: { en: 'Help a Peer!', hi: 'दोस्त की मदद करो!' },
        desc: {
            en: 'You understood this neatly! Help a peer in your classroom understand it too — teach them and earn Teaching Points!',
            hi: 'आपने इसे अच्छी तरह समझा! कक्षा में किसी दोस्त को भी समझाएं — सिखाएं और Teaching Points कमाएं!'
        },
        btnLabel: { en: 'Teach a Peer →', hi: 'दोस्त को सिखाओ →' }
    },
    confused: {
        icon: '🤔',
        title: { en: 'Learn from a Peer!', hi: 'दोस्त से सीखो!' },
        desc: {
            en: "You're a step away from clarity! Pair up with a classmate who understood well — let them explain it to you in their own words.",
            hi: 'आप स्पष्टता के करीब हैं! किसी ऐसे सहपाठी से मिलें जिसने इसे अच्छे से समझा — उन्हें अपने शब्दों में समझाने को कहें।'
        },
        btnLabel: { en: 'Find a Peer →', hi: 'दोस्त खोजो →' }
    },
    misconception: {
        icon: '🔄',
        title: { en: 'Correct with a Peer!', hi: 'दोस्त के साथ सुधारो!' },
        desc: {
            en: 'Your idea needs a small fix. Ask a peer who scored True Understanding to walk through this concept with you step by step.',
            hi: 'आपके विचार में थोड़ा सुधार चाहिए। किसी ऐसे दोस्त से पूछें जिसने True Understanding पाया — वे इसे आपको कदम दर कदम समझाएंगे।'
        },
        btnLabel: { en: 'Ask a Peer →', hi: 'दोस्त से पूछो →' }
    },
    rote: {
        icon: '📚',
        title: { en: 'Understand with a Peer!', hi: 'दोस्त के साथ समझो!' },
        desc: {
            en: "You remember it, but do you know why it works? Find a peer who understood this deeply — learning together will make it click!",
            hi: 'आपको याद है, लेकिन क्या आप जानते हैं यह क्यों काम करता है? किसी ऐसे दोस्त को खोजें जिसने इसे गहराई से समझा — साथ सीखना समझ को पक्का करेगा!'
        },
        btnLabel: { en: 'Learn Together →', hi: 'साथ सीखो →' }
    }
};

const PeerLearning = {
    recognition: null,
    voiceBlob: null,

    getPromptCard(topicId, lang) {
        return PEER_PROMPTS[topicId]?.card[lang] || PEER_PROMPTS[topicId]?.card.en || [];
    },

    getCheckQuestions(topicId, lang) {
        return PEER_PROMPTS[topicId]?.checkQuestions[lang] || PEER_PROMPTS[topicId]?.checkQuestions.en || [];
    },

    // Simple comprehension scoring from peer answer text
    scoreExplanation(text, topicId) {
        if (!text || text.trim().length < 10) return 0;
        const t = text.toLowerCase();
        const keyTerms = {
            photosynthesis: ['sunlight', 'chlorophyll', 'glucose', 'leaves', 'oxygen', 'sun', 'energy'],
            water_cycle: ['evaporation', 'condensation', 'cloud', 'rain', 'sun', 'vapour', 'cycle'],
            fractions: ['denominator', 'numerator', 'equal', 'parts', 'whole', 'smaller', 'bigger']
        };
        const terms = keyTerms[topicId] || [];
        let hits = 0;
        terms.forEach(term => { if (t.includes(term)) hits++; });
        return Math.min(3, hits); // 0–3 star score
    },

    // Start recording async voice challenge
    startRecording(onResult) {
        if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
            onResult('voice_unavailable');
            return;
        }
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SR();
        this.recognition.lang = LANGUAGES[Storage.getLang()]?.code || 'en-IN';
        this.recognition.interimResults = false;
        this.recognition.onresult = (e) => {
            let t = '';
            for (let r of e.results) t += r[0].transcript;
            onResult(t);
        };
        this.recognition.onerror = () => onResult('');
        this.recognition.start();
    },

    stopRecording() {
        if (this.recognition) { this.recognition.stop(); this.recognition = null; }
    }
};