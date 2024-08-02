import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  server: {
    open: true,
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setupTests.ts'],
    coverage: {
      all: true,
      enabled: true,
      include: ['src/**/*'],
      exclude: ['**/.eslintrc.cjs', 'vite.config.ts', 'vitest.config.ts', 'dist', '**/*.test.{js,jsx,ts,tsx}'],
      provider: 'v8',
      reporter: ['text'],
    },
  },
});
