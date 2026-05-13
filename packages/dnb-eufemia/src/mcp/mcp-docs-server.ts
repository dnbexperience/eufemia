/**
 * Eufemia Docs MCP Server — runtime-agnostic core.
 *
 * This module deliberately avoids importing any Node built-ins so that it can
 * be bundled for non-Node runtimes (Cloudflare Workers, Deno, Bun, ...).
 * The Node-only stdio entry point lives in `./mcp-stdio.ts` and the local
 * Express HTTP server lives in `./mcp-http-server.ts`.
 */

import { z } from 'zod'

import type { CallToolResult } from '@modelcontextprotocol/sdk/types'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

import { type DocsSource, normalizeDocsPath } from './docs-source'

type ToolResult = CallToolResult

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

function withLeadingSlash(p: string): string {
  if (!p) {
    return '/'
  }
  return p.startsWith('/') ? p : `/${p}`
}

/**
 * Computes the default Node.js docs root (used when neither `{ docsRoot }`
 * nor `{ source }` is passed to {@link createDocsTools}). Imports `node:*`
 * lazily so this module can still be bundled for non-Node runtimes.
 */
async function computeDocsRoot(): Promise<string> {
  const [{ default: path }, { default: process }] = await Promise.all([
    import('node:path'),
    import('node:process'),
  ])

  if (process.env.EUFEMIA_DOCS_ROOT) {
    return path.resolve(process.env.EUFEMIA_DOCS_ROOT)
  }
  const entryPath = process.argv[1] ? path.resolve(process.argv[1]) : ''
  const entryName = entryPath ? path.basename(entryPath) : ''
  if (entryName) {
    return path.resolve(path.dirname(entryPath), '../docs')
  }
  return path.resolve(process.cwd(), 'docs')
}

/**
 * Verify that the docs source is populated before the MCP server starts
 * serving requests. We have hit cases where the server is pointed at a
 * relative path that resolves to the wrong working directory and silently
 * returns empty results for every tool call. Failing fast here makes that
 * misconfiguration impossible to miss.
 *
 * The source is considered valid when it can read `llm.md` and reports at
 * least one markdown/MDX file.
 */
export async function validateDocsSource(
  source: DocsSource
): Promise<void> {
  const llmStat = await source.stat('llm.md')
  const hasEntry = llmStat.kind === 'file'

  const markdownFiles = await source.listMarkdown()

  if (!hasEntry || markdownFiles.length === 0) {
    throw new Error(
      `Eufemia docs source is empty or unbuilt: ${source.label}\n` +
        `  Found ${markdownFiles.length} markdown file(s); llm.md present: ${hasEntry}.\n` +
        '  For Node.js: run `yarn workspace @dnb/eufemia build:docs` and point\n' +
        '  EUFEMIA_DOCS_ROOT at the resulting build/docs directory using an absolute path.\n' +
        '  For the Cloudflare Worker: rebuild the docs bundle.'
    )
  }
}

/**
 * Backwards-compatible wrapper: validates a Node docs directory by path.
 * Throws an immediate, clear error when the directory is missing or not a
 * directory; otherwise delegates to {@link validateDocsSource}.
 */
export async function validateDocsRoot(
  docsRootAbs: string
): Promise<void> {
  const fs = await import('node:fs/promises')

  let stat
  try {
    stat = await fs.stat(docsRootAbs)
  } catch {
    stat = null
  }

  if (!stat) {
    throw new Error(
      `Eufemia docs root does not exist: ${docsRootAbs}\n` +
        '  Set EUFEMIA_DOCS_ROOT to an absolute path that contains the built docs,\n' +
        '  or run `yarn workspace @dnb/eufemia build:docs` to generate them.'
    )
  }

  if (!stat.isDirectory()) {
    throw new Error(`Eufemia docs root is not a directory: ${docsRootAbs}`)
  }

  const { createNodeDocsSource } = await import('./docs-source')
  const source = await createNodeDocsSource(docsRootAbs)
  await validateDocsSource(source)
}

function extractFrontmatterLinks(markdown: string) {
  const m = String(markdown ?? '').match(/^---\s*\n([\s\S]*?)\n---\s*\n/)
  if (!m) {
    return null
  }
  const fm = m[1]
  const lines = fm.split('\n').map((l) => l.trim())
  const readLine = (key: string) => {
    const line = lines.find((l) => l.startsWith(`${key}:`))
    if (!line) {
      return null
    }
    const val = line.split(':').slice(1).join(':').trim()
    return val.replace(/^['"]|['"]$/g, '')
  }

  return {
    doc: readLine('doc'),
    properties: readLine('properties'),
    events: readLine('events'),
  }
}

function normalizeName(name: unknown) {
  return String(name ?? '')
    .trim()
    .toLowerCase()
}

function conventionalDocPath(name: string): string[] {
  // Handle dot notation like "Field.Address" or "Value.Address"
  if (name.includes('.')) {
    const parts = name.split('.')
    const prefix = parts[0] // e.g., "Field" or "Value"
    const componentName = parts.slice(1).join('.') // e.g., "Address" or "Address.Postal"

    // Capitalize first letter of component name for proper casing
    const capitalizedName =
      componentName.charAt(0).toUpperCase() + componentName.slice(1)

    if (prefix.toLowerCase() === 'field') {
      // Field components can be in base-fields or feature-fields
      return [
        `/uilib/extensions/forms/feature-fields/${capitalizedName}.mdx`,
        `/uilib/extensions/forms/feature-fields/${capitalizedName}.md`,
        `/uilib/extensions/forms/base-fields/${capitalizedName}.mdx`,
        `/uilib/extensions/forms/base-fields/${capitalizedName}.md`,
      ]
    } else if (prefix.toLowerCase() === 'value') {
      // Value components are in the Value directory
      return [
        `/uilib/extensions/forms/Value/${capitalizedName}.mdx`,
        `/uilib/extensions/forms/Value/${capitalizedName}.md`,
      ]
    } else if (prefix.toLowerCase() === 'form') {
      // Form components are in the Form directory
      return [
        `/uilib/extensions/forms/Form/${capitalizedName}.mdx`,
        `/uilib/extensions/forms/Form/${capitalizedName}.md`,
      ]
    }
    // For other prefixes, try extensions/forms/{prefix}/{componentName}
    return [
      `/uilib/extensions/forms/${prefix}/${capitalizedName}.mdx`,
      `/uilib/extensions/forms/${prefix}/${capitalizedName}.md`,
    ]
  }

  // Default: regular component in components directory
  return [`/uilib/components/${normalizeName(name)}.md`]
}

function extractJsonBlocks(markdown: string) {
  const blocks: Array<any> = []
  const regex = /```json\s*([\s\S]*?)```/gi
  let match: RegExpExecArray | null
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

function makeTextResult(text: string): ToolResult {
  return {
    content: [{ type: 'text', text }],
  }
}

function createDocsContext(source: DocsSource) {
  let cachedMdFiles: string[] | null = null
  let cachedMdFilesAt = 0
  const MD_FILES_TTL_MS = 30_000

  async function getMarkdownFilesCached(prefix?: string) {
    const now = Date.now()

    if (!cachedMdFiles || now - cachedMdFilesAt > MD_FILES_TTL_MS) {
      const files = await source.listMarkdown()
      cachedMdFiles = files.map((f) => withLeadingSlash(f))
      cachedMdFilesAt = now
    }

    if (!prefix) {
      return cachedMdFiles
    }

    const pfx = withLeadingSlash(normalizeDocsPath(prefix)).replace(
      /\/?$/,
      '/'
    )
    return cachedMdFiles.filter((p) => p.startsWith(pfx))
  }

  async function resolveComponentPaths(
    name: string
  ): Promise<ResolvedComponent> {
    let doc = null
    let properties = null
    let events = null
    const slug = null

    // Try multiple possible paths for the component
    const possiblePaths = conventionalDocPath(name)

    // Find the first path that exists
    for (const candidatePath of possiblePaths) {
      try {
        const st = await source.stat(candidatePath)
        if (st.kind === 'file') {
          doc = candidatePath
          break
        }
        // If it's a directory, try adding .md or .mdx
        if (st.kind === 'dir') {
          const tryMd = candidatePath.replace(/\.(mdx?)?$/, '') + '.md'
          const tryMdx = candidatePath.replace(/\.(mdx?)?$/, '') + '.mdx'
          for (const tryPath of [tryMd, tryMdx]) {
            const trySt = await source.stat(tryPath)
            if (trySt.kind === 'file') {
              doc = tryPath
              break
            }
          }
          if (doc) break
        }
      } catch {
        // ignore and try next path
        continue
      }
    }

    // If no path found, use the first candidate as fallback
    if (!doc && possiblePaths.length > 0) {
      doc = possiblePaths[0]
    }

    // links from frontmatter
    if (!properties || !events) {
      try {
        const mdText = await source.read(doc)
        if (mdText !== null) {
          const links = extractFrontmatterLinks(mdText)
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

    // Split query into words, filtering out empty strings
    const queryWords = q
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 0)

    if (queryWords.length === 0) {
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

        const relPath = files[i]
        let text: string | null = null
        try {
          text = await source.read(relPath)
        } catch {
          continue
        }
        if (text === null) {
          continue
        }

        const lower = text.toLowerCase()

        // For single-word queries, use exact phrase matching (backward compatible)
        if (queryWords.length === 1) {
          const q = queryWords[0]
          const idx = lower.indexOf(q)
          if (idx === -1) {
            continue
          }

          const occurrences = lower.split(q).length - 1
          const score = Math.max(1, 1000 - idx) + occurrences * 25

          const start = Math.max(0, idx - 80)
          const end = Math.min(text.length, idx + q.length + 220)
          const snippet = text
            .slice(start, end)
            .replace(/\s+/g, ' ')
            .trim()

          hits.push({ path: relPath, score, occurrences, snippet })
        } else {
          // For multi-word queries, find all words (AND logic)
          const wordMatches: Array<{ word: string; indices: number[] }> =
            []
          let allWordsFound = true

          for (const word of queryWords) {
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

          // Calculate score based on:
          // 1. Position of first match (earlier is better)
          // 2. Number of occurrences of each word
          // 3. Proximity of words (closer together is better)
          const firstMatchIdx = Math.min(
            ...wordMatches.map((m) => m.indices[0])
          )
          const totalOccurrences = wordMatches.reduce(
            (sum, m) => sum + m.indices.length,
            0
          )

          // Calculate average proximity (distance between words)
          let proximityScore = 0
          if (wordMatches.length > 1) {
            const allIndices = wordMatches.flatMap((m) =>
              m.indices.map((idx) => ({ word: m.word, idx }))
            )
            allIndices.sort((a, b) => a.idx - b.idx)

            // Find minimum span that contains all words
            const wordSet = new Set(queryWords)
            let minSpan = Infinity
            for (let i = 0; i < allIndices.length; i++) {
              const foundWords = new Set<string>()
              for (let j = i; j < allIndices.length; j++) {
                foundWords.add(allIndices[j].word)
                if (foundWords.size === wordSet.size) {
                  const span = allIndices[j].idx - allIndices[i].idx
                  minSpan = Math.min(minSpan, span)
                  break
                }
              }
            }
            // Closer words get higher score (inverse of span)
            proximityScore =
              minSpan < Infinity ? 1000 / (1 + minSpan / 10) : 0
          }

          const score =
            Math.max(1, 1000 - firstMatchIdx) +
            totalOccurrences * 25 +
            proximityScore

          // Generate snippet from first match position
          const snippetStart = Math.max(0, firstMatchIdx - 80)
          const snippetEnd = Math.min(
            text.length,
            firstMatchIdx + queryWords.join(' ').length + 220
          )
          const snippet = text
            .slice(snippetStart, snippetEnd)
            .replace(/\s+/g, ' ')
            .trim()

          hits.push({
            path: relPath,
            score,
            occurrences: totalOccurrences,
            snippet,
          })
        }

        if (hits.length >= limit * 3) {
          stopped = true
          return
        }
      }
    }

    await Promise.all(Array.from({ length: concurrency }, () => worker()))
    hits.sort((a, b) => b.score - a.score)
    return hits.slice(0, limit)
  }

  return {
    source,
    getMarkdownFilesCached,
    resolveComponentPaths,
    searchInMarkdown,
  }
}

const EmptyInput = z.object({})

const DocsReadInput = z.object({
  path: z
    .string()
    .min(1)
    .describe(
      'Path relative to docs root (e.g. /uilib/components/button.md)'
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
  prefix: z
    .string()
    .optional()
    .describe('Optional prefix filter (e.g. /uilib/components/)'),
  limit: z.number().int().min(1).max(500).default(200),
})

const ComponentNameInput = z.object({
  name: z
    .string()
    .min(1)
    .describe("The component name (e.g. 'Button', 'Dropdown', 'Input')"),
})

type DocsReadInputType = z.infer<typeof DocsReadInput>
type DocsListInputType = z.infer<typeof DocsListInput>
type DocsSearchInputType = z.infer<typeof DocsSearchInput>
type ComponentNameInputType = z.infer<typeof ComponentNameInput>
type EmptyInputType = z.infer<typeof EmptyInput>

type DocsToolHandlers = {
  docsEntry: (_input: EmptyInputType) => Promise<ToolResult>
  docsIndex: (_input: EmptyInputType) => Promise<ToolResult>
  docsList: (input: DocsListInputType) => Promise<ToolResult>
  docsRead: (input: DocsReadInputType) => Promise<ToolResult>
  docsSearch: (input: DocsSearchInputType) => Promise<ToolResult>
  componentFind: (input: ComponentNameInputType) => Promise<ToolResult>
  componentDoc: (input: ComponentNameInputType) => Promise<ToolResult>
  componentApi: (input: ComponentNameInputType) => Promise<ToolResult>
  componentProps: (input: ComponentNameInputType) => Promise<ToolResult>
  source: DocsSource
  /**
   * Convenience accessor for Node deployments. Equals the absolute docs root
   * when the tools were created with `{ docsRoot }`; otherwise mirrors the
   * source `label` so log lines stay readable.
   */
  docsRoot: string
}

export function createDocsTools(
  options:
    | { docsRoot?: string; source?: never }
    | { source: DocsSource; docsRoot?: never }
    | { docsRoot?: string; source?: DocsSource } = {}
): DocsToolHandlers {
  let source: DocsSource
  let docsRoot: string

  if (options.source) {
    source = options.source
    docsRoot = source.label
  } else {
    // Node-only fallback: lazily resolve the docs root and the Node FS source
    // so this module stays loadable in runtimes without `node:fs/promises`
    // (e.g. Cloudflare Workers). Consumers that pass `{ source }` never hit
    // this branch.
    const docsRootPromise: Promise<string> = options.docsRoot
      ? Promise.resolve(options.docsRoot)
      : computeDocsRoot()

    let resolvedDocsRoot: string | null =
      typeof options.docsRoot === 'string' ? options.docsRoot : null

    docsRoot = resolvedDocsRoot ?? '<pending>'

    let nodeSourcePromise: Promise<DocsSource> | null = null
    const getNodeSource = () => {
      if (!nodeSourcePromise) {
        nodeSourcePromise = (async () => {
          const root = await docsRootPromise
          resolvedDocsRoot = root
          docsRoot = root
          const { createNodeDocsSource } = await import('./docs-source')
          return createNodeDocsSource(root)
        })()
      }
      return nodeSourcePromise
    }
    source = {
      label: `node:${docsRoot}`,
      listMarkdown: () => getNodeSource().then((s) => s.listMarkdown()),
      read: (relPath) => getNodeSource().then((s) => s.read(relPath)),
      stat: (relPath) => getNodeSource().then((s) => s.stat(relPath)),
      listDir: (relPath, max) =>
        getNodeSource().then((s) => s.listDir(relPath, max)),
    }
  }

  const context = createDocsContext(source)

  const docsEntry = async (
    _input: EmptyInputType
  ): Promise<ToolResult> => {
    const text = await context.source.read('llm.md')
    if (text === null) {
      return makeTextResult('llm.md not found in docs root.')
    }
    return makeTextResult(text)
  }

  const docsIndex = async (
    _input: EmptyInputType
  ): Promise<ToolResult> => {
    const files = await context.getMarkdownFilesCached()
    return makeTextResult(JSON.stringify(files, null, 2))
  }

  const docsList = async ({
    prefix,
    limit,
  }: DocsListInputType): Promise<ToolResult> => {
    const files = await context.getMarkdownFilesCached(prefix)
    return makeTextResult(JSON.stringify(files.slice(0, limit), null, 2))
  }

  const docsRead = async ({
    path: userPath,
  }: DocsReadInputType): Promise<ToolResult> => {
    let normalised: string
    try {
      normalised = normalizeDocsPath(userPath)
    } catch (e) {
      return makeTextResult(
        `Invalid path: ${e instanceof Error ? e.message : String(e)}`
      )
    }

    const relWithLeadingSlash = withLeadingSlash(normalised)
    const st = await context.source.stat(normalised)

    if (st.kind === 'missing') {
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

    if (st.kind === 'dir') {
      const children = await context.source.listDir(normalised, 60)
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

      const suggestions = []
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

    const text = await context.source.read(normalised)
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

  const docsSearch = async ({
    query,
    limit,
    prefix,
  }: DocsSearchInputType): Promise<ToolResult> => {
    const hits = await context.searchInMarkdown(query, limit, prefix, {
      concurrency: 12,
      timeoutMs: 2000,
    })
    return makeTextResult(JSON.stringify(hits, null, 2))
  }

  const componentFind = async ({
    name,
  }: ComponentNameInputType): Promise<ToolResult> => {
    const info = await context.resolveComponentPaths(name)
    return makeTextResult(JSON.stringify(info, null, 2))
  }

  const componentDoc = async ({
    name,
  }: ComponentNameInputType): Promise<ToolResult> => {
    const info = await context.resolveComponentPaths(name)
    const text = await context.source.read(info.doc)
    if (text === null) {
      return makeTextResult(`Component doc not found: ${info.doc}`)
    }
    return makeTextResult(text)
  }

  const componentApi = async ({
    name,
  }: ComponentNameInputType): Promise<ToolResult> => {
    const info = await context.resolveComponentPaths(name)
    const text = await context.source.read(info.doc)

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

    const jsonBlocks = extractJsonBlocks(text)
    return makeTextResult(
      JSON.stringify(
        {
          doc: info.doc,
          jsonBlocks,
        },
        null,
        2
      )
    )
  }

  const componentProps = async ({
    name,
  }: ComponentNameInputType): Promise<ToolResult> => {
    const info = await context.resolveComponentPaths(name)
    const text = await context.source.read(info.doc)

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

    const blocks = extractJsonBlocks(text)
    return makeTextResult(JSON.stringify(blocks, null, 2))
  }

  return {
    docsEntry,
    docsIndex,
    docsList,
    docsRead,
    docsSearch,
    componentFind,
    componentDoc,
    componentApi,
    componentProps,
    source,
    docsRoot,
  }
}

export const SERVER_INFO = { name: 'eufemia', version: '2.2.0' }

export function registerDocsTools(
  server: McpServer,
  tools: DocsToolHandlers
) {
  server.registerTool(
    'docs_entry',
    {
      title: 'Docs entry',
      description:
        'IMPORTANT! Primary entrypoint to the Eufemia documentation. Before implementing any Eufemia-based features or examples, call mcp_eufemia_docs_entry to understand the docs structure, and learn how to use the other MCP tools correctly; then use mcp_eufemia_docs_search and mcp_eufemia_docs_read to fetch relevant documentation. Make sure you have located and carefully read the relevant getting started or first-steps documentation before you implement any examples or code snippets based on these docs. Always follow these guidelines when using the documentation: use the documentation exactly as provided; gather all required information from the documentation before using it as a reference; and do not make assumptions or infer missing details unless the documentation or user explicitly instructs you to do so.',
      inputSchema: EmptyInput.shape,
    },
    (input) => tools.docsEntry(input)
  )

  server.registerTool(
    'docs_index',
    {
      title: 'Docs index',
      description:
        'Return a JSON array of all known markdown and MDX documentation files under the docs root, without filtering. Use this when you need a complete, machine-readable overview of available docs paths (for example to cache, pre-index, or sanity-check the docs structure) rather than when you are looking for a specific document.',
      inputSchema: EmptyInput.shape,
    },
    (input) => tools.docsIndex(input)
  )

  server.registerTool(
    'docs_list',
    {
      title: 'List docs',
      description:
        'List markdown and MDX documentation files under an optional prefix, returning a JSON array of relative paths. Use this when you know the high-level area of the docs (for example `/uilib/components/` or `/uilib/extensions/forms/`) and want to discover which specific files exist there, before choosing a concrete path to read with docs_read.',
      inputSchema: DocsListInput.shape,
    },
    (input) => tools.docsList(input)
  )

  server.registerTool(
    'docs_read',
    {
      title: 'Read docs file',
      description:
        'Read the raw markdown or MDX content of a single documentation file, given its path relative to the docs root (for example `/uilib/components/button.md`). If the path points to a directory instead of a file, the tool returns a structured JSON payload with an error code, a list of child entries, and suggested file paths you can try instead. Use this when you already know or have discovered a specific path and need the full document content.',
      inputSchema: DocsReadInput.shape,
    },
    (input) => tools.docsRead(input)
  )

  server.registerTool(
    'docs_search',
    {
      title: 'Search docs',
      description:
        'Search across all markdown and MDX documentation using a free-text query, returning a JSON array of ranked matches with relevance scores and text snippets. Use this when you know what you are looking for conceptually (for example a component, feature, or concept name), but you do not know the exact file path yet. Prefer this after you have called the docs entry tool so you understand how the docs are structured. In particular, use this to find and read the appropriate getting started or first-steps documentation before you rely on any specific examples or code snippets.',
      inputSchema: DocsSearchInput.shape,
    },
    (input) => tools.docsSearch(input)
  )

  server.registerTool(
    'component_find',
    {
      title: 'Find component',
      description:
        "Resolve the documentation paths for a single Eufemia component by its name (for example 'Button', 'Field.Address', or 'Value.Address'). Returns a JSON object that includes the doc, properties, and events paths plus existence flags. Use this when you are starting from a component name and need to know which documentation files to read or inspect next.",
      inputSchema: ComponentNameInput.shape,
    },
    (input) => tools.componentFind(input)
  )

  server.registerTool(
    'component_doc',
    {
      title: 'Component doc',
      description:
        "Return the full markdown or MDX documentation for a single Eufemia component, identified by its name (for example 'Button' or 'Field.Address'). Use this when you need to read the human-facing docs for a component, including narrative text, examples, and API, property, event and translation descriptions, rather than just the structured JSON blocks. Before implementing any examples from these docs, make sure you have already read the relevant getting started or first-steps documentation so you apply the examples in the correct way and context.",
      inputSchema: ComponentNameInput.shape,
    },
    (input) => tools.componentDoc(input)
  )

  server.registerTool(
    'component_api',
    {
      title: 'Component API',
      description:
        'Extract and return all JSON code blocks from the component documentation markdown (for example structured API metadata embedded in ```json fences). Use this when you need a machine-readable representation of a component’s API or metadata, such as props or events, and you prefer to work with parsed JSON rather than free-form markdown.',
      inputSchema: ComponentNameInput.shape,
    },
    (input) => tools.componentApi(input)
  )

  server.registerTool(
    'component_props',
    {
      title: 'Component props',
      description:
        'Return the structured JSON blocks describing a component’s properties and events, as derived from its main documentation file. Use this when you specifically need the props- and events-level schema or configuration for a component, rather than the full documentation text, and want to drive code generation, validation, or other automated reasoning from that data.',
      inputSchema: ComponentNameInput.shape,
    },
    (input) => tools.componentProps(input)
  )
}

export function createDocsServer(options: { docsRoot?: string } = {}): {
  server: McpServer
  tools: DocsToolHandlers
} {
  const tools = createDocsTools(options)
  const server = new McpServer(SERVER_INFO)
  registerDocsTools(server, tools)
  return { server, tools }
}

// The Node-only stdio entry lives in `./mcp-stdio.ts`. Keeping it out of
// this module ensures the shared core stays runtime-agnostic and can be
// bundled for Cloudflare Workers, Deno, Bun, etc.
