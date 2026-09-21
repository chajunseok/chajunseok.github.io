import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';
import { NAV_SCREEN_IDS, toPath } from '@/configs/navigation';
import { cn } from '@/shared/utils/cn';
import { LanguageToggle } from './language-toggle';

export function SideNav() {
  const { t } = useTranslation();

  return (
    <nav
      aria-label={t('nav.label')}
      className="border-border bg-background/80 sticky top-0 z-10 flex items-center justify-between gap-2 border-b px-4 py-3 backdrop-blur md:fixed md:inset-y-0 md:left-0 md:w-48 md:flex-col md:items-stretch md:justify-start md:border-r md:border-b-0 md:px-5 md:py-10"
    >
      <Link to={toPath('home')} className="hidden px-3 text-lg font-extrabold tracking-tight md:mb-10 md:block">
        {t('app.name')}
      </Link>
      <ul className="flex overflow-x-auto md:flex-col md:gap-1">
        {NAV_SCREEN_IDS.map((screenId) => (
          <li key={screenId} className="shrink-0">
            <NavLink
              to={toPath(screenId)}
              end={screenId === 'home'}
              className={({ isActive }) =>
                cn(
                  'text-muted-foreground hover:text-foreground block rounded-md px-2 py-1.5 text-sm transition-colors md:px-3',
                  isActive && 'bg-muted text-foreground',
                )
              }
            >
              {t(`nav.${screenId}`)}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="shrink-0 md:mt-auto md:px-3">
        <LanguageToggle />
      </div>
    </nav>
  );
}
