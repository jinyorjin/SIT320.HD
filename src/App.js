import React from "react";
import SlideDeck from "./SlidesDeck";
import AnimatedBackground from "./components/AnimatedBackground";

import "./App.css";

function App() {
  return (
    <div className="App">
      {/* 지브리 감성 배경 */}
      <AnimatedBackground />

      {/* 헤더 */}
      <header className="App-header">
        <h1 className="brand-title"> SIT320 — Advanced Algorithms </h1>
      </header>

      {/* 슬라이드 */}
      <SlideDeck />

      {/* 푸터 */}
      <footer className="App-footer">
        © 2025 Eunjin Kim | Portfolio Project
      </footer>
    </div>
  );
}

export default App;
