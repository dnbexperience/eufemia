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
  const [firstColorScheme] = colorSchemes
  const browser = await chromium.launch()
  const duplicateIdFindings = []
  const findings = []
  const errors = []
  let cursor = 0

  await Promise.all(
    Array.from({ length: Math.min(6, paths.length) }, async () => {
      const context = await browser.newContext({
        colorScheme: firstColorScheme,
      })
      await context.addInitScript(() => {
        Reflect.deleteProperty(Navigator.prototype, 'sendBeacon')
      })
      const page = await context.newPage()

      while (cursor < paths.length) {
        const path = paths[cursor++]
        let colorScheme = firstColorScheme

        try {
          if (colorSchemes.length > 1) {
            await page.emulateMedia({ colorScheme: firstColorScheme })
          }
          await loadPage(page, new URL(path, args.baseUrl).href)

          for (colorScheme of colorSchemes) {
            const isLight = colorScheme === 'light'

            if (colorScheme !== firstColorScheme) {
              await switchColorScheme(page, colorScheme)
            }
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
          }
        } catch (error) {
          errors.push({
            page:
              colorScheme === 'light' ? path : `${path} (${colorScheme})`,
            message: error.message,
          })
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

// Switch the loaded page instead of loading it again, which halves the page loads
async function switchColorScheme(page, colorScheme) {
  await page.emulateMedia({ colorScheme })
  await page
    .locator(`body.eufemia-theme__color-scheme--${colorScheme}`)
    .waitFor({ state: 'attached', timeout: 10000 })
  await page.evaluate(
    () =>
      new Promise((resolve) => {
        // Wait for the render, then skip the color transitions it started
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            for (const animation of document.getAnimations()) {
              try {
                animation.finish()
              } catch {
                // Infinite animations can't finish
              }
            }
            resolve()
          })
        )
      })
  )
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
