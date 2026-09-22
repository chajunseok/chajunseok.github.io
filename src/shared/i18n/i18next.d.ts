import 'i18next';
import type ko from './locales/ko.json';
import type koPlayground from './locales/ko.playground.json';

// ko 리소스를 기준 스키마로 삼아 t() 키를 타입 검사한다.
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: { translation: typeof ko; playground: typeof koPlayground };
  }
}
