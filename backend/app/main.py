from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import (
    Base,
    engine
)

from app.middleware.rate_limit import (
    rate_limit
)

from app.routes.auth import router as auth_router
from app.routes.upload import router as upload_router
from app.routes.process import router as process_router
from app.routes.chat import router as chat_router
from app.routes.summary import router as summary_router
from app.routes.timestamps import router as timestamps_router
from app.routes.health import router as health_router

Base.metadata.create_all(
    bind=engine
)

app = FastAPI(
    title="AI InsightHub API",
    version="1.0.0",
    description="""
AI-powered document/media Q&A platform
with summaries and timestamps.
"""
)

app.middleware("http")(
    rate_limit
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(auth_router)
app.include_router(upload_router)
app.include_router(process_router)
app.include_router(chat_router)
app.include_router(summary_router)
app.include_router(timestamps_router)
app.include_router(health_router)

@app.get("/")
def root():
    return {
        "message":
        "AI InsightHub Running"
    }