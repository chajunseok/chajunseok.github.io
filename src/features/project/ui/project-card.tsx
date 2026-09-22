import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { projectPath } from '@/configs/navigation';
import { Badge, SpotlightCard } from '@/shared/ui';
import { cn } from '@/shared/utils/cn';
import type { Project } from '../model/project.types';

type ProjectCardProps = { project: Project; featured?: boolean };

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const { t } = useTranslation();

  return (
    <SpotlightCard className="h-full">
      <Link to={projectPath(project.id)} className="flex h-full flex-col focus-visible:outline-none">
        <div className={cn('bg-muted overflow-hidden', featured ? 'aspect-[16/10]' : 'aspect-video')}>
          <img
            src={project.thumbnail}
            alt=""
            width={1200}
            height={675}
            loading={featured ? 'eager' : 'lazy'}
            className={cn(
              'size-full transition-transform duration-500 group-hover:scale-105',
              project.isMobile ? 'object-contain' : 'object-cover',
            )}
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="text-muted-foreground text-xs">
            {project.organization} · {project.period}
          </p>
          <h2 className={cn('mt-2 font-bold tracking-tight', featured ? 'text-3xl' : 'text-xl')}>
            {project.title}
            <ArrowUpRight
              aria-hidden
              className="text-muted-foreground group-hover:text-primary ml-1 inline size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </h2>
          <p className={cn('text-muted-foreground mt-3 text-sm', !featured && 'line-clamp-3')}>{project.description}</p>
          <ul aria-label={t('project.tech')} className="mt-auto flex flex-wrap gap-1.5 pt-5">
            {project.tech.map((tech) => (
              <li key={tech}>
                <Badge>{tech}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </SpotlightCard>
  );
}
