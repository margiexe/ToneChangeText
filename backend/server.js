import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

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

    const systemPrompt = `
You are an assistant that rewrites user text into the requested tone.
Always respond with the rewritten text only, no explanations or extra notes.

Tones supported: formal, neutral, casual.

Examples:
---
USER: Tone: formal | Text: "I need this report asap."
ASSISTANT: "Could you please provide this report at your earliest convenience?"
---
USER: Tone: casual | Text: "Would you mind grabbing me a coffee?"
ASSISTANT: "Hey, can you grab me a coffee?"
---
USER: Tone: neutral | Text: "The project must be submitted tomorrow."
ASSISTANT: "The project is due tomorrow."
---
USER: Tone: formal | Text: "Send me the file."
ASSISTANT: "Could you kindly send me the file?"
---
USER: Tone: casual | Text: "Please complete the task quickly."
ASSISTANT: "Hey, try to finish the task soon."
---
USER: Tone: neutral | Text: "Let’s meet at 3 pm."
ASSISTANT: "We will meet at 3 pm."
---
    `;

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

app.listen(5000, () =>
    console.log("Backend running on http://localhost:5000")
);