import { renderHook } from '@testing-library/react'
import Theme from '../Theme'
import { Provider } from '../'
import useTheme from '../useTheme'

describe('useTheme', () => {
  it('returns null if no context was given', () => {
    const { result } = renderHook(() => useTheme())

    expect(result.current).toEqual(null)
  })

  it('returns given theme context', () => {
    const wrapper = ({ children }) => (
      <Theme brand="eiendom" variant="soft" surface="dark">
        {children}
      </Theme>
    )
    const { result } = renderHook(() => useTheme(), { wrapper })

    expect(result.current).toEqual(
      expect.objectContaining({
        brand: 'eiendom',
        name: 'eiendom',
        variant: 'soft',
        surface: 'dark',
      })
    )
  })

  it('returns boolean constants', () => {
    const wrapper = ({ children }) => (
      <Theme brand="sbanken">{children}</Theme>
    )
    const { result } = renderHook(() => useTheme(), { wrapper })

    expect(result.current).toEqual({
      brand: 'sbanken',
      name: 'sbanken',
      isEiendom: false,
      isSbanken: true,
      isUi: false,
      isCarnegie: false,
    })
  })

  it('supports the deprecated name prop', () => {
    const wrapper = ({ children }) => (
      <Theme name="sbanken">{children}</Theme>
    )
    const { result } = renderHook(() => useTheme(), { wrapper })

    expect(result.current).toEqual(
      expect.objectContaining({ brand: 'sbanken', name: 'sbanken' })
    )
  })

  it('resolves density from the deprecated size when set via Provider', () => {
    const wrapper = ({ children }) => (
      <Provider theme={{ size: 'basis' }}>{children}</Provider>
    )
    const { result } = renderHook(() => useTheme(), { wrapper })

    expect(result.current).toEqual(
      expect.objectContaining({ density: 'basis', size: 'basis' })
    )
  })

  it('resolves the deprecated size from density when set via Provider', () => {
    const wrapper = ({ children }) => (
      <Provider theme={{ density: 'basis' }}>{children}</Provider>
    )
    const { result } = renderHook(() => useTheme(), { wrapper })

    expect(result.current).toEqual(
      expect.objectContaining({ density: 'basis', size: 'basis' })
    )
  })

  it('will return false on all constants when no brand was given', () => {
    const wrapper = ({ children }) => <Theme>{children}</Theme>
    const { result } = renderHook(() => useTheme(), { wrapper })

    expect(result.current).toEqual({
      brand: undefined,
      name: undefined,
      isEiendom: false,
      isSbanken: false,
      isUi: false,
      isCarnegie: false,
    })
  })
})
