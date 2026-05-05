/**
 * Playwright Reporter for Screenshot Tests
 *
 * Generates an HTML report with visual diffs for failed screenshot tests.
 * Replaces the old jest-image-snapshot-reporter.
 */

import fs from 'fs'
import path from 'path'
import type {
  Reporter,
  FullResult,
  TestCase,
  TestResult,
} from '@playwright/test/reporter'

export type FailedTestEntry = {
  testFilePath: string
  relativeTestFilePath: string
  fullName: string
  title: string
  message: string
  expectedImagePath: string | null
  actualImagePath: string | null
  diffImagePath: string | null
  dataVisualTestId: string | null
  lineNumber: number | null
}

function countAttachedImages({
  expectedImagePath,
  actualImagePath,
  diffImagePath,
}: Pick<
  FailedTestEntry,
  'expectedImagePath' | 'actualImagePath' | 'diffImagePath'
>) {
  return [expectedImagePath, actualImagePath, diffImagePath].filter(
    Boolean
  ).length
}

export function getFailedTestKey({
  testFilePath,
  fullName,
}: Pick<FailedTestEntry, 'testFilePath' | 'fullName'>) {
  return `${testFilePath}::${fullName}`
}

export function selectFailedTestAttempt({
  previous,
  next,
}: {
  previous: FailedTestEntry
  next: FailedTestEntry
}) {
  const previousAttachmentCount = countAttachedImages(previous)
  const nextAttachmentCount = countAttachedImages(next)

  if (nextAttachmentCount > previousAttachmentCount) {
    return next
  }

  if (nextAttachmentCount === previousAttachmentCount) {
    return next
  }

  return previous
}

export function resolveExpectedImagePath({
  expectedImagePath,
  actualImagePath,
  diffImagePath,
}: {
  expectedImagePath: string | null
  actualImagePath: string | null
  diffImagePath: string | null
}): string | null {
  const artifactImagePath = actualImagePath || diffImagePath

  if (artifactImagePath) {
    const artifactExpectedImagePath = artifactImagePath.replace(
      /-(actual|diff)\.png$/,
      '-expected.png'
    )

    if (
      artifactExpectedImagePath !== artifactImagePath &&
      fs.existsSync(artifactExpectedImagePath)
    ) {
      return artifactExpectedImagePath
    }
  }

  return expectedImagePath
}

function extractTestMetadata(
  testFilePath: string,
  title: string
): { dataVisualTestId: string | null; lineNumber: number | null } {
  try {
    const content = fs.readFileSync(testFilePath, 'utf-8')

    const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const titleIndex = content.search(new RegExp(escapedTitle))

    if (titleIndex === -1) {
      return { dataVisualTestId: null, lineNumber: null }
    }

    const lineNumber = content.substring(0, titleIndex).split('\n').length

    const searchContent = content.substring(titleIndex, titleIndex + 2000)
    const match = searchContent.match(/data-visual-test="([^"]+)"/)

    return {
      dataVisualTestId: match ? match[1] : null,
      lineNumber,
    }
  } catch (e) {
    return { dataVisualTestId: null, lineNumber: null }
  }
}

class ScreenshotReporter implements Reporter {
  private failedTests = new Map<string, FailedTestEntry>()

  onTestEnd(test: TestCase, result: TestResult) {
    if (result.status !== 'failed') {
      return // stop here
    }

    const testFilePath = test.location.file
    const cwd = process.cwd()
    const relativeTestFilePath = path.relative(cwd, testFilePath)

    const { dataVisualTestId, lineNumber } = extractTestMetadata(
      testFilePath,
      test.title
    )

    // Look for expected, actual, and diff images in attachments
    let expectedImagePath: string | null = null
    let actualImagePath: string | null = null
    let diffImagePath: string | null = null
    for (const attachment of result.attachments) {
      if (attachment.name.includes('diff')) {
        diffImagePath = attachment.path || null
      } else if (attachment.name.includes('expected')) {
        expectedImagePath = attachment.path || null
      } else if (attachment.name.includes('actual')) {
        actualImagePath = attachment.path || null
      }
    }

    expectedImagePath = resolveExpectedImagePath({
      expectedImagePath,
      actualImagePath,
      diffImagePath,
    })

    // Extract error message
    const message = result.errors
      .map((e) => e.message || '')
      .join('\n')
      .replace(/\n/g, '<br />')

    const failedTestEntry = {
      testFilePath,
      relativeTestFilePath,
      fullName: test.titlePath().join(' › '),
      title: test.title,
      message,
      expectedImagePath,
      actualImagePath,
      diffImagePath,
      dataVisualTestId,
      lineNumber,
    }

    const failedTestKey = getFailedTestKey(failedTestEntry)
    const previousFailedTest = this.failedTests.get(failedTestKey)

    this.failedTests.set(
      failedTestKey,
      previousFailedTest
        ? selectFailedTestAttempt({
            previous: previousFailedTest,
            next: failedTestEntry,
          })
        : failedTestEntry
    )
  }

  onEnd(result: FullResult) {
    if (this.failedTests.size === 0) {
      return // stop here
    }

    const failedTests = Array.from(this.failedTests.values())

    const cwd = process.cwd()
    const reportDir = path.join(cwd, 'jest-visual-diff-report')
    const htmlFilePath = path.join(reportDir, 'index.html')

    const cliColors = {
      reset: '\x1b[0m',
      bold: '\x1b[1m',
      dim: '\x1b[2m',
      yellow: '\x1b[33m',
    }

    console.log(
      `\n\n${cliColors.bold}${cliColors.yellow}The report file and diffs images (${failedTests.length}): \n\n${cliColors.reset}`
    )
    console.log(
      `🔖 ${cliColors.dim}file://${htmlFilePath}\n${cliColors.reset}`
    )

    const liElementHtml = failedTests
      .map(
        (
          {
            fullName,
            message,
            expectedImagePath,
            actualImagePath,
            diffImagePath,
            testFilePath,
            relativeTestFilePath,
            dataVisualTestId,
            lineNumber,
          },
          i
        ) => {
          const images: string[] = []

          if (expectedImagePath && fs.existsSync(expectedImagePath)) {
            const relPath = path.relative(reportDir, expectedImagePath)
            images.push(`
            <figure class="screenshot-figure">
              <figcaption>Expected</figcaption>
              <a class="diff" target="_blank" href="${relPath}">
                <img src="${relPath}" alt="Expected screenshot" />
              </a>
            </figure>`)
          }

          if (actualImagePath && fs.existsSync(actualImagePath)) {
            const relPath = path.relative(reportDir, actualImagePath)
            images.push(`
            <figure class="screenshot-figure">
              <figcaption>Actual</figcaption>
              <a class="diff" target="_blank" href="${relPath}">
                <img src="${relPath}" alt="Actual screenshot" />
              </a>
            </figure>`)
          }

          if (diffImagePath && fs.existsSync(diffImagePath)) {
            const relPath = path.relative(reportDir, diffImagePath)

            console.log(
              `🔍 ${cliColors.dim}${i + 1}. file://${diffImagePath}${cliColors.reset}\n`
            )

            images.push(`
            <figure class="screenshot-figure">
              <figcaption>Diff</figcaption>
              <a class="diff" target="_blank" href="${relPath}">
                <img src="${relPath}" alt="Shows the visual difference" />
              </a>
            </figure>`)
          }

          const image = images.length
            ? `<div class="screenshot-row">${images.join('\n')}</div>`
            : ''

          const visualTestIdHtml = dataVisualTestId
            ? `<p><b><code class="copy-id" onclick="navigator.clipboard.writeText('${dataVisualTestId}').then(() => { this.classList.add('copied'); setTimeout(() => this.classList.remove('copied'), 1000) })">data-visual-test="${dataVisualTestId}"</code></b></p>`
            : ''

          return `
            <li>
              <dl class="dnb-dl">
                <dt class="dnb-lead">${fullName}</dt>
                <dd>
                  <p class="dnb-lead"><a href="vscode://file${testFilePath}${lineNumber ? ':' + lineNumber : ''}"><code>${relativeTestFilePath}${lineNumber ? ':' + lineNumber : ''}</code></a></p>
                  ${visualTestIdHtml}
                  <p>${message}</p>
                  ${image}
                </dd>
              </dl>
            </li>
        `
        }
      )
      .join('\n')

    console.log('\n\n')

    const html = `
    <html>

    <head>
      <meta charset="utf-8" />
      <title>Visual Screenshot Report</title>
      <link rel="stylesheet" href="https://unpkg.com/@dnb/eufemia@latest/style/dnb-ui-core.min.css" />
      <link rel="stylesheet" href="https://unpkg.com/@dnb/eufemia@latest/style/themes/ui/dnb-theme-ui.min.css" />

      <style>
        ol {
          max-width: 80ch;
          list-style: square;
        }

        ol li {
          padding: 2rem 0;
        }

        ol li p {
          font-size: var(--font-size-medium);
        }

        a.diff {
          display: inline-flex;
          border: 0.5rem solid var(--color-black-20);
        }

        a.diff:hover {
          border-color: var(--color-sea-green);
        }

        a.diff:focus-visible {
          outline: none;
          box-shadow: none;
          transform: scale(2) translate3d(25%, 25%, 0);
          position: relative;
          z-index: 1;
        }

        .screenshot-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: 1rem;
        }

        .screenshot-figure {
          margin: 0;
        }

        .screenshot-figure figcaption {
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .copy-id {
          cursor: pointer;
          user-select: all;
          position: relative;
        }

        .copy-id:hover {
          background-color: var(--color-mint-green-25);
        }

        .copy-id.copied::after {
          content: 'Copied!';
          margin-left: 0.5rem;
          color: var(--color-sea-green);
          white-space: nowrap;
        }
      </style>
    </head>

    <body>
      <ol class="dnb-ul">
        <li>Failed Tests: <b>${failedTests.length}</b></li>
        ${liElementHtml}
      </ol>

    </body>

    </html>
    `

    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir)
    }

    fs.writeFileSync(htmlFilePath, html)
  }
}

export default ScreenshotReporter
