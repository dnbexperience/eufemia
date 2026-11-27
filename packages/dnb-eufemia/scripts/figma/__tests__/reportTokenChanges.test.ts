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
      if (brand === 'birdhouse') {
        continue
      }
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
    for (const file of [
      'foundation.scss',
      'tokens.scss',
      'tokens-dark.scss',
    ]) {
      writeFileSync(
        path.join(temporaryRoot, themePath, 'eiendom', file),
        `@use '../ui/${file}';\n`
      )
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

    // The preview did not exist in the base revision.
    const birdhouseDirectory = path.join(
      temporaryRoot,
      themePath,
      'birdhouse'
    )
    mkdirSync(birdhouseDirectory)
    for (const file of [
      'foundation.scss',
      'tokens.scss',
      'tokens-dark.scss',
    ]) {
      cpSync(
        path.join(repositoryRoot, themePath, 'birdhouse', file),
        path.join(birdhouseDirectory, file)
      )
    }

    mkdirSync(path.join(temporaryRoot, themePath, 'figma'), {
      recursive: true,
    })
    writeFileSync(
      path.join(
        temporaryRoot,
        themePath,
        'figma/makeProperties.lock.json'
      ),
      JSON.stringify([
        {
          theme: 'DNB dark',
          token: '--token-color-stroke-action-focus',
          keptValue: '#dae8ff',
          rejectedValue: '#276ace',
          checkedAgainst: '--token-color-background-neutral',
          oldContrast: 12.26,
          rejectedContrast: 2.92,
          target: 3,
        },
      ])
    )

    const output = path.join(temporaryRoot, 'review.md')
    const regressions = () =>
      readFileSync(output, 'utf8').split('## Contrast regressions')[1] ??
      ''
    expect(review('main', output).status).toBe(0)
    expect(regressions()).toBe('')
    expect(readFileSync(output, 'utf8')).toContain(
      '| DNB dark | --token-color-stroke-action-focus | #dae8ff | #276ace | --token-color-background-neutral | 12.26:1 | 2.92:1 | 3:1 | – |'
    )
    expect(readFileSync(output, 'utf8')).toContain(
      '| Birdhouse light | --token-color-background-page-background | #fff | #f6f1e8 |'
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
    expect(readFileSync(output, 'utf8')).toContain(
      '| Eiendom light | --token-color-text-action | #007272 | #aaa |'
    )
    expect(regressions()).toContain(
      '- Eiendom light: --token-color-text-action on'
    )
  } finally {
    rmSync(temporaryRoot, { recursive: true, force: true })
  }
})
