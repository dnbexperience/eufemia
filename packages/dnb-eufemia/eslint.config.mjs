import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import globals from 'globals'

import babelParser from '@babel/eslint-parser'
import importPlugin from 'eslint-plugin-import'
import jestPlugin from 'eslint-plugin-jest'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import prettierPlugin from 'eslint-plugin-prettier'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import securityPlugin from 'eslint-plugin-security'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const basePlugins = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

const ignorePatterns = [
  '**/tests/**/*.js',
  '**/dist/**',
  '**/build/**',
  '**/assets/**',
  '**/public/**',
  '**/.cache/**',
  '**/icons/**',
  '**/node_modules/**',
  '*not_in_use*',
]

const tsConfigFiles = ['**/*.ts', '**/*.tsx']
const securityRecommendedRules =
  securityPlugin.configs.recommended.rules || {}
const nodeGlobals = globals.node || {}
const browserGlobals = globals.browser || {}
const jestGlobals = globals.jest || {}
const esGlobals = globals.es2021 || {}

export default [
  {
    ignores: ignorePatterns,
  },
  ...basePlugins.extends(
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended'
  ),
  ...basePlugins.extends('plugin:compat/recommended').map((config) => ({
    ...config,
    files: ['**/src/**/*.{js,jsx,ts,tsx}'],
    settings: {
      ...(config.settings || {}),
      polyfills: [...(config.settings?.polyfills || []), 'Object.hasOwn'],
      lintAllEsApis: true,
      ignoreConditionalChecks: true,
    },
  })),
  {
    languageOptions: {
      parser: babelParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...esGlobals,
        ...browserGlobals,
        ...nodeGlobals,
        ...jestGlobals,
      },
      parserOptions: {
        babelOptions: {
          configFile: '@dnb/eufemia/babel.config.js',
        },
        ecmaFeatures: {
          modules: true,
          jsx: true,
        },
      },
    },
    plugins: {
      jest: jestPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      security: securityPlugin,
    },
    settings: {
      react: {
        version: '>=16.12',
      },
    },
    rules: {
      ...securityRecommendedRules,
      'react-hooks/immutability': 'off',
      'react-hooks/preserve-manual-memoization': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/static-components': 'off',
      'react-hooks/use-memo': 'off',
      'react-hooks/globals': 'off',
      'no-unused-vars': [
        'error',
        {
          args: 'none',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
          caughtErrors: 'none',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'react/react-in-jsx-scope': 'off',
      'import/namespace': 'off',
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
      'no-console': 'warn',
      'spaced-comment': ['error', 'always', { markers: ['/'] }],
      'multiline-comment-style': ['error', 'separate-lines'],
      'no-restricted-syntax': [
        'error',
        'IfStatement > ExpressionStatement > AssignmentExpression',
      ],
      'import/export': 'off',
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
      'import/no-unresolved': 'off',
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
      'jsx-a11y/href-no-hash': 'off',
      'jsx-a11y/anchor-is-valid': [
        'warn',
        {
          aspects: ['invalidHref'],
        },
      ],
      'jsx-a11y/label-has-for': [
        'error',
        {
          components: ['Label'],
          required: {
            every: ['nesting', 'id'],
          },
          allowChildren: true,
        },
      ],
      'security/detect-non-literal-fs-filename': 'off',
      'security/detect-object-injection': 'off',
      'security/detect-non-literal-regexp': 'off',
    },
  },
  {
    files: ['**/scripts/**/*'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...esGlobals,
        ...nodeGlobals,
        ...jestGlobals,
      },
    },
    rules: {
      'no-console': 'off',
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-named-as-default': 'off',
      'no-unused-vars': [
        'error',
        {
          args: 'none',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
          caughtErrors: 'none',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['**/src/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@dnb/eufemia/*'],
              message: 'Do not use recursive module @dnb/eufemia!',
            },
            {
              group: ['**/src/*'],
              message:
                'Do not import from src – but rather define correct relative paths!',
            },
          ],
        },
      ],
      'no-restricted-globals': [
        'error',
        {
          name: 'structuredClone',
          message:
            "Import `structuredClone` from '@ungap/structured-clone' instead.",
        },
      ],
    },
  },
  ...basePlugins
    .extends('plugin:@typescript-eslint/recommended')
    .map((config) => ({
      ...config,
      files: tsConfigFiles,
    })),
  {
    files: tsConfigFiles,
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...esGlobals,
        ...browserGlobals,
        ...nodeGlobals,
        ...jestGlobals,
        JSX: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      'import/named': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'none',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
          caughtErrors: 'none',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'react/prop-types': 'off',
      'react/require-default-props': 'off',
    },
  },
  ...basePlugins.extends('plugin:jest/recommended').map((config) => ({
    ...config,
    files: ['**/__tests__/**'],
  })),
  {
    files: ['**/__tests__/**'],
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      'no-console': 'off',
      'compat/compat': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    files: ['**/*.stories.{ts,tsx,js,jsx}'],
    rules: {
      'no-console': 'off',
    },
  },
]
