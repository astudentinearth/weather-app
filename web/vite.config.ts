import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import license from 'rollup-plugin-license'
import {VitePWA} from 'vite-plugin-pwa'
/// <reference types="vitest" />

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    VitePWA({
      manifest: false,
      includeAssets: ['apple-touch-icon.png', 'icon.svg'],
      registerType: "autoUpdate"
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.ts',
    include: ["./src/**/*.test.ts?(x)"]
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
