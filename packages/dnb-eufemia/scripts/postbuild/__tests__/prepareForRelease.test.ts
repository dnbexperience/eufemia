/**
 * Test Package JSON parsing
 *
 */

import packpath from 'packpath'
import fs from 'fs-extra'
import path from 'path'
import { cleanupPackage } from '../prepareForRelease'

describe('cleanupPackage', () => {
  it('gets prepared properly and have the expected props', async () => {
    const filepath = path.resolve(packpath.self(), 'package.json')
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
})

describe('package.json', () => {
  const packageJsonFile = path.resolve(
    packpath.self(),
    'build/package.json'
  )
  const buildDir = path.resolve(packpath.self(), 'build')

  type ExportEntry = string | Record<string, string | string[]>
  type PackageJson = {
    [key: string]: unknown
    exports?: Record<string, ExportEntry>
    main?: string
    module?: string
    typings?: string
    type?: string
    sideEffects?: unknown
    peerDependencies?: unknown
    publishConfig?: unknown
  }

  let packageJson: PackageJson = {}

  beforeAll(async () => {
    packageJson = await fs.readJson(path.resolve(packageJsonFile))
  })

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

  it('has main and module fields to be equal', () => {
    expect(packageJson.main).toBe('./index.js')
    expect(packageJson.module).toBe('./index.js')
    expect(packageJson.typings).toBe('./index.d.ts')
  })

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
    expect(exportsMap['./es/*/*/*.js']).toBeTruthy()
  })

  it('matches important exports to existing files', () => {
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
      import: ['./components/*.js', './components/*/index.js'],
      require: ['./cjs/components/*.js', './cjs/components/*/index.js'],
      types: ['./components/*.d.ts', './components/*/index.d.ts'],
      default: ['./components/*.js', './components/*/index.js'],
    })
    assertPatternExport('./extensions/*/*', {
      import: ['./extensions/*/*.js', './extensions/*/*/index.js'],
      require: [
        './cjs/extensions/*/*.js',
        './cjs/extensions/*/*/index.js',
      ],
      types: ['./extensions/*/*.d.ts', './extensions/*/*/index.d.ts'],
      default: ['./extensions/*/*.js', './extensions/*/*/index.js'],
    })
    assertPatternExport('./es/*/*/*.js', {
      import: './es/*/*/*.js',
      require: './cjs/*/*/*.js',
      types: './es/*/*/*.d.ts',
      default: './es/*/*/*.js',
    })

    expect(exportsMap['./assets/*/*/*']).toBe('./assets/*/*/*')
    expect(
      fs.existsSync(path.resolve(buildDir, 'assets/flags/1x1/no.svg'))
    ).toBe(true)
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
      path.resolve(packpath.self(), 'package.json')
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
})
