import { useTranslation } from 'react-i18next';

export default function ProjectsPage() {
  const { t } = useTranslation();

  return (
    <section>
      <h1 className="text-4xl font-bold">{t('nav.projects')}</h1>
      <p className="text-muted-foreground mt-2">{t('page.wip')}</p>
    </section>
  );
}
