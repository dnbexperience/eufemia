import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import {
  findAutomationComment,
  validateCommentBody,
} from './release-utils.mjs'

const [repository, pullNumber, marker, bodyPath] = process.argv.slice(2)
const body = readFileSync(bodyPath, 'utf8')
validateCommentBody(body)
const comments = JSON.parse(
  execFileSync(
    'gh',
    [
      'api',
      '--paginate',
      '--slurp',
      `repos/${repository}/issues/${pullNumber}/comments?per_page=100`,
    ],
    { encoding: 'utf8' }
  )
).flat()
const existing = findAutomationComment(comments, marker)
const temporaryDirectory = mkdtempSync(join(tmpdir(), 'release-comment-'))
const payloadPath = join(temporaryDirectory, 'payload.json')

try {
  writeFileSync(payloadPath, JSON.stringify({ body }))

  if (existing) {
    execFileSync(
      'gh',
      [
        'api',
        '--method',
        'PATCH',
        `repos/${repository}/issues/comments/${existing.id}`,
        '--input',
        payloadPath,
      ],
      { stdio: 'inherit' }
    )
  } else {
    execFileSync(
      'gh',
      [
        'api',
        '--method',
        'POST',
        `repos/${repository}/issues/${pullNumber}/comments`,
        '--input',
        payloadPath,
      ],
      { stdio: 'inherit' }
    )
  }
} finally {
  rmSync(temporaryDirectory, { recursive: true, force: true })
}
