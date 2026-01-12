import eufemiaConfig from '@dnb/eufemia/eslint.config.mjs'
import workspacesPlugin from 'eslint-plugin-workspaces'

const workspacesRecommended =
  workspacesPlugin.configs?.['flat/recommended'] || {}

export default [
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
