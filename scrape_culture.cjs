const https = require('https');

const langs = ['Spanish', 'Hebrew'];
const categories = ['Music', 'TV Show', 'Movie'];

const queries = {
    'Spanish': {
        'Music': 'reggaeton 2024 hit official',
        'TV Show': 'netflix la casa de papel trailer',
        'Movie': 'el laberinto del fauno trailer'
    },
    'Hebrew': {
        'Movie': 'israeli cinema movie trailer official'
    }
};

async function fetchHTML(url) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

function extractVideos(html, limit = 3) {
    const match = html.match(/var ytInitialData = (\{.*?\});<\/script>/);
    if (!match) return [];

    let data;
    try {
        data = JSON.parse(match[1]);
    } catch (e) {
        return [];
    }

    const results = [];
    function findVideos(obj) {
        if (results.length >= limit) return;
        if (!obj || typeof obj !== 'object') return;

        if (obj.videoRenderer && obj.videoRenderer.videoId && obj.videoRenderer.lengthText) {
            results.push({
                id: obj.videoRenderer.videoId,
                title: obj.videoRenderer.title?.runs[0]?.text || '',
                channel: obj.videoRenderer.ownerText?.runs[0]?.text || '',
                thumbnail: `https://img.youtube.com/vi/${obj.videoRenderer.videoId}/mqdefault.jpg`
            });
            return;
        }

        for (const key in obj) {
            findVideos(obj[key]);
        }
    }

    findVideos(data);
    return results;
}

async function run() {
    const finalObj = {};
    for (const lang of langs) {
        finalObj[lang] = [];
        const cats = lang === 'Spanish' ? categories : ['Movie'];
        for (const cat of cats) {
            const q = queries[lang][cat].replace(/ /g, '+');
            const url = `https://www.youtube.com/results?search_query=${q}`;
            const html = await fetchHTML(url);
            const videos = extractVideos(html, 3);
            for (const v of videos) {
                finalObj[lang].push({ ...v, category: cat });
            }
            await new Promise(r => setTimeout(r, 500));
        }
    }
    console.log(JSON.stringify(finalObj, null, 2));
}

run();
