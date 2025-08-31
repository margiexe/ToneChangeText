# ✨ Tone Transform

Transform your text into different tones => formal, casual, polite, friendly, professional, funny, serious, creative, or persuasive with the power of AI.  
This project uses the [Mistral API](https://docs.mistral.ai/) for tone transformation and provides a modern React frontend with undo/redo support.

## Live Demo

🌐 *Visit the live application*: [https://tonechangetext.onrender.com/](https://tonechangetext.onrender.com/)

The application is deployed on Render and ready to use immediately. No setup required!

---

## 📑 Table of Contents

## 📑 Contents

- [Live Demo](#live-demo)
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Supported Tones](#supported-tones)
- [Tech Stack](#tech-stack)

---

## Features

- ✅ *Tone Transformation* — Rewrite text into multiple tones with one click.
- ✅ *Undo & Redo* — Easily go back and forth between edits with full history functionality.
- ✅ *AI-powered* — Uses Mistral's mistral-small model for natural and fluent rewrites.
- ✅ *Modern UI* — Beautiful React + Tailwind CSS frontend with animated UI.
- ✅ *Rich Text Editor* — Input and edit text with an intuitive interface.
- ✅ *Customizable* — Supports multiple tones, easy to extend with new prompts.
- ✅ *Deployed* — Live on Render for immediate access.

---

## Project Structure


ToneChangeText/
│
├── backend/                    # Node.js + Express API
│ ├── server.js                # Express server, API routes, Mistral integration
│ ├── prompts.js               # Tone system prompt and examples
│ ├── routes/                  # API route handlers
│
├── frontend/                   # React frontend
│ ├── src/
│ ├── components/
│ │ └── TextEditor.jsx         # Main UI for text editing and tone selection
│ ├── public/
│ ├── index.html
│ ├── package.json
│ └── ...
│
└── README.md


---

## Setup & Installation

### 1. Clone the Repository

bash
git clone https://github.com/margiexe/ToneChangeText.git
cd ToneChangeText


### 2. Backend Setup

bash
cd backend
npm install


Create a .env file inside backend/ with:


MISTRAL_API_KEY=your_mistral_api_key_here
PORT=5000


Start the backend:

bash
node server.js


### 3. Frontend Setup

bash
cd ../frontend
npm install
npm run dev


Frontend runs on [http://localhost:5173](http://localhost:5173) (default Vite port).
Backend runs on [http://localhost:5000](http://localhost:5000).

---

## Usage

1. *Visit the live demo* at [https://tonechangetext.onrender.com/](https://tonechangetext.onrender.com/) or run locally:
2. Type/paste your text in the input area.
3. Pick a tone (e.g., *Formal, **Funny, **Professional*).
4. Watch your text transform instantly.
5. Use *Undo* ↶ or *Redo* ↷ to navigate through your edit history.

*Pro Tip*: You can enhance the AI responses by adding custom examples and prompts in backend/prompts.js!

---

## API Reference

### Endpoint


POST /api/change-tone


### Request Body

json
{
	"text": "I need this report asap.",
	"tone": "formal"
}


### Response

json
{
	"result": "Could you please provide this report at your earliest convenience?"
}


---

## Supported Tones

- Formal 👔
- Casual 😎
- Polite 🙏
- Friendly 😊
- Professional 💼
- Funny 😂
- Serious 🎯
- Creative 🎨
- Persuasive 💪

---

## Tech Stack

- *Frontend*: React.js (Vite), Tailwind CSS
- *Backend*: Node.js (v22.19.0), Express.js
- *AI API*: Mistral Small API
- *Deployment*: Render
