import { useTranslation } from 'react-i18next';
import { ContactList } from '@/features/profile';
import { SectionHeading } from '@/shared/ui';

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <>
      <SectionHeading as="h1" eyebrow="CONTACT" title={t('nav.contact')} description={t('contact.description')} />
      <ContactList />
    </>
  );
}
