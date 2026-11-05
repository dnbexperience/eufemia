import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { expect, it } from 'vitest'
import { getPortalPages } from '../../../../vite/client/plugins/portal-pages'
import { getPageRedirects } from '../../../../vite/client/plugins/portal-pages.shared'
import { getSlugFromText } from '../../../uilib/utils/slug.mjs'

it('aligns the proposed names and redirects consolidated pages', () => {
  const { files, allMdxNodes } = getPortalPages(
    resolve(__dirname, '../../../docs')
  )
  const drafts = resolve(__dirname, '__fixtures__')
  const merges = JSON.parse(
    readFileSync(resolve(drafts, 'consolidations.json'), 'utf8')
  ) as Record<string, { to: string; section: string }>
  const redirects = getPageRedirects(files)
  const alignments = JSON.parse(
    readFileSync(resolve(drafts, 'applied-title-alignments.json'), 'utf8')
  ) as Array<{ slug: string; menu: string; h1: string }>
  const combinedTitles: Record<string, string> = {
    'collections/logos': 'Logos',
    'web/styling-and-themes/legacy-colors': 'Legacy colors (deprecated)',
  }
  for (const { slug, menu, h1 } of alignments) {
    if (merges[slug] || slug.endsWith('/changelog')) {
      continue
    }
    const page = allMdxNodes.find(({ fields }) => fields.slug === slug)
    const name = combinedTitles[slug] || h1
    expect(page.frontmatter.contentTitle ?? page.frontmatter.title).toBe(
      name
    )
    expect(
      page.frontmatter.navigation.pageTitle ||
        page.frontmatter.navigation.title
    ).toBe(combinedTitles[slug] || menu)
  }
  for (const [from, { to }] of Object.entries(merges)) {
    expect(redirects).toContainEqual(
      expect.objectContaining({ from: '/' + from, to: '/' + to + '/' })
    )
    const source = allMdxNodes.find(({ fields }) => fields.slug === from)
    expect(source).toBeUndefined()
  }
  const motion = allMdxNodes.find(
    ({ fields }) => fields.slug === 'design-foundations/motion-principles'
  )
  expect(motion.frontmatter.title).toBe('Motion principles')
  expect(motion.frontmatter.legacyFragments['animation-principles']).toBe(
    '/design-foundations/motion-principles/#motion-principles'
  )
  expect(getSlugFromText(motion.frontmatter.title)).toBe(
    'motion-principles'
  )
})
