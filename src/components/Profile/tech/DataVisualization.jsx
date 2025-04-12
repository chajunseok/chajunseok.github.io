import React, { useState } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import * as PS from '../styles/PlaygroundStyles';

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DataVisualization = () => {
  const [activeChart, setActiveChart] = useState('line');

  // 라인 차트 데이터
  const lineData = {
    labels: ['Data1', 'Data2', 'Data3', 'Data4', 'Data5', 'Data6'],
    datasets: [
      {
        label: '라인 데이터',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: '#64ffda',
        backgroundColor: 'rgba(100, 255, 218, 0.2)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  // 바 차트 데이터
  const barData = {
    labels: ['Data1', 'Data2', 'Data3', 'Data4', 'Data5'],
    datasets: [
      {
        label: '바 데이터',
        data: [85, 75, 70, 65, 60],
        backgroundColor: [
          'rgba(100, 255, 218, 0.6)',
          'rgba(100, 255, 218, 0.5)',
          'rgba(100, 255, 218, 0.4)',
          'rgba(100, 255, 218, 0.3)',
          'rgba(100, 255, 218, 0.2)'
        ]
      }
    ]
  };

  // 도넛 차트 데이터
  const doughnutData = {
    labels: ['Data1', 'Data2', 'Data3', 'Data4', 'Data5'],
    datasets: [
      {
        data: [40, 25, 15, 12, 8],
        backgroundColor: [
          'rgba(100, 255, 218, 0.8)',
          'rgba(100, 255, 218, 0.6)',
          'rgba(100, 255, 218, 0.4)',
          'rgba(100, 255, 218, 0.3)',
          'rgba(100, 255, 218, 0.2)'
        ]
      }
    ]
  };

  // 차트 옵션
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff'
        }
      }
    },
    scales: activeChart !== 'doughnut' ? {
      y: {
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      x: {
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      }
    } : {}
  };

  return (
    <PS.MotionContainer>
      <div style={{
        width: '100%',
        height: '400px',
        background: 'rgba(10, 25, 47, 0.7)',
        borderRadius: '15px',
        padding: '20px',
        position: 'relative'
      }}>
        {/* 차트 타입 선택 버튼 */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
          justifyContent: 'center'
        }}>
          {['line', 'bar', 'doughnut'].map((type) => (
            <button
              key={type}
              onClick={() => setActiveChart(type)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: 'none',
                background: activeChart === type ? '#64ffda' : 'rgba(255, 255, 255, 0.1)',
                color: activeChart === type ? '#0a192f' : '#fff',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* 차트 표시 영역 */}
        <div style={{ height: 'calc(100% - 60px)' }}>
          {activeChart === 'line' && <Line data={lineData} options={options} />}
          {activeChart === 'bar' && <Bar data={barData} options={options} />}
          {activeChart === 'doughnut' && <Doughnut data={doughnutData} options={options} />}
        </div>
      </div>
    </PS.MotionContainer>
  );
};

export default DataVisualization; 