import { describe, it, expect, afterEach, vi } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'

vi.mock('../AutoLinkHeader.module.scss', () => ({
  anchorLinkStyle: 'anchorLinkStyle',
}))

import AutoLinkHeader from '../AutoLinkHeader'

afterEach(cleanup)

function renderHeader(props = {}) {
  return render(
    <MemoryRouter>
      <AutoLinkHeader level={1} {...props}>
        My Heading
      </AutoLinkHeader>
    </MemoryRouter>
  )
}

describe('AutoLinkHeader', () => {
  it('renders the decorative "#" anchor inside the heading', () => {
    renderHeader()

    const anchor = document.querySelector('.anchor-hash')

    expect(anchor).toBeTruthy()
    expect(anchor?.getAttribute('href')).toBe('#my-heading')
  })

  it('keeps the decorative "#" anchor out of the keyboard tab order', () => {
    // Regression: the anchor is only revealed on :hover, so a leftover
    // pointer hover after a click-navigation could make it tabbable and let
    // Tab land on it instead of the next element (e.g. the page tablist).
    renderHeader()

    const anchor = document.querySelector('.anchor-hash')

    expect(anchor?.getAttribute('tabindex')).toBe('-1')
  })

  it('hides the decorative "#" anchor from assistive technology', () => {
    renderHeader()

    const anchor = document.querySelector('.anchor-hash')

    expect(anchor?.getAttribute('aria-hidden')).toBe('true')
  })
})
