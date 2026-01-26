import path from 'path'
import fs from 'fs-extra'
import { fileURLToPath, pathToFileURL } from 'url'
import { isAllowed, loadRobots } from '../src/robots.ts'
import {
  buildMetadata,
  createMarkdownCopies,
  extractTableDocs,
  findDocExtras,
  findEntryMdxFiles,
  findSourceInfo,
  findRepoRoot,
  loadTsDocs,
  mergeDocs,
  resolveMetaText,
  toSlugAndDir,
  writeLlmsText,
} from '../src/convertHelpers.ts'
import { getNextReleaseVersion } from '../src/getNextReleaseVersion.ts'

const PUBLIC_URL_BASE = ''

const isDirectRun = () => {
  const entry = process.argv[1]
  if (!entry) {
    return false
  }

  return import.meta.url === pathToFileURL(entry).href
}

if (isDirectRun()) {
  generateDocs()
}

export async function generateDocs() {
  if (process.env.BUILD_MINI) {
    console.info('Skipping docs build for mini build (BUILD_MINI is set)')
    return // stop here
  }

  console.log('[llm-metadata] build started ...')

  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const repoRoot = findRepoRoot()
  const packageRoot = path.join(repoRoot, 'packages', 'dnb-eufemia')
  const docsRoot = path.join(
    repoRoot,
    'packages',
    'dnb-design-system-portal',
    'src',
    'docs',
    'uilib'
  )
  const robotsRoot = path.join(
    repoRoot,
    'packages',
    'dnb-design-system-portal',
    'static'
  )
  const outputRoot = path.join(packageRoot, 'build', 'docs')
  await fs.ensureDir(outputRoot)

  const version = await getNextReleaseVersion()
  const robots = await loadRobots(robotsRoot)
  const entryFiles = await findEntryMdxFiles(docsRoot)

  const results: Array<any> = []
  const metadataBySlug = new Map<
    string,
    {
      version?: string | null
      generatedAt?: string | null
      checksum?: string | null
    }
  >()
  for (const file of entryFiles) {
    const rel = path.relative(docsRoot, file)
    const { slug } = toSlugAndDir(rel)

    if (!isAllowed(slug, robots)) {
      continue
    }

    const { propsFile, eventsFile, demosFile } = await findDocExtras(file)

    let props: Record<string, any> = {}
    let events: Record<string, any> = {}

    const tsDocs = await loadTsDocs(rel)
    props = mergeDocs(props, tsDocs.props)
    events = mergeDocs(events, tsDocs.events)

    if (propsFile) {
      props = mergeDocs(props, await extractTableDocs(propsFile))
    }
    if (eventsFile) {
      events = mergeDocs(events, await extractTableDocs(eventsFile))
    }

    const { name, description, infoFile } = await resolveMetaText(file)
    const group = rel.split(path.sep)[0] || ''
    const sourceInfo = tsDocs.tsDocsDir
      ? await findSourceInfo({
          tsDocsDir: tsDocs.tsDocsDir,
          name,
          version,
        })
      : null

    const meta = buildMetadata({
      file,
      siteDir: repoRoot,
      slug,
      group,
      name,
      description,
      props,
      events,
      related: tsDocs.related,
      sourceInfo,
      infoFile,
      propsFile,
      eventsFile,
      demosFile,
      version,
      publicUrlBase: PUBLIC_URL_BASE,
    })
    metadataBySlug.set(slug, {
      version: meta.version,
      generatedAt: meta.generatedAt,
      checksum: meta.checksum,
    })
    results.push({ slug, meta })
  }

  await createMarkdownCopies({
    siteDir: repoRoot,
    docsRoot,
    outputRoot,
    publicUrlBase: PUBLIC_URL_BASE,
    metadataBySlug,
  })

  await writeLlmsText({
    siteDir: repoRoot,
    results,
    version,
    outputRoot,
    publicUrlBase: PUBLIC_URL_BASE,
    llmsFilename: 'llm.md',
  })

  console.info(
    `[llm-metadata] build outputs: ${entryFiles.length} markdown copies, llm.md`
  )
  console.log('[llm-metadata] build done!')
}
