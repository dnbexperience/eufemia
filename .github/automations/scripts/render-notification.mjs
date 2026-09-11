import { readFileSync, writeFileSync } from 'node:fs'
import { renderNotification } from './notification-utils.mjs'

const [reportPath, marker, repository, runUrl, title, outputPath] =
  process.argv.slice(2)
const report = JSON.parse(readFileSync(reportPath, 'utf8'))

writeFileSync(
  outputPath,
  renderNotification({ marker, repository, report, runUrl, title })
)
