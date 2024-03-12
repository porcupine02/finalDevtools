import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    // Configure CORS headers
    cors: {
      origin: 'http://34.87.96.185:8081',
      methods: ['GET', 'POST'],
    },
  },
  resolve: {
    alias: {
      '@': '/src'
    },
  }
})
