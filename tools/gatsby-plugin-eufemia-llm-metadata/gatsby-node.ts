import path from 'path'
import { isAllowed, loadRobots } from './robots.js'
import { getNextReleaseVersion } from '@dnb/eufemia/scripts/postbuild/getNextReleaseVersion'
import {
  buildMetadata,
  createMarkdownCopies,
  extractTableDocs,
  findDocExtras,
  findEntryMdxFiles,
  findSourceInfo,
  getPortalPaths,
  loadTsDocs,
  mergeDocs,
  resolveMetaText,
  toSlugAndDir,
  writeIndexFile,
  writeLlmsText,
  writeMetadataFile,
} from './gatsby-node.helpers.ts'

/**
 * Local Gatsby plugin: eufemia-llm-metadata
 *
 * Scans portal MDX docs and generates per-page JSON metadata
 * with props/events extracted from "properties.mdx" / "events.mdx" tables.
 *
 */
export const onPostBuild = async ({
  store,
  reporter,
}: {
  store: any
  reporter: any
}) => {
  const { siteDir, docsRoot, metadataRoot, llmRoot } =
    getPortalPaths(store)
  reporter.info('[llm-metadata] Scanning MDX docs for entries')

  const version = (await getNextReleaseVersion()) || '0.0.0-development'
  const robots = await loadRobots(path.join(siteDir, 'static'))
  const entryFiles = await findEntryMdxFiles(docsRoot)

  const results: Array<any> = []
  for (const file of entryFiles) {
    const rel = path.relative(docsRoot, file) // e.g. components/button.mdx
    const { slug, dirForExtras } = toSlugAndDir(rel)

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

    const { name, description } = await resolveMetaText(file)
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
      propsFile,
      eventsFile,
      demosFile,
      version,
    })

    const { outFile } = await writeMetadataFile({
      meta,
      metadataRoot,
      dirForExtras,
    })

    results.push({ slug, outFile, meta })
  }

  await writeIndexFile({ llmRoot, siteDir, results })

  reporter.info(
    `[llm-metadata] Wrote ${results.length} metadata files to /public`
  )

  reporter.info('[llm-metadata] Generating Markdown copies of MDX docs')
  await createMarkdownCopies({ siteDir, docsRoot })
  await writeLlmsText({
    siteDir,
    llmRoot,
    version,
  })
  reporter.info('[llm-metadata] Markdown copies are ready')
}
