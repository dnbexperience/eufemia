const markdownCharacters = new Set([
  String.fromCharCode(96),
  '*',
  '_',
  '[',
  ']',
  '#',
])

export const escapeMarkdown = (value) =>
  Array.from(
    String(value)
      .replace(/\\/g, () => '\\\\')
      .replace(/https?:\/\/[^\s<>"']+/g, '[external link omitted]')
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

export const validateNotificationMarker = (marker) => {
  if (!/^eufemia-automation:[a-z0-9-]+(?::[a-z0-9-]+)*$/.test(marker)) {
    throw new Error('Automation notification marker is invalid')
  }
}

export const notificationMarker = (marker) => {
  validateNotificationMarker(marker)
  return `<!-- ${marker} -->`
}

export const findAutomationComment = (comments, marker) => {
  const expectedMarker = notificationMarker(marker)

  return comments.find(
    (comment) =>
      comment.user?.login === 'github-actions[bot]' &&
      String(comment.body).startsWith(`${expectedMarker}\n`)
  )
}

export const findAutomationIssue = (issues, marker, title) => {
  const expectedMarker = notificationMarker(marker)

  return issues.find(
    (issue) =>
      !issue.pull_request &&
      issue.user?.login === 'github-actions[bot]' &&
      issue.title === title &&
      String(issue.body).startsWith(`${expectedMarker}\n`)
  )
}

const validateRunUrl = (runUrl, repository) => {
  const url = new URL(runUrl)
  const escapedRepository = repository.replace(
    /[.*+?^${}()|[\]\\]/g,
    '\\$&'
  )
  const expectedPath = new RegExp(
    `^/${escapedRepository}/actions/runs/\\d+$`
  )

  if (
    url.origin !== 'https://github.com' ||
    url.search ||
    url.hash ||
    !expectedPath.test(url.pathname)
  ) {
    throw new Error('Automation run URL is invalid')
  }

  return url.href
}

export const renderNotification = ({
  marker,
  repository,
  report,
  runUrl,
  title,
}) => {
  const validatedRunUrl = validateRunUrl(runUrl, repository)
  const lines = [
    notificationMarker(marker),
    `## ${escapeMarkdown(title)}`,
    '',
    `Status: **${escapeMarkdown(report.status)}**`,
    '',
    escapeMarkdown(report.summary),
  ]

  if (report.findings.length > 0) {
    lines.push('', '### Findings')
    for (const finding of report.findings.slice(0, 5)) {
      lines.push(
        '',
        `- **${escapeMarkdown(finding.severity)}: ${escapeMarkdown(finding.title)}**`,
        `  ${escapeMarkdown(finding.recommendation)}`
      )
    }
    if (report.findings.length > 5) {
      lines.push(
        '',
        `_Showing 5 of ${report.findings.length} findings. Open the run for the complete report._`
      )
    }
  }

  lines.push(
    '',
    `[Open the full automation report →](${validatedRunUrl})`,
    '',
    '_This notification is updated in place. The complete JSON report is stored as a workflow artifact._',
    ''
  )

  return lines.join('\n')
}
