from fastapi import FastAPI
from routes import analyze
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ✅ CORS should be OUTSIDE any function
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Include routes
app.include_router(analyze.router, prefix="/analyze")

# ✅ Home route
@app.get("/")
def home():
    return {"message": "ATS Checker AI Backend Running 🚀"}