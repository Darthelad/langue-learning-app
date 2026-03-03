export const VOCABULARY = [
    { pt: "olá", rom: "o-la", en: "hello", topic: "Basics & Greetings" },
    { pt: "obrigado", rom: "o-bri-ga-do", en: "thank you", topic: "Basics & Greetings" },
    { pt: "sim", rom: "sim", en: "yes", topic: "Basics & Greetings" },
    { pt: "não", rom: "nao", en: "no", topic: "Basics & Greetings" },
    { pt: "maçã", rom: "ma-sa", en: "apple", topic: "Food & Drink" },
    { pt: "água", rom: "a-gua", en: "water", topic: "Food & Drink" },
    { pt: "gato", rom: "ga-to", en: "cat", topic: "Nature & Animals" },
    { pt: "cachorro", rom: "ca-chor-ro", en: "dog", topic: "Nature & Animals" }
];

export const CONJUGATIONS = [];
export const GRAMMAR_QUESTIONS = [
    {
        sentence: "Eu sou estudante.",
        en: "I am a student.",
        question: "Why do we use 'sou' instead of 'estou' here?",
        options: [
            "'Sou' is used for temporary states.",
            "'Sou' is from the verb 'ser', used for permanent characteristics like professions.",
            "'Estou' is only used for locations.",
            "They are interchangeable."
        ],
        answer: 1,
        explanation: "Portuguese has two verbs for 'to be': 'ser' (permanent/identity) and 'estar' (temporary/location). Being a student is treated as an identity/profession, so 'ser' (sou) is used."
    }
];
export const IDIOMS = [];
export const CONVERSATION_TOPICS = [
    "Teus passatempos (Your hobbies)",
    "Comida favorita (Favorite food)",
    "Planos para o futuro (Plans for the future)"
];
export const SENTENCE_BUILD_PROMPTS = [
    { prompt: "Describe what you did this morning.", en_hint: "Use the Pretérito Perfeito.", topic: "daily routine" }
];
export const VIDEOS = [];
export const CULTURE = [];

export const PROGRESSION = [
    "Basics & Greetings",
    "Food & Drink",
    "Nature & Animals",
    "Numbers & Math",
    "Time & Calendar",
    "Action Verbs",
    "Descriptive (Adjectives)",
    "People & Family",
    "House & Home",
    "City & Places",
    "Transportation",
    "Abstract Concepts",
    "Misc & Core Vocab"
];
