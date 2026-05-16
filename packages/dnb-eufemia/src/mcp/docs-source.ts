/**
 * DocsSource is a tiny filesystem abstraction used by the MCP docs tools.
 *
 * The MCP server has two deployment targets:
 *
 * - Node.js (stdio + the local Express HTTP server) — uses
 *   `createNodeDocsSource(rootAbs)` which reads from disk via `node:fs`.
 *
 * - Cloudflare Workers — uses `createBundledDocsSource(bundle)` which is a
 *   pure in-memory implementation backed by a `path → content` map that the
 *   docs build step generates as `docs.bundle.json`.
 *
 * Keeping the surface small makes it trivial to add another backend (R2,
 * KV, S3, ...) later without touching the tool handlers.
 */

export type DocsEntryKind = 'file' | 'dir' | 'missing'

export type DocsEntry = {
  kind: DocsEntryKind
}

export type DocsSource = {
  /**
   * Returns markdown/MDX file paths relative to the docs root, normalised to
   * forward slashes and **without** a leading slash. Order is implementation
   * defined.
   */
  listMarkdown(): Promise<string[]>

  /**
   * Reads a single file given a path relative to the docs root.
   *
   * Returns `null` when the path does not exist or is not a regular file.
   * The path is normalised before lookup; a leading slash is allowed.
   */
  read(relPath: string): Promise<string | null>

  /**
   * Returns whether `relPath` is a file, directory, or missing.
   */
  stat(relPath: string): Promise<DocsEntry>

  /**
   * Lists the entries directly inside `relPath`. Returns an empty array if
   * `relPath` is missing or not a directory.
   */
  listDir(relPath: string, max?: number): Promise<string[]>

  /**
   * Human-readable label for log lines (e.g. "node:/abs/path" or "bundle").
   */
  readonly label: string
}

/**
 * Normalises a user-supplied path so it can safely be used as a key into the
 * docs source. Strips leading slashes, converts back-slashes, and rejects
 * paths that try to escape the docs root with `..`.
 */
export function normalizeDocsPath(input: unknown): string {
  const raw = String(input ?? '')
    .replace(/^\/+/, '')
    .replaceAll('\\', '/')
  const segments: string[] = []
  for (const segment of raw.split('/')) {
    if (segment === '' || segment === '.') {
      continue
    }
    if (segment === '..') {
      throw new Error(`Path escapes docs root: ${String(input)}`)
    }
    segments.push(segment)
  }
  return segments.join('/')
}

// ---------------------------------------------------------------------------
// Bundled (in-memory) implementation. Used by the Cloudflare Worker and tests.
// ---------------------------------------------------------------------------

export function createBundledDocsSource(
  bundle: Record<string, string>,
  options: { label?: string } = {}
): DocsSource {
  const files = new Map<string, string>()
  for (const [rawKey, value] of Object.entries(bundle)) {
    files.set(normalizeDocsPath(rawKey), value)
  }

  const dirs = new Set<string>()
  files.forEach((_value, key) => {
    const parts = key.split('/')
    for (let i = 1; i < parts.length; i++) {
      dirs.add(parts.slice(0, i).join('/'))
    }
  })
  // Empty string represents the root directory.
  dirs.add('')

  const markdown = Array.from(files.keys())
    .filter((p) => p.endsWith('.md') || p.endsWith('.mdx'))
    .sort()

  return {
    label: options.label ?? 'bundle',

    async listMarkdown() {
      return markdown
    },

    async read(relPath: string) {
      const key = normalizeDocsPath(relPath)
      const value = files.get(key)
      return typeof value === 'string' ? value : null
    },

    async stat(relPath: string) {
      const key = normalizeDocsPath(relPath)
      if (files.has(key)) {
        return { kind: 'file' }
      }
      if (dirs.has(key)) {
        return { kind: 'dir' }
      }
      return { kind: 'missing' }
    },

    async listDir(relPath: string, max = 60) {
      const key = normalizeDocsPath(relPath)
      if (!dirs.has(key)) {
        return []
      }
      const prefix = key === '' ? '' : `${key}/`
      const seen = new Set<string>()
      files.forEach((_value, filePath) => {
        if (!filePath.startsWith(prefix)) {
          return
        }
        const rest = filePath.slice(prefix.length)
        const next = rest.split('/')[0]
        if (next) {
          seen.add(next)
        }
      })
      dirs.forEach((dirPath) => {
        if (dirPath === key || dirPath === '') {
          return
        }
        if (!dirPath.startsWith(prefix)) {
          return
        }
        const rest = dirPath.slice(prefix.length)
        const next = rest.split('/')[0]
        if (next) {
          seen.add(next)
        }
      })
      return Array.from(seen).sort().slice(0, max)
    },
  }
}

// ---------------------------------------------------------------------------
// Node.js implementation. Lazy-imports `node:fs` / `node:path` so that this
// module can also be loaded in environments without Node built-ins (Workers).
// ---------------------------------------------------------------------------

export async function createNodeDocsSource(
  rootAbs: string
): Promise<DocsSource> {
  const [{ default: fs }, { default: path }] = await Promise.all([
    import('node:fs/promises'),
    import('node:path'),
  ])

  const root = path.resolve(rootAbs)

  function resolveInside(relPath: string) {
    const cleaned = normalizeDocsPath(relPath)
    const abs = path.resolve(root, cleaned)
    const rel = path.relative(root, abs)
    if (rel.startsWith('..') || path.isAbsolute(rel)) {
      throw new Error(`Path escapes docs root: ${relPath}`)
    }
    return abs
  }

  async function listMarkdown(): Promise<string[]> {
    const out: string[] = []
    const stack = ['']

    while (stack.length > 0) {
      const relDir = stack.pop() ?? ''
      const absDir = path.join(root, relDir)

      let entries
      try {
        entries = await fs.readdir(absDir, { withFileTypes: true })
      } catch {
        continue
      }

      for (const entry of entries) {
        if (entry.name.startsWith('.')) {
          continue
        }

        const relPath = path.join(relDir, entry.name)

        if (entry.isDirectory()) {
          if (entry.name === 'node_modules') {
            continue
          }
          stack.push(relPath)
          continue
        }

        if (
          entry.isFile() &&
          (entry.name.toLowerCase().endsWith('.md') ||
            entry.name.toLowerCase().endsWith('.mdx'))
        ) {
          out.push(relPath.replaceAll(path.sep, '/'))
        }
      }
    }

    return out
  }

  async function statSafe(abs: string) {
    try {
      return await fs.stat(abs)
    } catch {
      return null
    }
  }

  return {
    label: `node:${root}`,

    listMarkdown,

    async read(relPath: string) {
      let abs: string
      try {
        abs = resolveInside(relPath)
      } catch {
        return null
      }
      const st = await statSafe(abs)
      if (!st?.isFile()) {
        return null
      }
      const buf = await fs.readFile(abs)
      return buf.toString('utf8')
    },

    async stat(relPath: string) {
      let abs: string
      try {
        abs = resolveInside(relPath)
      } catch {
        return { kind: 'missing' }
      }
      const st = await statSafe(abs)
      if (!st) {
        return { kind: 'missing' }
      }
      if (st.isFile()) {
        return { kind: 'file' }
      }
      if (st.isDirectory()) {
        return { kind: 'dir' }
      }
      return { kind: 'missing' }
    },

    async listDir(relPath: string, max = 60) {
      let abs: string
      try {
        abs = resolveInside(relPath)
      } catch {
        return []
      }
      try {
        const items = await fs.readdir(abs)
        return items.slice(0, max)
      } catch {
        return []
      }
    },
  }
}
