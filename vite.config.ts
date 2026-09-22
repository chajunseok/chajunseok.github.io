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
        // 첫 화면이 쓰는 라이브러리와 공용 src 모듈을 각각 한 청크로 묶는다. 무거운 데모 전용 라이브러리는 제외.
        codeSplitting: {
          groups: [
            {
              name: 'vendor',
              test: /node_modules[\\/](?!three|chart\.js|react-chartjs-2|jspdf|html2canvas-pro|motion)/,
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
