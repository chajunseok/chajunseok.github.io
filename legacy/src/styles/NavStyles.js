import styled from 'styled-components';

export const SideNav = styled.nav`
  position: fixed;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const NavItem = styled.a`
  color: ${props => props.active ? '#fff' : 'rgba(255, 255, 255, 0.6)'};
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-left: 2px solid ${props => props.active ? '#fff' : 'transparent'};

  &:hover {
    color: #fff;
    border-left-color: #fff;
  }
`; 