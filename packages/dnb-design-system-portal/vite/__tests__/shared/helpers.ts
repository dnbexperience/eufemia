import fs from 'node:fs'
import path from 'node:path'

/**
 * Shared helpers for tests that lint the portal documentation sources
 * (`src/docs`), such as `page-headings.test.ts` and `page-ids.test.ts`.
 */

export const docsDir = path.resolve(__dirname, '../../../src/docs')

export const SOURCE_EXTENSIONS = ['.mdx', '.tsx', '.ts', '.js', '.jsx']

export function walk(dir: string, results: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(fullPath, results)
    } else if (SOURCE_EXTENSIONS.some((ext) => entry.name.endsWith(ext))) {
      results.push(fullPath)
    }
  }
  return results
}

const IMPORT_REGEX = /import\s+(?:[\s\S]*?)\s+from\s+['"]([^'"]+)['"]/g

export function resolveImportCandidates(
  fromFile: string,
  spec: string
): string[] {
  let base: string
  if (spec.startsWith('Docs/')) {
    base = path.join(docsDir, spec.slice('Docs/'.length))
  } else if (spec.startsWith('./') || spec.startsWith('../')) {
    base = path.resolve(path.dirname(fromFile), spec)
  } else {
    return []
  }
  return [
    base,
    ...SOURCE_EXTENSIONS.map((ext) => base + ext),
    ...SOURCE_EXTENSIONS.map((ext) => path.join(base, 'index' + ext)),
  ].map((candidate) => path.normalize(candidate))
}

/**
 * Build the set of files that are imported by another file inside the docs
 * tree. These are partials (e.g. `info.mdx`, section fragments) whose heading
 * is rendered within a parent page, so they don't need their own leading H1.
 */
export function buildImportedSet(): Set<string> {
  const imported = new Set<string>()
  for (const file of walk(docsDir)) {
    const content = fs.readFileSync(file, 'utf-8')
    let match: RegExpExecArray | null
    IMPORT_REGEX.lastIndex = 0
    while ((match = IMPORT_REGEX.exec(content)) !== null) {
      for (const candidate of resolveImportCandidates(file, match[1])) {
        imported.add(candidate)
      }
    }
  }
  return imported
}
