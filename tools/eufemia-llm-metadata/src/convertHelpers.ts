import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import crypto from 'crypto'
import frontMatter from 'front-matter'
import * as prettier from 'prettier'
import { extractMarkdownTables } from 'markdown-tables-utils'
import type { File } from '@babel/types'

const fm = frontMatter as unknown as typeof import('front-matter').default

const DEFAULT_PUBLIC_URL =
  process.env.CF_PAGES_URL || 'https://eufemia.dnb.no'
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
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export function getPortalPaths(store: any) {
  const { program } = store.getState()
  const siteDir = program.directory
  const docsRoot = path.join(siteDir, 'src', 'docs', 'uilib')
  const metadataRoot = path.join(siteDir, 'public')
  return { siteDir, docsRoot, metadataRoot }
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
  infoFile,
  propsFile,
  eventsFile,
  demosFile,
  version,
  publicUrlBase = DEFAULT_PUBLIC_URL,
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
  infoFile: string | null
  propsFile: string | null
  eventsFile: string | null
  demosFile: string | null
  version: string
  publicUrlBase?: string
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
    docs: `${slug.replace(/\/$/, '')}.md`,
    props: propsList,
    events: eventsList,
    related: relatedList,
    checksum,
    source: sourceInfo,
    sources: {
      entry: {
        local: toWorkspacePath(file, siteDir),
        public: toPublicUrl(slug, publicUrlBase),
      },
      info: infoFile
        ? {
            local: toWorkspacePath(infoFile, siteDir),
            public: toPublicUrl(joinSlug(slug, 'info/'), publicUrlBase),
          }
        : null,
      demos: demosFile
        ? {
            local: toWorkspacePath(demosFile, siteDir),
            public: toPublicUrl(joinSlug(slug, 'demos/'), publicUrlBase),
          }
        : null,
      props: propsFile
        ? {
            local: toWorkspacePath(propsFile, siteDir),
            public: toPublicUrl(
              joinSlug(slug, 'properties/'),
              publicUrlBase
            ),
          }
        : null,
      events: eventsFile
        ? {
            local: toWorkspacePath(eventsFile, siteDir),
            public: toPublicUrl(joinSlug(slug, 'events/'), publicUrlBase),
          }
        : null,
    },
    version,
    generatedAt: new Date().toISOString(),
    schemaVersion: 1,
  }
}

export async function writeLlmsText({
  siteDir,
  results,
  version,
  outputRoot,
  llmsFilename = 'llms.txt',
  publicUrlBase = DEFAULT_PUBLIC_URL,
}: {
  siteDir: string
  results: Array<any>
  version: string
  outputRoot?: string
  llmsFilename?: string
  publicUrlBase?: string
}) {
  const hydrated: Array<any> = results || []
  const llmsPath = path.join(
    outputRoot || path.join(siteDir, 'public'),
    llmsFilename
  )
  const llmsContent = await formatLlmsText(
    buildLlmsText(hydrated, {
      version,
      publicUrlBase,
    }),
    siteDir
  )

  await fs.writeFile(llmsPath, llmsContent, 'utf-8')
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

function normalizePublicUrlBase(publicUrlBase: string) {
  // Remove trailing slashes - use non-greedy quantifier to prevent ReDoS
  return publicUrlBase.replace(/\/+?$/, '')
}

export function toPublicUrl(
  slugPath: string,
  publicUrlBase: string = DEFAULT_PUBLIC_URL
) {
  const base = normalizePublicUrlBase(publicUrlBase || '')

  if (!base) {
    return slugPath
  }
  return `${base}${slugPath}`
}

export async function findEntryMdxFiles(docsRoot: string) {
  const files = await listFilesRecursive(docsRoot)
  const candidates = files.filter((f) => {
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
  const withDraftFlags: Array<{ file: string; isDraft: boolean }> = []

  for (const file of candidates) {
    const isDraft = await isDraftMdx(file)
    withDraftFlags.push({ file, isDraft })
  }
  return withDraftFlags
    .filter((entry) => !entry.isDraft)
    .map((entry) => entry.file)
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

async function isDraftMdx(file: string) {
  try {
    const src = await fs.readFile(file, 'utf-8')
    const { attributes } = fm(src)
    const raw = attributes && (attributes as any).draft

    if (raw === true) {
      return true
    }

    if (typeof raw === 'string' && raw.toLowerCase() === 'true') {
      return true
    }
  } catch {
    return false
  }
  return false
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
  const tables = extractMarkdownTables(md)
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

export function findRepoRoot() {
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
  {
    version,
    publicUrlBase = DEFAULT_PUBLIC_URL,
  }: { version: string; publicUrlBase?: string }
) {
  const normalizedResults = results.filter((entry) => entry && entry.meta)
  const lines: string[] = []
  const generatedAt = new Date().toISOString()
  const base = normalizePublicUrlBase(publicUrlBase || '')

  appendLlmsHeaderTemplate(lines, base)

  const filtered = normalizedResults.filter((e) => {
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
  const order = ['components', 'extensions', 'elements']
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
    const slug = String(meta?.slug || '')
    const prefix = slug.includes('/extensions/forms/Value/')
      ? 'Value'
      : slug.includes('/extensions/forms/feature-fields/')
      ? 'Field'
      : null
    const hasPrefix =
      prefix && typeof meta?.name === 'string'
        ? meta.name.startsWith(`${prefix}.`)
        : false
    const displayName =
      prefix && !hasPrefix ? `${prefix}.${meta.name}` : meta.name
    const publicUrl =
      meta?.sources?.entry?.public || toPublicUrl(slug, publicUrlBase)
    const mdCopy = publicUrl.endsWith('/')
      ? publicUrl.replace(/\/$/, '.md')
      : `${publicUrl}.md`
    const desc = meta.description
      ? String(meta.description).replace(/\s+/g, ' ').trim()
      : 'Look into the documentation for more details.'
    lines.push(`- [${displayName}](${mdCopy}): ${desc}`)
    lines.push('')
  }
  const rest = filtered.filter(
    (entry) => !order.includes(entry.meta?.group || 'unlisted')
  )

  if (rest.length > 0) {
    lines.push('## General')
    lines.push('')

    for (const { meta } of rest) {
      pushEntry(meta)

      if (meta?.slug) {
        printed.add(meta.slug)
      }
    }
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

  lines.push('')
  lines.push(`Version: ${version}`)
  lines.push(`GeneratedAt: ${generatedAt}`)

  return lines.join('\n')
}

function appendLlmsHeaderTemplate(lines: string[], base: string) {
  const templatePath = path.join(__dirname, 'templates', 'llm-header.md')

  try {
    const raw = fs.readFileSync(templatePath, 'utf-8')
    const content = raw.replace(/{{BASE}}/g, base)
    const trimmed = content.trimEnd()

    if (trimmed) {
      lines.push(...trimmed.split('\n'))
      lines.push('')
    }
  } catch {
    // Keep output usable even if the template is missing.
  }
}

async function formatLlmsText(content: string, siteDir: string) {
  const prettierConfigPath = path.join(siteDir, '.prettierrc')
  let prettierConfig: PrettierConfig = {}

  try {
    const rawConfig = await fs.readFile(prettierConfigPath, 'utf-8')
    prettierConfig = JSON.parse(rawConfig) as PrettierConfig
  } catch {
    prettierConfig = {}
  }
  const formatted = await prettier.format(content, {
    ...prettierConfig,
    parser: 'markdown',
  })
  return `${formatted.trim()}\n`
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
  const { default: babel } = await import('@babel/core')
  const { default: transformTS } = await import(
    '@babel/plugin-transform-typescript'
  )
  const { default: transformCJS } = await import(
    '@babel/plugin-transform-modules-commonjs'
  )
  const vm = await import('node:vm')
  const moduleApi = await import('node:module')
  const localRequire = (moduleApi as any).createRequire(file)

  let code = await fs.readFile(file, 'utf-8')
  const injection = await buildDocsInjectionPrelude(file, code)

  code = code.replace(
    /(^\s*import[\s\S]*?from\s+['"][^'"]+['"][^\n]*$)/gm,
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
    const normalized: Record<string, any> = {
      doc: String((entry as any).doc ?? (entry as any).description ?? ''),
      type: (entry as any).type ?? null,
      status: (entry as any).status ?? null,
    }

    if (Object.hasOwn(entry, 'defaultValue')) {
      normalized.defaultValue = (entry as any).defaultValue ?? null
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
  outputRoot,
  publicUrlBase = DEFAULT_PUBLIC_URL,
  metadataBySlug,
}: {
  siteDir: string
  docsRoot: string
  outputRoot?: string
  publicUrlBase?: string
  metadataBySlug?: Map<
    string,
    {
      version?: string | null
      generatedAt?: string | null
      checksum?: string | null
    }
  >
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
    const resolvedOutputRoot = outputRoot || path.join(siteDir, 'public')
    const mdOutputPath = path.join(
      resolvedOutputRoot,
      slug.replace(/\/$/, '') + '.md'
    )
    const outputDir = path.dirname(mdOutputPath)
    const entryLinks = {
      ...(metadataBySlug?.get(slug) || {}),
    }

    const md = await convertMdxToMd({
      inputPath: file,
      docsRoot,
      docsBaseRoot,
      prettierConfig,
      includeFrontmatter: true,
      publicUrlBase,
      state,
      frontmatterLinks: entryLinks,
    })
    const { propsFile, eventsFile } = await findDocExtras(file)
    const extras: string[] = []

    if (propsFile) {
      const propsMd = await convertMdxToMd({
        inputPath: propsFile,
        docsRoot,
        docsBaseRoot,
        prettierConfig,
        includeFrontmatter: false,
        publicUrlBase,
        state,
        frontmatterLinks: entryLinks,
      })
      extras.push(propsMd)
    }

    if (eventsFile) {
      const eventsMd = await convertMdxToMd({
        inputPath: eventsFile,
        docsRoot,
        docsBaseRoot,
        prettierConfig,
        includeFrontmatter: false,
        publicUrlBase,
        state,
        frontmatterLinks: entryLinks,
      })
      extras.push(eventsMd)
    }
    const combinedMd = [
      md.trimEnd(),
      ...extras.map((extra) => extra.trim()),
    ]
      .filter(Boolean)
      .join('\n\n')
    await fs.ensureDir(outputDir)
    await fs.writeFile(mdOutputPath, `${combinedMd.trim()}\n`, 'utf-8')
  }
}

export async function convertMdxToMd({
  inputPath,
  docsRoot,
  docsBaseRoot,
  prettierConfig,
  includeFrontmatter,
  publicUrlBase = DEFAULT_PUBLIC_URL,
  state,
  frontmatterLinks,
}: {
  inputPath: string
  docsRoot: string
  docsBaseRoot: string
  prettierConfig: PrettierConfig
  includeFrontmatter: boolean
  publicUrlBase?: string
  state: ConvertState
  frontmatterLinks?: {
    docUrl?: string | null
    propertiesUrl?: string | null
    eventsUrl?: string | null
    version?: string | null
    generatedAt?: string | null
    checksum?: string | null
  }
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

  const links = frontmatterLinks || {}
  const fallbackLink = resolveFallbackLink(inputPath, links)
  outputBody = await replacePropertiesTableWithJsonBlock(outputBody, {
    fallbackLink,
    importsByFile,
    inputDir: path.dirname(inputPath),
    docsRoot,
    docsBaseRoot,
  })
  outputBody = await replaceTranslationsTableWithJsonBlock(outputBody, {
    importsByFile,
    inputDir: path.dirname(inputPath),
    docsRoot,
    docsBaseRoot,
  })

  // Extract title from frontmatter and add as heading if not already present
  let titleHeading = ''

  if (frontmatter) {
    try {
      const { attributes } = fm(frontmatter)

      if (attributes && typeof (attributes as any).title === 'string') {
        const title = String((attributes as any).title).trim()
        // Check if body already starts with an H1 heading
        const trimmedBody = outputBody.trim()
        const startsWithHeading = /^#\s+/.test(trimmedBody)

        if (title && !startsWithHeading) {
          titleHeading = `# ${title}`
        }
      }
    } catch {
      // Ignore parsing errors
    }
  }

  const outputFrontmatter = includeFrontmatter
    ? addDocLinksToFrontmatter(frontmatter, links)
    : ''
  const output = [outputFrontmatter, titleHeading, outputBody.trim()]
    .filter(Boolean)
    .join('\n\n')
  const formattedOutput = await prettier.format(output, {
    ...prettierConfig,
    parser: 'markdown',
  })
  return `${formattedOutput.trim()}\n`
}

async function replacePropertiesTableWithJsonBlock(
  body: string,
  {
    fallbackLink,
    importsByFile,
    inputDir,
    docsRoot,
    docsBaseRoot,
  }: {
    fallbackLink: { label: string; url: string } | null
    importsByFile: Map<string, string[]>
    inputDir: string
    docsRoot: string
    docsBaseRoot: string
  }
) {
  const regex = /<PropertiesTable\b[\s\S]*?\/>/g

  if (!regex.test(body)) {
    return body
  }

  regex.lastIndex = 0

  const moduleCache = new Map<string, Record<string, any>>()
  let output = ''
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(body))) {
    output += body.slice(lastIndex, match.index)
    const tag = match[0]
    const attrs = parsePropertiesTableAttributes(tag)
    const propsName =
      attrs.props?.type === 'expression' ? attrs.props.value?.trim() : null
    const propsValue =
      propsName &&
      (await resolveImportedValue({
        propsName,
        importsByFile,
        inputDir,
        docsRoot,
        docsBaseRoot,
        moduleCache,
      }))

    if (propsValue) {
      const metadata: Record<string, any> = {
        props: propsValue,
      }

      for (const [name, attr] of Object.entries(attrs)) {
        if (name === 'props') {
          continue
        }
        const attrValue = convertPropertyAttribute(attr)
        if (attrValue !== undefined) {
          metadata[name] = attrValue
        }
      }

      if (metadata.valueType) {
        metadata.props = applyValueType(metadata.props, metadata.valueType)
      }

      output += renderJsonBlock(metadata)
    } else {
      if (fallbackLink) {
        output += `See ${fallbackLink.label}: ${fallbackLink.url}`
      } else {
        output += tag
      }
    }
    lastIndex = match.index + tag.length
  }

  output += body.slice(lastIndex)
  return output
}

type ParsedPropertyAttribute =
  | { type: 'expression'; value: string }
  | { type: 'string'; value: string }
  | { type: 'boolean' }

function parsePropertiesTableAttributes(tag: string) {
  const attrs: Record<string, ParsedPropertyAttribute> = {}
  const start = tag.indexOf('PropertiesTable')

  if (start === -1) {
    return attrs
  }

  const end = tag.lastIndexOf('/>')

  if (end === -1) {
    return attrs
  }

  const inner = tag.slice(start + 'PropertiesTable'.length, end).trim()
  let i = 0

  while (i < inner.length) {
    i = skipWhitespace(inner, i)

    if (i >= inner.length) {
      break
    }

    let name = ''

    while (i < inner.length && /[A-Za-z0-9_-]/.test(inner[i])) {
      name += inner[i++]
    }

    if (!name) {
      break
    }

    i = skipWhitespace(inner, i)
    let attr: ParsedPropertyAttribute

    if (inner[i] === '=') {
      i++
      i = skipWhitespace(inner, i)

      if (inner[i] === '{') {
        const { value, nextIndex } = readBalancedExpression(
          inner,
          i + 1,
          '{',
          '}'
        )
        attr = { type: 'expression', value: value.trim() }
        i = nextIndex
      } else if (inner[i] === '"' || inner[i] === "'") {
        const { value, nextIndex } = readString(inner, i)
        attr = { type: 'string', value }
        i = nextIndex
      } else {
        const value = readWord(inner, i)
        attr = { type: 'string', value }
        i += value.length
      }
    } else {
      attr = { type: 'boolean' }
    }

    attrs[name] = attr
  }

  return attrs
}

function convertPropertyAttribute(attr: ParsedPropertyAttribute) {
  if (!attr) {
    return undefined
  }
  if (attr.type === 'boolean') {
    return true
  }
  if (attr.type === 'string') {
    return attr.value
  }
  if (!attr.value) {
    return undefined
  }
  const expression = attr.value.trim()

  if (!expression) {
    return undefined
  }

  return evaluateAttributeExpression(expression)
}

function applyValueType(
  propsValue: Record<string, any>,
  valueTypeMeta: any
): Record<string, any> {
  if (!propsValue || valueTypeMeta === undefined) {
    return propsValue
  }

  const replace = (typeField: any): any => {
    if (typeof typeField === 'string') {
      if (typeField === '{valueType}') {
        return valueTypeMeta
      }
      return typeField
    }
    if (Array.isArray(typeField)) {
      const expanded = typeField.flatMap((entry) => {
        const replaced = replace(entry)
        return Array.isArray(replaced) ? replaced : [replaced]
      })
      return expanded
    }
    return typeField
  }

  const result: Record<string, any> = {}

  for (const [key, entry] of Object.entries(propsValue)) {
    if (!entry || typeof entry !== 'object') {
      result[key] = entry
      continue
    }
    result[key] = {
      ...entry,
      type: replace(entry.type),
    }
  }

  return result
}

function evaluateAttributeExpression(expression: string) {
  try {
    return new Function('"use strict"; return (' + expression + ')')()
  } catch {
    return expression
  }
}

function skipWhitespace(str: string, index: number) {
  while (index < str.length && /\s/.test(str[index])) {
    index++
  }
  return index
}

function readBalancedExpression(
  str: string,
  startIndex: number,
  open: string,
  close: string
) {
  let depth = 1
  let currentIndex = startIndex
  let value = ''
  let quote = ''

  while (currentIndex < str.length) {
    const char = str[currentIndex++]

    if (quote) {
      if (char === '\\') {
        value += char

        if (currentIndex < str.length) {
          value += str[currentIndex++]
        }
        continue
      }

      if (char === quote) {
        quote = ''
      }
      value += char
      continue
    }

    if (char === '"' || char === "'") {
      quote = char
      value += char
      continue
    }

    if (char === open) {
      depth++
      value += char
      continue
    }

    if (char === close) {
      depth--

      if (depth === 0) {
        break
      }
    }

    value += char
  }

  return { value, nextIndex: currentIndex }
}

function readString(str: string, startIndex: number) {
  const quote = str[startIndex]
  let currentIndex = startIndex + 1
  let value = ''

  while (currentIndex < str.length) {
    const char = str[currentIndex++]

    if (char === '\\') {
      if (currentIndex < str.length) {
        value += str[currentIndex++]
      }
      continue
    }

    if (char === quote) {
      break
    }

    value += char
  }

  return { value, nextIndex: currentIndex }
}

function readWord(str: string, startIndex: number) {
  let currentIndex = startIndex
  let value = ''

  while (currentIndex < str.length && /[^\s/>]/.test(str[currentIndex])) {
    value += str[currentIndex++]
  }

  return value
}

async function replaceTranslationsTableWithJsonBlock(
  body: string,
  {
    importsByFile,
    inputDir,
    docsRoot,
    docsBaseRoot,
  }: {
    importsByFile: Map<string, string[]>
    inputDir: string
    docsRoot: string
    docsBaseRoot: string
  }
) {
  const regex = /<TranslationsTable\b[^>]*\/>/g

  if (!regex.test(body)) {
    return body
  }
  regex.lastIndex = 0

  const moduleCache = new Map<string, Record<string, any>>()
  let output = ''
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(body))) {
    output += body.slice(lastIndex, match.index)
    const tag = match[0]
    const localeKeys = extractLocaleKeys(tag)

    if (!localeKeys || localeKeys.length === 0) {
      output += tag
      lastIndex = match.index + tag.length
      continue
    }

    const sourceName = extractSourceName(tag)
    const sourceValue = sourceName
      ? await resolveImportedValue({
          propsName: sourceName,
          importsByFile,
          inputDir,
          docsRoot,
          docsBaseRoot,
          moduleCache,
        })
      : null
    const translationsSource =
      sourceValue || (await loadDefaultTranslations())
    const json = buildTranslationsJson(translationsSource, localeKeys)

    if (!json) {
      output += tag
    } else {
      output += renderJsonBlock(json)
    }
    lastIndex = match.index + tag.length
  }

  output += body.slice(lastIndex)
  return output
}

function extractLocaleKeys(tag: string) {
  const directMatch = tag.match(/\blocaleKey\s*=\s*(['"])(.*?)\1/)

  if (directMatch && directMatch[2]) {
    return [directMatch[2]]
  }
  const braceMatch = tag.match(/\blocaleKey\s*=\s*\{([\s\S]*?)\}/)

  if (!braceMatch) {
    return null
  }
  const expr = braceMatch[1].trim()

  if (!expr) {
    return null
  }
  const stringMatch = expr.match(/^['"](.+?)['"]$/)

  if (stringMatch) {
    return [stringMatch[1]]
  }
  const keys: string[] = []
  const re = /['"]([^'"]+)['"]/g
  let m: RegExpExecArray | null
  while ((m = re.exec(expr))) {
    if (m[1]) {
      keys.push(m[1])
    }
  }
  return keys.length > 0 ? keys : null
}

function extractSourceName(tag: string) {
  const match = tag.match(/\bsource\s*=\s*\{([^}]+)\}/)

  if (!match) {
    return null
  }
  const expr = match[1].trim()

  if (/^[A-Za-z_$][\w$]*$/.test(expr)) {
    return expr
  }
  return null
}

function buildTranslationsJson(
  source: Record<string, any> | null,
  localeKeys: string[]
) {
  if (!source) {
    return null
  }

  const entries: Record<string, any> = {}
  const allowList: Record<string, string[]> = {}
  const normalizedKeys = (Array.isArray(localeKeys) ? localeKeys : [])
    .filter(Boolean)
    .map((key) => {
      if (key.includes('.')) {
        const first = key.split('.')[0]
        allowList[first] = allowList[first] || []
        allowList[first].push(key)
        return first
      }
      return key
    })

  const addToEntries = (
    key: string,
    translation: any,
    locale: string,
    localeKey: string
  ) => {
    const fullKey = `${localeKey}.${key}`

    if (allowList[localeKey] && !allowList[localeKey].includes(fullKey)) {
      return
    }

    entries[fullKey] = Object.assign(entries[fullKey] || {}, {
      [locale]: translation,
    })
  }

  Object.entries(source).forEach(([locale, translations]) => {
    normalizedKeys.forEach((localeKey) => {
      const translationsObj =
        translations && typeof translations === 'object'
          ? translations[localeKey]
          : null

      if (!translationsObj || typeof translationsObj !== 'object') {
        return
      }

      Object.entries(translationsObj).forEach(([key, translation]) => {
        if (
          translation &&
          typeof translation === 'object' &&
          !Array.isArray(translation)
        ) {
          const nestedKey = `${localeKey}.${key}`
          Object.entries(translation).forEach(([subKey, value]) => {
            addToEntries(subKey, value, locale, nestedKey)
          })
        } else {
          addToEntries(key, translation, locale, localeKey)
        }
      })
    })
  })

  const sortedEntries = Object.fromEntries(
    Object.entries(entries).sort(([a], [b]) => a.localeCompare(b))
  )
  const locales = Object.keys(source).sort()

  return {
    locales,
    entries: sortedEntries,
  }
}

function extendDeepLocal(target: Record<string, any>, ...sources: any[]) {
  for (const source of sources) {
    if (!source || typeof source !== 'object') {
      continue
    }

    for (const key of Object.keys(source)) {
      if (key === '__proto__' || key === 'constructor') {
        continue
      }
      const value = source[key]

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        if (!target[key] || typeof target[key] !== 'object') {
          target[key] = {}
        }
        extendDeepLocal(target[key], value)
      } else {
        target[key] = value
      }
    }
  }
  return target
}

function mergeTranslationsLocal(
  ...translations: Array<Record<string, any>>
) {
  return translations.reduce((acc, cur) => {
    if (!cur || typeof cur !== 'object') {
      return acc
    }
    Object.keys(cur).forEach((key) => {
      if (
        acc[key] !== null &&
        cur[key] !== null &&
        typeof acc[key] === 'object' &&
        typeof cur[key] === 'object' &&
        !Array.isArray(acc[key]) &&
        !Array.isArray(cur[key])
      ) {
        acc[key] = mergeTranslationsLocal(acc[key], cur[key])
      } else {
        acc[key] = cur[key]
      }
    })
    return acc
  }, {})
}

let defaultTranslationsCache: Record<string, any> | null = null

async function loadDefaultTranslations() {
  if (defaultTranslationsCache) {
    return defaultTranslationsCache
  }

  const nbNO = await loadModuleDefault(
    '@dnb/eufemia/src/shared/locales/nb-NO'
  )
  const enGB = await loadModuleDefault(
    '@dnb/eufemia/src/shared/locales/en-GB'
  )
  const nbNOForms = await loadModuleDefault(
    '@dnb/eufemia/src/extensions/forms/constants/locales/nb-NO'
  )
  const enGBForms = await loadModuleDefault(
    '@dnb/eufemia/src/extensions/forms/constants/locales/en-GB'
  )
  const nbNOCountries = await loadModuleDefault(
    '@dnb/eufemia/src/extensions/forms/constants/locales/countries/nb-NO'
  )
  const enGBCountries = await loadModuleDefault(
    '@dnb/eufemia/src/extensions/forms/constants/locales/countries/en-GB'
  )
  const svSE = await loadModuleDefault(
    '@dnb/eufemia/src/shared/locales/sv-SE'
  )
  const daDK = await loadModuleDefault(
    '@dnb/eufemia/src/shared/locales/da-DK'
  )
  const svSEForms = await loadModuleDefault(
    '@dnb/eufemia/src/extensions/forms/constants/locales/sv-SE'
  )
  const daDKForms = await loadModuleDefault(
    '@dnb/eufemia/src/extensions/forms/constants/locales/da-DK'
  )
  const svSECountries = await loadModuleDefault(
    '@dnb/eufemia/src/extensions/forms/constants/locales/countries/sv-SE'
  )
  const daDKCountries = await loadModuleDefault(
    '@dnb/eufemia/src/extensions/forms/constants/locales/countries/da-DK'
  )

  const translations = mergeTranslationsLocal(
    nbNO || {},
    enGB || {},
    nbNOForms || {},
    enGBForms || {},
    nbNOCountries || {},
    enGBCountries || {},
    svSE || {},
    svSEForms || {},
    svSECountries || {},
    daDK || {},
    daDKForms || {},
    daDKCountries || {}
  )

  defaultTranslationsCache = extendDeepLocal({}, translations || {})
  return defaultTranslationsCache
}

async function loadModuleDefault(modulePath: string) {
  try {
    const resolvedPath = resolveDocsImportPath({
      source: modulePath,
      inputDir: process.cwd(),
      docsRoot: process.cwd(),
      docsBaseRoot: process.cwd(),
    })

    if (!resolvedPath) {
      return null
    }
    const mod = await evaluateTsModule(resolvedPath)

    if (mod && Object.prototype.hasOwnProperty.call(mod, 'default')) {
      return mod.default
    }
    return mod || null
  } catch {
    return null
  }
}

function renderJsonBlock(value: any) {
  const json = JSON.stringify(value, null, 2)
  return `\n\`\`\`json\n${json}\n\`\`\`\n`
}

async function resolveImportedValue({
  propsName,
  importsByFile,
  inputDir,
  docsRoot,
  docsBaseRoot,
  moduleCache,
}: {
  propsName: string
  importsByFile: Map<string, string[]>
  inputDir: string
  docsRoot: string
  docsBaseRoot: string
  moduleCache: Map<string, Record<string, any>>
}) {
  for (const [source, names] of Array.from(importsByFile.entries())) {
    if (!names.includes(propsName)) {
      continue
    }
    const resolvedPath = resolveDocsImportPath({
      source,
      inputDir,
      docsRoot,
      docsBaseRoot,
    })

    if (!resolvedPath) {
      continue
    }
    let mod = moduleCache.get(resolvedPath)

    if (!mod) {
      try {
        mod = await evaluateTsModule(resolvedPath)
      } catch {
        mod = {}
      }
      moduleCache.set(resolvedPath, mod || {})
    }

    if (mod && Object.prototype.hasOwnProperty.call(mod, propsName)) {
      return mod[propsName]
    }
  }
  return null
}

function resolveFallbackLink(
  inputPath: string,
  links: {
    propertiesUrl?: string | null
    eventsUrl?: string | null
  }
) {
  const base = path.basename(inputPath).toLowerCase()

  if (base.includes('events')) {
    return links.eventsUrl
      ? { label: 'events', url: links.eventsUrl }
      : null
  }

  if (base.includes('properties')) {
    return links.propertiesUrl
      ? { label: 'properties', url: links.propertiesUrl }
      : null
  }
  return links.propertiesUrl
    ? { label: 'properties', url: links.propertiesUrl }
    : null
}

function addDocLinksToFrontmatter(
  frontmatter: string,
  links?: {
    docUrl?: string | null
    propertiesUrl?: string | null
    eventsUrl?: string | null
    version?: string | null
    generatedAt?: string | null
    checksum?: string | null
  }
) {
  const lines: string[] = []

  if (links?.propertiesUrl) {
    lines.push(`properties: ${links.propertiesUrl}`)
  }

  if (links?.eventsUrl) {
    lines.push(`events: ${links.eventsUrl}`)
  }

  if (links?.version) {
    lines.push(`version: ${links.version}`)
  }

  if (links?.generatedAt) {
    lines.push(`generatedAt: ${links.generatedAt}`)
  }

  if (links?.checksum) {
    lines.push(`checksum: ${links.checksum}`)
  }

  if (!frontmatter) {
    return lines.length > 0 ? `---\n${lines.join('\n')}\n---` : ''
  }
  const srcLines = frontmatter
    .replace(/^---\n/, '')
    .replace(/\n---$/, '')
    .split('\n')
  const cleaned: string[] = []

  for (let i = 0; i < srcLines.length; i++) {
    const line = srcLines[i]
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

  cleaned.push(...lines)

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
  const resolveModuleDefault = <T>(mod: T): T => {
    const maybeDefault = (mod as { default?: unknown }).default
    if (
      maybeDefault &&
      typeof maybeDefault === 'object' &&
      'default' in (maybeDefault as Record<string, unknown>)
    ) {
      return (maybeDefault as { default: T }).default
    }
    return (maybeDefault ?? mod) as T
  }
  const traverse = resolveModuleDefault(traverseModule)
  const generate = resolveModuleDefault(generateModule)
  const t = typesModule.default || typesModule

  for (const [source, names] of Array.from(importsByFile.entries())) {
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
          for (const [exportName, exportCode] of Array.from(
            fileCode.entries()
          )) {
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

function resolveDocsImportPath({
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
  if (source.startsWith('@dnb/eufemia/')) {
    const pkgRoot = findPackageRoot('@dnb/eufemia')

    if (!pkgRoot) {
      return null
    }
    const rel = source.replace(/^@dnb\/eufemia\//, '')
    return resolveWithExtension(path.join(pkgRoot, rel))
  }
  return resolveImportPath({ source, inputDir, docsRoot, docsBaseRoot })
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
  const componentRegex = /<([A-Z][A-Za-z0-9_]*(?:\.[A-Za-z0-9_]+)*)\s*\/>/g

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
