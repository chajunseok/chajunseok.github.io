import { Navigate, useParams } from 'react-router-dom';
import { toPath } from '@/configs/navigation';
import { DemoViewer, findDemo } from '@/features/playground';

export default function PlaygroundDetailPage() {
  const { demoId = '' } = useParams();
  const demo = findDemo(demoId);

  if (!demo) return <Navigate to={toPath('playground')} replace />;

  return <DemoViewer demo={demo} />;
}
