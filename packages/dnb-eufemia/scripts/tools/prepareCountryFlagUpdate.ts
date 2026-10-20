import fs from 'fs'
import path from 'path'
import { execFileSync } from 'child_process'

const repoRoot = path.resolve(__dirname, '../../../..')
const manifest = 'packages/dnb-eufemia/package.json'

export function makeCountryFlagUpdate(
  previousVersion: string,
  version: string,
  changes: string
) {
  const versions = [previousVersion, version].map((value) => {
    if (!/^\d+\.\d+\.\d+$/.test(value)) {
      throw new Error('Expected a stable, pinned flag-icons version.')
    }
    return value.split('.').map(Number)
  })
  const difference = versions[1].findIndex(
    (part, index) => part !== versions[0][index]
  )
  if (
    difference >= 0 &&
    versions[1][difference] < versions[0][difference]
  ) {
    throw new Error(
      'The flag-icons update would downgrade the current version.'
    )
  }

  const flags = (status: string) =>
    changes
      .split('\n')
      .filter((line) => line.startsWith(`${status}\t`))
      .map((line) => path.basename(line.split('\t')[1], '.svg'))
      .sort()
      .join(', ') || 'None'

  const upstream = 'https://github.com/lipis/flag-icons'
  const added = flags('A')
  const updated = flags('M')
  const removed = flags('D')
  const type =
    removed !== 'None'
      ? 'feat(CountryFlag)!'
      : added !== 'None'
        ? 'feat(CountryFlag)'
        : updated !== 'None'
          ? 'fix(CountryFlag)'
          : 'chore(CountryFlag)'
  return {
    title: `${type}: update flags to flag-icons v${version}`,
    body: `Keeps CountryFlag assets and styles synchronized with [flag-icons v${version}](${upstream}/releases/tag/v${version}).`,
    summary: [
      '## CountryFlag update',
      '',
      `flag-icons: ${previousVersion} → ${version}`,
      '',
      `- Added: ${added}`,
      `- Updated: ${updated}`,
      `- Removed: ${removed}`,
      '',
      'Review flag changes, removals, and visual snapshots before marking the pull request ready.',
      '',
    ].join('\n'),
  }
}

if (require.main === module) {
  const baseRef = process.argv[2] || 'origin/main'
  const previousVersion = JSON.parse(
    execFileSync('git', ['show', `${baseRef}:${manifest}`], {
      cwd: repoRoot,
      encoding: 'utf-8',
    })
  ).devDependencies['flag-icons']
  const version = JSON.parse(
    fs.readFileSync(path.join(repoRoot, manifest), 'utf-8')
  ).devDependencies['flag-icons']
  if (process.env.FLAG_ICONS_VERSION) {
    makeCountryFlagUpdate(process.env.FLAG_ICONS_VERSION, version, '')
  }
  const changes = execFileSync(
    'git',
    [
      'diff',
      '--name-status',
      '--no-renames',
      baseRef,
      '--',
      'packages/dnb-eufemia/assets/flags/1x1/*.svg',
    ],
    { cwd: repoRoot, encoding: 'utf-8' }
  )
  const { title, body, summary } = makeCountryFlagUpdate(
    previousVersion,
    version,
    changes
  )

  fs.writeFileSync(
    path.join(process.env.RUNNER_TEMP, 'country-flags-pr.md'),
    body
  )
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `title=${title}\n`)
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary)
}
