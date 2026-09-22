import { lazy } from 'react';
import type { Demo, DemoCategory } from './playground.types';

export const DEMO_CATEGORIES: DemoCategory[] = ['effects', 'tech', 'challenge'];

// 데모는 열 때만 받는다 — three·chart.js·jspdf 같은 무거운 의존성이 목록 화면에 실리지 않는다.
// 순서는 목록에 보이는 순서다.
export const demos: Demo[] = [
  // Effects
  { id: 'music', category: 'effects', tech: ['Audio API'], Component: lazy(() => import('../ui/demos/music')) },
  { id: 'hover', category: 'effects', tech: ['Hover Animation'], Component: lazy(() => import('../ui/demos/hover')) },
  {
    id: 'loading',
    category: 'effects',
    tech: ['Loading Animation'],
    Component: lazy(() => import('../ui/demos/loading')),
  },
  {
    id: 'simple-motion',
    category: 'effects',
    tech: ['Animation'],
    Component: lazy(() => import('../ui/demos/simple-motion')),
  },
  {
    id: 'transform',
    category: 'effects',
    tech: ['3D Transform'],
    Component: lazy(() => import('../ui/demos/transform')),
  },
  {
    id: 'layout',
    category: 'effects',
    tech: ['Layout Animation'],
    Component: lazy(() => import('../ui/demos/layout')),
  },
  { id: 'spring', category: 'effects', tech: ['Spring Physics'], Component: lazy(() => import('../ui/demos/spring')) },
  {
    id: 'scroll-progress',
    category: 'effects',
    tech: ['Scroll Animation'],
    Component: lazy(() => import('../ui/demos/scroll-progress')),
  },
  { id: 'exit', category: 'effects', tech: ['AnimatePresence'], Component: lazy(() => import('../ui/demos/exit')) },
  { id: 'aos', category: 'effects', tech: ['Scroll Animation'], Component: lazy(() => import('../ui/demos/aos')) },
  { id: 'modal', category: 'effects', tech: ['Modal Animation'], Component: lazy(() => import('../ui/demos/modal')) },
  {
    id: 'timeline',
    category: 'effects',
    tech: ['Timeline Animation'],
    Component: lazy(() => import('../ui/demos/timeline')),
  },
  // Tech
  {
    id: 'data-visualization',
    category: 'tech',
    tech: ['Chart.js', 'Data Visualization'],
    Component: lazy(() => import('../ui/demos/data-visualization')),
  },
  {
    id: 'pdf-download',
    category: 'tech',
    tech: ['PDF Download'],
    Component: lazy(() => import('../ui/demos/pdf-download')),
  },
  { id: 'carousel', category: 'tech', tech: ['Carousel'], Component: lazy(() => import('../ui/demos/carousel')) },
  {
    id: 'pagination',
    category: 'tech',
    tech: ['Pagination'],
    Component: lazy(() => import('../ui/demos/pagination')),
  },
  {
    id: 'date-filter',
    category: 'tech',
    tech: ['Date Filter'],
    Component: lazy(() => import('../ui/demos/date-filter')),
  },
  {
    id: 'select-filter',
    category: 'tech',
    tech: ['Select Filter'],
    Component: lazy(() => import('../ui/demos/select-filter')),
  },
  {
    id: 'input-filter',
    category: 'tech',
    tech: ['Input Filter'],
    Component: lazy(() => import('../ui/demos/input-filter')),
  },
  { id: 'sidebar', category: 'tech', tech: ['Sidebar'], Component: lazy(() => import('../ui/demos/sidebar')) },
  {
    id: 'infinite-scroll',
    category: 'tech',
    tech: ['Infinite Scroll'],
    Component: lazy(() => import('../ui/demos/infinite-scroll')),
  },
  {
    id: 'floating-menu',
    category: 'tech',
    tech: ['Floating Menu'],
    Component: lazy(() => import('../ui/demos/floating-menu')),
  },
  // Challenge
  {
    id: 'three-viewer',
    category: 'challenge',
    tech: ['Three.js', '3D Animation'],
    Component: lazy(() => import('../ui/demos/three-viewer')),
  },
  {
    id: 'memory-game',
    category: 'challenge',
    tech: ['Game Logic', 'Animation'],
    Component: lazy(() => import('../ui/demos/memory-game')),
  },
  {
    id: 'tic-tac-toe',
    category: 'challenge',
    tech: ['Game Logic', 'Grid System'],
    Component: lazy(() => import('../ui/demos/tic-tac-toe')),
  },
  {
    id: 'calculator',
    category: 'challenge',
    tech: ['Calculator', 'Animation'],
    Component: lazy(() => import('../ui/demos/calculator')),
  },
];

export function findDemo(id: string) {
  return demos.find((demo) => demo.id === id);
}
