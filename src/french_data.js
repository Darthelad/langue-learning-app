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
export const IDIOMS = [
    {
        phrase: "Poser un lapin",
        literal: "To put a rabbit",
        meaning: "To stand someone up",
        usage: "Used when someone didn't show up for a date or meeting.",
        example: "Il ne viendra pas, je crois qu'il m'a posé un lapin.",
        category: "Social Life"
    },
    {
        phrase: "Avoir le cafard",
        literal: "To have the cockroach",
        meaning: "To feel down / depressed / homesick",
        usage: "To describe feeling a bit sad or melancholic.",
        example: "J'ai un peu le cafard aujourd'hui avec ce temps.",
        category: "Emotions"
    },
    {
        phrase: "Revenons à nos moutons",
        literal: "Let us return to our sheep",
        meaning: "Let's get back to the topic at hand",
        usage: "When a conversation has derailed and you want to refocus.",
        example: "Bref, revenons à nos moutons, qu'en est-il du projet ?",
        category: "Communication"
    },
    {
        phrase: "Quand les poules auront des dents",
        literal: "When chickens will have teeth",
        meaning: "When pigs fly / never",
        usage: "To express something that is impossible or highly unlikely.",
        example: "Il sera à l'heure quand les poules auront des dents.",
        category: "Opportunity"
    },
    {
        phrase: "Couper les cheveux en quatre",
        literal: "To cut hair in four",
        meaning: "To split hairs / to overcomplicate things",
        usage: "When someone is being unnecessarily pedantic or overthinking.",
        example: "Ne coupe pas les cheveux en quatre, c'est simple !",
        category: "Personality & Mind"
    },
    {
        phrase: "Avoir la moutarde qui monte au nez",
        literal: "To have mustard going up the nose",
        meaning: "To lose one's temper / get angry",
        usage: "When someone is starting to lose their patience.",
        example: "Arrête de l'embêter, la moutarde lui monte au nez.",
        category: "Anger"
    },
    {
        phrase: "Coûter les yeux de la tête",
        literal: "To cost the eyes of the head",
        meaning: "To cost an arm and a leg / be extremely expensive",
        usage: "To complain about a high price.",
        example: "Cette voiture m'a coûté les yeux de la tête.",
        category: "Money"
    },
    {
        phrase: "Jeter l'éponge",
        literal: "To throw the sponge",
        meaning: "To throw in the towel / give up",
        usage: "When someone abandons trying to do something difficult.",
        example: "C'est trop dur, je jette l'éponge.",
        category: "Work & Business"
    },
    {
        phrase: "Tomber dans les pommes",
        literal: "To fall in the apples",
        meaning: "To faint or pass out",
        usage: "When someone loses consciousness.",
        example: "Il a vu du sang et il est tombé dans les pommes.",
        category: "Food & Daily Life"
    },
    {
        phrase: "Appeler un chat un chat",
        literal: "To call a cat a cat",
        meaning: "To call a spade a spade / speak plainly",
        usage: "To speak directly and honestly about something unpleasant.",
        example: "Il faut appeler un chat un chat, c'est un échec.",
        category: "Communication"
    }
];
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
