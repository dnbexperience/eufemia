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

// Only these rules depend on the color scheme
const colorRules = ['color-contrast', 'link-in-text-block']

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
  const colorSchemes = args.colorSchemes?.split(',') ?? ['light']
  const browser = await chromium.launch()
  const duplicateIdFindings = []
  const findings = []
  const errors = []

  for (const colorScheme of colorSchemes) {
    const isLight = colorScheme === 'light'
    let cursor = 0

    await Promise.all(
      Array.from({ length: Math.min(6, paths.length) }, async () => {
        const context = await browser.newContext({ colorScheme })
        await context.addInitScript(() => {
          Reflect.deleteProperty(Navigator.prototype, 'sendBeacon')
        })
        const page = await context.newPage()

        while (cursor < paths.length) {
          const path = paths[cursor++]

          try {
            await loadPage(page, new URL(path, args.baseUrl).href)
            if (isLight) {
              const ids = await page
                .locator('[id]')
                .evaluateAll((elements) => elements.map(({ id }) => id))
              duplicateIdFindings.push(...findDuplicateIds(ids, path))
            }
            const axe = new AxeBuilder({ page })
            const result = await (
              isLight ? axe : axe.withRules(colorRules)
            ).analyze()

            for (const violation of result.violations) {
              findings.push({
                check: 'axe',
                page: path,
                ...(!isLight && { colorScheme }),
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
            errors.push({
              page: isLight ? path : `${path} (${colorScheme})`,
              message: error.message,
            })
          }
        }

        await context.close()
      })
    )
  }

  await browser.close()

  const report = createPortalAccessibilityReport({
    duplicateIdFindings,
    axeFindings: findings,
    scannedPages: paths.length,
    colorSchemes,
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
        changeChunks: changes ? splitIssueBody(changes) : [],
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
  return JSON.parse(await fs.readFile(location, 'utf8'))
}

// The host sometimes fails or stalls a request, so retry the page
async function loadPage(page, url) {
  for (let attempt = 1; ; attempt++) {
    try {
      const response = await page.goto(url, {
        waitUntil: 'load',
        timeout: 30000,
      })
      if (!response?.ok()) {
        throw new Error(
          `Page returned HTTP ${response?.status() ?? 'unknown'}`
        )
      }
      await page
        .locator('html[data-portal-ready="true"]')
        .waitFor({ state: 'attached', timeout: 10000 })
      return
    } catch (error) {
      if (attempt === 3) {
        throw error
      }
      process.stdout.write(
        `Retrying ${url}: ${error.message.split('\n')[0]}\n`
      )
      await page.waitForTimeout(attempt * 5000)
    }
  }
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
