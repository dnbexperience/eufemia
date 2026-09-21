import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { usePortalHead } from '../PortalHead'

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
  // which is what crawlers and share previews read.
  it('updates the description through the content attribute', () => {
    renderHook(() =>
      usePortalHead({ title: null, description: 'A clickable button' })
    )

    expect(
      document
        .querySelector('meta[name="description"]')
        .getAttribute('content')
    ).toBe('A clickable button')
  })

  it('keeps the prerendered description when a page has none', () => {
    renderHook(() => usePortalHead({ title: 'Button', description: null }))

    expect(
      document
        .querySelector('meta[name="description"]')
        .getAttribute('content')
    ).toBe('Prerendered description')
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
