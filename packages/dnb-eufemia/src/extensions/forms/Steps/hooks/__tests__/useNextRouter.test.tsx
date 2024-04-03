import React, {
  createRef,
  useCallback,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import { act, render } from '@testing-library/react'
import { makeUniqueId } from '../../../../../shared/component-helper'
import useNextRouter from '../useNextRouter'
import useStep from '../useStep'
import { Form, Steps } from '../../..'
import userEvent from '@testing-library/user-event'

describe('useNextRouter', () => {
  let identifier: string

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
        pathname: 'http://localhost/',
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
  }
  const getHookMock = () => {
    const forceUpdateRef: React.MutableRefObject<() => void> = createRef()

    const useRouter = jest.fn(() => {
      const push = useCallback((href) => {
        const url = new URL(href)
        window.location.search = url.searchParams.toString()
        forceUpdateRef.current()
      }, [])

      return useMemo(() => {
        return { push }
      }, [push])
    })
    const usePathname = jest.fn(() => {
      return window.location.pathname
    })
    const useSearchParams = jest.fn(() => {
      const [, fU] = useReducer(() => ({}), {})
      const paramsRef = useRef(new URLSearchParams(window.location.search))

      forceUpdateRef.current = useCallback(() => {
        paramsRef.current = new URLSearchParams(window.location.search)
        fU()
      }, [])

      return paramsRef.current
    })

    return {
      usePathname,
      useSearchParams,
      useRouter,
      forceUpdateRef,
    }
  }

  const visitStep = (index) => {
    const url = new URL(window.location.href)
    url.searchParams.set(`${identifier}-step`, String(index))
    window.history.pushState({}, '', url.toString())
  }

  it('should update the URL query parameter on step change', async () => {
    mockUrl()

    const { useRouter, usePathname, useSearchParams } = getHookMock()

    const Step = () => {
      const { activeIndex } = useStep(identifier)
      const { getIndex } = useNextRouter(identifier, {
        useRouter,
        usePathname,
        useSearchParams,
      })
      return (
        <Steps.Step>
          <output>
            {JSON.stringify({ activeIndex, index: getIndex() })}
          </output>
          <Steps.Buttons />
        </Steps.Step>
      )
    }

    render(
      <Form.Handler>
        <Steps.Layout mode="loose" id={identifier}>
          <Step />
          <Step />
        </Steps.Layout>
      </Form.Handler>
    )

    expect(output()).toHaveTextContent('{"activeIndex":0,"index":null}')
    expect(window.location.search).toBe('existing-query=foo&bar=baz')

    await userEvent.click(nextButton())

    expect(output()).toHaveTextContent('{"activeIndex":1,"index":1}')
    expect(window.location.search).toBe(
      `existing-query=foo&bar=baz&${identifier}-step=1`
    )

    await userEvent.click(previousButton())

    expect(output()).toHaveTextContent('{"activeIndex":0,"index":null}')
    expect(window.location.search).toBe(
      `existing-query=foo&bar=baz&${identifier}-step=0`
    )
  })

  it('should react to url change', async () => {
    mockUrl()

    const { useRouter, usePathname, useSearchParams, forceUpdateRef } =
      getHookMock()

    const Step = () => {
      const { activeIndex } = useStep(identifier)
      const { getIndex } = useNextRouter(identifier, {
        useRouter,
        usePathname,
        useSearchParams,
      })
      return (
        <Steps.Step>
          <output>
            {JSON.stringify({ activeIndex, index: getIndex() })}
          </output>
          <Steps.Buttons />
        </Steps.Step>
      )
    }

    render(
      <Form.Handler>
        <Steps.Layout mode="loose" id={identifier}>
          <Step />
          <Step />
        </Steps.Layout>
      </Form.Handler>
    )

    expect(output()).toHaveTextContent('{"activeIndex":0,"index":null}')
    expect(window.location.search).toBe('existing-query=foo&bar=baz')
    expect(window.history.pushState).toHaveBeenCalledTimes(0)

    visitStep(1)
    act(forceUpdateRef.current)

    expect(output()).toHaveTextContent('{"activeIndex":1,"index":1}')
    expect(window.location.search).toBe(
      `existing-query=foo&bar=baz&${identifier}-step=1`
    )
    expect(window.history.pushState).toHaveBeenCalledWith(
      {},
      '',
      `http://localhost/?existing-query=foo&bar=baz&${identifier}-step=1`
    )

    visitStep(0)
    act(forceUpdateRef.current)

    expect(output()).toHaveTextContent('{"activeIndex":0,"index":null}')
    expect(window.location.search).toBe(
      `existing-query=foo&bar=baz&${identifier}-step=0`
    )
    expect(window.history.pushState).toHaveBeenCalledWith(
      {},
      '',
      `http://localhost/?existing-query=foo&bar=baz&${identifier}-step=1`
    )
  })

  it('should handle and show try/catch errors', async () => {
    mockUrl()

    const usePathname = jest.fn()
    const get = jest.fn()
    const searchParams = { get }
    const useRouter = jest.fn()
    const useSearchParams = jest.fn(() => {
      return searchParams
    })

    const Step = () => {
      useNextRouter(identifier, {
        useRouter,
        usePathname,
        useSearchParams,
      })
      return (
        <Steps.Step>
          <Steps.Buttons />
        </Steps.Step>
      )
    }

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
      "Cannot read properties of undefined (reading 'push')"
    )
  })
})
