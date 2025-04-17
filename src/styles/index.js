export * from './MainStyles';
export * from './ProfileStyles';
export * from './SkillStyles';
export * from './NavStyles';
export * from './ContactStyles';

import styled from 'styled-components';
import Particles from "react-tsparticles";

export const ParticlesBackground = styled(Particles)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

export const HomeContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  position: relative;
  z-index: 1;
`;

export const ProjectsContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  position: relative;
  z-index: 1;
`;

export const ContactContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SideNav = styled.nav`
  position: fixed;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const NavItem = styled.a`
  color: ${props => props.$active ? '#fff' : 'rgba(255, 255, 255, 0.6)'};
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-left: 2px solid ${props => props.$active ? '#fff' : 'transparent'};

  &:hover {
    color: #fff;
    border-left-color: #fff;
  }
`; 