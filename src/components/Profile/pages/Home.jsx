import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadFull } from "tsparticles";
import MainSection from '../components/MainSection';
import ProfileSection from '../components/ProfileSection';
import SkillsSection from '../components/SkillsSection';
import ExperienceSection from '../components/ExperienceSection';
import { particlesOptions } from '../constants/particlesConfig';
import * as S from '../styles';

const Home = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const navItems = [
    { path: '/', label: 'Home', active: true },
    { path: '/projects', label: 'Projects', active: false },
    { path: '/contact', label: 'Contact', active: false }
  ];

  return (
    <>
      <S.ParticlesBackground
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
      />
      <S.SideNav>
        {navItems.map(item => (
          <S.NavItem 
            key={item.path}
            active={item.active} 
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </S.NavItem>
        ))}
      </S.SideNav>
      
      <MainSection />
      <ProfileSection />
      <SkillsSection />
      <ExperienceSection />
    </>
  );
};

export default Home; 