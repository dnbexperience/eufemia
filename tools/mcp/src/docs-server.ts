import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

import {
  createNodeDocsSource,
  normalizeDocsPath,
  type DocsSource,
} from './docs-source.js'

type ToolResult = {
  content: Array<{ type: 'text'; text: string }>
}

type ResolvedComponent = {
  name: string
  doc: string
  docExists: boolean
  properties: string
  propertiesExists: boolean
  events: string
  eventsExists: boolean
  slug: string | null
  fromIndex: boolean
}

type SearchHit = {
  path: string
  score: number
  occurrences: number
  snippet: string
}

type DocsMeta = {
  eufemiaVersion: string
  generatedAt: string
  commit: string
}

const EmptyInput = z.object({})

const DocsReadInput = z.object({
  path: z
    .string()
    .min(1)
    .describe(
      'Path relative to docs root, for example /uilib/components/button.md'
    ),
})

const DocsSearchInput = z.object({
  query: z.any().describe('Search query (string recommended).'),
  limit: z.number().int().min(1).max(50).default(10),
  prefix: z
    .string()
    .optional()
    .describe('Optional prefix filter (e.g. /uilib/components/)'),
})

const DocsListInput = z.object({
  prefix: z.string().optional(),
  limit: z.number().int().min(1).max(500).default(200),
})

const ComponentNameInput = z.object({
  name: z.string().min(1).describe('Component name, for example Button'),
})

function makeTextResult(text: string): ToolResult {
  return {
    content: [{ type: 'text', text }],
  }
}

function withLeadingSlash(value: string): string {
  if (!value) {
    return '/'
  }

  return value.startsWith('/') ? value : `/${value}`
}

function normalizeName(value: unknown): string {
  return String(value ?? '')
    .trim()
    .toLowerCase()
}

function extractFrontmatterLinks(markdown: string) {
  const match = String(markdown).match(/^---\s*\n([\s\S]*?)\n---\s*\n/)
  if (!match || typeof match[1] !== 'string') {
    return null
  }

  const lines = match[1].split('\n').map((line) => line.trim())
  const readLine = (key: string) => {
    const line = lines.find((entry) => entry.startsWith(`${key}:`))
    if (!line) {
      return null
    }

    const value = line.split(':').slice(1).join(':').trim()
    return value.replace(/^['"]|['"]$/g, '')
  }

  return {
    doc: readLine('doc'),
    properties: readLine('properties'),
    events: readLine('events'),
  }
}

function conventionalDocPaths(name: string): string[] {
  if (name.includes('.')) {
    const [rawPrefix, ...rest] = name.split('.')
    const prefix = rawPrefix?.toLowerCase()
    const componentName = rest.join('.')
    const capitalizedName =
      componentName.charAt(0).toUpperCase() + componentName.slice(1)

    if (prefix === 'field') {
      return [
        `/uilib/extensions/forms/feature-fields/${capitalizedName}.mdx`,
        `/uilib/extensions/forms/feature-fields/${capitalizedName}.md`,
        `/uilib/extensions/forms/base-fields/${capitalizedName}.mdx`,
        `/uilib/extensions/forms/base-fields/${capitalizedName}.md`,
      ]
    }

    if (prefix === 'value') {
      return [
        `/uilib/extensions/forms/Value/${capitalizedName}.mdx`,
        `/uilib/extensions/forms/Value/${capitalizedName}.md`,
      ]
    }

    if (prefix === 'form') {
      return [
        `/uilib/extensions/forms/Form/${capitalizedName}.mdx`,
        `/uilib/extensions/forms/Form/${capitalizedName}.md`,
      ]
    }

    const safePrefix = rawPrefix ?? 'forms'
    return [
      `/uilib/extensions/forms/${safePrefix}/${capitalizedName}.mdx`,
      `/uilib/extensions/forms/${safePrefix}/${capitalizedName}.md`,
    ]
  }

  return [`/uilib/components/${normalizeName(name)}.md`]
}

function extractJsonBlocks(markdown: string): Array<unknown> {
  const blocks: Array<unknown> = []
  const regex = /```json\s*([\s\S]*?)```/gi
  let match: RegExpExecArray | null = null

  while ((match = regex.exec(markdown))) {
    const raw = match[1]?.trim()
    if (!raw) {
      continue
    }

    try {
      blocks.push(JSON.parse(raw))
    } catch {
      // ignore invalid JSON blocks
    }
  }

  return blocks
}

export async function validateDocsSource(
  source: DocsSource
): Promise<void> {
  const llmStat = await source.stat('llm.md')
  const markdownFiles = await source.listMarkdown()

  if (llmStat.kind !== 'file' || markdownFiles.length === 0) {
    throw new Error(
      `Eufemia docs source is empty or unbuilt: ${source.label}\n` +
        `  Found ${markdownFiles.length} markdown file(s); llm.md present: ${llmStat.kind === 'file'}.\n` +
        '  Run `yarn workspace @dnb/eufemia build:docs` before starting this MCP server.'
    )
  }
}

export async function validateDocsRoot(
  docsRootAbs: string
): Promise<void> {
  const fs = await import('node:fs/promises')

  let stats: Awaited<ReturnType<typeof fs.stat>> | null = null
  try {
    stats = await fs.stat(docsRootAbs)
  } catch {
    stats = null
  }

  if (!stats) {
    throw new Error(
      `Eufemia docs root does not exist: ${docsRootAbs}\n` +
        '  Set EUFEMIA_DOCS_ROOT to an absolute path containing built docs, or run `yarn workspace @dnb/eufemia build:docs`.'
    )
  }

  if (!stats.isDirectory()) {
    throw new Error(`Eufemia docs root is not a directory: ${docsRootAbs}`)
  }

  const source = await createNodeDocsSource(docsRootAbs)
  await validateDocsSource(source)
}

function createDocsContext(source: DocsSource) {
  let cachedMarkdownFiles: string[] | null = null
  let cachedAt = 0
  const ttlMs = 30_000
  const contentCache = new Map<string, string | null>()

  async function readCached(filePath: string): Promise<string | null> {
    if (contentCache.has(filePath)) {
      return contentCache.get(filePath) ?? null
    }

    const text = await source.read(filePath)
    contentCache.set(filePath, text)
    return text
  }

  async function getMarkdownFilesCached(prefix?: string) {
    const now = Date.now()

    if (!cachedMarkdownFiles || now - cachedAt > ttlMs) {
      cachedMarkdownFiles = (await source.listMarkdown()).map((filePath) =>
        withLeadingSlash(filePath)
      )
      cachedAt = now
      contentCache.clear()
    }

    if (!prefix) {
      return cachedMarkdownFiles
    }

    const normalizedPrefix = withLeadingSlash(
      normalizeDocsPath(prefix)
    ).replace(/\/?$/, '/')

    return cachedMarkdownFiles.filter((filePath) =>
      filePath.startsWith(normalizedPrefix)
    )
  }

  async function resolveComponentPaths(
    name: string
  ): Promise<ResolvedComponent> {
    const candidates = conventionalDocPaths(name)
    let doc: string | null = null
    const slug: string | null = null

    for (const candidate of candidates) {
      try {
        const stats = await source.stat(candidate)
        if (stats.kind === 'file') {
          doc = candidate
          break
        }

        if (stats.kind === 'dir') {
          const tryMd = candidate.replace(/\.(mdx?)?$/, '') + '.md'
          const tryMdx = candidate.replace(/\.(mdx?)?$/, '') + '.mdx'
          for (const tryPath of [tryMd, tryMdx]) {
            const trySt = await source.stat(tryPath)
            if (trySt.kind === 'file') {
              doc = tryPath
              break
            }
          }

          if (doc) {
            break
          }
        }
      } catch {
        continue
      }
    }

    if (!doc) {
      doc = candidates[0] ?? `/uilib/components/${normalizeName(name)}.md`
    }

    let properties: string | null = null
    let events: string | null = null

    try {
      const markdown = await readCached(doc)
      if (markdown) {
        const links = extractFrontmatterLinks(markdown)
        if (links?.properties) {
          properties = links.properties
        }
        if (links?.events) {
          events = links.events
        }
      }
    } catch {
      // ignore
    }

    if (!properties) {
      properties = doc
    }
    if (!events) {
      events = doc
    }

    const docExists = (await source.stat(doc)).kind === 'file'
    const propertiesExists =
      (await source.stat(properties)).kind === 'file'
    const eventsExists = (await source.stat(events)).kind === 'file'

    return {
      name,
      doc,
      docExists,
      properties,
      propertiesExists,
      events,
      eventsExists,
      slug,
      fromIndex: false,
    }
  }

  async function searchInMarkdown(
    query: unknown,
    limit: number,
    prefix?: string,
    opts: { concurrency?: number; timeoutMs?: number } = {}
  ): Promise<SearchHit[]> {
    const q = String(query ?? '').trim()
    if (q.length < 2) {
      return []
    }

    const searchTerms = q
      .toLowerCase()
      .split(/\s+/)
      .filter((term) => term.length > 0)

    if (searchTerms.length === 0) {
      return []
    }

    const files = await getMarkdownFilesCached(prefix)

    const concurrency = Math.max(
      1,
      Math.min(32, Number(opts.concurrency ?? 12))
    )
    const timeoutMs = Math.max(
      200,
      Math.min(15_000, Number(opts.timeoutMs ?? 2000))
    )
    const deadline = Date.now() + timeoutMs

    const hits: SearchHit[] = []
    let cursor = 0
    let stopped = false

    async function worker() {
      while (!stopped) {
        if (Date.now() > deadline) {
          stopped = true
          return
        }

        const i = cursor++
        if (i >= files.length) {
          return
        }

        const filePath = files[i]!
        let text: string | null = null
        try {
          text = await source.read(filePath)
        } catch {
          continue
        }
        if (text === null) {
          continue
        }

        const lower = text.toLowerCase()

        if (searchTerms.length === 1) {
          const term = searchTerms[0]!
          const idx = lower.indexOf(term)
          if (idx === -1) {
            continue
          }

          const occurrences = lower.split(term).length - 1
          const score = Math.max(1, 1000 - idx) + occurrences * 25
          const snippetStart = Math.max(0, idx - 80)
          const snippetEnd = Math.min(text.length, idx + term.length + 220)

          hits.push({
            path: filePath,
            score,
            occurrences,
            snippet: text
              .slice(snippetStart, snippetEnd)
              .replace(/\s+/g, ' ')
              .trim(),
          })
        } else {
          const wordMatches: Array<{ word: string; indices: number[] }> =
            []
          let allWordsFound = true

          for (const word of searchTerms) {
            const indices: number[] = []
            let searchIdx = 0
            while (true) {
              const idx = lower.indexOf(word, searchIdx)
              if (idx === -1) {
                break
              }
              indices.push(idx)
              searchIdx = idx + 1
            }

            if (indices.length === 0) {
              allWordsFound = false
              break
            }

            wordMatches.push({ word, indices })
          }

          if (!allWordsFound) {
            continue
          }

          const firstMatchIdx = Math.min(
            ...wordMatches.map((m) => m.indices[0]!)
          )
          const totalOccurrences = wordMatches.reduce(
            (sum, m) => sum + m.indices.length,
            0
          )

          let proximityScore = 0
          if (wordMatches.length > 1) {
            const allIndices = wordMatches.flatMap((m) =>
              m.indices.map((idx) => ({ word: m.word, idx }))
            )
            allIndices.sort((a, b) => a.idx - b.idx)

            const wordSet = new Set(searchTerms)
            let minSpan = Infinity
            for (let i = 0; i < allIndices.length; i++) {
              const foundWords = new Set<string>()
              for (let j = i; j < allIndices.length; j++) {
                foundWords.add(allIndices[j]!.word)
                if (foundWords.size === wordSet.size) {
                  const span = allIndices[j]!.idx - allIndices[i]!.idx
                  minSpan = Math.min(minSpan, span)
                  break
                }
              }
            }

            proximityScore =
              minSpan < Infinity ? 1000 / (1 + minSpan / 10) : 0
          }

          const score =
            Math.max(1, 1000 - firstMatchIdx) +
            totalOccurrences * 25 +
            proximityScore

          const snippetStart = Math.max(0, firstMatchIdx - 80)
          const snippetEnd = Math.min(
            text.length,
            firstMatchIdx + searchTerms.join(' ').length + 220
          )

          hits.push({
            path: filePath,
            score,
            occurrences: totalOccurrences,
            snippet: text
              .slice(snippetStart, snippetEnd)
              .replace(/\s+/g, ' ')
              .trim(),
          })
        }

        if (hits.length >= limit * 3) {
          stopped = true
          return
        }
      }
    }

    await Promise.all(Array.from({ length: concurrency }, () => worker()))
    hits.sort((left, right) => right.score - left.score)
    return hits.slice(0, limit)
  }

  return {
    getMarkdownFilesCached,
    readCached,
    resolveComponentPaths,
    searchInMarkdown,
    source,
  }
}

async function readDocsMeta(source: DocsSource): Promise<DocsMeta> {
  const raw = await source.read('_meta.json')
  if (raw) {
    try {
      return JSON.parse(raw) as DocsMeta
    } catch {
      // keep fallback meta
    }
  }

  return {
    eufemiaVersion: '0.0.0-development',
    generatedAt: '',
    commit: '',
  }
}

function registerDocsTools(server: McpServer, source: DocsSource): void {
  const context = createDocsContext(source)

  server.registerTool(
    'docs_entry',
    {
      title: 'Docs entry',
      description:
        'IMPORTANT! Primary entrypoint to the Eufemia documentation. Before implementing any Eufemia-based features or examples, call mcp_eufemia_docs_entry to understand the docs structure, and learn how to use the other MCP tools correctly; then use mcp_eufemia_docs_search and mcp_eufemia_docs_read to fetch relevant documentation. Make sure you have located and carefully read the relevant getting started or first-steps documentation before you implement any examples or code snippets based on these docs. Always follow these guidelines when using the documentation: use the documentation exactly as provided; gather all required information from the documentation before using it as a reference; and do not make assumptions or infer missing details unless the documentation or user explicitly instructs you to do so.',
      inputSchema: EmptyInput.shape,
    },
    async () => {
      const text = await context.readCached('llm.md')
      return makeTextResult(text ?? 'llm.md not found in docs root.')
    }
  )

  server.registerTool(
    'docs_index',
    {
      title: 'Docs index',
      description:
        'Return a JSON array of all known markdown and MDX documentation files under the docs root, without filtering. Use this when you need a complete, machine-readable overview of available docs paths (for example to cache, pre-index, or sanity-check the docs structure) rather than when you are looking for a specific document.',
      inputSchema: EmptyInput.shape,
    },
    async () => {
      const files = await context.getMarkdownFilesCached()
      return makeTextResult(JSON.stringify(files, null, 2))
    }
  )

  server.registerTool(
    'docs_list',
    {
      title: 'List docs',
      description:
        'List markdown and MDX documentation files under an optional prefix, returning a JSON array of relative paths. Use this when you know the high-level area of the docs (for example `/uilib/components/` or `/uilib/extensions/forms/`) and want to discover which specific files exist there, before choosing a concrete path to read with docs_read.',
      inputSchema: DocsListInput.shape,
    },
    async ({ prefix, limit }) => {
      const files = await context.getMarkdownFilesCached(prefix)
      return makeTextResult(JSON.stringify(files.slice(0, limit), null, 2))
    }
  )

  server.registerTool(
    'docs_read',
    {
      title: 'Read docs file',
      description:
        'Read the raw markdown or MDX content of a single documentation file, given its path relative to the docs root (for example `/uilib/components/button.md`). If the path points to a directory instead of a file, the tool returns a structured JSON payload with an error code, a list of child entries, and suggested file paths you can try instead. Use this when you already know or have discovered a specific path and need the full document content.',
      inputSchema: DocsReadInput.shape,
    },
    async ({ path: userPath }) => {
      let normalizedPath: string
      try {
        normalizedPath = normalizeDocsPath(userPath)
      } catch (error) {
        return makeTextResult(
          `Invalid path: ${error instanceof Error ? error.message : String(error)}`
        )
      }

      const relWithLeadingSlash = withLeadingSlash(normalizedPath)
      const stats = await context.source.stat(normalizedPath)

      if (stats.kind === 'missing') {
        const base = relWithLeadingSlash.replace(/\/+$/, '')
        const mdGuess = `${base}.md`

        let mdExists = false
        try {
          mdExists = (await context.source.stat(mdGuess)).kind === 'file'
        } catch {
          mdExists = false
        }

        return makeTextResult(
          JSON.stringify(
            {
              error: 'ENOENT',
              message: 'Not found.',
              path: relWithLeadingSlash,
              suggestions: mdExists ? [mdGuess] : [],
            },
            null,
            2
          )
        )
      }

      if (stats.kind === 'dir') {
        const children = await context.source.listDir(normalizedPath, 60)
        const base = relWithLeadingSlash.replace(/\/+$/, '')

        const guessList = [
          `${base}.md`,
          `${base}/README.md`,
          `${base}/index.md`,
          `${base}/info.md`,
          `${base}/demos.md`,
        ]

        const childCandidates = [
          'README.md',
          'index.md',
          'info.md',
          'demos.md',
        ]
          .filter((f) => children.includes(f))
          .map((f) => `${base}/${f}`)

        const suggestions: string[] = []
        for (const s of [...guessList, ...childCandidates]) {
          try {
            const sSt = await context.source.stat(s)
            if (sSt.kind === 'file') {
              suggestions.push(s)
            }
          } catch {
            // ignore
          }
        }

        return makeTextResult(
          JSON.stringify(
            {
              error: 'EISDIR',
              message: 'Path is a directory. Provide a file path.',
              path: relWithLeadingSlash,
              suggestions: Array.from(new Set(suggestions)).slice(0, 30),
              children,
            },
            null,
            2
          )
        )
      }

      const text = await context.readCached(normalizedPath)
      if (text === null) {
        return makeTextResult(
          JSON.stringify(
            {
              error: 'ENOENT',
              message: 'Not found.',
              path: relWithLeadingSlash,
            },
            null,
            2
          )
        )
      }

      return makeTextResult(text)
    }
  )

  server.registerTool(
    'docs_search',
    {
      title: 'Search docs',
      description:
        'Search across all markdown and MDX documentation using a free-text query, returning a JSON array of ranked matches with relevance scores and text snippets. Use this when you know what you are looking for conceptually (for example a component, feature, or concept name), but you do not know the exact file path yet. Prefer this after you have called the docs entry tool so you understand how the docs are structured. In particular, use this to find and read the appropriate getting started or first-steps documentation before you rely on any specific examples or code snippets.',
      inputSchema: DocsSearchInput.shape,
    },
    async ({ query, limit, prefix }) => {
      const hits = await context.searchInMarkdown(query, limit, prefix, {
        concurrency: 12,
        timeoutMs: 5000,
      })
      return makeTextResult(JSON.stringify(hits, null, 2))
    }
  )

  server.registerTool(
    'component_find',
    {
      title: 'Find component',
      description:
        "Resolve the documentation paths for a single Eufemia component by its name (for example 'Button', 'Field.Address', or 'Value.Address'). Returns a JSON object that includes the doc, properties, and events paths plus existence flags. Use this when you are starting from a component name and need to know which documentation files to read or inspect next.",
      inputSchema: ComponentNameInput.shape,
    },
    async ({ name }) => {
      const info = await context.resolveComponentPaths(name)
      return makeTextResult(JSON.stringify(info, null, 2))
    }
  )

  server.registerTool(
    'component_doc',
    {
      title: 'Component doc',
      description:
        "Return the full markdown or MDX documentation for a single Eufemia component, identified by its name (for example 'Button' or 'Field.Address'). Use this when you need to read the human-facing docs for a component, including narrative text, examples, and API, property, event and translation descriptions, rather than just the structured JSON blocks. Before implementing any examples from these docs, make sure you have already read the relevant getting started or first-steps documentation so you apply the examples in the correct way and context.",
      inputSchema: ComponentNameInput.shape,
    },
    async ({ name }) => {
      const info = await context.resolveComponentPaths(name)
      const text = await context.readCached(info.doc)
      return makeTextResult(text ?? `Component doc not found: ${info.doc}`)
    }
  )

  server.registerTool(
    'component_api',
    {
      title: 'Component API',
      description:
        'Extract and return all JSON code blocks from the component documentation markdown (for example structured API metadata embedded in ```json fences). Use this when you need a machine-readable representation of a component\u2019s API or metadata, such as props or events, and you prefer to work with parsed JSON rather than free-form markdown.',
      inputSchema: ComponentNameInput.shape,
    },
    async ({ name }) => {
      const info = await context.resolveComponentPaths(name)
      const text = await context.readCached(info.doc)

      if (text === null) {
        return makeTextResult(
          JSON.stringify(
            {
              error: 'ENOENT',
              message: 'component doc not found',
              doc: info.doc,
            },
            null,
            2
          )
        )
      }

      return makeTextResult(
        JSON.stringify(
          {
            doc: info.doc,
            jsonBlocks: extractJsonBlocks(text),
          },
          null,
          2
        )
      )
    }
  )

  server.registerTool(
    'component_props',
    {
      title: 'Component props',
      description:
        'Return the structured JSON blocks describing a component\u2019s properties and events, as derived from its main documentation file. Use this when you specifically need the props- and events-level schema or configuration for a component, rather than the full documentation text, and want to drive code generation, validation, or other automated reasoning from that data.',
      inputSchema: ComponentNameInput.shape,
    },
    async ({ name }) => {
      const info = await context.resolveComponentPaths(name)
      const text = await context.readCached(info.doc)

      if (text === null) {
        return makeTextResult(
          JSON.stringify(
            {
              error: 'ENOENT',
              message: 'component doc not found',
              doc: info.doc,
            },
            null,
            2
          )
        )
      }

      return makeTextResult(
        JSON.stringify(extractJsonBlocks(text), null, 2)
      )
    }
  )
}

export async function createDocsServer(options: {
  docsRoot: string
}): Promise<{ server: McpServer }> {
  const source = await createNodeDocsSource(options.docsRoot)
  const meta = await readDocsMeta(source)
  const server = new McpServer({
    name: 'eufemia',
    version: meta.eufemiaVersion || '0.0.0-development',
  })

  registerDocsTools(server, source)

  return { server }
}
