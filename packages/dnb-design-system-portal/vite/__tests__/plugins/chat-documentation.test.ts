import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { getPortalPages } from '../../client/plugins/portal-pages'
import { getPageRedirects } from '../../client/plugins/portal-pages.shared'

describe('Chat documentation migration', () => {
  const docsRoot = path.resolve(import.meta.dirname, '../../../src/docs')
  const { files } = getPortalPages(docsRoot)
  const chatPages = files.filter(
    ({ slug }) =>
      slug === 'web/patterns-and-extensions/chat' ||
      slug.startsWith('web/patterns-and-extensions/chat/')
  )
  const redirects = getPageRedirects(files)

  it('keeps every former AI documentation URL working', () => {
    expect(chatPages.length).toBeGreaterThan(50)
    for (const page of chatPages) {
      const target =
        '/' +
        (page.slug.endsWith('/info')
          ? page.slug.slice(0, -5)
          : page.slug) +
        '/'
      for (const prefix of [
        '/web/patterns-and-extensions/ai',
        '/web/extensions/ai',
        '/uilib/extensions/ai',
      ]) {
        const from = page.slug.replace(
          'web/patterns-and-extensions/chat',
          prefix
        )
        expect(
          redirects.find((redirect) => redirect.from === from)?.to
        ).toBe(target)
      }
    }
  })
})
