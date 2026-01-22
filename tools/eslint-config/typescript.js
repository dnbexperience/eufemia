/**
 * TypeScript ESLint configuration for DNB Eufemia
 * Extends base configuration with TypeScript-specific rules
 */

module.exports = {
  extends: ['./index.js'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    // TypeScript specific rules
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    
    // Disable base rules that are handled by TypeScript
    'no-unused-vars': 'off',
    'no-undef': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
}
