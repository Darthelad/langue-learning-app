const https = require('https');

const queries = [
    { lang: 'Italian', url: 'https://www.youtube.com/results?search_query=learn+italian+for+beginners' },
    { lang: 'Korean', url: 'https://www.youtube.com/results?search_query=learn+korean+for+beginners' },
    { lang: 'Hebrew', url: 'https://www.youtube.com/results?search_query=learn+hebrew+for+beginners' },
    { lang: 'Spanish', url: 'https://www.youtube.com/results?search_query=learn+spanish+for+beginners' }
];

async function fetchHTML(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

function extractVideos(html) {
    const match = html.match(/var ytInitialData = (\{.*?\});<\/script>/);
    if (!match) return [];
    const data = JSON.parse(match[1]);
    const contents = data.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents[0]?.itemSectionRenderer?.contents || [];

    const results = [];
    for (const item of contents) {
        if (item.videoRenderer) {
            const v = item.videoRenderer;
            results.push({
                id: v.videoId,
                title: v.title?.runs[0]?.text || '',
                channel: v.ownerText?.runs[0]?.text || '',
                thumbnail: `https://img.youtube.com/vi/${v.videoId}/mqdefault.jpg`
            });
            if (results.length === 4) break;
        }
    }
    return results;
}

async function run() {
    const finalObj = {};
    for (const q of queries) {
        const html = await fetchHTML(q.url);
        finalObj[q.lang] = extractVideos(html);
    }
    console.log(JSON.stringify(finalObj, null, 2));
}

run();
