/**
 * Push search index to Algolia after a Vite production build.
 *
 * Reuses the MCP/LLM Markdown converter and indexes individual sections.
 * Published records are checked against the prerendered page anchors.
 *
 * This script reads source files directly and does not depend on
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

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import algoliasearch from 'algoliasearch'
import { replaceAlgoliaRecords } from './algolia-helpers.mjs'
import { generateSearchRecords } from '../search/generate-search-records.ts'
import { searchIndexSettings } from '../search/search-records.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const portalRoot = path.resolve(__dirname, '../..')

// Load .env from the portal root when running locally
try {
  process.loadEnvFile(path.resolve(portalRoot, '.env'))
} catch {
  // .env is optional. CI provides env vars directly.
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

  if (process.env.CI && branch === 'release') {
    return 'prod_eufemia_docs'
  }

  return 'dev_eufemia_docs'
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

  const records = await generateSearchRecords({
    renderedDir: dryRun ? undefined : path.resolve(portalRoot, 'public'),
  })

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
  const { objectIDs } = await replaceAlgoliaRecords(
    client,
    indexName,
    records,
    searchIndexSettings
  )
  console.log(`✓ Pushed ${objectIDs.length} records to Algolia`)
}

pushAlgolia().catch((err) => {
  console.error('Algolia push failed:', err)
  process.exit(1)
})
