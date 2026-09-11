import {
  mkdtempSync,
  mkdirSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'

const scriptsRoot = new URL('../', import.meta.url).pathname
const validateScript = join(scriptsRoot, 'validate-context.mjs')
const guardrails = new URL('../../guardrails.json', import.meta.url)
  .pathname
const fixtureRoot = mkdtempSync(join(tmpdir(), 'automation-context-'))

const run = (contextPath) =>
  spawnSync(process.execPath, [validateScript, contextPath, guardrails], {
    encoding: 'utf8',
  })

try {
  const valid = join(fixtureRoot, 'valid')
  mkdirSync(join(valid, 'images'), { recursive: true })
  writeFileSync(join(valid, 'context.json'), '{}')
  writeFileSync(join(valid, 'images', 'diff.png'), 'image')

  if (run(valid).status !== 0) {
    throw new Error('Expected valid context to pass')
  }

  const unsupported = join(fixtureRoot, 'unsupported')
  mkdirSync(unsupported)
  writeFileSync(join(unsupported, 'script.sh'), 'exit 0')
  if (run(unsupported).status === 0) {
    throw new Error('Expected executable-looking context to fail')
  }

  const linked = join(fixtureRoot, 'linked')
  mkdirSync(linked)
  writeFileSync(join(fixtureRoot, 'outside.txt'), 'outside')
  symlinkSync(
    join(fixtureRoot, 'outside.txt'),
    join(linked, 'context.txt')
  )
  if (run(linked).status === 0) {
    throw new Error('Expected symbolic-link context to fail')
  }

  console.log('context validation tests passed')
} finally {
  rmSync(fixtureRoot, { recursive: true, force: true })
}
