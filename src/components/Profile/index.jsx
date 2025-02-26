import React from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import MainSection from './components/MainSection';
import ProfileSection from './components/ProfileSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import { particlesOptions } from './constants/particlesConfig';
import * as S from './styles';
import { Link } from 'react-router-dom';

const Profile = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <>
      <S.ParticlesBackground
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
      />
      <S.SideNav>
        <S.NavItem active>Home</S.NavItem>
        <S.NavItem as={Link} to="/projects">Projects</S.NavItem>
        <S.NavItem>Contact</S.NavItem>
      </S.SideNav>
      
      <MainSection />
      <ProfileSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
};

export default Profile; 