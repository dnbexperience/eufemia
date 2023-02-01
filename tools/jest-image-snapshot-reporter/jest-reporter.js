const fs = require('fs')
const path = require('path')
const ansiHTML = require('ansi-html')

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
          .forEach(({ failureDetails, fullName }) => {
            const failureMessage = failureDetails[0].matcherResult.message

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

              reports.push({
                relativeTestFilePath,
                message,
                relativeImgPath,
                absoluteImgPath,
                fullName,
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
            message,
            absoluteImgPath,
            relativeImgPath,
            relativeTestFilePath,
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

          return /* jsx */ `
            <li>
              <dl class="dnb-dl">
                <dt class="dnb-lead"><code>${relativeTestFilePath}</code></dt>
                <dd>
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
      <link rel="stylesheet" href="https://unpkg.com/@dnb/eufemia@9.46.2/style/themes/theme-ui/dnb-theme-ui.min.css" />

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
