import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { projects } from '../constants/projectsData';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { particlesOptions } from '../constants/particlesConfig';
import * as S from '../styles';  // styles 파일에서 SideNav 컴포넌트 import

const ProjectsContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  margin-left: 5rem;
  width: calc(100% - 5rem);
  z-index: 0;
`;

const ProjectsSlider = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
  margin: 2rem 0;
  padding: 0 2rem;
  height: calc(100vh - 120px);
`;

const ParticlesBackground = styled(Particles)`
  position: fixed;
  top: 0;
  left: 5rem;
  width: calc(100% - 5rem);
  height: 100%;
  z-index: -1;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: transparent;
`;

const ProjectsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  padding: 2rem;
`;

const ProjectCard = styled.div`
  flex: 0 0 auto;
  width: calc(70% - 30px);
  max-width: 700px;
  height: calc(100vh - 160px);
  margin-right: 30px;
  background: rgba(17, 25, 40, 0.75);
  border-radius: 15px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 30px -15px rgba(0, 0, 0, 0.5);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: top;
  transition: transform 0.3s ease;

  ${ProjectCard}:hover & {
    transform: scale(1.05);
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  background: linear-gradient(
    to bottom,
    rgba(17, 25, 40, 0.75),
    rgba(17, 25, 40, 0.95)
  );
  flex: 1;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(17, 25, 40, 0.5);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
`;

const ProjectTitle = styled.h3`
  color: #64ffda;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 50px;
    height: 2px;
    background-color: #64ffda;
  }
`;

const ProjectDescription = styled.p`
  color: #fff;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TechTag = styled.span`
  background: rgba(100, 255, 218, 0.1);
  color: #64ffda;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  border: 1px solid rgba(100, 255, 218, 0.2);
`;

const Links = styled.div`
  display: flex;
  gap: 1rem;
  z-index: 2;
`;

const Link = styled.a`
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: #64ffda;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
  color: #ccc;
`;

const FeatureItem = styled.li`
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  
  &:before {
    content: "▹";
    color: #64ffda;
  }
`;

const SliderControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 100px;
  margin-top: 20px;
  position: fixed;
  top: 80%;
  transform: translateY(-50%);
  left: 5rem;
  right: 0;
  z-index: 10;
`;

const SliderButton = styled.button`
  background: transparent;
  color: #64ffda;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  position: relative;
  backdrop-filter: blur(5px);
  background: rgba(17, 25, 40, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    color: #fff;
    transform: scale(1.05);
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Projects = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const navItems = [
    { path: '/', label: 'Home', active: false },
    { path: '/projects', label: 'Projects', active: true },
    { path: '/contact', label: 'Contact', active: false }
  ];

  const handleSlide = (direction) => {
    const slider = sliderRef.current;
    const cardWidth = slider.children[0].offsetWidth + 30; // 카드 너비 + margin
    const newIndex = direction === 'next' ? 
      currentIndex + 1 : currentIndex - 1;
    
    slider.scrollTo({
      left: cardWidth * newIndex,
      behavior: 'smooth'
    });
    
    setCurrentIndex(newIndex);
  };

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <ProjectsContainer>
      <ParticlesBackground
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
      <ContentWrapper>
        <ProjectsSlider ref={sliderRef}>
          {projects.map(project => (
            <ProjectCard 
              key={project.id}
              onClick={() => window.open(project.demoUrl, '_blank')}
            >
              <ProjectImage src={project.thumbnail} alt={project.title} />
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <FeatureList>
                  {project.features?.map((feature, index) => (
                    <FeatureItem key={index}>{feature}</FeatureItem>
                  ))}
                </FeatureList>
                <TechStack>
                  {project.tech.map(tech => (
                    <TechTag key={tech}>{tech}</TechTag>
                  ))}
                </TechStack>
                <Links
                  onClick={(e) => e.stopPropagation()}
                >
                  <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-external-link-alt"></i>
                    Demo
                  </Link>
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                    GitHub
                  </Link>
                </Links>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsSlider>
        <SliderControls>
          <SliderButton 
            onClick={() => handleSlide('prev')}
            disabled={currentIndex === 0}
          >
            <i className="fas fa-chevron-left"></i>
          </SliderButton>
          <SliderButton 
            onClick={() => handleSlide('next')}
            disabled={currentIndex === projects.length - 1}
          >
            <i className="fas fa-chevron-right"></i>
          </SliderButton>
        </SliderControls>
      </ContentWrapper>
    </ProjectsContainer>
  );
};

export default Projects; 