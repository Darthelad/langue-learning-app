const fs = require('fs');

const bulkVocab = [
    // Basics & Greetings
    { en: "hello", es: "hola", fr: "bonjour", pt: "olá", it: "ciao", ru: "привет", he: "שלום", ko: "안녕하세요", topic: "Basics & Greetings" },
    { en: "thank you", es: "gracias", fr: "merci", pt: "obrigado", it: "grazie", ru: "спасибо", he: "תודה", ko: "감사합니다", topic: "Basics & Greetings" },
    { en: "yes", es: "sí", fr: "oui", pt: "sim", it: "sì", ru: "да", he: "כן", ko: "네", topic: "Basics & Greetings" },
    { en: "no", es: "no", fr: "non", pt: "não", it: "no", ru: "нет", he: "לא", ko: "아니요", topic: "Basics & Greetings" },
    { en: "please", es: "por favor", fr: "s'il vous plaît", pt: "por favor", it: "per favore", ru: "пожалуйста", he: "בבקשה", ko: "제발", topic: "Basics & Greetings" },
    { en: "excuse me", es: "disculpe", fr: "excusez-moi", pt: "com licença", it: "scusi", ru: "извините", he: "סליחה", ko: "저기요", topic: "Basics & Greetings" },
    { en: "good morning", es: "buenos días", fr: "bonjour", pt: "bom dia", it: "buongiorno", ru: "доброе утро", he: "בוקר טוב", ko: "좋은 아침입니다", topic: "Basics & Greetings" },
    { en: "good night", es: "buenas noches", fr: "bonne nuit", pt: "boa noite", it: "buonanotte", ru: "спокойной ночи", he: "לילה טוב", ko: "안녕히 주무세요", topic: "Basics & Greetings" },

    // People & Family
    { en: "family", es: "familia", fr: "famille", pt: "família", it: "famiglia", ru: "семья", he: "משפחה", ko: "가족", topic: "People & Family" },
    { en: "mother", es: "madre", fr: "mère", pt: "mãe", it: "madre", ru: "мать", he: "אמא", ko: "어머니", topic: "People & Family" },
    { en: "father", es: "padre", fr: "père", pt: "pai", it: "padre", ru: "отец", he: "אבא", ko: "아버지", topic: "People & Family" },
    { en: "friend", es: "amigo", fr: "ami", pt: "amigo", it: "amico", ru: "друг", he: "חבר", ko: "친구", topic: "People & Family" },
    { en: "person", es: "persona", fr: "personne", pt: "pessoa", it: "persona", ru: "человек", he: "אדם", ko: "사람", topic: "People & Family" },
    { en: "man", es: "hombre", fr: "homme", pt: "homem", it: "uomo", ru: "мужчина", he: "איש", ko: "남자", topic: "People & Family" },
    { en: "woman", es: "mujer", fr: "femme", pt: "mulher", it: "donna", ru: "женщина", he: "אישה", ko: "여자", topic: "People & Family" },
    { en: "child", es: "niño", fr: "enfant", pt: "criança", it: "bambino", ru: "ребёнок", he: "ילד", ko: "아이", topic: "People & Family" },
    { en: "parents", es: "padres", fr: "parents", pt: "pais", it: "genitori", ru: "родители", he: "הורים", ko: "부모님", topic: "People & Family" },
    { en: "brother", es: "hermano", fr: "frère", pt: "irmão", it: "fratello", ru: "брат", he: "אח", ko: "형제", topic: "People & Family" },
    { en: "sister", es: "hermana", fr: "sœur", pt: "irmã", it: "sorella", ru: "сестра", he: "אחות", ko: "자매", topic: "People & Family" },
    { en: "grandfather", es: "abuelo", fr: "grand-père", pt: "avô", it: "nonno", ru: "дедушка", he: "סבא", ko: "할아버지", topic: "People & Family" },
    { en: "grandmother", es: "abuela", fr: "grand-mère", pt: "avó", it: "nonna", ru: "бабушка", he: "סבתא", ko: "할머니", topic: "People & Family" },

    // Time & Calendar
    { en: "time", es: "tiempo", fr: "temps", pt: "tempo", it: "tempo", ru: "время", he: "זמן", ko: "시간", topic: "Time & Calendar" },
    { en: "today", es: "hoy", fr: "aujourd'hui", pt: "hoje", it: "oggi", ru: "сегодня", he: "היום", ko: "오늘", topic: "Time & Calendar" },
    { en: "tomorrow", es: "mañana", fr: "demain", pt: "amanhã", it: "domani", ru: "завтра", he: "מחר", ko: "내일", topic: "Time & Calendar" },
    { en: "yesterday", es: "ayer", fr: "hier", pt: "ontem", it: "ieri", ru: "вчера", he: "אתמול", ko: "어제", topic: "Time & Calendar" },
    { en: "day", es: "día", fr: "jour", pt: "dia", it: "giorno", ru: "день", he: "יום", ko: "일", topic: "Time & Calendar" },
    { en: "week", es: "semana", fr: "semaine", pt: "semana", it: "settimana", ru: "неделя", he: "שבוע", ko: "주", topic: "Time & Calendar" },
    { en: "month", es: "mes", fr: "mois", pt: "mês", it: "mese", ru: "месяц", he: "חודש", ko: "달", topic: "Time & Calendar" },
    { en: "year", es: "año", fr: "année", pt: "ano", it: "anno", ru: "год", he: "שנה", ko: "년", topic: "Time & Calendar" },
    { en: "morning", es: "mañana", fr: "matin", pt: "manhã", it: "mattina", ru: "утро", he: "בוקר", ko: "아침", topic: "Time & Calendar" },
    { en: "afternoon", es: "tarde", fr: "après-midi", pt: "tarde", it: "pomeriggio", ru: "день", he: "צהריים", ko: "오후", topic: "Time & Calendar" },
    { en: "evening", es: "noche", fr: "soir", pt: "início da noite", it: "sera", ru: "вечер", he: "ערב", ko: "저녁", topic: "Time & Calendar" },
    { en: "night", es: "noche", fr: "nuit", pt: "noite", it: "notte", ru: "ночь", he: "לילה", ko: "밤", topic: "Time & Calendar" },
    { en: "always", es: "siempre", fr: "toujours", pt: "sempre", it: "sempre", ru: "всегда", he: "תמיד", ko: "항상", topic: "Time & Calendar" },
    { en: "never", es: "nunca", fr: "jamais", pt: "nunca", it: "mai", ru: "никогда", he: "אף פעם", ko: "결코", topic: "Time & Calendar" },
    { en: "now", es: "ahora", fr: "maintenant", pt: "agora", it: "ora", ru: "сейчас", he: "עכשיו", ko: "지금", topic: "Time & Calendar" },

    // Food & Drink
    { en: "water", es: "agua", fr: "eau", pt: "água", it: "acqua", ru: "вода", he: "מים", ko: "물", topic: "Food & Drink" },
    { en: "food", es: "comida", fr: "nourriture", pt: "comida", it: "cibo", ru: "еда", he: "אוכל", ko: "음식", topic: "Food & Drink" },
    { en: "bread", es: "pan", fr: "pain", pt: "pão", it: "pane", ru: "хлеб", he: "לחם", ko: "빵", topic: "Food & Drink" },
    { en: "apple", es: "manzana", fr: "pomme", pt: "maçã", it: "mela", ru: "яблоко", he: "תפוח", ko: "사과", topic: "Food & Drink" },
    { en: "meat", es: "carne", fr: "viande", pt: "carne", it: "carne", ru: "мясо", he: "בשר", ko: "고기", topic: "Food & Drink" },
    { en: "fish", es: "pescado", fr: "poisson", pt: "peixe", it: "pesce", ru: "рыба", he: "דג", ko: "생선", topic: "Food & Drink" },
    { en: "cheese", es: "queso", fr: "fromage", pt: "queijo", it: "formaggio", ru: "сыр", he: "גבינה", ko: "치즈", topic: "Food & Drink" },
    { en: "vegetable", es: "verdura", fr: "légume", pt: "vegetal", it: "verdura", ru: "овощ", he: "ירק", ko: "야채", topic: "Food & Drink" },
    { en: "fruit", es: "fruta", fr: "fruit", pt: "fruta", it: "frutta", ru: "фрукт", he: "פרי", ko: "과일", topic: "Food & Drink" },
    { en: "coffee", es: "café", fr: "café", pt: "café", it: "caffè", ru: "кофе", he: "קפה", ko: "커피", topic: "Food & Drink" },
    { en: "tea", es: "té", fr: "thé", pt: "chá", it: "tè", ru: "чай", he: "תה", ko: "차", topic: "Food & Drink" },
    { en: "milk", es: "leche", fr: "lait", pt: "leite", it: "latte", ru: "молоко", he: "חלב", ko: "우유", topic: "Food & Drink" },
    { en: "beer", es: "cerveza", fr: "bière", pt: "cerveja", it: "birra", ru: "пиво", he: "בירה", ko: "맥주", topic: "Food & Drink" },
    { en: "wine", es: "vino", fr: "vin", pt: "vinho", it: "vino", ru: "вино", he: "יין", ko: "와인", topic: "Food & Drink" },
    { en: "breakfast", es: "desayuno", fr: "petit-déjeuner", pt: "café da manhã", it: "colazione", ru: "завтрак", he: "ארוחת בוקר", ko: "아침 식사", topic: "Food & Drink" },
    { en: "lunch", es: "almuerzo", fr: "déjeuner", pt: "almoço", it: "pranzo", ru: "обед", he: "ארוחת צהריים", ko: "점심 식사", topic: "Food & Drink" },
    { en: "dinner", es: "cena", fr: "dîner", pt: "jantar", it: "cena", ru: "ужин", he: "ארוחת ערב", ko: "저녁 식사", topic: "Food & Drink" },

    // House & Home
    { en: "house", es: "casa", fr: "maison", pt: "casa", it: "casa", ru: "дом", he: "בית", ko: "집", topic: "House & Home" },
    { en: "room", es: "habitación", fr: "chambre", pt: "quarto", it: "stanza", ru: "комната", he: "חדר", ko: "방", topic: "House & Home" },
    { en: "door", es: "puerta", fr: "porte", pt: "porta", it: "porta", ru: "дверь", he: "דלת", ko: "문", topic: "House & Home" },
    { en: "window", es: "ventana", fr: "fenêtre", pt: "janela", it: "finestra", ru: "окно", he: "חלון", ko: "창문", topic: "House & Home" },
    { en: "bed", es: "cama", fr: "lit", pt: "cama", it: "letto", ru: "кровать", he: "מיטה", ko: "침대", topic: "House & Home" },
    { en: "table", es: "mesa", fr: "table", pt: "mesa", it: "tavolo", ru: "стол", he: "שולחן", ko: "테이블", topic: "House & Home" },
    { en: "chair", es: "silla", fr: "chaise", pt: "cadeira", it: "sedia", ru: "стул", he: "כיסא", ko: "의자", topic: "House & Home" },
    { en: "kitchen", es: "cocina", fr: "cuisine", pt: "cozinha", it: "cucina", ru: "кухня", he: "מטבח", ko: "주방", topic: "House & Home" },
    { en: "bathroom", es: "baño", fr: "salle de bain", pt: "banheiro", it: "bagno", ru: "ванная", he: "חדר אמבטיה", ko: "화장실", topic: "House & Home" },

    // Nature & Animals
    { en: "dog", es: "perro", fr: "chien", pt: "cachorro", it: "cane", ru: "собака", he: "כלב", ko: "개", topic: "Nature & Animals" },
    { en: "cat", es: "gato", fr: "chat", pt: "gato", it: "gatto", ru: "кот", he: "חתול", ko: "고양이", topic: "Nature & Animals" },
    { en: "bird", es: "pájaro", fr: "oiseau", pt: "pássaro", it: "uccello", ru: "птица", he: "ציפור", ko: "새", topic: "Nature & Animals" },
    { en: "tree", es: "árbol", fr: "arbre", pt: "árvore", it: "albero", ru: "дерево", he: "עץ", ko: "나무", topic: "Nature & Animals" },
    { en: "sun", es: "sol", fr: "soleil", pt: "sol", it: "sole", ru: "солнце", he: "שמש", ko: "태양", topic: "Nature & Animals" },
    { en: "moon", es: "luna", fr: "lune", pt: "lua", it: "luna", ru: "луна", he: "ירח", ko: "달", topic: "Nature & Animals" },
    { en: "water", es: "agua", fr: "eau", pt: "água", it: "acqua", ru: "вода", he: "מים", ko: "물", topic: "Nature & Animals" },
    { en: "flower", es: "flor", fr: "fleur", pt: "flor", it: "fiore", ru: "цветок", he: "פרח", ko: "꽃", topic: "Nature & Animals" },
    { en: "sky", es: "cielo", fr: "ciel", pt: "céu", it: "cielo", ru: "небо", he: "שמיים", ko: "하늘", topic: "Nature & Animals" },
    { en: "sea", es: "mar", fr: "mer", pt: "mar", it: "mare", ru: "море", he: "ים", ko: "바다", topic: "Nature & Animals" },
    { en: "mountain", es: "montaña", fr: "montagne", pt: "montanha", it: "montagna", ru: "гора", he: "הר", ko: "산", topic: "Nature & Animals" },

    // City & Places
    { en: "city", es: "ciudad", fr: "ville", pt: "cidade", it: "città", ru: "город", he: "עיר", ko: "도시", topic: "City & Places" },
    { en: "street", es: "calle", fr: "rue", pt: "rua", it: "strada", ru: "улица", he: "רחוב", ko: "거리", topic: "City & Places" },
    { en: "school", es: "escuela", fr: "école", pt: "escola", it: "scuola", ru: "школа", he: "בית ספר", ko: "학교", topic: "City & Places" },
    { en: "hospital", es: "hospital", fr: "hôpital", pt: "hospital", it: "ospedale", ru: "больница", he: "בית חולים", ko: "병원", topic: "City & Places" },
    { en: "store", es: "tienda", fr: "magasin", pt: "loja", it: "negozio", ru: "магазин", he: "חנות", ko: "가게", topic: "City & Places" },
    { en: "restaurant", es: "restaurante", fr: "restaurant", pt: "restaurante", it: "ristorante", ru: "ресторан", he: "מסעדה", ko: "식당", topic: "City & Places" },
    { en: "station", es: "estación", fr: "gare", pt: "estação", it: "stazione", ru: "вокзал", he: "תחנה", ko: "역", topic: "City & Places" },
    { en: "park", es: "parque", fr: "parc", pt: "parque", it: "parco", ru: "парк", he: "פארק", ko: "공원", topic: "City & Places" },

    // Transportation
    { en: "car", es: "coche", fr: "voiture", pt: "carro", it: "auto", ru: "машина", he: "מכונית", ko: "차", topic: "Transportation" },
    { en: "bus", es: "autobús", fr: "bus", pt: "ônibus", it: "autobus", ru: "автобус", he: "אוטובוס", ko: "버스", topic: "Transportation" },
    { en: "train", es: "tren", fr: "train", pt: "trem", it: "treno", ru: "поезд", he: "רכבת", ko: "기차", topic: "Transportation" },
    { en: "airplane", es: "avión", fr: "avion", pt: "avião", it: "aereo", ru: "самолёт", he: "מטוס", ko: "비행기", topic: "Transportation" },
    { en: "boat", es: "barco", fr: "bateau", pt: "barco", it: "barca", ru: "лодка", he: "סירה", ko: "배", topic: "Transportation" },

    // Action Verbs
    { en: "to be (permanent)", es: "ser", fr: "être", pt: "ser", it: "essere", ru: "быть", he: "להיות", ko: "이다", topic: "Action Verbs" },
    { en: "to be (temporary)", es: "estar", fr: "être", pt: "estar", it: "stare", ru: "находиться", he: "להיות", ko: "있다", topic: "Action Verbs" },
    { en: "to have", es: "tener", fr: "avoir", pt: "ter", it: "avere", ru: "иметь", he: "יש (ל)", ko: "가지다", topic: "Action Verbs" },
    { en: "to do / to make", es: "hacer", fr: "faire", pt: "fazer", it: "fare", ru: "делать", he: "לעשות", ko: "하다", topic: "Action Verbs" },
    { en: "to go", es: "ir", fr: "aller", pt: "ir", it: "andare", ru: "идти", he: "ללכת", ko: "가다", topic: "Action Verbs" },
    { en: "to come", es: "venir", fr: "venir", pt: "vir", it: "venire", ru: "приходить", he: "לבוא", ko: "오다", topic: "Action Verbs" },
    { en: "to see", es: "ver", fr: "voir", pt: "ver", it: "vedere", ru: "видеть", he: "לראות", ko: "보다", topic: "Action Verbs" },
    { en: "to speak", es: "hablar", fr: "parler", pt: "falar", it: "parlare", ru: "говорить", he: "לדבר", ko: "말하다", topic: "Action Verbs" },
    { en: "to eat", es: "comer", fr: "manger", pt: "comer", it: "mangiare", ru: "есть", he: "לאכול", ko: "먹다", topic: "Action Verbs" },
    { en: "to drink", es: "beber", fr: "boire", pt: "beber", it: "bere", ru: "пить", he: "לשתות", ko: "마시다", topic: "Action Verbs" },
    { en: "to sleep", es: "dormir", fr: "dormir", pt: "dormir", it: "dormire", ru: "спать", he: "לישון", ko: "자다", topic: "Action Verbs" },
    { en: "to write", es: "escribir", fr: "écrire", pt: "escrever", it: "scrivere", ru: "писать", he: "לכתוב", ko: "쓰다", topic: "Action Verbs" },
    { en: "to read", es: "leer", fr: "lire", pt: "ler", it: "leggere", ru: "читать", he: "לקרות", ko: "읽다", topic: "Action Verbs" },
    { en: "to walk", es: "caminar", fr: "marcher", pt: "caminhar", it: "camminare", ru: "гулять", he: "ללכת", ko: "걷다", topic: "Action Verbs" },
    { en: "to run", es: "correr", fr: "courir", pt: "correr", it: "correre", ru: "бежать", he: "לרוץ", ko: "달리다", topic: "Action Verbs" },
    { en: "to buy", es: "comprar", fr: "acheter", pt: "comprar", it: "comprare", ru: "покупать", he: "לקנות", ko: "사다", topic: "Action Verbs" },
    { en: "to sell", es: "vender", fr: "vendre", pt: "vender", it: "vendere", ru: "продавать", he: "למכור", ko: "팔다", topic: "Action Verbs" },
    { en: "to understand", es: "entender", fr: "comprendre", pt: "entender", it: "capire", ru: "понимать", he: "להבין", ko: "이해하다", topic: "Action Verbs" },
    { en: "to know (a fact)", es: "saber", fr: "savoir", pt: "saber", it: "sapere", ru: "знать", he: "לדעת", ko: "알다", topic: "Action Verbs" },

    // Descriptive (Adjectives)
    { en: "good", es: "bueno", fr: "bon", pt: "bom", it: "buono", ru: "хороший", he: "טוב", ko: "좋다", topic: "Descriptive (Adjectives)" },
    { en: "bad", es: "malo", fr: "mauvais", pt: "mau", it: "cattivo", ru: "плохой", he: "רע", ko: "나쁘다", topic: "Descriptive (Adjectives)" },
    { en: "big", es: "grande", fr: "grand", pt: "grande", it: "grande", ru: "большой", he: "גדול", ko: "크다", topic: "Descriptive (Adjectives)" },
    { en: "small", es: "pequeño", fr: "petit", pt: "pequeno", it: "piccolo", ru: "маленький", he: "קטן", ko: "작다", topic: "Descriptive (Adjectives)" },
    { en: "hot", es: "caliente", fr: "chaud", pt: "quente", it: "caldo", ru: "горячий", he: "חם", ko: "뜨겁다", topic: "Descriptive (Adjectives)" },
    { en: "cold", es: "frío", fr: "froid", pt: "frio", it: "freddo", ru: "холодный", he: "קר", ko: "차갑다", topic: "Descriptive (Adjectives)" },
    { en: "new", es: "nuevo", fr: "nouveau", pt: "novo", it: "nuovo", ru: "новый", he: "חדש", ko: "새롭다", topic: "Descriptive (Adjectives)" },
    { en: "old", es: "viejo", fr: "vieux", pt: "velho", it: "vecchio", ru: "старый", he: "ישן", ko: "오래된", topic: "Descriptive (Adjectives)" },
    { en: "beautiful", es: "hermoso", fr: "beau", pt: "bonito", it: "bello", ru: "красивый", he: "יפה", ko: "아름답다", topic: "Descriptive (Adjectives)" },
    { en: "fast", es: "rápido", fr: "rapide", pt: "rápido", it: "veloce", ru: "быстрый", he: "מהיר", ko: "빠르다", topic: "Descriptive (Adjectives)" },
    { en: "slow", es: "lento", fr: "lent", pt: "lento", it: "lento", ru: "медленный", he: "לאט", ko: "느리다", topic: "Descriptive (Adjectives)" },
    { en: "happy", es: "feliz", fr: "heureux", pt: "feliz", it: "felice", ru: "счастливый", he: "שמח", ko: "행복하다", topic: "Descriptive (Adjectives)" },
    { en: "sad", es: "triste", fr: "triste", pt: "triste", it: "triste", ru: "грустный", he: "עצוב", ko: "슬프다", topic: "Descriptive (Adjectives)" },

    // Colors & Shapes
    { en: "red", es: "rojo", fr: "rouge", pt: "vermelho", it: "rosso", ru: "красный", he: "אדום", ko: "빨간색", topic: "Colors & Shapes" },
    { en: "blue", es: "azul", fr: "bleu", pt: "azul", it: "blu", ru: "синий", he: "כחול", ko: "파란색", topic: "Colors & Shapes" },
    { en: "green", es: "verde", fr: "vert", pt: "verde", it: "verde", ru: "зеленый", he: "ירוק", ko: "초록색", topic: "Colors & Shapes" },
    { en: "yellow", es: "amarillo", fr: "jaune", pt: "amarelo", it: "giallo", ru: "желтый", he: "צהוב", ko: "노란색", topic: "Colors & Shapes" },
    { en: "black", es: "negro", fr: "noir", pt: "preto", it: "nero", ru: "черный", he: "שחור", ko: "검은색", topic: "Colors & Shapes" },
    { en: "white", es: "blanco", fr: "blanc", pt: "branco", it: "bianco", ru: "белый", he: "לבן", ko: "흰색", topic: "Colors & Shapes" },

    // Numbers
    { en: "one", es: "uno", fr: "un", pt: "um", it: "uno", ru: "один", he: "אחד", ko: "하나", topic: "Numbers & Math" },
    { en: "two", es: "dos", fr: "deux", pt: "dois", it: "due", ru: "два", he: "שתיים", ko: "둘", topic: "Numbers & Math" },
    { en: "three", es: "tres", fr: "trois", pt: "três", it: "tre", ru: "три", he: "שלוש", ko: "셋", topic: "Numbers & Math" },
    { en: "four", es: "cuatro", fr: "quatre", pt: "quatro", it: "quattro", ru: "четыре", he: "ארבע", ko: "넷", topic: "Numbers & Math" },
    { en: "five", es: "cinco", fr: "cinq", pt: "cinco", it: "cinque", ru: "пять", he: "חמש", ko: "다섯", topic: "Numbers & Math" },
    { en: "six", es: "seis", fr: "six", pt: "seis", it: "sei", ru: "шесть", he: "שש", ko: "여섯", topic: "Numbers & Math" },
    { en: "seven", es: "siete", fr: "sept", pt: "sete", it: "sette", ru: "семь", he: "שבע", ko: "일곱", topic: "Numbers & Math" },
    { en: "eight", es: "ocho", fr: "huit", pt: "oito", it: "otto", ru: "восемь", he: "שמונה", ko: "여덟", topic: "Numbers & Math" },
    { en: "nine", es: "nueve", fr: "neuf", pt: "nove", it: "nove", ru: "девять", he: "תשע", ko: "아홉", topic: "Numbers & Math" },
    { en: "ten", es: "diez", fr: "dix", pt: "dez", it: "dieci", ru: "десять", he: "עשר", ko: "열", topic: "Numbers & Math" },

    // Misc & Core Vocab
    { en: "book", es: "libro", fr: "livre", pt: "livro", it: "libro", ru: "книга", he: "ספר", ko: "책", topic: "Misc & Core Vocab" },
    { en: "pen", es: "bolígrafo", fr: "stylo", pt: "caneta", it: "penna", ru: "ручка", he: "עט", ko: "펜", topic: "Misc & Core Vocab" },
    { en: "money", es: "dinero", fr: "argent", pt: "dinheiro", it: "soldi", ru: "деньги", he: "כסף", ko: "돈", topic: "Misc & Core Vocab" },
    { en: "love", es: "amor", fr: "amour", pt: "amor", it: "amore", ru: "любовь", he: "אהבה", ko: "사랑", topic: "Abstract Concepts" },
    { en: "world", es: "mundo", fr: "monde", pt: "mundo", it: "mondo", ru: "мир", he: "עולם", ko: "세계", topic: "Abstract Concepts" },
    { en: "life", es: "vida", fr: "vie", pt: "vida", it: "vita", ru: "жизнь", he: "חיים", ko: "생명", topic: "Abstract Concepts" }
];

const fileMaps = [
    { file: 'src/english_data.js', langKey: 'en' },
    { file: 'src/spanish_data.js', langKey: 'es' },
    { file: 'src/french_data.js', langKey: 'fr' },
    { file: 'src/portuguese_data.js', langKey: 'pt' },
    { file: 'src/russian_data.js', langKey: 'ru' },
    { file: 'src/korean_data.js', langKey: 'kr' }, // Korean uses 'kr' in the front end logic, though 'ko' is the language code, 'kr' is used for cards. Oh wait, my data arrays use 'kr: "...", so let's match that! But wait, in the bulkVocab I used 'ko'. I'll map 'ko' to whatever langKey is required!
    { file: 'src/hebrew_data.js', langKey: 'he' },
    { file: 'src/data.js', langKey: 'it' } // Italian
];

// Re-map ko to kr for Korean to match the typical expected behavior. Wait, let's just use `obj[langKey] = item[bulkLangKey]` where bulkLangKey corresponds to the array keys above.
const bulkKeys = { 'en': 'en', 'es': 'es', 'fr': 'fr', 'pt': 'pt', 'ru': 'ru', 'kr': 'ko', 'he': 'he', 'it': 'it' };

fileMaps.forEach(({ file, langKey }) => {
    let content = fs.readFileSync(file, 'utf8');
    const vocabRegex = /(export const VOCABULARY|const VOCABULARY) = \[([\s\S]*?)\];/;
    const match = content.match(vocabRegex);

    if (match) {
        try {
            let existingArray;
            eval(`existingArray = [${match[2]}]`);

            const enSet = new Set(existingArray.map(item => item.en.toLowerCase()));

            const bulkKey = bulkKeys[langKey] || langKey;

            const newEntries = bulkVocab
                .filter(item => !enSet.has(item.en.toLowerCase()))
                .map(item => {
                    const obj = {};
                    obj[langKey] = item[bulkKey];
                    obj.en = item.en;
                    obj.topic = item.topic;
                    return obj;
                });

            const mergedArray = [...existingArray, ...newEntries];
            const prefix = match[1];

            const updatedString = `${prefix} = [\n  ` + mergedArray.map(v => JSON.stringify(v)).join(',\n  ') + `\n];`;
            content = content.replace(vocabRegex, updatedString);
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Injected ${newEntries.length} new words into ${file}`);
        } catch (e) {
            console.error(`Failed on ${file}:`, e);
        }
    } else {
        console.warn(`Could not find VOCABULARY in ${file}`);
    }
});
