import parentConfig from 'dnb-design-system-portal/eslint.config.mjs'

export default [
  ...parentConfig,
  {
    files: ['**/src/handler.ts'],
    // Bundle the existing checks directly without pulling their workspaces into Lambda.
    rules: {
      'workspaces/no-relative-imports': 'off',
      'workspaces/require-dependency': 'off',
    },
  },
]
