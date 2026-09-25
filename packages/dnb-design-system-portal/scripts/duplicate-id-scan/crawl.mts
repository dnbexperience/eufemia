/**
 * Crawl every prerendered portal route in a real browser and record duplicate
 * element ids. Expects the portal to be built (`public/`) and served (default
 * http://localhost:8002). Writes the result as JSON for the publish step.
 *
 * Env overrides: SCAN_BASE_URL, SCAN_PUBLIC_DIR, SCAN_OUT.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { firefox } from '@playwright/test'
import { discoverRoutes, routeToSlug } from './routes.mts'
import { findDuplicateIds, type Duplicate } from './detect.mts'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const portalRoot = path.resolve(scriptDir, '../..')

const publicDir =
  process.env.SCAN_PUBLIC_DIR ?? path.resolve(portalRoot, 'public')
const baseUrl = (
  process.env.SCAN_BASE_URL ?? 'http://localhost:8002'
).replace(/\/+$/, '')
const outFile =
  process.env.SCAN_OUT ?? path.resolve(portalRoot, 'duplicate-ids.json')

async function main() {
  const routes = discoverRoutes(publicDir)
  if (routes.length === 0) {
    throw new Error(
      `No routes found under ${publicDir}. Did the portal build run?`
    )
  }

  const browser = await firefox.launch()
  const page = await browser.newPage()
  const duplicates: Duplicate[] = []
  const failed: string[] = []

  try {
    for (const route of routes) {
      try {
        await page.goto(baseUrl + route, {
          waitUntil: 'load',
          timeout: 30_000,
        })
        // Give client-side hydration a moment to attach any generated ids.
        await page.waitForTimeout(300)

        const ids = await page.evaluate(() =>
          Array.from(document.querySelectorAll('[id]'), (el) => el.id)
        )

        const slug = routeToSlug(route)
        for (const { id, count } of findDuplicateIds(ids)) {
          duplicates.push({ url: slug, id, count })
        }
      } catch (error) {
        failed.push(route)
        console.warn(
          `Failed to scan ${route}: ${(error as Error).message}`
        )
      }
    }
  } finally {
    await browser.close()
  }

  duplicates.sort(
    (a, b) => a.url.localeCompare(b.url) || a.id.localeCompare(b.id)
  )

  const payload = {
    generatedAt: new Date().toISOString(),
    routeCount: routes.length,
    duplicates,
  }
  fs.writeFileSync(outFile, JSON.stringify(payload, null, 2) + '\n')

  console.log(
    `Scanned ${routes.length} route(s); found ${duplicates.length} duplicate id(s)` +
      (failed.length > 0
        ? `; ${failed.length} route(s) failed to load`
        : '') +
      `. Wrote ${outFile}`
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
