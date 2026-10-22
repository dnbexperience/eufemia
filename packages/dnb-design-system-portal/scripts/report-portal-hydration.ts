import { createHash } from 'node:crypto'
import {
  assertCompleteReport,
  hydrationIssues,
  hydrationIssueMarker,
  type HydrationReport,
} from './portal-hydration.ts'

type Issue = {
  number: number
  body: string | null
  state: string
  state_reason?: 'completed' | 'not_planned' | 'reopened' | null
  user?: { login: string }
}
export type IssueApi = {
  list(): Promise<Issue[]>
  create(issue: { title: string; body: string }): Promise<unknown>
  update(
    number: number,
    changes: {
      body?: string
      state: 'open' | 'closed'
      state_reason: 'reopened' | 'completed'
    }
  ): Promise<unknown>
}

export async function reportPortalHydration(
  report: HydrationReport,
  api: IssueApi,
  runUrl: string
) {
  assertCompleteReport(report)
  if (report.baseUrl !== 'https://eufemia.dnb.no') {
    throw new Error('Expected a production Portal report')
  }
  const issues = (await api.list()).filter(
    (issue) => issue.user?.login === 'github-actions[bot]'
  )
  const drafts = hydrationIssues(report)
  const scanned = new Set(
    report.visits.map((visit) => hydrationIssueMarker(visit.page))
  )
  const active = new Set(drafts.map(({ marker }) => marker))
  const result = { created: 0, updated: 0, closed: 0 }
  for (const draft of drafts) {
    const issue =
      issues.find(
        (candidate) =>
          candidate.body?.includes(draft.marker) &&
          candidate.state === 'open'
      ) ||
      issues.find((candidate) => candidate.body?.includes(draft.marker))
    if (
      issue?.state === 'closed' &&
      issue.state_reason === 'not_planned'
    ) {
      continue
    }

    const fingerprint =
      '<!-- portal-hydration-fingerprint:' +
      createHash('sha256')
        .update(
          draft.body.replace(
            /https:\/\/[^\s)<>]+\/assets\/[^\s)<>]+/g,
            '[bundled asset]'
          )
        )
        .digest('hex') +
      ' -->'
    const body =
      draft.body +
      '\n\n' +
      fingerprint +
      '\n\n[Workflow report](' +
      runUrl +
      ')'
    if (!issue) {
      await api.create({ title: draft.title, body })
      result.created++
    } else if (
      issue.state !== 'open' ||
      !issue.body?.includes(fingerprint)
    ) {
      await api.update(issue.number, {
        body,
        state: 'open',
        state_reason: 'reopened',
      })
      result.updated++
    }
  }
  for (const issue of issues) {
    const marker = issue.body?.match(
      /<!-- portal-hydration:[a-f0-9]{64} -->/
    )?.[0]
    if (
      marker &&
      scanned.has(marker) &&
      !active.has(marker) &&
      issue.state === 'open'
    ) {
      await api.update(issue.number, {
        state: 'closed',
        state_reason: 'completed',
      })
      result.closed++
    }
  }
  return result
}

export function githubIssueApi(
  repository: string,
  token: string
): IssueApi {
  if (!/^[\w.-]+\/[\w.-]+$/.test(repository)) {
    throw new Error('Invalid GitHub repository')
  }
  const endpoint = 'https://api.github.com/repos/' + repository + '/issues'
  async function request(url: string, method = 'GET', data?: object) {
    const response = await fetch(url, {
      method,
      redirect: 'error',
      signal: AbortSignal.timeout(30000),
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    })
    if (!response.ok) {
      throw new Error(
        'GitHub issue request failed: HTTP ' + response.status
      )
    }
    return response.json()
  }
  return {
    async list() {
      const issues: Issue[] = []
      for (let page = 1; ; page++) {
        const batch = await request(
          endpoint +
            '?state=all&creator=github-actions%5Bbot%5D&per_page=100&page=' +
            page
        )
        issues.push(
          ...batch.filter(
            (issue: { pull_request?: unknown }) => !issue.pull_request
          )
        )
        if (batch.length < 100) {
          return issues
        }
      }
    },
    create: (issue) => request(endpoint, 'POST', issue),
    update: (number, changes) =>
      request(endpoint + '/' + number, 'PATCH', changes),
  }
}
