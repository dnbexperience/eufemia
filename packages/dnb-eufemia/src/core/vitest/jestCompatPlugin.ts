/**
 * Vite plugin that transforms jest.mock() / jest.requireActual() / etc.
 * into their vi.* equivalents BEFORE Vitest's hoisting pass.
 *
 * Vitest only hoists literal `vi.mock()` calls found in source.
 * Our `globalThis.jest = vi` shim makes `jest.mock()` work at runtime,
 * but by then the imports have already resolved. This plugin does a
 * source-level text replacement so Vitest sees `vi.mock()` and hoists it.
 *
 * It also applies babel-plugin-optimize-clsx to non-test source files
 * so that clsx argument order matches the Babel transform in Jest.
 */

// Inline the Plugin type to avoid moduleResolution issues with vite's types
type VitePlugin = {
  name: string
  enforce?: 'pre' | 'post'
  transform?: (
    code: string,
    id: string
  ) => { code: string; map: null | unknown } | undefined | null | void
}

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
let babelTransform: typeof import('@babel/core').transformSync | null =
  null
let babelPluginOptimizeClsx: string | null = null

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  babelTransform = require('@babel/core').transformSync
  babelPluginOptimizeClsx = 'babel-plugin-optimize-clsx'
} catch {
  // Babel not available — skip clsx optimization
}

export function jestCompatPlugin(): VitePlugin {
  return {
    name: 'vitest-jest-compat-transform',
    enforce: 'pre',

    transform(code, id) {
      const isTestFile =
        id.includes('.test.') ||
        id.includes('__tests__') ||
        id.includes('Mocker')

      // For non-test source files: apply babel-plugin-optimize-clsx
      // to match the class order Jest produces (via babel-jest).
      if (
        !isTestFile &&
        babelTransform &&
        babelPluginOptimizeClsx &&
        code.includes('clsx') &&
        (id.endsWith('.tsx') ||
          id.endsWith('.ts') ||
          id.endsWith('.jsx') ||
          id.endsWith('.js'))
      ) {
        try {
          const result = babelTransform(code, {
            filename: id,
            plugins: [babelPluginOptimizeClsx],
            parserOpts: {
              plugins: ['typescript', 'jsx'],
            },
            // Only apply the clsx plugin, don't transform anything else
            configFile: false,
            babelrc: false,
          })

          if (result?.code && result.code !== code) {
            return { code: result.code, map: null }
          }
        } catch {
          // If babel transform fails, fall through silently
        }
      }

      // For test files: transform jest.* → vi.*
      if (!isTestFile) {
        return undefined
      }

      if (!code.includes('jest.')) {
        return undefined
      }

      let transformed = code

      // jest.mock() → vi.mock() (must be transformed for Vitest hoisting)
      transformed = transformed.replace(/\bjest\.mock\(/g, 'vi.mock(')

      // jest.unmock() → vi.unmock()
      transformed = transformed.replace(/\bjest\.unmock\(/g, 'vi.unmock(')

      // jest.requireActual('path') → (await vi.importActual('path'))
      // Wrapped in parens so chained .prop access works correctly:
      // jest.requireActual('./foo').Bar → (await vi.importActual('./foo')).Bar
      transformed = transformed.replace(
        /\bjest\.requireActual\(([^)]+)\)/g,
        '(await vi.importActual($1))'
      )

      // If any vi.mock factory now contains `await`, make it async.
      // Matches: vi.mock('path', () => or vi.mock('path', (args) =>
      // Adds `async` keyword if not already present.
      if (transformed.includes('await vi.importActual')) {
        transformed = transformed.replace(
          /(vi\.mock\([^,]+,\s*)(?!async)\(([^)]*)\)\s*(=>)/g,
          '$1async ($2) $3'
        )
      }

      // Only return if we actually changed something
      if (transformed === code) {
        return undefined
      }

      return {
        code: transformed,
        map: null,
      }
    },
  }
}
