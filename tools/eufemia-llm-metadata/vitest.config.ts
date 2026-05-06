import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['scripts/__tests__/**/*.test.{ts,tsx,js,jsx}'],
  },
})
