const fs = require('fs-extra')
const path = require('path')
const crypto = require('crypto')
const fm = require('front-matter')
const { Extractor } = require('markdown-tables-to-json')
const { isAllowed, loadRobots } = require('./robots.js')
const {
  getNextReleaseVersion,
} = require('@dnb/eufemia/scripts/postbuild/getNextReleaseVersion')

/**
 * Local Gatsby plugin: eufemia-llm-metadata
 *
 * Scans portal MDX docs and generates per-page JSON metadata
 * with props/events extracted from "properties.mdx" / "events.mdx" tables.
 *
 * Output files:
 *   public/llm/<slug>/metadata.json
 */

const PUBLIC_URL = process.env.CF_PAGES_URL || 'https://eufemia.dnb.no'
const REPO_URL = 'https://github.com/dnbexperience/eufemia'

// Global ignore list: any slug containing one of these path segments
// will be ignored for metadata generation and listing.
const IGNORE_SEGMENTS = new Set(['visual-tests'])

exports.onPreBuild = async ({ store, reporter }) => {
  const { program } = store.getState()
  const siteDir = program.directory
  const docsRoot = path.join(siteDir, 'src', 'docs', 'uilib')
  const publicRoot = path.join(siteDir, 'public', 'llm')

  reporter.info('[llm-metadata] Scanning MDX docs for entries')

  const version = (await getNextReleaseVersion()) || '0.0.0-development'
  const robots = await loadRobots(path.join(siteDir, 'static'))
  const entryFiles = await findEntryMdxFiles(docsRoot)

  const results = []
  for (const file of entryFiles) {
    const rel = path.relative(docsRoot, file) // e.g. components/button.mdx
    const { slug, dirForExtras } = toSlugAndDir(rel)

    // Respect robots: skip disallowed slugs
    if (!isAllowed(slug, robots)) {
      continue
    }

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

    // Start with empty collections
    let props = {}
    let events = {}

    // 1) Pull from Eufemia TS docs when available
    let tsDocsDir = null
    let relatedFromTs = []
    try {
      const tsRoot = path.join(
        path.dirname(require.resolve('@dnb/eufemia/package.json')),
        'src'
      )
      const relNoExt = rel.replace(/\.[^/.]+$/, '') // e.g. components/card
      tsDocsDir = path.join(tsRoot, ...relNoExt.split(path.sep))
      const tsDocs = await extractTsDocs(tsDocsDir)
      props = { ...props, ...tsDocs.props }
      events = { ...events, ...tsDocs.events }
      relatedFromTs = tsDocs.related || []
    } catch (e) {
      // ignore if not found
    }

    // 2) Merge in MDX table sources if present
    if (propsFile)
      props = { ...props, ...(await extractTableDocs(propsFile)) }
    if (eventsFile)
      events = { ...events, ...(await extractTableDocs(eventsFile)) }

    const name =
      (await extractTitleFromMdx(file)) ||
      (await extractTitleFromMdx(
        await findExisting([
          path.join(
            path.dirname(file),
            path.basename(file, path.extname(file)),
            'info.mdx'
          ),
          path.join(path.dirname(file), 'info.mdx'),
        ])
      )) ||
      toPascalCase(path.basename(file, path.extname(file)))
    const description =
      (await extractDescriptionFromMdx(file)) ||
      (await extractDescriptionFromMdx(
        await findExisting([
          path.join(
            path.dirname(file),
            path.basename(file, path.extname(file)),
            'info.mdx'
          ),
          path.join(path.dirname(file), 'info.mdx'),
        ])
      )) ||
      null
    const group = rel.split(path.sep)[0] || ''

    // Try to resolve component source file and type info for permalinks
    const sourceInfo = tsDocsDir
      ? await findSourceInfo({ tsDocsDir, name, version })
      : null

    const propsList = mapToArray(props)
    const eventsList = mapToArray(events)
    const relatedList = Array.from(new Set([...(relatedFromTs || [])]))
      .filter(Boolean)
      .sort()
    const checksum = makeChecksum({
      props: propsList,
      events: eventsList,
      related: relatedList,
    })

    const meta = {
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

    const outDir = path.join(publicRoot, dirForExtras)
    const outFile = path.join(outDir, 'metadata.json')
    await fs.ensureDir(outDir)
    await fs.writeJSON(outFile, meta, { spaces: 2 })

    results.push({ slug, outFile, meta })
  }

  // Write a root index for quick discovery
  await fs.ensureDir(publicRoot)
  await fs.writeJSON(
    path.join(publicRoot, 'index.json'),
    results.map((r) => ({
      slug: r.slug,
      path: toWorkspacePath(r.outFile, siteDir),
    })),
    { spaces: 2 }
  )

  // Write a human-readable llms.txt at public root for LLM crawlers
  const llmsPath = path.join(siteDir, 'public', 'llms.txt')
  const llmsContent = buildLlmsText(results, { version })
  await fs.writeFile(llmsPath, llmsContent, 'utf-8')

  reporter.info(
    `[llm-metadata] Wrote ${results.length} metadata files to /public/llm`
  )
}

function toWorkspacePath(abs, siteDir) {
  return path.relative(siteDir, abs)
}

function toSlugAndDir(rel) {
  // Convert portal docs mdx to site path (without leading slash in this function)
  // e.g. components/button.mdx -> /uilib/components/button
  const noExt = rel.replace(/\.[^/.]+$/, '')
  const slug = `/${path.posix.join(
    'uilib',
    noExt.split(path.sep).join('/')
  )}/`
  // Directory under /public/llm mirrors the slug path
  const dirForExtras = path.posix.join(slug).replace(/^\//, '') // drop leading slash for path.join
  return { slug, dirForExtras }
}

function joinSlug(slug, sub) {
  // slug always has trailing slash
  return slug + (sub.startsWith('/') ? sub.slice(1) : sub)
}

function toPublicUrl(slugPath) {
  return `${PUBLIC_URL}${slugPath}`
}

async function findEntryMdxFiles(docsRoot) {
  // Entry files are mdx files that are not named: info.mdx, demos.mdx, properties.mdx, events.mdx
  // and that live directly under docsRoot or subfolders
  const files = await listFilesRecursive(docsRoot)
  return files.filter((f) => {
    if (!f.endsWith('.mdx')) {
      return false
    }
    const base = path.basename(f)
    if (/^(info|demos|properties|events)\.mdx$/i.test(base)) {
      return false
    }
    // Skip any page paths starting with underscore in any segment (e.g. _internal/foo.mdx)
    const rel = path.relative(docsRoot, f)
    const segments = rel.split(path.sep)
    if (segments.some((s) => s.startsWith('_'))) {
      return false
    }
    // Skip any path segment in the global ignore list
    // Match both directory names and filenames without extension, case-sensitive.
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

async function listFilesRecursive(dir) {
  const out = []
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

async function findExisting(candidates) {
  for (const f of candidates) {
    try {
      const stat = await fs.stat(f)
      if (stat.isFile()) {
        return f
      }
    } catch (_) {
      // ignore
    }
  }
  return null
}

async function extractTableDocs(mdxFile) {
  // Parse markdown tables (first column: prop/event, second column: description)
  // using a minimal parser here to avoid introducing MDX compiler at build-time.

  const md = await fs.readFile(mdxFile, 'utf-8')
  const tables = Extractor.extractAllTables(md, 'rows')
  const collection = {}

  tables.forEach((rows) => {
    // first row is header, skip it
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
        if (k)
          collection[k] = {
            doc: desc,
          }
      })
    })
  })

  return collection
}

function normalizeKeyCell(cell) {
  // Handle "a or b" duplication and strip html/formatting
  const cleaned = cell
    .replace(/<code>([^<]*)<\/code>/g, '$1')
    .replace(/<[^<]*>([^<]*)<\/[^<]*>/g, '$1')
    .trim()
  if (!cleaned) {
    return []
  }
  return cleaned.split(/\s+or\s+/i).map((s) => s.trim())
}

function toPascalCase(s) {
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

function cleanDescription(s) {
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

function mapToArray(map) {
  try {
    return Object.entries(map || {}).map(([name, v]) => ({
      name,
      ...(v || {}),
    }))
  } catch {
    return []
  }
}

function makeChecksum({ props = [], events = [], related = [] }) {
  try {
    const normalizeEntry = (entry) => {
      const obj = { ...(entry || {}) }
      const keys = Object.keys(obj).sort()
      const out = {}
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

async function extractTitleFromMdx(mdxFile) {
  if (!mdxFile) {
    return null
  }
  try {
    const src = await fs.readFile(mdxFile, 'utf-8')
    const { attributes, body } = fm(src)
    if (attributes && typeof attributes.title === 'string') {
      return String(attributes.title).trim()
    }
    // Fallback: try first markdown heading like `# Title`
    const m = /\n\s*#\s+([^\n]+)\n/.exec(body || src)
    if (m && m[1]) {
      return m[1].trim()
    }
  } catch (_) {
    // ignore
  }
  return null
}

async function findSourceInfo({ tsDocsDir, name, version }) {
  try {
    // Candidate filenames in same folder as docs.
    // Prefer concrete component files over index files and include JS/TS variants.
    const candidates = [
      `${name}.tsx`,
      `${name}.ts`,
      `${name}.jsx`,
      `${name}.js`,
      'index.tsx',
      'index.ts',
      'index.jsx',
      'index.js',
    ].map((n) => path.join(tsDocsDir, n))

    let fileAbs = null
    for (const c of candidates) {
      try {
        const st = await fs.stat(c)
        if (st.isFile()) {
          fileAbs = c
          break
        }
      } catch (_) {
        // ignore
      }
    }

    if (!fileAbs) {
      return null
    }

    const fileRepoPath = path
      .relative(path.resolve(__dirname, '../..'), fileAbs)
      .replace(/\\/g, '/')
    const tag =
      /^\d+/.test(String(version)) && !version.includes('-') // like -development
        ? `v${version}`
        : 'main'
    const permalink = `${REPO_URL}/blob/${tag}/${fileRepoPath}`

    return {
      repo: REPO_URL,
      file: fileRepoPath,
      permalink,
    }
  } catch (_) {
    return null
  }
}

async function extractDescriptionFromMdx(mdxFile) {
  if (!mdxFile) {
    return null
  }
  try {
    const src = await fs.readFile(mdxFile, 'utf-8')
    const { attributes } = fm(src)
    if (attributes && typeof attributes.description === 'string') {
      return String(attributes.description).trim()
    }
  } catch (_) {
    // ignore
  }
  return null
}

function buildLlmsText(results, { version }) {
  const lines = []
  const generatedAt = new Date().toISOString()

  // H1 and summary
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

  // Exclude any entries containing ignored path segments
  const filtered = results.filter((e) => {
    try {
      const slug = String(e?.meta?.slug || '')
      const segments = slug.split('/').filter(Boolean)
      return !segments.some((s) => IGNORE_SEGMENTS.has(s))
    } catch {
      return true
    }
  })

  // Group entries
  const byGroup = new Map()
  for (const entry of filtered) {
    const g = entry.meta.group || 'unlisted'
    if (!byGroup.has(g)) byGroup.set(g, [])
    byGroup.get(g).push(entry)
  }
  const order = ['components', 'extensions', 'elements', 'unlisted']
  const title = (g) =>
    g === 'components'
      ? 'Components'
      : g === 'extensions'
      ? 'Extensions'
      : g === 'elements'
      ? 'Elements'
      : 'Unlisted'

  const printed = new Set()
  const pushEntry = (meta, outFile, { includeInternal = false } = {}) => {
    const publicUrl =
      meta?.sources?.entry?.public || PUBLIC_URL + meta.slug
    const metadataUrl = `${PUBLIC_URL}/llm${meta.slug}metadata.json`
    const mdCopy = publicUrl // In future we could provide .md copies (publicUrl.replace(/\/$/, '/index.md'))
    const checksum = readChecksumFromFile(outFile) || 'not available'
    const desc = meta.description
      ? String(meta.description).replace(/\s+/g, ' ').trim()
      : 'Look into the documentation for more details.'
    lines.push(`- [${meta.name}](${mdCopy}): ${desc}`)
    lines.push(`  - Metadata: ${metadataUrl}`)
    lines.push(`  - Docs: ${publicUrl}`)
    if (hasDemosPage(outFile, meta?.slug)) {
      lines.push(`  - Demos: ${publicUrl}demos/`)
    }
    lines.push(`  - Checksum: ${checksum}`)
    if (includeInternal) {
      const propsLocal = meta?.sources?.props?.local
      const eventsLocal = meta?.sources?.events?.local
      const parts = []
      if (propsLocal) {
        parts.push('`' + propsLocal + '`')
      }
      if (eventsLocal) {
        parts.push('`' + eventsLocal + '`')
      }
      if (parts.length > 0) {
        lines.push(`  - Internal sources: ${parts.join(', ')}`)
      }
    }
    lines.push('')
  }
  for (const g of order) {
    const list = byGroup.get(g)
    if (!list || list.length === 0) {
      continue
    }
    lines.push(`## ${title(g)}`)
    lines.push('')
    const withContent = list.filter(({ meta }) => {
      const hasProps = Array.isArray(meta?.props) && meta.props.length > 0
      const hasEvents =
        Array.isArray(meta?.events) && meta.events.length > 0
      return hasProps || hasEvents
    })
    if (withContent.length === 0) {
      continue
    }
    for (const { meta, outFile } of withContent) {
      pushEntry(meta, outFile)
      if (meta?.slug) {
        printed.add(meta.slug)
      }
    }
  }

  // Other: list the rest of pages not printed above
  const rest = filtered.filter((e) => !printed.has(e?.meta?.slug))
  if (rest.length > 0) {
    lines.push('## Other')
    lines.push('')
    for (const { meta, outFile } of rest) {
      pushEntry(meta, outFile, { includeInternal: true })
    }
  }

  return lines.join('\n')
}

function readChecksumFromFile(file) {
  try {
    const json = JSON.parse(require('fs').readFileSync(file, 'utf-8'))
    return json && json.checksum ? String(json.checksum) : null
  } catch (_) {
    return null
  }
}

function hasDemosPage(outFile, slug) {
  try {
    const publicRoot = findPublicRootFromOutFile(outFile)
    if (!publicRoot || !slug) {
      return false
    }
    const dir = String(slug).replace(/^\//, '').replace(/\/$/, '')
    const demosPath = path.join(publicRoot, dir, 'demos', 'index.html')
    return require('fs').existsSync(demosPath)
  } catch (_) {
    return false
  }
}

function findPublicRootFromOutFile(outFile) {
  // outFile points to public/llm/<slug>/metadata.json — walk up to 'llm', then return its parent
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

async function extractTsDocs(dir) {
  const out = { props: {}, events: {}, __exportNames: [], related: [] }
  let entries
  try {
    entries = await fs.readdir(dir, { withFileTypes: true })
  } catch (_) {
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
        if (
          (exportName.includes('Properties') ||
            exportName.includes('Events')) &&
          value &&
          typeof value === 'object'
        ) {
          out.__exportNames.push(exportName)
          for (const [key, entry] of Object.entries(value)) {
            const relMatch = /^\[([^\]]+)\]/.exec(key)
            if (relMatch && relMatch[1]) {
              out.related.push(relMatch[1])
              continue // skip linked/aggregated props
            }
            if (!entry || typeof entry !== 'object') {
              continue
            }
            const normalized = {
              doc: String(entry.doc ?? entry.description ?? ''),
              type: entry.type ?? null,
              status: entry.status ?? null,
              defaultValue: entry.defaultValue ?? null,
            }
            if (exportName.includes('Events')) {
              out.events[key] = normalized
            } else {
              out.props[key] = normalized
            }
          }
        }
      }
    } catch (_) {
      // ignore file if it fails
    }
  }

  return out
}

async function evaluateTsModule(file) {
  const babel = require('@babel/core')
  const transformTS = require('@babel/plugin-transform-typescript')
  const transformCJS = require('@babel/plugin-transform-modules-commonjs')
  const vm = require('vm')

  let code = await fs.readFile(file, 'utf-8')
  // Build injection prelude for imported *Docs modules so spreads work
  const injection = await buildDocsInjectionPrelude(file, code)

  // Textually remove all import declarations (including multiline) to avoid duplicate bindings
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

  const sandbox = { module: { exports: {} }, exports: {}, require }
  vm.createContext(sandbox)
  vm.runInContext(result.code, sandbox, { filename: file })
  const exp = sandbox.exports
  const mod = sandbox.module && sandbox.module.exports
  return (exp && Object.keys(exp).length ? exp : mod) || {}
}

async function buildDocsInjectionPrelude(file, source) {
  const parser = require('@babel/parser')
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

  const mappings = []
  for (const node of ast.program.body) {
    if (node.type !== 'ImportDeclaration') {
      continue
    }
    const src = node.source && node.source.value
    if (!src || !/Docs(\.[tj]sx?)?$/i.test(src)) {
      continue
    }
    const names = node.specifiers
      .filter((s) => s.type === 'ImportSpecifier')
      .map((s) => (s.imported && s.imported.name) || s.local.name)
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
      const val = mod && Object.hasOwn(mod, n) ? mod[n] : {}
      prelude += `const ${n} = ${JSON.stringify(val)};\n`
    }
  }
  return prelude
}

async function resolveDocsModulePath(baseDir, modPath) {
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
    } catch (_) {
      // ignore
    }
  }
  return null
}
