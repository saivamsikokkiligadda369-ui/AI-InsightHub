import time
from fastapi import Request
from fastapi.responses import JSONResponse

VISITS = {}

LIMIT = 60
WINDOW = 60

async def rate_limit(
    request: Request,
    call_next
):
    ip = request.client.host
    now = time.time()

    history = VISITS.get(ip, [])

    history = [
        t for t in history
        if now - t < WINDOW
    ]

    if len(history) >= LIMIT:
        return JSONResponse(
            status_code=429,
            content={
                "detail":
                "Too many requests"
            }
        )

    history.append(now)
    VISITS[ip] = history

    response = await call_next(
        request
    )

    return response