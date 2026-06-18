import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [],
    include: ['**/*.test.js', '**/*.spec.js'],
    exclude: ['node_modules/**', 'dist/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['app.js', 'data/**/*.js'],
      exclude: ['node_modules/**', 'dist/**', '**/*.test.js'],
      thresholds: {
        lines:     70,
        functions: 70,
        branches:  60,
        statements:70,
      },
      reportsDirectory: './coverage',
    },
    testTimeout: 10000,
    reporters: ['verbose'],
  },
});
