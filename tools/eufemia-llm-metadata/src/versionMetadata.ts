/**
 * Version metadata: `since` / `deprecatedIn` / `removedIn` for documented
 * props and events, plus the migration-index aggregation.
 *
 * This module holds the *pure* logic (AST parsing of `*Docs.ts` exports,
 * derivation of version info from an ordered history, the build-time merge,
 * and the migration-index aggregation). The git plumbing that produces the
 * ordered history lives in `scripts/generateVersionMetadata.ts`, so this
 * module stays deterministic and unit-testable.
 */

import { parse } from '@babel/parser'
import type { DocEntryMap } from './convertHelpers.ts'

/** Status string as authored in a `*Docs.ts` entry (or null when absent). */
export type DocsStatus = string | null

/** A single `*Docs.ts` file reduced to its prop/event keys and their status. */
export type ParsedDocsFile = {
  props: Record<string, { status: DocsStatus }>
  events: Record<string, { status: DocsStatus }>
}

/** Inferred version info for one prop or event. */
export type PropVersionInfo = {
  /** Release the entry first appeared in. `null` when only in an unreleased commit. */
  since: string | null
  /** True when `since` is "at or before" (present in the first tracked commit). */
  sinceFloor?: boolean
  /** Release the entry's status became `deprecated`. */
  deprecatedIn?: string
  /** Release the entry disappeared from the current file's history. */
  removedIn?: string
  /** True when `since` could not be mapped to a release (unreleased commit). */
  pending?: boolean
}

export type ComponentVersionInfo = {
  props: Record<string, PropVersionInfo>
  events: Record<string, PropVersionInfo>
}

/** One point in a file's history: its parsed content at a resolved release. */
export type HistoryEntry = {
  /** Release string (e.g. `11.2.0`) or `null` for an unreleased commit. */
  version: string | null
  parsed: ParsedDocsFile
}

const EXPORT_EVENTS = 'Events'
const EXPORT_PROPERTIES = 'Properties'

/**
 * Parse a `*Docs.ts` source string and return the literal prop/event keys
 * grouped by export kind. Spread elements and computed keys are skipped
 * (they cannot be resolved statically) — this yields missing entries, never
 * wrong ones. Parsing failures return empty maps rather than throwing.
 */
export function parseDocsExports(source: string): ParsedDocsFile {
  const result: ParsedDocsFile = { props: {}, events: {} }

  let ast: ReturnType<typeof parse>
  try {
    ast = parse(source, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx'],
      errorRecovery: true,
    })
  } catch {
    return result
  }

  for (const node of ast.program.body) {
    const decl =
      node.type === 'ExportNamedDeclaration' && node.declaration
        ? node.declaration
        : node.type === 'VariableDeclaration'
          ? node
          : null

    if (!decl || decl.type !== 'VariableDeclaration') {
      continue
    }

    for (const d of decl.declarations) {
      if (d.id.type !== 'Identifier' || !d.init) {
        continue
      }
      const exportName = d.id.name
      const isEvents = exportName.includes(EXPORT_EVENTS)
      const isProps = exportName.includes(EXPORT_PROPERTIES)
      if (!isEvents && !isProps) {
        continue
      }

      const obj = unwrapObjectExpression(d.init)
      if (!obj) {
        continue
      }

      const bucket = isEvents ? result.events : result.props
      for (const prop of obj.properties) {
        const entry = readObjectMember(prop)
        if (entry) {
          bucket[entry.key] = { status: entry.status }
        }
      }
    }
  }

  return result
}

function unwrapObjectExpression(node: any): any | null {
  let current = node
  // Unwrap `{...} as PropertiesTableProps` / `satisfies` / parenthesised.
  while (
    current &&
    (current.type === 'TSAsExpression' ||
      current.type === 'TSSatisfiesExpression' ||
      current.type === 'TSTypeAssertion' ||
      current.type === 'ParenthesizedExpression')
  ) {
    current = current.expression
  }
  return current && current.type === 'ObjectExpression' ? current : null
}

function readObjectMember(
  prop: any
): { key: string; status: DocsStatus } | null {
  if (prop.type !== 'ObjectProperty' || prop.computed) {
    return null
  }

  let key: string | null = null
  if (prop.key.type === 'Identifier') {
    key = prop.key.name
  } else if (prop.key.type === 'StringLiteral') {
    key = prop.key.value
  }
  if (key === null) {
    return null
  }

  let status: DocsStatus = null
  const value = unwrapObjectExpression(prop.value)
  if (value) {
    for (const member of value.properties) {
      if (
        member.type === 'ObjectProperty' &&
        !member.computed &&
        ((member.key.type === 'Identifier' &&
          member.key.name === 'status') ||
          (member.key.type === 'StringLiteral' &&
            member.key.value === 'status')) &&
        member.value.type === 'StringLiteral'
      ) {
        status = member.value.value
        break
      }
    }
  }

  return { key, status }
}

/**
 * Derive per-prop/per-event version info from an ordered (oldest → newest)
 * history of a single `*Docs.ts` file.
 *
 * - `since` = release of the first entry the key appears in. Floored when the
 *   key already exists in the very first tracked commit (its true origin may
 *   predate structured docs) or when that commit is unreleased.
 * - `deprecatedIn` = release the key's status first became `deprecated`.
 * - `removedIn` = release the key disappeared and stayed absent through the
 *   latest entry (a prop removed from a still-existing component).
 */
export function deriveFileVersions(
  history: HistoryEntry[]
): ComponentVersionInfo {
  return {
    props: deriveKind(history, 'props'),
    events: deriveKind(history, 'events'),
  }
}

function deriveKind(
  history: HistoryEntry[],
  kind: 'props' | 'events'
): Record<string, PropVersionInfo> {
  const out: Record<string, PropVersionInfo> = {}
  if (history.length === 0) {
    return out
  }

  const allKeys = new Set<string>()
  for (const entry of history) {
    for (const key of Object.keys(entry.parsed[kind])) {
      allKeys.add(key)
    }
  }

  const lastIndex = history.length - 1

  for (const key of allKeys) {
    let firstSeenIndex = -1
    let deprecatedIndex = -1
    let removedIndex = -1
    let seen = false

    for (let i = 0; i < history.length; i++) {
      const present = Object.hasOwn(history[i].parsed[kind], key)
      if (present) {
        if (firstSeenIndex === -1) {
          firstSeenIndex = i
        }
        seen = true
        removedIndex = -1 // reset: it (re)appeared
        if (
          deprecatedIndex === -1 &&
          history[i].parsed[kind][key].status === 'deprecated'
        ) {
          deprecatedIndex = i
        }
      } else if (seen && removedIndex === -1) {
        removedIndex = i
      }
    }

    if (firstSeenIndex === -1) {
      continue
    }

    const info: PropVersionInfo = {
      since: history[firstSeenIndex].version,
    }

    // Floor when present at the first tracked commit, or when the first
    // release could not be resolved (unreleased commit).
    if (firstSeenIndex === 0) {
      info.sinceFloor = true
    }
    if (info.since === null) {
      info.pending = true
      info.sinceFloor = true
    }

    if (deprecatedIndex !== -1 && history[deprecatedIndex].version) {
      info.deprecatedIn = history[deprecatedIndex].version as string
    }

    // Only a removal that persists to the latest entry counts.
    const absentAtLatest = !Object.hasOwn(
      history[lastIndex].parsed[kind],
      key
    )
    if (removedIndex !== -1 && absentAtLatest && history[removedIndex].version) {
      info.removedIn = history[removedIndex].version as string
    }

    out[key] = info
  }

  return out
}

/** Merge two derived infos for the same component key (earliest `since` wins). */
export function mergeComponentVersions(
  a: ComponentVersionInfo | undefined,
  b: ComponentVersionInfo
): ComponentVersionInfo {
  if (!a) {
    return b
  }
  return {
    props: mergeKind(a.props, b.props),
    events: mergeKind(a.events, b.events),
  }
}

function mergeKind(
  a: Record<string, PropVersionInfo>,
  b: Record<string, PropVersionInfo>
): Record<string, PropVersionInfo> {
  const out: Record<string, PropVersionInfo> = { ...a }
  for (const [key, info] of Object.entries(b)) {
    const existing = out[key]
    if (!existing) {
      out[key] = info
      continue
    }
    out[key] =
      compareSemverSafe(info.since, existing.since) < 0 ? info : existing
  }
  return out
}

/**
 * Merge inferred version metadata into extracted doc entries. Author
 * annotations always win; inferred values only fill gaps and are marked with
 * `sinceInferred` / `sinceFloor` so consumers can tell them apart.
 */
export function applyVersionMetadata(
  props: DocEntryMap,
  events: DocEntryMap,
  componentMeta: ComponentVersionInfo | undefined
): void {
  if (!componentMeta) {
    return
  }
  applyKind(props, componentMeta.props)
  applyKind(events, componentMeta.events)
}

function applyKind(
  map: DocEntryMap,
  inferred: Record<string, PropVersionInfo>
): void {
  for (const [name, entry] of Object.entries(map)) {
    const info = inferred[name]
    if (!info) {
      continue
    }

    // `since`: author annotation wins; otherwise use the inferred value.
    if ((entry.since === undefined || entry.since === null) && info.since) {
      entry.since = info.since
      entry.sinceInferred = true
      if (info.sinceFloor) {
        entry.sinceFloor = true
      }
    }

    if (
      (entry.deprecatedIn === undefined || entry.deprecatedIn === null) &&
      info.deprecatedIn
    ) {
      entry.deprecatedIn = info.deprecatedIn
    }

    if (
      (entry.removedIn === undefined || entry.removedIn === null) &&
      info.removedIn
    ) {
      entry.removedIn = info.removedIn
    }
  }
}

// --- Migration index ---------------------------------------------------------

export type MigrationChange = {
  component: string
  componentName?: string
  kind: 'component' | 'prop' | 'event'
  name: string
  note?: string
  since?: string
  sinceInferred?: boolean
  sinceFloor?: boolean
}

export type MigrationVersionBucket = {
  added: MigrationChange[]
  deprecated: MigrationChange[]
  removed: MigrationChange[]
}

export type MigrationsIndex = {
  schemaVersion: number
  eufemiaVersion: string
  generatedAt: string
  versions: Record<string, MigrationVersionBucket>
}

/** Minimal shape of a built component metadata entry needed for aggregation. */
export type ComponentForMigration = {
  id: string
  name?: string
  props?: Array<Record<string, any>>
  events?: Array<Record<string, any>>
}

/**
 * Build the aggregation input for one component. Starts from the currently
 * documented props/events (which carry author annotations merged over
 * inference) and folds back entries that were *removed* — those no longer
 * exist in the current docs, so they must come from the inferred history or
 * the migration index would never surface removals (e.g. the snake_case →
 * camelCase rename that dropped hundreds of props in a single release).
 */
export function buildMigrationComponent(
  meta: {
    id: string
    name?: string
    props?: Array<Record<string, any>>
    events?: Array<Record<string, any>>
  },
  componentMeta: ComponentVersionInfo | undefined
): ComponentForMigration {
  const props = [...(meta.props || [])]
  const events = [...(meta.events || [])]

  if (componentMeta) {
    appendRemoved(props, meta.props || [], componentMeta.props)
    appendRemoved(events, meta.events || [], componentMeta.events)
  }

  return { id: meta.id, name: meta.name, props, events }
}

function appendRemoved(
  target: Array<Record<string, any>>,
  current: Array<Record<string, any>>,
  inferred: Record<string, PropVersionInfo>
): void {
  const present = new Set(current.map((e) => String(e.name)))
  for (const [name, info] of Object.entries(inferred)) {
    if (info.removedIn && !present.has(name)) {
      target.push({
        name,
        since: info.since ?? undefined,
        sinceInferred: true,
        sinceFloor: info.sinceFloor || undefined,
        deprecatedIn: info.deprecatedIn,
        removedIn: info.removedIn,
      })
    }
  }
}

/**
 * Aggregate enriched component metadata into a per-version migration index:
 * what was added, deprecated, and removed in each release.
 */
export function buildMigrationsIndex(
  components: ComponentForMigration[],
  opts: { eufemiaVersion: string; generatedAt: string }
): MigrationsIndex {
  const versions: Record<string, MigrationVersionBucket> = {}

  const bucket = (version: string): MigrationVersionBucket => {
    if (!versions[version]) {
      versions[version] = { added: [], deprecated: [], removed: [] }
    }
    return versions[version]
  }

  for (const component of components) {
    const componentSinceCandidates: Array<{
      since: string
      inferred?: boolean
      floor?: boolean
    }> = []

    const handleList = (
      list: Array<Record<string, any>> | undefined,
      kind: 'prop' | 'event'
    ) => {
      for (const entry of list || []) {
        const name = String(entry.name)
        const base: MigrationChange = {
          component: component.id,
          componentName: component.name,
          kind,
          name,
        }

        if (entry.since) {
          bucket(entry.since).added.push({
            ...base,
            since: entry.since,
            sinceInferred: entry.sinceInferred || undefined,
            sinceFloor: entry.sinceFloor || undefined,
          })
          componentSinceCandidates.push({
            since: entry.since,
            inferred: entry.sinceInferred,
            floor: entry.sinceFloor,
          })
        }

        if (entry.deprecatedIn) {
          bucket(entry.deprecatedIn).deprecated.push({
            ...base,
            note: extractReplacementNote(entry.doc),
          })
        }

        if (entry.removedIn) {
          bucket(entry.removedIn).removed.push({
            ...base,
            note: extractReplacementNote(entry.doc),
          })
        }
      }
    }

    handleList(component.props, 'prop')
    handleList(component.events, 'event')

    // Component-level "added" = earliest release across its members.
    if (componentSinceCandidates.length > 0) {
      const earliest = componentSinceCandidates.reduce((a, b) =>
        compareSemverSafe(a.since, b.since) <= 0 ? a : b
      )
      bucket(earliest.since).added.push({
        component: component.id,
        componentName: component.name,
        kind: 'component',
        name: component.name || component.id,
        since: earliest.since,
        sinceInferred: earliest.inferred || undefined,
        sinceFloor: earliest.floor || undefined,
      })
    }
  }

  // Stable ordering: sort each bucket and rebuild versions in semver order.
  const orderedVersions: Record<string, MigrationVersionBucket> = {}
  for (const version of Object.keys(versions).sort(compareSemver)) {
    const b = versions[version]
    b.added.sort(compareChange)
    b.deprecated.sort(compareChange)
    b.removed.sort(compareChange)
    orderedVersions[version] = b
  }

  return {
    schemaVersion: 1,
    eufemiaVersion: opts.eufemiaVersion,
    generatedAt: opts.generatedAt,
    versions: orderedVersions,
  }
}

function compareChange(a: MigrationChange, b: MigrationChange): number {
  return (
    a.component.localeCompare(b.component) ||
    a.kind.localeCompare(b.kind) ||
    a.name.localeCompare(b.name)
  )
}

/**
 * Best-effort extraction of a replacement hint from a doc string, e.g.
 * "use `newProp` instead" or "replaced by `newProp`". Returns undefined when
 * no obvious hint is found.
 */
export function extractReplacementNote(
  doc: string | null | undefined
): string | undefined {
  if (!doc) {
    return undefined
  }
  const patterns = [
    /use\s+`([^`]+)`\s+instead/i,
    /replaced\s+by\s+`([^`]+)`/i,
    /use\s+`([^`]+)`/i,
    /deprecated[^.]*use\s+`([^`]+)`/i,
  ]
  for (const re of patterns) {
    const m = re.exec(doc)
    if (m) {
      return `Use \`${m[1]}\` instead.`
    }
  }
  return undefined
}

// --- semver helpers (no external dependency) ---------------------------------

/** Parse `x.y.z` (ignoring any pre-release/build suffix). Returns null if invalid. */
export function parseSemver(
  version: string | null | undefined
): [number, number, number] | null {
  if (!version) {
    return null
  }
  const m = /^v?(\d+)\.(\d+)\.(\d+)/.exec(String(version).trim())
  if (!m) {
    return null
  }
  return [Number(m[1]), Number(m[2]), Number(m[3])]
}

/** Compare two semver strings. Non-parseable values sort last. */
export function compareSemver(a: string, b: string): number {
  const pa = parseSemver(a)
  const pb = parseSemver(b)
  if (!pa && !pb) {
    return a.localeCompare(b)
  }
  if (!pa) {
    return 1
  }
  if (!pb) {
    return -1
  }
  for (let i = 0; i < 3; i++) {
    if (pa[i] !== pb[i]) {
      return pa[i] - pb[i]
    }
  }
  return 0
}

/** Like {@link compareSemver} but tolerant of null (null sorts last). */
export function compareSemverSafe(
  a: string | null,
  b: string | null
): number {
  if (a === null && b === null) {
    return 0
  }
  if (a === null) {
    return 1
  }
  if (b === null) {
    return -1
  }
  return compareSemver(a, b)
}
