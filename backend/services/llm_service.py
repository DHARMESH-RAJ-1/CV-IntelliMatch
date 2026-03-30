def generate_keyword_info(keyword):
    explanations = {
        "python": "Python is a high-level programming language used for backend, AI, and automation.",
        "docker": "Docker is a tool used to containerize applications for consistent deployment.",
        "api": "API allows communication between different software systems.",
        "sql": "SQL is used to manage and query relational databases.",
        "react": "React is a JavaScript library for building user interfaces."
    }

    questions = {
        "python": [
            "What are Python data types?",
            "Explain OOP in Python.",
            "What is a decorator?"
        ],
        "docker": [
            "What is a Docker container?",
            "Difference between Docker image and container?",
            "What is Dockerfile?"
        ],
        "api": [
            "What is REST API?",
            "Difference between REST and SOAP?",
            "What is status code 404?"
        ]
    }

    return {
        "keyword": keyword,
        "explanation": explanations.get(keyword, f"{keyword} is an important technical concept."),
        "questions": questions.get(keyword, ["Explain this concept.", "Give real-world use case."])
    }