/**
 * Element Test
 *
 */

import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import Anchor, { scrollToHashHandler } from '../Anchor'

describe('Anchor with scrollToHashHandler', () => {
  let location: Location

  beforeEach(() => {
    location = window.location
  })

  it('should call window.scroll', () => {
    const onScroll = jest.fn()

    jest.spyOn(window, 'scroll').mockImplementationOnce(onScroll)
    jest.spyOn(window, 'location', 'get').mockReturnValueOnce({
      ...location,
      href: 'http://localhost/path',
    })

    render(
      <>
        <Anchor onClick={scrollToHashHandler} href="/path/#hash-id">
          text
        </Anchor>
        <span id="hash-id" />
      </>
    )

    const element = document.querySelector('a')
    fireEvent.click(element)

    expect(onScroll).toHaveBeenCalledTimes(1)
    expect(onScroll).toHaveBeenCalledWith({ top: 0 })
  })

  it('should use last hash', () => {
    const onScroll = jest.fn()

    jest.spyOn(window, 'scroll').mockImplementationOnce(onScroll)
    jest.spyOn(window, 'location', 'get').mockReturnValueOnce({
      ...location,
      href: 'http://localhost/path',
    })

    render(
      <>
        <Anchor
          onClick={scrollToHashHandler}
          href="/path/#first-hash#hash-id"
        >
          text
        </Anchor>
        <span id="hash-id" />
      </>
    )

    const element = document.querySelector('a')
    fireEvent.click(element)

    expect(onScroll).toHaveBeenCalledTimes(1)
    expect(onScroll).toHaveBeenCalledWith({ top: 0 })
  })

  it('should not call window.scroll when no hash-id found', () => {
    const onScroll = jest.fn()

    jest.spyOn(window, 'scroll').mockImplementationOnce(onScroll)
    jest.spyOn(window, 'location', 'get').mockReturnValueOnce({
      ...location,
      href: 'http://localhost/path',
    })

    render(
      <>
        <Anchor onClick={scrollToHashHandler} href="/path/#hash-id">
          text
        </Anchor>
        <span id="other-id" />
      </>
    )

    const element = document.querySelector('a')
    fireEvent.click(element)

    expect(onScroll).toHaveBeenCalledTimes(0)
  })

  it('will skip when no # exists in href', () => {
    const onScroll = jest.fn()

    jest.spyOn(window, 'scroll').mockImplementationOnce(onScroll)
    jest.spyOn(window, 'location', 'get').mockReturnValueOnce({
      ...location,
      href: 'http://localhost/path',
    })

    render(
      <Anchor onClick={scrollToHashHandler} href="/path">
        text
      </Anchor>
    )

    const element = document.querySelector('a')
    fireEvent.click(element)

    expect(onScroll).toHaveBeenCalledTimes(0)
  })

  it('should not call window.scroll when not on same page', () => {
    const onScroll = jest.fn()

    jest.spyOn(window, 'scroll').mockImplementationOnce(onScroll)
    jest.spyOn(window, 'location', 'get').mockReturnValueOnce({
      ...location,
      href: 'http://localhost/path',
    })

    render(
      <>
        <Anchor onClick={scrollToHashHandler} href="/other-path/#hash-id">
          text
        </Anchor>
        <span id="hash-id" />
      </>
    )

    const element = document.querySelector('a')
    fireEvent.click(element)

    expect(onScroll).toHaveBeenCalledTimes(0)
  })
})
