import { describe, it, expect, beforeEach } from 'vitest'
import {
  getTheme as getPortalTheme,
  setTheme as setPortalTheme,
} from '../../client/shims/theme-handler'
import {
  getTheme as getEufemiaTheme,
  setTheme as setEufemiaTheme,
} from '@dnb/eufemia/src/shared/Theme'

/**
 * The portal's theme-handler shim and Eufemia's own getTheme/setTheme are two
 * independent implementations that share the `eufemia-theme` localStorage key.
 * Nothing in the type system ties them together, so these tests lock them to
 * the same payload contract: `brand` is canonical, the deprecated `name` is
 * mirrored, and neither may leave the pair diverged.
 */
const STORAGE_KEY = 'eufemia-theme'

const stored = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')

describe('portal shim and Eufemia share the same theme storage contract', () => {
  beforeEach(() => {
    localStorage.clear()
    window.history.replaceState({}, '', '/')
  })

  it('a brand written by the portal is read back by Eufemia', () => {
    setPortalTheme({ brand: 'sbanken' })

    expect(getEufemiaTheme().brand).toBe('sbanken')
  })

  it('a brand written by Eufemia is read back by the portal', () => {
    setEufemiaTheme({ brand: 'eiendom' })

    expect(getPortalTheme().brand).toBe('eiendom')
  })

  it('both agree on a brand-only payload', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ brand: 'carnegie' })
    )

    expect(getPortalTheme().brand).toBe('carnegie')
    expect(getEufemiaTheme().brand).toBe('carnegie')
  })

  it('both agree on a legacy name-only payload', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ name: 'sbanken' }))

    expect(getPortalTheme().brand).toBe('sbanken')
    expect(getEufemiaTheme().brand).toBe('sbanken')
  })

  it('both write brand and the deprecated name mirrored', () => {
    setPortalTheme({ brand: 'eiendom' })
    expect(stored()).toMatchObject({ brand: 'eiendom', name: 'eiendom' })

    localStorage.clear()

    setEufemiaTheme({ brand: 'eiendom' })
    expect(stored()).toMatchObject({ brand: 'eiendom', name: 'eiendom' })
  })

  it('neither leaves brand and name diverged when only name is given', () => {
    setPortalTheme({ brand: 'eiendom' })
    setPortalTheme({ name: 'sbanken' })
    expect(getEufemiaTheme().brand).toBe('sbanken')

    localStorage.clear()

    setEufemiaTheme({ brand: 'eiendom' })
    setEufemiaTheme({ name: 'sbanken' })
    expect(getPortalTheme().brand).toBe('sbanken')
  })

  it('a colorScheme written by one is preserved by the other', () => {
    setEufemiaTheme({ brand: 'sbanken', colorScheme: 'dark' })
    setPortalTheme({ brand: 'eiendom' })

    expect(getEufemiaTheme()).toMatchObject({
      brand: 'eiendom',
      colorScheme: 'dark',
    })
  })

  /**
   * Eufemia keeps a second mirrored pair in this payload, `density`/`size`.
   * The portal does not manage it, so it must at least carry it through
   * untouched rather than dropping it on the next brand switch.
   */
  it('the portal preserves the density pair it does not manage', () => {
    setEufemiaTheme({ brand: 'sbanken', density: 'basis' })
    setPortalTheme({ brand: 'eiendom' })

    expect(getEufemiaTheme()).toMatchObject({
      brand: 'eiendom',
      density: 'basis',
      size: 'basis',
    })
  })
})

describe('portal shim and Eufemia read the ?eufemia-theme param alike', () => {
  const setSearch = (search: string) =>
    Object.defineProperty(window, 'location', {
      value: { ...window.location, search },
      writable: true,
    })

  beforeEach(() => {
    localStorage.clear()
    setSearch('')
  })

  it('both ignore a param that merely ends with the key', () => {
    setSearch('?x-eufemia-theme=sbanken')

    expect(getPortalTheme().brand).toBe('ui')
    expect(getEufemiaTheme().brand).toBe('ui')
  })

  it('both take the first value when the param is repeated', () => {
    setSearch('?eufemia-theme=eiendom&eufemia-theme=sbanken')

    expect(getPortalTheme().brand).toBe('eiendom')
    expect(getEufemiaTheme().brand).toBe('eiendom')
  })

  it('both let the param override the stored brand', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ brand: 'eiendom' }))
    setSearch('?eufemia-theme=sbanken')

    expect(getPortalTheme().brand).toBe('sbanken')
    expect(getEufemiaTheme().brand).toBe('sbanken')
  })

  /**
   * The one intentional difference: the portal can only apply a brand whose CSS
   * it has bundled, so it validates and falls back. Eufemia deliberately does
   * not. Asserted here so the divergence stays deliberate.
   */
  it('only the portal validates an unknown brand', () => {
    setSearch('?eufemia-theme=not-a-brand')

    expect(getPortalTheme().brand).toBe('ui')
    expect(getEufemiaTheme().brand).toBe('not-a-brand')
  })
})
