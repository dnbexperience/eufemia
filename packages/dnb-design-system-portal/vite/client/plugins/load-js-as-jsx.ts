import path from 'node:path'
import { transformWithOxc, type Plugin } from 'vite'

const portalRoot = path.resolve(__dirname, '..', '..', '..')

export function convertCjsToEsm(code: string): string | null {
  const isCjs = /\brequire\s*\(/.test(code) || /\bexports\./.test(code)

  if (!isCjs) {
    return null
  }

  let transformed = code

  transformed = transformed.replace(
    /(?:const|let|var)\s+(\w+)\s*=\s*require\s*\(\s*(['"][^'"]+['"])\s*\)/g,
    'import $1 from $2'
  )

  transformed = transformed.replace(
    /exports\.(\w+)\s*=\s*function\s+\1/g,
    'export function $1'
  )

  transformed = transformed.replace(
    /exports\.(\w+)\s*=\s*/g,
    'export const $1 = '
  )

  return transformed
}

export default function loadJsAsJsxPlugin(): Plugin {
  const portalSrcDir = path.resolve(portalRoot, 'src')

  return {
    name: 'load-js-as-jsx',
    enforce: 'pre',

    async transform(code, id) {
      const [filepath] = id.split('?')

      if (
        !filepath.endsWith('.js') ||
        !filepath.startsWith(portalSrcDir)
      ) {
        return null
      }

      const transformedCode = convertCjsToEsm(code) ?? code

      return transformWithOxc(transformedCode, filepath, {
        lang: 'jsx',
        jsx: { runtime: 'automatic' },
      })
    },
  }
}
