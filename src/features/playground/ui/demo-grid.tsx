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
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {demos
              .filter((demo) => demo.category === category)
              .map((demo) => (
                <li key={demo.id}>
                  <SpotlightCard className="h-full">
                    <Link to={playgroundPath(demo.id)} className="flex h-full flex-col p-5 focus-visible:outline-none">
                      <h2 className="font-semibold">{t(`demos.${demo.id}.title`)}</h2>
                      <p className="text-muted-foreground mt-2 text-sm">{t(`demos.${demo.id}.description`)}</p>
                      <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
                        {demo.tech.map((tech) => (
                          <li key={tech}>
                            <Badge>{tech}</Badge>
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
