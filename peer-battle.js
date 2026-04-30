/* ── PEER BATTLE ENGINE — Simulated Real-Time Multiplayer ── */

const INDIAN_PEERS = [
    { name: 'Priya', city: 'Mumbai', avatar: '👧' },
    { name: 'Arjun', city: 'Delhi', avatar: '👦' },
    { name: 'Meera', city: 'Chennai', avatar: '👧' },
    { name: 'Ravi', city: 'Hyderabad', avatar: '👦' },
    { name: 'Aisha', city: 'Pune', avatar: '👧' },
    { name: 'Kiran', city: 'Bengaluru', avatar: '👦' },
    { name: 'Divya', city: 'Jaipur', avatar: '👧' },
    { name: 'Sahil', city: 'Ahmedabad', avatar: '👦' },
    { name: 'Ananya', city: 'Kolkata', avatar: '👧' },
    { name: 'Rohan', city: 'Lucknow', avatar: '👦' },
    { name: 'Nandini', city: 'Bhopal', avatar: '👧' },
    { name: 'Vivek', city: 'Nagpur', avatar: '👦' },
    { name: 'Shreya', city: 'Surat', avatar: '👧' },
    { name: 'Aditya', city: 'Patna', avatar: '👦' },
    { name: 'Kavya', city: 'Indore', avatar: '👧' },
    { name: 'Siddharth', city: 'Chandigarh', avatar: '👦' },
    { name: 'Pooja', city: 'Kochi', avatar: '👧' },
    { name: 'Nikhil', city: 'Vadodara', avatar: '👦' },
];

const PeerBattle = {
    peer: null, topic: null, classification: null,
    questions: [], currentQ: 0,
    playerScore: 0, peerScore: 0,
    peerAnswers: [],
    questionTimer: null, peerAnswerTimer: null,
    POINTS_WIN: 10, POINTS_DRAW: 3, POINTS_LOSE: 1,

    getRandomPeer() {
        return INDIAN_PEERS[Math.floor(Math.random() * INDIAN_PEERS.length)];
    },

    getBattleQuestions(topic) {
        const qs = topic.quiz || [];
        return [...qs].sort(() => Math.random() - 0.5).slice(0, Math.min(3, qs.length));
    },

    // Peer is slightly stronger than a struggling learner — keeps it competitive
    getPeerCorrectProb(classification) {
        return { understood: 0.55, confused: 0.65, misconception: 0.68, rote: 0.60 }[classification] || 0.60;
    },

    simulatePeerAnswer(classification) {
        const correct = Math.random() < this.getPeerCorrectProb(classification);
        return correct ? 0 : (1 + Math.floor(Math.random() * 3));
    },

    isCorrect(optionIdx) { return optionIdx === 0; },

    getBadge(result) {
        return {
            win: { icon: '🏆', label: 'Battle Winner', color: '#f59e0b' },
            draw: { icon: '🤝', label: 'Battle Draw', color: '#6366f1' },
            lose: { icon: '💪', label: 'Battle Fighter', color: '#64748b' },
        }[result];
    },

    reset() {
        clearInterval(this.questionTimer);
        clearTimeout(this.peerAnswerTimer);
        this.currentQ = 0; this.playerScore = 0; this.peerScore = 0;
        this.peerAnswers = [];
    }
};