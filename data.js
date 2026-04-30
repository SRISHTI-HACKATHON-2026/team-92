const CURRICULUM = {
    science: {
        photosynthesis: {
            id: 'photosynthesis', subject: 'science',
            title: { en: 'Photosynthesis', hi: 'प्रकाश संश्लेषण', ta: 'ஒளிச்சேர்க்கை', te: 'కిరణజన్య సంయోగక్రియ', kn: 'ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ', bn: 'সালোকসংশ্লেষণ', mr: 'प्रकाशसंश्लेषण' },
            video: {
                layer1: { en: 'Plants make their own food using sunlight, water, and carbon dioxide. This process happens in the leaves, which contain a green substance called chlorophyll. Chlorophyll captures energy from sunlight. The leaf then uses this energy to combine water (from roots) and carbon dioxide (from air) to produce glucose — the plant\'s food — and releases oxygen.', hi: 'पौधे सूरज की रोशनी, पानी और कार्बन डाइऑक्साइड का उपयोग करके अपना खाना बनाते हैं। यह प्रक्रिया पत्तियों में होती है जिसमें क्लोरोफिल होता है। क्लोरोफिल सूर्य की ऊर्जा को पकड़ता है और पानी व CO₂ को ग्लूकोज में बदलता है।' },
                layer2: { en: 'Many students think plants get their food from soil — like how we eat. But soil only provides minerals, not food. The plant MAKES its food using sunlight as the energy source. The roots bring water, the leaves breathe in CO₂, and sunlight drives the whole process.', hi: 'बहुत से छात्र सोचते हैं कि पौधे मिट्टी से खाना लेते हैं — जैसे हम खाते हैं। लेकिन मिट्टी केवल खनिज देती है। पौधा सूरज की ऊर्जा से खुद खाना बनाता है।' },
                layer3: { en: 'Think of the leaf as a farmer. Sunlight is the farmer\'s energy to work. Water from roots and CO₂ from air are the seeds and soil. Glucose is the harvest — the food the farmer produces. The farmer doesn\'t eat food from the market; they grow it themselves. That\'s exactly what a plant does.', hi: 'पत्ती को किसान की तरह सोचो। सूरज की रोशनी उसकी ऊर्जा है। जड़ों से पानी और हवा से CO₂ उसके बीज और मिट्टी हैं। ग्लूकोज उसकी फसल है — जो खाना वो खुद उगाता है।' }
            },
            quiz: [
                {
                    q: { en: 'Where does a plant get the energy to make its food?', hi: 'पौधा अपना खाना बनाने के लिए ऊर्जा कहाँ से लेता है?' },
                    options: {
                        en: ['From sunlight, through its leaves', 'From water it absorbs through its roots', 'From the soil, like how animals eat', 'From chlorophyll, because chlorophyll is food'],
                        hi: ['सूर्यप्रकाश से, अपनी पत्तियों के जरिए', 'जड़ों से पानी से', 'मिट्टी से, जैसे जानवर खाते हैं', 'क्लोरोफिल से, क्योंकि क्लोरोफिल खाना है']
                    },
                    correct: 0
                },
                {
                    q: { en: 'What does chlorophyll actually do in a plant?', hi: 'पौधे में क्लोरोफिल वास्तव में क्या करता है?' },
                    options: {
                        en: ['It captures sunlight to power food-making', 'It carries water from roots to leaves', 'It stores glucose for the plant to eat later', 'It is the green food that plants eat'],
                        hi: ['यह सूरज की रोशनी को पकड़ता है ताकि खाना बन सके', 'यह जड़ों से पत्तियों तक पानी पहुँचाता है', 'यह ग्लूकोज संग्रहीत करता है', 'यह हरा खाना है जो पौधे खाते हैं']
                    },
                    correct: 0
                },
                {
                    q: { en: 'A student says "Plants eat food from the soil." What is wrong with this thinking?', hi: 'एक छात्र कहता है "पौधे मिट्टी से खाना खाते हैं।" इस सोच में क्या गलत है?' },
                    options: {
                        en: ['Plants make their own food; soil only gives minerals', 'Nothing is wrong — plants do eat from soil', 'Plants eat from soil AND from sunlight', 'Plants don\'t need soil at all'],
                        hi: ['पौधे खुद खाना बनाते हैं; मिट्टी केवल खनिज देती है', 'कुछ गलत नहीं — पौधे सच में मिट्टी से खाते हैं', 'पौधे मिट्टी और सूरज दोनों से खाते हैं', 'पौधों को मिट्टी की जरूरत नहीं']
                    },
                    correct: 0
                },
                {
                    q: { en: 'Which gas do plants release during photosynthesis?', hi: 'प्रकाश संश्लेषण के दौरान पौधे कौन सी गैस छोड़ते हैं?' },
                    options: {
                        en: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Water vapour only'],
                        hi: ['ऑक्सीजन', 'कार्बन डाइऑक्साइड', 'नाइट्रोजन', 'केवल जल वाष्प']
                    },
                    correct: 0
                },
                {
                    q: { en: 'Why do plants kept in a dark room eventually die?', hi: 'अंधेरे कमरे में रखे पौधे अंततः क्यों मर जाते हैं?' },
                    options: {
                        en: ['No sunlight means no energy to make food', 'They get too cold without light', 'Dark rooms have no water', 'Plants need light to breathe air'],
                        hi: ['सूर्यप्रकाश नहीं तो खाना बनाने की ऊर्जा नहीं', 'रोशनी के बिना बहुत ठंड हो जाती है', 'अंधेरे कमरों में पानी नहीं होता', 'पौधों को सांस लेने के लिए रोशनी चाहिए']
                    },
                    correct: 0
                }
            ]
        },
        water_cycle: {
            id: 'water_cycle', subject: 'science',
            title: { en: 'Water Cycle', hi: 'जल चक्र', ta: 'நீர் சுழற்சி', te: 'నీటి చక్రం', kn: 'ನೀರಿನ ಚಕ್ರ', bn: 'জলচক্র', mr: 'जलचक्र' },
            video: {
                layer1: { en: 'Water on Earth moves in a continuous cycle. Heat from the sun causes water in oceans, rivers, and lakes to evaporate — turn into water vapour and rise into the sky. High up, it cools and condenses into clouds (tiny water droplets). When clouds get heavy, water falls back as rain or snow (precipitation). This water flows into rivers and soaks into the ground, completing the cycle.', hi: 'पृथ्वी पर पानी एक निरंतर चक्र में चलता है। सूरज की गर्मी से पानी वाष्पीकृत होता है, बादल बनते हैं, और फिर बारिश होती है।' },
                layer2: { en: 'Many students think clouds ARE water — like big bags of water floating in the sky. Clouds are actually millions of tiny water droplets or ice crystals so small they float in air. The cloud doesn\'t "hold" water like a bucket; it IS a collection of tiny droplets suspended in air.', hi: 'बहुत से छात्र सोचते हैं बादल पानी की थैलियाँ हैं। असल में बादल करोड़ों बहुत छोटी पानी की बूँदों से बने होते हैं जो हवा में तैरती हैं।' },
                layer3: { en: 'Imagine a well in a village. The sun heats the water, which rises as steam (evaporation). The steam travels up to the hills and becomes clouds (condensation). When it rains on the hills, water flows back to the village well (collection). The same water goes on this journey again and again — it never really disappears.', hi: 'गाँव के कुएँ की कल्पना करो। सूरज पानी को गर्म करता है, भाप बनती है, बादल बनते हैं, पहाड़ों पर बारिश होती है, और पानी वापस कुएँ में आता है।' }
            },
            quiz: [
                {
                    q: { en: 'What causes water to evaporate from rivers and oceans?', hi: 'नदियों और महासागरों से पानी क्यों वाष्पीकृत होता है?' },
                    options: {
                        en: ['Heat from the sun converts water to vapour', 'Wind blows the water upward', 'Clouds pull the water up', 'Water gets lighter at night and rises'],
                        hi: ['सूरज की गर्मी पानी को वाष्प में बदलती है', 'हवा पानी को ऊपर उड़ाती है', 'बादल पानी को खींचते हैं', 'रात को पानी हल्का होकर ऊपर जाता है']
                    },
                    correct: 0
                },
                {
                    q: { en: 'What are clouds actually made of?', hi: 'बादल वास्तव में किससे बने होते हैं?' },
                    options: {
                        en: ['Millions of tiny water droplets floating in air', 'Bags of water stored high in the sky', 'Smoke from factories and fires', 'Frozen solid ice blocks'],
                        hi: ['हवा में तैरती लाखों छोटी पानी की बूँदें', 'आसमान में रखी पानी की थैलियाँ', 'कारखानों और आग का धुआँ', 'जमी हुई बर्फ के टुकड़े']
                    },
                    correct: 0
                },
                {
                    q: { en: 'When does water vapour turn into clouds?', hi: 'जल वाष्प बादल कब बनता है?' },
                    options: {
                        en: ['When it rises high and cools down (condensation)', 'When sunlight hits it directly', 'When wind pushes it together', 'When it mixes with air pollution'],
                        hi: ['जब यह ऊपर जाकर ठंडा होता है (संघनन)', 'जब सूरज की रोशनी सीधे पड़ती है', 'जब हवा इसे एक साथ धकेलती है', 'जब यह वायु प्रदूषण से मिलता है']
                    },
                    correct: 0
                },
                {
                    q: { en: 'After rain falls on land, where does the water go? (Choose the most complete answer)', hi: 'जमीन पर बारिश गिरने के बाद पानी कहाँ जाता है?' },
                    options: {
                        en: ['Into rivers, soaks into ground, and evaporates again', 'It disappears into the clouds again immediately', 'It stays on land forever as puddles', 'It only goes into rivers and never into the ground'],
                        hi: ['नदियों में, जमीन में, और फिर वाष्पीकृत होता है', 'तुरंत वापस बादलों में चला जाता है', 'यह हमेशा के लिए जमीन पर रहता है', 'केवल नदियों में जाता है']
                    },
                    correct: 0
                },
                {
                    q: { en: 'Why is the water cycle called a "cycle"?', hi: 'जल चक्र को "चक्र" क्यों कहते हैं?' },
                    options: {
                        en: ['Because water continuously moves and returns to where it started', 'Because it only happens in circles on a map', 'Because it moves in one direction and stops', 'Because it only works when there are cycles of rain every day'],
                        hi: ['क्योंकि पानी लगातार चलता है और वापस आता है', 'क्योंकि यह नक्शे पर केवल गोल घूमता है', 'क्योंकि यह एक दिशा में चलकर रुक जाता है', 'क्योंकि यह केवल रोज बारिश से काम करता है']
                    },
                    correct: 0
                }
            ]
        }
    },
    math: {
        fractions: {
            id: 'fractions', subject: 'math',
            title: { en: 'Fractions', hi: 'भिन्न', ta: 'பின்னங்கள்', te: 'భిన్నాలు', kn: 'ಭಿನ್ನರಾಶಿಗಳು', bn: 'ভগ্নাংশ', mr: 'अपूर्णांक' },
            video: {
                layer1: { en: 'A fraction represents a part of a whole. When we divide something equally into parts, each part is a fraction. The number below the line (denominator) tells us how many equal parts the whole is divided into. The number above the line (numerator) tells us how many of those parts we are talking about. So 3/4 means: divide something into 4 equal parts, take 3 of them.', hi: 'भिन्न एक पूर्ण के एक भाग को दर्शाता है। नीचे का अंक (हर) बताता है कि पूरे को कितने भागों में बाँटा है। ऊपर का अंक (अंश) बताता है कि हम कितने भाग ले रहे हैं।' },
                layer2: { en: 'Many students think a bigger denominator means a bigger fraction — "4/8 is bigger than 4/5 because 8 is bigger than 5." This is backwards! A bigger denominator means smaller pieces. Dividing a roti into 8 pieces gives smaller pieces than cutting it into 5 pieces. So 4/5 is actually bigger than 4/8.', hi: 'बहुत से छात्र सोचते हैं बड़ा हर मतलब बड़ा भिन्न। यह गलत है! बड़ा हर मतलब छोटे टुकड़े। रोटी को 8 टुकड़ों में काटो तो टुकड़े 5 टुकड़ों से छोटे होंगे।' },
                layer3: { en: 'Imagine cutting a chapati to share. If you cut it into 4 pieces and take 1 piece, you have 1/4 of the chapati. If your friend cuts theirs into 8 pieces and takes 1, they have 1/8 — a smaller piece! The more pieces you cut, the smaller each piece becomes. That\'s why 1/4 is bigger than 1/8, even though 4 is smaller than 8.', hi: 'चपाती बाँटने की कल्पना करो। 4 टुकड़ों में काटकर 1 लेना = 1/4। दोस्त ने 8 टुकड़े काटे और 1 लिया = 1/8 — छोटा टुकड़ा! इसीलिए 1/4 > 1/8।' }
            },
            quiz: [
                {
                    q: { en: 'Which fraction is BIGGER: 3/4 or 3/8?', hi: 'कौन सा भिन्न बड़ा है: 3/4 या 3/8?' },
                    options: {
                        en: ['3/4 is bigger (fewer, larger pieces)', '3/8 is bigger (8 is a bigger number)', 'They are equal because the top number is the same', '3/8 is bigger because we divided more times'],
                        hi: ['3/4 बड़ा है (कम लेकिन बड़े टुकड़े)', '3/8 बड़ा है (8 बड़ा अंक है)', 'वे बराबर हैं क्योंकि ऊपर का अंक समान है', '3/8 बड़ा है क्योंकि हमने ज्यादा बार काटा']
                    },
                    correct: 0
                },
                {
                    q: { en: 'What does the denominator (bottom number) of a fraction tell you?', hi: 'भिन्न का हर (नीचे का अंक) आपको क्या बताता है?' },
                    options: {
                        en: ['How many equal parts the whole is divided into', 'How many parts you have taken', 'How big the fraction is', 'How many times you multiplied'],
                        hi: ['पूर्ण को कितने बराबर भागों में बाँटा गया है', 'आपने कितने भाग लिए हैं', 'भिन्न कितना बड़ा है', 'आपने कितनी बार गुणा किया']
                    },
                    correct: 0
                },
                {
                    q: { en: 'A chapati is cut into 6 equal pieces. Priya takes 2 pieces. What fraction did she take?', hi: 'एक चपाती को 6 बराबर टुकड़ों में काटा गया। प्रिया ने 2 टुकड़े लिए। उसने कितना भिन्न लिया?' },
                    options: {
                        en: ['2/6', '6/2', '2/4', '1/6'],
                        hi: ['2/6', '6/2', '2/4', '1/6']
                    },
                    correct: 0
                },
                {
                    q: { en: 'Which of these equals one whole (1)?', hi: 'इनमें से कौन सा एक पूर्ण (1) के बराबर है?' },
                    options: {
                        en: ['5/5', '1/5', '5/1', '0/5'],
                        hi: ['5/5', '1/5', '5/1', '0/5']
                    },
                    correct: 0
                },
                {
                    q: { en: 'A student says "1/2 and 2/4 are different fractions." Are they right?', hi: 'एक छात्र कहता है "1/2 और 2/4 अलग भिन्न हैं।" क्या वह सही है?' },
                    options: {
                        en: ['No — they are equal fractions (same part of a whole)', 'Yes — because the numbers are different', 'Yes — 2/4 is bigger because it has bigger numbers', 'No — 1/2 is always bigger than 2/4'],
                        hi: ['नहीं — ये बराबर भिन्न हैं (एक पूर्ण का समान भाग)', 'हाँ — क्योंकि अंक अलग हैं', 'हाँ — 2/4 बड़ा है क्योंकि इसमें बड़े अंक हैं', 'नहीं — 1/2 हमेशा 2/4 से बड़ा होता है']
                    },
                    correct: 0
                }
            ]
        }
    }
};