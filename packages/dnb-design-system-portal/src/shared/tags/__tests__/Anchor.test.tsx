import { describe, it, expect, afterEach } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'

import Anchor from '../Anchor'

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

    expect(anchor.getAttribute('href')).toBe('/uilib/components/anchor')
    expect(anchor.hasAttribute('data-discover')).toBe(true)
  })

  it('opens absolute urls in a new window', () => {
    const anchor = renderAnchor('https://dnb.no')

    expect(anchor.getAttribute('href')).toBe('https://dnb.no')
    expect(anchor.getAttribute('target')).toBe('_blank')
    expect(anchor.getAttribute('rel')).toBe('noreferrer')
  })
})
