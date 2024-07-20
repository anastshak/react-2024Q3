/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setupTests.ts'],
    coverage: {
      all: true,
      enabled: true,
      include: ['src/**/*'],
      exclude: ['**/.eslintrc.cjs', 'vite.config.ts', 'dist'],
      provider: 'v8',
      reporter: ['text'],
    },
  },
});
