import React from 'react'
import { act, render } from '@testing-library/react'
import { makeUniqueId } from '../../../../../shared/component-helper'
import useQueryLocator from '../useQueryLocator'
import useStep from '../useStep'
import { Form, Steps } from '../../..'
import userEvent from '@testing-library/user-event'

describe('useQueryLocator', () => {
  let identifier: string
  let popstateListener = jest.fn()

  beforeEach(() => {
    identifier = makeUniqueId()
  })

  const previousButton = () => {
    return document.querySelector('.dnb-forms-previous-button')
  }
  const nextButton = () => {
    return document.querySelector('.dnb-forms-next-button')
  }
  const output = () => {
    return document.querySelector('output')
  }
  const mockUrl = () => {
    const search = 'existing-query=foo&bar=baz'
    Object.defineProperty(window, 'location', {
      value: {
        href: `http://localhost/?${search}`,
        search,
      },
      writable: true,
    })

    window.history.pushState = jest.fn((data, unused, url) => {
      url = new URL(url)
      window.location.href = url.toString()
      window.location.search = url.searchParams.toString()
    })

    popstateListener = jest.fn()
    window.addEventListener = jest.fn((name, listener) => {
      if (name === 'popstate') {
        popstateListener.mockImplementation(listener as any)
      }
    })
  }
  const visitStep = (index) => {
    const url = new URL(window.location.href)
    url.searchParams.set(`${identifier}-step`, String(index))
    window.history.pushState({}, '', url.toString())

    act(() => {
      popstateListener()
    })
  }
  const Step = () => {
    const { activeIndex } = useStep(identifier)
    const { getIndex } = useQueryLocator(identifier)
    return (
      <Steps.Step>
        <output>
          {JSON.stringify({ activeIndex, index: getIndex() })}
        </output>
        <Steps.Buttons />
      </Steps.Step>
    )
  }

  it('should update the URL query parameter on step change', async () => {
    mockUrl()

    render(
      <Form.Handler>
        <Steps.Layout mode="loose" id={identifier}>
          <Step />
          <Step />
          <Step />
        </Steps.Layout>
      </Form.Handler>
    )

    expect(output()).toHaveTextContent('{"activeIndex":0,"index":null}')
    expect(window.location.search).toBe('existing-query=foo&bar=baz')
    expect(window.history.pushState).toHaveBeenCalledTimes(0)

    await userEvent.click(nextButton())

    expect(output()).toHaveTextContent('{"activeIndex":1,"index":1}')
    expect(window.location.search).toBe(
      `existing-query=foo&bar=baz&${identifier}-step=1`
    )
    expect(window.history.pushState).toHaveBeenCalledWith(
      {},
      '',
      `http://localhost/?existing-query=foo&bar=baz&${identifier}-step=1`
    )

    await userEvent.click(nextButton())

    expect(output()).toHaveTextContent('{"activeIndex":2,"index":2}')
    expect(window.location.search).toBe(
      `existing-query=foo&bar=baz&${identifier}-step=2`
    )
    expect(window.history.pushState).toHaveBeenCalledWith(
      {},
      '',
      `http://localhost/?existing-query=foo&bar=baz&${identifier}-step=2`
    )

    await userEvent.click(previousButton())

    expect(output()).toHaveTextContent('{"activeIndex":1,"index":1}')
    expect(window.location.search).toBe(
      `existing-query=foo&bar=baz&${identifier}-step=1`
    )
    expect(window.history.pushState).toHaveBeenCalledWith(
      {},
      '',
      `http://localhost/?existing-query=foo&bar=baz&${identifier}-step=1`
    )
  })

  it('should react to url change', async () => {
    mockUrl()

    render(
      <Form.Handler>
        <Steps.Layout mode="loose" id={identifier}>
          <Step />
          <Step />
          <Step />
        </Steps.Layout>
      </Form.Handler>
    )

    expect(output()).toHaveTextContent('{"activeIndex":0,"index":null}')
    expect(window.location.search).toBe('existing-query=foo&bar=baz')
    expect(window.history.pushState).toHaveBeenCalledTimes(0)

    visitStep(1)

    expect(output()).toHaveTextContent('{"activeIndex":1,"index":1}')
    expect(window.location.search).toBe(
      `existing-query=foo&bar=baz&${identifier}-step=1`
    )
    expect(window.history.pushState).toHaveBeenCalledWith(
      {},
      '',
      `http://localhost/?existing-query=foo&bar=baz&${identifier}-step=1`
    )

    visitStep(2)

    expect(output()).toHaveTextContent('{"activeIndex":2,"index":2}')
    expect(window.location.search).toBe(
      `existing-query=foo&bar=baz&${identifier}-step=2`
    )
    expect(window.history.pushState).toHaveBeenCalledWith(
      {},
      '',
      `http://localhost/?existing-query=foo&bar=baz&${identifier}-step=2`
    )

    visitStep(1)

    expect(output()).toHaveTextContent('{"activeIndex":1,"index":1}')
    expect(window.location.search).toBe(
      `existing-query=foo&bar=baz&${identifier}-step=1`
    )
    expect(window.history.pushState).toHaveBeenCalledWith(
      {},
      '',
      `http://localhost/?existing-query=foo&bar=baz&${identifier}-step=1`
    )
  })

  it('should handle and show try/catch errors', async () => {
    mockUrl()

    Object.defineProperty(window, 'URL', {
      value: () => {
        return {
          searchParams: {
            set: undefined,
          },
        }
      },
      writable: true,
    })

    render(
      <Form.Handler>
        <Steps.Layout id={identifier}>
          <Step />
        </Steps.Layout>
      </Form.Handler>
    )

    expect(document.querySelector('.dnb-form-status')).toBeNull()

    await userEvent.click(nextButton())

    expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
      'URL is not a constructor'
    )
  })
})
