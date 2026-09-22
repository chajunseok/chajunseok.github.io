import { defineConfig } from '@playwright/test';

/**
 * E2E는 `e2e/`만 본다 — `src/**\/*.test.tsx`는 Vitest 소유다.
 * dev 서버가 아니라 production 번들(build + preview)을 띄운다 — 번들러 CJS 인터롭 같은 빌드 전용 오류를 잡기 위해서다.
 * GA ID를 넣어 초기화 경로까지 실행한다(측정 ID가 없으면 그 코드가 통째로 건너뛰어진다).
 */
export default defineConfig({
  testDir: 'e2e',
  use: { baseURL: 'http://localhost:5174', trace: 'on-first-retry' },
  webServer: {
    command: 'npm run build && npm run preview -- --port 5174 --strictPort',
    url: 'http://localhost:5174',
    reuseExistingServer: !process.env.CI,
    env: { VITE_GA_MEASUREMENT_ID: 'G-E2E00000' },
    timeout: 180_000,
  },
});
