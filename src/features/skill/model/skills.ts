import type { SkillGroup } from './skill.types';

// 그룹·항목은 GitHub 프로필(github.com/chajunseok)의 Tech Stack과 맞춘다. level은 자기 평가.
export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    skills: [
      {
        name: 'React',
        level: 90,
        description: 'React 19 · MDI 탭 셸과 계층형 아키텍처 설계, 190여 화면 규모의 관리 콘솔 전환 주도',
      },
      {
        name: 'TypeScript',
        level: 85,
        description: 'strict 모드, OpenAPI 명세 기반 타입·Zod 스키마 자동 생성, ESLint로 계층 의존 규칙 강제',
      },
      {
        name: 'TanStack Query · Zustand',
        level: 80,
        description: '서버 상태와 클라이언트 상태 분리, WebSocket 스트림과 REST 통계의 이원화 캐싱',
      },
      {
        name: 'React Hook Form · Zod',
        level: 80,
        description: '공용 FormField·검색폼 위젯, 스키마 한 곳에서 검증·타입 동시 관리',
      },
      {
        name: 'Tailwind CSS · Radix UI',
        level: 85,
        description: '토큰 기반 디자인시스템, Radix 원자 UI 위에 공용 위젯(DataTable·모달 큐) 구축',
      },
      {
        name: 'Vitest · Storybook · Playwright',
        level: 75,
        description: '원자 UI 스토리 필수화, 단위·E2E를 pre-push 훅에서 실행하는 검증 파이프라인',
      },
      { name: 'Vue.js', level: 75, description: 'Pinia 전역 상태, API 모듈화. 스트리밍·관제 서비스 개발 경험' },
    ],
  },
  {
    id: 'backend',
    skills: [
      {
        name: 'Spring Boot',
        level: 80,
        description: '관리 콘솔 REST API 개발 — 거래로그·배치·모듈/인스턴스 관리, 연계 엔진과의 HTTP 통신',
      },
      {
        name: 'JPA · QueryDSL',
        level: 80,
        description: '대용량 거래 로그 조회 쿼리, 동적 검색 조건, N+1 없는 연관 관계 설계',
      },
      {
        name: 'Spring Security · WebSocket',
        level: 70,
        description: 'JWT 인증과 메뉴 단위 권한 검사, STOMP 브로드캐스트로 실시간 TPS 지표 전송',
      },
      {
        name: 'PostgreSQL · MySQL',
        level: 75,
        description: '스키마·인덱스 설계, 시간·일·월 통계 집계 쿼리, 마이그레이션 관리',
      },
      { name: 'Redis', level: 70, description: '실시간 지표 캐시와 세션·토큰 저장, TTL 기반 만료 설계' },
      { name: 'Kafka', level: 60, description: '거래 이벤트 발행·구독, 컨슈머 그룹으로 수집기와 브로드캐스터 분리' },
      {
        name: 'Spring Cloud Eureka',
        level: 60,
        description: '서비스 디스커버리 기반 모듈 등록·조회, 인스턴스 상태 확인',
      },
      {
        name: 'Python',
        level: 80,
        description: 'stdlib만으로 만든 로컬 서버(claude-config-map), 데이터 처리·ML 파이프라인',
      },
    ],
  },
  {
    id: 'ai',
    skills: [
      {
        name: 'Claude Code',
        level: 90,
        description:
          '계획 → 구현 → 리뷰 → 검증 파이프라인을 Skill·Hook으로 고정, 실패 시 Loop 재작업, Agent Team 병렬 처리',
      },
      {
        name: 'MCP · Plugins · Skills',
        level: 85,
        description: '팀 규칙에 맞는 플러그인·스킬 제작, 설정 관리 도구(claude-config-map) 오픈소스 공개',
      },
      {
        name: 'Coding Agents',
        level: 75,
        description: 'Codex · Hermes Agent · OpenClaw를 같은 기준으로 비교 검증하고 팀에 도입 가이드 공유',
      },
      {
        name: 'On-Premise LLM',
        level: 65,
        description: 'llama.cpp 기반 경량 모델로 폐쇄망 운영 지원 기능 설계 — 로그 원인 후보, 자연어 → 검색 조건 변환',
      },
      { name: 'PyTorch · YOLO', level: 75, description: '객체 탐지 모델 커스텀 학습·경량화, 온디바이스 배포 경험' },
    ],
  },
  {
    id: 'tool',
    skills: [
      {
        name: 'Git · GitHub · GitLab',
        level: 85,
        description: '브랜치 전략, AI 리뷰를 끼운 머지 파이프라인, GitHub Actions 배포',
      },
      { name: 'Figma', level: 75, description: 'UI 시안·프로토타입, 디자인 토큰을 코드로 옮기는 작업' },
      { name: 'Obsidian', level: 70, description: '검증한 도구·워크플로우 문서화와 팀 공유' },
      { name: 'Cursor · VS Code', level: 85, description: '개발 환경 커스터마이징, AI 어시스턴트 활용' },
    ],
  },
];
