export const VOCABULARY = [
    { ru: "привет", rom: "privet", en: "hello", topic: "Basics & Greetings" },
    { ru: "спасибо", rom: "spasibo", en: "thank you", topic: "Basics & Greetings" },
    { ru: "да", rom: "da", en: "yes", topic: "Basics & Greetings" },
    { ru: "нет", rom: "net", en: "no", topic: "Basics & Greetings" },
    { ru: "яблоко", rom: "yabloko", en: "apple", topic: "Food & Drink" },
    { ru: "вода", rom: "voda", en: "water", topic: "Food & Drink" },
    { ru: "кот", rom: "kot", en: "cat", topic: "Nature & Animals" },
    { ru: "собака", rom: "sobaka", en: "dog", topic: "Nature & Animals" }
];

export const CONJUGATIONS = [];
export const GRAMMAR_QUESTIONS = [
    {
        sentence: "Я хочу стать врачом.",
        en: "I want to become a doctor.",
        question: "Why is 'врачом' (doctor) in the Instrumental case?",
        options: [
            "It is the direct object of the sentence.",
            "After verbs of becoming and being (стать, быть), the predicate is typically in the Instrumental case.",
            "It indicates motion towards the doctor.",
            "It shows possession."
        ],
        answer: 1,
        explanation: "In Russian, nouns that follow verbs denoting a change of state, profession, or being (like стать - 'to become' or быть - 'to be' in past/future) are placed in the Instrumental case."
    },
    {
        sentence: "Завтра мы идём в кино, а потом едем в Москву.",
        en: "Tomorrow we are walking to the cinema, and then driving to Moscow.",
        question: "What is the specific difference between 'идти' (to go) and 'ехать' (to go)?",
        options: [
            "'Идти' means to go on foot, while 'ехать' means to go by a vehicle.",
            "'Идти' is for the future tense, 'ехать' is for the past.",
            "'Идти' means to go by a vehicle, 'ехать' means to go on foot.",
            "There is no difference; they are perfect synonyms."
        ],
        answer: 0,
        explanation: "Russian verbs of motion distinguish between mode of transport. 'Идти' means walking or moving under one's own power, whereas 'ехать' specifies using transport."
    },
    {
        sentence: "Он читал книгу, но не прочитал её.",
        en: "He was reading the book, but didn't finish reading it.",
        question: "What grammatical concept is demonstrated by the verbs 'читал' and 'прочитал'?",
        options: [
            "Gender agreement",
            "Case declension",
            "Verbal aspect (Imperfective vs. Perfective)",
            "Mood (Indicative vs. Subjunctive)"
        ],
        answer: 2,
        explanation: "'Читал' is imperfective (focuses on the process of reading), while 'прочитал' is perfective (focuses on the completion/result of the action)."
    },
    {
        sentence: "Я вижу красивую девушку.",
        en: "I see a beautiful girl.",
        question: "What cases are 'красивую девушку' in?",
        options: [
            "Nominative",
            "Genitive",
            "Dative",
            "Accusative"
        ],
        answer: 3,
        explanation: "They are in the Accusative case, serving as the direct object of the verb 'вижу' (to see). For feminine singular nouns ending in -а, the Accusative ending is -у."
    },
    {
        sentence: "У меня есть брат.",
        en: "I have a brother.",
        question: "Literally translated, what is the structure of this Russian sentence?",
        options: [
            "I possess a brother.",
            "To me there is a brother.",
            "By me there is a brother.",
            "My brother is here."
        ],
        answer: 2,
        explanation: "Russian lacks a direct equivalent to the verb 'to have'. Instead, it uses the preposition 'У' (by/at) + Genitive pronoun 'меня' (me) + 'есть' (is/exists) + Nominative subject 'брат' (brother)."
    }
];
export const IDIOMS = [
    {
        phrase: "Делать из мухи слона",
        literal: "To make an elephant out of a fly",
        meaning: "To make a mountain out of a molehill / to exaggerate",
        usage: "Use this when someone is overreacting to a small problem.",
        example: "Не делай из мухи слона, это всего лишь царапина!",
        category: "Frustration"
    },
    {
        phrase: "Водить за нос",
        literal: "To lead by the nose",
        meaning: "To deceive or trick someone",
        usage: "Used when someone is stringing you along with false promises.",
        example: "Он меня уже месяц водит за нос с этими деньгами.",
        category: "Social Life"
    },
    {
        phrase: "Без сучка, без задоринки",
        literal: "Without a knot, without a snag",
        meaning: "Without a hitch / perfectly smoothly",
        usage: "To describe an event or plan that goes perfectly.",
        example: "Концерт прошел без сучка, без задоринки.",
        category: "Work & Business"
    },
    {
        phrase: "Как две капли воды",
        literal: "Like two drops of water",
        meaning: "Like two peas in a pod / exactly alike",
        usage: "To describe two people or things that look identical.",
        example: "Братья похожи как две капли воды.",
        category: "People & Family"
    },
    {
        phrase: "Витать в облаках",
        literal: "To hover in the clouds",
        meaning: "To have one's head in the clouds / be daydreaming",
        usage: "To describe someone not paying attention.",
        example: "На уроке он постоянно витает в облаках.",
        category: "Personality & Mind"
    },
    {
        phrase: "Ни пуха ни пера!",
        literal: "Neither down nor feather!",
        meaning: "Break a leg! / Good luck!",
        usage: "Said to someone before an exam or big performance.",
        response: "К чёрту! (To the devil!)",
        example: "Завтра экзамен. Ни пуха ни пера!",
        category: "Opportunity"
    },
    {
        phrase: "Бить баклуши",
        literal: "To beat wooden blocks",
        meaning: "To twiddle one's thumbs / to slack off",
        usage: "To complain about someone who is lazy or avoiding work.",
        example: "Хватит бить баклуши, пора работать!",
        category: "Work & Business"
    },
    {
        phrase: "Заморить червячка",
        literal: "To starve the little worm",
        meaning: "To take the edge off one's hunger / grab a bite",
        usage: "Said when you want to eat a small snack before a main meal.",
        example: "Давай заморим червячка перед ужином.",
        category: "Food & Daily Life"
    },
    {
        phrase: "Когда рак на горе свистнет",
        literal: "When the crayfish whistles on the mountain",
        meaning: "When pigs fly / never",
        usage: "To express that something will never happen.",
        example: "Он вернет долг, только когда рак на горе свистнет.",
        category: "Social Life"
    },
    {
        phrase: "Вешать лапшу на уши",
        literal: "To hang noodles on the ears",
        meaning: "To tell tall tales / to lie or deceive",
        usage: "To accuse someone of blatantly lying to you.",
        example: "Хватит вешать мне лапшу на уши, я знаю правду!",
        category: "Communication"
    }
];
export const CONVERSATION_TOPICS = [
    "Твои увлечения и хобби (Your hobbies and interests)",
    "Любимая еда и рестораны (Favorite food and restaurants)",
    "Планы на будущее (Plans for the future)",
    "Русская литература и кино (Russian literature and cinema)",
    "Твой родной город (Your hometown)",
];
export const SENTENCE_BUILD_PROMPTS = [
    { prompt: "Describe what you did this morning.", en_hint: "Use past tense perfective or imperfective verbs depending on completion", topic: "daily routine" },
    { prompt: "Say where you live and what your city is like.", en_hint: "Use 'Я живу в...' (Prepositional case)", topic: "city" },
    { prompt: "Ask someone how much a ticket costs.", en_hint: "Use 'Сколько стоит...?'", topic: "shopping" },
    { prompt: "Explain that you like listening to Russian music.", en_hint: "Use 'Мне нравится слушать...' + Accusative", topic: "preferences" },
    { prompt: "Tell a friend you are going to the store.", en_hint: "Use 'Я иду в...' (Accusative for destination)", topic: "errands" },
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
