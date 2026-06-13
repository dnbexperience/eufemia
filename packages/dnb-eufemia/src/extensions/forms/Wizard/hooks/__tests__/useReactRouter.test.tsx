import { act, useCallback, useReducer, useRef } from 'react'
import type { RefObject } from 'react'
import { render, renderHook, waitFor } from '@testing-library/react'
import { wait } from '../../../../../core/test-utils/testSetup'
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
    window.history.replaceState({}, '', `http://localhost/?${search}`)

    const realReplaceState = window.history.replaceState.bind(
      window.history
    )
    window.history.pushState = vi.fn((data, unused, url) => {
      realReplaceState(data, unused, url)
    })
  }
  const getHookMock = () => {
    const forceUpdateRef: RefObject<(() => void) | null> = {
      current: null,
    }

    const get = vi.fn((key = null) => {
      if (key) {
        const searchParams = new URLSearchParams(window.location.search)
        return searchParams.get(key)
      }
      return stepIndex
    })
    const set = vi.fn((key, index) => {
      stepIndex = index
      const searchParams = new URLSearchParams(window.location.search)
      searchParams.set(key, index)
      const url = new URL(window.location.href)
      url.search = searchParams.toString()
      window.history.replaceState({}, '', url.toString())
    })
    const searchParams = { get, set }
    const setSearchParams = vi.fn()
    const useSearchParams = vi.fn(() => {
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

  const getRerenderingHookMock = () => {
    const forceUpdateRef: RefObject<(() => void) | null> = {
      current: null,
    }

    const setSearchParams = vi.fn((searchParams: URLSearchParams) => {
      const url = new URL(window.location.href)
      url.search = searchParams.toString()
      window.history.replaceState({}, '', url.toString())
      forceUpdateRef.current?.()
    })

    const useSearchParams = vi.fn(() => {
      const [, fU] = useReducer(() => ({}), {})
      const paramsRef = useRef(new URLSearchParams(window.location.search))

      forceUpdateRef.current = useCallback(() => {
        paramsRef.current = new URLSearchParams(window.location.search)
        fU()
      }, [])

      return [paramsRef.current, setSearchParams] as const
    })

    return {
      useSearchParams,
      setSearchParams,
      forceUpdateRef,
    }
  }

  const visitStep = (index) => {
    stepIndex = index
    const url = new URL(window.location.href)
    url.searchParams.set(`${identifier}-step`, String(index))
    window.history.pushState({}, '', url.toString())
  }
  const removeStep = () => {
    stepIndex = null
    const url = new URL(window.location.href)
    url.searchParams.delete(`${identifier}-step`)
    window.history.replaceState({}, '', url.toString())
  }

  it('should not throw when using an id that has never been mounted', () => {
    mockUrl()

    const { useSearchParams } = getHookMock()
    const { result } = renderHook(() =>
      useReactRouter(identifier, { useSearchParams })
    )

    expect(() => {
      result.current.getIndex()
    }).not.toThrow()
  })

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
    expect(window.location.search).toBe('?existing-query=foo&bar=baz')

    await userEvent.click(nextButton())

    expect(output()).toHaveTextContent('{"activeIndex":1,"index":1}')
    expect(set).toHaveBeenLastCalledWith(`${identifier}-step`, 1)
    expect(window.location.search).toBe(
      `?existing-query=foo&bar=baz&${identifier}-step=1`
    )

    await userEvent.click(nextButton())

    expect(output()).toHaveTextContent('{"activeIndex":2,"index":2}')
    expect(set).toHaveBeenLastCalledWith(`${identifier}-step`, 2)
    expect(window.location.search).toBe(
      `?existing-query=foo&bar=baz&${identifier}-step=2`
    )

    await userEvent.click(previousButton())

    expect(output()).toHaveTextContent('{"activeIndex":1,"index":1}')
    expect(set).toHaveBeenLastCalledWith(`${identifier}-step`, 1)
    expect(window.location.search).toBe(
      `?existing-query=foo&bar=baz&${identifier}-step=1`
    )

    expect(setSearchParams).toHaveBeenCalledTimes(3)
    expect(setSearchParams).toHaveBeenLastCalledWith(searchParams)
    expect(set).toHaveBeenCalledTimes(3)
  })

  it('should call Wizard.Container onStepChange once for each button navigation when updating the URL query parameter', async () => {
    mockUrl()

    const onStepChange = vi.fn()
    const { useSearchParams, setSearchParams } = getRerenderingHookMock()

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
          <Wizard.Container
            mode="loose"
            id={identifier}
            onStepChange={onStepChange}
          >
            <Step />
            <Step />
          </Wizard.Container>
        </Form.Handler>
      )
    }

    render(<MyForm />)

    expect(output()).toHaveTextContent('{"activeIndex":0}')
    expect(onStepChange).toHaveBeenCalledTimes(0)

    await userEvent.click(nextButton())

    await waitFor(() => {
      expect(output()).toHaveTextContent('{"activeIndex":1}')
    })

    expect(setSearchParams).toHaveBeenCalledTimes(1)
    expect(onStepChange).toHaveBeenCalledTimes(1)
    expect(window.location.search).toBe(
      `?existing-query=foo&bar=baz&${identifier}-step=1`
    )

    await userEvent.click(previousButton())

    await waitFor(() => {
      expect(output()).toHaveTextContent('{"activeIndex":0}')
    })

    expect(setSearchParams).toHaveBeenCalledTimes(2)
    expect(onStepChange).toHaveBeenCalledTimes(2)
    expect(window.location.search).toBe(
      `?existing-query=foo&bar=baz&${identifier}-step=0`
    )

    await userEvent.click(nextButton())

    await waitFor(() => {
      expect(output()).toHaveTextContent('{"activeIndex":1}')
    })

    expect(setSearchParams).toHaveBeenCalledTimes(3)
    expect(onStepChange).toHaveBeenCalledTimes(3)
    expect(window.location.search).toBe(
      `?existing-query=foo&bar=baz&${identifier}-step=1`
    )
  })

  it('should write one history entry when multiple hooks listen to the same wizard', async () => {
    mockUrl()

    const { useSearchParams, setSearchParams } = getRerenderingHookMock()

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
      useReactRouter(identifier, { useSearchParams })

      return (
        <Form.Handler>
          <Wizard.Container mode="loose" id={identifier}>
            <Step />
            <Step />
          </Wizard.Container>
        </Form.Handler>
      )
    }

    render(<MyForm />)

    await userEvent.click(nextButton())

    await waitFor(() => {
      expect(output()).toHaveTextContent('{"activeIndex":1}')
    })

    expect(window.location.search).toBe(
      `?existing-query=foo&bar=baz&${identifier}-step=1`
    )
    expect(setSearchParams).toHaveBeenCalledTimes(1)
  })

  it('should call Wizard.Container onStepChange when reacting to url changes after button navigation', async () => {
    mockUrl()

    const onStepChange = vi.fn()
    const { useSearchParams, forceUpdateRef } = getRerenderingHookMock()

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
          <Wizard.Container
            mode="loose"
            id={identifier}
            onStepChange={onStepChange}
          >
            <Step />
            <Step />
          </Wizard.Container>
        </Form.Handler>
      )
    }

    render(<MyForm />)

    expect(output()).toHaveTextContent('{"activeIndex":0}')
    expect(onStepChange).toHaveBeenCalledTimes(0)

    await userEvent.click(nextButton())

    await waitFor(() => {
      expect(output()).toHaveTextContent('{"activeIndex":1}')
    })

    expect(onStepChange).toHaveBeenCalledTimes(1)

    await wait(10)

    visitStep(0)
    act(forceUpdateRef.current)

    await waitFor(() => {
      expect(output()).toHaveTextContent('{"activeIndex":0}')
    })

    expect(onStepChange).toHaveBeenCalledTimes(2)

    visitStep(1)
    act(forceUpdateRef.current)

    await waitFor(() => {
      expect(output()).toHaveTextContent('{"activeIndex":1}')
    })

    expect(onStepChange).toHaveBeenCalledTimes(3)
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
    expect(window.location.search).toBe('?existing-query=foo&bar=baz')
    expect(window.history.pushState).toHaveBeenCalledTimes(0)

    visitStep(1)
    act(forceUpdateRef.current)

    expect(output()).toHaveTextContent('{"activeIndex":1,"index":1}')
    expect(window.location.search).toBe(
      `?existing-query=foo&bar=baz&${identifier}-step=1`
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
      `?existing-query=foo&bar=baz&${identifier}-step=2`
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
      `?existing-query=foo&bar=baz&${identifier}-step=1`
    )
    expect(window.history.pushState).toHaveBeenCalledWith(
      {},
      '',
      `http://localhost/?existing-query=foo&bar=baz&${identifier}-step=1`
    )
  })

  it('should restore the first step when the routed step is removed from the URL', async () => {
    mockUrl()

    const { useSearchParams, forceUpdateRef } = getRerenderingHookMock()

    const MyForm = () => {
      const { getIndex } = useReactRouter(identifier, { useSearchParams })

      const Step = () => {
        const { activeIndex } = useStep(identifier)
        return (
          <Wizard.Step>
            <output>
              {JSON.stringify({ activeIndex, index: getIndex() })}
            </output>
            <Wizard.Buttons />
          </Wizard.Step>
        )
      }

      return (
        <Form.Handler>
          <Wizard.Container mode="loose" id={identifier}>
            <Step />
            <Step />
          </Wizard.Container>
        </Form.Handler>
      )
    }

    render(<MyForm />)

    await userEvent.click(nextButton())

    await waitFor(() => {
      expect(output()).toHaveTextContent('{"activeIndex":1,"index":1}')
    })

    removeStep()
    act(forceUpdateRef.current)

    await waitFor(() => {
      expect(output()).toHaveTextContent('{"activeIndex":0,"index":null}')
    })

    expect(window.location.search).toBe('?existing-query=foo&bar=baz')
  })

  it('should handle and show try/catch errors', async () => {
    mockUrl()

    const get = vi.fn()
    const searchParams = { get }
    const setSearchParams = vi.fn()
    const useSearchParams = vi.fn(() => {
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
