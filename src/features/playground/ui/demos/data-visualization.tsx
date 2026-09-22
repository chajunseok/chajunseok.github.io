import { useState } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import { useTranslation } from 'react-i18next';
import { cn } from '@/shared/utils/cn';
import { DemoStage } from '../demo-stage';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend,
);

// 토큰(primary·foreground·muted-foreground·border)과 같은 값. chart.js 색 파서가 읽는 쉼표 표기.
const primary = (alpha: number) => `hsla(250, 90%, 70%, ${alpha})`;
const FOREGROUND = 'hsl(220, 20%, 94%)';
const MUTED = 'hsl(220, 12%, 66%)';
const GRID = 'hsl(230, 16%, 20%)';

const CHART_TYPES = ['line', 'bar', 'doughnut'] as const;
type ChartType = (typeof CHART_TYPES)[number];

const plugins = { legend: { position: 'top' as const, labels: { color: FOREGROUND } } };
const axis = { ticks: { color: MUTED }, grid: { color: GRID } };
const axisOptions = { responsive: true, maintainAspectRatio: false, plugins, scales: { x: axis, y: axis } };
const roundOptions = { responsive: true, maintainAspectRatio: false, plugins };

export default function DataVisualizationDemo() {
  const { t } = useTranslation('playground');
  const [activeChart, setActiveChart] = useState<ChartType>('line');
  const labels = t('demos.data-visualization.labels', { returnObjects: true }) as string[];

  const lineData = {
    labels,
    datasets: [
      {
        label: t('demos.data-visualization.lineLabel'),
        data: [65, 59, 80, 81, 56, 55],
        borderColor: primary(1),
        backgroundColor: primary(0.2),
        tension: 0.4,
        fill: true,
      },
    ],
  };
  const barData = {
    labels: labels.slice(0, 5),
    datasets: [
      {
        label: t('demos.data-visualization.barLabel'),
        data: [85, 75, 70, 65, 60],
        backgroundColor: [0.6, 0.5, 0.4, 0.3, 0.2].map(primary),
      },
    ],
  };
  const doughnutData = {
    labels: labels.slice(0, 5),
    datasets: [{ data: [40, 25, 15, 12, 8], backgroundColor: [0.8, 0.6, 0.4, 0.3, 0.2].map(primary) }],
  };

  return (
    <DemoStage>
      <div className="bg-background/70 relative h-[400px] w-full rounded-2xl p-5">
        <div
          role="group"
          aria-label={t('demos.data-visualization.chartTypeLabel')}
          className="mb-5 flex justify-center gap-2.5"
        >
          {CHART_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              aria-pressed={activeChart === type}
              onClick={() => setActiveChart(type)}
              className={cn(
                'cursor-pointer rounded-full px-4 py-2 transition-all duration-300',
                activeChart === type ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground',
              )}
            >
              {t(`demos.data-visualization.chartTypes.${type}`)}
            </button>
          ))}
        </div>

        <div className="h-[calc(100%-60px)]">
          {activeChart === 'line' && <Line data={lineData} options={axisOptions} />}
          {activeChart === 'bar' && <Bar data={barData} options={axisOptions} />}
          {activeChart === 'doughnut' && <Doughnut data={doughnutData} options={roundOptions} />}
        </div>
      </div>
    </DemoStage>
  );
}
