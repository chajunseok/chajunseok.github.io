import { useTranslation } from 'react-i18next';

export default function PlaygroundPage() {
  const { t } = useTranslation();

  return (
    <section>
      <h1 className="text-4xl font-bold">{t('nav.playground')}</h1>
      <p className="text-muted-foreground mt-2">{t('page.wip')}</p>
    </section>
  );
}
