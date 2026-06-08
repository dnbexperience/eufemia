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
  query: z.string().min(1).describe('Search query.'),
  limit: z.number().int().min(1).max(50).default(10),
  prefix: z.string().optional(),
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
    let doc =
      candidates[0] ?? `/uilib/components/${normalizeName(name)}.md`

    for (const candidate of candidates) {
      const stats = await source.stat(candidate)
      if (stats.kind === 'file') {
        doc = candidate
        break
      }
    }

    let properties = doc
    let events = doc

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

    const docExists = (await source.stat(doc)).kind === 'file'
    const propertiesExists =
      properties === doc
        ? docExists
        : (await source.stat(properties)).kind === 'file'
    const eventsExists =
      events === doc
        ? docExists
        : events === properties
          ? propertiesExists
          : (await source.stat(events)).kind === 'file'

    return {
      name,
      doc,
      docExists,
      properties,
      propertiesExists,
      events,
      eventsExists,
    }
  }

  async function searchInMarkdown(
    query: string,
    limit: number,
    prefix?: string
  ): Promise<SearchHit[]> {
    const searchTerms = query
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter((term) => term.length > 0)

    if (searchTerms.length === 0) {
      return []
    }

    const files = await getMarkdownFilesCached(prefix)
    const hits: SearchHit[] = []

    for (const filePath of files) {
      const text = await readCached(filePath)
      if (text === null) {
        continue
      }

      const lower = text.toLowerCase()
      const indices = searchTerms.map((term) => lower.indexOf(term))
      if (indices.some((index) => index === -1)) {
        continue
      }

      const firstIndex = Math.min(...indices)
      const occurrences = searchTerms.reduce((sum, term) => {
        return sum + lower.split(term).length - 1
      }, 0)
      const snippetStart = Math.max(0, firstIndex - 80)
      const snippetEnd = Math.min(text.length, firstIndex + 220)

      hits.push({
        path: filePath,
        score: Math.max(1, 1000 - firstIndex) + occurrences * 25,
        occurrences,
        snippet: text
          .slice(snippetStart, snippetEnd)
          .replace(/\s+/g, ' ')
          .trim(),
      })
    }

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
        'Primary entrypoint to the Eufemia docs. Read this first to understand the docs structure.',
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
        'Return all markdown and MDX file paths in the docs root.',
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
      description: 'List markdown and MDX docs under an optional prefix.',
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
      description: 'Read one markdown or MDX file by path.',
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

      const stats = await context.source.stat(normalizedPath)
      if (stats.kind !== 'file') {
        return makeTextResult(
          JSON.stringify(
            {
              error: stats.kind === 'dir' ? 'EISDIR' : 'ENOENT',
              path: withLeadingSlash(normalizedPath),
            },
            null,
            2
          )
        )
      }

      const text = await context.readCached(normalizedPath)
      return makeTextResult(text ?? '')
    }
  )

  server.registerTool(
    'docs_search',
    {
      title: 'Search docs',
      description: 'Search across markdown and MDX docs.',
      inputSchema: DocsSearchInput.shape,
    },
    async ({ query, limit, prefix }) => {
      const hits = await context.searchInMarkdown(query, limit, prefix)
      return makeTextResult(JSON.stringify(hits, null, 2))
    }
  )

  server.registerTool(
    'component_find',
    {
      title: 'Find component',
      description:
        'Resolve docs, properties, and events paths for a component.',
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
      description: 'Read the full markdown or MDX doc for a component.',
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
        'Return parsed JSON code blocks from a component doc (properties, events, etc).',
      inputSchema: ComponentNameInput.shape,
    },
    async ({ name }) => {
      const info = await context.resolveComponentPaths(name)
      const text = await context.readCached(info.doc)

      return makeTextResult(
        JSON.stringify(
          {
            doc: info.doc,
            jsonBlocks: extractJsonBlocks(text ?? ''),
          },
          null,
          2
        )
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
