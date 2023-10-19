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

  it('should not call preventDefault', () => {
    const preventDefault = jest.fn()
    const onScroll = jest.fn()

    jest.spyOn(window, 'scroll').mockImplementationOnce(onScroll)
    jest.spyOn(window, 'location', 'get').mockReturnValueOnce({
      ...location,
      href: 'http://localhost/path',
    })

    render(
      <>
        <Anchor
          onClick={(event) =>
            scrollToHashHandler({ ...event, preventDefault })
          }
          href="/path/#hash-id"
        >
          text
        </Anchor>
        <span id="hash-id" />
      </>
    )

    const element = document.querySelector('a')
    fireEvent.click(element)

    expect(preventDefault).toHaveBeenCalledTimes(0)
    expect(onScroll).toHaveBeenCalledTimes(1)
  })

  it('should return { element } on match', () => {
    let returnResult = null

    const onScroll = jest.fn()
    const onClick = jest.fn((event) => {
      returnResult = scrollToHashHandler(event)
    })

    jest.spyOn(window, 'scroll').mockImplementationOnce(onScroll)
    jest.spyOn(window, 'location', 'get').mockReturnValueOnce({
      ...location,
      href: 'http://localhost/path',
    })

    render(
      <>
        <Anchor onClick={onClick} href="/path/#hash-id">
          text
        </Anchor>
        <span id="hash-id" />
      </>
    )

    const spanElement = document.querySelector('span')
    const anchorElement = document.querySelector('a')
    fireEvent.click(anchorElement)

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onClick).toHaveBeenCalledWith(
      expect.objectContaining({ target: anchorElement })
    )
    expect(onScroll).toHaveBeenCalledTimes(1)
    expect(returnResult).toEqual(
      expect.objectContaining({ element: spanElement })
    )
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
