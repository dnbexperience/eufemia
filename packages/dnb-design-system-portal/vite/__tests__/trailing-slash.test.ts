import { describe, it, expect } from 'vitest'

describe('trailing slash enforcement', () => {
  function shouldRedirect(pathname: string): string | null {
    if (
      pathname !== '/' &&
      !pathname.endsWith('/') &&
      !pathname.includes('.')
    ) {
      return pathname + '/'
    }
    return null
  }

  it('redirects paths without trailing slash', () => {
    expect(shouldRedirect('/uilib/components/button')).toBe(
      '/uilib/components/button/'
    )
  })

  it('does not redirect paths that already have trailing slash', () => {
    expect(shouldRedirect('/uilib/components/button/')).toBeNull()
  })

  it('does not redirect the root path', () => {
    expect(shouldRedirect('/')).toBeNull()
  })

  it('does not redirect paths with file extensions (assets)', () => {
    expect(shouldRedirect('/assets/image.png')).toBeNull()
    expect(shouldRedirect('/script.js')).toBeNull()
    expect(shouldRedirect('/style.css')).toBeNull()
  })

  it('redirects deep nested paths', () => {
    expect(shouldRedirect('/a/b/c/d')).toBe('/a/b/c/d/')
  })

  it('redirects single-segment paths', () => {
    expect(shouldRedirect('/about')).toBe('/about/')
  })
})
