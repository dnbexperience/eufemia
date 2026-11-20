import { describe, it, expect, vi, afterEach } from 'vitest'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { resolveConfig, type InlineConfig } from 'vite'
import productionDependenciesPlugin, {
  findUndeclaredPackages,
  getProductionPackageDirectories,
} from '../../client/plugins/production-dependencies'

describe('production-dependencies plugin', () => {
  describe('findUndeclaredPackages', () => {
    it('reports bundled packages outside the production dependency tree', () => {
      const production = new Set([
        '/repo/node_modules/react',
        '/repo/node_modules/react-markdown',
        '/repo/node_modules/react-markdown/node_modules/unified',
      ])

      expect(
        findUndeclaredPackages(
          [
            '/repo/packages/dnb-design-system-portal/src/App.tsx',
            '/repo/packages/dnb-eufemia/src/Component.tsx',
            'virtual:portal-pages',
            '/repo/node_modules/react/index.js',
            '/repo/node_modules/react-markdown/lib/index.js',
            '/repo/node_modules/react-markdown/node_modules/unified/index.js',
            '/repo/node_modules/unified/index.js',
            '/repo/node_modules/@scope/pkg/dist/index.js',
            '/repo/node_modules/@scope/pkg/dist/other.js',
          ],
          production
        )
      ).toEqual(['@scope/pkg', 'unified'])
    })
  })

  describe('getProductionPackageDirectories', () => {
    let tmpDir: string

    afterEach(() => {
      fs.rmSync(tmpDir, { recursive: true, force: true })
    })

    it('follows dependencies, also through linked workspaces', () => {
      tmpDir = fs.realpathSync(
        fs.mkdtempSync(path.join(os.tmpdir(), 'production-deps-'))
      )
      const write = (dir: string, manifest: object) => {
        fs.mkdirSync(path.join(tmpDir, dir), { recursive: true })
        fs.writeFileSync(
          path.join(tmpDir, dir, 'package.json'),
          JSON.stringify(manifest)
        )
      }
      write('portal', {
        dependencies: { a: '1.0.0', '@scope/lib': 'workspace:*' },
        optionalDependencies: { 'not-installed': '1.0.0' },
        devDependencies: { 'dev-only': '1.0.0' },
      })
      write('lib', {
        dependencies: { b: '1.0.0', punycode: '2.0.0' },
        devDependencies: { 'lib-dev-only': '1.0.0' },
      })
      fs.mkdirSync(path.join(tmpDir, 'node_modules/@scope'), {
        recursive: true,
      })
      fs.symlinkSync(
        path.join(tmpDir, 'lib'),
        path.join(tmpDir, 'node_modules/@scope/lib')
      )
      write('node_modules/a', { dependencies: { c: '2.0.0' } })
      write('node_modules/a/node_modules/c', {})
      write('node_modules/b', {})
      write('node_modules/c', {})
      write('node_modules/punycode', {})
      write('node_modules/dev-only', {})
      write('node_modules/lib-dev-only', {})

      expect(
        [...getProductionPackageDirectories(path.join(tmpDir, 'portal'))]
          .map((dir) => path.relative(tmpDir, dir))
          .sort()
      ).toEqual([
        'lib',
        'node_modules/a',
        'node_modules/a/node_modules/c',
        'node_modules/b',
        'node_modules/punycode',
      ])
    })

    it('includes what the Portal and @dnb/eufemia bring in', () => {
      const names = [...getProductionPackageDirectories()].map((dir) =>
        dir.slice(
          dir.lastIndexOf('/node_modules/') + '/node_modules/'.length
        )
      )

      expect(names).toContain('react-router')
      expect(names).toContain('date-fns')
      expect(names).toContain('unified')
      expect(names).not.toContain('vite')
    })
  })

  describe('plugin', () => {
    const plugin = productionDependenciesPlugin()

    it('only runs for the client build', async () => {
      const isActive = async (
        command: 'build' | 'serve',
        build: InlineConfig['build'] = {}
      ) =>
        (
          await resolveConfig(
            {
              configFile: false,
              logLevel: 'silent',
              plugins: [productionDependenciesPlugin()],
              build,
            },
            command
          )
        ).plugins.some(({ name }) => name === plugin.name)

      expect(await isActive('build')).toBe(true)
      // prerender.mjs builds the server bundle like this
      expect(await isActive('build', { ssr: 'entry-server.tsx' })).toBe(
        false
      )
      expect(await isActive('serve')).toBe(false)
    })

    it('fails the build with the bundled packages that ship code', () => {
      const error = vi.fn()
      const generateBundle = plugin.generateBundle as (
        this: object,
        options: object,
        bundle: object
      ) => void

      generateBundle.call(
        { error },
        {},
        {
          'app.js': {
            type: 'chunk',
            modules: {
              '/repo/packages/dnb-design-system-portal/src/App.tsx': {
                renderedLength: 100,
              },
              '/repo/node_modules/not-declared/a.js': {
                renderedLength: 10,
              },
              '/repo/node_modules/no-code/index.js': { renderedLength: 0 },
            },
          },
          'app.css': { type: 'asset' },
        }
      )

      expect(error).toHaveBeenCalledTimes(1)
      expect(error.mock.calls[0][0]).toContain(': not-declared.')
    })
  })
})
