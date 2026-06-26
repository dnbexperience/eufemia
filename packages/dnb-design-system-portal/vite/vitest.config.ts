import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  test: {
    reporters: ['default'],
    include: [
      'vite/__tests__/**/*.test.{ts,tsx}',
      'src/**/__tests__/**/*.test.{ts,tsx}',
    ],
    environment: 'jsdom',
    setupFiles: ['vite/__tests__/setup.ts'],
  },
  resolve: {
    alias: {
      'portal-query': path.resolve(
        __dirname,
        'client/shims/portal-query.tsx'
      ),
      'virtual:portal-pages': path.resolve(
        __dirname,
        '__tests__/mocks/virtual-portal-pages.ts'
      ),
      'virtual:build-info': path.resolve(
        __dirname,
        '__tests__/mocks/virtual-build-info.ts'
      ),
    },
  },
})
