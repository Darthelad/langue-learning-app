const fs = require('fs');

const extendedSpanish = [
    // Basics & Greetings
    { es: "hola", en: "hello", topic: "Basics & Greetings" },
    { es: "adiós", en: "goodbye", topic: "Basics & Greetings" },
    { es: "por favor", en: "please", topic: "Basics & Greetings" },
    { es: "gracias", en: "thank you", topic: "Basics & Greetings" },
    { es: "sí", en: "yes", topic: "Basics & Greetings" },
    { es: "no", en: "no", topic: "Basics & Greetings" },
    { es: "disculpe", en: "excuse me", topic: "Basics & Greetings" },
    { es: "lo siento", en: "sorry", topic: "Basics & Greetings" },
    { es: "buenos días", en: "good morning", topic: "Basics & Greetings" },
    { es: "buenas tardes", en: "good afternoon", topic: "Basics & Greetings" },
    { es: "buenas noches", en: "good night", topic: "Basics & Greetings" },
    { es: "¿qué tal?", en: "how are you?", topic: "Basics & Greetings" },
    { es: "bienvenido", en: "welcome", topic: "Basics & Greetings" },

    // People & Family
    { es: "la familia", en: "the family", topic: "People & Family" },
    { es: "la madre", en: "the mother", topic: "People & Family" },
    { es: "el padre", en: "the father", topic: "People & Family" },
    { es: "el hijo", en: "the son", topic: "People & Family" },
    { es: "la hija", en: "the daughter", topic: "People & Family" },
    { es: "el hermano", en: "the brother", topic: "People & Family" },
    { es: "la hermana", en: "the sister", topic: "People & Family" },
    { es: "el amigo", en: "the friend", topic: "People & Family" },
    { es: "la gente", en: "the people", topic: "People & Family" },
    { es: "el hombre", en: "the man", topic: "People & Family" },
    { es: "la mujer", en: "the woman", topic: "People & Family" },
    { es: "el niño", en: "the boy", topic: "People & Family" },
    { es: "la niña", en: "the girl", topic: "People & Family" },

    // Food & Drink
    { es: "la comida", en: "the food", topic: "Food & Drink" },
    { es: "el agua", en: "the water", topic: "Food & Drink" },
    { es: "el pan", en: "the bread", topic: "Food & Drink" },
    { es: "el queso", en: "the cheese", topic: "Food & Drink" },
    { es: "la carne", en: "the meat", topic: "Food & Drink" },
    { es: "el pollo", en: "the chicken", topic: "Food & Drink" },
    { es: "el pescado", en: "the fish", topic: "Food & Drink" },
    { es: "la fruta", en: "the fruit", topic: "Food & Drink" },
    { es: "la verdura", en: "the vegetable", topic: "Food & Drink" },
    { es: "la manzana", en: "the apple", topic: "Food & Drink" },
    { es: "el vaso", en: "the glass", topic: "Food & Drink" },
    { es: "el desayuno", en: "the breakfast", topic: "Food & Drink" },
    { es: "el almuerzo", en: "the lunch", topic: "Food & Drink" },
    { es: "la cena", en: "the dinner", topic: "Food & Drink" },

    // House & Home
    { es: "la casa", en: "the house", topic: "House & Home" },
    { es: "el hogar", en: "the home", topic: "House & Home" },
    { es: "la habitación", en: "the room", topic: "House & Home" },
    { es: "la cocina", en: "the kitchen", topic: "House & Home" },
    { es: "el baño", en: "the bathroom", topic: "House & Home" },
    { es: "el dormitorio", en: "the bedroom", topic: "House & Home" },
    { es: "la puerta", en: "the door", topic: "House & Home" },
    { es: "la ventana", en: "the window", topic: "House & Home" },
    { es: "la cama", en: "the bed", topic: "House & Home" },
    { es: "la mesa", en: "the table", topic: "House & Home" },
    { es: "la silla", en: "the chair", topic: "House & Home" },

    // Nature & Animals
    { es: "el perro", en: "the dog", topic: "Nature & Animals" },
    { es: "el gato", en: "the cat", topic: "Nature & Animals" },
    { es: "el pájaro", en: "the bird", topic: "Nature & Animals" },
    { es: "el sol", en: "the sun", topic: "Nature & Animals" },
    { es: "la luna", en: "the moon", topic: "Nature & Animals" },
    { es: "la estrella", en: "the star", topic: "Nature & Animals" },
    { es: "el árbol", en: "the tree", topic: "Nature & Animals" },
    { es: "la flor", en: "the flower", topic: "Nature & Animals" },
    { es: "el agua", en: "the water", topic: "Nature & Animals" },
    { es: "el mar", en: "the sea", topic: "Nature & Animals" },
    { es: "la playa", en: "the beach", topic: "Nature & Animals" },

    // Time & Calendar
    { es: "el tiempo", en: "the time", topic: "Time & Calendar" },
    { es: "el día", en: "the day", topic: "Time & Calendar" },
    { es: "la semana", en: "the week", topic: "Time & Calendar" },
    { es: "el mes", en: "the month", topic: "Time & Calendar" },
    { es: "el año", en: "the year", topic: "Time & Calendar" },
    { es: "hoy", en: "today", topic: "Time & Calendar" },
    { es: "mañana", en: "tomorrow", topic: "Time & Calendar" },
    { es: "ayer", en: "yesterday", topic: "Time & Calendar" },
    { es: "ahora", en: "now", topic: "Time & Calendar" },
    { es: "tarde", en: "late", topic: "Time & Calendar" },
    { es: "temprano", en: "early", topic: "Time & Calendar" },

    // Action Verbs
    { es: "ser", en: "to be (permanent)", topic: "Action Verbs" },
    { es: "estar", en: "to be (temporary)", topic: "Action Verbs" },
    { es: "tener", en: "to have", topic: "Action Verbs" },
    { es: "hacer", en: "to do/make", topic: "Action Verbs" },
    { es: "ir", en: "to go", topic: "Action Verbs" },
    { es: "venir", en: "to come", topic: "Action Verbs" },
    { es: "comer", en: "to eat", topic: "Action Verbs" },
    { es: "beber", en: "to drink", topic: "Action Verbs" },
    { es: "hablar", en: "to speak", topic: "Action Verbs" },
    { es: "ver", en: "to see", topic: "Action Verbs" },
    { es: "mirar", en: "to look", topic: "Action Verbs" },
    { es: "escuchar", en: "to listen", topic: "Action Verbs" },
    { es: "saber", en: "to know (fact)", topic: "Action Verbs" },
    { es: "querer", en: "to want", topic: "Action Verbs" },
    { es: "leer", en: "to read", topic: "Action Verbs" },
    { es: "escribir", en: "to write", topic: "Action Verbs" },
    { es: "dormir", en: "to sleep", topic: "Action Verbs" },
    { es: "trabajar", en: "to work", topic: "Action Verbs" },

    // Descriptive (Adjectives)
    { es: "bueno", en: "good", topic: "Descriptive (Adjectives)" },
    { es: "malo", en: "bad", topic: "Descriptive (Adjectives)" },
    { es: "grande", en: "big", topic: "Descriptive (Adjectives)" },
    { es: "pequeño", en: "small", topic: "Descriptive (Adjectives)" },
    { es: "nuevo", en: "new", topic: "Descriptive (Adjectives)" },
    { es: "viejo", en: "old", topic: "Descriptive (Adjectives)" },
    { es: "alto", en: "tall/high", topic: "Descriptive (Adjectives)" },
    { es: "bajo", en: "short/low", topic: "Descriptive (Adjectives)" },
    { es: "bonito", en: "pretty", topic: "Descriptive (Adjectives)" },
    { es: "feo", en: "ugly", topic: "Descriptive (Adjectives)" },
    { es: "rápido", en: "fast", topic: "Descriptive (Adjectives)" },
    { es: "lento", en: "slow", topic: "Descriptive (Adjectives)" },
    { es: "caliente", en: "hot", topic: "Descriptive (Adjectives)" },
    { es: "frío", en: "cold", topic: "Descriptive (Adjectives)" },
];

function inject(file, newData) {
    let content = fs.readFileSync(file, 'utf8');
    const vocabRegex = /export const VOCABULARY = \[([\s\S]*?)\];/;
    const match = content.match(vocabRegex);

    if (match) {
        try {
            let existingArray;
            eval(`existingArray = [${match[1]}]`);

            // Filter out new data that already exists
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

inject('src/spanish_data.js', extendedSpanish);
