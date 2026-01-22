/**
 * Base ESLint configuration for DNB Eufemia
 * Shared across all packages in the monorepo
 */

module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: ['eslint:recommended'],
  plugins: ['import', 'prettier'],
  rules: {
    // Prevent console statements in production code
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    
    // Code style
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
    'multiline-comment-style': ['error', 'separate-lines'],
    
    // Best practices
    'no-restricted-syntax': [
      'error',
      'IfStatement > ExpressionStatement > AssignmentExpression',
    ],
    
    // Import rules
    'import/export': 'off',
    'import/namespace': 'off',
    'import/no-unresolved': 'off',
    'import/no-anonymous-default-export': [
      'error',
      {
        allowArray: true,
        allowArrowFunction: false,
        allowAnonymousClass: false,
        allowAnonymousFunction: false,
        allowCallExpression: true,
        allowLiteral: true,
        allowObject: true,
      },
    ],
    
    // Prevent recursive imports
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@dnb/eufemia/*'],
            message: 'Do not use recursive module @dnb/eufemia!',
          },
        ],
      },
    ],
  },
}
