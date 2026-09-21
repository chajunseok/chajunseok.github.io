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
  MusicAnimation
} from '@components/effects';

import {
  CarouselAnimation,
  PaginationAnimation,
  DateFilterAnimation,
  SelectFilterAnimation,
  InputFilterAnimation,
  SidebarAnimation,
  InfiniteScrollAnimation,
  FloatingAnimation,
  PdfDownloadAnimation,
  DataVisualization
} from '@components/tech';

import MemoryGame from '@components/games/MemoryGame';
import TicTacToe from '@components/games/TicTacToe';
import Calculator from '@components/games/Calculator';
import ThreeViewer from '@components/games/ThreeViewer';

export const categories = [
  { id: 'effects', label: 'EFFECTS' },
  { id: 'tech', label: 'TECH' },
  { id: 'challenge', label: 'CHALLENGE' }
];

export const playgroundItems = {
  effects: [
    {
      title: 'Music Animation',
      description: '음악 재생과 함께 움직이는 시각화 효과',
      tech: ['Audio API'],
      content: MusicAnimation
    },
    {
      title: 'Hover Animation',
      description: '마우스 hover 시 다양한 인터랙션 효과',
      tech: ['Hover Animation'],
      content: HoverAnimation
    },
    {
      title: '로딩 Animation',
      description: '자동으로 닫히는 로딩 애니메이션',
      tech: ['Loading Animation'],
      content: LoadingAnimation
    },
    {
      title: '요소 변화 Animation',
      description: '크기 변화, 회전, 모서리 둥글기가 조화로운 애니메이션',
      tech: ['Animation'],
      content: SimpleMotion
    },
    {
      title: '시점 변화 Animation',
      description: '3D 변환과 시점 변화를 통한 입체적인 애니메이션',
      tech: ['3D Transform'],
      content: TransformEffect
    },
    {
      title: '레이아웃 Animation',
      description: '요소의 위치와 크기가 자연스럽게 변화하는 레이아웃 애니메이션',
      tech: ['Layout Animation'],
      content: LayoutAnimation
    },
    {
      title: '스프링 Motion',
      description: '자연스러운 스프링 물리 효과를 적용한 애니메이션',
      tech: ['Spring Physics'],
      content: SpringMotion
    },
    {
      title: '스크롤 Progress',
      description: '스크롤 진행도에 따라 원이 채워지는 인터랙티브 애니메이션',
      tech: ['Scroll Animation'],
      content: ScrollProgress
    },
    {
      title: '퇴장 Animation',
      description: '요소가 사라질 때 자연스러운 퇴장 애니메이션',
      tech: ['AnimatePresence'],
      content: ExitAnimation
    },
    {
      title: 'AOS Animation',
      description: '스크롤에 따라 요소가 나타나는 애니메이션',
      tech: ['Scroll Animation'],
      content: AOSAnimation
    },
    {
      title: 'Modal Animation',
      description: '모달 열고 닫힐 때의 부드러운 애니메이션',
      tech: ['Modal Animation'],
      content: ModalAnimation
    },
    {
      title: '타임라인 Animation',
      description: '시간에 따라 연속적으로 변화하는 애니메이션',
      tech: ['Timeline Animation'],
      content: TimelineAnimation
    }
  ],
  tech: [
    {
      title: '데이터 시각화',
      description: '차트와 그래프를 활용한 통계 데이터 시각화',
      tech: ['Chart.js', 'Data Visualization'],
      content: DataVisualization
    },
    {
      title: 'PDF 다운로드',
      description: '현재 화면을 PDF로 변환하여 다운로드',
      tech: ['PDF Download'],
      content: PdfDownloadAnimation
    },
    {
      title: '캐러셀 슬라이더',
      description: '드래그 가능한 반응형 캐러셀 컴포넌트',
      tech: ['Carousel'],
      content: CarouselAnimation
    },
    {
      title: '페이지네이션',
      description: '부드러운 전환 효과가 있는 페이지네이션',
      tech: ['Pagination'],
      content: PaginationAnimation
    },
    {
      title: '날짜 필터',
      description: '날짜 범위로 데이터를 필터링하는 검색 기능',
      tech: ['Date Filter'],
      content: DateFilterAnimation
    },
    {
      title: 'Select 필터',
      description: '카테고리와 상태로 데이터를 필터링하는 검색 기능',
      tech: ['Select Filter'],
      content: SelectFilterAnimation
    },
    {
      title: 'Input 필터',
      description: '실시간 텍스트 검색이 가능한 필터링 기능',
      tech: ['Input Filter'],
      content: InputFilterAnimation
    },
    {
      title: '토글 사이드바',
      description: '부드러운 애니메이션이 적용된 반응형 사이드바',
      tech: ['Sidebar'],
      content: SidebarAnimation
    },
    {
      title: '무한 스크롤',
      description: 'Intersection Observer를 활용한 무한 스크롤 구현',
      tech: ['Infinite Scroll'],
      content: InfiniteScrollAnimation
    },
    {
      title: '플로팅 메뉴',
      description: '스크롤에 반응하는 플로팅 액션 버튼',
      tech: ['Floating Menu'],
      content: FloatingAnimation
    }
  ],
  challenge: [
    {
      title: '3D 뷰어',
      description: '방향키와 마우스로 조작하는 3D 효과',
      tech: ['Three.js', '3D Animation'],
      content: ThreeViewer
    },
    {
      title: '메모리 카드 게임',
      description: '짝을 맞추는 카드 매칭 게임',
      tech: ['Game Logic', 'Animation'],
      content: MemoryGame
    },
    {
      title: '틱택토 게임',
      description: '3x3 보드에서 진행하는 O/X 게임',
      tech: ['Game Logic', 'Grid System'],
      content: TicTacToe
    },
    {
      title: '계산기',
      description: '기본 연산이 가능한 시각화 계산기',
      tech: ['Calculator', 'Animation'],
      content: Calculator
    }
  ]
}; 