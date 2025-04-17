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

export const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const SkillTooltip = styled.div`
  position: absolute;
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(17, 25, 40, 0.95);
  padding: 0.8rem;
  border-radius: 8px;
  width: 200px;
  pointer-events: none;
  transition: all 0.3s ease;
  z-index: 10;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(100, 255, 218, 0.2);
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 8px solid transparent;
    border-top-color: rgba(17, 25, 40, 0.95);
  }
`;

export const SkillLevelContainer = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  margin-bottom: 0.5rem;
`;

export const SkillLevelBar = styled.div`
  width: ${props => props.width}%;
  height: 100%;
  background: #64ffda;
  border-radius: 3px;
  transition: width 0.3s ease;
`;

export const SkillLevelText = styled.div`
  color: #fff;
  font-size: 0.8rem;
  text-align: center;
`;

export const HintText = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  animation: bounce 2s infinite;

  i {
    color: #64ffda;
    font-size: 1rem;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-5px);
    }
    60% {
      transform: translateY(-3px);
    }
  }
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
  position: relative;
  cursor: pointer;

  i {
    color: #64ffda;
    font-size: 1rem;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 50%;
    width: 0;
    height: 2px;
    background: #64ffda;
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  &:hover::after {
    width: 100%;
  }
`;

// ... 나머지 스킬 관련 스타일 