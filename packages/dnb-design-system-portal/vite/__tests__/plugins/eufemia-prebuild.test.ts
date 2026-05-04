import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import path from 'node:path'
import fs from 'node:fs'
import os from 'node:os'
import eufemiaPrebuildPlugin, {
  hasPrebuild,
  logPrebuildWarning,
} from '../../client/plugins/eufemia-prebuild'
import type { ResolvedConfig } from 'vite'

describe('eufemia-prebuild plugin', () => {
  let tmpDir: string

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(
      path.join(os.tmpdir(), 'eufemia-prebuild-test-')
    )
  })

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true })
    process.removeListener('beforeExit', logPrebuildWarning)
    delete (globalThis as Record<string, unknown>)[
      '__eufemia_prebuild_warn_scheduled__'
    ]
  })

  describe('hasPrebuild', () => {
    it('returns false when build directory does not exist', () => {
      expect(hasPrebuild(tmpDir)).toBe(false)
    })

    it('returns false when build directory exists but has no index.js', () => {
      fs.mkdirSync(path.join(tmpDir, 'build'))
      expect(hasPrebuild(tmpDir)).toBe(false)
    })

    it('returns true when build/index.js exists', () => {
      const buildDir = path.join(tmpDir, 'build')
      fs.mkdirSync(buildDir)
      fs.writeFileSync(
        path.join(buildDir, 'index.js'),
        'module.exports = {}'
      )
      expect(hasPrebuild(tmpDir)).toBe(true)
    })
  })

  describe('plugin behavior', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function createPlugin(): any {
      return eufemiaPrebuildPlugin()
    }

    function makeConfig(
      overrides: Partial<ResolvedConfig> = {}
    ): ResolvedConfig {
      return {
        command: 'serve',
        logger: {
          warn: vi.fn(),
          info: vi.fn(),
          error: vi.fn(),
        },
        ...overrides,
      } as unknown as ResolvedConfig
    }

    it('has the correct plugin name', () => {
      const plugin = createPlugin()
      expect(plugin.name).toBe('eufemia-prebuild')
    })

    it('is a no-op in dev mode', () => {
      const plugin = createPlugin()
      plugin.configResolved(makeConfig({ command: 'serve' }))

      const result = plugin.resolveId(
        '@dnb/eufemia/src/components/Button',
        undefined,
        {}
      )
      expect(result).toBeNull()
    })

    it('is a no-op in build mode when no prebuild exists', () => {
      const plugin = createPlugin()

      // Mock hasPrebuild to return false
      vi.spyOn(fs, 'existsSync').mockReturnValue(false)
      plugin.configResolved(makeConfig({ command: 'build' }))
      vi.restoreAllMocks()

      const result = plugin.resolveId(
        '@dnb/eufemia/src/components/Button',
        undefined,
        {}
      )
      expect(result).toBeNull()
    })

    it('ignores non-eufemia-src imports even when prebuild exists', () => {
      const plugin = createPlugin()

      vi.spyOn(fs, 'existsSync').mockReturnValue(true)
      plugin.configResolved(makeConfig({ command: 'build' }))
      vi.restoreAllMocks()

      const result = plugin.resolveId('react', undefined, {})
      expect(result).toBeNull()
    })

    it('ignores @dnb/eufemia imports that do not start with /src', () => {
      const plugin = createPlugin()

      vi.spyOn(fs, 'existsSync').mockReturnValue(true)
      plugin.configResolved(makeConfig({ command: 'build' }))
      vi.restoreAllMocks()

      const result = plugin.resolveId(
        '@dnb/eufemia/components/Button',
        undefined,
        {}
      )
      expect(result).toBeNull()
    })

    it('rewrites @dnb/eufemia/src/ to @dnb/eufemia/build/ in build mode with prebuild', async () => {
      const plugin = createPlugin()

      vi.spyOn(fs, 'existsSync').mockReturnValue(true)
      plugin.configResolved(makeConfig({ command: 'build' }))
      vi.restoreAllMocks()

      const mockResolve = vi.fn().mockResolvedValue({
        id: '/resolved/path/to/build/components/Button',
      })

      const boundResolveId = plugin.resolveId.bind({
        resolve: mockResolve,
      })

      await boundResolveId(
        '@dnb/eufemia/src/components/Button',
        '/some/importer.ts',
        {}
      )

      expect(mockResolve).toHaveBeenCalledWith(
        '@dnb/eufemia/build/components/Button',
        '/some/importer.ts',
        expect.objectContaining({ skipSelf: true })
      )
    })

    it('rewrites deep nested paths correctly', async () => {
      const plugin = createPlugin()

      vi.spyOn(fs, 'existsSync').mockReturnValue(true)
      plugin.configResolved(makeConfig({ command: 'build' }))
      vi.restoreAllMocks()

      const mockResolve = vi.fn().mockResolvedValue({ id: '/resolved' })
      const boundResolveId = plugin.resolveId.bind({
        resolve: mockResolve,
      })

      await boundResolveId(
        '@dnb/eufemia/src/extensions/forms/Field/String',
        '/some/importer.ts',
        {}
      )

      expect(mockResolve).toHaveBeenCalledWith(
        '@dnb/eufemia/build/extensions/forms/Field/String',
        '/some/importer.ts',
        expect.objectContaining({ skipSelf: true })
      )
    })

    it('warns on non-CI local builds when prebuild exists', () => {
      const plugin = createPlugin()
      const originalCI = process.env.CI
      delete process.env.CI

      vi.spyOn(fs, 'existsSync').mockReturnValue(true)
      const warn = vi.fn()
      plugin.configResolved(
        makeConfig({
          command: 'build',
          logger: { warn, info: vi.fn(), error: vi.fn() },
        } as unknown as Partial<ResolvedConfig>)
      )
      vi.restoreAllMocks()

      plugin.closeBundle()
      process.emit('beforeExit', 0)

      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('dnb-eufemia/build')
      )

      process.env.CI = originalCI
    })

    it('does not warn on CI builds', () => {
      const plugin = createPlugin()
      const originalCI = process.env.CI
      process.env.CI = 'true'

      vi.spyOn(fs, 'existsSync').mockReturnValue(true)
      const warn = vi.fn()
      plugin.configResolved(
        makeConfig({
          command: 'build',
          logger: { warn, info: vi.fn(), error: vi.fn() },
        } as unknown as Partial<ResolvedConfig>)
      )
      vi.restoreAllMocks()

      plugin.closeBundle()
      process.emit('beforeExit', 0)

      expect(warn).not.toHaveBeenCalled()

      process.env.CI = originalCI
    })
  })
})
