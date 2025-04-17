import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import { loadFull } from "tsparticles";
import { particlesOptions } from '@features/profile/constants/particlesConfig';

// 경로 수정
import Home from '@pages/Home';
import Projects from '@pages/Projects';
import Contact from '@pages/Contact';
import Playground from '@pages/Playground';

import ScrollToTop from '@components/ScrollToTop';
import './App.css';

import { initGA, logPageView } from '@utils/analytics';
import * as S from '@styles/index';

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

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/playground', label: 'Playground' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <S.SideNav>
      {navItems.map(item => (
        <S.NavItem 
          key={item.path}
          $active={location.pathname === item.path}
          href={`#${item.path}`}
        >
          {item.label}
        </S.NavItem>
      ))}
    </S.SideNav>
  );
};

const App = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  useEffect(() => {
    initGA(); // 최초 GA 초기화
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <AnalyticsWrapper />
      <div className="App">
        <S.ParticlesBackground
          id="tsparticles"
          init={particlesInit}
          options={particlesOptions}
        />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;