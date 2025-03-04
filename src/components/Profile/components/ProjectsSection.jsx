import React from 'react';
import * as S from '../styles/ProjectStyles';
import { projects } from '../constants/projectsData';


const ProjectsSection = () => {
  return (
    <S.ProjectsContainer>
      <S.ProjectsGrid>
        {projects.map(project => (
          <S.ProjectCard key={project.id} $isMobile={project.isMobile}>
            <S.ProjectImage 
              src={project.thumbnail}
              $isMobile={project.isMobile}
              alt={project.title} 
            />
            <S.ProjectContent>
              <S.ProjectTitle>{project.title}</S.ProjectTitle>
              <S.ProjectDescription>{project.description}</S.ProjectDescription>
              <S.TechStack>
                {project.tech.map(tech => (
                  <S.TechItem key={tech}>{tech}</S.TechItem>
                ))}
              </S.TechStack>
              <S.ProjectLinks>
                {project.demoUrl !== 0 && (
                  <S.ProjectLink 
                    href={project.demoUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Demo
                  </S.ProjectLink>
                )}
                <S.ProjectLink 
                  href={project.githubUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </S.ProjectLink>
              </S.ProjectLinks>
            </S.ProjectContent>
          </S.ProjectCard>
        ))}
      </S.ProjectsGrid>
    </S.ProjectsContainer>
  );
};

export default ProjectsSection; 