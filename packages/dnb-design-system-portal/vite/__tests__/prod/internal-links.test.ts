import { describe, expect, it } from 'vitest'
import {
  formatInternalLinkErrors,
  validateInternalLinks,
} from '../../prod/internal-links.mjs'

describe('internal link validation', () => {
  it('resolves normalized page, hash and redirected links', () => {
    const result = validateInternalLinks([
      {
        url: '/guide/',
        html: `
          <main id="content">
            <a href="#intro">Intro</a>
            <a href="#content">Wrapper</a>
            <a href="../components/button?theme=ui#events">Events</a>
            <a href="https://eufemia.dnb.no/old-button/#events">Old URL</a>
            <a href="https://example.com/missing">External</a>
          </main>
          <h2 id="intro">Introduction</h2>
        `,
      },
      {
        url: '/components/button/',
        html: '<h2 id="events">Events</h2>',
      },
      {
        url: '/old-button/',
        html: '',
        redirect: '/components/button/',
      },
    ])

    expect(result.errors).toEqual([])
  })

  it('reports missing pages and anchors', () => {
    const result = validateInternalLinks([
      {
        url: '/guide/',
        html: `
          <a href="/missing/">Missing page</a>
          <a href="/target/#missing">Missing anchor</a>
        `,
      },
      { url: '/target/', html: '<h2 id="present">Present</h2>' },
    ])

    expect(result.errors).toEqual([
      {
        type: 'missing-page',
        source: '/guide/',
        href: '/missing/',
        target: '/missing/',
      },
      {
        type: 'missing-anchor',
        source: '/guide/',
        href: '/target/#missing',
        target: '/target/',
        anchor: 'missing',
      },
    ])
    expect(formatInternalLinkErrors(result.errors)).toContain(
      '/guide/ -> /target/#missing (missing anchor: missing)'
    )
  })

  it('ignores links and ids only inside explicit exclusion boundaries', () => {
    const result = validateInternalLinks([
      {
        url: '/',
        html: `
          <a href="/valid/">Valid</a>
          <a href="#example-id">Into the example</a>
          <div data-link-check="ignore">
            <a href="/example-only/">Example</a>
            <div id="example-id"></div>
          </div>
        `,
      },
      { url: '/valid/', html: '' },
    ])

    // The example link is not reported, but its id was never registered
    // either, so linking to it from outside the boundary still fails.
    expect(result.errors).toEqual([
      {
        type: 'missing-anchor',
        source: '/',
        href: '#example-id',
        target: '/',
        anchor: 'example-id',
      },
    ])
  })

  it('validates page links whose last segment looks like a file name', () => {
    const result = validateInternalLinks([
      {
        url: '/releases/',
        html: `
          <a href="/releases/v4.10-info/">Existing</a>
          <a href="/releases/v4.11-info/">Typo</a>
        `,
      },
      { url: '/releases/v4.10-info/', html: '' },
    ])

    expect(result.errors).toEqual([
      {
        type: 'missing-page',
        source: '/releases/',
        href: '/releases/v4.11-info/',
        target: '/releases/v4.11-info/',
      },
    ])
  })

  it('accepts links to emitted files and reports the missing ones', () => {
    const result = validateInternalLinks(
      [
        {
          url: '/',
          html: `
            <a href="/favicon-32x32.png">Icon</a>
            <a href="/dnb/logo%20mark.svg">Encoded name</a>
            <a href="/missing-icon.png">Gone</a>
            <a href="/mailto:someone@example.com">Mangled scheme</a>
          `,
        },
      ],
      {
        emittedFiles: new Set([
          '/favicon-32x32.png',
          '/dnb/logo mark.svg',
          '/index.html',
        ]),
      }
    )

    expect(result.errors).toEqual([
      {
        type: 'missing-page',
        source: '/',
        href: '/missing-icon.png',
        target: '/missing-icon.png/',
      },
      {
        type: 'missing-page',
        source: '/',
        href: '/mailto:someone@example.com',
        target: '/mailto:someone@example.com/',
      },
    ])
  })

  it('reports redirects that point to missing pages or loop', () => {
    const result = validateInternalLinks([
      { url: '/', html: '<a href="/old/">Old</a>' },
      { url: '/old/', html: '', redirect: '/older/' },
      { url: '/older/', html: '', redirect: '/old/' },
      { url: '/gone/', html: '', redirect: '/missing/' },
    ])

    expect(result.errors).toContainEqual({
      type: 'redirect-loop',
      source: '/old/',
      target: '/older/',
    })
    expect(result.errors).toContainEqual({
      type: 'missing-redirect-target',
      source: '/gone/',
      target: '/missing/',
    })
  })

  it('keeps CI output bounded for site-wide navigation failures', () => {
    const errors = Array.from({ length: 101 }, (_, index) => ({
      type: 'missing-page',
      source: `/page-${index}/`,
      href: '/missing/',
      target: '/missing/',
    }))

    const output = formatInternalLinkErrors(errors)

    expect(output).toContain('... and 1 more broken links')
    expect(output).not.toContain('/page-100/ ->')
  })
})
