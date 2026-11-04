import { execFileSync, spawnSync } from 'node:child_process'
import {
  cpSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { tokenModes } from '../tokenReview'

it('reviews uncommitted values against the merge base and returns a failing exit code for a regression', () => {
  const repositoryRoot = path.resolve(__dirname, '../../../../..')
  const temporaryRoot = mkdtempSync(
    path.join(os.tmpdir(), 'eufemia-token-review-')
  )
  const themePath = 'packages/dnb-eufemia/src/style/themes'
  const git = (...args: string[]) =>
    execFileSync('git', args, { cwd: temporaryRoot, stdio: 'pipe' })
  const commit = () => {
    git('add', '.')
    git(
      '-c',
      'user.name=Token test',
      '-c',
      'user.email=token-test@example.com',
      'commit',
      '-m',
      'Token fixture'
    )
  }
  const review = (base: string, output: string) =>
    spawnSync(
      process.execPath,
      [
        '--experimental-strip-types',
        path.join(
          repositoryRoot,
          'packages/dnb-eufemia/scripts/figma/reportTokenChanges.ts'
        ),
        base,
        output,
      ],
      { cwd: temporaryRoot, encoding: 'utf8' }
    )

  try {
    for (const brand of new Set(tokenModes.map(({ brand }) => brand))) {
      const directory = path.join(temporaryRoot, themePath, brand)
      mkdirSync(directory, { recursive: true })
      for (const file of [
        'foundation.scss',
        'tokens.scss',
        ...(brand === 'carnegie' ? [] : ['tokens-dark.scss']),
      ]) {
        cpSync(
          path.join(repositoryRoot, themePath, brand, file),
          path.join(directory, file)
        )
      }
    }
    git('init', '--initial-branch=main')
    commit()
    git('branch', 'feature')

    const tokenFile = path.join(temporaryRoot, themePath, 'ui/tokens.scss')
    const source = readFileSync(tokenFile, 'utf8')
    writeFileSync(
      tokenFile,
      source.replace(
        '--token-color-text-action: var(--dnb-coldgreen-600)',
        '--token-color-text-action: #aaa'
      )
    )
    commit()
    git('switch', 'feature')

    const output = path.join(temporaryRoot, 'review.md')
    expect(review('main', output).status).toBe(0)
    expect(readFileSync(output, 'utf8')).toContain(
      '## Contrast regressions\n\nNone.'
    )

    writeFileSync(
      tokenFile,
      source.replace(
        '--token-color-text-action: var(--dnb-coldgreen-600)',
        '--token-color-text-action: #aaa'
      )
    )
    const result = review('main', output)
    expect(result.status).toBe(1)
    expect(result.stderr).toContain('reduce contrast')
    expect(readFileSync(output, 'utf8')).toContain(
      '--token-color-text-action | #007272 | #aaa'
    )
  } finally {
    rmSync(temporaryRoot, { recursive: true, force: true })
  }
})
