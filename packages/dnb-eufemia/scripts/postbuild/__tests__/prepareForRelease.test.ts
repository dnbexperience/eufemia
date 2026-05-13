/**
 * Test Package JSON parsing
 *
 */

import fs from 'fs-extra'
import path from 'path'
import prepareForRelease, {
  buildExportsMap,
  cleanupPackage,
} from '../prepareForRelease'

const PKG_ROOT = path.resolve(__dirname, '../../..')

describe('cleanupPackage', () => {
  it('gets prepared properly and have the expected props', async () => {
    const filepath = path.resolve(PKG_ROOT, 'package.json')
    const packageString = await fs.readFile(filepath, 'utf-8')
    const cleanedPackage = await cleanupPackage({
      packageString,
    })

    expect(cleanedPackage).not.toHaveProperty('release')
    expect(cleanedPackage).not.toHaveProperty('scripts')
    expect(cleanedPackage).not.toHaveProperty('devDependencies')
    expect(cleanedPackage).toHaveProperty('dependencies')
    expect(cleanedPackage).toHaveProperty('peerDependencies')
    expect(cleanedPackage.license).toBe('SEE LICENSE IN LICENSE FILE')
  })

  it('includes @babel/runtime-corejs3 as a runtime dependency', async () => {
    // The published build artifacts contain imports from
    // "@babel/runtime-corejs3/helpers/esm/*" because they were compiled with
    // @babel/plugin-transform-runtime using corejs: 3. Consumers bundling with
    // tools like esbuild or Vite will get a build error if this package is not
    // listed as a dependency in the published package.json.
    // See: https://github.com/dnbexperience/eufemia/pull/7994 (accidental removal)
    //      https://github.com/dnbexperience/eufemia/pull/8016 (re-added)
    const filepath = path.resolve(PKG_ROOT, 'package.json')
    const packageString = await fs.readFile(filepath, 'utf-8')
    const cleanedPackage = await cleanupPackage({
      packageString,
    })

    const deps = cleanedPackage.dependencies as Record<string, string>
    expect(deps).toMatchObject({
      '@babel/runtime-corejs3': expect.any(String),
    })
  })

  it('includes postcss-selector-parser as a runtime dependency', async () => {
    // The published package ships the postcss-isolated-style-scope plugin
    // (build/plugins/) which requires "postcss-selector-parser" at runtime.
    // Consumers who use this plugin for style isolation need this package to be
    // listed as a dependency so their package manager installs it automatically.
    // See: https://github.com/dnbexperience/eufemia/pull/7986#discussion_r3200784199
    const filepath = path.resolve(PKG_ROOT, 'package.json')
    const packageString = await fs.readFile(filepath, 'utf-8')
    const cleanedPackage = await cleanupPackage({
      packageString,
    })

    const deps = cleanedPackage.dependencies as Record<string, string>
    expect(deps).toMatchObject({
      'postcss-selector-parser': expect.any(String),
    })
  })
})

describe('buildExportsMap', () => {
  it('returns a stable exports map', async () => {
    const exportsMap = await buildExportsMap({
      buildDir: PKG_ROOT,
    })

    expect(exportsMap['.']).toEqual(
      expect.objectContaining({
        import: './index.js',
        require: './cjs/index.js',
        types: './index.d.ts',
      })
    )
    expect(exportsMap['./components/*']).toBeTruthy()
    expect(exportsMap['./components/*.js']).toBeTruthy()
    expect(exportsMap['./style/*']).toBe('./style/*')
    expect(exportsMap['./assets/*/*/*']).toBe('./assets/*/*/*')
    expect(exportsMap['./components/button/ButtonDocs']).toBeFalsy()
    expect(exportsMap['./components/button/index']).toBeFalsy()
    expect(exportsMap['./es/*']).toBeTruthy()
    expect(exportsMap['./es/*.js']).toBeTruthy()
  })
})

describe('package.json', () => {
  const packageJsonFile = path.resolve(
    PKG_ROOT,
    'build/package.json'
  )
  const buildDir = path.resolve(PKG_ROOT, 'build')

  type ExportEntry = string | Record<string, string | string[]>
  type PackageJson = {
    [key: string]: unknown
    exports?: Record<string, ExportEntry>
    main?: string
    module?: string
    types?: string
    type?: string
    sideEffects?: unknown
    peerDependencies?: unknown
    publishConfig?: unknown
  }

  let packageJson: PackageJson = {}

  beforeAll(async () => {
    packageJson = await fs.readJson(path.resolve(packageJsonFile))
  })

  it('exists inside build', () => {
    expect(fs.existsSync(path.resolve(packageJsonFile))).toBeTruthy()
  })

  it('has type="module"', () => {
    expect(packageJson.type).toBe('module')
  })

  it('has not these deleted fields', () => {
    expect(packageJson.release).toBeFalsy()
    expect(packageJson.scripts).toBeFalsy()
    expect(packageJson.devDependencies).toBeFalsy()
    expect(packageJson.resolutions).toBeFalsy()
    expect(packageJson.volta).toBeFalsy()
  })

  it('has sideEffects fields', () => {
    expect(packageJson.sideEffects).toEqual(
      expect.arrayContaining([
        '*.scss',
        'umd/*',
        'style/**/*',
        'es/style/**/*',
        'esm/style/**/*',
      ])
    )
  })

  it('has peerDependencies', () => {
    expect(packageJson.peerDependencies).toEqual(
      expect.objectContaining({
        react: expect.anything(),
        'react-dom': expect.anything(),
      })
    )
  })

  it('has @babel/runtime-corejs3 as a dependency', () => {
    // The published build artifacts (e.g. build/shared/useTranslation.js) contain
    // imports from "@babel/runtime-corejs3/helpers/esm/*" because they were compiled
    // with @babel/plugin-transform-runtime using corejs: 3. Consumers who do not have
    // this package installed (e.g. via bundlers like esbuild or Vite) will get a
    // build error if this runtime dependency is missing from the published package.
    // See: https://github.com/dnbexperience/eufemia/issues/7994
    expect(
      (packageJson as { dependencies?: Record<string, string> })
        .dependencies
    ).toMatchObject({
      '@babel/runtime-corejs3': expect.any(String),
    })
  })

  it('has main and module fields to be equal', () => {
    expect(packageJson.main).toBe('./index.js')
    expect(packageJson.module).toBe('./index.js')
    expect(packageJson.types).toBe('./index.d.ts')
  })

  // Skipped as we do not use this currently
  describe.skip('exports', () => {
    const resolveTarget = (target) =>
      path.resolve(buildDir, target.replace(/^\.\//, ''))

    const assertTargetExists = (target) => {
      if (Array.isArray(target)) {
        target.forEach(assertTargetExists)
        return
      }
      if (typeof target !== 'string' || target.includes('*')) {
        return
      }
      expect(fs.existsSync(resolveTarget(target))).toBe(true)
    }

    const assertExport = (
      key,
      expected?: Record<string, string> | string
    ) => {
      const exportsMap = packageJson.exports as Record<string, ExportEntry>
      const entry = exportsMap[key]

      expect(entry).toBeTruthy()

      if (typeof entry === 'string') {
        if (expected) {
          expect(entry).toBe(expected)
        }
        assertTargetExists(entry)
        return
      }

      if (expected) {
        Object.entries(expected).forEach(([field, value]) => {
          expect(entry[field]).toBe(value)
        })
      }

      if (entry.import) {
        assertTargetExists(entry.import)
      }
      if (entry.require) {
        assertTargetExists(entry.require)
      }
      if (entry.types) {
        assertTargetExists(entry.types)
      }
      if (entry.default) {
        assertTargetExists(entry.default)
      }
    }

    const assertPatternExport = (
      key,
      expected: Record<string, string | string[]>
    ) => {
      const exportsMap = packageJson.exports as Record<string, ExportEntry>
      const entry = exportsMap[key]

      expect(entry).toBeTruthy()
      expect(typeof entry).toBe('object')
      expect(Array.isArray(entry)).toBe(false)

      Object.entries(expected).forEach(([field, value]) => {
        expect((entry as Record<string, unknown>)[field]).toEqual(value)
      })
    }

    it('has exports map', () => {
      expect(packageJson.exports).toBeTruthy()
      const exportsMap = packageJson.exports as Record<string, ExportEntry>
      expect(exportsMap['.']).toEqual(
        expect.objectContaining({
          import: './index.js',
          require: './cjs/index.js',
          types: './index.d.ts',
        })
      )
      expect(exportsMap['./components/*']).toBeTruthy()
      expect(exportsMap['./components/*.js']).toBeTruthy()
      expect(exportsMap['./style/*']).toBe('./style/*')
      expect(exportsMap['./assets/*/*/*']).toBe('./assets/*/*/*')
      expect(exportsMap['./components/button/ButtonDocs']).toBeFalsy()
      expect(exportsMap['./components/button/index']).toBeFalsy()
      expect(exportsMap['./es/*']).toBeTruthy()
      expect(exportsMap['./es/*.js']).toBeTruthy()
    })

    it.skip('matches important exports to existing files', () => {
      assertExport('.', {
        import: './index.js',
        require: './cjs/index.js',
        types: './index.d.ts',
      })

      assertExport('./style', {
        import: './style/index.js',
        require: './cjs/style/index.js',
      })
      const exportsMap = packageJson.exports as Record<string, ExportEntry>
      expect(exportsMap['./style/*']).toBe('./style/*')
      expect(exportsMap['./style/*/*/*']).toBe('./style/*/*/*')
      expect(
        fs.existsSync(path.resolve(buildDir, 'style/core/utilities.scss'))
      ).toBe(true)

      assertExport('./components', {
        import: './components/index.js',
        require: './cjs/components/index.js',
      })
      assertExport('./extensions', {
        import: './extensions/index.js',
        require: './cjs/extensions/index.js',
      })
      assertExport('./icons', {
        import: './icons/index.js',
        require: './cjs/icons/index.js',
      })

      assertPatternExport('./components/*', {
        import: [
          './components/*.js',
          './components/*/index.js',
          './components/*',
        ],
        require: [
          './cjs/components/*.js',
          './cjs/components/*/index.js',
          './cjs/components/*',
        ],
        types: ['./components/*.d.ts', './components/*/index.d.ts'],
        default: [
          './components/*.js',
          './components/*/index.js',
          './components/*',
        ],
      })
      assertPatternExport('./extensions/*', {
        import: [
          './extensions/*.js',
          './extensions/*/index.js',
          './extensions/*',
        ],
        require: [
          './cjs/extensions/*.js',
          './cjs/extensions/*/index.js',
          './cjs/extensions/*',
        ],
        types: ['./extensions/*.d.ts', './extensions/*/index.d.ts'],
        default: [
          './extensions/*.js',
          './extensions/*/index.js',
          './extensions/*',
        ],
      })
      assertPatternExport('./es/*', {
        import: ['./es/*.js', './es/*/index.js'],
        require: ['./cjs/*.js', './cjs/*/index.js'],
        types: ['./es/*.d.ts', './es/*/index.d.ts'],
        default: ['./es/*.js', './es/*/index.js'],
      })

      expect(exportsMap['./assets/*/*/*']).toBe('./assets/*/*/*')
      expect(
        fs.existsSync(path.resolve(buildDir, 'assets/flags/1x1/no.svg'))
      ).toBe(true)
    })
  })

  it('has publishConfig', () => {
    expect(packageJson.publishConfig).toEqual(
      expect.objectContaining({ access: 'public' })
    )
  })
})

describe('release config', () => {
  type ReleasePlugin =
    | string
    | [string, Record<string, unknown> | undefined]
  type ReleaseConfig = {
    plugins?: ReleasePlugin[]
  }
  type PackageJsonWithRelease = {
    release?: ReleaseConfig
  }

  let packageJson: PackageJsonWithRelease = {}

  beforeAll(async () => {
    packageJson = await fs.readJson(
      path.resolve(PKG_ROOT, 'package.json')
    )
  })

  it('has npm plugin provenance config', () => {
    const plugins = packageJson.release?.plugins ?? []
    const npmPlugin = plugins.find(
      (plugin) =>
        Array.isArray(plugin) && plugin[0] === '@semantic-release/npm'
    )

    expect(npmPlugin).toBeTruthy()

    const npmConfig = Array.isArray(npmPlugin) ? npmPlugin[1] : undefined
    expect(npmConfig).toMatchObject({
      npmPublish: true,
      pkgRoot: '.',
      provenance: true,
    })
  })

  it('creates .releaserc.json with provenance config in build directory', async () => {
    const buildDir = path.resolve(PKG_ROOT, 'build')

    // Ensure build directory exists
    await fs.ensureDir(buildDir)

    // Run prepareForRelease
    await prepareForRelease()

    // Check if .releaserc.json was created
    const releaseRcPath = path.join(buildDir, '.releaserc.json')
    const exists = await fs.pathExists(releaseRcPath)
    expect(exists).toBe(true)

    // Read and verify the configuration
    const releaseRc = await fs.readJson(releaseRcPath)

    // Verify it has the plugins array
    expect(releaseRc).toHaveProperty('plugins')
    expect(Array.isArray(releaseRc.plugins)).toBe(true)

    // Verify npm plugin has provenance config
    const npmPlugin = releaseRc.plugins.find(
      (plugin) =>
        Array.isArray(plugin) && plugin[0] === '@semantic-release/npm'
    )
    expect(npmPlugin).toBeTruthy()

    const npmConfig = Array.isArray(npmPlugin) ? npmPlugin[1] : undefined
    expect(npmConfig).toMatchObject({
      npmPublish: true,
      pkgRoot: '.',
      provenance: true,
    })
  })
})
