import { sanitizeUrl } from '../sanitizeUrl'

describe('sanitizeUrl', () => {
  it('allows http and https URLs', () => {
    expect(sanitizeUrl('https://dnb.no/a?b=1')).toBe(
      'https://dnb.no/a?b=1'
    )
    expect(sanitizeUrl('http://dnb.no')).toBe('http://dnb.no/')
  })

  it('blocks dangerous protocols', () => {
    expect(sanitizeUrl('javascript:alert(1)')).toBeNull()
    expect(sanitizeUrl('JaVaScRiPt:alert(1)')).toBeNull()
    expect(sanitizeUrl(' java\nscript:alert(1)')).toBeNull()
    expect(sanitizeUrl('\u0001javascript:alert(1)')).toBeNull()
    expect(sanitizeUrl('data:text/html,<script>')).toBeNull()
    expect(sanitizeUrl('vbscript:x')).toBeNull()
  })

  it('allows extra protocols when given', () => {
    expect(sanitizeUrl('mailto:a@dnb.no')).toBeNull()
    expect(
      sanitizeUrl('mailto:a@dnb.no', { protocols: ['mailto:'] })
    ).toBe('mailto:a@dnb.no')
  })

  it('keeps relative URLs when all prefixes are allowed', () => {
    expect(sanitizeUrl('/path')).toBe('/path')
    expect(sanitizeUrl('#anchor')).toBe('#anchor')
  })

  it('rejects backslash network paths', () => {
    expect(sanitizeUrl(String.raw`\\evil.example/path`)).toBeNull()
  })

  it('resolves relative URLs with defaultOrigin', () => {
    expect(sanitizeUrl('/path', { defaultOrigin: 'https://dnb.no' })).toBe(
      'https://dnb.no/path'
    )
  })

  it('only allows given prefixes', () => {
    const options = { allowedPrefixes: ['https://dnb.no'] }
    expect(sanitizeUrl('https://dnb.no/x', options)).toBe(
      'https://dnb.no/x'
    )
    expect(sanitizeUrl('https://evil.com', options)).toBeNull()
    expect(
      sanitizeUrl('https://dnb.no.evil.example/path', options)
    ).toBeNull()
    expect(
      sanitizeUrl('https://dnb.no@evil.example/path', options)
    ).toBeNull()
    expect(sanitizeUrl('//evil.com', options)).toBeNull()
    expect(sanitizeUrl('/x', options)).toBeNull()
    expect(
      sanitizeUrl('/x', { ...options, defaultOrigin: 'https://dnb.no' })
    ).toBe('https://dnb.no/x')
    expect(
      sanitizeUrl('https://dnb.no/help/article', {
        allowedPrefixes: ['https://dnb.no/help'],
      })
    ).toBe('https://dnb.no/help/article')
    expect(
      sanitizeUrl('mailto:help@dnb.no', {
        allowedPrefixes: ['mailto:'],
        protocols: ['mailto:'],
      })
    ).toBe('mailto:help@dnb.no')
  })

  it('returns null for empty or invalid URLs', () => {
    expect(sanitizeUrl('')).toBeNull()
    expect(sanitizeUrl('http://')).toBeNull()
  })
})
