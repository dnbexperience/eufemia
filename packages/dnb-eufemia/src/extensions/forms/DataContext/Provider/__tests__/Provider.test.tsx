import React from 'react'
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form, DataContext, Field, JSONSchema, Ajv } from '../../../'
import { Props as StringFieldProps } from '../../../Field/String'
import nbNO from '../../../../../shared/locales/nb-NO'
import { FilterData } from '../Provider'

const nb = nbNO['nb-NO'].Forms

function TestField(props: StringFieldProps) {
  return <Field.String {...props} validateInitially continuousValidation />
}

describe('DataContext.Provider', () => {
  describe('props', () => {
    it('should provide value from defaultData but ignore changes', () => {
      const { rerender } = render(
        <DataContext.Provider defaultData={{ foo: 'original' }}>
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      expect(screen.getByDisplayValue('original')).toBeInTheDocument()

      rerender(
        <DataContext.Provider defaultData={{ foo: 'changed' }}>
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      expect(screen.queryByDisplayValue('original')).toBeInTheDocument()
      expect(screen.queryByDisplayValue('changed')).not.toBeInTheDocument()
    })

    it('should provide value from data and update based on changes', () => {
      const { rerender } = render(
        <DataContext.Provider data={{ foo: 'original' }}>
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      expect(screen.getByDisplayValue('original')).toBeInTheDocument()

      rerender(
        <DataContext.Provider data={{ foo: 'changed' }}>
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      expect(screen.queryByDisplayValue('changed')).toBeInTheDocument()
      expect(
        screen.queryByDisplayValue('original')
      ).not.toBeInTheDocument()
    })

    it('should handle path change', () => {
      const { rerender } = render(
        <DataContext.Provider data={{ foo: 'original' }}>
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      expect(screen.getByDisplayValue('original')).toBeInTheDocument()

      rerender(
        <DataContext.Provider data={{ fooBar: 'changed' }}>
          <Field.String path="/fooBar" />
        </DataContext.Provider>
      )

      expect(screen.getByDisplayValue('changed')).toBeInTheDocument()
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
      expect(onChange).toHaveBeenCalledWith({ foo: 'New Value' })

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
      expect(onChange).toHaveBeenLastCalledWith({ fooBar: 'Second Value' })
    })

    it('should update data context with initially given "value"', () => {
      const onChange = jest.fn()
      const onSubmit = jest.fn()

      render(
        <DataContext.Provider
          data={{ other: 'original' }}
          onChange={onChange}
          onSubmit={onSubmit}
        >
          <Field.String path="/foo" value="include this" />
          <Form.SubmitButton />
        </DataContext.Provider>,
        { wrapper: React.StrictMode }
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
      expect(onChange).toHaveBeenCalledWith({
        foo: 'New Value',
        other: 'original',
      })
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
      expect(onChange).toHaveBeenCalledWith({ foo: 'New Value' })
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
      expect(onChange).toHaveBeenCalledWith([{ foo: 'New Value' }])
    })

    it('should call "onPathChange" on path change', () => {
      const onPathChange = jest.fn()

      const { rerender } = render(
        <DataContext.Provider
          data={{ foo: 'original' }}
          onPathChange={onPathChange}
        >
          <Field.String path="/foo" value="Value" />
        </DataContext.Provider>
      )

      const element = document.querySelector('input')

      fireEvent.change(element, {
        target: { value: 'New Value' },
      })

      expect(onPathChange).toHaveBeenCalledTimes(1)
      expect(onPathChange).toHaveBeenCalledWith('/foo', 'New Value')

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
    })

    it('should call "onSubmit" on submit', () => {
      const onSubmit = jest.fn()

      const { rerender } = render(
        <DataContext.Provider
          data={{ foo: 'original' }}
          onSubmit={onSubmit}
        >
          <Field.String path="/foo" value="Value" />
          <Form.SubmitButton>Submit</Form.SubmitButton>
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

      rerender(
        <DataContext.Provider
          data={{ fooBar: 'changed' }}
          onSubmit={onSubmit}
        >
          <Field.String path="/fooBar" value="Rerendered Value" />
          <Form.SubmitButton>Submit</Form.SubmitButton>
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

    it('should filter data based in the given "filterData" property method', () => {
      let filteredData = undefined
      const onSubmit = jest.fn((data) => (filteredData = data))

      const filterDataHandler: FilterData = jest.fn(
        (path, value, props) => {
          if (props.disabled === true) {
            return false
          }
        }
      )

      const { rerender } = render(
        <DataContext.Provider
          onSubmit={onSubmit}
          filterData={filterDataHandler}
        >
          <Field.String path="/foo" value="Include this value" />
          <Field.String path="/bar" value="bar" />
          <Form.SubmitButton>Submit</Form.SubmitButton>
        </DataContext.Provider>
      )

      const submitButton = document.querySelector('button')

      fireEvent.click(submitButton)

      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenCalledWith(
        { bar: 'bar', foo: 'Include this value' },
        expect.anything()
      )

      expect(filterDataHandler).toHaveBeenCalledTimes(2)
      expect(filterDataHandler).toHaveBeenNthCalledWith(
        1,
        '/foo',
        'Include this value',
        expect.anything()
      )
      expect(filterDataHandler).toHaveBeenNthCalledWith(
        2,
        '/bar',
        'bar',
        expect.anything()
      )

      rerender(
        <DataContext.Provider
          onSubmit={onSubmit}
          filterData={filterDataHandler}
        >
          <Field.String path="/foo" value="Skip this value" disabled />
          <Field.String path="/bar" value="bar value" />
          <Form.SubmitButton>Submit</Form.SubmitButton>
        </DataContext.Provider>
      )

      expect(filteredData).toEqual({
        bar: 'bar',
        foo: 'Include this value',
      })

      fireEvent.click(submitButton)

      expect(onSubmit).toHaveBeenCalledTimes(2)
      expect(onSubmit).toHaveBeenLastCalledWith(
        { bar: 'bar value' },
        expect.anything()
      )

      expect(filterDataHandler).toHaveBeenCalledTimes(4)
      expect(filterDataHandler).toHaveBeenNthCalledWith(
        3,
        '/foo',
        'Skip this value',
        expect.anything()
      )
      expect(filterDataHandler).toHaveBeenNthCalledWith(
        4,
        '/bar',
        'bar value',
        expect.anything()
      )

      expect(filteredData).toEqual({ bar: 'bar value' })
    })

    it('should call "onSubmitRequest" on invalid submit', async () => {
      const onSubmitRequest = jest.fn()

      const { rerender } = render(
        <DataContext.Provider
          data={{ foo: 'original' }}
          onSubmitRequest={onSubmitRequest}
        >
          <Field.Number path="/foo" minimum={3} />
          <Form.SubmitButton>Submit</Form.SubmitButton>
        </DataContext.Provider>
      )

      const inputElement = document.querySelector('input')
      const submitButton = document.querySelector('button')

      await waitFor(() => {
        fireEvent.change(inputElement, {
          target: { value: '1' },
        })
        fireEvent.click(submitButton)

        expect(onSubmitRequest).toHaveBeenCalledTimes(1)
        expect(onSubmitRequest).toHaveBeenCalledWith()
      })

      rerender(
        <DataContext.Provider
          data={{ fooBar: 'changed' }}
          onSubmitRequest={onSubmitRequest}
        >
          <Field.Number path="/fooBar" minimum={3} />
          <Form.SubmitButton>Submit</Form.SubmitButton>
        </DataContext.Provider>
      )

      await waitFor(() => {
        fireEvent.change(inputElement, {
          target: { value: '2' },
        })
        fireEvent.click(submitButton)

        expect(onSubmitRequest).toHaveBeenCalledTimes(2)
        expect(onSubmitRequest).toHaveBeenLastCalledWith()
      })
    })

    it('should scroll on top when "scrollTopOnSubmit" is true', () => {
      const onSubmit = jest.fn()
      const scrollTo = jest.fn()

      jest.spyOn(window, 'scrollTo').mockImplementation(scrollTo)

      const { rerender } = render(
        <DataContext.Provider
          data={{ foo: 'original' }}
          onSubmit={onSubmit}
          scrollTopOnSubmit
        >
          <Field.String path="/foo" value="Value" />
          <Form.SubmitButton>Submit</Form.SubmitButton>
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
      expect(scrollTo).toHaveBeenCalledTimes(1)

      rerender(
        <DataContext.Provider
          data={{ fooBar: 'changed' }}
          onSubmit={onSubmit}
          scrollTopOnSubmit
        >
          <Field.String path="/fooBar" value="Rerendered Value" />
          <Form.SubmitButton>Submit</Form.SubmitButton>
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

      expect(setItem).not.toHaveBeenCalledWith(
        'test-data',
        JSON.stringify({
          foo: 'original123',
        })
      )

      const inputElement = document.querySelector('input')
      await userEvent.type(inputElement, '123')

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

    it('should throw error if both data and sessionStorageId is provided', () => {
      const errorSpy = jest
        .spyOn(global.console, 'error')
        .mockImplementation()

      render(
        <DataContext.Provider
          data={{ foo: 'bar' }}
          sessionStorageId="sourcedata"
        >
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      expect(errorSpy).toHaveBeenCalled()
      errorSpy.mockRestore()
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
              required: 'Required string',
            }}
            required
          />
          <Field.String
            label="Field 2"
            value="abc"
            minLength={5}
            errorMessages={{
              minLength: 'Min 5 chars',
            }}
          />
          <Field.Number
            label="Field 3"
            errorMessages={{
              required: 'Required number',
            }}
            required
          />
          <Form.SubmitButton>Submit</Form.SubmitButton>
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

      // After clicking submit, all three fields should show errors
      expect(screen.queryAllByRole('alert').length).toEqual(3)

      expect(screen.getByText('Required string')).toBeInTheDocument()
      expect(screen.getByText('Min 5 chars')).toBeInTheDocument()
      expect(screen.getByText('Required number')).toBeInTheDocument()

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
          <Form.SubmitButton>Submit</Form.SubmitButton>
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
              pattern: 'pattern provider error',
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
          'pattern provider error'
        )
      })

      it('should display custom pattern error message from provider with json pointer', () => {
        render(
          <DataContext.Provider
            errorMessages={{
              pattern: 'pattern provider error',
              '/myKey': {
                pattern: 'pattern provider myKey error',
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
          'pattern provider myKey error'
        )
      })

      it('should display custom pattern error message from field', () => {
        render(
          <DataContext.Provider
            errorMessages={{
              pattern: 'pattern provider error',
              '/myKey': {
                pattern: 'pattern provider myKey error',
              },
            }}
          >
            <Field.String
              path="/myKey"
              validateInitially
              pattern="^correct$"
              value="wrong"
              errorMessages={{
                pattern: 'pattern field error',
              }}
            />
          </DataContext.Provider>
        )

        expect(screen.getByRole('alert')).toHaveTextContent(
          'pattern field error'
        )
      })
    })

    describe('schema validation', () => {
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
          'Dette feltet må fylles ut'
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
          'Dette feltet må fylles ut'
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
                minLength: 'Minimum {minLength} chars.',
              }}
            />
          </DataContext.Provider>
        )

        expect(screen.getByText('Minimum 7 chars.')).toBeInTheDocument()
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
          nb.stringInputErrorMinLength.replace('{minLength}', '486')
        )
      ).toBeInTheDocument()
    })

    it('should call "onSubmitRequest" on invalid submit set by a schema', () => {
      const onSubmitRequest = jest.fn()

      const TestdataSchema: JSONSchema = {
        type: 'object',
        properties: {
          foo: { type: 'number', minimum: 3 },
        },
      }

      const { rerender } = render(
        <DataContext.Provider
          data={{ foo: 'original' }}
          onSubmitRequest={onSubmitRequest}
          schema={TestdataSchema}
        >
          <Field.Number path="/foo" />
          <Form.SubmitButton>Submit</Form.SubmitButton>
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
          schema={TestdataSchema}
        >
          <Field.Number path="/fooBar" required />
          <Form.SubmitButton>Submit</Form.SubmitButton>
        </DataContext.Provider>
      )

      fireEvent.change(inputElement, {
        target: { value: '2' },
      })
      fireEvent.click(submitButton)

      expect(onSubmitRequest).toHaveBeenCalledTimes(2)
      expect(onSubmitRequest).toHaveBeenLastCalledWith()
    })

    it('should revalidate with provided schema based on changes in external data', () => {
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
    })

    it('should revalidate correctly based on changes in provided schema', () => {
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
    })

    it('should accecpt custom ajv instance', async () => {
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
            continuousValidation
          />
        </DataContext.Provider>
      )

      expect(screen.queryByRole('alert')).toBeInTheDocument()

      await userEvent.type(screen.getByRole('textbox'), '{Backspace}2')

      expect(screen.queryByRole('alert')).toBeNull()
    })

    it('should accecpt custom ajv instance with custom error messages', () => {
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
        errorMessage: 'message in schema',
      } as const

      const { rerender } = render(
        <DataContext.Provider ajvInstance={ajv}>
          <Field.String
            schema={schema}
            path="/myKey"
            value=""
            validateInitially
          />
        </DataContext.Provider>
      )

      expect(screen.queryByRole('alert')).toHaveTextContent(
        'message in schema'
      )

      rerender(
        <DataContext.Provider
          ajvInstance={ajv}
          errorMessages={{
            notEmpty: 'message in provider',
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
        'message in provider'
      )

      rerender(
        <DataContext.Provider
          ajvInstance={ajv}
          errorMessages={{
            notEmpty: 'message in provider',
            '/myKey': {
              notEmpty: 'message in provider for just one field',
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
        'message in provider for just one field'
      )

      rerender(
        <DataContext.Provider
          ajvInstance={ajv}
          errorMessages={{
            notEmpty: 'message in provider',
            '/myKey': {
              notEmpty: 'message in provider for just one field',
            },
          }}
        >
          <Field.String
            schema={schema}
            path="/myKey"
            value=""
            validateInitially
            errorMessages={{ notEmpty: 'message for just this field' }}
          />
        </DataContext.Provider>
      )

      expect(screen.queryByRole('alert')).toHaveTextContent(
        'message for just this field'
      )
    })
  })

  it('should run filterData with correct data in onSubmit', () => {
    const id = 'disabled-fields'
    const filterDataHandler = jest.fn((path, value, props) => {
      if (props.disabled === true) {
        return false
      }
    })
    const onSubmit = jest.fn()

    const { rerender } = render(
      <Form.Handler
        id={id}
        onSubmit={onSubmit}
        filterData={filterDataHandler}
      >
        <Field.String path="/myField" disabled={true} value="foo" />
      </Form.Handler>
    )

    const form = document.querySelector('form')
    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenLastCalledWith({}, expect.anything())
    expect(filterDataHandler).toHaveBeenCalledTimes(1)
    expect(filterDataHandler).toHaveBeenLastCalledWith(
      '/myField',
      'foo',
      expect.objectContaining({
        disabled: true,
      })
    )

    rerender(
      <Form.Handler
        id={id}
        onSubmit={onSubmit}
        filterData={filterDataHandler}
      >
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
    expect(filterDataHandler).toHaveBeenLastCalledWith(
      '/myField',
      'bar',
      expect.objectContaining({
        disabled: false,
      })
    )
  })

  describe('useData', () => {
    it('should set Provider data', () => {
      const props = { foo: 'bar' }
      renderHook(() => Form.useData('unique', props))

      render(
        <DataContext.Provider id="unique">
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      const inputElement = document.querySelector('input')
      expect(inputElement).toHaveValue('bar')
    })

    it('should update Provider data on hook rerender', () => {
      const { rerender } = renderHook((props = { foo: 'bar' }) => {
        return Form.useData('unique-a', props)
      })

      render(
        <DataContext.Provider id="unique-a">
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      const inputElement = document.querySelector('input')

      expect(inputElement).toHaveValue('bar')

      rerender({ foo: 'bar-changed' })

      expect(inputElement).toHaveValue('bar-changed')
    })

    it('should only set data when Provider has no data given', () => {
      const props = { foo: 'bar' }
      renderHook(() => Form.useData('unique-b', props))

      render(
        <DataContext.Provider id="unique-b" data={{ foo: 'changed' }}>
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      const inputElement = document.querySelector('input')

      expect(inputElement).toHaveValue('changed')
    })

    it('should initially set data when Provider has no data', () => {
      const props = { foo: 'bar' }
      renderHook(() => Form.useData('unique-c', props))

      const { rerender } = render(
        <DataContext.Provider id="unique-c">
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      const inputElement = document.querySelector('input')

      expect(inputElement).toHaveValue('bar')

      rerender(
        <DataContext.Provider id="unique-c" data={{ foo: 'changed' }}>
          <Field.String path="/foo" />
        </DataContext.Provider>
      )

      expect(inputElement).toHaveValue('changed')
    })

    it('should return "update" mathod that lets you update the data', () => {
      const props = { foo: 'bar' }
      const { result } = renderHook(() => Form.useData('unique-d', props))
      const { update } = result.current

      render(
        <DataContext.Provider id="unique-d">
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

    it('should rerender provider and its contents', async () => {
      const existingData = { count: 1 }

      let countRender = 0

      const MockComponent = () => {
        const id = React.useId()
        const { data, update } = Form.useData(id, existingData)

        const increment = React.useCallback(() => {
          update('/count', (count) => {
            return count + 1
          })
        }, [update])

        countRender++

        return (
          <DataContext.Provider id={id}>
            <Field.Number path="/count" />
            <Form.SubmitButton onClick={increment} text={data.count} />
          </DataContext.Provider>
        )
      }

      render(<MockComponent />)

      const inputElement = document.querySelector('input')
      const buttonElement = document.querySelector('button')

      expect(inputElement).toHaveValue('1')
      expect(buttonElement).toHaveTextContent('1')
      expect(countRender).toBe(1)

      await userEvent.click(
        document.querySelector('.dnb-forms-submit-button')
      )

      expect(inputElement).toHaveValue('2')
      expect(buttonElement).toHaveTextContent('2')
      expect(countRender).toBe(2)
    })

    it('should return data given in the context provider after a rerender', async () => {
      const existingData = { count: 1 }

      let countRender = 0

      const MockComponent = () => {
        const id = React.useId()
        const { data, update } = Form.useData<{ count: number }>(id)

        const increment = React.useCallback(() => {
          update('/count', (count) => {
            return count + 1
          })
        }, [update])

        countRender++

        return (
          <DataContext.Provider id={id} data={existingData}>
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

      await userEvent.click(
        document.querySelector('.dnb-forms-submit-button')
      )

      expect(inputElement).toHaveValue('2')
      expect(buttonElement).toHaveTextContent('2')
      expect(countRender).toBe(3)
    })

    it('should update data via useEffect when data is given in useData', async () => {
      const existingData = { count: 1 }

      let countRender = 0

      const MockComponent = () => {
        const id = React.useId()
        const { data, update } = Form.useData(id, existingData)

        React.useEffect(() => {
          update('/count', (count) => count + 1)
        }, [update])

        countRender++

        return (
          <DataContext.Provider id={id}>
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
      const existingData = { count: 1 }

      let countRender = 0

      const MockComponent = () => {
        const id = React.useId()
        const { data, update } = Form.useData<{ count: number }>(id)

        React.useEffect(() => {
          update('/count', () => 123)
        }, [update])

        countRender++

        return (
          <DataContext.Provider id={id} data={existingData}>
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

    it('should make filterData available in the hook', () => {
      const id = 'disabled-fields-hook'
      const filterDataHandler = jest.fn((path, value, props) => {
        if (props.disabled === true) {
          return false
        }
      })
      const onSubmit = jest.fn()

      const { result, rerender: rerenderHook } = renderHook(
        (props = { myField: 'foo' }) => Form.useData(id, props)
      )

      const { rerender } = render(
        <Form.Handler
          id={id}
          onSubmit={onSubmit}
          filterData={filterDataHandler}
        >
          <Field.String path="/myField" disabled={true} />
        </Form.Handler>
      )

      const form = document.querySelector('form')
      fireEvent.submit(form)

      expect(result.current).toEqual({
        data: { myField: 'foo' },
        filterData: expect.any(Function),
        update: expect.any(Function),
      })
      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenLastCalledWith({}, expect.anything())
      expect(filterDataHandler).toHaveBeenCalledTimes(1)
      expect(filterDataHandler).toHaveBeenLastCalledWith(
        '/myField',
        'foo',
        expect.objectContaining({
          disabled: true,
        })
      )

      rerenderHook({ myField: 'bar' })

      rerender(
        <Form.Handler
          id={id}
          onSubmit={onSubmit}
          filterData={filterDataHandler}
        >
          <Field.String path="/myField" disabled={false} />
        </Form.Handler>
      )

      fireEvent.submit(form)

      expect(result.current).toEqual({
        data: { myField: 'bar' },
        filterData: expect.any(Function),
        update: expect.any(Function),
      })
      expect(onSubmit).toHaveBeenCalledTimes(2)
      expect(onSubmit).toHaveBeenLastCalledWith(
        { myField: 'bar' },
        expect.anything()
      )
      expect(filterDataHandler).toHaveBeenCalledTimes(2)
      expect(filterDataHandler).toHaveBeenLastCalledWith(
        '/myField',
        'bar',
        expect.objectContaining({
          disabled: false,
        })
      )

      rerender(
        <Form.Handler
          id={id}
          onSubmit={onSubmit}
          filterData={filterDataHandler}
        >
          <Field.String path="/myField" disabled={true} />
        </Form.Handler>
      )

      expect(result.current.data).toEqual({
        myField: 'bar',
      })
      expect(result.current.filterData(filterDataHandler)).toEqual({})
      expect(filterDataHandler).toHaveBeenCalledTimes(3)
      expect(filterDataHandler).toHaveBeenLastCalledWith(
        '/myField',
        'bar',
        expect.objectContaining({
          disabled: true,
        })
      )
    })
  })
})
