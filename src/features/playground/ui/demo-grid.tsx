import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { playgroundPath } from '@/configs/navigation';
import { Badge, SpotlightCard, Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui';
import { DEMO_CATEGORIES, demos } from '../model/demos';

export function DemoGrid() {
  const { t } = useTranslation('playground');

  return (
    <Tabs defaultValue={DEMO_CATEGORIES[0]}>
      <TabsList aria-label={t('category.label')}>
        {DEMO_CATEGORIES.map((category) => (
          <TabsTrigger key={category} value={category}>
            {t(`category.${category}`)}
          </TabsTrigger>
        ))}
      </TabsList>
      {DEMO_CATEGORIES.map((category) => (
        <TabsContent key={category} value={category}>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {demos
              .filter((demo) => demo.category === category)
              .map((demo) => (
                <li key={demo.id}>
                  <SpotlightCard className="h-full">
                    <Link to={playgroundPath(demo.id)} className="flex h-full flex-col p-5 focus-visible:outline-none">
                      <div
                        aria-hidden
                        className="bg-muted text-accent group-hover:text-primary flex h-18 items-center justify-center rounded-md transition-colors"
                      >
                        <demo.icon className="size-8" strokeWidth={1.5} />
                      </div>
                      <h2 className="mt-3 text-xl font-bold tracking-tight">{t(`demos.${demo.id}.title`)}</h2>
                      <p className="text-muted-foreground mt-2 text-sm">{t(`demos.${demo.id}.description`)}</p>
                      <ul className="mt-auto flex flex-wrap gap-1.5 pt-3">
                        {demo.tech.map((tech) => (
                          <li key={tech}>
                            <Badge variant="accent">{tech}</Badge>
                          </li>
                        ))}
                      </ul>
                    </Link>
                  </SpotlightCard>
                </li>
              ))}
          </ul>
        </TabsContent>
      ))}
    </Tabs>
  );
}
