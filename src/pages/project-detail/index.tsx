import { Navigate, useParams } from 'react-router-dom';
import { toPath } from '@/configs/navigation';
import { findProject, ProjectDetail } from '@/features/project';

export default function ProjectDetailPage() {
  const { projectId = '' } = useParams();
  const project = findProject(projectId);

  if (!project) return <Navigate to={toPath('projects')} replace />;

  return <ProjectDetail project={project} />;
}
