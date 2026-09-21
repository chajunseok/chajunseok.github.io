import { Suspense } from 'react';
import { ArrowLeft } from 'lucide-react';
import { LazyMotion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toPath } from '@/configs/navigation';
import { Badge } from '@/shared/ui';
import { ErrorBoundary } from '@/shared/widget/error-boundary';
import type { Demo } from '../model/playground.types';

const loadMotionMax = () => import('./motion-max').then((module) => module.default);

export function DemoViewer({ demo }: { demo: Demo }) {
  const { t } = useTranslation('playground');
  const { Component } = demo;

  return (
    <article>
      <Link
        to={toPath('playground')}
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm"
      >
        <ArrowLeft className="size-4" />
        {t('back')}
      </Link>

      <header className="mt-8">
        <p className="text-primary font-mono text-sm tracking-widest">{t(`category.${demo.category}`)}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">{t(`demos.${demo.id}.title`)}</h1>
        <p className="text-muted-foreground mt-4 max-w-2xl">{t(`demos.${demo.id}.description`)}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {demo.tech.map((tech) => (
            <li key={tech}>
              <Badge variant="accent">{tech}</Badge>
            </li>
          ))}
        </ul>
      </header>

      <div className="mt-10">
        {/* 데모마다 경계를 새로 만든다 — 한 데모의 실패가 다른 데모로 넘어가지 않게. */}
        <ErrorBoundary key={demo.id} fallback={<p role="alert">{t('loadFailed')}</p>}>
          <Suspense fallback={<p className="text-muted-foreground">{t('loading')}</p>}>
            <LazyMotion features={loadMotionMax}>
              <Component />
            </LazyMotion>
          </Suspense>
        </ErrorBoundary>
      </div>
    </article>
  );
}
