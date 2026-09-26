const impactOrder = ['critical', 'serious', 'moderate', 'minor', null]

export function createPortalAccessibilityReport({
  duplicateIdFindings,
  axeFindings,
  scannedPages,
}) {
  const findings = [...duplicateIdFindings, ...axeFindings].sort(
    compareFindings
  )

  return {
    schemaVersion: 1,
    summary: {
      pages: scannedPages,
      duplicateIdGroups: duplicateIdFindings.length,
      axeGroups: axeFindings.length,
      findings: findings.length,
    },
    findings,
  }
}

export function formatPortalAccessibilityReport(report) {
  const duplicateIds = report.findings.filter(
    ({ check }) => check === 'duplicate-id'
  )
  const axeFindings = report.findings.filter(
    ({ check }) => check === 'axe'
  )
  const lines = [
    '<!-- portal-accessibility-report -->',
    '# Portal accessibility and duplicate ID report',
    '',
    `Scanned ${report.summary.pages} canonical pages.`,
    '',
    `- ${duplicateIds.length} duplicate ID groups`,
    `- ${axeFindings.length} page-level axe findings`,
    '',
    `## Duplicate IDs (${duplicateIds.length})`,
    '',
  ]

  for (const finding of duplicateIds) {
    const url = `https://eufemia.dnb.no${finding.page}#${encodeURIComponent(finding.id)}`
    lines.push(
      `- \`#${finding.id}\` – ${finding.occurrences} occurrences on [${finding.page}](${url})`
    )
  }

  lines.push('', `## Axe findings (${axeFindings.length})`, '')
  const rules = new Map()
  for (const finding of axeFindings) {
    const group = rules.get(finding.id) || []
    group.push(finding)
    rules.set(finding.id, group)
  }

  for (const [id, findings] of rules) {
    const first = findings[0]
    lines.push(
      `### ${impactLabel(first.impact)} [${id}](${first.helpUrl})`,
      '',
      first.help,
      ''
    )
    for (const finding of findings) {
      lines.push(
        `- ${finding.occurrences} nodes on [${finding.page}](https://eufemia.dnb.no${finding.page})`
      )
      for (const node of finding.nodes || []) {
        lines.push(
          `  - \`${node.target.join(' → ')}\` – ${node.failureSummary}`
        )
      }
    }
    lines.push('')
  }

  if (report.findings.length === 0) {
    lines.push('No findings. The Portal is clean.', '')
  }

  return lines.join('\n')
}

export function comparePortalAccessibilityReports(previous, current) {
  if (previous.schemaVersion !== current.schemaVersion) {
    throw new Error(
      `Cannot compare Portal accessibility report schema ${previous.schemaVersion} with ${current.schemaVersion}`
    )
  }

  const previousFindings = new Map(
    previous.findings.map((finding) => [findingKey(finding), finding])
  )
  const currentFindings = new Map(
    current.findings.map((finding) => [findingKey(finding), finding])
  )
  const changes = {
    new: [],
    worsened: [],
    changed: [],
    improved: [],
    resolved: [],
  }

  for (const [key, finding] of currentFindings) {
    const previousFinding = previousFindings.get(key)
    if (!previousFinding) {
      changes.new.push(finding)
    } else if (finding.occurrences > previousFinding.occurrences) {
      changes.worsened.push({
        ...finding,
        previousOccurrences: previousFinding.occurrences,
      })
    } else if (finding.occurrences < previousFinding.occurrences) {
      changes.improved.push({
        ...finding,
        previousOccurrences: previousFinding.occurrences,
      })
    } else if (
      findingFingerprint(finding) !== findingFingerprint(previousFinding)
    ) {
      changes.changed.push(finding)
    }
  }

  for (const [key, finding] of previousFindings) {
    if (!currentFindings.has(key)) {
      changes.resolved.push(finding)
    }
  }

  for (const findings of Object.values(changes)) {
    findings.sort(compareFindings)
  }

  return changes
}

export function formatPortalAccessibilityChanges(changes) {
  if (Object.values(changes).every(({ length }) => length === 0)) {
    return ''
  }

  const lines = ['## Changes since the previous scan', '']

  for (const [key, findings] of Object.entries(changes)) {
    if (findings.length === 0) {
      continue
    }

    lines.push(`### ${capitalize(key)} (${findings.length})`, '')
    for (const finding of findings) {
      const count =
        key === 'changed'
          ? 'failing nodes changed'
          : finding.previousOccurrences
            ? `${finding.previousOccurrences} → ${finding.occurrences} occurrences`
            : `${finding.occurrences} occurrences`
      lines.push(
        `- ${findingLabel(finding)} – ${count} on ${finding.page}`
      )
      for (const node of key === 'changed' ? finding.nodes || [] : []) {
        lines.push(`  - \`${node.target.join(' → ')}\``)
      }
    }
    lines.push('')
  }

  return lines.join('\n')
}

export function splitIssueBody(markdown, maxLength = 55000) {
  const chunks = []
  let current = ''

  for (const line of markdown.split('\n')) {
    if (current.length + line.length + 1 > maxLength && current) {
      chunks.push(current)
      current = ''
    }
    current += `${line}\n`
  }

  if (current) {
    chunks.push(current)
  }

  return chunks
}

export function findDuplicateIds(ids, page) {
  const counts = new Map()

  for (const id of ids) {
    if (id) {
      counts.set(id, (counts.get(id) || 0) + 1)
    }
  }

  return Array.from(counts, ([id, occurrences]) => ({
    check: 'duplicate-id',
    page,
    id,
    occurrences,
  }))
    .filter(({ occurrences }) => occurrences > 1)
    .sort(compareFindings)
}

function findingKey(finding) {
  return [finding.check, finding.page, finding.id].join('\0')
}

function findingFingerprint(finding) {
  return JSON.stringify(finding.nodes || [])
}

function findingLabel(finding) {
  return finding.check === 'duplicate-id'
    ? `\`#${finding.id}\``
    : `axe \`${finding.id}\``
}

function compareFindings(a, b) {
  return (
    impactOrder.indexOf(a.impact ?? null) -
      impactOrder.indexOf(b.impact ?? null) ||
    a.id.localeCompare(b.id) ||
    a.page.localeCompare(b.page)
  )
}

function impactLabel(impact) {
  return impact ? `${capitalize(impact)}:` : ''
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
