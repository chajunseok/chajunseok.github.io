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
    const fullPath = '/#' + location.pathname;
    logPageView(fullPath);
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