import React from 'react'
import { spyOnEufemiaWarn } from '../../../../../core/jest/jestSetup'
import { isCI } from 'repo-utils'
import {
  act,
  createEvent,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Field, Form, JSONSchema } from '../../..'
import setData from '../../data-context/setData'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

if (isCI) {
  jest.retryTimes(5) // because of an flaky async tests
}

describe('Form.Isolation', () => {
  let log = null
  beforeEach(() => {
    log = spyOnEufemiaWarn()
  })
  afterEach(() => {
    log.mockRestore()
  })

  it('should have constant of _supportsSpacingProps="undefined"', () => {
    expect(Form.Isolation._supportsSpacingProps).toBeUndefined()
  })

  it('should use initial value from root context', () => {
    render(
      <Form.Handler
        defaultData={{
          regular: 'Regular',
          isolated: 'Isolated',
        }}
      >
        <Field.String path="/regular" />

        <Form.Isolation>
          <Field.String path="/isolated" />
        </Form.Isolation>

        <Form.SubmitButton />
      </Form.Handler>
    )

    const [regular, isolated] = Array.from(
      document.querySelectorAll('input')
    )

    expect(regular).toHaveValue('Regular')
    expect(isolated).toHaveValue('Isolated')
  })

  it('should use "data" from isolated context', () => {
    render(
      <Form.Handler
        defaultData={{
          regular: 'Regular',
          isolated: 'Isolated',
        }}
      >
        <Field.String path="/regular" />

        <Form.Isolation
          data={{
            isolated: 'Isolated other value',
          }}
        >
          <Field.String path="/isolated" />
        </Form.Isolation>

        <Form.SubmitButton />
      </Form.Handler>
    )

    const [regular, isolated] = Array.from(
      document.querySelectorAll('input')
    )

    expect(regular).toHaveValue('Regular')
    expect(isolated).toHaveValue('Isolated other value')
  })

  it('should use "defaultData" from isolated context', () => {
    render(
      <Form.Handler
        defaultData={{
          regular: 'Regular',
          isolated: 'Isolated',
        }}
      >
        <Field.String path="/regular" />

        <Form.Isolation
          defaultData={{
            isolated: 'Isolated other value',
          }}
        >
          <Field.String path="/isolated" />
        </Form.Isolation>

        <Form.SubmitButton />
      </Form.Handler>
    )

    const [regular, isolated] = Array.from(
      document.querySelectorAll('input')
    )

    expect(regular).toHaveValue('Regular')
    expect(isolated).toHaveValue('Isolated other value')
  })

  it('should use initial value from root data context with a path', () => {
    render(
      <Form.Handler
        data={{
          regular: 'Regular',
          nested: {
            isolated: 'Isolated',
          },
        }}
      >
        <Field.String path="/regular" />

        <Form.Isolation path="/nested">
          <Field.String path="/isolated" />
        </Form.Isolation>

        <Form.SubmitButton />
      </Form.Handler>
    )

    const [regular, isolated] = Array.from(
      document.querySelectorAll('input')
    )

    expect(regular).toHaveValue('Regular')
    expect(isolated).toHaveValue('Isolated')
  })

  it('should use initial value from root defaultData context with a path', () => {
    render(
      <Form.Handler
        defaultData={{
          regular: 'Regular',
          nested: {
            isolated: 'Isolated',
          },
        }}
      >
        <Field.String path="/regular" />

        <Form.Isolation path="/nested">
          <Field.String path="/isolated" />
        </Form.Isolation>

        <Form.SubmitButton />
      </Form.Handler>
    )

    const [regular, isolated] = Array.from(
      document.querySelectorAll('input')
    )

    expect(regular).toHaveValue('Regular')
    expect(isolated).toHaveValue('Isolated')
  })

  it('should set data with given path', async () => {
    const onSubmit = jest.fn()

    render(
      <Form.Handler
        onSubmit={onSubmit}
        defaultData={{
          nested: {
            isolated: 'Isolated',
          },
        }}
      >
        <Form.Isolation path="/nested">
          <Field.String path="/isolated" />
          <Form.Isolation.CommitButton />
        </Form.Isolation>
      </Form.Handler>
    )

    const form = document.querySelector('form')
    const button = document.querySelector('button')
    const isolated = document.querySelector('input')

    await userEvent.type(isolated, ' updated')

    fireEvent.click(button)
    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenLastCalledWith(
      {
        nested: {
          isolated: 'Isolated updated',
        },
      },
      expect.anything()
    )
  })

  it('should not overwrite changed data', async () => {
    render(
      <Form.Handler
        defaultData={{
          regular: 'Regular',
          isolated: 'Isolated',
        }}
      >
        <Field.String path="/regular" />

        <Form.Isolation>
          <Field.String path="/isolated" />
        </Form.Isolation>
      </Form.Handler>
    )

    const [regular, isolated] = Array.from(
      document.querySelectorAll('input')
    )

    expect(regular).toHaveValue('Regular')
    expect(isolated).toHaveValue('Isolated')

    await userEvent.type(isolated, ' updated')

    expect(regular).toHaveValue('Regular')
    expect(isolated).toHaveValue('Isolated updated')

    await userEvent.type(regular, ' updated')

    expect(regular).toHaveValue('Regular updated')
    expect(isolated).toHaveValue('Isolated updated')

    await userEvent.type(isolated, ' 2')

    expect(regular).toHaveValue('Regular updated')
    expect(isolated).toHaveValue('Isolated updated 2')

    await userEvent.type(regular, ' 2')

    expect(regular).toHaveValue('Regular updated 2')
    expect(isolated).toHaveValue('Isolated updated 2')
  })

  it('should not overwrite existing data when defaultData is given', async () => {
    const onChange = jest.fn()

    render(
      <Form.Handler
        defaultData={{
          regular: 'Regular',
          isolated: 'Never displayed',
        }}
        onChange={onChange}
      >
        <Field.String path="/regular" />

        <Form.Isolation defaultData={{ isolated: 'Isolated' }}>
          <Field.String path="/isolated" />
          <Form.Isolation.CommitButton />
        </Form.Isolation>
      </Form.Handler>
    )

    const button = document.querySelector('button')
    const [regular, isolated] = Array.from(
      document.querySelectorAll('input')
    )

    expect(regular).toHaveValue('Regular')
    expect(isolated).toHaveValue('Isolated')

    await userEvent.type(isolated, '{Backspace>8}Something')
    await userEvent.click(button)

    expect(regular).toHaveValue('Regular')
    expect(isolated).toHaveValue('Something')
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(
      {
        regular: 'Regular',
        isolated: 'Something',
      },
      expect.anything()
    )

    await userEvent.type(regular, ' updated')
    await userEvent.click(button)

    expect(regular).toHaveValue('Regular updated')
    expect(isolated).toHaveValue('Something')
    expect(onChange).toHaveBeenCalledTimes(10)
    expect(onChange).toHaveBeenLastCalledWith(
      {
        regular: 'Regular updated',
        isolated: 'Something',
      },
      expect.anything()
    )

    await userEvent.type(isolated, ' 2')
    await userEvent.click(button)

    expect(regular).toHaveValue('Regular updated')
    expect(isolated).toHaveValue('Something 2')
    expect(onChange).toHaveBeenCalledTimes(11)
    expect(onChange).toHaveBeenLastCalledWith(
      {
        regular: 'Regular updated',
        isolated: 'Something 2',
      },
      expect.anything()
    )

    await userEvent.type(regular, ' 2')
    await userEvent.click(button)

    expect(regular).toHaveValue('Regular updated 2')
    expect(isolated).toHaveValue('Something 2')
    expect(onChange).toHaveBeenCalledTimes(14)
    expect(onChange).toHaveBeenLastCalledWith(
      {
        regular: 'Regular updated 2',
        isolated: 'Something 2',
      },
      expect.anything()
    )
  })

  it('should not change the data path from outside', async () => {
    render(
      <Form.Handler
        defaultData={{
          regular: 'Regular',
          isolated: 'Isolated',
        }}
      >
        <Field.String path="/regular" />
        <Field.String path="/isolated" />

        <Form.Isolation>
          <Field.String path="/isolated" />
          <Form.Isolation.CommitButton />
        </Form.Isolation>
      </Form.Handler>
    )

    const button = document.querySelector('button')
    const [regular, synced, isolated] = Array.from(
      document.querySelectorAll('input')
    )

    expect(regular).toHaveValue('Regular')
    expect(synced).toHaveValue('Isolated')
    expect(isolated).toHaveValue('Isolated')

    await userEvent.type(isolated, ' updated')

    expect(regular).toHaveValue('Regular')
    expect(synced).toHaveValue('Isolated')
    expect(isolated).toHaveValue('Isolated updated')

    await userEvent.type(regular, ' updated')
    await userEvent.click(button)

    expect(regular).toHaveValue('Regular updated')
    expect(synced).toHaveValue('Isolated updated')
    expect(isolated).toHaveValue('Isolated updated')

    await userEvent.type(synced, '{Backspace>8} changed')

    expect(synced).toHaveValue('Isolated changed')
    expect(isolated).toHaveValue('Isolated updated')
  })

  it('should not change the isolated value when changed in the root context', async () => {
    render(
      <Form.Handler id="form-id" data={{ isolated: 'Isolated' }}>
        <Field.String path="/isolated" />
        <Form.Isolation>
          <Field.String path="/isolated" />
        </Form.Isolation>
      </Form.Handler>
    )

    const [outside, inside] = Array.from(
      document.querySelectorAll('input')
    )

    expect(outside).toHaveValue('Isolated')
    expect(inside).toHaveValue('Isolated')

    act(() => {
      setData('form-id', { isolated: 'Changed' })
    })

    expect(outside).toHaveValue('Changed')
    expect(inside).toHaveValue('Isolated')
  })

  it('should not override isolated values inside a section when changed via the root context', async () => {
    const data = {
      section: {
        first: 'First',
        second: 'Second',
      },
    }

    const MockComponent = () => {
      const [state, setState] = React.useState(data.section.second)
      return (
        <Form.Handler
          data={{
            section: {
              first: 'First',
              second: 'Second',
            },
          }}
        >
          <Form.Section path="/section">
            <Form.Isolation defaultData={{ first: 'First value' }}>
              <Field.String path="/first" />
              <Field.String
                path="/second"
                value={state}
                onChange={(value) => {
                  setState(value)
                }}
              />
            </Form.Isolation>
          </Form.Section>
        </Form.Handler>
      )
    }

    render(<MockComponent />)

    const [first, second] = Array.from(document.querySelectorAll('input'))

    expect(first).toHaveValue('First value')
    expect(second).toHaveValue('Second')

    await userEvent.type(second, ' changed')

    expect(first).toHaveValue('First value')
    expect(second).toHaveValue('Second changed')

    await userEvent.type(first, ' changed')

    expect(first).toHaveValue('First value changed')
    expect(second).toHaveValue('Second changed')
  })

  it('should not call onChange on root context', async () => {
    const onChange = jest.fn()

    render(
      <Form.Handler onChange={onChange}>
        <Field.String path="/regular" />

        <Form.Isolation>
          <Field.String path="/isolated" />
        </Form.Isolation>

        <Form.SubmitButton />
      </Form.Handler>
    )

    const [regular, isolated] = Array.from(
      document.querySelectorAll('input')
    )

    await userEvent.type(isolated, 'Isolated')

    expect(onChange).toHaveBeenCalledTimes(0)

    await userEvent.type(regular, 'Regular')

    expect(onChange).toHaveBeenCalledTimes(7)
    expect(onChange).toHaveBeenLastCalledWith(
      {
        regular: 'Regular',
      },
      expect.anything()
    )
  })

  it('should call local onChange', async () => {
    const onChange = jest.fn()

    render(
      <Form.Handler>
        <Field.String path="/regular" />

        <Form.Isolation onChange={onChange}>
          <Field.String path="/isolated" />
        </Form.Isolation>

        <Form.SubmitButton />
      </Form.Handler>
    )

    const [regular, isolated] = Array.from(
      document.querySelectorAll('input')
    )

    await userEvent.type(isolated, 'Isolated')

    expect(onChange).toHaveBeenCalledTimes(8)
    expect(onChange).toHaveBeenLastCalledWith(
      {
        isolated: 'Isolated',
      },
      expect.anything()
    )

    await userEvent.type(regular, 'Regular')

    expect(onChange).toHaveBeenCalledTimes(8)
  })

  it('should call onChange on data context when local data submit is called', async () => {
    const onChange = jest.fn()
    const commitHandleRef = React.createRef<() => void>()

    render(
      <Form.Handler onChange={onChange}>
        <Field.String path="/regular" />

        <Form.Isolation commitHandleRef={commitHandleRef}>
          <Field.String path="/isolated" />
        </Form.Isolation>

        <Form.SubmitButton />
      </Form.Handler>
    )

    const [regular, isolated] = Array.from(
      document.querySelectorAll('input')
    )

    await userEvent.type(isolated, 'Isolated')

    expect(onChange).toHaveBeenCalledTimes(0)

    act(() => {
      commitHandleRef.current()
    })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(
      {
        isolated: 'Isolated',
      },
      expect.anything()
    )

    await userEvent.type(regular, 'Regular')

    expect(onChange).toHaveBeenCalledTimes(8)
    expect(onChange).toHaveBeenLastCalledWith(
      {
        regular: 'Regular',
        isolated: 'Isolated',
      },
      expect.anything()
    )
  })

  it('onCommit should only return the isolated data', async () => {
    const onCommit = jest.fn()

    render(
      <Form.Handler
        defaultData={{
          regular: 'Regular',
          isolated: 'Isolated',
        }}
      >
        <Field.String path="/regular" />

        <Form.Isolation onCommit={onCommit}>
          <Field.String path="/isolated" />
          <Form.Isolation.CommitButton />
        </Form.Isolation>
      </Form.Handler>
    )

    const button = document.querySelector('button')
    const [regular, isolated] = Array.from(
      document.querySelectorAll('input')
    )

    expect(regular).toHaveValue('Regular')
    expect(isolated).toHaveValue('Isolated')

    await userEvent.type(isolated, '{Backspace>8}Something')
    await userEvent.click(button)

    expect(regular).toHaveValue('Regular')
    expect(isolated).toHaveValue('Something')
    expect(onCommit).toHaveBeenCalledTimes(1)
    expect(onCommit).toHaveBeenLastCalledWith(
      {
        isolated: 'Something',
      },
      expect.anything()
    )

    await userEvent.type(regular, ' updated')
    await userEvent.click(button)

    expect(regular).toHaveValue('Regular updated')
    expect(isolated).toHaveValue('Something')
    expect(onCommit).toHaveBeenCalledTimes(2)
    expect(onCommit).toHaveBeenLastCalledWith(
      {
        isolated: 'Something',
      },
      expect.anything()
    )

    await userEvent.type(isolated, ' 2')
    await userEvent.click(button)

    expect(regular).toHaveValue('Regular updated')
    expect(isolated).toHaveValue('Something 2')
    expect(onCommit).toHaveBeenCalledTimes(3)
    expect(onCommit).toHaveBeenLastCalledWith(
      {
        isolated: 'Something 2',
      },
      expect.anything()
    )

    await userEvent.type(regular, ' 2')
    await userEvent.click(button)

    expect(regular).toHaveValue('Regular updated 2')
    expect(isolated).toHaveValue('Something 2')
    expect(onCommit).toHaveBeenCalledTimes(4)
    expect(onCommit).toHaveBeenLastCalledWith(
      {
        isolated: 'Something 2',
      },
      expect.anything()
    )
  })

  it('should call onCommit event when commitHandleRef is called', async () => {
    const onCommit = jest.fn()
    const commitHandleRef = React.createRef<() => void>()

    render(
      <Form.Handler>
        <Field.String path="/regular" />

        <Form.Isolation
          onCommit={onCommit}
          commitHandleRef={commitHandleRef}
        >
          <Field.String path="/isolated" />
        </Form.Isolation>

        <Form.SubmitButton />
      </Form.Handler>
    )

    const [regular, isolated] = Array.from(
      document.querySelectorAll('input')
    )

    await userEvent.type(isolated, 'Isolated')

    expect(onCommit).toHaveBeenCalledTimes(0)

    act(() => {
      commitHandleRef.current()
    })

    expect(onCommit).toHaveBeenCalledTimes(1)
    expect(onCommit).toHaveBeenLastCalledWith(
      {
        isolated: 'Isolated',
      },
      expect.anything()
    )

    await userEvent.type(regular, 'Regular')

    act(() => {
      commitHandleRef.current()
    })

    expect(onCommit).toHaveBeenCalledTimes(2)
    expect(onCommit).toHaveBeenLastCalledWith(
      {
        isolated: 'Isolated',
      },
      expect.anything()
    )
  })

  it('should support nested paths', async () => {
    const onChange = jest.fn()
    const commitHandleRef = React.createRef<() => void>()

    render(
      <Form.Handler
        onChange={onChange}
        data={{
          regular: 'Regular',
          nested: { isolated: 'Isolated' },
        }}
      >
        <Field.String path="/regular" />

        <Form.Isolation commitHandleRef={commitHandleRef}>
          <Field.String path="/nested/isolated" />
        </Form.Isolation>

        <Form.SubmitButton />
      </Form.Handler>
    )

    const [regular, isolated] = Array.from(
      document.querySelectorAll('input')
    )

    expect(regular).toHaveValue('Regular')
    expect(isolated).toHaveValue('Isolated')

    await userEvent.type(isolated, ' changed')

    expect(onChange).toHaveBeenCalledTimes(0)

    act(() => {
      commitHandleRef.current()
    })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(
      {
        regular: 'Regular',
        nested: {
          isolated: 'Isolated changed',
        },
      },
      expect.anything()
    )

    await userEvent.type(regular, ' changed')

    expect(onChange).toHaveBeenCalledTimes(9)
    expect(onChange).toHaveBeenLastCalledWith(
      {
        regular: 'Regular changed',
        nested: {
          isolated: 'Isolated changed',
        },
      },
      expect.anything()
    )
  })

  it('should show provider schema type error with path', async () => {
    const schema: JSONSchema = {
      type: 'object',
      properties: {
        myKey: {
          type: 'string',
          pattern: '^(valid)$',
        },
      },
    }

    render(
      <Form.Handler>
        <Form.Isolation
          schema={schema}
          data={{
            myKey: 'valid',
          }}
        >
          <Field.String path="/myKey" />
          <Form.Isolation.CommitButton />
        </Form.Isolation>
      </Form.Handler>
    )

    const input = document.querySelector('input')
    const button = document.querySelector('button')

    expect(document.querySelector('.dnb-form-status')).toBeNull()

    await userEvent.type(input, '{Backspace>5}invalid')

    fireEvent.blur(input)
    fireEvent.click(button)

    expect(document.querySelector('.dnb-form-status')).toBeInTheDocument()
    expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
      nb.Field.errorPattern
    )
  })

  describe('Isolate.CommitButton', () => {
    it('should have correct type and text', async () => {
      render(
        <Form.Isolation>
          <Form.Isolation.CommitButton />
        </Form.Isolation>
      )

      const button = document.querySelector('button')

      expect(button).toHaveTextContent(nb.Isolation.commitButtonText)
      expect(button).toHaveAttribute('type', 'button')
    })

    it('should call global onChange and local onCommit on data context when Isolate.Button gets clicked', async () => {
      const onChange = jest.fn()
      const onSubmit = jest.fn()
      const onCommit = jest.fn()

      render(
        <Form.Handler onChange={onChange} onSubmit={onSubmit}>
          <Form.Isolation onCommit={onCommit}>
            <Field.String path="/isolated" />
            <Form.Isolation.CommitButton />
          </Form.Isolation>
        </Form.Handler>
      )

      const isolated = document.querySelector('input')
      const button = document.querySelector('button')

      await userEvent.type(isolated, 'Isolated')
      expect(onChange).toHaveBeenCalledTimes(0)
      expect(onCommit).toHaveBeenCalledTimes(0)

      await userEvent.click(button)

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          isolated: 'Isolated',
        },
        expect.anything()
      )
      expect(onCommit).toHaveBeenCalledTimes(1)
      expect(onCommit).toHaveBeenLastCalledWith(
        {
          isolated: 'Isolated',
        },
        expect.anything()
      )

      await userEvent.click(button)
      await userEvent.type(isolated, '-updated')

      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          isolated: 'Isolated',
        },
        expect.anything()
      )
      expect(onCommit).toHaveBeenCalledTimes(2)
      expect(onCommit).toHaveBeenLastCalledWith(
        {
          isolated: 'Isolated',
        },
        expect.anything()
      )

      await userEvent.click(button)

      expect(onChange).toHaveBeenCalledTimes(3)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          isolated: 'Isolated-updated',
        },
        expect.anything()
      )
      expect(onCommit).toHaveBeenCalledTimes(3)
      expect(onCommit).toHaveBeenLastCalledWith(
        {
          isolated: 'Isolated-updated',
        },
        expect.anything()
      )

      expect(onSubmit).toHaveBeenCalledTimes(0)
    })

    it('should commit data on SubmitButton click without committing the form', async () => {
      const onChange = jest.fn()
      const onSubmit = jest.fn()
      const onCommit = jest.fn()

      render(
        <Form.Handler onChange={onChange} onSubmit={onSubmit}>
          <Form.Isolation onCommit={onCommit}>
            <Field.String path="/isolated" />
            <Form.SubmitButton />
          </Form.Isolation>
        </Form.Handler>
      )

      const isolated = document.querySelector('input')
      const button = document.querySelector('button')

      expect(button).toHaveTextContent('Send')

      await userEvent.type(isolated, 'Isolated')
      expect(onChange).toHaveBeenCalledTimes(0)
      expect(onCommit).toHaveBeenCalledTimes(0)

      await userEvent.click(button)

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          isolated: 'Isolated',
        },
        expect.anything()
      )
      expect(onCommit).toHaveBeenCalledTimes(1)
      expect(onCommit).toHaveBeenLastCalledWith(
        {
          isolated: 'Isolated',
        },
        expect.anything()
      )

      await userEvent.click(button)
      await userEvent.type(isolated, '-updated')

      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          isolated: 'Isolated',
        },
        expect.anything()
      )
      expect(onCommit).toHaveBeenCalledTimes(2)
      expect(onCommit).toHaveBeenLastCalledWith(
        {
          isolated: 'Isolated',
        },
        expect.anything()
      )

      await userEvent.click(button)

      expect(onChange).toHaveBeenCalledTimes(3)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          isolated: 'Isolated-updated',
        },
        expect.anything()
      )
      expect(onCommit).toHaveBeenCalledTimes(3)
      expect(onCommit).toHaveBeenLastCalledWith(
        {
          isolated: 'Isolated-updated',
        },
        expect.anything()
      )

      expect(onSubmit).toHaveBeenCalledTimes(0)
    })
  })

  it('should prevent onSubmit call on root context', async () => {
    const onSubmit = jest.fn()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.String path="/regular" />

        <Form.Isolation>
          <Field.String path="/isolated" />
          <Form.SubmitButton />
        </Form.Isolation>

        <Form.SubmitButton />
      </Form.Handler>
    )

    const [regular, isolated] = Array.from(
      document.querySelectorAll('input')
    )

    await userEvent.type(isolated, 'Isolated')

    const [isolatedSubmitButton, regularSubmitButton] = Array.from(
      document.querySelectorAll('button')
    )

    expect(isolatedSubmitButton).toHaveAttribute('type', 'button')
    expect(regularSubmitButton).toHaveAttribute('type', 'submit')

    await userEvent.click(isolatedSubmitButton)

    expect(onSubmit).toHaveBeenCalledTimes(0)

    await userEvent.click(regularSubmitButton)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenLastCalledWith(
      {
        isolated: 'Isolated',
        regular: undefined,
      },
      expect.anything()
    )

    await userEvent.type(regular, 'Regular')

    await userEvent.click(regularSubmitButton)

    expect(onSubmit).toHaveBeenCalledTimes(2)
    expect(onSubmit).toHaveBeenLastCalledWith(
      {
        isolated: 'Isolated',
        regular: 'Regular',
      },
      expect.anything()
    )

    await userEvent.type(isolated, 'Isolated changed')

    expect(onSubmit).toHaveBeenCalledTimes(2)
  })

  it('should prevent submit on enter key press', () => {
    render(
      <Form.Handler>
        <Field.String />

        <Form.Isolation>
          <Field.String />
          <Field.Number />
        </Form.Isolation>
      </Form.Handler>
    )

    const [regular, isolatedString, isolatedNumber] = Array.from(
      document.querySelectorAll('input')
    )

    {
      const enterKey = createEvent.keyDown(isolatedString, {
        key: 'Enter',
        keyCode: 13,
      })
      enterKey.preventDefault = jest.fn()
      fireEvent(isolatedString, enterKey)
      expect(enterKey.preventDefault).toHaveBeenCalledTimes(1)
    }

    {
      const enterKey = createEvent.keyDown(isolatedNumber, {
        key: 'Enter',
        keyCode: 13,
      })
      enterKey.preventDefault = jest.fn()
      fireEvent(isolatedNumber, enterKey)
      expect(enterKey.preventDefault).toHaveBeenCalledTimes(1)
    }

    {
      const enterKey = createEvent.keyDown(regular, {
        key: 'Enter',
        keyCode: 13,
      })
      enterKey.preventDefault = jest.fn()
      fireEvent(regular, enterKey)
      expect(enterKey.preventDefault).toHaveBeenCalledTimes(0)
    }
  })

  it('should call onCommit when submit is called', () => {
    const onSubmit = jest.fn()
    const onCommit = jest.fn()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.String />

        <Form.Isolation onCommit={onCommit}>
          <Field.String />
          <Field.Number />
          <Form.Isolation.CommitButton />
        </Form.Isolation>
      </Form.Handler>
    )

    const [regular, isolatedString, isolatedNumber] = Array.from(
      document.querySelectorAll('input')
    )

    {
      const enterKey = createEvent.keyDown(isolatedString, {
        key: 'Enter',
        keyCode: 13,
      })
      fireEvent(isolatedString, enterKey)
      expect(onSubmit).toHaveBeenCalledTimes(0)
      expect(onCommit).toHaveBeenCalledTimes(1)
    }

    {
      const enterKey = createEvent.keyDown(isolatedNumber, {
        key: 'Enter',
        keyCode: 13,
      })
      fireEvent(isolatedNumber, enterKey)
      expect(onSubmit).toHaveBeenCalledTimes(0)
      expect(onCommit).toHaveBeenCalledTimes(2)
    }

    {
      const enterKey = createEvent.keyDown(regular, {
        key: 'Enter',
        keyCode: 13,
      })
      fireEvent(regular, enterKey)
      expect(onSubmit).toHaveBeenCalledTimes(0)
      expect(onCommit).toHaveBeenCalledTimes(2)
    }

    const form = document.querySelector('form')
    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onCommit).toHaveBeenCalledTimes(2)

    const button = document.querySelector('button')
    fireEvent.click(button)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onCommit).toHaveBeenCalledTimes(3)
  })

  it('should support async onCommit', async () => {
    const onSubmit = jest.fn()
    const onCommit = jest.fn(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100))
    })

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.String path="/myValue" />

        <Form.Isolation onCommit={onCommit}>
          <Field.String path="/myValue" value="isolated" />
          <Form.Isolation.CommitButton />
        </Form.Isolation>
      </Form.Handler>
    )

    const [regular, isolated] = Array.from(
      document.querySelectorAll('input')
    )

    expect(regular).toHaveValue('')
    expect(isolated).toHaveValue('isolated')

    const commitButton = document.querySelector('button')
    await userEvent.click(commitButton)

    const now = Date.now()
    await waitFor(() => {
      expect(regular).toHaveValue('isolated')
      expect(isolated).toHaveValue('isolated')
    })

    const delay = Date.now() - now
    expect(delay).toBeGreaterThan(100)
  })

  it('should prevent commit on "preventCommit" call', async () => {
    const onSubmit = jest.fn()
    const onCommit = jest.fn(({ myValue }, { preventCommit }) => {
      if (myValue === 'prevent-commit') {
        preventCommit()
      }
    })

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.String path="/myValue" />

        <Form.Isolation onCommit={onCommit}>
          <Field.String path="/myValue" value="isolated" />
          <Form.Isolation.CommitButton />
        </Form.Isolation>
      </Form.Handler>
    )

    const [regular, isolated] = Array.from(
      document.querySelectorAll('input')
    )

    expect(regular).toHaveValue('')
    expect(isolated).toHaveValue('isolated')

    const commitButton = document.querySelector('button')
    await userEvent.click(commitButton)

    expect(regular).toHaveValue('isolated')
    expect(isolated).toHaveValue('isolated')

    fireEvent.change(isolated, { target: { value: 'prevent-commit' } })
    await userEvent.click(commitButton)

    expect(regular).toHaveValue('isolated')
    expect(isolated).toHaveValue('prevent-commit')
  })

  it('should not call onCommit when error is present', async () => {
    const onSubmit = jest.fn()
    const onCommit = jest.fn()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.String required />

        <Form.Isolation onCommit={onCommit}>
          <Field.String required />
          <Form.Isolation.CommitButton />
        </Form.Isolation>
      </Form.Handler>
    )

    const form = document.querySelector('form')
    fireEvent.submit(form)

    const [regular, isolated] = Array.from(
      document.querySelectorAll('.dnb-forms-field-block')
    )

    {
      const enterKey = createEvent.keyDown(regular, {
        key: 'Enter',
        keyCode: 13,
      })
      fireEvent(regular.querySelector('input'), enterKey)
    }

    expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(1)

    {
      const enterKey = createEvent.keyDown(isolated, {
        key: 'Enter',
        keyCode: 13,
      })
      fireEvent(isolated.querySelector('input'), enterKey)
    }

    const button = document.querySelector('button')
    fireEvent.click(button)

    expect(onSubmit).toHaveBeenCalledTimes(0)
    expect(onCommit).toHaveBeenCalledTimes(0)

    await userEvent.type(isolated.querySelector('input'), 'foo')

    fireEvent.click(button)

    expect(onSubmit).toHaveBeenCalledTimes(0)
    expect(onCommit).toHaveBeenCalledTimes(1)
  })

  it('should render error when commitHandleRef is called', async () => {
    const commitHandleRef = React.createRef<() => void>()

    render(
      <Form.Handler>
        <Form.Isolation commitHandleRef={commitHandleRef}>
          <Field.String required />
        </Form.Isolation>
      </Form.Handler>
    )

    expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(0)

    act(() => {
      commitHandleRef.current()
    })

    expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(1)
  })

  it('should show required when submit is called', () => {
    render(
      <Form.Handler>
        <Field.String required />

        <Form.Isolation>
          <Field.String required />
        </Form.Isolation>
      </Form.Handler>
    )

    expect(document.querySelector('.dnb-form-status')).toBeNull()

    const form = document.querySelector('form')
    fireEvent.submit(form)

    expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(1)

    const [regular, isolated] = Array.from(
      document.querySelectorAll('.dnb-forms-field-block')
    )

    {
      const enterKey = createEvent.keyDown(regular, {
        key: 'Enter',
        keyCode: 13,
      })
      fireEvent(regular.querySelector('input'), enterKey)
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nb.Field.errorRequired
      )
    }

    expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(1)

    {
      const enterKey = createEvent.keyDown(isolated, {
        key: 'Enter',
        keyCode: 13,
      })
      fireEvent(isolated.querySelector('input'), enterKey)
      expect(isolated.querySelector('.dnb-form-status')).toHaveTextContent(
        nb.Field.errorRequired
      )
    }

    expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(2)
  })

  it('should support "transformOnCommit"', async () => {
    const onChange = jest.fn()

    render(
      <Form.Handler
        data={{ existing: 'data', persons: [{ name: 'John' }] }}
        onChange={onChange}
      >
        <Form.Isolation<{
          persons: Array<{ name: string }>
          newPerson: Array<{ name: string }>
        }>
          transformOnCommit={(isolatedData, handlerData) => {
            return {
              ...handlerData,
              persons: [...handlerData.persons, isolatedData.newPerson],
            }
          }}
        >
          <Field.String path="/newPerson/name" />
          <Form.Isolation.CommitButton />
        </Form.Isolation>
      </Form.Handler>
    )

    const commitButton = document.querySelector('button')
    const isolated = document.querySelector('input')

    await userEvent.type(isolated, 'Oda')
    await userEvent.click(commitButton)

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(
      {
        existing: 'data',
        persons: [{ name: 'John' }, { name: 'Oda' }],
      },
      expect.anything()
    )

    await userEvent.type(isolated, '{Backspace>3}Odd')
    await userEvent.click(commitButton)

    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenLastCalledWith(
      {
        existing: 'data',
        persons: [{ name: 'John' }, { name: 'Oda' }, { name: 'Odd' }],
      },
      expect.anything()
    )
  })

  it('should render inside section with correct paths', async () => {
    const onChange = jest.fn()
    const onCommit = jest.fn()
    const onPathChange = jest.fn()

    render(
      <Form.Handler
        defaultData={{
          mySection: {
            isolated: 'outside',
            regular: 'regular',
          },
        }}
        onChange={onChange}
      >
        <Form.Section path="/mySection">
          <Form.Isolation
            defaultData={{
              isolated: 'inside',
            }}
            onCommit={onCommit}
            onPathChange={onPathChange}
          >
            <Field.String label="Isolated" path="/isolated" />
            <Form.Isolation.CommitButton />
          </Form.Isolation>

          <Field.String label="Synced" path="/isolated" />
          <Field.String label="Regular" path="/regular" />
        </Form.Section>
      </Form.Handler>
    )

    const button = document.querySelector('button')
    const inputs = Array.from(document.querySelectorAll('input'))
    const [isolated, synced, regular] = inputs

    expect(isolated).toHaveValue('inside')
    expect(synced).toHaveValue('outside')
    expect(regular).toHaveValue('regular')

    await userEvent.type(isolated, ' changed')

    expect(onPathChange).toHaveBeenLastCalledWith(
      '/isolated',
      'inside changed'
    )

    expect(isolated).toHaveValue('inside changed')
    expect(synced).toHaveValue('outside')
    expect(regular).toHaveValue('regular')

    await userEvent.type(regular, ' changed')

    expect(isolated).toHaveValue('inside changed')
    expect(synced).toHaveValue('outside')
    expect(regular).toHaveValue('regular changed')

    await userEvent.type(synced, ' changed')

    expect(isolated).toHaveValue('inside changed')
    expect(synced).toHaveValue('outside changed')
    expect(regular).toHaveValue('regular changed')

    await userEvent.click(button)

    expect(onCommit).toHaveBeenCalledTimes(1)
    expect(onCommit).toHaveBeenLastCalledWith(
      { isolated: 'inside changed' },
      {
        clearData: expect.any(Function),
        preventCommit: expect.any(Function),
      }
    )
    expect(onChange).toHaveBeenLastCalledWith(
      {
        mySection: {
          isolated: 'inside changed',
          regular: 'regular changed',
        },
      },
      expect.anything()
    )

    expect(isolated).toHaveValue('inside changed')
    expect(synced).toHaveValue('inside changed')
    expect(regular).toHaveValue('regular changed')

    await userEvent.type(synced, ' 2x')

    expect(isolated).toHaveValue('inside changed')
    expect(synced).toHaveValue('inside changed 2x')
    expect(regular).toHaveValue('regular changed')

    await userEvent.type(regular, ' 2x')

    expect(isolated).toHaveValue('inside changed')
    expect(synced).toHaveValue('inside changed 2x')
    expect(regular).toHaveValue('regular changed 2x')

    await userEvent.type(isolated, ' 2x')

    expect(onPathChange).toHaveBeenLastCalledWith(
      '/isolated',
      'inside changed 2x'
    )

    expect(isolated).toHaveValue('inside changed 2x')
    expect(synced).toHaveValue('inside changed 2x')
    expect(regular).toHaveValue('regular changed 2x')
  })

  it('should commit unchanged data when inside a section', async () => {
    const onChange = jest.fn()
    const onCommit = jest.fn()

    render(
      <Form.Handler
        defaultData={{
          mySection: {
            isolated: 'outside',
            regular: 'regular',
          },
        }}
        onChange={onChange}
      >
        <Form.Section path="/mySection">
          <Form.Isolation
            defaultData={{
              isolated: 'inside',
            }}
            onCommit={onCommit}
          >
            <Field.String label="Isolated" path="/isolated" />
            <Form.Isolation.CommitButton />
          </Form.Isolation>

          <Field.String label="Synced" path="/isolated" />
          <Field.String label="Regular" path="/regular" />
        </Form.Section>
      </Form.Handler>
    )

    const button = document.querySelector('button')
    const inputs = Array.from(document.querySelectorAll('input'))
    const [isolated, synced, regular] = inputs

    expect(isolated).toHaveValue('inside')
    expect(synced).toHaveValue('outside')
    expect(regular).toHaveValue('regular')

    await userEvent.click(button)

    expect(isolated).toHaveValue('inside')
    expect(synced).toHaveValue('inside')
    expect(regular).toHaveValue('regular')

    expect(onCommit).toHaveBeenCalledTimes(1)
    expect(onCommit).toHaveBeenLastCalledWith(
      { isolated: 'inside' },
      {
        clearData: expect.any(Function),
        preventCommit: expect.any(Function),
      }
    )
    expect(onChange).toHaveBeenLastCalledWith(
      {
        mySection: {
          isolated: 'inside',
          regular: 'regular',
        },
      },
      expect.anything()
    )
  })

  it('clears the form data when "clearData" is called inside the "onCommit" event', async () => {
    const onCommit = jest.fn((data, { clearData }) => {
      clearData()
    })

    render(
      <Form.Handler
        defaultData={{
          mySection: {
            isolated: 'outside',
            regular: 'regular',
          },
        }}
      >
        <Form.Section path="/mySection">
          <Form.Isolation
            defaultData={{
              isolated: 'inside',
            }}
            onCommit={onCommit}
          >
            <Field.String label="Isolated" path="/isolated" required />
            <Form.Isolation.CommitButton />
          </Form.Isolation>

          <Field.String label="Synced" path="/isolated" />
          <Field.String label="Regular" path="/regular" />
        </Form.Section>
      </Form.Handler>
    )

    const button = document.querySelector('button')
    const inputs = Array.from(document.querySelectorAll('input'))
    const [isolated, synced, regular] = inputs

    await userEvent.type(isolated, ' changed')

    expect(isolated).toHaveValue('inside changed')
    expect(synced).toHaveValue('outside')
    expect(regular).toHaveValue('regular')

    await userEvent.click(button)

    expect(onCommit).toHaveBeenCalledTimes(1)
    expect(onCommit).toHaveBeenLastCalledWith(
      { isolated: 'inside changed' },
      {
        clearData: expect.any(Function),
        preventCommit: expect.any(Function),
      }
    )

    await waitFor(() => {
      expect(isolated).toHaveValue('')
      expect(synced).toHaveValue('inside changed')
      expect(regular).toHaveValue('regular')

      expect(document.querySelector('.dnb-form-status')).toBeNull()
    })

    await userEvent.click(button)

    expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
      nb.Field.errorRequired
    )

    await userEvent.type(isolated, 'new value')

    expect(isolated).toHaveValue('new value')
    expect(synced).toHaveValue('inside changed')
    expect(regular).toHaveValue('regular')
  })

  describe('bubbleValidation', () => {
    it('should prevent the form from submitting as long as there are errors', async () => {
      const onSubmitRequest = jest.fn()
      const onSubmit = jest.fn()
      const onCommit = jest.fn()

      render(
        <Form.Handler
          onSubmitRequest={onSubmitRequest}
          onSubmit={onSubmit}
        >
          <Form.Isolation onCommit={onCommit} bubbleValidation>
            <Field.String label="Isolated" path="/isolated" required />
            <Form.Isolation.CommitButton />
          </Form.Isolation>
        </Form.Handler>
      )

      const input = document.querySelector('input')
      const form = document.querySelector('form')
      const commitButton = document.querySelector('button')

      await userEvent.click(commitButton)
      fireEvent.submit(form)

      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nb.Field.errorRequired
      )

      expect(onSubmit).toHaveBeenCalledTimes(0)
      expect(onSubmitRequest).toHaveBeenCalledTimes(1)
      expect(onCommit).toHaveBeenCalledTimes(0)

      await userEvent.type(input, 'Tony')
      fireEvent.submit(form)

      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmitRequest).toHaveBeenCalledTimes(1)
      expect(onCommit).toHaveBeenCalledTimes(0)

      await userEvent.click(commitButton)
      expect(onCommit).toHaveBeenCalledTimes(1)
    })
  })
})
