import { useState } from 'react';
import { AnimatePresence, m, type Variants } from 'motion/react';
import {
  Bell,
  ChevronLeft,
  CircleUser,
  FolderKanban,
  House,
  LogOut,
  Menu,
  Settings,
  User,
  type LucideIcon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { DemoStage } from '../demo-stage';

const spring = { type: 'spring', stiffness: 300, damping: 30 } as const;

const MENU_ITEMS: { key: 'dashboard' | 'profile' | 'projects' | 'settings' | 'logout'; Icon: LucideIcon }[] = [
  { key: 'dashboard', Icon: House },
  { key: 'profile', Icon: User },
  { key: 'projects', Icon: FolderKanban },
  { key: 'settings', Icon: Settings },
  { key: 'logout', Icon: LogOut },
];
const PANELS = [1, 2, 3, 4];

const sidebarVariants: Variants = {
  open: { width: '240px', transition: spring },
  closed: { width: '60px', transition: spring },
};

const itemVariants: Variants = {
  open: { x: 0, opacity: 1, transition: spring },
  closed: { x: -20, opacity: 0, transition: spring },
};

export default function SidebarDemo() {
  const { t } = useTranslation('playground');
  const [isOpen, setIsOpen] = useState(false);
  const ToggleIcon = isOpen ? ChevronLeft : Menu;

  return (
    <DemoStage>
      <div className="border-primary/10 bg-foreground/[0.03] flex h-[400px] w-full max-w-[670px] overflow-hidden rounded-[10px] border">
        <m.nav
          aria-label={t('demos.sidebar.navLabel')}
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
          variants={sidebarVariants}
          className="border-primary/20 bg-foreground/5 relative h-full shrink-0 border-r"
        >
          <m.button
            type="button"
            aria-label={isOpen ? t('demos.sidebar.close') : t('demos.sidebar.open')}
            aria-expanded={isOpen}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="text-primary absolute top-4 right-4 z-10 cursor-pointer"
          >
            <ToggleIcon className="size-4" aria-hidden />
          </m.button>

          <div className="mt-12 flex flex-col gap-2 p-4">
            {MENU_ITEMS.map(({ key, Icon }) => (
              <m.button
                key={key}
                type="button"
                aria-label={t(`demos.sidebar.menu.${key}`)}
                whileHover={{ scale: 1.02 }}
                className="text-primary hover:bg-primary/10 flex cursor-pointer items-center rounded-lg p-3 transition-colors"
              >
                <Icon className="size-4 w-5 shrink-0" aria-hidden />
                <AnimatePresence>
                  {isOpen && (
                    <m.span
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className="ml-4 whitespace-nowrap"
                    >
                      {t(`demos.sidebar.menu.${key}`)}
                    </m.span>
                  )}
                </AnimatePresence>
              </m.button>
            ))}
          </div>
        </m.nav>

        {/* 사이드바 폭이 바뀌면 flex-1이 나머지를 따라간다. */}
        <div className="h-full min-w-0 flex-1 p-6">
          <div className="bg-foreground/5 text-primary mb-6 flex items-center justify-end gap-4 rounded-lg p-2">
            <Bell className="size-4" aria-hidden />
            <CircleUser className="size-4" aria-hidden />
          </div>

          <div className="grid h-[calc(100%-4rem)] grid-cols-2 gap-4" aria-hidden>
            {PANELS.map((panel) => (
              <m.div
                key={panel}
                whileHover={{ scale: 1.02 }}
                className="border-primary/10 bg-foreground/5 h-full rounded-lg border"
              />
            ))}
          </div>
        </div>
      </div>
    </DemoStage>
  );
}
