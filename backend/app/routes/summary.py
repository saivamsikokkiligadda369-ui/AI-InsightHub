from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.database import get_db
from app.models.transcript import Transcript
from app.security import get_current_user

from app.services.summary_service import (
    generate_summary,
    extract_topics
)

router = APIRouter(
    prefix="/summary",
    tags=["Summary"]
)

@router.get("/")
def summary(
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
            "No processed files"
        )

    text = "\n".join(
        d.content[:3000]
        for d in docs
    )

    return {
        "summary":
            generate_summary(text),
        "topics":
            extract_topics(text)
    }