const fs = require('fs');

const megaHebrew = [
    // House & Home (Expansion)
    { he: "מִטְבָּח", rom: "mitbach", en: "kitchen", topic: "House & Home" },
    { he: "סָלוֹן", rom: "salon", en: "living room", topic: "House & Home" },
    { he: "מִקְלַחַת", rom: "miklachat", en: "shower", topic: "House & Home" },
    { he: "מְקָרֵר", rom: "mekarer", en: "refrigerator", topic: "House & Home" },
    { he: "תַּנּוּר", rom: "tanur", en: "oven / heater", topic: "House & Home" },
    { he: "טֶלֶוִיזְיָה", rom: "televizya", en: "television", topic: "House & Home" },
    { he: "סַפָּה", rom: "sapa", en: "sofa / couch", topic: "House & Home" },
    { he: "אָרוֹן", rom: "aron", en: "closet / cabinet", topic: "House & Home" },
    { he: "מַפְתֵּחַ", rom: "mafteach", en: "key", topic: "House & Home" },
    { he: "גַּג", rom: "gag", en: "roof", topic: "House & Home" },
    { he: "קִיר", rom: "kir", en: "wall", topic: "House & Home" },
    { he: "רִצְפָּה", rom: "ritzpa", en: "floor", topic: "House & Home" },

    // Food & Drink (Expansion)
    { he: "אֲרוּחַת בּוֹקֶר", rom: "aruchat boker", en: "breakfast", topic: "Food & Drink" },
    { he: "אֲרוּחַת צָהֳרַיִם", rom: "aruchat tzohorayim", en: "lunch", topic: "Food & Drink" },
    { he: "אֲרוּחַת עֶרֶב", rom: "aruchat erev", en: "dinner", topic: "Food & Drink" },
    { he: "קִנּוּחַ", rom: "kinuach", en: "dessert", topic: "Food & Drink" },
    { he: "תַּפּוּז", rom: "tapuz", en: "orange (fruit)", topic: "Food & Drink" },
    { he: "לִימוֹן", rom: "limon", en: "lemon", topic: "Food & Drink" },
    { he: "גֶּזֶר", rom: "gezer", en: "carrot", topic: "Food & Drink" },
    { he: "בָּצָל", rom: "batzal", en: "onion", topic: "Food & Drink" },
    { he: "שׁוּם", rom: "shum", en: "garlic", topic: "Food & Drink" },
    { he: "מָרָק", rom: "marak", en: "soup", topic: "Food & Drink" },
    { he: "סָלָט", rom: "salat", en: "salad", topic: "Food & Drink" },
    { he: "פַּסְטָה", rom: "pasta", en: "pasta", topic: "Food & Drink" },
    { he: "בִּירָה", rom: "bira", en: "beer", topic: "Food & Drink" },
    { he: "יַיִן", rom: "yayin", en: "wine", topic: "Food & Drink" },

    // City & Places (Expansion)
    { he: "פַּארְק", rom: "park", en: "park", topic: "City & Places" },
    { he: "גִּנָּה", rom: "gina", en: "garden", topic: "City & Places" },
    { he: "חוֹף", rom: "chof", en: "beach", topic: "City & Places" },
    { he: "בֵּית קָפֶה", rom: "beit cafe", en: "cafe / coffee shop", topic: "City & Places" },
    { he: "בֵּית חוֹלִים", rom: "beit cholim", en: "hospital", topic: "City & Places" },
    { he: "בַּנְק", rom: "bank", en: "bank", topic: "City & Places" },
    { he: "בֵּית מִרְקַחַת", rom: "beit mirkachat", en: "pharmacy", topic: "City & Places" },
    { he: "מִשְׁטָרָה", rom: "mishtara", en: "police station", topic: "City & Places" },
    { he: "דּוֹאַר", rom: "do'ar", en: "post office", topic: "City & Places" },
    { he: "שְׂדֵה תְּעוּפָה", rom: "sde te'ufa", en: "airport", topic: "City & Places" },
    { he: "קַנְיוֹן", rom: "kanyon", en: "mall / shopping center", topic: "City & Places" },
    { he: "סוּפֶּרְמַרְקֶט", rom: "supermarket", en: "supermarket", topic: "City & Places" },

    // Transportation (Expansion)
    { he: "מַשָּׂאִית", rom: "masa'it", en: "truck", topic: "Transportation" },
    { he: "מוֹנִית", rom: "monit", en: "taxi", topic: "Transportation" },
    { he: "רַכֶּבֶת תַּחְתִּית", rom: "rakevet tachtit", en: "subway", topic: "Transportation" },
    { he: "קַטְנוֹעַ", rom: "katnoa", en: "scooter / moped", topic: "Transportation" },
    { he: "רִשָּׁיוֹן", rom: "rishayon", en: "license", topic: "Transportation" },
    { he: "דֶּלֶק", rom: "delek", en: "fuel / gas", topic: "Transportation" },

    // Abstract Concepts
    { he: "רַעֲיוֹן", rom: "ra'ayon", en: "idea", topic: "Abstract Concepts" },
    { he: "בְּעָיָה", rom: "be'aya", en: "problem", topic: "Abstract Concepts" },
    { he: "פִּתְרוֹן", rom: "pitron", en: "solution", topic: "Abstract Concepts" },
    { he: "שְׁאֵלָה", rom: "she'ela", en: "question", topic: "Abstract Concepts" },
    { he: "תְּשׁוּבָה", rom: "tshuva", en: "answer", topic: "Abstract Concepts" },
    { he: "אַהֲבָה", rom: "ahava", en: "love", topic: "Abstract Concepts" },
    { he: "תִּקְוָה", rom: "tikva", en: "hope", topic: "Abstract Concepts" },
    { he: "חֲלוֹם", rom: "chalom", en: "dream", topic: "Abstract Concepts" },
    { he: "סִיבָּה", rom: "siba", en: "reason / cause", topic: "Abstract Concepts" },
    { he: "הַצְלָחָה", rom: "hatzlacha", en: "success", topic: "Abstract Concepts" },
    { he: "טָעוּת", rom: "ta'ut", en: "mistake", topic: "Abstract Concepts" },
    { he: "סַכָּנָה", rom: "sakana", en: "danger", topic: "Abstract Concepts" },
    { he: "בְּטִיחוּת", rom: "betichut", en: "safety / security", topic: "Abstract Concepts" },
    { he: "אֱמֶת", rom: "emet", en: "truth", topic: "Abstract Concepts" },
    { he: "שֶׁקֶר", rom: "sheker", en: "lie / falsehood", topic: "Abstract Concepts" },

    // Action Verbs (Expansion 2)
    { he: "לַעֲבוֹד", rom: "la'avod", en: "to work", topic: "Action Verbs" },
    { he: "לְשַׂחֵק", rom: "lesachek", en: "to play (a game)", topic: "Action Verbs" },
    { he: "לְנַגֵּן", rom: "lenagen", en: "to play (an instrument)", topic: "Action Verbs" },
    { he: "לָשִׁיר", rom: "lashir", en: "to sing", topic: "Action Verbs" },
    { he: "לִרְקוֹד", rom: "lirkod", en: "to dance", topic: "Action Verbs" },
    { he: "לִצְחוֹק", rom: "litzchok", en: "to laugh", topic: "Action Verbs" },
    { he: "לִבְכּוֹת", rom: "livkot", en: "to cry", topic: "Action Verbs" },
    { he: "לַעֲזוֹר", rom: "la'azor", en: "to help", topic: "Action Verbs" },
    { he: "לְבַקֵּשׁ", rom: "levakesh", en: "to ask / request", topic: "Action Verbs" },
    { he: "לִשְׁאוֹל", rom: "lish'ol", en: "to ask (a question)", topic: "Action Verbs" },
    { he: "לַעֲנוֹת", rom: "la'anot", en: "to answer", topic: "Action Verbs" },
    { he: "לְהַתְחִיל", rom: "lehatchil", en: "to start / begin", topic: "Action Verbs" },
    { he: "לְסַיֵּים", rom: "lesayem", en: "to finish", topic: "Action Verbs" },
    { he: "לַעֲצוֹר", rom: "la'atzor", en: "to stop", topic: "Action Verbs" },
    { he: "לְהַמְשִׁיךְ", rom: "lehamshich", en: "to continue", topic: "Action Verbs" },
    { he: "לַחְזוֹר", rom: "lachzor", en: "to return / come back", topic: "Action Verbs" },
    { he: "לָשִׂים", rom: "lasim", en: "to put", topic: "Action Verbs" },
    { he: "לָקַחַת", rom: "lakachat", en: "to take", topic: "Action Verbs" },
    { he: "לָתֵת", rom: "latet", en: "to give", topic: "Action Verbs" },
    { he: "לִמְצוֹא", rom: "limtzo", en: "to find", topic: "Action Verbs" },
    { he: "לְחַפֵּשׂ", rom: "lechapes", en: "to search / look for", topic: "Action Verbs" },
    { he: "לֶאֱהוֹב", rom: "le'ehov", en: "to love", topic: "Action Verbs" },

    // Descriptive (Adjectives) (Expansion 2)
    { he: "אָרוֹךְ", rom: "aroch", en: "long", topic: "Descriptive (Adjectives)" },
    { he: "קָצָר", rom: "katsar", en: "short (length)", topic: "Descriptive (Adjectives)" },
    { he: "גָּבוֹהַּ", rom: "gavoa", en: "tall / high", topic: "Descriptive (Adjectives)" },
    { he: "נָמוּךְ", rom: "namuch", en: "short (height)", topic: "Descriptive (Adjectives)" },
    { he: "מָלֵא", rom: "male", en: "full", topic: "Descriptive (Adjectives)" },
    { he: "רֵיק", rom: "rek", en: "empty", topic: "Descriptive (Adjectives)" },
    { he: "פָּתוּחַ", rom: "patuach", en: "open", topic: "Descriptive (Adjectives)" },
    { he: "סָגוּר", rom: "sagur", en: "closed", topic: "Descriptive (Adjectives)" },
    { he: "חָזָק", rom: "chazak", en: "strong", topic: "Descriptive (Adjectives)" },
    { he: "חַלָּשׁ", rom: "chalash", en: "weak", topic: "Descriptive (Adjectives)" },
    { he: "עָשִׁיר", rom: "ashir", en: "rich", topic: "Descriptive (Adjectives)" },
    { he: "עָנִי", rom: "ani", en: "poor", topic: "Descriptive (Adjectives)" },
    { he: "חָכָם", rom: "chacham", en: "smart / wise", topic: "Descriptive (Adjectives)" },
    { he: "טִפֵּשׁ", rom: "tipesh", en: "stupid", topic: "Descriptive (Adjectives)" },
    { he: "מְעַנְיֵן", rom: "me'anyen", en: "interesting", topic: "Descriptive (Adjectives)" },
    { he: "מְשַׁעֲמֵם", rom: "mesha'amem", en: "boring", topic: "Descriptive (Adjectives)" },
    { he: "חָשׁוּב", rom: "chashuv", en: "important", topic: "Descriptive (Adjectives)" },
    { he: "מוּזָר", rom: "muzar", en: "weird / strange", topic: "Descriptive (Adjectives)" },
    { he: "מַצְחִיק", rom: "matzchik", en: "funny", topic: "Descriptive (Adjectives)" },

    // Nature & Animals (Mega Expansion)
    { he: "הַר", rom: "har", en: "mountain", topic: "Nature & Animals" },
    { he: "נָהָר", rom: "nahar", en: "river", topic: "Nature & Animals" },
    { he: "אֲגַם", rom: "agam", en: "lake", topic: "Nature & Animals" },
    { he: "חוֹל", rom: "chol", en: "sand", topic: "Nature & Animals" },
    { he: "אֶבֶן", rom: "even", en: "stone / rock", topic: "Nature & Animals" },
    { he: "עָנָן", rom: "anan", en: "cloud", topic: "Nature & Animals" },
    { he: "גֶּשֶׁם", rom: "geshem", en: "rain", topic: "Nature & Animals" },
    { he: "רוּחַ", rom: "ruach", en: "wind / spirit", topic: "Nature & Animals" },
    { he: "שֶׁלֶג", rom: "sheleg", en: "snow", topic: "Nature & Animals" },
    { he: "פָּרָה", rom: "para", en: "cow", topic: "Nature & Animals" },
    { he: "כִּבְשָׂה", rom: "kivsa", en: "sheep", topic: "Nature & Animals" },
    { he: "חֲזִיר", rom: "chazir", en: "pig", topic: "Nature & Animals" },
    { he: "אַרְיֵה", rom: "arye", en: "lion", topic: "Nature & Animals" },
    { he: "דּוֹב", rom: "dov", en: "bear", topic: "Nature & Animals" },
    { he: "קוֹף", rom: "kof", en: "monkey", topic: "Nature & Animals" },
    { he: "נָחָשׁ", rom: "nachash", en: "snake", topic: "Nature & Animals" },
    { he: "תַּרְנְגוֹל", rom: "tarnegol", en: "rooster", topic: "Nature & Animals" },
    { he: "עַכְבָּר", rom: "achbar", en: "mouse", topic: "Nature & Animals" }
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

inject('src/hebrew_data.js', megaHebrew);
