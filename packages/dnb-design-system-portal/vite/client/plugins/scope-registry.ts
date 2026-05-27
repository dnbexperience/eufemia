/**
 * Registry of known Eufemia scope symbols and their import paths.
 *
 * Used by inject-scope to generate per-file scope imports for ComponentBox,
 * so only the symbols actually referenced in each file's code strings
 * are bundled — instead of pulling in the entire library.
 *
 * Derives component/fragment/element/forms lists dynamically by parsing
 * the auto-generated lib.ts barrel files at load time, so this file
 * never needs manual updates when components are added or removed.
 */

import fs from 'node:fs'
import path from 'node:path'

export type ScopeImportInfo = {
  source: string
  isDefault: boolean
}

/**
 * Parse default import statements from an auto-generated lib.ts file.
 * Matches lines like: import Name from './relative/path'
 */
function parseDefaultImports(
  filePath: string
): Array<{ name: string; relativePath: string }> {
  const content = fs.readFileSync(filePath, 'utf-8')
  const results: Array<{ name: string; relativePath: string }> = []
  const regex = /^import\s+(\w+)\s+from\s+'\.\/([^']+)'/gm
  let match: RegExpExecArray | null

  while ((match = regex.exec(content)) !== null) {
    results.push({ name: match[1], relativePath: match[2] })
  }

  return results
}

/**
 * Parse namespace and re-exported default exports from the forms index.
 * Matches: export * as Name from '...'
 * Matches: export { default as Name } from '...'
 */
function parseFormsExports(filePath: string): string[] {
  const content = fs.readFileSync(filePath, 'utf-8')
  const names: string[] = []

  const nsRegex = /export\s+\*\s+as\s+(\w+)\s+from/g
  let match: RegExpExecArray | null

  while ((match = nsRegex.exec(content)) !== null) {
    names.push(match[1])
  }

  const namedRegex = /export\s*\{\s*default\s+as\s+(\w+)\s*\}\s*from/g

  while ((match = namedRegex.exec(content)) !== null) {
    names.push(match[1])
  }

  return names
}

// Resolve the @dnb/eufemia source root
const eufemiaSrc = path.resolve(
  path.dirname(require.resolve('@dnb/eufemia/package.json')),
  'src'
)

// Build the import info map by parsing the actual lib files
const importInfoMap = new Map<string, ScopeImportInfo>()
const allNames: string[] = []

for (const { name, relativePath } of parseDefaultImports(
  path.join(eufemiaSrc, 'components/lib.ts')
)) {
  importInfoMap.set(name, {
    source: `@dnb/eufemia/src/components/${relativePath}`,
    isDefault: true,
  })
  allNames.push(name)
}

for (const { name, relativePath } of parseDefaultImports(
  path.join(eufemiaSrc, 'fragments/lib.ts')
)) {
  importInfoMap.set(name, {
    source: `@dnb/eufemia/src/fragments/${relativePath}`,
    isDefault: true,
  })
  allNames.push(name)
}

for (const { name, relativePath } of parseDefaultImports(
  path.join(eufemiaSrc, 'elements/lib.ts')
)) {
  importInfoMap.set(name, {
    source: `@dnb/eufemia/src/elements/${relativePath}`,
    isDefault: true,
  })
  allNames.push(name)
}

for (const name of parseFormsExports(
  path.join(eufemiaSrc, 'extensions/forms/index.ts')
)) {
  importInfoMap.set(name, {
    source: '@dnb/eufemia/src/extensions/forms',
    isDefault: false,
  })
  allNames.push(name)
}

// Named exports from @dnb/eufemia/src/shared
// These are stable top-level exports unlikely to change.
for (const name of ['Provider', 'Theme']) {
  importInfoMap.set(name, {
    source: '@dnb/eufemia/src/shared',
    isDefault: false,
  })
  allNames.push(name)
}

/**
 * Set of all known scope symbol names.
 */
export const allScopeNames = new Set<string>(allNames)

/**
 * Names provided directly by ComponentBox (React hooks, styled, etc.).
 * These should NOT be injected by the plugin.
 */
export const builtinScopeNames = new Set([
  'styled',
  'React',
  'Fragment',
  'useState',
  'useEffect',
  'useRef',
  'useCallback',
  'useMemo',
  'useContext',
  'useLayoutEffect',
  'createContext',
  'Suspense',
])

/**
 * Get import information for a known scope symbol.
 */
export function getImportInfo(name: string): ScopeImportInfo | null {
  return importInfoMap.get(name) || null
}
