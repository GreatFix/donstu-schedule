import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
      components: path.resolve(__dirname, 'src/components'),
      shared: path.resolve(__dirname, 'src/shared'),
      views: path.resolve(__dirname, 'src/views'),
      api: path.resolve(__dirname, 'src/api'),
    },
  },
})
