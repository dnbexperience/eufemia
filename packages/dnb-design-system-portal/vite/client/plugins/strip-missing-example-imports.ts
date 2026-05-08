import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'

const portalRoot = path.resolve(__dirname, '..', '..', '..')
const EXAMPLES_IMPORT_RE =
  /import\s*\{([^}]+)\}\s*from\s*['"]([^'"]*Examples)['"]/g
const EXAMPLES_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js']

export function resolveExamplesPath(
  source: string,
  filepath: string,
  options: {
    portalRoot?: string
    existsSync?: typeof fs.existsSync
  } = {}
): string | null {
  const existsSync = options.existsSync ?? fs.existsSync
  const root = options.portalRoot ?? portalRoot
  const dir = path.dirname(filepath)

  for (const ext of EXAMPLES_EXTENSIONS) {
    let candidate: string

    if (source.startsWith('.')) {
      candidate = path.resolve(dir, source + ext)
    } else if (source.startsWith('Docs/')) {
      candidate = path.resolve(root, 'src/docs', source.slice(5) + ext)
    } else {
      break
    }

    if (existsSync(candidate)) {
      return candidate
    }
  }

  return null
}

export function stripMissingExampleImports(
  code: string,
  filepath: string,
  options: {
    portalRoot?: string
    existsSync?: typeof fs.existsSync
    readFileSync?: typeof fs.readFileSync
  } = {}
): string | null {
  if (!filepath.endsWith('.mdx') && !filepath.endsWith('.tsx')) {
    return null
  }

  const readFileSync = options.readFileSync ?? fs.readFileSync
  let match = EXAMPLES_IMPORT_RE.exec(code)

  if (!match) {
    return null
  }

  let transformed = code

  while (match) {
    const [fullImport, specifiers, source] = match
    const examplesPath = resolveExamplesPath(source, filepath, options)

    if (examplesPath) {
      const exContent = readFileSync(examplesPath, 'utf-8')
      const names = specifiers
        .split(',')
        .map((specifier) => specifier.trim())
        .filter(Boolean)
      const valid = names.filter((name) => exContent.includes(name))

      if (valid.length < names.length) {
        if (valid.length === 0) {
          transformed = transformed.replace(
            fullImport,
            '// [vite] removed stale import'
          )
        } else {
          const newImport = `import { ${valid.join(', ')} } from '${source}'`
          transformed = transformed.replace(fullImport, newImport)
        }
      }
    }

    match = EXAMPLES_IMPORT_RE.exec(code)
  }

  return transformed !== code
    ? { code: transformed, map: null }.code
    : null
}

export default function stripMissingExampleImportsPlugin(): Plugin {
  return {
    name: 'strip-missing-example-imports',
    enforce: 'pre',

    transform(code, id) {
      const [filepath] = id.split('?')
      const transformed = stripMissingExampleImports(code, filepath)

      if (!transformed) {
        return null
      }

      return { code: transformed, map: null }
    },
  }
}
