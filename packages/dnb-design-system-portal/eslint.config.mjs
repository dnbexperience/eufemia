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
      '**/plugins/gatsby-plugin-eufemia-llm-metadata/**',
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
      'no-restricted-imports': 'off',
    },
  },
]
