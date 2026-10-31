import { describe, expect, it } from 'vitest'
import { portalAssetUrl } from '../client/portal-asset-url'

describe('Portal build asset URLs', () => {
  it('preserves local hashed module and stylesheet URLs', () => {
    for (const url of [
      '/assets/_virtual_portal-page-Ab1_c-.js',
      '/assets/index-ABcd12.css',
    ]) {
      expect(portalAssetUrl(url)).toBe(url)
    }
  })

  it('rejects executable URLs, other origins and paths outside build assets', () => {
    for (const url of [
      'javascript:alert(1)',
      '//example.com/page.js',
      'https://example.com/page.js',
      '/assets/../page.js',
      '/assets/a.js?x=1',
      '/assets/a.css#x',
      '/assets/<img>.css',
      '/page.js',
    ]) {
      expect(() => portalAssetUrl(url)).toThrow(
        'Invalid Portal build asset URL'
      )
    }
  })
})
