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
import { Provider } from '../../../../../shared'
import * as DataContext from '../../../DataContext'
import { Field, FieldBlock } from '../../..'

async function expectNever(callable: () => unknown): Promise<void> {
  await expect(() => waitFor(callable)).rejects.toEqual(expect.anything())
}

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

    it('support Input props such as "keepPlaceholder"', () => {
      render(<Field.String keepPlaceholder />)
      expect(document.querySelector('.dnb-input')).toHaveClass(
        'dnb-input--keep-placeholder'
      )
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

      expect(onChange).toHaveBeenLastCalledWith('First Word Second')

      await userEvent.type(input, ' WORD')
      expect(input).toHaveValue('First Word Second Word')

      expect(onChange).toHaveBeenLastCalledWith('First Word Second Word')

      await userEvent.type(input, '{Backspace>22}')
      expect(input).toHaveValue('')

      await userEvent.type(input, 'æøå')
      expect(input).toHaveValue('Æøå')
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

      expect(onChange).toHaveBeenLastCalledWith(' first second ')

      fireEvent.blur(input)

      expect(input).toHaveValue('first second')
      expect(onBlur).toHaveBeenLastCalledWith('first second')
      expect(onChange).toHaveBeenLastCalledWith('first second')

      await userEvent.type(input, '{Backspace>12}third')

      expect(onChange).toHaveBeenLastCalledWith('third')

      fireEvent.blur(input)

      expect(input).toHaveValue('third')
      expect(onBlur).toHaveBeenLastCalledWith('third')
      expect(onChange).toHaveBeenLastCalledWith('third')
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
      expect(onChange.mock.calls).toHaveLength(3)
      expect(onChange.mock.calls[0][0]).toEqual('abcd')
      expect(onChange.mock.calls[1][0]).toEqual('abcde')
      expect(onChange.mock.calls[2][0]).toEqual('abcdef')
    })

    it('calls onFocus with current value', () => {
      const onFocus = jest.fn()
      render(<Field.String value="blah" onFocus={onFocus} />)
      const input = document.querySelector('input')
      act(() => {
        input.focus()
      })
      expect(onFocus.mock.calls).toHaveLength(1)
      expect(onFocus.mock.calls[0][0]).toEqual('blah')
    })

    it('calls onBlur with current value', async () => {
      const onBlur = jest.fn()
      render(<Field.String value="song2" onBlur={onBlur} />)
      const input = document.querySelector('input')
      input.focus()
      fireEvent.blur(input)
      await wait(0)
      expect(onBlur.mock.calls).toHaveLength(1)
      expect(onBlur.mock.calls[0][0]).toEqual('song2')
      await userEvent.type(input, '345')
      fireEvent.blur(input)
      expect(onBlur.mock.calls).toHaveLength(2)
      expect(onBlur.mock.calls[1][0]).toEqual('song2345')
    })
  })

  describe('error handling', () => {
    describe('json schema', () => {
      describe('default behaviour', () => {
        it('should not show error message initially', () => {
          render(
            <Field.String
              value="abc"
              schema={{ type: 'string', minLength: 6 }}
            />
          )
          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('should not show error messages after focus and blur if value was not changed', () => {
          render(
            <Field.String
              value="abc"
              schema={{ type: 'string', minLength: 6 }}
            />
          )
          const input = document.querySelector('input')
          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
          fireEvent.blur(input)
          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('should show error only after changing when the value is still invalid', async () => {
          render(
            <Field.String
              value="abc"
              schema={{ type: 'string', minLength: 6 }}
            />
          )
          // Do not show error initially when validateInitially is not enabled, to avoid initial error messages all over empty forms
          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
          const input = document.querySelector('input')
          // Errors should be hidden while typing (field is in focus)
          await userEvent.type(input, 'd')
          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
          // Error should be visible after blurring the field
          fireEvent.blur(input)
          expect(screen.getByRole('alert')).toBeInTheDocument()
          // But remain gone when it becomes valid before blurring
          await userEvent.type(input, 'ef')
          fireEvent.blur(input)
          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })
      })

      describe('with validateInitially', () => {
        it('should show error message initially', async () => {
          render(
            <Field.String
              value="abc"
              schema={{ type: 'string', minLength: 6 }}
              validateInitially
            />
          )
          await waitFor(() => {
            expect(screen.getByRole('alert')).toBeInTheDocument()
          })
        })
      })

      describe('with validateUnchanged', () => {
        it('should show error message when blurring without any changes', async () => {
          render(
            <Field.String
              value="abc"
              schema={{ type: 'string', minLength: 6 }}
              validateUnchanged
            />
          )
          const input = document.querySelector('input')
          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
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
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
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
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
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
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
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
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })
    })

    describe('validation using a synchronous external validator function', () => {
      it('should show error returned by validator', async () => {
        const validator = jest.fn(syncValidatorReturningError)
        render(
          <Field.String
            value="abc"
            validator={validator}
            validateInitially
          />
        )
        await waitFor(() => {
          // Wait for since external validators are processed asynchronously
          expect(validator.mock.calls).toHaveLength(1)
          expect((validator.mock.calls[0] as unknown[])[0]).toEqual('abc')
          expect(
            screen.getByText('I think this is wrong')
          ).toBeInTheDocument()
        })

        const input = document.querySelector('input')
        await userEvent.type(input, 'def')
        fireEvent.blur(input)

        await waitFor(() => {
          expect(validator.mock.calls).toHaveLength(4)
          expect((validator.mock.calls[1] as unknown[])[0]).toEqual('abcd')
          expect((validator.mock.calls[2] as unknown[])[0]).toEqual(
            'abcde'
          )
          expect((validator.mock.calls[3] as unknown[])[0]).toEqual(
            'abcdef'
          )
          expect(
            screen.getByText('I think this is wrong')
          ).toBeInTheDocument()
        })
      })

      it('should not show error when validator returns undefined', async () => {
        const validator = jest.fn(syncValidatorReturningUndefined)
        render(
          <Field.String
            value="abc"
            validator={validator}
            validateInitially
          />
        )
        await expectNever(() => {
          // Can't just waitFor and expect not to be in the document, it would approve the first render before the error might appear async.
          expect(screen.queryByRole('alert')).toBeInTheDocument()
        })
      })
    })

    describe('validation using an asynchronous external validator function', () => {
      it('should show error returned by validator', async () => {
        const validator = jest.fn(asyncValidatorResolvingWithError)
        render(
          <Field.String
            value="abc"
            validator={validator}
            validateInitially
          />
        )
        await waitFor(() => {
          // Wait for since external validators are processed asynchronously
          expect(validator.mock.calls).toHaveLength(1)
          expect((validator.mock.calls[0] as unknown[])[0]).toEqual('abc')
          expect(
            screen.getByText('Whats left when nothing is right?')
          ).toBeInTheDocument()
        })

        const input = document.querySelector('input')
        await userEvent.type(input, 'def')

        act(() => {
          fireEvent.blur(input)
        })

        expect(validator.mock.calls).toHaveLength(4)
        expect((validator.mock.calls[1] as unknown[])[0]).toEqual('abcd')
        expect((validator.mock.calls[2] as unknown[])[0]).toEqual('abcde')
        expect((validator.mock.calls[3] as unknown[])[0]).toEqual('abcdef')
        expect(
          screen.getByText('Whats left when nothing is right?')
        ).toBeInTheDocument()
      })

      it('should not show error when validator returns undefined', async () => {
        const validator = jest.fn(asyncValidatorResolvingWithUndefined)
        render(
          <Field.String
            value="foo"
            validator={validator}
            validateInitially
          />
        )

        await expectNever(() => {
          // Can't just waitFor and expect not to be in the document, it would approve the first render before the error might appear async.
          expect(screen.queryByRole('alert')).toBeInTheDocument()
        })
      })
    })

    describe('validation using a synchronous external onBlurValidator function', () => {
      it('should show error returned by validator', async () => {
        const validator = jest.fn(syncValidatorReturningError)
        render(
          <Field.String
            value="abc"
            onBlurValidator={validator}
            validateInitially
          />
        )

        await waitFor(() => {
          // Wait for since external validators are processed asynchronously
          expect(validator.mock.calls).toHaveLength(0)
          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })
        const input = document.querySelector('input')
        await userEvent.type(input, 'def')
        fireEvent.blur(input)

        await waitFor(() => {
          // Wait for since external validators are processed asynchronously
          expect(validator.mock.calls).toHaveLength(1)
          expect((validator.mock.calls[0] as unknown[])[0]).toEqual(
            'abcdef'
          )

          expect(
            screen.getByText('I think this is wrong')
          ).toBeInTheDocument()
        })
      })

      it('should not show error when validator returns undefined', async () => {
        const validator = jest.fn(syncValidatorReturningUndefined)
        render(
          <Field.String
            value="abc"
            onBlurValidator={validator}
            validateInitially
          />
        )
        const input = document.querySelector('input')
        await userEvent.type(input, 'd')
        fireEvent.blur(input)
        await expectNever(() => {
          // Can't just waitFor and expect not to be in the document, it would approve the first render before the error might appear async.
          expect(screen.queryByRole('alert')).toBeInTheDocument()
        })
      })
    })

    describe('validation using an asynchronous external onBlurValidator function', () => {
      it('should show error returned by validator', async () => {
        const validator = jest.fn(asyncValidatorResolvingWithError)
        render(
          <Field.String
            value="abc"
            onBlurValidator={validator}
            validateInitially
          />
        )

        await waitFor(() => {
          // Wait for since external validators are processed asynchronously
          expect(validator.mock.calls).toHaveLength(0)
          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })
        const input = document.querySelector('input')
        await userEvent.type(input, 'def')
        fireEvent.blur(input)

        await waitFor(() => {
          // Wait for since external validators are processed asynchronously
          expect(validator.mock.calls).toHaveLength(1)
          expect((validator.mock.calls[0] as unknown[])[0]).toEqual(
            'abcdef'
          )

          expect(
            screen.getByText('Whats left when nothing is right?')
          ).toBeInTheDocument()
        })
      })

      it('should not show error when validator returns undefined', async () => {
        const validator = jest.fn(asyncValidatorResolvingWithUndefined)
        render(
          <Field.String
            value="abc"
            onBlurValidator={validator}
            validateInitially
          />
        )
        const input = document.querySelector('input')
        await userEvent.type(input, 'd')
        fireEvent.blur(input)
        await expectNever(() => {
          // Can't just waitFor and expect not to be in the document, it would approve the first render before the error might appear async.
          expect(screen.queryByRole('alert')).toBeInTheDocument()
        })
      })
    })

    describe('errorMessages', () => {
      it('should show provided errorMessages based on validation rule', () => {
        render(
          <Field.String
            emptyValue=""
            value=""
            errorMessages={{
              required: 'You need this',
            }}
            required
            validateInitially
          />
        )
        expect(screen.getByText('You need this')).toBeInTheDocument()
      })

      it('should show provided errorMessages based on validation rule with injected value', () => {
        render(
          <Field.String
            emptyValue=""
            value=""
            errorMessages={{
              minLength: 'At least {minLength}..',
            }}
            minLength={4}
            validateInitially
          />
        )
        expect(screen.getByText('At least 4..')).toBeInTheDocument()
      })
    })
  })

  describe('with data context', () => {
    it('use target path value', () => {
      render(
        <DataContext.Provider data={{ foo: 'data-context-value' }}>
          <Field.String path="/foo" />
        </DataContext.Provider>
      )
      expect(
        screen.getByDisplayValue('data-context-value')
      ).toBeInTheDocument()
    })

    it('prioritizes value-prop above data context value when both are given', () => {
      render(
        <DataContext.Provider data={{ foo: 'data-context-value' }}>
          <Field.String path="/foo" value="direct-prop" />
        </DataContext.Provider>
      )
      expect(screen.getByDisplayValue('direct-prop')).toBeInTheDocument()
    })

    it('calls onChange and onPathChange correctly when an input was changed', async () => {
      const dataContextOnChange = jest.fn()
      const dataContextOnPathChange = jest.fn()
      const inputOnChange = jest.fn()
      render(
        <DataContext.Provider
          data={{
            foo: 'FOO',
            bar: 'BAAAR',
          }}
          onChange={dataContextOnChange}
          onPathChange={dataContextOnPathChange}
        >
          <Field.String path="/foo" onChange={inputOnChange} />
        </DataContext.Provider>
      )
      const input = document.querySelector('input')
      await userEvent.type(input, 'O!')

      await waitFor(() => {
        expect(inputOnChange.mock.calls).toHaveLength(2)
        expect(inputOnChange.mock.calls[0][0]).toEqual('FOOO')
        expect(inputOnChange.mock.calls[1][0]).toEqual('FOOO!')

        expect(dataContextOnChange.mock.calls).toHaveLength(2)
        expect(dataContextOnChange.mock.calls[0][0]).toEqual({
          foo: 'FOOO',
          bar: 'BAAAR',
        })
        expect(dataContextOnChange.mock.calls[1][0]).toEqual({
          foo: 'FOOO!',
          bar: 'BAAAR',
        })

        expect(dataContextOnPathChange.mock.calls).toHaveLength(2)
        expect(dataContextOnPathChange.mock.calls[0]).toEqual([
          '/foo',
          'FOOO',
        ])
        expect(dataContextOnPathChange.mock.calls[1]).toEqual([
          '/foo',
          'FOOO!',
        ])
      })
    })
  })

  it('should render characterCounter', async () => {
    const { rerender } = render(
      <Provider>
        <Field.String multiline characterCounter={8} value="foo" />
      </Provider>
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
      <Provider locale="en-GB">
        <Field.String multiline characterCounter={8} value="foo" />
      </Provider>
    )

    expect(counter).toHaveTextContent('2 of 8 characters remaining')

    await userEvent.type(textarea, 'baz')

    expect(ariaLive).toHaveTextContent(
      'You have exceeded the limit by 1 on 8 characters'
    )

    rerender(
      <Provider locale="en-GB">
        <Field.String
          multiline
          characterCounter={{ max: 8, variant: 'up' }}
          value="foo"
        />
      </Provider>
    )

    expect(counter).toHaveTextContent(
      'You have exceeded the limit by 9 on 8 characters'
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
        <Field.String
          value="abc"
          schema={{ type: 'string', minLength: 6 }}
          validateInitially
        />
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
          <Field.String
            multiline
            value="abc"
            schema={{ type: 'string', minLength: 6 }}
            validateInitially
          />
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
})
