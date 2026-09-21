import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toPath } from '@/configs/navigation';
import { Badge, Button } from '@/shared/ui';
import { profile } from '../model/profile';

// 첫 화면(LCP)이라 JS 모션 청크를 기다리지 않도록 CSS 애니메이션으로 순차 등장시킨다.
const enter = 'animate-in fade-in slide-in-from-bottom-6 fill-mode-both duration-700 ease-out';

export function ProfileHero() {
  const { t } = useTranslation();

  return (
    <section aria-labelledby="hero-title" className="flex min-h-[70vh] flex-col justify-center">
      <p className={`${enter} text-primary text-base font-medium`}>{t('home.greeting')}</p>
      <h1
        id="hero-title"
        className={`${enter} from-foreground to-muted-foreground mt-4 bg-gradient-to-br bg-clip-text text-6xl font-extrabold tracking-tight text-transparent [animation-delay:100ms] md:text-8xl`}
      >
        {t('app.name')}
      </h1>
      <p className={`${enter} text-muted-foreground mt-6 max-w-xl text-lg [animation-delay:200ms] md:text-xl`}>
        {t('home.role')}
      </p>
      <ul className={`${enter} mt-8 flex flex-wrap gap-2 [animation-delay:300ms]`}>
        {profile.tags.map((tag) => (
          <li key={tag}>
            <Badge variant="accent">{tag}</Badge>
          </li>
        ))}
      </ul>
      <div className={`${enter} mt-10 flex flex-wrap gap-3 [animation-delay:400ms]`}>
        <Button asChild>
          <Link to={toPath('projects')}>{t('home.ctaProjects')}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to={toPath('contact')}>{t('home.ctaContact')}</Link>
        </Button>
      </div>
    </section>
  );
}
