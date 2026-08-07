import fs from 'node:fs'
import path from 'node:path'

import {
  deriveCleanClassDependencies,
  stripSourceComments,
} from './deriveDependencies.ts'
import type { PrefixIndexEntry } from './deriveDependencies.ts'

/**
 * Matches a single `import ... from '...'` statement, capturing the import
 * clause (group 1) and the module source (group 2). `\bfrom\b` is a word-bound
 * anchor so the clause never stops on an identifier such as `fromCache`, and
 * the clause matcher excludes quotes so it cannot run past the source string.
 */
const IMPORT_STATEMENT = /import\s+([^'"]*?)\bfrom\b\s*['"]([^'"]+)['"]/g

/** Matches the first relative module specifier in a re-export barrel file. */
const FIRST_RELATIVE_SOURCE = /\bfrom\s*['"](\.[^'"]+)['"]/

/** Matches a PascalCase re-export barrel filename, e.g. `Flex.ts`. */
const REEXPORT_FILE = /^[A-Z][A-Za-z0-9]*\.tsx?$/

/** Strips a `.ts`/`.tsx` extension from a file path. */
const SOURCE_EXTENSION = /\.tsx?$/

/** Directories that never contain shippable render usage. */
const EXCLUDED_DIRS = new Set([
  '__tests__',
  '__mocks__',
  'style',
  'stories',
])

export type ComponentDirEntry = {
  /** Absolute path to the component's source directory. */
  dir: string

  /** The component directory name, e.g. `tooltip`. */
  name: string
}

/**
 * Build a component-directory lookup sorted longest-first so the most specific
 * directory wins (e.g. `components/form-status` is matched before
 * `components/form`). Directories are normalised to absolute paths so they can
 * be compared against resolved import paths.
 */
export function buildComponentDirIndex(
  entries: Iterable<ComponentDirEntry>
): ComponentDirEntry[] {
  return Array.from(entries)
    .map(({ name, dir }) => ({ name, dir: path.resolve(dir) }))
    .sort((a, b) => b.dir.length - a.dir.length)
}

/**
 * Resolve an absolute module path to the manifest component that owns it,
 * respecting directory boundaries so `components/icon-primary` is never matched
 * by `components/icon`.
 */
function resolveOwner(
  absPath: string,
  index: ComponentDirEntry[]
): string | null {
  for (const { dir, name } of index) {
    if (absPath === dir || absPath.startsWith(`${dir}${path.sep}`)) {
      return name
    }
  }

  return null
}

/**
 * Build alias entries for PascalCase re-export barrel files. Each component
 * ships a barrel file one level above its directory (e.g. `components/Flex.ts`
 * re-exporting `./flex/Flex`). A sibling that imports the barrel
 * (`import Flex from '../Flex'`) resolves to this file, not the component
 * directory, so the directory index alone cannot attribute it. Each alias maps
 * the barrel file path (without extension) to the component it re-exports, so
 * `resolveOwner` can match these imports by exact path.
 */
export function buildReexportFileIndex(
  groupDirs: Iterable<string>,
  componentDirIndex: ComponentDirEntry[]
): ComponentDirEntry[] {
  const aliases: ComponentDirEntry[] = []

  for (const groupDir of groupDirs) {
    if (!fs.existsSync(groupDir)) {
      continue
    }

    for (const entry of fs.readdirSync(groupDir, {
      withFileTypes: true,
    })) {
      if (!entry.isFile() || !REEXPORT_FILE.test(entry.name)) {
        continue
      }

      const filePath = path.join(groupDir, entry.name)
      const match = fs
        .readFileSync(filePath, 'utf-8')
        .match(FIRST_RELATIVE_SOURCE)

      if (!match) {
        continue
      }

      const owner = resolveOwner(
        path.resolve(groupDir, match[1]),
        componentDirIndex
      )

      if (owner) {
        aliases.push({
          name: owner,
          dir: filePath.replace(SOURCE_EXTENSION, ''),
        })
      }
    }
  }

  return aliases
}

function isSourceFile(filename: string): boolean {
  if (filename.endsWith('.d.ts')) {
    return false
  }

  if (/\.(test|spec|stories|docs)\.tsx?$/.test(filename)) {
    return false
  }

  if (/Docs\.tsx?$/.test(filename)) {
    return false
  }

  return /\.tsx?$/.test(filename)
}

function listSourceFiles(
  dir: string,
  excludeDirs?: Set<string>
): string[] {
  const files: string[] = []

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      if (EXCLUDED_DIRS.has(entry.name)) {
        continue
      }

      if (excludeDirs?.has(path.resolve(fullPath))) {
        continue
      }

      files.push(...listSourceFiles(fullPath, excludeDirs))
    } else if (isSourceFile(entry.name)) {
      files.push(fullPath)
    }
  }

  return files
}

function extractRuntimeNamedImports(clause: string): string[] {
  const named = clause.match(/\{([^}]*)\}/)?.[1]

  if (!named) {
    return []
  }

  return named
    .split(',')
    .map((specifier) => specifier.trim())
    .filter((specifier) => specifier && !specifier.startsWith('type '))
    .map((specifier) => specifier.split(/\s+as\s+/)[0].trim())
}

function hasRuntimeImport(clause: string): boolean {
  const trimmed = clause.trim()

  if (trimmed.startsWith('type ')) {
    return false
  }

  if (trimmed.startsWith('*')) {
    return true
  }

  const beforeNamed = trimmed.split('{')[0].replace(/,$/, '').trim()

  return (
    beforeNamed.length > 0 || extractRuntimeNamedImports(clause).length > 0
  )
}

/**
 * Resolve every runtime import from a styled sibling to that sibling's manifest
 * entry. Runtime helpers can emit the sibling's classes without rendering its
 * component as JSX, so requiring JSX usage would be a destructive false
 * negative. Type-only imports remain excluded.
 */
function resolveRuntimeImports(
  file: string,
  content: string,
  index: ComponentDirEntry[],
  selfName: string,
  barrelDirs?: Set<string>,
  barrelExports?: Map<string, string>
): Set<string> {
  const dependencies = new Set<string>()
  const fromDir = path.dirname(file)

  for (const match of content.matchAll(IMPORT_STATEMENT)) {
    const clause = match[1]
    const source = match[2]

    if (!source.startsWith('.') || !hasRuntimeImport(clause)) {
      continue
    }

    const resolved = path.resolve(fromDir, source)
    const owner = resolveOwner(resolved, index)

    if (owner && owner !== selfName) {
      dependencies.add(owner)
      continue
    }

    if (barrelDirs?.has(resolved) && barrelExports) {
      for (const identifier of extractRuntimeNamedImports(clause)) {
        const exported = barrelExports.get(identifier)

        if (exported && exported !== selfName) {
          dependencies.add(exported)
        }
      }
    }
  }

  return dependencies
}

export type RenderDeriveOptions = {
  /** Absolute path to the component's source directory. */
  componentDir: string

  /** The component's own directory name. */
  name: string

  /** Directory lookup for all known manifest components. */
  componentDirIndex: ComponentDirEntry[]

  /** Prefix lookup used to resolve literal `dnb-*` classes emitted in source. */
  prefixIndex?: PrefixIndexEntry[]

  /**
   * Absolute paths of subdirectories to skip while scanning. Used to derive a
   * component's render dependencies excluding self-contained member subtrees
   * (for example the per-field `Field/Upload` and `Value/Upload` directories of
   * Eufemia Forms), so those member-only dependencies can be attributed to the
   * member instead of the whole extension.
   */
  excludeDirs?: string[]

  /**
   * Absolute paths of the group barrel directories (e.g. `src/components`).
   * Named imports from these are resolved per identifier through
   * `barrelExports`.
   */
  barrelDirs?: string[]

  /**
   * Lookup from a barrel export identifier (e.g. `InputMasked`) to its
   * component name (e.g. `input-masked`), used to resolve group barrel imports.
   */
  barrelExports?: Map<string, string>
}

/**
 * Derive a component's render dependencies by scanning its `.ts`/`.tsx` source
 * files for sibling components that are imported and used as JSX elements. This
 * captures cross-cutting blocks that are rendered through props or state (for
 * example `Tooltip` via the `tooltip` prop, or `ProgressIndicator` in a loading
 * state) and therefore appear in the DOM without leaving any selectors in the
 * component's own stylesheet.
 */
export function deriveRenderDependencies(
  options: RenderDeriveOptions
): string[] {
  const { componentDir, name, componentDirIndex } = options
  const deps = new Set<string>()

  if (!fs.existsSync(componentDir)) {
    return []
  }

  const excludeDirs = options.excludeDirs
    ? new Set(options.excludeDirs.map((dir) => path.resolve(dir)))
    : undefined

  const barrelDirs = options.barrelDirs
    ? new Set(options.barrelDirs.map((dir) => path.resolve(dir)))
    : undefined

  for (const file of listSourceFiles(componentDir, excludeDirs)) {
    const content = stripSourceComments(fs.readFileSync(file, 'utf-8'))

    for (const dependency of resolveRuntimeImports(
      file,
      content,
      componentDirIndex,
      name,
      barrelDirs,
      options.barrelExports
    )) {
      deps.add(dependency)
    }

    for (const dependency of deriveCleanClassDependencies(
      content,
      name,
      options.prefixIndex ?? []
    )) {
      deps.add(dependency)
    }
  }

  return Array.from(deps).sort()
}
