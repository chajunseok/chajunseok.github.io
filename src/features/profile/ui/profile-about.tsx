import { useTranslation } from 'react-i18next';
import { Reveal, SpotlightCard } from '@/shared/ui';
import { awards, profile } from '../model/profile';

/** 소개 문단 왼쪽, 수상 카드 오른쪽. 첫 줄은 강조, 나머지는 보조 글자색. */
export function ProfileAbout() {
  const { t } = useTranslation();
  const [lead, ...rest] = profile.description.split('\n');

  return (
    <div className="grid items-start gap-10 md:grid-cols-2">
      <Reveal>
        <p className="text-lg leading-relaxed">{lead}</p>
        <p className="text-muted-foreground mt-4 leading-relaxed whitespace-pre-line">{rest.join('\n').trim()}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <SpotlightCard className="p-6">
          <h3 className="text-muted-foreground text-sm font-semibold">{t('home.awards')}</h3>
          <ul className="mt-4 space-y-4">
            {awards.map((award) => (
              <li key={`${award.title}-${award.date}`}>
                <p className="font-semibold">{award.title}</p>
                <p className="text-muted-foreground mt-1 text-xs">
                  {award.organization} · {award.date} · {award.subtitle.replace(/^\(|\)$/g, '')}
                </p>
              </li>
            ))}
          </ul>
        </SpotlightCard>
      </Reveal>
    </div>
  );
}
