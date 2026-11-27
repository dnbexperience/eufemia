import fs from 'node:fs/promises'
import path from 'node:path'
import { convertMdxToMd } from 'eufemia-llm-metadata'
import {
  getDefaultDocsDir,
  getPortalPages,
} from '../client/plugins/portal-pages.ts'
import { isFirstTabPage } from '../client/plugins/portal-pages.shared.ts'
import { shouldIncludeInAlgolia } from '../prod/algolia-helpers.mjs'
import { readRenderedToc } from '../prod/portal-toc.ts'
import { buildSearchRecords } from './search-records.ts'
import type { SearchRecord } from './search-records.ts'

export async function generateSearchRecords({
  docsDir = getDefaultDocsDir(),
  renderedDir,
}: { docsDir?: string; renderedDir?: string } = {}) {
  const { files, allMdxNodes } = getPortalPages(docsDir)
  const excludeMdxPaths = new Set(
    files
      .filter(
        (file) =>
          file.type === 'mdx' &&
          file.frontmatter.route !== false &&
          !isFirstTabPage(file)
      )
      .map(({ filePath }) => filePath)
  )
  const state = {
    mdxCache: new Map<string, string>(),
    inProgress: new Set<string>(),
  }
  const records: SearchRecord[] = []

  for (const file of files) {
    const { slug, frontmatter, filePath } = file
    if (
      file.type !== 'mdx' ||
      isFirstTabPage(file) ||
      frontmatter.search === false ||
      !shouldIncludeInAlgolia({ ...frontmatter, slug })
    ) {
      continue
    }
    const ancestors = allMdxNodes
      .filter(
        ({ fields }) =>
          fields.slug !== slug && slug.startsWith(`${fields.slug}/`)
      )
      .sort((a, b) => b.fields.slug.length - a.fields.slug.length)
    if (ancestors.some(({ frontmatter }) => frontmatter.draft === true)) {
      continue
    }
    const markdown = await convertMdxToMd({
      inputPath: filePath,
      docsRoot: docsDir,
      docsBaseRoot: path.dirname(docsDir),
      prettierConfig: {},
      includeFrontmatter: false,
      skipFormat: true,
      excludeMdxPaths,
      state,
    })
    const ownTitle =
      frontmatter.title ||
      frontmatter.contentTitle ||
      (typeof frontmatter.search === 'string' && frontmatter.search)
    const firstHeading = markdown.match(/^#{1,2}\s+(.+)$/m)?.[1]
    const ancestor = ancestors.find(
      ({ frontmatter }) => frontmatter.title || frontmatter.search
    )
    const ancestorTitle =
      ancestor?.frontmatter.title || ancestor?.frontmatter.search
    const title =
      ownTitle || [ancestorTitle, firstHeading].filter(Boolean).join(' → ')
    if (!title) {
      continue
    }
    // A publishable index requires the rendered route, never guessed anchors.
    const renderedHeadings = renderedDir
      ? readRenderedToc(
          await fs.readFile(
            path.join(renderedDir, slug, 'index.html'),
            'utf8'
          )
        )
      : undefined
    records.push(
      ...buildSearchRecords({
        markdown,
        slug,
        title,
        renderedHeadings,
        keywords: [frontmatter.search, ancestor?.frontmatter.search]
          .filter((value) => typeof value === 'string')
          .join(' '),
      })
    )
  }
  if (!records.length) {
    throw new Error('No documentation search records were generated')
  }

  return records
}
