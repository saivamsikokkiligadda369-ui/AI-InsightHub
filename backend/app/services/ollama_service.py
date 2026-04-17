import requests
from app.config import OLLAMA_URL

def ask_llm(prompt):
    payload = {
        "model": "phi3",
        "prompt": prompt,
        "stream": False
    }

    response = requests.post(
        OLLAMA_URL,
        json=payload,
        timeout=120
    )

    data = response.json()

    return data.get(
        "response",
        "No response"
    )