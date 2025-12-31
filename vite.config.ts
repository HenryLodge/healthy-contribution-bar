import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'index.html'),
        content: resolve(__dirname, 'public/content.js'),
        // 'service-worker': resolve(__dirname, 'public/service-worker.js'),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'popup') {
            return 'assets/[name]-[hash].js'
          }
          return '[name].js'
        },
        inlineDynamicImports: false
      }
    }
  }
})