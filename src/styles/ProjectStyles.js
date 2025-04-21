import styled, { css } from 'styled-components';

export const ProjectsContainer = styled.section`
  position: relative;
  z-index: 1;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 60px;
  padding: 40px;
  max-width: 1200px;
  overflow: hidden;
`;

export const ProjectsSlider = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  position: relative;
  scroll-snap-type: x mandatory;
  &::-webkit-scrollbar {
    display: none;
  }
  margin: 2rem 0;
  padding: 0;
  height: 70vh;
  align-items: center;
  width: calc(100% - 5rem);
  margin-left: 5rem;
  padding-right: 10%;
`;

export const ProjectCard = styled.div`
  flex: 0 0 80%;
  width: 80%;
  min-width: 80%;
  max-width: 80%;
  height: calc(100vh - 350px);
  margin-right: 2rem;
  scroll-snap-align: start;
  background: rgba(17, 25, 40, 0.95);
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  border: 1px solid rgba(100, 255, 218, 0.1);
  position: relative;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(100, 255, 218, 0.3);
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #64ffda;
    }
  }

  &:last-child {
    margin-right: 10%;
  }

  @media (min-width: 2000px) {
    height: calc(100vh - 150px);
  }

  @media (max-width: 1440px) {
    height: calc(100vh - 180px);
  }

  @media (max-width: 1024px) {
    height: calc(100vh - 160px);
  }
`;

export const ProjectImage = styled.img`
  width: 100%;
  height: 35%;
  object-fit: cover;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;

  @media (min-width: 2000px) {
    height: 40%;
  }

  @media (max-width: 1024px) {
    height: 30%;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

export const ProjectContent = styled.div`
  padding: 2.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  background: linear-gradient(
    to bottom,
    rgba(17, 25, 40, 0.95),
    rgba(17, 25, 40, 0.98)
  );
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(100, 255, 218, 0.2);
    border-radius: 3px;
  }

  text-align: left;
`;

export const ProjectHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  text-align: left;
`;

export const ProjectTitle = styled.h2`
  color: #64ffda;
  font-size: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(100, 255, 218, 0.2);
`;

export const ProjectDescription = styled.p`
  color: #fff;
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  line-height: 1.6;
  flex: 1;
  opacity: 0.9;
  margin-bottom: 1.5rem;
  text-align: left;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
  justify-content: flex-start;
`;

export const TechTag = styled.span`
  background: rgba(100, 255, 218, 0.1);
  color: #64ffda;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: clamp(0.8rem, 1.2vw, 0.9rem);
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const ProjectLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  z-index: 20;
  position: relative;
  margin-top: auto;
  align-items: center;
`;

export const ProjectLink = styled.a`
  color: #fff;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 1rem;
  height: 24px;
  line-height: 24px;
  
  &:hover {
    color: #64ffda;
    transform: translateY(-2px);
    i {
      color: #64ffda;
    }
  }

  i {
    transition: all 0.3s ease;
    color: #fff;
    font-size: 1rem;
    width: 20px;
    height: 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
  }

  // Detail 아이콘 특별 처리
  .fa-info-circle {
    margin-right: 0.5rem;
  }

  // 모든 텍스트에 대한 스타일
  span, 
  div {
    margin-left: 0.5rem;
  }
`;

export const SliderControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 120px;
  margin-top: 20px;
  position: fixed;
  top: 85%;
  transform: translateY(-50%);
  left: 45%;
  z-index: 10;
  width: fit-content;
`;

export const SliderButton = styled.button`
  background: linear-gradient(135deg, rgba(100, 255, 218, 0.1), rgba(0, 0, 0, 0.3));
  color: #64ffda;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  position: relative;
  backdrop-filter: blur(5px);
  border: 2px solid rgba(100, 255, 218, 0.2);
  box-shadow: 0 0 15px rgba(100, 255, 218, 0.1);

  &:hover {
    color: #64ffda;
    transform: scale(1.05);
    background: linear-gradient(135deg, rgba(100, 255, 218, 0.2), rgba(0, 0, 0, 0.4));
    border-color: rgba(100, 255, 218, 0.4);
    box-shadow: 0 0 20px rgba(100, 255, 218, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: rgba(17, 25, 40, 0.5);
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: none;
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
`;

export const ModalWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  width: fit-content;
`;

export const ModalContent = styled.div`
  background: rgba(26, 26, 26, 0.95);
  padding: 3rem 4rem;
  border-radius: 12px;
  max-width: 1200px;
  width: 98%;
  height: 90vh;
  overflow-y: auto;
  position: relative;
  border: 1px solid rgba(100, 255, 218, 0.15);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);

  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(100, 255, 218, 0.3);
    border-radius: 4px;
    
    &:hover {
      background: rgba(100, 255, 218, 0.4);
    }
  }

  h2 {
    color: #64ffda;
    font-size: 2.5rem;
    margin-bottom: 2.5rem;
    padding-bottom: 1rem;
    text-align: left;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      transform: none;
      width: 100px;
      height: 2px;
      background: #64ffda;
      opacity: 0.3;
    }
  }
`;

export const ModalHeader = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

export const ModalSideButtons = styled.div`
  position: absolute;
  right: -80px;
  top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  z-index: 1001;
`;

export const ModalIconButton = styled.a`
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(100, 255, 218, 0.3);
  border-radius: 50%;
  color: #64ffda;
  font-size: 2rem;
  cursor: pointer;
  padding: 1rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  text-decoration: none;
  backdrop-filter: blur(4px);
  
  &:hover {
    color: #fff;
    transform: translateX(-5px);
    border-color: rgba(100, 255, 218, 0.6);
    background: rgba(100, 255, 218, 0.25);
    box-shadow: 0 6px 20px rgba(100, 255, 218, 0.15);
  }

  &.close-button {
    background: rgba(255, 100, 100, 0.15);
    border-color: rgba(255, 100, 100, 0.4);
    color: #ff6464;

    &:hover {
      color: #fff;
      background: rgba(255, 100, 100, 0.25);
      border-color: rgba(255, 100, 100, 0.6);
      box-shadow: 0 6px 20px rgba(255, 100, 100, 0.15);
    }
  }
`;

export const ModalSection = styled.section`
  margin-bottom: 3rem;
  color: #fff;
  background: rgba(37, 37, 37, 0.95);
  padding: 2rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
  text-align: left;

  &:hover {
    border-color: rgba(100, 255, 218, 0.3);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    background: rgba(42, 42, 42, 0.95);
  }

  h3 {
    color: #64ffda;
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    text-align: left;
    
    i {
      margin-right: 1rem;
      font-size: 1.4rem;
      opacity: 0.8;
    }
  }

  p {
    line-height: 1.8;
    opacity: 0.9;
    font-size: 1.1rem;
    color: #e6e6e6;
    text-align: left;
  }
`;

export const TechStackModal = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2rem;
  margin: 1.5rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const TechItem = styled.div`
  background: #2a2a2a;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;

  h4 {
    color: #64ffda;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    text-align: left;
    
    i {
      margin-right: 0.8rem;
      font-size: 1.1rem;
    }
  }

  p {
    font-size: 0.95rem;
    line-height: 1.6;
    color: #cccccc;
    text-align: left;
  }
`;

export const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;

  li {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    color: #e6e6e6;
    line-height: 1.6;

    i {
      color: #64ffda;
      margin-right: 1rem;
      margin-top: 0.4rem;
      font-size: 0.9rem;
      flex-shrink: 0;
    }
  }
`;

export const TroubleItem = styled.div`
  background: #2a2a2a;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.15);

  h4 {
    color: #64ffda;
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    text-align: left;

    i {
      margin-right: 1rem;
      font-size: 1.2rem;
    }
  }

  p {
    margin-bottom: 1rem;
    font-size: 1rem;
    line-height: 1.7;
    color: #cccccc;
    text-align: left;
    
    strong {
      color: #64ffda;
      margin-right: 0.5rem;
      font-weight: 500;
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #64ffda;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #fff;
    transform: rotate(90deg);
  }
`;

export const ProjectInfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const ProjectInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  i {
    color: #64ffda;
    font-size: 1.2rem;
    width: 20px;
    text-align: center;
  }
`;

export const InfoLabel = styled.span`
  color: #64ffda;
  font-size: 0.9rem;
  min-width: 80px;
`;

export const InfoValue = styled.span`
  color: #fff;
  font-size: 0.9rem;
`;

export const OverviewList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1rem;
    line-height: 1.6;
    color: #e6e6e6;
    font-size: 1.1rem;

    i {
      color: #64ffda;
      margin-right: 1rem;
      margin-top: 0.4rem;
      font-size: 0.8rem;
    }
  }
`;