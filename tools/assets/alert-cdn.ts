import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { summarize } from './check-cdn.ts'
import type { Report } from './check-cdn.ts'

const marker = '<!-- eufemia-cdn-health:'
const title = 'Eufemia CDN incident'
type Issue = {
  number: number
  body: string
  html_url: string
  pull_request?: unknown
  user?: { login: string }
}

export async function alertCdn({
  report,
  repository,
  token,
  runUrl,
  webhook,
  request = fetch,
}: {
  report: Report
  repository: string
  token: string
  runUrl: string
  webhook?: string
  request?: typeof fetch
}) {
  if (report.status === 'pending') {
    return
  }
  if (!/^[\w.-]+\/[\w.-]+$/.test(repository) || !token) {
    throw new Error(
      'GitHub repository and token are required for incident reporting'
    )
  }
  const base = `https://api.github.com/repos/${repository}`
  async function api(path: string, method = 'GET', body?: unknown) {
    const response = await request(`${base}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: AbortSignal.timeout(15_000),
      redirect: 'error',
    })
    if (!response.ok) {
      throw new Error(
        `GitHub incident reporting failed: HTTP ${response.status}`
      )
    }
    return response.json()
  }

  async function slack(message: string) {
    if (!webhook) {
      return
    }
    if (!/^https:\/\/hooks\.slack\.com\/services\//.test(webhook)) {
      throw new Error(
        'CDN_ALERT_WEBHOOK must be a Slack incoming webhook URL'
      )
    }
    // Do not include request errors: their URL may contain the webhook secret.
    try {
      const response = await request(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: message, unfurl_links: false }),
        signal: AbortSignal.timeout(15_000),
        redirect: 'error',
      })
      if (!response.ok || (await response.text()) !== 'ok') {
        throw new Error('Notification rejected')
      }
    } catch {
      throw new Error('Slack incident notification could not be delivered')
    }
  }

  let issue: Issue | undefined
  for (let page = 1; ; page++) {
    const issues: Issue[] = await api(
      `/issues?state=open&creator=github-actions%5Bbot%5D&per_page=100&page=${page}`
    )
    issue = issues.find(
      (candidate) =>
        !candidate.pull_request &&
        candidate.user?.login === 'github-actions[bot]' &&
        candidate.body?.startsWith(marker)
    )
    if (issue || issues.length < 100) {
      break
    }
  }

  if (report.status === 'healthy') {
    if (issue) {
      await slack(
        `Eufemia CDN recovered. npm latest: ${report.latest}.\n${issue.html_url}\n${runUrl}`
      )
      await api(`/issues/${issue.number}/comments`, 'POST', {
        body: `CDN checks recovered.\n\n${summarize(report)}\n\n[Workflow run](${runUrl})`,
      })
      await api(`/issues/${issue.number}`, 'PATCH', {
        state: 'closed',
        state_reason: 'completed',
      })
    }
    return
  }

  const failures = report.checks
    .filter((check) => !check.ok && !check.pending)
    .map((check) => check.name)
    .sort()
  const fingerprint = createHash('sha256')
    .update(JSON.stringify(failures))
    .digest('hex')
  const acknowledged = `${marker}${fingerprint} -->`
  const body = `${acknowledged}\n${summarize(report)}\n\n[Workflow run](${runUrl})`
  if (issue?.body.startsWith(acknowledged)) {
    return
  }
  const existing = Boolean(issue)
  if (!issue) {
    issue = (await api('/issues', 'POST', {
      title,
      body: `${marker}new -->\n${summarize(report)}\n\n[Workflow run](${runUrl})`,
    })) as Issue
  }
  await slack(
    `Eufemia CDN checks failed: ${failures.join(', ')}.\n${issue.html_url}\n${runUrl}`
  )
  if (existing) {
    await api(`/issues/${issue.number}/comments`, 'POST', {
      body: `Incident changed.\n\n${summarize(report)}\n\n[Workflow run](${runUrl})`,
    })
  }
  await api(`/issues/${issue.number}`, 'PATCH', { body })
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  let report: Report
  try {
    report = JSON.parse(readFileSync('cdn-health-report.json', 'utf8'))
    if (
      !['healthy', 'pending', 'unhealthy'].includes(report.status) ||
      !Array.isArray(report.checks) ||
      report.checks.length === 0
    ) {
      throw new Error('Invalid health report')
    }
  } catch {
    report = {
      status: 'unhealthy',
      checkedAt: new Date().toISOString(),
      checks: [
        {
          name: 'monitor',
          ok: false,
          detail:
            'The CDN monitor did not produce a report. See the workflow logs.',
        },
      ],
    }
  }
  await alertCdn({
    report,
    repository: process.env.GITHUB_REPOSITORY ?? '',
    token: process.env.GH_TOKEN ?? '',
    runUrl: `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`,
    webhook: process.env.CDN_ALERT_WEBHOOK,
  })
}
