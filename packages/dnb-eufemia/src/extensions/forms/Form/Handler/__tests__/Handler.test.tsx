/* eslint-disable jest/expect-expect */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { spyOnEufemiaWarn, wait } from '../../../../../core/jest/jestSetup'
import {
  Form,
  Field,
  JSONSchema,
  JSONSchemaType,
  OnSubmit,
} from '../../..'
import type { Props as StringFieldProps } from '../../../Field/String'
import nbNO from '../../../constants/locales/nb-NO'
import enGB from '../../../constants/locales/en-GB'

const nb = nbNO['nb-NO']
const en = enGB['en-GB']

describe('Form.Handler', () => {
  it('should call "onSubmit"', () => {
    const onSubmit: OnSubmit = jest.fn()

    render(
      <Form.Handler
        data={{ foo: 'data-context-value' }}
        onSubmit={onSubmit}
      >
        <Field.String path="/foo" value="Value" />
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Handler>
    )

    const inputElement = document.querySelector('input')
    const buttonElement = document.querySelector('button')

    fireEvent.submit(inputElement)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith(
      { foo: 'Value' },
      expect.anything()
    )

    fireEvent.change(inputElement, { target: { value: 'New Value' } })
    fireEvent.click(buttonElement)

    expect(onSubmit).toHaveBeenCalledTimes(2)
    expect(onSubmit).toHaveBeenCalledWith(
      { foo: 'New Value' },
      expect.anything()
    )
  })

  it('should call "onSubmit" from Provider at the same time', () => {
    const onSubmit: OnSubmit = jest.fn()

    render(
      <Form.Handler
        data={{ foo: 'data-context-value' }}
        onSubmit={onSubmit}
      >
        <Field.String path="/foo" value="Value" />
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Handler>
    )

    const inputElement = document.querySelector('input')
    const buttonElement = document.querySelector('button')

    fireEvent.submit(inputElement)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith(
      { foo: 'Value' },
      expect.anything()
    )

    fireEvent.click(buttonElement)

    expect(onSubmit).toHaveBeenCalledTimes(2)
    expect(onSubmit).toHaveBeenCalledWith(
      { foo: 'Value' },
      expect.anything()
    )
  })

  it('should call preventDefault', () => {
    const preventDefault = jest.fn()
    const onSubmit: OnSubmit = jest.fn(preventDefault)

    render(
      <Form.Handler
        data={{ foo: 'data-context-value' }}
        onSubmit={onSubmit}
      >
        <Field.String path="/foo" value="Value" />
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Handler>
    )

    const inputElement = document.querySelector('input')
    const buttonElement = document.querySelector('button')

    fireEvent.submit(inputElement)

    expect(preventDefault).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledTimes(1)

    fireEvent.click(buttonElement)

    expect(preventDefault).toHaveBeenCalledTimes(2)
    expect(onSubmit).toHaveBeenCalledTimes(2)
  })

  it('should default to form element', () => {
    render(
      <Form.Handler data={{ foo: 'data-context-value' }}>
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Handler>
    )

    const formElement = document.querySelector('.dnb-forms-form')

    expect(formElement.tagName).toBe('FORM')
  })

  it('should set custom "className"', () => {
    render(
      <Form.Handler
        data={{ foo: 'data-context-value' }}
        className="custom-class"
      >
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Handler>
    )

    const formElement = document.querySelector('form')

    expect(Array.from(formElement.classList)).toEqual([
      'dnb-space',
      'dnb-forms-form',
      'custom-class',
    ])
  })

  it('should handle spacing prop', () => {
    render(
      <Form.Handler data={{ foo: 'data-context-value' }} top="large">
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Handler>
    )

    const formElement = document.querySelector('form')

    expect(formElement.classList).toContain('dnb-space__top--large')
  })

  it('should forward custom HTML props', () => {
    render(
      <Form.Handler
        data={{ foo: 'data-context-value' }}
        aria-label="Aria Label"
      >
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Handler>
    )

    const formElement = document.querySelector('form')
    const attributes = Array.from(formElement.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class', 'aria-label'])
    expect(formElement.getAttribute('aria-label')).toBe('Aria Label')
  })

  describe('autocomplete', () => {
    it('should set autocomplete="on" when autoComplete is true', () => {
      const { rerender } = render(
        <Form.Handler autoComplete>
          <Field.String path="/firstName" />
        </Form.Handler>
      )
      expect(
        document.querySelector('input').getAttribute('autocomplete')
      ).toBe('on')
      expect(document.querySelector('input').getAttribute('name')).toBe(
        'firstName'
      )

      rerender(
        <Form.Handler autoComplete>
          <Field.String path="/firstName" autoComplete="family-name" />
        </Form.Handler>
      )
      expect(
        document.querySelector('input').getAttribute('autocomplete')
      ).toBe('family-name')
      expect(document.querySelector('input').getAttribute('name')).toBe(
        'firstName'
      )
    })

    it('should set autocomplete="off" when autoComplete is false', () => {
      const { rerender } = render(
        <Form.Handler autoComplete={false}>
          <Field.String path="/firstName" />
        </Form.Handler>
      )
      expect(
        document.querySelector('input').getAttribute('autocomplete')
      ).toBe('off')
      expect(document.querySelector('input').getAttribute('name')).toBe(
        'firstName'
      )

      rerender(
        <Form.Handler autoComplete={false}>
          <Field.String path="/firstName" autoComplete="family-name" />
        </Form.Handler>
      )
      expect(
        document.querySelector('input').getAttribute('autocomplete')
      ).toBe('family-name')
      expect(document.querySelector('input').getAttribute('name')).toBe(
        'firstName'
      )
    })
  })

  it('should call HTMLFormElement.reset on "resetForm" call', () => {
    const onSubmit: OnSubmit = jest.fn((data, { resetForm }) => {
      resetForm()
    })
    const onChange = jest.fn()
    const reset = jest.fn()

    const MockComponent = (props: StringFieldProps) => {
      return <Field.String {...props} />
    }

    render(
      <Form.Handler
        data={{ other: 'data', foo: 'existing' }}
        onSubmit={onSubmit}
        onChange={onChange}
      >
        <MockComponent path="/foo" />
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Handler>
    )

    const formElement = document.querySelector('form')
    const inputElement = document.querySelector('input')
    const submitElement = document.querySelector('button')

    jest.spyOn(formElement, 'reset').mockImplementationOnce(reset)

    fireEvent.click(submitElement)

    expect(inputElement.value).toBe('existing')
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenLastCalledWith(
      { other: 'data', foo: 'existing' },
      expect.anything()
    )

    fireEvent.change(inputElement, { target: { value: 'New Value' } })
    fireEvent.click(submitElement)

    expect(onSubmit).toHaveBeenCalledTimes(2)
    expect(onSubmit).toHaveBeenLastCalledWith(
      { other: 'data', foo: 'New Value' },
      expect.anything()
    )
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(
      {
        other: 'data',
        foo: 'New Value',
      },
      expect.anything()
    )
    expect(reset).toHaveBeenCalledTimes(1)
    expect(inputElement.value).toBe('New Value')
  })

  it('should empty whole data set "clearData" call', () => {
    const onSubmit: OnSubmit = jest.fn((data, { clearData }) => {
      clearData()
    })
    const onChange = jest.fn()

    const MockComponent = (props: StringFieldProps) => {
      return <Field.String {...props} />
    }

    render(
      <Form.Handler
        data={{ other: 'data', foo: 'existing' }}
        onSubmit={onSubmit}
        onChange={onChange}
      >
        <MockComponent path="/foo" />
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Handler>
    )

    const inputElement = document.querySelector('input')
    const submitElement = document.querySelector('button')

    fireEvent.click(submitElement)

    expect(inputElement.value).toBe('')
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenLastCalledWith(
      { other: 'data', foo: 'existing' },
      expect.anything()
    )

    fireEvent.click(submitElement)

    expect(onSubmit).toHaveBeenCalledTimes(2)
    expect(onSubmit).toHaveBeenLastCalledWith({}, expect.anything())

    fireEvent.change(inputElement, { target: { value: 'unset me' } })

    expect(inputElement.value).toBe('unset me')
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(
      { foo: 'unset me' },
      expect.anything()
    )

    fireEvent.click(submitElement)

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledTimes(3)
    expect(onSubmit).toHaveBeenLastCalledWith(
      { foo: 'unset me' },
      expect.anything()
    )
  })

  it('should store data to session storage when sessionStorageId is provided, but only after changes', async () => {
    const setItem = jest.spyOn(
      Object.getPrototypeOf(window.sessionStorage),
      'setItem'
    )

    render(
      <Form.Handler
        defaultData={{ foo: 'original' }}
        sessionStorageId="test-data"
      >
        <Field.String path="/foo" />
      </Form.Handler>
    )

    expect(setItem).not.toHaveBeenLastCalledWith(
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
    window.sessionStorage.removeItem('test-data')
  })

  it('should reset sessionStorage on "resetForm" call', async () => {
    const setItem = jest.spyOn(
      Object.getPrototypeOf(window.sessionStorage),
      'setItem'
    )
    const onSubmit: OnSubmit = jest.fn((data, { resetForm }) => {
      resetForm()
    })

    render(
      <Form.Handler
        defaultData={{ foo: 'original' }}
        sessionStorageId="test-data"
        onSubmit={onSubmit}
      >
        <Field.String path="/foo" />
        <Form.SubmitButton />
      </Form.Handler>
    )

    const inputElement = document.querySelector('input')
    await userEvent.type(inputElement, '123')

    expect(setItem).toHaveBeenLastCalledWith(
      'test-data',
      JSON.stringify({
        foo: 'original123',
      })
    )
    expect(window.sessionStorage.getItem('test-data')).toEqual(
      JSON.stringify({
        foo: 'original123',
      })
    )

    const buttonElement = document.querySelector('button')
    fireEvent.click(buttonElement)

    expect(window.sessionStorage.getItem('test-data')).toBe(null)

    setItem.mockRestore()
  })

  it('should show errors if form is invalid on submit', () => {
    const onSubmit: OnSubmit = jest.fn()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.String value="" required />
      </Form.Handler>
    )

    const formElement = document.querySelector('form')
    fireEvent.submit(formElement)

    expect(onSubmit).not.toHaveBeenCalled()
    expect(screen.queryByRole('alert')).toBeInTheDocument()
  })

  it('should include values from fields in data, without any change', () => {
    const onSubmit: OnSubmit = jest.fn()

    render(
      <Form.Handler data={{ foo: 'bar' }} onSubmit={onSubmit}>
        <Field.String path="/other" value="include this" />
        <Form.SubmitButton />
      </Form.Handler>,
      { wrapper: React.StrictMode }
    )

    const buttonElement = document.querySelector('button')
    fireEvent.click(buttonElement)

    expect(onSubmit).toHaveBeenCalledWith(
      { foo: 'bar', other: 'include this' },
      expect.anything()
    )
  })

  it('should show error message given in onSubmit', async () => {
    const onSubmit: OnSubmit = jest.fn(() => {
      throw new Error('Form error')
    })

    render(
      <Form.Handler onSubmit={onSubmit} aria-labelledby="custom-id">
        <Form.SubmitButton />
      </Form.Handler>
    )

    const buttonElement = document.querySelector('button')
    fireEvent.click(buttonElement)

    await waitFor(() => {
      expect(screen.queryByRole('alert')).toHaveTextContent('Form error')
    })
  })

  it('should have error message that is connected with aria-labelledby', async () => {
    const onSubmit: OnSubmit = jest.fn(() => {
      throw new Error('Form error')
    })

    render(
      <Form.Handler onSubmit={onSubmit} aria-labelledby="custom-id">
        <Form.SubmitButton />
      </Form.Handler>
    )

    const buttonElement = document.querySelector('button')
    await userEvent.click(buttonElement)

    const form = screen.getByRole('form')
    const id = screen.queryByRole('alert').getAttribute('id')

    expect(id).toEqual(expect.stringMatching(/id-.*-form-status/))
    expect(form).toHaveAttribute(
      'aria-labelledby',
      expect.stringMatching(/custom-id/)
    )
    expect(form).toHaveAttribute('aria-labelledby')
    expect(screen.queryByRole('alert')).toHaveTextContent('Form error')
  })

  describe('async submit', () => {
    let log: jest.SpyInstance
    beforeEach(() => {
      log = spyOnEufemiaWarn()
    })
    afterEach(() => {
      log.mockRestore()
    })

    it('should disable form elements during submit indicator when formStatus is pending', () => {
      const onSubmit = async () => null

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Field.String value="Value" />
          <Form.SubmitButton />
        </Form.Handler>
      )

      const buttonElement = document.querySelector('button')
      const inputElement = document.querySelector('input')

      fireEvent.click(buttonElement)

      expect(buttonElement).toBeDisabled()
      expect(inputElement).toBeDisabled()
    })

    it('should not disable form elements during an async validator handling', async () => {
      const onSubmit = async () => null
      const asyncValidator = async () => {
        return null
      }

      const { rerender } = render(
        <Form.Handler onSubmit={onSubmit}>
          <Field.String value="Value" onBlurValidator={asyncValidator} />
          <Form.SubmitButton />
        </Form.Handler>
      )

      const buttonElement = document.querySelector('button')
      const inputElement = document.querySelector('input')

      await userEvent.type(inputElement, '1')
      fireEvent.blur(inputElement)

      expect(inputElement).toBeDisabled()
      expect(buttonElement).not.toBeDisabled()

      rerender(
        <Form.Handler onSubmit={onSubmit}>
          <Field.String value="Value" onChangeValidator={asyncValidator} />
          <Form.SubmitButton />
        </Form.Handler>
      )

      await userEvent.type(inputElement, '2')

      expect(inputElement).not.toBeDisabled()
      expect(buttonElement).not.toBeDisabled()
    })

    it('should set focus on previously activeElement when submit is completed', async () => {
      const onSubmit = async () => null

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Field.String />
        </Form.Handler>
      )

      const inputElement = document.querySelector('input')

      await userEvent.type(inputElement, 'something')
      const activeElement = document.activeElement

      fireEvent.submit(document.querySelector('form'))

      expect(inputElement).toBeDisabled()

      // Ensure we loose focus
      inputElement.removeAttribute('disabled')
      inputElement.blur()

      await waitFor(() => {
        expect(activeElement).toBe(inputElement)
        expect(activeElement).toBe(document.activeElement)
      })
    })

    it('should abort async submit when onSubmit returns error', async () => {
      const onSubmit: OnSubmit = jest.fn(async () => {
        await wait(1)

        return new Error('Error message')
      })

      render(
        <Form.Handler
          onSubmit={onSubmit}
          minimumAsyncBehaviorTime={30000} // with a high wait time, we ensure the Error will abort it
        >
          <Form.SubmitButton />
        </Form.Handler>
      )

      const buttonElement = document.querySelector('button')

      fireEvent.click(buttonElement)

      expect(onSubmit).toHaveBeenCalledTimes(1)

      expect(
        document.querySelector(
          '.dnb-forms-submit-indicator--state-pending'
        )
      ).toBeTruthy()

      await waitFor(() => {
        expect(screen.queryByRole('alert')).toBeInTheDocument()
      })

      expect(screen.queryByRole('alert')).toHaveTextContent(
        'Error message'
      )

      expect(
        document.querySelector(
          '.dnb-forms-submit-indicator--state-pending'
        )
      ).toBeNull()
    })

    it('should call onSubmit and onSubmitComplete on async submit call', async () => {
      const onSubmit: OnSubmit = jest.fn()
      const onSubmitComplete = jest.fn()

      render(
        <Form.Handler
          onSubmit={onSubmit}
          onSubmitComplete={onSubmitComplete}
        >
          <Field.String value="bar" path="/foo" />
          <Form.SubmitButton />
        </Form.Handler>
      )

      const buttonElement = document.querySelector('button')

      fireEvent.click(buttonElement)

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenCalledWith(
          { foo: 'bar' },
          {
            clearData: expect.any(Function),
            resetForm: expect.any(Function),
            filterData: expect.any(Function),
            transformData: expect.any(Function),
            reduceToVisibleFields: expect.any(Function),
          }
        )

        expect(onSubmitComplete).toHaveBeenCalledTimes(1)
        expect(onSubmitComplete).toHaveBeenCalledWith(
          { foo: 'bar' },
          undefined
        )
      })
    })

    it('should handle onSubmit return with "info" and handle pending status', async () => {
      const onSubmit: OnSubmit = jest.fn().mockImplementation(async () => {
        await wait(500) // ensure we never finish onSubmit before the timeout

        return {
          info: 'Redirecting to a new location',
          status: 'pending',
        }
      })

      render(
        <Form.Handler
          onSubmit={onSubmit}
          minimumAsyncBehaviorTime={30000} // with a high wait time, we ensure the Error will abort it
          asyncSubmitTimeout={20}
        >
          <Form.SubmitButton />
        </Form.Handler>
      )

      const buttonElement = document.querySelector('button')

      fireEvent.click(buttonElement)

      expect(
        document.querySelector(
          '.dnb-forms-submit-indicator--state-pending'
        )
      ).toBeTruthy()

      await waitFor(() => {
        expect(document.querySelector('.dnb-form-status')).toBeNull()
      })

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent('Redirecting to a new location')
      })

      await waitFor(() => {
        expect(
          document.querySelector(
            '.dnb-forms-submit-indicator--state-pending'
          )
        ).toBeNull()
      })

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1)
      })

      fireEvent.click(buttonElement)

      expect(
        document.querySelector(
          '.dnb-forms-submit-indicator--state-pending'
        )
      ).toBeTruthy()

      await waitFor(() => {
        expect(document.querySelector('.dnb-form-status')).toBeNull()
      })

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent('Redirecting to a new location')
      })

      await waitFor(() => {
        expect(
          document.querySelector(
            '.dnb-forms-submit-indicator--state-pending'
          )
        ).toBeNull()
      })

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(2)
      })
    })

    it('should call onSubmit and onSubmitComplete with async onChangeValidator', async () => {
      const onSubmit: OnSubmit = jest.fn()
      const onSubmitComplete = jest.fn()

      const asyncValidator = async () => {
        return null
      }

      render(
        <Form.Handler
          onSubmit={onSubmit}
          onSubmitComplete={onSubmitComplete}
        >
          <Field.String
            value="bar"
            path="/foo"
            onChangeValidator={asyncValidator}
          />
          <Form.SubmitButton />
        </Form.Handler>
      )

      const buttonElement = document.querySelector('button')

      fireEvent.click(buttonElement)

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenCalledWith(
          { foo: 'bar' },
          {
            clearData: expect.any(Function),
            resetForm: expect.any(Function),
            filterData: expect.any(Function),
            transformData: expect.any(Function),
            reduceToVisibleFields: expect.any(Function),
          }
        )

        expect(onSubmitComplete).toHaveBeenCalledTimes(1)
        expect(onSubmitComplete).toHaveBeenCalledWith(
          { foo: 'bar' },
          undefined
        )
      })
    })

    it('should not call async onChangeValidator when field is not mounted anymore', async () => {
      const onSubmit: OnSubmit = jest.fn()
      const asyncValidator = jest.fn(async () => {
        return null
      })

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Field.String
            value="bar"
            path="/foo"
            onChangeValidator={asyncValidator}
          />
          <Form.SubmitButton />
        </Form.Handler>
      )

      const buttonElement = document.querySelector('button')
      fireEvent.click(buttonElement)

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenCalledWith(
          { foo: 'bar' },
          {
            clearData: expect.any(Function),
            resetForm: expect.any(Function),
            filterData: expect.any(Function),
            transformData: expect.any(Function),
            reduceToVisibleFields: expect.any(Function),
          }
        )
      })

      expect(asyncValidator).toHaveBeenCalledTimes(1)
      expect(asyncValidator).toHaveBeenCalledWith(
        'bar',
        expect.objectContaining({
          errorMessages: expect.objectContaining({
            'Field.errorRequired': expect.any(String),
            'Field.errorPattern': expect.any(String),
            'StringField.errorMinLength': expect.any(String),
            'StringField.errorMaxLength': expect.any(String),
            'NumberField.errorMinimum': expect.any(String),
            'NumberField.errorMaximum': expect.any(String),
            'NumberField.errorExclusiveMinimum': expect.any(String),
            'NumberField.errorExclusiveMaximum': expect.any(String),
            'NumberField.errorMultipleOf': expect.any(String),

            /** @deprecated – can be removed in v11 */
            maxLength: expect.any(String),
            minLength: expect.any(String),
            pattern: expect.any(String),
            required: expect.any(String),
          }),
        })
      )
    })

    it('should accept custom minimumAsyncBehaviorTimevalue', async () => {
      const onSubmit = async () => null

      render(
        <Form.Handler onSubmit={onSubmit} minimumAsyncBehaviorTime={2}>
          <Form.SubmitButton />
        </Form.Handler>
      )

      const buttonElement = document.querySelector('button')

      fireEvent.click(buttonElement)

      expect(buttonElement).toBeDisabled()

      await wait(4)

      expect(buttonElement).toBeDisabled()

      await waitFor(() => {
        expect(buttonElement).not.toBeDisabled()
      })
    })
  })

  describe('SubmitIndicator', () => {
    it('should show SubmitIndicator when formStatus is pending', async () => {
      const onSubmit = async () => null

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Form.SubmitButton />
        </Form.Handler>
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
    })

    it('should show SubmitIndicator when onSubmit is async', async () => {
      const onSubmit = async () => null

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Form.SubmitButton />
        </Form.Handler>
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
    })
  })

  it('onSubmit should return the data including the type', () => {
    let result = null

    render(
      <Form.Handler
        defaultData={{ firstName: 'Nora' }}
        onSubmit={(data) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          result = data.firstName2

          // Use the correct value
          result = data.firstName
        }}
      >
        <Form.SubmitButton />
      </Form.Handler>
    )

    fireEvent.submit(document.querySelector('form'))

    expect(result).toBe('Nora')
  })

  it('should not interfere disabled state of elements using "formElement"', () => {
    render(
      <Form.Handler>
        <Field.Selection variant="radio" disabled>
          <Field.Option />
        </Field.Selection>
      </Form.Handler>
    )

    expect(document.querySelector('input')).toBeDisabled()
  })

  it('should support locale prop', () => {
    const { rerender } = render(
      <Form.Handler locale="en-GB">
        <Field.Name.First />
      </Form.Handler>
    )

    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      en.FirstName.label
    )

    rerender(
      <Form.Handler locale="nb-NO">
        <Field.Name.First />
      </Form.Handler>
    )

    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      nb.FirstName.label
    )
  })

  it('should support translations prop', () => {
    const translations = {
      'nb-NO': { PhoneNumber: { label: 'Egendefinert' } },
      'en-GB': { PhoneNumber: { label: 'Custom' } },
    }
    const { rerender } = render(
      <Form.Handler locale="en-GB" translations={translations}>
        <Field.PhoneNumber />
      </Form.Handler>
    )

    const [countryCode, phoneNumber] = Array.from(
      document.querySelectorAll('.dnb-form-label')
    )

    expect(countryCode).toHaveTextContent(en.PhoneNumber.countryCodeLabel)
    expect(phoneNumber).toHaveTextContent(
      translations['en-GB'].PhoneNumber.label
    )

    rerender(
      <Form.Handler locale="nb-NO" translations={translations}>
        <Field.PhoneNumber />
      </Form.Handler>
    )

    expect(countryCode).toHaveTextContent(nb.PhoneNumber.countryCodeLabel)
    expect(phoneNumber).toHaveTextContent(
      translations['nb-NO'].PhoneNumber.label
    )
  })

  describe('schema types', () => {
    let log: jest.SpyInstance
    beforeEach(() => {
      log = jest.spyOn(global.console, 'error').mockImplementation()
    })
    afterEach(() => {
      log.mockRestore()
    })

    it('should accept schema without type', () => {
      const schema = {
        type: 'object',
        properties: {
          foo: {
            title: 'Foo',
          },
        },
        required: ['foo'],
      }

      render(<Form.Handler schema={schema}>content</Form.Handler>)
      expect(document.body).toHaveTextContent('content')
    })

    it('should accept schema with as const', () => {
      const schema = {
        type: 'object',
        properties: {
          foo: {
            title: 'Foo',
          },
        },
        required: ['foo'],
      } as const

      render(<Form.Handler schema={schema}>content</Form.Handler>)
      expect(document.body).toHaveTextContent('content')
    })

    it('should accept schema with JSONSchema', () => {
      const schema: JSONSchema = {
        type: 'object',
        properties: {
          foo: {
            title: 'Foo',
          },
        },
        required: ['foo'],

        // @ts-expect-error
        invalid: 'something',
      }

      expect(() => {
        render(<Form.Handler schema={schema}>content</Form.Handler>)
      }).toThrow('strict mode: unknown keyword: "invalid"')
    })

    it('should accept schema without required', () => {
      const schema: JSONSchema = {
        type: 'object',
        properties: {
          foo: {
            title: 'Foo',
          },
        },
      }

      render(<Form.Handler schema={schema}>content</Form.Handler>)
      expect(document.body).toHaveTextContent('content')
    })

    it('should have error when type is invalid', () => {
      const schema: JSONSchema = {
        type: 'object',
        properties: {
          foo: {
            // @ts-expect-error
            type: 'invalid',
            title: 'Foo',
          },
        },
      }

      expect(() => {
        render(<Form.Handler schema={schema}>content</Form.Handler>)
      }).toThrow(
        'schema is invalid: data/properties/foo/type must be equal to one of the allowed values, data/properties/foo/type must be array, data/properties/foo/type must match a schema in anyOf'
      )
    })

    it('should support JSONSchemaType', () => {
      type DataType = {
        foo: string
      }

      // strictNullChecks must be true in tsconfig to use JSONSchemaType
      // @ts-expect-error
      const schema: JSONSchemaType<DataType> = {
        type: 'object',
        properties: {
          foo: {
            title: 'Foo',
          },
        },
      }

      render(<Form.Handler schema={schema}>content</Form.Handler>)
      expect(document.body).toHaveTextContent('content')
    })
  })

  describe('decoupleFormElement', () => {
    it('should contain one form element', () => {
      render(
        <Form.Handler decoupleFormElement>
          <Form.Element>content</Form.Element>
        </Form.Handler>
      )

      const formElements = document.querySelectorAll('form')
      expect(formElements).toHaveLength(1)
    })

    it('should call onSubmit when form is submitted', () => {
      const onSubmit = jest.fn()

      render(
        <Form.Handler decoupleFormElement onSubmit={onSubmit}>
          <Form.Element>content</Form.Element>
        </Form.Handler>
      )

      fireEvent.submit(document.querySelector('form'))

      expect(onSubmit).toHaveBeenCalledTimes(1)
    })

    it('should spread rest props to form element', () => {
      render(
        <Form.Handler decoupleFormElement aria-label="Aria Label">
          <Form.Element>content</Form.Element>
        </Form.Handler>
      )

      expect(document.querySelector('form')).toHaveAttribute(
        'aria-label',
        'Aria Label'
      )
    })

    it('should overwrite rest props from handler', () => {
      render(
        <Form.Handler decoupleFormElement aria-label="Aria Label">
          <Form.Element aria-label="Overwrite">content</Form.Element>
        </Form.Handler>
      )

      expect(document.querySelector('form')).toHaveAttribute(
        'aria-label',
        'Overwrite'
      )
    })

    it('should render form element inside wrapper', () => {
      render(
        <Form.Handler decoupleFormElement>
          <div className="wrapper">
            <Form.Element>content</Form.Element>
          </div>
        </Form.Handler>
      )

      const formElements = document.querySelectorAll('.wrapper > form')
      expect(formElements).toHaveLength(1)
    })

    it('should warn when no form element is found', () => {
      const log = jest.spyOn(global.console, 'log').mockImplementation()

      render(<Form.Handler decoupleFormElement>content</Form.Handler>)

      expect(log).toHaveBeenCalledTimes(1)
      expect(log).toHaveBeenCalledWith(
        expect.any(String),
        'Please include a Form.Element when using decoupleFormElement!'
      )

      log.mockRestore()
    })
  })
})
