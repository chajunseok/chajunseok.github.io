import { defineConfig } from '@playwright/test';

/** E2E는 `e2e/`만 본다 — `src/**\/*.test.tsx`는 Vitest 소유다. */
export default defineConfig({
  testDir: 'e2e',
  use: { baseURL: 'http://localhost:5174', trace: 'on-first-retry' },
  webServer: {
    command: 'npm run dev -- --port 5174 --strictPort',
    url: 'http://localhost:5174',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
