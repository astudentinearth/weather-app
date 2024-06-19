import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import license from 'rollup-plugin-license'
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
  },
  base: "/weather-app",
  build:{
    rollupOptions:{
      plugins: [
        license({
          thirdParty: {
            output: path.resolve(__dirname, './dist/assets/THIRD_PARTY_LICENSES.txt'),
          }
        })
      ]
    }
  },
  esbuild:{
    banner: '/*! licenses: /assets/THIRD_PARTY_LICENSES.txt */'
  }
})
