/* ── MOCK CLASS DATA — Teacher Dashboard ── */
const MOCK_CLASS = {
    teacher: { name: 'Sunaina Ma\'am', school: 'Govt Primary School, Dharwad', classSection: 'Class 5-B' },
    students: [
        { id: 's01', name: 'Aarav Sharma', class: 5, results: { photosynthesis: 'misconception', water_cycle: 'confused', fractions: 'understood' } },
        { id: 's02', name: 'Priya Nair', class: 5, results: { photosynthesis: 'understood', water_cycle: 'understood', fractions: 'rote' } },
        { id: 's03', name: 'Ravi Kumar', class: 5, results: { photosynthesis: 'misconception', water_cycle: 'misconception', fractions: 'confused' } },
        { id: 's04', name: 'Sneha Patil', class: 5, results: { photosynthesis: 'rote', water_cycle: 'rote', fractions: 'understood' } },
        { id: 's05', name: 'Arjun Reddy', class: 5, results: { photosynthesis: 'confused', water_cycle: 'confused', fractions: 'misconception' } },
        { id: 's06', name: 'Meena Devi', class: 5, results: { photosynthesis: 'misconception', water_cycle: null, fractions: null } },
        { id: 's07', name: 'Kiran Rao', class: 5, results: { photosynthesis: 'understood', water_cycle: 'confused', fractions: 'rote' } },
        { id: 's08', name: 'Tanvi Joshi', class: 5, results: { photosynthesis: 'rote', water_cycle: 'understood', fractions: 'understood' } },
        { id: 's09', name: 'Dhruv Mehta', class: 5, results: { photosynthesis: 'misconception', water_cycle: 'rote', fractions: 'confused' } },
        { id: 's10', name: 'Anjali Singh', class: 5, results: { photosynthesis: null, water_cycle: null, fractions: 'misconception' } },
        { id: 's11', name: 'Rohit Verma', class: 5, results: { photosynthesis: 'confused', water_cycle: 'misconception', fractions: null } },
        { id: 's12', name: 'Pooja Iyer', class: 5, results: { photosynthesis: 'understood', water_cycle: 'understood', fractions: 'understood' } },
        { id: 's13', name: 'Vikram Das', class: 5, results: { photosynthesis: 'misconception', water_cycle: 'confused', fractions: 'rote' } },
        { id: 's14', name: 'Nisha Gupta', class: 5, results: { photosynthesis: 'rote', water_cycle: 'rote', fractions: 'confused' } },
        { id: 's15', name: 'Suresh Babu', class: 5, results: { photosynthesis: 'confused', water_cycle: null, fractions: 'understood' } },
        { id: 's16', name: 'Lakshmi Pillai', class: 5, results: { photosynthesis: 'misconception', water_cycle: 'misconception', fractions: 'misconception' } },
        { id: 's17', name: 'Harsh Agarwal', class: 5, results: { photosynthesis: null, water_cycle: 'understood', fractions: 'confused' } },
        { id: 's18', name: 'Deepa Nambiar', class: 5, results: { photosynthesis: 'understood', water_cycle: 'rote', fractions: 'understood' } },
        { id: 's19', name: 'Sachin Tiwari', class: 5, results: { photosynthesis: 'confused', water_cycle: 'confused', fractions: null } },
        { id: 's20', name: 'Rekha Shetty', class: 5, results: { photosynthesis: 'rote', water_cycle: 'understood', fractions: 'rote' } },
        { id: 's21', name: 'Nikhil Bose', class: 5, results: { photosynthesis: 'misconception', water_cycle: null, fractions: 'confused' } },
        { id: 's22', name: 'Geeta Mishra', class: 5, results: { photosynthesis: 'understood', water_cycle: 'understood', fractions: 'understood' } },
        { id: 's23', name: 'Manoj Yadav', class: 5, results: { photosynthesis: null, water_cycle: 'misconception', fractions: 'rote' } },
        { id: 's24', name: 'Priyanka Choudhary', class: 5, results: { photosynthesis: 'confused', water_cycle: 'rote', fractions: 'understood' } },
        { id: 's25', name: 'Aditya Patel', class: 5, results: { photosynthesis: 'rote', water_cycle: 'understood', fractions: 'misconception' } }
    ],
    peerSessions: [
        { teacher: 's02', learner: 's03', concept: 'photosynthesis', outcome: true, date: '2026-04-28' },
        { teacher: 's08', learner: 's06', concept: 'water_cycle', outcome: true, date: '2026-04-28' },
        { teacher: 's12', learner: 's16', concept: 'fractions', outcome: false, date: '2026-04-27' },
        { teacher: 's18', learner: 's11', concept: 'photosynthesis', outcome: true, date: '2026-04-27' },
        { teacher: 's22', learner: 's05', concept: 'fractions', outcome: true, date: '2026-04-26' }
    ]
};

// Urgency score: misconception=3, confused=2, rote=1, understood=0, null=0
function getUrgencyScore(student) {
    const weights = { misconception: 3, confused: 2, rote: 1, understood: 0 };
    return Object.values(student.results).reduce((sum, v) => sum + (weights[v] || 0), 0);
}

function getTriageStudents(n = 5) {
    return [...MOCK_CLASS.students]
        .filter(s => Object.values(s.results).some(v => v === 'misconception' || v === 'confused'))
        .sort((a, b) => getUrgencyScore(b) - getUrgencyScore(a))
        .slice(0, n);
}

function getMisconceptionFingerprints() {
    const concepts = ['photosynthesis', 'water_cycle', 'fractions'];
    const labels = { photosynthesis: 'Photosynthesis', water_cycle: 'Water Cycle', fractions: 'Fractions' };
    const actions = {
        photosynthesis: 'Recommended: Do the sunlight-and-dark-jar experiment in class.',
        water_cycle: 'Recommended: Demo boiling water + cold plate condensation.',
        fractions: 'Recommended: Cut rotis/chapatis into equal pieces — hands-on comparison.'
    };
    const misconceptions = {
        photosynthesis: 'plants get energy from soil',
        water_cycle: 'clouds are bags of water / wind lifts water',
        fractions: 'bigger denominator = bigger fraction'
    };
    return concepts.map(c => {
        const count = MOCK_CLASS.students.filter(s => s.results[c] === 'misconception').length;
        return { concept: c, label: labels[c], count, total: MOCK_CLASS.students.length, belief: misconceptions[c], action: actions[c] };
    }).filter(f => f.count >= 2).sort((a, b) => b.count - a.count);
}

function getConceptHealthMap() {
    return {
        concepts: ['photosynthesis', 'water_cycle', 'fractions'],
        conceptLabels: { photosynthesis: '🌿 Photosynthesis', water_cycle: '💧 Water Cycle', fractions: '🍕 Fractions' },
        students: MOCK_CLASS.students
    };
}

function getWeeklySummary() {
    const results = MOCK_CLASS.students.flatMap(s => Object.values(s.results).filter(Boolean));
    const counts = results.reduce((acc, v) => { acc[v] = (acc[v] || 0) + 1; return acc; }, {});
    const totalAttempted = MOCK_CLASS.students.filter(s => Object.values(s.results).some(Boolean)).length;
    const understood = MOCK_CLASS.students.filter(s => Object.values(s.results).some(v => v === 'understood')).length;
    const needsHelp = MOCK_CLASS.students.filter(s => Object.values(s.results).some(v => v === 'misconception')).length;
    return { totalAttempted, understood, needsHelp, counts, peerSessions: MOCK_CLASS.peerSessions.length };
}