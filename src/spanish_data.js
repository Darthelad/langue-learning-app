export const VOCABULARY = [
    // Basic Greetings & Essentials
    { it: "Hola", en: "Hello / Hi", category: "Greetings" },
    { it: "Adiós", en: "Goodbye", category: "Greetings" },
    { it: "Por favor", en: "Please", category: "Essentials" },
    { it: "Gracias", en: "Thank you", category: "Essentials" },
    { it: "De nada", en: "You're welcome", category: "Essentials" },
    { it: "Sí", en: "Yes", category: "Essentials" },
    { it: "No", en: "No", category: "Essentials" },
    { it: "Buenos días", en: "Good morning", category: "Greetings" },
    { it: "Buenas tardes", en: "Good afternoon", category: "Greetings" },
    { it: "Buenas noches", en: "Good evening / good night", category: "Greetings" },
    { it: "¿Cómo estás?", en: "How are you? (informal)", category: "Greetings" },
    { it: "Bien, gracias", en: "Fine, thank you", category: "Essentials" },
    { it: "Perdón / Disculpa", en: "Excuse me / Sorry", category: "Essentials" },

    // Numbers
    { it: "Uno", en: "1", category: "Numbers" },
    { it: "Dos", en: "2", category: "Numbers" },
    { it: "Tres", en: "3", category: "Numbers" },
    { it: "Cuatro", en: "4", category: "Numbers" },
    { it: "Cinco", en: "5", category: "Numbers" },
    { it: "Diez", en: "10", category: "Numbers" },
    { it: "Veinte", en: "20", category: "Numbers" },

    // Days & Time
    { it: "Hoy", en: "Today", category: "Time" },
    { it: "Mañana", en: "Tomorrow", category: "Time" },
    { it: "Ayer", en: "Yesterday", category: "Time" },
    { it: "Lunes", en: "Monday", category: "Days" },
    { it: "Martes", en: "Tuesday", category: "Days" },
    { it: "Miércoles", en: "Wednesday", category: "Days" },
    { it: "Jueves", en: "Thursday", category: "Days" },
    { it: "Viernes", en: "Friday", category: "Days" },
    { it: "Sábado", en: "Saturday", category: "Days" },
    { it: "Domingo", en: "Sunday", category: "Days" },

    // Common Verbs (Infinitive)
    { it: "Ser", en: "To be (permanent)", category: "Verbs" },
    { it: "Estar", en: "To be (temporary)", category: "Verbs" },
    { it: "Tener", en: "To have", category: "Verbs" },
    { it: "Hacer", en: "To do / make", category: "Verbs" },
    { it: "Ir", en: "To go", category: "Verbs" },
    { it: "Poder", en: "To be able to / can", category: "Verbs" },
    { it: "Decir", en: "To say / tell", category: "Verbs" },
    { it: "Venir", en: "To come", category: "Verbs" },
    { it: "Querer", en: "To want", category: "Verbs" },
    { it: "Saber", en: "To know (facts/info)", category: "Verbs" },
    { it: "Comer", en: "To eat", category: "Verbs" },
    { it: "Beber", en: "To drink", category: "Verbs" },
    { it: "Hablar", en: "To speak / talk", category: "Verbs" },

    // Food & Drink
    { it: "El agua", en: "Water", category: "Food" },
    { it: "El pan", en: "Bread", category: "Food" },
    { it: "El café", en: "Coffee", category: "Food" },
    { it: "El vino", en: "Wine", category: "Food" },
    { it: "La cerveza", en: "Beer", category: "Food" },
    { it: "La carne", en: "Meat", category: "Food" },
    { it: "El pollo", en: "Chicken", category: "Food" },
    { it: "El pescado", en: "Fish", category: "Food" },
    { it: "El queso", en: "Cheese", category: "Food" },
    { it: "La naranja", en: "Orange", category: "Food" },
    { it: "La manzana", en: "Apple", category: "Food" },

    // Places & Travel
    { it: "El baño", en: "Bathroom", category: "Places" },
    { it: "El restaurante", en: "Restaurant", category: "Places" },
    { it: "El hotel", en: "Hotel", category: "Places" },
    { it: "El aeropuerto", en: "Airport", category: "Places" },
    { it: "La estación", en: "Station", category: "Places" },
    { it: "La casa", en: "House / Home", category: "Places" },
    { it: "La calle", en: "Street", category: "Places" },

    // Transport
    { it: "El coche", en: "Car", category: "Transport" },
    { it: "El autobús", en: "Bus", category: "Transport" },
    { it: "El tren", en: "Train", category: "Transport" },
    { it: "El avión", en: "Airplane", category: "Transport" }
];

export const CONJUGATIONS = [
    {
        verb: "Ser",
        en: "To be (permanent)",
        tense: "Present Indicative",
        pronouns: ["Yo", "Tú", "Él/Ella/Ud.", "Nosotros", "Vosotros", "Ellos/Uds."],
        answers: ["soy", "eres", "es", "somos", "sois", "son"]
    },
    {
        verb: "Estar",
        en: "To be (temporary)",
        tense: "Present Indicative",
        pronouns: ["Yo", "Tú", "Él/Ella/Ud.", "Nosotros", "Vosotros", "Ellos/Uds."],
        answers: ["estoy", "estás", "está", "estamos", "estáis", "están"]
    },
    {
        verb: "Tener",
        en: "To have",
        tense: "Present Indicative",
        pronouns: ["Yo", "Tú", "Él/Ella/Ud.", "Nosotros", "Vosotros", "Ellos/Uds."],
        answers: ["tengo", "tienes", "tiene", "tenemos", "tenéis", "tienen"]
    },
    {
        verb: "Hacer",
        en: "To do / make",
        tense: "Present Indicative",
        pronouns: ["Yo", "Tú", "Él/Ella/Ud.", "Nosotros", "Vosotros", "Ellos/Uds."],
        answers: ["hago", "haces", "hace", "hacemos", "hacéis", "hacen"]
    },
    {
        verb: "Ir",
        en: "To go",
        tense: "Present Indicative",
        pronouns: ["Yo", "Tú", "Él/Ella/Ud.", "Nosotros", "Vosotros", "Ellos/Uds."],
        answers: ["voy", "vas", "va", "vamos", "vais", "van"]
    },
    {
        verb: "Hablar",
        en: "To speak (Regular -ar)",
        tense: "Present Indicative",
        pronouns: ["Yo", "Tú", "Él/Ella/Ud.", "Nosotros", "Vosotros", "Ellos/Uds."],
        answers: ["hablo", "hablas", "habla", "hablamos", "habláis", "hablan"]
    },
    {
        verb: "Comer",
        en: "To eat (Regular -er)",
        tense: "Present Indicative",
        pronouns: ["Yo", "Tú", "Él/Ella/Ud.", "Nosotros", "Vosotros", "Ellos/Uds."],
        answers: ["como", "comes", "come", "comemos", "coméis", "comen"]
    },
    {
        verb: "Vivir",
        en: "To live (Regular -ir)",
        tense: "Present Indicative",
        pronouns: ["Yo", "Tú", "Él/Ella/Ud.", "Nosotros", "Vosotros", "Ellos/Uds."],
        answers: ["vivo", "vives", "vive", "vivimos", "vivís", "viven"]
    }
];

export const GRAMMAR_QUESTIONS = [
    {
        question: "Which form of 'To be' is used for permanent characteristics in Spanish?",
        options: ["Ser", "Estar", "Haber", "Tener"],
        answer: "Ser",
        explanation: "'Ser' is used for permanent characteristics (identity, occupation, origin), while 'Estar' is used for temporary states or locations."
    },
    {
        question: "Which is the correct definite article for 'agua' (water) in the singular?",
        options: ["La", "El", "Los", "Las"],
        answer: "El",
        explanation: "Even though 'agua' is feminine, it uses 'El' in the singular form ('el agua') to avoid the clash of the two 'a' sounds since 'agua' starts with a stressed 'a'."
    },
    {
        question: "Complete the sentence: 'Yo _____ cansado.' (I am tired - male speaker)",
        options: ["soy", "estoy", "tengo", "hago"],
        answer: "estoy",
        explanation: "Being tired is a temporary condition, so we use the verb 'Estar'. 'Yo estoy cansado'."
    },
    {
        question: "Translate: 'I am 20 years old.'",
        options: ["Yo soy 20 años.", "Yo estoy 20 años.", "Yo tengo 20 años.", "Mi edad es 20 años."],
        answer: "Yo tengo 20 años.",
        explanation: "In Spanish, you don't 'be' an age, you 'have' an age. So we use 'Tener' (to have) instead of 'Ser' or 'Estar'."
    },
    {
        question: "Which word is feminine in Spanish?",
        options: ["Programa", "Problema", "Día", "Mano"],
        answer: "Mano",
        explanation: "Despite ending in 'o', 'la mano' (the hand) is feminine. 'Programa', 'problema', and 'día' all end in 'a' but are notoriously masculine words ('el programa', 'el problema', 'el día')."
    },
    {
        question: "How do you form the regular Present Progressive tense for 'hablar' (to speak)?",
        options: ["estoy hablo", "estoy hablar", "estoy hablando", "soy hablando"],
        answer: "estoy hablando",
        explanation: "The present progressive requires the verb 'Estar' + the gerundio. For '-ar' verbs, the gerundio ends in '-ando' (hablando)."
    }
];

export const IDIOMS = [
    { phrase: "Tomar el pelo", literal: "To grab the hair", meaning: "To pull someone's leg / to joke with someone" },
    { phrase: "Ser pan comido", literal: "To be eaten bread", meaning: "To be a piece of cake / very easy" },
    { phrase: "Dar a luz", literal: "To give to light", meaning: "To give birth" },
    { phrase: "Costar un ojo de la cara", literal: "To cost an eye from the face", meaning: "To cost an arm and a leg / be very expensive" },
    { phrase: "Echar agua al mar", literal: "To throw water into the sea", meaning: "To do an exercise in futility / pointless" },
    { phrase: "Estar en las nubes", literal: "To be in the clouds", meaning: "To be daydreaming / spaced out" },
    { phrase: "Más vale pájaro en mano que ciento volando", literal: "A bird in the hand is worth more than 100 flying", meaning: "A bird in the hand is worth two in the bush" },
    { phrase: "Camarón que se duerme se lo lleva la corriente", literal: "Shrimp that sleeps is carried away by the current", meaning: "You snooze, you lose" }
];

export const CONVERSATION_TOPICS = [
    "Introducing yourself and basic pleasantries",
    "Ordering food at a busy tapas bar in Madrid",
    "Asking for directions to the museum",
    "Discussing your favorite holidays and traditions",
    "Talking about your daily routine",
    "Chatting about hobbies and what you do on weekends",
    "Booking a hotel room and asking about amenities",
    "Describing your family and friends"
];

export const SENTENCE_BUILD_PROMPTS = [
    { prompt: "Introduce yourself and say how old you are.", en_hint: "Use tener for age.", topic: "introductions" },
    { prompt: "Order a coffee and some bread.", en_hint: "Use Por favor and Quisiera.", topic: "food & drink" },
    { prompt: "Tell a friend where you are going tomorrow.", en_hint: "Use voy a ir a...", topic: "plans" }
];
