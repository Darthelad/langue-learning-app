const fs = require('fs');

const extendedHebrew = [
    // Basics & Greetings
    { he: "שָׁלוֹם", rom: "shalom", en: "hello / peace", topic: "Basics & Greetings" },
    { he: "תוֹדָה", rom: "toda", en: "thank you", topic: "Basics & Greetings" },
    { he: "בְּבַקָּשָׁה", rom: "bevakasha", en: "please / you're welcome", topic: "Basics & Greetings" },
    { he: "כֵּן", rom: "ken", en: "yes", topic: "Basics & Greetings" },
    { he: "לֹא", rom: "lo", en: "no", topic: "Basics & Greetings" },
    { he: "סְלִיחָה", rom: "slicha", en: "excuse me / sorry", topic: "Basics & Greetings" },
    { he: "בּוֹקֶר טוֹב", rom: "boker tov", en: "good morning", topic: "Basics & Greetings" },
    { he: "עֶרֶב טוֹב", rom: "erev tov", en: "good evening", topic: "Basics & Greetings" },
    { he: "לַיְלָה טוֹב", rom: "laila tov", en: "good night", topic: "Basics & Greetings" },
    { he: "לְהִתְרָאוֹת", rom: "lehitraot", en: "goodbye", topic: "Basics & Greetings" },
    { he: "מָה שְׁלוֹמְךָ?", rom: "ma shlomcha?", en: "how are you? (m)", topic: "Basics & Greetings" },
    { he: "מָה שְׁלוֹמֵךְ?", rom: "ma shlomech?", en: "how are you? (f)", topic: "Basics & Greetings" },

    // People & Family
    { he: "מִשְׁפָּחָה", rom: "mishpacha", en: "family", topic: "People & Family" },
    { he: "אַבָּא", rom: "aba", en: "father / dad", topic: "People & Family" },
    { he: "אִמָּא", rom: "ima", en: "mother / mom", topic: "People & Family" },
    { he: "אָח", rom: "ach", en: "brother", topic: "People & Family" },
    { he: "אָחוֹת", rom: "achot", en: "sister", topic: "People & Family" },
    { he: "סָבָּא", rom: "saba", en: "grandfather", topic: "People & Family" },
    { he: "סָבְתָא", rom: "savta", en: "grandmother", topic: "People & Family" },
    { he: "יֶלֶד", rom: "yeled", en: "boy / child", topic: "People & Family" },
    { he: "יַלְדָּה", rom: "yalda", en: "girl", topic: "People & Family" },
    { he: "אִישׁ", rom: "ish", en: "man", topic: "People & Family" },
    { he: "אִשָּׁה", rom: "isha", en: "woman", topic: "People & Family" },
    { he: "חָבֵר", rom: "chaver", en: "friend (m)", topic: "People & Family" },
    { he: "חֲבֵרָה", rom: "chavera", en: "friend (f)", topic: "People & Family" },

    // Food & Drink
    { he: "אוֹכֶל", rom: "ochel", en: "food", topic: "Food & Drink" },
    { he: "מַיִם", rom: "mayim", en: "water", topic: "Food & Drink" },
    { he: "לֶחֶם", rom: "lechem", en: "bread", topic: "Food & Drink" },
    { he: "חָלָב", rom: "chalav", en: "milk", topic: "Food & Drink" },
    { he: "קָפֶה", rom: "cafe", en: "coffee", topic: "Food & Drink" },
    { he: "תֵּה", rom: "te", en: "tea", topic: "Food & Drink" },
    { he: "בָּשָׂר", rom: "basar", en: "meat", topic: "Food & Drink" },
    { he: "דָּג", rom: "dag", en: "fish", topic: "Food & Drink" },
    { he: "פְּרִי", rom: "pri", en: "fruit", topic: "Food & Drink" },
    { he: "יֶרֶק", rom: "yerek", en: "vegetable", topic: "Food & Drink" },
    { he: "בֵּיצָה", rom: "beitza", en: "egg", topic: "Food & Drink" },
    { he: "מִסְעָדָה", rom: "mis'ada", en: "restaurant", topic: "Food & Drink" },

    // House & Home
    { he: "בַּיִת", rom: "bayit", en: "house", topic: "House & Home" },
    { he: "חֶדֶר", rom: "cheder", en: "room", topic: "House & Home" },
    { he: "דֶּלֶת", rom: "delet", en: "door", topic: "House & Home" },
    { he: "חַלּוֹן", rom: "chalon", en: "window", topic: "House & Home" },
    { he: "מִטָּה", rom: "mita", en: "bed", topic: "House & Home" },
    { he: "שֻׁלְחָן", rom: "shulchan", en: "table", topic: "House & Home" },
    { he: "כִּסֵּא", rom: "kise", en: "chair", topic: "House & Home" },
    { he: "שֵׁרוּתִים", rom: "sherutim", en: "bathroom / toilet", topic: "House & Home" },

    // Time & Calendar
    { he: "זְמַן", rom: "zman", en: "time", topic: "Time & Calendar" },
    { he: "יוֹם", rom: "yom", en: "day", topic: "Time & Calendar" },
    { he: "שָׁבוּעַ", rom: "shavua", en: "week", topic: "Time & Calendar" },
    { he: "חוֹדֶשׁ", rom: "chodesh", en: "month", topic: "Time & Calendar" },
    { he: "שָׁנָה", rom: "shana", en: "year", topic: "Time & Calendar" },
    { he: "הַיּוֹם", rom: "hayom", en: "today", topic: "Time & Calendar" },
    { he: "מָחָר", rom: "machar", en: "tomorrow", topic: "Time & Calendar" },
    { he: "אֶתְמוֹל", rom: "etmol", en: "yesterday", topic: "Time & Calendar" },
    { he: "עַכְשָׁיו", rom: "achshav", en: "now", topic: "Time & Calendar" },

    // City & Places
    { he: "עִיר", rom: "ir", en: "city", topic: "City & Places" },
    { he: "רְחוֹב", rom: "rechov", en: "street", topic: "City & Places" },
    { he: "בֵּית סֵפֶר", rom: "beit sefer", en: "school", topic: "City & Places" },
    { he: "עֲבוֹדָה", rom: "avoda", en: "work", topic: "City & Places" },
    { he: "חֲנוּת", rom: "chanut", en: "store / shop", topic: "City & Places" },
    { he: "אוֹטוֹבּוּס", rom: "otobus", en: "bus", topic: "City & Places" },
    { he: "רַכֶּבֶת", rom: "rakevet", en: "train", topic: "City & Places" },

    // Action Verbs
    { he: "לָלֶכֶת", rom: "lalechet", en: "to go / walk", topic: "Action Verbs" },
    { he: "לַעֲשׂוֹת", rom: "la'asot", en: "to do / make", topic: "Action Verbs" },
    { he: "לֶאֱכוֹל", rom: "le'echol", en: "to eat", topic: "Action Verbs" },
    { he: "לִשְׁתּוֹת", rom: "lishtot", en: "to drink", topic: "Action Verbs" },
    { he: "לִרְאוֹת", rom: "lir'ot", en: "to see", topic: "Action Verbs" },
    { he: "לִשְׁמוֹעַ", rom: "lishmoa", en: "to hear", topic: "Action Verbs" },
    { he: "לְדַבֵּר", rom: "ledaber", en: "to speak", topic: "Action Verbs" },
    { he: "לִקְרוֹא", rom: "likro", en: "to read", topic: "Action Verbs" },
    { he: "לִכְתּוֹב", rom: "lichtov", en: "to write", topic: "Action Verbs" },
    { he: "לָדַעַת", rom: "lada'at", en: "to know", topic: "Action Verbs" },
    { he: "לַחְשׁוֹב", rom: "lachshov", en: "to think", topic: "Action Verbs" },

    // Descriptive (Adjectives)
    { he: "טוֹב", rom: "tov", en: "good", topic: "Descriptive (Adjectives)" },
    { he: "רַע", rom: "ra", en: "bad", topic: "Descriptive (Adjectives)" },
    { he: "גָּדוֹל", rom: "gadol", en: "big", topic: "Descriptive (Adjectives)" },
    { he: "קָטָן", rom: "katan", en: "small", topic: "Descriptive (Adjectives)" },
    { he: "חָדָשׁ", rom: "chadash", en: "new", topic: "Descriptive (Adjectives)" },
    { he: "יָשָׁן", rom: "yashan", en: "old", topic: "Descriptive (Adjectives)" },
    { he: "יָפֶה", rom: "yafe", en: "beautiful / pretty", topic: "Descriptive (Adjectives)" },
    { he: "חַם", rom: "cham", en: "hot", topic: "Descriptive (Adjectives)" },
    { he: "קַר", rom: "kar", en: "cold", topic: "Descriptive (Adjectives)" }
];

function inject(file, newData) {
    let content = fs.readFileSync(file, 'utf8');
    const vocabRegex = /export const VOCABULARY = \[([\s\S]*?)\];/;
    const match = content.match(vocabRegex);

    if (match) {
        try {
            let existingArray;
            eval(`existingArray = [${match[1]}]`);

            const enSet = new Set(existingArray.map(item => item.en.toLowerCase()));
            const uniqueNewData = newData.filter(item => !enSet.has(item.en.toLowerCase()));

            const mergedArray = [...existingArray, ...uniqueNewData];

            const updatedString = `export const VOCABULARY = [\n  ` + mergedArray.map(v => JSON.stringify(v)).join(',\n  ') + `\n];`;
            content = content.replace(vocabRegex, updatedString);
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Injected ${uniqueNewData.length} new words into ${file}`);
        } catch (e) {
            console.error(e);
        }
    }
}

inject('src/hebrew_data.js', extendedHebrew);
