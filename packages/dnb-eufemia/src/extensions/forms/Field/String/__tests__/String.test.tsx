import React from 'react'
import { axeComponent, wait } from '../../../../../core/jest/jestSetup'
import {
  screen,
  render,
  waitFor,
  act,
  fireEvent,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SharedProvider from '../../../../../shared/Provider'
import DataContext from '../../../DataContext/Context'
import Provider from '../../../DataContext/Provider'
import { GlobalStatus } from '../../../../../components'
import {
  Field,
  FieldBlock,
  Form,
  FormError,
  Iterate,
  Validator,
  Value,
  z,
  makeAjvInstance,
} from '../../..'
import sharedGB from '../../../../../shared/locales/en-GB'
import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO']

const syncValidatorReturningUndefined = () => undefined

const syncValidatorReturningError = () =>
  new Error('I think this is wrong')

const asyncValidatorResolvingWithUndefined = () =>
  new Promise<Error | undefined>((resolve) =>
    setTimeout(() => resolve(undefined), 1)
  )
const asyncValidatorResolvingWithError = () =>
  new Promise<Error | undefined>((resolve) =>
    setTimeout(
      () => resolve(new Error('Whats left when nothing is right?')),
      1
    )
  )

describe('Field.String', () => {
  describe('props', () => {
    it('renders value', () => {
      const { rerender } = render(<Field.String value="test123" />)
      expect(document.querySelector('input')).toHaveValue('test123')

      rerender(<Field.String value="test123" multiline />)

      expect(document.querySelector('textarea')).toHaveValue('test123')
    })

    it('renders placeholder', () => {
      render(<Field.String placeholder="Enter something" />)
      expect(
        // getByText instead of getByPlaceholderText since eufemia adds placeholder as tag, not placeholder-attribute
        screen.getByText('Enter something')
      ).toBeInTheDocument()
    })

    it('renders help', () => {
      render(
        <Field.String
          help={{ title: 'Help title', content: 'Help content' }}
        />
      )
      expect(document.querySelector('input')).toHaveAttribute(
        'aria-describedby'
      )
      expect(
        document.querySelector('input').getAttribute('aria-describedby')
      ).toBe(document.querySelector('.dnb-help-button').id)
    })

    it('renders label once', () => {
      render(<Field.String label="The label" />)
      expect(screen.getByLabelText('The label')).toBeInTheDocument()
      expect(document.querySelectorAll('label')).toHaveLength(1)
    })

    it('does not render placeholder when value is given', () => {
      render(
        <Field.String value="value-text" placeholder="placeholder-text" />
      )
      expect(
        screen.queryByText('placeholder-text')
      ).not.toBeInTheDocument()
    })

    it('should set correct class when labelSrOnly is true', () => {
      render(<Field.String label="My label" labelSrOnly />)

      const element = document.querySelector('.dnb-form-label')

      expect(element).toHaveTextContent('My label')
      expect(element).toHaveClass('dnb-sr-only')
      expect(element).not.toHaveClass('dnb-form-label--interactive')
    })

    it('support Input props such as "keepPlaceholder"', async () => {
      render(
        <Field.String keepPlaceholder placeholder="Placeholder text" />
      )

      const input = document.querySelector('input')
      const inputField = document.querySelector('.dnb-input')

      expect(inputField).toHaveClass('dnb-input--keep-placeholder')
      expect(
        document.querySelector('.dnb-input__placeholder')
      ).toHaveTextContent('Placeholder text')

      fireEvent.focus(input)
      expect(
        document.querySelector('.dnb-input__placeholder')
      ).toHaveTextContent('Placeholder text')

      await userEvent.type(input, 'a')
      expect(document.querySelector('.dnb-input__placeholder')).toBeNull()

      await userEvent.type(input, '{Backspace}')
      fireEvent.focus(input)
      expect(
        document.querySelector('.dnb-input__placeholder')
      ).toHaveTextContent('Placeholder text')
    })

    it('support Input props such as "keepPlaceholder" in multiline', async () => {
      render(
        <Field.String
          keepPlaceholder
          placeholder="Placeholder text"
          multiline
        />
      )

      const textarea = document.querySelector('textarea')
      const textareaField = document.querySelector('.dnb-textarea')

      expect(textareaField).toHaveClass('dnb-textarea--keep-placeholder')
      expect(
        document.querySelector('.dnb-textarea__placeholder')
      ).toHaveTextContent('Placeholder text')

      fireEvent.focus(textarea)
      expect(
        document.querySelector('.dnb-textarea__placeholder')
      ).toHaveTextContent('Placeholder text')

      await userEvent.type(textarea, 'a')
      expect(
        document.querySelector('.dnb-textarea__placeholder')
      ).toBeNull()

      await userEvent.type(textarea, '{Backspace}')
      fireEvent.focus(textarea)
      expect(
        document.querySelector('.dnb-textarea__placeholder')
      ).toHaveTextContent('Placeholder text')
    })

    it('support Input props such as "size"', () => {
      render(<Field.String size="large" />)
      expect(document.querySelector('.dnb-input')).toHaveClass(
        'dnb-input--large'
      )
    })

    it('support Input props such as "align"', () => {
      render(<Field.String align="right" />)
      expect(document.querySelector('.dnb-input')).toHaveClass(
        'dnb-input__align--right'
      )
    })

    it('support Textarea props such as "autoresizeMaxRows"', async () => {
      render(
        <Field.String
          multiline
          autoresize
          rows={1}
          autoresizeMaxRows={4}
        />
      )

      const elem = document.querySelector('textarea')

      const style = {
        lineHeight: String(1.5 * 16),
      } as CSSStyleDeclaration

      jest
        .spyOn(window, 'getComputedStyle')
        .mockImplementation(() => style)

      jest
        .spyOn(elem, 'scrollHeight', 'get')
        .mockImplementation(() => 1.5 * 32)

      await userEvent.type(elem, 'a')
      expect(elem.style.height).toBe('48px')
    })

    it('should support disabled prop', () => {
      const { rerender } = render(
        <Field.String label="Disabled label" disabled />
      )

      const labelElement = () => document.querySelector('label')

      expect(labelElement()).toHaveAttribute('disabled')

      rerender(<Field.String label="Disabled label" />)

      expect(labelElement()).not.toHaveAttribute('disabled')
    })

    it('should support capitalize prop', async () => {
      const onChange = jest.fn()

      render(
        <Field.String onChange={onChange} capitalize value="first WORD" />
      )

      const input = document.querySelector('input')

      expect(input).toHaveValue('First Word')

      await userEvent.type(input, ' second')
      expect(input).toHaveValue('First Word Second')

      expect(onChange).toHaveBeenLastCalledWith(
        'First Word Second',
        expect.anything()
      )

      await userEvent.type(input, ' WORD')
      expect(input).toHaveValue('First Word Second Word')

      expect(onChange).toHaveBeenLastCalledWith(
        'First Word Second Word',
        expect.anything()
      )

      await userEvent.type(input, '{Backspace>22}')
      expect(input).toHaveValue('')

      await userEvent.type(input, 'æøå')
      expect(input).toHaveValue('Æøå')
    })

    it('should transform value with "transformIn" and "transformOut"', async () => {
      const onChangeProvider = jest.fn()
      const onChangeField = jest.fn()

      const transformIn = jest.fn((value) => {
        return value?.toUpperCase()
      })
      const transformOut = jest.fn((value) => {
        return value?.toLowerCase()
      })

      render(
        <Provider
          onChange={onChangeProvider}
          data={{
            myField: 'xYz',
          }}
        >
          <Field.String
            path="/myField"
            transformIn={transformIn}
            transformOut={transformOut}
            onChange={onChangeField}
          />
        </Provider>
      )

      const input = document.querySelector('input')

      expect(input).toHaveValue('XYZ')
      expect(transformIn).toHaveBeenCalledTimes(1)
      expect(transformIn).toHaveBeenLastCalledWith('xYz')
      expect(transformOut).toHaveBeenCalledTimes(0)
      expect(onChangeProvider).toHaveBeenCalledTimes(0)
      expect(onChangeField).toHaveBeenCalledTimes(0)

      await userEvent.type(input, '{Backspace>3}aBc')

      expect(input).toHaveValue('ABC')
      expect(transformIn).toHaveBeenCalledTimes(9)
      expect(transformIn).toHaveBeenLastCalledWith('abc')
      expect(transformOut).toHaveBeenCalledTimes(13)
      expect(transformOut).toHaveBeenLastCalledWith(
        'ABc',
        expect.anything()
      )
      expect(onChangeProvider).toHaveBeenCalledTimes(6)
      expect(onChangeProvider).toHaveBeenLastCalledWith(
        { myField: 'abc' },
        expect.anything()
      )
      expect(onChangeField).toHaveBeenCalledTimes(6)
      expect(onChangeField).toHaveBeenLastCalledWith(
        'abc',
        expect.anything()
      )

      await userEvent.type(input, '{Backspace>3}EfG')

      expect(input).toHaveValue('EFG')
      expect(transformIn).toHaveBeenCalledTimes(16)
      expect(transformIn).toHaveBeenLastCalledWith('efg')
      expect(transformOut).toHaveBeenCalledTimes(25)
      expect(transformOut).toHaveBeenLastCalledWith(
        'EFG',
        expect.anything()
      )
      expect(onChangeProvider).toHaveBeenCalledTimes(12)
      expect(onChangeProvider).toHaveBeenLastCalledWith(
        { myField: 'efg' },
        expect.anything()
      )
      expect(onChangeField).toHaveBeenCalledTimes(12)
      expect(onChangeField).toHaveBeenLastCalledWith(
        'efg',
        expect.anything()
      )
    })

    it('should support "transformIn" and "transformOut"', async () => {
      const transformOut = jest.fn((value) => {
        return { value, foo: 'bar' }
      })
      const transformIn = jest.fn((data) => {
        if (typeof data === 'string') {
          return data
        }
        return data?.value
      })
      const valueTransformIn = jest.fn((data) => {
        return data?.value
      })

      const onSubmit = jest.fn()

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Field.String
            path="/myValue"
            transformIn={transformIn}
            transformOut={transformOut}
            defaultValue="A"
          />

          <Value.String path="/myValue" transformIn={valueTransformIn} />
        </Form.Handler>
      )

      expect(transformOut).toHaveBeenCalledTimes(1)
      expect(transformIn).toHaveBeenCalledTimes(3)
      expect(valueTransformIn).toHaveBeenCalledTimes(2)

      const form = document.querySelector('form')
      const input = document.querySelector('input')

      expect(input).toHaveValue('A')

      fireEvent.submit(form)
      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenLastCalledWith(
        {
          myValue: {
            foo: 'bar',
            value: 'A',
          },
        },
        expect.anything()
      )

      expect(transformOut).toHaveBeenCalledTimes(1)
      expect(transformIn).toHaveBeenCalledTimes(4)
      expect(valueTransformIn).toHaveBeenCalledTimes(3)

      expect(input).toHaveValue('A')
      expect(
        document.querySelector('.dnb-forms-value-block__content')
      ).toHaveTextContent('A')

      await userEvent.type(input, '{Backspace>1}B')

      expect(input).toHaveValue('B')
      expect(
        document.querySelector('.dnb-forms-value-block__content')
      ).toHaveTextContent('B')

      expect(transformOut).toHaveBeenCalledTimes(6)
      expect(transformIn).toHaveBeenCalledTimes(6)
      expect(valueTransformIn).toHaveBeenCalledTimes(5)

      fireEvent.submit(form)
      expect(onSubmit).toHaveBeenCalledTimes(2)
      expect(onSubmit).toHaveBeenLastCalledWith(
        {
          myValue: {
            foo: 'bar',
            value: 'B',
          },
        },
        expect.anything()
      )

      expect(transformOut).toHaveBeenCalledTimes(6)
      expect(transformIn).toHaveBeenCalledTimes(7)
      expect(valueTransformIn).toHaveBeenCalledTimes(6)

      expect(transformOut).toHaveBeenNthCalledWith(1, 'A', undefined)
      expect(transformOut).toHaveBeenNthCalledWith(
        2,
        'A',
        expect.anything()
      )
      expect(transformOut).toHaveBeenNthCalledWith(
        3,
        undefined,
        expect.anything()
      )
      expect(transformOut).toHaveBeenNthCalledWith(
        4,
        undefined,
        expect.anything()
      )
      expect(transformOut).toHaveBeenNthCalledWith(
        5,
        'B',
        expect.anything()
      )
      expect(transformOut).toHaveBeenNthCalledWith(
        6,
        'B',
        expect.anything()
      )

      expect(transformIn).toHaveBeenNthCalledWith(1, 'A')
      expect(transformIn).toHaveBeenNthCalledWith(2, 'A')
      expect(transformIn).toHaveBeenNthCalledWith(3, {
        foo: 'bar',
        value: 'A',
      })
      expect(transformIn).toHaveBeenNthCalledWith(4, {
        foo: 'bar',
        value: 'A',
      })
      expect(transformIn).toHaveBeenNthCalledWith(5, {
        foo: 'bar',
        value: undefined,
      })
      expect(transformIn).toHaveBeenNthCalledWith(6, {
        foo: 'bar',
        value: 'B',
      })
      expect(transformIn).toHaveBeenNthCalledWith(7, {
        foo: 'bar',
        value: 'B',
      })

      expect(valueTransformIn).toHaveBeenNthCalledWith(1, undefined)
      expect(valueTransformIn).toHaveBeenNthCalledWith(2, {
        foo: 'bar',
        value: 'A',
      })
      expect(valueTransformIn).toHaveBeenNthCalledWith(3, {
        foo: 'bar',
        value: 'A',
      })
      expect(valueTransformIn).toHaveBeenNthCalledWith(4, {
        foo: 'bar',
        value: undefined,
      })
      expect(valueTransformIn).toHaveBeenNthCalledWith(5, {
        foo: 'bar',
        value: 'B',
      })
      expect(valueTransformIn).toHaveBeenNthCalledWith(6, {
        foo: 'bar',
        value: 'B',
      })
    })

    it('should trim whitespaces', async () => {
      const onChange = jest.fn()
      const onBlur = jest.fn()

      render(
        <Field.String
          trim
          value=" first"
          onChange={onChange}
          onBlur={onBlur}
        />
      )

      const input = document.querySelector('input')

      expect(input).toHaveValue(' first')

      await userEvent.type(input, ' second ')

      expect(onChange).toHaveBeenLastCalledWith(
        ' first second ',
        expect.anything()
      )

      fireEvent.blur(input)

      expect(input).toHaveValue('first second')
      expect(onBlur).toHaveBeenLastCalledWith(
        'first second',
        expect.anything()
      )
      expect(onChange).toHaveBeenLastCalledWith(
        'first second',
        expect.anything()
      )

      await userEvent.type(input, '{Backspace>12}third')

      expect(onChange).toHaveBeenLastCalledWith('third', expect.anything())

      fireEvent.blur(input)

      expect(input).toHaveValue('third')
      expect(onBlur).toHaveBeenLastCalledWith('third', expect.anything())
      expect(onChange).toHaveBeenLastCalledWith('third', expect.anything())
    })

    it('input is connected to label', () => {
      const { rerender } = render(<Field.String label="Label" />)

      expect(document.querySelector('input').getAttribute('id')).toBe(
        document.querySelector('label').getAttribute('for')
      )

      rerender(<Field.String label="Label" multiline />)

      expect(document.querySelector('textarea').getAttribute('id')).toBe(
        document.querySelector('label').getAttribute('for')
      )

      rerender(<Field.String label="Label" mask={[/\/d/]} />)

      expect(document.querySelector('input').getAttribute('id')).toBe(
        document.querySelector('label').getAttribute('for')
      )
    })

    it('renders autoComplete', () => {
      const { rerender } = render(
        <Field.String autoComplete="given-name" />
      )
      expect(
        document.querySelector('input').getAttribute('autocomplete')
      ).toBe('given-name')

      rerender(
        <Field.String path="/firstName" autoComplete="family-name" />
      )
      expect(document.querySelector('input').getAttribute('name')).toBe(
        'firstName'
      )
      expect(
        document.querySelector('input').getAttribute('autocomplete')
      ).toBe('family-name')

      rerender(
        <Field.String
          path="/firstName"
          autoComplete="family-name"
          name="additional-name"
        />
      )
      expect(document.querySelector('input').getAttribute('name')).toBe(
        'additional-name'
      )
      expect(
        document.querySelector('input').getAttribute('autocomplete')
      ).toBe('family-name')
    })

    it('renders name based on path', () => {
      render(<Field.String path="/firstName" />)
      expect(document.querySelector('input').getAttribute('name')).toBe(
        'firstName'
      )
    })

    it('renders error', () => {
      render(<Field.String error={new Error('This is what went wrong')} />)
      expect(
        screen.getByText('This is what went wrong')
      ).toBeInTheDocument()
    })

    describe('shows error border', () => {
      it('for basis input', () => {
        render(
          <Field.String error={new Error('This is what went wrong')} />
        )
        const element = document.querySelector('.dnb-input')
        expect(element.className).toContain('dnb-input__status--error')
      })

      it('for basis input in FieldBlock', () => {
        render(
          <FieldBlock>
            <Field.String error={new Error('This is what went wrong')} />
          </FieldBlock>
        )
        const element = document.querySelector('.dnb-input')
        expect(element.className).toContain('dnb-input__status--error')
      })

      it('for masked input', () => {
        render(
          <Field.String
            mask={[/\/d/]}
            error={new Error('This is what went wrong')}
          />
        )
        const element = document.querySelector('.dnb-input-masked')
        expect(element.className).toContain('dnb-input__status--error')
      })

      it('for masked input in FieldBlock', () => {
        render(
          <FieldBlock>
            <Field.String
              mask={[/\/d/]}
              error={new Error('This is what went wrong')}
            />
          </FieldBlock>
        )
        const element = document.querySelector('.dnb-input-masked')
        expect(element.className).toContain('dnb-input__status--error')
      })

      it('for multiline input', () => {
        render(
          <Field.String
            multiline
            error={new Error('This is what went wrong')}
          />
        )
        const element = document.querySelector('.dnb-textarea')
        expect(element.className).toContain('dnb-textarea__status--error')
      })

      it('for multiline in FieldBlock', () => {
        render(
          <FieldBlock>
            <Field.String
              multiline
              error={new Error('This is what went wrong')}
            />
          </FieldBlock>
        )
        const element = document.querySelector('.dnb-textarea')
        expect(element.className).toContain('dnb-textarea__status--error')
      })

      it('should apply data-attributes', () => {
        const { rerender } = render(
          <Field.String
            data-testid="testid"
            data-long-value="long-value"
          />
        )

        const input = document.querySelector('input')

        expect(input).toHaveAttribute('data-testid', 'testid')
        expect(input).toHaveAttribute('data-long-value', 'long-value')

        rerender(
          <Field.String
            data-testid="testid"
            data-long-value="long-value"
            multiline
          />
        )

        const textarea = document.querySelector('textarea')

        expect(textarea).toHaveAttribute('data-testid', 'testid')
        expect(textarea).toHaveAttribute('data-long-value', 'long-value')
      })
    })
  })

  describe('event handlers', () => {
    it('calls onChange for every change of the input value', async () => {
      const onChange = jest.fn()
      render(<Field.String value="abc" onChange={onChange} />)
      const input = document.querySelector('input')
      await userEvent.type(input, 'def')
      expect(onChange).toHaveBeenCalledTimes(3)
      expect(onChange).toHaveBeenNthCalledWith(
        1,
        'abcd',
        expect.anything()
      )
      expect(onChange).toHaveBeenNthCalledWith(
        2,
        'abcde',
        expect.anything()
      )
      expect(onChange).toHaveBeenNthCalledWith(
        3,
        'abcdef',
        expect.anything()
      )
    })

    it('calls onFocus with current value', () => {
      const onFocus = jest.fn()
      render(<Field.String value="blah" onFocus={onFocus} />)
      const input = document.querySelector('input')
      act(() => {
        input.focus()
      })
      expect(onFocus).toHaveBeenCalledTimes(1)
      expect(onFocus).toHaveBeenNthCalledWith(1, 'blah', expect.anything())
    })

    it('calls onBlur with current value', async () => {
      const onBlur = jest.fn()
      render(<Field.String value="song2" onBlur={onBlur} />)
      const input = document.querySelector('input')
      input.focus()
      fireEvent.blur(input)
      await waitFor(() => {
        expect(onBlur).toHaveBeenCalledTimes(1)
        expect(onBlur).toHaveBeenNthCalledWith(
          1,
          'song2',
          expect.anything()
        )
      })
      await userEvent.type(input, '345')
      fireEvent.blur(input)
      expect(onBlur).toHaveBeenCalledTimes(2)
      expect(onBlur).toHaveBeenNthCalledWith(
        2,
        'song2345',
        expect.anything()
      )
    })

    it('should show submit indicator on async onChange', async () => {
      const onChange = jest.fn(async () => {
        await wait(30)
      })

      render(<Field.String label="Label" onChange={onChange} />)

      const input = document.querySelector('input')
      const indicator = document.querySelector(
        '.dnb-forms-submit-indicator'
      )

      // Use fireEvent over userEvent to avoid async related delays
      fireEvent.change(input, { target: { value: 'foo' } })

      await waitFor(() => {
        expect(input).not.toBeDisabled()
        expect(indicator).toHaveClass(
          'dnb-forms-submit-indicator--state-pending'
        )
      })
      await waitFor(() => {
        expect(input).not.toBeDisabled()
        expect(indicator).toHaveClass(
          'dnb-forms-submit-indicator--state-complete'
        )
      })
    })
  })

  describe('error handling', () => {
    describe('json schema', () => {
      describe('default behavior', () => {
        it('should not show error message initially', () => {
          render(
            <Field.String
              value="abc"
              schema={{ type: 'string', minLength: 6 }}
            />
          )
          expect(
            document.querySelector('.dnb-form-status')
          ).not.toBeInTheDocument()
        })

        it('should not show error messages after focus and blur if value was not changed', () => {
          render(
            <Field.String
              value="abc"
              schema={{ type: 'string', minLength: 6 }}
            />
          )
          const input = document.querySelector('input')
          expect(
            document.querySelector('.dnb-form-status')
          ).not.toBeInTheDocument()
          fireEvent.blur(input)
          expect(
            document.querySelector('.dnb-form-status')
          ).not.toBeInTheDocument()
        })

        it('should show error only after changing when the value is still invalid', async () => {
          render(
            <Provider ajvInstance={makeAjvInstance()}>
              <Field.String
                value="abc"
                schema={{ type: 'string', minLength: 6 }}
              />
            </Provider>
          )
          // Do not show error initially when validateInitially is not enabled, to avoid initial error messages all over empty forms
          expect(
            document.querySelector('.dnb-form-status')
          ).not.toBeInTheDocument()
          const input = document.querySelector('input')
          // Errors should be hidden while typing (field is in focus)
          await userEvent.type(input, 'd')
          expect(
            document.querySelector('.dnb-form-status')
          ).not.toBeInTheDocument()
          // Error should be visible after blurring the field
          fireEvent.blur(input)
          expect(screen.getByRole('alert')).toBeInTheDocument()
          // But remain gone when it becomes valid before blurring
          await userEvent.type(input, 'ef')
          fireEvent.blur(input)
          expect(
            document.querySelector('.dnb-form-status')
          ).not.toBeInTheDocument()
        })
      })

      it('should list all errors with translations', () => {
        render(
          <Field.String
            validateInitially
            maxLength={3}
            pattern="^[a-zA-Z]$"
            value="invalid"
          />
        )

        const firstError = nb.StringField.errorMaxLength.replace(
          '{maxLength}',
          '3'
        )
        const secondError = nb.Field.errorPattern

        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
        expect(
          document.querySelector('.dnb-form-status').textContent
        ).toBe(nb.Field.errorSummary + firstError + secondError)
      })

      describe('with validateInitially', () => {
        it('should show error message initially', async () => {
          render(
            <Provider ajvInstance={makeAjvInstance()}>
              <Field.String
                value="abc"
                schema={{ type: 'string', minLength: 6 }}
                validateInitially
              />
            </Provider>
          )
          await waitFor(() => {
            expect(screen.getByRole('alert')).toBeInTheDocument()
          })
        })
      })

      describe('with validateUnchanged', () => {
        it('should show error message when blurring without any changes', async () => {
          render(
            <Provider ajvInstance={makeAjvInstance()}>
              <Field.String
                value="abc"
                schema={{ type: 'string', minLength: 6 }}
                validateUnchanged
              />
            </Provider>
          )
          const input = document.querySelector('input')
          expect(
            document.querySelector('.dnb-form-status')
          ).not.toBeInTheDocument()
          input.focus()
          fireEvent.blur(input)
          await waitFor(() => {
            expect(screen.getByRole('alert')).toBeInTheDocument()
          })
        })
      })
    })

    // Assumption: When error messages should be shown or hidden is controlled by the same logic as
    // the json schema tests above, so it should be enough to test that each validation prop
    // lead to error correctly based on the given value.

    describe('validation based on required-prop', () => {
      it('should show error for empty value', async () => {
        render(<Field.String value="a" required />)
        const input = document.querySelector('input')
        await userEvent.type(input, '{Backspace}')
        fireEvent.blur(input)
        expect(screen.getByRole('alert')).toBeInTheDocument()
      })

      it('should not show error when value is not empty', async () => {
        render(<Field.String value="a" required />)
        const input = document.querySelector('input')
        await userEvent.type(input, 'b')
        fireEvent.blur(input)
        expect(
          document.querySelector('.dnb-form-status')
        ).not.toBeInTheDocument()
      })

      it('should show error for initially empty value when required and validateInitially is set', async () => {
        render(<Field.String value="" required validateInitially />)
        expect(screen.getByRole('alert')).toBeInTheDocument()
      })

      it('should show error for initially empty value when required and blur event when validateUnchanged is set', async () => {
        render(<Field.String value="" required validateUnchanged />)
        const input = document.querySelector('input')
        input.focus()
        fireEvent.blur(input)
        expect(screen.getByRole('alert')).toBeInTheDocument()
      })
    })

    describe('validation based on minLength-prop', () => {
      it('should show error for invalid value', async () => {
        render(<Field.String value="abc" minLength={5} />)
        const input = document.querySelector('input')
        await userEvent.type(input, 'd')
        fireEvent.blur(input)
        expect(screen.getByRole('alert')).toBeInTheDocument()
      })

      it('should not show error message for valid value', async () => {
        render(<Field.String value="abc" minLength={2} />)
        const input = document.querySelector('input')
        await userEvent.type(input, 'd')
        fireEvent.blur(input)
        expect(
          document.querySelector('.dnb-form-status')
        ).not.toBeInTheDocument()
      })
    })

    describe('validation based on maxLength-prop', () => {
      it('should show error for invalid value', async () => {
        render(<Field.String value="abc" maxLength={3} />)
        const input = document.querySelector('input')
        await userEvent.type(input, 'd')
        fireEvent.blur(input)
        expect(screen.getByRole('alert')).toBeInTheDocument()
      })

      it('should not show error message for valid value', async () => {
        render(<Field.String value="abc" maxLength={4} />)
        const input = document.querySelector('input')
        await userEvent.type(input, 'd')
        fireEvent.blur(input)
        expect(
          document.querySelector('.dnb-form-status')
        ).not.toBeInTheDocument()
      })
    })

    describe('validation based on pattern-prop', () => {
      it('should show error for invalid value', async () => {
        render(<Field.String value="abcdef" pattern="^[a-z]{2}[0-9]+" />)
        const input = document.querySelector('input')
        await userEvent.type(input, 'g')
        fireEvent.blur(input)
        expect(screen.getByRole('alert')).toBeInTheDocument()
      })

      it('should not show error message for valid value', async () => {
        render(<Field.String value="ab1" pattern="^[a-z]{2}[0-9]+" />)
        const input = document.querySelector('input')
        await userEvent.type(input, '2')
        fireEvent.blur(input)
        expect(
          document.querySelector('.dnb-form-status')
        ).not.toBeInTheDocument()
      })
    })

    describe('onChangeValidator', () => {
      it('should render error message given as JSX', async () => {
        const onChangeValidator: Validator<string> = jest.fn(() => {
          return (
            <>
              A <strong>formatted</strong> error message
            </>
          )
        })

        render(<Field.String onChangeValidator={onChangeValidator} />)

        const input = document.querySelector('input')
        await userEvent.type(input, 'foo')
        fireEvent.blur(input)

        expect(
          document.querySelector('.dnb-form-status__text').innerHTML
        ).toBe('A <strong>formatted</strong> error message')
        expect(
          document.querySelector('.dnb-form-status').textContent
        ).toBe('A formatted error message')
      })

      it('should render error message given as JSX when async', async () => {
        const onChangeValidator: Validator<string> = jest.fn(async () => {
          return (
            <>
              A <strong>formatted</strong> error message
            </>
          )
        })

        render(<Field.String onChangeValidator={onChangeValidator} />)

        const input = document.querySelector('input')
        await userEvent.type(input, 'foo')

        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status__text').innerHTML
          ).toBe('A <strong>formatted</strong> error message')
          expect(
            document.querySelector('.dnb-form-status').textContent
          ).toBe('A formatted error message')
        })
      })

      describe('validation using a synchronous external onChangeValidator function', () => {
        it('should show error returned by onChangeValidator', async () => {
          const onChangeValidator: Validator<string> = jest.fn(
            syncValidatorReturningError
          )
          render(
            <Field.String
              value="abc"
              onChangeValidator={onChangeValidator}
              validateInitially
            />
          )
          await waitFor(() => {
            // Wait for since external validators are processed asynchronously
            expect(onChangeValidator).toHaveBeenCalledTimes(1)
            expect(onChangeValidator).toHaveBeenNthCalledWith(
              1,
              'abc',
              expect.anything()
            )
            expect(
              screen.getByText('I think this is wrong')
            ).toBeInTheDocument()
          })

          const input = document.querySelector('input')
          await userEvent.type(input, 'def')
          fireEvent.blur(input)

          await waitFor(() => {
            expect(onChangeValidator).toHaveBeenCalledTimes(4)
            expect(onChangeValidator).toHaveBeenNthCalledWith(
              2,
              'abcd',
              expect.anything()
            )
            expect(onChangeValidator).toHaveBeenNthCalledWith(
              3,
              'abcde',
              expect.anything()
            )
            expect(onChangeValidator).toHaveBeenNthCalledWith(
              4,
              'abcdef',
              expect.anything()
            )
            expect(
              screen.getByText('I think this is wrong')
            ).toBeInTheDocument()
          })
        })

        it('should not show error when onChangeValidator returns undefined', async () => {
          const onChangeValidator: Validator<string> = jest.fn(
            syncValidatorReturningUndefined
          )
          render(
            <Field.String
              value="abc"
              onChangeValidator={onChangeValidator}
              validateInitially
            />
          )
          await expect(() => {
            expect(
              document.querySelector('.dnb-form-status')
            ).toBeInTheDocument()
          }).toNeverResolve()
        })
      })

      describe('validation using an asynchronous external onChangeValidator function', () => {
        it('should show error returned by onChangeValidator', async () => {
          const onChangeValidator: Validator<string> = jest.fn(
            asyncValidatorResolvingWithError
          )
          render(
            <Field.String
              value="abc"
              onChangeValidator={onChangeValidator}
              validateInitially
            />
          )
          await waitFor(() => {
            // Wait for since external validators are processed asynchronously
            expect(onChangeValidator).toHaveBeenCalledTimes(1)
            expect(onChangeValidator).toHaveBeenNthCalledWith(
              1,
              'abc',
              expect.anything()
            )
            expect(
              screen.getByText('Whats left when nothing is right?')
            ).toBeInTheDocument()
          })

          const input = document.querySelector('input')
          await userEvent.type(input, 'def')

          act(() => {
            fireEvent.blur(input)
          })

          expect(onChangeValidator).toHaveBeenCalledTimes(4)
          expect(onChangeValidator).toHaveBeenNthCalledWith(
            2,
            'abcd',
            expect.anything()
          )
          expect(onChangeValidator).toHaveBeenNthCalledWith(
            3,
            'abcde',
            expect.anything()
          )
          expect(onChangeValidator).toHaveBeenNthCalledWith(
            4,
            'abcdef',
            expect.anything()
          )
          expect(
            screen.getByText('Whats left when nothing is right?')
          ).toBeInTheDocument()
        })

        it('should not show error when onChangeValidator returns undefined', async () => {
          const onChangeValidator: Validator<string> = jest.fn(
            asyncValidatorResolvingWithUndefined
          )
          render(
            <Field.String
              value="foo"
              onChangeValidator={onChangeValidator}
              validateInitially
            />
          )

          await expect(() => {
            expect(
              document.querySelector('.dnb-form-status')
            ).toBeInTheDocument()
          }).toNeverResolve()
        })
      })
    })

    describe('onBlurValidator', () => {
      it('should render error message given as JSX', async () => {
        const onBlurValidator: Validator<string> = jest.fn(() => {
          return (
            <>
              A <strong>formatted</strong> error message
            </>
          )
        })

        render(<Field.String onBlurValidator={onBlurValidator} />)

        const input = document.querySelector('input')
        await userEvent.type(input, 'foo')
        fireEvent.blur(input)

        expect(
          document.querySelector('.dnb-form-status__text').innerHTML
        ).toBe('A <strong>formatted</strong> error message')
        expect(
          document.querySelector('.dnb-form-status').textContent
        ).toBe('A formatted error message')
      })

      it('should render error message given as JSX when async', async () => {
        const onBlurValidator: Validator<string> = jest.fn(async () => {
          return (
            <>
              A <strong>formatted</strong> error message
            </>
          )
        })

        render(<Field.String onBlurValidator={onBlurValidator} />)

        const input = document.querySelector('input')
        await userEvent.type(input, 'foo')
        fireEvent.blur(input)

        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status__text').innerHTML
          ).toBe('A <strong>formatted</strong> error message')
          expect(
            document.querySelector('.dnb-form-status').textContent
          ).toBe('A formatted error message')
        })
      })

      describe('validation using a synchronous external onBlurValidator function', () => {
        it('should show error returned by onBlurValidator', async () => {
          const onBlurValidator: Validator<string> = jest.fn(
            syncValidatorReturningError
          )
          render(
            <Field.String
              value="abc"
              onBlurValidator={onBlurValidator}
              validateInitially
            />
          )

          await waitFor(() => {
            // Wait for since external validators are processed asynchronously
            expect(onBlurValidator).toHaveBeenCalledTimes(1)
            expect(
              document.querySelector('.dnb-form-status')
            ).toBeInTheDocument()
          })
          const input = document.querySelector('input')
          await userEvent.type(input, 'def')
          fireEvent.blur(input)

          await waitFor(() => {
            // Wait for since external validators are processed asynchronously
            expect(onBlurValidator).toHaveBeenCalledTimes(2)
            expect(onBlurValidator).toHaveBeenNthCalledWith(
              1,
              'abc',
              expect.anything()
            )
            expect(onBlurValidator).toHaveBeenNthCalledWith(
              2,
              'abcdef',
              expect.anything()
            )

            expect(
              screen.getByText('I think this is wrong')
            ).toBeInTheDocument()
          })
        })

        it('should not show error when onBlurValidator returns undefined', async () => {
          const onBlurValidator: Validator<string> = jest.fn(
            syncValidatorReturningUndefined
          )
          render(
            <Field.String
              value="abc"
              onBlurValidator={onBlurValidator}
              validateInitially
            />
          )
          const input = document.querySelector('input')
          await userEvent.type(input, 'd')
          fireEvent.blur(input)
          await expect(() => {
            expect(
              document.querySelector('.dnb-form-status')
            ).toBeInTheDocument()
          }).toNeverResolve()
        })
      })

      describe('validation using an asynchronous external onBlurValidator function', () => {
        it('should show error returned by onBlurValidator', async () => {
          const onBlurValidator: Validator<string> = jest.fn(
            asyncValidatorResolvingWithError
          )
          render(
            <Field.String
              value="abc"
              onBlurValidator={onBlurValidator}
              validateInitially
            />
          )

          await waitFor(() => {
            // Wait for since external validators are processed asynchronously
            expect(onBlurValidator).toHaveBeenCalledTimes(1)
            expect(
              document.querySelector('.dnb-form-status')
            ).toBeInTheDocument()
          })
          const input = document.querySelector('input')
          await userEvent.type(input, 'def')
          fireEvent.blur(input)

          await waitFor(() => {
            // Wait for since external validators are processed asynchronously
            expect(onBlurValidator).toHaveBeenCalledTimes(2)
            expect(onBlurValidator).toHaveBeenNthCalledWith(
              1,
              'abc',
              expect.anything()
            )
            expect(onBlurValidator).toHaveBeenNthCalledWith(
              2,
              'abcdef',
              expect.anything()
            )

            expect(
              screen.getByText('Whats left when nothing is right?')
            ).toBeInTheDocument()
          })
        })

        it('should not show error when onBlurValidator returns undefined', async () => {
          const onBlurValidator: Validator<string> = jest.fn(
            asyncValidatorResolvingWithUndefined
          )
          render(
            <Field.String
              value="abc"
              onBlurValidator={onBlurValidator}
              validateInitially
            />
          )
          const input = document.querySelector('input')
          await userEvent.type(input, 'd')
          fireEvent.blur(input)
          await expect(() => {
            expect(
              document.querySelector('.dnb-form-status')
            ).toBeInTheDocument()
          }).toNeverResolve()
        })
      })
    })

    describe('errorMessages', () => {
      it('should show provided errorMessages based on validation rule', () => {
        render(
          <Field.String
            errorMessages={{
              'Field.errorRequired': 'You need this',
            }}
            required
            validateInitially
          />
        )
        expect(
          document.querySelector('.dnb-form-status').textContent
        ).toBe('You need this')
      })

      it('should support custom error messages', () => {
        render(
          <Field.String
            error={new FormError('MyCustom.message')}
            errorMessages={{
              'MyCustom.message': 'Your custom error message',
            }}
          />
        )
        expect(
          document.querySelector('.dnb-form-status').textContent
        ).toBe('Your custom error message')
      })

      it('should render error message given as JSX', () => {
        render(
          <Field.String
            error={new FormError('MyCustom.message')}
            errorMessages={{
              'MyCustom.message': (
                <>
                  A <strong>formatted</strong> error message
                </>
              ),
            }}
          />
        )
        expect(
          document.querySelector('.dnb-form-status__text').innerHTML
        ).toBe('A <strong>formatted</strong> error message')
        expect(
          document.querySelector('.dnb-form-status').textContent
        ).toBe('A formatted error message')
      })

      it('should show provided errorMessages based on validation rule with injected value', () => {
        render(
          <Field.String
            emptyValue=""
            value=""
            errorMessages={{
              'StringField.errorMinLength': 'At least {minLength}.',
            }}
            minLength={4}
            validateInitially
          />
        )

        expect(
          document.querySelector('.dnb-form-status').textContent
        ).toBe('At least 4.')
      })

      it('should provide error message to the onBlurValidator', async () => {
        let collectCustomMessage = null
        const customMessage = 'Your custom error message'

        render(
          <Field.String
            errorMessages={{
              'MyCustom.message': customMessage,
            }}
            onBlurValidator={(value, { errorMessages }) => {
              collectCustomMessage = errorMessages['MyCustom.message']
              return new FormError('MyCustom.message')
            }}
            validateInitially
          />
        )

        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status').textContent
          ).toBe(customMessage)
        })

        expect(collectCustomMessage).toBe(customMessage)
      })
    })
  })

  describe('with data context', () => {
    it('use target path value', () => {
      render(
        <Provider data={{ foo: 'data-context-value' }}>
          <Field.String path="/foo" />
        </Provider>
      )
      expect(
        screen.getByDisplayValue('data-context-value')
      ).toBeInTheDocument()
    })

    it('prioritizes value-prop above data context value when both are given', () => {
      render(
        <Provider data={{ foo: 'data-context-value' }}>
          <Field.String path="/foo" value="direct-prop" />
        </Provider>
      )
      expect(screen.getByDisplayValue('direct-prop')).toBeInTheDocument()
    })

    it('calls onChange and onPathChange correctly when an input was changed', async () => {
      const dataContextOnChange = jest.fn()
      const dataContextOnPathChange = jest.fn()
      const inputOnChange = jest.fn()
      render(
        <Provider
          data={{
            foo: 'FOO',
            bar: 'BAAAR',
          }}
          onChange={dataContextOnChange}
          onPathChange={dataContextOnPathChange}
        >
          <Field.String path="/foo" onChange={inputOnChange} />
        </Provider>
      )
      const input = document.querySelector('input')
      await userEvent.type(input, 'O!')

      await waitFor(() => {
        expect(inputOnChange).toHaveBeenNthCalledWith(
          1,
          'FOOO',
          expect.anything()
        )
        expect(inputOnChange).toHaveBeenNthCalledWith(
          2,
          'FOOO!',
          expect.anything()
        )

        expect(dataContextOnChange).toHaveBeenNthCalledWith(
          1,
          {
            foo: 'FOOO',
            bar: 'BAAAR',
          },
          expect.anything()
        )
        expect(dataContextOnChange).toHaveBeenNthCalledWith(
          2,
          {
            foo: 'FOOO!',
            bar: 'BAAAR',
          },
          expect.anything()
        )

        expect(dataContextOnPathChange).toHaveBeenNthCalledWith(
          1,
          '/foo',
          'FOOO'
        )
        expect(dataContextOnPathChange).toHaveBeenNthCalledWith(
          2,
          '/foo',
          'FOOO!'
        )
      })
    })
  })

  it('should render characterCounter', async () => {
    const { rerender } = render(
      <SharedProvider>
        <Field.String multiline characterCounter={8} value="foo" />
      </SharedProvider>
    )

    const counter = document.querySelector('.dnb-text-counter')
    const textarea = document.querySelector('textarea')
    const ariaLive = document.querySelector('.dnb-aria-live')

    expect(counter).toHaveTextContent('5 av 8 tegn gjenstår')
    expect(ariaLive).toHaveTextContent('')

    await userEvent.type(textarea, 'bar')

    expect(counter).toHaveTextContent('2 av 8 tegn gjenstår')
    expect(ariaLive).toHaveTextContent('2 av 8 tegn gjenstår')

    rerender(
      <SharedProvider locale="en-GB">
        <Field.String multiline characterCounter={8} value="foo" />
      </SharedProvider>
    )

    expect(counter).toHaveTextContent('2 of 8 characters remaining')

    await userEvent.type(textarea, 'baz')

    expect(ariaLive).toHaveTextContent('1 characters over the limit of 8')

    rerender(
      <SharedProvider locale="en-GB">
        <Field.String
          multiline
          characterCounter={{ max: 8, variant: 'up' }}
          value="foo"
        />
      </SharedProvider>
    )

    expect(counter).toHaveTextContent(
      sharedGB['en-GB'].TextCounter.characterExceeded
        .replace('%count', '1')
        .replace('%max', '8')
    )
  })

  it('gets valid ref element', () => {
    const id = 'unique'
    let ref: React.RefObject<HTMLInputElement>

    const MockComponent = () => {
      ref = React.useRef()
      return <Field.String id={id} innerRef={ref} />
    }

    render(<MockComponent />)

    expect(ref.current instanceof HTMLInputElement).toBe(true)
    expect(ref.current.id).toBe(id)
    expect(ref.current.tagName).toBe('INPUT')
  })

  it('should store "displayValue" in data context', async () => {
    let dataContext = null

    render(
      <Form.Handler>
        <Field.String
          path="/myValue"
          mask={[/\d/, /\d/, /\d/, ' ', 'kr']}
          defaultValue="123"
        />
        <DataContext.Consumer>
          {(context) => {
            dataContext = context
            return null
          }}
        </DataContext.Consumer>
      </Form.Handler>
    )

    const input = document.querySelector('input')

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myValue': {
        type: 'field',
        value: '123 kr',
      },
    })

    await userEvent.type(input, '{Backspace>2}4')

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myValue': {
        type: 'field',
        value: '124 kr',
      },
    })

    await userEvent.type(input, '{Backspace>5}')

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myValue': {
        type: 'field',
      },
    })
  })

  it('should transform submit data with "transformData"', async () => {
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
      </Form.Handler>
    )

    fireEvent.submit(document.querySelector('form'))

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(transformedData).toEqual({
      stringField: {
        value: 'foo',
        label: 'String label',
        displayValue: 'foo',
      },
    })

    await userEvent.type(
      document.querySelector('input'),
      '{Backspace>3}bar'
    )

    fireEvent.submit(document.querySelector('form'))

    expect(onSubmit).toHaveBeenCalledTimes(2)
    expect(transformedData).toEqual({
      stringField: {
        value: 'bar',
        label: 'String label',
        displayValue: 'bar',
      },
    })

    await userEvent.type(document.querySelector('input'), '{Backspace>3}')

    fireEvent.submit(document.querySelector('form'))

    expect(onSubmit).toHaveBeenCalledTimes(3)
    expect(transformedData).toEqual({
      stringField: {
        value: undefined,
        label: 'String label',
        displayValue: undefined,
      },
    })
  })

  it('should store "displayValue" when inside iterate', async () => {
    let dataContext = null

    render(
      <Form.Handler
        defaultData={{ myArray: [{ myValue: '123' }, { myValue: '456' }] }}
      >
        <Iterate.Array path="/myArray">
          <Field.String
            label="Item no. {itemNo}"
            itemPath="/myValue"
            mask={[/\d/, /\d/, /\d/, ' ', 'kr']}
          />
        </Iterate.Array>

        <DataContext.Consumer>
          {(context) => {
            dataContext = context
            return null
          }}
        </DataContext.Consumer>
      </Form.Handler>
    )

    const input = document.querySelector('input')

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myArray/0/myValue': {
        type: 'field',
        value: '123 kr',
      },
      '/myArray/1/myValue': {
        type: 'field',
        value: '456 kr',
      },
    })

    await userEvent.type(input, '{Backspace>2}4')

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myArray/0/myValue': {
        type: 'field',
        value: '124 kr',
      },
      '/myArray/1/myValue': {
        type: 'field',
        value: '456 kr',
      },
    })

    await userEvent.type(input, '{Backspace>5}')

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myArray/0/myValue': {
        type: 'field',
      },
      '/myArray/1/myValue': {
        type: 'field',
        value: '456 kr',
      },
    })
  })

  describe('ARIA', () => {
    it('should validate with ARIA rules', async () => {
      const result = render(
        <Field.String label="Label" required validateInitially />
      )

      expect(await axeComponent(result)).toHaveNoViolations()
    })

    it('should have aria-required', () => {
      render(<Field.String required />)

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('aria-required', 'true')
    })

    it('should have aria-invalid', () => {
      render(
        <Provider ajvInstance={makeAjvInstance()}>
          <Field.String
            value="abc"
            schema={{ type: 'string', minLength: 6 }}
            validateInitially
          />
        </Provider>
      )

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })

    describe('multiline', () => {
      it('should validate with ARIA rule', async () => {
        const result = render(
          <Field.String
            multiline
            label="Label"
            required
            validateInitially
          />
        )

        expect(await axeComponent(result)).toHaveNoViolations()
      })

      it('should have aria-required', () => {
        render(<Field.String multiline required />)

        const textarea = document.querySelector('textarea')
        expect(textarea).toHaveAttribute('aria-required', 'true')
      })

      it('should have aria-invalid', () => {
        render(
          <Provider ajvInstance={makeAjvInstance()}>
            <Field.String
              multiline
              value="abc"
              schema={{ type: 'string', minLength: 6 }}
              validateInitially
            />
          </Provider>
        )

        const textarea = document.querySelector('textarea')
        expect(textarea).toHaveAttribute('aria-invalid', 'true')
      })
    })
  })

  describe('info prop', () => {
    it('should link FormStatus correctly', () => {
      render(<Field.String info="Info message" />)

      const input = document.querySelector('input')
      const describedBy = input.getAttribute('aria-describedby')

      const ids = document.querySelectorAll(`#${describedBy}`)
      expect(ids).toHaveLength(1)
      expect(ids[0]).toBeInTheDocument()
      expect(ids[0]).toHaveClass('dnb-form-status--info')
      expect(ids[0]).toHaveTextContent('Info message')
    })

    it('should render array in ul with title', () => {
      const firstInfo = 'Info message A'
      const secondInfo = 'Info message B'

      render(<Field.String info={[firstInfo, secondInfo]} />)

      expect(document.querySelector('.dnb-form-status').textContent).toBe(
        nb.Field.stateSummary + firstInfo + secondInfo
      )
    })
  })

  describe('warning prop', () => {
    it('should link FormStatus correctly', () => {
      render(<Field.String warning="Warning message" />)

      const input = document.querySelector('input')
      const describedBy = input.getAttribute('aria-describedby')

      const ids = document.querySelectorAll(`#${describedBy}`)
      expect(ids).toHaveLength(1)
      expect(ids[0]).toBeInTheDocument()
      expect(ids[0]).toHaveClass('dnb-form-status--warn')
      expect(ids[0]).toHaveTextContent('Warning message')
    })

    it('should render array in ul with title', () => {
      const firstWarning = 'Warning message A'
      const secondWarning = 'Warning message B'

      render(<Field.String warning={[firstWarning, secondWarning]} />)

      expect(document.querySelector('.dnb-form-status').textContent).toBe(
        nb.Field.stateSummary + firstWarning + secondWarning
      )
    })
  })

  describe('error prop', () => {
    it('should link FormStatus correctly', () => {
      render(<Field.String error={new Error('Error message')} />)

      const input = document.querySelector('input')
      const describedBy = input.getAttribute('aria-describedby')

      const ids = document.querySelectorAll(`#${describedBy}`)
      const [status] = Array.from(ids)

      expect(ids).toHaveLength(1)
      expect(status).toBeInTheDocument()
      expect(status).toHaveClass('dnb-form-status--error')
      expect(status).toHaveTextContent('Error message')
    })

    it('should render array in ul with title', () => {
      const firstError = 'Error message A'
      const secondError = 'Error message B'

      render(
        <Field.String
          error={[new Error(firstError), new Error(secondError)]}
        />
      )

      expect(document.querySelector('.dnb-form-status').textContent).toBe(
        nb.Field.errorSummary + firstError + secondError
      )
    })

    it('should render error message given as JSX', () => {
      render(
        <Field.String
          error={
            <>
              A <strong>formatted</strong> error message
            </>
          }
        />
      )
      expect(
        document.querySelector('.dnb-form-status__text').innerHTML
      ).toBe('A <strong>formatted</strong> error message')
      expect(document.querySelector('.dnb-form-status').textContent).toBe(
        'A formatted error message'
      )
    })

    it('should render error message given as JSX in an array', () => {
      render(
        <Field.String
          error={[
            <>
              First <strong>formatted</strong> error message
            </>,
            <>
              Second <strong>formatted</strong> error message
            </>,
          ]}
        />
      )
      expect(
        document.querySelector('.dnb-form-status__text').innerHTML
      ).toBe(
        nb.Field.errorSummary +
          '<ul class="dnb-ul"><li class="dnb-li">First <strong>formatted</strong> error message</li><li class="dnb-li">Second <strong>formatted</strong> error message</li></ul>'
      )
    })

    it('should render error message given as in multiple ways', () => {
      render(
        <Field.String
          error={[
            'First error message',
            <>
              Second <strong>formatted</strong> error message.
            </>,
            new Error('Third error message'),
            new FormError('fourth.message'),
            new FormError('fifth.message'),
          ]}
          errorMessages={{
            'fourth.message': 'Fourth error message',
            'fifth.message': (
              <>
                Fifth <strong>formatted</strong> error message.
              </>
            ),
          }}
        />
      )
      expect(
        document.querySelector('.dnb-form-status__text').innerHTML
      ).toBe(
        nb.Field.errorSummary +
          '<ul class="dnb-ul"><li class="dnb-li">First error message</li><li class="dnb-li">Second <strong>formatted</strong> error message.</li><li class="dnb-li">Third error message</li><li class="dnb-li">Fourth error message</li><li class="dnb-li">Fifth <strong>formatted</strong> error message.</li></ul>'
      )
    })

    it('should prevent form submit with error message given as JSX', () => {
      const onSubmit = jest.fn()

      const { rerender } = render(
        <Form.Handler onSubmit={onSubmit}>
          <Field.String
            path="/myValue"
            error={
              <>
                A <strong>formatted</strong> error message
              </>
            }
          />
        </Form.Handler>
      )

      fireEvent.submit(document.querySelector('form'))

      expect(onSubmit).not.toHaveBeenCalled()
      expect(
        document.querySelector('.dnb-form-status__text').innerHTML
      ).toBe('A <strong>formatted</strong> error message')
      expect(document.querySelector('.dnb-form-status').textContent).toBe(
        'A formatted error message'
      )

      rerender(
        <Form.Handler onSubmit={onSubmit}>
          <Field.String path="/myValue" error={undefined} />
        </Form.Handler>
      )

      fireEvent.submit(document.querySelector('form'))

      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(
        document.querySelector('.dnb-form-status__text')
      ).not.toBeInTheDocument()
    })
  })

  describe('useFieldProps and FieldBlock', () => {
    const inputError = 'StatusMessage error'
    const inputWarning = 'StatusMessage warning'
    const inputInfo = 'StatusMessage info'

    it('should handle aria-describedby', async () => {
      render(
        <Field.String
          id="unique"
          error={new Error('error')}
          warning="warning"
          info="info"
          required
        />
      )

      const input = document.querySelector('input')

      expect(input).toHaveAttribute(
        'aria-describedby',
        'unique-form-status--error unique-form-status--warning unique-form-status--info'
      )

      const [first, second, third] = Array.from(
        document.querySelectorAll('.dnb-form-status')
      )

      expect(first).toHaveAttribute('id', 'unique-form-status--error')
      expect(second).toHaveAttribute('id', 'unique-form-status--warning')
      expect(third).toHaveAttribute('id', 'unique-form-status--info')

      expect(
        document.querySelectorAll('#unique-form-status--error')
      ).toHaveLength(1)
      expect(
        document.querySelectorAll('#unique-form-status--warning')
      ).toHaveLength(1)
      expect(
        document.querySelectorAll('#unique-form-status--info')
      ).toHaveLength(1)

      await userEvent.type(input, 'x')

      expect(
        document.querySelectorAll('#unique-form-status--error')
      ).toHaveLength(1)
      expect(
        document.querySelectorAll('#unique-form-status--warning')
      ).toHaveLength(1)
      expect(
        document.querySelectorAll('#unique-form-status--info')
      ).toHaveLength(1)

      fireEvent.blur(input)

      expect(input).toHaveAttribute(
        'aria-describedby',
        'unique-form-status--error unique-form-status--warning unique-form-status--info'
      )
    })

    it('should handle FormStatus ids', () => {
      render(
        <Field.String
          id="unique"
          error={new Error('error')}
          warning="warning"
          info="info"
        />
      )

      const input = document.querySelector('input')

      expect(input).toHaveAttribute(
        'aria-describedby',
        'unique-form-status--error unique-form-status--warning unique-form-status--info'
      )

      const [first, second, third] = Array.from(
        document.querySelectorAll('.dnb-form-status')
      )

      expect(first).toHaveAttribute('id', 'unique-form-status--error')
      expect(second).toHaveAttribute('id', 'unique-form-status--warning')
      expect(third).toHaveAttribute('id', 'unique-form-status--info')

      expect(
        document.querySelectorAll('#unique-form-status--error')
      ).toHaveLength(1)
      expect(
        document.querySelectorAll('#unique-form-status--warning')
      ).toHaveLength(1)
      expect(
        document.querySelectorAll('#unique-form-status--info')
      ).toHaveLength(1)
    })

    it('should handle status messages', async () => {
      render(
        <Field.String
          id="unique"
          error={new Error(inputError)}
          warning={inputWarning}
          info={inputInfo}
          required
        />
      )

      const input = document.querySelector('input')

      const [first, second, third] = Array.from(
        document.querySelectorAll('.dnb-form-status')
      )

      expect(first).toHaveTextContent(inputError)
      expect(second).toHaveTextContent(inputWarning)
      expect(third).toHaveTextContent(inputInfo)

      await userEvent.type(input, 'x')

      expect(first).toHaveTextContent(inputError)
      expect(second).toHaveTextContent(inputWarning)
      expect(third).toHaveTextContent(inputInfo)

      fireEvent.blur(input)

      expect(first).toHaveTextContent(inputError)
      expect(second).toHaveTextContent(inputWarning)
      expect(third).toHaveTextContent(inputInfo)
    })
  })

  describe('emptyValue', () => {
    it('should use the given emptyValue and set in the data context', async () => {
      const onSubmit = jest.fn()

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Field.String path="/myValue" emptyValue="" />
        </Form.Handler>
      )

      const form = document.querySelector('form')
      const input = document.querySelector('input')
      expect(input).toHaveValue('')

      fireEvent.submit(form)
      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenLastCalledWith(
        { myValue: '' },
        expect.anything()
      )

      await userEvent.type(input, ' ')

      fireEvent.submit(form)
      expect(onSubmit).toHaveBeenCalledTimes(2)
      expect(onSubmit).toHaveBeenLastCalledWith(
        { myValue: ' ' },
        expect.anything()
      )

      await userEvent.type(input, '{Backspace}')

      fireEvent.submit(form)
      expect(onSubmit).toHaveBeenCalledTimes(3)
      expect(onSubmit).toHaveBeenLastCalledWith(
        { myValue: '' },
        expect.anything()
      )
    })

    it('should set the emptyValue when string gets empty', async () => {
      const onSubmit = jest.fn()

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Field.String path="/myValue" emptyValue="foo" />
        </Form.Handler>
      )

      const form = document.querySelector('form')
      const input = document.querySelector('input')
      expect(input).toHaveValue('foo')

      fireEvent.submit(form)
      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenLastCalledWith(
        { myValue: 'foo' },
        expect.anything()
      )

      await userEvent.type(input, ' ')

      fireEvent.submit(form)
      expect(onSubmit).toHaveBeenCalledTimes(2)
      expect(onSubmit).toHaveBeenLastCalledWith(
        { myValue: 'foo ' },
        expect.anything()
      )

      await userEvent.type(input, '{Backspace>4}')

      fireEvent.submit(form)
      expect(onSubmit).toHaveBeenCalledTimes(3)
      expect(onSubmit).toHaveBeenLastCalledWith(
        { myValue: 'foo' },
        expect.anything()
      )
    })
  })

  describe('onInput', () => {
    it('should prevent typing of invalid characters', async () => {
      const forbiddenRegex = /\d/

      const onInput = jest.fn(
        (event: React.FormEvent<HTMLInputElement>) => {
          const inputEl = event.currentTarget
          const currentVal = inputEl.value
          const oldVal = inputEl.dataset.oldVal

          if (currentVal.length <= oldVal.length) {
            inputEl.dataset.oldVal = currentVal
            return // stop here
          }

          const addedLength = currentVal.length - oldVal.length
          const caretPos = inputEl.selectionStart
          const inserted = currentVal.substring(
            caretPos - addedLength,
            caretPos
          )

          if (forbiddenRegex.test(inserted)) {
            inputEl.value = oldVal

            inputEl.setSelectionRange(
              caretPos - addedLength,
              caretPos - addedLength
            )
          } else {
            inputEl.dataset.oldVal = currentVal
          }
        }
      )

      const onFocus = jest.fn(
        (event: React.FormEvent<HTMLInputElement>) => {
          const inputEl = event.currentTarget
          if (typeof inputEl.dataset.oldVal === 'undefined') {
            inputEl.dataset.oldVal = inputEl.value
          }
        }
      )

      render(
        <Form.Handler>
          <Field.String
            path="/myValue"
            value="Here are some digits: 123"
            htmlAttributes={{
              onFocus,
              onInput,
            }}
          />
        </Form.Handler>
      )

      const input = document.querySelector('input')

      await userEvent.type(input, '456')

      expect(input).toHaveValue('Here are some digits: 123')

      await userEvent.type(input, '{Backspace>3}456')

      expect(input).toHaveValue('Here are some digits: ')

      await userEvent.type(input, 'foo')

      expect(input).toHaveValue('Here are some digits: foo')
    })
  })

  describe('GlobalStatus', () => {
    it('should render error given as JSX in GlobalStatus', async () => {
      jest.spyOn(window, 'scrollTo').mockImplementation()

      render(
        <>
          <GlobalStatus />
          <Field.String
            error={
              <>
                A <strong>formatted</strong> error message
              </>
            }
          />
        </>
      )

      // Wait for GlobalStatus to render the error
      await waitFor(() => {
        const content = document.querySelector(
          '.dnb-global-status__message__content'
        )
        expect(content).toBeInTheDocument()
      })

      // JSX content is rendered directly in the content div, not wrapped in a p tag
      const content = document.querySelector(
        '.dnb-global-status__message__content'
      )
      expect(content.innerHTML).toContain(
        'A <strong>formatted</strong> error message'
      )
    })
  })

  describe('Zod validation', () => {
    it('shows localized min error when Zod schema has min without custom message (direct)', async () => {
      const schema = z.string().min(4) // expect localized key usage

      render(<Field.String schema={schema} />)
      const input = document.querySelector('input')

      await userEvent.type(input, 'foo') // length 3
      input.blur()

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument()
        expect(screen.getByRole('alert')).toHaveTextContent(
          nb.StringField.errorMinLength.replace('{minLength}', '4')
        )
      })
    })

    it('shows localized min error when Zod schema has min without custom message (via Form.Handler)', async () => {
      const schema = z.object({ name: z.string().min(6) })

      render(
        <Form.Handler schema={schema}>
          <Field.String path="/name" />
        </Form.Handler>
      )

      const input = document.querySelector('input')
      await userEvent.type(input, 'hello') // length 5
      input.blur()

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument()
        expect(screen.getByRole('alert')).toHaveTextContent(
          nb.StringField.errorMinLength.replace('{minLength}', '6')
        )
      })
    })

    it('shows localized max error when Zod schema has max without custom message (direct)', async () => {
      const schema = z.string().max(3)

      render(<Field.String schema={schema} />)
      const input = document.querySelector('input')

      await userEvent.type(input, 'four') // length 4 exceeds
      input.blur()

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument()
        expect(screen.getByRole('alert')).toHaveTextContent(
          nb.StringField.errorMaxLength.replace('{maxLength}', '3')
        )
      })
    })

    it('shows localized max error when Zod schema has max without custom message (via Form.Handler)', async () => {
      const schema = z.object({ code: z.string().max(2) })

      render(
        <Form.Handler schema={schema}>
          <Field.String path="/code" />
        </Form.Handler>
      )

      const input = document.querySelector('input')
      await userEvent.type(input, 'ABC') // length 3
      input.blur()

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument()
        expect(screen.getByRole('alert')).toHaveTextContent(
          nb.StringField.errorMaxLength.replace('{maxLength}', '2')
        )
      })
    })

    it('shows custom pattern error when Zod schema has regex with custom message', async () => {
      const schema = z
        .string()
        .regex(/^[A-Z]{2}\d{4}$/, 'Must be 2 letters followed by 4 digits')

      render(
        <Field.String schema={schema} value="abc123" validateInitially />
      )

      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Must be 2 letters followed by 4 digits'
      )
    })

    it('shows localized pattern error when Zod schema has regex without custom message (default)', async () => {
      const schema = z.string().regex(/^[A-Z]{2}\d{4}$/)

      render(
        <Field.String schema={schema} value="abc123" validateInitially />
      )

      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(screen.getByRole('alert')).toHaveTextContent(
        nb.Field.errorPattern
      )
    })
    it('should validate with Zod schema', async () => {
      const schema = z.string().min(5, 'Minimum 5 characters required')

      render(
        <Field.String value="abc" schema={schema} validateInitially />
      )

      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(
        screen.getByText('Minimum 5 characters required')
      ).toBeInTheDocument()
    })

    it('should not show error for valid value using Zod schema', async () => {
      const schema = z.string().min(3)

      render(
        <Field.String value="abc" schema={schema} validateInitially />
      )

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()
    })

    it('should accept Zod schema provided by Form.Handler without errors', async () => {
      // Use a simple schema that validates the entire form data
      const schema = z.object({
        name: z.string().min(5, 'Name must be at least 5 characters'),
      })

      // This should render without throwing any errors
      expect(() => {
        render(
          <Form.Handler schema={schema} defaultData={{ name: 'abc' }}>
            <Field.String path="/name" />
          </Form.Handler>
        )
      }).not.toThrow()

      // Verify the form rendered correctly
      expect(document.querySelector('input')).toBeInTheDocument()
      expect(document.querySelector('input')).toHaveValue('abc')
    })

    it('should not show error for valid value when Zod schema is provided by Form.Handler', async () => {
      const schema = z.object({
        name: z.string().min(3, 'Name must be at least 3 characters'),
      })

      render(
        <Form.Handler schema={schema}>
          <Field.String path="/name" value="abcdef" validateInitially />
        </Form.Handler>
      )

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()
    })

    describe('validation using Zod schema', () => {
      it('should show error for invalid value using Zod schema', async () => {
        const schema = z.string().min(5, 'Minimum 5 characters required')

        render(
          <Field.String value="abc" schema={schema} validateInitially />
        )
        expect(screen.getByRole('alert')).toBeInTheDocument()
        expect(
          screen.getByText('Minimum 5 characters required')
        ).toBeInTheDocument()
      })

      it('should not show error for valid value using Zod schema', async () => {
        const schema = z.string().min(3, 'Minimum 3 characters required')

        render(
          <Field.String value="abc" schema={schema} validateInitially />
        )
        expect(
          document.querySelector('.dnb-form-status')
        ).not.toBeInTheDocument()
      })

      it('should show error on blur for invalid value using Zod schema', async () => {
        const schema = z.string().min(5, 'Minimum 5 characters required')

        render(
          <Field.String value="abc" schema={schema} validateUnchanged />
        )
        const input = document.querySelector('input')
        input.focus()
        fireEvent.blur(input)
        await waitFor(() => {
          expect(screen.getByRole('alert')).toBeInTheDocument()
        })
        expect(
          screen.getByText('Minimum 5 characters required')
        ).toBeInTheDocument()
      })
    })
  })
})
