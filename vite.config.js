import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: [
        'framer-motion', 
        'html2canvas', 
        'jspdf',
        'react-chartjs-2',
        'chart.js',
        'three',
        'three/examples/jsm/controls/OrbitControls'
      ],
      output: {
        globals: {
          'framer-motion': 'framerMotion',
          'html2canvas': 'html2canvas',
          'jspdf': 'jspdf',
          'react-chartjs-2': 'ReactChartjs2',
          'chart.js': 'Chart',
          'three': 'THREE',
          'three/examples/jsm/controls/OrbitControls': 'OrbitControls'
        }
      }
    }
  },
  assetsInclude: ['**/*.jpg', '**/*.png'],
  optimizeDeps: {
    include: ['framer-motion']
  },
  resolve: {
    alias: {
      'three': 'three',
      '@': path.resolve(__dirname, './src')
    }
  }
})
