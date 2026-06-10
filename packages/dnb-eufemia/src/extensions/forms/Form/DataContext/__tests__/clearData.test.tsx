import { StrictMode, act, useEffect } from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Field, Form } from '../../..'

describe('Form.clearData', () => {
  it('should not throw when clearing an id that has never been mounted', () => {
    expect(() => {
      act(() => Form.clearData('never-mounted-id'))
    }).not.toThrow()
  })

  it('should clear a form with an id', () => {
    render(
      <Form.Handler id="unique-id" data={{ myString: 'my string' }}>
        <Field.String path="/myString" />
      </Form.Handler>
    )

    expect(document.querySelector('input')).toHaveValue('my string')

    act(() => Form.clearData('unique-id'))

    expect(document.querySelector('input')).toHaveValue('')
  })

  it('should not show an error when clearing a form in StrictMode', async () => {
    render(
      <StrictMode>
        <Form.Handler id="unique-id">
          <Field.String path="/myString" required />
        </Form.Handler>
        <button onClick={() => Form.clearData('unique-id')} />
      </StrictMode>
    )

    const input = document.querySelector('input')
    await userEvent.type(input, 'my string')
    expect(input).toHaveValue('my string')
    expect(document.querySelector('.dnb-form-status')).toBeNull()

    const button = document.querySelector('button')
    await userEvent.click(button)

    expect(input).toHaveValue('')
    expect(document.querySelector('.dnb-form-status')).toBeNull()
  })

  it('should call onClear', () => {
    const onClear = vi.fn()

    render(
      <Form.Handler id="unique-id" onClear={onClear}>
        <Field.String path="/myString" />
      </Form.Handler>
    )

    expect(onClear).not.toHaveBeenCalled()

    act(() => Form.clearData('unique-id'))

    expect(onClear).toHaveBeenCalledTimes(1)
  })

  describe('can be used in beforeEach', () => {
    beforeEach(() => {
      Form.clearData('unique-id')
    })

    it('first set the value', () => {
      render(
        <Form.Handler id="unique-id" data={{ myString: 'my string' }}>
          <Field.String path="/myString" />
        </Form.Handler>
      )

      expect(document.querySelector('input')).toHaveValue('my string')
    })

    it('second, it should not be present anymore', () => {
      render(
        <Form.Handler id="unique-id">
          <Field.String path="/myString" />
        </Form.Handler>
      )

      expect(document.querySelector('input')).toHaveValue('')
    })
  })

  it('should re-seed shared state on first render when remounting after clearData', () => {
    const formId = 'reseed-first-render'
    const renderSnapshots: unknown[] = []

    function DataProbe() {
      const { data } = Form.useData(formId)
      renderSnapshots.push(data)
      return null
    }

    function MyForm() {
      useEffect(() => {
        return () => {
          Form.clearData(formId)
        }
      }, [])

      return (
        <Form.Handler id={formId} data={{ myString: 'hello' }}>
          <Field.String path="/myString" />
        </Form.Handler>
      )
    }

    const { unmount } = render(
      <>
        <MyForm />
        <DataProbe />
      </>
    )

    // Clear snapshots from the initial mount
    renderSnapshots.length = 0

    unmount()

    render(
      <>
        <MyForm />
        <DataProbe />
      </>
    )

    // The very first render after remount must already have the data —
    // not an empty object that only gets fixed in a later commit phase.
    expect(renderSnapshots[0]).toEqual({ myString: 'hello' })
  })

  it('should re-seed shared state for external useData(id, initialData) after clearData', () => {
    const formId = 'reseed-usedata-initial'
    const renderSnapshots: unknown[] = []

    function ExternalSeeder() {
      const { data } = Form.useData(formId, {
        myString: 'fromOutside',
      })
      renderSnapshots.push(data)
      return null
    }

    function MyForm() {
      useEffect(() => {
        return () => {
          Form.clearData(formId)
        }
      }, [])

      return (
        <Form.Handler id={formId}>
          <Field.String path="/myString" />
        </Form.Handler>
      )
    }

    const { unmount } = render(
      <>
        <MyForm />
        <ExternalSeeder />
      </>
    )

    expect(document.querySelector('input')).toHaveValue('fromOutside')

    renderSnapshots.length = 0

    unmount()

    render(
      <>
        <MyForm />
        <ExternalSeeder />
      </>
    )

    // External useData with initialData must also re-seed after clearData
    expect(renderSnapshots[0]).toEqual({ myString: 'fromOutside' })
  })
})
