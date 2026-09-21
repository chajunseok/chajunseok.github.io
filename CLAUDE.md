# chajunseok.github.io — CLAUDE.md

개인 포트폴리오. GitHub Pages 정적 배포(`main` push → Actions → `gh-pages`). 서버 코드 없음.
소스 아키텍처는 imanager5 frontend 구조를 따른다. 차이는 **HashRouter를 쓴다**는 점 하나다.

---

## 1. 핵심 원칙

1. **Page는 조립만** — 데이터·도메인 로직은 `features/{domain}`에 둔다.
2. **도메인 지식은 `features/{domain}`** — 타입·데이터·훅·도메인 UI.
3. **디자인시스템은 `shared`** — 도메인 용어면 `features/*/ui`, 없으면 `shared`.
4. **계층 위반 금지** — `npm run lint`가 강제한다 (§5).
5. **한 파일 1000줄 지양** — 컴포넌트 400줄, 훅 200줄이 분할 검토선.
6. **주석은 핵심만** — 무엇을 하는지 한두 문장. 경위는 커밋 메시지에.

### 계층 의존

```
허용:
  pages → features | shared | configs
  features → shared | types | configs
  app → pages(레지스트리) | features | shared | configs

금지:
  shared → features | pages | app | stores
  features → pages | app
  features/A → features/B
```

`features/{domain}/index.ts`와 shared 복합 모듈(`index.ts`가 있는 폴더)은 **공개 API만** export한다.
밖에서 `model/`·`hooks/`·`ui/`를 직접 import하지 않는다. 모듈 안에서는 상대경로를 쓴다.

| 종류      | 대상                              | 구조                                     | 배럴     |
| --------- | --------------------------------- | ---------------------------------------- | -------- |
| 복합 모듈 | `analytics` · `widget/{name}`     | `index.ts` · `model/` · `hooks/` · `ui/` | **필수** |
| 플랫 모듈 | `ui` · `utils` · `hooks` · `i18n` | 파일 나열                                | 불필요   |

`shared/ui/index.ts`는 예외적으로 원자 컴포넌트를 모아 export한다. `shared/i18n/index.ts`는
배럴이 아니라 `i18next.init()`이 든 실제 모듈이다.

---

## 2. 디렉터리 구조

```
src/
  app/
    App.tsx · router.tsx   # pages 레지스트리 → HashRouter 라우트
    providers/
    layouts/               # StandardLayout, SideNav (도메인 로직 금지)
  pages/{screen}/index.tsx # thin 화면 엔트리 (import.meta.glob 자동 등록)
  features/{domain}/       # index.ts · model/ · hooks/ · ui/
  shared/
    analytics/             # 복합 모듈 — GA4
    widget/{name}/         # 복합 위젯
    ui/ · hooks/ · utils/  # 플랫
    i18n/                  # ko/en 리소스 + init
  configs/ · styles/ · types/ · test/
legacy/src/                # 리디자인 전 코드 — 이식 참고용, 빌드·린트 제외. 이식 끝나면 삭제
```

### 화면 등록

- `pages/{screenId}/index.tsx`를 만들면 자동 등록된다. **폴더명이 곧 screenId**(kebab-case)다.
- 경로는 `configs/navigation.ts`의 `toPath(screenId)` — 홈만 `/`, 나머지는 `/{screenId}`.
- 사이드 내비게이션 노출은 `NAV_SCREEN_IDS`에 추가한다.

---

## 3. 기술 스택

| 분야       | 선택                                     |
| ---------- | ---------------------------------------- |
| UI / Lang  | React 19 + TypeScript strict             |
| Build      | Vite 8 (Node ≥ 22.12)                    |
| Styling    | Tailwind 4 + Token(CSS 변수) + CVA       |
| Primitives | Radix + shadcn → `shared/ui`             |
| Icons      | lucide-react                             |
| Motion     | motion                                   |
| Routing    | react-router-dom `HashRouter`            |
| i18n       | i18next (ko 기본, en)                    |
| Docs       | Storybook (**새 shared/ui 스토리 필수**) |
| Test       | Vitest + Testing Library · Playwright    |
| Lint       | ESLint + Prettier · Husky lint-staged    |

---

## 4. 명명

| 종류       | 패턴                | 예                 |
| ---------- | ------------------- | ------------------ |
| Page       | `{Domain}Page`      | `ProjectsPage`     |
| Feature UI | `{Domain}{역할}`    | `ProjectCard`      |
| Hook       | `use{Domain}{역할}` | `useProjectFilter` |
| screenId   | kebab-case          | `projects`         |

파일명은 kebab-case. 예외는 **훅 파일(camelCase)** 과 **`app/layouts/{Shell}/` 진입 파일(PascalCase,
`index.ts`가 re-export하는 파일)** 둘뿐이다.

---

## 5. PR 체크리스트

- [ ] Page에 도메인 로직·데이터 없음
- [ ] 도메인 타입·데이터·훅 ∈ `features/*`
- [ ] shared ↛ features/pages/app/stores (ESLint)
- [ ] features·shared 복합 모듈은 `index.ts` 공개 API만 사용
- [ ] 새 `shared/ui`에 Storybook 스토리
- [ ] 문구는 i18n 키 (ko/en 둘 다)
- [ ] 1000줄 초과 파일 없음

## 6. Git · 명령

커밋: `<type>: <subject>` — feat / fix / design / style / refactor / remove / docs / test / chore.
Pre-commit: lint-staged(eslint --fix + prettier). Pre-push: typecheck + test.

```bash
npm run dev
npm run build        # tsc -b && vite build
npm run lint
npm run test
npm run test:e2e
npm run storybook
```
