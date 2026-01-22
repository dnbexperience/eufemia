/**
 * React ESLint configuration for DNB Eufemia
 * Extends base configuration with React-specific rules
 */

module.exports = {
  extends: [
    './index.js',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['react', 'react-hooks', 'jsx-a11y'],
  parserOptions: {
    ecmaFeatures: {
      modules: true,
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // React specific rules
    'react/react-in-jsx-scope': 'off',
    'react/self-closing-comp': [
      'warn',
      {
        component: true,
        html: true,
      },
    ],
    'react/prop-types': 'warn',
    'react/require-default-props': 'warn',
    'react/no-unused-prop-types': 'warn',
    'react/no-unescaped-entities': [
      'error',
      {
        forbid: ['>', '}'],
      },
    ],
    'react/display-name': [
      'off',
      {
        ignoreTranspilerName: false,
      },
    ],
    
    // JSX a11y rules
    'jsx-a11y/href-no-hash': 'off',
    'jsx-a11y/anchor-is-valid': [
      'warn',
      {
        aspects: ['invalidHref'],
      },
    ],
  },
}
