import { describe, expect, it } from 'vitest'
import { extractPageLinks } from '../../prod/internal-links.mjs'
import {
  createCanonicalUrls,
  createPortalDuplicateIdReport,
  createPortalSitemap,
} from '../../prod/portal-duplicate-ids.mjs'

describe('Portal duplicate ID report', () => {
  it('counts duplicate IDs without counting named anchors', () => {
    const firstPage = {
      url: '/first/',
      ...extractPageLinks(`
        <main id="content">
          <a name="legacy"></a>
          <h2 id="example">First</h2>
          <h2 id="example">Second</h2>
          <h2 id="example">Third</h2>
        </main>
      `),
    }
    const secondPage = {
      url: '/second/',
      ...extractPageLinks('<main id="content"></main>'),
    }

    expect(
      createPortalDuplicateIdReport(
        [secondPage, firstPage],
        new Set(['/first/', '/second/'])
      )
    ).toEqual({
      schemaVersion: 1,
      summary: {
        pages: 2,
        duplicateIdGroups: 1,
        duplicateIdOccurrences: 2,
      },
      findings: [
        {
          check: 'duplicate-id',
          page: '/first/',
          id: 'example',
          occurrences: 3,
        },
      ],
    })
  })

  it('includes IDs inside boundaries excluded from link validation', () => {
    const page = {
      url: '/',
      ...extractPageLinks(`
        <main id="content"></main>
        <div data-link-check="ignore">
          <div id="example"></div>
          <div id="example"></div>
        </div>
      `),
    }

    expect(
      createPortalDuplicateIdReport([page], new Set(['/'])).findings
    ).toEqual([
      {
        check: 'duplicate-id',
        page: '/',
        id: 'example',
        occurrences: 2,
      },
    ])
  })

  it('creates a sorted sitemap of canonical pages', () => {
    expect(
      createPortalSitemap(
        [
          { url: '/old/', redirect: '/new/' },
          { url: '/new/' },
          { url: '/helper/' },
          { url: '/404/' },
          { url: '/' },
        ],
        new Set(['/', '/new/'])
      )
    ).toEqual({
      schemaVersion: 1,
      pages: ['/', '/new/'],
    })
  })

  it('creates canonical URLs from published documentation pages', () => {
    expect(
      createCanonicalUrls([
        { fields: { slug: 'uilib/button' }, frontmatter: {} },
        {
          fields: { slug: 'contribute/draft' },
          frontmatter: { draft: true },
        },
      ])
    ).toEqual(new Set(['/', '/500/', '/uilib/button/']))
  })
})
