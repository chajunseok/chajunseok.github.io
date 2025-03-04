import styled, { css } from 'styled-components';

export const ProjectsContainer = styled.section`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 60px;
  padding: 40px;
`;

export const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(287px, 1fr));
  gap: 2rem;
  align-items: start;
  justify-items: center;
`;

export const ProjectCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: ${props => props.$isMobile ? '287px' : '100%'};
  min-height: ${props => props.$isMobile ? '900px' : 'auto'};
  ${props => props.$isMobile && css`
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 15px rgba(100, 255, 218, 0.1);
  `}
`;

export const ProjectImage = styled.img`
  width: 100%;
  height: ${props => props.$isMobile ? '600px' : '200px'};
  object-fit: ${props => props.$isMobile ? 'contain' : 'cover'};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
  ${props => props.$isMobile && css`
    background-color: #1a1a1a;
    padding: 20px;
    border-radius: 10px;
    margin: 10px;
    width: calc(100% - 20px);
  `}

  &:hover {
    transform: scale(1.05);
  }
`;

export const ProjectContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  ${props => props.$isMobile && css`
    justify-content: flex-start;
    padding: 2rem;
  `}
`;

export const ProjectTitle = styled.h3`
  color: #64ffda;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const ProjectDescription = styled.p`
  color: #fff;
  margin-bottom: 1rem;
  line-height: 1.6;
`;

export const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const TechItem = styled.span`
  background: rgba(100, 255, 218, 0.1);
  color: #64ffda;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
`;

export const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  z-index: 20;
  position: relative;
`;

export const ProjectLink = styled.a`
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    color: #64ffda;
    i {
      color: #64ffda;
    }
  }

  i {
    transition: all 0.3s ease;
    color: #fff;
  }
`;