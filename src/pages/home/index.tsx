import { useTranslation } from 'react-i18next';
import { ProfileAbout, ProfileHero, ProfileTimeline } from '@/features/profile';
import { SkillBoard } from '@/features/skill';
import { SectionHeading } from '@/shared/ui';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      <ProfileHero />
      <section aria-labelledby="about" className="py-20">
        <SectionHeading id="about" eyebrow="01" title={t('home.about')} />
        <ProfileAbout />
      </section>
      <section aria-labelledby="skills" className="py-20">
        <SectionHeading id="skills" eyebrow="02" title={t('home.skills')} description={t('home.skillsDescription')} />
        <SkillBoard />
      </section>
      <section aria-labelledby="journey" className="py-20">
        <SectionHeading id="journey" eyebrow="03" title={t('home.journey')} />
        <ProfileTimeline />
      </section>
    </>
  );
}
