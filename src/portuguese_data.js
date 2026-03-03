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
export const IDIOMS = [
    {
        phrase: "Pão, pão, queijo, queijo",
        literal: "Bread, bread, cheese, cheese",
        meaning: "To call a spade a spade / to tell it like it is",
        usage: "Used when speaking plainly and directly.",
        example: "Comigo é assim: pão, pão, queijo, queijo.",
        category: "Communication"
    },
    {
        phrase: "Falar pelos cotovelos",
        literal: "To speak through the elbows",
        meaning: "To talk someone's ear off / to talk too much",
        usage: "When someone is constantly talking without stopping.",
        example: "A vizinha fala pelos cotovelos!",
        category: "Social Life"
    },
    {
        phrase: "Chorar sobre o leite derramado",
        literal: "To cry over spilled milk",
        meaning: "To cry over spilled milk",
        usage: "Used to say there's no point in being sad over something that can't be undone.",
        example: "Não adianta chorar sobre o leite derramado, vamos focar no futuro.",
        category: "Emotions"
    },
    {
        phrase: "Dar com os burros n'água",
        literal: "To give with the donkeys in the water",
        meaning: "To fail spectacularly / to hit a dead end",
        usage: "When a plan goes wrong.",
        example: "Ele tentou enganar o chefe, mas deu com os burros n'água.",
        category: "Frustration"
    },
    {
        phrase: "Custar os olhos da cara",
        literal: "To cost the eyes of the face",
        meaning: "To cost an arm and a leg",
        usage: "To complain about a very high price.",
        example: "Esse computador novo custou os olhos da cara.",
        category: "Money"
    },
    {
        phrase: "Procurar chifre em cabeça de cavalo",
        literal: "To look for a horn on a horse's head",
        meaning: "To look for problems where there are none / overcomplicate",
        usage: "When someone is being overly suspicious or paranoid.",
        example: "Você está procurando chifre em cabeça de cavalo, não há conspiração nenhuma.",
        category: "Personality & Mind"
    },
    {
        phrase: "Estar com a pulga atrás da orelha",
        literal: "To be with the flea behind the ear",
        meaning: "To be suspicious / to smell a rat",
        usage: "When you suspect something is wrong.",
        example: "Fiquei com a pulga atrás da orelha depois dessa ligação.",
        category: "Emotions"
    },
    {
        phrase: "Lavar as mãos",
        literal: "To wash the hands",
        meaning: "To wash one's hands of the matter",
        usage: "To abdicate responsibility for a situation.",
        example: "Eu avisei que daria errado. Agora, eu lavo as minhas mãos.",
        category: "Work & Business"
    },
    {
        phrase: "Chutar o balde",
        literal: "To kick the bucket",
        meaning: "To lose one's temper / give up completely",
        usage: "Note: Unlike in English, this does NOT mean 'to die'. It means to throw a fit or abandon a task in frustration.",
        example: "Fiquei tão irritado com o projeto que quase chutei o balde.",
        category: "Anger"
    },
    {
        phrase: "Bater as botas",
        literal: "To hit the boots",
        meaning: "To kick the bucket / to die",
        usage: "A colloquial, slightly irreverent way to say someone died.",
        example: "Infelizmente, o cachorro do vizinho bateu as botas.",
        category: "Food & Daily Life"
    }
];
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
