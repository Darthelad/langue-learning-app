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
  {"it":"좋다","en":"good","type":"adjective","category":"Adjectives","topic":"Basics & Greetings"},
  {"it":"안녕하세요","en":"hello","type":"greeting","category":"Basics","topic":"Basics & Greetings"},
  {"it":"아니요","en":"no","type":"adverb","category":"Basics","topic":"Basics & Greetings"},
  {"it":"감사합니다","en":"thank you (formal)","type":"greeting","category":"Basics","topic":"Basics & Greetings"},
  {"it":"네","en":"yes","type":"adverb","category":"Basics","topic":"Basics & Greetings"},
  {"it":"친구","en":"friend","type":"noun","gender":"n/a","category":"People","topic":"People & Family"},
  {"it":"사람","en":"person","type":"noun","gender":"n/a","category":"People","topic":"People & Family"},
  {"it":"물","en":"water","type":"noun","gender":"n/a","category":"Food & Drink","topic":"Food & Drink"},
  {"it":"집","en":"house","type":"noun","gender":"n/a","category":"Places","topic":"House & Home"},
  {"it":"고양이","en":"cat","type":"noun","gender":"n/a","category":"Animals","topic":"Nature & Animals"},
  {"it":"개","en":"dog","type":"noun","gender":"n/a","category":"Animals","topic":"Nature & Animals"},
  {"it":"학교","en":"school","type":"noun","gender":"n/a","category":"Places","topic":"City & Places"},
  {"it":"크다","en":"big","type":"adjective","category":"Adjectives","topic":"Abstract Concepts"},
  {"it":"작다","en":"small","type":"adjective","category":"Adjectives","topic":"Abstract Concepts"},
  {"it":"책","en":"book","type":"noun","gender":"n/a","category":"Objects","topic":"Misc & Core Vocab"},
  {"it":"저","en":"I (formal)","type":"pronoun","category":"Pronouns","topic":"Misc & Core Vocab"},
  {"it":"나","en":"I (informal)","type":"pronoun","category":"Pronouns","topic":"Misc & Core Vocab"},
  {"it":"밥","en":"rice / meal","type":"noun","gender":"n/a","category":"Food & Drink","topic":"Misc & Core Vocab"},
  {"kr":"안녕히 가세요","rom":"annyeonghi gaseyo","en":"goodbye (to someone leaving)","topic":"Basics & Greetings"},
  {"kr":"감사합니다","rom":"gamsahamnida","en":"thank you","topic":"Basics & Greetings"},
  {"kr":"제발","rom":"jebal","en":"please","topic":"Basics & Greetings"},
  {"kr":"죄송합니다","rom":"joesonghamnida","en":"sorry","topic":"Basics & Greetings"},
  {"kr":"저기요","rom":"jeogiyo","en":"excuse me (to get attention)","topic":"Basics & Greetings"},
  {"kr":"환영합니다","rom":"hwanyeonghamnida","en":"welcome","topic":"Basics & Greetings"},
  {"kr":"가족","rom":"gajok","en":"family","topic":"People & Family"},
  {"kr":"어머니","rom":"eomeoni","en":"mother","topic":"People & Family"},
  {"kr":"아버지","rom":"abeoji","en":"father","topic":"People & Family"},
  {"kr":"아들","rom":"adeul","en":"son","topic":"People & Family"},
  {"kr":"딸","rom":"ttal","en":"daughter","topic":"People & Family"},
  {"kr":"오빠","rom":"oppa","en":"older brother (for female)","topic":"People & Family"},
  {"kr":"형","rom":"hyeong","en":"older brother (for male)","topic":"People & Family"},
  {"kr":"언니","rom":"eonni","en":"older sister (for female)","topic":"People & Family"},
  {"kr":"누나","rom":"nuna","en":"older sister (for male)","topic":"People & Family"},
  {"kr":"동생","rom":"dongsaeng","en":"younger sibling","topic":"People & Family"},
  {"kr":"남자","rom":"namja","en":"man","topic":"People & Family"},
  {"kr":"여자","rom":"yeoja","en":"woman","topic":"People & Family"},
  {"kr":"아이","rom":"ai","en":"child","topic":"People & Family"},
  {"kr":"음식","rom":"eumsik","en":"food","topic":"Food & Drink"},
  {"kr":"고기","rom":"gogi","en":"meat","topic":"Food & Drink"},
  {"kr":"야채","rom":"yachae","en":"vegetable","topic":"Food & Drink"},
  {"kr":"과일","rom":"gwail","en":"fruit","topic":"Food & Drink"},
  {"kr":"빵","rom":"ppang","en":"bread","topic":"Food & Drink"},
  {"kr":"커피","rom":"keopi","en":"coffee","topic":"Food & Drink"},
  {"kr":"차","rom":"cha","en":"tea","topic":"Food & Drink"},
  {"kr":"우유","rom":"uyu","en":"milk","topic":"Food & Drink"},
  {"kr":"술","rom":"sul","en":"alcohol","topic":"Food & Drink"},
  {"kr":"아침","rom":"achim","en":"breakfast / morning","topic":"Food & Drink"},
  {"kr":"점심","rom":"jeomsim","en":"lunch","topic":"Food & Drink"},
  {"kr":"저녁","rom":"jeonyeok","en":"dinner / evening","topic":"Food & Drink"},
  {"kr":"식당","rom":"sikdang","en":"restaurant","topic":"Food & Drink"},
  {"kr":"시간","rom":"sigan","en":"time","topic":"Time & Calendar"},
  {"kr":"오늘","rom":"oneul","en":"today","topic":"Time & Calendar"},
  {"kr":"내일","rom":"naeil","en":"tomorrow","topic":"Time & Calendar"},
  {"kr":"어제","rom":"eoje","en":"yesterday","topic":"Time & Calendar"},
  {"kr":"지금","rom":"jigeum","en":"now","topic":"Time & Calendar"},
  {"kr":"월요일","rom":"woryoil","en":"monday","topic":"Time & Calendar"},
  {"kr":"화요일","rom":"hwayoil","en":"tuesday","topic":"Time & Calendar"},
  {"kr":"수요일","rom":"suyoil","en":"wednesday","topic":"Time & Calendar"},
  {"kr":"목요일","rom":"mogyoil","en":"thursday","topic":"Time & Calendar"},
  {"kr":"금요일","rom":"geumyoil","en":"friday","topic":"Time & Calendar"},
  {"kr":"토요일","rom":"toyoil","en":"saturday","topic":"Time & Calendar"},
  {"kr":"일요일","rom":"iryoil","en":"sunday","topic":"Time & Calendar"},
  {"kr":"주","rom":"ju","en":"week","topic":"Time & Calendar"},
  {"kr":"달","rom":"dal","en":"month","topic":"Time & Calendar"},
  {"kr":"년","rom":"nyeon","en":"year","topic":"Time & Calendar"},
  {"kr":"가게","rom":"gage","en":"store","topic":"City & Places"},
  {"kr":"회사","rom":"hoesa","en":"company / workplace","topic":"City & Places"},
  {"kr":"병원","rom":"byeongwon","en":"hospital","topic":"City & Places"},
  {"kr":"은행","rom":"eunhaeng","en":"bank","topic":"City & Places"},
  {"kr":"공원","rom":"gongwon","en":"park","topic":"City & Places"},
  {"kr":"거리","rom":"geori","en":"street","topic":"City & Places"},
  {"kr":"역","rom":"yeok","en":"station","topic":"City & Places"},
  {"kr":"공항","rom":"gonghang","en":"airport","topic":"City & Places"},
  {"kr":"하다","rom":"hada","en":"to do","topic":"Action Verbs"},
  {"kr":"가다","rom":"gada","en":"to go","topic":"Action Verbs"},
  {"kr":"오다","rom":"oda","en":"to come","topic":"Action Verbs"},
  {"kr":"먹다","rom":"meokda","en":"to eat","topic":"Action Verbs"},
  {"kr":"마시다","rom":"masida","en":"to drink","topic":"Action Verbs"},
  {"kr":"자다","rom":"jada","en":"to sleep","topic":"Action Verbs"},
  {"kr":"보다","rom":"boda","en":"to see / watch","topic":"Action Verbs"},
  {"kr":"듣다","rom":"deutda","en":"to hear / listen","topic":"Action Verbs"},
  {"kr":"말하다","rom":"marhada","en":"to speak","topic":"Action Verbs"},
  {"kr":"읽다","rom":"ikda","en":"to read","topic":"Action Verbs"},
  {"kr":"쓰다","rom":"sseuda","en":"to write","topic":"Action Verbs"},
  {"kr":"사다","rom":"sada","en":"to buy","topic":"Action Verbs"},
  {"kr":"알다","rom":"alda","en":"to know","topic":"Action Verbs"},
  {"kr":"모르다","rom":"moreuda","en":"to not know","topic":"Action Verbs"},
  {"kr":"많다","rom":"manta","en":"many / much","topic":"Descriptive (Adjectives)"},
  {"kr":"새롭다","rom":"saeropda","en":"new","topic":"Descriptive (Adjectives)"},
  {"kr":"어렵다","rom":"eoryeopda","en":"difficult","topic":"Descriptive (Adjectives)"},
  {"kr":"쉽다","rom":"swipda","en":"easy","topic":"Descriptive (Adjectives)"},
  {"kr":"맛있다","rom":"masitda","en":"delicious","topic":"Descriptive (Adjectives)"},
  {"kr":"예쁘다","rom":"yeppeuda","en":"pretty","topic":"Descriptive (Adjectives)"},
  {"kr":"저기요","en":"excuse me","topic":"Basics & Greetings"},
  {"kr":"좋은 아침입니다","en":"good morning","topic":"Basics & Greetings"},
  {"kr":"안녕히 주무세요","en":"good night","topic":"Basics & Greetings"},
  {"kr":"부모님","en":"parents","topic":"People & Family"},
  {"kr":"형제","en":"brother","topic":"People & Family"},
  {"kr":"자매","en":"sister","topic":"People & Family"},
  {"kr":"할아버지","en":"grandfather","topic":"People & Family"},
  {"kr":"할머니","en":"grandmother","topic":"People & Family"},
  {"kr":"일","en":"day","topic":"Time & Calendar"},
  {"kr":"아침","en":"morning","topic":"Time & Calendar"},
  {"kr":"오후","en":"afternoon","topic":"Time & Calendar"},
  {"kr":"저녁","en":"evening","topic":"Time & Calendar"},
  {"kr":"밤","en":"night","topic":"Time & Calendar"},
  {"kr":"항상","en":"always","topic":"Time & Calendar"},
  {"kr":"결코","en":"never","topic":"Time & Calendar"},
  {"kr":"사과","en":"apple","topic":"Food & Drink"},
  {"kr":"생선","en":"fish","topic":"Food & Drink"},
  {"kr":"치즈","en":"cheese","topic":"Food & Drink"},
  {"kr":"맥주","en":"beer","topic":"Food & Drink"},
  {"kr":"와인","en":"wine","topic":"Food & Drink"},
  {"kr":"아침 식사","en":"breakfast","topic":"Food & Drink"},
  {"kr":"저녁 식사","en":"dinner","topic":"Food & Drink"},
  {"kr":"방","en":"room","topic":"House & Home"},
  {"kr":"문","en":"door","topic":"House & Home"},
  {"kr":"창문","en":"window","topic":"House & Home"},
  {"kr":"침대","en":"bed","topic":"House & Home"},
  {"kr":"테이블","en":"table","topic":"House & Home"},
  {"kr":"의자","en":"chair","topic":"House & Home"},
  {"kr":"주방","en":"kitchen","topic":"House & Home"},
  {"kr":"화장실","en":"bathroom","topic":"House & Home"},
  {"kr":"새","en":"bird","topic":"Nature & Animals"},
  {"kr":"나무","en":"tree","topic":"Nature & Animals"},
  {"kr":"태양","en":"sun","topic":"Nature & Animals"},
  {"kr":"달","en":"moon","topic":"Nature & Animals"},
  {"kr":"꽃","en":"flower","topic":"Nature & Animals"},
  {"kr":"하늘","en":"sky","topic":"Nature & Animals"},
  {"kr":"바다","en":"sea","topic":"Nature & Animals"},
  {"kr":"산","en":"mountain","topic":"Nature & Animals"},
  {"kr":"도시","en":"city","topic":"City & Places"},
  {"kr":"차","en":"car","topic":"Transportation"},
  {"kr":"버스","en":"bus","topic":"Transportation"},
  {"kr":"기차","en":"train","topic":"Transportation"},
  {"kr":"비행기","en":"airplane","topic":"Transportation"},
  {"kr":"배","en":"boat","topic":"Transportation"},
  {"kr":"이다","en":"to be (permanent)","topic":"Action Verbs"},
  {"kr":"있다","en":"to be (temporary)","topic":"Action Verbs"},
  {"kr":"가지다","en":"to have","topic":"Action Verbs"},
  {"kr":"하다","en":"to do / to make","topic":"Action Verbs"},
  {"kr":"보다","en":"to see","topic":"Action Verbs"},
  {"kr":"걷다","en":"to walk","topic":"Action Verbs"},
  {"kr":"달리다","en":"to run","topic":"Action Verbs"},
  {"kr":"팔다","en":"to sell","topic":"Action Verbs"},
  {"kr":"이해하다","en":"to understand","topic":"Action Verbs"},
  {"kr":"알다","en":"to know (a fact)","topic":"Action Verbs"},
  {"kr":"나쁘다","en":"bad","topic":"Descriptive (Adjectives)"},
  {"kr":"뜨겁다","en":"hot","topic":"Descriptive (Adjectives)"},
  {"kr":"차갑다","en":"cold","topic":"Descriptive (Adjectives)"},
  {"kr":"오래된","en":"old","topic":"Descriptive (Adjectives)"},
  {"kr":"아름답다","en":"beautiful","topic":"Descriptive (Adjectives)"},
  {"kr":"빠르다","en":"fast","topic":"Descriptive (Adjectives)"},
  {"kr":"느리다","en":"slow","topic":"Descriptive (Adjectives)"},
  {"kr":"행복하다","en":"happy","topic":"Descriptive (Adjectives)"},
  {"kr":"슬프다","en":"sad","topic":"Descriptive (Adjectives)"},
  {"kr":"빨간색","en":"red","topic":"Colors & Shapes"},
  {"kr":"파란색","en":"blue","topic":"Colors & Shapes"},
  {"kr":"초록색","en":"green","topic":"Colors & Shapes"},
  {"kr":"노란색","en":"yellow","topic":"Colors & Shapes"},
  {"kr":"검은색","en":"black","topic":"Colors & Shapes"},
  {"kr":"흰색","en":"white","topic":"Colors & Shapes"},
  {"kr":"하나","en":"one","topic":"Numbers & Math"},
  {"kr":"둘","en":"two","topic":"Numbers & Math"},
  {"kr":"셋","en":"three","topic":"Numbers & Math"},
  {"kr":"넷","en":"four","topic":"Numbers & Math"},
  {"kr":"다섯","en":"five","topic":"Numbers & Math"},
  {"kr":"여섯","en":"six","topic":"Numbers & Math"},
  {"kr":"일곱","en":"seven","topic":"Numbers & Math"},
  {"kr":"여덟","en":"eight","topic":"Numbers & Math"},
  {"kr":"아홉","en":"nine","topic":"Numbers & Math"},
  {"kr":"열","en":"ten","topic":"Numbers & Math"},
  {"kr":"펜","en":"pen","topic":"Misc & Core Vocab"},
  {"kr":"돈","en":"money","topic":"Misc & Core Vocab"},
  {"kr":"사랑","en":"love","topic":"Abstract Concepts"},
  {"kr":"세계","en":"world","topic":"Abstract Concepts"},
  {"kr":"생명","en":"life","topic":"Abstract Concepts"}
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

export const VIDEOS = [
    {
        id: "ZinAK6n6cWU",
        title: "Learn Korean in 20 Minutes - ALL the Basics You Need",
        channel: "Learn Korean with KoreanClass101.com",
        thumbnail: "https://img.youtube.com/vi/ZinAK6n6cWU/mqdefault.jpg"
    },
    {
        id: "rBDrM1VPJX0",
        title: "How to Learn and Read the Korean Alphabet (Hangul) in 10 Minutes🇰🇷 | Learn Korean for Beginners",
        channel: "Real Korean with Morning",
        thumbnail: "https://img.youtube.com/vi/rBDrM1VPJX0/mqdefault.jpg"
    },
    {
        id: "EGona9AEtTk",
        title: "Easiest Ways to Learn Korean for Beginner",
        channel: "Hailey _Your Korean Friend",
        thumbnail: "https://img.youtube.com/vi/EGona9AEtTk/mqdefault.jpg"
    },
    {
        id: "C2qBHWE3-t4",
        title: "How to Learn Korean (AND Have Fun): Beginner's Guide with Pro Tips & Practice Methods",
        channel: "oh no nina",
        thumbnail: "https://img.youtube.com/vi/C2qBHWE3-t4/mqdefault.jpg"
    }
];

export const CULTURE = [
    {
        "id": "yebNIHKAC4A",
        "title": "“Golden” Official Lyric Video | KPop Demon Hunters | Sony Animation",
        "channel": "Sony Pictures Animation",
        "thumbnail": "https://img.youtube.com/vi/yebNIHKAC4A/mqdefault.jpg",
        "category": "Music"
    },
    {
        "id": "983bBbJx0Mk",
        "title": "\"Soda Pop\" Official Lyric Video | KPop Demon Hunters | Sony Animation",
        "channel": "Sony Pictures Animation",
        "thumbnail": "https://img.youtube.com/vi/983bBbJx0Mk/mqdefault.jpg",
        "category": "Music"
    },
    {
        "id": "cWppAbqm9I8",
        "title": "\"Your Idol\" | Official Song Clip | KPop Demon Hunters | Sony Animation",
        "channel": "Sony Pictures Animation",
        "thumbnail": "https://img.youtube.com/vi/cWppAbqm9I8/mqdefault.jpg",
        "category": "Music"
    },
    {
        "id": "GUo9PKtwjHw",
        "title": "Genie, Make a Wish | Official Teaser | Netflix",
        "channel": "Netflix K-Content",
        "thumbnail": "https://img.youtube.com/vi/GUo9PKtwjHw/mqdefault.jpg",
        "category": "TV Show"
    },
    {
        "id": "F9SZf_QxfeA",
        "title": "Can This Love Be Translated? | Official Teaser | Netflix",
        "channel": "Netflix K-Content",
        "thumbnail": "https://img.youtube.com/vi/F9SZf_QxfeA/mqdefault.jpg",
        "category": "TV Show"
    },
    {
        "id": "ZYflvue1yIE",
        "title": "As You Stood By | Official Trailer | Netflix",
        "channel": "Netflix K-Content",
        "thumbnail": "https://img.youtube.com/vi/ZYflvue1yIE/mqdefault.jpg",
        "category": "TV Show"
    },
    {
        "id": "3MVgdmd8ri0",
        "title": "LOVE 911 (반창꼬) - Trailer",
        "channel": "Dark Dreams",
        "thumbnail": "https://img.youtube.com/vi/3MVgdmd8ri0/mqdefault.jpg",
        "category": "Movie"
    },
    {
        "id": "QHv97oWSBz8",
        "title": "Target (Official Trailer) in Korean",
        "channel": "Star Entertainment Trailers",
        "thumbnail": "https://img.youtube.com/vi/QHv97oWSBz8/mqdefault.jpg",
        "category": "Movie"
    },
    {
        "id": "ekG9oxWV6Rw",
        "title": "Once We Were Us (2025) Movie Trailer",
        "channel": "EonTalk",
        "thumbnail": "https://img.youtube.com/vi/ekG9oxWV6Rw/mqdefault.jpg",
        "category": "Movie"
    }
];

export const PROGRESSION = [
    "Basics & Greetings",
    "People & Family",
    "Action Verbs",
    "Descriptive (Adjectives)",
    "Food & Drink",
    "Time & Calendar",
    "Numbers & Math",
    "City & Places",
    "House & Home",
    "Nature & Animals",
    "Abstract Concepts",
    "Misc & Core Vocab"
];
