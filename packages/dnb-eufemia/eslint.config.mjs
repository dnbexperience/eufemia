import { FlatCompat } from '@eslint/eslintrc'
import { fixupConfigRules } from '@eslint/compat'
import js from '@eslint/js'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import globals from 'globals'

import vitestPlugin from '@vitest/eslint-plugin'
import playwrightPlugin from 'eslint-plugin-playwright'
import securityPlugin from 'eslint-plugin-security'
import tsParser from '@typescript-eslint/parser'
import docsTypesPlugin from './scripts/eslint/plugins/docs-types/index.js'
import componentTypesPlugin from './scripts/eslint/plugins/component-types/index.js'
import namingConventionsPlugin from './scripts/eslint/plugins/naming-conventions/index.js'
import playwrightExtrasPlugin from './scripts/eslint/plugins/playwright-extras/index.js'

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
const esGlobals = globals.es2021 || {}
const vitestGlobals = {
  afterAll: 'readonly',
  afterEach: 'readonly',
  beforeAll: 'readonly',
  beforeEach: 'readonly',
  describe: 'readonly',
  expect: 'readonly',
  it: 'readonly',
  test: 'readonly',
  vi: 'readonly',
}

export default [
  {
    ignores: ignorePatterns,
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
  },
  ...fixupConfigRules(
    basePlugins.extends(
      'eslint:recommended',
      'plugin:import/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:jsx-a11y/recommended'
    )
  ),
  ...fixupConfigRules(
    basePlugins.extends('plugin:compat/recommended').map((config) => ({
      ...config,
      files: ['**/src/**/*.{js,jsx,ts,tsx}'],
      settings: {
        ...(config.settings || {}),
        polyfills: [
          ...(config.settings?.polyfills || []),
          'Object.hasOwn',
        ],
        lintAllEsApis: true,
        ignoreConditionalChecks: true,
      },
    }))
  ),
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...esGlobals,
        ...browserGlobals,
        ...nodeGlobals,
        ...vitestGlobals,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      security: securityPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...securityRecommendedRules,

      // React Compiler rules added to plugin:react-hooks/recommended in v7 –
      // disable them until the React Compiler is adopted.
      'react-hooks/immutability': 'off',
      'react-hooks/preserve-manual-memoization': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/static-components': 'off',
      'react-hooks/use-memo': 'off',
      'react-hooks/globals': 'off',
      'react-hooks/void-use-memo': 'off',
      'react-hooks/incompatible-library': 'off',
      'react-hooks/error-boundaries': 'off',
      'react-hooks/set-state-in-render': 'off',
      'react-hooks/unsupported-syntax': 'off',
      'react-hooks/config': 'off',
      'react-hooks/gating': 'off',
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
          paths: [
            {
              name: 'react',
              importNames: ['default'],
              message:
                'Use named imports from "react" instead of the default React namespace import. E.g., import { useState } from "react" or import type { ReactNode } from "react".',
            },
          ],
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
        {
          selector:
            'ChainExpression MemberExpression[optional=true][object.name="process"]',
          message:
            'Do not use optional chaining on process (process?.env). Use process.env instead – optional chaining breaks Vite define replacements.',
        },
      ],
      'import/export': 'off',
      'import/no-duplicates': 'error',
      'import/no-named-as-default': 'error',
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
      'react/prop-types': 'off',
      'react/no-unused-prop-types': 'off',
      'react/no-unescaped-entities': [
        'error',
        {
          forbid: ['>', '}'],
        },
      ],
      'react/display-name': 'off',
      'jsx-a11y/anchor-is-valid': [
        'warn',
        {
          aspects: ['invalidHref'],
        },
      ],
      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          labelComponents: ['Label'],
          assert: 'either',
          depth: 3,
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
        ...vitestGlobals,
      },
    },
    rules: {
      'no-console': 'off',
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-named-as-default': 'off',
    },
  },
  {
    files: ['**/src/**/*'],
    rules: {
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
  ...fixupConfigRules(
    basePlugins
      .extends('plugin:@typescript-eslint/recommended')
      .map((config) => ({
        ...config,
        files: tsConfigFiles,
      }))
  ),
  {
    files: tsConfigFiles,
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        // With the automatic JSX transform (react-jsx), importing React
        // is not required for JSX. Setting jsxPragma to null lets
        // @typescript-eslint/no-unused-vars flag unused React imports.
        jsxPragma: null,
      },
      globals: {
        ...esGlobals,
        ...browserGlobals,
        ...nodeGlobals,
        ...vitestGlobals,
        JSX: 'readonly',
      },
    },
    rules: {
      'import/named': 'off',
      'no-unused-vars': 'off',

      // Allow @ts-expect-error and @ts-ignore with a description.
      // @ts-ignore is permitted because strictFunctionTypes errors may appear
      // in some environments but not others (e.g. CI vs local), making
      // @ts-expect-error fail with "unused directive" when the error is absent.
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': 'allow-with-description',
          minimumDescriptionLength: 3,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
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
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
          custom: {
            regex: 'Types$',
            match: false,
          },
        },
      ],
    },
  },
  {
    files: ['**/__tests__/**'],
    plugins: {
      vitest: vitestPlugin,
    },
    rules: {
      ...vitestPlugin.configs.recommended.rules,
      'vitest/no-focused-tests': 'error',
      'vitest/no-conditional-expect': 'warn',
      'no-console': 'off',
      'compat/compat': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react-dom/test-utils',
              message:
                "react-dom/test-utils is removed in React 19. Import 'act' from '@testing-library/react' or 'react' instead.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/__tests__/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
          disallowTypeAnnotations: false,
        },
      ],
    },
  },
  {
    files: ['**/src/**/__tests__/**'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react-dom/test-utils',
              message:
                "react-dom/test-utils is removed in React 19. Import 'act' from '@testing-library/react' or 'react' instead.",
            },
          ],
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
    files: ['**/*Docs.{ts,tsx}'],
    plugins: {
      'docs-types': docsTypesPlugin,
    },
    rules: {
      'docs-types/warn-supported-types': 'warn',
      'docs-types/validate-supported-types': 'error',
      'docs-types/doc-trailing-period': 'warn',
      'docs-types/defaultvalue-inner-quotes': 'warn',
      'docs-types/doc-no-double-spaces': 'warn',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          modifiers: ['exported', 'const'],
          format: ['PascalCase'],
          filter: {
            regex: 'Properties$|Events$|Data$|Designs?$|Item$|Object$',
            match: true,
          },
        },
      ],
    },
  },
  {
    files: [
      'src/components/**/*.{ts,tsx}',
      'src/elements/**/*.{ts,tsx}',
      'src/fragments/**/*.{ts,tsx}',
    ],
    ignores: [
      '**/__tests__/**',
      '**/*.test.*',
      '**/*.spec.*',
      '**/*.d.ts',
    ],
    plugins: {
      'component-types': componentTypesPlugin,
    },
    rules: {
      'component-types/require-component-prefix': [
        'warn',
        {
          allowlist: [],
        },
      ],
      'component-types/no-inline-type-exports': [
        'warn',
        {
          threshold: 5,
        },
      ],
    },
  },
  {
    files: [
      'src/components/**/*.{ts,tsx}',
      'src/elements/**/*.{ts,tsx}',
      'src/fragments/**/*.{ts,tsx}',
      'src/extensions/**/*.{ts,tsx}',
    ],
    ignores: [
      '**/__tests__/**',
      '**/*.test.*',
      '**/*.spec.*',
      '**/*.d.ts',
    ],
    plugins: {
      'naming-conventions': namingConventionsPlugin,
    },
    rules: {
      'naming-conventions/no-bare-props-export': 'error',
    },
  },
  {
    files: [
      'src/components/**/*.{ts,tsx}',
      'src/elements/**/*.{ts,tsx}',
      'src/fragments/**/*.{ts,tsx}',
      'src/extensions/**/*.{ts,tsx}',
    ],
    ignores: [
      '**/*Docs.{ts,tsx}',
      '**/__tests__/**',
      '**/*.test.*',
      '**/*.spec.*',
      '**/*.d.ts',
    ],
    plugins: {
      'docs-types': docsTypesPlugin,
    },
    rules: {
      'docs-types/sync-docs-jsdoc': 'error',
    },
  },
  {
    // Playwright stays for E2E tests only.
    files: ['**/*.e2e.spec.{ts,tsx}'],
    ...playwrightPlugin.configs['flat/recommended'],
    plugins: {
      ...playwrightPlugin.configs['flat/recommended'].plugins,
      'playwright-extras': playwrightExtrasPlugin,
    },
    rules: {
      ...playwrightPlugin.configs['flat/recommended'].rules,
      'playwright/prefer-to-have-length': 'error',
      'playwright-extras/no-identical-title': 'error',
    },
  },
  {
    // The vitest-screenshots helper modules run inside Vitest's browser
    // worker, where Vite handles all module resolution. We use
    // \`@ts-nocheck\` to keep them out of the main project's tsc step
    // (their types are validated by Vitest's own pipeline at runtime).
    files: ['src/core/vitest-screenshots/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
  {
    // Vitest browser-mode screenshot tests use the plain Jest-flavoured API
    // (`describe` / `it`). Lint them with @vitest/eslint-plugin instead of
    // eslint-plugin-playwright.
    files: ['**/*.screenshot.test.{ts,tsx}'],
    plugins: {
      vitest: vitestPlugin,
    },
    rules: {
      ...vitestPlugin.configs.recommended.rules,
      // makeScreenshot is the assertion in our screenshot tests.
      'vitest/expect-expect': [
        'error',
        {
          assertFunctionNames: ['expect', 'makeScreenshot'],
        },
      ],
    },
  },
]
