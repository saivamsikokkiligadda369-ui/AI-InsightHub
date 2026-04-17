from sqlalchemy import (
    Column,
    Integer,
    String,
    Text
)

from app.database import Base

class Transcript(Base):
    __tablename__ = "transcripts"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    file_id = Column(Integer)
    owner = Column(String)
    content = Column(Text)