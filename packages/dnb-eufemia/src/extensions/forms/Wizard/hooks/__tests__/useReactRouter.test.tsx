import React, { createRef, useCallback, useReducer, useRef } from 'react'
import { act, render } from '@testing-library/react'
import { makeUniqueId } from '../../../../../shared/component-helper'
import useReactRouter from '../useReactRouter'
import useStep from '../useStep'
import { Form, Wizard } from '../../..'
import userEvent from '@testing-library/user-event'

describe('useReactRouter', () => {
  let identifier: string
  let stepIndex = null

  beforeEach(() => {
    stepIndex = null
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
  const mockUrl = (
    { search } = { search: 'existing-query=foo&bar=baz' }
  ) => {
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
  }
  const getHookMock = () => {
    const forceUpdateRef: React.MutableRefObject<() => void> = createRef()

    const get = jest.fn((key = null) => {
      if (key) {
        const searchParams = new URLSearchParams(window.location.search)
        return searchParams.get(key)
      }
      return stepIndex
    })
    const set = jest.fn((key, index) => {
      stepIndex = index
      const searchParams = new URLSearchParams(window.location.search)
      searchParams.set(key, index)
      window.location.search = searchParams.toString()
    })
    const searchParams = { get, set }
    const setSearchParams = jest.fn()
    const useSearchParams = jest.fn(() => {
      const [, fU] = useReducer(() => ({}), {})
      const paramsRef = useRef(searchParams)

      forceUpdateRef.current = useCallback(() => {
        paramsRef.current = { ...searchParams }
        fU()
      }, [])

      return [paramsRef.current, setSearchParams]
    })

    return {
      useSearchParams,
      setSearchParams,
      set,
      searchParams,
      forceUpdateRef,
    }
  }

  const visitStep = (index) => {
    stepIndex = index
    const url = new URL(window.location.href)
    url.searchParams.set(`${identifier}-step`, String(index))
    window.history.pushState({}, '', url.toString())
  }

  it('should update the URL query parameter on step change', async () => {
    mockUrl()

    const { useSearchParams, setSearchParams, set, searchParams } =
      getHookMock()

    const MockComponent = () => {
      const { activeIndex } = useStep(identifier)
      const { getIndex } = useReactRouter(identifier, { useSearchParams })
      return (
        <Form.Handler>
          <output>
            {JSON.stringify({ activeIndex, index: getIndex() })}
          </output>
          <Wizard.Container mode="loose" id={identifier}>
            <Wizard.Step title="Step 1">
              <Wizard.Buttons />
            </Wizard.Step>
            <Wizard.Step title="Step 2">
              <Wizard.Buttons />
            </Wizard.Step>
            <Wizard.Step title="Step 3">
              <Wizard.Buttons />
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )
    }

    render(<MockComponent />)

    expect(output()).toHaveTextContent('{"activeIndex":0,"index":null}')
    expect(set).toHaveBeenCalledTimes(0)
    expect(window.location.search).toBe('existing-query=foo&bar=baz')

    await userEvent.click(nextButton())

    expect(output()).toHaveTextContent('{"activeIndex":1,"index":1}')
    expect(set).toHaveBeenLastCalledWith(`${identifier}-step`, 1)
    expect(window.location.search).toBe(
      `existing-query=foo&bar=baz&${identifier}-step=1`
    )

    await userEvent.click(nextButton())

    expect(output()).toHaveTextContent('{"activeIndex":2,"index":2}')
    expect(set).toHaveBeenLastCalledWith(`${identifier}-step`, 2)
    expect(window.location.search).toBe(
      `existing-query=foo&bar=baz&${identifier}-step=2`
    )

    await userEvent.click(previousButton())

    expect(output()).toHaveTextContent('{"activeIndex":1,"index":1}')
    expect(set).toHaveBeenLastCalledWith(`${identifier}-step`, 1)
    expect(window.location.search).toBe(
      `existing-query=foo&bar=baz&${identifier}-step=1`
    )

    expect(setSearchParams).toHaveBeenCalledTimes(3)
    expect(setSearchParams).toHaveBeenLastCalledWith(searchParams)
    expect(set).toHaveBeenCalledTimes(3)
  })

  it('should react to url change', async () => {
    mockUrl()

    const { useSearchParams, forceUpdateRef } = getHookMock()

    const Step = () => {
      const { activeIndex } = useStep(identifier)
      const { getIndex } = useReactRouter(identifier, { useSearchParams })
      return (
        <Wizard.Step>
          <output>
            {JSON.stringify({ activeIndex, index: getIndex() })}
          </output>
          <Wizard.Buttons />
        </Wizard.Step>
      )
    }

    render(
      <Form.Handler>
        <Wizard.Container mode="loose" id={identifier}>
          <Step />
          <Step />
          <Step />
        </Wizard.Container>
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

    visitStep(2)
    act(forceUpdateRef.current)

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
  })

  it('should handle and show try/catch errors', async () => {
    mockUrl()

    const get = jest.fn()
    const searchParams = { get }
    const setSearchParams = jest.fn()
    const useSearchParams = jest.fn(() => {
      return [searchParams, setSearchParams]
    })

    const Step = () => {
      useReactRouter(identifier, { useSearchParams })
      return (
        <Wizard.Step>
          <Wizard.Buttons />
        </Wizard.Step>
      )
    }

    render(
      <Form.Handler>
        <Wizard.Container id={identifier}>
          <Step />
          <Step />
        </Wizard.Container>
      </Form.Handler>
    )

    expect(document.querySelector('.dnb-form-status')).toBeNull()

    await userEvent.click(nextButton())

    expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
      'searchParams.set is not a function'
    )
  })

  it('should set initial state given by the url', () => {
    const search = `existing-query=foo&bar=baz&${identifier}-step=1`
    mockUrl({ search })

    const { useSearchParams } = getHookMock()

    const Step = () => {
      const { activeIndex } = useStep(identifier)
      return (
        <Wizard.Step>
          <output>{JSON.stringify({ activeIndex })}</output>
          <Wizard.Buttons />
        </Wizard.Step>
      )
    }

    const MyForm = () => {
      useReactRouter(identifier, { useSearchParams })

      return (
        <Form.Handler>
          <Wizard.Container mode="loose" id={identifier}>
            <Step />
            <Step />
            <Step />
          </Wizard.Container>
        </Form.Handler>
      )
    }

    render(<MyForm />)

    expect(output()).toHaveTextContent('{"activeIndex":1}')
    expect(window.history.pushState).toHaveBeenCalledTimes(0)
  })
})
