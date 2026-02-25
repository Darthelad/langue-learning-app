export const HANGUL_CATEGORIES = [
    {
        id: "basic_consonants",
        label: "Basic Consonants",
        items: [
            { kr: "ㄱ", rom: "g/k", exp: "Like 'g' in 'go' or 'k' in 'kite'." },
            { kr: "ㄴ", rom: "n", exp: "Like 'n' in 'now'." },
            { kr: "ㄷ", rom: "d / t", exp: "Like 'd' in 'dog' or 't' in 'top'." },
            { kr: "ㄹ", rom: "r / l", exp: "Between an 'r' and an 'l' (like the Spanish flipped r)." },
            { kr: "ㅁ", rom: "m", exp: "Like 'm' in 'mother'." },
            { kr: "ㅂ", rom: "b/p", exp: "Like 'b' in 'boy' or 'p' in 'park'." },
            { kr: "ㅅ", rom: "s/sh", exp: "Like 's' in 'sun' (or 'sh' before 'i')." },
            { kr: "ㅇ", rom: "ng", exp: "Silent at the beginning of a syllable. Like 'ng' in 'song' at the end." },
            { kr: "ㅈ", rom: "j / ch", exp: "Like 'j' in 'jump' or 'ch' in 'cheese'." },
            { kr: "ㅊ", rom: "ch", exp: "A strongly aspirated 'ch'." },
            { kr: "ㅋ", rom: "k", exp: "A strongly aspirated 'k'." },
            { kr: "ㅌ", rom: "t", exp: "A strongly aspirated 't'." },
            { kr: "ㅍ", rom: "p", exp: "A strongly aspirated 'p'." },
            { kr: "ㅎ", rom: "h", exp: "Like 'h' in 'hat'." }
        ]
    },
    {
        id: "double_consonants",
        label: "Double (Tense) Consonants",
        items: [
            { kr: "ㄲ", rom: "kk", exp: "Tense 'k'. Pronounced with stiffened vocal cords, no air puff." },
            { kr: "ㄸ", rom: "tt", exp: "Tense 't'. Pronounced with stiffened vocal cords, no air puff." },
            { kr: "ㅃ", rom: "pp", exp: "Tense 'p'. Pronounced with stiffened vocal cords, no air puff." },
            { kr: "ㅆ", rom: "ss", exp: "Tense 's'. Pronounced with stiffened vocal cords." },
            { kr: "ㅉ", rom: "jj", exp: "Tense 'j'. Pronounced with stiffened vocal cords." }
        ]
    },
    {
        id: "basic_vowels",
        label: "Basic Vowels",
        items: [
            { kr: "ㅏ", rom: "a", exp: "Like 'a' in 'father'." },
            { kr: "ㅑ", rom: "ya", exp: "Like 'ya' in 'yacht'." },
            { kr: "ㅓ", rom: "eo", exp: "Like 'uh' in 'oh no' (but with lips unrounded)." },
            { kr: "ㅕ", rom: "yeo", exp: "Like 'yu' in 'yummy'." },
            { kr: "ㅗ", rom: "o", exp: "Like 'o' in 'go'." },
            { kr: "ㅛ", rom: "yo", exp: "Like 'yo' in 'yo-yo'." },
            { kr: "ㅜ", rom: "u", exp: "Like 'oo' in 'boot'." },
            { kr: "ㅠ", rom: "yu", exp: "Like 'you'." },
            { kr: "ㅡ", rom: "eu", exp: "Like the sound of disgust 'ugh', with spreading lips." },
            { kr: "ㅣ", rom: "i", exp: "Like 'ee' in 'see'." }
        ]
    },
    {
        id: "complex_vowels",
        label: "Complex Vowels",
        items: [
            { kr: "ㅐ", rom: "ae", exp: "Like 'e' in 'pet' or 'a' in 'cat'." },
            { kr: "ㅒ", rom: "yae", exp: "Like 'ya' in 'yam'." },
            { kr: "ㅔ", rom: "e", exp: "Like 'e' in 'pet'. Often practically identical to 'ㅐ' today." },
            { kr: "ㅖ", rom: "ye", exp: "Like 'ye' in 'yes'." },
            { kr: "ㅘ", rom: "wa", exp: "Like 'wa' in 'wander'." },
            { kr: "ㅙ", rom: "wae", exp: "Like 'we' in 'wedding'." },
            { kr: "ㅚ", rom: "oe", exp: "Like 'we' in 'wedding'." },
            { kr: "ㅝ", rom: "wo", exp: "Like 'wa' in 'water'." },
            { kr: "ㅞ", rom: "we", exp: "Like 'we' in 'wedding'." },
            { kr: "ㅟ", rom: "wi", exp: "Like 'we'." },
            { kr: "ㅢ", rom: "ui", exp: "Combine 'eu' and 'ee' quickly." }
        ]
    }
];

export const VOCABULARY = [
    { it: "안녕하세요", en: "hello", type: "greeting", category: "Basics" },
    { it: "감사합니다", en: "thank you (formal)", type: "greeting", category: "Basics" },
    { it: "네", en: "yes", type: "adverb", category: "Basics" },
    { it: "아니요", en: "no", type: "adverb", category: "Basics" },
    { it: "물", en: "water", type: "noun", gender: "n/a", category: "Food & Drink" },
    { it: "밥", en: "rice / meal", type: "noun", gender: "n/a", category: "Food & Drink" },
    { it: "사람", en: "person", type: "noun", gender: "n/a", category: "People" },
    { it: "친구", en: "friend", type: "noun", gender: "n/a", category: "People" },
    { it: "집", en: "house", type: "noun", gender: "n/a", category: "Places" },
    { it: "학교", en: "school", type: "noun", gender: "n/a", category: "Places" },
    { it: "개", en: "dog", type: "noun", gender: "n/a", category: "Animals" },
    { it: "고양이", en: "cat", type: "noun", gender: "n/a", category: "Animals" },
    { it: "책", en: "book", type: "noun", gender: "n/a", category: "Objects" },
    { it: "좋다", en: "good", type: "adjective", category: "Adjectives" },
    { it: "크다", en: "big", type: "adjective", category: "Adjectives" },
    { it: "작다", en: "small", type: "adjective", category: "Adjectives" },
    { it: "저", en: "I (formal)", type: "pronoun", category: "Pronouns" },
    { it: "나", en: "I (informal)", type: "pronoun", category: "Pronouns" }
];

// Korean verbs don't conjugate by pronoun, but by politeness level and tense.
export const CONJUGATIONS = [
    {
        verb: "먹다 (meokda)",
        en: "to eat",
        tense: "Present Tense",
        forms: [
            { pronoun: "Formal (존댓말)", form: "먹습니다 (meokseumnida)" },
            { pronoun: "Standard (요)", form: "먹어요 (meogeoyo)" },
            { pronoun: "Casual (반말)", form: "먹어 (meogeo)" },
            { pronoun: "Honorific", form: "드십니다 (deusimnida)" }
        ]
    },
    {
        verb: "가다 (gada)",
        en: "to go",
        tense: "Present Tense",
        forms: [
            { pronoun: "Formal (존댓말)", form: "갑니다 (gamnida)" },
            { pronoun: "Standard (요)", form: "가요 (gayo)" },
            { pronoun: "Casual (반말)", form: "가 (ga)" },
            { pronoun: "Honorific", form: "가십니다 (gasimnida)" }
        ]
    },
    {
        verb: "하다 (hada)",
        en: "to do",
        tense: "Present Tense",
        forms: [
            { pronoun: "Formal (존댓말)", form: "합니다 (hamnida)" },
            { pronoun: "Standard (요)", form: "해요 (haeyo)" },
            { pronoun: "Casual (반말)", form: "해 (hae)" },
            { pronoun: "Honorific", form: "하십니다 (hasimnida)" }
        ]
    }
];

export const GRAMMAR_QUESTIONS = [
    {
        sentence: "저는 사과를 먹어요.",
        en: "I eat an apple.",
        question: "What is the function of '를' (reul) in '사과를'?",
        options: [
            "Topic marker",
            "Subject marker",
            "Object marker",
            "Location marker"
        ],
        answer: "Object marker",
        explanation: "'을/를' is the object marking particle in Korean. It attaches to the noun that is receiving the action. '를' is used after vowels, and '을' is used after consonants."
    },
    {
        sentence: "학교에 갑니다.",
        en: "I go to school.",
        question: "What is the function of '에' (e) in this sentence?",
        options: [
            "Subject marker",
            "Time or Location marker (destination)",
            "Object marker",
            "Topic marker"
        ],
        answer: "Time or Location marker (destination)",
        explanation: "'에' indicates a specific time, a static location, or the destination you are going toward (to)."
    }
];

export const IDIOMS = [
    {
        phrase: "식은 죽 먹기",
        literal: "Eating cold porridge",
        meaning: "A piece of cake, very easy to do.",
        usage: "Use this when a task is incredibly simple.",
        example: "그 시험은 식은 죽 먹기였어요.",
        category: "Humor"
    },
    {
        phrase: "눈이 높다",
        literal: "Eyes are high",
        meaning: "To have high standards (especially in dating or shopping).",
        usage: "Used to describe someone who is very picky.",
        example: "제 친구는 눈이 너무 높아서 아직 싱글이에요.",
        category: "Character"
    },
    {
        phrase: "귀가 얇다",
        literal: "Ears are thin",
        meaning: "Gullible, easily persuaded by others.",
        usage: "Used for someone who believes whatever they hear.",
        example: "그는 귀가 얇아서 사기를 당하기 쉬워요.",
        category: "Personality & Mind"
    }
];

export const SENTENCE_BUILD_PROMPTS = [
    { prompt: "Introduce yourself formally (name, nationality).", en_hint: "Use 저는 [name]입니다.", topic: "introductions" },
    { prompt: "Order a coffee and ask how much it is.", en_hint: "커피 한 잔 주시고, 얼마예요?", topic: "food & drink" },
    { prompt: "Tell a friend what you did yesterday using standard politeness (요 form).", en_hint: "Use past tense: ~았/었어요.", topic: "daily routine" }
];

export const CONVERSATION_TOPICS = [
    "Introducing yourself and talking about hobbies",
    "Ordering food in a Korean restaurant",
    "Asking for directions to the subway station",
    "Talking about your weekend plans",
    "Discussing favorite movies and music (K-Pop/K-Dramas)"
];
