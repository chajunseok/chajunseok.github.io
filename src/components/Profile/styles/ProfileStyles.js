import styled from 'styled-components';

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 2rem;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  margin-top: -2rem;
`;

export const ProfileImage = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 2rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
`;

export const ProfileName = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

export const ProfileDate = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
`;

export const TagContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const Tag = styled.span`
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

export const ProfileDescription = styled.p`
  text-align: center;
  max-width: 800px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
  white-space: pre-line;
  
  br {
    content: '';
    display: block;
    margin: 0.8em 0;
  }
`; 