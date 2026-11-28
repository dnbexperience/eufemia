import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import {
  scanPageFiles,
  toMdxNodes,
  toRegularMdxNodes,
} from '../../client/plugins/portal-pages'
import portalPagesPlugin from '../../client/plugins/portal-pages'
import {
  getPageRedirects,
  resolvePageRedirect,
} from '../../client/plugins/portal-pages.shared'

describe('MDX route migration', () => {
  it('preserves inherited title anchors on tabs without changing the selected tab', () => {
    const docs = fs.mkdtempSync(path.join(os.tmpdir(), 'tab-fragments-'))
    const write = (slug: string, frontmatter: string) => {
      const file = path.join(docs, slug + '.mdx')
      fs.mkdirSync(path.dirname(file), { recursive: true })
      fs.writeFileSync(
        file,
        `---
${frontmatter}
---
`
      )
    }
    try {
      write(
        'web/components/date-picker',
        `title: Date picker
showTabs: true
legacyFragments:
  datepicker: /web/components/date-picker/#date-picker
  moved: /guides/other#section`
      )
      for (const tab of ['overview', 'demos', 'properties']) {
        write(
          'web/components/date-picker/' + tab,
          `showTabs: true
redirect_from:
  - /uilib/components/date-picker/${tab === 'overview' ? 'info' : tab}`
        )
      }
      write(
        'web/components/date-picker/custom',
        `showTabs: true
title: Custom title`
      )
      write(
        'web/components/date-picker/own-heading',
        `showTabs: true
contentTitle: Own heading`
      )
      write(
        'web/components/date-picker/explicit',
        `showTabs: true
legacyFragments:
  datepicker: /guides/custom#heading`
      )
      const files = scanPageFiles(docs)
      const pages = toMdxNodes(files)
      const redirects = getPageRedirects(files)
      for (const tab of ['demos', 'properties']) {
        const slug = 'web/components/date-picker/' + tab
        const fragments = { datepicker: '/' + slug + '/#date-picker' }
        expect(
          pages.find(({ fields }) => fields.slug === slug)?.frontmatter
            .legacyFragments
        ).toEqual(fragments)
        expect(
          redirects.find(
            ({ from }) => from === '/uilib/components/date-picker/' + tab
          )?.fragments
        ).toEqual(fragments)
      }
      expect(
        redirects.find(
          ({ from }) => from === '/uilib/components/date-picker/info'
        )?.fragments
      ).toEqual({ datepicker: '/web/components/date-picker/#date-picker' })
      for (const tab of ['custom', 'own-heading']) {
        expect(
          pages.find(({ fields }) => fields.slug.endsWith('/' + tab))
            ?.frontmatter.legacyFragments
        ).toBeUndefined()
      }
      expect(
        pages.find(({ fields }) => fields.slug.endsWith('/explicit'))
          ?.frontmatter.legacyFragments
      ).toEqual({ datepicker: '/guides/custom#heading' })
    } finally {
      fs.rmSync(docs, { recursive: true, force: true })
    }
  })

  it.each([
    [
      'helpers/shared-state',
      'ai-tools-and-resources/utilities/shared-state',
    ],
    [
      'usage/customisation/styling/printable-apps',
      'styling-and-themes/css/printable-apps',
    ],
    [
      'usage/customisation/styling/document-styles/visual-tests/plain',
      'styling-and-themes/css/document-styles/visual-tests/plain',
    ],
  ])(
    'preserves new documentation and aliases for %s',
    (relativePath, targetPath) => {
      const files = scanPageFiles(
        path.resolve(__dirname, '../../../src/docs')
      )
      expect(
        files.find(({ slug }) => slug === 'web/' + targetPath)
      ).toBeDefined()
      expect(files.some(({ slug }) => slug.startsWith('uilib/'))).toBe(
        false
      )
      expect(getPageRedirects(files)).toContainEqual(
        expect.objectContaining({
          from: '/uilib/' + relativePath,
          to: '/web/' + targetPath + '/',
        })
      )
    }
  )

  it.each([
    [
      'components/list/visual-tests/action-footer',
      'components/list/visual-tests/action-footer',
    ],
    [
      'components/card/visual-tests/inside-scroll-view',
      'components/card/visual-tests/inside-scroll-view',
    ],
    [
      'extensions/sidebar-menu/visual-tests/first-paint',
      'patterns-and-extensions/sidebar-menu/visual-tests/first-paint',
    ],
  ])(
    'preserves the incoming fixture %s and its legacy URL',
    (fixturePath, targetPath) => {
      const files = scanPageFiles(
        path.resolve(__dirname, '../../../src/docs')
      )
      expect(
        files.find(({ slug }) => slug === 'web/' + targetPath)
      ).toBeDefined()
      expect(
        files.some(({ slug }) => slug === 'uilib/' + fixturePath)
      ).toBe(false)
      expect(getPageRedirects(files)).toContainEqual(
        expect.objectContaining({
          from: '/uilib/' + fixturePath,
          to: '/web/' + targetPath + '/',
        })
      )
    }
  )

  it.each(['custom-cells', 'overline-and-subline', 'title-in-center'])(
    'keeps incoming List fixture %s under web with its legacy URL',
    (name) => {
      const files = scanPageFiles(
        path.resolve(__dirname, '../../../src/docs')
      )
      const slug = 'web/components/list/visual-tests/' + name
      const fixture = files.find((file) => file.slug === slug)
      expect(fixture).toBeDefined()
      expect(fixture.frontmatter).toMatchObject({
        fullscreen: true,
        hideInMenu: true,
        search: false,
      })
      expect(files.some(({ slug }) => slug.startsWith('uilib/'))).toBe(
        false
      )
      expect(getPageRedirects(files)).toContainEqual(
        expect.objectContaining({
          from: '/uilib/components/list/visual-tests/' + name,
          to: '/' + slug + '/',
        })
      )
    }
  )

  it('keeps server redirects and client fragment navigation in the generated routes', async () => {
    const plugin = portalPagesPlugin()
    const load = plugin.load as (id: string) => string
    const source = load('\0virtual:portal-pages')
    const module = source
      .replace(/^import .*;$/gm, '')
      .replace(/^export \{[^}]+\} from .*;$/gm, '')
      .replace(/^export /gm, '')
    const generated = new Function(
      'React',
      'Navigate',
      'redirect',
      'useLocation',
      'resolvePageRedirect',
      'window',
      module + ';return routes;'
    )
    const serverRoutes = generated(
      {},
      null,
      (to: string) =>
        new Response(null, { status: 302, headers: { Location: to } }),
      () => null,
      resolvePageRedirect,
      undefined
    )
    const server = serverRoutes.find(
      ({ path }) => path === '/uilib/components/button'
    )
    const result = await server.loader({
      request: new Request(
        'https://eufemia.dnb.no/uilib/components/button?fullscreen'
      ),
    })
    expect(result.headers.get('Location')).toBe(
      '/web/components/button/?fullscreen'
    )
    const React = {
      createElement: (component, props) =>
        typeof component === 'function' ? component(props) : props,
    }
    const clientRoutes = generated(
      React,
      'Navigate',
      null,
      () => ({
        pathname: '/uilib/usage/first-steps/tools',
        search: '?from=link',
        hash: '#agent-skills',
      }),
      resolvePageRedirect,
      {}
    )
    const client = clientRoutes.find(
      ({ path }) => path === '/uilib/usage/first-steps/tools'
    )
    expect(client.loader).toBeUndefined()
    expect(client.Component()).toMatchObject({
      replace: true,
      to: '/web/ai-tools-and-resources/ai/ai-skills/?from=link#agent-skills',
    })

    const eventsRoutes = generated(
      React,
      'Navigate',
      null,
      () => ({
        pathname: '/web/components/button/events',
        search: '',
        hash: '',
      }),
      resolvePageRedirect,
      {}
    )
    const events = eventsRoutes.find(
      ({ path }) => path === '/web/components/button/events'
    )
    // Prerendering writes the static redirect page from these fragments
    expect(events.handle.fragments['']).toBe(
      '/web/components/button/properties/#events'
    )
    expect(events.Component()).toMatchObject({
      replace: true,
      to: '/web/components/button/properties/#events',
    })

    // Old Events tab headings that are Properties headings now
    for (const [from, to] of [
      [
        '/uilib/patterns-and-extensions/table-of-content/events#tableofcontentitem',
        '/web/patterns-and-extensions/table-of-content/properties/#tableofcontentitem-events',
      ],
      [
        '/web/components/search/events#searchinput',
        '/web/components/search/properties/#searchinput-events',
      ],
    ]) {
      const url = new URL(from, 'https://eufemia.dnb.no')
      const routes = generated(
        React,
        'Navigate',
        null,
        () => ({ pathname: url.pathname, search: '', hash: url.hash }),
        resolvePageRedirect,
        {}
      )
      const route = routes.find(({ path }) => path === url.pathname)
      expect(route.Component()).toMatchObject({ replace: true, to })
    }

    // The same fragments still open the Properties headings
    const pages = toMdxNodes(
      scanPageFiles(path.resolve(__dirname, '../../../src/docs'))
    )
    for (const [slug, key] of [
      [
        'web/patterns-and-extensions/table-of-content/properties',
        'tableofcontentitem',
      ],
      ['web/components/search/properties', 'searchinput'],
    ]) {
      const page = pages.find(({ fields }) => fields.slug === slug)
      expect(page).toBeDefined()
      expect(page.frontmatter.legacyFragments ?? {}).not.toHaveProperty(
        key
      )
    }
  })
  it('keeps TSX routes and first-tab aliases through MDX-defined prefixes', () => {
    const files = scanPageFiles(
      path.resolve(__dirname, '../../../src/docs')
    )
    const redirects = getPageRedirects(files)
    expect(
      redirects.find(
        ({ from }) => from === '/uilib/components/button/properties'
      )
    ).toMatchObject({ to: '/web/components/button/properties/' })
    expect(
      redirects.find(
        ({ from }) => from === '/uilib/components/button/info'
      )
    ).toMatchObject({ to: '/web/components/button/' })
    for (const from of [
      '/web/components/button/info',
      '/web/components/button/overview',
    ]) {
      expect(
        redirects.find((redirect) => redirect.from === from)
      ).toMatchObject({ to: '/web/components/button/' })
    }
    const visual = files.find(
      ({ slug, type }) =>
        type === 'tsx' &&
        slug === 'web/components/date-picker/visual-tests'
    )
    expect(
      redirects.find(
        ({ from }) => from === '/' + visual.slug.replace(/^web/, 'uilib')
      )
    ).toMatchObject({ to: '/' + visual.slug + '/' })
    for (const file of files.filter(
      ({ slug, frontmatter }) =>
        slug.startsWith('web/components/') && frontmatter.route !== false
    )) {
      const old = '/' + file.slug.replace(/^web/, 'uilib')
      expect(
        redirects.some(({ from }) => from === old),
        old
      ).toBe(true)
    }
    const routes = new Set(
      files
        .filter(({ frontmatter }) => frontmatter.route !== false)
        .map(({ slug }) => '/' + slug + '/')
    )
    for (const { from, to } of redirects) {
      expect(routes.has(to), from + ' → ' + to).toBe(true)
    }
  })
  it('supports named home documents and contentless navigation definitions', () => {
    const root = fs.mkdtempSync(
      path.join(os.tmpdir(), 'portal-migration-')
    )
    try {
      fs.writeFileSync(
        path.join(root, 'home.mdx'),
        '---\nslug: /\ntitle: Home\n---\nWelcome'
      )
      fs.writeFileSync(
        path.join(root, 'design-language.mdx'),
        '---\ntitle: Design language\nroute: false\nnavigation:\n  kind: group\n---\n'
      )
      const files = scanPageFiles(root)
      expect(
        files.find(({ filePath }) => filePath.endsWith('home.mdx')).slug
      ).toBe('')
      expect(
        toRegularMdxNodes(
          files.map(({ slug, frontmatter }) => ({
            fields: { slug, sourcePath: slug },
            frontmatter,
          }))
        )
      ).toHaveLength(1)
    } finally {
      fs.rmSync(root, { recursive: true, force: true })
    }
  })

  it('preserves searches and fragments', () => {
    expect(
      resolvePageRedirect(
        '/web/components/button/',
        'https://eufemia.dnb.no/uilib/components/button?fullscreen&eufemia-theme=sbanken#sizes'
      )
    ).toBe(
      '/web/components/button/?fullscreen&eufemia-theme=sbanken#sizes'
    )
    expect(
      resolvePageRedirect(
        '/web/ai-tools-and-resources/ai/mcp-universe#telemetry',
        'https://eufemia.dnb.no/uilib/usage/first-steps/tools?fullscreen#telemetry'
      )
    ).toBe(
      '/web/ai-tools-and-resources/ai/mcp-universe?fullscreen#telemetry'
    )
  })
})
