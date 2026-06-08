export type DocsEntryKind = 'file' | 'dir' | 'missing'

export type DocsEntry = {
  kind: DocsEntryKind
}

export type DocsSource = {
  listMarkdown(): Promise<string[]>
  read(relPath: string): Promise<string | null>
  stat(relPath: string): Promise<DocsEntry>
  listDir(relPath: string, max?: number): Promise<string[]>
  readonly label: string
}

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
    const relative = path.relative(root, abs)

    if (relative.startsWith('..') || path.isAbsolute(relative)) {
      throw new Error(`Path escapes docs root: ${relPath}`)
    }

    return abs
  }

  async function statSafe(abs: string) {
    try {
      return await fs.stat(abs)
    } catch {
      return null
    }
  }

  async function listMarkdown(): Promise<string[]> {
    const files: string[] = []
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
          if (entry.name !== 'node_modules') {
            stack.push(relPath)
          }
          continue
        }

        if (
          entry.isFile() &&
          (entry.name.toLowerCase().endsWith('.md') ||
            entry.name.toLowerCase().endsWith('.mdx'))
        ) {
          files.push(relPath.replaceAll(path.sep, '/'))
        }
      }
    }

    return files
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

      const stats = await statSafe(abs)
      if (!stats?.isFile()) {
        return null
      }

      const buffer = await fs.readFile(abs)
      return buffer.toString('utf8')
    },

    async stat(relPath: string) {
      let abs: string
      try {
        abs = resolveInside(relPath)
      } catch {
        return { kind: 'missing' }
      }

      const stats = await statSafe(abs)
      if (!stats) {
        return { kind: 'missing' }
      }

      if (stats.isFile()) {
        return { kind: 'file' }
      }

      if (stats.isDirectory()) {
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
