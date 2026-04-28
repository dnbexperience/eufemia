import React, { act } from 'react'
import { render } from '@testing-library/react'
import Context from '../Context'
import type { ThemeAllProps } from '../Theme'
import Theme, { getTheme, setTheme } from '../Theme'
import {
  Autocomplete,
  Dialog,
  Drawer,
  Dropdown,
  Tooltip,
} from '../../components'

describe('Theme', () => {
  it('renders with props as an object', () => {
    const props: ThemeAllProps = {}

    render(<Theme {...props} />)
    expect(document.querySelector('.eufemia-theme')).toBeInTheDocument()
  })

  it('sets name and variant as HTML classes', () => {
    render(
      <Theme name="eiendom" variant="soft">
        content
      </Theme>
    )

    const element = document.querySelector('.eufemia-theme')
    expect(Array.from(element.classList)).toEqual([
      'eufemia-theme',
      'eufemia-theme__eiendom',
      'eufemia-theme__eiendom--soft',
    ])
  })

  it('supports nested themes', () => {
    render(
      <Theme id="theme-1" name="eiendom">
        <Theme id="theme-2" variant="soft">
          content
        </Theme>
      </Theme>
    )

    const element1 = document.querySelector('#theme-1')
    const element2 = document.querySelector('#theme-2')
    expect(Array.from(element1.classList)).toEqual([
      'eufemia-theme',
      'eufemia-theme__eiendom',
    ])
    expect(Array.from(element2.classList)).toEqual([
      'eufemia-theme',
      'eufemia-theme__eiendom',
      'eufemia-theme__eiendom--soft',
    ])
  })

  it('sets size as HTML classes', () => {
    render(<Theme size="basis">content</Theme>)

    const element = document.querySelector('.eufemia-theme')
    expect(Array.from(element.classList)).toEqual([
      'eufemia-theme',
      'eufemia-theme__size--basis',
    ])
  })

  it('sets contrast-mode as HTML classes', () => {
    render(<Theme contrastMode>content</Theme>)

    const element = document.querySelector('.eufemia-theme')
    expect(Array.from(element.classList)).toEqual([
      'eufemia-theme',
      'eufemia-theme__contrast-mode',
    ])
  })

  it('sets colorScheme="dark" as HTML class', () => {
    render(<Theme colorScheme="dark">content</Theme>)

    const element = document.querySelector('.eufemia-theme')
    expect(Array.from(element.classList)).toEqual([
      'eufemia-theme',
      'eufemia-theme__color-scheme--dark',
    ])
  })

  it('sets colorScheme="light" as HTML class', () => {
    render(<Theme colorScheme="light">content</Theme>)

    const element = document.querySelector('.eufemia-theme')
    expect(Array.from(element.classList)).toEqual([
      'eufemia-theme',
      'eufemia-theme__color-scheme--light',
    ])
  })

  it('sets colorScheme="auto" as HTML class', () => {
    const matchMediaOriginal = window.matchMedia
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      media: query,
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }))

    render(<Theme colorScheme="auto">content</Theme>)

    const element = document.querySelector('.eufemia-theme')
    expect(Array.from(element.classList)).toEqual([
      'eufemia-theme',
      'eufemia-theme__color-scheme--light',
    ])

    window.matchMedia = matchMediaOriginal
  })

  it('sets colorScheme="auto" and resolves dark mode via matchMedia', () => {
    const matchMediaOriginal = window.matchMedia
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      media: query,
      matches: true,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }))

    render(<Theme colorScheme="auto">content</Theme>)

    const element = document.querySelector('.eufemia-theme')
    expect(Array.from(element.classList)).toEqual([
      'eufemia-theme',
      'eufemia-theme__color-scheme--dark',
    ])

    window.matchMedia = matchMediaOriginal
  })

  it('updates colorScheme="auto" when system preference changes', () => {
    const matchMediaOriginal = window.matchMedia
    let listener: (event: { matches: boolean }) => void = null
    let matches = false

    window.matchMedia = jest.fn().mockImplementation((query) => ({
      media: query,
      get matches() {
        return matches
      },
      addEventListener: jest.fn((eventName, callback) => {
        if (eventName === 'change') {
          listener = callback
        }
      }),
      removeEventListener: jest.fn(),
    }))

    render(<Theme colorScheme="auto">content</Theme>)

    const element = document.querySelector('.eufemia-theme')
    expect(Array.from(element.classList)).toEqual([
      'eufemia-theme',
      'eufemia-theme__color-scheme--light',
    ])

    matches = true
    act(() => {
      listener?.({ matches: true })
    })

    expect(Array.from(element.classList)).toEqual([
      'eufemia-theme',
      'eufemia-theme__color-scheme--dark',
    ])

    window.matchMedia = matchMediaOriginal
  })

  it('provides surface through the theme context', () => {
    let receivedTheme = null

    const ThemeConsumer = () => {
      receivedTheme = React.useContext(Context)?.theme

      return null
    }

    render(
      <Theme.Context surface="dark">
        <ThemeConsumer />
      </Theme.Context>
    )

    expect(receivedTheme).toEqual(
      expect.objectContaining({
        surface: 'dark',
      })
    )
  })

  it('resets surface to default when nested inside a dark surface theme', () => {
    let receivedTheme = null

    const ThemeConsumer = () => {
      receivedTheme = React.useContext(Context)?.theme

      return null
    }

    render(
      <Theme.Context surface="dark">
        <Theme.Context surface="light">
          <ThemeConsumer />
        </Theme.Context>
      </Theme.Context>
    )

    expect(receivedTheme).toEqual(
      expect.objectContaining({
        surface: 'light',
      })
    )
  })

  it('inherits surface when not set', () => {
    let receivedTheme = null

    const ThemeConsumer = () => {
      receivedTheme = React.useContext(Context)?.theme

      return null
    }

    render(
      <Theme.Context surface="dark">
        <Theme.Context>
          <ThemeConsumer />
        </Theme.Context>
      </Theme.Context>
    )

    expect(receivedTheme).toEqual(
      expect.objectContaining({
        surface: 'dark',
      })
    )
  })

  it('does not set surface as HTML class', () => {
    render(<Theme surface="dark">content</Theme>)

    const element = document.querySelector('.eufemia-theme')
    expect(Array.from(element.classList)).toEqual(['eufemia-theme'])
  })

  it('does not set surface as HTML classes when "light"', () => {
    render(<Theme surface="light">content</Theme>)

    const element = document.querySelector('.eufemia-theme')
    expect(Array.from(element.classList)).toEqual(['eufemia-theme'])
  })

  it('resets surface to undefined when "initial" inside a dark surface context', () => {
    let receivedTheme = null

    const ThemeConsumer = () => {
      receivedTheme = React.useContext(Context)?.theme

      return null
    }

    render(
      <Theme.Context surface="dark">
        <Theme.Context surface="initial">
          <ThemeConsumer />
        </Theme.Context>
      </Theme.Context>
    )

    expect(receivedTheme.surface).toBeUndefined()
  })

  it('sets additional attributes', () => {
    render(
      <Theme aria-label="custom label" element="section">
        content
      </Theme>
    )

    const element = document.querySelector('.eufemia-theme')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )
    expect(attributes).toEqual(['class', 'aria-label'])
  })

  it('uses custom element when set', () => {
    render(<Theme element="span">content</Theme>)

    const element = document.querySelector('.eufemia-theme')
    expect(element.tagName).toBe('SPAN')
  })

  it('uses custom component when set', () => {
    const Component = ({
      children,
      ref,
      ...rest
    }: {
      children?: React.ReactNode
      ref?: React.Ref<HTMLElement>
    }) => (
      <section {...rest} ref={ref}>
        {children}
      </section>
    )
    render(<Theme element={Component}>content</Theme>)

    const element = document.querySelector('.eufemia-theme')
    expect(element.tagName).toBe('SECTION')
  })

  it('Theme.Context provides theme without wrapper element', () => {
    const { getByText } = render(
      <Theme.Context name="eiendom" variant="soft">
        content
      </Theme.Context>
    )

    expect(
      document.querySelector('.eufemia-theme')
    ).not.toBeInTheDocument()
    expect(getByText('content')).toBeInTheDocument()
  })

  it('will omit element on false or fragment', () => {
    const { rerender } = render(<Theme element={false}>content</Theme>)

    expect(
      document.querySelector('.eufemia-theme')
    ).not.toBeInTheDocument()

    rerender(<Theme element={React.Fragment}>content</Theme>)

    expect(
      document.querySelector('.eufemia-theme')
    ).not.toBeInTheDocument()

    rerender(<Theme element="div">content</Theme>)

    expect(document.querySelector('.eufemia-theme')).toBeInTheDocument()
  })
})

describe('Portals', () => {
  it('have correct theme classes in dialog content', () => {
    render(
      <Theme name="eiendom" variant="soft" element={false}>
        <Dialog noAnimation open>
          content
        </Dialog>
      </Theme>
    )

    const themeElement = document.querySelector('.eufemia-theme')
    expect(Array.from(themeElement.classList)).toEqual(
      expect.arrayContaining([
        'dnb-core-style',
        'eufemia-portal-root',
        'eufemia-theme',
        'eufemia-theme__eiendom',
        'eufemia-theme__eiendom--soft',
      ])
    )
    expect(
      themeElement.querySelector('.dnb-dialog__root.dnb-modal__content')
    ).toBeInTheDocument()
    expect(document.querySelectorAll('.eufemia-theme')).toHaveLength(1)
  })

  it('have correct theme classes in drawer content', () => {
    render(
      <Theme name="eiendom" variant="soft" element={false}>
        <Drawer noAnimation open>
          content
        </Drawer>
      </Theme>
    )

    const themeElement = document.querySelector('.eufemia-theme')
    expect(Array.from(themeElement.classList)).toEqual(
      expect.arrayContaining([
        'dnb-core-style',
        'eufemia-portal-root',
        'eufemia-theme',
        'eufemia-theme__eiendom',
        'eufemia-theme__eiendom--soft',
      ])
    )
    expect(
      themeElement.querySelector(
        '.dnb-modal__content.dnb-modal__content--right.dnb-drawer__root'
      )
    ).toBeInTheDocument()
    expect(document.querySelectorAll('.eufemia-theme')).toHaveLength(1)
  })

  it('have correct theme classes in dropdown', () => {
    render(
      <Theme name="eiendom" variant="soft" element={false}>
        <Dropdown open noAnimation data={['A', 'B']} />
      </Theme>
    )

    const themeElement = document.querySelector('.eufemia-theme')
    expect(Array.from(themeElement.classList)).toEqual(
      expect.arrayContaining([
        'dnb-core-style',
        'eufemia-portal-root',
        'eufemia-theme',
        'eufemia-theme__eiendom',
        'eufemia-theme__eiendom--soft',
      ])
    )
    expect(
      themeElement.querySelector('.dnb-drawer-list__portal__style')
    ).toBeInTheDocument()
    expect(document.querySelectorAll('.eufemia-theme')).toHaveLength(1)
  })

  it('have correct theme classes in autocomplete', () => {
    render(
      <Theme name="eiendom" variant="soft" element={false}>
        <Autocomplete open noAnimation data={['A', 'B']} />
      </Theme>
    )

    const themeElement = document.querySelector('.eufemia-theme')
    expect(Array.from(themeElement.classList)).toEqual(
      expect.arrayContaining([
        'dnb-core-style',
        'eufemia-portal-root',
        'eufemia-theme',
        'eufemia-theme__eiendom',
        'eufemia-theme__eiendom--soft',
      ])
    )
    expect(
      themeElement.querySelector('.dnb-drawer-list__portal__style')
    ).toBeInTheDocument()
    expect(document.querySelectorAll('.eufemia-theme')).toHaveLength(1)
  })

  it('have correct theme classes in tooltip', () => {
    render(
      <Theme name="eiendom" variant="soft" element={false}>
        <button id="tooltip-target">Target</button>
        <Tooltip open noAnimation targetSelector="#tooltip-target" />
      </Theme>
    )

    const themeElement = document.querySelector('.eufemia-theme')
    expect(themeElement).toBeInTheDocument()

    expect(Array.from(themeElement.classList)).toEqual(
      expect.arrayContaining([
        'dnb-core-style',
        'eufemia-portal-root',
        'eufemia-theme',
        'eufemia-theme__eiendom',
        'eufemia-theme__eiendom--soft',
      ])
    )
    expect(document.querySelectorAll('.eufemia-theme')).toHaveLength(1)
  })

  describe('body color scheme sync', () => {
    afterEach(() => {
      document.body.className = ''
      delete globalThis.__eufemiaColorScheme
    })

    it('adds color-scheme class to body', () => {
      render(<Theme colorScheme="dark">content</Theme>)

      expect(
        document.body.classList.contains(
          'eufemia-theme__color-scheme--dark'
        )
      ).toBe(true)
    })

    it('removes old class when color scheme changes', () => {
      const { rerender } = render(
        <Theme colorScheme="dark">content</Theme>
      )

      expect(
        document.body.classList.contains(
          'eufemia-theme__color-scheme--dark'
        )
      ).toBe(true)

      rerender(<Theme colorScheme="light">content</Theme>)

      expect(
        document.body.classList.contains(
          'eufemia-theme__color-scheme--light'
        )
      ).toBe(true)
      expect(
        document.body.classList.contains(
          'eufemia-theme__color-scheme--dark'
        )
      ).toBe(false)
    })

    it('syncs element class imperatively', () => {
      render(<Theme colorScheme="dark">content</Theme>)

      const element = document.querySelector('.eufemia-theme')
      expect(
        element.classList.contains('eufemia-theme__color-scheme--dark')
      ).toBe(true)
    })
  })

  describe('globalThis.__eufemiaColorScheme', () => {
    afterEach(() => {
      delete globalThis.__eufemiaColorScheme
      document.body.className = ''
    })

    it('uses globalThis value for initial color scheme', () => {
      globalThis.__eufemiaColorScheme = 'dark'

      const matchMediaOriginal = window.matchMedia
      window.matchMedia = jest.fn().mockImplementation((query) => ({
        media: query,
        matches: true,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }))

      render(<Theme colorScheme="auto">content</Theme>)

      const element = document.querySelector('.eufemia-theme')
      expect(
        element.classList.contains('eufemia-theme__color-scheme--dark')
      ).toBe(true)

      window.matchMedia = matchMediaOriginal
    })

    it('cleans up globalThis value after first render', () => {
      globalThis.__eufemiaColorScheme = 'dark'

      const matchMediaOriginal = window.matchMedia
      window.matchMedia = jest.fn().mockImplementation((query) => ({
        media: query,
        matches: false,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }))

      render(<Theme colorScheme="auto">content</Theme>)

      expect(globalThis.__eufemiaColorScheme).toBeUndefined()

      window.matchMedia = matchMediaOriginal
    })
  })

  describe('getTheme and setTheme', () => {
    const STORAGE_KEY = 'eufemia-theme'

    afterEach(() => {
      window.localStorage.removeItem(STORAGE_KEY)
    })

    it('returns default theme when localStorage is empty', () => {
      const result = getTheme()
      expect(result).toEqual({ name: 'ui' })
    })

    it('returns custom default theme', () => {
      const result = getTheme('sbanken')
      expect(result).toEqual({ name: 'sbanken' })
    })

    it('reads persisted theme from localStorage', () => {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ name: 'eiendom', colorScheme: 'dark' })
      )

      const result = getTheme()
      expect(result.name).toBe('eiendom')
      expect(result.colorScheme).toBe('dark')
    })

    it('supports URL query override for theme name', () => {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ name: 'eiendom' })
      )

      window.history.replaceState({}, '', '?eufemia-theme=sbanken')

      const result = getTheme()
      expect(result.name).toBe('sbanken')

      window.history.replaceState({}, '', '/')
    })

    it('persists theme state to localStorage', () => {
      setTheme({ name: 'eiendom', colorScheme: 'dark' })

      const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
      expect(stored.name).toBe('eiendom')
      expect(stored.colorScheme).toBe('dark')
    })

    it('merges with existing state', () => {
      setTheme({ name: 'sbanken' })
      setTheme({ colorScheme: 'dark' })

      const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
      expect(stored.name).toBe('sbanken')
      expect(stored.colorScheme).toBe('dark')
    })

    it('calls callback with merged theme', () => {
      const callback = jest.fn()
      setTheme({ name: 'eiendom' }, callback)

      expect(callback).toHaveBeenCalledTimes(1)
      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'eiendom' })
      )
    })

    it('handles corrupt localStorage data gracefully', () => {
      window.localStorage.setItem(STORAGE_KEY, 'not-json')

      const result = getTheme()
      expect(result).toEqual({ name: 'ui' })
    })
  })
})
