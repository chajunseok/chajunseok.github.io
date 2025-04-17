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
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@features': path.resolve(__dirname, './src/features'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@assets': path.resolve(__dirname, './src/assets'),
    }
  }
})
