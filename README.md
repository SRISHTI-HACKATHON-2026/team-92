# 🌿 VidyaBodh — Comprehension-First Learning for Every Indian Student

> *"Comprehension-first learning for every student."*

**VidyaBodh** is an offline-capable, multilingual, AI-powered educational platform designed for Indian students in Classes 3–7. It moves beyond rote memorization by diagnosing *how* a student understands a concept — and then providing personalized, targeted remediation through story-based explanations, peer learning, and collaborative quizzes.

---

## 🚀 Live Demo

> Open [Click here to open VidyaBodh](https://srishti-hackathon-2026.github.io/team-92/) in any modern browser — no installation or server required.

---

## 🧩 Problem Statement

India's school system struggles with a hidden crisis: students can recall answers but cannot explain *why*. Standard tests reward memorization, not comprehension. Teachers lack per-student diagnostic data to intervene early. Students in low-connectivity regions have no access to quality, language-appropriate learning content.

**VidyaBodh** addresses all three gaps — for free, offline, in 7 languages.

---

## ✨ Key Features

### 🏫 Dual Role System
| Role | Capabilities |
|------|-------------|
| **Student** | Learn topics, take quizzes, get personalized explanations, earn points |
| **Teacher** | View class-wide comprehension health, per-student diagnostics, triage alerts |

### 🔐 Secure PIN-Based Login
- Both students and teachers can set optional 4-digit PINs
- Persistent profiles stored in `localStorage` — no server required
- "Switch Account" option for shared-device classrooms

### 🌐 7-Language Support
Full UI and curriculum content in:
`English` · `हिन्दी` · `தமிழ்` · `తెలుగు` · `ಕನ್ನಡ` · `বাংলা` · `मराठी`

### 📺 Adaptive Video Learning (Stage 1–3)
- **3-Layer Lesson Structure** per topic:
  - 🎬 **Layer 1 — Concept**: Core explanation
  - 🤔 **Layer 2 — Common Confusion**: Addresses typical misconceptions
  - 📖 **Layer 3 — Story Analogy**: Relatable local-context narrative
- **Online mode**: AI-generated animated video with TTS narration
- **Offline mode**: Pre-rendered CSS animations with captions

### 🧠 Comprehension Quiz with Voice Reasoning (Stage 2)
- 5 MCQ questions per topic, translated into all supported languages
- Students must **explain their answer verbally or in text** before proceeding
- Mandatory voice/text reasoning trace captures *why* the student chose an answer

### 🎯 AI Classification Engine (Stage 3)
Each quiz session is classified into one of four learner profiles:
| Classification | Meaning |
|---|---|
| 🌟 **True Understanding** | Correct answers + correct reasoning |
| 📚 **Rote Learning** | Correct answers, but reasoning is memorized, not conceptual |
| 🤔 **Concept Confusion** | Incomplete understanding of a key mechanism |
| 🔄 **Misconception** | Actively wrong mental model that needs correction |

### 🎭 Personalized Story Explanations (Stage 4)
- Students pick a **favourite character** (age-appropriate per class: 3–7)
- Characters include: Ullu the Owl 🦉, Mia the Detective 🔍, Robo the Robot 🤖, Dadi the Grandmother 👵, and more
- Auto-assign timer (5 seconds) ensures no student is blocked
- Distinct, evidence-based remediation strategies per classification:
  - **Misconception** → Correction-first narrative
  - **Concept Confusion** → Visual breakdown, step-by-step
  - **Rote Learning** → Mechanism-focused "why" explanation
  - **True Understanding** → Extension challenge

### 🤝 Peer Learning — Teach-Back Model (Stage 5)
- **In-Person Mode**: Prompt card with key ideas + comprehension check questions for physical peer teaching
- **Remote Async Mode**: Student records a 30-second voice explanation; rated for quality (1–3 stars)
- Teaching earns **Teaching Points** in the leaderboard
- **Peer Battle Quiz**: Real-time (simulated) 1v1 quiz battle against a peer — matchmaking with radar animation, countdown, and live scoring

### 📊 Student Dashboard
- Visual progress across all completed topics
- Classification badges earned
- Achievement system (auto-fires on milestones)
- Points breakdown: Quiz Points vs. Teaching Points

### 👩‍🏫 Teacher Dashboard
- **Class Health Overview**: distribution of classification types across students
- **Triage Alerts**: students requiring intervention (misconceptions, persistent confusion)
- **Weekly Insights**: topic-wise comprehension trends
- Mock data pre-loaded for demonstration purposes

---

## 🗂️ Project Structure

```
BeeSun/
├── index.html              # Main entry — all pages as hidden <div>s (SPA)
├── app.js                  # Core app controller (routing, quiz, video, peers)
├── data.js                 # Curriculum: topics, 3-layer video scripts, 5 MCQs each
├── lang.js                 # Multilingual UI strings + language config
├── remediation.js          # Per-topic, per-classification remediation content
├── quiz-engine.js          # Voice analysis + comprehension classification logic
├── characters.js           # Character roster, class-based selection, auto-assign
├── story-engine.js         # Generates personalized story text per character × classification
├── peer-learning.js        # Prompt cards, scoring, async voice recording
├── peer-battle.js          # Simulated peer matchmaking + 1v1 battle quiz
├── student-dashboard.js    # Student progress, achievements, analytics rendering
├── teacher-dashboard.js    # Class health, triage alerts, teacher analytics
├── storage.js              # All localStorage read/write helpers
├── mock-data.js            # Demo data for teacher dashboard
├── main.css                # Core design system, typography, theme variables
├── phase2.css              # Quiz, video, result page styles
├── stage4-5.css            # Character picker & story explanation styles
├── dashboard.css           # Student & teacher dashboard styles
└── peer-battle.css         # Matchmaking radar, battle quiz, result styles
```

---

## 🎓 Supported Curriculum

| Subject | Topic | Classes |
|---------|-------|---------|
| Science | Photosynthesis 🌿 | 3–7 |
| Science | Water Cycle 💧 | 3–7 |
| Mathematics | Fractions 🍕 | 3–7 |

> More topics can be added by extending `data.js` and `remediation.js` — no other files need modification.

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 (Semantic, Single-Page App) |
| Logic | Vanilla JavaScript (ES6+) |
| Styling | Vanilla CSS (CSS custom properties, animations) |
| Storage | Browser `localStorage` (zero backend) |
| Voice | Web Speech API (`SpeechRecognition` + `SpeechSynthesis`) |
| Offline | Pure static — works with no internet connection |
| Hosting | Any static host (GitHub Pages, Netlify, local file) |

**Zero dependencies. Zero frameworks. Zero build step.**

---

## ⚡ Getting Started

### Option 1 — Open Locally
```bash
# Clone the repository
git clone https://github.com/<your-username>/VidyaBodh.git

# Open in browser
open BeeSun/index.html
```

### Option 2 — GitHub Pages
1. Push to GitHub
2. Go to **Settings → Pages → Source: Deploy from branch → `main` / `/(root)`**
3. Your app will be live at `https://<username>.github.io/<repo-name>/`

---

## 🧪 How to Use

### As a Student
1. Select **"I'm a Student"** on the home screen
2. Choose your preferred **language**
3. Enter your **name**, **class** (3–7), and optional **4-digit PIN**
4. Pick a **topic** → Watch the animated lesson → Take the quiz
5. After the quiz, receive your **classification** and choose a **character guide**
6. Read your personalized **story explanation**
7. Complete a **peer teaching** session to earn bonus points

### As a Teacher
1. Select **"I'm a Teacher"** on the home screen
2. Enter your name, school, and optional PIN
3. Access your **dashboard** showing class comprehension health, alerts, and trends

---

## 📐 Comprehension Classification Logic

The `QuizEngine` analyzes each quiz submission using two signals:

| Signal | What it captures |
|--------|-----------------|
| **MCQ accuracy** | Whether the selected answer is correct |
| **Voice/text pattern** | Keywords in the student's reasoning (confidence, confusion, rote cues) |

These signals are combined across 5 questions to produce a **session-level classification**.

---

## 🏆 Gamification & Motivation

| Action | Points |
|--------|--------|
| True Understanding result | +5 Quiz Points |
| Rote Learning result | +3 Quiz Points |
| Confused / Misconception result | +2 Quiz Points |
| Peer successfully understood (physical) | +3 Teaching Points |
| Async voice explanation (quality-based) | +1 to +3 Teaching Points |
| Battle win | +10 Points |

Points are displayed on the home screen leaderboard strip. Achievements fire automatically on milestones.

---

## 💡 Design Principles

1. **Comprehension over completion** — every interaction demands reasoning, not just answers
2. **No internet dependency** — fully functional offline for rural/low-connectivity classrooms
3. **Language-first** — every string, question, and explanation exists in all 7 languages
4. **Shared device friendly** — PIN-based multi-profile on a single device
5. **Teacher empowerment** — data-driven insights without requiring teachers to grade anything

---

## 🗺️ Roadmap / Future Scope

- [ ] Backend sync (Firebase / Supabase) for cross-device progress
- [ ] More curriculum topics (e.g., Forces, Decimals, Living Things)
- [ ] Real-time multiplayer peer battles via WebSocket
- [ ] Detailed teacher reports (PDF export)
- [ ] Voice-first navigation for early readers (Grades 1–2)
- [ ] Parent-facing summary notifications (SMS / WhatsApp)

---

## 👥 Team

**Team 92 — SRISHTI Hackathon 2026**

| Name | Role |
|------|------|
| Sunaina S Biradar | Full-stack Development, UX Design, Curriculum Architecture |

---

## 📜 License

This project is submitted as part of **SRISHTI Hackathon 2026**. All rights reserved by the team.

---

## 🙏 Acknowledgements

- Inspired by the real challenges faced by government school teachers across India
- Remediation strategies grounded in cognitive science literature on misconceptions and formative assessment
- Character designs inspired by relatable figures from Indian folklore and everyday life

---

<p align="center">
  Built with ❤️ for every student who was told they were slow learners — you just needed the right explanation.
</p>
