# Plan: 핵심 화면 리디자인

**Source PRD**: `.claude/prds/portfolio-redesign.prd.md`
**Selected Milestone**: 3 — 핵심 화면 리디자인 (Home · Projects · 프로젝트 상세 · Contact)
**Complexity**: Large

## Summary

2단계에서 옮긴 `features/{profile,skill,project}` 데이터를 새 인터랙티브 디자인의 화면 4개로 만든다.
프로젝트 상세는 모달 대신 공유 가능한 전용 URL(`#/projects/{id}`)로 바꿔 GA 페이지뷰로 상세 조회율을 잰다.
화면 문구는 i18n(ko/en), 콘텐츠는 한국어 그대로 둔다(PRD out of scope).

## 디자인 방향 (인터랙티브)

- **톤**: 다크 단일 테마 유지. 배경은 은은한 grain + 포인터를 따라가는 radial spotlight — 전역 파티클(tsparticles)은 쓰지 않는다(성능 목표 90+).
- **타이포**: 본문 Pretendard Variable, 디스플레이(이름·섹션 제목)는 큰 스케일 대비로 위계. 폰트 패밀리 2개 이하.
- **모션** (`motion`, 이미 설치됨): 히어로 텍스트 순차 등장, 스크롤 진입 reveal, 카드 hover 시 포인터 spotlight·살짝 기울기, 기술 숙련도 바는 화면에 들어올 때 채워짐, 라우트 전환 fade.
  모든 모션은 `prefers-reduced-motion`을 따른다(`MotionConfig reducedMotion="user"`). transform·opacity만 애니메이트.
- **레이아웃**: Projects는 대표 프로젝트를 크게 두는 bento 그리드(균일 카드 그리드 지양). 상세는 긴 글 읽기용 단일 컬럼 + 섹션 앵커.

## Patterns to Mirror

| Category           | Source                                                                    | Pattern                                                                                                               |
| ------------------ | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Naming (shell)     | `src/app/layouts/SideNav/SideNav.tsx:7`                                   | 셸 진입 파일 PascalCase + `index.ts` re-export, 보조 파일 kebab-case (`language-toggle.tsx`)                          |
| Naming (shared/ui) | `src/shared/ui/button.tsx:8`, `button-variants.ts:3`                      | kebab-case 파일, CVA 변형은 별도 `*-variants.ts`, `cn()`으로 병합, 스토리 동봉                                        |
| Feature 공개 API   | `src/features/project/index.ts:1`                                         | `index.ts`만 export, 외부는 `@/features/{domain}`으로만 import                                                        |
| Data access        | `src/features/project/model/projects.ts:3`                                | 정적 배열 export — fetch 없음                                                                                         |
| 화면 등록          | `src/pages/index.ts:3`, `src/configs/navigation.ts:7`                     | `pages/{screenId}/index.tsx` glob 등록, 경로는 configs가 정함                                                         |
| Analytics          | `src/shared/analytics/model/ga.ts:14`                                     | 비활성 시 no-op, 호출부는 `@/shared/analytics`만 사용                                                                 |
| i18n               | `src/shared/i18n/locales/ko.json`, `i18next.d.ts`                         | 키는 ko.json이 스키마, en.json 동시 추가                                                                              |
| Errors             | —                                                                         | 기존 에러 처리 패턴 없음. 이번 범위의 실패 지점은 없는 프로젝트 id(→ 목록으로 이동)와 클립보드 거부(→ 실패 문구) 둘뿐 |
| Tests              | `src/app/App.test.tsx:5`, `src/features/project/model/projects.test.ts:5` | Vitest + RTL + userEvent, 한국어 테스트명, 대상 옆에 colocate                                                         |

## Files to Change

| File                                                                | Action | Why                                                                                               |
| ------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------- |
| `src/configs/navigation.ts`                                         | UPDATE | `PAGE_PATHS` 추가 — 기본 `/{screenId}`, 예외(`home`→`/`, `project-detail`→`/projects/:projectId`) |
| `src/app/router.tsx`                                                | UPDATE | 경로를 `PAGE_PATHS` 기준으로 매핑                                                                 |
| `src/app/providers/AppProviders.tsx`                                | UPDATE | `MotionConfig reducedMotion="user"`                                                               |
| `src/app/layouts/StandardLayout/*`                                  | UPDATE | spotlight 배경, 라우트 전환 fade, 스크롤 상단 복귀                                                |
| `src/app/layouts/SideNav/*`                                         | UPDATE | 새 디자인, 활성 표시 모션, 상세 페이지에서 Projects 활성 유지                                     |
| `src/styles/index.css`, `index.html`                                | UPDATE | 토큰 확장(accent·surface·radius·duration), 폰트 로드                                              |
| `src/shared/ui/badge.tsx` (+variants, stories)                      | CREATE | 기술 태그                                                                                         |
| `src/shared/ui/reveal.tsx` (+stories)                               | CREATE | 스크롤 진입 reveal 래퍼                                                                           |
| `src/shared/ui/spotlight-card.tsx` (+stories)                       | CREATE | 포인터 spotlight 카드                                                                             |
| `src/shared/ui/section-heading.tsx` (+stories)                      | CREATE | 섹션 제목(번호·제목·보조문)                                                                       |
| `src/shared/ui/index.ts`                                            | UPDATE | 새 원자 export                                                                                    |
| `src/shared/utils/copy-text.ts` (+test)                             | CREATE | 클립보드 복사, 실패 시 false                                                                      |
| `src/features/profile/model/{contact.types,contacts}.ts`            | CREATE | 연락처 데이터 (legacy Contact에서 이전)                                                           |
| `src/features/profile/ui/profile-hero.tsx`                          | CREATE | 이름·역할·태그 히어로                                                                             |
| `src/features/profile/ui/profile-about.tsx`                         | CREATE | 소개                                                                                              |
| `src/features/profile/ui/profile-timeline.tsx`                      | CREATE | 학력·경력·수상 타임라인                                                                           |
| `src/features/profile/ui/contact-list.tsx` (+test)                  | CREATE | 연락처 카드, 이메일 복사 피드백                                                                   |
| `src/features/profile/index.ts`                                     | UPDATE | UI 공개                                                                                           |
| `src/features/skill/ui/skill-board.tsx`                             | CREATE | 그룹 탭 + 숙련도 바                                                                               |
| `src/features/skill/index.ts`                                       | UPDATE | UI 공개                                                                                           |
| `src/features/project/model/projects.ts`                            | UPDATE | `findProject(id)`                                                                                 |
| `src/features/project/ui/project-grid.tsx`, `project-card.tsx`      | CREATE | bento 목록                                                                                        |
| `src/features/project/ui/project-detail.tsx` (+ 섹션 하위 컴포넌트) | CREATE | 개요·주요 기능·기술 선정 이유·역할·트러블슈팅·회고, 데모/GitHub 링크(GA 이벤트)                   |
| `src/features/project/index.ts`                                     | UPDATE | UI·`findProject` 공개                                                                             |
| `src/pages/home/index.tsx`                                          | UPDATE | hero·about·skill·timeline 조립                                                                    |
| `src/pages/projects/index.tsx`                                      | UPDATE | 그리드 조립                                                                                       |
| `src/pages/project-detail/index.tsx` (+test)                        | CREATE | `projectId` → 상세, 없는 id는 `/projects`로                                                       |
| `src/pages/contact/index.tsx`                                       | UPDATE | 연락처 조립                                                                                       |
| `src/shared/i18n/locales/{ko,en}.json`                              | UPDATE | 섹션·버튼·기술 그룹 라벨                                                                          |
| `src/app/App.test.tsx`, `e2e/smoke.spec.ts`                         | UPDATE | 새 화면 기준으로 갱신, 상세 진입 E2E 추가                                                         |

## Tasks

### Task 1: 라우팅 확장

- **Action**: `PAGE_PATHS`로 파라미터 경로 지원, `project-detail` 화면 등록.
- **Mirror**: `src/configs/navigation.ts:7`, `src/pages/index.ts:3`
- **Validate**: `npm test` — `#/projects/beevarium` 진입 시 상세 렌더, 없는 id는 `/projects`로 이동.

### Task 2: 디자인 토큰·셸

- **Action**: 토큰·폰트, `MotionConfig`, spotlight 배경, SideNav 리디자인, 라우트 전환.
- **Mirror**: `src/styles/index.css`의 HSL triplet 토큰 방식
- **Validate**: `npm run build`, 수동 확인(데스크톱·모바일 360px, reduced-motion on/off).

### Task 3: shared/ui 원자

- **Action**: Badge · Reveal · SpotlightCard · SectionHeading + 스토리, `copy-text` 유틸 + 테스트.
- **Mirror**: `src/shared/ui/button.tsx:8`, `button.stories.tsx`
- **Validate**: `npm run build-storybook`, `npm test`

### Task 4: Home

- **Action**: profile hero/about/timeline, skill board를 features/ui로 만들고 page에서 조립.
- **Mirror**: feature 공개 API `src/features/project/index.ts:1`
- **Validate**: `npm run lint`(계층 규칙), 수동 확인.

### Task 5: Projects + 상세

- **Action**: bento 그리드, 상세 페이지 섹션, 데모/GitHub 클릭 GA 이벤트(`logEvent('Project', 'click', '{type} - {title}')` — legacy와 같은 형식 유지).
- **Mirror**: `src/shared/analytics/model/ga.ts:25`
- **Validate**: `npm test`(상세 렌더·없는 id), E2E 목록→상세 이동.

### Task 6: Contact

- **Action**: 연락처 데이터 이전, 복사 버튼(성공/실패 피드백, `aria-live`).
- **Validate**: `npm test` — 복사 성공 시 피드백 문구 노출.

### Task 7: 검증

- **Action**: i18n ko/en 누락 확인, 테스트·E2E 갱신, Lighthouse 측정(로컬 preview).
- **Validate**: 아래 Validation 전체.

## Validation

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run build-storybook
npx playwright install chromium && npm run test:e2e
npm run preview   # Lighthouse(모바일): Home · Projects · 상세 — 전 항목 90+ 확인
```

## Risks

| Risk                                                          | Likelihood | Mitigation                                                                     |
| ------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------ |
| spotlight·모션으로 Performance 90 미달                        | Med        | transform/opacity만, 포인터 이벤트는 rAF로 묶음, reduced-motion 시 정적        |
| 한국어 웹폰트 용량으로 LCP 지연                               | Med        | 가변 폰트 subset + `font-display: swap`, 필요한 굵기만                         |
| 상세 페이지 GA 페이지뷰 누락                                  | Low        | 기존 `usePageView`가 pathname 기준이라 `/projects/{id}`도 잡힘 — 테스트로 확인 |
| ESLint shared 내부 import 규칙 미작동(config-protection 차단) | Known      | 리뷰로 확인. 사용자 허용 시 `eslint.config.js` 패턴 펼침 반영                  |

## 결정 사항 (2026-09-21 사용자 확인)

- [x] **이메일**: `wnstjr401@gmail.com` — Contact·README 모두 이 주소로 통일.
- [x] **전화번호**: 공개 유지.
- [x] 1·2단계 결과는 이 작업 전에 redesign 브랜치에 커밋.

## Acceptance

- [ ] All tasks complete
- [ ] Validation passes (Lighthouse 전 항목 90+ 포함)
- [ ] Patterns mirrored, not reinvented
- [ ] 화면 문구 ko/en 모두 존재
