import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    open: true,
  },
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./app/test/setupTests.ts'],
    coverage: {
      all: true,
      enabled: true,
      include: ['app/**/*'],
      exclude: [
        '**/.eslintrc.cjs',
        'vite.config.ts',
        'vitest.config.ts',
        'dist',
        '.next',
        'app/entry.client.tsx',
        'app/entry.server.tsx',
        'app/vite-env.d.ts',
      ],
      provider: 'v8',
      reporter: ['text'],
    },
  },
});
