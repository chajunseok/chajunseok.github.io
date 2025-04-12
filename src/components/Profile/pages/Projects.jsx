import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadFull } from "tsparticles";
import { particlesOptions } from '../constants/particlesConfig';
import { projects } from '../constants/projectsData';
import * as S from '../styles';
import * as PS from '../styles/ProjectStyles';
import ProjectModal from '../components/ProjectModal';

const Projects = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const cardWidth = slider.children[0].offsetWidth + 32;
      const newIndex = Math.round(slider.scrollLeft / cardWidth);
      if (newIndex > projects.length - 1) {
        slider.scrollTo({
          left: cardWidth * (projects.length - 1),
          behavior: 'smooth'
        });
        setCurrentIndex(projects.length - 1);
      } else {
        setCurrentIndex(newIndex);
      }
    };

    slider.addEventListener('scroll', handleScroll);
    return () => slider.removeEventListener('scroll', handleScroll);
  }, [projects.length]);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const handleSlide = (direction) => {
    const slider = sliderRef.current;
    const cardWidth = slider.children[0].offsetWidth + 32;
    const maxIndex = projects.length - 1;
    
    const newIndex = direction === 'next' ? 
      Math.min(currentIndex + 1, maxIndex) : 
      Math.max(currentIndex - 1, 0);
    
    slider.scrollTo({
      left: cardWidth * newIndex,
      behavior: 'smooth'
    });
    
    setCurrentIndex(newIndex);
  };

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const navItems = [
    { path: '/', label: 'Home', active: false },
    { path: '/projects', label: 'Projects', active: true },
    { path: '/playground', label: 'Playground', active: false },
    { path: '/contact', label: 'Contact', active: false }
  ];

  return (
    <PS.ProjectsContainer>
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
      <PS.ProjectsSlider ref={sliderRef}>
        {projects.map(project => (
          <PS.ProjectCard 
            key={project.id}
            $isMobile={project.isMobile}
          >
            <PS.ProjectImage 
              src={project.thumbnail} 
              alt={project.title} 
              $isMobile={project.isMobile}
              onClick={() => project.demoUrl !== 0 && window.open(project.demoUrl, '_blank')}
            />
            <PS.ProjectContent $isMobile={project.isMobile}>
              <PS.ProjectHeader>
                <PS.ProjectTitle>{project.title}</PS.ProjectTitle>
              </PS.ProjectHeader>
              <PS.ProjectDescription>{project.description}</PS.ProjectDescription>
              <PS.ProjectLinks>
                {project.demoUrl !== 0 && (
                  <PS.ProjectLink href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <i className={project.title === "BeddingHome" ? "fas fa-globe" : "fas fa-external-link-alt"}></i>
                    <span>{project.title === "BeddingHome" ? "Live Site" : "Demo"}</span>
                  </PS.ProjectLink>
                )}
                {project.githubUrl && (
                  <PS.ProjectLink href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                    <span>GitHub</span>
                  </PS.ProjectLink>
                )}
                <PS.ProjectLink onClick={() => openModal(project)}>
                  <i className="fas fa-info-circle"></i>
                  <span>Detail</span>
                </PS.ProjectLink>
              </PS.ProjectLinks>
            </PS.ProjectContent>
          </PS.ProjectCard>
        ))}
      </PS.ProjectsSlider>
      <PS.SliderControls>
        <PS.SliderButton 
          onClick={() => handleSlide('prev')} 
          disabled={currentIndex === 0}
        >
          <i className="fas fa-chevron-left" />
        </PS.SliderButton>
        <PS.SliderButton 
          onClick={() => handleSlide('next')} 
          disabled={currentIndex === projects.length - 1}
        >
          <i className="fas fa-chevron-right" />
        </PS.SliderButton>
      </PS.SliderControls>

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={closeModal}
        />
      )}
    </PS.ProjectsContainer>
  );
};

export default Projects; 