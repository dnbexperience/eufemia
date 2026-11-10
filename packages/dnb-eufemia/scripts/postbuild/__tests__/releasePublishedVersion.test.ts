import { execFileSync, spawnSync } from 'node:child_process'
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { load } from 'js-yaml'

type Step = {
  name?: string
  run?: string
  env?: Record<string, string>
}

const packageRoot = path.resolve(__dirname, '../../..')
const { jobs } = load(
  readFileSync(
    path.resolve(packageRoot, '../../.github/workflows/release.yml'),
    'utf8'
  )
) as {
  jobs: Record<
    string,
    {
      'timeout-minutes'?: number
      permissions?: Record<string, string>
      steps: Step[]
    }
  >
}

const capture = jobs.action.steps.find(
  (step) => step.name === 'Capture released version'
)
const subject = jobs.attest.steps.find(
  (step) => step.name === 'Get the released tarball from npm'
)

// npm lists a version only after processing it: 5.2 to 55.4 minutes after
// the publish for every release from v11.14.0 to v11.17.0.
const slowestListing = Math.round(55.4 * 60)

describe('released version in release.yml', () => {
  let directory: string

  beforeEach(() => {
    directory = mkdtempSync(path.join(tmpdir(), 'eufemia-released-'))
    const bin = path.join(directory, 'bin')
    mkdirSync(bin)

    // Stands in for npm, which lists the version once the step has slept
    // $LISTED_AFTER seconds in total.
    writeFileSync(
      path.join(bin, 'npm'),
      [
        '#!/bin/sh',
        'echo "npm $*" >> "$CALLS"',
        'version="${2##*@}"',
        `slept=$(awk '/^sleep /{ s += $2 } END { print s + 0 }' "$CALLS")`,
        'if [ "$LISTED_AFTER" = never ] || [ "$slept" -lt "$LISTED_AFTER" ]; then',
        '  echo "npm error code E404" >&2; exit 1',
        'fi',
        '[ "$1" = view ] && echo "$version" && exit 0',
        'while [ $# -gt 0 ]; do [ "$1" = --pack-destination ] && dest="$2"; shift; done',
        'echo tarball > "$dest/dnb-eufemia-$version.tgz"',
        'echo "dnb-eufemia-$version.tgz"',
        '',
      ].join('\n'),
      { mode: 0o755 }
    )
    writeFileSync(
      path.join(bin, 'sleep'),
      '#!/bin/sh\necho "sleep $*" >> "$CALLS"\n',
      { mode: 0o755 }
    )

    mkdirSync(path.join(directory, 'build'))
    writeFileSync(path.join(directory, 'output'), '')
    writeFileSync(path.join(directory, 'calls'), '')
  })

  afterEach(() => {
    rmSync(directory, { recursive: true, force: true })
  })

  const run = (script: string, env: Record<string, string>) => {
    const result = spawnSync(
      'bash',
      ['--noprofile', '--norc', '-e', '-c', script],
      {
        cwd: directory,
        encoding: 'utf8',
        env: {
          PATH: `${path.join(directory, 'bin')}:${process.env.PATH}`,
          GITHUB_OUTPUT: path.join(directory, 'output'),
          RUNNER_TEMP: directory,
          CALLS: path.join(directory, 'calls'),
          ...env,
        },
      }
    )
    const calls = readFileSync(path.join(directory, 'calls'), 'utf8')
      .split('\n')
      .filter(Boolean)

    return {
      status: result.status,
      stdout: result.stdout,
      output: readFileSync(path.join(directory, 'output'), 'utf8'),
      npm: calls.filter((call) => call.startsWith('npm ')),
      waited: calls
        .filter((call) => call.startsWith('sleep '))
        .reduce((total, call) => total + Number(call.split(' ')[1]), 0),
    }
  }

  const captureVersion = (
    version: string,
    published: string,
    listedAfter: string
  ) => {
    writeFileSync(
      path.join(directory, 'build/package.json'),
      JSON.stringify({ version })
    )
    return run(capture?.run ?? '', {
      PUBLISHED: published,
      RUN_COMMIT: 'run-commit',
      LISTED_AFTER: listedAfter,
    })
  }

  it('passes the version the Release step published to the capture step', () => {
    expect(capture?.env?.PUBLISHED).toBe(
      '${{ steps.release.outputs.published }}'
    )
  })

  it('reports a version the Release step published without waiting for npm', () => {
    const result = captureVersion('11.17.0', '11.17.0', 'never')

    expect(result.status).toBe(0)
    expect(result.output).toBe('released=11.17.0\n')
    expect(result.npm).toEqual([])
  })

  it('reports a version without a recorded publish only once npm lists it', () => {
    const result = captureVersion('11.17.0', '', '40')

    expect(result.status).toBe(0)
    expect(result.output).toBe('released=11.17.0\n')
    expect(result.npm).toHaveLength(3)
  })

  it('fails without a version when npm does not list a version without a recorded publish', () => {
    const result = captureVersion('11.17.0', '', 'never')

    expect(result.status).toBe(1)
    expect(result.output).toBe('')
    expect(result.stdout).toContain(
      '::error::npm does not list @dnb/eufemia@11.17.0 yet.'
    )
  })

  it('waits for npm to list the version before getting the tarball', () => {
    const result = run(subject?.run ?? '', {
      RELEASED_VERSION: '11.17.0',
      LISTED_AFTER: String(slowestListing),
    })
    const packs = result.npm.filter((call) => call.startsWith('npm pack'))

    expect(result.status).toBe(0)
    expect(result.output).toBe(
      `tarball=${directory}/dnb-eufemia-11.17.0.tgz\n`
    )
    expect(packs).toHaveLength(1)
    expect(packs[0]).toContain('--prefer-online')
  })

  it('gives up on the tarball within the job timeout', () => {
    const result = run(subject?.run ?? '', {
      RELEASED_VERSION: '11.17.0',
      LISTED_AFTER: 'never',
    })

    expect(result.status).toBe(1)
    expect(result.output).toBe('')
    expect(result.waited).toBeGreaterThanOrEqual(slowestListing)
    expect(result.waited).toBeLessThan(
      ((jobs.attest['timeout-minutes'] ?? 0) - 5) * 60
    )
  })
})

describe('published version from semantic-release', () => {
  const plugin = path.join(
    packageRoot,
    'scripts/postbuild/releasePublished.ts'
  )

  it('records the version right after the npm publish', () => {
    const { plugins } = JSON.parse(
      readFileSync(path.join(packageRoot, 'package.json'), 'utf8')
    ).release
    const npm = plugins.findIndex(
      (entry) =>
        Array.isArray(entry) && entry[0] === '@semantic-release/npm'
    )

    expect(npm).toBeGreaterThanOrEqual(0)
    expect(plugins[npm][1].npmPublish).toBe(true)
    expect(plugins[npm + 1]).toBe(
      '../scripts/postbuild/releasePublished.ts'
    )
  })

  it.each([
    {
      name: 'once the npm publish succeeded, also when a later publish fails',
      npmPublish: "() => ({ name: 'npm' })",
      output: 'published=1.0.1\n',
    },
    {
      name: 'nothing when the npm publish fails',
      npmPublish: "() => { throw new Error('npm publish failed') }",
      output: '',
    },
  ])('records $name', ({ npmPublish, output }) => {
    const directory = mkdtempSync(
      path.join(tmpdir(), 'eufemia-published-')
    )
    try {
      const git = (...args: string[]) =>
        execFileSync('git', args, { cwd: directory, stdio: 'pipe' })
      git('init', '--quiet', '--initial-branch=release')
      git('config', 'user.email', 'test@dnb.no')
      git('config', 'user.name', 'Eufemia test')
      git('config', 'commit.gpgsign', 'false')
      git('remote', 'add', 'origin', directory)

      // Stand in for @semantic-release/npm and @semantic-release/github.
      const npm = path.join(directory, 'npm.cjs')
      writeFileSync(
        npm,
        `module.exports = { analyzeCommits: () => 'patch', publish: ${npmPublish} }`
      )
      const github = path.join(directory, 'github.cjs')
      writeFileSync(
        github,
        "module.exports = { publish: () => { throw new Error('GitHub release failed') } }"
      )
      writeFileSync(
        path.join(directory, 'package.json'),
        JSON.stringify({
          name: 'release-fixture',
          version: '1.0.0',
          release: {
            repositoryUrl: directory,
            branches: ['release'],
            ci: false,
            plugins: [npm, plugin, github],
          },
        })
      )
      git('add', '.')
      git('commit', '--quiet', '--message', 'chore: initial commit')
      git('tag', 'v1.0.0')
      git(
        'commit',
        '--quiet',
        '--allow-empty',
        '--message',
        'fix: regression'
      )
      const outputFile = path.join(directory, 'output')
      writeFileSync(outputFile, '')

      const result = spawnSync(
        process.execPath,
        [
          path.resolve(
            packageRoot,
            '../../node_modules/semantic-release/bin/semantic-release.js'
          ),
        ],
        {
          cwd: directory,
          encoding: 'utf8',
          env: {
            ...process.env,
            GITHUB_ACTIONS: '',
            GITHUB_REF: '',
            GITHUB_HEAD_REF: '',
            GITHUB_OUTPUT: outputFile,
          },
        }
      )

      expect(result.status).not.toBe(0)
      expect(readFileSync(outputFile, 'utf8')).toBe(output)
    } finally {
      rmSync(directory, { recursive: true, force: true })
    }
  })
})

describe('publish job token in release.yml', () => {
  it('publishes with GH_TOKEN and OIDC, so the job token only reads', () => {
    const release = jobs.action.steps.find(
      (step) => step.name === 'Release'
    )

    expect(release?.env?.GH_TOKEN).toBe('${{ secrets.GH_TOKEN }}')
    expect(jobs.action.permissions).toEqual({
      contents: 'read',
      'id-token': 'write',
    })
  })
})
