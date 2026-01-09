import React, { useContext } from 'react'
import { spyOnEufemiaWarn } from '../../../../../core/jest/jestSetup'
import {
  act,
  createEvent,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { JSONSchema } from '../../..'
import { Field, Form, Iterate, makeAjvInstance, Wizard, z } from '../../..'
import DataContext from '../../../DataContext/Context'
import setData from '../../data-context/setData'
import useReportError from '../useReportError'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

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
          ajvInstance={makeAjvInstance()}
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

    describe('resetDataAfterCommit', () => {
      it('should reset data context after commit using submit button when "resetDataAfterCommit" is true', async () => {
        const onChange = jest.fn()
        const onSubmit = jest.fn()
        const onCommit = jest.fn()

        render(
          <Form.Handler onChange={onChange} onSubmit={onSubmit}>
            <Form.Isolation onCommit={onCommit} resetDataAfterCommit>
              <Field.String path="/isolated" />
              <Form.Isolation.CommitButton />
            </Form.Isolation>
          </Form.Handler>
        )

        const isolated = document.querySelector('input')
        const commitButton = document.querySelector(
          '.dnb-forms-isolate__commit-button'
        )

        await userEvent.type(isolated, 'Isolated')

        expect(isolated).toHaveValue('Isolated')
        expect(onChange).toHaveBeenCalledTimes(0)
        expect(onCommit).toHaveBeenCalledTimes(0)

        await userEvent.click(commitButton)

        await waitFor(() => {
          expect(isolated).toHaveValue('')
        })

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

        await userEvent.click(commitButton)
        await userEvent.type(isolated, '-updated')

        await waitFor(() => {
          expect(isolated).toHaveValue('-updated')
        })

        expect(onChange).toHaveBeenCalledTimes(2)
        expect(onChange).toHaveBeenLastCalledWith(
          {
            isolated: undefined,
          },
          expect.anything()
        )
        expect(onCommit).toHaveBeenCalledTimes(2)
        expect(onCommit).toHaveBeenLastCalledWith(
          {
            isolated: undefined,
          },
          expect.anything()
        )
      })

      it('should reset data context completely (internally) without keeping its previous state', async () => {
        render(
          <Form.Handler>
            <Form.Isolation resetDataAfterCommit>
              <Field.String className="inside" path="/isolated" />
              <Form.Isolation.CommitButton />
            </Form.Isolation>

            <Field.String className="outside" path="/isolated" />
          </Form.Handler>
        )

        const inside = document.querySelector('.inside input')
        const outside = document.querySelector('.outside input')

        const commitButton = document.querySelector(
          '.dnb-forms-isolate__commit-button'
        )

        await userEvent.type(inside, 'Isolated')
        expect(inside).toHaveValue('Isolated')
        expect(outside).toHaveValue('')

        await userEvent.click(commitButton)
        await waitFor(() => {
          expect(inside).toHaveValue('')
          expect(outside).toHaveValue('Isolated')
        })

        await userEvent.type(outside, ' - make a change')
        expect(inside).toHaveValue('')
        expect(outside).toHaveValue('Isolated - make a change')

        await userEvent.click(commitButton)
        await waitFor(() => {
          expect(inside).toHaveValue('')
          expect(outside).toHaveValue('')
        })

        await userEvent.type(outside, 'Make a change')
        expect(inside).toHaveValue('')
        expect(outside).toHaveValue('Make a change')
      })

      it('should reset data context after commit using enter key when "resetDataAfterCommit" is true', async () => {
        const onChange = jest.fn()
        const onSubmit = jest.fn()
        const onCommit = jest.fn()

        render(
          <Form.Handler onChange={onChange} onSubmit={onSubmit}>
            <Form.Isolation onCommit={onCommit} resetDataAfterCommit>
              <Field.String path="/isolated" />
              <Form.Isolation.CommitButton />
            </Form.Isolation>
          </Form.Handler>
        )

        const isolated = document.querySelector('input')

        await userEvent.type(isolated, 'Isolated')

        expect(isolated).toHaveValue('Isolated')
        expect(onChange).toHaveBeenCalledTimes(0)
        expect(onCommit).toHaveBeenCalledTimes(0)

        await userEvent.type(isolated, '{Enter}')

        await waitFor(() => {
          expect(isolated).toHaveValue('')
        })

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

        await userEvent.keyboard('{Enter}')
        await userEvent.type(isolated, '-updated')

        await waitFor(() => {
          expect(isolated).toHaveValue('-updated')
        })

        expect(onChange).toHaveBeenCalledTimes(2)
        expect(onChange).toHaveBeenLastCalledWith(
          {
            isolated: undefined,
          },
          expect.anything()
        )
        expect(onCommit).toHaveBeenCalledTimes(2)
        expect(onCommit).toHaveBeenLastCalledWith(
          {
            isolated: undefined,
          },
          expect.anything()
        )
      })

      it('should use "defaultValue" to reset the isolated context after commit', async () => {
        const onCommit = jest.fn()

        render(
          <Form.Handler>
            <Form.Isolation onCommit={onCommit} resetDataAfterCommit>
              <Field.String
                path="/isolated"
                defaultValue="default value"
              />
              <Form.Isolation.CommitButton />
            </Form.Isolation>
          </Form.Handler>
        )

        const isolated = document.querySelector('input')
        const commitButton = document.querySelector(
          '.dnb-forms-isolate__commit-button'
        )

        expect(isolated).toHaveValue('default value')

        await userEvent.type(isolated, ' with a change')

        expect(isolated).toHaveValue('default value with a change')
        expect(onCommit).toHaveBeenCalledTimes(0)

        await userEvent.click(commitButton)

        await waitFor(() => {
          expect(isolated).toHaveValue('default value')
        })

        expect(onCommit).toHaveBeenCalledTimes(1)
        expect(onCommit).toHaveBeenLastCalledWith(
          {
            isolated: 'default value with a change',
          },
          expect.anything()
        )
      })

      it('should use "defaultData" to reset the isolated context after commit', async () => {
        const onCommit = jest.fn()

        render(
          <Form.Handler>
            <Form.Isolation
              onCommit={onCommit}
              resetDataAfterCommit
              defaultData={{
                isolated: 'default value',
              }}
            >
              <Field.String path="/isolated" />
              <Form.Isolation.CommitButton />
            </Form.Isolation>
          </Form.Handler>
        )

        const isolated = document.querySelector('input')
        const commitButton = document.querySelector(
          '.dnb-forms-isolate__commit-button'
        )

        expect(isolated).toHaveValue('default value')

        await userEvent.type(isolated, ' with a change')

        expect(isolated).toHaveValue('default value with a change')
        expect(onCommit).toHaveBeenCalledTimes(0)

        await userEvent.click(commitButton)

        await waitFor(() => {
          expect(isolated).toHaveValue('default value')
        })

        expect(onCommit).toHaveBeenCalledTimes(1)
        expect(onCommit).toHaveBeenLastCalledWith(
          {
            isolated: 'default value with a change',
          },
          expect.anything()
        )
      })

      it('should not reset when validation of field fails', async () => {
        const onCommit = jest.fn()

        render(
          <Form.Handler>
            <Form.Isolation onCommit={onCommit} resetDataAfterCommit>
              <Field.String
                path="/isolated"
                required
                defaultValue="default value"
              />
              <Form.Isolation.CommitButton />
            </Form.Isolation>
          </Form.Handler>
        )

        const isolated = document.querySelector('input')
        const commitButton = document.querySelector(
          '.dnb-forms-isolate__commit-button'
        )

        expect(isolated).toHaveValue('default value')

        await userEvent.type(isolated, '{Backspace>13}')

        expect(isolated).toHaveValue('')
        expect(onCommit).toHaveBeenCalledTimes(0)

        await userEvent.click(commitButton)

        await waitFor(() => {
          expect(isolated).toHaveValue('')
          expect(
            document.querySelector('.dnb-form-status')
          ).toHaveTextContent(nb.Field.errorRequired)
        })

        expect(onCommit).toHaveBeenCalledTimes(0)
      })

      it('should use a refreshed (by calling "refresh") snapshot after commit', async () => {
        const onCommit = jest.fn()

        const dataReference = Form.Isolation.createDataReference()

        render(
          <Form.Handler>
            <Form.Isolation
              onCommit={onCommit}
              dataReference={dataReference}
              resetDataAfterCommit
            >
              <Field.String path="/isolated" />

              <Form.Isolation.CommitButton />
            </Form.Isolation>
          </Form.Handler>
        )

        const isolated = document.querySelector('input')
        const commitButton = document.querySelector(
          '.dnb-forms-isolate__commit-button'
        )

        await userEvent.type(isolated, 'foo')

        expect(isolated).toHaveValue('foo')
        expect(dataReference.snapshotRef.current).toEqual({
          isolated: undefined,
        })

        await userEvent.type(
          isolated,
          '{Backspace>3}Use this as the reset data'
        )

        dataReference.refresh()

        expect(isolated).toHaveValue('Use this as the reset data')
        expect(dataReference.snapshotRef.current).toEqual({
          isolated: 'Use this as the reset data',
        })

        await userEvent.type(isolated, '{Backspace>26}Isolated')
        expect(isolated).toHaveValue('Isolated')

        await userEvent.click(commitButton)

        await waitFor(() => {
          expect(isolated).toHaveValue('Use this as the reset data')
        })

        expect(onCommit).toHaveBeenCalledTimes(1)
        expect(onCommit).toHaveBeenLastCalledWith(
          {
            isolated: 'Isolated',
          },
          expect.anything()
        )
      })
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

    const commitButton = document.querySelector(
      '.dnb-forms-isolate__commit-button'
    )
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

    const commitButton = document.querySelector(
      '.dnb-forms-isolate__commit-button'
    )
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

    const commitButton = document.querySelector(
      '.dnb-forms-isolate__commit-button'
    )
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

  describe('store data in data context', () => {
    it('should set the field value to the data context', async () => {
      let outerContext = null
      let innerContext = null

      const CollectOuterData = () => {
        outerContext = Form.useData()
        return null
      }

      const CollectInnerData = () => {
        innerContext = Form.useData()
        return null
      }

      const { rerender } = render(
        <Form.Handler>
          <Form.Isolation>
            <Field.String path="/inner" />
            <CollectInnerData />
          </Form.Isolation>

          <Field.String path="/outer" />
          <CollectOuterData />
        </Form.Handler>
      )

      expect(innerContext.data).toEqual({
        inner: undefined,
      })
      expect(outerContext.data).toEqual({
        outer: undefined,
      })

      rerender(
        <Form.Handler>
          <Form.Isolation>
            <Field.String path="/inner" value="inner value" />
            <CollectInnerData />
          </Form.Isolation>

          <Field.String path="/outer" value="outer value" />
          <CollectOuterData />
        </Form.Handler>
      )

      expect(innerContext.data).toEqual({
        inner: 'inner value',
        outer: 'outer value',
      })
      expect(outerContext.data).toEqual({
        outer: 'outer value',
      })
    })

    it('should set the iterate value to the data context', async () => {
      let outerContext = null
      let innerContext = null

      const CollectOuterData = () => {
        outerContext = Form.useData()
        return null
      }

      const CollectInnerData = () => {
        innerContext = Form.useData()
        return null
      }

      const { rerender } = render(
        <Form.Handler>
          <Form.Isolation>
            <Iterate.Array path="/inner" value={[{}]}>
              <Field.String itemPath="/item" />
            </Iterate.Array>
            <CollectInnerData />
          </Form.Isolation>

          <Iterate.Array path="/outer" value={[{}]}>
            <Field.String itemPath="/item" />
          </Iterate.Array>
          <CollectOuterData />
        </Form.Handler>
      )

      expect(innerContext.data).toEqual({
        inner: [{ item: undefined }],
        outer: [{ item: undefined }],
      })
      expect(outerContext.data).toEqual({
        outer: [{ item: undefined }],
      })

      rerender(
        <Form.Handler>
          <Form.Isolation>
            <Iterate.Array path="/inner" value={[{ item: 'inner value' }]}>
              <Field.String itemPath="/item" />
            </Iterate.Array>
            <CollectInnerData />
          </Form.Isolation>

          <Iterate.Array path="/outer" value={[{ item: 'outer value' }]}>
            <Field.String itemPath="/item" />
          </Iterate.Array>
          <CollectOuterData />
        </Form.Handler>
      )

      expect(innerContext.data).toEqual({
        inner: [{ item: undefined }], // TODO: should be 'inner value'
        outer: [{ item: undefined }], // TODO: should be 'outer value'
      })
      expect(outerContext.data).toEqual({
        outer: [{ item: undefined }], // TODO: should be 'outer value'
      })
    })

    it('should set the iterate value to the data context using defaultValue', async () => {
      let outerContext = null
      let innerContext = null

      const CollectOuterData = () => {
        outerContext = Form.useData()
        return null
      }

      const CollectInnerData = () => {
        innerContext = Form.useData()
        return null
      }

      const { rerender } = render(
        <Form.Handler>
          <Form.Isolation>
            <Iterate.Array path="/inner" value={[{}]}>
              <Field.String itemPath="/item" />
            </Iterate.Array>
            <CollectInnerData />
          </Form.Isolation>

          <Iterate.Array path="/outer" value={[{}]}>
            <Field.String itemPath="/item" />
          </Iterate.Array>
          <CollectOuterData />
        </Form.Handler>
      )

      expect(innerContext.data).toEqual({
        inner: [{ item: undefined }],
        outer: [{ item: undefined }],
      })
      expect(outerContext.data).toEqual({
        outer: [{ item: undefined }],
      })

      rerender(
        <Form.Handler>
          <Form.Isolation>
            <Iterate.Array path="/inner" value={[{}]}>
              <Field.String itemPath="/item" value="inner value" />
            </Iterate.Array>
            <CollectInnerData />
          </Form.Isolation>

          <Iterate.Array path="/outer" value={[{}]}>
            <Field.String itemPath="/item" value="outer value" />
          </Iterate.Array>
          <CollectOuterData />
        </Form.Handler>
      )

      expect(innerContext.data).toEqual({
        inner: [{ item: 'inner value' }],
        outer: [{ item: 'outer value' }],
      })
      expect(outerContext.data).toEqual({
        outer: [{ item: 'outer value' }],
      })
    })

    it('should not set the field value to the outer context when wrapped in a section', async () => {
      let outerContext = null
      let innerContext = null

      const CollectOuterData = () => {
        outerContext = Form.useData()
        return null
      }

      const CollectInnerData = () => {
        innerContext = Form.useData()
        return null
      }

      const { rerender } = render(
        <Form.Handler defaultData={{ mySection: {} }}>
          <Form.Section path="/mySection">
            <Form.Isolation>
              <Field.String path="/isolated" />
              <CollectInnerData />
            </Form.Isolation>
          </Form.Section>

          <CollectOuterData />
        </Form.Handler>
      )

      expect(innerContext.data).toEqual({
        mySection: {
          isolated: undefined,
        },
      })
      expect(outerContext.data).toEqual({
        mySection: {},
      })

      rerender(
        <Form.Handler defaultData={{ mySection: {} }}>
          <Form.Section path="/mySection">
            <Form.Isolation>
              <Field.String path="/isolated" value="isolated value" />
              <CollectInnerData />
            </Form.Isolation>
          </Form.Section>

          <CollectOuterData />
        </Form.Handler>
      )

      expect(innerContext.data).toEqual({
        mySection: {
          isolated: 'isolated value',
        },
      })
      expect(outerContext.data).toEqual({
        mySection: {},
      })
    })
  })

  describe('preventUncommittedChanges', () => {
    it('should prevent the form from submitting as long as there is uncommitted data', async () => {
      const onSubmitRequest = jest.fn()
      const onSubmit = jest.fn()
      const onCommit = jest.fn()

      render(
        <Form.Handler
          onSubmitRequest={onSubmitRequest}
          onSubmit={onSubmit}
        >
          <Form.Isolation
            preventUncommittedChanges
            resetDataAfterCommit
            onCommit={onCommit}
          >
            <Field.String path="/name" />
            <Form.Isolation.CommitButton />
          </Form.Isolation>
        </Form.Handler>
      )

      const input = document.querySelector('input')
      const form = document.querySelector('form')
      const commitButton = document.querySelector(
        '.dnb-forms-isolate__commit-button'
      )

      await userEvent.type(input, 'Tony')

      fireEvent.submit(form)

      expect(onSubmit).toHaveBeenCalledTimes(0)
      expect(onSubmitRequest).toHaveBeenCalledTimes(1)
      expect(onCommit).toHaveBeenCalledTimes(0)

      await userEvent.click(commitButton)

      await waitFor(() => {
        expect(input).toHaveValue('')
        expect(document.querySelector('.dnb-form-status')).toBeNull()
      })

      fireEvent.submit(form)

      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenLastCalledWith(
        { name: 'Tony' },
        expect.anything()
      )
      expect(onSubmitRequest).toHaveBeenCalledTimes(1)
      expect(onCommit).toHaveBeenCalledTimes(1)
    })

    it('should show error when submitting the form', async () => {
      render(
        <Form.Handler>
          <Form.Isolation preventUncommittedChanges resetDataAfterCommit>
            <Field.String path="/name" />
            <Form.Isolation.CommitButton />
          </Form.Isolation>
        </Form.Handler>
      )

      const input = document.querySelector('input')
      const form = document.querySelector('form')
      const commitButton = document.querySelector(
        '.dnb-forms-isolate__commit-button'
      )

      await userEvent.type(input, 'Tony')

      fireEvent.submit(form)

      expect(
        document.querySelector('.dnb-form-status')
      ).toBeInTheDocument()
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nb.Isolation.preventUncommittedChangesText
      )

      await userEvent.click(commitButton)

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).not.toBeInTheDocument()
      })

      fireEvent.submit(form)

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).not.toBeInTheDocument()
      })
    })

    describe('with emptyValue prop', () => {
      it('should submit when "emptyValue" is given', async () => {
        const onSubmit = jest.fn()

        render(
          <Form.Handler onSubmit={onSubmit}>
            <Form.Isolation preventUncommittedChanges resetDataAfterCommit>
              <Field.String path="/name" emptyValue="The empty value" />
              <Form.Isolation.CommitButton />
            </Form.Isolation>
          </Form.Handler>
        )

        const input = document.querySelector('input')
        const form = document.querySelector('form')
        const commitButton = document.querySelector(
          '.dnb-forms-isolate__commit-button'
        )

        expect(input).toHaveValue('The empty value')

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenLastCalledWith(
          undefined,
          expect.anything()
        )

        await userEvent.click(commitButton)
        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(2)
        expect(onSubmit).toHaveBeenLastCalledWith(
          { name: 'The empty value' },
          expect.anything()
        )
      })

      it('should reset to emptyValue when reset button is clicked', async () => {
        const onSubmit = jest.fn()

        render(
          <Form.Handler onSubmit={onSubmit}>
            <Form.Isolation preventUncommittedChanges resetDataAfterCommit>
              <Field.String path="/name" emptyValue="The empty value" />
              <Form.Isolation.CommitButton />
              <Form.Isolation.ResetButton />
            </Form.Isolation>
          </Form.Handler>
        )

        const input = document.querySelector('input')
        const form = document.querySelector('form')
        const commitButton = document.querySelector(
          '.dnb-forms-isolate__commit-button'
        )

        expect(input).toHaveValue('The empty value')

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenLastCalledWith(
          undefined,
          expect.anything()
        )

        await userEvent.type(input, 'X')
        fireEvent.submit(form)

        expect(input).toHaveValue('The empty valueX')
        expect(
          document.querySelector('.dnb-forms-isolate__reset-button')
        ).toBeInTheDocument()

        await userEvent.click(
          document.querySelector('.dnb-forms-isolate__reset-button')
        )

        // Confirm the clear
        await userEvent.click(
          document.querySelector('.dnb-button--primary')
        )

        await waitFor(() => {
          expect(input).toHaveValue('The empty value')
          expect(document.querySelector('.dnb-form-status')).toBeNull()
        })

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(2)
        expect(onSubmit).toHaveBeenLastCalledWith(
          undefined,
          expect.anything()
        )

        await userEvent.click(commitButton)

        expect(input).toHaveValue('The empty value')

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(3)
        expect(onSubmit).toHaveBeenLastCalledWith(
          { name: 'The empty value' },
          expect.anything()
        )
      })
    })

    describe('with defaultValue prop', () => {
      it('should submit when "defaultValue" is given', async () => {
        const onSubmit = jest.fn()

        render(
          <Form.Handler onSubmit={onSubmit}>
            <Form.Isolation preventUncommittedChanges resetDataAfterCommit>
              <Field.String path="/name" defaultValue="A default value" />
              <Form.Isolation.CommitButton />
              <Form.Isolation.ResetButton />
            </Form.Isolation>
          </Form.Handler>
        )

        const input = document.querySelector('input')
        const form = document.querySelector('form')
        const commitButton = document.querySelector(
          '.dnb-forms-isolate__commit-button'
        )

        expect(input).toHaveValue('A default value')

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenLastCalledWith(
          undefined,
          expect.anything()
        )

        await userEvent.click(commitButton)
        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(2)
        expect(onSubmit).toHaveBeenLastCalledWith(
          { name: 'A default value' },
          expect.anything()
        )
      })

      it('should reset to defaultValue when reset button is clicked', async () => {
        const onSubmit = jest.fn()

        render(
          <Form.Handler onSubmit={onSubmit}>
            <Form.Isolation preventUncommittedChanges resetDataAfterCommit>
              <Field.String path="/name" defaultValue="A default value" />
              <Form.Isolation.CommitButton />
              <Form.Isolation.ResetButton />
            </Form.Isolation>
          </Form.Handler>
        )

        const input = document.querySelector('input')
        const form = document.querySelector('form')
        const commitButton = document.querySelector(
          '.dnb-forms-isolate__commit-button'
        )

        expect(input).toHaveValue('A default value')

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenLastCalledWith(
          undefined,
          expect.anything()
        )

        await userEvent.type(input, 'X')
        fireEvent.submit(form)

        expect(input).toHaveValue('A default valueX')
        expect(
          document.querySelector('.dnb-forms-isolate__reset-button')
        ).toBeInTheDocument()

        await userEvent.click(
          document.querySelector('.dnb-forms-isolate__reset-button')
        )

        // Confirm the clear
        await userEvent.click(
          document.querySelector('.dnb-button--primary')
        )

        await waitFor(() => {
          expect(input).toHaveValue('A default value')
          expect(document.querySelector('.dnb-form-status')).toBeNull()
        })

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(2)
        expect(onSubmit).toHaveBeenLastCalledWith(
          undefined,
          expect.anything()
        )

        await userEvent.click(commitButton)

        expect(input).toHaveValue('A default value')

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(3)
        expect(onSubmit).toHaveBeenLastCalledWith(
          { name: 'A default value' },
          expect.anything()
        )
      })
    })

    describe('with defaultData prop', () => {
      it('should submit when "defaultData" is given', async () => {
        const onSubmit = jest.fn()

        render(
          <Form.Handler onSubmit={onSubmit}>
            <Form.Isolation
              preventUncommittedChanges
              resetDataAfterCommit
              defaultData={{ name: 'A default value' }}
            >
              <Field.String path="/name" />
              <Form.Isolation.CommitButton />
              <Form.Isolation.ResetButton />
            </Form.Isolation>
          </Form.Handler>
        )

        const input = document.querySelector('input')
        const form = document.querySelector('form')
        const commitButton = document.querySelector(
          '.dnb-forms-isolate__commit-button'
        )

        expect(input).toHaveValue('A default value')

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenLastCalledWith(
          undefined,
          expect.anything()
        )

        await userEvent.click(commitButton)
        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(2)
        expect(onSubmit).toHaveBeenLastCalledWith(
          { name: 'A default value' },
          expect.anything()
        )
      })

      it('should reset to defaultData when reset button is clicked', async () => {
        const onSubmit = jest.fn()

        render(
          <Form.Handler onSubmit={onSubmit}>
            <Form.Isolation
              preventUncommittedChanges
              resetDataAfterCommit
              defaultData={{ name: 'A default value' }}
            >
              <Field.String path="/name" />
              <Form.Isolation.CommitButton />
              <Form.Isolation.ResetButton />
            </Form.Isolation>
          </Form.Handler>
        )

        const input = document.querySelector('input')
        const form = document.querySelector('form')
        const commitButton = document.querySelector(
          '.dnb-forms-isolate__commit-button'
        )

        expect(input).toHaveValue('A default value')

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenLastCalledWith(
          undefined,
          expect.anything()
        )

        await userEvent.type(input, 'X')
        fireEvent.submit(form)

        expect(input).toHaveValue('A default valueX')
        expect(
          document.querySelector('.dnb-forms-isolate__reset-button')
        ).toBeInTheDocument()

        await userEvent.click(
          document.querySelector('.dnb-forms-isolate__reset-button')
        )

        // Confirm the clear
        await userEvent.click(
          document.querySelector('.dnb-button--primary')
        )

        await waitFor(() => {
          expect(input).toHaveValue('A default value')
          expect(document.querySelector('.dnb-form-status')).toBeNull()
        })

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(2)
        expect(onSubmit).toHaveBeenLastCalledWith(
          undefined,
          expect.anything()
        )

        await userEvent.click(commitButton)

        expect(input).toHaveValue('A default value')

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(3)
        expect(onSubmit).toHaveBeenLastCalledWith(
          { name: 'A default value' },
          expect.anything()
        )
      })
    })

    describe('with data prop', () => {
      it('should submit when "data" is given', async () => {
        const onSubmit = jest.fn()

        render(
          <Form.Handler onSubmit={onSubmit}>
            <Form.Isolation
              preventUncommittedChanges
              resetDataAfterCommit
              data={{ name: 'A data value' }}
            >
              <Field.String path="/name" />
              <Form.Isolation.CommitButton />
              <Form.Isolation.ResetButton />
            </Form.Isolation>
          </Form.Handler>
        )

        const input = document.querySelector('input')
        const form = document.querySelector('form')
        const commitButton = document.querySelector(
          '.dnb-forms-isolate__commit-button'
        )

        expect(input).toHaveValue('A data value')

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenLastCalledWith(
          undefined,
          expect.anything()
        )

        await userEvent.click(commitButton)
        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(2)
        expect(onSubmit).toHaveBeenLastCalledWith(
          { name: 'A data value' },
          expect.anything()
        )
      })

      it('should reset to data when reset button is clicked', async () => {
        const onSubmit = jest.fn()

        render(
          <Form.Handler onSubmit={onSubmit}>
            <Form.Isolation
              preventUncommittedChanges
              resetDataAfterCommit
              data={{ name: 'A data value' }}
            >
              <Field.String path="/name" />
              <Form.Isolation.CommitButton />
              <Form.Isolation.ResetButton />
            </Form.Isolation>
          </Form.Handler>
        )

        const input = document.querySelector('input')
        const form = document.querySelector('form')
        const commitButton = document.querySelector(
          '.dnb-forms-isolate__commit-button'
        )

        expect(input).toHaveValue('A data value')

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenLastCalledWith(
          undefined,
          expect.anything()
        )

        await userEvent.type(input, 'X')
        fireEvent.submit(form)

        expect(input).toHaveValue('A data valueX')
        expect(
          document.querySelector('.dnb-forms-isolate__reset-button')
        ).toBeInTheDocument()

        await userEvent.click(
          document.querySelector('.dnb-forms-isolate__reset-button')
        )

        // Confirm the clear
        await userEvent.click(
          document.querySelector('.dnb-button--primary')
        )

        await waitFor(() => {
          expect(input).toHaveValue('A data value')
          expect(document.querySelector('.dnb-form-status')).toBeNull()
        })

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(2)
        expect(onSubmit).toHaveBeenLastCalledWith(
          undefined,
          expect.anything()
        )

        await userEvent.click(commitButton)

        await waitFor(() => {
          expect(input).toHaveValue('A data value')
          expect(document.querySelector('.dnb-form-status')).toBeNull()
        })

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(3)
        expect(onSubmit).toHaveBeenLastCalledWith(
          { name: 'A data value' },
          expect.anything()
        )
      })
    })

    it('should prevent Wizard step change as long as there is uncommitted data', async () => {
      const onSubmitRequest = jest.fn()
      const onSubmit = jest.fn()
      const onCommit = jest.fn()
      const onStepChange = jest.fn()

      render(
        <Form.Handler
          onSubmitRequest={onSubmitRequest}
          onSubmit={onSubmit}
        >
          <Wizard.Container onStepChange={onStepChange}>
            <Wizard.Step title="Step 1">
              <output>Step 1</output>

              <Form.Isolation
                preventUncommittedChanges
                resetDataAfterCommit
                onCommit={onCommit}
              >
                <Field.String path="/name" emptyValue="The empty value" />
                <Form.Isolation.CommitButton />
              </Form.Isolation>

              <Wizard.Buttons />
            </Wizard.Step>

            <Wizard.Step title="Step 2">
              <output>Step 2</output>
              <Wizard.Buttons />
              <Form.SubmitButton />
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      const input = document.querySelector('input')
      const form = document.querySelector('form')
      const commitButton = document.querySelector(
        '.dnb-forms-isolate__commit-button'
      )

      const nextButton = () => {
        return document.querySelector('.dnb-forms-next-button')
      }
      const output = () => {
        return document.querySelector('output')
      }

      expect(output()).toHaveTextContent('Step 1')

      await userEvent.type(input, 'Tony')

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 1')
      expect(onStepChange).toHaveBeenCalledTimes(0)
      expect(onSubmit).toHaveBeenCalledTimes(0)
      expect(onSubmitRequest).toHaveBeenCalledTimes(1)
      expect(onCommit).toHaveBeenCalledTimes(0)

      expect(
        document.querySelector('.dnb-form-status')
      ).toBeInTheDocument()
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nb.Isolation.preventUncommittedChangesText
      )

      await userEvent.click(commitButton)

      expect(onCommit).toHaveBeenCalledTimes(1)
      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).not.toBeInTheDocument()
      })

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 2')
      expect(onStepChange).toHaveBeenCalledTimes(1)
      expect(onStepChange).toHaveBeenLastCalledWith(
        1,
        'next',
        expect.anything()
      )

      fireEvent.submit(form)

      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmitRequest).toHaveBeenCalledTimes(1)
      expect(onCommit).toHaveBeenCalledTimes(1)
    })

    it('should hide and show reset button when showWhen="uncommittedChangeDetected" is set', async () => {
      render(
        <Form.Handler>
          <Form.Isolation preventUncommittedChanges resetDataAfterCommit>
            <Field.String path="/name" emptyValue="The empty value" />
            <Form.Isolation.CommitButton />
            <Form.Isolation.ResetButton showWhen="uncommittedChangeDetected" />
          </Form.Isolation>
        </Form.Handler>
      )

      const input = document.querySelector('input')
      const form = document.querySelector('form')

      expect(
        document.querySelector('.dnb-forms-isolate__reset-button')
          .parentElement
      ).toHaveAttribute('hidden')

      fireEvent.submit(form)

      expect(
        document.querySelector('.dnb-forms-isolate__reset-button')
          .parentElement
      ).toHaveAttribute('hidden')

      await userEvent.type(input, 'X')

      fireEvent.submit(form)

      expect(
        document.querySelector('.dnb-forms-isolate__reset-button')
          .parentElement
      ).not.toHaveAttribute('hidden')
    })

    it('should enable/disable reset button', async () => {
      render(
        <Form.Handler>
          <Form.Isolation preventUncommittedChanges resetDataAfterCommit>
            <Field.String path="/name" />
            <Form.Isolation.CommitButton />
            <Form.Isolation.ResetButton />
          </Form.Isolation>
        </Form.Handler>
      )

      const input = document.querySelector('input')
      const form = document.querySelector('form')
      const commitButton = document.querySelector(
        '.dnb-forms-isolate__commit-button'
      )

      expect(
        document.querySelector('.dnb-forms-isolate__reset-button')
      ).toHaveAttribute('disabled')
      expect(
        document.querySelector('.dnb-forms-isolate__reset-button')
          .parentElement
      ).not.toHaveAttribute('hidden')

      await userEvent.type(input, 'Tony')

      fireEvent.submit(form)

      expect(
        document.querySelector('.dnb-form-status')
      ).toBeInTheDocument()
      expect(
        document.querySelector('.dnb-forms-isolate__reset-button')
      ).not.toHaveAttribute('disabled')
      expect(
        document.querySelector('.dnb-forms-isolate__reset-button')
          .parentElement
      ).not.toHaveAttribute('hidden')

      await userEvent.click(commitButton)

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).not.toBeInTheDocument()
        expect(
          document.querySelector('.dnb-forms-isolate__reset-button')
        ).toHaveAttribute('disabled')
        expect(
          document.querySelector('.dnb-forms-isolate__reset-button')
            .parentElement
        ).not.toHaveAttribute('hidden')
      })
    })

    it('should submit form when uncommitted data was cleared (with confirmation)', async () => {
      const onSubmitRequest = jest.fn()
      const onSubmit = jest.fn()
      const onCommit = jest.fn()

      render(
        <Form.Handler
          onSubmit={onSubmit}
          onSubmitRequest={onSubmitRequest}
        >
          <Form.Isolation
            preventUncommittedChanges
            resetDataAfterCommit
            onCommit={onCommit}
          >
            <Field.String path="/name" />
            <Form.Isolation.CommitButton />
            <Form.Isolation.ResetButton />
          </Form.Isolation>
        </Form.Handler>
      )

      const input = document.querySelector('input')
      const form = document.querySelector('form')

      await userEvent.type(input, 'Tony')

      fireEvent.submit(form)

      expect(onSubmit).toHaveBeenCalledTimes(0)
      expect(onSubmitRequest).toHaveBeenCalledTimes(1)
      expect(onCommit).toHaveBeenCalledTimes(0)
      expect(
        document.querySelector('.dnb-form-status')
      ).toBeInTheDocument()
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nb.Isolation.preventUncommittedChangesText
      )

      // Click the reset button
      await userEvent.click(
        document.querySelector('.dnb-forms-isolate__reset-button')
      )

      // Confirm the clear
      await userEvent.click(document.querySelector('.dnb-button--primary'))

      await waitFor(() => {
        expect(input).toHaveValue('')
        expect(document.querySelector('.dnb-form-status')).toBeNull()
      })

      fireEvent.submit(form)

      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmitRequest).toHaveBeenCalledTimes(1)
      expect(onCommit).toHaveBeenCalledTimes(0)
    })

    it('should support a custom "dataReference"', async () => {
      const onSubmit = jest.fn()
      const onCommit = jest.fn()

      const dataReference = Form.Isolation.createDataReference()

      const SetDelayedData = () => {
        const { update } = Form.useData()

        React.useEffect(() => {
          requestAnimationFrame(() => {
            update('/isolated', 'With a delayed default value')
            setTimeout(() => {
              dataReference.refresh() // <-- refresh the data reference
            }, 100)
          }) // <-- delay because of the internal "requestAnimationFrame" refresh delay

          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

        return null
      }

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Form.Isolation
            preventUncommittedChanges
            resetDataAfterCommit
            dataReference={dataReference}
            onCommit={onCommit}
          >
            <SetDelayedData />

            <Field.String path="/isolated" />
            <Form.Isolation.CommitButton />
            <Form.Isolation.ResetButton showConfirmDialog={false} />
          </Form.Isolation>
        </Form.Handler>
      )

      const input = document.querySelector('input')
      const resetButton = document.querySelector(
        '.dnb-forms-isolate__reset-button'
      )

      expect(resetButton).toBeDisabled()

      await waitFor(() => {
        expect(input).toHaveValue('With a delayed default value')
      })

      expect(resetButton).not.toBeDisabled()

      await waitFor(() => {
        expect(resetButton).toBeDisabled()
      })

      await userEvent.type(input, '2')
      expect(resetButton).not.toBeDisabled()

      await userEvent.type(input, '{Backspace}')
      expect(resetButton).toBeDisabled()
    })
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
      const commitButton = document.querySelector(
        '.dnb-forms-isolate__commit-button'
      )

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

    it('should not pass data down during submit', async () => {
      let outerDataContext = null
      let innerDataContext = null

      const OuterDataContext = () => {
        outerDataContext = useContext(DataContext).data
        return null
      }
      const InnerDataContext = () => {
        innerDataContext = useContext(DataContext).data
        return null
      }

      render(
        <Form.Handler>
          <Form.Isolation bubbleValidation>
            <Field.String label="Isolated" path="/isolated" required />
            <Form.Isolation.CommitButton />

            <InnerDataContext />
          </Form.Isolation>

          <OuterDataContext />
        </Form.Handler>
      )

      const input = document.querySelector('input')
      const form = document.querySelector('form')
      const commitButton = document.querySelector(
        '.dnb-forms-isolate__commit-button'
      )

      expect(outerDataContext).toBeUndefined()
      expect(innerDataContext).toEqual({
        isolated: undefined,
      })

      await userEvent.type(input, 'Tony')

      expect(outerDataContext).toBeUndefined()
      expect(innerDataContext).toEqual({
        isolated: 'Tony',
      })

      fireEvent.submit(form)

      expect(outerDataContext).toBeUndefined()
      expect(innerDataContext).toEqual({
        isolated: 'Tony',
      })

      await userEvent.click(commitButton)

      expect(outerDataContext).toEqual({
        isolated: 'Tony',
      })
      expect(innerDataContext).toEqual({
        isolated: 'Tony',
      })
    })

    it('should not pass data down during Wizard step change', async () => {
      let outerDataContext = null
      let innerDataContext = null

      const OuterDataContext = () => {
        outerDataContext = useContext(DataContext).data
        return null
      }
      const InnerDataContext = () => {
        innerDataContext = useContext(DataContext).data
        return null
      }

      render(
        <Form.Handler>
          <Wizard.Container>
            <Wizard.Step title="Step 1">
              <output>Step 1</output>

              <Form.Isolation bubbleValidation>
                <Field.String label="Isolated" path="/isolated" required />
                <Form.Isolation.CommitButton />

                <InnerDataContext />
              </Form.Isolation>

              <Wizard.Buttons />
            </Wizard.Step>

            <Wizard.Step title="Step 2">
              <output>Step 2</output>
              <Wizard.Buttons />
            </Wizard.Step>
          </Wizard.Container>

          <OuterDataContext />
        </Form.Handler>
      )

      const inputField = () => document.querySelector('input')
      const commitButton = () =>
        document.querySelector('.dnb-forms-isolate__commit-button')
      const nextButton = () => {
        return document.querySelector('.dnb-forms-next-button')
      }
      const previousButton = () => {
        return document.querySelector('.dnb-forms-previous-button')
      }
      const output = () => {
        return document.querySelector('output')
      }

      expect(outerDataContext).toBeUndefined()
      expect(innerDataContext).toEqual({
        isolated: undefined,
      })
      expect(output()).toHaveTextContent('Step 1')

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 1')
      expect(outerDataContext).toBeUndefined()
      expect(innerDataContext).toEqual({
        isolated: undefined,
      })

      await userEvent.type(inputField(), 'Tony')

      expect(inputField()).toHaveValue('Tony')
      expect(outerDataContext).toBeUndefined()
      expect(innerDataContext).toEqual({
        isolated: 'Tony',
      })

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 2')

      expect(outerDataContext).toBeUndefined()
      expect(innerDataContext).toEqual({
        isolated: 'Tony',
      })

      await userEvent.click(previousButton())

      expect(output()).toHaveTextContent('Step 1')

      expect(outerDataContext).toBeUndefined()
      expect(innerDataContext).toEqual({
        isolated: undefined,
      })

      // Wait for the step switch to happen
      await new Promise((resolve) => requestAnimationFrame(resolve))
      await userEvent.type(inputField(), 'Tony')

      expect(inputField()).toHaveValue('Tony')
      expect(outerDataContext).toBeUndefined()
      expect(innerDataContext).toEqual({
        isolated: 'Tony',
      })

      await userEvent.click(commitButton())

      expect(inputField()).toHaveValue('Tony')
      expect(outerDataContext).toEqual({
        isolated: 'Tony',
      })
      expect(innerDataContext).toEqual({
        isolated: 'Tony',
      })
    })

    it('should prevent navigation when useReportError reports an error', async () => {
      const ReportError = () => {
        useReportError(new Error('My error'))
        return null
      }

      render(
        <Wizard.Container>
          <Wizard.Step title="Step 1">
            <output>Step 1</output>
            <Wizard.Buttons />
          </Wizard.Step>

          <Wizard.Step title="Step 2">
            <output>Step 2</output>

            <Form.Isolation bubbleValidation>
              <ReportError />
            </Form.Isolation>
            <Wizard.Buttons />
          </Wizard.Step>

          <Wizard.Step title="Step 3">
            <output>Step 3</output>
            <Wizard.Buttons />
          </Wizard.Step>
        </Wizard.Container>
      )

      const nextButton = () => {
        return document.querySelector('.dnb-forms-next-button')
      }
      const output = () => {
        return document.querySelector('output')
      }

      expect(output()).toHaveTextContent('Step 1')

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 2')

      await userEvent.click(nextButton())

      // Stay on Step 2
      expect(output()).toHaveTextContent('Step 2')
    })
  })

  describe('Visibility', () => {
    it('should show the children initially', () => {
      render(
        <Form.Handler
          defaultData={{
            isVisible: true,
          }}
        >
          <Form.Isolation>
            <Form.Visibility pathTrue="/isVisible">
              <output>content</output>
            </Form.Visibility>
          </Form.Isolation>
        </Form.Handler>
      )

      expect(document.querySelector('output')).toBeInTheDocument()
    })

    it('should support Visibility', async () => {
      render(
        <Form.Handler>
          <Field.Boolean variant="button" path="/isVisible" />

          <Form.Isolation>
            <Form.Visibility pathTrue="/isVisible">
              <output>content</output>
            </Form.Visibility>
          </Form.Isolation>
        </Form.Handler>
      )

      expect(document.querySelector('output')).toBeNull()

      await userEvent.click(document.querySelector('button'))

      expect(document.querySelector('output')).toBeInTheDocument()
    })
  })

  describe('Schema validation from Form.Handler', () => {
    describe('Ajv JSON Schema', () => {
      it('should validate nested fields inside Form.Isolation with path', async () => {
        const schema: JSONSchema = {
          type: 'object',
          properties: {
            user: {
              type: 'object',
              properties: {
                foo: {
                  type: 'string',
                  minLength: 4,
                },
              },
              required: ['foo'],
            },
          },
          required: ['user'],
        }

        render(
          <Form.Handler
            schema={schema}
            ajvInstance={makeAjvInstance()}
            defaultData={{
              user: {
                foo: 'foo', // This should fail validation (minLength: 4)
              },
            }}
          >
            <Form.Isolation path="/user">
              <Field.String path="/foo" />
              <Form.Isolation.CommitButton />
            </Form.Isolation>
          </Form.Handler>
        )

        const input = document.querySelector('input[name="foo"]')
        const commitButton = document.querySelector(
          '.dnb-forms-isolate__commit-button'
        )

        expect(input).toBeInTheDocument()
        expect(commitButton).toBeInTheDocument()
        expect(input).toHaveValue('foo')

        // Click commit button to trigger validation
        await userEvent.click(commitButton)

        // Wait for validation error to appear
        await waitFor(() => {
          const statusMessage = document.querySelector('.dnb-form-status')
          expect(statusMessage).toHaveTextContent(
            nb.StringField.errorMinLength.replace('{minLength}', '4')
          )
        })

        await userEvent.type(input, 'X')
        expect(input).toHaveValue('fooX')

        // Click commit button to trigger validation
        await userEvent.click(commitButton)

        // Should not have validation error anymore
        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).not.toBeInTheDocument()
        })
      })

      it('should validate deep nested fields inside Form.Isolation with path', async () => {
        const schema: JSONSchema = {
          type: 'object',
          properties: {
            firstSubPath: {
              type: 'object',
              properties: {
                secondSubPath: {
                  type: 'object',
                  properties: {
                    foo: {
                      type: 'string',
                      minLength: 4,
                    },
                  },
                  required: ['foo'],
                },
              },
              required: ['foo'],
            },
          },
          required: ['firstSubPath'],
        }

        render(
          <Form.Handler
            schema={schema}
            ajvInstance={makeAjvInstance()}
            defaultData={{
              firstSubPath: {
                secondSubPath: {
                  foo: 'foo', // This should fail validation (minLength: 4)
                },
              },
            }}
          >
            <Form.Isolation path="/firstSubPath/secondSubPath">
              <Field.String path="/foo" />
              <Form.Isolation.CommitButton />
            </Form.Isolation>
          </Form.Handler>
        )

        const input = document.querySelector('input[name="foo"]')
        const commitButton = document.querySelector(
          '.dnb-forms-isolate__commit-button'
        )

        expect(input).toBeInTheDocument()
        expect(commitButton).toBeInTheDocument()
        expect(input).toHaveValue('foo')

        // Click commit button to trigger validation
        await userEvent.click(commitButton)

        // Wait for validation error to appear
        await waitFor(() => {
          const statusMessage = document.querySelector('.dnb-form-status')
          expect(statusMessage).toHaveTextContent(
            nb.StringField.errorMinLength.replace('{minLength}', '4')
          )
        })

        await userEvent.type(input, 'X')
        expect(input).toHaveValue('fooX')

        // Click commit button to trigger validation
        await userEvent.click(commitButton)

        // Should not have validation error anymore
        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).not.toBeInTheDocument()
        })
      })

      it('should validate fields inside Form.Isolation from Form.Handler when path is /', async () => {
        const schema: JSONSchema = {
          type: 'object',
          properties: {
            foo: {
              type: 'string',
              minLength: 4,
            },
          },
          required: ['foo'],
        }

        render(
          <Form.Handler
            schema={schema}
            ajvInstance={makeAjvInstance()}
            defaultData={{
              foo: 'foo',
            }}
          >
            <Form.Isolation path="/">
              <Field.String path="/foo" />
              <Form.Isolation.CommitButton />
            </Form.Isolation>
          </Form.Handler>
        )

        const input = document.querySelector('input[name="foo"]')
        const commitButton = document.querySelector(
          '.dnb-forms-isolate__commit-button'
        )

        expect(
          document.querySelector('.dnb-form-status')
        ).not.toBeInTheDocument()
        expect(input).toHaveValue('foo')

        // Trigger validation by clicking commit button
        await userEvent.click(commitButton)

        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).toBeInTheDocument()
        })

        await userEvent.type(input, 'X')
        expect(input).toHaveValue('fooX')

        // Commit again - should work now
        await userEvent.click(commitButton)

        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).not.toBeInTheDocument()
        })
      })

      it('inherits JSON Schema and ajvInstance from Form.Handler (no path)', async () => {
        const schema: JSONSchema = {
          type: 'object',
          properties: {
            foo: {
              type: 'string',
              minLength: 4,
            },
          },
          required: ['foo'],
        }

        render(
          <Form.Handler
            schema={schema}
            ajvInstance={makeAjvInstance()}
            defaultData={{ foo: 'foo' }}
          >
            {/* No schema/ajv passed to Isolation. It should inherit from Form.Handler */}
            <Form.Isolation>
              <Field.String path="/foo" />
              <Form.Isolation.CommitButton />
            </Form.Isolation>
          </Form.Handler>
        )

        const input = document.querySelector('input[name="foo"]')
        const commitButton = document.querySelector(
          '.dnb-forms-isolate__commit-button'
        )

        expect(input).toBeInTheDocument()
        expect(input).toHaveValue('foo')
        expect(
          document.querySelector('.dnb-form-status')
        ).not.toBeInTheDocument()

        // Trigger validation from inherited schema/ajv
        await userEvent.click(commitButton)

        await waitFor(() => {
          const statusMessage = document.querySelector('.dnb-form-status')
          expect(statusMessage).toBeInTheDocument()
        })

        // Fix validation
        await userEvent.type(input, 'X')
        expect(input).toHaveValue('fooX')

        await userEvent.click(commitButton)

        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).not.toBeInTheDocument()
        })
      })

      it('should show validation errors only when the commit button is clicked', async () => {
        const schema: JSONSchema = {
          type: 'object',
          properties: {
            foo: {
              type: 'string',
              minLength: 4,
            },
          },
          required: ['foo'],
        }

        render(
          <Form.Handler
            schema={schema}
            ajvInstance={makeAjvInstance()}
            defaultData={{
              foo: 'foo',
            }}
          >
            <Form.Isolation path="/">
              <Field.String path="/foo" />
              <Form.Isolation.CommitButton />
            </Form.Isolation>
            <Form.SubmitButton />
          </Form.Handler>
        )

        const input = document.querySelector('input[name="foo"]')
        const commitButton = document.querySelector(
          '.dnb-forms-isolate__commit-button'
        )
        const submitButton = document.querySelector(
          '.dnb-forms-submit-button'
        )

        expect(input).toBeInTheDocument()
        expect(submitButton).toBeInTheDocument()
        expect(input).toHaveValue('foo')

        // Click submit button to trigger validation
        await userEvent.click(submitButton)

        // No validation error yet
        await expect(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).toBeInTheDocument()
        }).toNeverResolve()

        // Click commit button to trigger validation
        await userEvent.click(commitButton)

        // Wait for validation error to appear
        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).toBeInTheDocument()
        })
      })

      it('should validate with "preventUncommittedChanges"', async () => {
        const schema: JSONSchema = {
          type: 'object',
          properties: {
            user: {
              type: 'object',
              properties: {
                foo: {
                  type: 'string',
                  minLength: 4,
                },
              },
              required: ['foo'],
            },
          },
          required: ['user'],
        }

        const dataReference = Form.Isolation.createDataReference()

        render(
          <Form.Handler
            schema={schema}
            ajvInstance={makeAjvInstance()}
            defaultData={{ foo: 'foo' }}
          >
            <Form.Isolation
              path="/user"
              preventUncommittedChanges
              resetDataAfterCommit
              dataReference={dataReference}
            >
              <Field.String path="/foo" />
              <Form.Isolation.CommitButton />
            </Form.Isolation>
            <Form.SubmitButton />
          </Form.Handler>
        )

        const nameInput = document.querySelector('input[name="foo"]')
        const commitButton = document.querySelector(
          '.dnb-forms-isolate__commit-button'
        )
        const submitButton = document.querySelector(
          '.dnb-forms-submit-button'
        )

        expect(nameInput).toHaveValue('foo')

        // Make an uncommitted change, then submit to trigger status
        await userEvent.type(nameInput, 'X')

        // Try to submit form - should be prevented due to uncommitted changes
        await userEvent.click(submitButton)

        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).toBeInTheDocument()
        })

        // Fix the field to a valid value and refresh snapshot before commit
        await userEvent.clear(nameInput)
        await userEvent.type(nameInput, 'John')
        dataReference.refresh()

        // Commit the isolation
        await userEvent.click(commitButton)

        // Wait until reset applied to the refreshed snapshot
        await waitFor(() => {
          expect(nameInput).toHaveValue('John')
        })

        // Now submit should work (no uncommitted changes and value is valid)
        await userEvent.click(submitButton)

        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).not.toBeInTheDocument()
        })
      })
    })

    describe('Zod schema', () => {
      it('should validate fields inside Form.Isolation from Form.Handler when path is /', async () => {
        const schema = z.object({
          foo: z.string().min(4, 'Foo must be at least 4 characters'),
        })

        render(
          <Form.Handler
            schema={schema}
            defaultData={{
              foo: 'foo', // This should fail validation (minLength: 4)
            }}
          >
            <Form.Isolation path="/">
              <Field.String path="/foo" />
              <Form.Isolation.CommitButton />
            </Form.Isolation>
          </Form.Handler>
        )

        const input = document.querySelector('input[name="foo"]')
        const commitButton = document.querySelector(
          '.dnb-forms-isolate__commit-button'
        )

        expect(input).toHaveValue('foo')

        // Trigger validation
        await userEvent.click(commitButton)

        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).toBeInTheDocument()
        })

        // Fix the field
        await userEvent.type(input, 'X')

        // Commit again
        await userEvent.click(commitButton)

        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).not.toBeInTheDocument()
        })
      })

      it('inherits Zod schema from Form.Handler (no path)', async () => {
        const schema = z.object({
          foo: z.string().min(4, 'Foo must be at least 4 characters'),
        })

        render(
          <Form.Handler schema={schema} defaultData={{ foo: 'foo' }}>
            {/* No schema passed to Isolation. It should inherit Zod schema from Form.Handler */}
            <Form.Isolation>
              <Field.String path="/foo" />
              <Form.Isolation.CommitButton />
            </Form.Isolation>
          </Form.Handler>
        )

        const input = document.querySelector('input[name="foo"]')
        const commitButton = document.querySelector(
          '.dnb-forms-isolate__commit-button'
        )

        expect(input).toBeInTheDocument()
        expect(input).toHaveValue('foo')

        // Trigger validation using inherited Zod schema
        await userEvent.click(commitButton)

        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).toBeInTheDocument()
        })

        // Fix validation
        await userEvent.type(input, 'X')
        expect(input).toHaveValue('fooX')

        await userEvent.click(commitButton)

        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).not.toBeInTheDocument()
        })
      })

      it('should validate nested fields inside Form.Isolation with path', async () => {
        const schema = z.object({
          user: z.object({
            foo: z.string().min(4, 'Foo must be at least 4 characters'),
          }),
        })

        render(
          <Form.Handler
            schema={schema}
            defaultData={{
              user: {
                foo: 'foo',
              },
            }}
          >
            <Form.Isolation path="/user">
              <Field.String path="/foo" />
              <Form.Isolation.CommitButton />
            </Form.Isolation>
          </Form.Handler>
        )

        const input = document.querySelector('input[name="foo"]')
        const commitButton = document.querySelector(
          '.dnb-forms-isolate__commit-button'
        )

        expect(input).toBeInTheDocument()
        expect(commitButton).toBeInTheDocument()
        expect(input).toHaveValue('foo')

        // Click commit button to trigger validation
        await userEvent.click(commitButton)

        // Wait for validation error to appear
        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).toBeInTheDocument()
        })
      })

      it('should show validation errors only when the commit button is clicked', async () => {
        const schema = z.object({
          foo: z.string().min(4, 'Foo must be at least 4 characters'),
        })

        render(
          <Form.Handler schema={schema} defaultData={{ foo: 'foo' }}>
            <Form.Isolation path="/">
              <Field.String path="/foo" />
              <Form.Isolation.CommitButton />
            </Form.Isolation>
            <Form.SubmitButton />
          </Form.Handler>
        )

        const input = document.querySelector('input[name="foo"]')
        const commitButton = document.querySelector(
          '.dnb-forms-isolate__commit-button'
        )
        const submitButton = document.querySelector(
          '.dnb-forms-submit-button'
        )

        expect(input).toBeInTheDocument()
        expect(submitButton).toBeInTheDocument()
        expect(input).toHaveValue('foo')

        // Click submit button to trigger validation
        await userEvent.click(submitButton)

        // No validation error yet
        await expect(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).toBeInTheDocument()
        }).toNeverResolve()

        // Click commit button to trigger validation
        await userEvent.click(commitButton)

        // Wait for validation error to appear
        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).toBeInTheDocument()
        })
      })

      it('should handle complex Zod schema with nested objects and arrays', async () => {
        const schema = z.object({
          user: z.object({
            foo: z.string().min(4, 'Foo must be at least 4 characters'),
          }),
        })

        render(
          <Form.Handler
            schema={schema}
            defaultData={{
              user: {
                foo: 'foo',
              },
            }}
          >
            <Form.Isolation path="/user">
              <Field.String path="/foo" />
              <Form.Isolation.CommitButton />
            </Form.Isolation>
          </Form.Handler>
        )

        const input = document.querySelector('input[name="foo"]')
        const commitButton = document.querySelector(
          '.dnb-forms-isolate__commit-button'
        )

        expect(input).toBeInTheDocument()
        expect(commitButton).toBeInTheDocument()
        expect(input).toHaveValue('foo')

        // Click commit button to trigger validation
        await userEvent.click(commitButton)

        // Wait for validation error to appear
        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).toBeInTheDocument()
        })
      })

      it('should validate with "preventUncommittedChanges"', async () => {
        const schema = z.object({
          user: z.object({
            foo: z.string().min(4, 'Foo must be at least 4 characters'),
          }),
        })

        const dataReference = Form.Isolation.createDataReference()

        render(
          <Form.Handler schema={schema} defaultData={{ foo: 'foo' }}>
            <Form.Isolation
              path="/user"
              preventUncommittedChanges
              resetDataAfterCommit
              dataReference={dataReference}
            >
              <Field.String path="/foo" />
              <Form.Isolation.CommitButton />
            </Form.Isolation>
            <Form.SubmitButton />
          </Form.Handler>
        )

        const nameInput = document.querySelector('input[name="foo"]')
        const commitButton = document.querySelector(
          '.dnb-forms-isolate__commit-button'
        )
        const submitButton = document.querySelector(
          '.dnb-forms-submit-button'
        )

        expect(nameInput).toHaveValue('foo')

        // Make an uncommitted change, then submit to trigger status
        await userEvent.type(nameInput, 'X')

        // Try to submit form - should be prevented due to uncommitted changes
        await userEvent.click(submitButton)

        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).toBeInTheDocument()
        })

        // Fix the field and refresh snapshot before commit
        await userEvent.clear(nameInput)
        await userEvent.type(nameInput, 'John')
        dataReference.refresh()

        // Commit the isolation
        await userEvent.click(commitButton)

        // Wait until reset applied to the refreshed snapshot
        await waitFor(() => {
          expect(nameInput).toHaveValue('John')
        })

        // Now submit should work
        await userEvent.click(submitButton)

        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).not.toBeInTheDocument()
        })
      })
    })
  })
})
