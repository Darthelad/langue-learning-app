const fs = require('fs');

const massiveHebrew = [
    // Numbers & Math
    { he: "אֶפֶס", rom: "efes", en: "zero", topic: "Numbers & Math" },
    { he: "אַחַת", rom: "achat", en: "one", topic: "Numbers & Math" },
    { he: "שְׁתַּיִם", rom: "shtayim", en: "two", topic: "Numbers & Math" },
    { he: "שָׁלוֹשׁ", rom: "shalosh", en: "three", topic: "Numbers & Math" },
    { he: "אַרְבַּע", rom: "arba", en: "four", topic: "Numbers & Math" },
    { he: "חָמֵשׁ", rom: "chamesh", en: "five", topic: "Numbers & Math" },
    { he: "שֵׁשׁ", rom: "shesh", en: "six", topic: "Numbers & Math" },
    { he: "שֶׁבַע", rom: "sheva", en: "seven", topic: "Numbers & Math" },
    { he: "שְׁמוֹנֶה", rom: "shmone", en: "eight", topic: "Numbers & Math" },
    { he: "תֵּשַׁע", rom: "tesha", en: "nine", topic: "Numbers & Math" },
    { he: "עֶשֶׂר", rom: "eser", en: "ten", topic: "Numbers & Math" },
    { he: "עֶשְׂרִים", rom: "esrim", en: "twenty", topic: "Numbers & Math" },
    { he: "שְׁלוֹשִׁים", rom: "shloshim", en: "thirty", topic: "Numbers & Math" },
    { he: "אַרְבָּעִים", rom: "arbaim", en: "forty", topic: "Numbers & Math" },
    { he: "חֲמִשִּׁים", rom: "chamishim", en: "fifty", topic: "Numbers & Math" },
    { he: "מֵאָה", rom: "mea", en: "hundred", topic: "Numbers & Math" },
    { he: "אֶלֶף", rom: "elef", en: "thousand", topic: "Numbers & Math" },
    { he: "מִסְפָּר", rom: "mispar", en: "number", topic: "Numbers & Math" },

    // Colors & Shapes
    { he: "צֶבַע", rom: "tzeva", en: "color", topic: "Colors & Shapes" },
    { he: "אָדוֹם", rom: "adom", en: "red", topic: "Colors & Shapes" },
    { he: "כָּחוֹל", rom: "kachol", en: "blue", topic: "Colors & Shapes" },
    { he: "יָרוֹק", rom: "yarok", en: "green", topic: "Colors & Shapes" },
    { he: "צָהוֹב", rom: "tzahov", en: "yellow", topic: "Colors & Shapes" },
    { he: "שָׁחוֹר", rom: "shachor", en: "black", topic: "Colors & Shapes" },
    { he: "לָבָן", rom: "lavan", en: "white", topic: "Colors & Shapes" },
    { he: "אָפוֹר", rom: "afor", en: "gray", topic: "Colors & Shapes" },
    { he: "חוּם", rom: "chum", en: "brown", topic: "Colors & Shapes" },
    { he: "וָרוֹד", rom: "varod", en: "pink", topic: "Colors & Shapes" },
    { he: "סָגוֹל", rom: "sagol", en: "purple", topic: "Colors & Shapes" },
    { he: "כָּתוֹם", rom: "katom", en: "orange", topic: "Colors & Shapes" },

    // Body & Anatomy
    { he: "גּוּף", rom: "guf", en: "body", topic: "Body & Anatomy" },
    { he: "ראֹשׁ", rom: "rosh", en: "head", topic: "Body & Anatomy" },
    { he: "פָּנִים", rom: "panim", en: "face", topic: "Body & Anatomy" },
    { he: "עַיִן", rom: "ayin", en: "eye", topic: "Body & Anatomy" },
    { he: "אַף", rom: "af", en: "nose", topic: "Body & Anatomy" },
    { he: "פֶּה", rom: "pe", en: "mouth", topic: "Body & Anatomy" },
    { he: "אוֹזֶן", rom: "ozen", en: "ear", topic: "Body & Anatomy" },
    { he: "שֵׂעָר", rom: "se'ar", en: "hair", topic: "Body & Anatomy" },
    { he: "יָד", rom: "yad", en: "hand / arm", topic: "Body & Anatomy" },
    { he: "רֶגֶל", rom: "regel", en: "leg / foot", topic: "Body & Anatomy" },
    { he: "בֶּטֶן", rom: "beten", en: "stomach", topic: "Body & Anatomy" },
    { he: "גַּב", rom: "gav", en: "back", topic: "Body & Anatomy" },
    { he: "לֵב", rom: "lev", en: "heart", topic: "Body & Anatomy" },

    // Clothing & Fashion
    { he: "בֶּגֶד", rom: "beged", en: "clothes", topic: "Clothing & Fashion" },
    { he: "חוּלְצָה", rom: "chultza", en: "shirt", topic: "Clothing & Fashion" },
    { he: "מִכְנָסַיִם", rom: "michnasayim", en: "pants", topic: "Clothing & Fashion" },
    { he: "שִׂמְלָה", rom: "simla", en: "dress", topic: "Clothing & Fashion" },
    { he: "נַעֲלַיִם", rom: "na'alayim", en: "shoes", topic: "Clothing & Fashion" },
    { he: "גַּרְבַּיִם", rom: "garbayim", en: "socks", topic: "Clothing & Fashion" },
    { he: "מְעִיל", rom: "me'il", en: "coat / jacket", topic: "Clothing & Fashion" },
    { he: "כּוֹבַע", rom: "kova", en: "hat", topic: "Clothing & Fashion" },

    // Transportation
    { he: "מְכוֹנִית", rom: "mechonit", en: "car", topic: "Transportation" },
    { he: "מָטוֹס", rom: "matos", en: "airplane", topic: "Transportation" },
    { he: "אוֹפַנַּיִם", rom: "ofanayim", en: "bicycle", topic: "Transportation" },
    { he: "סִירָה", rom: "sira", en: "boat", topic: "Transportation" },
    { he: "כַּרְטִיס", rom: "kartis", en: "ticket", topic: "Transportation" },
    { he: "תַּחֲנָה", rom: "tachana", en: "station", topic: "Transportation" },

    // Work & Professions
    { he: "רוֹפֵא", rom: "rofe", en: "doctor", topic: "Work & Professions" },
    { he: "מוֹרֶה", rom: "more", en: "teacher", topic: "Work & Professions" },
    { he: "תַּלְמִיד", rom: "talmid", en: "student", topic: "Work & Professions" },
    { he: "שׁוֹטֵר", rom: "shoter", en: "police", topic: "Work & Professions" },
    { he: "מִשְׂרָד", rom: "misrad", en: "office", topic: "Work & Professions" },
    { he: "מְנַהֵל", rom: "menahel", en: "boss / manager", topic: "Work & Professions" },

    // More Food
    { he: "תַּפּוּחַ", rom: "tapuach", en: "apple", topic: "Food & Drink" },
    { he: "בָּנָנָה", rom: "banana", en: "banana", topic: "Food & Drink" },
    { עו: "עַגְבָנִיָּה", rom: "agvaniya", en: "tomato", topic: "Food & Drink" },
    { he: "מְלָפְפוֹן", rom: "melafefon", en: "cucumber", topic: "Food & Drink" },
    { he: "גְּבִינָה", rom: "gvina", en: "cheese", topic: "Food & Drink" },
    { he: "עוֹף", rom: "of", en: "chicken", topic: "Food & Drink" },
    { he: "מֶלַח", rom: "melach", en: "salt", topic: "Food & Drink" },
    { he: "סֻכָּר", rom: "sukar", en: "sugar", topic: "Food & Drink" },

    // Nature & Animals (Expansion)
    { he: "כֶּלֶב", rom: "kelev", en: "dog", topic: "Nature & Animals" },
    { he: "חָתוּל", rom: "chatul", en: "cat", topic: "Nature & Animals" },
    { he: "צִפּוֹר", rom: "tzipor", en: "bird", topic: "Nature & Animals" },
    { he: "סוּס", rom: "sus", en: "horse", topic: "Nature & Animals" },
    { he: "עֵץ", rom: "etz", en: "tree", topic: "Nature & Animals" },
    { he: "פֶּרַח", rom: "perach", en: "flower", topic: "Nature & Animals" },
    { he: "שֶׁמֶשׁ", rom: "shemesh", en: "sun", topic: "Nature & Animals" },
    { he: "יָרֵחַ", rom: "yareach", en: "moon", topic: "Nature & Animals" },
    { he: "שָׁמַיִם", rom: "shamayim", en: "sky", topic: "Nature & Animals" },
    { he: "יָם", rom: "yam", en: "sea", topic: "Nature & Animals" },

    // Descriptive Adjectives (Expansion)
    { he: "שָׂמֵחַ", rom: "sameach", en: "happy", topic: "Descriptive (Adjectives)" },
    { he: "עָצוּב", rom: "atzuv", en: "sad", topic: "Descriptive (Adjectives)" },
    { he: "מַהֵר", rom: "maher", en: "fast", topic: "Descriptive (Adjectives)" },
    { he: "לְאַט", rom: "le'at", en: "slow", topic: "Descriptive (Adjectives)" },
    { he: "נָקִי", rom: "naki", en: "clean", topic: "Descriptive (Adjectives)" },
    { he: "מְלוּכְלָךְ", rom: "meluchlach", en: "dirty", topic: "Descriptive (Adjectives)" },
    { he: "יָקָר", rom: "yakar", en: "expensive / dear", topic: "Descriptive (Adjectives)" },
    { he: "זוֹל", rom: "zol", en: "cheap", topic: "Descriptive (Adjectives)" },
    { he: "קָשֶׁה", rom: "kashe", en: "hard / difficult", topic: "Descriptive (Adjectives)" },
    { he: "קַל", rom: "kal", en: "easy / light", topic: "Descriptive (Adjectives)" },

    // Action Verbs (Expansion)
    { he: "לִקְנוֹת", rom: "liknot", en: "to buy", topic: "Action Verbs" },
    { he: "לִמְכּוֹר", rom: "limkor", en: "to sell", topic: "Action Verbs" },
    { he: "לָרוּץ", rom: "larutz", en: "to run", topic: "Action Verbs" },
    { he: "לִקְפּוֹץ", rom: "likpotz", en: "to jump", topic: "Action Verbs" },
    { he: "לִישׁוֹן", rom: "lishon", en: "to sleep", topic: "Action Verbs" },
    { he: "לָקוּם", rom: "lakum", en: "to get up / wake up", topic: "Action Verbs" },
    { he: "לְהָבִין", rom: "lehavin", en: "to understand", topic: "Action Verbs" },
    { he: "לִלְמוֹד", rom: "lilmod", en: "to learn / study", topic: "Action Verbs" },
    { he: "לִשְׁכּוֹחַ", rom: "lishkoach", en: "to forget", topic: "Action Verbs" },
    { he: "לִזְכּוֹר", rom: "lizkor", en: "to remember", topic: "Action Verbs" }
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

inject('src/hebrew_data.js', massiveHebrew);
