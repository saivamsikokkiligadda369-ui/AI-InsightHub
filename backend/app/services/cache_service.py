import os
import redis

REDIS_URL = os.getenv(
    "REDIS_URL",
    "redis://localhost:6379/0"
)

client = redis.Redis.from_url(
    REDIS_URL,
    decode_responses=True
)

def get_cache(key):
    return client.get(key)

def set_cache(
    key,
    value,
    ttl=300
):
    client.setex(
        key,
        ttl,
        value
    )

def ping_cache():
    try:
        client.ping()
        return True
    except:
        return False