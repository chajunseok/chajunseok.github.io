import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadFull } from "tsparticles";
import { particlesOptions } from '../constants/particlesConfig';
import { 
  SimpleMotion, 
  TransformEffect, 
  LayoutAnimation, 
  SpringMotion,
  ScrollProgress,
  ExitAnimation,
  HoverAnimation,
  TimelineAnimation,
  AOSAnimation,
  ModalAnimation,
  LoadingAnimation,
  MusicAnimation,
  CarouselAnimation,
  InfiniteScrollAnimation,
  PaginationAnimation
} from '../effects';
import * as S from '../styles';
import * as PS from '../styles/PlaygroundStyles';
import { DateFilterAnimation } from '../effects';
import { SelectFilterAnimation } from '../effects';
import { InputFilterAnimation } from '../effects';
import { SidebarAnimation } from '../effects';
import FloatingAnimation from '../effects/FloatingAnimation';
import PdfDownloadAnimation from '../effects/PdfDownloadAnimation';
import MemoryGame from '../challenge/MemoryGame';
import TicTacToe from '../challenge/TicTacToe';
import Calculator from '../challenge/Calculator';
import SeasonSimulation from '../challenge/SeasonSimulation';
import ThreeViewer from '../challenge/ThreeViewer';
import DataVisualization from '../tech/DataVisualization';

const categories = [
  { id: 'effects', label: 'EFFECTS' },
  { id: 'tech', label: 'TECH' },
  { id: 'challenge', label: 'CHALLENGE' }
];

const LayoutCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <PS.MotionContainer>
      <motion.div
        layout
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'linear-gradient(135deg, #64ffda 0%, #0a192f 100%)',
          borderRadius: '10px',
          cursor: 'pointer',
          padding: '20px',
          width: isOpen ? '400px' : '150px',
          height: isOpen ? '200px' : '150px',
          transition: 'background 0.3s',
        }}
        animate={{
          boxShadow: isOpen 
            ? '0 10px 30px rgba(100, 255, 218, 0.2)' 
            : '0 0 0 rgba(100, 255, 218, 0)'
        }}
      >
        <motion.h3
          layout="position"
          style={{
            color: '#fff',
            fontSize: isOpen ? '1.5rem' : '1rem',
            margin: 0
          }}
        >
          Click me!
        </motion.h3>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          style={{
            marginTop: '10px',
            color: '#ccc',
            fontSize: '0.9rem'
          }}
        >
          {isOpen && "이 요소는 크기가 변할 때 자연스럽게 애니메이션됩니다."}
        </motion.div>
      </motion.div>
    </PS.MotionContainer>
  );
};

const SpringCard = () => {
  const [isRight, setIsRight] = useState(false);
  
  return (
    <PS.MotionContainer>
      <motion.div
        animate={{ 
          x: isRight ? 200 : -200,
          rotate: isRight ? 180 : 0
        }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 10,
          mass: 1
        }}
        onClick={() => setIsRight(!isRight)}
        style={{
          width: '100px',
          height: '100px',
          background: 'linear-gradient(135deg, #64ffda 0%, #0a192f 100%)',
          borderRadius: '20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '0.9rem'
        }}
      >
        Click me!
      </motion.div>
      <motion.div
        style={{
          marginTop: '2rem',
          color: '#ccc',
          fontSize: '0.8rem',
          textAlign: 'center'
        }}
      >
      </motion.div>
    </PS.MotionContainer>
  );
};

const playgroundItems = {
  effects: [
    {
      title: 'Music Animation',
      description: '음악 재생과 함께 움직이는 시각화 효과',
      tech: [ 'Audio API'],
      content: () => <MusicAnimation />
    },
    {
      title: 'Hover Animation',
      description: '마우스 hover 시 다양한 인터랙션 효과',
      tech: [ 'Hover Animation'],
      content: () => <HoverAnimation />
    },
    {
      title: '로딩 Animation',
      description: '자동으로 닫히는 로딩 애니메이션',
      tech: [ 'Loading Animation'],
      content: () => <LoadingAnimation />
    },
    {
      title: '요소 변화 Animation',
      description: '크기 변화, 회전, 모서리 둥글기가 조화로운 애니메이션',
      tech: [ 'Animation'],
      content: () => <SimpleMotion />
    },
    {
      title: '시점 변화 Animation',
      description: '3D 변환과 시점 변화를 통한 입체적인 애니메이션',
      tech: ['3D Transform'],
      content: () => <TransformEffect />
    },
    {
      title: '레이아웃 Animation',
      description: '요소의 위치와 크기가 자연스럽게 변화하는 레이아웃 애니메이션',
      tech: ['Layout Animation'],
      content: () => <LayoutAnimation />
    },
    {
      title: '스프링 Motion',
      description: '자연스러운 스프링 물리 효과를 적용한 애니메이션',
      tech: [ 'Spring Physics'],
      content: () => <SpringMotion />
    },
    {
      title: '스크롤 Progress',
      description: '스크롤 진행도에 따라 원이 채워지는 인터랙티브 애니메이션',
      tech: [ 'Scroll Animation'],
      content: () => <ScrollProgress />
    },
    {
      title: '퇴장 Animation',
      description: '요소가 사라질 때 자연스러운 퇴장 애니메이션',
      tech: [ 'AnimatePresence'],
      content: () => <ExitAnimation />
    },
    {
      title: 'AOS Animation',
      description: '스크롤에 따라 요소가 나타나는 애니메이션',
      tech: [ 'Scroll Animation'],
      content: () => <AOSAnimation />
    },
    {
      title: 'Modal Animation',
      description: '모달 열고 닫힐 때의 부드러운 애니메이션',
      tech: [ 'Modal Animation'],
      content: () => <ModalAnimation />
    },
    {
      title: '타임라인 Animation',
      description: '시간에 따라 연속적으로 변화하는 애니메이션',
      tech: [ 'Timeline Animation'],
      content: () => <TimelineAnimation />
    },
  ],
  tech: [
    {
      title: '데이터 시각화',
      description: '차트와 그래프를 활용한 통계 데이터 시각화',
      tech: ['Chart.js', 'Data Visualization'],
      content: () => <DataVisualization />
    },
    {
      title: 'PDF 다운로드',
      description: '현재 화면을 PDF로 변환하여 다운로드',
      tech: ['PDF Download'],
      content: () => <PdfDownloadAnimation />
    },
    {
      title: '캐러셀 슬라이더',
      description: '드래그 가능한 반응형 캐러셀 컴포넌트',
      tech: ['Carousel'],
      content: () => <CarouselAnimation />
    },
    {
      title: '페이지네이션',
      description: '부드러운 전환 효과가 있는 페이지네이션',
      tech: ['Pagination'],
      content: () => <PaginationAnimation />
    },
    {
      title: '날짜 필터',
      description: '날짜 범위로 데이터를 필터링하는 검색 기능',
      tech: ['Date Filter'],
      content: () => <DateFilterAnimation />
    },
    {
      title: 'Select 필터',
      description: '카테고리와 상태로 데이터를 필터링하는 검색 기능',
      tech: ['Select Filter'],
      content: () => <SelectFilterAnimation />
    },
    {
      title: 'Input 필터',
      description: '실시간 텍스트 검색이 가능한 필터링 기능',
      tech: ['Input Filter'],
      content: () => <InputFilterAnimation />
    },
    {
      title: '토글 사이드바',
      description: '부드러운 애니메이션이 적용된 반응형 사이드바',
      tech: ['Sidebar'],
      content: () => <SidebarAnimation />
    },
    {
      title: '무한 스크롤',
      description: 'Intersection Observer를 활용한 무한 스크롤 구현',
      tech: ['Infinite Scroll'],
      content: () => <InfiniteScrollAnimation />
    },
    {
      title: '플로팅 메뉴',
      description: '스크롤에 반응하는 플로팅 액션 버튼',
      tech: ['Floating Menu'],
      content: () => <FloatingAnimation />
    },
   
  
  ],
  challenge: [
    {
      title: '3D 뷰어',
      description: '방향키와 마우스로 조작하는 3D 효과',
      tech: ['Three.js', '3D Animation'],
      content: () => <ThreeViewer />
    },
    {
      title: '메모리 카드 게임',
      description: '짝을 맞추는 카드 매칭 게임',
      tech: ['Game Logic', 'Animation'],
      content: () => <MemoryGame />
    },
    {
      title: '틱택토 게임',
      description: '3x3 보드에서 진행하는 O/X 게임',
      tech: ['Game Logic', 'Grid System'],
      content: () => <TicTacToe />
    },
    {
      title: '계산기',
      description: '기본 연산이 가능한 시각화 계산기',
      tech: ['Calculator', 'Animation'],
      content: () => <Calculator />
    },
    {
      title: '계절 시뮬레이션',
      description: '4계절의 자연현상을 시각화한 인터랙티브 효과',
      tech: ['Animation', 'Particle System'],
      content: () => <SeasonSimulation />
    },
  ]
};

const Playground = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('effects');
  const [selectedCard, setSelectedCard] = useState(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const handleCardClick = (item) => {
    setSelectedCard(item);
  };

  const handleBack = () => {
    setSelectedCard(null);
  };

  const navItems = [
    { path: '/', label: 'Home', active: false },
    { path: '/projects', label: 'Projects', active: false },
    { path: '/playground', label: 'Playground', active: true },
    { path: '/contact', label: 'Contact', active: false }
  ];

  return (
    <>
      <S.ParticlesBackground
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
      />
      <S.SideNav>
        {navItems.map(item => (
          <S.NavItem 
            key={item.path}
            active={item.active} 
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </S.NavItem>
        ))}
      </S.SideNav>
      
      <PS.PlaygroundContainer>
        {!selectedCard ? (
          <>
            <PS.CategoryContainer>
              {categories.map(category => (
                <PS.CategoryButton
                  key={category.id}
                  active={activeCategory === category.id}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.label}
                </PS.CategoryButton>
              ))}
            </PS.CategoryContainer>
            <PS.CardsContainer>
              <PS.CardsGrid>
                {playgroundItems[activeCategory].map((item, index) => (
                  <PS.Card 
                    key={index}
                    onClick={() => handleCardClick(item)}
                  >
                    <PS.CardTitle>{item.title}</PS.CardTitle>
                    <PS.CardDescription>{item.description}</PS.CardDescription>
                    {item.tech.map(tech => (
                      <PS.TechTag key={tech}>{tech}</PS.TechTag>
                    ))}
                  </PS.Card>
                ))}
              </PS.CardsGrid>
            </PS.CardsContainer>
          </>
        ) : (
          <PS.ContentContainer>
            <PS.BackButton onClick={handleBack}>
              <i className="fas fa-chevron-left"></i>
              돌아가기
            </PS.BackButton>
            <PS.ContentTitle>{selectedCard.title}</PS.ContentTitle>
            {selectedCard.content && selectedCard.content()}
          </PS.ContentContainer>
        )}
      </PS.PlaygroundContainer>
    </>
  );
};

export default Playground; 