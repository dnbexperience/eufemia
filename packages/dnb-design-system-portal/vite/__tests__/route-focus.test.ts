import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@dnb/eufemia/src/shared/helpers', () => ({
  applyPageFocus: vi.fn(),
  setPageFocusElement: vi.fn(),
}))

vi.mock('@dnb/eufemia/src/components/Anchor', () => ({
  scrollToHash: vi.fn(),
}))

import {
  applyPageFocus,
  setPageFocusElement,
} from '@dnb/eufemia/src/shared/helpers'
import { scrollToHash } from '@dnb/eufemia/src/components/Anchor'
import { applyRouteFocus } from '../client/route-focus'

describe('applyRouteFocus', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('keeps native browser focus behavior when a hash target exists', () => {
    const heading = document.createElement('h3')
    const element = document.createElement('a')
    element.className = 'anchor-hash'
    element.setAttribute('aria-hidden', 'true')
    heading.append(element)

    vi.mocked(scrollToHash).mockReturnValue({ element })

    applyRouteFocus('#variant-tertiary')

    expect(scrollToHash).toHaveBeenCalledWith('#variant-tertiary')
    expect(setPageFocusElement).toHaveBeenCalledWith(heading, 'route-hash')
    expect(applyPageFocus).toHaveBeenCalledWith('route-hash')
  })

  it('keeps native browser focus behavior for visible hash targets too', () => {
    const element = document.createElement('section')

    vi.mocked(scrollToHash).mockReturnValue({ element })

    applyRouteFocus('#details')

    expect(scrollToHash).toHaveBeenCalledWith('#details')
    expect(setPageFocusElement).toHaveBeenCalledWith(element, 'route-hash')
    expect(applyPageFocus).toHaveBeenCalledWith('route-hash')
  })

  it('falls back to content focus when there is no hash', () => {
    applyRouteFocus('')

    expect(scrollToHash).not.toHaveBeenCalled()
    expect(applyPageFocus).toHaveBeenCalledWith('content')
  })

  it('does not replace native behavior even when the hash target is missing', () => {
    vi.mocked(scrollToHash).mockReturnValue(undefined)

    applyRouteFocus('#missing-target')

    expect(scrollToHash).toHaveBeenCalledWith('#missing-target')
    expect(setPageFocusElement).not.toHaveBeenCalled()
    expect(applyPageFocus).not.toHaveBeenCalled()
  })
})
