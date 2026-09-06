# CV IntelliMatch

> **AI-powered ATS Resume Analyzer** — Match your resume against any job description, discover what's missing, and prepare smarter for the interview.

[![Live Demo](https://img.shields.io/badge/Live-Demo-7C5CFF?style=for-the-badge)](https://cv-intelli-match.vercel.app/)
[![GitHub](https://img.shields.io/badge/Source-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/DHARMESH-RAJ-1/CV-IntelliMatch)

---

## 🚀 Overview

**CV IntelliMatch** is a working AI-powered prototype designed to help job seekers understand how closely their resume matches a specific job description.

Instead of relying only on a generic resume score, the application analyzes the relationship between the **resume and target job description**, identifies missing keywords and contextual signals, and provides AI-assisted interview preparation for the identified gaps.

### The core question

> **"What is missing from my resume for this particular role?"**

CV IntelliMatch turns that question into an actionable analysis.

---

## ✨ Features

- 📄 **Resume Upload** — Upload a resume in PDF, DOC, or DOCX format.
- 📝 **Job Description Analysis** — Paste the complete target job description.
- 🎯 **ATS Compatibility Score** — Get an easy-to-understand match score out of 100.
- 🔎 **Missing Keyword Detection** — Identify keywords and skills that are not sufficiently represented in the resume.
- 🧠 **Contextual Gap Analysis** — Understand why identified keywords may matter for the target role.
- 💬 **AI Interview Preparation** — Generate role-specific interview questions and answers based on identified skill gaps.
- ⚡ **Interactive Results** — Click on individual missing keywords to explore their relevance and interview preparation.
- 🌙 **Modern Dark UI** — A focused interface designed around the resume-analysis workflow.

---

## 🖥️ How It Works

```text
          ┌─────────────────────┐
          │   Upload Resume     │
          │    PDF/DOC/DOCX     │
          └──────────┬──────────┘
                     │
                     ▼
          ┌─────────────────────┐
          │ Paste Job           │
          │ Description         │
          └──────────┬──────────┘
                     │
                     ▼
          ┌─────────────────────┐
          │ Resume + JD         │
          │ Processing           │
          └──────────┬──────────┘
                     │
                     ▼
          ┌─────────────────────┐
          │ Keyword & Context   │
          │ Analysis             │
          └──────────┬──────────┘
                     │
             ┌───────┴────────┐
             ▼                ▼
     ┌──────────────┐  ┌─────────────────┐
     │ ATS Match    │  │ Missing Skills  │
     │ Score        │  │ & Keywords      │
     └──────┬───────┘  └────────┬────────┘
            │                   │
            └─────────┬─────────┘
                      ▼
            ┌───────────────────┐
            │ Gemini-powered    │
            │ Interview Prep    │
            └───────────────────┘
