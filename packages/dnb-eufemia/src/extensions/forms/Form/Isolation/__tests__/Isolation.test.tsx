import React from 'react'
import {
  act,
  createEvent,
  fireEvent,
  render,
} from '@testing-library/react'
import { Field, Form, JSONSchema } from '../../..'
import userEvent from '@testing-library/user-event'

import nbNO from '../../../constants/locales/nb-NO'
import setData from '../../data-context/setData'
const nb = nbNO['nb-NO']

describe('Form.Isolation', () => {
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

  it('should use data from isolated context', () => {
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

  it('should use defaultData from isolated context', () => {
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
          <Form.Isolation.DispatchButton />
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

  it('should update data when changed in the root context', async () => {
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
    expect(inside).toHaveValue('Changed')
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
    expect(onChange).toHaveBeenLastCalledWith({
      regular: 'Regular',
    })
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
    expect(onChange).toHaveBeenLastCalledWith({
      isolated: 'Isolated',
    })

    await userEvent.type(regular, 'Regular')

    expect(onChange).toHaveBeenCalledTimes(8)
  })

  it('should call onChange on data context when local data submit is called', async () => {
    const onChange = jest.fn()
    const dispatchHandleRef = React.createRef<() => void>()

    render(
      <Form.Handler onChange={onChange}>
        <Field.String path="/regular" />

        <Form.Isolation dispatchHandleRef={dispatchHandleRef}>
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
      dispatchHandleRef.current()
    })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith({
      isolated: 'Isolated',
    })

    await userEvent.type(regular, 'Regular')

    expect(onChange).toHaveBeenCalledTimes(8)
    expect(onChange).toHaveBeenLastCalledWith({
      regular: 'Regular',
      isolated: 'Isolated',
    })
  })

  it('should support nested paths', async () => {
    const onChange = jest.fn()
    const dispatchHandleRef = React.createRef<() => void>()

    render(
      <Form.Handler
        onChange={onChange}
        data={{
          regular: 'Regular',
          nested: { isolated: 'Isolated' },
        }}
      >
        <Field.String path="/regular" />

        <Form.Isolation dispatchHandleRef={dispatchHandleRef}>
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
      dispatchHandleRef.current()
    })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith({
      regular: 'Regular',
      nested: {
        isolated: 'Isolated changed',
      },
    })

    await userEvent.type(regular, ' changed')

    expect(onChange).toHaveBeenCalledTimes(9)
    expect(onChange).toHaveBeenLastCalledWith({
      regular: 'Regular changed',
      nested: {
        isolated: 'Isolated changed',
      },
    })
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
          <Form.Isolation.DispatchButton />
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

  describe('Isolate.Button', () => {
    it('should have correct type and text', async () => {
      render(
        <Form.Isolation>
          <Form.Isolation.DispatchButton />
        </Form.Isolation>
      )

      const button = document.querySelector('button')

      expect(button).toHaveTextContent(nb.Isolation.dispatchButtonText)
      expect(button).toHaveAttribute('type', 'button')
    })

    it('should call global onChange and local onDispatch on data context when Isolate.Button gets clicked', async () => {
      const onChange = jest.fn()
      const onSubmit = jest.fn()
      const onDispatch = jest.fn()

      render(
        <Form.Handler onChange={onChange} onSubmit={onSubmit}>
          <Form.Isolation onDispatch={onDispatch}>
            <Field.String path="/isolated" />
            <Form.Isolation.DispatchButton text="Complete" />
          </Form.Isolation>
        </Form.Handler>
      )

      const isolated = document.querySelector('input')
      const button = document.querySelector('button')

      await userEvent.type(isolated, 'Isolated')
      expect(onChange).toHaveBeenCalledTimes(0)
      expect(onDispatch).toHaveBeenCalledTimes(0)

      await userEvent.click(button)

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenLastCalledWith({
        isolated: 'Isolated',
      })
      expect(onDispatch).toHaveBeenCalledTimes(1)
      expect(onDispatch).toHaveBeenLastCalledWith({
        isolated: 'Isolated',
      })

      await userEvent.click(button)
      await userEvent.type(isolated, '-updated')

      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenLastCalledWith({
        isolated: 'Isolated',
      })
      expect(onDispatch).toHaveBeenCalledTimes(2)
      expect(onDispatch).toHaveBeenLastCalledWith({
        isolated: 'Isolated',
      })

      await userEvent.click(button)

      expect(onChange).toHaveBeenCalledTimes(3)
      expect(onChange).toHaveBeenLastCalledWith({
        isolated: 'Isolated-updated',
      })
      expect(onDispatch).toHaveBeenCalledTimes(3)
      expect(onDispatch).toHaveBeenLastCalledWith({
        isolated: 'Isolated-updated',
      })

      expect(onSubmit).toHaveBeenCalledTimes(0)
    })
  })

  it('should prevent onSubmit call on root context', async () => {
    const onSubmit = jest.fn()
    const dispatchHandleRef = React.createRef<() => void>()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.String path="/regular" />

        <Form.Isolation dispatchHandleRef={dispatchHandleRef}>
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

  it('should call onDispatch when submit is called', () => {
    const onSubmit = jest.fn()
    const onDispatch = jest.fn()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.String />

        <Form.Isolation onDispatch={onDispatch}>
          <Field.String />
          <Field.Number />
          <Form.Isolation.DispatchButton />
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
      expect(onDispatch).toHaveBeenCalledTimes(1)
    }

    {
      const enterKey = createEvent.keyDown(isolatedNumber, {
        key: 'Enter',
        keyCode: 13,
      })
      fireEvent(isolatedNumber, enterKey)
      expect(onSubmit).toHaveBeenCalledTimes(0)
      expect(onDispatch).toHaveBeenCalledTimes(2)
    }

    {
      const enterKey = createEvent.keyDown(regular, {
        key: 'Enter',
        keyCode: 13,
      })
      fireEvent(regular, enterKey)
      expect(onSubmit).toHaveBeenCalledTimes(0)
      expect(onDispatch).toHaveBeenCalledTimes(2)
    }

    const form = document.querySelector('form')
    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onDispatch).toHaveBeenCalledTimes(2)

    const button = document.querySelector('button')
    fireEvent.click(button)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onDispatch).toHaveBeenCalledTimes(3)
  })

  it('should not call onDispatch when error is present', async () => {
    const onSubmit = jest.fn()
    const onDispatch = jest.fn()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.String required />

        <Form.Isolation onDispatch={onDispatch}>
          <Field.String required />
          <Form.Isolation.DispatchButton />
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
    expect(onDispatch).toHaveBeenCalledTimes(0)

    await userEvent.type(isolated.querySelector('input'), 'foo')

    fireEvent.click(button)

    expect(onSubmit).toHaveBeenCalledTimes(0)
    expect(onDispatch).toHaveBeenCalledTimes(1)
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
})
