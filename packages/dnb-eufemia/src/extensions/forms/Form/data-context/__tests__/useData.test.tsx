import React, { createContext } from 'react'
import { renderHook, act, render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { makeUniqueId } from '../../../../../shared/component-helper'
import { Button } from '../../../../../components'
import { DataContext, Field, Form, Wizard } from '../../..'
import { FilterData } from '../../../DataContext/Context'
import Provider from '../../../DataContext/Provider'
import useData from '../useData'

describe('Form.useData', () => {
  let identifier: string

  beforeEach(() => {
    identifier = makeUniqueId()
  })

  it('should return undefined by default', () => {
    const { result } = renderHook(() => useData(identifier))
    expect(result.current.data).toEqual(undefined)
  })

  it('should throw when used without a valid id', () => {
    const log = jest.spyOn(console, 'error').mockImplementation()

    const renderComponent = () => {
      renderHook(() => useData())
    }

    expect(renderComponent).toThrow(
      'useData needs to run inside DataContext (Form.Handler) or have a valid id'
    )

    log.mockRestore()
  })

  it('should not throw when used within a Form.Handler and Wizard without id', () => {
    const MockComponent = () => {
      Form.useData()
      return null
    }

    const renderComponent = () => {
      render(
        <Form.Handler>
          <Wizard.Container>
            <Wizard.Step title="Step 1">
              <MockComponent />
            </Wizard.Step>

            <Wizard.Step title="Step 2">
              <MockComponent />
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )
    }

    expect(renderComponent).not.toThrow(
      'useData needs to run inside DataContext (Form.Handler) or have a valid id'
    )
  })

  it('should work inside Wizard when prerender (step 2', () => {
    let collectData = null

    const MockComponent = () => {
      const { data } = Form.useData()
      collectData = data
      return null
    }

    render(
      <Form.Handler data={{ foo: 'bar' }}>
        <Wizard.Container>
          <Wizard.Step title="Step 1">
            <MockComponent />
          </Wizard.Step>

          <Wizard.Step title="Step 2">
            <MockComponent />
          </Wizard.Step>
        </Wizard.Container>
      </Form.Handler>
    )

    expect(collectData).toEqual({ foo: 'bar' })
  })

  it('should return "getValue" method that lets you get a single path value', () => {
    const props = {
      deep: {
        key: 'value',
      },
    }
    const { result } = renderHook(() => useData(identifier, props))

    expect(result.current.getValue('/deep/key')).toEqual('value')

    act(() => {
      result.current.update('/deep/key', 'changed')
    })

    expect(result.current.getValue('/deep/key')).toEqual('changed')
  })

  it('"getValue" should return undefined if path don\'t exists', () => {
    const { result } = renderHook(() => useData(identifier))

    expect(result.current.getValue('/does-not-exist')).toBe(undefined)
  })

  it('should return "update" method that lets you update the data', () => {
    const props = { key: 'value' }
    const { result } = renderHook(() => useData(identifier, props))

    expect(result.current.data).toEqual({ key: 'value' })

    act(() => {
      result.current.update('/key', (value) => {
        return 'changed ' + value
      })
    })

    expect(result.current.data).toEqual({ key: 'changed value' })
  })

  it('should get data with a string as the id', () => {
    const { result } = renderHook(() => useData(identifier), {
      wrapper: ({ children }) => (
        <>
          <Provider id={identifier}>
            <Field.String path="/foo" defaultValue="foo" />
            <Field.String path="/bar" defaultValue="bar" />
          </Provider>

          {children}
        </>
      ),
    })

    expect(result.current.data).toEqual({
      foo: 'foo',
      bar: 'bar',
    })
  })

  it('should get data with a function reference as the id', () => {
    const myId = () => null
    const { result } = renderHook(() => useData(myId), {
      wrapper: ({ children }) => (
        <>
          <Provider id={myId}>
            <Field.String path="/foo" defaultValue="foo" />
            <Field.String path="/bar" defaultValue="bar" />
          </Provider>

          {children}
        </>
      ),
    })

    expect(result.current.data).toEqual({
      foo: 'foo',
      bar: 'bar',
    })
  })

  it('should get data with an object reference as the id', () => {
    const myId = {}
    const { result } = renderHook(() => useData(myId), {
      wrapper: ({ children }) => (
        <>
          <Provider id={myId}>
            <Field.String path="/foo" defaultValue="foo" />
            <Field.String path="/bar" defaultValue="bar" />
          </Provider>

          {children}
        </>
      ),
    })

    expect(result.current.data).toEqual({
      foo: 'foo',
      bar: 'bar',
    })
  })

  it('should get data with a React Context as the id', () => {
    const myId = createContext(null)
    const { result } = renderHook(() => useData(myId), {
      wrapper: ({ children }) => (
        <>
          <Provider id={myId}>
            <Field.String path="/foo" defaultValue="foo" />
            <Field.String path="/bar" defaultValue="bar" />
          </Provider>

          {children}
        </>
      ),
    })

    expect(result.current.data).toEqual({
      foo: 'foo',
      bar: 'bar',
    })
  })

  describe('remove', () => {
    it('should remove the data', () => {
      const { result } = renderHook(() => useData(), {
        wrapper: ({ children }) => (
          <Provider>
            <Field.String path="/foo" defaultValue="foo" />
            <Field.String path="/bar" defaultValue="bar" />
            {children}
          </Provider>
        ),
      })

      expect(result.current.data).toEqual({
        foo: 'foo',
        bar: 'bar',
      })

      act(() => {
        result.current.remove('/foo')
      })

      expect(result.current.data).toEqual({
        foo: undefined, // The value gets re-added via the field component
        bar: 'bar',
      })
      expect(result.current.data).toHaveProperty('foo')
    })

    it('should remove the data when id is given', () => {
      const { result } = renderHook(() => useData(identifier), {
        wrapper: ({ children }) => (
          <Provider id={identifier}>
            <Field.String path="/foo" defaultValue="foo" />
            <Field.String path="/bar" defaultValue="bar" />
            {children}
          </Provider>
        ),
      })

      expect(result.current.data).toEqual({
        foo: 'foo',
        bar: 'bar',
      })

      act(() => {
        result.current.remove('/foo')
      })

      expect(result.current.data).toEqual({
        bar: 'bar',
      })
      expect(result.current.data).not.toHaveProperty('foo')
    })

    it('should remove data with handler id', () => {
      const { result } = renderHook(() => useData(identifier), {
        wrapper: ({ children }) => (
          <>
            <Provider id={identifier}>
              <Field.String path="/foo" defaultValue="foo" />
              <Field.String path="/bar" defaultValue="bar" />
            </Provider>

            {children}
          </>
        ),
      })

      expect(result.current.data).toEqual({
        foo: 'foo',
        bar: 'bar',
      })

      act(() => {
        result.current.remove('/foo')
      })

      expect(result.current.data).toEqual({
        bar: 'bar',
      })
      expect(result.current.data).not.toHaveProperty('foo')
    })

    it('should remove and render in sync', async () => {
      let dataContext = null
      let dataFromHook = null

      const MockComponent = () => {
        const { remove, data } = Form.useData(identifier)
        dataFromHook = data

        return (
          <Form.Handler
            id={identifier}
            defaultData={{
              owners: {
                hasOwners: true,
                otherOwners: [],
              },
            }}
          >
            <Field.Boolean
              variant="button"
              path="/owners/hasOwners"
              onChange={(val) => {
                if (!val) {
                  remove('/owners/otherOwners')
                }
              }}
            />

            <Form.Visibility animate pathTrue="/owners/hasOwners">
              <Field.ArraySelection path="/owners/otherOwners">
                <Field.Option value="foo" />
              </Field.ArraySelection>
            </Form.Visibility>

            <DataContext.Consumer>
              {(context) => {
                dataContext = context
                return null
              }}
            </DataContext.Consumer>
          </Form.Handler>
        )
      }

      render(<MockComponent />)

      expect(dataContext.data).toEqual({
        owners: {
          hasOwners: true,
          otherOwners: [],
        },
      })
      expect(dataFromHook).toEqual({
        owners: {
          hasOwners: true,
          otherOwners: [],
        },
      })

      await userEvent.click(
        document.querySelector('input[type="checkbox"]')
      )

      expect(dataContext.data).toEqual({
        owners: {
          hasOwners: true,
          otherOwners: ['foo'],
        },
      })
      expect(dataFromHook).toEqual({
        owners: {
          hasOwners: true,
          otherOwners: ['foo'],
        },
      })

      await userEvent.click(document.querySelector('button'))

      expect(dataContext.data).toEqual({
        owners: {
          hasOwners: false,
          otherOwners: undefined, // should ideally not be there. But the field did add it back again.
        },
      })
      expect(dataFromHook).toEqual({
        owners: {
          hasOwners: false,
          otherOwners: undefined, // should ideally not be there. But the field did add it back again.
        },
      })

      await userEvent.click(document.querySelector('button'))

      expect(dataContext.data).toEqual({
        owners: {
          hasOwners: true,
          otherOwners: undefined, // should ideally not be there. But the field did add it back again.
        },
      })
      expect(dataFromHook).toEqual({
        owners: {
          hasOwners: true,
          otherOwners: undefined, // should ideally not be there. But the field did add it back again.
        },
      })

      await userEvent.click(
        document.querySelector('input[type="checkbox"]')
      )

      expect(dataContext.data).toEqual({
        owners: {
          hasOwners: true,
          otherOwners: ['foo'],
        },
      })
      expect(dataFromHook).toEqual({
        owners: {
          hasOwners: true,
          otherOwners: ['foo'],
        },
      })

      await userEvent.click(document.querySelector('button'))

      expect(dataContext.data).toEqual({
        owners: {
          hasOwners: false,
          otherOwners: undefined, // should ideally not be there. But the field did add it back again.
        },
      })
      expect(dataFromHook).toEqual({
        owners: {
          hasOwners: false,
          otherOwners: undefined, // should ideally not be there. But the field did add it back again.
        },
      })

      await userEvent.click(document.querySelector('button'))

      expect(dataContext.data).toEqual({
        owners: {
          hasOwners: true,
          otherOwners: undefined, // should ideally not be there. But the field did add it back again.
        },
      })
      expect(dataFromHook).toEqual({
        owners: {
          hasOwners: true,
          otherOwners: undefined, // should ideally not be there. But the field did add it back again.
        },
      })
    })
  })

  it('"update" should re-render when value has changed', () => {
    let rerendered = 0
    const MockComponent = () => {
      useData(identifier)

      rerendered += 1

      return null
    }

    render(<MockComponent />)

    expect(rerendered).toBe(1)

    const props = { key: 'value' }
    const { result } = renderHook(() => useData(identifier, props))

    expect(result.current.data).toEqual({ key: 'value' })
    expect(rerendered).toBe(2)

    act(() => {
      result.current.update('/key', (value) => {
        return 'changed ' + value
      })
    })

    expect(rerendered).toBe(3)
    expect(result.current.data).toEqual({ key: 'changed value' })

    act(() => {
      result.current.update('/key', 'changed value')
    })

    expect(rerendered).toBe(3)
    expect(result.current.data).toEqual({ key: 'changed value' })

    act(() => {
      result.current.update('/key', () => {
        return 'changed value'
      })
    })

    expect(rerendered).toBe(3)
    expect(result.current.data).toEqual({ key: 'changed value' })
  })

  describe('update', () => {
    it('should sync two hooks by using "update"', () => {
      const props = { key: 'value' }

      const { result: A } = renderHook(() => useData(identifier))
      const { result: B } = renderHook(() => useData(identifier, props))

      expect(A.current.data).toEqual({ key: 'value' })
      expect(B.current.data).toEqual({ key: 'value' })

      act(() => {
        B.current.update('/key', (value) => {
          return 'changed ' + value
        })
      })

      expect(A.current.data).toEqual({ key: 'changed value' })
      expect(B.current.data).toEqual({ key: 'changed value' })
    })

    it('should support update without a function', () => {
      const props = { key: 'value' }

      const { result: A } = renderHook(() => useData(identifier))
      const { result: B } = renderHook(() => useData(identifier, props))

      expect(A.current.data).toEqual({ key: 'value' })
      expect(B.current.data).toEqual({ key: 'value' })

      act(() => {
        B.current.update('/key', 'new value')
      })

      expect(A.current.data).toEqual({ key: 'new value' })
      expect(B.current.data).toEqual({ key: 'new value' })
    })

    it('should update data with handler id', () => {
      const { result } = renderHook(() => useData(identifier), {
        wrapper: ({ children }) => (
          <>
            <Provider id={identifier}>
              <Field.String path="/foo" defaultValue="foo" />
              <Field.String path="/bar" defaultValue="bar" />
            </Provider>

            {children}
          </>
        ),
      })

      expect(result.current.data).toEqual({
        foo: 'foo',
        bar: 'bar',
      })

      act(() => {
        result.current.update('/foo', 'updated')
      })

      expect(result.current.data).toEqual({
        foo: 'updated',
        bar: 'bar',
      })
    })

    it('should set emptyValue as the value of the field', async () => {
      let dataContext = null

      const MockComponent = () => {
        const { update } = useData()

        return (
          <>
            <Field.String
              path="/foo"
              emptyValue="empty"
              defaultValue="foo"
            />
            <Button
              onClick={() => {
                update('/foo', 'empty')
              }}
            />

            <DataContext.Consumer>
              {(context) => {
                dataContext = context
                return null
              }}
            </DataContext.Consumer>
          </>
        )
      }

      render(
        <Form.Handler>
          <MockComponent />
        </Form.Handler>
      )

      expect(dataContext.data).toEqual({ foo: 'foo' })
      expect(document.querySelector('input')).toHaveValue('foo')

      await userEvent.click(document.querySelector('button'))

      expect(dataContext.data).toEqual({ foo: 'empty' })
      expect(document.querySelector('input')).toHaveValue('empty')
    })

    it('should set emptyValue when no value is given', () => {
      let dataContext = null

      render(
        <Form.Handler>
          <Field.String path="/foo" required emptyValue="empty" />

          <DataContext.Consumer>
            {(context) => {
              dataContext = context
              return null
            }}
          </DataContext.Consumer>
        </Form.Handler>
      )

      expect(dataContext.data).toEqual({ foo: 'empty' })
      expect(document.querySelector('input')).toHaveValue('empty')
    })

    it('should prioritize defaultValue over emptyValue', () => {
      let dataContext = null

      render(
        <Form.Handler>
          <Field.String
            path="/foo"
            required
            emptyValue="empty"
            defaultValue="foo"
          />

          <DataContext.Consumer>
            {(context) => {
              dataContext = context
              return null
            }}
          </DataContext.Consumer>
        </Form.Handler>
      )

      expect(dataContext.data).toEqual({ foo: 'foo' })
      expect(document.querySelector('input')).toHaveValue('foo')
    })

    it('should set emptyValue as the value of the field without showing error', async () => {
      let dataContext = null

      const MockComponent = () => {
        const { update } = Form.useData()

        return (
          <>
            <Field.String
              path="/foo"
              required
              emptyValue="empty"
              defaultValue="foo"
            />
            <Button
              onClick={() => {
                update('/foo', 'empty')
              }}
            />

            <DataContext.Consumer>
              {(context) => {
                dataContext = context
                return null
              }}
            </DataContext.Consumer>
          </>
        )
      }

      render(
        <Form.Handler>
          <MockComponent />
        </Form.Handler>
      )

      expect(dataContext.data).toEqual({ foo: 'foo' })
      expect(document.querySelector('input')).toHaveValue('foo')
      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()

      await userEvent.click(document.querySelector('button'))

      expect(dataContext.data).toEqual({ foo: 'empty' })
      expect(document.querySelector('input')).toHaveValue('empty')
      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()

      fireEvent.submit(document.querySelector('form'))
      expect(
        document.querySelector('.dnb-form-status')
      ).toBeInTheDocument()
    })

    it('should validate the field after useData update', async () => {
      let dataContext = null

      const MockComponent = () => {
        const { update } = Form.useData()

        return (
          <>
            <Field.String path="/foo" required defaultValue="foo" />
            <Button
              onClick={() => {
                update('/foo', undefined)
              }}
            />

            <DataContext.Consumer>
              {(context) => {
                dataContext = context
                return null
              }}
            </DataContext.Consumer>
          </>
        )
      }

      render(
        <Form.Handler>
          <MockComponent />
        </Form.Handler>
      )

      expect(dataContext.data).toEqual({ foo: 'foo' })
      expect(document.querySelector('input')).toHaveValue('foo')
      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()

      await userEvent.click(document.querySelector('button'))
      await userEvent.type(document.querySelector('input'), 'bar')

      expect(dataContext.data).toEqual({ foo: 'bar' })
      expect(document.querySelector('input')).toHaveValue('bar')

      await userEvent.click(document.querySelector('button'))

      expect(dataContext.data).toEqual({ foo: undefined })
      expect(document.querySelector('input')).toHaveValue('')
      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()

      fireEvent.submit(document.querySelector('form'))
      expect(
        document.querySelector('.dnb-form-status')
      ).toBeInTheDocument()
    })

    it('should update and render in sync', async () => {
      let dataContext = null
      let dataFromHook = null

      const MockComponent = () => {
        const { update, data } = Form.useData(identifier)
        dataFromHook = data

        return (
          <Form.Handler
            id={identifier}
            defaultData={{
              owners: {
                hasOwners: true,
                otherOwners: [],
              },
            }}
          >
            <Field.Boolean
              variant="button"
              path="/owners/hasOwners"
              onChange={(val) => {
                if (!val) {
                  update('/owners/otherOwners', [])
                }
              }}
            />

            <Form.Visibility animate pathTrue="/owners/hasOwners">
              <Field.ArraySelection path="/owners/otherOwners">
                <Field.Option value="foo" />
              </Field.ArraySelection>
            </Form.Visibility>

            <DataContext.Consumer>
              {(context) => {
                dataContext = context
                return null
              }}
            </DataContext.Consumer>
          </Form.Handler>
        )
      }

      render(<MockComponent />)

      expect(dataContext.data).toEqual({
        owners: {
          hasOwners: true,
          otherOwners: [],
        },
      })
      expect(dataFromHook).toEqual({
        owners: {
          hasOwners: true,
          otherOwners: [],
        },
      })

      await userEvent.click(
        document.querySelector('input[type="checkbox"]')
      )

      expect(dataContext.data).toEqual({
        owners: {
          hasOwners: true,
          otherOwners: ['foo'],
        },
      })
      expect(dataFromHook).toEqual({
        owners: {
          hasOwners: true,
          otherOwners: ['foo'],
        },
      })

      await userEvent.click(document.querySelector('button'))

      expect(dataContext.data).toEqual({
        owners: {
          hasOwners: false,
          otherOwners: [],
        },
      })
      expect(dataFromHook).toEqual({
        owners: {
          hasOwners: false,
          otherOwners: [],
        },
      })

      await userEvent.click(document.querySelector('button'))

      expect(dataContext.data).toEqual({
        owners: {
          hasOwners: true,
          otherOwners: [],
        },
      })
      expect(dataFromHook).toEqual({
        owners: {
          hasOwners: true,
          otherOwners: [],
        },
      })

      await userEvent.click(
        document.querySelector('input[type="checkbox"]')
      )

      expect(dataContext.data).toEqual({
        owners: {
          hasOwners: true,
          otherOwners: ['foo'],
        },
      })
      expect(dataFromHook).toEqual({
        owners: {
          hasOwners: true,
          otherOwners: ['foo'],
        },
      })

      await userEvent.click(document.querySelector('button'))

      expect(dataContext.data).toEqual({
        owners: {
          hasOwners: false,
          otherOwners: [],
        },
      })
      expect(dataFromHook).toEqual({
        owners: {
          hasOwners: false,
          otherOwners: [],
        },
      })

      await userEvent.click(document.querySelector('button'))

      expect(dataContext.data).toEqual({
        owners: {
          hasOwners: true,
          otherOwners: [],
        },
      })
      expect(dataFromHook).toEqual({
        owners: {
          hasOwners: true,
          otherOwners: [],
        },
      })
    })
  })

  it('should rerender when shared state calls "set"', () => {
    const { result: A } = renderHook(() => useData(identifier))
    const { result: B } = renderHook(() => useData(identifier))

    act(() => {
      B.current.set({ foo: 'bar' })
    })

    expect(A.current.data).toEqual({ foo: 'bar' })
  })

  describe('initial data', () => {
    it('should be able to update/set data even if no initial data was given', () => {
      const { result } = renderHook(() => useData(identifier))

      expect(result.current.data).toEqual(undefined)

      act(() => {
        result.current.update('/key', () => {
          return 'my value'
        })
      })

      expect(result.current.data).toEqual({ key: 'my value' })
    })

    it('should return initial data if data is not present', () => {
      const { result } = renderHook((props = { key: 'value' }) =>
        useData(identifier, props)
      )

      expect(result.current.data).toEqual({ key: 'value' })
    })

    it('should use the first initial data if is present', () => {
      const { result: A } = renderHook(
        (props = { key: 'existingValue' }) => useData(identifier, props)
      )

      const { result: B } = renderHook((props = { key: 'value' }) =>
        useData(identifier, props)
      )

      expect(A.current.data).toEqual({ key: 'existingValue' })
      expect(B.current.data).toEqual({ key: 'existingValue' })
    })

    it('should have initial data on second hook when the first sets it', () => {
      const { result: A } = renderHook(() =>
        useData(identifier, { initial: 'data' })
      )
      const { result: B } = renderHook(() => useData(identifier))

      expect(A.current.data).toEqual({ initial: 'data' })
      expect(B.current.data).toEqual({ initial: 'data' })
    })

    it('should have initial data on first hook when the second sets it', () => {
      const { result: A } = renderHook(() => useData(identifier))
      const { result: B } = renderHook(() =>
        useData(identifier, { initial: 'data' })
      )

      expect(A.current.data).toEqual({ initial: 'data' })
      expect(B.current.data).toEqual({ initial: 'data' })
    })
  })

  it('should update data on second hook when using "set"', () => {
    const { result: A } = renderHook(() =>
      useData(identifier, { initial: 'data' })
    )
    const { result: B } = renderHook(() => useData(identifier))

    expect(A.current.data).toEqual({ initial: 'data' })

    act(() => {
      B.current.set({ foo: 'bar' })
    })

    expect(A.current.data).toEqual({ foo: 'bar' })
  })

  it('should replace data with "set"', () => {
    type Data = {
      initial?: string
      foo?: string
      baz?: string
    }

    const { result: A } = renderHook(() => useData(identifier))
    const { result: B } = renderHook(() =>
      useData<Data>(identifier, { initial: 'data' })
    )

    expect(A.current.data).toEqual({ initial: 'data' })
    expect(B.current.data).toEqual({ initial: 'data' })

    // Change A
    act(() => {
      A.current.set({ foo: 'bar' })
    })

    expect(A.current.data).toEqual({ foo: 'bar' })
    expect(B.current.data).toEqual({ foo: 'bar' })

    act(() => {
      A.current.set({ baz: 'new' })
    })

    expect(A.current.data).toEqual({ baz: 'new' })
    expect(B.current.data).toEqual({ baz: 'new' })

    // Change B
    act(() => {
      B.current.set({ foo: 'bar' })
    })

    expect(A.current.data).toEqual({ foo: 'bar' })
    expect(B.current.data).toEqual({ foo: 'bar' })

    act(() => {
      B.current.set({ baz: 'new' })
    })

    expect(A.current.data).toEqual({ baz: 'new' })
    expect(B.current.data).toEqual({ baz: 'new' })
  })

  it('should return filterData fallback function without provider', () => {
    const { result } = renderHook((props = { key: 'value' }) =>
      useData(identifier, props)
    )

    expect(result.current).toEqual({
      data: { key: 'value' },
      update: expect.any(Function),
      remove: expect.any(Function),
      set: expect.any(Function),
      getValue: expect.any(Function),
      reduceToVisibleFields: expect.any(Function),
      filterData: expect.any(Function),
    })
  })

  it('should return filterData to filter fields with handler', () => {
    const { result } = renderHook(() => useData(identifier), {
      wrapper: ({ children }) => (
        <Provider
          id={identifier}
          data={{ field1: 'foo', field2: '', field3: 'baz' }}
        >
          <Field.String path="/field1" disabled />
          <Field.String path="/field2" validateInitially required />
          <Field.String path="/field3" />
          {children}
        </Provider>
      ),
    })

    const filterDisabled: FilterData = jest.fn(({ props }) => {
      return props.disabled !== true
    })

    expect(result.current.filterData(filterDisabled)).toEqual({
      field2: '',
      field3: 'baz',
    })

    const filterError: FilterData = jest.fn(({ internal }) => {
      return !(internal.error instanceof Error)
    })

    expect(result.current.filterData(filterError)).toEqual({
      field1: 'foo',
      field3: 'baz',
    })

    const filterValue: FilterData = jest.fn(({ path, value }) => {
      return path === '/field3' && value === 'baz'
    })

    expect(result.current.filterData(filterValue)).toEqual({
      field3: 'baz',
    })
  })

  it('should return filterData to filter fields with paths', () => {
    type Data = {
      field1: string
      field2: string
      field3: string
    }

    const data: Data = { field1: '', field2: '', field3: 'baz' }

    const { result } = renderHook(() => useData<Data>(identifier), {
      wrapper: ({ children }) => (
        <Provider id={identifier} data={data}>
          <Field.String path="/field1" disabled />
          <Field.String path="/field2" />
          <Field.String path="/field3" />
          {children}
        </Provider>
      ),
    })

    fireEvent.change(document.querySelector('input'), {
      target: { value: 'foo' },
    })

    expect(
      result.current.filterData({
        '/field1': false,
      } as FilterData<Data>)
    ).toEqual({
      field2: '',
      field3: 'baz',
    })

    expect(
      result.current.filterData({
        '/field1': false,
        '/field2': ({ value }) => {
          return value !== ''
        },
      } as FilterData<Data>)
    ).toEqual({
      field3: 'baz',
    })

    expect(
      result.current.filterData({
        '/field1': false,
        '/field2': ({ value }) => {
          return value !== ''
        },
        '/field3': ({ data }) => {
          return data.field2 !== ''
        },
      } as FilterData<Data>)
    ).toEqual({})
  })

  describe('reduceToVisibleFields', () => {
    it('should remove data entries of hidden fields using Visibility', async () => {
      const data = { field1: 'foo', field2: 'bar', field3: 'baz' }

      const { result } = renderHook(() => useData(identifier), {
        wrapper: ({ children }) => (
          <Provider id={identifier} data={data}>
            <Form.Visibility
              keepInDOM
              visibleWhenNot={{ path: '/field1', hasValue: 'hide me' }}
            >
              <Field.String path="/field1" />
            </Form.Visibility>
            <Form.Visibility
              visibleWhenNot={{ path: '/field2', hasValue: 'hide me' }}
            >
              <Field.String path="/field2" />
            </Form.Visibility>
            <Field.String path="/field3" />
            {children}
          </Provider>
        ),
      })

      const [field1, field2] = Array.from(
        document.querySelectorAll('input')
      )

      expect(
        result.current.reduceToVisibleFields(result.current.data)
      ).toEqual({
        field1: 'foo',
        field2: 'bar',
        field3: 'baz',
      })

      fireEvent.change(field1, {
        target: { value: 'hide me' },
      })

      expect(
        result.current.reduceToVisibleFields(result.current.data)
      ).toEqual({
        field2: 'bar',
        field3: 'baz',
      })

      fireEvent.change(field1, {
        target: { value: 'something else' },
      })

      expect(
        result.current.reduceToVisibleFields(result.current.data)
      ).toEqual({
        field1: 'something else',
        field2: 'bar',
        field3: 'baz',
      })

      fireEvent.change(field2, {
        target: { value: 'hide me' },
      })

      expect(
        result.current.reduceToVisibleFields(result.current.data)
      ).toEqual({
        field1: 'something else',
        field3: 'baz',
      })
    })

    it('should return visible data after visibility change', async () => {
      let collectedData = null

      const Output = () => {
        const { data, reduceToVisibleFields } = Form.useData()

        // Use useEffect to ensure we get the latest data
        React.useEffect(() => {
          collectedData = reduceToVisibleFields(data)
        }, [data, reduceToVisibleFields])

        return null
      }

      render(
        <Form.Handler>
          <Field.Boolean
            variant="button"
            path="/isVisible"
            defaultValue={false}
          />

          <Form.Visibility pathTrue="/isVisible">
            <Field.String
              path="/interactive"
              defaultValue="I am visible"
            />
          </Form.Visibility>

          <Output />
        </Form.Handler>
      )

      const button = document.querySelector('button')

      expect(collectedData).toEqual({
        isVisible: false,
      })

      await userEvent.click(button)

      expect(collectedData).toEqual({
        interactive: 'I am visible',
        isVisible: true,
      })

      await userEvent.click(button)

      expect(collectedData).toEqual({
        isVisible: false,
      })

      await userEvent.click(button)

      expect(collectedData).toEqual({
        interactive: 'I am visible',
        isVisible: true,
      })
    })

    it('should keep paths with "keepPaths"', async () => {
      let collectedData = null

      const Output = () => {
        const { data, reduceToVisibleFields } = Form.useData()

        // Use useEffect to ensure we get the latest data
        React.useEffect(() => {
          collectedData = reduceToVisibleFields(data, {
            keepPaths: ['/otherExistingPath'],
          })
        }, [data, reduceToVisibleFields])

        return null
      }

      render(
        <Form.Handler
          data={{
            otherExistingPath: 'foo',
          }}
        >
          <Field.Boolean
            variant="button"
            path="/isVisible"
            defaultValue={true}
          />

          <Form.Visibility pathTrue="/isVisible">
            <Field.String
              path="/interactive"
              defaultValue="I am visible"
            />
          </Form.Visibility>

          <Output />
        </Form.Handler>
      )

      const button = document.querySelector('button')

      expect(collectedData).toEqual({
        interactive: 'I am visible',
        otherExistingPath: 'foo',
        isVisible: true,
      })

      await userEvent.click(button)
      expect(collectedData).toEqual({
        otherExistingPath: 'foo',
        isVisible: false,
      })

      await userEvent.click(button)
      expect(collectedData).toEqual({
        interactive: 'I am visible',
        otherExistingPath: 'foo',
        isVisible: true,
      })

      await userEvent.click(button)
      expect(collectedData).toEqual({
        otherExistingPath: 'foo',
        isVisible: false,
      })

      await userEvent.click(button)
      expect(collectedData).toEqual({
        interactive: 'I am visible',
        otherExistingPath: 'foo',
        isVisible: true,
      })
    })

    it('should exclude paths with "removePaths"', async () => {
      let collectedData = null

      const Output = () => {
        const { data, reduceToVisibleFields } = Form.useData()

        // Use useEffect to ensure we get the latest data
        React.useEffect(() => {
          collectedData = reduceToVisibleFields(data, {
            removePaths: ['/isVisible'],
          })
        }, [data, reduceToVisibleFields])

        return null
      }

      render(
        <Form.Handler>
          <Field.Boolean
            variant="button"
            path="/isVisible"
            defaultValue={true}
          />

          <Form.Visibility pathTrue="/isVisible">
            <Field.String
              path="/interactive"
              defaultValue="I am visible"
            />
          </Form.Visibility>

          <Output />
        </Form.Handler>
      )

      const button = document.querySelector('button')

      expect(collectedData).toEqual({
        interactive: 'I am visible',
      })

      await userEvent.click(button)
      expect(collectedData).toEqual({})

      await userEvent.click(button)
      expect(collectedData).toEqual({
        interactive: 'I am visible',
      })

      await userEvent.click(button)
      expect(collectedData).toEqual({})

      await userEvent.click(button)
      expect(collectedData).toEqual({
        interactive: 'I am visible',
      })
    })

    it('should return visible data after unmount and mount', async () => {
      let collectedData = null

      const Output = () => {
        const { data, reduceToVisibleFields } = Form.useData()

        // Use useEffect to ensure we get the latest data
        React.useEffect(() => {
          collectedData = reduceToVisibleFields(data)
        }, [data, reduceToVisibleFields])

        return null
      }

      const MockComponent = () => {
        const [count, increment] = React.useReducer(
          (state) => state + 1,
          0
        )
        return (
          <Form.Handler>
            <button type="button" onClick={increment}>
              {count}
            </button>

            {count % 2 ? (
              <Field.String
                path="/interactive"
                defaultValue="I am visible"
              />
            ) : null}

            <Output />
          </Form.Handler>
        )
      }

      render(<MockComponent />)

      const button = document.querySelector('button')

      expect(collectedData).toEqual({})

      await userEvent.click(button)

      expect(collectedData).toEqual({
        interactive: 'I am visible',
      })

      await userEvent.click(button)

      expect(collectedData).toEqual({})

      await userEvent.click(button)

      expect(collectedData).toEqual({
        interactive: 'I am visible',
      })
    })
  })
})
