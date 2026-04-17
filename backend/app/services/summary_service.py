from app.services.ollama_service import ask_llm

def generate_summary(text):
    prompt = f"""
Summarize the following content
in clear bullet points.

{text[:5000]}
"""

    return ask_llm(prompt)

def extract_topics(text):
    prompt = f"""
Extract key topics from the
following content as bullets.

{text[:5000]}
"""

    return ask_llm(prompt)