import React from 'react';
import styled from 'styled-components';
import { projects } from '../constants/projectsData';

const Section = styled.section`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 60px;
  padding: 40px;
`;

const Title = styled.h2`
  font-size: 2.5em;
  color: #fff;
  margin-bottom: 40px;
  font-weight: 700;
  text-align: center;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ProjectCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProjectInfo = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  color: #64ffda;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ProjectDescription = styled.p`
  color: #fff;
  margin-bottom: 1rem;
  line-height: 1.6;
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
  font-size: 0.9rem;
`;

const Links = styled.div`
  display: flex;
  gap: 1rem;
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

const ProjectsSection = () => {
  return (
    <Section>
      <Title>PROJECTS</Title>
      <ProjectsGrid>
        {projects.map(project => (
          <ProjectCard key={project.id}>
            <ProjectImage src={project.thumbnail} alt={project.title} />
            <ProjectInfo>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <TechStack>
                {project.tech.map(tech => (
                  <TechTag key={tech}>{tech}</TechTag>
                ))}
              </TechStack>
              <Links>
                <Link href={project.demoUrl} target="_blank">
                  <i className="fas fa-external-link-alt"></i>
                  Demo
                </Link>
                <Link href={project.githubUrl} target="_blank">
                  <i className="fab fa-github"></i>
                  GitHub
                </Link>
              </Links>
            </ProjectInfo>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </Section>
  );
};

export default ProjectsSection; 