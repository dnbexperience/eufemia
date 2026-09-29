/**
 * Element Test
 *
 */

import { fireEvent, render } from '@testing-library/react'
import Anchor, { scrollToHash } from '../Anchor'

describe('Anchor with scrollToHash', () => {
  it('should call window.scroll', () => {
    const onScroll = vi.fn()

    vi.spyOn(window, 'scroll').mockImplementationOnce(onScroll)

    render(
      <>
        <Anchor onClick={() => scrollToHash('/path#hash-id')}>text</Anchor>
        <span id="hash-id" />
      </>
    )

    fireEvent.click(document.querySelector('a'))

    expect(onScroll).toHaveBeenCalledTimes(1)
    expect(onScroll).toHaveBeenCalledWith({ top: 0 })
  })

  it('should support undefined', () => {
    expect(() => {
      scrollToHash(undefined)
    }).not.toThrow()
  })

  it('should find an element whose id contains non-ASCII characters', () => {
    vi.spyOn(window, 'scroll').mockImplementationOnce(vi.fn())

    render(<span id="søknad" />)

    expect(scrollToHash('/path#s%C3%B8knad')?.element).toBe(
      document.getElementById('søknad')
    )
  })
})
