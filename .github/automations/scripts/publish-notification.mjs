import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import {
  findAutomationComment,
  findAutomationIssue,
  validateNotificationMarker,
} from './notification-utils.mjs'

const [repository, targetKind, target, marker, title, status, bodyPath] =
  process.argv.slice(2)
const body = readFileSync(bodyPath, 'utf8')

if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository)) {
  throw new Error('Repository is invalid')
}
if (targetKind !== 'pr' && targetKind !== 'issue') {
  throw new Error('Notification target kind is invalid')
}
if (targetKind === 'issue' && target !== marker.split(':').at(-1)) {
  throw new Error(
    'Tracking issue target must match its notification marker'
  )
}
if (
  !title ||
  title.length > 160 ||
  !/^[A-Za-z0-9 .:_-]+$/.test(title) ||
  title.includes('\n') ||
  title.includes('\r')
) {
  throw new Error('Notification title is invalid')
}
if (!['ok', 'attention', 'blocked'].includes(status)) {
  throw new Error('Notification status is invalid')
}
const bodyBytes = Buffer.byteLength(body, 'utf8')
if (bodyBytes === 0 || bodyBytes > 60 * 1024) {
  throw new Error('Notification body has an invalid size')
}
validateNotificationMarker(marker)

const ghJson = (args) =>
  JSON.parse(
    execFileSync('gh', args, {
      encoding: 'utf8',
      maxBuffer: 5 * 1024 * 1024,
    })
  )
const temporaryDirectory = mkdtempSync(
  join(tmpdir(), 'automation-notify-')
)
const payloadPath = join(temporaryDirectory, 'payload.json')

try {
  if (targetKind === 'pr') {
    if (!/^\d+$/.test(target) || Number(target) < 1) {
      throw new Error('Pull request target is invalid')
    }

    const comments = ghJson([
      'api',
      '--paginate',
      '--slurp',
      `repos/${repository}/issues/${target}/comments?per_page=100`,
    ]).flat()
    const existing = findAutomationComment(comments, marker)
    writeFileSync(payloadPath, JSON.stringify({ body }))
    execFileSync(
      'gh',
      existing
        ? [
            'api',
            '--method',
            'PATCH',
            `repos/${repository}/issues/comments/${existing.id}`,
            '--input',
            payloadPath,
          ]
        : [
            'api',
            '--method',
            'POST',
            `repos/${repository}/issues/${target}/comments`,
            '--input',
            payloadPath,
          ],
      { stdio: 'inherit' }
    )
  } else {
    const issues = ghJson([
      'api',
      '--method',
      'GET',
      'search/issues',
      '-f',
      `q=repo:${repository} is:issue in:title ${title}`,
      '-f',
      'per_page=100',
    ]).items
    const existing = findAutomationIssue(issues, marker, title)

    if (existing) {
      writeFileSync(
        payloadPath,
        JSON.stringify({
          body,
          title,
          state: status === 'ok' ? 'closed' : 'open',
        })
      )
      execFileSync(
        'gh',
        [
          'api',
          '--method',
          'PATCH',
          `repos/${repository}/issues/${existing.number}`,
          '--input',
          payloadPath,
        ],
        { stdio: 'inherit' }
      )
    } else if (status !== 'ok') {
      writeFileSync(payloadPath, JSON.stringify({ body, title }))
      execFileSync(
        'gh',
        [
          'api',
          '--method',
          'POST',
          `repos/${repository}/issues`,
          '--input',
          payloadPath,
        ],
        { stdio: 'inherit' }
      )
    }

    if (existing && status !== 'ok') {
      writeFileSync(
        payloadPath,
        JSON.stringify({
          body: 'A new automation result is available in the updated issue description.',
        })
      )
      execFileSync(
        'gh',
        [
          'api',
          '--method',
          'POST',
          `repos/${repository}/issues/${existing.number}/comments`,
          '--input',
          payloadPath,
        ],
        { stdio: 'inherit' }
      )
    }
  }
} finally {
  rmSync(temporaryDirectory, { recursive: true, force: true })
}
