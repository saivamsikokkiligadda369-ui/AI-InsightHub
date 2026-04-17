from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.database import get_db
from app.models.transcript import Transcript
from app.security import get_current_user

from app.services.timestamp_service import (
    create_timestamps
)

router = APIRouter(
    prefix="/timestamps",
    tags=["Timestamps"]
)

@router.get("/")
def timestamps(
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
        d.content
        for d in docs
    )

    return {
        "timestamps":
            create_timestamps(text)
    }