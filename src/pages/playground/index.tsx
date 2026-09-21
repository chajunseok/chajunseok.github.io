import { useTranslation } from 'react-i18next';
import { DemoGrid } from '@/features/playground';
import { SectionHeading } from '@/shared/ui';

export default function PlaygroundPage() {
  const { t } = useTranslation('playground');

  return (
    <>
      <SectionHeading as="h1" eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />
      <DemoGrid />
    </>
  );
}
