const fs = require('fs');

const extendedKorean = [
    // Basics & Greetings
    { kr: "안녕하세요", rom: "annyeong haseyo", en: "hello", topic: "Basics & Greetings" },
    { kr: "안녕히 가세요", rom: "annyeonghi gaseyo", en: "goodbye (to someone leaving)", topic: "Basics & Greetings" },
    { kr: "감사합니다", rom: "gamsahamnida", en: "thank you", topic: "Basics & Greetings" },
    { kr: "네", rom: "ne", en: "yes", topic: "Basics & Greetings" },
    { kr: "아니요", rom: "aniyo", en: "no", topic: "Basics & Greetings" },
    { kr: "제발", rom: "jebal", en: "please", topic: "Basics & Greetings" },
    { kr: "죄송합니다", rom: "joesonghamnida", en: "sorry", topic: "Basics & Greetings" },
    { kr: "저기요", rom: "jeogiyo", en: "excuse me (to get attention)", topic: "Basics & Greetings" },
    { kr: "환영합니다", rom: "hwanyeonghamnida", en: "welcome", topic: "Basics & Greetings" },

    // People & Family
    { kr: "가족", rom: "gajok", en: "family", topic: "People & Family" },
    { kr: "어머니", rom: "eomeoni", en: "mother", topic: "People & Family" },
    { kr: "아버지", rom: "abeoji", en: "father", topic: "People & Family" },
    { kr: "아들", rom: "adeul", en: "son", topic: "People & Family" },
    { kr: "딸", rom: "ttal", en: "daughter", topic: "People & Family" },
    { kr: "오빠", rom: "oppa", en: "older brother (for female)", topic: "People & Family" },
    { kr: "형", rom: "hyeong", en: "older brother (for male)", topic: "People & Family" },
    { kr: "언니", rom: "eonni", en: "older sister (for female)", topic: "People & Family" },
    { kr: "누나", rom: "nuna", en: "older sister (for male)", topic: "People & Family" },
    { kr: "동생", rom: "dongsaeng", en: "younger sibling", topic: "People & Family" },
    { kr: "친구", rom: "chingu", en: "friend", topic: "People & Family" },
    { kr: "사람", rom: "saram", en: "person", topic: "People & Family" },
    { kr: "남자", rom: "namja", en: "man", topic: "People & Family" },
    { kr: "여자", rom: "yeoja", en: "woman", topic: "People & Family" },
    { kr: "아이", rom: "ai", en: "child", topic: "People & Family" },

    // Food & Drink
    { kr: "음식", rom: "eumsik", en: "food", topic: "Food & Drink" },
    { kr: "물", rom: "mul", en: "water", topic: "Food & Drink" },
    { kr: "밥", rom: "bap", en: "rice / meal", topic: "Food & Drink" },
    { kr: "고기", rom: "gogi", en: "meat", topic: "Food & Drink" },
    { kr: "야채", rom: "yachae", en: "vegetable", topic: "Food & Drink" },
    { kr: "과일", rom: "gwail", en: "fruit", topic: "Food & Drink" },
    { kr: "빵", rom: "ppang", en: "bread", topic: "Food & Drink" },
    { kr: "커피", rom: "keopi", en: "coffee", topic: "Food & Drink" },
    { kr: "차", rom: "cha", en: "tea", topic: "Food & Drink" },
    { kr: "우유", rom: "uyu", en: "milk", topic: "Food & Drink" },
    { kr: "술", rom: "sul", en: "alcohol", topic: "Food & Drink" },
    { kr: "아침", rom: "achim", en: "breakfast / morning", topic: "Food & Drink" },
    { kr: "점심", rom: "jeomsim", en: "lunch", topic: "Food & Drink" },
    { kr: "저녁", rom: "jeonyeok", en: "dinner / evening", topic: "Food & Drink" },
    { kr: "식당", rom: "sikdang", en: "restaurant", topic: "Food & Drink" },

    // Time & Calendar
    { kr: "시간", rom: "sigan", en: "time", topic: "Time & Calendar" },
    { kr: "오늘", rom: "oneul", en: "today", topic: "Time & Calendar" },
    { kr: "내일", rom: "naeil", en: "tomorrow", topic: "Time & Calendar" },
    { kr: "어제", rom: "eoje", en: "yesterday", topic: "Time & Calendar" },
    { kr: "지금", rom: "jigeum", en: "now", topic: "Time & Calendar" },
    { kr: "월요일", rom: "woryoil", en: "monday", topic: "Time & Calendar" },
    { kr: "화요일", rom: "hwayoil", en: "tuesday", topic: "Time & Calendar" },
    { kr: "수요일", rom: "suyoil", en: "wednesday", topic: "Time & Calendar" },
    { kr: "목요일", rom: "mogyoil", en: "thursday", topic: "Time & Calendar" },
    { kr: "금요일", rom: "geumyoil", en: "friday", topic: "Time & Calendar" },
    { kr: "토요일", rom: "toyoil", en: "saturday", topic: "Time & Calendar" },
    { kr: "일요일", rom: "iryoil", en: "sunday", topic: "Time & Calendar" },
    { kr: "주", rom: "ju", en: "week", topic: "Time & Calendar" },
    { kr: "달", rom: "dal", en: "month", topic: "Time & Calendar" },
    { kr: "년", rom: "nyeon", en: "year", topic: "Time & Calendar" },

    // City & Places
    { kr: "가게", rom: "gage", en: "store", topic: "City & Places" },
    { kr: "집", rom: "jip", en: "house", topic: "City & Places" },
    { kr: "학교", rom: "hakgyo", en: "school", topic: "City & Places" },
    { kr: "회사", rom: "hoesa", en: "company / workplace", topic: "City & Places" },
    { kr: "병원", rom: "byeongwon", en: "hospital", topic: "City & Places" },
    { kr: "은행", rom: "eunhaeng", en: "bank", topic: "City & Places" },
    { kr: "공원", rom: "gongwon", en: "park", topic: "City & Places" },
    { kr: "거리", rom: "geori", en: "street", topic: "City & Places" },
    { kr: "역", rom: "yeok", en: "station", topic: "City & Places" },
    { kr: "공항", rom: "gonghang", en: "airport", topic: "City & Places" },

    // Action Verbs
    { kr: "하다", rom: "hada", en: "to do", topic: "Action Verbs" },
    { kr: "가다", rom: "gada", en: "to go", topic: "Action Verbs" },
    { kr: "오다", rom: "oda", en: "to come", topic: "Action Verbs" },
    { kr: "먹다", rom: "meokda", en: "to eat", topic: "Action Verbs" },
    { kr: "마시다", rom: "masida", en: "to drink", topic: "Action Verbs" },
    { kr: "자다", rom: "jada", en: "to sleep", topic: "Action Verbs" },
    { kr: "보다", rom: "boda", en: "to see / watch", topic: "Action Verbs" },
    { kr: "듣다", rom: "deutda", en: "to hear / listen", topic: "Action Verbs" },
    { kr: "말하다", rom: "marhada", en: "to speak", topic: "Action Verbs" },
    { kr: "읽다", rom: "ikda", en: "to read", topic: "Action Verbs" },
    { kr: "쓰다", rom: "sseuda", en: "to write", topic: "Action Verbs" },
    { kr: "사다", rom: "sada", en: "to buy", topic: "Action Verbs" },
    { kr: "알다", rom: "alda", en: "to know", topic: "Action Verbs" },
    { kr: "모르다", rom: "moreuda", en: "to not know", topic: "Action Verbs" },

    // Descriptive (Adjectives)
    { kr: "좋다", rom: "jota", en: "good", topic: "Descriptive (Adjectives)" },
    { kr: "크다", rom: "keuda", en: "big", topic: "Descriptive (Adjectives)" },
    { kr: "작다", rom: "jakda", en: "small", topic: "Descriptive (Adjectives)" },
    { kr: "많다", rom: "manta", en: "many / much", topic: "Descriptive (Adjectives)" },
    { kr: "새롭다", rom: "saeropda", en: "new", topic: "Descriptive (Adjectives)" },
    { kr: "어렵다", rom: "eoryeopda", en: "difficult", topic: "Descriptive (Adjectives)" },
    { kr: "쉽다", rom: "swipda", en: "easy", topic: "Descriptive (Adjectives)" },
    { kr: "맛있다", rom: "masitda", en: "delicious", topic: "Descriptive (Adjectives)" },
    { kr: "예쁘다", rom: "yeppeuda", en: "pretty", topic: "Descriptive (Adjectives)" }
];

function inject(file, newData) {
    let content = fs.readFileSync(file, 'utf8');
    const vocabRegex = /export const VOCABULARY = \[([\s\S]*?)\];/;
    const match = content.match(vocabRegex);

    if (match) {
        try {
            let existingArray;
            eval(`existingArray = [${match[1]}]`);

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

inject('src/korean_data.js', extendedKorean);
