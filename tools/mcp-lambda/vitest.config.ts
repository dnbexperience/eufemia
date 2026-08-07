import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    reporters: ['default'],
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.{ts,tsx,js,jsx}'],
  },
})
