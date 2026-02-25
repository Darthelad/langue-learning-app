export const ALPHABET_CATEGORIES = [
    {
        id: "alefbet_consonants",
        label: "Alef-Bet (Consonants)",
        items: [
            { kr: "א", rom: "Alef", exp: "Silent letter. Takes the sound of the vowel attached to it." },
            { kr: "ב", rom: "Bet / Vet", exp: "Like 'b' in 'boy' (with a dot/dagesh) or 'v' in 'van' (without)." },
            { kr: "ג", rom: "Gimel", exp: "Like 'g' in 'go'." },
            { kr: "ד", rom: "Dalet", exp: "Like 'd' in 'dog'." },
            { kr: "ה", rom: "Hei", exp: "Like 'h' in 'hat'." },
            { kr: "ו", rom: "Vav", exp: "Like 'v' in 'van' (also used as vowels 'o' or 'u')." },
            { kr: "ז", rom: "Zayin", exp: "Like 'z' in 'zoo'." },
            { kr: "ח", rom: "Chet", exp: "Guttural sound, like Scottish 'loch' or German 'Bach'." },
            { kr: "ט", rom: "Tet", exp: "Like 't' in 'top'." },
            { kr: "י", rom: "Yod", exp: "Like 'y' in 'yes'." },
            { kr: "כ", rom: "Kaf / Khaf", exp: "Like 'k' (with dot) or guttural 'ch' (without dot)." },
            { kr: "ל", rom: "Lamed", exp: "Like 'l' in 'lion'." },
            { kr: "מ", rom: "Mem", exp: "Like 'm' in 'mother'." },
            { kr: "נ", rom: "Nun", exp: "Like 'n' in 'now'." },
            { kr: "ס", rom: "Samekh", exp: "Like 's' in 'sun'." },
            { kr: "ע", rom: "Ayin", exp: "Silent / guttural stop. Similar to Alef in modern Hebrew." },
            { kr: "פ", rom: "Pei / Fei", exp: "Like 'p' in 'park' (with dot) or 'f' in 'farm' (without)." },
            { kr: "צ", rom: "Tsadi", exp: "Like 'ts' in 'cats'." },
            { kr: "ק", rom: "Qof", exp: "Like 'k' in 'kite'." },
            { kr: "ר", rom: "Resh", exp: "Guttural 'r', similar to French 'R'." },
            { kr: "ש", rom: "Shin / Sin", exp: "Like 'sh' (dot on right) or 's' (dot on left)." },
            { kr: "ת", rom: "Tav", exp: "Like 't' in 'top'." }
        ]
    },
    {
        id: "sofit_letters",
        label: "Final Letters (Sofit)",
        items: [
            { kr: "ך", rom: "Khaf Sofit", exp: "Final form of Khaf. Used only at the end of a word." },
            { kr: "ם", rom: "Mem Sofit", exp: "Final form of Mem." },
            { kr: "ן", rom: "Nun Sofit", exp: "Final form of Nun." },
            { kr: "ף", rom: "Fei Sofit", exp: "Final form of Fei." },
            { kr: "ץ", rom: "Tsadi Sofit", exp: "Final form of Tsadi." }
        ]
    },
    {
        id: "nikkud_vowels",
        label: "Basic Vowels (Nikkud)",
        items: [
            { kr: "אָ", rom: "Kamatz (a/o)", exp: "Usually 'a' as in 'father', sometimes 'o'." },
            { kr: "אַ", rom: "Patach (a)", exp: "Like 'a' in 'father'." },
            { kr: "אֵ", rom: "Tsere (e)", exp: "Like 'e' in 'they'." },
            { kr: "אֶ", rom: "Segol (e)", exp: "Like 'e' in 'pet'." },
            { kr: "אִ", rom: "Hirik (i)", exp: "Like 'ee' in 'see'." },
            { kr: "אוֹ", rom: "Holam (o)", exp: "Like 'o' in 'go'." },
            { kr: "אוּ", rom: "Shuruk (u)", exp: "Like 'oo' in 'boot'." },
            { kr: "אֻ", rom: "Kubutz (u)", exp: "Like 'oo' in 'boot'." }
        ]
    }
];

export const VOCABULARY = [
    { it: "שלום", en: "hello / peace", type: "greeting", category: "Basics" },
    { it: "תודה", en: "thank you", type: "greeting", category: "Basics" },
    { it: "כן", en: "yes", type: "adverb", category: "Basics" },
    { it: "לא", en: "no", type: "adverb", category: "Basics" },
    { it: "מים", en: "water", type: "noun", gender: "m", category: "Food & Drink" },
    { it: "לחם", en: "bread", type: "noun", gender: "m", category: "Food & Drink" },
    { it: "אישה", en: "woman", type: "noun", gender: "f", category: "People" },
    { it: "איש", en: "man", type: "noun", gender: "m", category: "People" },
    { it: "ילד", en: "boy", type: "noun", gender: "m", category: "People" },
    { it: "ילדה", en: "girl", type: "noun", gender: "f", category: "People" },
    { it: "בית", en: "house", type: "noun", gender: "m", category: "Places" },
    { it: "כלב", en: "dog", type: "noun", gender: "m", category: "Animals" },
    { it: "חתול", en: "cat", type: "noun", gender: "m", category: "Animals" },
    { it: "ספר", en: "book", type: "noun", gender: "m", category: "Objects" },
    { it: "טוב", en: "good", type: "adjective", category: "Adjectives" },
    { it: "גדול", en: "big", type: "adjective", category: "Adjectives" },
    { it: "קטן", en: "small", type: "adjective", category: "Adjectives" },
    { it: "אני", en: "I", type: "pronoun", category: "Pronouns" },
    { it: "אתה", en: "you (m.sg)", type: "pronoun", category: "Pronouns" },
    { it: "את", en: "you (f.sg)", type: "pronoun", category: "Pronouns" },
    { it: "הוא", en: "he", type: "pronoun", category: "Pronouns" },
    { it: "היא", en: "she", type: "pronoun", category: "Pronouns" },
    { it: "אנחנו", en: "we", type: "pronoun", category: "Pronouns" }
];

export const CONJUGATIONS = [
    {
        verb: "לאכול (le'echol)",
        en: "to eat",
        tense: "Present (Pa'al)",
        forms: [
            { pronoun: "m.sg (אני/אתה/הוא)", form: "אוכל (ochel)" },
            { pronoun: "f.sg (אני/את/היא)", form: "אוכלת (ochelet)" },
            { pronoun: "m.pl (אנחנו/אתם/הם)", form: "אוכלים (ochlim)" },
            { pronoun: "f.pl (אנחנו/אתן/הן)", form: "אוכלות (ochlot)" }
        ]
    },
    {
        verb: "לדבר (ledaber)",
        en: "to speak",
        tense: "Present (Pi'el)",
        forms: [
            { pronoun: "m.sg", form: "מדבר (medaber)" },
            { pronoun: "f.sg", form: "מדברת (medaberet)" },
            { pronoun: "m.pl", form: "מדברים (medabrim)" },
            { pronoun: "f.pl", form: "מדברות (medabrot)" }
        ]
    },
    {
        verb: "להרגיש (lehargish)",
        en: "to feel",
        tense: "Present (Hif'il)",
        forms: [
            { pronoun: "m.sg", form: "מרגיש (margish)" },
            { pronoun: "f.sg", form: "מרגישה (margisha)" },
            { pronoun: "m.pl", form: "מרגישים (margishim)" },
            { pronoun: "f.pl", form: "מרגישות (margishot)" }
        ]
    }
];

export const GRAMMAR_QUESTIONS = [
    {
        sentence: "אני קורא ספר.",
        en: "I (m) am reading a book.",
        question: "Why is 'קורא' (kore) used here instead of 'קוראת' (koret)?",
        options: [
            "Because the speaker is male (masculine singular).",
            "Because 'book' is masculine.",
            "Because it is in the past tense.",
            "Because it is a plural subject."
        ],
        answer: "Because the speaker is male (masculine singular).",
        explanation: "In Hebrew present tense, verbs conjugate based on the gender and number of the subject. 'קורא' is the masculine singular form of 'to read'."
    },
    {
        sentence: "הילדה היפה הולכת לבית הספר.",
        en: "The beautiful girl goes to the school.",
        question: "How does the adjective 'יפה' (beautiful) agree with the noun 'ילדה' (girl)?",
        options: [
            "It matches in gender (feminine), number (singular), and definiteness (has 'ה').",
            "It only matches in gender.",
            "Adjectives don't change form in Hebrew.",
            "It takes the prefix 'ל'."
        ],
        answer: "It matches in gender (feminine), number (singular), and definiteness (has 'ה').",
        explanation: "In Hebrew, adjectives follow the noun and must agree in gender, number, and definiteness. Since it's 'THE girl' (הילדה), it must be 'THE beautiful' (היפה)."
    }
];

export const IDIOMS = [
    {
        phrase: "על הפנים",
        literal: "On the face",
        meaning: "Terrible, awful, feeling very bad.",
        usage: "Used to describe a bad situation or feeling sick.",
        example: "איך היה המבחן? - על הפנים.",
        category: "Emotions"
    },
    {
        phrase: "חבל על הזמן",
        literal: "Pity on the time",
        meaning: "Amazing, fantastic (slang context).",
        usage: "Ironically, in modern slang, it means something is incredibly good (so good it's a waste of time to describe it).",
        example: "המסעדה הזאת פשוט חבל על הזמן!",
        category: "Slang"
    },
    {
        phrase: "חי בסרט",
        literal: "Lives in a movie",
        meaning: "Delusional, unrealistic.",
        usage: "Said about someone who is completely out of touch with reality.",
        example: "הוא חושב שהוא יתעשר מחר. ממש חי בסרט.",
        category: "Character"
    }
];

export const SENTENCE_BUILD_PROMPTS = [
    { prompt: "Introduce yourself (name, age, where you from).", en_hint: "קוראים לי... אני בן/בת... אני מ...", topic: "introductions" },
    { prompt: "Order a coffee and a pastry at a cafe.", en_hint: "אפשר בבקשה קפה ו...", topic: "food & drink" },
    { prompt: "Ask someone how they are doing today.", en_hint: "מה שלומך היום?", topic: "greetings" }
];

export const CONVERSATION_TOPICS = [
    "Introducing yourself and meeting new people",
    "Ordering food at a market (Shuk)",
    "Talking about the weekend (Shabbat)",
    "Asking for directions in Tel Aviv",
    "Discussing hobbies and sports",
    "Talking about your family"
];
