import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { usePortalHead } from '../PortalHead'

// Mirrors site.siteMetadata.description from the portal-query shim.
const siteDescription =
  'Eufemia Design System is the go-to place for all who has to design, develop and make digital WEB applications for DNB.'

function getDescription() {
  return document
    .querySelector('meta[name="description"]')
    .getAttribute('content')
}

describe('usePortalHead', () => {
  beforeEach(() => {
    document.head.innerHTML =
      '<title id="head-title">Eufemia</title>' +
      '<meta id="head-description" name="description" content="Prerendered description">'
  })

  it('formats the title', () => {
    renderHook(() => usePortalHead({ title: 'Button', description: null }))

    expect(document.getElementById('head-title').textContent).toBe(
      'Button | Eufemia'
    )
  })

  // Assigning textContent to a <meta> leaves the content attribute alone,
  // which is the only part of the element anything reads.
  it('updates the description through the content attribute', () => {
    renderHook(() =>
      usePortalHead({ title: null, description: 'A clickable button' })
    )

    expect(getDescription()).toBe('A clickable button')
  })

  it('falls back to the site description when a page declares none', () => {
    const { rerender } = renderHook(
      (props: { title: string; description: string | undefined }) =>
        usePortalHead(props),
      {
        initialProps: {
          title: 'Button',
          description: 'A clickable button',
        },
      }
    )

    expect(getDescription()).toBe('A clickable button')

    rerender({ title: 'Colors', description: undefined })

    expect(getDescription()).toBe(siteDescription)
  })

  it('does not throw when the head elements are missing', () => {
    document.head.innerHTML = ''

    expect(() =>
      renderHook(() =>
        usePortalHead({ title: 'Button', description: 'A button' })
      )
    ).not.toThrow()
  })
})
