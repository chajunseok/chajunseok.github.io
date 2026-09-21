import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ko from './locales/ko.json';

export type Language = 'ko' | 'en';

export const DEFAULT_NAMESPACE = 'translation';

void i18next.use(initReactI18next).init({
  resources: {
    ko: { [DEFAULT_NAMESPACE]: ko },
    en: { [DEFAULT_NAMESPACE]: en },
  },
  lng: 'ko',
  fallbackLng: 'ko',
  defaultNS: DEFAULT_NAMESPACE,
  interpolation: { escapeValue: false },
});

export function changeLanguage(language: Language) {
  document.documentElement.lang = language;
  return i18next.changeLanguage(language);
}

export { i18next };
