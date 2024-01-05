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
import * as DataContext from '../../../DataContext'
import * as Field from '../..'

export async function expectNever(callable: () => unknown): Promise<void> {
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

    it('renders label', () => {
      render(<Field.String label="The label" />)
      expect(screen.getByLabelText('The label')).toBeInTheDocument()
    })

    it('does not render placeholder when value is given', () => {
      render(
        <Field.String value="value-text" placeholder="placeholder-text" />
      )
      expect(
        screen.queryByText('placeholder-text')
      ).not.toBeInTheDocument()
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
          value=" first"
          onChange={onChange}
          onBlur={onBlur}
        />
      )

      const input = document.querySelector('input')

      expect(input).toHaveValue(' first')

      await userEvent.type(input, ' second ')

      expect(onChange).toHaveBeenLastCalledWith(' first second ')

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
        <Field.String autoComplete="firstName" />
      )
      expect(
        document.querySelector('input').getAttribute('autocomplete')
      ).toBe('firstName')

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

    it('should validate with ARIA rules', async () => {
      const result = render(
        <Field.String multiline label="Label" required validateInitially />
      )

      expect(await axeComponent(result)).toHaveNoViolations()
    })
  })
})
