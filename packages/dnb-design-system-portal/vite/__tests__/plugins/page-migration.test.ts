import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import {
  scanPageFiles,
  toRegularMdxNodes,
} from '../../client/plugins/portal-pages'
import portalPagesPlugin from '../../client/plugins/portal-pages'
import {
  getPageRedirects,
  resolvePageRedirect,
} from '../../client/plugins/portal-pages.shared'

describe('MDX route migration', () => {
  it.each([
    'components/list/visual-tests/action-footer',
    'components/card/visual-tests/inside-scroll-view',
    'extensions/sidebar-menu/visual-tests/first-paint',
  ])(
    'preserves the incoming fixture %s and its legacy URL',
    (fixturePath) => {
      const files = scanPageFiles(
        path.resolve(__dirname, '../../../src/docs')
      )
      expect(
        files.find(({ slug }) => slug === 'web/' + fixturePath)
      ).toBeDefined()
      expect(
        files.some(({ slug }) => slug === 'uilib/' + fixturePath)
      ).toBe(false)
      expect(getPageRedirects(files)).toContainEqual(
        expect.objectContaining({
          from: '/uilib/' + fixturePath,
          to: '/web/' + fixturePath + '/',
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
      .replace(/^export /gm, '')
      .replace(/^\{ globPath \} from .*;$/gm, '')
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
      to: '/working-with-ai/ai-skills?from=link#agent-skills',
    })
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
    const visual = files.find(
      ({ slug, type }) => type === 'tsx' && slug.startsWith('web/')
    )
    expect(
      redirects.find(
        ({ from }) => from === '/' + visual.slug.replace(/^web/, 'uilib')
      )
    ).toMatchObject({ to: '/' + visual.slug + '/' })
    for (const file of files.filter(
      ({ slug, frontmatter }) =>
        slug.startsWith('web/') && frontmatter.route !== false
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
        '/working-with-ai/mcp-universe#telemetry',
        'https://eufemia.dnb.no/uilib/usage/first-steps/tools?fullscreen#telemetry'
      )
    ).toBe('/working-with-ai/mcp-universe?fullscreen#telemetry')
  })
})
