import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
import { toneSystemPrompt } from "./prompts.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* using system prompts for better results */
app.post("/api/change-tone", async (req, res) => {  /* API call to mistral AI */
    try {
    const { text, tone } = req.body;

    if (!text || !tone) {
        return res.status(400).json({ error: "Missing 'text' or 'tone' field" });
    }

    const systemPrompt = toneSystemPrompt;

    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
        Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        model: "mistral-small",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Tone: ${tone}\n\nText: ${text}` },
        ],
        temperature: 0.7,
        max_tokens: 512,
        }),
    });

    const data = await response.json();

    if (!data?.choices?.[0]?.message?.content) {
        return res.status(500).json({ error: "Invalid response from Mistral" });
    }

    res.json({ result: data.choices[0].message.content.trim() });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) =>
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
    );
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));