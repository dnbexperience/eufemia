import fs from 'node:fs/promises'
import { chromium, type ConsoleMessage, type Page } from '@playwright/test'
import {
  isHydrationError,
  readSitemap,
  type HydrationError,
  type HydrationReport,
  type HydrationVisit,
} from './portal-hydration.ts'

export async function scanPortalHydration({
  baseUrl,
  pages,
  concurrency = 4,
  settleMs = 1500,
  timeoutMs = 30000,
  retryDelayMs = 30000,
  onProgress,
}: {
  baseUrl: string
  pages: string[]
  concurrency?: number
  settleMs?: number
  timeoutMs?: number
  retryDelayMs?: number
  onProgress?: (report: HydrationReport) => Promise<void>
}): Promise<HydrationReport> {
  pages = readSitemap({ pages })
  const jobs = pages.flatMap((page) =>
    (['light', 'dark'] as const).map((colorScheme) => ({
      page,
      colorScheme,
    }))
  )
  const report: HydrationReport = {
    schemaVersion: 1,
    baseUrl,
    scannedAt: new Date().toISOString(),
    expectedVisits: jobs.length,
    complete: false,
    visits: [],
  }
  const browser = await chromium.launch()
  let cursor = 0
  let pausedUntil = 0
  let checkpoint = Promise.resolve()
  try {
    const workers = await Promise.allSettled(
      Array.from(
        { length: Math.min(concurrency, jobs.length) },
        async () => {
          const context = await browser.newContext()
          await context.addInitScript(() => {
            Reflect.deleteProperty(Navigator.prototype, 'sendBeacon')
            localStorage.clear()
            sessionStorage.clear()
          })
          try {
            while (cursor < jobs.length) {
              const job = jobs[cursor++]
              let visit: HydrationVisit = { ...job, findings: [] }
              for (let attempt = 0; attempt < 3; attempt++) {
                if (pausedUntil > Date.now()) {
                  await delay(pausedUntil - Date.now())
                }
                const page = await context.newPage()
                await page.emulateMedia({ colorScheme: job.colorScheme })
                const capture = captureHydrationErrors(page)
                try {
                  const response = await page.goto(
                    new URL(job.page, baseUrl).href,
                    { waitUntil: 'load', timeout: timeoutMs }
                  )
                  if (response?.status() === 429) {
                    const retryAfter = response.headers()['retry-after']
                    const seconds = Number(retryAfter)
                    const requestedDelay = Number.isFinite(seconds)
                      ? seconds * 1000
                      : Date.parse(retryAfter) - Date.now()
                    pausedUntil = Math.max(
                      pausedUntil,
                      Date.now() +
                        Math.min(
                          120000,
                          Math.max(
                            retryDelayMs * (attempt + 1),
                            requestedDelay || 0
                          )
                        )
                    )
                  }
                  if (response?.status() !== 200) {
                    throw new Error(
                      'Page returned HTTP ' +
                        (response?.status() ?? 'unknown')
                    )
                  }
                  if (new URL(page.url()).pathname !== job.page) {
                    throw new Error(
                      'Page redirected to ' + new URL(page.url()).pathname
                    )
                  }
                  await page
                    .locator('html[data-portal-ready="true"]')
                    .waitFor({ state: 'attached', timeout: timeoutMs })
                  await page.waitForTimeout(settleMs)
                  const captured = await capture.finish()
                  if (captured.runtimeError) {
                    throw new Error(
                      'Uncaught page error: ' + captured.runtimeError
                    )
                  }
                  visit = { ...job, findings: captured.findings }
                  break
                } catch (error) {
                  const captured = await capture.finish()
                  visit = {
                    ...job,
                    findings: captured.findings,
                    error:
                      error instanceof Error
                        ? error.message
                        : String(error),
                  }
                  if (attempt < 2) {
                    await delay(retryDelayMs * (attempt + 1))
                  }
                } finally {
                  await page.close()
                }
              }
              report.visits.push(visit)
              if (onProgress && report.visits.length % 50 === 0) {
                const snapshot = structuredClone(report)
                checkpoint = checkpoint.then(() => onProgress(snapshot))
                await checkpoint
              }
              if (report.visits.length % 50 === 0) {
                process.stdout.write(
                  'Scanned ' +
                    report.visits.length +
                    '/' +
                    jobs.length +
                    ' page visits\n'
                )
              }
            }
          } finally {
            await context.close()
          }
        }
      )
    )
    const failure = workers.find((worker) => worker.status === 'rejected')
    if (failure?.status === 'rejected') {
      throw failure.reason
    }
    report.complete =
      report.visits.length === jobs.length &&
      report.visits.every((visit) => !visit.error)
  } catch (error) {
    report.error = error instanceof Error ? error.message : String(error)
  } finally {
    await browser.close()
  }
  report.visits.sort(
    (a, b) =>
      a.page.localeCompare(b.page) ||
      a.colorScheme.localeCompare(b.colorScheme)
  )
  return report
}

function captureHydrationErrors(page: Page) {
  const findings: HydrationError[] = []
  let pending = Promise.resolve()
  let current: HydrationError | undefined
  let runtimeError: string | undefined
  const onConsole = (message: ConsoleMessage) => {
    if (
      !['error', 'warning', 'log', 'endGroup'].includes(message.type())
    ) {
      return
    }
    pending = pending.then(async () => {
      const text =
        (
          await Promise.all(
            message.args().map(async (argument) => {
              try {
                return await argument.evaluate((value) =>
                  value instanceof Error
                    ? value.stack || value.message
                    : String(value)
                )
              } catch {
                return ''
              }
            })
          )
        )
          .filter(Boolean)
          .join(' ') || message.text()
      if (
        ['error', 'warning'].includes(message.type()) &&
        isHydrationError(text)
      ) {
        current = { message: text }
        findings.push(current)
      } else if (
        message.type() === 'log' &&
        current &&
        /^\s*at /m.test(text)
      ) {
        current.componentStack = text
      } else if (message.type() === 'endGroup') {
        current = undefined
      }
    })
  }
  const onError = (error: Error) => {
    if (isHydrationError(error.message)) {
      findings.push({ message: error.stack || error.message })
    } else {
      runtimeError = error.message
    }
  }
  page.on('console', onConsole)
  page.on('pageerror', onError)
  return {
    async finish() {
      page.off('console', onConsole)
      page.off('pageerror', onError)
      await pending
      return { findings, runtimeError }
    },
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function writeHydrationReport(
  report: HydrationReport,
  output: string
) {
  await fs.writeFile(output, JSON.stringify(report, null, 2) + '\n')
}
