import { describe, it, expect, vi, afterEach } from 'vitest'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import productionDependenciesPlugin, {
  findUndeclaredPackages,
  getProductionDependencies,
} from '../../client/plugins/production-dependencies'

const portal = '/repo/packages/dnb-design-system-portal'
const modules = (graph: Record<string, string[]>) => (id: string) =>
  graph[id] ? { importedIds: graph[id], dynamicallyImportedIds: [] } : null

describe('production-dependencies plugin', () => {
  describe('findUndeclaredPackages', () => {
    it('reports bundled packages that Portal code imports without declaring them', () => {
      const moduleIds = [
        `${portal}/src/App.tsx`,
        '/repo/node_modules/react-router/dist/index.mjs',
        '/repo/node_modules/react/index.js',
        '/repo/node_modules/@scope/pkg/index.js',
      ]
      const getModuleInfo = modules({
        [`${portal}/src/App.tsx`]: [
          '/repo/node_modules/react-router/dist/index.mjs',
          '/repo/node_modules/react/index.js',
          '/repo/node_modules/@scope/pkg/index.js',
        ],
      })

      expect(
        findUndeclaredPackages(
          moduleIds,
          getModuleInfo,
          new Set(['react'])
        )
      ).toEqual(['@scope/pkg', 'react-router'])
    })

    it('reports dynamic imports and imports from linked workspaces', () => {
      const moduleIds = [
        'virtual:portal-pages',
        '/repo/packages/dnb-eufemia/src/Component.tsx',
        '/repo/node_modules/a/index.js',
        '/repo/node_modules/b/index.js',
      ]
      const getModuleInfo = (id: string) =>
        ({
          'virtual:portal-pages': {
            importedIds: [],
            dynamicallyImportedIds: ['/repo/node_modules/a/index.js'],
          },
          '/repo/packages/dnb-eufemia/src/Component.tsx': {
            importedIds: ['/repo/node_modules/b/index.js'],
            dynamicallyImportedIds: [],
          },
        })[id] ?? null

      expect(
        findUndeclaredPackages(moduleIds, getModuleInfo, new Set())
      ).toEqual(['a', 'b'])
    })

    it('ignores packages that only other packages import', () => {
      const moduleIds = [
        `${portal}/src/App.tsx`,
        '/repo/node_modules/react-markdown/index.js',
        '/repo/node_modules/react-markdown/node_modules/unified/index.js',
      ]
      const getModuleInfo = modules({
        [`${portal}/src/App.tsx`]: [
          '/repo/node_modules/react-markdown/index.js',
        ],
        '/repo/node_modules/react-markdown/index.js': [
          '/repo/node_modules/react-markdown/node_modules/unified/index.js',
        ],
      })

      expect(
        findUndeclaredPackages(
          moduleIds,
          getModuleInfo,
          new Set(['react-markdown'])
        )
      ).toEqual([])
    })

    it('ignores imported packages that were left out of the bundle', () => {
      const moduleIds = [`${portal}/src/slug.mjs`]
      const getModuleInfo = modules({
        [`${portal}/src/slug.mjs`]: [
          '/repo/node_modules/remark-mdx/index.js',
        ],
      })

      expect(
        findUndeclaredPackages(moduleIds, getModuleInfo, new Set())
      ).toEqual([])
    })
  })

  describe('getProductionDependencies', () => {
    let tmpDir: string

    afterEach(() => {
      fs.rmSync(tmpDir, { recursive: true, force: true })
    })

    it('reads the dependencies of the Portal and of its linked workspaces', () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'production-deps-'))
      const write = (file: string, manifest: object) => {
        fs.mkdirSync(path.dirname(path.join(tmpDir, file)), {
          recursive: true,
        })
        fs.writeFileSync(path.join(tmpDir, file), JSON.stringify(manifest))
      }
      write('portal/package.json', {
        dependencies: { a: '1.0.0', '@scope/lib': 'workspace:*' },
        devDependencies: { 'dev-only': '1.0.0' },
      })
      write('node_modules/@scope/lib/package.json', {
        dependencies: { b: '1.0.0', portal: 'workspace:*' },
        devDependencies: { 'lib-dev-only': '1.0.0' },
      })
      write('node_modules/portal/package.json', {})

      expect(
        [
          ...getProductionDependencies(
            path.join(tmpDir, 'portal/package.json')
          ),
        ].sort()
      ).toEqual(['@scope/lib', 'a', 'b', 'portal'])
    })

    it('includes the dependencies of @dnb/eufemia', () => {
      const declared = getProductionDependencies()

      expect(declared.has('react-router')).toBe(true)
      expect(declared.has('date-fns')).toBe(true)
      expect(declared.has('vite')).toBe(false)
    })
  })

  describe('plugin', () => {
    const plugin = productionDependenciesPlugin()
    const apply = plugin.apply as (
      config: object,
      env: { command: string; mode: string; isSsrBuild?: boolean }
    ) => boolean

    it('only runs for the client build', () => {
      expect(apply({}, { command: 'build', mode: 'production' })).toBe(
        true
      )
      expect(
        apply(
          {},
          { command: 'build', mode: 'production', isSsrBuild: true }
        )
      ).toBe(false)
      expect(apply({}, { command: 'serve', mode: 'development' })).toBe(
        false
      )
    })

    it('fails the build with the undeclared packages', () => {
      const error = vi.fn()
      const generateBundle = plugin.generateBundle as (
        this: object,
        options: object,
        bundle: object
      ) => void

      generateBundle.call(
        {
          error,
          getModuleInfo: modules({
            [`${portal}/src/App.tsx`]: [
              '/repo/node_modules/not-declared/a.js',
            ],
          }),
        },
        {},
        {
          'app.js': {
            type: 'chunk',
            moduleIds: [
              `${portal}/src/App.tsx`,
              '/repo/node_modules/not-declared/a.js',
            ],
          },
          'app.css': { type: 'asset' },
        }
      )

      expect(error).toHaveBeenCalledWith(
        expect.stringContaining('not-declared')
      )
    })
  })
})
