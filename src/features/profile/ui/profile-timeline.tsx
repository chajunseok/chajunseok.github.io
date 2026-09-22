import { useTranslation } from 'react-i18next';
import { Reveal } from '@/shared/ui';
import { awards, educations } from '../model/profile';

type TimelineItem = { key: string; when: string; title: string; detail: string };

function Timeline({ heading, items }: { heading: string; items: TimelineItem[] }) {
  return (
    <div>
      <h3 className="text-muted-foreground mb-6 text-sm font-semibold tracking-widest uppercase">{heading}</h3>
      <ol className="border-border relative border-l">
        {items.map((item, index) => (
          <li key={item.key} className="mb-8 ml-6 last:mb-0">
            <span
              aria-hidden
              className="border-primary bg-background absolute -left-1.5 mt-1.5 size-3 rounded-full border-2"
            />
            <Reveal delay={index * 0.05}>
              <p className="text-primary font-mono text-xs">{item.when}</p>
              <p className="mt-1 font-semibold">{item.title}</p>
              <p className="text-muted-foreground mt-0.5 text-sm">{item.detail}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ProfileTimeline() {
  const { t } = useTranslation();

  return (
    <div className="grid gap-12 md:grid-cols-2">
      <Timeline
        heading={t('home.experience')}
        items={educations.map((education) => ({
          key: `${education.school}-${education.period}`,
          when: education.period,
          title: education.school,
          detail: education.department,
        }))}
      />
      <Timeline
        heading={t('home.awards')}
        items={awards.map((award) => ({
          key: `${award.title}-${award.date}`,
          when: award.date,
          title: award.title,
          detail: `${award.organization} ${award.subtitle}`,
        }))}
      />
    </div>
  );
}
