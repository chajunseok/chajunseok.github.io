import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import enPlayground from './locales/en.playground.json';
import ko from './locales/ko.json';
import koPlayground from './locales/ko.playground.json';

export type Language = 'ko' | 'en';

export const DEFAULT_NAMESPACE = 'translation';

void i18next.use(initReactI18next).init({
  resources: {
    ko: { [DEFAULT_NAMESPACE]: ko, playground: koPlayground },
    en: { [DEFAULT_NAMESPACE]: en, playground: enPlayground },
  },
  lng: 'ko',
  fallbackLng: 'ko',
  ns: [DEFAULT_NAMESPACE, 'playground'],
  defaultNS: DEFAULT_NAMESPACE,
  interpolation: { escapeValue: false },
});

export function changeLanguage(language: Language) {
  document.documentElement.lang = language;
  return i18next.changeLanguage(language);
}

export { i18next };
