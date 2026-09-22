# Plan: Playground 이식

**Source PRD**: `.claude/prds/portfolio-redesign.prd.md`
**Selected Milestone**: 4 — Playground 이식 (Effects 12 · Tech 10 · Challenge 4)
**Complexity**: Large (legacy 26개 컴포넌트 ≈ 4,200줄)

## Summary

legacy Playground 26개 데모를 TypeScript + Tailwind + `motion`으로 옮기고, 새 디자인의 목록·보기 화면 안에 넣는다.
데모마다 공유 가능한 URL(`#/playground/{id}`)을 주고, 무거운 의존성(three · chart.js · jspdf)은 해당 데모를 열 때만 받는다.
동작은 legacy와 같게 유지하는 것이 기준이다 — 재디자인이 아니라 이식이다(PRD 열린 질문: 톤 불일치 항목은 이식 후 별도 판단).

## 현황 (legacy)

| 분류      | 개수 | 외부 의존성                                                                | 비고                                             |
| --------- | ---- | -------------------------------------------------------------------------- | ------------------------------------------------ |
| Effects   | 12   | framer-motion                                                              | Music은 `public/music/background.mp3` 재생       |
| Tech      | 10   | framer-motion, chart.js(DataVisualization), jspdf+html2canvas(PdfDownload) | 필터·페이지네이션·무한스크롤 등 샘플 데이터 내장 |
| Challenge | 4    | framer-motion, three(ThreeViewer)                                          | 게임 로직이 컴포넌트 안에 섞여 있음              |

스타일은 `styles/PlaygroundStyles.js`(styled-components) + 인라인 style 196곳. 목록은 카드 클릭 시 같은 화면에서 교체(URL 없음).

## 결정 사항 (구현 전 확인 필요한 것은 ☐)

- 데모 상세는 **전용 URL** `#/playground/{id}` — 프로젝트 상세와 같은 방식(공유·GA 페이지뷰).
- 데모는 **데모 단위 lazy import** — 목록 화면은 가볍게, three/chart.js/jspdf는 해당 데모에서만 로드.
- `framer-motion` → `motion`. 드래그·레이아웃 애니메이션을 쓰는 데모가 있어 Playground 보기 화면에서만 `domMax` 기능을 추가로 로드(전역은 `domAnimation` 유지).
- three 0.162 → 최신, OrbitControls는 `three/addons/...` 경로.
- ☑ **html2canvas → html2canvas-pro** (2026-09-22 확인): Tailwind 4 기본 색이 `oklch()`라 원본은 캡처가 깨질 수 있어 API 동일한 포크로 교체.
- ☑ **데모 내부 문구도 i18n** (2026-09-22 확인): 샘플 데이터·버튼 텍스트까지 ko/en. 기본 번역 파일이 커지지 않도록
  `playground` 네임스페이스(`shared/i18n/locales/{ko,en}.playground.json`)로 분리하고, 데모는 `useTranslation('playground')`를 쓴다.
  데모 제목·설명(카탈로그)도 같은 네임스페이스의 키로 둔다.
- legacy 전용 의존성(`framer-motion`, `styled-components`, `react-tsparticles`, `tsparticles`) 제거는 마일스톤 5.

## Patterns to Mirror

| Category     | Source                                                                                   | Pattern                                                                                                                                         |
| ------------ | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 상세 라우트  | `src/configs/navigation.ts:5`, `src/pages/project-detail/index.tsx`                      | `PATH_OVERRIDES`에 `playground-detail` 추가, 없는 id는 목록으로 `Navigate`                                                                      |
| Feature 구조 | `src/features/project/index.ts`                                                          | `features/playground/{model,ui}` + `index.ts` 공개 API                                                                                          |
| 목록 UI      | `src/features/project/ui/project-card.tsx`                                               | `SpotlightCard` + `Badge` + `Reveal`, 카드 전체가 `Link`                                                                                        |
| 탭           | `src/features/skill/ui/skill-board.tsx`                                                  | `shared/ui` Tabs (Radix)                                                                                                                        |
| 모션         | `src/app/providers/AppProviders.tsx`                                                     | `LazyMotion strict` → `m.*`만 사용                                                                                                              |
| shared/ui    | `src/shared/ui/button.tsx`, `*.stories.tsx`                                              | kebab-case, CVA, 스토리 동봉                                                                                                                    |
| Errors       | —                                                                                        | 기존 패턴 없음. lazy 청크 로드 실패 시 앱 전체가 빈 화면이 되지 않도록 `shared/widget/error-boundary.tsx`(기준 레포와 같은 단일 파일 위젯) 신설 |
| Tests        | `src/pages/project-detail/project-detail.test.tsx`, `src/shared/utils/copy-text.test.ts` | 라우트 렌더 테스트 + 순수 로직 단위 테스트 colocate                                                                                             |

## Files to Change

| File                                                                             | Action     | Why                                                                             |
| -------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------- |
| `package.json`                                                                   | UPDATE     | three·chart.js·react-chartjs-2·jspdf 최신, `html2canvas-pro`(☐), `@types/three` |
| `src/configs/navigation.ts`                                                      | UPDATE     | `playground-detail` → `/playground/:demoId`, `playgroundPath()`                 |
| `src/features/playground/model/playground.types.ts`                              | CREATE     | `DemoCategory`, `Demo { id, category, title, description, tech, load }`         |
| `src/features/playground/model/demos.ts` (+test)                                 | CREATE     | 26개 카탈로그 + `findDemo()` — id 중복·로더 존재 검사                           |
| `src/features/playground/model/{tic-tac-toe,calculator,memory-game}.ts` (+tests) | CREATE     | 게임 로직을 순수 함수로 분리(승자 판정·계산·짝 맞춤)                            |
| `src/features/playground/ui/demo-grid.tsx`                                       | CREATE     | 카테고리 탭 + 카드 그리드                                                       |
| `src/features/playground/ui/demo-viewer.tsx`                                     | CREATE     | 제목·설명·기술 + lazy 데모(Suspense + ErrorBoundary + domMax)                   |
| `src/features/playground/ui/demos/*.tsx`                                         | CREATE ×26 | legacy 데모 이식 (kebab-case 파일명)                                            |
| `src/features/playground/index.ts`                                               | CREATE     | 공개 API                                                                        |
| `src/shared/widget/error-boundary.tsx` (+test)                                   | CREATE     | 청크 로드·렌더 실패 시 대체 UI                                                  |
| `src/pages/playground/index.tsx`                                                 | UPDATE     | 목록 조립                                                                       |
| `src/pages/playground-detail/index.tsx` (+test)                                  | CREATE     | `demoId` → 보기, 없는 id는 목록으로                                             |
| `src/shared/i18n/locales/{ko,en}.json`                                           | UPDATE     | Playground 틀 문구                                                              |
| `e2e/smoke.spec.ts`                                                              | UPDATE     | 목록 → 데모 진입 시나리오                                                       |

## Tasks

### Task 1: 의존성·라우팅·카탈로그 골격

- **Action**: 의존성 업그레이드, `playground-detail` 경로, 카탈로그 타입·데이터(로더는 데모 파일 경로), 목록·보기 화면, ErrorBoundary. 데모는 아직 legacy 1개만 이식해 흐름 검증.
- **Mirror**: 프로젝트 목록/상세 구조
- **Validate**: `npm test`(카탈로그·라우트), `npm run build` — three/chart.js/jspdf가 메인 번들에 없는지 청크 목록 확인.

### Task 2: Effects 12개 이식

- **Action**: framer-motion → `m.*`, styled-components·인라인 스타일 → Tailwind 토큰. 동작(애니메이션 값·타이밍)은 그대로.
- **Validate**: 브라우저에서 12개 진입·동작 확인, 콘솔 에러 없음.

### Task 3: Tech 10개 이식

- **Action**: 동일 방식. DataVisualization은 chart.js 최신, PdfDownload는 jspdf 4 + (☐)html2canvas-pro.
- **Validate**: 필터·페이지네이션·무한스크롤 동작, PDF 파일 실제 생성 확인.

### Task 4: Challenge 4개 이식

- **Action**: 게임 로직을 `model/`의 순수 함수로 분리 + 단위 테스트, UI 이식. ThreeViewer는 three 최신 API로, 언마운트 시 renderer·geometry dispose 유지.
- **Validate**: `npm test`(게임 로직), 브라우저에서 플레이·3D 조작 확인, 페이지 이동 후 WebGL 컨텍스트 해제.

### Task 5: 검증

- **Action**: i18n 누락 확인, E2E 시나리오 추가, Lighthouse(Playground 목록·데모 1개).
- **Validate**: 아래 Validation 전체.

## Validation

```bash
npm run typecheck
npm run lint
npm test
npm run build            # 메인 번들 크기 유지 확인 (현재 136KB gzip), 데모별 청크 분리 확인
npm run build-storybook
npm run test:e2e         # chromium 설치 가능한 환경에서
npm run preview          # 26개 데모 수동 확인 + Lighthouse(mobile) 90+
```

## Risks

| Risk                                                 | Likelihood | Mitigation                                               |
| ---------------------------------------------------- | ---------- | -------------------------------------------------------- |
| html2canvas가 oklch 색을 못 읽어 PDF 캡처 실패       | High       | html2canvas-pro 교체(☐), 데모 안은 hsl 토큰만 사용       |
| three 메이저 업데이트로 ThreeViewer API 변경         | Med        | 공식 migration 확인, 동작 비교                           |
| 26개 이식 중 동작 미세 차이                          | Med        | legacy와 나란히 띄워 비교(legacy는 `main` 브랜치 배포본) |
| 드래그·레이아웃 모션이 `domAnimation`에서 동작 안 함 | Med        | 보기 화면에서만 `domMax` LazyMotion                      |
| 데모 청크가 메인 번들로 새어 들어감                  | Low        | 카탈로그 로더는 동적 import만, 빌드 청크 목록으로 확인   |

## Acceptance

- [ ] 26개 데모가 `#/playground/{id}`로 열리고 legacy와 같게 동작
- [ ] 메인 번들 크기 증가 없음, 무거운 의존성은 데모 청크에만
- [ ] 게임 로직 단위 테스트 통과
- [ ] Validation 통과, Lighthouse 90+
- [ ] Patterns mirrored, not reinvented
