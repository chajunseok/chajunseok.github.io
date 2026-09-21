import styled from 'styled-components';

export const PlaygroundContainer = styled.div`
  min-height: 100vh;
  padding: 1rem;
  margin-left: 5rem;
  max-width: 1000px;
  margin: 0 auto;
  margin-left: calc(5rem + auto);
`;

export const CategoryContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  gap: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  justify-content: center;
`;

export const CategoryButton = styled.button`
  background: ${props => props.$active ? 'rgba(100, 255, 218, 0.1)' : 'transparent'};
  border: 1px solid ${props => props.$active ? '#64ffda' : 'rgba(100, 255, 218, 0.1)'};
  color: ${props => props.$active ? '#64ffda' : '#8892b0'};
  padding: 0.7rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  position: relative;
  text-align: center;
  min-width: 100px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.$active ? '100%' : '0'};
    height: 2px;
    background-color: #64ffda;
    transition: all 0.3s ease;
  }

  &:hover {
    color: #64ffda;
    &::after {
      width: 100%;
    }
  }
`;

export const CardsContainer = styled.div`
  position: relative;
  min-height: 300px;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 0.8rem;
  animation: slideIn 0.5s ease;
  justify-content: center;
  margin: 0 auto;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-5px);
    border-color: #64ffda;
  }
`;

export const CardTitle = styled.h3`
  color: #fff;
  margin-bottom: 0.8rem;
  font-size: 1rem;
`;

export const CardDescription = styled.p`
  color: #ccc;
  font-size: 0.8rem;
  line-height: 1.5;
`;

export const TechTag = styled.span`
  background: rgba(100, 255, 218, 0.1);
  color: #64ffda;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.7rem;
  margin-right: 0.5rem;
  margin-top: 1rem;
  display: inline-block;
`;

export const ContentContainer = styled.div`
  padding: 2rem;
  animation: fadeIn 0.3s ease;
  position: relative;
  z-index: 1;
`;

export const BackButton = styled.button`
  background: transparent;
  border: none;
  color: #64ffda;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(100, 255, 218, 0.2);
  border-radius: 4px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;

  &:hover {
    background: rgba(100, 255, 218, 0.1);
    transform: translateX(-5px);
  }

  i {
    font-size: 0.8rem;
  }
`;

export const ContentTitle = styled.h2`
  color: #fff;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

export const MotionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2rem;
  backdrop-filter: blur(10px);
`;

export const ScrollContainer = styled(MotionContainer)`
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`; 