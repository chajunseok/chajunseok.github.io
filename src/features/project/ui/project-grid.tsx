import { Reveal } from '@/shared/ui';
import { cn } from '@/shared/utils/cn';
import { projects } from '../model/projects';
import { ProjectCard } from './project-card';

/** 첫 프로젝트를 크게 두는 bento 그리드. 순서는 데이터 순서를 따른다. */
export function ProjectGrid() {
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {projects.map((project, index) => {
        const featured = index === 0;
        return (
          <li key={project.id} className={cn(featured && 'md:col-span-2')}>
            <Reveal delay={(index % 3) * 0.08} className="h-full">
              <ProjectCard project={project} featured={featured} />
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
