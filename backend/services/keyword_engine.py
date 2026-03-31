import re

STOPWORDS = {
    "the", "and", "for", "with", "this", "that", "are", "was",
    "have", "has", "had", "from", "they", "their"
}

def extract_keywords(text):
    words = re.findall(r'\b[a-zA-Z]{3,}\b', text.lower())

    keywords = [w for w in words if w not in STOPWORDS]

    return list(set(keywords))