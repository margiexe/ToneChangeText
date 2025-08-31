Deployed link : https://tonechangetext.onrender.com/

A full-stack web application that allows users to **edit text** and **adjust its tone** (e.g., formal ↔ casual) using AI.  
The project is split into two parts: 

Frontend : ReactJS
Backend : Express and Node

AI used for tone handling : Mistral small model (https://docs.mistral.ai/api/)


## To run project in localhost : 
- Clone the Repository

git clone https://github.com/margiexe/ToneChangeText.git
cd ToneChangeText

- go to directory frontend (cd frontend)
- run commands : 
    'npm install' then 'npm run dev'
- open another terminal
- go to directory backend (cd backend)
- run commands : 
    'npm install' then 'node server.js'

Frontend runs on [http://localhost:5173](http://localhost:5173) (default Vite port).
Backend runs on [http://localhost:5000](http://localhost:5000).


You can add examples and prompts into backend/prompts.js to enhance the response


## Features
- Rich text editor to input and edit text  
- Tone picker with multiple options (formal, casual, neutral, etc.)  
- Undo/redo history functionality  
- API integration with AI model for tone transformation  
- Deployed on **Render**  


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


## Tech Stack
- **Frontend**: React.js, Tailwind CSS  
- **Backend**: Node.js, Express.js  
- **AI API**: Mistral small API  
- **Deployment**: Render  


## Project Structure
root/
├── backend/ # Node.js + Express API
│ ├── server.js
│ ├── routes/
│ └── .env #API_KEYS
├── frontend/ # React frontend
│ ├── src/
│ ├── public/
│ └── package.json
└── README.md


## versions
node : 22.19.0

