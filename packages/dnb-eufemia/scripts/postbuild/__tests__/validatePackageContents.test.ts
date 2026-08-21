/**
 * Test the package content validation logic.
 */

import {
  collectManifestEntryPoints,
  findMissingEntryPoints,
  findPackageContentViolations,
  findSizeViolations,
} from '../validatePackageContents.mjs'

const manyFiles = Array.from(
  { length: 30 },
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
