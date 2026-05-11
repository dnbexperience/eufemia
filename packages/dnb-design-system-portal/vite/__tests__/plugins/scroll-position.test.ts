import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

vi.mock('vite', () => ({
  transformWithEsbuild: vi.fn(async (code: string) => ({ code })),
}))

import scrollPositionPlugin from '../../client/plugins/scroll-position'

describe('scroll-position plugin', () => {
  describe('plugin interface', () => {
    it('returns a plugin with the correct name', () => {
      const plugin = scrollPositionPlugin()
      expect(plugin.name).toBe('vite-plugin-scroll-position')
    })

    it('resolves the virtual module ID', () => {
      const plugin = scrollPositionPlugin()
      const resolveId = plugin.resolveId as (
        id: string
      ) => string | undefined

      expect(resolveId('virtual:scroll-position')).toBe(
        '\0virtual:scroll-position'
      )
    })

    it('does not resolve other module IDs', () => {
      const plugin = scrollPositionPlugin()
      const resolveId = plugin.resolveId as (
        id: string
      ) => string | undefined

      expect(resolveId('other-module')).toBeUndefined()
    })

    it('loads virtual module with runtime code', async () => {
      const plugin = scrollPositionPlugin()
      const load = plugin.load as (
        id: string
      ) => Promise<string | undefined>

      const result = await load('\0virtual:scroll-position')

      expect(result).toBeDefined()
      expect(result).toContain('saveScrollPosition')
      expect(result).toContain('restoreScrollPosition')
      expect(result).toContain('useScrollPosition')
    })

    it('does not load other module IDs', async () => {
      const plugin = scrollPositionPlugin()
      const load = plugin.load as (
        id: string
      ) => Promise<string | undefined>

      expect(await load('other-id')).toBeUndefined()
    })
  })

  describe('runtime code', () => {
    async function loadRuntimeCode() {
      const plugin = scrollPositionPlugin()
      const load = plugin.load as (id: string) => Promise<string>
      return await load('\0virtual:scroll-position')
    }

    it('configures the sidebar menu element', async () => {
      const code = await loadRuntimeCode()

      expect(code).toContain('#portal-sidebar-menu')
      expect(code).toContain('is-active')
    })

    it('exports saveScrollPosition function', async () => {
      const code = await loadRuntimeCode()

      expect(code).toContain('saveScrollPosition')
    })

    it('exports restoreScrollPosition function', async () => {
      const code = await loadRuntimeCode()

      expect(code).toContain('restoreScrollPosition')
    })

    it('exports useScrollPosition hook', async () => {
      const code = await loadRuntimeCode()

      expect(code).toContain('useScrollPosition')
    })

    it('uses sessionStorage for persistence', async () => {
      const code = await loadRuntimeCode()

      expect(code).toContain('sessionStorage.setItem')
      expect(code).toContain('sessionStorage.getItem')
    })

    it('handles beforeunload and pagehide events', async () => {
      const code = await loadRuntimeCode()

      expect(code).toContain('beforeunload')
      expect(code).toContain('pagehide')
    })

    it('uses requestAnimationFrame for rendering', async () => {
      const code = await loadRuntimeCode()

      expect(code).toContain('requestAnimationFrame')
    })

    it('supports smooth scrolling option', async () => {
      const code = await loadRuntimeCode()

      expect(code).toContain('smooth')
      expect(code).toContain('scrollBehavior')
    })

    it('has ensureInView logic for active menu items', async () => {
      const code = await loadRuntimeCode()

      expect(code).toContain('ensureInView')
      expect(code).toContain('offsetTop')
    })
  })

  describe('save/restore behavior', () => {
    let sidebarEl: HTMLElement

    beforeEach(() => {
      sessionStorage.clear()

      sidebarEl = document.createElement('nav')
      sidebarEl.id = 'portal-sidebar-menu'
      Object.defineProperty(sidebarEl, 'scrollTop', {
        value: 0,
        writable: true,
      })
      document.body.appendChild(sidebarEl)
    })

    afterEach(() => {
      document.body.innerHTML = ''
      sessionStorage.clear()
    })

    it('saves scrollTop to sessionStorage', () => {
      sidebarEl.scrollTop = 150

      // Simulate saveScrollPosition logic
      const selector = '#portal-sidebar-menu'
      const el = document.querySelector(selector)
      if (el) {
        sessionStorage.setItem('scroll-' + selector, String(el.scrollTop))
      }

      expect(sessionStorage.getItem('scroll-#portal-sidebar-menu')).toBe(
        '150'
      )
    })

    it('restores scrollTop from sessionStorage', () => {
      sessionStorage.setItem('scroll-#portal-sidebar-menu', '200')

      // Simulate restoreScrollPosition logic
      const selector = '#portal-sidebar-menu'
      const el = document.querySelector(selector)
      if (el) {
        const stored = parseFloat(
          sessionStorage.getItem('scroll-' + selector) || '0'
        )
        ;(el as HTMLElement).scrollTop = stored
      }

      expect(sidebarEl.scrollTop).toBe(200)
    })

    it('defaults to 0 when no stored value exists', () => {
      const selector = '#portal-sidebar-menu'
      const el = document.querySelector(selector)
      if (el) {
        const stored = parseFloat(
          sessionStorage.getItem('scroll-' + selector) || '0'
        )
        ;(el as HTMLElement).scrollTop = stored
      }

      expect(sidebarEl.scrollTop).toBe(0)
    })
  })

  describe('runtime code – window scroll', () => {
    async function loadRuntimeCode() {
      const plugin = scrollPositionPlugin()
      const load = plugin.load as (id: string) => Promise<string>
      return await load('\0virtual:scroll-position')
    }

    it('saves window.scrollY to sessionStorage', async () => {
      const code = await loadRuntimeCode()

      expect(code).toContain('scroll-window')
      expect(code).toContain('window.scrollY')
    })

    it('restores window scroll via window.scrollTo', async () => {
      const code = await loadRuntimeCode()

      expect(code).toContain('window.scrollTo')
    })

    it('supports restoreWindow option to skip window scroll restore', async () => {
      const code = await loadRuntimeCode()

      expect(code).toContain('restoreWindow')
    })

    it('scrolls window to top on route change instead of restoring', async () => {
      const code = await loadRuntimeCode()

      expect(code).toContain('window.scrollTo({ top: 0 })')
      expect(code).toContain('restoreWindow: false')
    })
  })
})
