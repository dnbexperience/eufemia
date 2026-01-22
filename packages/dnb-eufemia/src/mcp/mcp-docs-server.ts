#!/usr/bin/env node

/**
 * Eufemia Docs MCP Server
 *
 * Entrypoints:
 * - docs/llm.md
 * - docs/uilib/.../*.md
 */

import type { Dirent } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

import { z } from 'zod'

import type { CallToolResult } from '@modelcontextprotocol/sdk/types'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'

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

function logErr(...args: unknown[]) {
  console.error(...args)
}

function normalizeRelPath(p: unknown) {
  return String(p ?? '')
    .replace(/^\/+/, '')
    .replaceAll('\\', '/')
}

function resolveInside(rootAbs: string, userPath: string) {
  const cleaned = normalizeRelPath(userPath)
  const abs = path.resolve(rootAbs, cleaned)
  const rel = path.relative(rootAbs, abs)

  if (rel.startsWith('..') || path.isAbsolute(rel)) {
    throw new Error(`Path escapes docs root: ${userPath}`)
  }

  const relNorm = rel.replaceAll(path.sep, '/')
  return { abs, rel: relNorm, relWithLeadingSlash: '/' + relNorm }
}

async function statSafe(p: string) {
  try {
    return await fs.stat(p)
  } catch {
    return null
  }
}

async function fileExists(p: string) {
  try {
    await fs.access(p)
    return true
  } catch {
    return false
  }
}

async function readTextFile(absPath: string) {
  const buf = await fs.readFile(absPath)
  return buf.toString('utf8')
}

async function listDirSafe(absDir: string, max = 60): Promise<string[]> {
  try {
    const items = await fs.readdir(absDir)
    return items.slice(0, max)
  } catch {
    return []
  }
}

async function listMarkdownFiles(rootAbs: string): Promise<string[]> {
  const out: string[] = []
  const stack = ['']

  while (stack.length > 0) {
    const relDir = stack.pop() ?? ''
    const absDir = path.join(rootAbs, relDir)

    let entries: Dirent[]
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

      if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
        out.push(relPath)
      }
    }
  }

  return out
}

function computeDocsRoot() {
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

function conventionalDocPath(name: string) {
  return `/uilib/components/${normalizeName(name)}.md`
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

function createDocsContext(docsRoot: string) {
  const llmMdAbs = path.resolve(docsRoot, 'llm.md')

  let cachedMdFiles: string[] | null = null
  let cachedMdFilesAt = 0
  const MD_FILES_TTL_MS = 30_000

  async function getMarkdownFilesCached(prefix?: string) {
    const now = Date.now()

    if (!cachedMdFiles || now - cachedMdFilesAt > MD_FILES_TTL_MS) {
      const files = await listMarkdownFiles(docsRoot)
      cachedMdFiles = files.map((f) => '/' + f.replaceAll(path.sep, '/'))
      cachedMdFilesAt = now
    }

    if (!prefix) {
      return cachedMdFiles
    }

    const pfx = '/' + normalizeRelPath(prefix).replace(/\/?$/, '/')
    return cachedMdFiles.filter((p) => p.startsWith(pfx))
  }

  async function resolveComponentPaths(
    name: string
  ): Promise<ResolvedComponent> {
    let doc = null
    let properties = null
    let events = null
    const slug = null

    if (!doc) {
      doc = conventionalDocPath(name)
    }

    // doc could be mistakenly a directory
    try {
      const docAbs0 = resolveInside(docsRoot, doc).abs
      const st0 = await statSafe(docAbs0)
      if (st0?.isDirectory()) {
        const tryMd = doc.replace(/\/+$/, '') + '.md'
        const tryAbs = resolveInside(docsRoot, tryMd).abs
        const trySt = await statSafe(tryAbs)
        if (trySt?.isFile()) {
          doc = tryMd
        }
      }
    } catch {
      // ignore
    }

    // links from frontmatter
    if (!properties || !events) {
      try {
        const docAbs = resolveInside(docsRoot, doc).abs
        const st = await statSafe(docAbs)
        if (st?.isFile()) {
          const mdText = await readTextFile(docAbs)
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

    const docExists = Boolean(
      (await statSafe(resolveInside(docsRoot, doc).abs))?.isFile()
    )
    const propertiesExists = Boolean(
      (await statSafe(resolveInside(docsRoot, properties).abs))?.isFile()
    )
    const eventsExists = Boolean(
      (await statSafe(resolveInside(docsRoot, events).abs))?.isFile()
    )

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
    const q = String(query ?? '').toLowerCase()
    if (q.length < 2) {
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
        const { abs } = resolveInside(docsRoot, relPath)

        let text
        try {
          text = await readTextFile(abs)
        } catch {
          continue
        }

        const lower = text.toLowerCase()
        const idx = lower.indexOf(q)
        if (idx === -1) {
          continue
        }

        const occurrences = lower.split(q).length - 1
        const score = Math.max(1, 1000 - idx) + occurrences * 25

        const start = Math.max(0, idx - 80)
        const end = Math.min(text.length, idx + q.length + 220)
        const snippet = text.slice(start, end).replace(/\s+/g, ' ').trim()

        hits.push({ path: relPath, score, occurrences, snippet })

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
    docsRoot,
    llmMdAbs,
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
  docsRoot: string
}

export function createDocsTools(
  options: { docsRoot?: string } = {}
): DocsToolHandlers {
  const docsRoot = options.docsRoot ?? computeDocsRoot()
  const context = createDocsContext(docsRoot)

  const docsEntry = async (
    _input: EmptyInputType
  ): Promise<ToolResult> => {
    if (!(await fileExists(context.llmMdAbs))) {
      return makeTextResult('llm.md not found in docs root.')
    }
    return makeTextResult(await readTextFile(context.llmMdAbs))
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
    let resolved
    try {
      resolved = resolveInside(context.docsRoot, userPath)
    } catch (e) {
      return makeTextResult(`Invalid path: ${String(e?.message ?? e)}`)
    }

    const { abs, relWithLeadingSlash } = resolved
    const st = await statSafe(abs)

    if (!st) {
      const base = relWithLeadingSlash.replace(/\/+$/, '')
      const mdGuess = `${base}.md`

      let mdExists = false
      try {
        mdExists = Boolean(
          (
            await statSafe(resolveInside(context.docsRoot, mdGuess).abs)
          )?.isFile()
        )
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

    if (st.isDirectory()) {
      const children = await listDirSafe(abs, 60)
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
          const sAbs = resolveInside(context.docsRoot, s).abs
          const sSt = await statSafe(sAbs)
          if (sSt?.isFile()) {
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

    return makeTextResult(await readTextFile(abs))
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
    const abs = resolveInside(context.docsRoot, info.doc).abs
    const st = await statSafe(abs)

    if (!st?.isFile()) {
      return makeTextResult(`Component doc not found: ${info.doc}`)
    }

    return makeTextResult(await readTextFile(abs))
  }

  const componentApi = async ({
    name,
  }: ComponentNameInputType): Promise<ToolResult> => {
    const info = await context.resolveComponentPaths(name)
    const abs = resolveInside(context.docsRoot, info.doc).abs
    const st = await statSafe(abs)

    if (!st?.isFile()) {
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

    const jsonBlocks = extractJsonBlocks(await readTextFile(abs))
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
    const abs = resolveInside(context.docsRoot, info.doc).abs
    const st = await statSafe(abs)

    if (!st?.isFile()) {
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

    const blocks = extractJsonBlocks(await readTextFile(abs))
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
    docsRoot,
  }
}

async function main() {
  const tools = createDocsTools()
  logErr(`[eufemia] docsRoot: ${tools.docsRoot}`)

  const server = new McpServer({ name: 'eufemia', version: '2.2.0' })

  server.registerTool(
    'docs_entry',
    {
      title: 'Docs entry',
      description: 'Return docs/llm.md (AI entrypoint).',
      inputSchema: EmptyInput.shape,
    },
    (input) => tools.docsEntry(input)
  )

  server.registerTool(
    'docs_index',
    {
      title: 'Docs index',
      description: 'Return a JSON list of markdown docs.',
      inputSchema: EmptyInput.shape,
    },
    (input) => tools.docsIndex(input)
  )

  server.registerTool(
    'docs_list',
    {
      title: 'List docs',
      description: 'List docs (markdown files).',
      inputSchema: DocsListInput.shape,
    },
    (input) => tools.docsList(input)
  )

  server.registerTool(
    'docs_read',
    {
      title: 'Read docs file',
      description:
        'Read a docs file by path. If a directory is provided, returns a directory listing and suggested file paths.',
      inputSchema: DocsReadInput.shape,
    },
    (input) => tools.docsRead(input)
  )

  server.registerTool(
    'docs_search',
    {
      title: 'Search docs',
      description:
        'Search across markdown docs (cached + bounded). Returns ranked matches with snippets.',
      inputSchema: DocsSearchInput.shape,
    },
    (input) => tools.docsSearch(input)
  )

  server.registerTool(
    'component_find',
    {
      title: 'Find component',
      description: 'Resolve component doc/properties/events paths.',
      inputSchema: ComponentNameInput.shape,
    },
    (input) => tools.componentFind(input)
  )

  server.registerTool(
    'component_doc',
    {
      title: 'Component doc',
      description: 'Return the markdown documentation for a component.',
      inputSchema: ComponentNameInput.shape,
    },
    (input) => tools.componentDoc(input)
  )

  server.registerTool(
    'component_api',
    {
      title: 'Component API',
      description: 'Return JSON blocks extracted from component markdown.',
      inputSchema: ComponentNameInput.shape,
    },
    (input) => tools.componentApi(input)
  )

  server.registerTool(
    'component_props',
    {
      title: 'Component props',
      description:
        'Return JSON blocks for component properties/events (from doc).',
      inputSchema: ComponentNameInput.shape,
    },
    (input) => tools.componentProps(input)
  )

  const transport = new StdioServerTransport()
  await server.connect(transport)
  logErr('[eufemia] connected (stdio)')
}

const shouldRun = (() => {
  const entryPath = process.argv[1] ? path.resolve(process.argv[1]) : ''
  const entryName = entryPath ? path.basename(entryPath) : ''
  const allowed = new Set([
    'mcp-docs-server.js',
    'mcp-docs-server.mjs',
    'mcp-docs-server.cjs',
    'mcp-docs-server.ts',
    'mcp-docs-server.mts',
  ])
  return entryName ? allowed.has(entryName) : false
})()

if (shouldRun) {
  main().catch((e) => {
    logErr('[eufemia] fatal:', e)
    process.exit(1)
  })
}
