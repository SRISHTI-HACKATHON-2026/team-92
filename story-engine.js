/* ── STORY ENGINE — Stage 4 Adaptive Storytelling ── */

const STORY_FRAGMENTS = {
    photosynthesis: {
        misconception: {
            settings: ['In Dholakpur', 'In a magical forest', 'Near a big farm', 'In a science fair'],
            problems: [
                'Everyone thought plants ate food from the soil like animals do.',
                'The villagers were confused — they poured food into the soil thinking plants would eat it.',
                'A young farmer kept adding food to the soil but the plant still looked weak.',
                'At the science fair, a student said "plants eat soil!" — and nobody corrected them.'
            ],
            resolutions: [
                'But then they looked closely at the leaf and realized — it was making its own food using sunlight!',
                'A wise teacher pointed to the sun and said: "The leaf is the kitchen. Sunlight is the fire."',
                'The plant showed them: water + sunlight + CO₂ → glucose. Soil? Only for minerals.',
                'The leaf glowed green and a little glucose drop appeared — proof it made its own energy from sunlight.'
            ]
        },
        confused: {
            settings: ['In a science lab', 'On a school trip to a garden', 'Under a big tree', 'In a greenhouse'],
            problems: [
                'Everyone agreed water was important — but they thought water was the energy source.',
                'The students knew plants needed water, but nobody knew what water actually did.',
                'A curious student asked: "If sunlight matters, what does water do then?"',
                'They had all the right pieces but put them in the wrong order.'
            ],
            resolutions: [
                'The teacher drew it clearly: Sunlight = energy. Water = ingredient. CO₂ = ingredient. Glucose = the food made.',
                'Think of a solar cooker: the sun is the power, water is just what you cook with.',
                'Water is carried up from roots — it is split to help make glucose, NOT to give energy.',
                'Once they saw the chain — sun powers → water + CO₂ combine → glucose out — it all clicked!'
            ]
        },
        rote: {
            settings: ['In a science competition', 'During a class quiz', 'At a nature camp', 'In a school garden'],
            problems: [
                'The student knew the formula but not WHY each part mattered.',
                'They recited "sunlight, water, CO₂" perfectly — but could not explain what each one does.',
                'When asked "what does chlorophyll actually do?" they went silent.',
                'They had memorized the answer but the meaning was missing.'
            ],
            resolutions: [
                'Chlorophyll is the chef — it catches sunlight and uses it to combine ingredients into glucose.',
                'Sunlight is not just "needed" — it is the ENERGY that drives the whole chemical reaction.',
                'Without chlorophyll, there is no photosynthesis. It is the engine of the whole process.',
                'Now they understood the WHY: sun powers → chlorophyll captures → glucose is made. Each step has a reason.'
            ]
        },
        understood: {
            settings: ['At a research station', 'In a debate competition', 'During a nature walk', 'At a science museum'],
            problems: [
                'The student knew photosynthesis well — but had never thought about what happens without sunlight for a week.',
                'They understood the basics — now the real question was: how does this connect to climate change?',
                'A challenge: if CO₂ in the air dropped by half, what would happen to plants?',
                'What if you put a plant in a glass box with no fresh air? How long before photosynthesis stops?'
            ],
            resolutions: [
                'In the dark, the plant uses stored glucose but makes none. After days, it starves.',
                'Less CO₂ means less raw material — plants grow slower, affecting the whole food chain.',
                'Sealed box: CO₂ gets used up, photosynthesis slows, oxygen drops — the system breaks down.',
                'This is exactly why deforestation is so dangerous — fewer leaves means less CO₂ absorbed worldwide.'
            ]
        }
    },
    water_cycle: {
        misconception: {
            settings: ['In a village near a river', 'On a rainy day', 'During a cloud-watching session', 'Near a lake'],
            problems: [
                'The children thought clouds were giant bags of water floating in the sky.',
                'Everyone believed wind was lifting the water up to make clouds.',
                'A student drew a cloud with a tap at the bottom — thinking it stored water like a tank.',
                'They thought rain happened because clouds "leaked" — like a bag with a hole.'
            ],
            resolutions: [
                'Clouds are millions of tiny droplets so light they float — not bags at all!',
                'It is the SUN\'s heat that lifts water as invisible vapour — not wind!',
                'When vapour rises and cools, it condenses into tiny droplets — that is a cloud forming.',
                'Rain falls when droplets join and grow heavy enough to fall — gravity pulls them down.'
            ]
        },
        confused: {
            settings: ['In a hill station', 'During a science project on weather', 'At a dam', 'In a monsoon'],
            problems: [
                'They knew evaporation happened but mixed up when condensation occurs.',
                'The sequence was jumbled — they put condensation before evaporation.',
                'A student asked: "If vapour is invisible, how does it become a visible cloud?"',
                'They understood rain but not what happens to the water after it hits the ground.'
            ],
            resolutions: [
                'The key: condensation only happens HIGH UP where it is COLD — not on the ground.',
                'Invisible vapour → rises → cools → tiny droplets form → they cluster → visible cloud!',
                'After rain: water flows into rivers, soaks into ground as groundwater, and evaporates again — the cycle repeats.',
                'The sequence: Evaporate → Rise → Cool → Condense → Precipitate → Collect → Repeat.'
            ]
        },
        rote: {
            settings: ['In a geography class', 'On a field trip to a waterfall', 'Near a canal', 'At a weather station'],
            problems: [
                'They listed all four stages correctly — but could not explain WHY it is a cycle.',
                'They knew the names but thought water was "used up" after rain.',
                'The student said "evaporation, condensation, precipitation" — but not what drives each step.',
                'They treated the water cycle like a one-time event, not a continuous loop.'
            ],
            resolutions: [
                'Water is NEVER created or destroyed — only its form changes. The same water repeats the journey forever.',
                'Two forces run the cycle: solar energy (evaporation) and gravity (rain falling down).',
                'The water in your glass may have once been a dinosaur\'s tear — it has been cycling for billions of years!',
                'It is a cycle because the end (collection) feeds the beginning (evaporation) — round and round forever.'
            ]
        },
        understood: {
            settings: ['At an environment summit', 'Studying climate change', 'Near a drying river', 'In a drought-hit village'],
            problems: [
                'They understood the water cycle — but what happens when humans take too much groundwater?',
                'If forests are cut, how does that affect how much rain a region gets?',
                'Why do some areas flood while others have drought — even in the same country?',
                'What is acid rain and how does the water cycle carry pollution across borders?'
            ],
            resolutions: [
                'Groundwater refills slowly — if we extract faster than rain replaces it, it runs out.',
                'Trees return water to the air through transpiration — fewer trees means less rainfall.',
                'Disrupted cycles cause uneven rainfall — flooded coasts, dry inland areas.',
                'Pollutants dissolve in water vapour, travel in clouds, and fall as acid rain far from the source.'
            ]
        }
    },
    fractions: {
        misconception: {
            settings: ['At a laddoo shop', 'During a school lunch', 'Sharing a mango', 'At a birthday party'],
            problems: [
                'Bheem thought 1/8 of a laddoo was bigger than 1/4 because 8 is bigger than 4.',
                'The children argued: more pieces means more food — so 1/8 must be bigger!',
                'At lunch, everyone wanted the "bigger fraction" — and chose 1/8 over 1/4 by mistake.',
                'The shop owner cut the mithai into 10 pieces and the kids thought each piece was bigger than 1/4.'
            ],
            resolutions: [
                'More cuts = smaller each piece. 8 pieces from the same whole means each is tiny!',
                '1/4 means cut into 4 — each piece is BIG. 1/8 means cut into 8 — each piece is SMALL.',
                'Big denominator = small fraction. The denominator tells you how many equal parts — more parts means smaller each.',
                'Share a chapati with 2 friends = 1/3 each. Share with 8 friends = 1/8 each. More friends, smaller your piece!'
            ]
        },
        confused: {
            settings: ['In a maths class', 'Baking bread at home', 'Measuring rope', 'At a science experiment'],
            problems: [
                'They mixed up which number is the numerator and which is the denominator.',
                'The student wrote 6/2 instead of 2/6 when describing their share.',
                'They knew a fraction had two numbers but not what each number meant.',
                'When the teacher said "3 out of 4", they wrote 4/3 instead of 3/4.'
            ],
            resolutions: [
                'DENOMINATOR (bottom) = total equal parts. NUMERATOR (top) = parts you have.',
                'Think: bottom = how many buckets. Top = how many you filled.',
                '3/4 → whole cut into 4, you have 3. Always: (your parts) ÷ (total equal parts).',
                'Easy trick: Denominator = Divides the whole. Numerator = Numbers you have.'
            ]
        },
        rote: {
            settings: ['Preparing for an exam', 'At a maths olympiad', 'During homework', 'In a study group'],
            problems: [
                'They got every answer right — but could not explain WHY 2/4 equals 1/2.',
                'They knew equivalent fractions existed but not what "equivalent" actually means.',
                'Asked "why do we need a common denominator to add fractions?" — silence.',
                'They could compare fractions but not explain the reasoning to a friend.'
            ],
            resolutions: [
                '2/4 = 1/2 because both describe the SAME relationship: half of a whole. The fraction is a ratio, not fixed numbers.',
                'Equivalent fractions: multiply or divide top AND bottom by the same number — the relationship stays the same.',
                'Adding 1/3 + 1/4 needs a common denominator because you can only add SAME-SIZE pieces.',
                'A fraction is a language of relationships — once you feel the relationship, the rules make sense.'
            ]
        },
        understood: {
            settings: ['At a cooking competition', 'In a construction site', 'At a pharmacy', 'In a music studio'],
            problems: [
                'They understood fractions — now: if you eat 3/8 pizza and friend eats 2/8, how much is left?',
                'A recipe needs 3/4 cup of flour but you only have a 1/4 cup measure — how many scoops?',
                'A doctor prescribes 3/4 of a tablet — why not just say "a bit less than one"?',
                'In music, a half note is 1/2 beat and a quarter note is 1/4 beat — why fractions in music?'
            ],
            resolutions: [
                '3/8 + 2/8 = 5/8 eaten. 8/8 - 5/8 = 3/8 left. Fractions make sharing exact!',
                '3/4 ÷ 1/4 = 3 scoops. Fractions divide perfectly.',
                'Precision matters in medicine — "a bit less" could be dangerous. Fractions give exact amounts.',
                'Music needs fractions to keep rhythm consistent — every instrument knows exactly how long to hold a note.'
            ]
        }
    }
};

const StoryEngine = {
    pick(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    buildOfflineStory(character, topic, classification, lang) {
        const frags = STORY_FRAGMENTS[topic]?.[classification];
        if (!frags) return null;
        const setting = this.pick(frags.settings);
        const problem = this.pick(frags.problems);
        const resolution = this.pick(frags.resolutions);
        const charName = character.name;
        const intro = character.intro[lang] || character.intro.en;

        return `${intro}\n\n${setting} — ${problem}\n\n${resolution}`;
    },

    buildOnlineStory(character, topic, classification, lang) {
        // Richer assembly simulating AI generation
        const frags = STORY_FRAGMENTS[topic]?.[classification];
        if (!frags) return this.buildOfflineStory(character, topic, classification, lang);
        const charName = character.name;
        const intro = character.intro[lang] || character.intro.en;
        // Pick 2 different problems and 2 resolutions for richer narrative
        const allProblems = [...frags.problems];
        const allRes = [...frags.resolutions];
        const p1 = this.pick(allProblems);
        const r1 = this.pick(allRes);
        const setting = this.pick(frags.settings);

        return `${intro}\n\n${setting} — ${p1}\n\n${r1}\n\nAnd that is exactly how ${charName} understood it — step by step, using what was around.`;
    },

    generate(character, topic, classification, lang, online) {
        if (online) return this.buildOnlineStory(character, topic, classification, lang);
        return this.buildOfflineStory(character, topic, classification, lang);
    },

    // Classification-specific structured breakdown steps
    getSteps(topic, classification, lang) {
        const R = REMEDIATION[topic]?.[classification];
        if (!R) return [];
        return R.correction[lang] || R.correction.en;
    }
};