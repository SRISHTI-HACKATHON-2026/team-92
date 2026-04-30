/* ── CHARACTERS.JS — Stage 4 Character Roster ── */

const CHARACTERS = {
    // ── CLASSES 3–5 ──────────────────────────────────────────────
    bheem: {
        id: 'bheem', name: 'Chhota Bheem', emoji: '💪',
        avatar: '🟤', color: '#f59e0b',
        classes: [3, 4, 5],
        tagline: { en: 'Strong and clever!', hi: 'मज़बूत और होशियार!' },
        intro: {
            en: "Bheem here! I've been on lots of adventures and I've learned a lot. Let me tell you what I know about this!",
            hi: "भीम यहाँ हूँ! मैंने बहुत सारे साहसिक कार्य किए हैं। आओ मैं तुम्हें यह समझाता हूँ!"
        }
    },
    doraemon: {
        id: 'doraemon', name: 'Doraemon', emoji: '🤖',
        avatar: '🔵', color: '#3b82f6',
        classes: [3, 4, 5],
        tagline: { en: 'A gadget for every problem!', hi: 'हर समस्या का गैजेट!' },
        intro: {
            en: "Doraemon here! I've got the perfect gadget from my pocket to explain this to you!",
            hi: "डोरेमोन यहाँ हूँ! मेरी जेब में सही गैजेट है जो इसे समझाएगा!"
        }
    },
    shiva: {
        id: 'shiva', name: 'Shiva', emoji: '🚲',
        avatar: '🔴', color: '#ef4444',
        classes: [3, 4, 5],
        tagline: { en: 'Super cycle power!', hi: 'सुपर साइकिल पावर!' },
        intro: {
            en: "Hey it's Shiva! Even superheroes need to understand science. Let me break this down for you!",
            hi: "हे, शिवा यहाँ है! सुपरहीरो को भी विज्ञान समझना होता है। चलो सीखते हैं!"
        }
    },
    motu: {
        id: 'motu', name: 'Motu Patlu', emoji: '🍱',
        avatar: '🟡', color: '#eab308',
        classes: [3, 4, 5],
        tagline: { en: 'Samosas and science!', hi: 'समोसे और विज्ञान!' },
        intro: {
            en: "Aye Motu here! Even I had to learn this before I got my samosas. Let me explain — it's simpler than you think!",
            hi: "अरे मोटू यहाँ! मुझे भी समोसे खाने से पहले यह सीखना पड़ा। आसान है, सुनो!"
        }
    },
    shinchan: {
        id: 'shinchan', name: 'Shin-chan', emoji: '😄',
        avatar: '🟠', color: '#f97316',
        classes: [3, 4, 5],
        tagline: { en: 'Action mask strikes again!', hi: 'एक्शन मास्क फिर आया!' },
        intro: {
            en: "Shin-chan in the house! My teacher says I never listen, but I actually understood THIS one. Here goes!",
            hi: "शिन-चान यहाँ! टीचर कहती हैं मैं सुनता नहीं, पर यह मैंने सीखा। सुनो!"
        }
    },
    owl: {
        id: 'owl', name: 'Ullu the Wise Owl', emoji: '🦉',
        avatar: '🟣', color: '#8b5cf6',
        classes: [3, 4, 5],
        tagline: { en: 'Wisdom from the forest!', hi: 'जंगल की बुद्धि!' },
        intro: {
            en: "Hoo-hoo! I am Ullu, the wise owl. I've watched the world from my tree for a long time. Let me share what I know.",
            hi: "हू-हू! मैं उल्लू हूँ, बुद्धिमान उल्लू। आओ मैं तुम्हें बताता हूँ।"
        }
    },
    village_girl: {
        id: 'village_girl', name: 'Meera', emoji: '🌺',
        avatar: '🟢', color: '#10b981',
        classes: [3, 4, 5],
        tagline: { en: 'Smart girl from the village!', hi: 'गाँव की होशियार लड़की!' },
        intro: {
            en: "Hi, I'm Meera! Growing up near fields taught me so much about nature. I'll explain this the way I understand it!",
            hi: "नमस्ते, मैं मीरा हूँ! खेतों के पास बड़े होने से मैंने बहुत सीखा। सुनो!"
        }
    },
    farmer: {
        id: 'farmer', name: 'Raju the Farmer', emoji: '🌾',
        avatar: '🟤', color: '#92400e',
        classes: [3, 4, 5],
        tagline: { en: 'From the fields, for you!', hi: 'खेत से, तुम्हारे लिए!' },
        intro: {
            en: "Kem cho! I'm Raju. I grow crops every season — and what I do is connected to exactly what you're learning!",
            hi: "केम छो! मैं राजू हूँ। मैं हर मौसम फसल उगाता हूँ — और यह तुम्हारे पाठ से जुड़ा है!"
        }
    },

    // ── CLASSES 6–7 ──────────────────────────────────────────────
    baalveer: {
        id: 'baalveer', name: 'Baalveer', emoji: '⚡',
        avatar: '🔵', color: '#6366f1',
        classes: [6, 7],
        tagline: { en: 'Powers of good!', hi: 'अच्छाई की शक्तियाँ!' },
        intro: {
            en: "Baalveer here! Even magical powers need understanding. Let me show you how this concept connects to the real world.",
            hi: "बालवीर यहाँ! जादुई शक्तियों को भी समझ चाहिए। चलो इस अवधारणा को समझते हैं।"
        }
    },
    rudra: {
        id: 'rudra', name: 'Rudra', emoji: '🌀',
        avatar: '🔴', color: '#dc2626',
        classes: [6, 7],
        tagline: { en: 'Science is my weapon!', hi: 'विज्ञान मेरा हथियार!' },
        intro: {
            en: "Rudra here! I solve problems using science and logic — and so can you. Let me walk you through this step by step.",
            hi: "रुद्र यहाँ! मैं विज्ञान और तर्क से समस्याएं सुलझाता हूँ। कदम दर कदम सीखते हैं।"
        }
    },
    smart_girl: {
        id: 'smart_girl', name: 'Priya the Smart Girl', emoji: '🎓',
        avatar: '🟢', color: '#059669',
        classes: [6, 7],
        tagline: { en: 'Think deeper, understand better!', hi: 'गहरा सोचो, बेहतर समझो!' },
        intro: {
            en: "Hi! I'm Priya. I used to find this confusing too — until I thought about it differently. Here's what clicked for me.",
            hi: "नमस्ते! मैं प्रिया हूँ। मुझे भी यह मुश्किल लगता था — जब तक मैंने इसे अलग तरह से नहीं सोचा।"
        }
    },
    scientist: {
        id: 'scientist', name: 'Aryan the Young Scientist', emoji: '🔬',
        avatar: '🟣', color: '#7c3aed',
        classes: [6, 7],
        tagline: { en: 'Question everything!', hi: 'हर चीज़ पर सवाल करो!' },
        intro: {
            en: "Hey, I'm Aryan! My lab notebook is full of questions — and this one is really interesting. Let me explain the science behind it.",
            hi: "हे, मैं आर्यन हूँ! मेरी लैब नोटबुक सवालों से भरी है — और यह बहुत दिलचस्प है।"
        }
    }
};

// Default per-class auto-assignment order
const DEFAULT_CHARS = {
    3: ['bheem', 'doraemon', 'shiva', 'motu', 'shinchan', 'owl', 'village_girl', 'farmer'],
    4: ['bheem', 'doraemon', 'shiva', 'motu', 'shinchan', 'owl', 'village_girl', 'farmer'],
    5: ['bheem', 'doraemon', 'shiva', 'motu', 'shinchan', 'owl', 'village_girl', 'farmer'],
    6: ['baalveer', 'rudra', 'smart_girl', 'scientist'],
    7: ['baalveer', 'rudra', 'smart_girl', 'scientist']
};

function getCharactersForClass(cls) {
    const ids = DEFAULT_CHARS[cls] || DEFAULT_CHARS[5];
    return ids.map(id => CHARACTERS[id]);
}

function autoAssignCharacter(cls) {
    const pool = DEFAULT_CHARS[cls] || DEFAULT_CHARS[5];
    return CHARACTERS[pool[Math.floor(Math.random() * pool.length)]];
}