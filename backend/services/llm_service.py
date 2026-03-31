def generate_keyword_info(keyword):
    keyword = keyword.lower()

    explanation = f"""
📘 {keyword.upper()} – Complete Guide

🔹 What is {keyword}?
{keyword} is an important concept in software engineering used to build scalable and efficient systems.

🔹 Detailed Explanation:
It helps developers design better systems, improve performance, and manage application logic effectively.

🔹 Real-world Use Case:
Used in real-world applications like web apps, APIs, backend systems, and cloud environments.

🔹 Why it is important:
- Improves system design
- Helps in scalability
- Essential for interviews
"""

    questions = [
        {
            "q": f"What is {keyword}?",
            "a": f"{keyword} is a key concept used in software development for building efficient applications."
        },
        {
            "q": f"Where is {keyword} used?",
            "a": f"It is used in real-world systems like web applications, APIs, and backend services."
        },
        {
            "q": f"Explain {keyword} with example.",
            "a": f"In a real-world app, {keyword} helps manage functionality and improve system performance."
        },
        {
            "q": f"What are advantages of {keyword}?",
            "a": f"It improves scalability, modularity, and performance of applications."
        },
        {
            "q": f"What are limitations of {keyword}?",
            "a": f"It may introduce complexity depending on implementation."
        }
    ]

    return {
        "keyword": keyword,
        "explanation": explanation.strip(),
        "questions": questions
    }