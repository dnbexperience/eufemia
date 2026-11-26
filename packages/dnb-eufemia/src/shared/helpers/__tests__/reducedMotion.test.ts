import {
  getSmoothScrollBehavior,
  prefersReducedMotion,
} from '../reducedMotion'

describe('reducedMotion', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should return "auto" when reduced motion is preferred', () => {
    const matchMedia = vi.fn(() => ({ matches: true }))
    vi.stubGlobal('matchMedia', matchMedia)

    expect(prefersReducedMotion()).toBe(true)
    expect(getSmoothScrollBehavior()).toBe('auto')
    expect(matchMedia).toHaveBeenCalledWith(
      '(prefers-reduced-motion: reduce)'
    )
  })

  it('should return "smooth" when reduced motion is not preferred', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: false }))

    expect(prefersReducedMotion()).toBe(false)
    expect(getSmoothScrollBehavior()).toBe('smooth')
  })

  it('should read the setting on every call', () => {
    let matches = false
    vi.stubGlobal('matchMedia', () => ({ matches }))

    expect(getSmoothScrollBehavior()).toBe('smooth')

    matches = true

    expect(getSmoothScrollBehavior()).toBe('auto')
  })

  it('should return "smooth" when matchMedia is not supported', () => {
    vi.stubGlobal('matchMedia', undefined)

    expect(prefersReducedMotion()).toBe(false)
    expect(getSmoothScrollBehavior()).toBe('smooth')
  })
})
