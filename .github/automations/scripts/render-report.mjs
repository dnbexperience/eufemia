import { readFileSync } from 'node:fs'

const reportPath = process.argv[2]
const report = JSON.parse(readFileSync(reportPath, 'utf8'))
const markdownCharacters = new Set([
  String.fromCharCode(92),
  String.fromCharCode(96),
  '*',
  '_',
  '[',
  ']',
  '#',
])
const escapeMarkdown = (value) =>
  Array.from(
    String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;'),
    (character) =>
      character === '\n'
        ? '<br>'
        : markdownCharacters.has(character)
          ? String.fromCharCode(92) + character
          : character
  ).join('')

console.log('# ' + escapeMarkdown(report.title))
console.log()
console.log('Status: **' + escapeMarkdown(report.status) + '**')
console.log()
console.log(escapeMarkdown(report.summary))

if (report.findings.length > 0) {
  console.log()
  console.log('## Findings')

  for (const finding of report.findings) {
    console.log()
    console.log(
      '### ' +
        escapeMarkdown(finding.severity) +
        ': ' +
        escapeMarkdown(finding.title)
    )
    console.log()
    console.log(escapeMarkdown(finding.evidence))
    console.log()
    console.log(
      'Recommendation: ' + escapeMarkdown(finding.recommendation)
    )
  }
}

if (report.metrics.length > 0) {
  console.log()
  console.log('## Metrics')
  console.log()

  for (const metric of report.metrics) {
    console.log(
      '- ' +
        escapeMarkdown(metric.name) +
        ': ' +
        escapeMarkdown(metric.value)
    )
  }
}
