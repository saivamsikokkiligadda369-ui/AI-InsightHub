from pydantic import BaseModel

class FileResponse(BaseModel):
    id: int
    filename: str
    filetype: str
    filepath: str
    owner: str

    class Config:
        orm_mode = True