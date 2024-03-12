// import { fileURLToPath, URL } from 'node:url'

// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//   ],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   }
// })

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  preview: {
    port: 5173,
    strictPort: true,
  },
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    orgin: "http://0.0.0.0:5173",
  },
  
  // resolve: {
  //   alias: {
  //     '@': '/src'
  //   }, 
  //   server: {
  //     proxy: {
  //       '/': 'http://34.125.33.180:8081',
  //     },

  //     // Configure CORS headers
  //     cors: {
  //       origin: 'http://34.125.33.180:8081',
  //       methods: ['GET', 'POST'],
  //     },
  //   }
  // }
})
