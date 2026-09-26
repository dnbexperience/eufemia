import { describe, expect, it } from 'vitest'
import {
  createCanonicalUrls,
  createPortalSitemap,
} from '../../prod/portal-sitemap.mts'

describe('Portal sitemap', () => {
  it('lists successfully rendered documentation pages in stable order', () => {
    expect(
      createPortalSitemap(
        ['/new/', '/helper/', '/404/', '/', '/new/'],
        new Set(['/', '/new/', '/old/', '/failed/'])
      )
    ).toEqual({
      schemaVersion: 1,
      pages: ['/', '/new/'],
    })
  })

  it('creates canonical URLs from published documentation pages', () => {
    expect(
      createCanonicalUrls([
        { fields: { slug: '' }, frontmatter: {} },
        { fields: { slug: 'uilib/button' }, frontmatter: {} },
        { fields: { slug: 'uilib/anchor' } },
        {
          fields: { slug: 'contribute/draft' },
          frontmatter: { draft: true },
        },
      ])
    ).toEqual(new Set(['/', '/500/', '/uilib/button/', '/uilib/anchor/']))
  })
})
