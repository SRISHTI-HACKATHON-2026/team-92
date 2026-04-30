const REMEDIATION = {
    photosynthesis: {
        misconception: {
            title: { en: 'Let\'s fix this misconception!', hi: 'इस गलत धारणा को ठीक करते हैं!' },
            what: { en: 'You believed plants get food from soil — like animals eat. This is one of the most common mix-ups!', hi: 'आपने सोचा कि पौधे मिट्टी से खाना लेते हैं — जैसे जानवर खाते हैं। यह बहुत सामान्य गलती है!' },
            correction: {
                en: ['Soil gives minerals (like iron, calcium) — NOT food or energy.', 'The leaf is the food factory — not the roots.', 'Energy comes from SUNLIGHT captured by chlorophyll.', 'Plants make glucose using: Sunlight + Water + CO₂. That\'s it.'],
                hi: ['मिट्टी खनिज (जैसे लोहा, कैल्शियम) देती है — खाना या ऊर्जा नहीं।', 'पत्ती खाना बनाने की फैक्ट्री है — जड़ें नहीं।', 'ऊर्जा सूर्यप्रकाश से आती है जिसे क्लोरोफिल पकड़ता है।', 'पौधे ग्लूकोज बनाते हैं: सूर्यप्रकाश + पानी + CO₂। बस।']
            },
            analogy: { en: '🌾 A farmer does not eat the soil — they use the soil to grow food. The leaf is the farmer. Sunlight is the energy to work. Glucose is the crop.', hi: '🌾 किसान मिट्टी नहीं खाता — वो मिट्टी में उगाता है। पत्ती किसान है। सूरज ऊर्जा है। ग्लूकोज फसल है।' }
        },
        rote: {
            title: { en: 'You know the answer — now know the reason!', hi: 'उत्तर पता है — अब कारण जानो!' },
            what: { en: 'You answered correctly but couldn\'t explain WHY. Let\'s build the reasoning.', hi: 'आपने सही उत्तर दिया लेकिन कारण नहीं बता पाए। आइए तर्क बनाते हैं।' },
            correction: {
                en: ['Chlorophyll is GREEN because it reflects green light and absorbs red+blue light for energy.', 'Without chlorophyll there is no photosynthesis — no food — plant dies.', 'Glucose is not just "food" — it is the plant\'s fuel for growth, repair, and reproduction.', 'Oxygen released is a bonus — it comes from splitting water molecules.'],
                hi: ['क्लोरोफिल हरा है क्योंकि यह हरी रोशनी परावर्तित करता है और लाल+नीली रोशनी ऊर्जा के लिए सोखता है।', 'क्लोरोफिल के बिना प्रकाश संश्लेषण नहीं — खाना नहीं — पौधा मर जाता है।', 'ग्लूकोज सिर्फ "खाना" नहीं — यह पौधे का ईंधन है विकास, मरम्मत और प्रजनन के लिए।', 'छोड़ी गई ऑक्सीजन पानी के अणुओं के टूटने से आती है।']
            },
            analogy: { en: '💡 You know the recipe — now understand why each ingredient matters. Sunlight = stove energy. Water = base ingredient. CO₂ = the other ingredient. Chlorophyll = the chef who makes it happen.', hi: '💡 रेसिपी पता है — अब समझो हर सामग्री क्यों जरूरी है। सूरज = ऊर्जा। पानी = मुख्य सामग्री। CO₂ = दूसरी सामग्री। क्लोरोफिल = शेफ।' }
        },
        confused: {
            title: { en: 'Almost there — here\'s the missing link!', hi: 'लगभग सही — यह कड़ी जोड़ो!' },
            what: { en: 'You understood part of it — but one key connection was missing.', hi: 'आपने कुछ समझा — लेकिन एक मुख्य कड़ी छूट गई।' },
            correction: {
                en: ['Water is USED in making glucose — but it is NOT the energy source.', 'The ENERGY source is sunlight. Water is a raw material.', 'Think of it as: Sunlight powers the process. Water and CO₂ are the ingredients. Glucose is the product.', 'Roots bring water → leaves bring CO₂ → sunlight powers the reaction → glucose made.'],
                hi: ['पानी ग्लूकोज बनाने में उपयोग होता है — लेकिन यह ऊर्जा का स्रोत नहीं है।', 'ऊर्जा का स्रोत सूर्यप्रकाश है। पानी कच्चा माल है।', 'सोचो: सूरज प्रक्रिया चलाता है। पानी और CO₂ सामग्री हैं। ग्लूकोज उत्पाद है।', 'जड़ें पानी लाती हैं → पत्तियाँ CO₂ लेती हैं → सूरज प्रतिक्रिया चलाता है → ग्लूकोज बनता है।']
            },
            analogy: { en: '🔆 A solar cooker uses SUNLIGHT as energy to cook food (water + ingredients). The sunlight is the power. The water is just an ingredient. Same in a leaf.', hi: '🔆 सोलर कुकर सूरज की ऊर्जा से खाना पकाता है। सूरज शक्ति है। पानी केवल सामग्री है। पत्ती में भी यही होता है।' }
        },
        understood: {
            title: { en: 'Excellent! Ready for the next level?', hi: 'शाबाश! अगले स्तर के लिए तैयार?' },
            what: { en: 'You truly understand photosynthesis. Here\'s a challenge to go deeper:', hi: 'आपने सच में प्रकाश संश्लेषण समझा। आगे बढ़ने के लिए एक चुनौती:' },
            correction: {
                en: ['Why do leaves turn yellow in autumn? (Hint: chlorophyll breaks down)', 'Can photosynthesis happen at night? Why not?', 'Why are deep ocean plants rare? (Hint: sunlight doesn\'t reach deep water)', 'What would happen if CO₂ in the air decreased significantly?'],
                hi: ['पतझड़ में पत्तियाँ पीली क्यों होती हैं? (संकेत: क्लोरोफिल टूट जाता है)', 'क्या रात में प्रकाश संश्लेषण हो सकता है? क्यों नहीं?', 'गहरे समुद्र में पौधे दुर्लभ क्यों हैं?', 'अगर हवा में CO₂ बहुत कम हो जाए तो क्या होगा?']
            },
            analogy: { en: '🌍 You are now thinking like a scientist. These questions connect photosynthesis to climate change, seasons, and ocean ecology — real-world systems!', hi: '🌍 अब आप वैज्ञानिक की तरह सोच रहे हैं। ये प्रश्न जलवायु परिवर्तन और समुद्री पारिस्थितिकी से जोड़ते हैं।' }
        }
    },
    water_cycle: {
        misconception: {
            title: { en: 'Let\'s fix this misconception!', hi: 'इस गलत धारणा को ठीक करते हैं!' },
            what: { en: 'You thought clouds are bags of water or that wind lifts water. Let\'s clear this up.', hi: 'आपने सोचा बादल पानी की थैलियाँ हैं या हवा पानी उठाती है। इसे स्पष्ट करते हैं।' },
            correction: {
                en: ['Clouds are NOT bags — they are millions of TINY droplets so small they float.', 'Wind does NOT lift water. Heat from the sun causes evaporation.', 'Evaporation = liquid water → water vapour (invisible gas rising upward).', 'Condensation = water vapour cools down → becomes tiny liquid droplets = cloud.'],
                hi: ['बादल थैलियाँ नहीं हैं — वे लाखों इतनी छोटी बूँदें हैं जो तैरती हैं।', 'हवा पानी नहीं उठाती। सूरज की गर्मी वाष्पीकरण करती है।', 'वाष्पीकरण = तरल पानी → जल वाष्प (अदृश्य गैस जो ऊपर जाती है)।', 'संघनन = जल वाष्प ठंडा होता है → छोटी बूँदें बनती हैं = बादल।']
            },
            analogy: { en: '🫖 When you boil water, steam rises — not because wind pushes it but because heat makes it light enough to rise. That steam is invisible. When it hits a cold wall, it condenses into tiny droplets. That\'s a cloud on your bathroom mirror!', hi: '🫖 पानी उबालते समय भाप उठती है — हवा नहीं उठाती, गर्मी इसे हल्का बनाती है। वो भाप अदृश्य है। ठंडी दीवार पर बूँदें बनती हैं। वही बाथरूम दर्पण पर बादल है!' }
        },
        rote: {
            title: { en: 'You know the cycle — now feel it!', hi: 'चक्र पता है — अब महसूस करो!' },
            what: { en: 'You listed the steps correctly but let\'s understand why it\'s a cycle — not a line.', hi: 'आपने कदम सही बताए — लेकिन समझो यह रेखा नहीं, चक्र क्यों है।' },
            correction: {
                en: ['The SAME water molecules that fell as rain millions of years ago are in your glass today.', 'Water is never created or destroyed — only its form changes (liquid→gas→liquid).', 'The water cycle is driven entirely by TWO forces: solar energy (evaporation) and gravity (rain falls down).', 'Underground water (groundwater) is also part of the cycle — it moves slowly but surely.'],
                hi: ['वही पानी के अणु जो लाखों साल पहले बारिश बनकर गिरे थे, आज आपके गिलास में हैं।', 'पानी कभी नहीं बनता या नष्ट होता — केवल रूप बदलता है।', 'जल चक्र दो शक्तियों से चलता है: सौर ऊर्जा (वाष्पीकरण) और गुरुत्वाकर्षण (बारिश गिरती है)।', 'भूमिगत पानी भी चक्र का हिस्सा है।']
            },
            analogy: { en: '♻️ The water cycle is Earth\'s recycling system — running for 4 billion years without a pause.', hi: '♻️ जल चक्र पृथ्वी की रीसाइक्लिंग प्रणाली है — 4 अरब वर्षों से बिना रुके चल रही है।' }
        },
        confused: {
            title: { en: 'One step was missing — here it is!', hi: 'एक कदम छूट गया था — यह रहा!' },
            what: { en: 'You understood most of the cycle but got confused about one stage.', hi: 'आपने अधिकतर चक्र समझा लेकिन एक चरण में भ्रम हुआ।' },
            correction: {
                en: ['Condensation happens HIGH UP where it is COLD — not on the ground.', 'Water vapour is invisible. Clouds are visible because droplets are tiny but reflect light.', 'Precipitation = any water falling: rain, snow, hail — all the same process.', 'The key sequence: Evaporation → Rise → Cool → Condense → Cloud → Precipitate → Collect → Repeat.'],
                hi: ['संघनन ऊपर होता है जहाँ ठंड होती है — जमीन पर नहीं।', 'जल वाष्प अदृश्य है। बादल दिखते हैं क्योंकि बूँदें छोटी होकर रोशनी परावर्तित करती हैं।', 'वर्षण = कोई भी पानी गिरना: बारिश, बर्फ, ओले।', 'मुख्य क्रम: वाष्पीकरण → उठना → ठंडा → संघनन → बादल → वर्षण → संग्रह → दोहराना।']
            },
            analogy: { en: '🏔️ Why does it rain more on hills? Because air rises along the slope, cools faster, and condenses sooner. Lower areas get less rain. That\'s why one side of a mountain is green and the other is dry.', hi: '🏔️ पहाड़ों पर ज्यादा बारिश क्यों होती है? हवा ढलान पर उठती है, जल्दी ठंडी होती है, जल्दी संघनित होती है।' }
        },
        understood: {
            title: { en: 'Brilliant! Explore further:', hi: 'शानदार! आगे खोजो:' },
            what: { en: 'You have mastered the water cycle. These questions connect it to real-world issues:', hi: 'आपने जल चक्र में महारत हासिल की। ये प्रश्न इसे वास्तविक दुनिया से जोड़ते हैं:' },
            correction: {
                en: ['Why is groundwater running out in many Indian states? (Hint: we extract faster than the cycle refills)', 'How does deforestation affect the water cycle? (Hint: trees return water to the air)', 'Why do deserts get so little rain? (Hint: air is too dry to condense)', 'What is acid rain and how does the water cycle carry pollution?'],
                hi: ['कई भारतीय राज्यों में भूजल क्यों खत्म हो रहा है?', 'वनों की कटाई जल चक्र को कैसे प्रभावित करती है?', 'रेगिस्तानों में इतनी कम बारिश क्यों होती है?', 'अम्ल वर्षा क्या है और जल चक्र प्रदूषण कैसे ले जाता है?']
            },
            analogy: { en: '🌏 Climate change is disrupting the water cycle — some places flood, others drought. Understanding this cycle means understanding one of humanity\'s biggest challenges.', hi: '🌏 जलवायु परिवर्तन जल चक्र को बाधित कर रहा है। यह चक्र समझना मतलब मानवता की सबसे बड़ी चुनौती समझना है।' }
        }
    },
    fractions: {
        misconception: {
            title: { en: 'Let\'s fix this fraction confusion!', hi: 'इस भिन्न की गलती ठीक करते हैं!' },
            what: { en: 'You thought a bigger denominator means a bigger fraction. This is the most common fraction mistake!', hi: 'आपने सोचा बड़ा हर मतलब बड़ा भिन्न। यह भिन्न की सबसे सामान्य गलती है!' },
            correction: {
                en: ['The denominator tells you how many EQUAL pieces the whole is cut into.', 'MORE pieces = SMALLER each piece. Fewer pieces = LARGER each piece.', '1/8 < 1/4 because cutting into 8 gives smaller slices than cutting into 4.', 'Big denominator = small fraction (when numerators are equal).'],
                hi: ['हर बताता है कि पूरे को कितने बराबर टुकड़ों में काटा गया।', 'ज्यादा टुकड़े = हर टुकड़ा छोटा। कम टुकड़े = हर टुकड़ा बड़ा।', '1/8 < 1/4 क्योंकि 8 टुकड़े काटने से टुकड़े छोटे होते हैं।', 'बड़ा हर = छोटा भिन्न (जब अंश बराबर हों)।']
            },
            analogy: { en: '🍕 Share a pizza with 2 friends — you get 1/3 each. Share with 8 friends — you get 1/8 each. More people = smaller your piece. The pizza didn\'t change. The denominator did.', hi: '🍕 2 दोस्तों में पिज्जा बाँटो — 1/3 मिलता है। 8 दोस्तों में बाँटो — 1/8 मिलता है। ज्यादा लोग = छोटा टुकड़ा। पिज्जा नहीं बदला। हर बदला।' }
        },
        rote: {
            title: { en: 'Right answer — now build the intuition!', hi: 'सही उत्तर — अब सहज ज्ञान बनाओ!' },
            what: { en: 'You got the answer correct — but let\'s make sure the reasoning is solid.', hi: 'उत्तर सही था — अब तर्क पक्का करते हैं।' },
            correction: {
                en: ['A fraction is a RELATIONSHIP between part and whole — not just two numbers.', '2/4 and 1/2 are EQUAL because the relationship (half of the whole) is the same.', 'Equivalent fractions: multiply or divide both numerator and denominator by the same number.', 'To compare fractions: convert to the same denominator (common denominator) first.'],
                hi: ['भिन्न भाग और पूर्ण के बीच संबंध है — केवल दो अंक नहीं।', '2/4 और 1/2 बराबर हैं क्योंकि संबंध (आधा) समान है।', 'समतुल्य भिन्न: अंश और हर को एक ही संख्या से गुणा या भाग करो।', 'भिन्नों की तुलना: पहले समान हर बनाओ।']
            },
            analogy: { en: '⚖️ 1/2 of a large watermelon vs 1/2 of a small melon — same fraction, different actual amounts. A fraction describes a relationship, not a fixed size.', hi: '⚖️ बड़े तरबूज का 1/2 बनाम छोटे खरबूजे का 1/2 — भिन्न समान, वास्तविक मात्रा अलग। भिन्न संबंध बताता है, निश्चित आकार नहीं।' }
        },
        confused: {
            title: { en: 'The missing link — numerator vs denominator!', hi: 'छूटी कड़ी — अंश बनाम हर!' },
            what: { en: 'You mixed up which number does what. Here\'s the clear rule:', hi: 'आपने किस अंक की क्या भूमिका है वो मिला दिया। स्पष्ट नियम यहाँ है:' },
            correction: {
                en: ['DENOMINATOR (bottom) = How many EQUAL parts the whole is divided into.', 'NUMERATOR (top) = How many of those parts YOU HAVE.', '3/4 → the whole is cut into 4 equal parts. You have 3 of them.', 'A fraction is always: (what you have) ÷ (total equal parts).'],
                hi: ['हर (नीचे) = पूरे को कितने बराबर भागों में बाँटा।', 'अंश (ऊपर) = उनमें से आपके पास कितने हैं।', '3/4 → पूरे के 4 बराबर टुकड़े। आपके पास 3 हैं।', 'भिन्न हमेशा: (आपके पास) ÷ (कुल बराबर भाग)।']
            },
            analogy: { en: '🪣 Think of a bucket of 8 mangoes. You take 3. Your fraction = 3/8. Denominator = total mangoes in bucket. Numerator = mangoes you took.', hi: '🪣 8 आमों की बाल्टी सोचो। आपने 3 लिए। आपका भिन्न = 3/8। हर = बाल्टी में कुल आम। अंश = आपने लिए आम।' }
        },
        understood: {
            title: { en: 'Fantastic! Go deeper:', hi: 'शानदार! गहरे जाओ:' },
            what: { en: 'Fractions mastered. Here are real-world fraction challenges:', hi: 'भिन्न में महारत। वास्तविक दुनिया की भिन्न चुनौतियाँ:' },
            correction: {
                en: ['How do you add 1/3 + 1/4? (Hint: you need a common denominator — 12)', 'If you eat 3/8 of a pizza and your friend eats 2/8, how much is left?', 'What is half of 3/4? (Hint: multiply by 1/2)', 'Why do recipes use fractions? Why not just say "a little bit"?'],
                hi: ['1/3 + 1/4 कैसे जोड़ते हैं? (संकेत: समान हर चाहिए — 12)', 'आपने 3/8 पिज्जा खाया और दोस्त ने 2/8, कितना बचा?', '3/4 का आधा क्या है?', 'रेसिपी में भिन्न क्यों इस्तेमाल होते हैं?']
            },
            analogy: { en: '🏗️ Fractions are the language of precision — used in cooking, construction, medicine, and music. A doctor prescribes 3/4 of a tablet. A builder cuts 5/8 of an inch. You now speak this language.', hi: '🏗️ भिन्न सटीकता की भाषा है — खाना पकाने, निर्माण, दवाई और संगीत में। अब आप यह भाषा बोलते हैं।' }
        }
    }
};