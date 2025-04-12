import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import Home from './components/Profile/pages/Home';
import Projects from './components/Profile/pages/Projects';
import Contact from './components/Profile/pages/Contact';
import Playground from './components/Profile/pages/Playground';

import ScrollToTop from './components/ScrollToTop';
import './App.css';

import { initGA, logPageView } from './analytics';

const AnalyticsWrapper = () => {
  const location = useLocation();

  useEffect(() => {
    // 현재 경로에서 앞의 '/' 제거
    const currentPath = location.pathname.replace(/^\//, '');
    // 실제 페이지 경로 구성
    const pagePath = currentPath || 'home';
    
    // 페이지뷰 전송
    logPageView(pagePath);
    
    // 페이지 제목 업데이트 (선택사항)
    document.title = `Junseok | ${pagePath.charAt(0).toUpperCase() + pagePath.slice(1)}`;
  }, [location]);

  return null;
};

function App() {
  useEffect(() => {
    initGA(); // 최초 GA 초기화
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <AnalyticsWrapper />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;