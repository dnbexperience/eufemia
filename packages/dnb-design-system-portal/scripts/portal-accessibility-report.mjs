const impactOrder = ['critical', 'serious', 'moderate', 'minor', null]

export function createPortalAccessibilityReport({
  duplicateIdFindings,
  axeFindings,
  scannedPages,
  acceptedFindings = [],
}) {
  const accepted = []
  const openAxeFindings = []

  for (const finding of axeFindings) {
    const openNodes = []
    const acceptedNodes = new Map()

    for (const node of finding.nodes || []) {
      const rule = acceptedFindings.find((rule) =>
        acceptsNode(rule, finding, node)
      )
      if (rule) {
        acceptedNodes.set(rule.reason, [
          ...(acceptedNodes.get(rule.reason) || []),
          node,
        ])
      } else {
        openNodes.push(node)
      }
    }

    for (const [reason, nodes] of acceptedNodes) {
      accepted.push({
        ...finding,
        occurrences: nodes.length,
        nodes,
        reason,
      })
    }
    if (openNodes.length > 0 || !finding.nodes?.length) {
      openAxeFindings.push(
        acceptedNodes.size > 0
          ? { ...finding, occurrences: openNodes.length, nodes: openNodes }
          : finding
      )
    }
  }

  const findings = [...duplicateIdFindings, ...openAxeFindings].sort(
    compareFindings
  )

  return {
    schemaVersion: 1,
    summary: {
      pages: scannedPages,
      duplicateIdGroups: duplicateIdFindings.length,
      axeGroups: openAxeFindings.length,
      acceptedGroups: accepted.length,
      findings: findings.length,
    },
    findings,
    accepted: accepted.sort(compareFindings),
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
    ...(report.accepted?.length
      ? [`- ${report.accepted.length} accepted findings (not counted)`]
      : []),
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

  const accepted = report.accepted || []
  if (accepted.length > 0) {
    lines.push(
      `## Accepted findings (${accepted.length})`,
      '',
      'These findings are expected and are not counted above. They are listed in `scripts/portal-accessibility-accepted.mjs`.',
      ''
    )
    const reasons = new Map()
    for (const finding of accepted) {
      reasons.set(finding.reason, [
        ...(reasons.get(finding.reason) || []),
        finding,
      ])
    }
    for (const [reason, findings] of reasons) {
      lines.push(`### ${reason}`, '')
      for (const finding of findings) {
        lines.push(
          `- ${findingLabel(finding)} – ${finding.occurrences} nodes on [${finding.page}](https://eufemia.dnb.no${finding.page})`
        )
      }
      lines.push('')
    }
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
  const acceptedKeys = new Set((current.accepted || []).map(findingKey))
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
    if (!currentFindings.has(key) && !acceptedKeys.has(key)) {
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

function acceptsNode(rule, finding, node) {
  return (
    rule.rule === finding.id &&
    (!rule.pages ||
      rule.pages.some((page) => finding.page.startsWith(page))) &&
    (!rule.target || node.target.join(' ').includes(rule.target))
  )
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
