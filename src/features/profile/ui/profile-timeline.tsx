import { useTranslation } from 'react-i18next';
import { Reveal } from '@/shared/ui';
import { educations } from '../model/profile';

/** 경력·학력 타임라인. 수상은 ProfileAbout의 카드로 옮겼다. */
export function ProfileTimeline() {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="text-muted-foreground mb-6 text-sm font-semibold">{t('home.experience')}</h3>
      <ol className="border-border relative border-l">
        {educations.map((education, index) => (
          <li key={`${education.school}-${education.period}`} className="mb-8 ml-6 last:mb-0">
            <span
              aria-hidden
              className="border-primary bg-background absolute -left-1.5 mt-1.5 size-3 rounded-full border-2"
            />
            <Reveal delay={index * 0.05}>
              <p className="text-muted-foreground font-mono text-xs">{education.period}</p>
              <p className="mt-1 font-semibold">{education.school}</p>
              <p className="text-muted-foreground mt-0.5 text-sm">{education.department}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
