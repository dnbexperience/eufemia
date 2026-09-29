import { readFileSync, statSync } from 'node:fs'

const [reportPath, guardrailsPath] = process.argv.slice(2)
const report = JSON.parse(readFileSync(reportPath, 'utf8'))
const guardrails = JSON.parse(readFileSync(guardrailsPath, 'utf8'))
const maxBytes = guardrails.output.maxBytes
const allowedStatuses = new Set(['ok', 'attention', 'blocked'])
const allowedSeverities = new Set(['P1', 'P2', 'P3'])
const assertString = (value, maxLength, label) => {
  if (typeof value !== 'string' || value.length > maxLength) {
    throw new Error(`${label} is invalid`)
  }
}

if (statSync(reportPath).size > maxBytes) {
  throw new Error(`Automation report exceeds ${maxBytes} bytes`)
}

if (report.findings.length > 20 || report.metrics.length > 20) {
  throw new Error('Automation report exceeds item limits')
}

if (
  !allowedStatuses.has(report.status) ||
  !Array.isArray(report.findings) ||
  !Array.isArray(report.metrics)
) {
  throw new Error('Automation report has an invalid shape')
}
assertString(report.title, 160, 'Report title')
assertString(report.summary, 4000, 'Report summary')

for (const finding of report.findings) {
  if (
    !allowedSeverities.has(finding.severity) ||
    typeof finding !== 'object' ||
    finding === null
  ) {
    throw new Error('Automation report contains an invalid finding')
  }
  assertString(finding.title, 200, 'Finding title')
  assertString(finding.evidence, 2000, 'Finding evidence')
  assertString(finding.recommendation, 2000, 'Finding recommendation')
}

for (const metric of report.metrics) {
  if (typeof metric !== 'object' || metric === null) {
    throw new Error('Automation report contains an invalid metric')
  }
  assertString(metric.name, 100, 'Metric name')
  assertString(metric.value, 200, 'Metric value')
}
