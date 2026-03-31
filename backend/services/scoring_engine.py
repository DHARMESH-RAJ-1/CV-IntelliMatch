def calculate_score(resume_keywords, jd_keywords, similarity):
    if not jd_keywords:
        return 0

    matched = set(resume_keywords).intersection(set(jd_keywords))

    keyword_score = len(matched) / len(jd_keywords)

    final_score = (keyword_score * 0.6 + similarity * 0.4) * 100

    return round(final_score, 2)