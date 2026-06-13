import { act } from 'react'
import { render, renderHook, waitFor } from '@testing-library/react'
import { wait } from '../../../../../core/test-utils/testSetup'
import { makeUniqueId } from '../../../../../shared/component-helper'
import useQueryLocator from '../useQueryLocator'
import useStep from '../useStep'
import { Form, Wizard } from '../../..'
import userEvent from '@testing-library/user-event'

describe('useQueryLocator', () => {
  let identifier: string
  let popstateListener = vi.fn()

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
  let pushStateSpy: ReturnType<typeof vi.fn>
  let addEventListenerSpy: ReturnType<typeof vi.fn>

  const mockUrl = (
    { search } = { search: 'existing-query=foo&bar=baz' }
  ) => {
    window.history.replaceState({}, '', `http://localhost/?${search}`)

    const realReplaceState = window.history.replaceState.bind(
      window.history
    )
    pushStateSpy = vi.fn(function (data, unused, url) {
      realReplaceState(data, unused, url)
    })
    window.history.pushState =
      pushStateSpy as typeof window.history.pushState

    popstateListener = vi.fn()
    addEventListenerSpy = vi.fn(function (name, listener) {
      if (name === 'popstate') {
        popstateListener.mockImplementation(listener as any)
      }
    })
    window.addEventListener =
      addEventListenerSpy as typeof window.addEventListener
  }
  const visitStep = (index) => {
    const url = new URL(window.location.href)
    url.searchParams.set(`${identifier}-step`, String(index))
    window.history.pushState({}, '', url.toString())

    act(() => {
      popstateListener()
    })
  }
  const removeStep = () => {
    const url = new URL(window.location.href)
    url.searchParams.delete(`${identifier}-step`)
    window.history.replaceState({}, '', url.toString())

    act(() => {
      popstateListener()
    })
  }
  const Step = () => {
    const { activeIndex } = useStep(identifier)
    const { getIndex } = useQueryLocator(identifier)
    return (
      <Wizard.Step>
        <output>
          {JSON.stringify({ activeIndex, index: getIndex() })}
        </output>
        <Wizard.Buttons />
      </Wizard.Step>
    )
  }

  it('should not throw when using an id that has never been mounted', () => {
    mockUrl()

    const { result } = renderHook(() => useQueryLocator(identifier))

    expect(() => {
      result.current.getIndex()
    }).not.toThrow()
  })

  it('should update the URL query parameter on step change', async () => {
    mockUrl()

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

    await userEvent.click(nextButton())

    expect(output()).toHaveTextContent('{"activeIndex":1,"index":1}')
    expect(window.location.search).toBe(
      `?existing-query=foo&bar=baz&${identifier}-step=1`
    )
    expect(window.history.pushState).toHaveBeenCalledWith(
      {},
      '',
      `http://localhost/?existing-query=foo&bar=baz&${identifier}-step=1`
    )

    await userEvent.click(nextButton())

    expect(output()).toHaveTextContent('{"activeIndex":2,"index":2}')
    expect(window.location.search).toBe(
      `?existing-query=foo&bar=baz&${identifier}-step=2`
    )
    expect(window.history.pushState).toHaveBeenCalledWith(
      {},
      '',
      `http://localhost/?existing-query=foo&bar=baz&${identifier}-step=2`
    )

    await userEvent.click(previousButton())

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

  it('should call Wizard.Container onStepChange once for each button navigation when updating the URL query parameter', async () => {
    mockUrl()

    const onStepChange = vi.fn()

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
      useQueryLocator(identifier)

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
    expect(window.location.search).toBe(
      `?existing-query=foo&bar=baz&${identifier}-step=1`
    )

    await userEvent.click(previousButton())

    await waitFor(() => {
      expect(output()).toHaveTextContent('{"activeIndex":0}')
    })

    expect(onStepChange).toHaveBeenCalledTimes(2)
    expect(window.location.search).toBe(
      `?existing-query=foo&bar=baz&${identifier}-step=0`
    )

    await userEvent.click(nextButton())

    await waitFor(() => {
      expect(output()).toHaveTextContent('{"activeIndex":1}')
    })

    expect(onStepChange).toHaveBeenCalledTimes(3)
    expect(window.location.search).toBe(
      `?existing-query=foo&bar=baz&${identifier}-step=1`
    )
  })

  it('should write one history entry when multiple hooks listen to the same wizard', async () => {
    mockUrl()

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
      useQueryLocator(identifier)
      useQueryLocator(identifier)

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
    expect(window.history.pushState).toHaveBeenCalledTimes(1)
  })

  it('should call Wizard.Container onStepChange when reacting to url changes after button navigation', async () => {
    mockUrl()

    const onStepChange = vi.fn()

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
      useQueryLocator(identifier)

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

    await waitFor(() => {
      expect(output()).toHaveTextContent('{"activeIndex":0}')
    })

    expect(onStepChange).toHaveBeenCalledTimes(2)

    visitStep(1)

    await waitFor(() => {
      expect(output()).toHaveTextContent('{"activeIndex":1}')
    })

    expect(onStepChange).toHaveBeenCalledTimes(3)
  })

  it('should work without id', async () => {
    mockUrl()

    const Step = () => {
      const { activeIndex } = useStep()
      const { getIndex } = useQueryLocator()
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
        <Wizard.Container mode="loose">
          <Step />
          <Step />
          <Step />
        </Wizard.Container>
      </Form.Handler>
    )

    expect(output()).toHaveTextContent('{"activeIndex":0,"index":null}')
    expect(window.location.search).toBe('?existing-query=foo&bar=baz')
    expect(window.history.pushState).toHaveBeenCalledTimes(0)

    await userEvent.click(nextButton())

    expect(output()).toHaveTextContent('{"activeIndex":1,"index":1}')
    expect(window.location.search).toBe(
      `?existing-query=foo&bar=baz&step=1`
    )
    expect(window.history.pushState).toHaveBeenCalledWith(
      {},
      '',
      `http://localhost/?existing-query=foo&bar=baz&step=1`
    )

    await userEvent.click(nextButton())

    expect(output()).toHaveTextContent('{"activeIndex":2,"index":2}')
    expect(window.location.search).toBe(
      `?existing-query=foo&bar=baz&step=2`
    )
    expect(window.history.pushState).toHaveBeenCalledWith(
      {},
      '',
      `http://localhost/?existing-query=foo&bar=baz&step=2`
    )

    await userEvent.click(previousButton())

    expect(output()).toHaveTextContent('{"activeIndex":1,"index":1}')
    expect(window.location.search).toBe(
      `?existing-query=foo&bar=baz&step=1`
    )
    expect(window.history.pushState).toHaveBeenCalledWith(
      {},
      '',
      `http://localhost/?existing-query=foo&bar=baz&step=1`
    )
  })

  it('should react to url change', async () => {
    mockUrl()

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

    const MyForm = () => {
      const { getIndex } = useQueryLocator(identifier)

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

    await waitFor(() => {
      expect(output()).toHaveTextContent('{"activeIndex":0,"index":null}')
    })

    expect(window.location.search).toBe('?existing-query=foo&bar=baz')
  })

  it('should handle and show try/catch errors', async () => {
    mockUrl()

    window.history.pushState = vi.fn(function () {
      throw new Error('URL is not valid')
    })

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
      'URL is not valid'
    )
  })

  it('should set initial state given by the url', () => {
    const search = `existing-query=foo&bar=baz&${identifier}-step=1`
    mockUrl({ search })

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
      useQueryLocator(identifier)

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
