import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
import { toneSystemPrompt } from "./prompts.js";

import path from "path";
import { fileURLToPath } from "url";

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env variables
dotenv.config({ path: './.env' }); 

const app = express();
app.use(cors());
app.use(express.json());

// API route to change tone
app.post("/api/change-tone", async (req, res) => {
    try {
        const { text, tone } = req.body;

        if (!text || !tone) {
            return res.status(400).json({ error: "Missing 'text' or 'tone' field" });
        }

        const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "mistral-small",
                messages: [
                    { role: "system", content: toneSystemPrompt },
                    { role: "user", content: `Tone: ${tone}\n\nText: ${text}` },
                ],
                temperature: 0.7,
                max_tokens: 512,
            }),
        });

        if (!response.ok) {
            console.error("Mistral API error:", response.status, response.statusText);
            return res.status(500).json({ error: "Failed to communicate with Mistral API" });
        }

        const data = await response.json();

        if (!data?.choices?.[0]?.message?.content) {
            console.error("Invalid Mistral response:", data);
            return res.status(500).json({ error: "Invalid response from Mistral" });
        }

        res.json({ result: data.choices[0].message.content.trim() });

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
});

// Serve frontend in production
const frontendDist = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendDist));

// Fallback to index.html for SPA routes
// app.get("*", (req, res) => {
//     res.sendFile(path.join(frontendDist, "index.html"));
// });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
