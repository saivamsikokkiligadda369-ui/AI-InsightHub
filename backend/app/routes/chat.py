from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.transcript import Transcript
from app.models.chat import ChatHistory
from app.security import get_current_user
from app.services.ollama_service import ask_llm

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)

class ChatRequest(BaseModel):
    question: str

@router.post("/")
def chat(
    data: ChatRequest,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    docs = db.query(
        Transcript
    ).filter(
        Transcript.owner == user
    ).all()

    if not docs:
        raise HTTPException(
            400,
            "No processed files found"
        )

    context = "\n".join(
        item.content[:3000]
        for item in docs
    )

    prompt = f"""
Use the following content
to answer the question.

Content:
{context}

Question:
{data.question}

Answer clearly:
"""

    answer = ask_llm(prompt)

    saved = ChatHistory(
        owner=user,
        question=data.question,
        answer=answer
    )

    db.add(saved)
    db.commit()

    return {
        "question": data.question,
        "answer": answer
    }

@router.get("/history")
def history(
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    chats = db.query(
        ChatHistory
    ).filter(
        ChatHistory.owner == user
    ).all()

    return chats