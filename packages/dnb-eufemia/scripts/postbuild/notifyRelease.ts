import { setTimeout } from 'node:timers/promises'
import type { Octokit } from '@octokit/core'
import type { paginateRest } from '@octokit/plugin-paginate-rest'
import issueParser from 'issue-parser'
import type { ReleaseNotification } from './releaseNotification.ts'

type GitHub = Octokit & ReturnType<typeof paginateRest>

export async function notifyRelease({
  github,
  owner,
  repo,
  release,
  pause = () => setTimeout(1000),
}: {
  github: GitHub
  owner: string
  repo: string
  release: ReleaseNotification
  pause?: () => Promise<unknown>
}) {
  const { version, gitTag, channel, commits } = release
  const shas = new Set(commits.map(({ hash }) => hash))
  const targets = new Map<number, boolean>()
  const checkedPrs = new Set<number>()
  const messages = commits.map(({ message }) => message)
  const parse = issueParser('github')
  const errors: Array<unknown> = []

  for (const { hash } of commits) {
    try {
      const prs = await github.paginate(
        'GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls',
        { owner, repo, commit_sha: hash, per_page: 100 }
      )

      for (const pr of prs) {
        if (checkedPrs.has(pr.number)) {
          continue
        }
        checkedPrs.add(pr.number)

        if (
          !pr.merged_at ||
          pr.base.repo.full_name !== `${owner}/${repo}`
        ) {
          continue
        }

        // A commit can also be associated with PRs outside this release.
        if (!pr.merge_commit_sha || !shas.has(pr.merge_commit_sha)) {
          const prCommits = await github.paginate(
            'GET /repos/{owner}/{repo}/pulls/{pull_number}/commits',
            { owner, repo, pull_number: pr.number, per_page: 100 }
          )
          if (!prCommits.some(({ sha }) => shas.has(sha))) {
            continue
          }
        }

        targets.set(pr.number, true)
        messages.push(pr.body || '')
      }
    } catch (error) {
      errors.push(
        new Error(`Could not find PRs for commit ${hash}`, {
          cause: error,
        })
      )
    }
  }

  // Keep the existing confirmations on issues resolved by released changes.
  for (const message of messages) {
    for (const reference of parse(message).actions.close) {
      if (reference.slug && reference.slug !== `${owner}/${repo}`) {
        continue
      }
      const number = Number(reference.issue)
      if (!targets.has(number)) {
        targets.set(number, false)
      }
    }
  }

  const marker = `<!-- eufemia-release:${gitTag}:${channel || 'latest'} -->`
  const label = channel ? `released on @${channel}` : 'released'
  const releaseUrl = `https://github.com/${owner}/${repo}/releases/tag/${encodeURIComponent(gitTag)}`

  for (const [number, isPr] of targets) {
    try {
      const comments = await github.paginate(
        'GET /repos/{owner}/{repo}/issues/{issue_number}/comments',
        { owner, repo, issue_number: number, per_page: 100 }
      )
      const alreadyNotified = comments.some(
        ({ body }) =>
          body?.includes(marker) ||
          (body?.includes(`in version ${version} :tada:`) &&
            body.includes('Your **[semantic-release]'))
      )

      if (!alreadyNotified) {
        await github.request(
          'POST /repos/{owner}/{repo}/issues/{issue_number}/comments',
          {
            owner,
            repo,
            issue_number: number,
            body: `${marker}\n:tada: This ${isPr ? 'PR is included' : 'issue has been resolved'} in version ${version} :tada:\n\nThe release is available on [GitHub](${releaseUrl}).`,
          }
        )
        await pause()
      }

      // Reapply the label if an earlier run stopped after posting the comment.
      await github.request(
        'POST /repos/{owner}/{repo}/issues/{issue_number}/labels',
        { owner, repo, issue_number: number, labels: [label] }
      )
      await pause()
      console.log(`Confirmed release ${version} on #${number}`)
    } catch (error) {
      errors.push(
        new Error(`Could not notify #${number}`, { cause: error })
      )
    }
  }

  if (errors.length > 0) {
    throw new AggregateError(errors, 'Some release notifications failed')
  }
}
