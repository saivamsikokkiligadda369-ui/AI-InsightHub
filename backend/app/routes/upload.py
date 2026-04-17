import os
import shutil

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.database import get_db
from app.models.file import FileRecord
from app.security import get_current_user

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)

UPLOAD_DIR = "uploads"

ALLOWED_EXTENSIONS = [
    ".pdf",
    ".mp3",
    ".wav",
    ".mp4",
    ".mov",
    ".docx"
]

@router.post("/")
def upload_file(
    file: UploadFile = File(...),
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    ext = os.path.splitext(
        file.filename
    )[1].lower()

    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type"
        )

    os.makedirs(
        UPLOAD_DIR,
        exist_ok=True
    )

    save_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(
        save_path,
        "wb"
    ) as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    record = FileRecord(
        filename=file.filename,
        filetype=ext,
        filepath=save_path,
        owner=user
    )

    db.add(record)
    db.commit()
    db.refresh(record)

    return {
        "message": "Uploaded",
        "file_id": record.id,
        "filename": record.filename
    }

@router.get("/my-files")
def my_files(
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    files = db.query(
        FileRecord
    ).filter(
        FileRecord.owner == user
    ).all()

    return files