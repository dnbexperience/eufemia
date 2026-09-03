import { describe, it, expect, afterEach, vi } from 'vitest'
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react'
import { MemoryRouter } from 'react-router'

vi.mock('../AutoLinkHeader.module.scss', () => ({
  anchorLinkStyle: 'anchorLinkStyle',
  headingContentStyle: 'headingContentStyle',
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
  it('renders the decorative "#" anchor after the heading text', () => {
    renderHeader()

    const anchor =
      document.querySelector<HTMLAnchorElement>('.anchor-hash')
    const heading = anchor?.parentElement

    expect(anchor).toBeTruthy()
    expect(anchor?.getAttribute('href')).toBe('#my-heading')
    expect(heading?.textContent?.startsWith('My Heading#')).toBe(true)
    expect(anchor?.parentElement?.classList).toContain(
      'headingContentStyle'
    )
  })

  it('makes the anchor available to keyboard and screen reader users', () => {
    renderHeader()

    const anchor =
      document.querySelector<HTMLAnchorElement>('.anchor-hash')

    expect(anchor?.getAttribute('tabindex')).toBeNull()
    expect(anchor?.getAttribute('aria-hidden')).toBeNull()
    expect(anchor?.getAttribute('aria-label')).toBe('Link to My Heading')
    expect(anchor?.closest('h1')?.getAttribute('aria-label')).toBe(
      'My Heading'
    )

    anchor?.focus()

    expect(document.activeElement).toBe(anchor)
  })

  it('updates the hash without native navigation or highlighting the heading', async () => {
    renderHeader()

    const anchor =
      document.querySelector<HTMLAnchorElement>('.anchor-hash')
    const headingContent = anchor?.parentElement
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })

    fireEvent.mouseEnter(anchor)
    fireEvent(anchor, event)

    expect(event.defaultPrevented).toBe(true)
    expect(window.location.hash).toBe('#my-heading')
    expect(headingContent?.classList).not.toContain('focus')
    await waitFor(() => {
      expect(document.body.textContent).toContain('Copied')
    })
  })
})
