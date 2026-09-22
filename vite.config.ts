import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  resolve: { tsconfigPaths: true },
  build: {
    rolldownOptions: {
      output: {
        // 기본 분할은 수 KB짜리 공유 청크를 10개 넘게 만들어 느린 망에서 첫 화면 요청이 직렬화된다.
        // 첫 화면이 쓰는 라이브러리만 허용 목록으로 묶는다 — 제외 목록 방식은 중첩 node_modules(jspdf의
        // html2canvas·pako, motion의 framer-motion 등)를 vendor에 끌어들여 첫 로드를 키운다.
        codeSplitting: {
          groups: [
            {
              name: 'vendor',
              test: /node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom|i18next|react-i18next|radix-ui|@radix-ui|lucide-react|clsx|tailwind-merge|class-variance-authority|react-ga4)[\\/]/,
            },
            { name: 'shared', test: /[\\/]src[\\/](shared|configs|features[\\/](profile|skill))[\\/]/ },
          ],
        },
      },
    },
  },
  test: {
    // Vitest는 src만 본다 — e2e/는 Playwright 소유다.
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
});
