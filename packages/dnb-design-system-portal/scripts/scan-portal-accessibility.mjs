import fs from 'node:fs/promises'
import AxeBuilder from '@axe-core/playwright'
import { chromium } from '@playwright/test'
import {
  comparePortalAccessibilityReports,
  createPortalAccessibilityReport,
  findDuplicateIds,
  formatPortalAccessibilityChanges,
  formatPortalAccessibilityReport,
  splitIssueBody,
} from './portal-accessibility-report.mjs'

main()

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const sitemap = await readJson(args.sitemap)
  if (!Array.isArray(sitemap.pages)) {
    throw new Error('The sitemap does not contain a pages array')
  }
  const paths = args.limit
    ? sitemap.pages.slice(0, Number(args.limit))
    : sitemap.pages
  const browser = await chromium.launch()
  const duplicateIdFindings = []
  const findings = []
  const errors = []
  let cursor = 0

  await Promise.all(
    Array.from({ length: Math.min(6, paths.length) }, async () => {
      const context = await browser.newContext()
      const page = await context.newPage()

      while (cursor < paths.length) {
        const path = paths[cursor++]

        try {
          const response = await page.goto(
            new URL(path, args.baseUrl).href,
            {
              waitUntil: 'load',
              timeout: 30000,
            }
          )
          if (!response?.ok()) {
            throw new Error(
              `Page returned HTTP ${response?.status() ?? 'unknown'}`
            )
          }
          await page
            .locator('html[data-portal-ready="true"]')
            .waitFor({ state: 'attached', timeout: 10000 })
          const ids = await page
            .locator('[id]')
            .evaluateAll((elements) => elements.map(({ id }) => id))
          duplicateIdFindings.push(...findDuplicateIds(ids, path))
          const result = await new AxeBuilder({ page }).analyze()

          for (const violation of result.violations) {
            findings.push({
              check: 'axe',
              page: path,
              id: violation.id,
              impact: violation.impact,
              occurrences: violation.nodes.length,
              help: violation.help,
              helpUrl: violation.helpUrl,
              nodes: violation.nodes
                .map(({ target, failureSummary }) => ({
                  target: target.map(String),
                  failureSummary: normalizeText(failureSummary),
                }))
                .sort((a, b) => nodeKey(a).localeCompare(nodeKey(b))),
            })
          }
        } catch (error) {
          errors.push({ page: path, message: error.message })
        }
      }

      await context.close()
    })
  )

  await browser.close()

  const report = createPortalAccessibilityReport({
    duplicateIdFindings,
    axeFindings: findings,
    scannedPages: paths.length,
  })
  const changes = args.previous
    ? formatPortalAccessibilityChanges(
        comparePortalAccessibilityReports(
          await readJson(args.previous),
          report
        )
      )
    : ''

  await fs.writeFile(args.output, `${JSON.stringify(report, null, 2)}\n`)
  await fs.writeFile(
    args.issueOutput,
    `${JSON.stringify(
      {
        chunks: splitIssueBody(formatPortalAccessibilityReport(report)),
        changes,
      },
      null,
      2
    )}\n`
  )

  process.stdout.write(
    `Scanned ${paths.length} pages with ${duplicateIdFindings.length} duplicate ID groups, ` +
      `${findings.length} axe findings and ${errors.length} errors.\n`
  )

  if (errors.length > 0) {
    throw new AggregateError(
      errors.map(({ page, message }) => new Error(`${page}: ${message}`)),
      `Could not scan ${errors.length} pages`
    )
  }
}

async function readJson(location) {
  if (location.startsWith('http://') || location.startsWith('https://')) {
    const response = await fetch(location)
    if (!response.ok) {
      throw new Error(
        `${location}: ${response.status} ${response.statusText}`
      )
    }
    return response.json()
  }

  return JSON.parse(await fs.readFile(location, 'utf8'))
}

function parseArgs(values) {
  const args = {}

  for (let index = 0; index < values.length; index += 2) {
    args[camelCase(values[index]?.replace(/^--/, ''))] = values[index + 1]
  }

  for (const name of ['baseUrl', 'sitemap', 'output', 'issueOutput']) {
    if (!args[name]) {
      const flag = name.replace(
        /[A-Z]/g,
        (value) => `-${value.toLowerCase()}`
      )
      throw new Error(`Missing --${flag}`)
    }
  }

  return args
}

function camelCase(value) {
  return value.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
}

function normalizeText(value) {
  return value?.replace(/\s+/g, ' ').trim() || ''
}

function nodeKey(node) {
  return `${JSON.stringify(node.target)}\0${node.failureSummary}`
}
