export const VOCABULARY = [
    { fr: "bonjour", rom: "bon-zhoor", en: "hello", topic: "Basics & Greetings" },
    { fr: "merci", rom: "mer-see", en: "thank you", topic: "Basics & Greetings" },
    { fr: "oui", rom: "wee", en: "yes", topic: "Basics & Greetings" },
    { fr: "non", rom: "nohn", en: "no", topic: "Basics & Greetings" },
    { fr: "pomme", rom: "puhm", en: "apple", topic: "Food & Drink" },
    { fr: "eau", rom: "oh", en: "water", topic: "Food & Drink" },
    { fr: "chat", rom: "shah", en: "cat", topic: "Nature & Animals" },
    { fr: "chien", rom: "shee-en", en: "dog", topic: "Nature & Animals" }
];

export const CONJUGATIONS = [];
export const GRAMMAR_QUESTIONS = [
    {
        sentence: "Je suis étudiant.",
        en: "I am a student.",
        question: "Why is there no article ('un' or 'une') before 'étudiant'?",
        options: [
            "Professions take no article after the verb 'être' in French.",
            "It is a masculine noun.",
            "The article is optional.",
            "Because 'étudiant' starts with a vowel."
        ],
        answer: 0,
        explanation: "In French, when stating someone's profession using the normal subject + être construction (e.g., Je suis étudiant, Il est médecin), the indefinite article is omitted."
    }
];
export const IDIOMS = [];
export const CONVERSATION_TOPICS = [
    "Tes passe-temps (Your hobbies)",
    "Nourriture préférée (Favorite food)",
    "Projets d'avenir (Plans for the future)"
];
export const SENTENCE_BUILD_PROMPTS = [
    { prompt: "Describe what you did this morning.", en_hint: "Use the passé composé.", topic: "daily routine" }
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
