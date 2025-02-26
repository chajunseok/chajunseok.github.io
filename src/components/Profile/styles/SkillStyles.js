import styled from 'styled-components';

export const Section = styled.section`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 60px;
  padding: 40px;
  background: transparent;
`;

export const SectionTitle = styled.h2`
  font-size: 2.5em;
  color: #fff;
  margin-bottom: 40px;
  font-weight: 700;
`;

export const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const SkillBox = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  backdrop-filter: blur(10px);
`;

export const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const CategoryIcon = styled.i`
  font-size: 1.5rem;
  color: #64ffda;
`;

export const CategoryTitle = styled.h3`
  font-size: 1.8em;
  color: #fff;
  font-weight: 600;
`;

export const SkillGroup = styled.div`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const SkillLevel = styled.h4`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  
  &:before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #64ffda;
    margin-right: 0.5rem;
  }
`;

export const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const SkillTag = styled.span`
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 0.6rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  i {
    color: #64ffda;
    font-size: 1rem;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

// ... 나머지 스킬 관련 스타일 