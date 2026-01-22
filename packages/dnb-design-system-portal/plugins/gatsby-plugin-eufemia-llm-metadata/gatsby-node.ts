import path from 'path'
import { getNextReleaseVersion } from 'eufemia-llm-metadata/src/getNextReleaseVersion.ts'
import {
  buildMetadata,
  createMarkdownCopies,
  extractTableDocs,
  findDocExtras,
  findEntryMdxFiles,
  findSourceInfo,
  getPortalPaths,
  isAllowed,
  loadRobots,
  loadTsDocs,
  mergeDocs,
  resolveMetaText,
  toSlugAndDir,
  writeLlmsText,
} from 'eufemia-llm-metadata'

/**
 * Local Gatsby plugin: eufemia-llm-metadata
 *
 * Scans portal MDX docs and generates markdown copies with JSON blocks
 * extracted from "properties.mdx" / "events.mdx" tables.
 *
 */
export const onPostBuild = async ({
  store,
  reporter,
}: {
  store: any
  reporter: any
}) => {
  const { siteDir, docsRoot } = getPortalPaths(store)
  reporter.info('[llm-metadata] Scanning MDX docs for entries')

  const version = await getNextReleaseVersion()
  const robots = await loadRobots(path.join(siteDir, 'static'))
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
    const rel = path.relative(docsRoot, file) // e.g. components/button.mdx
    const { slug } = toSlugAndDir(rel)

    // Respect robots: skip disallowed slugs
    if (!isAllowed(slug, robots)) {
      continue
    }

    const { propsFile, eventsFile, demosFile } = await findDocExtras(file)

    // Start with empty collections
    let props: Record<string, any> = {}
    let events: Record<string, any> = {}

    // 1) Pull from Eufemia TS docs when available
    const tsDocs = await loadTsDocs(rel)
    props = mergeDocs(props, tsDocs.props)
    events = mergeDocs(events, tsDocs.events)

    // 2) Merge in MDX table sources if present
    if (propsFile) {
      props = mergeDocs(props, await extractTableDocs(propsFile))
    }
    if (eventsFile) {
      events = mergeDocs(events, await extractTableDocs(eventsFile))
    }

    const { name, description, infoFile } = await resolveMetaText(file)
    const group = rel.split(path.sep)[0] || ''

    // Try to resolve component source file and type info for file URLs
    const sourceInfo = tsDocs.tsDocsDir
      ? await findSourceInfo({
          tsDocsDir: tsDocs.tsDocsDir,
          name,
          version,
        })
      : null

    const meta = buildMetadata({
      file,
      siteDir,
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

  reporter.info(
    `[llm-metadata] Collected ${results.length} documentation entries`
  )

  reporter.info('[llm-metadata] Generating Markdown copies of MDX docs')
  await createMarkdownCopies({ siteDir, docsRoot, metadataBySlug })
  await writeLlmsText({
    siteDir,
    version,
    results,
  })
  reporter.info('[llm-metadata] Markdown copies are ready')
}
