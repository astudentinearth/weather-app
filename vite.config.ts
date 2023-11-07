import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
/// <reference types="vitest" />

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.ts'
  },
  resolve:{
    alias:{
      '@': path.resolve(__dirname, './src')
    }
  }
})
