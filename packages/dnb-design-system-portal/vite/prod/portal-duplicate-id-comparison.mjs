export function comparePortalDuplicateIdReports(baseline, current) {
  if (baseline.schemaVersion !== current.schemaVersion) {
    throw new Error(
      `Cannot compare Portal duplicate ID report schema ${baseline.schemaVersion} with ${current.schemaVersion}`
    )
  }

  const previousFindings = new Map(
    baseline.findings.map((finding) => [findingKey(finding), finding])
  )
  const currentFindings = new Map(
    current.findings.map((finding) => [findingKey(finding), finding])
  )
  const comparison = {
    new: [],
    worsened: [],
    improved: [],
    resolved: [],
  }

  for (const [key, finding] of currentFindings) {
    const previous = previousFindings.get(key)

    if (!previous) {
      comparison.new.push(finding)
    } else if (finding.occurrences > previous.occurrences) {
      comparison.worsened.push({
        ...finding,
        previousOccurrences: previous.occurrences,
      })
    } else if (finding.occurrences < previous.occurrences) {
      comparison.improved.push({
        ...finding,
        previousOccurrences: previous.occurrences,
      })
    }
  }

  for (const [key, finding] of previousFindings) {
    if (!currentFindings.has(key)) {
      comparison.resolved.push(finding)
    }
  }

  for (const findings of Object.values(comparison)) {
    findings.sort(compareFindings)
  }

  return comparison
}

export function hasPortalDuplicateIdRegression(comparison) {
  return comparison.new.length > 0 || comparison.worsened.length > 0
}

export function formatPortalDuplicateIdComparison(comparison, current) {
  const lines = [
    '# Portal duplicate IDs',
    '',
    `${current.summary.duplicateIdGroups} duplicate ID groups with ` +
      `${current.summary.duplicateIdOccurrences} duplicate occurrences across ` +
      `${current.summary.pages} canonical pages.`,
    '',
  ]

  addSection(lines, 'New', comparison.new)
  addSection(lines, 'Worsened', comparison.worsened)
  addSection(lines, 'Improved', comparison.improved)
  addSection(lines, 'Resolved', comparison.resolved)

  if (
    Object.values(comparison).every((findings) => findings.length === 0)
  ) {
    lines.push('No changes since the deployed report.', '')
  }

  return lines.join('\n')
}

function addSection(lines, heading, findings) {
  if (findings.length === 0) {
    return
  }

  lines.push(`## ${heading} (${findings.length})`, '')

  for (const finding of findings) {
    const occurrenceChange = finding.previousOccurrences
      ? `${finding.previousOccurrences} → ${finding.occurrences} occurrences`
      : `${finding.occurrences} occurrences`
    const pageUrl = `https://eufemia.dnb.no${finding.page}#${encodeURIComponent(finding.id)}`

    lines.push(
      `- \`#${finding.id}\` – ${occurrenceChange} on [${finding.page}](${pageUrl})`
    )
  }

  lines.push('')
}

function findingKey(finding) {
  return [finding.check, finding.page, finding.id].join('\0')
}

function compareFindings(a, b) {
  return a.page.localeCompare(b.page) || a.id.localeCompare(b.id)
}
