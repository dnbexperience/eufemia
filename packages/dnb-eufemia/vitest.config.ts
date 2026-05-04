/**
 * Vitest configuration for unit tests.
 *
 * Replaces jest.config.js with much faster startup via esbuild transforms
 * instead of Babel. All existing test files work unchanged via the
 * jest→vi compatibility shim in setupVitest.ts.
 */

import { defineConfig } from 'vitest/config'
import path from 'node:path'
import { jestCompatPlugin } from './src/core/vitest/jestCompatPlugin'

export default defineConfig({
  plugins: [jestCompatPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        url: 'http://localhost',
      },
    },

    include: [
      'src/**/__tests__/**/*.test.{ts,tsx,js,jsx}',
      'src/**/*.test.{ts,tsx,js,jsx}',
    ],
    exclude: [
      '**/not_in_use/**',
      '**/*screenshot*',
      '**/postTypeGeneration/**',
      '**/scripts/postbuild/**',
      '**/build/**',
      '**/assets/**',
      '**/stories/**',
      '**/node_modules/**',
    ],

    setupFiles: ['./src/core/vitest/setupVitest.ts'],

    // Match Jest's defaults: don't auto-restore/reset/clear mocks
    restoreMocks: false,
    mockReset: false,
    clearMocks: false,

    // Transform configuration — Vitest uses esbuild by default (much faster than babel-jest)
    // CSS/SCSS/MD files are returned as empty strings
    css: false,

    // Dependencies that need transforming (ESM packages)
    deps: {
      optimizer: {
        web: {
          include: ['ora', 'globby', 'mock-match-media'],
        },
      },
    },
  },

  resolve: {
    alias: {
      // mock-match-media/jest-setup uses CJS require("./") which creates a
      // separate module instance from the ESM import used by test files.
      // Use our ESM setup to share the same MQLs map / matchMedia function.
      'mock-match-media/jest-setup': path.resolve(
        __dirname,
        'src/core/vitest/mockMatchMediaSetup.ts'
      ),
      // Mock image imports (same as jest moduleNameMapper)
      '\\.(jpg|jpeg|png)$': path.resolve(
        __dirname,
        'src/core/jest/fileMock.ts'
      ),
      // Mock SVG imports
      '\\.(svg)$': path.resolve(__dirname, 'src/core/jest/jsxMock.tsx'),
    },
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
  },
})
