import eufemiaConfig from '@dnb/eufemia/eslint.config.mjs'
import * as mdxPlugin from 'eslint-plugin-mdx'
import workspacesPlugin from 'eslint-plugin-workspaces'

const workspacesRecommended =
  workspacesPlugin.configs?.['flat/recommended'] || {}

export default [
  {
    ignores: [
      '!/*.js',
      '**/tests/**/*.js',
      '**/public/**',
      '**/static/**',
      '**/reports/**',
      '**/node_modules/**',
      '*not_in_use*',
      '**/vite/**',
    ],
  },
  ...eufemiaConfig,
  {
    ...workspacesRecommended,
    plugins: {
      ...workspacesRecommended.plugins,
      workspaces: workspacesPlugin,
    },
    rules: {
      ...workspacesRecommended.rules,
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react',
              importNames: ['default'],
              message:
                'Use named imports from "react" instead of the default React namespace import. E.g., import { useState } from "react" or import type { ReactNode } from "react".',
            },
          ],
        },
      ],
      // The portal is a documentation site, not shipped to browsers with
      // restricted compat requirements – disable compat checking.
      'compat/compat': 'off',
    },
  },

  // MDX linting — parse and lint .mdx files
  {
    ...mdxPlugin.flat,
  },
  {
    files: ['**/*.mdx'],
    rules: {
      // Catch unused imports/variables in MDX files
      'no-unused-vars': [
        'error',
        {
          args: 'none',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
        },
      ],

      // Components are injected via the MDX provider (src/shared/tags/index.tsx)
      'react/jsx-no-undef': 'off',
      'no-undef': 'off', // MDX components are provided at runtime

      // These rules don't apply well to MDX
      'react/no-unescaped-entities': 'off',
      'react/self-closing-comp': 'off', // false positives: MDX components wrapping markdown content appear "empty" to the parser
      'no-unused-expressions': 'off',
      'import/namespace': 'off',
      'import/no-unresolved': 'off',
      'workspaces/no-absolute-imports': 'off',
      'compat/compat': 'off',
    },
  },
]
