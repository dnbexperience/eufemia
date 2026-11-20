const impactOrder = ['critical', 'serious', 'moderate', 'minor', null]

export function createPortalAccessibilityReport({
  duplicateIdFindings,
  axeFindings,
  axeReviewFindings = [],
  scannedPages,
  colorSchemes = ['light'],
}) {
  const findings = [
    ...duplicateIdFindings,
    ...axeFindings,
    ...axeReviewFindings,
  ].sort(compareFindings)

  return {
    schemaVersion: 1,
    summary: {
      pages: scannedPages,
      colorSchemes,
      duplicateIdGroups: duplicateIdFindings.length,
      axeGroups: axeFindings.length,
      axeReviewGroups: axeReviewFindings.length,
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
  const axeReviewFindings = report.findings.filter(
    ({ check }) => check === 'axe-review'
  )
  const colorSchemes = report.summary.colorSchemes ?? ['light']
  const lines = [
    '<!-- portal-accessibility-report -->',
    '# Portal accessibility and duplicate ID report',
    '',
    `Scanned ${report.summary.pages} canonical pages${
      colorSchemes.includes('dark')
        ? colorSchemes.includes('light')
          ? ' in light and dark mode'
          : ' in dark mode'
        : ''
    }.`,
    '',
    `- ${duplicateIds.length} duplicate ID groups`,
    `- ${axeFindings.length} page-level axe findings`,
    ...(axeReviewFindings.length > 0
      ? [`- ${axeReviewFindings.length} axe findings that need review`]
      : []),
    '',
    `## Duplicate IDs (${duplicateIds.length})`,
    '',
  ]

  const patterns = groupGeneratedIds(duplicateIds)
  if (patterns.length > 0) {
    lines.push(
      'Generated ids that repeat in the same way usually have one cause:',
      ''
    )
    for (const { pattern, ids, pages } of patterns) {
      lines.push(
        `- \`#${pattern}\` – ${ids} ids on ${pages} ${pages === 1 ? 'page' : 'pages'}`
      )
    }
    lines.push('')
  }

  for (const finding of duplicateIds) {
    const url = `https://eufemia.dnb.no${finding.page}#${encodeURIComponent(finding.id)}`
    lines.push(
      `- \`#${finding.id}\` – ${finding.occurrences} occurrences on [${finding.page}](${url})`
    )
  }

  lines.push('', `## Axe findings (${axeFindings.length})`, '')
  formatAxeFindings(lines, axeFindings)

  if (axeReviewFindings.length > 0) {
    lines.push(
      `## Axe findings that need review (${axeReviewFindings.length})`,
      '',
      'axe could not decide these. Many screen readers ignore an ARIA name on an element whose role does not allow one.',
      ''
    )
    formatAxeFindings(lines, axeReviewFindings)
  }

  if (report.findings.length === 0) {
    lines.push('No findings. The Portal is clean.', '')
  }

  return lines.join('\n')
}

function formatAxeFindings(lines, axeFindings) {
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
        `- ${finding.occurrences} nodes on [${finding.page}](https://eufemia.dnb.no${finding.page})${colorSchemeLabel(finding)}`
      )
      for (const node of finding.nodes || []) {
        lines.push(
          `  - \`${node.target.join(' → ')}\` – ${node.failureSummary}`
        )
      }
    }
    lines.push('')
  }
}

// React's useId gives ids like "id-R18dejbaqdb5"; the rest of the id shows the cause
const generatedIdPattern = /^id-[Rr](?=[0-9a-z]*[0-9])[0-9a-z]+/

function groupGeneratedIds(duplicateIds) {
  const groups = new Map()
  for (const { id, page } of duplicateIds) {
    if (!generatedIdPattern.test(id)) {
      continue
    }
    const pattern = id.replace(generatedIdPattern, 'id-…')
    const group = groups.get(pattern) || { ids: 0, pages: new Set() }
    group.ids++
    group.pages.add(page)
    groups.set(pattern, group)
  }

  return Array.from(groups, ([pattern, { ids, pages }]) => ({
    pattern,
    ids,
    pages: pages.size,
  }))
    .filter(({ ids }) => ids > 1)
    .sort((a, b) => b.ids - a.ids || a.pattern.localeCompare(b.pattern))
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
        `- ${findingLabel(finding)} – ${count} on ${finding.page}${colorSchemeLabel(finding)}`
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
  return [
    finding.check,
    finding.page,
    finding.id,
    ...(finding.colorScheme ? [finding.colorScheme] : []),
  ].join('\0')
}

function colorSchemeLabel(finding) {
  return finding.colorScheme ? ` in ${finding.colorScheme} mode` : ''
}

function findingFingerprint(finding) {
  return JSON.stringify(finding.nodes || [])
}

function findingLabel(finding) {
  return finding.check === 'duplicate-id'
    ? `\`#${finding.id}\``
    : `axe \`${finding.id}\`${finding.check === 'axe-review' ? ' (needs review)' : ''}`
}

function compareFindings(a, b) {
  return (
    impactOrder.indexOf(a.impact ?? null) -
      impactOrder.indexOf(b.impact ?? null) ||
    a.id.localeCompare(b.id) ||
    a.page.localeCompare(b.page) ||
    (a.colorScheme ?? '').localeCompare(b.colorScheme ?? '')
  )
}

function impactLabel(impact) {
  return impact ? `${capitalize(impact)}:` : ''
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
