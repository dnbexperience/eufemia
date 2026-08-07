/**
 * Helpers for safely removing unused `@dnb/eufemia` component CSS with PurgeCSS.
 *
 * Eufemia's JavaScript is tree-shakeable, but its CSS is not: `import
 * '@dnb/eufemia/style'` always ships every component's styles. Class-based
 * purging on its own is unsafe, because Eufemia composes modifier classes at
 * runtime (for example `dnb-button--${variant}`), so the full class name never
 * appears literally in your source.
 *
 * The safe unit of removal is therefore the whole component block, together
 * with the other blocks it styles or renders. This module reads the shipped
 * style manifest, detects which components your source imports, and produces a
 * PurgeCSS-compatible safelist that keeps every used block and its
 * dependencies.
 */

import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

// NB: StyleManifestEntry and StyleManifest mirror the generator's source of
// truth in `tools/eufemia-css-optimizer/src/types.ts`. Keep both in sync.
export type StyleGroup = 'components' | 'fragments' | 'extensions'

export type StyleManifestEntry = {
  /** Source directory name, e.g. `autocomplete` or `date-picker`. */
  name: string

  /** Which part of the library the entry belongs to. */
  group: StyleGroup

  /** The BEM block prefix used by the entry, e.g. `dnb-autocomplete`. */
  classPrefix: string

  /** Transitively resolved component CSS dependencies (directory names). */
  dependencies: string[]
}

export type StyleManifest = {
  /** Manifest schema version. */
  version: number

  /** Map of entry name to its style metadata. */
  entries: Record<string, StyleManifestEntry>

  /**
   * Foundation block prefixes that are always required, independent of which
   * components are used (the HTML element styles such as `dnb-p`, `dnb-hr`,
   * `dnb-h`, `dnb-ul` emitted by the shared `Element` wrapper as a runtime
   * `dnb-${tag}` class). Optional for backwards compatibility with manifests
   * generated before this field existed.
   */
  foundation?: string[]

  /**
   * Per-member component dependencies for the Eufemia Forms extension, keyed by
   * the compound member name (`Field.Upload`, `Value.Upload`, …). These heavy
   * field/value specific components (for example `Field.Upload` -> `upload`,
   * `table`) are kept only when that specific member is detected, instead of for
   * every forms import. Optional for backwards compatibility with manifests
   * generated before this field existed.
   */
  formsFieldDependencies?: Record<string, string[]>
}

export type CreateSafelistOptions = {
  /** Directories to scan for `@dnb/eufemia` imports. Defaults to `['src']`. */
  sources?: string[]

  /**
   * File extensions to scan. Defaults to `ts`, `tsx`, `js`, `jsx` and `mdx`.
   */
  extensions?: string[]

  /**
   * Explicit list of used component names (for example
   * `['autocomplete', 'button']`). Provide this to opt out of automatic
   * detection and manage the list yourself.
   */
  components?: string[]

  /** Provide a manifest directly instead of loading the shipped one. */
  manifest?: StyleManifest

  /** Path to a `style-manifest.json` to load instead of the shipped one. */
  manifestPath?: string

  /**
   * Include a small set of always-keep global/structural prefixes
   * (`dnb-core-style`, `dnb-spacing`, `eufemia-theme`) and the element
   * foundation CSS declared by the manifest (`dnb-p`, `dnb-hr`, `dnb-h`, …).
   * Defaults to `true`.
   */
  includeGlobals?: boolean

  /** Override the default global prefixes that are always kept. */
  globalPrefixes?: string[]
}

export type Safelist = {
  /** The resolved set of kept component names (used + transitive deps), sorted. */
  components: string[]

  /** The resolved set of kept BEM block prefixes, sorted. */
  prefixes: string[]

  /** Regular expressions ready to use as PurgeCSS `safelist.greedy`. */
  greedy: RegExp[]

  /**
   * Serializable regex source strings (for writing to JSON/config). Hydrate
   * with `new RegExp(source)` to get the same expressions as `greedy`.
   */
  patterns: string[]
}

const DEFAULT_GLOBAL_PREFIXES = [
  'dnb-core-style',
  'dnb-spacing',
  'eufemia-theme',
]
const DEFAULT_SOURCES = ['src']
const DEFAULT_EXTENSIONS = ['ts', 'tsx', 'js', 'jsx', 'mdx']

const MODULE_FROM_PATTERN =
  /(?:import|export)\b([^;'"]*?)\bfrom\s*['"]([^'"]+)['"]/g
const NAMED_GROUP_PATTERN = /\{([^}]*)\}/
const NAMESPACE_IMPORT_PATTERN = /^\*\s+as\s+([A-Za-z_$][\w$]*)/
const MANIFEST_VERSION = 1
const PUBLIC_ELEMENT_ALIASES: Record<string, string> = {
  Link: 'anchor',
  Td: 'table',
  Th: 'table',
  Tr: 'table',
}

/**
 * Match a deep import's component segment, e.g. the `Button` in
 * `@dnb/eufemia/components/Button` or the `date-picker` in
 * `@dnb/eufemia/src/components/date-picker/DatePicker`. Covers the three
 * importable groups (components, fragments, extensions) and both the published
 * and `/src` source paths.
 */
const DEEP_IMPORT_PATTERN =
  /\/(?:components|elements|fragments|extensions)\/([^/]+)/
const SOURCE_EXTENSION_PATTERN = /\.(?:m|c)?[jt]sx?$/

/**
 * Eufemia Forms (`@dnb/eufemia/extensions/forms`) ships as a single CSS
 * namespace: every block is a flat `dnb-forms-*` descendant (for example
 * `dnb-forms-field-string`) rather than a BEM child, and the sub-blocks are not
 * independently importable. We therefore treat the namespace itself as one unit
 * – any import from the forms subpath keeps the whole `dnb-forms-*` namespace
 * plus the shared base components it always renders (the help button dialog,
 * Form/FieldBlock infrastructure, …) via the manifest dependencies.
 *
 * The heavy field/value specific components are not part of that base: a field
 * such as `Field.Upload` (which renders the `Upload` block, and through it
 * `Table`) only contributes its components when that `Field.X`/`Value.X` member
 * is actually used. Those per-member dependencies live in the manifest's
 * `formsFieldDependencies` map and are resolved from member usage below. The
 * flat descendants are kept by the generic dash sub-block handling in
 * `prefixToPattern`.
 */
const FORMS_ENTRY = 'forms'

/**
 * Convert a PascalCase export name to the kebab-case directory/block name used
 * by Eufemia, e.g. `DatePicker` -> `date-picker`. Internal: duplicates
 * `shared/component-helper`'s `toKebabCase`, kept dependency-free so the helper
 * stays self-contained for consumers.
 */
function pascalToKebab(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
}

function validateManifest(
  manifest: unknown,
  source: string
): asserts manifest is StyleManifest {
  if (
    !manifest ||
    typeof manifest !== 'object' ||
    !('version' in manifest) ||
    manifest.version !== MANIFEST_VERSION
  ) {
    const version =
      manifest && typeof manifest === 'object' && 'version' in manifest
        ? String(manifest.version)
        : 'missing'

    throw new Error(
      `Unsupported Eufemia style manifest version (${version}) from ${source}. ` +
        `Expected version ${MANIFEST_VERSION}. Use the manifest shipped with the ` +
        'same @dnb/eufemia version as the optimizer.'
    )
  }

  if (
    !('entries' in manifest) ||
    !manifest.entries ||
    typeof manifest.entries !== 'object' ||
    Array.isArray(manifest.entries)
  ) {
    throw new Error(
      `Invalid Eufemia style manifest from ${source}: expected an entries object.`
    )
  }
}

function getShippedManifestPath(): string {
  const require = createRequire(path.join(process.cwd(), 'package.json'))
  const shippedManifest = '@dnb/eufemia/style/style-manifest.json'

  try {
    return require.resolve(shippedManifest)
  } catch {
    const packageRoot = path.dirname(
      require.resolve('@dnb/eufemia/package.json')
    )
    const sourceBuildPath = path.join(
      packageRoot,
      'build/style/style-manifest.json'
    )

    if (fs.existsSync(sourceBuildPath)) {
      return sourceBuildPath
    }

    throw new Error(
      'Could not find the generated Eufemia style manifest. Looked for ' +
        `"${shippedManifest}" and "${sourceBuildPath}". Run the @dnb/eufemia ` +
        'package preparation, or pass a valid `manifestPath` or `manifest` object ' +
        'to createSafelist().'
    )
  }
}

function loadShippedManifest(manifestPath?: string): StyleManifest {
  const resolvedPath = manifestPath ?? getShippedManifestPath()
  let manifest: unknown

  try {
    manifest = JSON.parse(fs.readFileSync(resolvedPath, 'utf-8'))
  } catch (error) {
    throw new Error(
      `Could not read the style manifest at "${resolvedPath}". Pass a valid ` +
        '`manifestPath`, or a `manifest` object, to createSafelist().',
      { cause: error }
    )
  }

  validateManifest(
    manifest,
    manifestPath
      ? `"${resolvedPath}"`
      : `the installed @dnb/eufemia package at "${resolvedPath}"`
  )

  return manifest
}

function isEufemiaSource(source: string): boolean {
  return source === '@dnb/eufemia' || source.startsWith('@dnb/eufemia/')
}

function isFormsSource(source: string): boolean {
  // Match the forms subpath for both published (`@dnb/eufemia/extensions/forms`)
  // and source (`@dnb/eufemia/src/extensions/forms`) import styles. Only ever
  // called after `isEufemiaSource` has matched the specifier.
  return /(?:^|\/)extensions\/forms(?:$|\/)/.test(source)
}

function resolveFormsNamespace(
  identifier: string,
  formsNamespaces: Set<string>
): string | undefined {
  const namespace = identifier.replace(/^Registered/, '')

  return formsNamespaces.has(namespace) ? namespace : undefined
}

function resolveFormsDeepMember(
  source: string,
  formsNamespaces: Set<string>
): string | undefined {
  const namespacePattern = Array.from(formsNamespaces)
    .map(escapeRegExp)
    .join('|')

  if (!namespacePattern) {
    return undefined
  }

  const match = source.match(
    new RegExp(`(?:^|/)extensions/forms/(${namespacePattern})/([^/]+)`)
  )

  if (!match) {
    return undefined
  }

  return `${match[1]}.${match[2].replace(SOURCE_EXTENSION_PATTERN, '')}`
}

/**
 * Resolve a deep import specifier to a manifest entry name.
 *
 * Deep imports identify the component through the path rather than the binding,
 * so `import Button from '@dnb/eufemia/components/Button'` (a default import) is
 * recognised just like a named import from the barrel. The segment is read from
 * the first path part after `components` / `fragments` / `extensions`, normalised
 * to the kebab-case entry name, and only returned when it is a known entry –
 * otherwise the caller falls back to named-import detection (for sub-path barrels
 * such as `@dnb/eufemia/components/lib`). Only called after `isEufemiaSource`.
 */
function resolveDeepImportEntry(
  source: string,
  manifest: StyleManifest
): string | undefined {
  const segment = source
    .match(DEEP_IMPORT_PATTERN)?.[1]
    ?.replace(SOURCE_EXTENSION_PATTERN, '')

  if (!segment) {
    return undefined
  }

  const name = PUBLIC_ELEMENT_ALIASES[segment] ?? pascalToKebab(segment)

  return manifest.entries[name] ? name : undefined
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Resolve the `@dnb/eufemia` component names used in a single source file.
 *
 * Recognises named imports (including `A as B` aliases), deep imports where the
 * component is identified by the path (for example `import Button from
 * '@dnb/eufemia/components/Button'`), namespace imports together with their
 * `Namespace.Component` member usage (for example `import * as Eufemia from
 * '@dnb/eufemia'` then `<Eufemia.Button />`), and any import from the Eufemia
 * Forms subpath (`@dnb/eufemia/extensions/forms`), which keeps the whole forms
 * style namespace. Type-only imports and identifiers that do not match a
 * manifest entry are ignored.
 */
function detectComponentsInFile(
  code: string,
  manifest: StyleManifest
): Set<string> {
  const found = new Set<string>()
  const namespaceAliases = new Set<string>()
  const formsFields = manifest.formsFieldDependencies ?? {}
  const formsNamespaces = new Set<string>()

  for (const key of Object.keys(formsFields)) {
    formsNamespaces.add(key.slice(0, key.indexOf('.')))
  }

  const formsMemberAliases = new Map<string, string>()
  const formsNamespaceAliases = new Set<string>()
  const formsNamespacePattern = Array.from(formsNamespaces)
    .map(escapeRegExp)
    .join('|')
  let keepAllFormsMembers = false

  const addFormsMember = (key: string): boolean => {
    const dependencies = formsFields[key]

    if (!dependencies) {
      return false
    }

    for (const dependency of dependencies) {
      found.add(dependency)
    }

    return true
  }

  const addAllFormsMembers = () => {
    for (const dependencies of Object.values(formsFields)) {
      for (const dependency of dependencies) {
        found.add(dependency)
      }
    }
  }

  const addIfKnown = (identifier: string) => {
    const name =
      PUBLIC_ELEMENT_ALIASES[identifier] ?? pascalToKebab(identifier)

    if (manifest.entries[name]) {
      found.add(name)
    }
  }

  const getNamedSpecifiers = (clause: string) => {
    const named = clause.match(NAMED_GROUP_PATTERN)?.[1]

    if (!named) {
      return []
    }

    return named
      .split(',')
      .map((part) => part.trim())
      .filter((part) => part && !/^type\s/.test(part))
      .map((part) => {
        const [importedRaw, aliasRaw] = part.split(/\s+as\s+/)
        const imported = importedRaw.trim()

        return {
          imported,
          local: (aliasRaw ?? importedRaw).trim(),
        }
      })
  }

  const getDefaultBinding = (clause: string): string | undefined => {
    const beforeNamed = clause.split(/[,{]/)[0].trim()

    return /^[A-Za-z_$][\w$]*$/.test(beforeNamed) ? beforeNamed : undefined
  }

  for (const match of Array.from(code.matchAll(MODULE_FROM_PATTERN))) {
    const statement = match[0]
    const clause = match[1].trim()
    const source = match[2]
    const namedSpecifiers = getNamedSpecifiers(clause)
    const defaultBinding = getDefaultBinding(clause)
    const namespaceAlias = clause.match(NAMESPACE_IMPORT_PATTERN)?.[1]
    const isExport = statement.startsWith('export')
    const isTypeOnly = /^type[\s{]/.test(clause)
    const hasRuntimeBinding =
      !isTypeOnly &&
      Boolean(defaultBinding || namespaceAlias || namedSpecifiers.length)

    if (!isEufemiaSource(source) || !hasRuntimeBinding) {
      continue
    }

    if (isFormsSource(source)) {
      found.add(FORMS_ENTRY)

      const deepMember = resolveFormsDeepMember(source, formsNamespaces)

      if (deepMember) {
        addFormsMember(deepMember)
        continue
      }

      const memberBarrel = source.match(
        new RegExp(`(?:^|/)extensions/forms/(${formsNamespacePattern})$`)
      )?.[1]

      if (memberBarrel) {
        for (const { imported } of namedSpecifiers) {
          if (!addFormsMember(`${memberBarrel}.${imported}`)) {
            keepAllFormsMembers = true
          }
        }

        if (defaultBinding || namespaceAlias) {
          formsMemberAliases.set(
            defaultBinding ?? namespaceAlias,
            memberBarrel
          )
        }

        continue
      }

      if (/(?:^|\/)extensions\/forms\/Forms$/.test(source)) {
        if (defaultBinding) {
          formsMemberAliases.set(defaultBinding, 'Field')
        }
      }

      if (namespaceAlias) {
        formsNamespaceAliases.add(namespaceAlias)
      }

      for (const { imported, local } of namedSpecifiers) {
        const namespace = resolveFormsNamespace(imported, formsNamespaces)

        if (namespace) {
          if (isExport) {
            keepAllFormsMembers = true
          } else {
            formsMemberAliases.set(local, namespace)
          }
        }
      }

      continue
    }

    const deepEntry = resolveDeepImportEntry(source, manifest)
    if (deepEntry) {
      found.add(deepEntry)
      continue
    }

    if (namespaceAlias && !isExport) {
      namespaceAliases.add(namespaceAlias)
    }

    for (const { imported } of namedSpecifiers) {
      addIfKnown(imported)
    }
  }

  for (const alias of Array.from(namespaceAliases)) {
    const memberPattern = new RegExp(
      `\\b${escapeRegExp(alias)}\\.([A-Z][\\w$]*)`,
      'g'
    )

    for (const memberMatch of Array.from(code.matchAll(memberPattern))) {
      addIfKnown(memberMatch[1])
    }
  }

  for (const alias of Array.from(formsNamespaceAliases)) {
    const memberPattern = new RegExp(
      `\\b${escapeRegExp(alias)}\\.(?:Registered)?(${formsNamespacePattern})\\.([A-Z][\\w$]*)`,
      'g'
    )

    for (const memberMatch of Array.from(code.matchAll(memberPattern))) {
      if (!addFormsMember(`${memberMatch[1]}.${memberMatch[2]}`)) {
        keepAllFormsMembers = true
      }
    }

    const assignmentPattern = new RegExp(
      `\\b(?:const|let|var)\\s+([A-Za-z_$][\\w$]*)\\s*=\\s*${escapeRegExp(alias)}\\.(?:Registered)?(${formsNamespacePattern})\\b`,
      'g'
    )

    for (const assignment of Array.from(
      code.matchAll(assignmentPattern)
    )) {
      formsMemberAliases.set(assignment[1], assignment[2])
    }

    const dynamicMemberPattern = new RegExp(
      `\\b${escapeRegExp(alias)}\\.(?:Registered)?(?:${formsNamespacePattern})\\s*\\[`
    )
    const dynamicNamespacePattern = new RegExp(
      `\\b${escapeRegExp(alias)}\\s*\\[`
    )
    const indirectNamespacePattern = new RegExp(
      `\\b(?:const|let|var)\\s+[A-Za-z_$][\\w$]*\\s*=\\s*${escapeRegExp(alias)}\\b(?!\\s*[.[])`
    )

    if (
      dynamicMemberPattern.test(code) ||
      dynamicNamespacePattern.test(code) ||
      indirectNamespacePattern.test(code)
    ) {
      keepAllFormsMembers = true
    }
  }

  for (const [local, namespace] of Array.from(formsMemberAliases)) {
    const memberPattern = new RegExp(
      `\\b${escapeRegExp(local)}\\.([A-Z][\\w$]*)`,
      'g'
    )

    for (const memberMatch of Array.from(code.matchAll(memberPattern))) {
      if (!addFormsMember(`${namespace}.${memberMatch[1]}`)) {
        keepAllFormsMembers = true
      }
    }

    const destructuringPattern = new RegExp(
      `\\b(?:const|let|var)\\s*\\{([^}]*)\\}\\s*=\\s*${escapeRegExp(local)}\\b`,
      'g'
    )

    for (const destructuring of Array.from(
      code.matchAll(destructuringPattern)
    )) {
      for (const part of destructuring[1].split(',')) {
        const member = part.trim().split(/\s*:\s*/)[0]

        if (member && !addFormsMember(`${namespace}.${member}`)) {
          keepAllFormsMembers = true
        }
      }
    }

    const dynamicPattern = new RegExp(`\\b${escapeRegExp(local)}\\s*\\[`)
    const multiHopPattern = new RegExp(
      `\\b(?:const|let|var)\\s+[A-Za-z_$][\\w$]*\\s*=\\s*${escapeRegExp(local)}\\b(?!\\s*[.[])`
    )

    if (dynamicPattern.test(code) || multiHopPattern.test(code)) {
      keepAllFormsMembers = true
    }
  }

  if (keepAllFormsMembers) {
    addAllFormsMembers()
  }

  return found
}

function listSourceFiles(dir: string, extensions: Set<string>): string[] {
  const files: string[] = []

  const walk = (current: string) => {
    let entries: fs.Dirent[]

    try {
      entries = fs.readdirSync(current, { withFileTypes: true })
    } catch {
      return
    }

    for (const entry of entries) {
      const full = path.join(current, entry.name)

      if (entry.isDirectory()) {
        if (entry.name === 'node_modules') {
          continue
        }
        walk(full)
      } else if (extensions.has(path.extname(entry.name).slice(1))) {
        files.push(full)
      }
    }
  }

  walk(dir)

  return files
}

/**
 * Scan the given source directories for `@dnb/eufemia` imports and resolve them
 * to component names known to the manifest.
 *
 * Recognises named imports (including aliases), deep imports identified by their
 * path (`@dnb/eufemia/components/Button`), namespace imports together with their
 * `Namespace.Component` member usage, and any import from the Eufemia Forms
 * subpath (`@dnb/eufemia/extensions/forms`), which keeps the shared forms style
 * namespace base. Forms field/value member usage (`<Field.Upload>`) additionally
 * keeps that field's heavy components (for example `Upload` and `Table`), so an
 * unused field's CSS is not shipped. Type-only imports and identifiers that do
 * not match a manifest entry are ignored.
 *
 * Detection is static, so usage that is not visible in the import/member text
 * (for example a component chosen through a computed string) is not picked up –
 * add any such components manually with the `components` option.
 */
export function detectUsedComponents(options: {
  /** The manifest to resolve detected imports against. */
  manifest: StyleManifest
  /** Directories to scan for `@dnb/eufemia` imports. Defaults to `['src']`. */
  sources?: string[]
  /** File extensions to scan. Defaults to `ts`, `tsx`, `js`, `jsx`, `mdx`. */
  extensions?: string[]
}): string[] {
  const { manifest } = options
  validateManifest(
    manifest,
    'the manifest passed to detectUsedComponents()'
  )

  const sources = options.sources ?? DEFAULT_SOURCES
  const extensions = new Set(
    (options.extensions ?? DEFAULT_EXTENSIONS).map((ext) =>
      ext.replace(/^\./, '')
    )
  )
  const used = new Set<string>()

  for (const source of sources) {
    for (const file of listSourceFiles(source, extensions)) {
      let code: string

      try {
        code = fs.readFileSync(file, 'utf-8')
      } catch {
        continue
      }

      for (const name of Array.from(
        detectComponentsInFile(code, manifest)
      )) {
        used.add(name)
      }
    }
  }

  return Array.from(used).sort()
}

/**
 * Build a greedy-safe regex source for a single block prefix.
 *
 * It matches the block alone, its BEM modifier (`--`) and element (`__`)
 * separators, and its own single-dash sub-blocks (for example `dnb-flex` keeps
 * `dnb-flex-container`, `dnb-flex-item` and `dnb-flex-stack`, and `dnb-forms`
 * keeps the flat `dnb-forms-field-string` namespace). To stay precise it
 * rejects sibling blocks that are themselves separate manifest entries:
 * `childPrefixes` lists those (e.g. `dnb-input-masked` for `dnb-input`), and
 * each adds a negative lookahead so the parent never keeps the child's CSS
 * (including the child's own `--`/`__` variants).
 */
function prefixToPattern(
  prefix: string,
  childPrefixes: string[] = []
): string {
  const escaped = escapeRegExp(prefix)

  const exclusions = childPrefixes
    .map(
      (child) =>
        `(?!${escapeRegExp(child.slice(prefix.length))}(?![A-Za-z0-9]))`
    )
    .join('')

  return `${escaped}${exclusions}(?:--|__|(?![\\w]))`
}

function normalizeToName(value: string): string {
  return value.startsWith('dnb-') ? value.slice('dnb-'.length) : value
}

function buildSafelist(
  manifest: StyleManifest,
  usedComponents: string[],
  includeGlobals: boolean,
  globalPrefixes: string[]
): Safelist {
  const keptNames = new Set<string>()

  for (const used of usedComponents) {
    const name = normalizeToName(used)
    const entry = manifest.entries[name]

    if (!entry) {
      // Unknown to the manifest, but still keep its block defensively.
      keptNames.add(name)
      continue
    }

    keptNames.add(name)

    for (const dep of entry.dependencies) {
      keptNames.add(dep)
    }
  }

  const prefixes = new Set<string>()

  for (const name of Array.from(keptNames)) {
    const prefix = manifest.entries[name]?.classPrefix ?? `dnb-${name}`
    prefixes.add(prefix)
  }

  if (includeGlobals) {
    for (const prefix of globalPrefixes) {
      prefixes.add(prefix)
    }

    // Element/foundation CSS (`dnb-p`, `dnb-hr`, `dnb-h`, `dnb-ul`, …) is
    // emitted by the shared Element wrapper as a runtime `dnb-${tag}` class, so
    // it is never import-detected nor present as a literal for the content scan.
    // Keep it unconditionally as part of the always-on foundation.
    for (const prefix of manifest.foundation ?? []) {
      prefixes.add(prefix)
    }
  }

  // Sibling blocks that are themselves separate manifest entries must not be
  // kept by a shorter parent prefix (e.g. `dnb-input` must not keep
  // `dnb-input-masked`). Collected from the full manifest so unused children
  // are still excluded.
  const entryPrefixes = Object.values(manifest.entries).map(
    (entry) => entry.classPrefix
  )

  const sortedPrefixes = Array.from(prefixes).sort()
  const patterns = sortedPrefixes.map((prefix) =>
    prefixToPattern(
      prefix,
      entryPrefixes.filter(
        (other) => other !== prefix && other.startsWith(`${prefix}-`)
      )
    )
  )

  return {
    components: Array.from(keptNames).sort(),
    prefixes: sortedPrefixes,
    greedy: patterns.map((source) => new RegExp(source)),
    patterns,
  }
}

/**
 * Build a PurgeCSS-compatible safelist for the `@dnb/eufemia` component CSS your
 * application actually uses.
 *
 * By default it loads the shipped style manifest and auto-detects the used
 * components by scanning `sources` for `@dnb/eufemia` imports. Pass
 * `components` to manage the list yourself, or `manifest` / `manifestPath` to
 * use a manifest other than the shipped one.
 *
 * @example
 * // purgecss.config.js
 * import { createSafelist } from '@dnb/eufemia/style/optimizer.js'
 *
 * const { greedy } = createSafelist({ sources: ['src'] })
 * export default { content, css, safelist: { greedy } }
 */
export function createSafelist(
  options: CreateSafelistOptions = {}
): Safelist {
  const manifest =
    options.manifest ?? loadShippedManifest(options.manifestPath)
  validateManifest(manifest, 'the manifest passed to createSafelist()')

  const includeGlobals = options.includeGlobals ?? true
  const globalPrefixes = options.globalPrefixes ?? DEFAULT_GLOBAL_PREFIXES

  const usedComponents =
    options.components ??
    detectUsedComponents({
      manifest,
      sources: options.sources,
      extensions: options.extensions,
    })

  return buildSafelist(
    manifest,
    usedComponents,
    includeGlobals,
    globalPrefixes
  )
}

/**
 * Matches the start of a `:where(:not(…))` / `:is(:not(…))` compound, the one
 * selector shape PurgeCSS cannot keep on its own (see `protectWhereSelectors`).
 */
const NESTED_WHERE_PATTERN = /:(?:where|is)\(\s*:not\(/

/** The PurgeCSS "ignore the next rule" annotation. */
const PURGECSS_IGNORE = '/* purgecss ignore */'

/**
 * Shield the Eufemia rules that PurgeCSS would otherwise drop even though they
 * are in use and match the safelist.
 *
 * PurgeCSS walks *into* `:where()` / `:is()` and removes the nested selectors it
 * considers unused. Eufemia uses these pseudo-classes for specificity control,
 * for example the anchor mixins emit
 * `:where(:not(.dnb-anchor--no-style)).dnb-anchor`. There the meaningful class
 * (`dnb-anchor`) sits one level below the nested `:not()`, so PurgeCSS removes
 * the `:not()` selector, leaves an empty `:where()`, and then deletes the whole
 * rule. The matching `@supports not (selector(*:where(*)))` fallback has no
 * `:where()`, so it survives – meaning only modern browsers lose the styling.
 *
 * No safelist entry (standard, deep or greedy) can reach that nesting level, so
 * we annotate the affected rules up front with a `/* purgecss ignore *\/`
 * comment, which makes PurgeCSS keep the rule untouched and strip the comment
 * from the output. Only rules whose selector matches one of the kept `safelist`
 * patterns are protected, so unused components are still purged.
 *
 * Run this on each CSS string *before* handing it to PurgeCSS.
 *
 * @param css - The CSS to protect.
 * @param safelist - The greedy patterns from `createSafelist().greedy`.
 * @returns The CSS with ignore annotations inserted (unchanged if none apply).
 *
 * @example
 * import { createSafelist, protectWhereSelectors } from '@dnb/eufemia/style/optimizer.js'
 *
 * const { greedy } = createSafelist({ sources: ['src'] })
 * const guarded = protectWhereSelectors(originalCss, greedy)
 * const [result] = await new PurgeCSS().purge({
 *   content, css: [{ raw: guarded }], safelist: { greedy },
 * })
 */
export function protectWhereSelectors(
  css: string,
  safelist: RegExp[]
): string {
  const insertions: number[] = []

  let index = 0
  let preludeStart = 0
  const length = css.length

  while (index < length) {
    const char = css[index]

    // Skip string literals so braces/semicolons inside them are ignored.
    if (char === '"' || char === "'") {
      index++

      while (index < length && css[index] !== char) {
        if (css[index] === '\\') {
          index++
        }
        index++
      }

      index++
      continue
    }

    // Skip comments, then start a fresh prelude after them.
    if (char === '/' && css[index + 1] === '*') {
      index += 2

      while (
        index < length &&
        !(css[index] === '*' && css[index + 1] === '/')
      ) {
        index++
      }

      index += 2
      preludeStart = index
      continue
    }

    // A block opens: the text since the last boundary is its prelude.
    if (char === '{') {
      const prelude = css.slice(preludeStart, index)
      const trimmed = prelude.trim()

      const isRule = trimmed.length > 0 && !trimmed.startsWith('@')

      if (
        isRule &&
        NESTED_WHERE_PATTERN.test(trimmed) &&
        safelist.some((pattern) => pattern.test(trimmed))
      ) {
        // Insert at the first non-whitespace character of the selector so the
        // comment becomes the rule's immediately preceding sibling.
        insertions.push(
          preludeStart + (prelude.length - prelude.trimStart().length)
        )
      }

      index++
      preludeStart = index
      continue
    }

    // Block close and statement end both reset the prelude boundary.
    if (char === '}' || char === ';') {
      index++
      preludeStart = index
      continue
    }

    index++
  }

  if (insertions.length === 0) {
    return css
  }

  // Apply from the end so earlier offsets stay valid.
  let result = css

  for (let i = insertions.length - 1; i >= 0; i--) {
    const at = insertions[i]
    result = result.slice(0, at) + PURGECSS_IGNORE + result.slice(at)
  }

  return result
}
