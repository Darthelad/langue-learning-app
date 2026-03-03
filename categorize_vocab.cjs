const fs = require('fs');

const topics = [
    { label: "Basics & Greetings", keywords: ["hello", "good", "yes", "no", "please", "thank", "sorry", "excuse", "morning", "night", "bye", "welcome", "how"] },
    { label: "People & Family", keywords: ["mother", "father", "mom", "dad", "son", "daughter", "brother", "sister", "grandfather", "grandmother", "uncle", "aunt", "cousin", "nephew", "niece", "husband", "wife", "friend", "man", "woman", "boy", "girl", "child", "person", "people"] },
    { label: "Time & Calendar", keywords: ["time", "day", "week", "month", "year", "today", "tomorrow", "yesterday", "now", "later", "morning", "afternoon", "evening", "night", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday", "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december", "season", "spring", "summer", "autumn", "winter"] },
    { label: "Numbers & Math", keywords: ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "twenty", "thirty", "forty", "fifty", "hundred", "thousand", "million", "first", "second", "third", "number"] },
    { label: "Food & Drink", keywords: ["food", "drink", "water", "bread", "cheese", "meat", "chicken", "fish", "vegetable", "fruit", "apple", "banana", "orange", "wine", "beer", "coffee", "tea", "milk", "breakfast", "lunch", "dinner", "restaurant", "menu"] },
    { label: "Body & Anatomy", keywords: ["head", "face", "nose", "eye", "ear", "mouth", "tooth", "tongue", "neck", "shoulder", "arm", "elbow", "wrist", "finger", "hand", "chest", "heart", "stomach", "back", "leg", "knee", "foot", "hair", "skin", "blood", "bone", "muscle"] },
    { label: "Clothing & Fashion", keywords: ["clothes", "shirt", "pants", "dress", "skirt", "shoe", "sock", "jacket", "coat", "hat", "glove", "scarf", "belt", "tie", "underwear", "suit", "sweater", "glasses"] },
    { label: "House & Home", keywords: ["house", "home", "room", "kitchen", "bathroom", "bedroom", "living room", "door", "window", "wall", "floor", "ceiling", "roof", "furniture", "table", "chair", "bed", "sofa", "lamp", "television", "fridge", "oven"] },
    { label: "Nature & Animals", keywords: ["nature", "tree", "flower", "grass", "plant", "forest", "mountain", "river", "lake", "ocean", "sea", "beach", "sun", "moon", "star", "sky", "cloud", "rain", "snow", "wind", "weather", "animal", "dog", "cat", "bird", "fish", "horse", "cow", "pig", "sheep", "insect", "bug"] },
    { label: "City & Places", keywords: ["city", "town", "village", "street", "road", "square", "park", "garden", "school", "university", "library", "hospital", "bank", "post office", "store", "shop", "supermarket", "airport", "station", "bus stop", "museum", "theater", "cinema"] },
    { label: "Transportation", keywords: ["transport", "car", "bus", "train", "bicycle", "bike", "motorcycle", "plane", "airplane", "boat", "ship", "ticket", "station", "stop", "flight"] },
    { label: "Work & Professions", keywords: ["work", "job", "profession", "office", "boss", "employee", "teacher", "student", "doctor", "nurse", "police", "firefighter", "lawyer", "engineer", "artist", "writer"] },
    { label: "Colors & Shapes", keywords: ["color", "red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "black", "white", "gray", "shape", "circle", "square", "triangle", "line"] },
    { label: "Action Verbs", keywords: ["be", "have", "do", "make", "go", "come", "take", "get", "put", "see", "look", "watch", "hear", "listen", "speak", "say", "talk", "eat", "drink", "sleep", "wake", "work", "play", "read", "write", "walk", "run", "jump", "sit", "stand", "buy", "sell", "pay", "cost", "know", "think", "understand", "learn", "study"] },
    { label: "Abstract Concepts", keywords: ["idea", "thought", "mind", "memory", "feeling", "emotion", "love", "hate", "anger", "fear", "joy", "sadness", "surprise", "hope", "dream", "truth", "lie", "right", "wrong", "good", "bad", "beautiful", "ugly", "big", "small", "hot", "cold", "new", "old", "fast", "slow", "easy", "difficult"] }
];

function determineTopic(word) {
    if (!word) return "Misc & Core Vocab";
    const enMatch = word.toLowerCase();

    // Exact match for priority
    for (const category of topics) {
        for (const kw of category.keywords) {
            if (enMatch === kw || enMatch === `the ${kw}` || enMatch === `to ${kw}`) {
                return category.label;
            }
        }
    }

    // Substring match
    for (const category of topics) {
        for (const kw of category.keywords) {
            if (enMatch.includes(kw)) {
                return category.label;
            }
        }
    }

    return "Misc & Core Vocab";
}

const files = ['src/data.js', 'src/korean_data.js', 'src/hebrew_data.js', 'src/spanish_data.js'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Find everything inside const VOCABULARY = [ ... ];
    const vocabRegex = /const VOCABULARY = \[([\s\S]*?)\];/;
    const match = content.match(vocabRegex);

    if (match) {
        const vocabString = `[${match[1]}]`;
        try {
            // Evaluated gently since the arrays are pure static objects without dynamic values (except maybe some string quoting)
            // It's safer to use eval to get the object, modify it, and stringify it back
            let vocabArray;
            eval(`vocabArray = ${vocabString}`);

            // Update topic
            vocabArray = vocabArray.map(item => {
                const newTopic = determineTopic(item.en);
                return { ...item, topic: newTopic };
            });

            // Re-order by topic order in the list, then alphabetical
            vocabArray.sort((a, b) => {
                let idxA = topics.findIndex(t => t.label === a.topic);
                let idxB = topics.findIndex(t => t.label === b.topic);
                if (idxA === -1) idxA = 999;
                if (idxB === -1) idxB = 999;

                if (idxA !== idxB) return idxA - idxB;
                return a.en.localeCompare(b.en);
            });

            // Convert back to string
            const updatedString = `const VOCABULARY = [\n  ` + vocabArray.map(v => JSON.stringify(v)).join(',\n  ') + `\n];`;

            content = content.replace(vocabRegex, updatedString);
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Successfully updated ${file}`);
        } catch (e) {
            console.error(`Failed to parse/update ${file}:`, e);
        }
    }
});
