from collections import Counter

def extract_keywords(text):
    words = text.split()
    common = Counter(words).most_common(50)
    keywords = [word for word, freq in common if len(word) > 3]
    return keywords