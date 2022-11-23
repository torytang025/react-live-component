import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        study: path.resolve(__dirname, './template/study.html'),
        game: path.resolve(__dirname, './template/game.html'),
      },
    },
  },
});
