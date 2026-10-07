import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    target: 'es2019',
    rollupOptions: {
      // Two pages: the portfolio (/) and the chatbot portfolio (/chatbots/).
      input: {
        main: resolve(__dirname, 'index.html'),
        chatbots: resolve(__dirname, 'chatbots/index.html'),
      },
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
