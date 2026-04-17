import PyPDF2
from docx import Document

def extract_pdf_text(path):
    text = ""

    with open(path, "rb") as f:
        reader = PyPDF2.PdfReader(f)

        for page in reader.pages:
            text += page.extract_text() + "\n"

    return text

def extract_docx_text(path):
    doc = Document(path)

    text = "\n".join(
        p.text for p in doc.paragraphs
    )

    return text