/**
 * Push search index to Algolia after a Vite production build.
 *
 * Scans src/docs/ for MDX files, extracts frontmatter and headings,
 * and pushes search records to Algolia. Mirrors the Gatsby plugin's
 * searchQuery.js flatten logic.
 *
 * This script reads source files directly — it does NOT depend on
 * the SSR bundle (which is deleted after prerendering).
 *
 * Usage:
 *   ALGOLIA_APP_ID=... ALGOLIA_API_KEY=... node vite/prod/push-algolia.mjs
 *
 * Environment variables:
 *   ALGOLIA_APP_ID    – Algolia application ID
 *   ALGOLIA_API_KEY   – Algolia admin API key
 *   ALGOLIA_INDEX_NAME – Override index name (optional)
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMdx from 'remark-mdx'
import { visit } from 'unist-util-visit'
import { toString as nodeToString } from 'mdast-util-to-string'
import GHSlugger from 'github-slugger'
import matter from 'gray-matter'
import algoliasearch from 'algoliasearch'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const portalRoot = path.resolve(__dirname, '../..')
const docsDir = path.resolve(portalRoot, 'src/docs')

const excludedSlugPartials = [
  'uilib/about-the-lib/releases/',
  'EUFEMIA_CHANGELOG',
]
const slugger = new GHSlugger()

function makeSlug(value) {
  slugger.reset()
  return slugger.slug(String(value))
}

/**
 * Extract headings from an MDX file.
 */
function extractHeadings(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    // Strip frontmatter
    const body = content.replace(/^---[\s\S]*?---\n?/, '')

    const tree = unified().use(remarkParse).use(remarkMdx).parse(body)

    const headings = []
    visit(tree, 'heading', (node) => {
      headings.push({
        value: nodeToString(node),
        depth: node.depth,
        slug: makeSlug(nodeToString(node)),
      })
    })

    return headings
  } catch {
    return []
  }
}

/**
 * Get the Algolia index name based on the current branch.
 */
function getIndexName() {
  if (process.env.ALGOLIA_INDEX_NAME) {
    return process.env.ALGOLIA_INDEX_NAME
  }

  const branch = process.env.BRANCH || process.env.GITHUB_REF_NAME || 'dev'

  if (/^(alpha|beta|next)/.test(branch)) {
    return 'beta_eufemia_docs'
  }

  if (process.env.CI && /^(release|portal)$/.test(branch)) {
    return 'prod_eufemia_docs'
  }

  return 'dev_eufemia_docs'
}

/**
 * Scan src/docs/ for MDX files and return an array matching the
 * allMdxNodes shape: { fields: { slug }, frontmatter }.
 */
function scanMdxFiles() {
  const results = []

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        walk(fullPath)
        continue
      }

      if (!entry.name.endsWith('.mdx') || entry.name.startsWith('_')) {
        continue
      }

      const relativePath = path.relative(docsDir, fullPath)
      const slug = relativePath
        .replace(/\.mdx$/, '')
        .replace(/(^|\/)index$/, '$1')
        .replace(/\/$/, '')

      try {
        const content = fs.readFileSync(fullPath, 'utf-8')
        const parsed = matter(content)
        results.push({
          fields: { slug },
          frontmatter: parsed.data,
        })
      } catch {
        // skip files with parse errors
      }
    }
  }

  walk(docsDir)
  return results
}

async function pushAlgolia() {
  const dryRun = process.argv.includes('--dry-run')
  const appId = process.env.ALGOLIA_APP_ID
  const apiKey = process.env.ALGOLIA_API_KEY

  if (!dryRun && (!appId || !apiKey)) {
    console.log(
      'Skipping Algolia push: ALGOLIA_APP_ID and ALGOLIA_API_KEY required (use --dry-run to test without credentials)'
    )
    return
  }

  const allMdxNodes = scanMdxFiles()
  console.log(`Found ${allMdxNodes.length} MDX files in src/docs/`)

  // Build records for Algolia
  const records = []

  for (const node of allMdxNodes) {
    const { slug } = node.fields
    const frontmatter = { ...node.frontmatter }

    // Skip drafts and excluded pages
    if (frontmatter.draft === true) {
      continue
    }
    if (slug.includes('not_in_use')) {
      continue
    }
    if (excludedSlugPartials.some((partial) => slug.includes(partial))) {
      continue
    }

    // Resolve the source file to extract headings
    const candidates = [
      path.resolve(docsDir, `${slug}.mdx`),
      path.resolve(docsDir, `${slug}/index.mdx`),
    ]
    const sourceFile = candidates.find((f) => fs.existsSync(f))
    let headings = sourceFile ? extractHeadings(sourceFile) : []

    // Resolve title from headings if not in frontmatter
    let title = frontmatter.title || ''
    const description = frontmatter.description || ''

    if (!title && frontmatter.search) {
      title = frontmatter.search
    } else if (!title && headings.length > 0) {
      const first = headings[0]
      if (first.depth === 1) {
        title = first.value
        headings = headings.slice(1)
      } else if (first.depth === 2) {
        // Tab sub-page: look for parent title
        const parentSlug = slug.split('/').slice(0, -1).join('/')
        const parent = allMdxNodes.find(
          (n) => n.fields.slug === parentSlug
        )
        const parentTitle = parent?.frontmatter?.title || ''
        title = parentTitle
          ? `${parentTitle} → ${first.value}`
          : first.value
        headings = headings.slice(1)
      }
    }

    if (!title && !description) {
      continue
    }

    // Build category from parent
    const parentSlug = slug.split('/').slice(0, -1).join('/')
    const parent = allMdxNodes.find((n) => n.fields.slug === parentSlug)
    const category = parent
      ? {
          slug: parent.fields.slug,
          title: parent.frontmatter.title || '',
        }
      : null

    records.push({
      objectID: slug || 'index',
      slug,
      title,
      description,
      headings,
      ...(category ? { category } : {}),
    })
  }

  // Push to Algolia
  const indexName = getIndexName()

  if (dryRun) {
    console.log(
      `[dry-run] Would push ${records.length} records to index "${indexName}"`
    )
    console.log(
      `[dry-run] Sample:`,
      JSON.stringify(records.slice(0, 3), null, 2)
    )
    return
  }

  console.log(
    `Pushing ${records.length} records to Algolia index "${indexName}"...`
  )

  const client = algoliasearch(appId, apiKey)
  const index = client.initIndex(indexName)
  const { objectIDs } = await index.saveObjects(records)
  console.log(`✓ Pushed ${objectIDs.length} records to Algolia`)
}

pushAlgolia().catch((err) => {
  console.error('Algolia push failed:', err)
  process.exit(1)
})
