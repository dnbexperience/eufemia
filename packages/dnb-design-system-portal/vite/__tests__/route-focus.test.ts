import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@dnb/eufemia/src/shared/helpers', () => ({
  applyPageFocus: vi.fn(),
  setPageFocusElement: vi.fn(),
}))

import {
  applyPageFocus,
  setPageFocusElement,
} from '@dnb/eufemia/src/shared/helpers'
import { applyRouteFocus } from '../client/route-focus'

describe('applyRouteFocus', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    document.body.replaceChildren()
  })

  it('keeps native browser focus behavior when a hash target exists', () => {
    const heading = document.createElement('h3')
    const element = document.createElement('a')
    element.className = 'anchor-hash'
    element.setAttribute('aria-hidden', 'true')
    heading.append(element)

    element.id = 'variant-tertiary'
    document.body.append(heading)
    const scrollIntoView = vi.fn()
    element.scrollIntoView = scrollIntoView

    applyRouteFocus('#variant-tertiary')

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'instant' })
    expect(element.parentElement.classList.contains('focus')).toBe(true)
    expect(setPageFocusElement).toHaveBeenCalledWith(heading, 'route-hash')
    expect(applyPageFocus).toHaveBeenCalledWith('route-hash')
  })

  it('keeps native browser focus behavior for visible hash targets too', () => {
    const element = document.createElement('section')

    element.id = 'details'
    document.body.append(element)
    const scrollIntoView = vi.fn()
    element.scrollIntoView = scrollIntoView

    applyRouteFocus('#details')

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'instant' })
    expect(setPageFocusElement).toHaveBeenCalledWith(element, 'route-hash')
    expect(applyPageFocus).toHaveBeenCalledWith('route-hash')
  })

  it('falls back to content focus when there is no hash', () => {
    applyRouteFocus('')

    expect(applyPageFocus).toHaveBeenCalledWith('content')
  })

  it('uses the page scroll preference for a link clicked within the page', () => {
    const element = document.createElement('section')
    element.id = 'details'
    document.body.append(element)
    const scrollIntoView = vi.fn()
    element.scrollIntoView = scrollIntoView

    applyRouteFocus('#details', 'auto')

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'auto' })
  })

  it('does not replace native behavior even when the hash target is missing', () => {
    applyRouteFocus('#missing-target')

    expect(setPageFocusElement).not.toHaveBeenCalled()
    expect(applyPageFocus).not.toHaveBeenCalled()
  })
})
