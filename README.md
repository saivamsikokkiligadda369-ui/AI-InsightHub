[README.md](https://github.com/user-attachments/files/26817957/README.md)
# 🤖 AI Insight Hub

AI Insight Hub is a full-stack AI-powered platform that processes uploaded media/files, generates transcripts, extracts insights, and enables interactive chat-based analysis.

It combines speech-to-text, NLP, and LLM-based summarization to help users quickly understand and analyze content.

---

## 🚀 Key Features

### 📂 File Processing
- Upload audio/video/files
- Automatic transcription using Whisper
- File parsing and preprocessing

### 🧠 AI Insights
- AI-generated summaries
- Timestamp-based insights
- Intelligent content extraction

### 💬 Chat System
- Chat with your data using AI
- Context-aware responses
- Integrated LLM (Ollama)

### 🔐 Authentication
- Secure user login & authentication
- Protected routes (frontend + backend)

### ⚡ Performance
- Caching support
- Rate limiting middleware
- Optimized API handling

---

## 🏗️ Project Architecture

AI-insightHub/
│
├── backend/ # FastAPI Backend
│ ├── app/
│ │ ├── main.py # Entry point
│ │ ├── config.py # Configuration
│ │ ├── database.py # DB connection
│ │ ├── security.py # Auth & security
│ │
│ │ ├── models/ # Database models
│ │ ├── schemas/ # Pydantic schemas
│ │ ├── routes/ # API endpoints
│ │ │ ├── auth.py
│ │ │ ├── chat.py
│ │ │ ├── upload.py
│ │ │ ├── summary.py
│ │ │ ├── process.py
│ │ │ └── timestamps.py
│ │
│ │ ├── services/ # Core logic
│ │ │ ├── whisper_service.py
│ │ │ ├── ollama_service.py
│ │ │ ├── summary_service.py
│ │ │ ├── parser_service.py
│ │ │ └── cache_service.py
│ │
│ │ └── middleware/
│ │ └── rate_limit.py
│ │
│ └── requirements.txt
│
├── frontend/ # React Frontend
│ ├── src/
│ │ ├── pages/ # Main UI pages
│ │ │ ├── Dashboard.jsx
│ │ │ ├── UploadPage.jsx
│ │ │ ├── InsightsPage.jsx
│ │ │ ├── ChatPage.jsx
│ │ │ └── Login.jsx
│ │ │
│ │ ├── components/ # Reusable components
│ │ ├── api/ # API integration
│ │ ├── context/ # State management
│ │ └── utils/
│ │
│ └── package.json
│
└── README.md


---

## 🛠️ Tech Stack

### Backend
- FastAPI
- Python
- Whisper (Speech-to-Text)
- Ollama (LLM integration)
- Pydantic
- JWT Authentication

### Frontend
- React.js
- Axios
- Context API

---

## ⚙️ Setup Instructions

### 🔧 Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

Backend runs at:

http://127.0.0.1:8000
💻 Frontend Setup
cd frontend
npm install
npm start

Frontend runs at:

http://localhost:3000
