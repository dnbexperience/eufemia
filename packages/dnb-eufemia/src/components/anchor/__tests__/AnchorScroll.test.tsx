/**
 * Element Test
 *
 */

import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import Anchor, { scrollToHash } from '../Anchor'

describe('Anchor with scrollToHash', () => {
  it('should call window.scroll', () => {
    const onScroll = jest.fn()

    jest.spyOn(window, 'scroll').mockImplementationOnce(onScroll)

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
})
