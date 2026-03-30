from fastapi import APIRouter, UploadFile, File, Form
from services.resume_parser import extract_resume_text
from services.jd_parser import process_jd
from services.embedding_service import compute_similarity
from services.keyword_engine import extract_keywords
from services.scoring_engine import calculate_score
from services.llm_service import generate_keyword_info

router = APIRouter()

# 🔹 MAIN ANALYSIS API
@router.post("/")
async def analyze_resume(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    # Extract text
    resume_text = extract_resume_text(resume.file)
    jd_text = process_jd(job_description)

    # Keywords
    resume_keywords = extract_keywords(resume_text)
    jd_keywords = extract_keywords(jd_text)

    # Missing keywords
    missing_keywords = list(set(jd_keywords) - set(resume_keywords))

    # Similarity
    similarity = compute_similarity(resume_text, jd_text)

    # Score
    score = calculate_score(resume_keywords, jd_keywords, similarity)

    return {
        "ats_score": score,
        "missing_keywords": missing_keywords[:10],  # limit
        "similarity": round(similarity, 2)
    }


# 🔥 KEYWORD CLICK API (YOUR USP FEATURE)
@router.get("/keyword-info")
def keyword_info(keyword: str):
    from services.llm_service import generate_keyword_info

    result = generate_keyword_info(keyword)

    return result 