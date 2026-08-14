/**
 * DocsSource is a tiny filesystem abstraction used by the MCP docs tools.
 *
 * The MCP server reads docs through `createNodeDocsSource(rootAbs)`, which
 * reads from disk via `node:fs` (used by both the stdio server and the local
 * Express HTTP server).
 *
 * Keeping the surface small makes it trivial to add another backend later
 * without touching the tool handlers.
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
   * Human-readable label for log lines (e.g. "node:/abs/path").
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
// Node.js implementation. Lazy-imports `node:fs` / `node:path` so that this
// module can also be loaded in environments without Node built-ins.
// ---------------------------------------------------------------------------

export async function createNodeDocsSource(
  rootAbs: string
): Promise<DocsSource> {
  const [{ default: fs }, { default: path }] = await Promise.all([
    import('node:fs/promises'),
    import('node:path'),
  ])

  const root = path.resolve(rootAbs)
  const realRoot = await fs.realpath(root).catch(() => root)

  function resolveInside(relPath: string) {
    const cleaned = normalizeDocsPath(relPath)
    const abs = path.resolve(root, cleaned)
    const rel = path.relative(root, abs)
    if (rel.startsWith('..') || path.isAbsolute(rel)) {
      throw new Error(`Path escapes docs root: ${relPath}`)
    }
    return abs
  }

  async function realInside(abs: string): Promise<string | null> {
    try {
      const real = await fs.realpath(abs)
      const relative = path.relative(realRoot, real)

      if (
        relative !== '' &&
        (relative.startsWith('..') || path.isAbsolute(relative))
      ) {
        return null
      }

      return real
    } catch {
      return null
    }
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

        if (entry.isSymbolicLink()) {
          const real = await realInside(path.join(root, relPath))
          if (!real) {
            continue
          }

          const stats = await statSafe(real)
          if (stats?.isDirectory()) {
            continue
          }
        }

        if (
          (entry.isFile() || entry.isSymbolicLink()) &&
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
      const real = await realInside(abs)
      if (!real) {
        return null
      }

      const st = await statSafe(real)
      if (!st?.isFile()) {
        return null
      }
      const buf = await fs.readFile(real)
      return buf.toString('utf8')
    },

    async stat(relPath: string) {
      let abs: string
      try {
        abs = resolveInside(relPath)
      } catch {
        return { kind: 'missing' }
      }
      const real = await realInside(abs)
      if (!real) {
        return { kind: 'missing' }
      }

      const st = await statSafe(real)
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
        const real = await realInside(abs)
        if (!real) {
          return []
        }

        const items = await fs.readdir(real)
        return items.slice(0, max)
      } catch {
        return []
      }
    },
  }
}
