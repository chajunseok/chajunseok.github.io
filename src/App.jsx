import React, { useEffect } from 'react'
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Home from './components/Profile/pages/Home'
import Projects from './components/Profile/pages/Projects'
import Contact from './components/Profile/pages/Contact'
import Playground from './components/Profile/pages/Playground'
import ScrollToTop from './components/ScrollToTop'
import './App.css'
import { initGA, logPageView } from './analytics'

// Analytics를 위한 래퍼 컴포넌트 생성
const AnalyticsWrapper = () => {
  const location = useLocation();

  useEffect(() => {
    // 현재 라우트의 전체 경로를 추적
    const currentPath = location.pathname + location.hash;
    logPageView(currentPath);
  }, [location]);

  return null;
};

function App() {
  useEffect(() => {
    initGA();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <AnalyticsWrapper /> {/* Analytics 추적을 위한 컴포넌트 */}
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
