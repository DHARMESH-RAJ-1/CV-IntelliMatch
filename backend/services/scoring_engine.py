def calculate_score(resume_keywords, jd_keywords, similarity):
    keyword_match = len(set(resume_keywords) & set(jd_keywords)) / (len(jd_keywords) + 1)

    score = (keyword_match * 0.4 + similarity * 0.4 + 0.2) * 100

    return round(score, 2)