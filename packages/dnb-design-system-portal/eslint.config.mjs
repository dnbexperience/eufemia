import eufemiaConfig from '@dnb/eufemia/eslint.config.mjs'
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
    },
  },
]
