export const VOCABULARY = [
    { en: "hello", rom: "hello", translated: "hello", topic: "Basics & Greetings" },
    { en: "thank you", rom: "thank you", translated: "thank you", topic: "Basics & Greetings" },
    { en: "yes", rom: "yes", translated: "yes", topic: "Basics & Greetings" },
    { en: "no", rom: "no", translated: "no", topic: "Basics & Greetings" },
    { en: "apple", rom: "apple", translated: "apple", topic: "Food & Drink" },
    { en: "water", rom: "water", translated: "water", topic: "Food & Drink" },
    { en: "cat", rom: "cat", translated: "cat", topic: "Nature & Animals" },
    { en: "dog", rom: "dog", translated: "dog", topic: "Nature & Animals" }
];

export const CONJUGATIONS = [];
export const GRAMMAR_QUESTIONS = [
    {
        sentence: "They left their jackets over there because they're going inside.",
        en: "Pronoun usage",
        question: "Which of the following correctly describes 'their', 'there', and 'they're'?",
        options: [
            "'Their' is a place, 'there' is possessive, 'they're' is a contraction.",
            "'Their' is possessive, 'there' is a place, 'they're' is a contraction.",
            "'Their' is a contraction, 'there' is possessive, 'they're' is a place.",
            "They are entirely interchangeable."
        ],
        answer: 1,
        explanation: "'Their' implies ownership, 'there' refers to location, and 'they're' is short for 'they are'."
    },
    {
        sentence: "How much water do we need, and how many apples should I buy?",
        en: "Quantifiers",
        question: "Why do we use 'much' for water and 'many' for apples?",
        options: [
            "'Much' is for liquids, 'many' is for solids.",
            "'Much' is used in questions, 'many' is for statements.",
            "'Much' is for uncountable nouns, 'many' is for countable nouns.",
            "'Much' is plural, 'many' is singular."
        ],
        answer: 2,
        explanation: "Water cannot be individually counted (uncountable), so we use 'much'. Apples can be counted individually, so we use 'many'."
    },
    {
        sentence: "I have been living in London for five years.",
        en: "Verb Tenses",
        question: "What tense is used in this sentence?",
        options: [
            "Present Simple",
            "Present Perfect Continuous",
            "Past Continuous",
            "Future Perfect"
        ],
        answer: 1,
        explanation: "'Have been living' is the Present Perfect Continuous tense. It is used to describe an action that started in the past and continues into the present."
    },
    {
        sentence: "She is the woman whom I met yesterday.",
        en: "Relative Pronouns",
        question: "Why is 'whom' used instead of 'who'?",
        options: [
            "'Whom' is the subject of the clause.",
            "'Whom' is the object of the verb 'met'.",
            "'Who' can only be used for men.",
            "'Whom' is plural."
        ],
        answer: 1,
        explanation: "'Whom' functions as the object of the verb. If the pronoun is the subject, use 'who' (e.g., 'She is the woman who met me')."
    },
    {
        sentence: "An apple a day keeps the doctor away.",
        en: "Articles",
        question: "Why do we use 'an' before apple instead of 'a'?",
        options: [
            "Because 'apple' is an important word.",
            "Because 'apple' starts with a vowel sound.",
            "Because 'a' is only for plural words.",
            "It is a random exception."
        ],
        answer: 1,
        explanation: "In English, the indefinite article 'an' is used before words that begin with a vowel sound to make pronunciation smoother."
    }
];
export const IDIOMS = [];
export const CONVERSATION_TOPICS = [
    "Your favorite travel destinations",
    "The best food you've ever eaten",
    "What you do for a living or study",
    "Your hobbies and interests",
    "A memorable experience from childhood",
];
export const SENTENCE_BUILD_PROMPTS = [
    { prompt: "Describe what you did this morning.", en_hint: "Use the past simple tense (e.g., I woke up, I ate)", topic: "daily routine" },
    { prompt: "Say what you would do if you won the lottery.", en_hint: "Use the second conditional (if + past, would + verb)", topic: "hypothetical" },
    { prompt: "Ask a friend if they want to get coffee later.", en_hint: "Use 'Do you want to...' or 'Would you like to...'", topic: "invitation" },
    { prompt: "Explain why you are studying English.", en_hint: "Use 'because' + reason", topic: "study" },
    { prompt: "Describe your favorite movie and why you like it.", en_hint: "Use descriptive adjectives and present simple", topic: "entertainment" },
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
