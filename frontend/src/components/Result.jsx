import axios from "axios";
import { useState, useEffect, useRef } from "react";
import "../App.css";

function ScoreRing({ score }) {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);
  const pct = Math.min(Math.max(score, 0), 100);

  useEffect(() => {
    const t = setTimeout(() => {
      setOffset(circumference - (pct / 100) * circumference);
    }, 120);
    return () => clearTimeout(t);
  }, [pct, circumference]);

  const scoreColor = pct >= 75 ? "#34d399" : pct >= 50 ? "#fbbf24" : "#f87171";
  const label = pct >= 75 ? "Strong match" : pct >= 50 ? "Moderate match" : "Needs improvement";

  return (
    <div className="score-section">
      <div className="score-ring-wrap">
        <div className="score-ring-container">
          <svg className="score-ring" width="110" height="110" viewBox="0 0 110 110">
            <defs>
              <linearGradient id="score-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#6c63ff" />
              </linearGradient>
            </defs>
            <circle className="score-ring-track" cx="55" cy="55" r={radius} />
            <circle
              className="score-ring-fill"
              cx="55" cy="55"
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="score-center">
            <span className="score-number">{score}</span>
            <span className="score-label">/ 100</span>
          </div>
        </div>
      </div>

      <div className="score-info">
        <div className="score-headline" style={{ color: scoreColor }}>{label}</div>
        <p className="score-desc">
          Your resume matched <strong style={{ color: "var(--text)" }}>{pct}%</strong> of the
          keywords and contextual signals from the job description.
          {pct < 75 && " Click missing keywords below to learn how to address each gap."}
        </p>
        <div className="score-bar-wrap">
          <div className="score-bar-bg">
            <div
              className="score-bar-fill"
              style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${scoreColor}, #6c63ff)` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function KeywordInfo({ info, loading }) {
  if (loading) {
    return (
      <div className="info-panel">
        <div className="skeleton skeleton-line w40" style={{ height: "28px", marginBottom: "1rem" }} />
        <div className="skeleton skeleton-line w80" />
        <div className="skeleton skeleton-line w60" />
        <div className="skeleton skeleton-line w80" />
      </div>
    );
  }
  if (!info) return null;

  return (
  <div className="info-panel">
    <div className="info-panel-header">
      <h3 className="info-keyword-name">{info.keyword}</h3>
      <span className="info-keyword-tag">Missing Skill</span>
    </div>

    {/* Explanation with formatting */}
    <p className="info-explanation" style={{ whiteSpace: "pre-line" }}>
      {info.explanation}
    </p>

    <div className="info-questions-title">
      Interview Questions & Answers
    </div>

    <ul className="info-questions">
      {info.questions.map((q, i) => (
        <li key={i} className="info-question">
          
          {/* Question */}
          <div className="info-question-header">
            <span className="info-question-num">Q{i + 1}</span>
            <strong>{q.q}</strong>
          </div>

          {/* Answer */}
          <p className="info-answer">
            {q.a}
          </p>

        </li>
      ))}
    </ul>
  </div>
);
}

function Result({ data }) {
  const [info, setInfo] = useState(null);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [activeKeyword, setActiveKeyword] = useState(null);

  const handleClick = async (keyword) => {
    if (activeKeyword === keyword) {
      setActiveKeyword(null);
      setInfo(null);
      return;
    }
    setActiveKeyword(keyword);
    setLoadingInfo(true);
    setInfo(null);
    try {
      const res = await axios.get(
        `https://cv-intellimatch.onrender.com/analyze/keyword-info?keyword=${keyword}`
      );
      setInfo(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingInfo(false);
    }
  };

  return (
    <div>
      <div className="section-divider" />

      <div className="result-container">
        {/* Header */}
        <div className="result-header">
          <div className="result-icon">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M9 11.5l2 2 4-4" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="11" cy="11" r="8.5" stroke="#34d399" strokeWidth="1.5"/>
            </svg>
          </div>
          <div>
            <h2 className="result-title">Analysis complete</h2>
            <div className="result-subtitle">Here's your ATS compatibility breakdown</div>
          </div>
        </div>

        {/* Score ring */}
        <ScoreRing score={data.ats_score} />

        {/* Missing keywords */}
        {data.missing_keywords?.length > 0 && (
          <div className="keywords-section">
            <div className="keywords-header">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v4m0 4v.01M4 14l4-12 4 12" stroke="var(--red)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="keywords-title">Missing Keywords</span>
              <span className="keywords-count">{data.missing_keywords.length}</span>
            </div>
            <p style={{ fontSize: "0.8rem", color: "var(--text3)", marginBottom: "1rem" }}>
              Click any keyword to get an explanation and interview prep questions.
            </p>
            <div className="keywords-grid">
              {data.missing_keywords.map((k, i) => (
                <button
                  key={i}
                  className={`keyword-pill ${activeKeyword === k ? "active" : ""}`}
                  onClick={() => handleClick(k)}
                >
                  <span className="dot" />
                  {k}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Keyword info panel */}
        {(loadingInfo || info) && (
          <KeywordInfo info={info} loading={loadingInfo} />
        )}
      </div>
    </div>
  );
}

export default Result;