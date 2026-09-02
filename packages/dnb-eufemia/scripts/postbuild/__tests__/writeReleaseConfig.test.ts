/**
 * Test the trusted release-config regeneration used by the publish job.
 */

import { createRequire } from 'node:module'
import { execFileSync, spawnSync } from 'node:child_process'
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import {
  COMPETING_CONFIG_FILES,
  extractReleaseConfig,
  FORBIDDEN_ARTIFACT_FILES,
  findCompetingConfigSources,
  findForbiddenArtifactFiles,
  findManifestPublishOverrides,
  findRepositoryMismatch,
  manifestDeclaresRelease,
  TRUSTED_CONFIG_FILE,
  writeReleaseConfig,
} from '../writeReleaseConfig.mjs'

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
    // writeReleaseConfig compares it against the trusted source. Cases below
    // that care about its contents overwrite this default.
    writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({ name: 'pkg', version: '1.0.0' })
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
    // directory's own package.json is suspect.
    const sourcePackageJson = writeSource({ branches: ['release'] })
    writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({ name: 'pkg', version: '1.0.0' })
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
    writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({
        name: 'pkg',
        version: '1.0.0',
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
      JSON.stringify({ name: 'pkg', version: '1.0.0', repository })
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
      JSON.stringify({ name: 'pkg', version: '1.0.0' })
    )

    writeReleaseConfig(sourcePackageJson, dir)

    const found = await searchReleaseConfig(dir)
    expect(path.basename(found.filepath)).toBe(TRUSTED_CONFIG_FILE)
    expect(found.config).toEqual(trusted)
  })
})

describe('findManifestPublishOverrides', () => {
  const source = { publishConfig: { access: 'public', provenance: true } }

  it('accepts a build manifest that matches the trusted source', () => {
    const build = {
      name: 'pkg',
      version: '1.0.0',
      publishConfig: { access: 'public', provenance: true },
    }

    expect(findManifestPublishOverrides(build, source)).toEqual([])
  })

  it('accepts a publishConfig whose keys are merely reordered', () => {
    const build = { publishConfig: { provenance: true, access: 'public' } }

    expect(findManifestPublishOverrides(build, source)).toEqual([])
  })

  it('flags a re-added scripts field', () => {
    const build = {
      scripts: { prepack: 'node ./evil.js' },
      publishConfig: { access: 'public', provenance: true },
    }

    const overrides = findManifestPublishOverrides(build, source)

    expect(overrides).toHaveLength(1)
    expect(overrides[0]).toContain('"scripts"')
  })

  it('flags an empty scripts field, which prepareForRelease still deletes', () => {
    const build = { scripts: {}, publishConfig: source.publishConfig }

    expect(findManifestPublishOverrides(build, source)[0]).toContain(
      '"scripts"'
    )
  })

  it('flags a publishConfig that re-enables lifecycle scripts', () => {
    const build = {
      publishConfig: {
        access: 'public',
        provenance: true,
        'ignore-scripts': false,
      },
    }

    const overrides = findManifestPublishOverrides(build, source)

    expect(overrides).toHaveLength(1)
    expect(overrides[0]).toContain('"publishConfig"')
  })

  it.each([
    ['a dropped publishConfig', {}],
    [
      'a redirected registry',
      { publishConfig: { registry: 'http://evil' } },
    ],
    ['provenance turned off', { publishConfig: { access: 'public' } }],
  ])('flags %s', (_label, build) => {
    expect(findManifestPublishOverrides(build, source)).toHaveLength(1)
  })

  it('reports both problems at once', () => {
    const build = { scripts: { prepack: 'x' }, publishConfig: {} }

    expect(findManifestPublishOverrides(build, source)).toHaveLength(2)
  })
})

describe('findRepositoryMismatch', () => {
  const source = {
    repository: {
      type: 'git',
      url: 'https://github.com/dnbexperience/eufemia.git',
      directory: 'packages/dnb-eufemia',
    },
  }

  it('accepts a build manifest whose repository matches the source', () => {
    const build = {
      name: 'pkg',
      version: '1.0.0',
      repository: source.repository,
    }

    expect(findRepositoryMismatch(build, source)).toEqual([])
  })

  it('accepts a repository whose keys are merely reordered', () => {
    const build = {
      repository: {
        directory: 'packages/dnb-eufemia',
        url: 'https://github.com/dnbexperience/eufemia.git',
        type: 'git',
      },
    }

    expect(findRepositoryMismatch(build, source)).toEqual([])
  })

  it('accepts when neither manifest declares a repository', () => {
    expect(
      findRepositoryMismatch({ name: 'pkg' }, { name: 'pkg' })
    ).toEqual([])
  })

  it.each([
    [
      'a redirected repository url',
      {
        repository: { type: 'git', url: 'https://attacker.example/x.git' },
      },
    ],
    [
      'a repository swapped to a string form pointing elsewhere',
      { repository: 'https://attacker.example/x.git' },
    ],
    ['a dropped repository', { name: 'pkg' }],
  ])('flags %s', (_label, build) => {
    const mismatch = findRepositoryMismatch(build, source)

    expect(mismatch).toHaveLength(1)
    expect(mismatch[0]).toContain('"repository"')
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

describe('tampered manifest cannot re-enable lifecycle scripts', () => {
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

  const writeBuildManifest = (extra) =>
    writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({ name: 'pkg', version: '1.0.0', ...extra })
    )

  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), 'eufemia-manifest-'))
  })

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  it('publishes a manifest that matches the trusted source', () => {
    writeBuildManifest({ publishConfig })

    expect(() => writeReleaseConfig(writeSource(), dir)).not.toThrow()
    expect(existsSync(path.join(dir, TRUSTED_CONFIG_FILE))).toBe(true)
  })

  it.each([
    [
      'scripts plus ignore-scripts',
      {
        scripts: { prepack: 'node ./evil.js' },
        publishConfig: { ...publishConfig, 'ignore-scripts': false },
      },
    ],
    [
      'a proxy override',
      {
        publishConfig: { ...publishConfig, 'https-proxy': 'http://evil' },
      },
    ],
    ['a dropped publishConfig', {}],
  ])('refuses %s, and writes no config', (_label, extra) => {
    writeBuildManifest(extra)

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
