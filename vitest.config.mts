import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

// Unit tests: tests/unit/**/*.spec.ts (run with `npm run test:unit`). The node:test checks in tests/*.test.js
// (migration rules, live DB grants) keep their own runner (`npm test`); the different suffix keeps the two apart.
export default defineConfig({
  resolve: {
    alias: {
      // mirror tsconfig.json "paths": { "@/*": ["./*"] }
      '@': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    include: ['tests/unit/**/*.spec.ts'],
    clearMocks: true,
    testTimeout: 20_000,
  },
})
