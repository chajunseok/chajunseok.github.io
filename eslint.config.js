import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

/** shared 복합 모듈(index.ts가 있는 폴더)은 공개 API로만 쓴다 (CLAUDE.md §1). */
const sharedInternalPattern = {
  group: [
    '@/shared/*/{model,hooks,ui}',
    '@/shared/*/{model,hooks,ui}/**',
    '@/shared/widget/*/{model,hooks,ui}',
    '@/shared/widget/*/{model,hooks,ui}/**',
  ],
  message: 'shared 복합 모듈은 index.ts 공개 API로만 (예: @/shared/analytics).',
};

/** features 계층이 위로 올라가는 것을 막는 패턴. */
const featureLayerPatterns = [
  { group: ['@/pages/*', '@/pages'], message: 'features → pages 금지.' },
  { group: ['@/app/*', '@/app'], message: 'features → app 금지. 공유 상수는 configs로 옮기세요.' },
  {
    group: ['@/features/*'],
    message: 'features 사이 직접 참조 금지. 자기 feature 안은 상대경로를, 공용은 shared로 올리세요.',
  },
  sharedInternalPattern,
];

export default tseslint.config(
  { ignores: ['dist', 'legacy', 'storybook-static', 'playwright-report', 'test-results'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'max-lines': ['warn', { max: 1000, skipBlankLines: true, skipComments: true }],
    },
  },
  {
    files: ['**/*.test.{ts,tsx}', '**/*.stories.tsx'],
    rules: { 'max-lines': 'off' },
  },
  // 계층 의존 강제 — 경로 별칭(`@/...`)만 검사한다. 같은 계층 안은 상대경로를 쓴다.
  {
    files: ['src/shared/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/features/*', '@/features'],
              message: 'shared → features 금지. 의존성을 역전하거나 props로 받으세요.',
            },
            { group: ['@/pages/*', '@/pages'], message: 'shared → pages 금지.' },
            { group: ['@/app/*', '@/app'], message: 'shared → app 금지. 공유 상수는 configs로 옮기세요.' },
            { group: ['@/stores/*', '@/stores'], message: 'shared → stores 금지. props를 쓰세요.' },
            sharedInternalPattern,
          ],
        },
      ],
    },
  },
  {
    files: ['src/features/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', { patterns: featureLayerPatterns }],
    },
  },
  {
    files: ['src/pages/**/*.{ts,tsx}', 'src/app/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/features/*/model/*', '@/features/*/hooks/*', '@/features/*/ui/*'],
              message: 'features 공개 API(@/features/{domain})만 사용하세요.',
            },
            sharedInternalPattern,
          ],
        },
      ],
    },
  },
  prettier,
);
