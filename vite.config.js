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
        'three/examples/jsm/controls/OrbitControls'
      ]
    }
  },
  assetsInclude: ['**/*.jpg', '**/*.png'],
  optimizeDeps: {
    include: [
      'framer-motion',
      'react-router-dom',
      'styled-components',
      'three',
      'jspdf',
      'html2canvas',
      'chart.js',
      'react-chartjs-2'
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
