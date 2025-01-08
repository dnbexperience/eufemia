import React, { StrictMode, createRef, useContext, useEffect } from 'react'
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { spyOnEufemiaWarn, wait } from '../../../../../core/jest/jestSetup'
import { simulateAnimationEnd } from '../../../../../components/height-animation/__tests__/HeightAnimationUtils'
import { GlobalStatus } from '../../../../../components'
import SharedProvider from '../../../../../shared/Provider'
import { makeUniqueId } from '../../../../../shared/component-helper'
import { debounceAsync } from '../../../../../shared/helpers/debounce'
import {
  Form,
  DataContext,
  Field,
  JSONSchema,
  Ajv,
  OnChange,
  DataValueWriteProps,
  OnSubmit,
} from '../../../'
import { isCI } from 'repo-utils'
import { Props as StringFieldProps } from '../../../Field/String'
import {
  ContextState,
  FilterData,
  FilterDataPathCondition,
} from '../../Context'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

type OnChangeValue = DataValueWriteProps['onChange']

if (isCI) {
  jest.retryTimes(5) // because of an flaky async validation test
}

function TestField(props: StringFieldProps) {
  return <Field.String {...props} validateInitially validateContinuously />
}

describe('DataContext.Provider', () => {
  let identifier: string

  beforeEach(() => {
    identifier = makeUniqueId()
  })

  it('should throw error when nested', () => {
    const log = jest.spyOn(console, 'error').mockImplementation()

    const renderComponent = () => {
      render(
        <DataContext.Provider>
          <DataContext.Provider>
            <Field.String path="/foo" />
          </DataContext.Provider>
        </DataContext.Provider>
      )
    }

    expect(renderComponent).toThrow(
      'DataContext (Form.Handler) can not be nested'
    )

    log.mockRestore()
  })

  describe('props', () => {
    it('should provide value from defaultData but ignore changes', () => {
      const { rerender } = render(
        <DataContext.Provider defaultData={{ foo: 'original' }}>
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      const input = document.querySelector('input')

      expect(input).toHaveValue('original')

      rerender(
        <DataContext.Provider defaultData={{ foo: 'changed' }}>
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      expect(input).toHaveValue('original')
    })

    it('should set undefined value on first render', async () => {
      const onSubmit = jest.fn()

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Field.String path="/foo" />
        </Form.Handler>
      )

      const input = document.querySelector('input')

      expect(input).toHaveValue('')

      fireEvent.submit(document.querySelector('form'))

      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenLastCalledWith(
        { foo: undefined },
        expect.anything()
      )
      expect(onSubmit.mock.calls[0][0].foo).toBeUndefined()
      expect(Object.keys(onSubmit.mock.calls[0][0])).toHaveLength(1)

      await userEvent.type(input, 'value')

      expect(input).toHaveValue('value')

      fireEvent.submit(document.querySelector('form'))

      expect(onSubmit).toHaveBeenCalledTimes(2)
      expect(onSubmit).toHaveBeenLastCalledWith(
        { foo: 'value' },
        expect.anything()
      )
      expect(Object.keys(onSubmit.mock.calls[1][0])).toHaveLength(1)
    })

    it('should provide value from data and update based on changes', () => {
      const { rerender } = render(
        <DataContext.Provider data={{ foo: 'original' }}>
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      const input = document.querySelector('input')

      expect(input).toHaveValue('original')

      rerender(
        <DataContext.Provider data={{ foo: 'changed' }}>
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      expect(input).toHaveValue('changed')
    })

    it('should handle path change', () => {
      const { rerender } = render(
        <DataContext.Provider data={{ foo: 'original' }}>
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      const input = document.querySelector('input')

      expect(input).toHaveValue('original')

      rerender(
        <DataContext.Provider data={{ fooBar: 'changed' }}>
          <Field.String path="/fooBar" />
        </DataContext.Provider>
      )

      expect(input).toHaveValue('changed')
    })

    it('should call "onChange" on internal value change', () => {
      const onChange = jest.fn()

      const { rerender } = render(
        <DataContext.Provider
          data={{ foo: 'original' }}
          onChange={onChange}
        >
          <Field.String path="/foo" value="Value" />
        </DataContext.Provider>
      )

      const element = document.querySelector('input')

      fireEvent.change(element, {
        target: { value: 'New Value' },
      })

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(
        { foo: 'New Value' },
        expect.anything()
      )

      rerender(
        <DataContext.Provider
          data={{ fooBar: 'changed-value' }}
          onChange={onChange}
        >
          <Field.String path="/fooBar" value="Rerendered Value" />
        </DataContext.Provider>
      )

      fireEvent.change(element, {
        target: { value: 'Second Value' },
      })

      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenLastCalledWith(
        { fooBar: 'Second Value' },
        expect.anything()
      )
    })

    it('should update data context with initially given "value"', () => {
      const onChange = jest.fn()
      const onSubmit: OnSubmit = jest.fn()

      render(
        <DataContext.Provider
          data={{ other: 'original' }}
          onChange={onChange}
          onSubmit={onSubmit}
        >
          <Field.String path="/foo" value="include this" />
          <Form.SubmitButton />
        </DataContext.Provider>,
        { wrapper: StrictMode }
      )

      const element = document.querySelector('input')
      const button = document.querySelector('button')

      fireEvent.click(button)

      expect(onChange).toHaveBeenCalledTimes(0)
      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenCalledWith(
        { foo: 'include this', other: 'original' },
        expect.anything()
      )

      fireEvent.change(element, {
        target: { value: 'New Value' },
      })

      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(
        {
          foo: 'New Value',
          other: 'original',
        },
        expect.anything()
      )
    })

    it('should work without any data provided, using an empty object as default when pointing to an object subkey', () => {
      const onChange = jest.fn()

      render(
        <DataContext.Provider onChange={onChange}>
          <Field.String path="/foo" value="Value" />
        </DataContext.Provider>
      )

      const element = document.querySelector('input')

      fireEvent.change(element, {
        target: { value: 'New Value' },
      })

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(
        { foo: 'New Value' },
        expect.anything()
      )
    })

    it('should work without any data provided, using an empty array as default when pointing to an array index subkey', () => {
      const onChange = jest.fn()

      render(
        <DataContext.Provider onChange={onChange}>
          <Field.String path="/0/foo" value="Value" />
        </DataContext.Provider>
      )

      const element = document.querySelector('input')

      fireEvent.change(element, {
        target: { value: 'New Value' },
      })

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(
        [{ foo: 'New Value' }],
        expect.anything()
      )
    })

    it('should call async "onPathChange" on path change', () => {
      const onPathChange = jest.fn(async () => null)

      const { rerender } = render(
        <DataContext.Provider
          data={{ foo: 'original' }}
          onPathChange={onPathChange}
        >
          <Field.String path="/foo" value="Value" required />
        </DataContext.Provider>
      )

      const element = document.querySelector('input')

      fireEvent.change(element, {
        target: { value: 'New Value' },
      })

      expect(onPathChange).toHaveBeenCalledTimes(1)
      expect(onPathChange).toHaveBeenLastCalledWith('/foo', 'New Value')

      rerender(
        <DataContext.Provider
          data={{ fooBar: 'changed' }}
          onPathChange={onPathChange}
        >
          <Field.String path="/fooBar" value="Rerendered Value" />
        </DataContext.Provider>
      )

      fireEvent.change(element, {
        target: { value: 'Second Value' },
      })

      expect(onPathChange).toHaveBeenCalledTimes(2)
      expect(onPathChange).toHaveBeenLastCalledWith(
        '/fooBar',
        'Second Value'
      )

      fireEvent.change(element, {
        target: { value: '' },
      })

      expect(onPathChange).toHaveBeenCalledTimes(3)
      expect(onPathChange).toHaveBeenLastCalledWith('/fooBar', undefined)
    })

    it('should call "onSubmit" on submit', async () => {
      const onSubmit: OnSubmit = jest.fn()

      const { rerender } = render(
        <DataContext.Provider onSubmit={onSubmit}>
          <Field.String path="/foo" required minLength={3} />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const inputElement = document.querySelector('input')
      const submitButton = document.querySelector('button')

      fireEvent.change(inputElement, {
        target: { value: '1' },
      })
      fireEvent.click(submitButton)
      expect(onSubmit).toHaveBeenCalledTimes(0)

      fireEvent.change(inputElement, {
        target: { value: '12' },
      })
      fireEvent.click(submitButton)
      expect(onSubmit).toHaveBeenCalledTimes(0)

      fireEvent.change(inputElement, {
        target: { value: '123' },
      })
      fireEvent.click(submitButton)

      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenLastCalledWith(
        { foo: '123' },
        expect.anything()
      )

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1)
      })

      rerender(
        <DataContext.Provider
          data={{ fooBar: 'changed' }}
          onSubmit={onSubmit}
        >
          <Field.String path="/fooBar" required minLength={3} />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      fireEvent.change(inputElement, {
        target: { value: 'Second Value' },
      })
      fireEvent.click(submitButton)

      expect(onSubmit).toHaveBeenCalledTimes(2)
      expect(onSubmit).toHaveBeenLastCalledWith(
        { fooBar: 'Second Value' },
        expect.anything()
      )
    })

    it('should call "onChange" validated when async and unvalidated when sync', async () => {
      const log = jest.spyOn(console, 'log').mockImplementation()

      const onChangeSync = jest.fn(() => null)
      const onChangeAsync = jest.fn(async () => null)

      const { rerender } = render(
        <DataContext.Provider onChange={onChangeAsync}>
          <Field.String path="/foo" required minLength={3} />
        </DataContext.Provider>
      )

      const element = document.querySelector('input')

      await userEvent.type(element, '1')
      expect(onChangeAsync).toHaveBeenCalledTimes(0)

      await userEvent.type(element, '2')
      expect(onChangeAsync).toHaveBeenCalledTimes(0)

      await userEvent.type(element, '3')
      expect(onChangeAsync).toHaveBeenCalledTimes(1)

      await userEvent.type(element, '{Backspace>3}')

      rerender(
        <DataContext.Provider onChange={onChangeSync}>
          <Field.String path="/foo" required minLength={3} />
        </DataContext.Provider>
      )

      await userEvent.type(element, '1')
      expect(onChangeSync).toHaveBeenCalledTimes(1)
      expect(onChangeSync).toHaveBeenLastCalledWith(
        { foo: '1' },
        expect.anything()
      )

      log.mockRestore()
    })

    describe('filterData', () => {
      it('should filter data based on the given filterData paths', () => {
        const fooHandler: FilterDataPathCondition = jest.fn(
          ({ props }) => {
            if (props.disabled === true) {
              return false
            }
          }
        )
        const barHandler: FilterDataPathCondition = jest.fn(
          ({ props }) => {
            if (props.disabled === true) {
              return false
            }
          }
        )

        const filterDataPaths: FilterData = {
          '/foo': fooHandler,
          '/bar': barHandler,
        }

        let filteredData = undefined
        const onSubmit: OnSubmit = jest.fn((data, { filterData }) => {
          filteredData = filterData(filterDataPaths)
        })

        const { rerender } = render(
          <DataContext.Provider onSubmit={onSubmit}>
            <Field.String path="/foo" value="Include this value" />
            <Field.String path="/bar" value="bar" />
            <Form.SubmitButton />
          </DataContext.Provider>
        )

        const submitButton = document.querySelector('button')

        fireEvent.click(submitButton)

        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenCalledWith(
          { bar: 'bar', foo: 'Include this value' },
          expect.anything()
        )
        expect(filteredData).toEqual({
          bar: 'bar',
          foo: 'Include this value',
        })

        expect(fooHandler).toHaveBeenCalledTimes(1)
        expect(barHandler).toHaveBeenCalledTimes(1)

        expect(fooHandler).toHaveBeenLastCalledWith({
          value: 'Include this value',
          props: expect.objectContaining({}),
          data: { bar: 'bar', foo: 'Include this value' },
          internal: { error: undefined },
        })
        expect(barHandler).toHaveBeenLastCalledWith({
          value: 'bar',
          props: expect.objectContaining({}),
          data: { bar: 'bar', foo: 'Include this value' },
          internal: { error: undefined },
        })

        rerender(
          <DataContext.Provider onSubmit={onSubmit}>
            <Field.String path="/foo" value="Skip this value" disabled />
            <Field.String path="/bar" value="bar value" />
            <Form.SubmitButton />
          </DataContext.Provider>
        )

        expect(filteredData).toEqual({
          bar: 'bar',
          foo: 'Include this value',
        })

        fireEvent.click(submitButton)

        expect(onSubmit).toHaveBeenCalledTimes(2)
        expect(onSubmit).toHaveBeenLastCalledWith(
          { bar: 'bar value', foo: 'Skip this value' },
          expect.anything()
        )
        expect(filteredData).toEqual({
          bar: 'bar value',
        })

        expect(fooHandler).toHaveBeenCalledTimes(2)
        expect(barHandler).toHaveBeenCalledTimes(2)

        expect(fooHandler).toHaveBeenLastCalledWith({
          value: 'Skip this value',
          props: expect.objectContaining({}),
          data: { bar: 'bar value', foo: 'Skip this value' },
          internal: { error: undefined },
        })
        expect(barHandler).toHaveBeenLastCalledWith({
          value: 'bar value',
          props: expect.objectContaining({}),
          data: { bar: 'bar value', foo: 'Skip this value' },
          internal: { error: undefined },
        })

        expect(filteredData).toEqual({ bar: 'bar value' })
      })

      it('should filter data based on the given filterData method', () => {
        const filterDataHandler: FilterData = jest.fn(({ props }) => {
          if (props.disabled === true) {
            return false
          }
        })

        let filteredData = undefined
        const onSubmit = jest.fn((data, { filterData }) => {
          return (filteredData = filterData(filterDataHandler))
        })

        const { rerender } = render(
          <DataContext.Provider onSubmit={onSubmit}>
            <Field.String path="/foo" value="Include this value" />
            <Field.String path="/bar" value="bar" />
            <Form.SubmitButton />
          </DataContext.Provider>
        )

        const submitButton = document.querySelector('button')

        fireEvent.click(submitButton)

        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenCalledWith(
          { bar: 'bar', foo: 'Include this value' },
          expect.anything()
        )
        expect(filteredData).toEqual({
          bar: 'bar',
          foo: 'Include this value',
        })

        expect(filterDataHandler).toHaveBeenCalledTimes(2)
        expect(filterDataHandler).toHaveBeenNthCalledWith(1, {
          path: '/foo',
          value: 'Include this value',
          displayValue: 'Include this value',
          label: undefined,
          data: {
            bar: 'bar',
            foo: 'Include this value',
          },
          props: expect.objectContaining({
            value: 'Include this value',
          }),
          internal: {
            error: undefined,
          },
        })
        expect(filterDataHandler).toHaveBeenNthCalledWith(2, {
          path: '/bar',
          value: 'bar',
          displayValue: 'bar',
          label: undefined,
          data: {
            bar: 'bar',
            foo: 'Include this value',
          },
          props: expect.objectContaining({
            value: 'bar',
          }),
          internal: {
            error: undefined,
          },
        })

        rerender(
          <DataContext.Provider onSubmit={onSubmit}>
            <Field.String path="/foo" value="Skip this value" disabled />
            <Field.String path="/bar" value="bar value" />
            <Form.SubmitButton />
          </DataContext.Provider>
        )

        expect(filteredData).toEqual({
          bar: 'bar',
          foo: 'Include this value',
        })

        fireEvent.click(submitButton)

        expect(onSubmit).toHaveBeenCalledTimes(2)
        expect(onSubmit).toHaveBeenLastCalledWith(
          { bar: 'bar value', foo: 'Skip this value' },
          expect.anything()
        )
        expect(filteredData).toEqual({
          bar: 'bar value',
        })

        expect(filterDataHandler).toHaveBeenCalledTimes(4)
        expect(filterDataHandler).toHaveBeenNthCalledWith(3, {
          path: '/foo',
          value: 'Skip this value',
          displayValue: 'Skip this value',
          label: undefined,
          data: {
            bar: 'bar value',
            foo: 'Skip this value',
          },
          props: expect.objectContaining({
            value: 'Skip this value',
          }),
          internal: {
            error: undefined,
          },
        })
        expect(filterDataHandler).toHaveBeenNthCalledWith(4, {
          path: '/bar',
          value: 'bar value',
          displayValue: 'bar value',
          label: undefined,
          data: {
            bar: 'bar value',
            foo: 'Skip this value',
          },
          props: expect.objectContaining({
            value: 'bar value',
          }),
          internal: {
            error: undefined,
          },
        })

        expect(filteredData).toEqual({ bar: 'bar value' })
      })

      it('"filterSubmitData" should not mutate internal data', async () => {
        const onSubmit: OnSubmit = jest.fn()
        const onChange = jest.fn()

        const filterDataHandler: FilterData = jest.fn(({ value }) => {
          if (value === 'remove me') {
            return false
          }
        })

        let originalData = undefined
        let filteredData = undefined

        const MyForm = () => {
          const { data: original, filterData } = Form.useData('my-form')
          originalData = original

          const data = filterData(filterDataHandler)
          filteredData = data

          return (
            <DataContext.Provider
              id="my-form"
              onSubmit={onSubmit}
              onChange={onChange}
              filterSubmitData={filterDataHandler}
            >
              <Field.String path="/myField" />
              <Form.SubmitButton />
            </DataContext.Provider>
          )
        }

        render(<MyForm />)

        const submitButton = document.querySelector('button')
        const input = document.querySelector('input')

        await userEvent.type(input, 'remove m')
        expect(filteredData).toMatchObject({ myField: 'remove m' })
        expect(originalData).toMatchObject({ myField: 'remove m' })
        expect(onChange).toHaveBeenCalledTimes(8)
        expect(onChange).toHaveBeenLastCalledWith(
          { myField: 'remove m' },
          expect.anything()
        )

        fireEvent.click(submitButton)
        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenLastCalledWith(
          { myField: 'remove m' },
          expect.anything()
        )
        expect(filteredData).toEqual({
          myField: 'remove m',
        })

        await userEvent.type(input, 'e')
        expect(filteredData).toMatchObject({})
        expect(originalData).toMatchObject({ myField: 'remove me' })
        expect(onChange).toHaveBeenCalledTimes(9)
        expect(onChange).toHaveBeenLastCalledWith(
          { myField: 'remove me' },
          expect.anything()
        )

        fireEvent.click(submitButton)
        expect(onSubmit).toHaveBeenCalledTimes(2)
        expect(onSubmit).toHaveBeenLastCalledWith({}, expect.anything())
        expect(filteredData).toEqual({})
      })

      it('onChange should return filterData', async () => {
        const filterDataHandler: FilterData = jest.fn(({ value }) => {
          if (value === 'remove me') {
            return false
          }
        })

        let filteredData = undefined
        const onChange: OnChange = jest.fn((data, { filterData }) => {
          filteredData = filterData(filterDataHandler)
        })

        render(
          <DataContext.Provider onChange={onChange}>
            <Field.String path="/myField" />
            <Form.SubmitButton />
          </DataContext.Provider>
        )

        const input = document.querySelector('input')

        await userEvent.type(input, 'remove m')
        expect(onChange).toHaveBeenCalledTimes(8)
        expect(onChange).toHaveBeenLastCalledWith(
          { myField: 'remove m' },
          expect.anything()
        )
        expect(filteredData).toMatchObject({ myField: 'remove m' })

        await userEvent.type(input, 'e')
        expect(onChange).toHaveBeenCalledTimes(9)
        expect(onChange).toHaveBeenLastCalledWith(
          { myField: 'remove me' },
          expect.anything()
        )
        expect(filteredData).toMatchObject({})
      })

      it('should add and remove fieldProps properly', async () => {
        let filteredData = undefined
        const onSubmit: OnSubmit = jest.fn((data, { filterData }) => {
          filteredData = filterData(filterDataHandler)
        })

        const filterDataHandler = ({ props }) => {
          return !props['data-exclude-field']
        }

        const MockForm = () => {
          return (
            <Form.Handler onSubmit={onSubmit}>
              <Field.Boolean
                label="Toggle"
                variant="button"
                path="/isVisible"
                data-exclude-field
              />
              <Form.Visibility
                pathTrue="/isVisible"
                keepInDOM
                fieldPropsWhenHidden={{ 'data-exclude-field': true }}
              >
                <Field.Selection
                  label="Choose"
                  variant="radio"
                  path="/mySelection"
                  value="less"
                >
                  <Field.Option value="less" title="Less" />
                  <Field.Option value="more" title="More" />
                </Field.Selection>

                <Form.Visibility
                  visibleWhen={{ path: '/mySelection', hasValue: 'more' }}
                  keepInDOM
                  fieldPropsWhenHidden={{ 'data-exclude-field': true }}
                >
                  <Field.String
                    label="My String"
                    path="/myString"
                    value="foo"
                  />
                </Form.Visibility>
              </Form.Visibility>
            </Form.Handler>
          )
        }

        render(<MockForm />)

        fireEvent.submit(document.querySelector('form'))
        expect(onSubmit).toHaveBeenLastCalledWith(
          {
            isVisible: undefined,
            mySelection: 'less',
            myString: 'foo',
          },
          expect.anything()
        )
        expect(filteredData).toMatchObject({})

        await userEvent.click(screen.getByText('Toggle'))

        fireEvent.submit(document.querySelector('form'))
        expect(onSubmit).toHaveBeenLastCalledWith(
          { isVisible: true, mySelection: 'less', myString: 'foo' },
          expect.anything()
        )
        expect(filteredData).toMatchObject({ mySelection: 'less' })

        await userEvent.click(screen.getByText('More'))

        fireEvent.submit(document.querySelector('form'))
        expect(onSubmit).toHaveBeenLastCalledWith(
          { isVisible: true, mySelection: 'more', myString: 'foo' },
          expect.anything()
        )
        expect(filteredData).toMatchObject({
          mySelection: 'more',
          myString: 'foo',
        })

        await userEvent.click(screen.getByText('Less'))

        fireEvent.submit(document.querySelector('form'))
        expect(onSubmit).toHaveBeenLastCalledWith(
          { isVisible: true, mySelection: 'less', myString: 'foo' },
          expect.anything()
        )
        expect(filteredData).toMatchObject({ mySelection: 'less' })

        await userEvent.click(screen.getByText('Toggle'))

        fireEvent.submit(document.querySelector('form'))
        expect(onSubmit).toHaveBeenLastCalledWith(
          { isVisible: false, mySelection: 'less', myString: 'foo' },
          expect.anything()
        )
        expect(filteredData).toMatchObject({})
      })
    })

    it('should call "onSubmitRequest" on invalid submit', () => {
      const log = jest.spyOn(console, 'error').mockImplementation()

      const onSubmitRequest = jest.fn()

      const { rerender } = render(
        <DataContext.Provider
          data={{ foo: 'original' }}
          onSubmitRequest={onSubmitRequest}
        >
          <Field.Number path="/foo" minimum={3} />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const inputElement = document.querySelector('input')
      const submitButton = document.querySelector('button')

      fireEvent.change(inputElement, {
        target: { value: '1' },
      })
      fireEvent.click(submitButton)

      expect(onSubmitRequest).toHaveBeenCalledTimes(1)
      expect(onSubmitRequest).toHaveBeenCalledWith()

      rerender(
        <DataContext.Provider
          data={{ fooBar: 'changed' }}
          onSubmitRequest={onSubmitRequest}
        >
          <Field.Number path="/fooBar" required />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      fireEvent.click(submitButton)

      expect(onSubmitRequest).toHaveBeenCalledTimes(2)
      expect(onSubmitRequest).toHaveBeenLastCalledWith()

      log.mockRestore()
    })
  })

  describe('async submit', () => {
    let log: jest.SpyInstance
    beforeEach(() => {
      log = spyOnEufemiaWarn()
    })
    afterEach(() => {
      log.mockRestore()
    })

    const UseContext = ({
      result,
    }: {
      result: React.MutableRefObject<ContextState>
    }) => {
      result.current = useContext(DataContext.Context)
      return null
    }

    it('should emit onSubmitComplete with data state object and return value when submit is completed', async () => {
      const onSubmit = async () => {
        return { status: 'pending' } as const
      }
      const onSubmitComplete = jest.fn(async () => null)

      render(
        <DataContext.Provider
          onSubmit={onSubmit}
          onSubmitComplete={onSubmitComplete}
        >
          <Field.String path="/foo" value="Value" />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const inputElement = document.querySelector('input')
      const submitButton = document.querySelector('button')

      await userEvent.type(inputElement, ' changed')
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(onSubmitComplete).toHaveBeenCalledTimes(1)
        expect(onSubmitComplete).toHaveBeenCalledWith(
          { foo: 'Value changed' },
          { status: 'pending' }
        )
      })
    })

    it('should keep form in pending state when onSubmitComplete returns status of pending', async () => {
      const onSubmit = async () => {
        return { info: 'Info message' } as const
      }
      const onSubmitComplete = jest.fn(async () => {
        return { status: 'pending' } as const
      })

      render(
        <DataContext.Provider
          onSubmit={onSubmit}
          onSubmitComplete={onSubmitComplete}
        >
          <Field.String path="/foo" />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const submitButton = document.querySelector('button')
      const indicator = submitButton.querySelector(
        '.dnb-forms-submit-indicator'
      )

      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(submitButton).toBeDisabled()
        expect(indicator).toHaveClass(
          'dnb-forms-submit-indicator--state-pending'
        )
      })

      await waitFor(() => {
        expect(submitButton).toBeDisabled()
        expect(onSubmitComplete).toHaveBeenCalledTimes(1)
        expect(onSubmitComplete).toHaveBeenCalledWith(
          { foo: undefined },
          { info: 'Info message' }
        )
      })

      await waitFor(() => {
        expect(submitButton).toBeDisabled()
        expect(indicator).toHaveClass(
          'dnb-forms-submit-indicator--state-pending'
        )
      })
    })

    it('should abort async submit onSubmit using asyncSubmitTimeout', async () => {
      const onSubmit: OnSubmit = jest.fn().mockImplementation(async () => {
        await wait(30) // ensure we never finish onSubmit before the timeout
      })

      render(
        <DataContext.Provider
          onSubmit={onSubmit}
          minimumAsyncBehaviorTime={30000} // with a high wait time, we ensure the Error will abort it
          asyncSubmitTimeout={1}
        >
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const buttonElement = document.querySelector('button')

      fireEvent.click(buttonElement)

      expect(
        document.querySelector(
          '.dnb-forms-submit-indicator--state-pending'
        )
      ).toBeTruthy()

      await waitFor(() => {
        expect(
          document.querySelector(
            '.dnb-forms-submit-indicator--state-pending'
          )
        ).toBeNull()
      })

      expect(onSubmit).toHaveBeenCalledTimes(1)
    })

    describe('should evaluate long onChangeValidator and onBlurValidator before continue with async onSubmit', () => {
      let eventsStart = []
      let eventsEnd = []

      const onSubmit = async () => {
        eventsStart.push('onSubmit')

        await wait(1)

        eventsEnd.push('onSubmit')
      }

      const onChangeForm: OnChange<{ myField: string }> = async () => {
        eventsStart.push('onChangeForm')

        await wait(2)

        eventsEnd.push('onChangeForm')
      }

      const onChangeField: OnChangeValue = async () => {
        eventsStart.push('onChangeField')

        await wait(3)

        eventsEnd.push('onChangeField')
      }

      const onChangeValidator = async () => {
        eventsStart.push('onChangeValidator')

        await wait(10)

        eventsEnd.push('onChangeValidator')
      }

      const onBlurValidator = async () => {
        eventsStart.push('onBlurValidator')

        await wait(20)

        eventsEnd.push('onBlurValidator')
      }

      it('during type', async () => {
        render(
          <DataContext.Provider
            onSubmit={onSubmit}
            onChange={onChangeForm}
          >
            <Field.String
              value="vali"
              path="/myField"
              onChangeValidator={onChangeValidator}
              onBlurValidator={onBlurValidator}
              onChange={onChangeField}
            />
            <Form.SubmitButton />
          </DataContext.Provider>
        )

        const input = document.querySelector('input')

        eventsStart = []
        eventsEnd = []

        await userEvent.type(input, 'd')

        await waitFor(() => {
          expect(eventsStart).toEqual([
            'onChangeValidator',
            'onChangeForm',
            'onChangeField',
          ])
        })
      })

      it('during submit', async () => {
        render(
          <DataContext.Provider
            onSubmit={onSubmit}
            onChange={onChangeForm}
          >
            <Field.String
              value="vali"
              path="/myField"
              onChangeValidator={onChangeValidator}
              onBlurValidator={onBlurValidator}
              onChange={onChangeField}
            />
            <Form.SubmitButton />
          </DataContext.Provider>
        )

        const button = document.querySelector('button')

        eventsStart = []
        eventsEnd = []

        await userEvent.click(button)

        await wait(100)

        expect(eventsStart).toEqual([
          'onChangeValidator',
          'onBlurValidator',
          'onSubmit',
        ])
        expect(eventsEnd).toEqual([
          'onChangeValidator',
          'onBlurValidator',
          'onSubmit',
        ])
      })
    })

    it('should evaluate sync validation, such as required, before continue with async validation', async () => {
      const onSubmit: OnSubmit = jest.fn(async () => {
        await wait(10)
        return { info: 'Info message' } as const
      })
      const onChangeValidator = jest.fn(async (value) => {
        await wait(10)
        if (value === 'onChangeValidator-error') {
          return new Error('onChangeValidator-error')
        }
      })
      const onBlurValidator = jest.fn(async (value) => {
        await wait(10)
        if (value === 'onBlurValidator-error') {
          return new Error('onBlurValidator-error')
        }
      })

      render(
        <DataContext.Provider onSubmit={onSubmit}>
          <Field.String
            path="/foo"
            onChangeValidator={onChangeValidator}
            onBlurValidator={onBlurValidator}
            required
          />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const submitButton = document.querySelector('button')
      const input = document.querySelector('input')
      const indicator = submitButton.querySelector(
        '.dnb-forms-submit-indicator'
      )

      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled()
        expect(indicator).not.toHaveClass(
          'dnb-forms-submit-indicator--state-pending'
        )
        const status = document.querySelector(
          '.dnb-forms-field-block .dnb-form-status'
        )
        expect(status).toHaveTextContent(nb.Field.errorRequired)
      })

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(0)
        expect(onBlurValidator).toHaveBeenCalledTimes(0)
        expect(onChangeValidator).toHaveBeenCalledTimes(0)
      })

      // Use fireEvent over userEvent, because of its sync nature
      fireEvent.change(input, {
        target: { value: 'onChangeValidator-error' },
      })

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled()
        expect(indicator).not.toHaveClass(
          'dnb-forms-submit-indicator--state-pending'
        )
        const status = document.querySelector(
          '.dnb-forms-field-block .dnb-form-status'
        )
        expect(status).toHaveTextContent('onChangeValidator-error')
      })

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(0)
        expect(onBlurValidator).toHaveBeenCalledTimes(0)
        expect(onChangeValidator).toHaveBeenCalledTimes(1)
      })

      // Use fireEvent over userEvent, because of its sync nature
      fireEvent.change(input, {
        target: { value: 'onBlurValidator-error' },
      })

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled()
        expect(indicator).not.toHaveClass(
          'dnb-forms-submit-indicator--state-pending'
        )
        const status = document.querySelector(
          '.dnb-forms-field-block .dnb-form-status'
        )
        expect(status).toBeNull()
      })

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(0)
        expect(onBlurValidator).toHaveBeenCalledTimes(0)
        expect(onChangeValidator).toHaveBeenCalledTimes(2)
      })

      // Use fireEvent over userEvent, because of its sync nature
      fireEvent.change(input, {
        target: { value: '' },
      })

      fireEvent.blur(input)

      expect(input).toHaveValue('')

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(0)
        expect(onBlurValidator).toHaveBeenCalledTimes(1)
        expect(onChangeValidator).toHaveBeenCalledTimes(2)
      })

      await userEvent.click(submitButton)

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(0)
        expect(onBlurValidator).toHaveBeenCalledTimes(1)
        expect(onChangeValidator).toHaveBeenCalledTimes(2)
      })

      await waitFor(() => {
        const status = document.querySelector(
          '.dnb-forms-field-block .dnb-form-status'
        )
        expect(status).toHaveTextContent(nb.Field.errorRequired)
      })

      await userEvent.type(input, 'something')

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled()
        expect(indicator).not.toHaveClass(
          'dnb-forms-submit-indicator--state-pending'
        )
        const status = document.querySelector(
          '.dnb-forms-field-block .dnb-form-status'
        )
        expect(status).toBeNull()
      })

      await userEvent.click(submitButton)

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onBlurValidator).toHaveBeenCalledTimes(3)
        expect(onChangeValidator).toHaveBeenCalledTimes(12)
      })
    })

    it('should set "formState" to "pending" when "onChangeValidator" is async', async () => {
      const result = createRef<ContextState>()
      const onChangeValidator = async () => {
        return new Error('My error')
      }

      const { rerender } = render(
        <DataContext.Provider>
          <UseContext result={result} />
          <Field.String onChangeValidator={onChangeValidator} />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const submitButton = document.querySelector('button')

      expect(result.current.formState).toBeUndefined()

      fireEvent.click(submitButton)

      expect(result.current.formState).toBe('pending')

      await waitFor(() => {
        expect(result.current.formState).toBeUndefined()
      })

      const syncOnChangeValidator = () => {
        return new Error('My error')
      }

      rerender(
        <DataContext.Provider>
          <UseContext result={result} />
          <Field.String onChangeValidator={syncOnChangeValidator} />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      expect(result.current.formState).toBeUndefined()

      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(result.current.formState).toBeUndefined()
      })
    })

    it('should set "formState" to "pending" when "onBlurValidator" is async', async () => {
      const result = createRef<ContextState>()
      const onBlurValidator = async () => {
        return new Error('My error')
      }

      const { rerender } = render(
        <DataContext.Provider>
          <UseContext result={result} />
          <Field.String onBlurValidator={onBlurValidator} />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const submitButton = document.querySelector('button')

      expect(result.current.formState).toBeUndefined()

      fireEvent.click(submitButton)

      expect(result.current.formState).toBe('pending')

      await waitFor(() => {
        expect(result.current.formState).toBeUndefined()
      })

      const syncValidator = () => {
        return new Error('My error')
      }

      rerender(
        <DataContext.Provider>
          <UseContext result={result} />
          <Field.String onBlurValidator={syncValidator} />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      expect(result.current.formState).toBeUndefined()

      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(result.current.formState).toBeUndefined()
      })
    })

    it('should set "formState" to "pending" when when "onSubmit" is async', async () => {
      const result = createRef<ContextState>()
      const onSubmit = async () => null

      render(
        <DataContext.Provider onSubmit={onSubmit}>
          <UseContext result={result} />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const submitButton = document.querySelector('button')

      expect(result.current.formState).toBeUndefined()

      fireEvent.click(submitButton)

      expect(result.current.formState).toBe('pending')

      await waitFor(() => {
        expect(result.current.formState).toBeUndefined()
      })
    })

    it('should show submit indicator during submit when "onSubmit" is used', async () => {
      const result = createRef<ContextState>()
      const onSubmit = async () => null

      render(
        <DataContext.Provider onSubmit={onSubmit}>
          <UseContext result={result} />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const submitButton = document.querySelector('button')

      expect(result.current.formState).toBeUndefined()

      fireEvent.click(submitButton)

      expect(result.current.formState).toBe('pending')

      await waitFor(() => {
        expect(result.current.formState).toBeUndefined()
      })
    })

    it('the user should be able to set the form in pending mode while an async validation is on going', async () => {
      const onSubmit: OnSubmit = jest
        .fn()
        .mockImplementation(async () => null)

      const onChangeValidator = debounceAsync(async (value) => {
        await wait(400)
        if (value === 'invalid') {
          return Error('My error')
        }
      }, 10)

      render(
        <DataContext.Provider onSubmit={onSubmit} asyncSubmitTimeout={1}>
          <Field.String
            label="Label"
            path="/foo"
            onChangeValidator={onChangeValidator}
            required
          />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const buttonElement = document.querySelector('button')
      const inputElement = document.querySelector('input')
      const pendingField = () =>
        document.querySelector(
          '.dnb-forms-field-block .dnb-forms-submit-indicator--state-pending'
        )

      // 1. start the async validation
      await userEvent.type(inputElement, 'invali')

      expect(document.querySelector('.dnb-form-status')).toBeNull()

      await waitFor(() => {
        expect(pendingField()).toBeTruthy()
      })

      await waitFor(() => {
        expect(document.querySelector('.dnb-form-status')).toBeNull()
      })

      await waitFor(() => {
        expect(buttonElement).not.toBeDisabled()
      })

      // 2. start the async submit
      fireEvent.click(buttonElement)

      await waitFor(() => {
        expect(buttonElement).toBeDisabled()
        expect(
          buttonElement.querySelector(
            '.dnb-forms-submit-indicator--state-pending'
          )
        ).toBeTruthy()
      })

      await waitFor(() => {
        expect(document.querySelector('.dnb-form-status')).toBeNull()
      })

      await userEvent.type(inputElement, 'd')

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent('My error')
      })

      await waitFor(() => {
        expect(buttonElement).not.toBeDisabled()
      })

      await userEvent.type(inputElement, '{Backspace>10}')
      await userEvent.click(buttonElement)

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(nb.Field.errorRequired)
      })

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(0)
      })

      await userEvent.type(inputElement, 'valid')

      await waitFor(() => {
        expect(document.querySelector('.dnb-form-status')).toBeNull()
      })

      await userEvent.click(buttonElement)

      await waitFor(() => {
        expect(document.querySelector('.dnb-form-status')).toBeNull()
      })
    })

    it('should emit onChange only when onChangeValidator is evaluated successfully', async () => {
      const onChangeContext = jest.fn().mockImplementation(async () => {
        await wait(10)
      })
      const onChangeField = jest.fn().mockImplementation(async () => {
        await wait(10)
      })

      const onChangeValidator = jest
        .fn()
        .mockImplementation(async (value) => {
          /**
           * It seems that this test on CI fails during way slower performance.
           * The higher timeout is to ensure the typed value will be handle by the async revalidation, even the value was valid when continue typing.
           *
           * The slower the performance, the higher the timeout needs to be.
           */
          await wait(60)
          if (value !== 'valid') {
            return Error(`value: ${value}`)
          }
        })

      render(
        <DataContext.Provider onChange={onChangeContext}>
          <Field.String
            label="Label"
            path="/foo"
            onChangeValidator={onChangeValidator}
            onChange={onChangeField}
            required
          />
        </DataContext.Provider>
      )

      const inputElement = document.querySelector('input')
      const pendingField = () =>
        document.querySelector(
          '.dnb-forms-field-block .dnb-forms-submit-indicator--state-pending'
        )

      // Use fireEvent over userEvent, because of its sync nature
      fireEvent.change(inputElement, {
        target: { value: '1' },
      })

      await waitFor(() => {
        expect(document.querySelector('.dnb-form-status')).toBeNull()
        expect(pendingField()).toBeTruthy()
      })

      await userEvent.type(inputElement, '{Backspace}')
      fireEvent.blur(inputElement)

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(nb.Field.errorRequired)
      })

      // Use fireEvent over userEvent, because of its sync nature
      fireEvent.change(inputElement, {
        target: { value: '2' },
      })

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent('value: 2')
      })

      // Use fireEvent over userEvent, because of its sync nature
      fireEvent.change(inputElement, {
        target: { value: 'valid' },
      })

      await waitFor(() => {
        expect(document.querySelector('.dnb-form-status')).toBeNull()
      })

      // Use fireEvent over userEvent, because of its sync nature
      fireEvent.change(inputElement, {
        target: { value: '' },
      })

      expect(onChangeContext).toHaveBeenCalledTimes(0)
      expect(onChangeField).toHaveBeenCalledTimes(0)

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(nb.Field.errorRequired)
      })

      await userEvent.type(inputElement, 'valid')

      await waitFor(() => {
        expect(onChangeContext).toHaveBeenCalledTimes(1)
        expect(onChangeContext).toHaveBeenLastCalledWith(
          { foo: 'valid' },
          expect.anything()
        )
      })
      await waitFor(() => {
        expect(onChangeField).toHaveBeenCalled()
        expect(onChangeField).toHaveBeenLastCalledWith('valid')
      })
    })
  })

  describe('async change', () => {
    it('should not disable form elements on changes', async () => {
      const onChange: OnChange = async () => null

      render(
        <DataContext.Provider onChange={onChange}>
          <Field.String label="My label" path="/myField" />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const button = document.querySelector('button')
      const input = document.querySelector('input')

      await userEvent.click(button)
      await userEvent.type(input, '123')

      expect(button).not.toBeDisabled()
      expect(input).not.toBeDisabled()
    })

    it('should show indicator on label while pending', async () => {
      const onChange: OnChange = async () => {
        return null
      }

      render(
        <DataContext.Provider onChange={onChange}>
          <Field.String label="My label" path="/myField" />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const input = document.querySelector('input')
      const indicator = document.querySelector(
        '.dnb-forms-submit-indicator'
      )

      // Use fireEvent over userEvent, because of its sync nature
      fireEvent.change(input, {
        target: { value: '123' },
      })

      expect(indicator).toHaveClass(
        'dnb-forms-submit-indicator--state-pending'
      )

      await waitFor(() => {
        expect(indicator).toHaveClass(
          'dnb-forms-submit-indicator--state-complete'
        )
      })
    })

    it('should show success indicator on label when success returned', async () => {
      const onChange: OnChange = async () => {
        return { success: 'saved' } as const
      }

      render(
        <DataContext.Provider onChange={onChange}>
          <Field.String label="My label" path="/myField" />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const input = document.querySelector('input')
      const indicator = document.querySelector(
        '.dnb-forms-submit-indicator'
      )

      // Use fireEvent over userEvent, because of its sync nature
      fireEvent.change(input, {
        target: { value: '123' },
      })

      expect(indicator).toHaveClass(
        'dnb-forms-submit-indicator--state-pending'
      )

      await waitFor(() => {
        expect(indicator).toHaveClass(
          'dnb-forms-submit-indicator--state-success'
        )
      })
    })

    it('should fulfill first the form event before the field event', async () => {
      const events = []

      const onChangeForm: OnChange = async () => {
        events.push('onChangeForm')
      }
      const onChangeField: OnChangeValue = async () => {
        events.push('onChangeField')
      }

      render(
        <DataContext.Provider onChange={onChangeForm}>
          <Field.String
            label="My label"
            path="/myField"
            onChange={onChangeField}
          />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const input = document.querySelector('input')

      // Use fireEvent over userEvent, because of its sync nature
      fireEvent.change(input, {
        target: { value: '123' },
      })

      await waitFor(() => {
        expect(events).toEqual(['onChangeForm', 'onChangeField'])
      })
    })

    it('should show error on the field from the event return when complete', async () => {
      const onChangeForm: OnChange<{ myField: string }> = async ({
        myField,
      }) => {
        if (myField === 'onChangeForm-error') {
          return Error('onChangeForm-error')
        }
      }
      const onChangeField: OnChangeValue = async (value) => {
        if (value === 'onChangeField-error') {
          return Error('onChangeField-error')
        }
      }

      render(
        <DataContext.Provider onChange={onChangeForm}>
          <Field.String
            label="My label"
            path="/myField"
            onChange={onChangeField}
          />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const input = document.querySelector('input')

      // Use fireEvent over userEvent, because of its sync nature
      fireEvent.change(input, {
        target: { value: 'onChangeForm-error' },
      })

      await waitFor(() => {
        const status = document.querySelector(
          '.dnb-forms-field-block [role="alert"]'
        )
        expect(status).toHaveTextContent('onChangeForm-error')
      })

      // Use fireEvent over userEvent, because of its sync nature
      fireEvent.change(input, {
        target: { value: 'onChangeField-error' },
      })

      await waitFor(() => {
        const status = document.querySelector(
          '.dnb-forms-field-block [role="alert"]'
        )
        expect(status).toHaveTextContent('onChangeField-error')
      })
    })

    it('should show status message on the field from the event return when complete', async () => {
      const onChangeForm: OnChange<{ myField: string }> = async ({
        myField,
      }) => {
        if (myField === 'onChangeForm-info') {
          return { info: 'onChangeForm-info' }
        }
      }
      const onChangeField: OnChangeValue = async (value) => {
        if (value === 'onChangeField-warning') {
          return { warning: 'onChangeField-warning' }
        }
      }

      render(
        <DataContext.Provider onChange={onChangeForm}>
          <Field.String
            label="My label"
            path="/myField"
            onChange={onChangeField}
          />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const input = document.querySelector('input')

      // Use fireEvent over userEvent, because of its sync nature
      fireEvent.change(input, {
        target: { value: 'onChangeForm-info' },
      })

      await waitFor(() => {
        const status = document.querySelector(
          '.dnb-forms-field-block .dnb-form-status'
        )
        expect(status).toHaveTextContent('onChangeForm-info')
        expect(status).toHaveClass('dnb-form-status--info')
      })

      // Use fireEvent over userEvent, because of its sync nature
      fireEvent.change(input, {
        target: { value: 'onChangeField-warning' },
      })

      await waitFor(() => {
        const status = document.querySelector(
          '.dnb-forms-field-block .dnb-form-status'
        )
        expect(status).toHaveTextContent('onChangeField-warning')
        expect(status).toHaveClass('dnb-form-status--warn')
      })
    })

    it('should show all status messages on the field from the event return when complete', async () => {
      const onChangeForm: OnChange<{ myField: string }> = async ({
        myField,
      }) => {
        return {
          info: 'onChangeForm-info',
          error:
            myField === 'onChangeForm-error' &&
            Error('onChangeForm-error'),
        }
      }
      const onChangeField: OnChangeValue = async (value) => {
        return {
          warning: 'onChangeField-warning',
          error:
            value === 'onChangeField-error' &&
            Error('onChangeField-error'),
        }
      }

      render(
        <DataContext.Provider onChange={onChangeForm}>
          <Field.String
            label="My label"
            path="/myField"
            onChange={onChangeField}
          />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const input = document.querySelector('input')

      // Use fireEvent over userEvent, because of its sync nature
      fireEvent.change(input, {
        target: { value: 'onChangeForm-error' },
      })

      await waitFor(() => {
        const statusMessages = document
          .querySelector('.dnb-forms-field-block')
          .querySelectorAll('.dnb-form-status')
        expect(statusMessages).toHaveLength(2)
        expect(statusMessages[0]).toHaveTextContent('onChangeForm-error')
        expect(statusMessages[1]).toHaveTextContent('onChangeForm-info')
      })

      // Use fireEvent over userEvent, because of its sync nature
      fireEvent.change(input, {
        target: { value: 'onChangeField-error' },
      })

      await waitFor(() => {
        const statusMessages = document
          .querySelector('.dnb-forms-field-block')
          .querySelectorAll('.dnb-form-status')
        expect(statusMessages).toHaveLength(3)
        expect(statusMessages[0]).toHaveTextContent('onChangeField-error')
        expect(statusMessages[1]).toHaveTextContent(
          'onChangeField-warning'
        )
        expect(statusMessages[2]).toHaveTextContent('onChangeForm-info')
      })
    })

    it('should fulfill async onChangeValidator before the form and field event', async () => {
      const onChangeForm: OnChange<{ myField: string }> = async ({
        myField,
      }) => {
        return {
          info: 'onChangeForm-info',
          error:
            myField === 'onChangeForm-error' &&
            Error('onChangeForm-error'),
        }
      }
      const onChangeField: OnChangeValue = async (value) => {
        return {
          warning: 'onChangeField-warning',
          error:
            value === 'onChangeField-error' &&
            Error('onChangeField-error'),
        }
      }
      const onChangeValidator = debounceAsync(async (value) => {
        if (value === 'invalid') {
          return Error('My error')
        }
      })

      render(
        <DataContext.Provider onChange={onChangeForm}>
          <Field.String
            label="My label"
            path="/myField"
            onChange={onChangeField}
            onChangeValidator={onChangeValidator}
          />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const input = document.querySelector('input')

      // Use fireEvent over userEvent, because of its sync nature
      fireEvent.change(input, {
        target: { value: 'invalid' },
      })

      await waitFor(() => {
        const statusMessages = document
          .querySelector('.dnb-forms-field-block')
          .querySelectorAll('.dnb-form-status')
        expect(statusMessages).toHaveLength(1)
        expect(statusMessages[0]).toHaveTextContent('My error')
      })

      // Use fireEvent over userEvent, because of its sync nature
      fireEvent.change(input, {
        target: { value: 'valid' },
      })

      await waitFor(() => {
        const statusMessages = document
          .querySelector('.dnb-forms-field-block')
          .querySelectorAll('.dnb-form-status')
        expect(statusMessages).toHaveLength(2)
        expect(statusMessages[0]).toHaveTextContent(
          'onChangeField-warning'
        )
        expect(statusMessages[1]).toHaveTextContent('onChangeForm-info')
      })
    })

    it('should show indicator during all async operations', async () => {
      const events = []

      const onChangeValidator = debounceAsync(async () => {
        await wait(101)
        events.push('onChangeValidator')
      })
      const onChangeForm: OnChange = async () => {
        await wait(102)
        events.push('onChangeForm')
      }
      const onChangeField: OnChangeValue = async () => {
        await wait(103)
        events.push('onChangeField')
      }

      render(
        <DataContext.Provider onChange={onChangeForm}>
          <Field.String
            label="My label"
            path="/myField"
            onChange={onChangeField}
            onChangeValidator={onChangeValidator}
          />
        </DataContext.Provider>
      )

      const input = document.querySelector('input')
      const indicator = document.querySelector(
        '.dnb-forms-submit-indicator'
      )

      await userEvent.type(input, '123')

      await waitFor(() => {
        expect(events).toEqual(['onChangeValidator'])
        expect(indicator).toHaveClass(
          'dnb-forms-submit-indicator--state-pending'
        )
      })

      await waitFor(() => {
        expect(events).toEqual(['onChangeValidator', 'onChangeForm'])
        expect(indicator).toHaveClass(
          'dnb-forms-submit-indicator--state-pending'
        )
      })

      await waitFor(() => {
        expect(events).toEqual([
          'onChangeValidator',
          'onChangeForm',
          'onChangeField',
        ])
        expect(indicator).toHaveClass(
          'dnb-forms-submit-indicator--state-complete'
        )
      })
    })
  })

  it('should scroll on top when "scrollTopOnSubmit" is true', async () => {
    const onSubmit: OnSubmit = jest.fn()
    const scrollTo = jest.fn()

    jest.spyOn(window, 'scrollTo').mockImplementation(scrollTo)

    const { rerender } = render(
      <DataContext.Provider
        data={{ foo: 'original' }}
        onSubmit={onSubmit}
        scrollTopOnSubmit
      >
        <Field.String path="/foo" value="Value" />
        <Form.SubmitButton />
      </DataContext.Provider>
    )

    const inputElement = document.querySelector('input')
    const submitButton = document.querySelector('button')

    fireEvent.change(inputElement, {
      target: { value: 'New Value' },
    })
    fireEvent.click(submitButton)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith(
      { foo: 'New Value' },
      expect.anything()
    )
    await waitFor(() => {
      expect(scrollTo).toHaveBeenCalledTimes(1)
    })

    rerender(
      <DataContext.Provider
        data={{ fooBar: 'changed' }}
        onSubmit={onSubmit}
        scrollTopOnSubmit
      >
        <Field.String path="/fooBar" value="Rerendered Value" />
        <Form.SubmitButton />
      </DataContext.Provider>
    )

    fireEvent.change(inputElement, {
      target: { value: 'Second Value' },
    })
    fireEvent.click(submitButton)

    expect(onSubmit).toHaveBeenCalledTimes(2)
    expect(onSubmit).toHaveBeenLastCalledWith(
      { fooBar: 'Second Value' },
      expect.anything()
    )
    await waitFor(() => {
      expect(scrollTo).toHaveBeenCalledTimes(2)
      expect(scrollTo).toHaveBeenLastCalledWith({
        behavior: 'smooth',
        top: 0,
      })
    })
  })

  describe('session storage', () => {
    it('should store data to session storage when sessionStorageId is provided, but only after changes', async () => {
      const setItem = jest.spyOn(
        Object.getPrototypeOf(window.sessionStorage),
        'setItem'
      )

      render(
        <DataContext.Provider
          defaultData={{ foo: 'original' }}
          sessionStorageId="test-data"
        >
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      await waitFor(() => {
        expect(setItem).not.toHaveBeenCalledWith(
          'test-data',
          JSON.stringify({
            foo: 'original123',
          })
        )
      })

      const inputElement = document.querySelector('input')
      await userEvent.type(inputElement, '123')

      await waitFor(() => {
        expect(setItem).toHaveBeenCalledWith(
          'test-data',
          JSON.stringify({
            foo: 'original1',
          })
        )
        expect(setItem).toHaveBeenCalledWith(
          'test-data',
          JSON.stringify({
            foo: 'original12',
          })
        )
        expect(setItem).toHaveBeenCalledWith(
          'test-data',
          JSON.stringify({
            foo: 'original123',
          })
        )
      })

      setItem.mockRestore()
    })

    it('should set initial data to data from session storage when sessionStorageId is provided', () => {
      window.sessionStorage.setItem(
        'sourcedata',
        JSON.stringify({
          lorem: 'Ipsum',
        })
      )

      render(
        <DataContext.Provider sessionStorageId="sourcedata">
          <Field.String path="/lorem" />
        </DataContext.Provider>
      )

      expect(screen.getByDisplayValue('Ipsum')).toBeInTheDocument()
    })

    it('should throw when both data and sessionStorageId is provided', () => {
      const log = jest.spyOn(global.console, 'error').mockImplementation()

      expect(() => {
        render(
          <DataContext.Provider
            data={{ foo: 'original' }}
            sessionStorageId="test-data"
          >
            <Field.String path="/foo" />
          </DataContext.Provider>
        )
      }).toThrow(
        'Use "defaultData" instead of "data" when using sessionStorageId'
      )

      log.mockRestore()
    })
  })

  describe('error handling', () => {
    it('should show and hide error messages as expected', async () => {
      render(
        <DataContext.Provider>
          <Field.String
            label="Field 1"
            path="/foo"
            errorMessages={{
              'Field.errorRequired': 'Required string',
            }}
            required
          />
          <Field.String
            label="Field 2"
            value="abc"
            minLength={5}
            errorMessages={{
              'StringField.errorMinLength': 'Min 5 chars',
            }}
          />
          <Field.Number
            label="Field 3"
            errorMessages={{
              'Field.errorRequired': 'Required number',
            }}
            required
          />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const submitButton = document.querySelector('button')
      const field2 = screen.queryByLabelText('Field 2')

      // Should not show any error messages before clicking submit when no fields has been touched
      expect(screen.queryAllByRole('alert').length).toEqual(0)

      expect(screen.queryByText('Required string')).not.toBeInTheDocument()
      expect(screen.queryByText('Min 5 chars')).not.toBeInTheDocument()
      expect(screen.queryByText('Required number')).not.toBeInTheDocument()

      fireEvent.click(submitButton)

      await waitFor(() => {
        // After clicking submit, all three fields should show errors
        expect(screen.queryAllByRole('alert').length).toEqual(3)

        expect(screen.getByText('Required string')).toBeInTheDocument()
        expect(screen.getByText('Min 5 chars')).toBeInTheDocument()
        expect(screen.getByText('Required number')).toBeInTheDocument()
      })

      // Writing in one field should remove that error, while keeping the others visible
      await act(async () => {
        await userEvent.type(field2, 'de')
      })

      expect(screen.queryAllByRole('alert').length).toEqual(2)

      expect(screen.getByText('Required string')).toBeInTheDocument()
      expect(screen.queryByText('Min 5 chars')).not.toBeInTheDocument()
      expect(screen.getByText('Required number')).toBeInTheDocument()
    })

    it('should show errors for fields with no path-prop after clicking submit', async () => {
      // Make sure it still sets internal showAllError states, even if there is no fields with path triggering it
      render(
        <DataContext.Provider>
          <Field.String required />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const submitButton = document.querySelector('button')
      fireEvent.click(submitButton)

      expect(screen.queryByRole('alert')).toBeInTheDocument()
    })

    describe('error messages', () => {
      it('should display custom pattern error message from provider', () => {
        render(
          <DataContext.Provider
            errorMessages={{
              'Field.errorPattern': 'Pattern provider error',
            }}
          >
            <Field.String
              path="/myKey"
              validateInitially
              pattern="^correct$"
              value="wrong"
            />
          </DataContext.Provider>
        )

        expect(screen.getByRole('alert')).toHaveTextContent(
          'Pattern provider error'
        )
      })

      it('should display custom pattern error message from provider with json pointer', () => {
        render(
          <DataContext.Provider
            errorMessages={{
              'Field.errorPattern': 'Pattern provider error',
              '/myKey': {
                'Field.errorPattern': 'Pattern provider myKey error',
              },
            }}
          >
            <Field.String
              path="/myKey"
              validateInitially
              pattern="^correct$"
              value="wrong"
            />
          </DataContext.Provider>
        )

        expect(screen.getByRole('alert')).toHaveTextContent(
          'Pattern provider myKey error'
        )
      })

      it('should display custom pattern error message from field', () => {
        render(
          <DataContext.Provider
            errorMessages={{
              'Field.errorPattern': 'Pattern provider error',
              '/myKey': {
                'Field.errorPattern': 'Pattern provider myKey error',
              },
            }}
          >
            <Field.String
              path="/myKey"
              validateInitially
              pattern="^correct$"
              value="wrong"
              errorMessages={{
                'Field.errorPattern': 'Pattern field error',
              }}
            />
          </DataContext.Provider>
        )

        expect(screen.getByRole('alert')).toHaveTextContent(
          'Pattern field error'
        )
      })

      it('should interact with GlobalStatus', async () => {
        jest.spyOn(window, 'scrollTo').mockImplementation()

        render(
          <>
            <GlobalStatus />
            <DataContext.Provider>
              <Field.String path="/myField" required minLength={5} />
              <Form.SubmitButton />
            </DataContext.Provider>
          </>
        )

        const input = document.querySelector('input')
        const submitButton = document.querySelector('button')

        expect(document.querySelector('.dnb-form-status')).toBeNull()
        expect(
          document.querySelector('.dnb-global-status__title')
        ).toBeNull()

        // Invoke the error
        await userEvent.type(input, 'x{Backspace}')
        fireEvent.blur(input)

        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(nb.Field.errorRequired)
        expect(
          document.querySelector('.dnb-global-status__title')
        ).toBeNull()

        fireEvent.click(submitButton)

        expect(
          document.querySelector('.dnb-global-status__title')
        ).toBeNull()

        await waitFor(() => {
          expect(
            document.querySelector('.dnb-global-status__title')
          ).toHaveTextContent(nb.Field.errorSummaryTitle)
        })

        await userEvent.type(input, 'foo')
        fireEvent.blur(input)

        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(
          nb.StringField.errorMinLength.replace('{minLength}', '5')
        )

        await waitFor(() => {
          simulateAnimationEnd()

          expect(
            document.querySelector('.dnb-global-status__title')
          ).toBeNull()
        })
      })

      it('should interact with GlobalStatus with unique "globalStatusId"', async () => {
        jest.spyOn(window, 'scrollTo').mockImplementation()

        render(
          <>
            <GlobalStatus id="my-status" />
            <DataContext.Provider globalStatusId="my-status">
              <Field.String path="/myField" required minLength={5} />
              <Form.SubmitButton />
            </DataContext.Provider>
          </>
        )

        const input = document.querySelector('input')
        const submitButton = document.querySelector('button')

        expect(document.querySelector('.dnb-form-status')).toBeNull()
        expect(
          document.querySelector('.dnb-global-status__title')
        ).toBeNull()

        // Invoke the error
        await userEvent.type(input, 'x{Backspace}')
        fireEvent.blur(input)

        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(nb.Field.errorRequired)
        expect(
          document.querySelector('.dnb-global-status__title')
        ).toBeNull()

        fireEvent.click(submitButton)

        expect(
          document.querySelector('.dnb-global-status__title')
        ).toBeNull()

        await waitFor(() => {
          expect(
            document.querySelector('.dnb-global-status__title')
          ).toHaveTextContent(nb.Field.errorSummaryTitle)
        })

        await userEvent.type(input, 'foo')
        fireEvent.blur(input)

        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(
          nb.StringField.errorMinLength.replace('{minLength}', '5')
        )

        await waitFor(() => {
          simulateAnimationEnd()

          expect(
            document.querySelector('.dnb-global-status__title')
          ).toBeNull()
        })
      })
    })

    describe('schema validation', () => {
      it('should show provider schema type error with path', async () => {
        const log = jest.spyOn(console, 'error').mockImplementation()

        const schema: JSONSchema = {
          type: 'object',
          properties: {
            myField: {
              type: 'number',
            },
          },
        }

        render(
          <DataContext.Provider
            schema={schema}
            data={{
              myField: 'invalid',
            }}
          >
            <TestField path="/myField" />
          </DataContext.Provider>
        )

        expect(screen.queryByRole('alert')).toBeInTheDocument()
        expect(screen.queryByRole('alert')).toHaveTextContent(
          'The field at path="/myField" value (invalid) type must be number'
        )

        expect(log).toHaveBeenCalledWith(
          'The field at path="/myField" value (invalid) type must be number'
        )

        log.mockRestore()
      })

      it('should handle errors when initial data is not given', async () => {
        const schema: JSONSchema = {
          type: 'object',
          properties: {
            myKey: {
              type: 'string',
              pattern: '^correct$',
            },
          },
          required: ['myKey'],
        }

        const { rerender } = render(
          <DataContext.Provider schema={schema} data={undefined}>
            <TestField path="/myKey" />
          </DataContext.Provider>
        )
        expect(screen.queryByRole('alert')).toBeInTheDocument()
        expect(screen.queryByRole('alert')).toHaveTextContent(
          nb.Field.errorRequired
        )

        rerender(
          <DataContext.Provider
            schema={schema}
            data={{ myKey: 'correct' }}
          >
            <TestField path="/myKey" />
          </DataContext.Provider>
        )
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()

        rerender(
          <DataContext.Provider schema={schema} data={{}}>
            <TestField path="/myKey" />
          </DataContext.Provider>
        )
        expect(screen.queryByRole('alert')).toBeInTheDocument()
        expect(screen.queryByRole('alert')).toHaveTextContent(
          nb.Field.errorRequired
        )

        rerender(
          <DataContext.Provider schema={schema} data={{ myKey: 'wrong' }}>
            <TestField path="/myKey" />
          </DataContext.Provider>
        )
        expect(screen.queryByRole('alert')).toBeInTheDocument()
        expect(screen.queryByRole('alert')).toHaveTextContent(
          'Verdien er ugyldig'
        )

        rerender(
          <DataContext.Provider
            schema={schema}
            data={{ myKey: 'correct' }}
          >
            <TestField path="/myKey" />
          </DataContext.Provider>
        )
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })

      it('should handle errors from inner components and outer provider interchangeably', () => {
        const schema: JSONSchema = {
          type: 'object',
          properties: {
            myKey: {
              type: 'string',
              pattern: '^(one|two|three)$',
            },
          },
        }
        const { rerender } = render(
          <DataContext.Provider schema={schema} data={{ myKey: 'one' }}>
            <TestField path="/myKey" />
          </DataContext.Provider>
        )
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()

        // Change value so field component and provider both have errors
        rerender(
          <DataContext.Provider
            schema={schema}
            data={{ myKey: 'fooooooooo' }}
          >
            <TestField path="/myKey" maxLength={5} />
          </DataContext.Provider>
        )
        expect(screen.queryByRole('alert')).toBeInTheDocument()

        // Change value so only provider has errors (ensuring removed field error does not remove provider error)
        rerender(
          <DataContext.Provider schema={schema} data={{ myKey: 'fooo' }}>
            <TestField path="/myKey" maxLength={5} />
          </DataContext.Provider>
        )
        expect(screen.queryByRole('alert')).toBeInTheDocument()

        // Change value so only field component has error
        rerender(
          <DataContext.Provider schema={schema} data={{ myKey: 'three' }}>
            <TestField path="/myKey" maxLength={1} />
          </DataContext.Provider>
        )
        expect(screen.queryByRole('alert')).toBeInTheDocument()

        // Change value back to one with no errors again
        rerender(
          <DataContext.Provider schema={schema} data={{ myKey: 'three' }}>
            <TestField path="/myKey" maxLength={5} />
          </DataContext.Provider>
        )
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })

      it('should show provided errorMessages based on outer schema validation with injected value', () => {
        const schema: JSONSchema = {
          type: 'object',
          properties: {
            val: {
              type: 'string',
              minLength: 7,
            },
          },
        }

        render(
          <DataContext.Provider schema={schema} data={{ val: 'abc' }}>
            <TestField
              path="/val"
              errorMessages={{
                'StringField.errorMinLength': 'Minimum {minLength} chars.',
              }}
            />
          </DataContext.Provider>
        )

        expect(screen.getByRole('alert')).toHaveTextContent(
          'Minimum 7 chars.'
        )
      })

      describe('disabled and readOnly', () => {
        it('should skip required validation on disabled fields', () => {
          const { rerender } = render(<TestField value="" required />)

          expect(screen.queryByRole('alert')).toBeInTheDocument()

          rerender(<TestField value="value" required disabled />)

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('should skip schema validation on disabled fields', () => {
          const schema: JSONSchema = {
            type: 'object',
            required: ['myField'],
          }

          const { rerender } = render(
            <DataContext.Provider schema={schema}>
              <TestField path="/myField" />
            </DataContext.Provider>
          )

          expect(screen.queryByRole('alert')).toBeInTheDocument()

          rerender(
            <DataContext.Provider schema={schema}>
              <TestField path="/myField" disabled />
            </DataContext.Provider>
          )

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('should skip required validation on readOnly fields', () => {
          const { rerender } = render(<TestField value="" required />)

          expect(screen.queryByRole('alert')).toBeInTheDocument()

          rerender(<TestField value="value" required readOnly />)

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('should skip schema validation on readOnly fields', () => {
          const schema: JSONSchema = {
            type: 'object',
            required: ['myField'],
          }

          const { rerender } = render(
            <DataContext.Provider schema={schema}>
              <TestField path="/myField" />
            </DataContext.Provider>
          )

          expect(screen.queryByRole('alert')).toBeInTheDocument()

          rerender(
            <DataContext.Provider schema={schema}>
              <TestField path="/myField" readOnly />
            </DataContext.Provider>
          )

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })
      })
    })

    it('should show default errorMessages based on outer schema validation with injected value', () => {
      const schema: JSONSchema = {
        type: 'object',
        properties: {
          val: {
            type: 'string',
            minLength: 486,
          },
        },
      }

      render(
        <DataContext.Provider schema={schema} data={{ val: 'abc' }}>
          <TestField path="/val" />
        </DataContext.Provider>
      )

      expect(
        screen.getByText(
          nb.StringField.errorMinLength.replace('{minLength}', '486')
        )
      ).toBeInTheDocument()
    })

    it('should call "onSubmitRequest" on invalid submit set by a schema', () => {
      const log = jest.spyOn(console, 'error').mockImplementation()

      const onSubmitRequest = jest.fn()

      const Schema: JSONSchema = {
        type: 'object',
        properties: {
          foo: { type: 'number', minimum: 3 },
        },
      }

      const { rerender } = render(
        <DataContext.Provider
          data={{ foo: 'original' }}
          onSubmitRequest={onSubmitRequest}
          schema={Schema}
        >
          <Field.Number path="/foo" />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      const inputElement = document.querySelector('input')
      const submitButton = document.querySelector('button')

      fireEvent.change(inputElement, {
        target: { value: '1' },
      })
      fireEvent.click(submitButton)

      expect(onSubmitRequest).toHaveBeenCalledTimes(1)
      expect(onSubmitRequest).toHaveBeenCalledWith()

      rerender(
        <DataContext.Provider
          data={{ foo: 'changed' }}
          onSubmitRequest={onSubmitRequest}
          schema={Schema}
        >
          <Field.Number path="/fooBar" required />
          <Form.SubmitButton />
        </DataContext.Provider>
      )

      fireEvent.click(submitButton)

      expect(onSubmitRequest).toHaveBeenCalledTimes(2)
      expect(onSubmitRequest).toHaveBeenLastCalledWith()

      expect(log).toHaveBeenNthCalledWith(
        1,
        'The field value (original) type must be number'
      )
      expect(log).toHaveBeenNthCalledWith(
        2,
        'The field at path="/foo" value (original) type must be number'
      )
      expect(log).toHaveBeenNthCalledWith(
        3,
        'The field at path="/foo" value (changed) type must be number'
      )

      log.mockRestore()
    })

    it('should revalidate with provided schema based on changes in external data using deprecated continuousValidation', () => {
      const log = jest.spyOn(console, 'error').mockImplementation()

      const schema: JSONSchema = {
        type: 'object',
        properties: {
          myKey: {
            type: 'string',
          },
        },
      }
      const validData = {
        myKey: 'some-value',
      }
      const invalidData = {
        myKey: 123,
      }
      const { rerender } = render(
        <DataContext.Provider schema={schema} data={validData}>
          <Field.String
            path="/myKey"
            validateInitially
            continuousValidation
          />
        </DataContext.Provider>
      )
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()

      rerender(
        <DataContext.Provider schema={schema} data={invalidData}>
          <Field.String
            path="/myKey"
            validateInitially
            continuousValidation
          />
        </DataContext.Provider>
      )

      expect(screen.queryByRole('alert')).toBeInTheDocument()

      rerender(
        <DataContext.Provider schema={schema} data={validData}>
          <Field.String
            path="/myKey"
            validateInitially
            continuousValidation
          />
        </DataContext.Provider>
      )

      expect(screen.queryByRole('alert')).not.toBeInTheDocument()

      log.mockRestore()
    })

    it('should revalidate correctly based on changes in provided schema using deprecated continuousValidation', () => {
      const log = jest.spyOn(console, 'error').mockImplementation()

      const schema1: JSONSchema = {
        type: 'object',
        properties: {
          myKey: {
            type: 'number',
          },
        },
      }
      const schema2: JSONSchema = {
        type: 'object',
        properties: {
          myKey: {
            type: 'string',
          },
        },
      }
      const data = {
        myKey: 'some-value',
      }
      const { rerender } = render(
        <DataContext.Provider schema={schema1} defaultData={data}>
          <Field.String
            path="/myKey"
            validateInitially
            continuousValidation
          />
        </DataContext.Provider>
      )
      expect(screen.queryByRole('alert')).toBeInTheDocument()
      expect(screen.queryByRole('alert')).toHaveTextContent(
        'The field at path="/myKey" value (some-value) type must be number'
      )

      rerender(
        <DataContext.Provider schema={schema2} defaultData={data}>
          <Field.String
            path="/myKey"
            validateInitially
            continuousValidation
          />
        </DataContext.Provider>
      )

      expect(screen.queryByRole('alert')).not.toBeInTheDocument()

      rerender(
        <DataContext.Provider schema={schema1} defaultData={data}>
          <Field.String
            path="/myKey"
            validateInitially
            continuousValidation
          />
        </DataContext.Provider>
      )

      expect(screen.queryByRole('alert')).toBeInTheDocument()

      log.mockRestore()
    })

    it('should revalidate with provided schema based on changes in external data', () => {
      const log = jest.spyOn(console, 'error').mockImplementation()

      const schema: JSONSchema = {
        type: 'object',
        properties: {
          myKey: {
            type: 'string',
          },
        },
      }
      const validData = {
        myKey: 'some-value',
      }
      const invalidData = {
        myKey: 123,
      }
      const { rerender } = render(
        <DataContext.Provider schema={schema} data={validData}>
          <Field.String
            path="/myKey"
            validateInitially
            validateContinuously
          />
        </DataContext.Provider>
      )
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()

      rerender(
        <DataContext.Provider schema={schema} data={invalidData}>
          <Field.String
            path="/myKey"
            validateInitially
            validateContinuously
          />
        </DataContext.Provider>
      )

      expect(screen.queryByRole('alert')).toBeInTheDocument()

      rerender(
        <DataContext.Provider schema={schema} data={validData}>
          <Field.String
            path="/myKey"
            validateInitially
            validateContinuously
          />
        </DataContext.Provider>
      )

      expect(screen.queryByRole('alert')).not.toBeInTheDocument()

      log.mockRestore()
    })

    it('should revalidate correctly based on changes in provided schema', () => {
      const log = jest.spyOn(console, 'error').mockImplementation()

      const schema1: JSONSchema = {
        type: 'object',
        properties: {
          myKey: {
            type: 'number',
          },
        },
      }
      const schema2: JSONSchema = {
        type: 'object',
        properties: {
          myKey: {
            type: 'string',
          },
        },
      }
      const data = {
        myKey: 'some-value',
      }
      const { rerender } = render(
        <DataContext.Provider schema={schema1} defaultData={data}>
          <Field.String
            path="/myKey"
            validateInitially
            validateContinuously
          />
        </DataContext.Provider>
      )
      expect(screen.queryByRole('alert')).toBeInTheDocument()
      expect(screen.queryByRole('alert')).toHaveTextContent(
        'The field at path="/myKey" value (some-value) type must be number'
      )

      rerender(
        <DataContext.Provider schema={schema2} defaultData={data}>
          <Field.String
            path="/myKey"
            validateInitially
            validateContinuously
          />
        </DataContext.Provider>
      )

      expect(screen.queryByRole('alert')).not.toBeInTheDocument()

      rerender(
        <DataContext.Provider schema={schema1} defaultData={data}>
          <Field.String
            path="/myKey"
            validateInitially
            validateContinuously
          />
        </DataContext.Provider>
      )

      expect(screen.queryByRole('alert')).toBeInTheDocument()

      log.mockRestore()
    })

    it('should accept custom ajv instance', async () => {
      const ajv = new Ajv({
        strict: true,
        allErrors: true,
      })

      ajv.addKeyword({
        keyword: 'isEven',
        validate: (schema: JSONSchema, value: string) => {
          return parseFloat(value) % 2 === 0
        },
      })

      const schema = {
        type: 'object',
        properties: {
          myKey: {
            type: 'string',
            isEven: true,
          },
        },
      } as const

      expect(ajv.validate(schema, { myKey: '1' })).toBe(false)

      render(
        <DataContext.Provider schema={schema} ajvInstance={ajv}>
          <Field.String
            path="/myKey"
            value="1"
            validateInitially
            validateContinuously
          />
        </DataContext.Provider>
      )

      expect(screen.queryByRole('alert')).toBeInTheDocument()

      await userEvent.type(screen.getByRole('textbox'), '{Backspace}2')

      expect(screen.queryByRole('alert')).toBeNull()
    })

    it('should display error message given in schema', async () => {
      const fieldSchema = {
        type: 'string',
        pattern: '[a-z]{1,}',
        errorMessage: 'message in field schema',
      } as const

      const { rerender } = render(
        <DataContext.Provider>
          <Field.String
            schema={fieldSchema}
            path="/myKey"
            value=""
            validateInitially
          />
        </DataContext.Provider>
      )

      expect(screen.queryByRole('alert')).toHaveTextContent(
        'message in field schema'
      )

      const providerSchema = {
        type: 'object',
        properties: {
          myKey: {
            type: 'string',
            pattern: '[a-z]{1,}',
            errorMessage: 'Message in provider schema',
          },
        },
      } as const

      rerender(
        <DataContext.Provider schema={providerSchema}>
          <Field.String path="/myKey" value="" validateInitially />
        </DataContext.Provider>
      )

      expect(screen.queryByRole('alert')).toHaveTextContent(
        'Message in provider schema'
      )

      const providerSharedSchema = {
        type: 'object',
        properties: {
          myKey: {
            type: 'string',
            minLength: 2,
            maxLength: 3,
            errorMessage: {
              minLength: 'minLength Message in provider schema',
              maxLength: 'maxLength Message in provider schema',
            },
          },
        },
      } as const

      rerender(
        <DataContext.Provider schema={providerSharedSchema}>
          <Field.String path="/myKey" value="" />
        </DataContext.Provider>
      )

      const input = document.querySelector('input')

      await userEvent.type(input, '1')
      fireEvent.blur(input)

      expect(screen.queryByRole('alert')).toHaveTextContent(
        'minLength Message in provider schema'
      )

      await userEvent.type(input, '1234')
      fireEvent.blur(input)

      expect(screen.queryByRole('alert')).toHaveTextContent(
        'maxLength Message in provider schema'
      )
    })

    it('should accept custom ajv instance with custom error messages', () => {
      const ajv = new Ajv({
        strict: true,
        allErrors: true,
      })

      ajv.addKeyword({
        keyword: 'notEmpty',
        validate: (schema: JSONSchema, value: string) => {
          return value.length > 0
        },
      })

      const schema = {
        type: 'string',
        notEmpty: true, // The value must be more than one character.
      } as const

      const { rerender } = render(
        <DataContext.Provider ajvInstance={ajv}>
          <Field.String
            schema={{ ...schema, errorMessage: 'Message in schema' }}
            path="/myKey"
            value=""
            validateInitially
          />
        </DataContext.Provider>
      )

      expect(screen.queryByRole('alert')).toHaveTextContent(
        'Message in schema'
      )

      rerender(
        <DataContext.Provider
          ajvInstance={ajv}
          errorMessages={{
            notEmpty: 'Message in provider',
          }}
        >
          <Field.String
            schema={{ ...schema, errorMessage: 'Message in schema' }}
            path="/myKey"
            value=""
            validateInitially
          />
        </DataContext.Provider>
      )

      expect(screen.queryByRole('alert')).toHaveTextContent(
        'Message in schema'
      )

      rerender(
        <DataContext.Provider
          ajvInstance={ajv}
          errorMessages={{
            notEmpty: 'Message in provider',
          }}
        >
          <Field.String
            schema={schema}
            path="/myKey"
            value=""
            validateInitially
          />
        </DataContext.Provider>
      )

      expect(screen.queryByRole('alert')).toHaveTextContent(
        'Message in provider'
      )

      rerender(
        <DataContext.Provider
          ajvInstance={ajv}
          errorMessages={{
            notEmpty: 'Message in provider',
            '/myKey': {
              notEmpty: 'Message in provider for just one field',
            },
          }}
        >
          <Field.String
            schema={schema}
            path="/myKey"
            value=""
            validateInitially
          />
        </DataContext.Provider>
      )

      expect(screen.queryByRole('alert')).toHaveTextContent(
        'Message in provider for just one field'
      )

      rerender(
        <DataContext.Provider
          ajvInstance={ajv}
          errorMessages={{
            notEmpty: 'Message in provider',
            '/myKey': {
              notEmpty: 'Message in provider for just one field',
            },
          }}
        >
          <Field.String
            schema={schema}
            path="/myKey"
            value=""
            validateInitially
            errorMessages={{ notEmpty: 'Message for just this field' }}
          />
        </DataContext.Provider>
      )

      expect(screen.queryByRole('alert')).toHaveTextContent(
        'Message for just this field'
      )
    })

    it('should support locale in errorMessages', () => {
      const errorRequired = 'Display me, instead of the default message'

      render(
        <Form.Handler
          locale="en-GB"
          errorMessages={{
            'en-GB': {
              'Field.errorRequired': errorRequired,
            },
          }}
        >
          <Field.String required validateInitially />
        </Form.Handler>
      )

      expect(screen.queryByRole('alert')).toHaveTextContent(errorRequired)
    })

    it('should support locale in errorMessages when locale is given by the shared Provider', () => {
      const errorRequired = 'Display me, instead of the default message'

      render(
        <SharedProvider locale="en-GB">
          <Form.Handler
            errorMessages={{
              'en-GB': {
                'Field.errorRequired': errorRequired,
              },
            }}
          >
            <Field.String required validateInitially />
          </Form.Handler>
        </SharedProvider>
      )

      expect(screen.queryByRole('alert')).toHaveTextContent(errorRequired)
    })
  })

  it('should run filterData with correct data in onSubmit', () => {
    const id = 'disabled-fields'
    const filterDataHandler = jest.fn(({ props }) => {
      if (props.disabled === true) {
        return false
      }
    })
    let filteredData = undefined
    const onSubmit: OnSubmit = jest.fn((data, { filterData }) => {
      filteredData = filterData(filterDataHandler)
    })

    const { rerender } = render(
      <Form.Handler id={id} onSubmit={onSubmit}>
        <Field.String path="/myField" disabled={true} value="foo" />
      </Form.Handler>
    )

    const form = document.querySelector('form')
    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenLastCalledWith(
      { myField: 'foo' },
      expect.anything()
    )
    expect(filterDataHandler).toHaveBeenCalledTimes(1)
    expect(filterDataHandler).toHaveBeenLastCalledWith({
      path: '/myField',
      value: 'foo',
      displayValue: 'foo',
      label: undefined,
      data: {
        myField: 'foo',
      },
      props: expect.objectContaining({
        disabled: true,
      }),
      internal: {
        error: undefined,
      },
    })
    expect(filteredData).toEqual({})

    rerender(
      <Form.Handler id={id} onSubmit={onSubmit}>
        <Field.String path="/myField" disabled={false} value="bar" />
      </Form.Handler>
    )

    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenCalledTimes(2)
    expect(onSubmit).toHaveBeenLastCalledWith(
      { myField: 'bar' },
      expect.anything()
    )
    expect(filterDataHandler).toHaveBeenCalledTimes(2)
    expect(filterDataHandler).toHaveBeenLastCalledWith({
      path: '/myField',
      value: 'bar',
      displayValue: 'bar',
      label: undefined,
      data: {
        myField: 'bar',
      },
      props: expect.objectContaining({
        disabled: false,
      }),
      internal: {
        error: undefined,
      },
    })
    expect(filteredData).toEqual({
      myField: 'bar',
    })
  })

  it('should only render once', () => {
    const countRendered = jest.fn()

    const NestedMock = () => {
      const dataContext = useContext(DataContext.Context)
      countRendered(dataContext.data)
      return <></>
    }

    render(
      <DataContext.Provider data={{ foo: 'bar' }}>
        <NestedMock />
      </DataContext.Provider>
    )

    expect(countRendered).toHaveBeenCalledTimes(1)
    expect(countRendered).toHaveBeenLastCalledWith({ foo: 'bar' })
  })

  describe('with useData', () => {
    it('should set Provider data', () => {
      const props = { foo: 'bar' }
      renderHook(() => Form.useData(identifier, props))

      render(
        <DataContext.Provider id={identifier}>
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      const inputElement = document.querySelector('input')
      expect(inputElement).toHaveValue('bar')
    })

    it('should contain data on first render, when nested', () => {
      const initialData = { foo: 'bar' }
      const nestedMockData = []

      const NestedMock = () => {
        const { data } = Form.useData(identifier)
        nestedMockData.push(data)
        return <Field.String path="/foo" />
      }

      render(
        <DataContext.Provider id={identifier} data={initialData}>
          <NestedMock />
        </DataContext.Provider>
      )

      expect(nestedMockData).toHaveLength(2)
      expect(nestedMockData).toEqual([initialData, initialData])

      const inputElement = document.querySelector('input')
      expect(inputElement).toHaveValue('bar')
    })

    it('should contain data on first render, when nested and in side car', () => {
      const log = spyOnEufemiaWarn()

      const initialData = { foo: 'bar' }
      const sidecarMockData = []
      const nestedMockData = []

      const SidecarMock = () => {
        const { data } = Form.useData(identifier)
        sidecarMockData.push(data)
        return <Field.String path="/foo" />
      }

      const NestedMock = () => {
        const { data } = Form.useData(identifier)
        nestedMockData.push(data)
        return <Field.String path="/foo" />
      }

      render(
        <>
          <SidecarMock />
          <DataContext.Provider id={identifier} data={initialData}>
            <NestedMock />
          </DataContext.Provider>
        </>
      )

      expect(sidecarMockData).toHaveLength(2)
      expect(sidecarMockData).toEqual([undefined, initialData])

      expect(nestedMockData).toHaveLength(2)
      expect(nestedMockData).toEqual([initialData, initialData])

      const [sidecar, nested] = Array.from(
        document.querySelectorAll('input')
      )
      expect(sidecar).toHaveValue('') // Because the field is outside of the context
      expect(nested).toHaveValue('bar')

      log.mockRestore()
    })

    it('should be able to update data from side car', async () => {
      const sidecarMockData = []
      const nestedMockData = []

      const SidecarMock = () => {
        const { data, update } = Form.useData(identifier)

        useEffect(() => {
          update('/fieldA', () => 'updated A')
          update('/fieldB', () => 'updated B')
        }, [update])

        sidecarMockData.push(data)
        return null
      }

      const NestedMock = () => {
        const { data } = Form.useData(identifier)
        nestedMockData.push(data)
        return <Field.String path="/fieldB" />
      }

      render(
        <>
          <SidecarMock />
          <DataContext.Provider id={identifier}>
            <Field.String path="/fieldA" />
            <NestedMock />
          </DataContext.Provider>
        </>
      )

      expect(sidecarMockData).toHaveLength(3)
      expect(sidecarMockData).toEqual([
        undefined,
        { fieldA: 'updated A', fieldB: 'updated B' },
        { fieldA: 'updated A', fieldB: 'updated B' },
      ])

      expect(nestedMockData).toHaveLength(3)
      expect(nestedMockData).toEqual([
        undefined,
        { fieldA: 'updated A', fieldB: 'updated B' },
        { fieldA: 'updated A', fieldB: 'updated B' },
      ])

      const [sidecar, nested] = Array.from(
        document.querySelectorAll('input')
      )

      expect(sidecar).toHaveValue('updated A')
      expect(nested).toHaveValue('updated B')
    })

    it('should support StrictMode', async () => {
      const log = spyOnEufemiaWarn()

      const initialData = { foo: 'bar' }
      const sidecarMockData = []
      const nestedMockData = []

      const SidecarMock = () => {
        const { data } = Form.useData(identifier)
        sidecarMockData.push(data)
        return <Field.String path="/foo" />
      }

      const NestedMock = () => {
        const { data } = Form.useData(identifier)
        nestedMockData.push(data)
        return <Field.String path="/foo" />
      }

      render(
        <>
          <SidecarMock />
          <DataContext.Provider id={identifier} data={initialData}>
            <NestedMock />
          </DataContext.Provider>
        </>,
        { wrapper: StrictMode }
      )

      expect(sidecarMockData).toHaveLength(4)
      expect(sidecarMockData).toEqual([
        undefined,
        undefined,
        initialData,
        initialData,
      ])

      expect(nestedMockData).toHaveLength(4)
      expect(nestedMockData).toEqual([
        initialData,
        initialData,
        initialData,
        initialData,
      ])

      const [sidecar, nested] = Array.from(
        document.querySelectorAll('input')
      )
      expect(sidecar).toHaveValue('') // Because the field is outside of the context
      expect(nested).toHaveValue('bar')

      log.mockRestore()
    })

    it('should set Provider data when sessionStorageId was given', () => {
      window.sessionStorage.setItem(
        'session-id',
        JSON.stringify({
          foo: 'bar',
        })
      )

      render(
        <DataContext.Provider
          id={identifier}
          sessionStorageId="session-id"
        >
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      const { result } = renderHook(() =>
        Form.useData(identifier, { other: 'value' })
      )

      const inputElement = document.querySelector('input')
      expect(inputElement).toHaveValue('bar')

      expect(result.current.data).toEqual({ foo: 'bar', other: 'value' })
      expect(window.sessionStorage.getItem('session-id')).toBe(
        '{"foo":"bar"}'
      )
    })

    it('should update Provider data on hook "set" call', () => {
      const { result } = renderHook(() =>
        Form.useData(identifier, { foo: 'bar' })
      )

      render(
        <DataContext.Provider id={identifier}>
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      const inputElement = document.querySelector('input')

      expect(inputElement).toHaveValue('bar')

      act(() => {
        result.current.set({ foo: 'bar-changed' })
      })

      expect(inputElement).toHaveValue('bar-changed')
    })

    it('should merge data when Provider has data', () => {
      renderHook(() => Form.useData(identifier, { foo: 'changed' }))

      render(
        <DataContext.Provider
          id={identifier}
          data={{ foo: 'has data', other: 'data' }}
        >
          <Field.String path="/foo" />
          <Field.String path="/other" />
        </DataContext.Provider>
      )

      const [foo, other] = Array.from(document.querySelectorAll('input'))

      expect(foo).toHaveValue('changed')
      expect(other).toHaveValue('data')
    })

    it('should use data only from the first hook render', () => {
      const { result } = renderHook(() =>
        Form.useData(identifier, { foo: 'first data set' })
      )

      render(
        <DataContext.Provider
          id={identifier}
          data={{ foo: 'has data', other: 'data' }}
        >
          <Field.String path="/foo" />
          <Field.String path="/other" />
        </DataContext.Provider>
      )

      renderHook(() => Form.useData(identifier, { foo: 'changed' }))

      const [first, second] = Array.from(
        document.querySelectorAll('input')
      )

      expect(first).toHaveValue('first data set')

      act(() => {
        result.current.set({ foo: 'changed' })
      })

      expect(first).toHaveValue('changed')
      expect(second).toHaveValue('data')
    })

    it('should initially set data when Provider has no data', () => {
      renderHook(() => Form.useData(identifier, { foo: 'bar' }))

      const { rerender } = render(
        <DataContext.Provider id={identifier}>
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      const inputElement = document.querySelector('input')

      expect(inputElement).toHaveValue('bar')

      rerender(
        <DataContext.Provider id={identifier} data={{ foo: 'changed' }}>
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      expect(inputElement).toHaveValue('changed')
    })

    it('should return "update" method that lets you update the data', () => {
      const { result } = renderHook(() =>
        Form.useData(identifier, { foo: 'bar' })
      )
      const { update } = result.current

      render(
        <DataContext.Provider id={identifier}>
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      const inputElement = document.querySelector('input')

      expect(inputElement).toHaveValue('bar')

      act(() => {
        update('/foo', (value) => {
          return 'foo ' + value
        })
      })

      expect(inputElement).toHaveValue('foo bar')
    })

    it('should return "set" method that lets you update the data', () => {
      const { result } = renderHook(() =>
        Form.useData(identifier, { foo: 'bar' })
      )
      const { set } = result.current

      render(
        <DataContext.Provider id={identifier}>
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      const inputElement = document.querySelector('input')

      expect(inputElement).toHaveValue('bar')

      act(() => {
        set({ foo: 'foo bar' })
      })

      expect(inputElement).toHaveValue('foo bar')
    })

    it('should initial data via the "set" method', () => {
      const { result } = renderHook(() => Form.useData(identifier))
      const { set } = result.current

      render(
        <DataContext.Provider id={identifier}>
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      const inputElement = document.querySelector('input')

      expect(inputElement).toHaveValue('')

      act(() => {
        set({ foo: 'bar' })
      })

      expect(inputElement).toHaveValue('bar')
    })

    it('should rerender provider and its contents', () => {
      const existingData = { count: 1 }

      let countRender = 0

      const MockComponent = () => {
        const { data, update } = Form.useData(identifier, existingData)

        const increment = React.useCallback(() => {
          update('/count', (count) => {
            return count + 1
          })
        }, [update])

        countRender++

        return (
          <DataContext.Provider id={identifier}>
            <Field.Number path="/count" />
            <Form.SubmitButton onClick={increment} text={data.count} />
          </DataContext.Provider>
        )
      }

      const { rerender } = render(<MockComponent />)

      const inputElement = document.querySelector('input')
      const buttonElement = document.querySelector('button')

      expect(inputElement).toHaveValue('1')
      expect(buttonElement).toHaveTextContent('1')
      expect(countRender).toBe(1)

      fireEvent.click(document.querySelector('.dnb-forms-submit-button'))

      expect(inputElement).toHaveValue('2')
      expect(buttonElement).toHaveTextContent('2')
      expect(countRender).toBe(2)

      rerender(<MockComponent />)

      fireEvent.click(document.querySelector('.dnb-forms-submit-button'))

      expect(inputElement).toHaveValue('3')
      expect(buttonElement).toHaveTextContent('3')
      expect(countRender).toBe(4)
    })

    it('should not get overwritten by a Provider rerender', () => {
      let countRender = 0

      const MockComponent = () => {
        const { data, set } = Form.useData<{ count: number }>(identifier, {
          count: 1,
        })

        const increment = React.useCallback(() => {
          set({ count: data?.count + 1 })
        }, [data.count, set])

        countRender++

        return (
          <DataContext.Provider id={identifier} data={{ count: 0 }}>
            <Field.Number path="/count" />
            <Form.SubmitButton onClick={increment} text={data?.count} />
          </DataContext.Provider>
        )
      }

      const { rerender } = render(<MockComponent />)

      const inputElement = document.querySelector('input')
      const buttonElement = document.querySelector('button')

      expect(inputElement).toHaveValue('1')
      expect(buttonElement).toHaveTextContent('1')
      expect(countRender).toBe(1)

      fireEvent.click(document.querySelector('.dnb-forms-submit-button'))

      expect(inputElement).toHaveValue('2')
      expect(buttonElement).toHaveTextContent('2')
      expect(countRender).toBe(2)

      rerender(<MockComponent />)

      fireEvent.click(document.querySelector('.dnb-forms-submit-button'))

      expect(inputElement).toHaveValue('3')
      expect(buttonElement).toHaveTextContent('3')
      expect(countRender).toBe(4)
    })

    it('should return data given in the context provider after a rerender', () => {
      let countRender = 0

      const MockComponent = () => {
        const { data, update } = Form.useData<{ count: number }>(
          identifier
        )

        const increment = React.useCallback(() => {
          update('/count', (count) => {
            return count + 1
          })
        }, [update])

        countRender++

        return (
          <DataContext.Provider id={identifier} data={{ count: 1 }}>
            <Field.Number path="/count" />
            <Form.SubmitButton onClick={increment} text={data?.count} />
          </DataContext.Provider>
        )
      }

      render(<MockComponent />)

      const inputElement = document.querySelector('input')
      const buttonElement = document.querySelector('button')

      expect(inputElement).toHaveValue('1')
      expect(buttonElement).toHaveTextContent('1')
      expect(countRender).toBe(2)

      fireEvent.click(document.querySelector('.dnb-forms-submit-button'))

      expect(inputElement).toHaveValue('2')
      expect(buttonElement).toHaveTextContent('2')
      expect(countRender).toBe(3)
    })

    it('should update data via useEffect when data is given in useData', () => {
      let countRender = 0

      const MockComponent = () => {
        const { data, update } = Form.useData(identifier, { count: 1 })

        React.useEffect(() => {
          update('/count', (count) => count + 1)
        }, [update])

        countRender++

        return (
          <DataContext.Provider id={identifier}>
            <Field.Number path="/count" label={data?.count} />
          </DataContext.Provider>
        )
      }

      render(<MockComponent />)

      const inputElement = document.querySelector('input')
      const labelElement = document.querySelector('label')

      expect(inputElement).toHaveValue('2')
      expect(labelElement).toHaveTextContent('2')
      expect(countRender).toBe(2)
    })

    it('should update data via useEffect when data is given in the context provider', async () => {
      let countRender = 0
      const initialData = { count: 1 }

      const MockComponent = () => {
        const { data, update } = Form.useData<{ count: number }>(
          identifier
        )

        React.useEffect(() => {
          update('/count', () => 123)
        }, [update])

        countRender++

        return (
          <DataContext.Provider id={identifier} data={initialData}>
            <Field.Number path="/count" label={data?.count} />
          </DataContext.Provider>
        )
      }

      render(<MockComponent />)

      const inputElement = document.querySelector('input')
      const labelElement = document.querySelector('label')

      expect(inputElement).toHaveValue('123')
      expect(labelElement).toHaveTextContent('123')
      expect(countRender).toBe(3)
    })

    it('should return unvalidated data in sync', async () => {
      const initialData = { count: 1 }

      const onDataChange = jest.fn()

      const onChange = jest.fn(async () => {
        await wait(10)
      })

      const onChangeValidator = jest.fn(async (value) => {
        await wait(10)
        if (value !== 123) {
          return new Error('Invalid')
        }
      })

      const MockComponent = () => {
        const { data } = Form.useData<{ count: number }>(identifier)

        onDataChange(data)

        return (
          <DataContext.Provider id={identifier} data={initialData}>
            <Field.Number
              path="/count"
              label={data?.count}
              onChange={onChange}
              onChangeValidator={onChangeValidator}
            />
            <output>{JSON.stringify(data)}</output>
          </DataContext.Provider>
        )
      }

      render(<MockComponent />)

      const input = document.querySelector('input')
      const output = document.querySelector('output')

      expect(output).toHaveTextContent('{"count":1}')

      fireEvent.change(input, {
        target: { value: '12' },
      })

      expect(output).toHaveTextContent('{"count":12}')

      // executed in sync and unvalidated
      expect(onDataChange).toHaveBeenCalledTimes(3)
      expect(onDataChange).toHaveBeenLastCalledWith({ count: 12 })

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledTimes(0)
        expect(onChangeValidator).toHaveBeenCalledTimes(1)
        expect(onChangeValidator).toHaveBeenLastCalledWith(
          12,
          expect.anything()
        )
      })

      fireEvent.change(input, {
        target: { value: '123' },
      })

      expect(output).toHaveTextContent('{"count":123}')

      expect(onChange).toHaveBeenCalledTimes(0)
      expect(onChange).toHaveBeenCalledTimes(0)
      expect(onChangeValidator).toHaveBeenCalledTimes(2)
      expect(onChangeValidator).toHaveBeenLastCalledWith(
        123,
        expect.anything()
      )

      // executed in sync and unvalidated
      expect(onDataChange).toHaveBeenCalledTimes(4)
      expect(onDataChange).toHaveBeenLastCalledWith({ count: 123 })

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange).toHaveBeenLastCalledWith(123)

        expect(onChangeValidator).toHaveBeenCalledTimes(2)
        expect(onChangeValidator).toHaveBeenLastCalledWith(
          123,
          expect.anything()
        )
      })
    })

    it('should make filterData available in the hook', () => {
      const id = 'disabled-fields-hook'
      const filterDataHandler = jest.fn(({ props }) => {
        if (props.disabled === true) {
          return false
        }
      })
      let filteredData = undefined
      const onSubmit: OnSubmit = jest.fn((data, { filterData }) => {
        filteredData = filterData(filterDataHandler)
      })

      const { result } = renderHook((props = { myField: 'foo' }) =>
        Form.useData(id, props)
      )

      const { rerender } = render(
        <Form.Handler id={id} onSubmit={onSubmit}>
          <Field.String path="/myField" disabled={true} />
        </Form.Handler>
      )

      const form = document.querySelector('form')
      fireEvent.submit(form)

      expect(result.current).toEqual({
        data: { myField: 'foo' },
        reduceToVisibleFields: expect.any(Function),
        filterData: expect.any(Function),
        getValue: expect.any(Function),
        update: expect.any(Function),
        remove: expect.any(Function),
        set: expect.any(Function),
      })
      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenLastCalledWith(
        { myField: 'foo' },
        expect.anything()
      )
      expect(filterDataHandler).toHaveBeenCalledTimes(1)
      expect(filterDataHandler).toHaveBeenLastCalledWith({
        path: '/myField',
        value: 'foo',
        displayValue: 'foo',
        label: undefined,
        data: {
          myField: 'foo',
        },
        props: expect.objectContaining({
          disabled: true,
        }),
        internal: {
          error: undefined,
        },
      })
      expect(filteredData).toEqual({})

      act(() => {
        result.current.set({ myField: 'bar' })
      })

      rerender(
        <Form.Handler id={id} onSubmit={onSubmit}>
          <Field.String path="/myField" disabled={false} />
        </Form.Handler>
      )

      fireEvent.submit(form)

      expect(result.current).toEqual({
        data: { myField: 'bar' },
        reduceToVisibleFields: expect.any(Function),
        filterData: expect.any(Function),
        getValue: expect.any(Function),
        update: expect.any(Function),
        remove: expect.any(Function),
        set: expect.any(Function),
      })
      expect(onSubmit).toHaveBeenCalledTimes(2)
      expect(onSubmit).toHaveBeenLastCalledWith(
        { myField: 'bar' },
        expect.anything()
      )
      expect(filterDataHandler).toHaveBeenCalledTimes(2)
      expect(filterDataHandler).toHaveBeenLastCalledWith({
        path: '/myField',
        value: 'bar',
        displayValue: 'bar',
        label: undefined,
        data: {
          myField: 'bar',
        },
        props: expect.objectContaining({
          disabled: false,
        }),
        internal: {
          error: undefined,
        },
      })
      expect(filteredData).toEqual({
        myField: 'bar',
      })

      rerender(
        <Form.Handler id={id} onSubmit={onSubmit}>
          <Field.String path="/myField" disabled={true} />
        </Form.Handler>
      )

      expect(result.current.data).toEqual({
        myField: 'bar',
      })
      expect(result.current.filterData(filterDataHandler)).toEqual({})
      expect(filterDataHandler).toHaveBeenCalledTimes(3)
      expect(filterDataHandler).toHaveBeenLastCalledWith({
        path: '/myField',
        value: 'bar',
        displayValue: 'bar',
        label: undefined,
        data: {
          myField: 'bar',
        },
        props: expect.objectContaining({
          disabled: true,
        }),
        internal: {
          error: undefined,
        },
      })
      expect(filteredData).toEqual({ myField: 'bar' })
    })

    describe('context support without id', () => {
      const MockComponent = ({
        setData = null,
        updatePath = null,
        updateValue = null,
      } = {}) => {
        const { data, set, update } = Form.useData()

        useEffect(() => {
          if (setData) {
            set(setData)
          }
        }, [setData, set])

        useEffect(() => {
          if (updateValue) {
            update(updatePath, () => updateValue)
          }
        }, [updateValue, set, update, updatePath])

        return <output>{JSON.stringify(data)}</output>
      }

      it('should return data from context', () => {
        render(
          <DataContext.Provider data={{ foo: 'bar' }}>
            <MockComponent />
          </DataContext.Provider>
        )

        const output = document.querySelector('output')
        expect(output).toHaveTextContent('{"foo":"bar"}')
      })

      it('should set data to context', () => {
        const data = { foo: 'bar' }
        const { rerender } = render(
          <DataContext.Provider data={data}>
            <MockComponent />
          </DataContext.Provider>
        )

        const output = document.querySelector('output')
        expect(output).toHaveTextContent('{"foo":"bar"}')

        rerender(
          <DataContext.Provider data={data}>
            <MockComponent
              setData={{
                foo: 'changed',
              }}
            />
          </DataContext.Provider>
        )

        expect(output).toHaveTextContent('{"foo":"changed"}')
      })

      it('should update data to context', () => {
        const data = { foo: 'bar' }
        const { rerender } = render(
          <DataContext.Provider data={data}>
            <MockComponent />
          </DataContext.Provider>
        )

        const output = document.querySelector('output')
        expect(output).toHaveTextContent('{"foo":"bar"}')

        rerender(
          <DataContext.Provider data={data}>
            <MockComponent updatePath="/foo" updateValue="changed" />
          </DataContext.Provider>
        )

        expect(output).toHaveTextContent('{"foo":"changed"}')
      })

      it('should provide filterData handler', () => {
        const filterDataHandler = jest.fn(({ props }) => {
          if (props.disabled === true) {
            return false
          }
        })

        const MockComponent = () => {
          const { filterData } = Form.useData()

          const data = filterData(filterDataHandler)

          return <output>{JSON.stringify(data)}</output>
        }

        render(
          <Form.Handler>
            <Field.String path="/foo" value="foo" disabled />
            <Field.String path="/bar" value="baz" />
            <MockComponent />
          </Form.Handler>
        )

        const output = document.querySelector('output')
        expect(output).toHaveTextContent('{"bar":"baz"}')
      })
    })
  })

  describe('required={false}', () => {
    it('should add optional label', () => {
      const { rerender } = render(
        <DataContext.Provider required>
          <Field.String label="Foo" />
          <Field.String label="Bar" required={false} />
          <Field.String label="Baz" />
        </DataContext.Provider>
      )

      const [first, second, third] = Array.from(
        document.querySelectorAll('label')
      )

      expect(first).toHaveTextContent('Foo')
      expect(second).toHaveTextContent(
        `Bar ${nb.Field.optionalLabelSuffix}`
      )
      expect(third).toHaveTextContent('Baz')

      rerender(
        <DataContext.Provider required>
          <Field.String label="Foo" required={false} />
          <Field.String label="Bar" />
          <Field.String label="Baz" required={false} />
        </DataContext.Provider>
      )

      expect(first).toHaveTextContent(
        `Foo ${nb.Field.optionalLabelSuffix}`
      )
      expect(second).toHaveTextContent('Bar')
      expect(third).toHaveTextContent(
        `Baz ${nb.Field.optionalLabelSuffix}`
      )
    })

    it('should prioritize labelSuffix over optionalLabel', () => {
      render(
        <DataContext.Provider required>
          <Field.Email
            label="e-post"
            required={false}
            labelSuffix="(suffix)"
          />
        </DataContext.Provider>
      )

      const labelElement = document.querySelector('label')
      expect(labelElement.textContent).toBe('e-post (suffix)')
    })

    it('should hide labelSuffix with empty string', () => {
      render(
        <DataContext.Provider required>
          <Field.Email label="e-post" required={false} labelSuffix="" />
        </DataContext.Provider>
      )

      const labelElement = document.querySelector('label')
      expect(labelElement.textContent).toBe('e-post')
    })

    it('should support translations', () => {
      render(
        <DataContext.Provider
          required
          translations={{
            'nb-NO': {
              Field: {
                optionalLabelSuffix: '(recommended)',
              },
            },
          }}
        >
          <Field.String label="Foo" />
          <Field.String label="Bar" required={false} />
          <Field.String label="Baz" />
        </DataContext.Provider>
      )

      const [first, second, third] = Array.from(
        document.querySelectorAll('label')
      )

      expect(first).toHaveTextContent('Foo')
      expect(second).toHaveTextContent('Bar (recommended)')
      expect(third).toHaveTextContent('Baz')
    })
  })

  describe('required', () => {
    it('should make all fields required', () => {
      const { rerender } = render(
        <DataContext.Provider required data={{ foo: 'original' }}>
          <Field.String path="/foo" value="foo" />
          <Field.String path="/bar" value="bar" />
          <Field.String path="/baz" value="baz" />
        </DataContext.Provider>
      )

      const [first, second, third] = Array.from(
        document.querySelectorAll('input')
      )
      expect(first).toHaveAttribute('aria-required', 'true')
      expect(second).toHaveAttribute('aria-required', 'true')
      expect(third).toHaveAttribute('aria-required', 'true')

      rerender(
        <DataContext.Provider data={{ foo: 'changed' }}>
          <Field.String path="/foo" value="foo" />
          <Field.String path="/bar" value="bar" />
          <Field.String path="/baz" value="baz" />
        </DataContext.Provider>
      )

      expect(first).not.toHaveAttribute('aria-required')
      expect(second).not.toHaveAttribute('aria-required')
      expect(third).not.toHaveAttribute('aria-required')
    })

    it('should make individual fields optional when required is false', () => {
      render(
        <DataContext.Provider required data={{ foo: 'original' }}>
          <Field.String path="/foo" value="foo" />
          <Field.String path="/bar" value="bar" required={false} />
          <Field.String path="/baz" value="baz" />
        </DataContext.Provider>
      )

      const [first, second, third] = Array.from(
        document.querySelectorAll('input')
      )
      expect(first).toHaveAttribute('aria-required', 'true')
      expect(second).not.toHaveAttribute('aria-required')
      expect(third).toHaveAttribute('aria-required', 'true')
    })

    it('should not override the required prop', () => {
      render(
        <DataContext.Provider required={false} data={{ foo: 'original' }}>
          <Field.String path="/foo" value="foo" />
          <Field.String path="/bar" value="bar" required />
          <Field.String path="/baz" value="baz" />
        </DataContext.Provider>
      )

      const [first, second, third] = Array.from(
        document.querySelectorAll('input')
      )
      expect(first).not.toHaveAttribute('aria-required', 'true')
      expect(second).toHaveAttribute('aria-required', 'true')
      expect(third).not.toHaveAttribute('aria-required', 'true')
    })
  })

  it('should transform a field value with "transformIn"', async () => {
    let submitData = null
    let changeData = null

    const onSubmit = jest.fn((data) => {
      submitData = data
    })
    const onChange = jest.fn((data) => {
      changeData = data
    })

    const transformIn = jest.fn(({ path, value }) => {
      if (path === '/foo' && value === 'foo') {
        return 'transformed'
      }
      return value
    })

    render(
      <Form.Handler
        onSubmit={onSubmit}
        onChange={onChange}
        transformIn={transformIn}
      >
        <Field.String path="/foo" defaultValue="foo" />
        <Field.String path="/myPath" defaultValue="My Value" />
      </Form.Handler>
    )

    const form = document.querySelector('form')
    fireEvent.submit(form)

    expect(document.querySelector('input')).toHaveValue('transformed')
    expect(submitData).toEqual({
      foo: 'transformed',
      myPath: 'My Value',
    })
    expect(changeData).toEqual(null)

    fireEvent.change(document.querySelector('input'), {
      target: { value: 'baz' },
    })
    expect(document.querySelector('input')).toHaveValue('baz')
    expect(submitData).toEqual({
      foo: 'transformed',
      myPath: 'My Value',
    })
    expect(changeData).toEqual({
      foo: 'baz',
      myPath: 'My Value',
    })

    fireEvent.change(document.querySelector('input'), {
      target: { value: 'foo' },
    })
    fireEvent.blur(document.querySelector('input'))
    expect(document.querySelector('input')).toHaveValue('transformed')
    expect(submitData).toEqual({
      foo: 'transformed',
      myPath: 'My Value',
    })
    expect(changeData).toEqual({
      foo: 'transformed',
      myPath: 'My Value',
    })
  })

  it('should transform a field value with "transformOut"', async () => {
    let submitData = null

    const onSubmit = jest.fn((data) => {
      submitData = data
    })

    const transformOut = jest.fn(({ path, value }) => {
      if (path === '/foo') {
        return 'bar'
      }
      return value
    })

    render(
      <Form.Handler onSubmit={onSubmit} transformOut={transformOut}>
        <Field.String path="/foo" defaultValue="foo" />
        <Field.String path="/myPath" defaultValue="My Value" />
      </Form.Handler>
    )

    const form = document.querySelector('form')
    fireEvent.submit(form)

    expect(submitData).toEqual({
      foo: 'bar',
      myPath: 'My Value',
    })
    expect(document.querySelector('input')).toHaveValue('foo')
  })

  it('should transform onChange value with "transformOut"', async () => {
    const onChange = jest.fn()

    render(
      <Form.Handler
        onChange={onChange}
        transformOut={({ value, displayValue, label }) => {
          return { value, displayValue, label }
        }}
      >
        <Field.String
          label="String label"
          path="/stringField"
          defaultValue="foo"
        />

        <Field.Selection
          label="Selection label"
          path="/selectionField"
          defaultValue="foo"
          variant="radio"
        >
          <Field.Option value="foo" title="Foo Value" />
          <Field.Option value="bar" title="Bar Value" />
        </Field.Selection>

        <Form.SubmitButton />
      </Form.Handler>
    )

    const stringField = document.querySelector('input')
    fireEvent.change(stringField, { target: { value: 'bar' } })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(
      {
        stringField: {
          value: 'bar',
          label: 'String label',
          displayValue: 'foo', // is not a part of the current render cycle
        },
        selectionField: {
          value: 'foo',
          label: 'Selection label',
          displayValue: 'Foo Value',
        },
      },
      {
        filterData: expect.any(Function),
      }
    )

    await userEvent.tab()
    await userEvent.tab()
    await userEvent.keyboard('{ArrowDown}')

    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenLastCalledWith(
      {
        stringField: {
          value: 'bar',
          label: 'String label',
          displayValue: 'bar', // now its updated
        },
        selectionField: {
          value: 'bar',
          label: 'Selection label',
          displayValue: 'Foo Value',
        },
      },
      {
        filterData: expect.any(Function),
      }
    )

    fireEvent.change(stringField, { target: { value: 'bar 2' } })

    expect(onChange).toHaveBeenCalledTimes(3)
    expect(onChange).toHaveBeenLastCalledWith(
      {
        stringField: {
          value: 'bar 2',
          label: 'String label',
          displayValue: 'bar', // is not a part of the current render cycle
        },
        selectionField: {
          value: 'bar',
          label: 'Selection label',
          displayValue: 'Bar Value',
        },
      },
      {
        filterData: expect.any(Function),
      }
    )
  })

  it('should transform data with "transformData"', async () => {
    let transformedData = undefined
    const onSubmit = jest.fn((data, { transformData }) => {
      transformedData = transformData(
        data,
        ({ value, displayValue, label }) => {
          return { value, displayValue, label }
        }
      )
    })

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.String
          label="String label"
          path="/stringField"
          defaultValue="foo"
        />

        <Field.Selection
          label="Selection label"
          path="/selectionField"
          defaultValue="foo"
          variant="radio"
        >
          <Field.Option value="foo" title="Foo Value" />
          <Field.Option value="bar" title="Bar Value" />
        </Field.Selection>

        <Field.ArraySelection
          label="ArraySelection label"
          path="/arraySelectionField"
          defaultValue={['foo']}
          variant="checkbox"
        >
          <Field.Option value="foo" title="Foo Value" />
          <Field.Option value="bar" title="Bar Value" />
        </Field.ArraySelection>
      </Form.Handler>
    )

    const stringField = document.querySelector('input')
    fireEvent.change(stringField, { target: { value: 'bar' } })

    fireEvent.submit(document.querySelector('form'))

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(transformedData).toEqual({
      stringField: {
        value: 'bar',
        label: 'String label',
        displayValue: 'bar',
      },
      selectionField: {
        value: 'foo',
        label: 'Selection label',
        displayValue: 'Foo Value',
      },
      arraySelectionField: {
        displayValue: ['Foo Value'],
        label: 'ArraySelection label',
        value: ['foo'],
      },
    })

    await userEvent.tab()
    await userEvent.tab()
    await userEvent.keyboard('{ArrowDown}')

    fireEvent.submit(document.querySelector('form'))

    expect(onSubmit).toHaveBeenCalledTimes(2)
    expect(transformedData).toEqual({
      stringField: {
        value: 'bar',
        label: 'String label',
        displayValue: 'bar',
      },
      selectionField: {
        value: 'bar',
        label: 'Selection label',
        displayValue: 'Bar Value',
      },
      arraySelectionField: {
        displayValue: ['Foo Value'],
        label: 'ArraySelection label',
        value: ['foo'],
      },
    })

    await userEvent.tab()
    await userEvent.tab()
    await userEvent.keyboard('{Enter}')

    fireEvent.submit(document.querySelector('form'))

    expect(onSubmit).toHaveBeenCalledTimes(3)
    expect(transformedData).toEqual({
      stringField: {
        value: 'bar',
        label: 'String label',
        displayValue: 'bar',
      },
      selectionField: {
        value: 'bar',
        label: 'Selection label',
        displayValue: 'Bar Value',
      },
      arraySelectionField: {
        displayValue: ['Foo Value', 'Bar Value'],
        label: 'ArraySelection label',
        value: ['foo', 'bar'],
      },
    })
  })

  describe('reduceToVisibleFields', () => {
    it('should remove data entries of hidden fields using Visibility', async () => {
      let submitData = null

      const onSubmit = jest.fn((data, { reduceToVisibleFields }) => {
        submitData = reduceToVisibleFields(data)
      })

      render(
        <Form.Handler onSubmit={onSubmit}>
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
        </Form.Handler>
      )

      const form = document.querySelector('form')
      const button = document.querySelector('button')

      fireEvent.submit(form)
      expect(submitData).toEqual({
        isVisible: false,
      })

      await userEvent.click(button)
      fireEvent.submit(form)
      expect(submitData).toEqual({
        interactive: 'I am visible',
        isVisible: true,
      })

      await userEvent.click(button)
      fireEvent.submit(form)
      expect(submitData).toEqual({
        isVisible: false,
      })

      await userEvent.click(button)
      fireEvent.submit(form)
      expect(submitData).toEqual({
        interactive: 'I am visible',
        isVisible: true,
      })
    })

    it('should still take in account "transformOut"', async () => {
      let submitData = null

      const onSubmit = jest.fn((data, { reduceToVisibleFields }) => {
        submitData = reduceToVisibleFields(data)
      })

      const transformOut = jest.fn(({ path, value }) => {
        if (path === '/interactive') {
          return 'bar'
        }
        return value
      })

      render(
        <Form.Handler onSubmit={onSubmit} transformOut={transformOut}>
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
        </Form.Handler>
      )

      const form = document.querySelector('form')
      const button = document.querySelector('button')

      fireEvent.submit(form)
      expect(submitData).toEqual({
        isVisible: false,
      })

      await userEvent.click(button)
      fireEvent.submit(form)
      expect(submitData).toEqual({
        interactive: 'bar',
        isVisible: true,
      })

      await userEvent.click(button)
      fireEvent.submit(form)
      expect(submitData).toEqual({
        isVisible: false,
      })

      await userEvent.click(button)
      fireEvent.submit(form)
      expect(submitData).toEqual({
        interactive: 'bar',
        isVisible: true,
      })
    })

    it('should keep paths with "keepPaths"', async () => {
      let submitData = null

      const onSubmit = jest.fn((data, { reduceToVisibleFields }) => {
        submitData = reduceToVisibleFields(data, {
          keepPaths: ['/otherExistingPath'],
          removePaths: ['/isVisible'],
        })
      })

      render(
        <Form.Handler
          onSubmit={onSubmit}
          data={{
            otherExistingPath: 'foo',
          }}
        >
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
        </Form.Handler>
      )

      const form = document.querySelector('form')
      const button = document.querySelector('button')

      fireEvent.submit(form)
      expect(submitData).toEqual({
        otherExistingPath: 'foo',
      })

      await userEvent.click(button)
      fireEvent.submit(form)
      expect(submitData).toEqual({
        interactive: 'I am visible',
        otherExistingPath: 'foo',
      })

      await userEvent.click(button)
      fireEvent.submit(form)
      expect(submitData).toEqual({
        otherExistingPath: 'foo',
      })

      await userEvent.click(button)
      fireEvent.submit(form)
      expect(submitData).toEqual({
        interactive: 'I am visible',
        otherExistingPath: 'foo',
      })
    })

    it('should exclude paths with "removePaths"', async () => {
      let submitData = null

      const onSubmit = jest.fn((data, { reduceToVisibleFields }) => {
        submitData = reduceToVisibleFields(data, {
          removePaths: ['/isVisible'],
        })
      })

      render(
        <Form.Handler onSubmit={onSubmit}>
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
        </Form.Handler>
      )

      const form = document.querySelector('form')
      const button = document.querySelector('button')

      fireEvent.submit(form)
      expect(submitData).toEqual({})

      await userEvent.click(button)
      fireEvent.submit(form)
      expect(submitData).toEqual({
        interactive: 'I am visible',
      })

      await userEvent.click(button)
      fireEvent.submit(form)
      expect(submitData).toEqual({})

      await userEvent.click(button)
      fireEvent.submit(form)
      expect(submitData).toEqual({
        interactive: 'I am visible',
      })
    })

    it('should return visible data after unmount and mount', async () => {
      let submitData = null

      const onSubmit = jest.fn((data, { reduceToVisibleFields }) => {
        submitData = reduceToVisibleFields(data)
      })

      const MockComponent = () => {
        const [count, increment] = React.useReducer(
          (state) => state + 1,
          0
        )
        return (
          <Form.Handler onSubmit={onSubmit}>
            <button type="button" onClick={increment}>
              {count}
            </button>

            {count % 2 ? (
              <Field.String
                path="/interactive"
                defaultValue="I am visible"
              />
            ) : null}
          </Form.Handler>
        )
      }

      render(<MockComponent />)

      const form = document.querySelector('form')
      const button = document.querySelector('button')

      fireEvent.submit(form)
      expect(submitData).toEqual({})

      await userEvent.click(button)
      fireEvent.submit(form)
      expect(submitData).toEqual({
        interactive: 'I am visible',
      })

      await userEvent.click(button)
      fireEvent.submit(form)
      expect(submitData).toEqual({})

      await userEvent.click(button)
      fireEvent.submit(form)
      expect(submitData).toEqual({
        interactive: 'I am visible',
      })
    })
  })
})
