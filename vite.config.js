import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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
        'chart.js'
      ],
      output: {
        globals: {
          'framer-motion': 'framerMotion',
          'html2canvas': 'html2canvas',
          'jspdf': 'jspdf',
          'react-chartjs-2': 'ReactChartjs2',
          'chart.js': 'Chart'
        }
      }
    }
  },
  assetsInclude: ['**/*.jpg', '**/*.png'],
  resolve: {
    alias: {
      'framer-motion': 'framer-motion/dist/framer-motion',
      'html2canvas': 'html2canvas/dist/html2canvas',
      'jspdf': 'jspdf/dist/jspdf.min'
    }
  }
})
