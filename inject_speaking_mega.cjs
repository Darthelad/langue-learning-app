const fs = require('fs');

const conversationalPhrases = [
    {
        en: "Hello, how are you?",
        es: "Hola, ¿cómo estás?",
        fr: "Bonjour, comment ça va ?",
        pt: "Olá, como você está?",
        it: "Ciao, come stai?",
        ru: "Привет, как дела?",
        he: "שלום, מה שלומך?",
        ko: "안녕하세요, 어떻게 지내세요?"
    },
    {
        en: "I am doing great, thank you.",
        es: "Estoy muy bien, gracias.",
        fr: "Je vais très bien, merci.",
        pt: "Estou ótimo, obrigado.",
        it: "Sto benissimo, grazie.",
        ru: "У меня всё отлично, спасибо.",
        he: "אני בסדר גמור, תודה.",
        ko: "저는 아주 잘 지내요, 감사합니다."
    },
    {
        en: "What is your name?",
        es: "¿Cómo te llamas?",
        fr: "Comment tu t'appelles ?",
        pt: "Como você se chama?",
        it: "Come ti chiami?",
        ru: "Как тебя зовут?",
        he: "איך קוראים לך?",
        ko: "이름이 뭐예요?"
    },
    {
        en: "My name is...",
        es: "Me llamo...",
        fr: "Je m'appelle...",
        pt: "Meu nome é...",
        it: "Mi chiamo...",
        ru: "Меня зовут...",
        he: "קוראים לי...",
        ko: "제 이름은... 입니다."
    },
    {
        en: "Nice to meet you.",
        es: "Encantado de conocerte.",
        fr: "Enchanté.",
        pt: "Prazer em conhecer você.",
        it: "Piacere di conoscerti.",
        ru: "Приятно познакомиться.",
        he: "נעים מאוד.",
        ko: "만나서 반갑습니다."
    },
    {
        en: "Where are you from?",
        es: "¿De dónde eres?",
        fr: "D'où viens-tu ?",
        pt: "De onde você é?",
        it: "Di dove sei?",
        ru: "Откуда ты?",
        he: "מאיפה אתה?",
        ko: "어디에서 왔어요?"
    },
    {
        en: "I am from...",
        es: "Soy de...",
        fr: "Je viens de...",
        pt: "Eu sou de...",
        it: "Sono di...",
        ru: "Я из...",
        he: "אני מ...",
        ko: "저는 ...에서 왔어요."
    },
    {
        en: "Do you speak English?",
        es: "¿Hablas inglés?",
        fr: "Parles-tu anglais ?",
        pt: "Você fala inglês?",
        it: "Parli inglese?",
        ru: "Ты говоришь по-английски?",
        he: "אתה מדבר אנגלית?",
        ko: "영어를 할 수 있어요?"
    },
    {
        en: "I speak a little bit.",
        es: "Hablo un poco.",
        fr: "Je parle un petit peu.",
        pt: "Eu falo um pouco.",
        it: "Parlo un po'.",
        ru: "Я немного говорю.",
        he: "אני מדבר קצת.",
        ko: "조금 할 수 있어요."
    },
    {
        en: "I don't understand.",
        es: "No entiendo.",
        fr: "Je ne comprends pas.",
        pt: "Não entendo.",
        it: "Non capisco.",
        ru: "Я не понимаю.",
        he: "אני לא מבין.",
        ko: "모르겠어요."
    },
    {
        en: "Can you speak more slowly, please?",
        es: "¿Puedes hablar más despacio, por favor?",
        fr: "Pouvez-vous parler plus lentement, s'il vous plaît ?",
        pt: "Você pode falar mais devagar, por favor?",
        it: "Puoi parlare più lentamente, per favore?",
        ru: "Не мог бы ты говорить медленнее, пожалуйста?",
        he: "אתה יכול לדבר יותר לאט, בבקשה?",
        ko: "좀 더 천천히 말해 주시겠어요?"
    },
    {
        en: "Can you repeat that?",
        es: "¿Puedes repetir eso?",
        fr: "Tu peux répéter ça ?",
        pt: "Você pode repetir isso?",
        it: "Puoi ripetere?",
        ru: "Не мог бы ты повторить?",
        he: "אתה יכול לחזור על זה?",
        ko: "다시 한 번 말해 줄래요?"
    },
    {
        en: "Excuse me, where is the bathroom?",
        es: "Disculpe, ¿dónde está el baño?",
        fr: "Excusez-moi, où sont les toilettes ?",
        pt: "Com licença, onde fica o banheiro?",
        it: "Mi scusi, dov'è il bagno?",
        ru: "Извините, где туалет?",
        he: "סליחה, איפה השירותים?",
        ko: "실례합니다, 화장실이 어디에 있어요?"
    },
    {
        en: "How much does this cost?",
        es: "¿Cuánto cuesta esto?",
        fr: "Combien ça coûte ?",
        pt: "Quanto custa isso?",
        it: "Quanto costa questo?",
        ru: "Сколько это стоит?",
        he: "כמה זה עולה?",
        ko: "이거 얼마예요?"
    },
    {
        en: "I would like to order.",
        es: "Me gustaría pedir.",
        fr: "Je voudrais commander.",
        pt: "Eu gostaria de fazer o pedido.",
        it: "Vorrei ordinare.",
        ru: "Я бы хотел сделать заказ.",
        he: "אני רוצה להזמין.",
        ko: "주문하고 싶어요."
    },
    {
        en: "The check, please.",
        es: "La cuenta, por favor.",
        fr: "L'addition, s'il vous plaît.",
        pt: "A conta, por favor.",
        it: "Il conto, per favore.",
        ru: "Счёт, пожалуйста.",
        he: "חשבון, בבקשה.",
        ko: "계산해 주세요."
    },
    {
        en: "Can I pay with a credit card?",
        es: "¿Puedo pagar con tarjeta de crédito?",
        fr: "Puis-je payer par carte de crédit ?",
        pt: "Posso pagar com cartão de crédito?",
        it: "Posso pagare con la carta di credito?",
        ru: "Могу я оплатить кредитной картой?",
        he: "אפשר לשלם בכרטיס אשראי?",
        ko: "신용카드로 계산할 수 있나요?"
    },
    {
        en: "What time is it?",
        es: "¿Qué hora es?",
        fr: "Quelle heure est-il ?",
        pt: "Que horas são?",
        it: "Che ore sono?",
        ru: "Который час?",
        he: "מה השעה?",
        ko: "몇 시예요?"
    },
    {
        en: "I need some help, please.",
        es: "Necesito ayuda, por favor.",
        fr: "J'ai besoin d'aide, s'il vous plaît.",
        pt: "Preciso de ajuda, por favor.",
        it: "Ho bisogno di aiuto, per favore.",
        ru: "Мне нужна помощь, пожалуйста.",
        he: "אני צריך עזרה, בבקשה.",
        ko: "도움이 필요해요."
    },
    {
        en: "I am lost.",
        es: "Estoy perdido.",
        fr: "Je suis perdu.",
        pt: "Estou perdido.",
        it: "Mi sono perso.",
        ru: "Я заблудился.",
        he: "הלכתי לאיבוד.",
        ko: "길을 잃었어요."
    },
    {
        en: "Have a great day!",
        es: "¡Que tengas un buen día!",
        fr: "Passez une bonne journée !",
        pt: "Tenha um ótimo dia!",
        it: "Buona giornata!",
        ru: "Хорошего дня!",
        he: "שיהיה לך יום טוב!",
        ko: "좋은 하루 보내세요!"
    },
    {
        en: "I love learning languages.",
        es: "Me encanta aprender idiomas.",
        fr: "J'adore apprendre des langues.",
        pt: "Eu amo aprender idiomas.",
        it: "Amo imparare le lingue.",
        ru: "Я люблю изучать языки.",
        he: "אני אוהב ללמוד שפות.",
        ko: "저는 언어 배우는 것을 좋아해요."
    },
    {
        en: "What are you doing this weekend?",
        es: "¿Qué vas a hacer este fin de semana?",
        fr: "Que fais-tu ce week-end ?",
        pt: "O que você vai fazer neste fim de semana?",
        it: "Cosa fai questo fine settimana?",
        ru: "Что ты делаешь в эти выходные?",
        he: "מה אתה עושה בסוף השבוע?",
        ko: "이번 주말에 뭐 해요?"
    },
    {
        en: "I am feeling a bit tired.",
        es: "Me siento un poco cansado.",
        fr: "Je me sens un peu fatigué.",
        pt: "Estou me sentindo um pouco cansado.",
        it: "Mi sento un po' stanco.",
        ru: "Я чувствую себя немного уставшим.",
        he: "אני מרגיש קצת עייף.",
        ko: "조금 피곤해요."
    },
    {
        en: "Are you hungry?",
        es: "¿Tienes hambre?",
        fr: "As-tu faim ?",
        pt: "Você está com fome?",
        it: "Hai fame?",
        ru: "Ты голоден?",
        he: "אתה רעב?",
        ko: "배고파요?"
    },
    {
        en: "This is very delicious.",
        es: "Esto es muy delicioso.",
        fr: "C'est très délicieux.",
        pt: "Isso é muito gostoso.",
        it: "Questo è molto delizioso.",
        ru: "Это очень вкусно.",
        he: "זה מאוד טעים.",
        ko: "이거 정말 맛있네요."
    },
    {
        en: "I will call you later.",
        es: "Te llamaré más tarde.",
        fr: "Je t'appellerai plus tard.",
        pt: "Eu te ligo mais tarde.",
        it: "Ti chiamo più tardi.",
        ru: "Я позвоню тебе позже.",
        he: "אני אתקשר אליך מאוחר יותר.",
        ko: "나중에 전화할게요."
    },
    {
        en: "What is your favorite food?",
        es: "¿Cuál es tu comida favorita?",
        fr: "Quelle est ta nourriture préférée ?",
        pt: "Qual é a sua comida favorita?",
        it: "Qual è il tuo cibo preferito?",
        ru: "Какая твоя любимая еда?",
        he: "מה האוכל האהוב עליך?",
        ko: "가장 좋아하는 음식이 뭐예요?"
    },
    {
        en: "How is the weather today?",
        es: "¿Cómo está el clima hoy?",
        fr: "Quel temps fait-il aujourd'hui ?",
        pt: "Como está o tempo hoje?",
        it: "Com'è il tempo oggi?",
        ru: "Какая сегодня погода?",
        he: "איך מזג האוויר היום?",
        ko: "오늘 날씨가 어때요?"
    },
    {
        en: "I am sorry, I am late.",
        es: "Lo siento, llego tarde.",
        fr: "Je suis désolé, je suis en retard.",
        pt: "Desculpe, estou atrasado.",
        it: "Scusa, sono in ritardo.",
        ru: "Извини, я опоздал.",
        he: "סליחה, אני מאחר.",
        ko: "미안해요, 늦었어요."
    }
];

const fileMaps = [
    { file: 'src/english_data.js', langKey: 'en' },
    { file: 'src/spanish_data.js', langKey: 'es' },
    { file: 'src/french_data.js', langKey: 'fr' },
    { file: 'src/portuguese_data.js', langKey: 'pt' },
    { file: 'src/russian_data.js', langKey: 'ru' },
    { file: 'src/korean_data.js', langKey: 'ko' },
    { file: 'src/hebrew_data.js', langKey: 'he' },
    { file: 'src/data.js', langKey: 'it' } // Italian
];

fileMaps.forEach(({ file, langKey }) => {
    try {
        let content = fs.readFileSync(file, 'utf8');

        // Find existing IDIOMS array
        const idiomsRegex = /(export const IDIOMS|const IDIOMS) = \[([\s\S]*?)\];/;
        const match = content.match(idiomsRegex);

        if (match) {
            let existingArray = [];
            try {
                // Safely evaluate the existing array
                eval(`existingArray = [${match[2]}]`);
            } catch (e) {
                console.error(`Failed to parse IDIOMS array in ${file}, skipping.`);
                return;
            }

            // Create a Set of existing meanings to prevent duplicates
            const existingMeanings = new Set(existingArray.map(item => item.meaning.toLowerCase()));

            const newIdioms = conversationalPhrases
                .filter(item => !existingMeanings.has(item.en.toLowerCase()))
                .map(item => {
                    return {
                        phrase: item[langKey],
                        meaning: item.en,
                        category: "Conversational"
                    };
                });

            if (newIdioms.length > 0) {
                const mergedArray = [...existingArray, ...newIdioms];
                const prefix = match[1];

                // Construct updated string avoiding regex capture limits by doing exact slice injections
                const updatedString = `${prefix} = [\n    ` + mergedArray.map(v => JSON.stringify(v)).join(',\n    ') + `\n];`;
                content = content.replace(idiomsRegex, updatedString);

                fs.writeFileSync(file, content, 'utf8');
                console.log(`✅ Injected ${newIdioms.length} new Speaking Phrases into ${file}`);
            } else {
                console.log(`⏭️ No new phrases to inject for ${file} (already exist).`);
            }
        } else {
            console.warn(`❌ Could not find IDIOMS array in ${file}`);
        }
    } catch (err) {
        console.error(`Error processing ${file}:`, err);
    }
});
