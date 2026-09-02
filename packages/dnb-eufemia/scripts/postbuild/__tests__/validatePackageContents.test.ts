/**
 * Test the package content validation logic.
 */

import { execFileSync, spawnSync } from 'node:child_process'
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import {
  collectManifestEntryPoints,
  findMissingEntryPoints,
  findPackageContentViolations,
  findSizeViolations,
  getPackedFiles,
  MIN_FILE_COUNT,
} from '../validatePackageContents.mjs'

const PKG_ROOT = path.resolve(__dirname, '../../..')

// Enough files to clear the real MIN_FILE_COUNT floor, so the cases below
// exercise the shipped defaults instead of a relaxed override.
const manyFiles = Array.from(
  { length: MIN_FILE_COUNT },
  (_, index) => `components/File${index}.js`
)

describe('findPackageContentViolations', () => {
  it('returns no violations for a clean package', () => {
    const files = ['package.json', 'index.js', ...manyFiles]

    expect(findPackageContentViolations(files)).toEqual([])
  })

  it('flags test files', () => {
    const files = [
      'package.json',
      'components/__tests__/Button.test.js',
      ...manyFiles,
    ]

    const errors = findPackageContentViolations(files)

    expect(errors).toHaveLength(1)
    expect(errors[0]).toContain('test files')
  })

  it('flags story files', () => {
    const files = [
      'package.json',
      'components/Button.stories.js',
      ...manyFiles,
    ]

    expect(findPackageContentViolations(files)[0]).toContain('story files')
  })

  it('flags env, npmrc, node_modules and OS junk', () => {
    const files = [
      'package.json',
      '.env',
      '.env.local',
      '.npmrc',
      'node_modules/foo/index.js',
      '.DS_Store',
      ...manyFiles,
    ]

    const errors = findPackageContentViolations(files)

    expect(errors).toEqual(
      expect.arrayContaining([
        expect.stringContaining('env files'),
        expect.stringContaining('npmrc files'),
        expect.stringContaining('node_modules'),
        expect.stringContaining('editor/OS junk'),
      ])
    )
  })

  it('flags a missing required file', () => {
    const files = ['index.js', ...manyFiles]

    expect(findPackageContentViolations(files)).toEqual([
      'Missing required file: package.json',
    ])
  })

  it('flags a suspiciously small package', () => {
    const errors = findPackageContentViolations([
      'package.json',
      'index.js',
    ])

    expect(errors).toHaveLength(1)
    expect(errors[0]).toContain('Suspiciously few files')
  })

  it('flags a suspiciously large package', () => {
    const files = Array.from(
      { length: 6 },
      (_, index) => `components/File${index}.js`
    )

    const errors = findPackageContentViolations(
      ['package.json', ...files],
      {
        minFileCount: 0,
        maxFileCount: 5,
      }
    )

    expect(errors).toHaveLength(1)
    expect(errors[0]).toContain('Suspiciously many files')
  })

  it('normalises leading ./ and backslashes before matching', () => {
    const files = [
      './package.json',
      'components\\__tests__\\Button.test.js',
    ]

    const errors = findPackageContentViolations(files, { minFileCount: 0 })

    expect(errors).toEqual([expect.stringContaining('test files')])
  })
})

describe('collectManifestEntryPoints', () => {
  it('collects main, module and types, normalised and de-duplicated', () => {
    const targets = collectManifestEntryPoints({
      main: './index.js',
      module: './index.js',
      types: './index.d.ts',
    })

    expect(targets).toEqual(['index.js', 'index.d.ts'])
  })

  it('walks nested exports condition objects', () => {
    const targets = collectManifestEntryPoints({
      main: './index.js',
      exports: {
        '.': {
          types: './index.d.ts',
          import: './index.js',
          require: './cjs/index.js',
          default: './index.js',
        },
        './package.json': './package.json',
      },
    })

    expect(targets).toEqual(
      expect.arrayContaining([
        'index.js',
        'index.d.ts',
        'cjs/index.js',
        'package.json',
      ])
    )
  })

  it('skips wildcard subpath patterns', () => {
    const targets = collectManifestEntryPoints({
      exports: {
        './components/*': './components/*.js',
        './valid': './valid.js',
      },
    })

    expect(targets).toEqual(['valid.js'])
  })

  it('returns an empty list for a missing or empty manifest', () => {
    expect(collectManifestEntryPoints(undefined)).toEqual([])
    expect(collectManifestEntryPoints({})).toEqual([])
  })
})

describe('findMissingEntryPoints', () => {
  const manifest = {
    main: './index.js',
    module: './index.js',
    types: './index.d.ts',
  }
  const cssFiles = [
    'style/dnb-ui-basis.min.css',
    'style/dnb-ui-core.min.css',
    'style/dnb-ui-components.min.css',
  ]

  it('returns no violations when entry points and CSS bundles are present', () => {
    const files = ['package.json', 'index.js', 'index.d.ts', ...cssFiles]

    expect(findMissingEntryPoints(files, { manifest })).toEqual([])
  })

  it('flags a missing manifest entry point', () => {
    const files = ['package.json', 'index.js', ...cssFiles]

    const errors = findMissingEntryPoints(files, { manifest })

    expect(errors).toHaveLength(1)
    expect(errors[0]).toContain('entry point')
    expect(errors[0]).toContain('index.d.ts')
  })

  it('flags missing CSS bundles', () => {
    const files = ['package.json', 'index.js', 'index.d.ts']

    const errors = findMissingEntryPoints(files, { manifest })

    expect(errors).toHaveLength(1)
    expect(errors[0]).toContain('CSS bundle')
    expect(errors[0]).toContain('dnb-ui-components.min.css')
  })

  it('normalises leading ./ and backslashes before matching', () => {
    const files = ['./index.js', 'index.d.ts']

    expect(
      findMissingEntryPoints(files, {
        manifest: { main: './index.js', types: './index.d.ts' },
        requiredCssFiles: [],
      })
    ).toEqual([])
  })
})

describe('findSizeViolations', () => {
  const MB = 1024 * 1024

  it('returns no violations within the size ceiling', () => {
    expect(
      findSizeViolations(50 * MB, { maxUnpackedSize: 100 * MB })
    ).toEqual([])
  })

  it('flags a suspiciously large package', () => {
    const errors = findSizeViolations(200 * MB, {
      maxUnpackedSize: 100 * MB,
    })

    expect(errors).toHaveLength(1)
    expect(errors[0]).toContain('Suspiciously large package')
  })

  it('skips the check when the unpacked size is unavailable', () => {
    expect(findSizeViolations(undefined)).toEqual([])
  })
})

// The credentialed publish job runs this validation against the restored build
// artifact, so reading the package's contents must not execute anything the
// artifact carries. `npm pack` runs a package's `prepack` script even under
// `--dry-run`, which is why getPackedFiles passes `--ignore-scripts`. Without
// that flag a tampered manifest would get code execution in the job holding the
// npm OIDC authority and the GitHub token, so the property is asserted here
// rather than left to the flag being noticed in review.
describe('getPackedFiles', () => {
  let dir

  const MARKER = 'PREPACK_MARKER'

  const writePackageWithPrepack = () => {
    writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({
        name: 'eufemia-prepack-probe',
        version: '1.0.0',
        main: 'index.js',
        scripts: {
          prepack: `node -e "require('fs').writeFileSync('${MARKER}','ran')"`,
        },
      })
    )
    writeFileSync(path.join(dir, 'index.js'), 'export default 1\n')
  }

  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), 'eufemia-packed-'))
  })

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  it('reads the packed file list without running the package prepack script', () => {
    writePackageWithPrepack()

    const { files } = getPackedFiles(dir)

    // The harness has to be live before the absence assertion means anything.
    expect(files).toContain('index.js')
    expect(existsSync(path.join(dir, MARKER))).toBe(false)
  })

  // Control for the assertion above: the same pack without `--ignore-scripts`
  // does run the script, so the flag is what keeps the validation inert.
  it('would run that script without the ignore-scripts flag', () => {
    writePackageWithPrepack()

    execFileSync('npm', ['pack', '--dry-run', '--json'], {
      cwd: dir,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    })

    expect(existsSync(path.join(dir, MARKER))).toBe(true)
  })
})

// Same entry-point property as the sibling guard (see the symlink case in
// writeReleaseConfig.test.ts): Node reports a symlink-resolved
// `import.meta.url`, so comparing it with an unresolved `process.argv[1]` made
// the validation exit 0 without validating anything whenever the invocation
// path crossed a symlink. The fixture is a package that packs cleanly but
// breaks the shipped rules, so the expected failure comes from the validation
// itself — proving the checks ran rather than that something else went wrong.
describe('the validator runs when invoked through a symlinked path', () => {
  const script = path.join(
    PKG_ROOT,
    'scripts/postbuild/validatePackageContents.mjs'
  )
  let dir

  const runValidator = (scriptPath) =>
    spawnSync(process.execPath, [scriptPath, 'pkg'], {
      cwd: dir,
      encoding: 'utf8',
    })

  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), 'eufemia-validate-entry-'))
    const pkg = path.join(dir, 'pkg')
    mkdirSync(pkg)
    writeFileSync(
      path.join(pkg, 'package.json'),
      JSON.stringify({ name: 'pkg', version: '1.0.0', main: './index.js' })
    )
    writeFileSync(path.join(pkg, 'index.js'), 'export default 1\n')
  })

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  it('validates through a symlink to the script', () => {
    const link = path.join(dir, 'validatePackageContents.mjs')
    symlinkSync(script, link)

    const result = runValidator(link)

    expect(result.status).toBe(1)
    expect(result.stderr).toContain('Package content validation FAILED')
  })

  // Control: identical behaviour through the real path, so the case above is
  // about the entry point rather than about the fixture.
  it('reports the same violations through the real path', () => {
    const result = runValidator(script)

    expect(result.status).toBe(1)
    expect(result.stderr).toContain('Package content validation FAILED')
  })
})
