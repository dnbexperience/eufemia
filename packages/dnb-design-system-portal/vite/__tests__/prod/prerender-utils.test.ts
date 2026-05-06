import { describe, it, expect } from 'vitest'
import path from 'node:path'
import {
  collectUrls,
  getRoutePreloads,
  getPageMeta,
  getMdPath,
  injectHtml,
  buildRedirectHtml,
  getOutputPath,
} from '../../prod/prerender-utils'
import { getContentScript } from '@dnb/eufemia/src/shared/ColorSchemeScript'
import type { RouteEntry, SSRManifest } from '../../prod/prerender-utils'

describe('prerender-utils', () => {
  describe('collectUrls', () => {
    it('always includes root /', () => {
      const urls = collectUrls([])
      expect(urls).toEqual(['/'])
    })

    it('collects route paths with trailing slashes', () => {
      const routes: RouteEntry[] = [
        { path: '/about' },
        { path: '/uilib/components/button' },
      ]
      const urls = collectUrls(routes)
      expect(urls).toEqual(['/', '/about/', '/uilib/components/button/'])
    })

    it('preserves existing trailing slashes', () => {
      const routes: RouteEntry[] = [{ path: '/about/' }]
      const urls = collectUrls(routes)
      expect(urls).toEqual(['/', '/about/'])
    })

    it('filters out catch-all routes', () => {
      const routes: RouteEntry[] = [{ path: '/about' }, { path: '*' }]
      const urls = collectUrls(routes)
      expect(urls).toEqual(['/', '/about/'])
    })

    it('filters out 404 routes', () => {
      const routes: RouteEntry[] = [
        { path: '/about' },
        { path: '/404' },
        { path: '/404/custom' },
      ]
      const urls = collectUrls(routes)
      expect(urls).toEqual(['/', '/about/'])
    })

    it('skips routes without a path', () => {
      const routes: RouteEntry[] = [
        { path: '/about' },
        { index: true },
        { path: undefined },
      ]
      const urls = collectUrls(routes)
      expect(urls).toEqual(['/', '/about/'])
    })

    it('deduplicates routes', () => {
      const routes: RouteEntry[] = [
        { path: '/about' },
        { path: '/about/' },
        { path: '/about' },
      ]
      const urls = collectUrls(routes)
      expect(urls).toEqual(['/', '/about/'])
    })

    it('does not duplicate root when a route has path /', () => {
      const routes: RouteEntry[] = [{ path: '/' }]
      const urls = collectUrls(routes)
      expect(urls).toEqual(['/'])
    })
  })

  describe('getPageMeta', () => {
    const nodes = [
      {
        fields: { slug: 'uilib/components/button' },
        frontmatter: {
          title: 'Button',
          description: 'A button component',
        },
      },
      {
        fields: { slug: 'uilib/components/button/info' },
        frontmatter: { title: '', description: '' },
      },
      {
        fields: { slug: 'uilib/components/card' },
        frontmatter: {
          title: 'Card',
          description: 'A card container',
        },
      },
      {
        fields: { slug: '' },
        frontmatter: { title: 'Home', description: 'Welcome' },
      },
    ]

    it('returns title and description for a direct match', () => {
      const meta = getPageMeta('/uilib/components/button/', nodes)
      expect(meta).toEqual({
        title: 'Button',
        description: 'A button component',
      })
    })

    it('inherits title from parent for tab sub-pages', () => {
      const meta = getPageMeta('/uilib/components/button/info/', nodes)
      expect(meta.title).toBe('Button')
      expect(meta.description).toBe('A button component')
    })

    it('returns empty strings for unknown routes', () => {
      const meta = getPageMeta('/unknown/', nodes)
      expect(meta).toEqual({ title: '', description: '' })
    })

    it('resolves root URL to index', () => {
      const meta = getPageMeta('/', nodes)
      expect(meta.title).toBe('Home')
    })
  })

  describe('getRoutePreloads', () => {
    const manifest: SSRManifest = {
      '../../src/docs/uilib/components/button.mdx': [
        '/assets/button-abc123.js',
      ],
      '../../src/docs/uilib/components/button/info.mdx': [
        '/assets/info-def456.js',
        '/assets/DNB-Regular.woff2',
      ],
      '../../src/docs/index.tsx': [
        '/assets/index-xyz789.js',
        '/assets/index-abc.css',
        '/assets/logo.svg',
      ],
      '../../src/docs/uilib/components/card/index.mdx': [
        '/assets/card-111.js',
        '/assets/card-icon.svg',
      ],
    }

    it('resolves .mdx route to its JS chunk', () => {
      const preloads = getRoutePreloads(
        '/uilib/components/button/',
        manifest
      )
      expect(preloads.js).toEqual(['/assets/button-abc123.js'])
      expect(preloads.css).toEqual([])
    })

    it('resolves nested route with trailing slash', () => {
      const preloads = getRoutePreloads(
        '/uilib/components/button/info/',
        manifest
      )
      expect(preloads.js).toEqual(['/assets/info-def456.js'])
    })

    it('filters out non-JS/CSS assets (fonts, SVGs)', () => {
      const preloads = getRoutePreloads(
        '/uilib/components/button/info/',
        manifest
      )
      expect(preloads.js).not.toContain('/assets/DNB-Regular.woff2')
      expect(preloads.css).not.toContain('/assets/DNB-Regular.woff2')
    })

    it('resolves root URL to index source with JS and CSS', () => {
      const preloads = getRoutePreloads('/', manifest)
      expect(preloads.js).toEqual(['/assets/index-xyz789.js'])
      expect(preloads.css).toEqual(['/assets/index-abc.css'])
    })

    it('resolves index.mdx inside a directory', () => {
      const preloads = getRoutePreloads(
        '/uilib/components/card/',
        manifest
      )
      expect(preloads.js).toEqual(['/assets/card-111.js'])
    })

    it('returns empty arrays for unknown routes', () => {
      const preloads = getRoutePreloads('/unknown/route/', manifest)
      expect(preloads).toEqual({ js: [], css: [] })
    })

    it('returns empty arrays with empty manifest', () => {
      const preloads = getRoutePreloads('/uilib/components/button/', {})
      expect(preloads).toEqual({ js: [], css: [] })
    })

    it('deduplicates JS chunks across candidate patterns', () => {
      const dupManifest: SSRManifest = {
        '../../src/docs/page.mdx': ['/assets/page-abc.js'],
        '../../src/docs/page/index.mdx': ['/assets/page-abc.js'],
      }
      const preloads = getRoutePreloads('/page/', dupManifest)
      expect(preloads.js).toEqual(['/assets/page-abc.js'])
    })

    it('handles URL without slashes', () => {
      const preloads = getRoutePreloads(
        'uilib/components/button',
        manifest
      )
      expect(preloads.js).toEqual(['/assets/button-abc123.js'])
    })
  })

  describe('injectHtml', () => {
    const template = [
      '<!DOCTYPE html>',
      '<html>',
      '<head>',
      '  <title id="head-title">Default Title</title>',
      '  <meta id="head-description" name="description" content="Default description" />',
      '</head>',
      '<body>',
      '  <div id="root"></div>',
      '</body>',
      '</html>',
    ].join('\n')

    it('injects app HTML into the root div', () => {
      const result = injectHtml(template, '<h1>Hello</h1>', {
        js: [],
        css: [],
      })
      expect(result).toContain('<div id="root"><h1>Hello</h1></div>')
    })

    it('includes color-scheme content script after root div', () => {
      const result = injectHtml(template, '<h1>Hello</h1>', {
        js: [],
        css: [],
      })
      expect(result).toContain('__eufemiaColorScheme')
      // Script should appear after the root div
      const rootEnd = result.indexOf('</div>')
      const scriptPos = result.indexOf('__eufemiaColorScheme')
      expect(scriptPos).toBeGreaterThan(rootEnd)
    })

    it('does not add preload tags when lists are empty', () => {
      const result = injectHtml(template, '<h1>Hello</h1>', {
        js: [],
        css: [],
      })
      expect(result).not.toContain('modulepreload')
    })

    it('injects modulepreload links before </head>', () => {
      const result = injectHtml(template, '<h1>Hello</h1>', {
        js: ['/assets/chunk-abc.js'],
        css: [],
      })
      expect(result).toContain(
        '<link rel="modulepreload" crossorigin href="/assets/chunk-abc.js">'
      )
      // Preload should appear before </head>
      const preloadPos = result.indexOf('modulepreload')
      const headClosePos = result.indexOf('</head>')
      expect(preloadPos).toBeLessThan(headClosePos)
    })

    it('injects multiple preload links', () => {
      const result = injectHtml(template, '<p>Content</p>', {
        js: ['/assets/chunk-a.js', '/assets/chunk-b.js'],
        css: [],
      })
      expect(result).toContain('href="/assets/chunk-a.js"')
      expect(result).toContain('href="/assets/chunk-b.js"')
    })

    it('preserves existing head content when no meta provided', () => {
      const result = injectHtml(template, '<p>Content</p>', {
        js: ['/assets/x.js'],
        css: [],
      })
      expect(result).toContain(
        '<title id="head-title">Default Title</title>'
      )
    })

    it('injects Emotion CSS into head when provided', () => {
      const emotionCss =
        '<style data-emotion="css abc">.css-abc{color:red}</style>'
      const result = injectHtml(
        template,
        '<h1>Hello</h1>',
        { js: [], css: [] },
        emotionCss
      )
      expect(result).toContain(emotionCss)
      const emotionPos = result.indexOf('data-emotion')
      const headClosePos = result.indexOf('</head>')
      expect(emotionPos).toBeLessThan(headClosePos)
    })

    it('does not modify head when emotionCss is empty', () => {
      const result = injectHtml(
        template,
        '<h1>Hello</h1>',
        { js: [], css: [] },
        ''
      )
      expect(result).not.toContain('data-emotion')
    })

    it('injects route-specific CSS as stylesheet links', () => {
      const result = injectHtml(template, '<h1>Hello</h1>', {
        js: [],
        css: ['/assets/docs-abc.css'],
      })
      expect(result).toContain(
        '<link rel="stylesheet" crossorigin href="/assets/docs-abc.css">'
      )
      const cssPos = result.indexOf('stylesheet')
      const headClosePos = result.indexOf('</head>')
      expect(cssPos).toBeLessThan(headClosePos)
    })

    it('injects SEO meta tags when meta is provided', () => {
      const result = injectHtml(
        template,
        '<h1>Hello</h1>',
        { js: [], css: [] },
        '',
        {
          url: '/uilib/components/button/',
          title: 'Button',
          description: 'A button',
        }
      )
      expect(result).toContain(
        '<title id="head-title">Button | Eufemia</title>'
      )
      expect(result).not.toContain('Default Title')
      expect(result).toContain('name="description" content="A button"')
      expect(result).not.toContain('Default description')
      expect(result).toContain(
        '<meta property="og:title" content="Button | Eufemia">'
      )
      expect(result).toContain(
        'content="https://eufemia.dnb.no/uilib/components/button/"'
      )
    })

    it('uses default description when meta.description is empty', () => {
      const result = injectHtml(
        template,
        '<h1>Hello</h1>',
        { js: [], css: [] },
        '',
        { url: '/', title: 'Home', description: '' }
      )
      expect(result).toContain('Eufemia Design System is the go-to place')
    })

    it('injects llms.txt link only on root page', () => {
      const rootResult = injectHtml(
        template,
        '<h1>Hi</h1>',
        { js: [], css: [] },
        '',
        { url: '/', title: '', description: '' }
      )
      expect(rootResult).toContain('href="/llms.txt"')

      const subResult = injectHtml(
        template,
        '<h1>Hi</h1>',
        { js: [], css: [] },
        '',
        { url: '/uilib/', title: '', description: '' }
      )
      expect(subResult).not.toContain('href="/llms.txt"')
    })

    it('injects markdown alternate link when mdPath is provided', () => {
      const withMd = injectHtml(
        template,
        '<h1>Hi</h1>',
        { js: [], css: [] },
        '',
        {
          url: '/uilib/components/button/',
          title: 'Button',
          description: '',
          mdPath: '/uilib/components/button.md',
        }
      )
      expect(withMd).toContain(
        '<link rel="alternate" type="text/markdown"'
      )
      expect(withMd).toContain('href="/uilib/components/button.md"')

      const withoutMd = injectHtml(
        template,
        '<h1>Hi</h1>',
        { js: [], css: [] },
        '',
        {
          url: '/quickguide-designer/',
          title: 'Designer',
          description: '',
        }
      )
      expect(withoutMd).not.toContain('type="text/markdown"')
    })

    it('uses mdPath as-is for tab pages', () => {
      const result = injectHtml(
        template,
        '<h1>Hi</h1>',
        { js: [], css: [] },
        '',
        {
          url: '/uilib/components/button/demos/',
          title: 'Button',
          description: '',
          mdPath: '/uilib/components/button.md',
        }
      )
      expect(result).toContain('href="/uilib/components/button.md"')
      expect(result).not.toContain('/demos.md')
    })
  })

  describe('getMdPath', () => {
    const allMdxNodes = [
      {
        fields: { slug: 'uilib/components/button' },
        frontmatter: { title: 'Button', showTabs: true },
      },
      {
        fields: { slug: 'uilib/components/button/demos' },
        frontmatter: { showTabs: true },
      },
      {
        fields: { slug: 'uilib/components/button/properties' },
        frontmatter: { showTabs: true },
      },
      {
        fields: { slug: 'uilib/components/button/events' },
        frontmatter: { showTabs: true },
      },
      {
        fields: { slug: 'uilib/components/slider' },
        frontmatter: { title: 'Slider', showTabs: true },
      },
      {
        fields: { slug: 'uilib/components/slider/custom-tab' },
        frontmatter: { showTabs: true },
      },
      {
        fields: { slug: 'uilib/layout' },
        frontmatter: { title: 'Layout' },
      },
      {
        fields: { slug: 'quickguide-designer' },
        frontmatter: { title: 'Designer' },
      },
    ]

    it('returns .md path for entry pages', () => {
      expect(getMdPath('/uilib/components/button/', allMdxNodes)).toBe(
        '/uilib/components/button.md'
      )
    })

    it('resolves tab pages to their parent entry .md', () => {
      expect(
        getMdPath('/uilib/components/button/demos/', allMdxNodes)
      ).toBe('/uilib/components/button.md')
      expect(
        getMdPath('/uilib/components/button/properties/', allMdxNodes)
      ).toBe('/uilib/components/button.md')
    })

    it('resolves custom tab names to parent entry .md', () => {
      expect(
        getMdPath('/uilib/components/slider/custom-tab/', allMdxNodes)
      ).toBe('/uilib/components/slider.md')
    })

    it('returns .md path for non-uilib entry pages', () => {
      expect(getMdPath('/quickguide-designer/', allMdxNodes)).toBe(
        '/quickguide-designer.md'
      )
    })

    it('returns null for uilib pages without a matching entry', () => {
      expect(getMdPath('/uilib/unknown/page/', allMdxNodes)).toBeNull()
    })

    it('handles URLs without trailing slashes', () => {
      expect(getMdPath('/uilib/components/button', allMdxNodes)).toBe(
        '/uilib/components/button.md'
      )
    })

    it('handles top-level uilib entries', () => {
      expect(getMdPath('/uilib/layout/', allMdxNodes)).toBe(
        '/uilib/layout.md'
      )
    })
  })

  describe('buildRedirectHtml', () => {
    it('includes meta refresh with the redirect URL', () => {
      const html = buildRedirectHtml('/new-page/')
      expect(html).toContain(
        '<meta http-equiv="refresh" content="0;url=/new-page/">'
      )
    })

    it('includes canonical link', () => {
      const html = buildRedirectHtml('/new-page/')
      expect(html).toContain('<link rel="canonical" href="/new-page/">')
    })

    it('produces valid HTML structure', () => {
      const html = buildRedirectHtml('/target/')
      expect(html).toMatch(/^<!DOCTYPE html>/)
      expect(html).toContain('<html>')
      expect(html).toContain('</html>')
      expect(html).toContain('<body></body>')
    })

    it('handles external URLs', () => {
      const html = buildRedirectHtml('https://example.com/')
      expect(html).toContain('content="0;url=https://example.com/"')
      expect(html).toContain('href="https://example.com/"')
    })
  })

  describe('getOutputPath', () => {
    const outDir = '/dist'

    it('maps root / to dist/index.html', () => {
      expect(getOutputPath('/', outDir)).toBe(
        path.resolve('/dist', 'index.html')
      )
    })

    it('maps /404.html to dist/404.html', () => {
      expect(getOutputPath('/404.html', outDir)).toBe(
        path.resolve('/dist', '404.html')
      )
    })

    it('maps /foo/bar/ to dist/foo/bar/index.html', () => {
      expect(getOutputPath('/foo/bar/', outDir)).toBe(
        path.resolve('/dist', 'foo', 'bar', 'index.html')
      )
    })

    it('maps /about/ to dist/about/index.html', () => {
      expect(getOutputPath('/about/', outDir)).toBe(
        path.resolve('/dist', 'about', 'index.html')
      )
    })

    it('handles deep paths', () => {
      expect(getOutputPath('/uilib/components/button/info/', outDir)).toBe(
        path.resolve(
          '/dist',
          'uilib',
          'components',
          'button',
          'info',
          'index.html'
        )
      )
    })

    it('strips leading and trailing slashes for regular paths', () => {
      expect(getOutputPath('/page/', outDir)).toBe(
        path.resolve('/dist', 'page', 'index.html')
      )
    })
  })

  describe('getContentScript (from ColorSchemeScript)', () => {
    it('returns a self-executing function', () => {
      const script = getContentScript()
      expect(script).toMatch(/^\(function\(\)/)
      expect(script).toMatch(/\)\(\)$/)
    })

    it('reads from globalThis.__eufemiaColorScheme', () => {
      const script = getContentScript()
      expect(script).toContain('__eufemiaColorScheme')
    })

    it('swaps eufemia-theme__color-scheme-- classes', () => {
      const script = getContentScript()
      expect(script).toContain('eufemia-theme__color-scheme--')
    })
  })
})
