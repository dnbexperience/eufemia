import { beforeEach, afterEach, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { Theme } from '@dnb/eufemia/src/shared'
import {
  getTheme,
  useThemeHandler,
} from '../../../../vite/client/shims/theme-handler'
import HomeHero from '../HomeHero'

vi.mock('../useHangingMotion', () => ({
  default: () => ({ ref: { current: null }, onQuery: vi.fn() }),
}))
vi.mock('../HomeBrands', () => ({ default: () => null }))
vi.mock('../../menu/SearchBar', () => ({ SearchBarInput: () => null }))
vi.mock('../../menu/PortalToolsMenu', () => ({ default: () => null }))

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  vi.unstubAllGlobals()
})

function Home() {
  const { colorScheme = 'auto' } = useThemeHandler()
  return (
    <MemoryRouter>
      <Theme brand="ui" colorScheme={colorScheme}>
        <HomeHero />
      </Theme>
    </MemoryRouter>
  )
}

it.each([false, true])(
  'restores Auto with system dark=%s',
  (systemDark) => {
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: query === '(prefers-color-scheme: dark)' && systemDark,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }))
    localStorage.setItem(
      'eufemia-theme',
      JSON.stringify({ brand: 'ui', colorScheme: 'auto' })
    )
    render(<Home />)
    const toggle = document.querySelector<HTMLInputElement>(
      '[data-hanging-item="mode"] input'
    )
    expect(toggle.checked).toBe(systemDark)

    fireEvent.click(toggle)
    expect(getTheme().colorScheme).toBe(systemDark ? 'light' : 'dark')
    expect(toggle.checked).toBe(!systemDark)

    fireEvent.click(toggle)
    expect(getTheme().colorScheme).toBe('auto')
    expect(toggle.checked).toBe(systemDark)
  }
)

it.each(['light', 'dark'] as const)(
  'preserves an explicit %s preference after toggling twice',
  (colorScheme) => {
    vi.stubGlobal('matchMedia', () => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }))
    localStorage.setItem(
      'eufemia-theme',
      JSON.stringify({ brand: 'ui', colorScheme })
    )
    render(<Home />)
    const toggle = document.querySelector<HTMLInputElement>(
      '[data-hanging-item="mode"] input'
    )

    fireEvent.click(toggle)
    expect(getTheme().colorScheme).toBe(
      colorScheme === 'dark' ? 'light' : 'dark'
    )
    fireEvent.click(toggle)
    expect(getTheme().colorScheme).toBe(colorScheme)
  }
)
