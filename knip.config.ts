/**
 * Knip Configuration
 * 
 * Detects unused files, dependencies, and exports in the codebase.
 * Helps maintain a clean codebase by identifying dead code.
 * 
 * @see https://knip.dev/reference/configuration
 */

import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  workspaces: {
    '.': {
      entry: ['packages/*/src/index.{js,ts,tsx}'],
      project: ['packages/**/*.{js,ts,tsx}'],
      ignore: [
        '**/node_modules/**',
        '**/build/**',
        '**/.cache/**',
        '**/public/**',
        '**/dist/**',
        '**/__tests__/**',
        '**/*.test.{js,ts,tsx}',
        '**/*.spec.{js,ts,tsx}',
        '**/*.stories.{js,ts,tsx}',
        '**/*.d.ts',
      ],
    },
    'packages/dnb-eufemia': {
      entry: [
        'src/index.ts',
        'src/components/*/index.{js,ts,tsx}',
        'src/elements/*/index.{js,ts,tsx}',
        'src/extensions/*/index.{js,ts,tsx}',
        'src/fragments/*/index.{js,ts,tsx}',
        // Entry points for bundles
        'src/umd/**/*.ts',
        'src/esm/**/*.ts',
        // Scripts and tools
        'scripts/**/*.{js,ts,tsx}',
      ],
      project: ['src/**/*.{js,ts,tsx}', 'scripts/**/*.{js,ts,tsx}'],
      ignore: [
        'build/**',
        '**/__tests__/**',
        '**/*.test.{js,ts,tsx}',
        '**/*.spec.{js,ts,tsx}',
        '**/*.stories.{js,ts,tsx}',
        'src/**/*.d.ts',
        // Generated files
        'src/icons/**',
        // Legacy files that might be in transition
        'src/**/*-not-in-use.*',
      ],
      ignoreDependencies: [
        // Dev tools that are used via CLI
        '@storybook/*',
        'storybook',
        // Testing utilities
        '@testing-library/*',
        'jest-*',
        '@types/jest',
        // Build tools
        'babel-*',
        '@babel/*',
        'webpack',
        'sass',
        'postcss*',
        // Used in scripts
        'semantic-release',
        '@semantic-release/*',
      ],
    },
    'packages/dnb-design-system-portal': {
      entry: [
        'src/docs/index.js',
        'gatsby-*.{js,ts,tsx}',
        'src/core/**/*.{js,ts,tsx}',
      ],
      project: ['src/**/*.{js,ts,tsx,mdx}', 'gatsby-*.{js,ts,tsx}'],
      ignore: [
        'public/**',
        '.cache/**',
        '**/__tests__/**',
        '**/*.test.{js,ts,tsx}',
        '**/*.spec.{js,ts,tsx}',
        'src/e2e/**',
      ],
      ignoreDependencies: [
        // Gatsby plugins
        'gatsby-*',
        // Testing
        '@playwright/*',
        'playwright',
      ],
    },
    'tools/eufemia-llm-metadata': {
      entry: ['src/index.ts', 'scripts/**/*.ts'],
      project: ['src/**/*.ts', 'scripts/**/*.ts'],
      ignore: ['**/__tests__/**', '**/*.test.ts'],
    },
  },

  // Global ignore patterns
  ignore: [
    '**/*.snap',
    '**/*.snap.png',
    '**/*.config.{js,ts,mjs}',
    '**/.*.{js,ts}',
    '**/jest.config.js',
    '**/babel.config.js',
    '**/eslint.config.mjs',
  ],

  // Check for unused dependencies
  ignoreDependencies: [
    // Used in package.json scripts
    'cross-env',
    'dotenv',
    'dotenv-cli',
    // Workspace references
    'workspace:*',
    // Tooling
    'prettier',
    'eslint',
    'stylelint',
    'typescript',
    'nodemon',
  ],

  // Allow certain patterns that look unused but aren't
  ignoreExportsUsedInFile: true,
  
  // Include entry files in exports analysis
  includeEntryExports: true,

  // Plugins for specific tools
  gatsby: {
    entry: ['gatsby-*.{js,ts,tsx}'],
  },
  jest: {
    entry: ['jest.config.{js,ts}', 'jest.setup.{js,ts}'],
  },
  storybook: {
    entry: ['.storybook/*.{js,ts,tsx}'],
  },
}

export default config
