import { describe, it, expect } from 'vitest'
import catchLinksPlugin from '../../client/plugins/catch-links'

describe('catch-links plugin', () => {
  describe('plugin interface', () => {
    it('returns a plugin with the correct name', () => {
      const plugin = catchLinksPlugin()
      expect(plugin.name).toBe('vite-plugin-catch-links')
    })

    it('resolves the virtual module ID', () => {
      const plugin = catchLinksPlugin()
      const resolveId = plugin.resolveId as (
        id: string
      ) => string | undefined

      expect(resolveId('virtual:catch-links')).toBe(
        '\0virtual:catch-links'
      )
    })

    it('does not resolve other module IDs', () => {
      const plugin = catchLinksPlugin()
      const resolveId = plugin.resolveId as (
        id: string
      ) => string | undefined

      expect(resolveId('other-module')).toBeUndefined()
    })

    it('loads virtual module with runtime code', () => {
      const plugin = catchLinksPlugin()
      const load = plugin.load as (id: string) => string | undefined

      const result = load('\0virtual:catch-links')

      expect(result).toBeDefined()
      expect(result).toContain('useCatchLinks')
    })

    it('does not load other module IDs', () => {
      const plugin = catchLinksPlugin()
      const load = plugin.load as (id: string) => string | undefined

      expect(load('other-id')).toBeUndefined()
    })
  })

  describe('runtime code', () => {
    it('imports useNavigate from react-router-dom', () => {
      const plugin = catchLinksPlugin()
      const load = plugin.load as (id: string) => string | undefined
      const code = load('\0virtual:catch-links')!

      expect(code).toContain("from 'react-router-dom'")
      expect(code).toContain('useNavigate')
    })

    it('exports useCatchLinks hook', () => {
      const plugin = catchLinksPlugin()
      const load = plugin.load as (id: string) => string | undefined
      const code = load('\0virtual:catch-links')!

      expect(code).toContain('export function useCatchLinks()')
    })

    it('listens to click events', () => {
      const plugin = catchLinksPlugin()
      const load = plugin.load as (id: string) => string | undefined
      const code = load('\0virtual:catch-links')!

      expect(code).toContain("'click'")
      expect(code).toContain('addEventListener')
      expect(code).toContain('removeEventListener')
    })

    it('checks for modifier keys', () => {
      const plugin = catchLinksPlugin()
      const load = plugin.load as (id: string) => string | undefined
      const code = load('\0virtual:catch-links')!

      expect(code).toContain('e.metaKey')
      expect(code).toContain('e.altKey')
      expect(code).toContain('e.ctrlKey')
      expect(code).toContain('e.shiftKey')
    })

    it('skips download links, external links, and non-self targets', () => {
      const plugin = catchLinksPlugin()
      const load = plugin.load as (id: string) => string | undefined
      const code = load('\0virtual:catch-links')!

      expect(code).toContain("'download'")
      expect(code).toContain("'external'")
      expect(code).toContain("'_self'")
    })

    it('prevents default and navigates for internal links', () => {
      const plugin = catchLinksPlugin()
      const load = plugin.load as (id: string) => string | undefined
      const code = load('\0virtual:catch-links')!

      expect(code).toContain('e.preventDefault()')
      expect(code).toContain('navigateFn(')
      expect(code).toContain('url.pathname + url.search + url.hash')
    })
  })
})
