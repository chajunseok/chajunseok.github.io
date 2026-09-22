import { useTranslation } from 'react-i18next';
import { changeLanguage } from '@/shared/i18n';
import { Button } from '@/shared/ui';

export function LanguageToggle() {
  const { t, i18n } = useTranslation();
  const next = i18n.language === 'ko' ? 'en' : 'ko';

  return (
    <Button variant="outline" size="sm" onClick={() => void changeLanguage(next)}>
      {t('language.toggle')}
    </Button>
  );
}
