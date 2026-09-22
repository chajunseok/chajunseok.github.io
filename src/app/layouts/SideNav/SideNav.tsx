import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';
import { NAV_SCREEN_IDS, toPath } from '@/configs/navigation';
import { Button } from '@/shared/ui';
import { cn } from '@/shared/utils/cn';
import { LanguageToggle } from './language-toggle';

/** 데스크톱은 왼쪽 고정 사이드바, 모바일은 상단 바 + 햄버거로 펼치는 메뉴. */
export function SideNav() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <nav
      aria-label={t('nav.label')}
      className="border-border bg-background/80 sticky top-0 z-10 border-b backdrop-blur md:fixed md:inset-y-0 md:left-0 md:flex md:w-48 md:flex-col md:border-r md:border-b-0 md:px-5 md:py-10"
    >
      <div className="flex h-14 items-center justify-between px-4 md:mb-10 md:h-auto md:px-3">
        <Link to={toPath('home')} className="text-lg font-extrabold tracking-tight">
          {t('app.name')}
        </Link>
        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label={t('nav.label')}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </Button>
        </div>
      </div>
      <ul className={cn('flex-col gap-1 px-4 pb-4 md:flex md:px-0 md:pb-0', open ? 'flex' : 'hidden')}>
        {NAV_SCREEN_IDS.map((screenId) => (
          <li key={screenId}>
            <NavLink
              to={toPath(screenId)}
              end={screenId === 'home'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  'text-muted-foreground hover:text-foreground block rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  isActive && 'bg-muted text-foreground',
                )
              }
            >
              {t(`nav.${screenId}`)}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="hidden md:mt-auto md:block md:px-3">
        <LanguageToggle />
      </div>
    </nav>
  );
}
