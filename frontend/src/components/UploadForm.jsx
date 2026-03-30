import { useState, useRef } from "react";
import axios from "axios";
import "../App.css";

function UploadForm({ setResult }) {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const dropRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

  const handleSubmit = async () => {
    if (!file || !jd.trim()) {
      alert("Please upload your resume and enter a job description.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("job_description", jd);
    try {
      const res = await axios.post("http://127.0.0.1:8000/analyze/", formData);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend. Please make sure the server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero section */}
      <div className="hero">
        <div className="hero-eyebrow">AI-Powered ATS Analysis</div>
        <h1 className="hero-title">
          Match your resume to<br /><span>any job description</span>
        </h1>
        <p className="hero-sub">
          Upload your resume and paste the job description. Our NLP engine
          scores keyword coverage and reveals exactly what's missing.
        </p>
      </div>

      {/* Upload card */}
      <div className="upload-card">
        <div className="upload-grid">
          {/* File drop zone */}
          <div className="field-group">
            <label className="field-label">Resume (PDF)</label>
            <div
              ref={dropRef}
              className={`file-dropzone ${dragOver ? "active" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <div className="dropzone-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2v10m0-10L7 5m3-3l3 3" stroke="#6c63ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 14v1a2 2 0 002 2h10a2 2 0 002-2v-1" stroke="#6c63ff" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              {file ? (
                <>
                  <div className="dropzone-title" style={{ color: "var(--accent2)" }}>File selected</div>
                  <div className="dropzone-filename">{file.name}</div>
                </>
              ) : (
                <>
                  <div className="dropzone-title">Drop your resume here</div>
                  <div className="dropzone-hint">or click to browse · PDF, DOC, DOCX</div>
                </>
              )}
            </div>
          </div>

          {/* Job description textarea */}
          <div className="field-group">
            <label className="field-label">Job Description</label>
            <textarea
              className="jd-textarea"
              placeholder="Paste the full job description here — responsibilities, qualifications, and requirements…"
              value={jd}
              onChange={(e) => setJd(e.target.value)}
            />
          </div>
        </div>

        {/* Analyze button */}
        <button className="btn-analyze" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <>
              <span className="spinner" />
              Analyzing…
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
                <path d="M8 5v3l2 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Analyze Resume
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default UploadForm;