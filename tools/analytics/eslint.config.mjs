import parentConfig from 'dnb-design-system-portal/eslint.config.mjs'

export default [
  ...parentConfig,
  {
    // Plain-JS tests aren't covered by the TS-only `import/named: off` override
    // in the shared config; vitest's named exports don't resolve reliably
    // without type info.
    files: ['__tests__/**/*.js'],
    rules: {
      'import/named': 'off',
    },
  },
]
