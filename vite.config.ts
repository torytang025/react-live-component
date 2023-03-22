import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import nodePolyfills from 'vite-plugin-node-stdlib-browser';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: './',
  plugins: [react(), nodePolyfills()],
  build: {
    rollupOptions: {
      input: {
        study: path.resolve(__dirname, './template/study.html'),
        game: path.resolve(__dirname, './template/game.html'),
      },
    },
  },
});
