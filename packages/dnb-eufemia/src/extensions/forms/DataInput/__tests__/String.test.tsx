import '@testing-library/jest-dom'
import React from 'react'
import { screen, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DataContext from '../../DataContext'
import DataInput from '..'

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

describe('DataInput.String', () => {
  describe('props', () => {
    it('renders value', () => {
      render(<DataInput.String value="test123" />)
      expect(screen.getByDisplayValue('test123')).toBeInTheDocument()
    })
    it('renders placeholder', () => {
      render(<DataInput.String placeholder="Enter something" />)
      expect(
        // getByText instead of getByPlaceholderText since eufemia adds placeholder as tag, not placeholder-attribute
        screen.getByText('Enter something')
      ).toBeInTheDocument()
    })
    it('does not render placeholder when value is given', () => {
      render(
        <DataInput.String
          value="value-text"
          placeholder="placeholder-text"
        />
      )
      expect(
        screen.queryByText('placeholder-text')
      ).not.toBeInTheDocument()
    })

    it('renders label', () => {
      render(<DataInput.String label="The label" />)
      expect(screen.getByLabelText('The label')).toBeInTheDocument()
    })
    it('renders error', () => {
      render(
        <DataInput.String error={new Error('This is what went wrong')} />
      )
      expect(
        screen.getByText('This is what went wrong')
      ).toBeInTheDocument()
    })
  })

  describe('event handlers', () => {
    it('calls onChange for every change of the input value', () => {
      const onChange = jest.fn()
      render(<DataInput.String value="abc" onChange={onChange} />)
      const input = screen.getByTestId('data-input-string')
      userEvent.type(input, 'def')
      expect(onChange.mock.calls).toHaveLength(3)
      expect(onChange.mock.calls[0][0]).toEqual('abcd')
      expect(onChange.mock.calls[1][0]).toEqual('abcde')
      expect(onChange.mock.calls[2][0]).toEqual('abcdef')
    })

    it('calls onFocus with current value', () => {
      const onFocus = jest.fn()
      render(<DataInput.String value="blah" onFocus={onFocus} />)
      const input = screen.getByTestId('data-input-string')
      input.focus()
      expect(onFocus.mock.calls).toHaveLength(1)
      expect(onFocus.mock.calls[0][0]).toEqual('blah')
    })

    it('calls onBlur with current value', () => {
      const onBlur = jest.fn()
      render(<DataInput.String value="song2" onBlur={onBlur} />)
      const input = screen.getByTestId('data-input-string')
      input.focus()
      input.blur()
      expect(onBlur.mock.calls).toHaveLength(1)
      expect(onBlur.mock.calls[0][0]).toEqual('song2')
      input.focus()
      userEvent.type(input, '345')
      input.blur()
      expect(onBlur.mock.calls).toHaveLength(2)
      expect(onBlur.mock.calls[1][0]).toEqual('song2345')
    })
  })

  describe('error handling', () => {
    describe('json schema', () => {
      describe('default behaviour', () => {
        it('should not show error message initially', () => {
          render(
            <DataInput.String
              value="abc"
              schema={{ type: 'string', minLength: 6 }}
            />
          )
          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('should not show error messages after focus and blur if value was not changed', () => {
          render(
            <DataInput.String
              value="abc"
              schema={{ type: 'string', minLength: 6 }}
            />
          )
          const input = screen.getByTestId('data-input-string')
          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
          input.focus()
          input.blur()
          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('should show error message if changing the value to an invalid one', () => {
          render(
            <DataInput.String
              value="abc"
              schema={{ type: 'string', minLength: 6 }}
            />
          )
          const input = screen.getByTestId('data-input-string')
          input.focus()
          userEvent.type(input, 'd')
          input.blur()
          expect(screen.getByRole('alert')).toBeInTheDocument()
        })

        it('should hide then error once you start typing, even if the current value is invalid', () => {
          render(
            <DataInput.String
              value="abc"
              schema={{ type: 'string', minLength: 6 }}
            />
          )
          const input = screen.getByTestId('data-input-string')
          input.focus()
          userEvent.type(input, 'd')
          input.blur()
          expect(screen.getByRole('alert')).toBeInTheDocument()
          input.focus()
          userEvent.type(input, 'e')
          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('does not show an error for valid values', () => {
          render(
            <DataInput.String
              value="abc"
              schema={{ type: 'string', minLength: 6 }}
            />
          )
          const input = screen.getByTestId('data-input-string')
          input.focus()
          userEvent.type(input, 'd')
          input.blur()
          expect(screen.getByRole('alert')).toBeInTheDocument()
          input.focus()
          userEvent.type(input, 'ef')
          input.blur()
          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })
      })

      describe('with validateInitially', () => {
        it('should show error message initially', () => {
          render(
            <DataInput.String
              value="abc"
              schema={{ type: 'string', minLength: 6 }}
              validateInitially
            />
          )
          expect(screen.getByRole('alert')).toBeInTheDocument()
        })
      })

      describe('with validateUnchanged', () => {
        it('should show error message when blurring without any changes', () => {
          render(
            <DataInput.String
              value="abc"
              schema={{ type: 'string', minLength: 6 }}
              validateUnchanged
            />
          )
          const input = screen.getByTestId('data-input-string')
          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
          input.focus()
          input.blur()
          expect(screen.getByRole('alert')).toBeInTheDocument()
        })
      })
    })

    describe('validation based on required-prop', () => {
      it('should show error for empty value', () => {
        render(<DataInput.String value="a" required />)
        const input = screen.getByTestId('data-input-string')
        input.focus()
        userEvent.type(input, '{backspace}')
        input.blur()
        expect(screen.getByRole('alert')).toBeInTheDocument()
      })

      it('should not show error when value is not empty', () => {
        render(<DataInput.String value="a" required />)
        const input = screen.getByTestId('data-input-string')
        input.focus()
        userEvent.type(input, 'b')
        input.blur()
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })
    })

    describe('validation based on minLength-prop', () => {
      // Assumption: When error messages should be shown or hidden is controlled by the same logic as
      // the json schema tests above, so it should be enough to test that each validation prop
      // lead to error correctly based on the given value.

      it('should show error for invalid value', () => {
        render(<DataInput.String value="abc" minLength={5} />)
        const input = screen.getByTestId('data-input-string')
        input.focus()
        userEvent.type(input, 'd')
        input.blur()
        expect(screen.getByRole('alert')).toBeInTheDocument()
      })

      it('should not show error message for valid value', () => {
        render(<DataInput.String value="abc" minLength={2} />)
        const input = screen.getByTestId('data-input-string')
        input.focus()
        userEvent.type(input, 'd')
        input.blur()
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })
    })

    describe('validation based on maxLength-prop', () => {
      it('should show error for invalid value', () => {
        render(<DataInput.String value="abc" maxLength={3} />)
        const input = screen.getByTestId('data-input-string')
        input.focus()
        userEvent.type(input, 'd')
        input.blur()
        expect(screen.getByRole('alert')).toBeInTheDocument()
      })

      it('should not show error message for valid value', () => {
        render(<DataInput.String value="abc" maxLength={4} />)
        const input = screen.getByTestId('data-input-string')
        input.focus()
        userEvent.type(input, 'd')
        input.blur()
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })
    })

    describe('validation based on pattern-prop', () => {
      it('should show error for invalid value', () => {
        render(
          <DataInput.String value="abcdef" pattern="^[a-z]{2}[0-9]+" />
        )
        const input = screen.getByTestId('data-input-string')
        input.focus()
        userEvent.type(input, 'g')
        input.blur()
        expect(screen.getByRole('alert')).toBeInTheDocument()
      })

      it('should not show error message for valid value', () => {
        render(<DataInput.String value="ab1" pattern="^[a-z]{2}[0-9]+" />)
        const input = screen.getByTestId('data-input-string')
        input.focus()
        userEvent.type(input, '2')
        input.blur()
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })
    })

    describe('validation using a synchronous external validator function', () => {
      it('should show error returned by validator', async () => {
        const validator = jest.fn(syncValidatorReturningError)
        render(
          <DataInput.String
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

        const input = screen.getByTestId('data-input-string')
        input.focus()
        userEvent.type(input, 'def')
        input.blur()

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
          <DataInput.String
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
          <DataInput.String
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

        const input = screen.getByTestId('data-input-string')
        input.focus()
        userEvent.type(input, 'def')
        input.blur()

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
            screen.getByText('Whats left when nothing is right?')
          ).toBeInTheDocument()
        })
      })

      it('should not show error when validator returns undefined', async () => {
        const validator = jest.fn(asyncValidatorResolvingWithUndefined)
        render(
          <DataInput.String
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
          <DataInput.String
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
        const input = screen.getByTestId('data-input-string')
        input.focus()
        userEvent.type(input, 'def')
        input.blur()

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
          <DataInput.String
            value="abc"
            onBlurValidator={validator}
            validateInitially
          />
        )
        const input = screen.getByTestId('data-input-string')
        input.focus()
        userEvent.type(input, 'd')
        input.blur()
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
          <DataInput.String
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
        const input = screen.getByTestId('data-input-string')
        input.focus()
        userEvent.type(input, 'def')
        input.blur()

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
          <DataInput.String
            value="abc"
            onBlurValidator={validator}
            validateInitially
          />
        )
        const input = screen.getByTestId('data-input-string')
        input.focus()
        userEvent.type(input, 'd')
        input.blur()
        await expectNever(() => {
          // Can't just waitFor and expect not to be in the document, it would approve the first render before the error might appear async.
          expect(screen.queryByRole('alert')).toBeInTheDocument()
        })
      })
    })
  })

  describe('with data context', () => {
    it('use target path value', () => {
      render(
        <DataContext.Provider data={{ foo: 'data-context-value' }}>
          <DataInput.String path="/foo" />
        </DataContext.Provider>
      )
      expect(
        screen.getByDisplayValue('data-context-value')
      ).toBeInTheDocument()
    })

    it('prioritizes value-prop above data context value when both are given', () => {
      render(
        <DataContext.Provider data={{ foo: 'data-context-value' }}>
          <DataInput.String path="/foo" value="direct-prop" />
        </DataContext.Provider>
      )
      expect(screen.getByDisplayValue('direct-prop')).toBeInTheDocument()
    })

    it('calls onChange and onPathChange correctly when an input was changed', () => {
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
          <DataInput.String path="/foo" onChange={inputOnChange} />
        </DataContext.Provider>
      )
      const input = screen.getByTestId('/foo')
      userEvent.type(input, 'O!')
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
