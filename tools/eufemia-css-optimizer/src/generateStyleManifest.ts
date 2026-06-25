import fs from 'node:fs'
import path from 'node:path'

import {
  buildPrefixIndex,
  deriveDirectDependencies,
} from './deriveDependencies.ts'
import type { PrefixIndexEntry } from './deriveDependencies.ts'
import {
  buildComponentDirIndex,
  buildReexportFileIndex,
  deriveRenderDependencies,
} from './deriveRenderDependencies.ts'
import type { ComponentDirEntry } from './deriveRenderDependencies.ts'
import type {
  GenerateOptions,
  StyleGroup,
  StyleManifest,
  StyleManifestEntry,
} from './types.ts'

const DEFAULT_GROUPS: StyleGroup[] = [
  'components',
  'fragments',
  'extensions',
]

/** The source group that holds the HTML element styles (typography, hr, …). */
const FOUNDATION_GROUP = 'elements'

/** The Eufemia Forms extension entry name (and its `extensions/` directory). */
const FORMS_ENTRY_NAME = 'forms'

/**
 * Forms namespaces whose member subdirectories map to compound components
 * (`Field.Upload`, `Value.Upload`, …). Each member renders its own field/value
 * specific components, so their dependencies are attributed to the member
 * rather than to the shared forms base.
 */
const FORMS_MEMBER_NAMESPACES = ['Field', 'Value']

/** Member-namespace subdirectories that are not themselves a member. */
const NON_MEMBER_DIRECTORIES = new Set(['style'])

/**
 * Structural prefixes the optimizer already keeps as globals; excluded from the
 * derived foundation so it stays a clean list of element block prefixes.
 */
const STRUCTURAL_PREFIXES = new Set(['dnb-core-style', 'dnb-spacing'])

/** Matches a `.dnb-*` class selector token; trimmed to its block afterwards. */
const FOUNDATION_CLASS_TOKEN = /\.dnb-[a-z0-9-]+/g

function listDirectories(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return []
  }

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
}

function listScssFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return []
  }

  const files: string[] = []

  const walk = (current: string) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name)

      if (entry.isDirectory()) {
        walk(full)
      } else if (entry.name.endsWith('.scss')) {
        files.push(full)
      }
    }
  }

  walk(dir)

  return files
}

/**
 * Derive the foundation block prefixes from the `elements` source group.
 *
 * The shared `Element` wrapper renders HTML element styles through a runtime
 * `dnb-${tag}` class (for example `<Hr>` -> `dnb-hr`, `<P>` -> `dnb-p`,
 * headings -> `dnb-h`). Because the class is composed from the tag it never
 * appears as a literal anywhere, so it cannot be import-detected or kept by a
 * PurgeCSS content scan. We collect the `dnb-*` block selectors declared by the
 * element stylesheets (their BEM block, stripped of any `--`/`__` suffix),
 * dropping anything that is already a standalone manifest entry (e.g.
 * `dnb-anchor`, `dnb-table`) or a structural global the optimizer keeps anyway.
 */
function deriveFoundationPrefixes(
  sourceRoot: string,
  entryPrefixes: Set<string>
): string[] {
  const prefixes = new Set<string>()

  for (const file of listScssFiles(
    path.join(sourceRoot, FOUNDATION_GROUP)
  )) {
    const content = fs.readFileSync(file, 'utf-8')

    for (const match of content.matchAll(FOUNDATION_CLASS_TOKEN)) {
      const block = match[0].slice(1).split('--')[0]

      if (entryPrefixes.has(block) || STRUCTURAL_PREFIXES.has(block)) {
        continue
      }

      prefixes.add(block)
    }
  }

  return Array.from(prefixes).sort()
}

/**
 * Expand a direct dependency graph into its transitive closure for each node.
 */
function resolveTransitiveDependencies(
  directGraph: Map<string, string[]>
): Map<string, string[]> {
  const resolved = new Map<string, string[]>()

  const visit = (node: string, seen: Set<string>): Set<string> => {
    const result = new Set<string>()

    for (const dep of directGraph.get(node) ?? []) {
      if (seen.has(dep)) {
        continue
      }

      seen.add(dep)
      result.add(dep)

      for (const transitive of visit(dep, seen)) {
        result.add(transitive)
      }
    }

    return result
  }

  for (const node of directGraph.keys()) {
    resolved.set(node, Array.from(visit(node, new Set([node]))).sort())
  }

  return resolved
}

/**
 * Expand a set of direct dependencies into its transitive closure using the
 * already-resolved per-component closures, including the seed nodes themselves.
 */
function expandClosure(
  seed: Iterable<string>,
  transitive: Map<string, string[]>
): Set<string> {
  const closure = new Set<string>()

  for (const dep of seed) {
    closure.add(dep)

    for (const nested of transitive.get(dep) ?? []) {
      closure.add(nested)
    }
  }

  return closure
}

/**
 * Split the Eufemia Forms field/value member render dependencies out of the
 * shared forms base.
 *
 * Forms is a single CSS namespace, but its `Field.*`/`Value.*` members render
 * very different components – `Field.Upload` pulls in the heavy `Upload` block
 * (and, through it, `Table`), `Field.Slider` pulls in `Slider`, and so on. The
 * default whole-extension derivation attributes all of these to the `forms`
 * entry, so importing forms keeps every field's CSS even for fields you never
 * render.
 *
 * This recomputes the `forms` base dependencies excluding the per-member
 * `Field/<Member>` and `Value/<Member>` subdirectories (leaving the shared
 * infrastructure such as `Form`, `FieldBlock`, `Iterate` and the always-present
 * help button), then records each member's extra components separately. The
 * optimizer keeps a member's extras only when that `Field.X`/`Value.X` is
 * actually used. It mutates `forms.dependencies` in place and returns the
 * member map.
 */
function deriveFormsFieldDependencies(options: {
  sourceRoot: string
  prefixIndex: PrefixIndexEntry[]
  renderIndex: ComponentDirEntry[]
  transitive: Map<string, string[]>
  entries: Record<string, StyleManifestEntry>
  barrelDirs: string[]
  barrelExports: Map<string, string>
}): Record<string, string[]> {
  const {
    sourceRoot,
    prefixIndex,
    renderIndex,
    transitive,
    entries,
    barrelDirs,
    barrelExports,
  } = options

  const formsEntry = entries[FORMS_ENTRY_NAME]
  const formsDir = path.join(sourceRoot, 'extensions', FORMS_ENTRY_NAME)

  if (!formsEntry || !fs.existsSync(formsDir)) {
    return {}
  }

  const members: Array<{ key: string; dir: string }> = []
  const memberDirs: string[] = []

  for (const namespace of FORMS_MEMBER_NAMESPACES) {
    const namespaceDir = path.join(formsDir, namespace)

    for (const member of listDirectories(namespaceDir)) {
      if (NON_MEMBER_DIRECTORIES.has(member) || member.startsWith('__')) {
        continue
      }

      const dir = path.join(namespaceDir, member)
      members.push({ key: `${namespace}.${member}`, dir })
      memberDirs.push(dir)
    }
  }

  if (members.length === 0) {
    return {}
  }

  // Base forms dependencies: everything the forms infrastructure renders
  // outside of the per-member Field/Value subdirectories.
  const baseDirect = new Set<string>([
    ...deriveDirectDependencies({
      styleDir: path.join(formsDir, 'style'),
      name: FORMS_ENTRY_NAME,
      prefixIndex,
    }),
    ...deriveRenderDependencies({
      componentDir: formsDir,
      name: FORMS_ENTRY_NAME,
      componentDirIndex: renderIndex,
      excludeDirs: memberDirs,
      barrelDirs,
      barrelExports,
    }),
  ])
  const baseClosure = expandClosure(baseDirect, transitive)

  formsEntry.dependencies = Array.from(baseClosure).sort()

  // Member-aware index so that a field which renders a sibling field (for
  // example `Field.Email` -> `Field.String`) resolves to that member instead of
  // to `forms`, letting composite fields inherit their sub-field dependencies.
  const memberKeys = new Set(members.map((member) => member.key))
  const memberRenderIndex = buildComponentDirIndex([
    ...renderIndex,
    ...members.map(({ key, dir }) => ({ name: key, dir })),
  ])

  const directComponents = new Map<string, string[]>()
  const directMembers = new Map<string, string[]>()

  for (const { key, dir } of members) {
    const refs = deriveRenderDependencies({
      componentDir: dir,
      name: key,
      componentDirIndex: memberRenderIndex,
      barrelDirs,
      barrelExports,
    })

    directComponents.set(
      key,
      refs.filter(
        (ref) => !memberKeys.has(ref) && ref !== FORMS_ENTRY_NAME
      )
    )
    directMembers.set(
      key,
      refs.filter((ref) => memberKeys.has(ref) && ref !== key)
    )
  }

  // Resolve each member's component closure, following sibling-member edges, and
  // keep only the components the shared forms base does not already provide.
  const resolveMemberComponents = (
    key: string,
    seen: Set<string>
  ): Set<string> => {
    const components = new Set<string>(directComponents.get(key) ?? [])

    for (const sibling of directMembers.get(key) ?? []) {
      if (seen.has(sibling)) {
        continue
      }

      seen.add(sibling)

      for (const dep of resolveMemberComponents(sibling, seen)) {
        components.add(dep)
      }
    }

    return components
  }

  const fieldDependencies: Record<string, string[]> = {}

  for (const { key } of members) {
    const closure = expandClosure(
      resolveMemberComponents(key, new Set([key])),
      transitive
    )
    const extra = Array.from(closure)
      .filter((dep) => !baseClosure.has(dep))
      .sort()

    if (extra.length > 0) {
      fieldDependencies[key] = extra
    }
  }

  return fieldDependencies
}

/**
 * Scan the Eufemia source tree and build a style manifest describing every
 * component/fragment/extension that ships a standalone CSS file, including the
 * BEM class prefix and the transitive CSS dependency graph. Direct dependencies
 * are derived statically from the `dnb-*` class selectors found in each
 * component's own `style/*.scss` files, combined with the sibling components it
 * renders as JSX (which add their own DOM classes without leaving selectors in
 * the parent's stylesheet).
 */
export function generateStyleManifest(
  options: GenerateOptions
): StyleManifest {
  const { sourceRoot } = options
  const groups = options.groups ?? DEFAULT_GROUPS

  if (!fs.existsSync(sourceRoot)) {
    throw new Error(`Eufemia source root not found: ${sourceRoot}`)
  }

  const entries: Record<string, StyleManifestEntry> = {}
  const directGraph = new Map<string, string[]>()

  const scanned: Array<{
    name: string
    styleDir: string
    sourceDir: string
  }> = []

  for (const group of groups) {
    const groupDir = path.join(sourceRoot, group)

    for (const name of listDirectories(groupDir)) {
      const sourceDir = path.join(groupDir, name)
      const styleDir = path.join(sourceDir, 'style')
      const mainStyle = path.join(styleDir, `dnb-${name}.scss`)

      if (!fs.existsSync(mainStyle)) {
        continue
      }

      scanned.push({ name, styleDir, sourceDir })

      entries[name] = {
        name,
        group,
        classPrefix: `dnb-${name}`,
        dependencies: [],
      }
    }
  }

  const prefixIndex = buildPrefixIndex(scanned.map((entry) => entry.name))
  const dirEntries = scanned.map(({ name, sourceDir }) => ({
    name,
    dir: sourceDir,
  }))
  const componentDirIndex = buildComponentDirIndex(dirEntries)
  const reexportAliases = buildReexportFileIndex(
    groups.map((group) => path.join(sourceRoot, group)),
    componentDirIndex
  )
  const renderIndex = buildComponentDirIndex([
    ...dirEntries,
    ...reexportAliases,
  ])

  // Lookup from a group barrel export identifier (e.g. `InputMasked`) to its
  // component name (e.g. `input-masked`), derived from the PascalCase re-export
  // barrel files, plus the group barrel directories those exports live in.
  const barrelExports = new Map<string, string>()
  for (const alias of reexportAliases) {
    barrelExports.set(path.basename(alias.dir), alias.name)
  }
  const barrelDirs = groups.map((group) => path.join(sourceRoot, group))

  for (const { name, styleDir, sourceDir } of scanned) {
    const styleDeps = deriveDirectDependencies({
      styleDir,
      name,
      prefixIndex,
    })
    const renderDeps = deriveRenderDependencies({
      componentDir: sourceDir,
      name,
      componentDirIndex: renderIndex,
    })

    directGraph.set(
      name,
      Array.from(new Set([...styleDeps, ...renderDeps])).sort()
    )
  }

  const transitive = resolveTransitiveDependencies(directGraph)

  for (const [name, entry] of Object.entries(entries)) {
    entry.dependencies = transitive.get(name) ?? []
  }

  const formsFieldDependencies = deriveFormsFieldDependencies({
    sourceRoot,
    prefixIndex,
    renderIndex,
    transitive,
    entries,
    barrelDirs,
    barrelExports,
  })

  const entryPrefixes = new Set(
    Object.values(entries).map((entry) => entry.classPrefix)
  )
  const foundation = deriveFoundationPrefixes(sourceRoot, entryPrefixes)

  return {
    version: 1,
    entries,
    foundation,
    formsFieldDependencies,
  }
}
