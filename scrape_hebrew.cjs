const https = require('https');

const queries = [
    { cat: 'Music', q: 'Omer Adam Tel Aviv Official Video' },
    { cat: 'Music', q: 'Shlomo Artzi Tetaaru lachem official' },
    { cat: 'Music', q: 'Naomi Shemer Yerushalayim Shel Zahav classic' },
    { cat: 'Music', q: 'HaTikva 6 - Hachi Israelit' },
    { cat: 'TV Show', q: 'Shtisel Official Trailer english subtitles' },
    { cat: 'TV Show', q: 'Fauda Netflix Official Trailer' },
    { cat: 'TV Show', q: 'Tehran Apple TV+ Official Trailer' },
    { cat: 'Movie', q: 'Waltz with Bashir Official Trailer' },
    { cat: 'Movie', q: 'Zero Motivation israeli movie trailer english subtitles' },
];

async function fetchHTML(url) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

function extractFirstVideo(html) {
    const match = html.match(/var ytInitialData = (\{.*?\});<\/script>/);
    if (!match) return null;

    let data;
    try { data = JSON.parse(match[1]); } catch (e) { return null; }

    let result = null;
    function findVideos(obj) {
        if (result !== null) return;
        if (!obj || typeof obj !== 'object') return;

        if (obj.videoRenderer && obj.videoRenderer.videoId && obj.videoRenderer.lengthText) {
            result = {
                id: obj.videoRenderer.videoId,
                title: obj.videoRenderer.title?.runs[0]?.text || '',
                channel: obj.videoRenderer.ownerText?.runs[0]?.text || '',
                thumbnail: `https://img.youtube.com/vi/${obj.videoRenderer.videoId}/mqdefault.jpg`
            };
            return;
        }
        for (const key in obj) findVideos(obj[key]);
    }
    findVideos(data);
    return result;
}

async function run() {
    const results = [];
    for (const item of queries) {
        const url = `https://www.youtube.com/results?search_query=${item.q.replace(/ /g, '+')}`;
        const html = await fetchHTML(url);
        const video = extractFirstVideo(html);
        if (video) {
            results.push({ ...video, category: item.cat });
        }
        await new Promise(r => setTimeout(r, 500));
    }
    console.log(JSON.stringify(results, null, 2));
}

run();
