from fastapi import APIRouter
from app.services.cache_service import (
    ping_cache
)

router = APIRouter(
    prefix="/health",
    tags=["Health"]
)

@router.get("/")
def health():
    return {
        "status": "ok",
        "redis": ping_cache()
    }