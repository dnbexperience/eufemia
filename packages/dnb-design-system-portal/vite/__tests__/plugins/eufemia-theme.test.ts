import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type * as EufemiaPrebuildModule from '../../client/plugins/eufemia-prebuild'
import type * as GlobModule from 'glob'
import eufemiaThemePlugin, {
  getDefaultConfig,
} from '../../client/plugins/eufemia-theme'

describe('eufemia-theme plugin', () => {
  describe('getDefaultConfig', () => {
    it('returns the expected default themes', () => {
      const config = getDefaultConfig()
      expect(Object.keys(config.themes)).toEqual([
        'ui',
        'sbanken',
        'eiendom',
        'carnegie',
      ])
    })

    it('has ui as the default theme', () => {
      const config = getDefaultConfig()
      expect(config.defaultTheme).toBe('ui')
    })

    it('includes the expected file glob patterns', () => {
      const config = getDefaultConfig()
      expect(config.filesGlobs).toContainEqual(
        expect.stringContaining('dnb-ui-core.scss')
      )
      expect(config.filesGlobs).toContainEqual(
        expect.stringContaining('theme-{basis,components,dark-mode}')
      )
    })

    it('uses build style globs when prebuild styles are requested', () => {
      const config = getDefaultConfig(true)

      expect(config.filesGlobs).toContain(
        '**/build/style/dnb-ui-core.scss'
      )
      expect(config.filesGlobs).toContain(
        '**/build/style/themes/**/*-theme-{basis,components,dark-mode}.scss'
      )
      expect(config.filesGlobs).toContain(
        '**/build/extensions/payment-card/**/dnb-*.scss'
      )
    })

    it('has theme matchers for extracting theme names', () => {
      const config = getDefaultConfig()
      expect(config.themeMatchers).toHaveLength(2)

      const match1 = '/themes/ui-theme-components.scss'.match(
        config.themeMatchers[0]
      )
      expect(match1?.[1]).toBe('components')

      const match2 = '/themes/sbanken/something.scss'.match(
        config.themeMatchers[1]
      )
      expect(match2?.[1]).toBe('sbanken')
    })
  })

  describe('plugin interface', () => {
    it('returns a plugin with the correct name', () => {
      const plugin = eufemiaThemePlugin()
      expect(plugin.name).toBe('vite-plugin-eufemia-theme')
    })

    it('resolves the virtual module ID', () => {
      const plugin = eufemiaThemePlugin()
      const resolveId = plugin.resolveId as (
        id: string
      ) => string | undefined
      expect(resolveId('virtual:eufemia-theme-styles')).toBe(
        '\0virtual:eufemia-theme-styles'
      )
      expect(resolveId('other-module')).toBeUndefined()
    })

    it('resolves per-theme virtual module IDs', () => {
      const plugin = eufemiaThemePlugin()
      const resolveId = plugin.resolveId as (
        id: string
      ) => string | undefined
      expect(resolveId('virtual:eufemia-theme-ui')).toBe(
        '\0virtual:eufemia-theme-ui'
      )
      expect(resolveId('virtual:eufemia-theme-sbanken')).toBe(
        '\0virtual:eufemia-theme-sbanken'
      )
      expect(resolveId('virtual:eufemia-theme-eiendom')).toBe(
        '\0virtual:eufemia-theme-eiendom'
      )
      expect(resolveId('virtual:eufemia-theme-carnegie')).toBe(
        '\0virtual:eufemia-theme-carnegie'
      )
    })

    it('generates dev mode style code from load()', () => {
      const plugin = eufemiaThemePlugin()
      const load = plugin.load as (id: string) => string | undefined
      const code = load('\0virtual:eufemia-theme-styles')

      expect(code).toBeDefined()
      expect(code).toContain('__EUFEMIA_THEME_FILES__')
      expect(code).toContain('__EUFEMIA_THEME_NAMES__')
      expect(code).toContain('__EUFEMIA_DEFAULT_THEME__')
      expect(code).toContain('applyThemeStyles')
    })

    it('generates build mode style code after configResolved', () => {
      const plugin = eufemiaThemePlugin()

      // Simulate build mode
      const configResolved = plugin.configResolved as (config: {
        command: string
      }) => void
      configResolved({ command: 'build' })

      const load = plugin.load as (id: string) => string | undefined
      const code = load('\0virtual:eufemia-theme-styles')

      expect(code).toBeDefined()
      // Build mode should NOT have dev-mode style toggling
      expect(code).not.toContain('applyThemeStyles')
      expect(code).not.toContain('__EUFEMIA_THEME_FILES__')
      // Build mode should have lazy loaders for ALL themes including default
      expect(code).toContain('__loadEufemiaTheme')
      expect(code).toContain("import('virtual:eufemia-theme-ui')")
      expect(code).toContain("import('virtual:eufemia-theme-sbanken')")
      expect(code).toContain("import('virtual:eufemia-theme-eiendom')")
      expect(code).toContain("import('virtual:eufemia-theme-carnegie')")
      // Build mode should disable old theme CSS when switching
      expect(code).toContain('themeLinks')
      expect(code).toContain('.disabled')
      // Build mode should add theme class to <body> for portal CSS cascade
      expect(code).toContain('eufemia-theme__')
      expect(code).toContain('document.body')
      // Build mode should auto-load the initial theme on startup
      expect(code).toContain('localStorage')
      // Build mode should wait for CSS load event before disabling old theme
      expect(code).toContain('addEventListener')
      expect(code).toContain("'load'")
      // Build mode should have an activateTheme helper
      expect(code).toContain('activateTheme')
      // Build mode should check link.sheet for already-loaded CSS
      expect(code).toContain('.sheet')
      // Build mode should pick up all pre-injected theme links
      expect(code).toContain(
        "querySelectorAll('link[data-eufemia-theme]')"
      )
    })

    it('uses build style imports in build mode when a prebuild exists', async () => {
      vi.resetModules()

      vi.doMock('../../client/plugins/eufemia-prebuild', async () => {
        const actual = await vi.importActual<typeof EufemiaPrebuildModule>(
          '../../client/plugins/eufemia-prebuild'
        )

        return {
          ...actual,
          hasPrebuild: () => true,
        }
      })

      vi.doMock('glob', async () => {
        const actual = await vi.importActual<typeof GlobModule>('glob')

        return {
          ...actual,
          globSync: vi.fn((pattern: string) => {
            const normalized = pattern.replace(/\\/g, '/')

            if (normalized.includes('/build/style/dnb-ui-core.scss')) {
              return ['/mock/build/style/dnb-ui-core.scss']
            }

            if (
              normalized.includes(
                '/build/extensions/payment-card/**/dnb-*.scss'
              )
            ) {
              return [
                '/mock/build/extensions/payment-card/style/dnb-payment-card.scss',
              ]
            }

            return []
          }),
        }
      })

      try {
        const { default: createThemePlugin } =
          await import('../../client/plugins/eufemia-theme')
        const plugin = createThemePlugin()

        const configResolved = plugin.configResolved as (config: {
          command: string
        }) => void
        configResolved({ command: 'build' })

        const load = plugin.load as (id: string) => string | undefined
        const code = load('\0virtual:eufemia-theme-styles')

        expect(code).toContain('/build/style/')
        expect(code).not.toContain('/src/style/')
      } finally {
        vi.doUnmock('../../client/plugins/eufemia-prebuild')
        vi.doUnmock('glob')
        vi.resetModules()
      }
    })

    it('generates per-theme module code', () => {
      const plugin = eufemiaThemePlugin()
      const load = plugin.load as (id: string) => string | undefined
      const code = load('\0virtual:eufemia-theme-sbanken')

      expect(code).toBeDefined()
      expect(code).toContain('sbanken')
      // Should only import sbanken files, not other themes
      expect(code).not.toContain('eiendom')
      expect(code).not.toContain('carnegie')
    })

    it('returns nothing for non-virtual module IDs', () => {
      const plugin = eufemiaThemePlugin()
      const load = plugin.load as (id: string) => string | undefined
      expect(load('other-id')).toBeUndefined()
    })
  })

  describe('build mode __loadEufemiaTheme behavior', () => {
    let code: string

    beforeEach(() => {
      const plugin = eufemiaThemePlugin()
      const configResolved = plugin.configResolved as (config: {
        command: string
      }) => void
      configResolved({ command: 'build' })

      const load = plugin.load as (id: string) => string | undefined
      code = load('\0virtual:eufemia-theme-styles') || ''

      // Clean up DOM and globals between tests
      document.body.className = ''
      document.head.innerHTML = ''
      localStorage.clear()
      delete globalThis.__loadEufemiaTheme
    })

    afterEach(() => {
      delete globalThis.__loadEufemiaTheme
    })

    function createMockLink(
      themeName: string,
      opts?: { loaded?: boolean }
    ) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.setAttribute('data-eufemia-theme', themeName)
      link.href = `/assets/_virtual_eufemia-theme-${themeName}-abc123.css`
      if (opts?.loaded === false) {
        // Simulate a link that hasn't loaded yet (sheet is null)
        Object.defineProperty(link, 'sheet', {
          value: null,
          writable: true,
        })
      } else {
        Object.defineProperty(link, 'sheet', {
          value: {},
          writable: true,
        })
      }
      document.head.appendChild(link)
      return link
    }

    it('waits for pre-injected theme CSS to load before disabling the old theme', async () => {
      const uiLink = createMockLink('ui')
      const sbankenLink = createMockLink('sbanken', { loaded: false })
      sbankenLink.disabled = true

      // Evaluate the virtual module code with mock loaders
      const loaderSpy = vi.fn()
      const evalCode = code
        .replace(/import\([^)]+\)/g, '(loaderSpy(), Promise.resolve())')
        .replace(/import '[^']+';/g, '')
      const fn = new Function('loaderSpy', evalCode)
      fn(loaderSpy)

      const loadPromise = (window as any).__loadEufemiaTheme('sbanken')

      expect(loaderSpy).not.toHaveBeenCalled()
      expect(uiLink.disabled).toBe(false)
      expect(sbankenLink.disabled).toBe(false)

      sbankenLink.dispatchEvent(new Event('load'))

      await loadPromise

      expect(loaderSpy).not.toHaveBeenCalled()
      expect(sbankenLink.disabled).toBe(false)
      expect(uiLink.disabled).toBe(true)
      expect(
        document.body.classList.contains('eufemia-theme__sbanken')
      ).toBe(true)
    })

    it('activates a pre-injected loaded theme immediately without import()', async () => {
      const uiLink = createMockLink('ui')
      const sbankenLink = createMockLink('sbanken')
      sbankenLink.disabled = true

      const loaderSpy = vi.fn()
      const evalCode = code
        .replace(/import\([^)]+\)/g, '(loaderSpy(), Promise.resolve())')
        .replace(/import '[^']+';/g, '')
      const fn = new Function('loaderSpy', evalCode)
      fn(loaderSpy)

      await (window as any).__loadEufemiaTheme('sbanken')

      expect(loaderSpy).not.toHaveBeenCalled()
      expect(sbankenLink.disabled).toBe(false)
      expect(uiLink.disabled).toBe(true)
      expect(
        document.body.classList.contains('eufemia-theme__sbanken')
      ).toBe(true)
    })

    it('waits for CSS load event before disabling old theme', async () => {
      const uiLink = createMockLink('ui')

      // The new theme link will be "injected" by the import() mock
      let resolveImport: () => void
      const importPromise = new Promise<void>((r) => {
        resolveImport = r
      })

      const evalCode = code
        .replace(
          /import\('virtual:eufemia-theme-sbanken'\)/,
          'importPromise'
        )
        .replace(/import\([^)]+\)/g, 'Promise.resolve()')
        .replace(/import '[^']+';/g, '')
      const fn = new Function('importPromise', evalCode)
      fn(importPromise)

      // Create the sbanken link that the "import" will inject
      const sbankenLink = document.createElement('link')
      sbankenLink.rel = 'stylesheet'
      sbankenLink.href = '/assets/_virtual_eufemia-theme-sbanken-xyz.css'
      // Simulate unloaded state
      Object.defineProperty(sbankenLink, 'sheet', {
        value: null,
        writable: true,
        configurable: true,
      })
      document.head.appendChild(sbankenLink)

      // Start theme switch
      const loadPromise = (window as any).__loadEufemiaTheme('sbanken')

      // Resolve the import — link is in DOM but not yet loaded
      resolveImport!()
      await importPromise

      // Allow microtasks to process
      await new Promise((r) => setTimeout(r, 0))

      // Old theme should still be active (waiting for load event)
      expect(uiLink.disabled).toBe(false)

      // Simulate CSS fully loaded
      sbankenLink.dispatchEvent(new Event('load'))

      await loadPromise

      // Now old theme should be disabled
      expect(uiLink.disabled).toBe(true)
      expect(sbankenLink.disabled).toBe(false)
      expect(
        document.body.classList.contains('eufemia-theme__sbanken')
      ).toBe(true)
    })

    it('activates immediately when link.sheet is already set', async () => {
      const uiLink = createMockLink('ui')

      const evalCode = code
        .replace(/import\([^)]+\)/g, 'Promise.resolve()')
        .replace(/import '[^']+';/g, '')
      const fn = new Function(evalCode)
      fn()

      // Create a sbanken link with a truthy sheet (simulates cached CSS)
      const sbankenLink = document.createElement('link')
      sbankenLink.rel = 'stylesheet'
      sbankenLink.href = '/assets/_virtual_eufemia-theme-sbanken-xyz.css'
      // jsdom doesn't set sheet, so mock it as truthy
      Object.defineProperty(sbankenLink, 'sheet', {
        value: {},
        configurable: true,
      })
      document.head.appendChild(sbankenLink)

      await (window as any).__loadEufemiaTheme('sbanken')

      expect(uiLink.disabled).toBe(true)
      expect(sbankenLink.disabled).toBe(false)
    })
  })
})
