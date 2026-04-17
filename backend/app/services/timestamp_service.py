import math

def create_timestamps(text):
    words = text.split()

    chunk_size = 120
    results = []

    for i in range(
        0,
        len(words),
        chunk_size
    ):
        chunk = words[i:i+chunk_size]

        seconds = int(
            (i / chunk_size) * 30
        )

        minute = seconds // 60
        sec = seconds % 60

        label = (
            f"{minute:02d}:{sec:02d}"
        )

        preview = " ".join(
            chunk[:12]
        )

        results.append({
            "time": label,
            "seconds": seconds,
            "topic": preview
        })

    return results