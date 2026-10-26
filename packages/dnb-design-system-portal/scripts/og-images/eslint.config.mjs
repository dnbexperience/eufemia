import config from '../../eslint.config.mjs'
import tsParser from '@typescript-eslint/parser'

export default [
  ...config,
  {
    files: ['**/*.mts'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: { 'no-console': 'off' },
  },
]
