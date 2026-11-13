import { describe, it, expect, afterEach } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'

import Anchor, { Link } from '../Anchor'

afterEach(cleanup)

function renderAnchor(href: string) {
  const { container } = render(
    <MemoryRouter>
      <Anchor href={href}>Link</Anchor>
    </MemoryRouter>
  )

  return container.querySelector('a')
}

describe('Anchor', () => {
  it.each(['mailto:john.doe@example.com', 'tel:12345678', 'sms:12345678'])(
    'keeps the %s scheme untouched and out of the router',
    (href) => {
      const anchor = renderAnchor(href)

      expect(anchor.getAttribute('href')).toBe(href)
      expect(anchor.hasAttribute('data-discover')).toBe(false)
    }
  )

  it('turns a bare path into a root-relative router link', () => {
    const anchor = renderAnchor('uilib/components/anchor')

    expect(anchor.getAttribute('href')).toBe('/uilib/components/anchor/')
    expect(anchor.hasAttribute('data-discover')).toBe(true)
  })

  it.each([
    ['/web/components/button', '/web/components/button/'],
    ['/web/components/button#demos', '/web/components/button/#demos'],
    ['/web/components/button?tab=1#a', '/web/components/button/?tab=1#a'],
    [
      '/web/releases-and-upgrades/versions/dnb-ui-lib/v7.2-info',
      '/web/releases-and-upgrades/versions/dnb-ui-lib/v7.2-info/',
    ],
  ])('links %s to the served page URL', (href, expected) => {
    expect(renderAnchor(href).getAttribute('href')).toBe(expected)
  })

  it.each(['/', '/web/components/button/', '/pdf/guide.pdf', '/llms.txt'])(
    'keeps %s as it is',
    (href) => {
      expect(renderAnchor(href).getAttribute('href')).toBe(href)
    }
  )

  it('adds the trailing slash to a Link `to` path', () => {
    const { container } = render(
      <MemoryRouter>
        <Link to="/web/forms/getting-started">Link</Link>
      </MemoryRouter>
    )

    expect(container.querySelector('a').getAttribute('href')).toBe(
      '/web/forms/getting-started/'
    )
  })

  it('adds the trailing slash to a Link `to` object', () => {
    const { container } = render(
      <MemoryRouter>
        <Link
          to={
            {
              pathname: '/web/components/button/properties',
              search: '?fullscreen',
              hash: '',
            } as unknown as string
          }
        >
          Link
        </Link>
      </MemoryRouter>
    )

    expect(container.querySelector('a').getAttribute('href')).toBe(
      '/web/components/button/properties/?fullscreen'
    )
  })

  it('opens absolute urls in a new window', () => {
    const anchor = renderAnchor('https://dnb.no')

    expect(anchor.getAttribute('href')).toBe('https://dnb.no')
    expect(anchor.getAttribute('target')).toBe('_blank')
    expect(anchor.getAttribute('rel')).toBe('noreferrer')
  })
})
