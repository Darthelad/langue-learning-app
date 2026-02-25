/* global process */
export default async function handler(req, res) {
    // 1. Only allow POST requests for the data proxy
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { messages, system } = req.body;

        // 2. Safely read from the backend environment variable
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error("GEMINI_API_KEY is not set in environment variables");
            return res.status(500).json({
                error: "Server Configuration Error: The server administrator has not configured the GEMINI_API_KEY environment variable. Please check the Vercel dashboard."
            });
        }

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Invalid or missing "messages" array in request body' });
        }

        // 3. Re-structure the request for Gemini
        const contents = messages.map(msg => ({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }]
        }));

        const systemInstruction = system ? {
            parts: [{ text: system }]
        } : undefined;

        const requestBody = {
            contents,
            systemInstruction,
        };

        // 4. Server-to-Server ping
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Gemini API Error:", response.status, errorText);
            return res.status(response.status).json({ error: `Gemini API responded with ${response.status}`, details: errorText });
        }

        const data = await response.json();

        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
            return res.status(200).json({ result: data.candidates[0].content.parts[0].text });
        } else {
            return res.status(500).json({ error: 'Unexpected response format from Gemini API', data });
        }
    } catch (error) {
        console.error("Proxy handler error:", error);
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}
