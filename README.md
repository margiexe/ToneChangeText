# ✨ Tone Transform

Transform your text into different tones — formal, casual, polite, friendly, professional, funny, serious, creative, or persuasive — with the power of AI.  
This project uses the [Mistral API](https://docs.mistral.ai/) for tone transformation and provides a modern React frontend with undo/redo support.

---

## 📑 Table of Contents

- [🚀 Features](#features)
- [📂 Project Structure](#project-structure)
- [⚙ Setup & Installation](#setup--installation)
- [🖊 Usage](#usage)
- [🔧 API Reference](#api-reference)
- [🎨 Supported Tones](#supported-tones)
- [🛠 Tech Stack](#tech-stack)

---

## Features

- 🎨 *Tone Transformation* — Rewrite text into multiple tones with one click.
- ⏪ *Undo & Redo* — Easily go back and forth between edits.
- ⚡ *AI-powered* — Uses Mistral's mistral-small model for natural and fluent rewrites.
- 🖥 *Modern UI* — Beautiful React + Tailwind CSS frontend with animated UI.
- 🔑 *Customizable* — Supports multiple tones, easy to extend.

---

## Project Structure


ToneChangeText/
│
├── backend/
│ ├── server.js # Express server, API routes, Mistral integration
│ ├── prompts.js # Tone system prompt and examples
│ └── .env # API keys (not committed)
│
├── frontend/
│ ├── components/
│ │ └── TextEditor.jsx # Main UI for text editing and tone selection
│ ├── index.html
│ ├── package.json
│ └── ...
│
└── README.md # Documentation


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

1. Open the frontend in your browser.
2. Type/paste your text in the input area.
3. Pick a tone (e.g., *Formal, **Funny, **Professional*).
4. Watch your text transform instantly.

      - Use *Undo* ↶ or *Redo* ↷ to navigate through edits.

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

- *Backend:* Node.js, Express, Mistral API
- *Frontend:* React (Vite), Tailwind CSS
