/**
 * Generate LLM metadata for the Vite portal build.
 *
 * 1. Scans src/docs/uilib/ for MDX entry files
 * 2. Extracts props/events from TypeScript docs and MDX tables
 * 3. Writes markdown copies of each doc to vite/dist/
 * 4. Writes llms.txt to vite/dist/
 *
 * Called by prerender.mjs after static HTML generation.
 */

import path from 'path'
import { fileURLToPath } from 'url'
import { getNextReleaseVersion } from 'eufemia-llm-metadata/src/getNextReleaseVersion.ts'
import {
  buildMetadata,
  createMarkdownCopies,
  extractTableDocs,
  findDocExtras,
  findEntryMdxFiles,
  findSourceInfo,
  LLM_DOCS_SLUG_PREFIX,
  loadTsDocs,
  mergeDocs,
  resolveMetaText,
  toSlugAndDir,
  writeLlmsText,
} from 'eufemia-llm-metadata'
import { isAllowed, loadRobots } from 'eufemia-llm-metadata/src/robots.ts'

const portalRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..'
)
const docsRoot = path.join(portalRoot, 'src', 'docs', LLM_DOCS_SLUG_PREFIX)
const outputRoot = path.join(portalRoot, 'public')

async function main() {
  console.log('[llm-metadata] Scanning MDX docs for entries')

  const version = await getNextReleaseVersion()
  const robots = await loadRobots(path.join(portalRoot, 'static'))
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
      siteDir: portalRoot,
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
    })

    metadataBySlug.set(slug, {
      version: meta.version,
      generatedAt: meta.generatedAt,
      checksum: meta.checksum,
    })
    results.push({ slug, meta })
  }

  console.log(
    `[llm-metadata] Collected ${results.length} documentation entries`
  )

  console.log('[llm-metadata] Generating Markdown copies of MDX docs')
  await createMarkdownCopies({
    siteDir: portalRoot,
    docsRoot,
    outputRoot,
    metadataBySlug,
    skipFormat: true,
  })

  await writeLlmsText({
    siteDir: portalRoot,
    version,
    results,
    outputRoot,
  })

  console.log('[llm-metadata] Markdown copies are ready')
}

main().catch((err) => {
  console.error('[llm-metadata] Failed:', err)
  process.exit(1)
})
