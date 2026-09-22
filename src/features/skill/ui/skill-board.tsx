import { m } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { SpotlightCard, Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui';
import { skillGroups } from '../model/skills';

export function SkillBoard() {
  const { t } = useTranslation();

  return (
    <Tabs defaultValue={skillGroups[0].id}>
      <TabsList aria-label={t('skill.label')}>
        {skillGroups.map((group) => (
          <TabsTrigger key={group.id} value={group.id}>
            {t(`skill.group.${group.id}`)}
          </TabsTrigger>
        ))}
      </TabsList>
      {skillGroups.map((group) => (
        <TabsContent key={group.id} value={group.id}>
          <ul className="grid gap-4 md:grid-cols-2">
            {group.skills.map((skill) => (
              <li key={skill.name}>
                <SpotlightCard className="p-5">
                  <div className="flex items-baseline justify-between">
                    <span className="font-semibold">{skill.name}</span>
                    <span className="text-muted-foreground font-mono text-sm">{skill.level}</span>
                  </div>
                  <div
                    role="meter"
                    aria-label={skill.name}
                    aria-valuenow={skill.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    className="bg-muted mt-3 h-1.5 overflow-hidden rounded-full"
                  >
                    <m.div
                      className="from-primary to-accent h-full origin-left rounded-full bg-gradient-to-r"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: skill.level / 100 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <p className="text-muted-foreground mt-3 text-sm">{skill.description}</p>
                </SpotlightCard>
              </li>
            ))}
          </ul>
        </TabsContent>
      ))}
    </Tabs>
  );
}
