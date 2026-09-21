import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { NAV_SCREEN_IDS, toPath } from '@/configs/navigation';
import { cn } from '@/shared/utils/cn';
import { LanguageToggle } from './language-toggle';

export function SideNav() {
  const { t } = useTranslation();

  return (
    <nav
      aria-label={t('nav.label')}
      className="border-border bg-background/80 sticky top-0 z-10 flex items-center justify-between gap-4 border-b px-4 py-3 backdrop-blur md:fixed md:inset-y-0 md:left-0 md:w-48 md:flex-col md:items-start md:justify-start md:border-r md:border-b-0 md:px-6 md:py-10"
    >
      <ul className="flex gap-4 md:flex-col md:gap-2">
        {NAV_SCREEN_IDS.map((screenId) => (
          <li key={screenId}>
            <NavLink
              to={toPath(screenId)}
              end
              className={({ isActive }) =>
                cn(
                  'text-muted-foreground hover:text-foreground text-sm transition-colors',
                  isActive && 'text-foreground font-semibold',
                )
              }
            >
              {t(`nav.${screenId}`)}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="md:mt-auto">
        <LanguageToggle />
      </div>
    </nav>
  );
}
