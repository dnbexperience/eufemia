/**
 * Test the trusted release-config regeneration used by the publish job.
 */

import { createRequire } from 'node:module'
import { execFileSync, spawnSync } from 'node:child_process'
import {
  copyFileSync,
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import {
  COMPETING_CONFIG_FILES,
  expectedReleaseManifest,
  extractReleaseConfig,
  FORBIDDEN_ARTIFACT_FILES,
  findCompetingConfigSources,
  findForbiddenArtifactFiles,
  findManifestMismatch,
  findNonRegularArtifactEntries,
  manifestDeclaresRelease,
  TRUSTED_CONFIG_FILE,
  writeReleaseConfig,
} from '../writeReleaseConfig.mjs'
import prepareForRelease from '../prepareForRelease'

// Load the exact cosmiconfig instance semantic-release resolves, so the
// precedence assertions below reflect the real loader rather than an assumption
// about its search order. Resolved from the workspace root the same way the
// sibling postbuild tests locate it.
const PKG_ROOT = path.resolve(__dirname, '../../..')
const workspaceRequire = createRequire(path.join(PKG_ROOT, 'package.json'))
const semanticReleaseRequire = createRequire(
  workspaceRequire.resolve('semantic-release/package.json')
)
const { cosmiconfig } = semanticReleaseRequire('cosmiconfig')

const searchReleaseConfig = (cwd) => cosmiconfig('release').search(cwd)

describe('extractReleaseConfig', () => {
  it('returns the release configuration object', () => {
    const release = { branches: ['release'], plugins: [] }

    expect(extractReleaseConfig({ name: 'pkg', release })).toBe(release)
  })

  it.each([
    ['a missing release field', { name: 'pkg' }],
    ['a null manifest', null],
    ['an array release field', { release: [] }],
    ['a string release field', { release: '.releaserc' }],
  ])('throws for %s', (_label, manifest) => {
    expect(() => extractReleaseConfig(manifest)).toThrow(
      'No "release" configuration found'
    )
  })
})

describe('manifestDeclaresRelease', () => {
  it('detects a release field, including an empty or falsy one', () => {
    expect(manifestDeclaresRelease({ release: { branches: [] } })).toBe(
      true
    )
    expect(manifestDeclaresRelease({ release: null })).toBe(true)
  })

  it.each([
    ['a manifest without the field', { name: 'pkg' }],
    ['null', null],
    ['an array', []],
  ])('returns false for %s', (_label, manifest) => {
    expect(manifestDeclaresRelease(manifest)).toBe(false)
  })
})

describe('writeReleaseConfig', () => {
  let dir

  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), 'eufemia-releaserc-'))
    // A prepared build directory always carries the manifest npm publishes, and
    // writeReleaseConfig now compares the whole thing against the manifest a
    // faithful build produces from the trusted source. The default writeSource
    // manifest below strips to { name, type: 'module' }, so this matches it.
    // Cases that care about the contents overwrite this default.
    writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({ name: 'pkg', type: 'module' })
    )
  })

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  const writeSource = (release) => {
    const sourcePackageJson = path.join(dir, 'source-package.json')
    writeFileSync(
      sourcePackageJson,
      JSON.stringify({ name: 'pkg', release })
    )
    return sourcePackageJson
  }

  it('writes the source release config as build/.releaserc.json', () => {
    const release = {
      branches: ['release'],
      plugins: [['@semantic-release/npm', { pkgRoot: '.' }]],
    }

    const destination = writeReleaseConfig(writeSource(release), dir)

    expect(destination).toBe(path.join(dir, TRUSTED_CONFIG_FILE))
    expect(JSON.parse(readFileSync(destination, 'utf8'))).toEqual(release)
  })

  it('overwrites a .releaserc.json carried on the artifact', () => {
    const trusted = { branches: ['release'], plugins: [] }
    writeFileSync(
      path.join(dir, TRUSTED_CONFIG_FILE),
      JSON.stringify({ branches: ['tampered'], plugins: [['injected']] })
    )

    writeReleaseConfig(writeSource(trusted), dir)

    expect(
      JSON.parse(readFileSync(path.join(dir, TRUSTED_CONFIG_FILE), 'utf8'))
    ).toEqual(trusted)
  })

  it('ignores a release field on the trusted source manifest itself', () => {
    // The source package.json legitimately declares "release"; only the build
    // directory's own package.json is suspect. The build manifest is what a
    // faithful prepareForRelease yields from { name, release }.
    const sourcePackageJson = writeSource({ branches: ['release'] })
    writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({ name: 'pkg', type: 'module' })
    )

    expect(() => writeReleaseConfig(sourcePackageJson, dir)).not.toThrow()
  })

  // Returns the refusal message, and fails if the call unexpectedly succeeded —
  // so these cases cannot pass without an actual refusal.
  const refusalMessage = (sourcePackageJson) => {
    try {
      writeReleaseConfig(sourcePackageJson, dir)
    } catch (error) {
      return (error as Error).message
    }
    throw new Error('Expected writeReleaseConfig to refuse to publish')
  }

  it('refuses to publish when build/package.json declares a release field', () => {
    const sourcePackageJson = writeSource({ branches: ['release'] })
    writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({
        name: 'pkg',
        version: '1.0.0',
        release: { branches: ['tampered'] },
      })
    )

    const message = refusalMessage(sourcePackageJson)

    expect(message).toContain('Refusing to publish')
    expect(message).toContain('package.json ("release" field)')
  })

  it.each(COMPETING_CONFIG_FILES)(
    'refuses to publish when the artifact carries %s',
    (file) => {
      const sourcePackageJson = writeSource({ branches: ['release'] })
      const target = path.join(dir, file)
      mkdirSync(path.dirname(target), { recursive: true })
      writeFileSync(target, '{"branches":["tampered"]}')

      const message = refusalMessage(sourcePackageJson)

      expect(message).toContain('Refusing to publish')
      expect(message).toContain(file)
    }
  )

  it('refuses to publish when the artifact carries an .npmrc', () => {
    const sourcePackageJson = writeSource({ branches: ['release'] })
    writeFileSync(
      path.join(dir, '.npmrc'),
      'https-proxy=http://attacker.local:8080/\nstrict-ssl=false\n'
    )

    const message = refusalMessage(sourcePackageJson)

    expect(message).toContain('Refusing to publish')
    expect(message).toContain('.npmrc')
  })

  it('refuses to publish when the artifact carries a node_modules', () => {
    const sourcePackageJson = writeSource({ branches: ['release'] })
    // semantic-release runs npm from the build directory through execa with
    // `preferLocal`, which puts <cwd>/node_modules/.bin first on PATH — so a
    // binary planted here would run instead of npm, with this job's npm OIDC
    // authority and GitHub token in its environment.
    mkdirSync(path.join(dir, 'node_modules/.bin'), { recursive: true })
    writeFileSync(
      path.join(dir, 'node_modules/.bin/npm'),
      '#!/bin/sh\n# inert stand-in for a hijacked npm binary\nexit 0\n'
    )

    const message = refusalMessage(sourcePackageJson)

    expect(message).toContain('Refusing to publish')
    expect(message).toContain('node_modules')
  })

  it('refuses to publish when the artifact carries a .git', () => {
    const sourcePackageJson = writeSource({ branches: ['release'] })
    // The changelog commit and tag are made from this directory, so a
    // repository on the artifact would shadow the trusted checkout's.
    mkdirSync(path.join(dir, '.git'), { recursive: true })
    writeFileSync(path.join(dir, '.git/config'), '[core]\n')

    const message = refusalMessage(sourcePackageJson)

    expect(message).toContain('Refusing to publish')
    expect(message).toContain('.git')
  })

  it('refuses to publish when the artifact carries a .env', () => {
    const sourcePackageJson = writeSource({ branches: ['release'] })
    // publish-release.sh runs `cd ./build` and then `dotenv semantic-release`,
    // so a .env here is loaded into the environment of the credentialed publish
    // — see the dotenv control below for the proof that this executes code.
    writeFileSync(
      path.join(dir, '.env'),
      'NODE_OPTIONS=--require ./payload.cjs\nNPM_CONFIG_STRICT_SSL=false\n'
    )

    const message = refusalMessage(sourcePackageJson)

    expect(message).toContain('Refusing to publish')
    expect(message).toContain('.env')
  })

  it('refuses to publish when build/package.json repository is redirected', () => {
    const sourcePackageJson = path.join(dir, 'source-package.json')
    writeFileSync(
      sourcePackageJson,
      JSON.stringify({
        name: 'pkg',
        repository: {
          type: 'git',
          url: 'https://github.com/dnbexperience/eufemia.git',
        },
        release: { branches: ['release'] },
      })
    )
    // A tampered repository is what semantic-release would embed the release
    // token into when pushing the changelog/tag — leaking it to the attacker.
    // Everything else matches a faithful build, so repository is the only diff.
    writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({
        name: 'pkg',
        type: 'module',
        repository: { type: 'git', url: 'https://attacker.example/x.git' },
      })
    )

    const message = refusalMessage(sourcePackageJson)

    expect(message).toContain('Refusing to publish')
    expect(message).toContain('repository')
  })

  it('publishes when build/package.json repository matches the source', () => {
    const repository = {
      type: 'git',
      url: 'https://github.com/dnbexperience/eufemia.git',
    }
    const sourcePackageJson = path.join(dir, 'source-package.json')
    writeFileSync(
      sourcePackageJson,
      JSON.stringify({
        name: 'pkg',
        repository,
        release: { branches: ['release'] },
      })
    )
    writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({ name: 'pkg', type: 'module', repository })
    )

    expect(() => writeReleaseConfig(sourcePackageJson, dir)).not.toThrow()
    expect(existsSync(path.join(dir, TRUSTED_CONFIG_FILE))).toBe(true)
  })

  it('does not write the trusted config when refusing over an .npmrc', () => {
    const sourcePackageJson = writeSource({ branches: ['release'] })
    writeFileSync(path.join(dir, '.npmrc'), 'strict-ssl=false\n')

    expect(() => writeReleaseConfig(sourcePackageJson, dir)).toThrow(
      'Refusing to publish'
    )
    expect(existsSync(path.join(dir, TRUSTED_CONFIG_FILE))).toBe(false)
  })

  it('refuses when the artifact carries a symlinked CHANGELOG.md', () => {
    const sourcePackageJson = writeSource({ branches: ['release'] })
    writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({ name: 'pkg', type: 'module' })
    )
    symlinkSync('../../../outside.md', path.join(dir, 'CHANGELOG.md'))

    expect(() => writeReleaseConfig(sourcePackageJson, dir)).toThrow(
      'neither a regular file nor a directory'
    )
    expect(existsSync(path.join(dir, TRUSTED_CONFIG_FILE))).toBe(false)
  })

  // The manifest is read from the build directory, so a link in its place would
  // otherwise be followed and the target compared instead.
  it('refuses a symlinked package.json before reading it', () => {
    const sourcePackageJson = writeSource({ branches: ['release'] })
    writeFileSync(
      path.join(dir, 'elsewhere.json'),
      JSON.stringify({ name: 'pkg', type: 'module' })
    )
    // Replace the default manifest this suite writes with a link to it.
    rmSync(path.join(dir, 'package.json'))
    symlinkSync('elsewhere.json', path.join(dir, 'package.json'))

    expect(() => writeReleaseConfig(sourcePackageJson, dir)).toThrow(
      'neither a regular file nor a directory'
    )
    expect(existsSync(path.join(dir, TRUSTED_CONFIG_FILE))).toBe(false)
  })
})

describe('findCompetingConfigSources', () => {
  let dir

  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), 'eufemia-competing-'))
  })

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  it('reports nothing for a build directory holding only the trusted file', () => {
    writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({ name: 'pkg' })
    )
    writeFileSync(path.join(dir, TRUSTED_CONFIG_FILE), '{}')

    expect(findCompetingConfigSources(dir)).toEqual([])
  })

  it('does not treat the trusted file as a competing source', () => {
    expect(COMPETING_CONFIG_FILES).not.toContain(TRUSTED_CONFIG_FILE)
  })

  it('covers every place the real loader searches ahead of the trusted file', async () => {
    // Guards against cosmiconfig adding a search place that outranks
    // .releaserc.json without this list being updated.
    const searchPlaces = semanticReleaseRequire(
      'cosmiconfig/dist/defaults.js'
    ).getDefaultSearchPlaces('release')
    const trustedIndex = searchPlaces.indexOf(TRUSTED_CONFIG_FILE)

    expect(trustedIndex).toBeGreaterThan(-1)

    const higherPrecedence = searchPlaces
      .slice(0, trustedIndex)
      // package.json is checked via its "release" field, not as a config file.
      .filter((place) => place !== 'package.json')

    expect(higherPrecedence).not.toHaveLength(0)
    for (const place of higherPrecedence) {
      expect(COMPETING_CONFIG_FILES).toContain(place)
    }
  })

  it('throws when build/package.json cannot be parsed', () => {
    writeFileSync(path.join(dir, 'package.json'), '{ not json')

    expect(() => findCompetingConfigSources(dir)).toThrow('Could not read')
  })
})

describe('findForbiddenArtifactFiles', () => {
  let dir

  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), 'eufemia-forbidden-'))
  })

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  it('lists every path that changes how the publish job behaves', () => {
    expect(FORBIDDEN_ARTIFACT_FILES).toEqual(
      expect.arrayContaining(['.npmrc', 'node_modules', '.git', '.env'])
    )
  })

  it('reports nothing for a build directory without forbidden files', () => {
    writeFileSync(path.join(dir, TRUSTED_CONFIG_FILE), '{}')

    expect(findForbiddenArtifactFiles(dir)).toEqual([])
  })

  // npm pack always strips .npmrc from the tarball, so the package-content
  // validator never sees it; this filesystem check is the only thing that can.
  it('detects an .npmrc that npm pack would strip from the tarball', () => {
    writeFileSync(path.join(dir, '.npmrc'), 'strict-ssl=false\n')

    expect(findForbiddenArtifactFiles(dir)).toEqual(['.npmrc'])
  })

  // The npm-binary and git-repository vectors are directories, not files.
  it('detects forbidden directories, not only files', () => {
    mkdirSync(path.join(dir, 'node_modules/.bin'), { recursive: true })
    mkdirSync(path.join(dir, '.git'), { recursive: true })

    expect(findForbiddenArtifactFiles(dir).sort()).toEqual([
      '.git',
      'node_modules',
    ])
  })

  // Unlike the three above, npm does pack a .env — so the content deny-list
  // catches a plain one. It is guarded here as well because an .npmignore on the
  // same artifact removes it from the pack listing (see the control below),
  // which is what makes the filesystem check unconditional.
  it('detects an .env that an .npmignore could hide from the tarball', () => {
    writeFileSync(
      path.join(dir, '.env'),
      'NODE_OPTIONS=--require ./payload.cjs\n'
    )

    expect(findForbiddenArtifactFiles(dir)).toEqual(['.env'])
  })
})

describe('findNonRegularArtifactEntries', () => {
  let dir

  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), 'eufemia-entries-'))
  })

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  it('reports nothing for a tree of files and directories', () => {
    mkdirSync(path.join(dir, 'style'), { recursive: true })
    writeFileSync(path.join(dir, 'package.json'), '{}')
    writeFileSync(path.join(dir, 'style', 'main.css'), 'a{}')

    expect(findNonRegularArtifactEntries(dir)).toEqual([])
  })

  it('flags a symlink to a file, wherever it sits in the tree', () => {
    writeFileSync(path.join(dir, 'real.md'), 'x')
    mkdirSync(path.join(dir, 'nested'))
    symlinkSync('real.md', path.join(dir, 'CHANGELOG.md'))
    symlinkSync('../real.md', path.join(dir, 'nested', 'deep.md'))

    expect(findNonRegularArtifactEntries(dir).sort()).toEqual([
      'CHANGELOG.md (symbolic link)',
      path.join('nested', 'deep.md') + ' (symbolic link)',
    ])
  })

  // A link whose target does not exist is invisible to an existsSync check, so
  // the entry type is what this has to be based on.
  it('flags a dangling symlink', () => {
    symlinkSync('../../../etc/nope', path.join(dir, 'CHANGELOG.md'))

    expect(findNonRegularArtifactEntries(dir)).toEqual([
      'CHANGELOG.md (symbolic link)',
    ])
  })

  // Node's recursive readdir follows symlinked directories, so a `loop -> .`
  // entry would make it traverse the artifact over and over. The walk reports the
  // link and stops there.
  it('reports a symlinked directory without descending into it', () => {
    mkdirSync(path.join(dir, 'real'))
    writeFileSync(path.join(dir, 'real', 'inside.js'), 'x')
    symlinkSync('real', path.join(dir, 'linked'))
    symlinkSync('.', path.join(dir, 'loop'))

    expect(findNonRegularArtifactEntries(dir).sort()).toEqual([
      'linked (symbolic link)',
      'loop (symbolic link)',
    ])
  })

  // Not only symlinks: a faithful build writes files and directories, so any
  // other entry type is unexpected too.
  it('flags an entry that is neither a file, a directory nor a link', () => {
    execFileSync('mkfifo', [path.join(dir, 'pipe')])

    expect(findNonRegularArtifactEntries(dir)).toEqual(['pipe (FIFO)'])
  })
})

// Controls for the premise of the entry-type guard above: a symlink is only
// worth refusing if it can reach the publish job and be followed there. Both
// steps are checked here, so a change in either makes the case for the rule
// visible instead of silently stale.
describe('a symlink reaches the publish job and is followed', () => {
  let dir

  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), 'eufemia-symlink-premise-'))
  })

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  // The artifact is archived with tar and extracted in the publish job, and tar
  // stores a symlink as a symlink — so the link the build job wrote is the link
  // the credentialed job restores.
  it('survives the tar round trip the artifact uses', () => {
    mkdirSync(path.join(dir, 'build'))
    writeFileSync(path.join(dir, 'build', 'package.json'), '{}')
    symlinkSync(
      '../../outside.md',
      path.join(dir, 'build', 'CHANGELOG.md')
    )

    execFileSync('tar', [
      '-czf',
      path.join(dir, 'a.tgz'),
      '-C',
      dir,
      'build',
    ])
    rmSync(path.join(dir, 'build'), { recursive: true, force: true })
    execFileSync('tar', ['-xzf', path.join(dir, 'a.tgz'), '-C', dir])

    expect(
      lstatSync(path.join(dir, 'build', 'CHANGELOG.md')).isSymbolicLink()
    ).toBe(true)
  })

  // @semantic-release/changelog writes the changelog with fs-extra's writeFile,
  // which follows a link like any write does: the content lands on the target
  // outside the build directory and the link itself stays in place, ready to be
  // staged by @semantic-release/git.
  it('sends a write through to the target outside the build directory', () => {
    mkdirSync(path.join(dir, 'build'))
    const target = path.join(dir, 'outside.md')
    writeFileSync(target, 'original\n')
    const link = path.join(dir, 'build', 'CHANGELOG.md')
    symlinkSync(path.join('..', 'outside.md'), link)

    writeFileSync(link, '# Changelog\n')

    expect(readFileSync(target, 'utf8')).toBe('# Changelog\n')
    expect(lstatSync(link).isSymbolicLink()).toBe(true)
  })
})

// Control for the premise of the filesystem guard above: package-content
// validation works from `npm pack`, so it can only ever see what a pack reports.
// npm force-excludes .npmrc, a root node_modules and .git from every tarball, so
// no content check can see those three at all. If npm's behaviour changes, this
// fails — and the deny-list in validatePackageContents.mjs could then cover them
// instead.
describe('npm pack cannot reveal the forbidden artifact paths', () => {
  let dir

  // The subset npm strips unconditionally. `.env` is packed by default and is
  // covered by the separate control below, which is why it is not listed here.
  const NPM_FORCE_EXCLUDED = ['.npmrc', 'node_modules', '.git']

  const packedFiles = () => {
    // Same invocation the validator uses (see validatePackageContents.mjs).
    const output = execFileSync(
      'npm',
      ['pack', '--dry-run', '--ignore-scripts', '--json'],
      { cwd: dir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }
    )
    const parsed = JSON.parse(output.slice(output.indexOf('['))) as Array<{
      files: Array<{ path: string }>
    }>
    return parsed[0].files.map((file) => file.path)
  }

  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), 'eufemia-packblind-'))
    writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({ name: 'pkg', version: '1.0.0' })
    )
    writeFileSync(path.join(dir, 'index.js'), 'export default 1\n')
    writeFileSync(path.join(dir, '.npmrc'), 'strict-ssl=false\n')
    mkdirSync(path.join(dir, 'node_modules/.bin'), { recursive: true })
    writeFileSync(
      path.join(dir, 'node_modules/.bin/npm'),
      '#!/bin/sh\nexit 0\n'
    )
    mkdirSync(path.join(dir, '.git'), { recursive: true })
    writeFileSync(path.join(dir, '.git/config'), '[core]\n')
  })

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  it('keeps every force-excluded path in the filesystem deny-list', () => {
    expect(FORBIDDEN_ARTIFACT_FILES).toEqual(
      expect.arrayContaining(NPM_FORCE_EXCLUDED)
    )
  })

  it('omits them while still packing a normal file', () => {
    const packed = packedFiles()

    // The harness has to be live before the absence assertions mean anything.
    expect(packed).toContain('index.js')

    for (const forbidden of NPM_FORCE_EXCLUDED) {
      expect(
        packed.filter(
          (file) => file === forbidden || file.startsWith(`${forbidden}/`)
        )
      ).toEqual([])
    }
  })

  // Why `.env` needs the filesystem guard even though npm does not strip it: an
  // .npmignore travelling on the same artifact takes it out of the pack listing,
  // and npm excludes the .npmignore itself too, so a content check sees neither.
  it('reports a plain .env but not one an .npmignore hides', () => {
    writeFileSync(
      path.join(dir, '.env'),
      'NODE_OPTIONS=--require ./x.cjs\n'
    )

    expect(packedFiles()).toContain('.env')

    writeFileSync(path.join(dir, '.npmignore'), '.env\n')

    const hidden = packedFiles()
    expect(hidden).toContain('index.js')
    expect(hidden).not.toContain('.env')
    expect(hidden).not.toContain('.npmignore')
  })
})

// Regression tests for the bypass this hardening exists to prevent: a tampered
// artifact placing a higher-precedence config next to the trusted one. Each case
// first proves with the real loader that the tampered source would win (so the
// assertion cannot pass vacuously), then that the release is refused.
describe('tampered artifact cannot outrank the trusted config', () => {
  let dir

  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), 'eufemia-tamper-'))
  })

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  const trusted = { branches: ['release'], plugins: [] }
  const tampered = { branches: ['tampered'], plugins: [['./evil.js']] }

  const writeSource = () => {
    const sourcePackageJson = path.join(dir, 'source-package.json')
    writeFileSync(
      sourcePackageJson,
      JSON.stringify({ name: 'pkg', release: trusted })
    )
    return sourcePackageJson
  }

  it('detects a release field smuggled into build/package.json', async () => {
    const sourcePackageJson = writeSource()
    writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({ name: 'pkg', version: '1.0.0', release: tampered })
    )
    writeFileSync(
      path.join(dir, TRUSTED_CONFIG_FILE),
      JSON.stringify(trusted)
    )

    // Control: the loader really does prefer package.json over .releaserc.json.
    const found = await searchReleaseConfig(dir)
    expect(path.basename(found.filepath)).toBe('package.json')
    expect(found.config.branches).toEqual(['tampered'])

    expect(() => writeReleaseConfig(sourcePackageJson, dir)).toThrow(
      'Refusing to publish'
    )
  })

  it('detects an extensionless .releaserc smuggled onto the artifact', async () => {
    const sourcePackageJson = writeSource()
    writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({ name: 'pkg', version: '1.0.0' })
    )
    writeFileSync(path.join(dir, '.releaserc'), JSON.stringify(tampered))
    writeFileSync(
      path.join(dir, TRUSTED_CONFIG_FILE),
      JSON.stringify(trusted)
    )

    // Control: .releaserc is searched before .releaserc.json.
    const found = await searchReleaseConfig(dir)
    expect(path.basename(found.filepath)).toBe('.releaserc')
    expect(found.config.branches).toEqual(['tampered'])

    expect(() => writeReleaseConfig(sourcePackageJson, dir)).toThrow(
      'Refusing to publish'
    )
  })

  it('leaves the trusted config as the only source the loader can find', async () => {
    const sourcePackageJson = writeSource()
    writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({ name: 'pkg', type: 'module' })
    )

    writeReleaseConfig(sourcePackageJson, dir)

    const found = await searchReleaseConfig(dir)
    expect(path.basename(found.filepath)).toBe(TRUSTED_CONFIG_FILE)
    expect(found.config).toEqual(trusted)
  })
})

describe('expectedReleaseManifest', () => {
  it('strips the fields prepareForRelease deletes and sets type=module', () => {
    const source = {
      name: '@dnb/eufemia',
      version: '1.0.0',
      dependencies: { classnames: '^2.5.1' },
      release: { branches: ['release'] },
      scripts: { build: 'x' },
      devDependencies: { vitest: '^4' },
      resolutions: { foo: '1' },
      volta: { node: '24.16.0' },
    }

    expect(expectedReleaseManifest(source)).toEqual({
      name: '@dnb/eufemia',
      version: '1.0.0',
      dependencies: { classnames: '^2.5.1' },
      type: 'module',
    })
  })

  it('does not mutate the source manifest', () => {
    const source = { name: 'pkg', scripts: { build: 'x' } }

    expectedReleaseManifest(source)

    expect(source).toEqual({ name: 'pkg', scripts: { build: 'x' } })
  })

  // Drift + no-false-positive guard, run against the real manifest: the
  // whole-manifest comparison is only correct while expectedReleaseManifest
  // mirrors the real transform, and a faithful build must pass or the guard
  // would block every release.
  //
  // This runs the real producer rather than reproducing its steps, so it covers
  // the whole transform: any change to what prepareForRelease publishes — a
  // different stripped field, an added one such as the `exports` map its TODO
  // describes — fails here until expectedReleaseManifest is brought back in
  // sync. Reproducing the steps instead would only cover the ones the test
  // happens to know about.
  it('matches what prepareForRelease actually writes', async () => {
    const root = mkdtempSync(path.join(tmpdir(), 'prepare-for-release-'))
    try {
      const sourcePath = path.join(PKG_ROOT, 'package.json')
      const source = JSON.parse(readFileSync(sourcePath, 'utf8'))

      mkdirSync(path.join(root, 'build'))
      copyFileSync(sourcePath, path.join(root, 'package.json'))
      copyFileSync(
        path.join(PKG_ROOT, '.prettierrc'),
        path.join(root, '.prettierrc')
      )

      await prepareForRelease({ rootDir: root })

      const written = JSON.parse(
        readFileSync(path.join(root, 'build', 'package.json'), 'utf8')
      )

      expect(expectedReleaseManifest(source)).toEqual(written)

      // Not vacuous: the producer wrote a real manifest, and the transform it
      // agrees on is not simply a copy of the source.
      expect(written.name).toBe('@dnb/eufemia')
      expect(source).toHaveProperty('scripts')
      expect(written).not.toHaveProperty('scripts')
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })
})

describe('findManifestMismatch', () => {
  // A realistic trusted source and the manifest a faithful build produces from
  // it. Individual cases mutate a copy of that faithful build.
  const source = {
    name: '@dnb/eufemia',
    version: '1.0.0',
    main: './index.js',
    repository: {
      type: 'git',
      url: 'https://github.com/dnbexperience/eufemia.git',
      directory: 'packages/dnb-eufemia',
    },
    publishConfig: { access: 'public', provenance: true },
    dependencies: { classnames: '^2.5.1' },
    release: { branches: ['release'] },
    scripts: { build: 'x' },
    devDependencies: { vitest: '^4' },
    volta: { node: '24.16.0' },
  }
  const faithfulBuild = () => expectedReleaseManifest(source)

  it('accepts the manifest a faithful build produces', () => {
    expect(findManifestMismatch(faithfulBuild(), source)).toEqual([])
  })

  it('accepts fields whose keys are merely reordered', () => {
    const build = faithfulBuild()
    build.publishConfig = { provenance: true, access: 'public' }
    build.repository = {
      directory: 'packages/dnb-eufemia',
      url: 'https://github.com/dnbexperience/eufemia.git',
      type: 'git',
    }

    expect(findManifestMismatch(build, source)).toEqual([])
  })

  it('flags a re-added scripts field', () => {
    const build = {
      ...faithfulBuild(),
      scripts: { prepack: 'node ./evil.js' },
    }

    const diff = findManifestMismatch(build, source)

    expect(diff).toHaveLength(1)
    expect(diff[0]).toContain('"scripts"')
  })

  it('flags a publishConfig that re-enables lifecycle scripts', () => {
    const build = faithfulBuild()
    build.publishConfig = {
      access: 'public',
      provenance: true,
      'ignore-scripts': false,
    }

    const diff = findManifestMismatch(build, source)

    expect(diff).toHaveLength(1)
    expect(diff[0]).toContain('"publishConfig"')
  })

  it('flags a redirected repository that would leak the release token', () => {
    const build = faithfulBuild()
    build.repository = {
      type: 'git',
      url: 'https://attacker.example/x.git',
    }

    const diff = findManifestMismatch(build, source)

    expect(diff).toHaveLength(1)
    expect(diff[0]).toContain('"repository"')
  })

  // The two release-integrity fields the earlier field-by-field guard missed.
  it('flags a top-level tag that overrides the release channel', () => {
    // libnpmpublish resolves the dist-tag as manifest.tag || defaultTag, so a
    // "latest" here routes a prerelease onto the channel npm installs by
    // default, regardless of the --tag semantic-release passes.
    const build = { ...faithfulBuild(), tag: 'latest' }

    const diff = findManifestMismatch(build, source)

    expect(diff).toHaveLength(1)
    expect(diff[0]).toContain('"tag"')
  })

  it('flags private:true that would skip npm publication', () => {
    // @semantic-release/npm skips the publish when private is true, so the tag
    // and changelog would be pushed with no npm version behind them.
    const build = { ...faithfulBuild(), private: true }

    const diff = findManifestMismatch(build, source)

    expect(diff).toHaveLength(1)
    expect(diff[0]).toContain('"private"')
  })

  it.each([
    [
      'an injected dependency',
      (build) => {
        build.dependencies = {
          ...build.dependencies,
          evil: 'https://evil',
        }
      },
    ],
    [
      'a redirected package name',
      (build) => {
        build.name = '@attacker/eufemia'
      },
    ],
    [
      'a re-added devDependencies',
      (build) => {
        build.devDependencies = { x: '1' }
      },
    ],
    [
      'a changed main entry point',
      (build) => {
        build.main = './evil.js'
      },
    ],
    [
      'a dropped publishConfig',
      (build) => {
        delete build.publishConfig
      },
    ],
    [
      'a missing type:module',
      (build) => {
        delete build.type
      },
    ],
  ])('flags %s', (_label, mutate) => {
    const build = faithfulBuild()
    mutate(build)

    expect(
      findManifestMismatch(build, source).length
    ).toBeGreaterThanOrEqual(1)
  })

  it('reports every differing field at once', () => {
    const build = {
      ...faithfulBuild(),
      tag: 'latest',
      private: true,
      scripts: {},
    }

    expect(findManifestMismatch(build, source)).toHaveLength(3)
  })
})

// Control for the premise of the manifest comparison above: npm applies
// publishConfig as configuration at publish time, and publishConfig outranks
// NPM_CONFIG_IGNORE_SCRIPTS from the environment — which is why the release
// step's env var is not sufficient on its own. If npm's precedence ever
// changes, this fails and the comparison can be reconsidered.
describe('publishConfig outranks the ignore-scripts environment', () => {
  let dir

  // Run the same npm invocation @semantic-release/npm builds (see its
  // lib/publish.js), plus --dry-run so nothing is published, and report whether
  // the package's prepack script executed.
  const publishAndReportScriptRan = (publishConfig?: object) => {
    const userconfig = path.join(dir, 'empty.npmrc')
    const pkg = path.join(dir, 'build')

    mkdirSync(pkg, { recursive: true })
    writeFileSync(userconfig, '')
    writeFileSync(path.join(pkg, 'index.js'), 'export default 1\n')
    writeFileSync(
      path.join(pkg, 'package.json'),
      JSON.stringify({
        name: 'eufemia-publishconfig-probe',
        version: '1.0.0',
        main: 'index.js',
        scripts: {
          prepack: `node -e "require('fs').writeFileSync('MARKER','ran')"`,
        },
        ...(publishConfig ? { publishConfig } : {}),
      })
    )

    // spawnSync so a non-zero exit does not throw: only the marker matters.
    spawnSync(
      'npm',
      [
        'publish',
        pkg,
        '--userconfig',
        userconfig,
        '--tag',
        'latest',
        '--registry',
        'https://registry.npmjs.org/',
        '--dry-run',
      ],
      {
        cwd: pkg,
        env: { ...process.env, NPM_CONFIG_IGNORE_SCRIPTS: 'true' },
        stdio: 'ignore',
      }
    )

    return existsSync(path.join(pkg, 'MARKER'))
  }

  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), 'eufemia-publishconfig-'))
  })

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  it('suppresses lifecycle scripts with the env var alone', () => {
    expect(publishAndReportScriptRan()).toBe(false)
  })

  it('runs them again when the manifest sets ignore-scripts false', () => {
    expect(publishAndReportScriptRan({ 'ignore-scripts': false })).toBe(
      true
    )
  })
})

describe('a tampered manifest cannot change how the release is published', () => {
  let dir

  const publishConfig = { access: 'public', provenance: true }

  const writeSource = () => {
    const sourcePackageJson = path.join(dir, 'source-package.json')
    writeFileSync(
      sourcePackageJson,
      JSON.stringify({
        name: 'pkg',
        publishConfig,
        release: { branches: ['release'] },
      })
    )
    return sourcePackageJson
  }

  // The manifest a faithful prepareForRelease yields from that source: the
  // stripped fields removed and type set. Cases mutate a copy of it.
  const faithfulBuild = () => ({
    name: 'pkg',
    publishConfig,
    type: 'module',
  })

  const writeBuildManifest = (manifest) =>
    writeFileSync(path.join(dir, 'package.json'), JSON.stringify(manifest))

  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), 'eufemia-manifest-'))
  })

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  it('publishes a manifest that matches the trusted source', () => {
    writeBuildManifest(faithfulBuild())

    expect(() => writeReleaseConfig(writeSource(), dir)).not.toThrow()
    expect(existsSync(path.join(dir, TRUSTED_CONFIG_FILE))).toBe(true)
  })

  it.each([
    [
      'scripts plus a publishConfig re-enabling them',
      (build) => {
        build.scripts = { prepack: 'node ./evil.js' }
        build.publishConfig = { ...publishConfig, 'ignore-scripts': false }
      },
    ],
    [
      'a proxy override in publishConfig',
      (build) => {
        build.publishConfig = {
          ...publishConfig,
          'https-proxy': 'http://evil',
        }
      },
    ],
    // The two release-integrity fields the field-by-field guard let through,
    // reproduced end-to-end through writeReleaseConfig.
    [
      'a top-level tag overriding the release channel',
      (build) => {
        build.tag = 'latest'
      },
    ],
    [
      'a private flag that skips publication',
      (build) => {
        build.private = true
      },
    ],
    [
      'a dropped publishConfig',
      (build) => {
        delete build.publishConfig
      },
    ],
  ])('refuses %s, and writes no config', (_label, mutate) => {
    const build = faithfulBuild()
    mutate(build)
    writeBuildManifest(build)

    expect(() => writeReleaseConfig(writeSource(), dir)).toThrow(
      'Refusing to publish'
    )
    expect(existsSync(path.join(dir, TRUSTED_CONFIG_FILE))).toBe(false)
  })

  it('refuses when the manifest npm would publish is missing entirely', () => {
    expect(() => writeReleaseConfig(writeSource(), dir)).toThrow(
      'Refusing to publish'
    )
  })
})

// The CLI entry-point check decides whether main() runs. Node reports a
// symlink-resolved `import.meta.url`, so comparing it with an unresolved
// `process.argv[1]` skipped main() whenever the invocation path crossed a
// symlink — the guard then exited 0, printed nothing, checked nothing and left
// the artifact's own .releaserc.json in place. A security control has to fail
// closed, so this drives the real CLI through a symlink.
describe('the guard runs when invoked through a symlinked path', () => {
  const script = path.join(
    PKG_ROOT,
    'scripts/postbuild/writeReleaseConfig.mjs'
  )
  let dir

  const runGuard = (scriptPath) =>
    spawnSync(
      process.execPath,
      [scriptPath, 'source-package.json', 'build'],
      {
        cwd: dir,
        encoding: 'utf8',
      }
    )

  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), 'eufemia-entrypoint-'))
    mkdirSync(path.join(dir, 'build'))
    writeFileSync(
      path.join(dir, 'source-package.json'),
      JSON.stringify({ name: 'pkg', release: { branches: ['release'] } })
    )
    // A tampered artifact manifest: the guard must refuse it however it was
    // invoked.
    writeFileSync(
      path.join(dir, 'build', 'package.json'),
      JSON.stringify({ name: 'pkg', type: 'module', tag: 'latest' })
    )
  })

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  it('refuses a tampered manifest through a symlink to the script', () => {
    const link = path.join(dir, 'writeReleaseConfig.mjs')
    symlinkSync(script, link)

    const result = runGuard(link)

    expect(result.status).toBe(1)
    expect(result.stderr).toContain('Refusing to publish')
    expect(existsSync(path.join(dir, 'build', TRUSTED_CONFIG_FILE))).toBe(
      false
    )
  })

  // Control: the same invocation through the real path behaves identically, so
  // the case above is about the entry point rather than about the refusal.
  it('refuses it the same way through the real path', () => {
    const result = runGuard(script)

    expect(result.status).toBe(1)
    expect(result.stderr).toContain('Refusing to publish')
  })

  // Control: a symlinked invocation is not simply always failing — a faithful
  // manifest still passes and the trusted config is written.
  it('publishes a faithful manifest through the symlink', () => {
    const link = path.join(dir, 'writeReleaseConfig.mjs')
    symlinkSync(script, link)
    writeFileSync(
      path.join(dir, 'build', 'package.json'),
      JSON.stringify({ name: 'pkg', type: 'module' })
    )

    const result = runGuard(link)

    expect(result.status).toBe(0)
    expect(existsSync(path.join(dir, 'build', TRUSTED_CONFIG_FILE))).toBe(
      true
    )
  })
})

// Control for the premise of the .env entry in FORBIDDEN_ARTIFACT_FILES:
// publish-release.sh runs `cd ./build` and then `dotenv semantic-release`, and
// dotenv-cli's default path list is exactly `.env`, resolved against that
// working directory. So a .env travelling on the artifact does not merely add
// noise — it injects variables into the process that holds the GitHub token and
// the OIDC token-request credentials, and NODE_OPTIONS turns that into running
// the artifact's own code. If dotenv ever stops reading the working directory,
// this fails and the deny-list entry can be reconsidered.
describe('a .env on the artifact runs code in the publish environment', () => {
  let dir

  const MARKER = 'DOTENV_MARKER'

  // The same dotenv binary publish-release.sh invokes, resolved from the
  // workspace the way the cosmiconfig instance above is.
  const dotenvCli = workspaceRequire.resolve('dotenv-cli/cli.js')

  // Run `dotenv <command>` with the temp directory as the working directory,
  // mirroring publish-release.sh, and report whether the payload executed.
  const dotenvRunsPayload = () => {
    spawnSync(
      process.execPath,
      [dotenvCli, '--', process.execPath, '-e', ''],
      {
        cwd: dir,
        stdio: 'ignore',
      }
    )

    return existsSync(path.join(dir, MARKER))
  }

  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), 'eufemia-dotenv-'))
    writeFileSync(
      path.join(dir, 'payload.cjs'),
      `require('fs').writeFileSync(require('path').join(__dirname, '${MARKER}'), 'ran')\n`
    )
  })

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  it('does nothing when the artifact carries no .env', () => {
    expect(dotenvRunsPayload()).toBe(false)
  })

  it('executes the payload a .env points NODE_OPTIONS at', () => {
    writeFileSync(
      path.join(dir, '.env'),
      'NODE_OPTIONS=--require ./payload.cjs\n'
    )

    expect(dotenvRunsPayload()).toBe(true)
  })

  // dotenv does not overwrite a variable the workflow already set, which is why
  // the risk is the variables the release step leaves unset (NODE_OPTIONS above,
  // and the NPM_CONFIG_* proxy and TLS settings) rather than its own secrets.
  it('cannot overwrite a variable the release step already set', () => {
    writeFileSync(path.join(dir, '.env'), 'GH_TOKEN=from-the-artifact\n')

    const result = spawnSync(
      process.execPath,
      [dotenvCli, '--', process.execPath, '-p', 'process.env.GH_TOKEN'],
      {
        cwd: dir,
        encoding: 'utf8',
        env: { ...process.env, GH_TOKEN: 'from-the-workflow' },
      }
    )

    expect(result.stdout.trim()).toBe('from-the-workflow')
  })
})
