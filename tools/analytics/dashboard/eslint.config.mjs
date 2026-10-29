import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import securityPlugin from 'eslint-plugin-security'
import tseslint from 'typescript-eslint'

export default defineConfig(globalIgnores(['dist']), {
  extends: [js.configs.recommended, tseslint.configs.recommended],
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    security: securityPlugin,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    ...Object.fromEntries(
      Object.keys(securityPlugin.configs.recommended.rules).map((rule) => [
        rule,
        'error',
      ])
    ),
    // Same as the shared config: too noisy for bracket access
    'security/detect-object-injection': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
})
