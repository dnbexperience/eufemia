import { describe, it, expect } from 'vitest'
import prefetchOnHoverPlugin from '../../client/plugins/prefetch-on-hover'

describe('prefetch-on-hover plugin', () => {
  describe('plugin interface', () => {
    it('returns a plugin with the correct name', () => {
      const plugin = prefetchOnHoverPlugin()
      expect(plugin.name).toBe('vite-plugin-prefetch-on-hover')
    })

    it('resolves the virtual module ID', () => {
      const plugin = prefetchOnHoverPlugin()
      const resolveId = plugin.resolveId as (
        id: string
      ) => string | undefined

      expect(resolveId('virtual:prefetch-on-hover')).toBe(
        '\0virtual:prefetch-on-hover'
      )
    })

    it('does not resolve other module IDs', () => {
      const plugin = prefetchOnHoverPlugin()
      const resolveId = plugin.resolveId as (
        id: string
      ) => string | undefined

      expect(resolveId('other-module')).toBeUndefined()
    })

    it('loads virtual module with runtime code', () => {
      const plugin = prefetchOnHoverPlugin()
      const load = plugin.load as (id: string) => string | undefined

      const result = load('\0virtual:prefetch-on-hover')

      expect(result).toBeDefined()
      expect(result).toContain('setupPrefetchOnHover')
      expect(result).toContain('usePrefetchOnHover')
    })

    it('does not load other module IDs', () => {
      const plugin = prefetchOnHoverPlugin()
      const load = plugin.load as (id: string) => string | undefined

      expect(load('other-id')).toBeUndefined()
    })
  })

  describe('runtime code', () => {
    it('imports routes from virtual:portal-pages', () => {
      const plugin = prefetchOnHoverPlugin()
      const load = plugin.load as (id: string) => string | undefined
      const code = load('\0virtual:prefetch-on-hover')!

      expect(code).toContain("from 'virtual:portal-pages'")
    })

    it('exports setupPrefetchOnHover function', () => {
      const plugin = prefetchOnHoverPlugin()
      const load = plugin.load as (id: string) => string | undefined
      const code = load('\0virtual:prefetch-on-hover')!

      expect(code).toContain('export function setupPrefetchOnHover()')
    })

    it('exports usePrefetchOnHover hook', () => {
      const plugin = prefetchOnHoverPlugin()
      const load = plugin.load as (id: string) => string | undefined
      const code = load('\0virtual:prefetch-on-hover')!

      expect(code).toContain('export function usePrefetchOnHover()')
    })

    it('listens to pointerover and focusin events', () => {
      const plugin = prefetchOnHoverPlugin()
      const load = plugin.load as (id: string) => string | undefined
      const code = load('\0virtual:prefetch-on-hover')!

      expect(code).toContain("'pointerover'")
      expect(code).toContain("'focusin'")
    })

    it('builds a route map for O(1) lookups', () => {
      const plugin = prefetchOnHoverPlugin()
      const load = plugin.load as (id: string) => string | undefined
      const code = load('\0virtual:prefetch-on-hover')!

      expect(code).toContain('new Map()')
      expect(code).toContain('routeMap.set(route.path')
    })

    it('tracks prefetched paths to avoid duplicate imports', () => {
      const plugin = prefetchOnHoverPlugin()
      const load = plugin.load as (id: string) => string | undefined
      const code = load('\0virtual:prefetch-on-hover')!

      expect(code).toContain('prefetchedPaths')
      expect(code).toContain('new Set()')
    })

    it('skips download links, external links, and non-self targets', () => {
      const plugin = prefetchOnHoverPlugin()
      const load = plugin.load as (id: string) => string | undefined
      const code = load('\0virtual:prefetch-on-hover')!

      expect(code).toContain("'download'")
      expect(code).toContain("'external'")
      expect(code).toContain("'_self'")
    })

    it('checks same-origin before prefetching', () => {
      const plugin = prefetchOnHoverPlugin()
      const load = plugin.load as (id: string) => string | undefined
      const code = load('\0virtual:prefetch-on-hover')!

      expect(code).toContain('url.origin !== window.location.origin')
    })
  })
})
