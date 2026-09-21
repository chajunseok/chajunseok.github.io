import { useTranslation } from 'react-i18next';
import { ProjectGrid } from '@/features/project';
import { SectionHeading } from '@/shared/ui';

export default function ProjectsPage() {
  const { t } = useTranslation();

  return (
    <>
      <SectionHeading
        as="h1"
        eyebrow={t('project.eyebrow')}
        title={t('nav.projects')}
        description={t('project.description')}
      />
      <ProjectGrid />
    </>
  );
}
