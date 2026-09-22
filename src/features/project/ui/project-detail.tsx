import type { ReactNode } from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toPath } from '@/configs/navigation';
import { logEvent } from '@/shared/analytics';
import { Badge, Button, GithubIcon, Reveal } from '@/shared/ui';
import type { Project } from '../model/project.types';

function DetailSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <Reveal>
      <section aria-labelledby={id} className="border-border border-t py-12">
        <h2 id={id} className="mb-6 text-2xl font-bold tracking-tight">
          {title}
        </h2>
        {children}
      </section>
    </Reveal>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed">
          <span aria-hidden className="bg-primary mt-2.5 size-1.5 shrink-0 rounded-full" />
          <span className="whitespace-pre-line">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="text-muted-foreground space-y-4 leading-relaxed">
      {items.map((item) => (
        <p key={item} className="whitespace-pre-line">
          {item}
        </p>
      ))}
    </div>
  );
}

export function ProjectDetail({ project }: { project: Project }) {
  const { t } = useTranslation();
  const trackClick = (type: 'demo' | 'github') => logEvent('Project', 'click', `${type} - ${project.title}`);

  return (
    <article className="mx-auto max-w-3xl">
      <Link
        to={toPath('projects')}
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm"
      >
        <ArrowLeft className="size-4" />
        {t('project.back')}
      </Link>

      <header className="mt-6">
        <p className="text-primary font-mono text-sm tracking-widest">{t('project.eyebrow')}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">{project.title}</h1>
        <p className="text-muted-foreground mt-4 text-lg leading-relaxed">{project.description}</p>

        <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
          {(
            [
              ['project.period', project.period],
              ['project.team', `${project.team} · ${project.organization}`],
              ['project.type', project.serviceType],
            ] as const
          ).map(([labelKey, value]) => (
            <div key={labelKey}>
              <dt className="text-muted-foreground text-xs font-medium">{t(labelKey)}</dt>
              <dd className="mt-1 font-medium">{value}</dd>
            </div>
          ))}
        </dl>

        {(project.demoUrl || project.githubUrl) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.demoUrl && (
              <Button asChild>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackClick('demo')}>
                  <ExternalLink className="size-4" />
                  {t('project.demo')}
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button asChild variant="outline">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackClick('github')}
                >
                  <GithubIcon className="size-4" />
                  {t('project.github')}
                </a>
              </Button>
            )}
          </div>
        )}
      </header>

      <img
        src={project.thumbnail}
        alt=""
        width={1200}
        height={675}
        className="border-border bg-muted mt-12 mb-12 aspect-video w-full rounded-2xl border object-contain"
      />

      <DetailSection id="tech" title={t('project.tech')}>
        <ul aria-label={t('project.tech')} className="flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <li key={tech}>
              <Badge variant="accent">{tech}</Badge>
            </li>
          ))}
        </ul>
      </DetailSection>

      <DetailSection id="overview" title={t('project.overview')}>
        <Paragraphs items={project.overview} />
      </DetailSection>

      <DetailSection id="features" title={t('project.features')}>
        <BulletList items={project.features} />
      </DetailSection>

      <DetailSection id="tech-reasons" title={t('project.techReasons')}>
        <dl className="space-y-6">
          {Object.entries(project.techReasons).map(([tech, reason]) => (
            <div key={tech}>
              <dt className="font-semibold">{tech}</dt>
              <dd className="text-muted-foreground mt-2 leading-relaxed">{reason}</dd>
            </div>
          ))}
        </dl>
      </DetailSection>

      {project.roles.length > 0 && (
        <DetailSection id="roles" title={t('project.roles')}>
          <BulletList items={project.roles} />
        </DetailSection>
      )}

      <DetailSection id="troubleshooting" title={t('project.troubleshooting')}>
        <div className="space-y-6">
          {project.troubleshooting.map((item) => (
            <div key={item.issue} className="border-border bg-card rounded-2xl border p-6">
              <h3 className="text-xl font-bold tracking-tight">{item.issue}</h3>
              <dl className="mt-4 space-y-4 text-sm leading-relaxed">
                <div>
                  <dt className="text-destructive font-mono text-xs tracking-widest">{t('project.problem')}</dt>
                  <dd className="text-muted-foreground mt-2">{item.problem}</dd>
                </div>
                <div>
                  <dt className="text-primary font-mono text-xs tracking-widest">{t('project.solution')}</dt>
                  <dd className="mt-2">{item.solution}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </DetailSection>

      <DetailSection id="review" title={t('project.review')}>
        <Paragraphs items={project.review} />
      </DetailSection>
    </article>
  );
}
