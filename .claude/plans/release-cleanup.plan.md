# Plan: 정리·출시

**Source PRD**: `.claude/prds/portfolio-redesign.prd.md`
**Selected Milestone**: 5 — 정리·출시 (legacy 제거, README 갱신, 지표 확인, main 배포)
**Complexity**: Medium

## Summary

이식이 끝난 legacy 코드와 그 전용 의존성·미사용 자산을 지우고, README를 새 구조·스택 기준으로 다시 쓴다.
배포 전 검증(전체 테스트·빌드·Lighthouse)을 통과하면 `redesign`을 `main`에 병합해 GitHub Pages로 내보낸다.
**병합 = 즉시 배포**이므로 병합은 사용자 확인 뒤에만 한다.

## 현황 (조사 결과)

| 항목             | 상태                                                                                                                          |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `legacy/src/`    | 26 데모·페이지·스타일 모두 이식 완료. 참조하는 곳 없음 (eslint/prettier ignore, CLAUDE.md 언급만)                             |
| 미사용 의존성    | `framer-motion`, `styled-components`, `react-tsparticles`, `tsparticles` — `src/`에서 import 0건                              |
| 미사용 자산      | `public/assets/profile.jpg`, `profile1.jpeg`, `react.svg`, `public/vite.svg` — 참조 0건                                       |
| README           | 구 디자인 기준(모달, tsParticles, `main.jsx`, 폴더 구조). `docs/assets/*.gif` 11개도 구 화면 캡처                             |
| PRD 마일스톤 3·4 | E2E 미실행으로 `in-progress` (chromium 다운로드가 네트워크에서 막힘)                                                          |
| 배포             | `main` push → Actions(Node 22, `npm run build`) → `gh-pages`. 새 `build`는 `tsc -b && vite build` — Actions에서도 그대로 동작 |

## Patterns to Mirror

| Category    | Source                                   | Pattern                                                                                               |
| ----------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| README 구성 | 현재 `README.md` §실행 및 배포, §GA4     | 섹션 순서·톤 유지, 내용만 새 구조로                                                                   |
| 문서 규칙   | `CLAUDE.md` §2 디렉터리 구조             | README 폴더 구조는 CLAUDE.md와 같은 트리 사용 (이중 관리 방지 — README는 요약, 상세는 CLAUDE.md 링크) |
| 커밋        | `git log` (`feat:`/`refactor:`/`chore:`) | `chore: remove legacy …`, `docs: …`                                                                   |
| Tests       | 기존 38개 + E2E 3개                      | 삭제 후 전체 재실행으로 회귀 확인                                                                     |

## Files to Change

| File                                                                      | Action                 | Why                                                                                                                            |
| ------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `legacy/**`                                                               | DELETE                 | 이식 완료, 참조 없음                                                                                                           |
| `package.json` / lock                                                     | UPDATE                 | `framer-motion` `styled-components` `react-tsparticles` `tsparticles` 제거                                                     |
| `public/assets/profile.jpg` `profile1.jpeg` `react.svg` `public/vite.svg` | DELETE                 | 미사용                                                                                                                         |
| `eslint.config.js` `.prettierignore`                                      | UPDATE                 | `legacy` ignore 항목 제거 (eslint.config.js는 config-protection 훅이 막을 수 있음 — 막히면 ignore 한 줄은 남겨 둔다; 무해)     |
| `CLAUDE.md`                                                               | UPDATE                 | `legacy/src/` 줄 삭제                                                                                                          |
| `README.md`                                                               | UPDATE                 | 섹션·구조·스택·실행 방법·GA4·연락처(`wnstjr401@gmail.com`)를 새 사이트 기준으로 재작성                                         |
| `docs/assets/*.gif`                                                       | DELETE + 사용자 재촬영 | 구 화면. 새 GIF는 사용자가 배포 후 촬영 — 그 전까지 README는 정적 스크린샷(`docs/assets/*.png`, 배포 전 preview에서 캡처) 사용 |
| `.claude/prds/portfolio-redesign.prd.md`                                  | UPDATE                 | 마일스톤 3·4·5 상태, E2E 미실행 사실 기록                                                                                      |

## Tasks

### Task 1: legacy·의존성·자산 제거

- **Action**: `git rm -r legacy`, `npm uninstall` 4개, 미사용 자산 삭제, ignore 항목 정리.
- **Validate**: `npm run typecheck && npm run lint && npm test && npm run build` 모두 통과, 빌드 청크 크기가 이전과 같음(메인 ≈128KB gzip).

### Task 2: README 재작성

- **Action**: Home·Projects(상세 URL)·Playground(26 데모, 카테고리)·Contact 소개, 아키텍처 요약(CLAUDE.md 링크), 스택 표, 실행·테스트·Storybook·배포 명령, GA4(페이지뷰+클릭 이벤트), 연락처. 스크린샷은 preview 화면 4장(Home, Projects, 상세, Playground) PNG로 캡처해 `docs/assets/`에 저장하고 GIF 11개는 삭제.
- **Validate**: README의 모든 상대 링크·이미지가 존재, 명령이 `package.json` scripts와 일치.

### Task 3: 배포 전 검증

- **Action**: 전체 검증 명령, preview에서 Lighthouse(mobile) Home·Projects·상세·Playground, 성능 trace(LCP·CLS) 재측정, E2E는 chromium 설치 재시도(실패 시 사유 기록).
- **Validate**: Accessibility·Best Practices·SEO 100 유지, LCP < 2.5s, CLS 0.

### Task 4: 병합·배포 (사용자 확인 후)

- **Action**: `main`에 `redesign`을 병합(`--no-ff`, 히스토리 보존)하고 push → Actions 배포 확인 → 배포 URL에서 Lighthouse Performance 점수 확인(PRD 지표).
- **Validate**: `gh run watch` 성공, `https://chajunseok.github.io/#/projects/potless` 실제 접속, GA4 실시간 보고서에 페이지뷰 표시.

## Validation

```bash
npm run typecheck && npm run lint && npm test && npm run build && npm run build-storybook
npx playwright install chromium && npm run test:e2e   # 가능한 환경에서
npm run preview   # Lighthouse(mobile) 4개 화면
```

## Risks

| Risk                                                  | Likelihood | Mitigation                                                                              |
| ----------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------- |
| 병합 즉시 구 사이트가 교체됨 — 되돌리기 필요 시       | Low        | `main`의 병합 전 커밋(`ebb8a16`)으로 `git revert -m 1` 가능. 병합은 사용자 확인 후에만  |
| Actions 빌드가 로컬과 다르게 실패(Node 22 vs 로컬 26) | Low        | `engines.node >=22.12`, 로컬 `npm ci`로 lock 일치 확인 후 push                          |
| E2E를 끝내 못 돌림                                    | Med        | 브라우저 수동 확인으로 대체하고 PRD에 기록. chromium 설치는 다른 네트워크에서 재시도    |
| README 스크린샷이 곧 낡음                             | Low        | 사용자가 배포본에서 GIF 촬영 후 교체 (TODO로 README에 남기지 않고 PRD 열린 질문에 기록) |

## Acceptance

- [ ] `legacy/`·미사용 의존성·자산 제거 후 전체 검증 통과
- [ ] README가 새 사이트를 정확히 설명 (구 스택·모달·tsParticles 언급 없음)
- [ ] Lighthouse 90+ (배포본 Performance 포함)
- [ ] 사용자 확인 후 `main` 병합·배포 성공, 상세 URL 실제 접속 확인
