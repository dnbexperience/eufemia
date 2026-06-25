import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    reporters: ['default'],
    globals: true,
    environment: 'node',
    include: ['__tests__/**/*.test.{ts,tsx,js,jsx}'],
  },
})
