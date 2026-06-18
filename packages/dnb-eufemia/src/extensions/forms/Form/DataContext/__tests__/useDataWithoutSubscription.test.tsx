import { act, render, renderHook } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { makeUniqueId } from '../../../../../shared/component-helper'
import { Field, Form } from '../../..'
import type { FilterData } from '../../../DataContext/Context'
import useDataWithoutSubscription, {
  type UseDataWithoutSubscriptionReturn,
} from '../useDataWithoutSubscription'

describe('Form.useDataWithoutSubscription', () => {
  let identifier: string

  beforeEach(() => {
    identifier = makeUniqueId()
  })

  it('should return the helper API without data', () => {
    const { result } = renderHook(() =>
      useDataWithoutSubscription(identifier, { foo: 'bar' })
    )

    expect(result.current).toEqual({
      reduceToVisibleFields: expect.any(Function),
      filterData: expect.any(Function),
      getValue: expect.any(Function),
      update: expect.any(Function),
      remove: expect.any(Function),
      set: expect.any(Function),
    })
    expect(result.current).not.toHaveProperty('data')
  })

  it('should throw when used without a valid id', () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {})

    const renderComponent = () => {
      renderHook(() => useDataWithoutSubscription())
    }

    expect(renderComponent).toThrow(
      'useDataWithoutSubscription needs to run inside DataContext (Form.Handler) or have a valid id'
    )

    log.mockRestore()
  })

  it('should not rerender when context data changes', async () => {
    let renderCount = 0
    let dataContext: ReturnType<typeof Form.useDataWithoutSubscription>

    const MockComponent = () => {
      renderCount += 1
      dataContext = Form.useDataWithoutSubscription()

      return <output>{renderCount}</output>
    }

    render(
      <Form.Handler data={{ foo: '' }}>
        <Field.String path="/foo" />
        <MockComponent />
      </Form.Handler>
    )

    expect(renderCount).toBe(1)
    expect(dataContext.getValue('/foo')).toBe('')

    await userEvent.type(document.querySelector('input'), 'bar')

    expect(renderCount).toBe(1)
    expect(dataContext.getValue('/foo')).toBe('bar')
  })

  it('should not rerender when form context state changes', async () => {
    let renderCount = 0

    const MockComponent = () => {
      renderCount += 1
      Form.useDataWithoutSubscription()

      return <output>{renderCount}</output>
    }

    const TriggerContextUpdate = () => {
      const { setFormError } = Form.useValidation()

      return (
        <button
          type="button"
          onClick={() => setFormError(new Error('Error'))}
        >
          Trigger
        </button>
      )
    }

    render(
      <Form.Handler>
        <MockComponent />
        <TriggerContextUpdate />
      </Form.Handler>
    )

    expect(renderCount).toBe(1)

    await userEvent.click(document.querySelector('button'))

    expect(renderCount).toBe(1)
    expect(document.querySelector('output')).toHaveTextContent('1')
  })

  it('should use getValue for the latest context value', async () => {
    let dataContext: ReturnType<typeof Form.useDataWithoutSubscription>

    const MockComponent = () => {
      dataContext = Form.useDataWithoutSubscription()

      return <output>{JSON.stringify(dataContext.getValue('/'))}</output>
    }

    render(
      <Form.Handler data={{ foo: '' }}>
        <Field.String path="/foo" />
        <MockComponent />
      </Form.Handler>
    )

    expect(document.querySelector('output')).toHaveTextContent(
      JSON.stringify({ foo: '' })
    )
    expect(dataContext).not.toHaveProperty('data')
    expect(dataContext.getValue('/foo')).toBe('')

    await userEvent.type(document.querySelector('input'), 'bar')

    expect(document.querySelector('output')).toHaveTextContent(
      JSON.stringify({ foo: '' })
    )
    expect(dataContext.getValue('/foo')).toBe('bar')
  })

  it('should filter context data without subscribing', () => {
    let dataContext: ReturnType<typeof Form.useDataWithoutSubscription>

    const MockComponent = () => {
      dataContext = Form.useDataWithoutSubscription()

      return null
    }

    const filterDisabled: FilterData = vi.fn(({ props }) => {
      return props.disabled !== true
    })

    render(
      <Form.Handler data={{ field1: 'foo', field2: 'bar' }}>
        <Field.String path="/field1" disabled />
        <Field.String path="/field2" />
        <MockComponent />
      </Form.Handler>
    )

    expect(dataContext.filterData(filterDisabled)).toEqual({
      field2: 'bar',
    })
  })

  it('should reduce context data to visible fields without subscribing', () => {
    let dataContext: ReturnType<typeof Form.useDataWithoutSubscription>

    const MockComponent = () => {
      dataContext = Form.useDataWithoutSubscription()

      return null
    }

    const { rerender } = render(
      <Form.Handler data={{ field1: 'foo', field2: 'bar' }}>
        <Form.Visibility visible={true}>
          <Field.String path="/field1" />
        </Form.Visibility>
        <Field.String path="/field2" />
        <MockComponent />
      </Form.Handler>
    )

    expect(
      dataContext.reduceToVisibleFields(dataContext.getValue('/'))
    ).toEqual({
      field1: 'foo',
      field2: 'bar',
    })

    rerender(
      <Form.Handler data={{ field1: 'foo', field2: 'bar' }}>
        <Form.Visibility visible={false}>
          <Field.String path="/field1" />
        </Form.Visibility>
        <Field.String path="/field2" />
        <MockComponent />
      </Form.Handler>
    )

    expect(
      dataContext.reduceToVisibleFields(dataContext.getValue('/'))
    ).toEqual({
      field2: 'bar',
    })
  })

  it('should not rerender when shared state data changes', () => {
    let renderCount = 0
    let dataContext: UseDataWithoutSubscriptionReturn<{ foo: string }>

    const MockComponent = () => {
      renderCount += 1
      dataContext = Form.useDataWithoutSubscription(identifier, {
        foo: 'bar',
      })

      return <output>{renderCount}</output>
    }

    render(<MockComponent />)

    expect(renderCount).toBe(1)
    expect(dataContext.getValue('/foo')).toBe('bar')

    act(() => {
      dataContext.update('/foo', 'baz')
    })

    expect(renderCount).toBe(1)
    expect(dataContext.getValue('/foo')).toBe('baz')
  })
})
