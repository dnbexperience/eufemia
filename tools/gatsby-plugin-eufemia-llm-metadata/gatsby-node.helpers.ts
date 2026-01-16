import fs from 'fs-extra'
import path from 'path'
import crypto from 'crypto'
import fm from 'front-matter'
import prettier from 'prettier'
import { Extractor } from 'markdown-tables-to-json'
import type { File } from '@babel/types'

const PUBLIC_URL = process.env.CF_PAGES_URL || 'https://eufemia.dnb.no'
const REPO_URL = 'https://github.com/dnbexperience/eufemia'
const IGNORE_SEGMENTS = new Set(['visual-tests'])
type PrettierConfig = Record<string, unknown>
type ConvertState = {
  mdxCache: Map<string, string>
  inProgress: Set<string>
}
type ComponentEntry = {
  code: string
  format: 'md' | 'tsx'
}

export function getPortalPaths(store: any) {
  const { program } = store.getState()
  const siteDir = program.directory
  const docsRoot = path.join(siteDir, 'src', 'docs', 'uilib')
  const metadataRoot = path.join(siteDir, 'public')
  const llmRoot = path.join(siteDir, 'public', 'llm')
  return { siteDir, docsRoot, metadataRoot, llmRoot }
}

export async function findDocExtras(file: string) {
  const extrasDir = path.join(
    path.dirname(file),
    path.basename(file, path.extname(file))
  )

  const propsFile = await findExisting([
    path.join(extrasDir, 'properties.mdx'),
    path.join(path.dirname(file), 'properties.mdx'),
  ])
  const eventsFile = await findExisting([
    path.join(extrasDir, 'events.mdx'),
    path.join(path.dirname(file), 'events.mdx'),
  ])
  const demosFile = await findExisting([
    path.join(extrasDir, 'demos.mdx'),
    path.join(path.dirname(file), 'demos.mdx'),
  ])

  return { propsFile, eventsFile, demosFile }
}

export async function loadTsDocs(rel: string) {
  let tsDocsDir: string | null = null
  let related: string[] = []
  let props: Record<string, any> = {}
  let events: Record<string, any> = {}

  const tsRoot = findPackageRoot('@dnb/eufemia')
  if (!tsRoot) {
    return { tsDocsDir, props, events, related }
  }
  const tsSrcRoot = path.join(tsRoot, 'src')
  const relNoExt = rel.replace(/\.[^/.]+$/, '') // e.g. components/card
  const relDir = path.join(tsSrcRoot, ...relNoExt.split(path.sep))

  try {
    const tsDocs = await extractTsDocs(relDir)
    props = tsDocs.props || {}
    events = tsDocs.events || {}
    related = tsDocs.related || []
    if (tsDocs.__exportNames.length > 0 && (await fs.pathExists(relDir))) {
      tsDocsDir = relDir
    }
  } catch {
    // ignore if not found
  }

  if (
    rel.startsWith(`elements${path.sep}`) ||
    rel.startsWith('elements/')
  ) {
    const elementName = relNoExt.split(path.sep).pop() || ''
    const aliasMap: Record<string, string> = {
      image: 'img',
      'horizontal-rule': 'hr',
      paragraph: 'p',
      heading: 'h',
    }
    const resolvedName = aliasMap[elementName] || elementName
    const elementDocsDir = path.join(tsSrcRoot, 'elements', resolvedName)
    const typographyDocsDir = path.join(
      tsSrcRoot,
      'elements',
      'typography'
    )
    const typographyDocsNameMap: Record<string, string> = {
      lead: 'LeadDocs',
      ingress: 'IngressDocs',
      paragraph: 'PDocs',
      p: 'PDocs',
    }
    const typographyDocsName =
      typographyDocsNameMap[resolvedName] ||
      `${toPascalCase(resolvedName)}Docs`
    const docsCandidates = [
      path.join(elementDocsDir, `${toPascalCase(resolvedName)}Docs.ts`),
      path.join(elementDocsDir, `${toPascalCase(resolvedName)}Docs.tsx`),
      path.join(typographyDocsDir, `${typographyDocsName}.ts`),
      path.join(typographyDocsDir, `${typographyDocsName}.tsx`),
    ]
    const elementDocsFile = await findExisting(docsCandidates)
    if (elementDocsFile) {
      const docsDir = path.dirname(elementDocsFile)
      const elementDocs = await extractTsDocs(docsDir)
      props = mergeDocs(props, elementDocs.props || {})
      events = mergeDocs(events, elementDocs.events || {})
      related = [...related, ...(elementDocs.related || [])]
      if (!tsDocsDir) {
        tsDocsDir = docsDir
      }
    }
  }

  return { tsDocsDir, props, events, related }
}

export function mergeDocs(
  base: Record<string, any>,
  extra: Record<string, any>
) {
  return { ...base, ...(extra || {}) }
}

export async function resolveMetaText(file: string) {
  const infoFile = await findExisting([
    path.join(
      path.dirname(file),
      path.basename(file, path.extname(file)),
      'info.mdx'
    ),
    path.join(path.dirname(file), 'info.mdx'),
  ])

  const name =
    (await extractTitleFromMdx(file)) ||
    (await extractTitleFromMdx(infoFile)) ||
    toPascalCase(path.basename(file, path.extname(file)))
  const description =
    (await extractDescriptionFromMdx(file)) ||
    (await extractDescriptionFromMdx(infoFile)) ||
    null

  return { name, description, infoFile }
}

export function buildMetadata({
  file,
  siteDir,
  slug,
  group,
  name,
  description,
  props,
  events,
  related,
  sourceInfo,
  propsFile,
  eventsFile,
  demosFile,
  version,
}: {
  file: string
  siteDir: string
  slug: string
  group: string
  name: string
  description: string | null
  props: Record<string, any>
  events: Record<string, any>
  related: string[]
  sourceInfo: any
  propsFile: string | null
  eventsFile: string | null
  demosFile: string | null
  version: string
}) {
  const propsList = mapToArray(props)
  const eventsList = mapToArray(events)
  const relatedList = Array.from(new Set([...(related || [])]))
    .filter(Boolean)
    .sort()
  const checksum = makeChecksum({
    props: propsList,
    events: eventsList,
    related: relatedList,
  })

  return {
    id: slug.replace(/^\/|\/$/g, ''),
    name,
    description,
    group,
    slug,
    props: propsList,
    events: eventsList,
    related: relatedList,
    checksum,
    source: sourceInfo,
    sources: {
      entry: {
        local: toWorkspacePath(file, siteDir),
        public: toPublicUrl(slug),
      },
      props: propsFile
        ? {
            local: toWorkspacePath(propsFile, siteDir),
            public: toPublicUrl(joinSlug(slug, 'properties/')),
          }
        : null,
      events: eventsFile
        ? {
            local: toWorkspacePath(eventsFile, siteDir),
            public: toPublicUrl(joinSlug(slug, 'events/')),
          }
        : null,
      demos: demosFile
        ? {
            local: toWorkspacePath(demosFile, siteDir),
            public: toPublicUrl(joinSlug(slug, 'demos/')),
          }
        : null,
    },
    version,
    generatedAt: new Date().toISOString(),
    schemaVersion: 1,
  }
}

export async function writeMetadataFile({
  meta,
  metadataRoot,
  dirForExtras,
}: {
  meta: Record<string, any>
  metadataRoot: string
  dirForExtras: string
}) {
  const outDir = path.join(metadataRoot, dirForExtras)
  const outFile = path.join(outDir, 'metadata.json')
  await fs.ensureDir(outDir)
  await fs.writeJSON(outFile, meta, { spaces: 2 })
  return { outDir, outFile }
}

export async function writeIndexFile({
  llmRoot,
  siteDir,
  results,
}: {
  llmRoot: string
  siteDir: string
  results: Array<any>
}) {
  await fs.ensureDir(llmRoot)
  await fs.writeJSON(
    path.join(llmRoot, 'index.json'),
    results.map((r) => ({
      slug: r.slug,
      path: toWorkspacePath(r.outFile, siteDir),
    })),
    { spaces: 2 }
  )
}

export async function writeLlmsText({
  siteDir,
  results,
  version,
  llmRoot,
}: {
  siteDir: string
  results?: Array<any>
  version: string
  llmRoot: string
}) {
  const baseResults =
    results && results.length > 0
      ? results
      : await loadResultsFromIndex(llmRoot, siteDir)
  const hydrated = await Promise.all(
    baseResults.map(async (entry) => {
      try {
        const meta = await fs.readJSON(entry.outFile)
        return { ...entry, meta }
      } catch {
        return entry
      }
    })
  )
  const llmsPath = path.join(siteDir, 'public', 'llms.txt')
  const llmsContent = buildLlmsText(hydrated, { version })
  await fs.writeFile(llmsPath, llmsContent, 'utf-8')
}

async function loadResultsFromIndex(llmRoot: string, siteDir: string) {
  try {
    const indexPath = path.join(llmRoot, 'index.json')
    const entries = await fs.readJSON(indexPath)
    if (!Array.isArray(entries)) {
      return []
    }
    return entries.map((entry) => ({
      slug: entry.slug,
      outFile: path.isAbsolute(entry.path)
        ? entry.path
        : path.join(siteDir, entry.path),
    }))
  } catch {
    return []
  }
}

export function toWorkspacePath(abs: string, siteDir: string) {
  return path.relative(siteDir, abs)
}

export function toSlugAndDir(rel: string) {
  const noExt = rel.replace(/\.[^/.]+$/, '')
  const slug = `/${path.posix.join(
    'uilib',
    noExt.split(path.sep).join('/')
  )}/`
  const dirForExtras = path.posix.join(slug).replace(/^\//, '')
  return { slug, dirForExtras }
}

export function joinSlug(slug: string, sub: string) {
  return slug + (sub.startsWith('/') ? sub.slice(1) : sub)
}

export function toPublicUrl(slugPath: string) {
  return `${PUBLIC_URL}${slugPath}`
}

export async function findEntryMdxFiles(docsRoot: string) {
  const files = await listFilesRecursive(docsRoot)
  return files.filter((f) => {
    if (!f.endsWith('.mdx')) {
      return false
    }
    const base = path.basename(f)
    if (/^(info|demos|properties|events)\.mdx$/i.test(base)) {
      return false
    }
    const rel = path.relative(docsRoot, f)
    const segments = rel.split(path.sep)
    if (segments.some((s) => s.startsWith('_'))) {
      return false
    }
    if (
      segments.some((seg) => {
        const noExt = seg.replace(/\.[^/.]+$/, '')
        return IGNORE_SEGMENTS.has(seg) || IGNORE_SEGMENTS.has(noExt)
      })
    ) {
      return false
    }
    return true
  })
}

async function listFilesRecursive(dir: string) {
  const out: string[] = []
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      out.push(...(await listFilesRecursive(p)))
    } else {
      out.push(p)
    }
  }
  return out
}

export async function findExisting(candidates: string[]) {
  for (const f of candidates) {
    try {
      const stat = await fs.stat(f)
      if (stat.isFile()) {
        return f
      }
    } catch {
      // ignore
    }
  }
  return null
}

export async function extractTableDocs(mdxFile: string) {
  const md = await fs.readFile(mdxFile, 'utf-8')
  const tables = Extractor.extractAllTables(md, 'rows')
  const collection: Record<string, any> = {}

  tables.forEach((rows: Array<any>) => {
    const headerRow = rows.shift()
    if (!Array.isArray(headerRow)) {
      return
    }
    rows.forEach((row) => {
      const keyRaw = (row[0] || '').toString()
      const descRaw = (row[1] || '').toString()
      const keys = normalizeKeyCell(keyRaw)
      const desc = cleanDescription(descRaw)
      keys.forEach((k) => {
        if (k) {
          collection[k] = {
            doc: desc,
          }
        }
      })
    })
  })

  return collection
}

export function normalizeKeyCell(cell: string) {
  const cleaned = cell
    .replace(/<code>([^<]*)<\/code>/g, '$1')
    .replace(/<[^<]*>([^<]*)<\/[^<]*>/g, '$1')
    .trim()
  if (!cleaned) {
    return []
  }
  return cleaned.split(/\s+or\s+/i).map((s) => s.trim())
}

export function toPascalCase(s: string) {
  return s
    .split(/_/g)
    .reduce(
      (acc, cur) =>
        acc +
        cur.replace(
          /(\w)(\w*)/g,
          (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase()
        ),
      ''
    )
}

export function cleanDescription(s: string) {
  return s
    .replace(/<em>\((optional|mandatory)\)<\/em>\s*/gi, '')
    .replace(/<strong>([^<]*)<\/strong>/g, '"$1"')
    .replace(/<code>([^<]*)<\/code>/g, '`$1`')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
}

export function mapToArray(map: Record<string, any>) {
  try {
    return Object.entries(map || {}).map(([name, v]) => ({
      name,
      ...(v || {}),
    }))
  } catch {
    return []
  }
}

export function makeChecksum({
  props = [],
  events = [],
  related = [],
}: {
  props?: Array<any>
  events?: Array<any>
  related?: Array<any>
}) {
  try {
    const normalizeEntry = (entry: Record<string, any>) => {
      const obj = { ...(entry || {}) }
      const keys = Object.keys(obj).sort()
      const out: Record<string, any> = {}
      for (const k of keys) {
        const v = obj[k]
        out[k] = Array.isArray(v) ? [...v] : v ?? null
      }
      return out
    }

    const normalized = {
      props: [...props]
        .sort((a, b) => String(a.name).localeCompare(String(b.name)))
        .map(normalizeEntry),
      events: [...events]
        .sort((a, b) => String(a.name).localeCompare(String(b.name)))
        .map(normalizeEntry),
      related: [...related].sort(),
    }

    const str = JSON.stringify(normalized)
    return crypto.createHash('sha256').update(str).digest('hex')
  } catch {
    return null
  }
}

export async function extractTitleFromMdx(mdxFile: string | null) {
  if (!mdxFile) {
    return null
  }
  try {
    const src = await fs.readFile(mdxFile, 'utf-8')
    const { attributes, body } = fm(src)
    if (attributes && typeof (attributes as any).title === 'string') {
      return String((attributes as any).title).trim()
    }
    const m = /\n\s*#\s+([^\n]+)\n/.exec(body || src)
    if (m && m[1]) {
      return m[1].trim()
    }
  } catch {
    // ignore
  }
  return null
}

export async function findSourceInfo({
  tsDocsDir,
  name,
  version,
}: {
  tsDocsDir: string
  name: string
  version: string
}) {
  try {
    const altName = name.split('(')[0]?.trim()
    const dirName = toPascalCase(path.basename(tsDocsDir))
    const nameCandidates = Array.from(
      new Set([name, altName, dirName].filter(Boolean))
    )
    const candidates = [
      ...nameCandidates.flatMap((candidate) => [
        `${candidate}.tsx`,
        `${candidate}.ts`,
        `${candidate}.jsx`,
        `${candidate}.js`,
      ]),
      'index.tsx',
      'index.ts',
      'index.jsx',
      'index.js',
    ].map((n) => path.join(tsDocsDir, n))

    let fileAbs: string | null = null
    for (const c of candidates) {
      try {
        const st = await fs.stat(c)
        if (st.isFile()) {
          fileAbs = c
          break
        }
      } catch {
        // ignore
      }
    }

    if (!fileAbs) {
      return null
    }

    const repoRoot = findRepoRoot()
    const fileRepoPath = path
      .relative(repoRoot, fileAbs)
      .replace(/\\/g, '/')
    const dirRepoPath = path.posix.dirname(fileRepoPath)
    const tag =
      /^\d+/.test(String(version)) && !version.includes('-')
        ? `v${version}`
        : 'main'
    const fileUrl = `${REPO_URL}/blob/${tag}/${fileRepoPath}`
    const dirUrl = `${REPO_URL}/tree/${tag}/${dirRepoPath}`

    return {
      repo: REPO_URL,
      file: fileRepoPath,
      fileUrl,
      dirUrl,
    }
  } catch {
    return null
  }
}

function findRepoRoot() {
  let current = process.cwd()
  const root = path.parse(current).root

  while (true) {
    const candidate = path.join(current, 'package.json')
    if (fs.existsSync(candidate)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(candidate, 'utf-8'))
        if (pkg?.name === 'eufemia') {
          return current
        }
      } catch {
        // ignore
      }
    }
    if (current === root) {
      break
    }
    current = path.dirname(current)
  }

  return process.cwd()
}

export async function extractDescriptionFromMdx(mdxFile: string | null) {
  if (!mdxFile) {
    return null
  }
  try {
    const src = await fs.readFile(mdxFile, 'utf-8')
    const { attributes } = fm(src)
    if (
      attributes &&
      typeof (attributes as any).description === 'string'
    ) {
      return String((attributes as any).description).trim()
    }
  } catch {
    // ignore
  }
  return null
}

export function buildLlmsText(
  results: Array<any>,
  { version }: { version: string }
) {
  const lines: string[] = []
  const generatedAt = new Date().toISOString()

  lines.push('# Eufemia')
  lines.push('')
  lines.push(
    '> DNB’s Eufemia design system. This file points LLMs to machine-readable docs and clean Markdown copies.'
  )
  lines.push('')
  lines.push(`Index (JSON): ${PUBLIC_URL}/llm/index.json`)
  lines.push(`Version: ${version}`)
  lines.push(`GeneratedAt: ${generatedAt}`)
  lines.push('')

  const filtered = results.filter((e) => {
    try {
      const slug = String(e?.meta?.slug || '')
      const segments = slug.split('/').filter(Boolean)
      return !segments.some((s) => IGNORE_SEGMENTS.has(s))
    } catch {
      return true
    }
  })

  const byGroup = new Map<string, Array<any>>()
  for (const entry of filtered) {
    const g = entry.meta.group || 'unlisted'
    if (!byGroup.has(g)) {
      byGroup.set(g, [])
    }
    byGroup.get(g)?.push(entry)
  }
  const order = ['components', 'extensions', 'elements', 'unlisted']
  const title = (g: string) =>
    g === 'components'
      ? 'Components'
      : g === 'extensions'
      ? 'Extensions'
      : g === 'elements'
      ? 'Elements'
      : 'Unlisted'

  const printed = new Set<string>()
  const pushEntry = (meta: any) => {
    const publicUrl =
      meta?.sources?.entry?.public || PUBLIC_URL + meta.slug
    const mdCopy = publicUrl.endsWith('/')
      ? publicUrl.replace(/\/$/, '.md')
      : `${publicUrl}.md`
    const desc = meta.description
      ? String(meta.description).replace(/\s+/g, ' ').trim()
      : 'Look into the documentation for more details.'
    lines.push(`- [${meta.name}](${mdCopy}): ${desc}`)
    lines.push('')
  }
  for (const g of order) {
    const list = byGroup.get(g)
    if (!list || list.length === 0) {
      continue
    }
    lines.push(`## ${title(g)}`)
    lines.push('')
    if (list.length === 0) {
      continue
    }
    for (const { meta } of list) {
      pushEntry(meta)
      if (meta?.slug) {
        printed.add(meta.slug)
      }
    }
  }

  const rest = filtered.filter((e) => !printed.has(e?.meta?.slug))
  if (rest.length > 0) {
    lines.push('## Other')
    lines.push('')
    for (const { meta } of rest) {
      pushEntry(meta)
    }
  }

  return lines.join('\n')
}

function readChecksumFromFile(file: string) {
  try {
    const json = JSON.parse(fs.readFileSync(file, 'utf-8'))
    return json && json.checksum ? String(json.checksum) : null
  } catch {
    return null
  }
}

function hasDemosPage(outFile: string, slug: string) {
  try {
    const publicRoot = findPublicRootFromOutFile(outFile)
    if (!publicRoot || !slug) {
      return false
    }
    const dir = String(slug).replace(/^\//, '').replace(/\/$/, '')
    const demosPath = path.join(publicRoot, dir, 'demos', 'index.html')
    return fs.existsSync(demosPath)
  } catch {
    return false
  }
}

function findPublicRootFromOutFile(outFile: string) {
  if (!outFile) {
    return null
  }
  let cur = path.dirname(outFile)
  for (let i = 0; i < 10; i++) {
    const base = path.basename(cur)
    const parent = path.dirname(cur)
    if (!parent || parent === cur) {
      break
    }
    if (base === 'llm') {
      return parent
    }
    cur = parent
  }
  return null
}

export async function extractTsDocs(dir: string) {
  const out: {
    props: Record<string, any>
    events: Record<string, any>
    __exportNames: string[]
    related: string[]
  } = { props: {}, events: {}, __exportNames: [], related: [] }
  let entries
  try {
    entries = await fs.readdir(dir, { withFileTypes: true })
  } catch {
    return out
  }

  const docFiles = entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((n) => /Docs\.tsx?$/.test(n))
    .map((n) => path.join(dir, n))

  for (const file of docFiles) {
    try {
      const mod = await evaluateTsModule(file)
      for (const [exportName, value] of Object.entries(mod || {})) {
        if (!value || typeof value !== 'object') {
          continue
        }
        if (
          exportName.includes('Properties') ||
          exportName.includes('Events')
        ) {
          out.__exportNames.push(exportName)
          addDocsFromExport(exportName, value, out)
        }
      }
    } catch {
      // ignore file if it fails
    }
  }

  return out
}

async function evaluateTsModule(file: string) {
  const [
    { default: babel },
    { default: transformTS },
    { default: transformCJS },
    vm,
    moduleApi,
  ] = await Promise.all([
    import('@babel/core'),
    import('@babel/plugin-transform-typescript'),
    import('@babel/plugin-transform-modules-commonjs'),
    import('node:vm'),
    import('node:module'),
  ])
  const localRequire = (moduleApi as any).createRequire(file)

  let code = await fs.readFile(file, 'utf-8')
  const injection = await buildDocsInjectionPrelude(file, code)

  code = code.replace(
    /(^\s*import[\s\S]*?from\s+['\"][^'\"]+['\"][^\n]*$)/gm,
    ''
  )

  const result = await babel.transformAsync(injection + '\n' + code, {
    filename: file,
    plugins: [
      [transformTS, { isTSX: true }],
      [transformCJS, {}],
    ],
    babelrc: false,
    configFile: false,
    sourceMaps: false,
    ast: false,
  })

  const sandbox: any = {
    module: { exports: {} },
    exports: {},
    require: localRequire,
  }
  vm.createContext(sandbox)
  vm.runInContext(result.code, sandbox, { filename: file })
  const exp = sandbox.exports
  const mod = sandbox.module && sandbox.module.exports
  return (exp && Object.keys(exp).length ? exp : mod) || {}
}

async function buildDocsInjectionPrelude(file: string, source: string) {
  const parser = await import('@babel/parser')
  const dir = path.dirname(file)
  let ast
  try {
    ast = parser.parse(source, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx'],
    })
  } catch {
    return ''
  }

  const mappings: Array<{ names: string[]; mod: Record<string, any> }> = []
  for (const node of ast.program.body) {
    if (node.type !== 'ImportDeclaration') {
      continue
    }
    const src = node.source && node.source.value
    if (!src || !/Docs(\.[tj]sx?)?$/i.test(src)) {
      continue
    }
    const names = node.specifiers
      .filter((s: any) => s.type === 'ImportSpecifier')
      .map((s: any) => (s.imported && s.imported.name) || s.local.name)
      .filter(Boolean)
    if (names.length === 0) {
      continue
    }
    const abs = await resolveDocsModulePath(dir, src)
    if (!abs) {
      continue
    }
    const mod = await evaluateTsModule(abs)
    mappings.push({ names, mod })
  }

  let prelude = ''
  for (const { names, mod } of mappings) {
    for (const n of names) {
      const val =
        mod && Object.prototype.hasOwnProperty.call(mod, n) ? mod[n] : {}
      prelude += `const ${n} = ${JSON.stringify(val)};\n`
    }
  }
  return prelude
}

async function resolveDocsModulePath(baseDir: string, modPath: string) {
  const candidates = [
    path.resolve(baseDir, modPath + '.ts'),
    path.resolve(baseDir, modPath + '.tsx'),
    path.resolve(baseDir, modPath),
  ]
  for (const c of candidates) {
    try {
      const st = await fs.stat(c)
      if (st.isFile()) {
        return c
      }
    } catch {
      // ignore
    }
  }
  return null
}

function findPackageRoot(pkgName: string) {
  const root = path.parse(process.cwd()).root
  let current = process.cwd()
  const workspaceName =
    pkgName === '@dnb/eufemia'
      ? 'dnb-eufemia'
      : pkgName.replace(/^@[^/]+\//, '')

  while (true) {
    const workspaceCandidate = path.join(
      current,
      'packages',
      workspaceName,
      'package.json'
    )
    if (fs.existsSync(workspaceCandidate)) {
      return path.dirname(workspaceCandidate)
    }

    const candidate = path.join(
      current,
      'node_modules',
      ...pkgName.split('/'),
      'package.json'
    )
    if (fs.existsSync(candidate)) {
      return path.dirname(candidate)
    }
    if (current === root) {
      break
    }
    current = path.dirname(current)
  }

  return null
}

function addDocsFromExport(
  exportName: string,
  value: Record<string, any>,
  out: {
    props: Record<string, any>
    events: Record<string, any>
    related: string[]
  }
) {
  for (const [key, entry] of Object.entries(value || {})) {
    const relMatch = /^\[([^\]]+)\]/.exec(key)
    if (relMatch && relMatch[1]) {
      out.related.push(relMatch[1])
      continue
    }
    if (!entry || typeof entry !== 'object') {
      continue
    }
    const normalized = {
      doc: String((entry as any).doc ?? (entry as any).description ?? ''),
      type: (entry as any).type ?? null,
      status: (entry as any).status ?? null,
      defaultValue: (entry as any).defaultValue ?? null,
    }
    if (exportName.includes('Events')) {
      out.events[key] = normalized
    } else {
      out.props[key] = normalized
    }
  }
}

export async function createMarkdownCopies({
  siteDir,
  docsRoot,
}: {
  siteDir: string
  docsRoot: string
}) {
  const prettierConfigPath = path.join(siteDir, '.prettierrc')
  let prettierConfig: PrettierConfig = {}
  try {
    const rawConfig = await fs.readFile(prettierConfigPath, 'utf-8')
    prettierConfig = JSON.parse(rawConfig) as PrettierConfig
  } catch {
    prettierConfig = {}
  }
  const docsBaseRoot = path.resolve(docsRoot, '..')
  const entryFiles = await findEntryMdxFiles(docsRoot)
  const state: ConvertState = {
    mdxCache: new Map(),
    inProgress: new Set(),
  }
  for (const file of entryFiles) {
    const rel = path.relative(docsRoot, file)
    const { slug } = toSlugAndDir(rel)
    const mdOutputPath = path.join(
      siteDir,
      'public',
      slug.replace(/\/$/, '') + '.md'
    )
    const outputDir = path.dirname(mdOutputPath)
    const md = await convertMdxToMd({
      inputPath: file,
      docsRoot,
      docsBaseRoot,
      prettierConfig,
      includeFrontmatter: true,
      state,
    })
    await fs.ensureDir(outputDir)
    await fs.writeFile(mdOutputPath, md, 'utf-8')
  }
}

export async function convertMdxToMd({
  inputPath,
  docsRoot,
  docsBaseRoot,
  prettierConfig,
  includeFrontmatter,
  state,
}: {
  inputPath: string
  docsRoot: string
  docsBaseRoot: string
  prettierConfig: PrettierConfig
  includeFrontmatter: boolean
  state: ConvertState
}) {
  const raw = await fs.readFile(inputPath, 'utf-8')
  const { frontmatter, body } = splitFrontmatter(raw)
  const { importsByFile, cleanedBody } = extractImports(body)
  const componentCode = await collectComponentCode({
    importsByFile,
    inputDir: path.dirname(inputPath),
    docsRoot,
    docsBaseRoot,
    prettierConfig,
    state,
  })

  let outputBody = cleanedBody
  outputBody = stripWrapperTags(outputBody, [
    'VisibilityByTheme',
    'VisibleWhenVisualTest',
  ])
  outputBody = replaceComponentUsages(outputBody, componentCode)

  const metadataUrl = buildMetadataUrlFromPath(inputPath, docsRoot)
  const outputFrontmatter = includeFrontmatter
    ? addMetadataToFrontmatter(frontmatter, metadataUrl)
    : ''
  const output = [outputFrontmatter, outputBody.trim()]
    .filter(Boolean)
    .join('\n\n')
  const formattedOutput = await prettier.format(output, {
    ...prettierConfig,
    parser: 'markdown',
  })
  return `${formattedOutput.trim()}\n`
}

function buildMetadataUrlFromPath(filePath: string, docsRoot: string) {
  const rel = path.relative(docsRoot, filePath)
  const { slug } = toSlugAndDir(rel)
  return `${PUBLIC_URL}${slug}metadata.json`
}

function addMetadataToFrontmatter(
  frontmatter: string,
  metadataUrl: string
) {
  if (!frontmatter) {
    return `---\nmetadata: ${metadataUrl}\n---`
  }
  const lines = frontmatter
    .replace(/^---\n/, '')
    .replace(/\n---$/, '')
    .split('\n')
  const cleaned: string[] = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()
    if (!trimmed) {
      continue
    }
    const keyMatch = /^([A-Za-z0-9_-]+):/.exec(trimmed)
    if (!keyMatch) {
      continue
    }
    const key = keyMatch[1]
    if (key === 'title' || key === 'description') {
      cleaned.push(line)
    }
  }
  cleaned.push(`metadata: ${metadataUrl}`)
  return `---\n${cleaned.join('\n')}\n---`
}

function splitFrontmatter(content: string) {
  const match = content.match(/^---\n[\s\S]*?\n---\n/)
  if (!match) {
    return { frontmatter: '', body: content }
  }
  const frontmatter = match[0].trimEnd()
  const body = content.slice(match[0].length)
  return { frontmatter, body }
}

function extractImports(content: string) {
  const importsByFile = new Map<string, string[]>()
  const lines = content.split('\n')
  const output: string[] = []
  let inFence = false
  let inImportBlock = false
  let importLines: string[] = []

  for (const line of lines) {
    const fenceMatch = line.match(/^(```+|~~~+)/)
    if (fenceMatch) {
      inFence = !inFence
      output.push(line)
      continue
    }

    if (!inFence) {
      const trimmed = line.trim()
      if (inImportBlock) {
        importLines.push(line)
        const joined = importLines.join(' ').trim()
        if (/\bfrom\s+['"][^'"]+['"]/.test(joined)) {
          collectImportSpecifiers(joined, importsByFile)
          inImportBlock = false
          importLines = []
        }
        continue
      }
      if (/^import\s+/.test(trimmed)) {
        if (/^import\s+type\s+/.test(trimmed)) {
          continue
        }
        if (!/\bfrom\s+['"][^'"]+['"]/.test(trimmed)) {
          inImportBlock = true
          importLines = [line]
          continue
        }
        collectImportSpecifiers(trimmed, importsByFile)
        continue
      }
    }

    output.push(line)
  }

  return {
    importsByFile,
    cleanedBody: output.join('\n').replace(/\n{3,}/g, '\n\n'),
  }
}

function collectImportSpecifiers(
  statement: string,
  importsByFile: Map<string, string[]>
) {
  if (/^import\s+type\s+/.test(statement)) {
    return
  }
  const sourceMatch = statement.match(/from\s+['"]([^'"]+)['"]/)
  if (!sourceMatch) {
    return
  }

  const source = sourceMatch[1]
  const specifierPart = statement
    .replace(/^import\s+/, '')
    .replace(/\s+from\s+['"][^'"]+['"]\s*;?$/, '')
    .trim()

  const specifiers: string[] = []
  const namespaceMatch = specifierPart.match(/\*\s+as\s+([A-Za-z0-9_]+)/)
  if (namespaceMatch && namespaceMatch[1]) {
    specifiers.push(`* as ${namespaceMatch[1]}`)
  }
  const defaultPart = specifierPart.split(',')[0].trim()
  if (
    defaultPart &&
    !defaultPart.startsWith('{') &&
    !defaultPart.startsWith('*')
  ) {
    specifiers.push(defaultPart)
  }

  const namedMatch = specifierPart.match(/\{([\s\S]+)\}/)
  if (namedMatch) {
    const namedSpecifiers = namedMatch[1]
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const parts = item.split(/\s+as\s+/)
        return parts[1] ? parts[1].trim() : parts[0].trim()
      })
    specifiers.push(...namedSpecifiers)
  }

  if (specifiers.length > 0) {
    const existing = importsByFile.get(source) || []
    importsByFile.set(source, existing.concat(specifiers))
  }
}

async function collectComponentCode({
  importsByFile,
  inputDir,
  docsRoot,
  docsBaseRoot,
  prettierConfig,
  state,
}: {
  importsByFile: Map<string, string[]>
  inputDir: string
  docsRoot: string
  docsBaseRoot: string
  prettierConfig: PrettierConfig
  state: ConvertState
}) {
  const componentCode = new Map<string, ComponentEntry>()
  const parsedFiles = new Map<string, Map<string, string>>()
  const mdxCache = state.mdxCache
  const inProgress = state.inProgress
  const parser = await import('@babel/parser')
  const traverseModule = await import('@babel/traverse')
  const generateModule = await import('@babel/generator')
  const typesModule = await import('@babel/types')
  const traverse =
    (traverseModule as any).default?.default ||
    (traverseModule as any).default ||
    traverseModule
  const generate =
    (generateModule as any).default?.default ||
    (generateModule as any).default ||
    generateModule
  const t = (typesModule as any).default || typesModule

  for (const [source, names] of importsByFile.entries()) {
    const resolvedPath = resolveImportPath({
      source,
      inputDir,
      docsRoot,
      docsBaseRoot,
    })
    if (!resolvedPath) {
      continue
    }

    if (resolvedPath.endsWith('.mdx')) {
      let md = mdxCache.get(resolvedPath)
      if (!md && !inProgress.has(resolvedPath)) {
        inProgress.add(resolvedPath)
        md = await convertMdxToMd({
          inputPath: resolvedPath,
          docsRoot,
          docsBaseRoot,
          prettierConfig,
          includeFrontmatter: false,
          state,
        })
        inProgress.delete(resolvedPath)
        mdxCache.set(resolvedPath, md)
      }
      if (md) {
        for (const name of names) {
          const trimmed = md.trim()
          if (trimmed) {
            componentCode.set(name, { code: trimmed, format: 'md' })
          }
        }
      }
      continue
    }

    if (!/\.[jt]sx?$/.test(resolvedPath)) {
      continue
    }

    let fileCode = parsedFiles.get(resolvedPath)
    if (!fileCode) {
      const sourceCode = await fs.readFile(resolvedPath, 'utf-8')
      const ast = parser.parse(sourceCode, {
        sourceType: 'module',
        plugins: ['typescript', 'jsx'],
      })
      fileCode = await extractExports(
        ast,
        t,
        traverse,
        generate,
        prettierConfig
      )
      parsedFiles.set(resolvedPath, fileCode)
    }

    for (const name of names) {
      if (name.startsWith('* as ')) {
        const ns = name.replace('* as ', '').trim()
        if (ns) {
          for (const [exportName, exportCode] of fileCode.entries()) {
            componentCode.set(`${ns}.${exportName}`, {
              code: exportCode,
              format: 'tsx',
            })
          }
        }
        continue
      }
      const code = fileCode.get(name)
      if (code) {
        componentCode.set(name, { code, format: 'tsx' })
      }
    }
  }

  return componentCode
}

function resolveImportPath({
  source,
  inputDir,
  docsRoot,
  docsBaseRoot,
}: {
  source: string
  inputDir: string
  docsRoot: string
  docsBaseRoot: string
}) {
  let candidate: string | null = null
  if (source.startsWith('Docs/')) {
    candidate = path.join(docsBaseRoot, source.replace(/^Docs\//, ''))
  } else if (source.startsWith('.')) {
    candidate = path.resolve(inputDir, source)
  } else {
    return null
  }

  return resolveWithExtension(candidate)
}

function resolveWithExtension(basePath: string) {
  const extensions = ['.tsx', '.ts', '.jsx', '.js', '.mdx']
  if (fs.existsSync(basePath) && fs.statSync(basePath).isFile()) {
    return basePath
  }

  for (const ext of extensions) {
    const withExt = `${basePath}${ext}`
    if (fs.existsSync(withExt)) {
      return withExt
    }
  }

  return null
}

async function extractExports(
  ast: File,
  t: any,
  traverse: any,
  generate: any,
  prettierConfig: PrettierConfig
) {
  const exportsMap = new Map<string, string>()
  const exportEntries: Array<{ name: string; jsxNode: any }> = []

  traverse(ast, {
    ExportNamedDeclaration(path: any) {
      const declaration = path.node.declaration
      if (t.isVariableDeclaration(declaration)) {
        for (const declarator of declaration.declarations) {
          if (!t.isIdentifier(declarator.id)) {
            continue
          }
          const name = declarator.id.name
          const init = declarator.init
          const jsxNode = getReturnedJSX(init, t)
          if (jsxNode) {
            exportEntries.push({ name, jsxNode })
          }
        }
      } else if (t.isFunctionDeclaration(declaration)) {
        const name = declaration.id?.name
        const jsxNode = getReturnedJSX(declaration, t)
        if (name && jsxNode) {
          exportEntries.push({ name, jsxNode })
        }
      }
    },
  })

  for (const entry of exportEntries) {
    const code = await formatJSXChildren(
      entry.jsxNode,
      t,
      generate,
      prettierConfig
    )
    if (code) {
      exportsMap.set(entry.name, code)
    }
  }

  return exportsMap
}

function getReturnedJSX(fnNode: any, t: any) {
  if (!fnNode) {
    return null
  }

  if (t.isArrowFunctionExpression(fnNode)) {
    if (t.isJSXElement(fnNode.body) || t.isJSXFragment(fnNode.body)) {
      return fnNode.body
    }
    if (t.isBlockStatement(fnNode.body)) {
      const returnStmt = fnNode.body.body.find((node: any) =>
        t.isReturnStatement(node)
      )
      const arg = returnStmt?.argument
      if (t.isJSXElement(arg) || t.isJSXFragment(arg)) {
        return arg
      }
    }
  }

  if (t.isFunctionDeclaration(fnNode) || t.isFunctionExpression(fnNode)) {
    const returnStmt = fnNode.body.body.find((node: any) =>
      t.isReturnStatement(node)
    )
    const arg = returnStmt?.argument
    if (t.isJSXElement(arg) || t.isJSXFragment(arg)) {
      return arg
    }
  }

  return null
}

async function formatJSXChildren(
  jsxNode: any,
  t: any,
  generate: any,
  prettierConfig: PrettierConfig
) {
  let children: any[] = []

  if (t.isJSXElement(jsxNode)) {
    const name = jsxNode.openingElement.name
    if (t.isJSXIdentifier(name) && name.name === 'ComponentBox') {
      children = jsxNode.children
    } else {
      children = [jsxNode]
    }
  } else if (t.isJSXFragment(jsxNode)) {
    children = jsxNode.children
  }

  const filteredChildren = children.filter((child) => {
    return !(t.isJSXText(child) && !child.value.trim())
  })

  if (filteredChildren.length === 0) {
    return ''
  }

  let childCode: string[]
  let fromStatements = false
  if (filteredChildren.length === 1) {
    const single = filteredChildren[0]
    if (t.isJSXExpressionContainer(single)) {
      const expr = single.expression
      if (t.isParenthesizedExpression(expr)) {
        single.expression = expr.expression
      }
      if (
        t.isArrowFunctionExpression(single.expression) ||
        t.isFunctionExpression(single.expression)
      ) {
        const body = single.expression.body
        if (t.isBlockStatement(body)) {
          fromStatements = true
          const statements = body.body
          const last = statements[statements.length - 1]
          if (t.isReturnStatement(last) && last.argument) {
            const renderCall = t.expressionStatement(
              t.callExpression(t.identifier('render'), [last.argument])
            )
            childCode = statements
              .slice(0, -1)
              .concat(renderCall)
              .map((stmt: any) => generate(stmt).code)
          } else {
            childCode = statements.map((stmt: any) => generate(stmt).code)
          }
        } else if (t.isJSXElement(body) || t.isJSXFragment(body)) {
          childCode = [generate(body).code]
        } else {
          childCode = [generate(single).code]
        }
      } else {
        childCode = [generate(single).code]
      }
    } else {
      childCode = [generate(single).code]
    }
  } else {
    childCode = filteredChildren.map((child) => generate(child).code)
  }
  let code = childCode.join('\n')
  if (filteredChildren.length === 1 && !fromStatements) {
    const onlyChild = filteredChildren[0]
    if (t.isJSXElement(onlyChild) || t.isJSXFragment(onlyChild)) {
      code = `render(${generate(onlyChild).code})`
    }
  }
  if (childCode.length > 1 && !fromStatements) {
    code = `<>${childCode.join('\n')}</>`
  }

  try {
    code = await prettier.format(code, {
      ...prettierConfig,
      parser: 'babel-ts',
    })
  } catch {
    return code.trim()
  }

  code = code.replace(/(^|\n)\s*;(?=\s*[A-Za-z<(])/g, '$1')

  if (childCode.length > 1 && !fromStatements) {
    code = code.replace(/^<>|<\/>$|^\s{2}/gm, '')
  }

  return code.trim()
}

function stripWrapperTags(content: string, tagNames: string[]) {
  let output = content
  for (const tag of tagNames) {
    const openTag = new RegExp(`<${tag}[^>]*>`, 'g')
    const closeTag = new RegExp(`</${tag}>`, 'g')
    output = output.replace(openTag, '').replace(closeTag, '')
  }
  return output
}

function replaceComponentUsages(
  content: string,
  componentCode: Map<string, ComponentEntry | string>
) {
  const componentRegex =
    /<([A-Z][A-Za-z0-9_]*(?:\.[A-Za-z0-9_]+)*)\s*\/>/g

  return content.replace(componentRegex, (match, name) => {
    const entry = componentCode.get(name)
    if (!entry) {
      return match
    }
    if (typeof entry === 'string') {
      return `\n\`\`\`tsx\n${entry}\n\`\`\`\n`
    }
    if (entry.format === 'md') {
      return `\n${entry.code}\n`
    }
    if (looksLikeMarkdown(entry.code)) {
      return `\n${entry.code}\n`
    }
    return `\n\`\`\`tsx\n${entry.code}\n\`\`\`\n`
  })
}

function looksLikeMarkdown(code: string) {
  return /(^|\n)#{1,6}\s+\S/.test(code) || /```/.test(code)
}
