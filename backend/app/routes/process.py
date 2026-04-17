import os

from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.database import get_db
from app.models.file import FileRecord
from app.models.transcript import Transcript
from app.security import get_current_user

from app.services.parser_service import (
    extract_pdf_text,
    extract_docx_text
)

from app.services.whisper_service import (
    transcribe_audio
)

router = APIRouter(
    prefix="/process",
    tags=["Processing"]
)

@router.post("/{file_id}")
def process_file(
    file_id: int,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    file = db.query(
        FileRecord
    ).filter(
        FileRecord.id == file_id,
        FileRecord.owner == user
    ).first()

    if not file:
        raise HTTPException(
            404,
            "File not found"
        )

    ext = file.filetype
    path = file.filepath

    text = ""

    if ext == ".pdf":
        text = extract_pdf_text(path)

    elif ext == ".docx":
        text = extract_docx_text(path)

    elif ext in [
        ".mp3",
        ".wav",
        ".mp4",
        ".mov"
    ]:
        text = transcribe_audio(path)

    else:
        raise HTTPException(
            400,
            "Unsupported file"
        )

    saved = Transcript(
        file_id=file.id,
        owner=user,
        content=text
    )

    db.add(saved)
    db.commit()

    return {
        "message": "Processed",
        "text_length": len(text)
    }