const fs = require('fs')
const path = require('path')
const ansiHTML = require('ansi-html-community')

function extractTestMetadata(testFilePath, title) {
  try {
    const content = fs.readFileSync(testFilePath, 'utf-8')

    const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const titleIndex = content.search(new RegExp(escapedTitle))

    if (titleIndex === -1) {
      return { dataVisualTestId: null, lineNumber: null }
    }

    // Count lines up to the match to get the line number
    const lineNumber = content.substring(0, titleIndex).split('\n').length

    // Search forward from the it() title to find data-visual-test in the same block
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

class JestReporter {
  onRunComplete(contexts, { testResults, numFailedTests }) {
    if (numFailedTests === 0) {
      return // stop here
    }

    const reportDir = path.join(process.cwd(), 'jest-visual-diff-report')
    const cwd = process.cwd()
    const htmlFilePath = path.join(reportDir, 'index.html')

    const fileReports = testResults.reduce(
      (reports, { testFilePath, testResults }) => {
        const relativeTestFilePath = path.relative(cwd, testFilePath)

        testResults
          .filter(({ status }) => {
            return status === 'failed'
          })
          .forEach(({ failureDetails, fullName, title }) => {
            const failureMessage = failureDetails[0].matcherResult?.message

            if (failureMessage) {
              const regex = `.*${cwd}(.*)diff\\.png.*`

              const imgPath =
                failureMessage
                  .replace(/\n/g, '')
                  .replace(new RegExp(regex), '$1') + 'diff.png'
              const absoluteImgPath = cwd + imgPath
              const relativeImgPath = '..' + imgPath

              const message = ansiHTML(
                failureMessage.replace(cwd, '').replace(/\n/g, '<br />')
              )

              const { dataVisualTestId, lineNumber } = extractTestMetadata(
                testFilePath,
                title
              )

              reports.push({
                testFilePath,
                relativeTestFilePath,
                message,
                relativeImgPath,
                absoluteImgPath,
                fullName,
                dataVisualTestId,
                lineNumber,
              })
            }
          })

        return reports
      },
      []
    )

    const cliColors = {
      reset: '\x1b[0m',
      bold: '\x1b[1m',
      dim: '\x1b[2m',
      yellow: '\x1b[33m',
      red: '\x1b[31m',
      green: '\x1b[32m',
      hidden: '\x1b[8m',
    }

    console.log(
      `\n\n${cliColors.bold}${cliColors.yellow}The report file and diffs images (${numFailedTests}): \n\n${cliColors.reset}`
    )
    console.log(
      `🔖 ${cliColors.dim}file://${htmlFilePath}\n${cliColors.reset}`
    )

    const liElementHtml = fileReports
      .map(
        (
          {
            fullName,
            message,
            absoluteImgPath,
            relativeImgPath,
            testFilePath,
            relativeTestFilePath,
            dataVisualTestId,
            lineNumber,
          },
          i
        ) => {
          const imgExists = fs.existsSync(absoluteImgPath)

          if (imgExists) {
            console.log(
              `🔍 ${cliColors.dim}${i + 1}. file://${absoluteImgPath}${
                cliColors.reset
              }\n`
            )
          }

          const image = imgExists
            ? /* jsx */ `
            <a
              class="diff"
              target="_blank"
              href="${relativeImgPath}">
              <img
                src="${relativeImgPath}"
                alt="Shows the visual difference"
              />
            </a>
            `
            : ''

          const visualTestIdHtml = dataVisualTestId
            ? /* jsx */ `<p><b><code class="copy-id" onclick="navigator.clipboard.writeText('${dataVisualTestId}').then(() => { this.classList.add('copied'); setTimeout(() => this.classList.remove('copied'), 1000) })">data-visual-test="${dataVisualTestId}"</code></b></p>`
            : ''

          return /* jsx */ `
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

    const html = /* jsx */ `
    <html>

    <head>
      <meta charset="utf-8" />
      <title>Jest Image Snapshot Report</title>
      <link rel="stylesheet" href="https://unpkg.com/@dnb/eufemia@9.46.2/style/dnb-ui-core.min.css" />
      <link rel="stylesheet" href="https://unpkg.com/@dnb/eufemia@9.46.2/style/themes/ui/dnb-theme-ui.min.css" />

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
        <li>Failed Tests: <b>${numFailedTests}</b></li>
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

module.exports = JestReporter
