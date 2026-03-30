import { useState, useEffect, useRef } from "react";
import UploadForm from "./components/UploadForm";
import Result from "./components/Result";

function App() {
  const [result, setResult] = useState(null);
  const cursorRef = useRef(null);
  const cursorRingRef = useRef(null);
  const bgRef = useRef(null);
  const midRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
      const cx = (e.clientX / window.innerWidth - 0.5);
      const cy = (e.clientY / window.innerHeight - 0.5);
      if (bgRef.current) bgRef.current.style.transform = `translate(${cx * -18}px, ${cy * -18}px)`;
      if (midRef.current) midRef.current.style.transform = `translate(${cx * -9}px, ${cy * -9}px)`;
    };

    const lerp = (a, b, t) => a + (b - a) * t;
    const animateRing = () => {
      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.1);
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.1);
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = ringPos.current.x + "px";
        cursorRingRef.current.style.top = ringPos.current.y + "px";
      }
      rafId.current = requestAnimationFrame(animateRing);
    };

    const onEnter = () => document.body.classList.add("cursor-hover");
    const onLeave = () => document.body.classList.remove("cursor-hover");

    window.addEventListener("mousemove", onMove);
    document.querySelectorAll("button, a, input, textarea, label").forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    rafId.current = requestAnimationFrame(animateRing);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <div id="cursor" ref={cursorRef} />
      <div id="cursor-ring" ref={cursorRingRef} />

      {/* Parallax background layers */}
      <div id="parallax-bg" ref={bgRef}>
        <div className="orb orb-1" />
        <div className="orb orb-2" />
      </div>
      <div id="parallax-mid" ref={midRef}>
        <div className="orb orb-3" />
      </div>

      {/* Grid lines */}
      <div className="bg-grid" />

      {/* Main content */}
      <div id="app-wrapper">
        <Header />
        <main className="main-content">
          <UploadForm setResult={setResult} />
          {result && <Result data={result} />}
        </main>
        <Footer />
      </div>
    </>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo-group">
          <div className="logo-icon">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 2L13.8 7.6L20 8.5L15.5 12.9L16.6 19L11 16L5.4 19L6.5 12.9L2 8.5L8.2 7.6L11 2Z"
                fill="url(#star-grad)" stroke="none" />
              <defs>
                <linearGradient id="star-grad" x1="2" y1="2" x2="20" y2="20">
                  <stop offset="0%" stopColor="#6c63ff" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="logo-text">CV IntelliMatch</span>
          <span className="logo-badge">AI</span>
        </div>
        <nav className="header-nav">
          <span className="nav-tag">Resume Analyzer</span>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>Built with <span className="footer-accent">AI-powered NLP</span> · CV IntelliMatch</p>
    </footer>
  );
}

export default App;