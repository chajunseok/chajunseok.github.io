import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/chajunseok.github.io/',
  build: {
    outDir: 'dist'
  },
  assetsInclude: ['**/*.jpg', '**/*.png']
})
