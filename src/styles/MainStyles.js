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

export const MainSection = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 100vh;
  background: transparent;
  color: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0;
  margin: 0;
`;

export const Header = styled.header`
  position: absolute;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin: 0;
`;

export const Title = styled.h1`
  font-size: clamp(1.5rem, 2vw, 2rem);
  font-weight: 400;
  position: relative;
  display: inline-block;
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
  margin: 0;
  padding: 0;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 1px;
    background-color: #fff;
    animation: lineLoad 1s ease forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes lineLoad {
    from { width: 0; }
    to { width: 100%; }
  }
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  min-height: 90vh;
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: -10vh;
`;

export const Name = styled.h1`
  font-size: clamp(4rem, 10vw, 6.5rem);
  font-weight: 700;
  color: #fff;
  margin: 0;
  line-height: 1;
  transition: transform 0.3s ease-out;
  transform: ${props => `translateX(${props.x || 0}px)`};
`;

export const MainSubTitle = styled.h2`
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 700;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  line-height: 1;
  transition: transform 0.3s ease-out;
  transform: ${props => `translateX(${props.x || 0}px)`};
`;

export const ScrollDown = styled.div`
  position: absolute;
  bottom: 10rem;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
  animation-delay: 2.5s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  z-index: 2;
  cursor: pointer;
  
  i {
    font-size: clamp(1.5rem, 3vw, 1.8rem);
    display: block;
    line-height: 0.6;
    font-weight: 900;
  }

  i.first {
    background: linear-gradient(45deg, #ffffff 0%, #e2e8f0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: bounce 2s infinite;
    animation-delay: 0.2s;
  }

  i.second {
    background: linear-gradient(45deg, #e2e8f0 0%, #ffffff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: bounce 2s infinite;
  }

  &:hover {
    i.first {
      background: linear-gradient(45deg, #e2e8f0 0%, #ffffff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    i.second {
      background: linear-gradient(45deg, #ffffff 0%, #e2e8f0 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

export const ThreeContainer = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// ... 나머지 메인 섹션 관련 스타일 