import { render, renderHook } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form } from '../../..'

describe('Form.useDataValue', () => {
  it('should throw when used outside Form.Handler', () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {})

    const renderComponent = () => {
      renderHook(() => Form.useDataValue('/customer/name'))
    }

    expect(renderComponent).toThrow(
      'useDataValue needs to run inside DataContext (Form.Handler)'
    )

    log.mockRestore()
  })

  it('should return the value at the given data path', () => {
    function Value() {
      const value = Form.useDataValue('/customer/name')

      return <output>{value as string}</output>
    }

    render(
      <Form.Handler data={{ customer: { name: 'Ada' } }}>
        <Value />
      </Form.Handler>
    )

    expect(document.querySelector('output')).toHaveTextContent('Ada')
  })

  it('should rerender only when the subscribed data path changes', async () => {
    let renderCount = 0

    function Value() {
      renderCount += 1
      const value = Form.useDataValue('/first')

      return <output>{value as string}</output>
    }

    function ChangeValue() {
      const { update } = Form.useData()

      return (
        <>
          <button type="button" onClick={() => update('/second', 'Two')}>
            Change second
          </button>
          <button type="button" onClick={() => update('/first', 'One')}>
            Change first
          </button>
        </>
      )
    }

    render(
      <Form.Handler data={{ first: 'First', second: 'Second' }}>
        <Value />
        <ChangeValue />
      </Form.Handler>
    )

    expect(document.querySelector('output')).toHaveTextContent('First')
    expect(renderCount).toBe(1)

    await userEvent.click(document.querySelectorAll('button')[0])

    expect(document.querySelector('output')).toHaveTextContent('First')
    expect(renderCount).toBe(1)

    await userEvent.click(document.querySelectorAll('button')[1])

    expect(document.querySelector('output')).toHaveTextContent('One')
    expect(renderCount).toBe(2)
  })

  it('should not rerender when form context state changes', async () => {
    let renderCount = 0

    function Value() {
      renderCount += 1
      const value = Form.useDataValue('/first')

      return <output>{value as string}</output>
    }

    function TriggerContextUpdate() {
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
      <Form.Handler data={{ first: 'First' }}>
        <Value />
        <TriggerContextUpdate />
      </Form.Handler>
    )

    expect(document.querySelector('output')).toHaveTextContent('First')
    expect(renderCount).toBe(1)

    await userEvent.click(document.querySelector('button'))

    expect(document.querySelector('output')).toHaveTextContent('First')
    expect(renderCount).toBe(1)
  })

  it('should rerender when a parent path changes', async () => {
    function Value() {
      const value = Form.useDataValue('/customer/name')

      return <output>{value as string}</output>
    }

    function ChangeValue() {
      const { update } = Form.useData()

      return (
        <button
          type="button"
          onClick={() => update('/customer', { name: 'Grace' })}
        >
          Change customer
        </button>
      )
    }

    render(
      <Form.Handler data={{ customer: { name: 'Ada' } }}>
        <Value />
        <ChangeValue />
      </Form.Handler>
    )

    expect(document.querySelector('output')).toHaveTextContent('Ada')

    await userEvent.click(document.querySelector('button'))

    expect(document.querySelector('output')).toHaveTextContent('Grace')
  })

  it('should rerender when a child path changes', async () => {
    function Value() {
      const value = Form.useDataValue<{ name: string }>('/customer')

      return <output>{value?.name}</output>
    }

    function ChangeValue() {
      const { update } = Form.useData()

      return (
        <button
          type="button"
          onClick={() => update('/customer/name', 'Grace')}
        >
          Change customer
        </button>
      )
    }

    render(
      <Form.Handler data={{ customer: { name: 'Ada' } }}>
        <Value />
        <ChangeValue />
      </Form.Handler>
    )

    expect(document.querySelector('output')).toHaveTextContent('Ada')

    await userEvent.click(document.querySelector('button'))

    expect(document.querySelector('output')).toHaveTextContent('Grace')
  })
})
