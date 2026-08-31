#!/usr/bin/env node

/**
 * Backfill `since` / `deprecatedIn` / `removedIn` for documented props and
 * events by walking git history of each current `*Docs.ts` file.
 *
 * For every file we read its content at each commit that touched it (at its
 * current path — no rename following, which git's heuristics get wrong for
 * these small similar files), parse the prop/event keys, and map the commit
 * to the earliest release that contains it via `git describe --contains`.
 * The pure derivation in `../src/versionMetadata.ts` turns that ordered
 * history into per-entry version info.
 *
 * Output: `tools/eufemia-llm-metadata/version-metadata.json`, keyed by the
 * `*Docs.ts` directory relative to `packages/dnb-eufemia/src`. This is a
 * cached artefact — the expensive git walk runs only when regenerating, not
 * on every docs build. Author annotations always take precedence at merge
 * time, so a slightly stale file never overrides a reviewed value.
 *
 * Usage: run from the repo root or the tool directory:
 *   node --experimental-strip-types scripts/generateVersionMetadata.ts
 */

import path from 'path'
import fs from 'fs'
import { execFileSync } from 'child_process'
import { pathToFileURL } from 'url'
import {
  parseDocsExports,
  deriveFileVersions,
  mergeComponentVersions,
  parseSemver,
  compareSemver,
  type ComponentVersionInfo,
  type HistoryEntry,
} from '../src/versionMetadata.ts'

const DOCS_FILE_RE = /Docs\.tsx?$/
const PKG_SRC = 'packages/dnb-eufemia/src'

function git(repoRoot: string, args: string[]): string {
  return execFileSync('git', ['-C', repoRoot, ...args], {
    encoding: 'utf-8',
    maxBuffer: 256 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'ignore'],
  })
}

function gitSafe(repoRoot: string, args: string[]): string | null {
  try {
    return git(repoRoot, args)
  } catch {
    return null
  }
}

function gitLines(repoRoot: string, args: string[]): string[] {
  return git(repoRoot, args)
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
}

function findRepoRoot(startDir: string): string {
  let current = startDir
  const root = path.parse(startDir).root
  while (true) {
    if (fs.existsSync(path.join(current, '.git'))) {
      return current
    }
    if (current === root) {
      break
    }
    current = path.dirname(current)
  }
  throw new Error('Could not resolve repo root (no .git found).')
}

/**
 * Build a `commit -> earliest release` map by walking release tags in semver
 * order and partitioning history into adjacent `prevTag..tag` ranges. Every
 * commit is assigned to the first (lowest-semver) release whose range contains
 * it. This is a single linear pass over history — far faster and more reliable
 * than `git describe --contains` per commit (which is pathologically slow for
 * commits not yet contained in any tag). Commits after the latest release are
 * absent from the map (treated as unreleased/pending).
 */
function buildCommitReleaseMap(repoRoot: string): {
  map: Map<string, string>
  latestTag: string | null
} {
  const tags = gitLines(repoRoot, ['tag', '--list', 'v[0-9]*'])
    .map((tag) => ({ tag, sv: parseSemver(tag) }))
    .filter((x): x is { tag: string; sv: [number, number, number] } =>
      Boolean(x.sv)
    )
    .sort((a, b) => compareSemver(a.tag, b.tag))

  const map = new Map<string, string>()
  let prev: string | null = null
  for (const { tag, sv } of tags) {
    const range = prev ? [`${prev}..${tag}`] : [tag]
    const commits = gitSafe(repoRoot, ['rev-list', ...range])
    if (commits) {
      const version = `${sv[0]}.${sv[1]}.${sv[2]}`
      for (const c of commits.split('\n')) {
        const commit = c.trim()
        if (commit && !map.has(commit)) {
          map.set(commit, version)
        }
      }
    }
    prev = tag
  }

  const latestTag = tags.length ? tags[tags.length - 1].tag : null
  return { map, latestTag }
}

function listDocsFiles(repoRoot: string): string[] {
  return gitLines(repoRoot, ['ls-tree', '-r', 'HEAD', '--name-only'])
    .filter((l) => DOCS_FILE_RE.test(l) && l.startsWith(`${PKG_SRC}/`))
    .sort()
}

/** Commits touching a path, oldest → newest, at the current path only. */
function commitsForPath(repoRoot: string, filePath: string): string[] {
  return gitLines(repoRoot, [
    'log',
    '--reverse',
    '--format=%H',
    '--',
    filePath,
  ])
}

function fileAtCommit(
  repoRoot: string,
  commit: string,
  filePath: string
): string | null {
  return gitSafe(repoRoot, ['show', `${commit}:${filePath}`])
}

async function main() {
  const repoRoot = findRepoRoot(process.cwd())
  console.log('[version-metadata] building commit → release map ...')
  const { map: releaseMap, latestTag } = buildCommitReleaseMap(repoRoot)
  const resolveVersion = (commit: string): string | null =>
    releaseMap.get(commit) ?? null

  const files = listDocsFiles(repoRoot)

  const components: Record<string, ComponentVersionInfo> = {}
  let parsedCommits = 0
  let pendingKeys = 0

  console.log(
    `[version-metadata] walking history of ${files.length} *Docs files ...`
  )

  for (const filePath of files) {
    const commits = commitsForPath(repoRoot, filePath)
    if (commits.length === 0) {
      continue
    }

    const history: HistoryEntry[] = []
    for (const commit of commits) {
      const source = fileAtCommit(repoRoot, commit, filePath)
      if (source === null) {
        continue
      }
      parsedCommits++
      history.push({
        version: resolveVersion(commit),
        parsed: parseDocsExports(source),
      })
    }

    if (history.length === 0) {
      continue
    }

    const derived = deriveFileVersions(history)
    for (const info of [
      ...Object.values(derived.props),
      ...Object.values(derived.events),
    ]) {
      if (info.pending) {
        pendingKeys++
      }
    }

    // Key by the *Docs directory relative to the package src root, matching
    // how the build resolves `tsDocsDir` at merge time.
    const relDir = path
      .relative(PKG_SRC, path.dirname(filePath))
      .split(path.sep)
      .join('/')
    components[relDir] = mergeComponentVersions(
      components[relDir],
      derived
    )
  }

  // Drop empty components to keep the artefact lean.
  const compact: Record<string, ComponentVersionInfo> = {}
  for (const [key, info] of Object.entries(components)) {
    if (
      Object.keys(info.props).length > 0 ||
      Object.keys(info.events).length > 0
    ) {
      compact[key] = sortComponentInfo(info)
    }
  }

  const output = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    latestTag,
    note: 'Inferred from git history of *Docs.ts files. Author annotations in *Docs.ts always take precedence at build time. `since` reflects the first release the entry appears in the structured docs; `sinceFloor` marks values that are "at or before" (present in the first tracked commit).',
    components: compact,
  }

  const outPath = path.join(
    repoRoot,
    'tools',
    'eufemia-llm-metadata',
    'version-metadata.json'
  )
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2) + '\n')

  console.log(
    `[version-metadata] done: ${
      Object.keys(compact).length
    } components, ${parsedCommits} commits parsed, ${pendingKeys} unreleased entries. Wrote ${path.relative(
      repoRoot,
      outPath
    )}`
  )
}

function sortComponentInfo(
  info: ComponentVersionInfo
): ComponentVersionInfo {
  const sortRecord = <T>(rec: Record<string, T>): Record<string, T> => {
    const out: Record<string, T> = {}
    for (const key of Object.keys(rec).sort()) {
      out[key] = rec[key]
    }
    return out
  }
  return {
    props: sortRecord(info.props),
    events: sortRecord(info.events),
  }
}

const isDirectRun = () => {
  const entry = process.argv[1]
  return entry ? import.meta.url === pathToFileURL(entry).href : false
}

if (isDirectRun()) {
  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}

export { main as generateVersionMetadata }
