/**
 * Run the real semantic-release commit analyzer and release notes generator
 * with the release config from package.json, so that a config change or a
 * parser upgrade cannot silently change which commits make a major release.
 *
 * conventional-commits-parser escapes every `noteKeywords` entry and matches
 * it, case-insensitively, at the start of any line in the body or footer,
 * followed by `[:\s]+`:
 *
 * - The plain keywords (`BREAKING CHANGE`, the preset default) also match
 *   prose such as "Breaking change in the docs …" and make a major release.
 * - A lookahead such as `BREAKING CHANGE(?=:)` is escaped too, so it only
 *   matches that literal text and no footer is found at all.
 * - The keywords therefore end with a colon: `BREAKING CHANGE:` matches
 *   `BREAKING CHANGE: description` and nothing without the colon.
 *
 * The release config must stay JSON (writeReleaseConfig.mjs writes it as
 * `.releaserc.json` and refuses JS config files), so the parser's
 * `notesPattern` function cannot be used instead.
 */

import { readFileSync } from 'node:fs'
import path from 'node:path'
import { analyzeCommits } from '@semantic-release/commit-analyzer'
import { generateNotes } from '@semantic-release/release-notes-generator'

const packageRoot = path.resolve(__dirname, '../../..')
const gitStyleGuide = path.resolve(
  packageRoot,
  '../dnb-design-system-portal/src/docs/contribute/style-guides/git.mdx'
)

const release = JSON.parse(
  readFileSync(path.join(packageRoot, 'package.json'), 'utf-8')
).release

function getPluginConfig(name: string) {
  const plugin = release.plugins.find(
    (entry: string | [string, unknown]) =>
      (Array.isArray(entry) ? entry[0] : entry) === name
  )

  if (!Array.isArray(plugin)) {
    throw new Error(`${name} has no config in package.json`)
  }

  return plugin[1]
}

const logger = {
  log: () => undefined,
  error: () => undefined,
  warn: () => undefined,
  success: () => undefined,
}

function toCommits(message: string) {
  return [{ hash: 'a'.repeat(40), message }]
}

function analyze(message: string) {
  return analyzeCommits(
    getPluginConfig('@semantic-release/commit-analyzer'),
    { commits: toCommits(message), logger, cwd: packageRoot }
  )
}

function notes(message: string): Promise<string> {
  return generateNotes(
    getPluginConfig('@semantic-release/release-notes-generator'),
    {
      commits: toCommits(message),
      lastRelease: { gitTag: 'v1.0.0', version: '1.0.0' },
      nextRelease: { gitTag: 'v2.0.0', version: '2.0.0' },
      options: { repositoryUrl: release.repositoryUrl },
      cwd: packageRoot,
      logger,
    }
  )
}

const BREAKING_SECTION = '### ⚠ BREAKING CHANGES'

const cases: Array<[string, string, string | null]> = [
  [
    'BREAKING CHANGE footer',
    'feat(Foo): bar\n\nBREAKING CHANGE: removed baz',
    'major',
  ],
  [
    'BREAKING-CHANGE footer',
    'feat(Foo): bar\n\nBREAKING-CHANGE: removed baz',
    'major',
  ],
  ['! in the header', 'feat(Foo)!: bar', 'major'],
  [
    'footer after a body, on a fix',
    'fix: x\n\nSome body text.\n\nBREAKING CHANGE: removed baz',
    'major',
  ],
  // The parser ignores case, so this line also marks a breaking change
  [
    'lowercase keyword with a colon',
    'fix: x\n\nBreaking change: removed baz',
    'major',
  ],
  [
    'prose in the middle of a line',
    'fix: x\n\nThis is not a breaking change, just a refactor.',
    'patch',
  ],
  [
    'prose at the start of a line',
    'fix: x\n\nBreaking change in the docs is described below.',
    'patch',
  ],
  [
    'keyword without a colon',
    'fix: x\n\nBREAKING CHANGE without colon',
    'patch',
  ],
  // Body lines from squash commits on main
  [
    'hyphenated prose on a chore (#8910)',
    'chore(tools): x\n\nbreaking-change risk and is better handled deliberately:',
    null,
  ],
  [
    'prose on a chore (#8271)',
    'chore(Breadcrumb): x\n\nbreaking change when one remove publicly documented properties.',
    null,
  ],
  [
    'prose followed by a comma (#9833)',
    'fix(Field.Name): x\n\nbreaking change, it also keeps `nameValidator`',
    'patch',
  ],
  ['feature', 'feat: x', 'minor'],
  ['fix', 'fix: x', 'patch'],
]

describe('release config: breaking changes', () => {
  it.each(cases)(
    'commit-analyzer: %s',
    async (_name, message, expected) => {
      expect(await analyze(message)).toBe(expected)
    }
  )

  it.each(cases)(
    'release-notes-generator: %s',
    async (_name, message, expected) => {
      expect((await notes(message)).includes(BREAKING_SECTION)).toBe(
        expected === 'major'
      )
    }
  )

  it('puts the footer text in the release notes', async () => {
    expect(
      await notes('feat(Foo): bar\n\nBREAKING CHANGE: removed baz')
    ).toContain(`${BREAKING_SECTION}\n\n* **Foo:** removed baz\n`)
  })

  it('detects the example in the git style guide as a major release', async () => {
    const example = readFileSync(gitStyleGuide, 'utf-8').match(
      /Example of a breaking change commit message:\s*```text\n([\s\S]*?)\n```/
    )?.[1]

    expect(example).toContain('BREAKING CHANGE:')
    expect(await analyze(example)).toBe('major')
    expect(await notes(example)).toContain(
      `${BREAKING_SECTION}\n\n* Subject (will be a list item)`
    )
  })
})
