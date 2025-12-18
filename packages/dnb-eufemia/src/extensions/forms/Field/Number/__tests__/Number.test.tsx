import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import {
  screen,
  render,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  DataContext,
  Field,
  FieldBlock,
  Form,
  Iterate,
  JSONSchema,
  makeAjvInstance,
  z,
} from '../../..'
import { format } from '../../../../../components/number-format/NumberUtils'
import { Provider as SharedProvider } from '../../../../../shared'
import nbNO from '../../../constants/locales/nb-NO'
import enGB from '../../../constants/locales/en-GB'

const nb = nbNO['nb-NO']
const en = enGB['en-GB']

describe('Field.Number', () => {
  describe('props', () => {
    it('renders value', () => {
      render(<Field.Number value={42} />)
      expect(screen.getByDisplayValue('42')).toBeInTheDocument()
    })

    it('renders placeholder', () => {
      render(<Field.Number placeholder="Enter some number" />)
      expect(
        // getByText instead of getByPlaceholderText since eufemia adds placeholder as tag, not placeholder-attribute
        screen.getByText('Enter some number')
      ).toBeInTheDocument()
    })

    it('renders help', () => {
      render(
        <Field.Number
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

    it('renders label', () => {
      render(<Field.Number label="Number label" />)
      expect(screen.getByLabelText('Number label')).toBeInTheDocument()
    })

    it('renders custom mask with 6 digits', () => {
      render(
        <Field.Number
          mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
          value={1234}
        />
      )

      expect(document.querySelector('input')).toHaveValue('1234​​')
    })

    it('renders custom mask with 4 digits', () => {
      render(<Field.Number mask={Array(4).fill(/\d/)} value={1234} />)

      expect(document.querySelector('input')).toHaveValue('1234')
    })

    it('renders custom mask given as a function with 4 digits', () => {
      const mask = jest.fn(() => {
        return Array(4).fill(/\d/)
      })

      render(<Field.Number mask={mask} value={1234} />)

      expect(mask).toHaveBeenCalledTimes(1)
      expect(mask).toHaveBeenCalledWith('1234', {
        currentCaretPosition: 0,
        placeholderChar: '​',
        previousConformedValue: undefined,
      })
      expect(document.querySelector('input')).toHaveValue('1234')
    })

    it('should format according to en-GB locale (no currency)', () => {
      render(
        <SharedProvider locale="en-GB">
          <Field.Number value={1234.56789} decimalLimit={2} />
        </SharedProvider>
      )
      expect(document.querySelector('input')).toHaveValue('1,234.56')
    })

    it('should format according to de-DE locale (no currency)', () => {
      render(
        <SharedProvider locale="de-DE">
          <Field.Number value={1234.56789} decimalLimit={2} />
        </SharedProvider>
      )
      expect(document.querySelector('input')).toHaveValue('1.234,56')
    })

    it('shows error when minimum exceeded', () => {
      render(<Field.Number value={Number.MIN_SAFE_INTEGER} />)

      const input = document.querySelector('input')

      fireEvent.change(input, {
        target: {
          value: String(Number.MIN_SAFE_INTEGER - 1),
        },
      })

      expect(input).toHaveValue('-9 007 199 254 740 992')

      fireEvent.blur(input)

      expect(input).toHaveValue('-9 007 199 254 740 992')

      const statusElement = document.querySelector('.dnb-form-status')
      expect(statusElement).toBeInTheDocument()

      // Check that the message contains the Norwegian text and the formatted number
      const alertText = statusElement.textContent
      const expectedText = nb.NumberField.errorMinimum.replace(
        '{minimum}',
        String(format(Number.MIN_SAFE_INTEGER, { locale: 'nb-NO' }))
      )
      // Use regex to handle both regular and non-breaking spaces
      const expectedRegex = expectedText.replace(/\s/g, '\\s')
      expect(alertText).toMatch(new RegExp(expectedRegex))
    })

    it('shows error when maximum exceeded', () => {
      render(<Field.Number value={Number.MAX_SAFE_INTEGER} />)

      const input = document.querySelector('input')

      fireEvent.change(input, {
        target: {
          value: String(Number.MAX_SAFE_INTEGER + 1),
        },
      })

      expect(input).toHaveValue('9 007 199 254 740 992')

      fireEvent.blur(input)

      expect(input).toHaveValue('9 007 199 254 740 992')

      const statusElement = document.querySelector('.dnb-form-status')
      expect(statusElement).toBeInTheDocument()

      // Check that the message contains the Norwegian text and the formatted number
      const alertText = statusElement.textContent
      const expectedText = nb.NumberField.errorMaximum.replace(
        '{maximum}',
        String(format(Number.MAX_SAFE_INTEGER, { locale: 'nb-NO' }))
      )
      // Use regex to handle both regular and non-breaking spaces
      const expectedRegex = expectedText.replace(/\s/g, '\\s')
      expect(alertText).toMatch(new RegExp(expectedRegex))
    })

    it('should support disabled prop', () => {
      const { rerender } = render(
        <Field.Number label="Disabled label" disabled />
      )

      const labelElement = () => document.querySelector('label')

      expect(labelElement()).toHaveAttribute('disabled')

      rerender(<Field.Number label="Disabled label" />)

      expect(labelElement()).not.toHaveAttribute('disabled')
    })

    it('renders autoComplete', () => {
      const { rerender } = render(
        <Field.Number autoComplete="postal-code" />
      )
      expect(
        document.querySelector('input').getAttribute('autocomplete')
      ).toBe('postal-code')

      rerender(<Field.Number path="/postalCode" autoComplete="tel" />)
      expect(document.querySelector('input').getAttribute('name')).toBe(
        'postalCode'
      )
      expect(
        document.querySelector('input').getAttribute('autocomplete')
      ).toBe('tel')
    })

    it('renders name based on path', () => {
      render(<Field.Number path="/postalCode" />)
      expect(document.querySelector('input').getAttribute('name')).toBe(
        'postalCode'
      )
    })

    describe('error', () => {
      it('renders error', () => {
        render(
          <Field.Number error={new Error('This is what went wrong')} />
        )
        expect(
          screen.getByText('This is what went wrong')
        ).toBeInTheDocument()
      })

      it('renders error given as a function', () => {
        render(
          <Field.Number
            error={() => new Error('This is what went wrong')}
          />
        )
        expect(
          screen.getByText('This is what went wrong')
        ).toBeInTheDocument()
      })

      it('should hide error when undefined is returned by error function', () => {
        const { rerender } = render(
          <Field.Number
            error={() => new Error('This is what went wrong')}
          />
        )
        expect(
          screen.getByText('This is what went wrong')
        ).toBeInTheDocument()

        rerender(<Field.Number error={() => undefined} />)

        expect(
          document.querySelector('.dnb-form-status')
        ).not.toBeInTheDocument()
      })

      it('renders error given as a function with value', () => {
        render(
          <Field.Number
            error={(value) =>
              new Error('This is what went wrong ' + value)
            }
            value={123}
          />
        )
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent('This is what went wrong 123')
      })

      describe('conditionally', () => {
        it('renders message when field gets blurred', async () => {
          render(
            <Field.Number
              error={(value, { conditionally }) => {
                return conditionally(() => {
                  return new Error('This is what went wrong ' + value)
                })
              }}
            />
          )

          expect(
            document.querySelector('.dnb-form-status')
          ).not.toBeInTheDocument()

          await userEvent.type(document.querySelector('input'), '123')
          await userEvent.tab()

          expect(
            document.querySelector('.dnb-form-status')
          ).toHaveTextContent('This is what went wrong 123')

          await userEvent.type(document.querySelector('input'), '4')

          expect(
            document.querySelector('.dnb-form-status')
          ).toHaveTextContent('This is what went wrong 1234')
        })

        it('renders message conditionally on every value change', async () => {
          render(
            <Field.Number
              emptyValue={0}
              error={(value) => {
                if (value === 123) {
                  return undefined
                }

                return new Error('This is what went wrong ' + value)
              }}
            />
          )

          expect(
            document.querySelector('.dnb-form-status')
          ).toHaveTextContent('This is what went wrong 0')

          await userEvent.type(document.querySelector('input'), '12')

          expect(
            document.querySelector('.dnb-form-status')
          ).toHaveTextContent('This is what went wrong 12')

          await userEvent.type(document.querySelector('input'), '3')

          expect(
            document.querySelector('.dnb-form-status')
          ).not.toBeInTheDocument()

          await userEvent.type(document.querySelector('input'), '4')

          expect(
            document.querySelector('.dnb-form-status')
          ).toHaveTextContent('This is what went wrong 1234')
        })

        it('showInitially: renders message initially', async () => {
          render(
            <Field.Number
              emptyValue={0}
              error={(value, { conditionally }) => {
                return conditionally(
                  () => {
                    if (value === 123) {
                      return undefined
                    }

                    return new Error('This is what went wrong ' + value)
                  },
                  { showInitially: true }
                )
              }}
            />
          )

          const input = document.querySelector('input')

          expect(
            document.querySelector('.dnb-form-status')
          ).toHaveTextContent('This is what went wrong 0')

          await userEvent.type(input, '1')

          expect(
            document.querySelector('.dnb-form-status')
          ).toHaveTextContent('This is what went wrong 1')

          await userEvent.type(input, '2')

          expect(
            document.querySelector('.dnb-form-status')
          ).toHaveTextContent('This is what went wrong 12')

          await userEvent.type(input, '3')

          expect(
            document.querySelector('.dnb-form-status')
          ).not.toBeInTheDocument()

          await userEvent.type(input, '4')

          expect(
            document.querySelector('.dnb-form-status')
          ).not.toBeInTheDocument()

          await userEvent.tab()

          expect(
            document.querySelector('.dnb-form-status')
          ).toHaveTextContent('This is what went wrong 1234')

          await userEvent.type(input, '{Backspace}')

          expect(
            document.querySelector('.dnb-form-status')
          ).not.toBeInTheDocument()

          await userEvent.type(input, '4')

          expect(
            document.querySelector('.dnb-form-status')
          ).not.toBeInTheDocument()

          await userEvent.type(input, '5')
          await userEvent.tab()

          expect(
            document.querySelector('.dnb-form-status')
          ).toHaveTextContent('This is what went wrong 12345')
        })
      })
    })

    describe('warning', () => {
      it('renders warning', () => {
        render(<Field.Number warning={'This is what went wrong'} />)
        expect(
          screen.getByText('This is what went wrong')
        ).toBeInTheDocument()
      })

      it('renders warning given as a function', () => {
        render(
          <Field.Number
            warning={(value) => 'This is what went wrong ' + value}
            value={123}
          />
        )
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent('This is what went wrong 123')
      })

      describe('getValueByPath', () => {
        it('renders message with value from other path', async () => {
          render(
            <Form.Handler
              data={{
                foo: 123,
                bar: 456,
              }}
            >
              <Field.Number
                path="/foo"
                warning={(value, { getValueByPath }) => {
                  return String(value) + getValueByPath('/bar')
                }}
              />
            </Form.Handler>
          )

          expect(
            document.querySelector('.dnb-form-status')
          ).toHaveTextContent('123456')

          await userEvent.type(document.querySelector('input'), '0')

          expect(
            document.querySelector('.dnb-form-status')
          ).toHaveTextContent('1230456')
        })
      })
    })

    describe('info', () => {
      it('renders info', () => {
        render(<Field.Number info={'This is what went wrong'} />)
        expect(
          screen.getByText('This is what went wrong')
        ).toBeInTheDocument()
      })

      it('renders info given as a function', () => {
        render(
          <Field.Number
            info={(value) => 'This is what went wrong ' + value}
            value={123}
          />
        )
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent('This is what went wrong 123')
      })

      it('renders summarized messages given by an array from a function return', async () => {
        render(
          <Field.Number
            info={() => {
              return ['Foo', 'Bar']
            }}
          />
        )

        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(nb.Field.stateSummary + 'FooBar')
      })

      describe('getFieldByPath', () => {
        it('renders message with value from other path', async () => {
          render(
            <Form.Handler>
              <Field.Number
                path="/foo"
                defaultValue={123}
                info={(value, { getFieldByPath }) => {
                  const field = getFieldByPath('/bar')
                  const props = field.props
                  const id = field.id

                  if (props) {
                    const label = props.label
                    return JSON.stringify({ value, id, label })
                  }
                }}
                id="foo"
              />

              <Field.Number path="/bar" label="Bar Label" id="bar-id" />
            </Form.Handler>
          )

          expect(
            document.querySelector('.dnb-form-status')
          ).toHaveTextContent(
            JSON.stringify({
              value: 123,
              id: 'bar-id',
              label: 'Bar Label',
            })
          )
        })
      })
    })

    it('shows error border', () => {
      render(<Field.Number error={new Error('This is what went wrong')} />)
      const element = document.querySelector('.dnb-input')
      expect(element.className).toContain('dnb-input__status--error')
    })

    it('shows error style in FieldBlock', () => {
      const errorMessage = new Error('Error message')
      render(
        <FieldBlock>
          <Field.Number error={errorMessage} />
        </FieldBlock>
      )

      const input = document.querySelector(
        '.dnb-forms-field-number__input'
      )
      expect(input).toHaveClass('dnb-input__status--error')
    })

    describe('percent', () => {
      it('renders without value', () => {
        render(<Field.Number percent />)
        expect(document.querySelector('input')).toHaveValue('')
      })

      it('formats with percent', () => {
        render(<Field.Number value={12345} percent />)
        expect(document.querySelector('input')).toHaveValue('12 345 %')
      })

      it('formats with percent and decimalLimit', () => {
        render(
          <Field.Number value={1234.56789} percent decimalLimit={2} />
        )
        expect(document.querySelector('input')).toHaveValue('1 234,56 %')
      })

      it('formats with percent and decimalLimit 0', () => {
        render(
          <Field.Number value={1234.56789} percent decimalLimit={0} />
        )
        expect(document.querySelector('input')).toHaveValue('1 234 %')
      })
    })

    describe('currency', () => {
      it('formats with currency', () => {
        render(<Field.Number value={12345} currency />)
        expect(document.querySelector('input')).toHaveValue('12 345 kr')
      })

      it('formats with currency and decimalLimit', () => {
        render(
          <Field.Number value={1234.56789} currency decimalLimit={2} />
        )
        expect(document.querySelector('input')).toHaveValue('1 234,56 kr')
      })

      it('formats with currency and decimalLimit 0', () => {
        render(
          <Field.Number value={1234.56789} currency decimalLimit={0} />
        )
        expect(document.querySelector('input')).toHaveValue('1 234 kr')
      })

      it('formats in different locale', () => {
        render(
          <SharedProvider locale="en-GB">
            <Field.Number value={1234.56789} currency decimalLimit={2} />
          </SharedProvider>
        )
        expect(document.querySelector('input')).toHaveValue('1,234.56 NOK')
      })

      it('formats in other currency', () => {
        render(<Field.Number value={-1234} currency="CHF" />)
        expect(document.querySelector('input')).toHaveValue('-1 234 CHF')
      })
    })

    describe('prefix and suffix', () => {
      it('formats with prefix', () => {
        render(<Field.Number value={12345} currency prefix="prefix " />)
        expect(document.querySelector('input')).toHaveValue(
          'prefix 12 345 kr'
        )
      })

      it('formats with suffix', () => {
        render(<Field.Number value={12345} suffix=" suffix" />)
        expect(document.querySelector('input')).toHaveValue(
          '12 345 suffix'
        )
      })

      it('formats with prefix as a function', () => {
        const prefix = jest.fn(() => {
          return 'prefix '
        })
        render(<Field.Number value={12345} currency prefix={prefix} />)
        expect(document.querySelector('input')).toHaveValue(
          'prefix 12 345 kr'
        )
        expect(prefix).toHaveBeenCalledTimes(2)
        expect(prefix).toHaveBeenCalledWith(12345)
      })

      it('formats with suffix as a function', () => {
        const suffix = jest.fn(() => {
          return ' suffix'
        })
        render(<Field.Number value={12345} suffix={suffix} />)
        expect(document.querySelector('input')).toHaveValue(
          '12 345 suffix'
        )
        expect(suffix).toHaveBeenCalledTimes(2)
        expect(suffix).toHaveBeenCalledWith(12345)
      })
    })

    describe('decimalLimit', () => {
      it('formats with same decimal limit', () => {
        render(<Field.Number value={42.51} decimalLimit={2} />)
        expect(screen.getByDisplayValue('42,51')).toBeInTheDocument()
      })

      it('formats with smaller decimal limit', () => {
        render(<Field.Number value={5876.789} decimalLimit={2} />)
        expect(document.querySelector('input')).toHaveValue('5 876,78')
      })

      it('formats with higher decimal limit', () => {
        render(<Field.Number value={123.456} decimalLimit={4} />)
        expect(screen.getByDisplayValue('123,456')).toBeInTheDocument()
      })

      it('formats with decimal limit 0', () => {
        render(<Field.Number value={123.456} decimalLimit={0} />)
        expect(screen.getByDisplayValue('123')).toBeInTheDocument()
      })
    })

    it('should align input correctly', () => {
      render(
        <>
          <Field.Number value={123} />
          <Field.Number value={123} align="left" />
          <Field.Number value={123} align="center" />
          <Field.Number value={123} align="right" />
        </>
      )

      const inputs = document.querySelectorAll('.dnb-input')
      expect(inputs[0].className).not.toContain('dnb-input__align')
      expect(inputs[1]).toHaveClass('dnb-input__align--left')
      expect(inputs[2]).toHaveClass('dnb-input__align--center')
      expect(inputs[3]).toHaveClass('dnb-input__align--right')
    })

    it('should have decimal input mode', () => {
      render(<Field.Number />)

      const input = document.querySelector('.dnb-input__input')

      expect(input).toHaveAttribute('inputmode', 'decimal')
    })

    it('should apply data-attributes', () => {
      render(
        <Field.Number data-testid="testid" data-long-value="long-value" />
      )

      const input = document.querySelector('input')

      expect(input).toHaveAttribute('data-testid', 'testid')
      expect(input).toHaveAttribute('data-long-value', 'long-value')
    })

    it('should not allow negative numbers when `allowNegative` is set to false', async () => {
      render(<Field.Number allowNegative={false} />)

      const input = document.querySelector('input')

      await userEvent.type(input, '-365')

      expect(input).toHaveValue('365')
    })

    describe('disallowLeadingZeroes', () => {
      it('should not allow leading zeroes', async () => {
        render(<Field.Number disallowLeadingZeroes />)

        const input = document.querySelector('input')

        await userEvent.type(input, '00123456')

        expect(input).toHaveValue('123 456')
      })

      it('should allow "0" as value', async () => {
        render(<Field.Number disallowLeadingZeroes />)

        const input = document.querySelector('input')

        await userEvent.type(input, '0')

        expect(input).toHaveValue('0')
      })

      it('should support decimal values', async () => {
        render(<Field.Number disallowLeadingZeroes />)

        const input = document.querySelector('input')

        await userEvent.type(input, '0.1')

        expect(input).toHaveValue('0,1')
      })

      it('should return correct onChange event value', async () => {
        const onChange = jest.fn()

        render(<Field.Number disallowLeadingZeroes onChange={onChange} />)

        const input = document.querySelector('input')

        await userEvent.type(input, '0')

        expect(input).toHaveValue('0')
        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange).toHaveBeenNthCalledWith(1, 0, expect.anything())

        await userEvent.keyboard('10')

        expect(input).toHaveValue('10')
        expect(onChange).toHaveBeenCalledTimes(3)
        expect(onChange).toHaveBeenNthCalledWith(2, 1, expect.anything())
        expect(onChange).toHaveBeenNthCalledWith(3, 10, expect.anything())

        await userEvent.keyboard('{Backspace>4}')

        expect(input).toHaveValue('')
        expect(onChange).toHaveBeenCalledTimes(5)
        expect(onChange).toHaveBeenNthCalledWith(4, 1, expect.anything())
        expect(onChange).toHaveBeenNthCalledWith(
          5,
          undefined,
          expect.anything()
        )

        await userEvent.keyboard('0.1')

        expect(input).toHaveValue('0,1')
        expect(onChange).toHaveBeenCalledTimes(7)
        expect(onChange).toHaveBeenNthCalledWith(6, 0, expect.anything())
        expect(onChange).toHaveBeenNthCalledWith(7, 0.1, expect.anything())
      })
    })
  })

  describe('localized number formatting in error messages', () => {
    it('formats {maximum} using nb-NO locale', async () => {
      render(<Field.Number maximum={1000} />)

      const input = document.querySelector('input')
      fireEvent.change(input, {
        target: { value: '1001' },
      })

      await waitFor(() => {
        const statusElement = document.querySelector('.dnb-form-status')
        expect(statusElement).toBeInTheDocument()

        // Check that the message contains the Norwegian text and the formatted number
        const alertText = statusElement.textContent
        expect(alertText).toContain(
          nb.NumberField.errorMaximum.split('{maximum}')[0]
        )
        expect(alertText).toMatch(/1\s000/) // The number should be formatted with space separator (regular or non-breaking)
        expect(alertText).toContain('.') // Should end with a period
      })
    })

    it('formats {minimum} using nb-NO locale (decimals)', async () => {
      render(<Field.Number minimum={1.5} />)

      const input = document.querySelector('input')
      fireEvent.change(input, {
        target: { value: '1' },
      })

      const expected = nb.NumberField.errorMinimum.replace(
        '{minimum}',
        String(format(1.5, { locale: 'nb-NO', decimals: 1 }))
      )

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(expected)
      })
    })

    it('formats {exclusiveMinimum} using nb-NO locale (decimals)', async () => {
      render(<Field.Number exclusiveMinimum={1.5} />)

      const input = document.querySelector('input')
      fireEvent.change(input, {
        target: { value: '1' },
      })

      const expected = nb.NumberField.errorExclusiveMinimum.replace(
        '{exclusiveMinimum}',
        String(format(1.5, { locale: 'nb-NO', decimals: 1 }))
      )

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(expected)
      })
    })

    it('formats {exclusiveMaximum} using nb-NO locale (decimals)', async () => {
      render(<Field.Number exclusiveMaximum={2.75} />)

      const input = document.querySelector('input')
      fireEvent.change(input, {
        target: { value: '2.75' },
      })

      const expected = nb.NumberField.errorExclusiveMaximum.replace(
        '{exclusiveMaximum}',
        String(format(2.75, { locale: 'nb-NO', decimals: 2 }))
      )

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(expected)
      })
    })

    it('formats {multipleOf} using nb-NO locale', async () => {
      render(<Field.Number multipleOf={3000} />)

      const input = document.querySelector('input')
      fireEvent.change(input, {
        target: { value: '1' },
      })

      const expected = nb.NumberField.errorMultipleOf.replace(
        '{multipleOf}',
        String(format(3000, { locale: 'nb-NO' }))
      )
      // Use regex to handle both regular and non-breaking spaces
      const expectedRegex = expected.replace(/\s/g, '\\s')

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(new RegExp(expectedRegex))
      })
    })

    it('formats using provided locale (en-GB)', async () => {
      render(
        <SharedProvider locale="en-GB">
          <Field.Number maximum={1000} />
        </SharedProvider>
      )

      const input = document.querySelector('input')
      fireEvent.change(input, {
        target: { value: '1001' },
      })

      const enFormatted = String(format(1000, { locale: 'en-GB' }))
      const expected = en.NumberField.errorMaximum.replace(
        '{maximum}',
        enFormatted
      )

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(expected)
      })
    })

    describe('currency', () => {
      it('should show currency-specific message for exclusiveMinimum', async () => {
        render(
          <Field.Number
            value={10}
            exclusiveMinimum={20}
            validateInitially
            currency
          />
        )

        await waitFor(() => {
          const statusElement = document.querySelector('.dnb-form-status')
          expect(statusElement).toBeInTheDocument()

          const expected = nb.NumberField.errorExclusiveMinimum.replace(
            '{exclusiveMinimum}',
            String(format(20, { locale: 'nb-NO', currency: true }))
          )
          // Use regex to handle both regular and non-breaking spaces
          const expectedRegex = expected.replace(/\s/g, '\\s')
          expect(statusElement.textContent).toMatch(
            new RegExp(expectedRegex)
          )
        })
      })

      it('should show currency-specific message for exclusiveMaximum', async () => {
        render(
          <Field.Number
            value={100}
            exclusiveMaximum={100}
            validateInitially
            currency
          />
        )

        await waitFor(() => {
          const statusElement = document.querySelector('.dnb-form-status')
          expect(statusElement).toBeInTheDocument()

          const expected = nb.NumberField.errorExclusiveMaximum.replace(
            '{exclusiveMaximum}',
            String(format(100, { locale: 'nb-NO', currency: true }))
          )
          // Use regex to handle both regular and non-breaking spaces
          const expectedRegex = expected.replace(/\s/g, '\\s')
          expect(statusElement.textContent).toMatch(
            new RegExp(expectedRegex)
          )
        })
      })

      it('should show currency-specific message for minimum', async () => {
        render(
          <Field.Number
            value={30}
            minimum={50}
            validateInitially
            currency
          />
        )

        await waitFor(() => {
          const statusElement = document.querySelector('.dnb-form-status')
          expect(statusElement).toBeInTheDocument()

          const expected = nb.NumberField.errorMinimum.replace(
            '{minimum}',
            String(format(50, { locale: 'nb-NO', currency: true }))
          )
          // Use regex to handle both regular and non-breaking spaces
          const expectedRegex = expected.replace(/\s/g, '\\s')
          expect(statusElement.textContent).toMatch(
            new RegExp(expectedRegex)
          )
        })
      })

      it('should show currency-specific message for maximum', async () => {
        render(
          <Field.Number
            value={1500}
            maximum={1000}
            validateInitially
            currency
          />
        )

        await waitFor(() => {
          const statusElement = document.querySelector('.dnb-form-status')
          expect(statusElement).toBeInTheDocument()

          const expected = nb.NumberField.errorMaximum.replace(
            '{maximum}',
            String(format(1000, { locale: 'nb-NO', currency: true }))
          )
          // Use regex to handle both regular and non-breaking spaces
          const expectedRegex = expected.replace(/\s/g, '\\s')
          expect(statusElement.textContent).toMatch(
            new RegExp(expectedRegex)
          )
        })
      })

      it('should show currency-specific message for multipleOf', async () => {
        render(
          <Field.Number
            value={7}
            multipleOf={5}
            validateInitially
            currency
          />
        )

        await waitFor(() => {
          const statusElement = document.querySelector('.dnb-form-status')
          expect(statusElement).toBeInTheDocument()

          const expected = nb.NumberField.errorMultipleOf.replace(
            '{multipleOf}',
            String(format(5, { locale: 'nb-NO', currency: true }))
          )
          // Use regex to handle both regular and non-breaking spaces
          const expectedRegex = expected.replace(/\s/g, '\\s')
          expect(statusElement.textContent).toMatch(
            new RegExp(expectedRegex)
          )
        })
      })

      it('should show currency-specific message with decimalLimit', async () => {
        render(
          <Field.Number
            value={10.5}
            exclusiveMinimum={20.123456}
            validateInitially
            currency
            decimalLimit={2}
          />
        )

        await waitFor(() => {
          const statusElement = document.querySelector('.dnb-form-status')
          expect(statusElement).toBeInTheDocument()

          const expected = nb.NumberField.errorExclusiveMinimum.replace(
            '{exclusiveMinimum}',
            String(
              format(20.123456, {
                locale: 'nb-NO',
                currency: true,
                decimals: 2,
              })
            )
          )
          // Use regex to handle both regular and non-breaking spaces
          const expectedRegex = expected.replace(/\s/g, '\\s')
          expect(statusElement.textContent).toMatch(
            new RegExp(expectedRegex)
          )
        })
      })
    })

    describe('percent', () => {
      it('should show percent-specific message for exclusiveMinimum', async () => {
        render(
          <Field.Number
            percent
            value={5}
            exclusiveMinimum={10}
            validateInitially
          />
        )

        await waitFor(() => {
          const statusElement = document.querySelector('.dnb-form-status')
          expect(statusElement).toBeInTheDocument()

          const expected = nb.NumberField.errorExclusiveMinimum.replace(
            '{exclusiveMinimum}',
            String(format(10, { locale: 'nb-NO', percent: true }))
          )
          // Use regex to handle both regular and non-breaking spaces
          const expectedRegex = expected.replace(/\s/g, '\\s')
          expect(statusElement.textContent).toMatch(
            new RegExp(expectedRegex)
          )
        })
      })

      it('should show percent-specific message for exclusiveMaximum', async () => {
        render(
          <Field.Number
            percent
            value={90}
            exclusiveMaximum={90}
            validateInitially
          />
        )

        await waitFor(() => {
          const statusElement = document.querySelector('.dnb-form-status')
          expect(statusElement).toBeInTheDocument()

          const expected = nb.NumberField.errorExclusiveMaximum.replace(
            '{exclusiveMaximum}',
            String(format(90, { locale: 'nb-NO', percent: true }))
          )
          // Use regex to handle both regular and non-breaking spaces
          const expectedRegex = expected.replace(/\s/g, '\\s')
          expect(statusElement.textContent).toMatch(
            new RegExp(expectedRegex)
          )
        })
      })

      it('should show percent-specific message for minimum', async () => {
        render(
          <Field.Number percent value={2} minimum={5} validateInitially />
        )

        await waitFor(() => {
          const statusElement = document.querySelector('.dnb-form-status')
          expect(statusElement).toBeInTheDocument()

          const expected = nb.NumberField.errorMinimum.replace(
            '{minimum}',
            String(format(5, { locale: 'nb-NO', percent: true }))
          )
          // Use regex to handle both regular and non-breaking spaces
          const expectedRegex = expected.replace(/\s/g, '\\s')
          expect(statusElement.textContent).toMatch(
            new RegExp(expectedRegex)
          )
        })
      })

      it('should show percent-specific message for maximum', async () => {
        render(
          <Field.Number
            percent
            value={150}
            maximum={100}
            validateInitially
          />
        )

        await waitFor(() => {
          const statusElement = document.querySelector('.dnb-form-status')
          expect(statusElement).toBeInTheDocument()

          const expected = nb.NumberField.errorMaximum.replace(
            '{maximum}',
            String(format(100, { locale: 'nb-NO', percent: true }))
          )
          // Use regex to handle both regular and non-breaking spaces
          const expectedRegex = expected.replace(/\s/g, '\\s')
          expect(statusElement.textContent).toMatch(
            new RegExp(expectedRegex)
          )
        })
      })

      it('should show percent-specific message for multipleOf', async () => {
        render(
          <Field.Number
            percent
            value={3}
            multipleOf={2.5}
            validateInitially
          />
        )

        await waitFor(() => {
          const statusElement = document.querySelector('.dnb-form-status')
          expect(statusElement).toBeInTheDocument()

          const expected = nb.NumberField.errorMultipleOf.replace(
            '{multipleOf}',
            String(
              format(2.5, { locale: 'nb-NO', percent: true, decimals: 1 })
            )
          )
          // Use regex to handle both regular and non-breaking spaces
          const expectedRegex = expected.replace(/\s/g, '\\s')
          expect(statusElement.textContent).toMatch(
            new RegExp(expectedRegex)
          )
        })
      })

      it('should show percent-specific message with decimalLimit', async () => {
        render(
          <Field.Number
            percent
            value={5.25}
            exclusiveMinimum={10.123456}
            validateInitially
            decimalLimit={1}
          />
        )

        await waitFor(() => {
          const statusElement = document.querySelector('.dnb-form-status')
          expect(statusElement).toBeInTheDocument()

          const expected = nb.NumberField.errorExclusiveMinimum.replace(
            '{exclusiveMinimum}',
            String(
              format(10.123456, {
                locale: 'nb-NO',
                percent: true,
                decimals: 1,
              })
            )
          )
          // Use regex to handle both regular and non-breaking spaces
          const expectedRegex = expected.replace(/\s/g, '\\s')
          expect(statusElement.textContent).toMatch(
            new RegExp(expectedRegex)
          )
        })
      })
    })
  })

  describe('should gracefully handle empty value', () => {
    describe('field schema', () => {
      const schema: JSONSchema = { type: 'number' }

      it('allow undefined as emptyValue', () => {
        render(<Field.Number schema={schema} value={undefined} />)

        const input = document.querySelector('input')
        expect(input).toHaveValue('')

        const statuses = document.querySelectorAll('.dnb-form-status')
        expect(statuses).toHaveLength(0)
      })

      it('allow empty string as empty value', () => {
        const emptyString = '' as null
        render(<Field.Number schema={schema} value={emptyString} />)

        const input = document.querySelector('input')
        expect(input).toHaveValue('')

        const statuses = document.querySelectorAll('.dnb-form-status')
        expect(statuses).toHaveLength(0)
      })

      it('allow null as empty value', () => {
        render(<Field.Number schema={schema} value={null} />)

        const input = document.querySelector('input')
        expect(input).toHaveValue('')

        const statuses = document.querySelectorAll('.dnb-form-status')
        expect(statuses).toHaveLength(0)
      })

      it('throw type error when invalid value is given', () => {
        const log = jest.spyOn(console, 'error').mockImplementation()

        const invalidValue = 'foo' as null
        render(
          <DataContext.Provider ajvInstance={makeAjvInstance()}>
            <Field.Number schema={schema} value={invalidValue} />
          </DataContext.Provider>
        )

        const input = document.querySelector('input')
        expect(input).toHaveValue('')

        const status = document.querySelector('.dnb-form-status')
        expect(status).toHaveTextContent(
          'The field value (foo) type must be number'
        )

        log.mockRestore()
      })
    })

    describe('integer (Ajv and Zod)', () => {
      // Silence console.error noise during these tests while still allowing per-test spies
      let consoleErrorSpy: jest.SpyInstance
      beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
      })
      afterEach(() => {
        consoleErrorSpy?.mockRestore()
      })

      it('Ajv integer field schema: shows type error when typing 1.2 (decimal)', async () => {
        const schema: JSONSchema = { type: 'integer' }

        render(
          <DataContext.Provider ajvInstance={makeAjvInstance()}>
            <Field.Number schema={schema} />
          </DataContext.Provider>
        )

        const input = document.querySelector('input')
        await userEvent.type(input, '1.2')
        input.blur()

        await waitFor(() => {
          const status = document.querySelector('.dnb-form-status')
          expect(status).toBeInTheDocument()
          expect(status).toHaveTextContent(nb.NumberField.errorInteger)
        })
      })

      it('Zod integer field schema: shows type error when typing 1.2 (decimal)', async () => {
        const schema = z.number().int()

        render(<Field.Number schema={schema} />)

        const input = document.querySelector('input')
        await userEvent.type(input, '1.2')
        input.blur()

        await waitFor(() => {
          const status = document.querySelector('.dnb-form-status')
          expect(status).toBeInTheDocument()
          expect(status).toHaveTextContent(nb.NumberField.errorInteger)
        })
      })
    })

    describe('provider schema', () => {
      const schema: JSONSchema = {
        type: 'object',
        properties: {
          myFieldWithNull: { type: 'number' },
          myFieldWithUndefined: { type: 'number' },
          myFieldWithEmptyString: { type: 'number' },
        },
      }

      const data = {
        myFieldWithNull: null,
        myFieldWithUndefined: undefined,
        myFieldWithEmptyString: '',
        myFieldWithZero: 0,
        myFieldWitInvalidType: 'foo',
      }

      it('allow undefined as emptyValue', () => {
        render(
          <Form.Handler
            schema={schema}
            ajvInstance={makeAjvInstance()}
            data={data}
          >
            <Field.Number path="/myFieldWithUndefined" />
          </Form.Handler>
        )

        const input = document.querySelector('input')
        expect(input).toHaveValue('')

        const statuses = document.querySelectorAll('.dnb-form-status')
        expect(statuses).toHaveLength(0)
      })

      it('allow number as emptyValue', () => {
        render(
          <Form.Handler
            schema={schema}
            ajvInstance={makeAjvInstance()}
            data={data}
          >
            <Field.Number path="/myFieldWithZero" />
          </Form.Handler>
        )

        const input = document.querySelector('input')
        expect(input).toHaveValue('0')

        const statuses = document.querySelectorAll('.dnb-form-status')
        expect(statuses).toHaveLength(0)
      })

      it('allow null as empty value', () => {
        render(
          <Form.Handler
            schema={schema}
            ajvInstance={makeAjvInstance()}
            data={data}
          >
            <Field.Number path="/myFieldWithNull" />
          </Form.Handler>
        )

        const input = document.querySelector('input')
        expect(input).toHaveValue('')

        const statuses = document.querySelectorAll('.dnb-form-status')
        expect(statuses).toHaveLength(0)
      })

      it('throw type error when invalid value is given', () => {
        const log = jest.spyOn(console, 'error').mockImplementation()

        render(
          <Form.Handler
            schema={schema}
            ajvInstance={makeAjvInstance()}
            data={data}
          >
            <Field.Number
              path="/myFieldWitInvalidType"
              validateInitially
            />
          </Form.Handler>
        )

        const input = document.querySelector('input')
        expect(input).toHaveValue('')

        const status = document.querySelector('.dnb-form-status')
        expect(status).toBeInTheDocument()
        expect(status).toHaveTextContent(
          'Invalid input: expected number, received string'
        )

        log.mockRestore()
      })

      describe('integer (Ajv and Zod)', () => {
        // Silence console.error noise during these tests while still allowing per-test spies
        let consoleErrorSpy: jest.SpyInstance
        beforeEach(() => {
          consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation()
        })
        afterEach(() => {
          consoleErrorSpy?.mockRestore()
        })

        it('Ajv provider integer schema: shows type error when typing 1.2 (decimal)', async () => {
          const schema: JSONSchema = {
            type: 'object',
            properties: {
              amount: {
                type: 'integer',
                minimum: 0,
                exclusiveMaximum: 10,
              },
            },
          }

          render(
            <Form.Handler schema={schema} ajvInstance={makeAjvInstance()}>
              <Field.Number path="/amount" />
            </Form.Handler>
          )

          const input = document.querySelector('input')
          await userEvent.type(input, '1.2')
          input.blur()

          await waitFor(() => {
            const status = document.querySelector('.dnb-form-status')
            expect(status).toBeInTheDocument()
            expect(status).toHaveTextContent(nb.NumberField.errorInteger)
          })
        })

        it('Zod provider integer schema: shows type error when typing 1.2 (decimal)', async () => {
          const schema = z.object({ amount: z.number().int() })

          render(
            <Form.Handler schema={schema}>
              <Field.Number path="/amount" />
            </Form.Handler>
          )

          const input = document.querySelector('input')
          await userEvent.type(input, '1.2')
          input.blur()

          await waitFor(() => {
            const status = document.querySelector('.dnb-form-status')
            expect(status).toBeInTheDocument()
            expect(status).toHaveTextContent(nb.NumberField.errorInteger)
          })
        })
      })
    })

    it('should use emptyValue when not set in data context', () => {
      const onSubmit = jest.fn()
      render(
        <Form.Handler data={{}} onSubmit={onSubmit}>
          <Field.Number
            label="Label"
            value={0}
            path="/myValue"
            emptyValue={0}
          />
        </Form.Handler>
      )

      fireEvent.submit(document.querySelector('form'))

      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenCalledWith(
        { myValue: 0 },
        expect.anything()
      )
    })
  })

  describe('event handlers', () => {
    it('calls onChange for every change of an integer input value', async () => {
      const onChange = jest.fn()
      render(<Field.Number value={23} onChange={onChange} />)
      const input = document.querySelector('input')
      await userEvent.type(input, '579012')

      expect(onChange.mock.calls).toHaveLength(6)
      expect(onChange.mock.calls[0][0]).toEqual(235)
      expect(onChange.mock.calls[1][0]).toEqual(2357)
      expect(onChange.mock.calls[2][0]).toEqual(23579)
      expect(onChange.mock.calls[3][0]).toEqual(235790)
      expect(onChange.mock.calls[4][0]).toEqual(2357901)
      expect(onChange.mock.calls[5][0]).toEqual(23579012)
    })

    it('calls onChange for every change of a float input value', async () => {
      const onChange = jest.fn()
      render(<Field.Number value={24.5} onChange={onChange} />)
      const input = document.querySelector('input')
      await userEvent.type(input, '7621')

      expect(onChange.mock.calls).toHaveLength(4)
      expect(onChange.mock.calls[0][0]).toEqual(24.57)
      expect(onChange.mock.calls[1][0]).toEqual(24.576)
      expect(onChange.mock.calls[2][0]).toEqual(24.5762)
      expect(onChange.mock.calls[3][0]).toEqual(24.57621)
    })
  })

  describe('error handling', () => {
    it('should not show error initially', () => {
      render(<Field.Number required />)
      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()
    })

    it('should show error initially when validateInitially', () => {
      render(<Field.Number required validateInitially />)
      expect(
        document.querySelector('.dnb-form-status')
      ).toBeInTheDocument()
    })

    it('should call onChangeValidator with validateInitially', async () => {
      const onChangeValidator = jest.fn(() => {
        return new Error('Validator message')
      })

      render(
        <Field.Number
          onChangeValidator={onChangeValidator}
          defaultValue={123}
          validateInitially
        />
      )

      expect(onChangeValidator).toHaveBeenCalledTimes(1)
      expect(onChangeValidator).toHaveBeenCalledWith(
        123,
        expect.anything()
      )

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
      })
    })

    it('should call onChangeValidator on form submit', async () => {
      const onChangeValidator = jest.fn(() => {
        return new Error('Validator message')
      })

      render(
        <Form.Handler>
          <Field.Number
            path="/myNumber"
            onChangeValidator={onChangeValidator}
            defaultValue={123}
          />
        </Form.Handler>
      )

      fireEvent.submit(document.querySelector('form'))

      expect(onChangeValidator).toHaveBeenCalledTimes(1)
      expect(onChangeValidator).toHaveBeenCalledWith(
        123,
        expect.anything()
      )

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
      })
    })

    describe('validation based on required-prop', () => {
      it('should show error for empty value', async () => {
        render(<Field.Number value={1} required />)
        const input = document.querySelector('input')
        await userEvent.type(input, '{backspace}')
        input.blur()

        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).toBeInTheDocument()
        })
      })

      it('should not show error when value is not empty', async () => {
        render(<Field.Number value={1} required />)
        const input = document.querySelector('input')
        await userEvent.type(input, '2')
        input.blur()

        expect(
          document.querySelector('.dnb-form-status')
        ).not.toBeInTheDocument()
      })
    })

    describe('validation based on minimum-prop', () => {
      it('should show error for invalid value', async () => {
        render(<Field.Number value={50} minimum={2000} />)
        const input = document.querySelector('input')
        await userEvent.type(input, '1')
        input.blur()

        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).toBeInTheDocument()
        })
      })

      it('should not show error message for valid value', async () => {
        render(<Field.Number value={65} minimum={40} />)
        const input = document.querySelector('input')
        await userEvent.type(input, '5')
        input.blur()

        expect(
          document.querySelector('.dnb-form-status')
        ).not.toBeInTheDocument()
      })
    })

    describe('validation based on maximum-prop', () => {
      it('should show error for invalid value', async () => {
        render(<Field.Number value={50} maximum={100} />)
        const input = document.querySelector('input')
        await userEvent.type(input, '0')
        input.blur()

        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).toBeInTheDocument()
        })
      })

      it('should not show error message for valid value', async () => {
        render(<Field.Number value={20} maximum={500} />)
        const input = document.querySelector('input')
        await userEvent.type(input, '1')
        input.blur()

        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).not.toBeInTheDocument()
        })
      })
    })
  })

  describe('with step controls', () => {
    it('renders with control buttons', () => {
      render(<Field.Number showStepControls />)
      const buttons = document.querySelectorAll('.dnb-button')
      expect(buttons.length).toBe(2)
    })

    it('should align input to center', () => {
      render(<Field.Number showStepControls />)

      const input = document.querySelector('.dnb-input')
      expect(input).toHaveClass('dnb-input__align--center')
    })

    it('controls input value correctly using control buttons', () => {
      render(<Field.Number showStepControls value={0} step={10} />)
      const input = document.querySelector('input')
      const [decreaseButton, increaseButton] = Array.from(
        document.querySelectorAll('.dnb-button')
      )

      fireEvent.click(increaseButton)
      expect(input).toHaveValue('10')

      fireEvent.click(decreaseButton)
      expect(input).toHaveValue('0')
    })

    it('should handle "defaultValue"', async () => {
      const { rerender } = render(
        <Field.Number showStepControls defaultValue={1} />
      )
      const input = document.querySelector('input')

      await userEvent.type(input, '{Backspace}3')
      expect(input).toHaveValue('3')

      await userEvent.type(input, '{Backspace}')
      expect(input).toHaveValue('')

      await userEvent.type(input, '2')
      expect(input).toHaveValue('2')

      rerender(<Field.Number showStepControls defaultValue={99} />)

      expect(input).toHaveValue('2')
    })

    it('increases input value from "startWith" value using control buttons', () => {
      render(<Field.Number showStepControls startWith={-1} />)
      const input = document.querySelector('input')
      const [decreaseButton, increaseButton] = Array.from(
        document.querySelectorAll('.dnb-button')
      )

      fireEvent.click(increaseButton)
      expect(input).toHaveValue('0')

      fireEvent.click(decreaseButton)
      expect(input).toHaveValue('-1')
    })

    it('controls input value correctly using arrow keys', async () => {
      render(<Field.Number showStepControls value={0} step={10} />)

      const input = document.querySelector('input')

      act(() => {
        input.focus()
      })

      await userEvent.keyboard('{ArrowUp}')

      expect(input).toHaveValue('10')

      await userEvent.keyboard('{ArrowDown}')

      expect(input).toHaveValue('0')
    })

    it('respects input max/min props', () => {
      render(
        <Field.Number
          showStepControls
          value={1}
          maximum={2}
          minimum={0}
          step={3}
        />
      )

      const input = document.querySelector('input')
      const [decreaseButton, increaseButton] = Array.from(
        document.querySelectorAll('.dnb-button')
      )

      expect(increaseButton).not.toBeDisabled()
      expect(decreaseButton).not.toBeDisabled()

      fireEvent.click(increaseButton)
      expect(input).toHaveValue('2')
      expect(increaseButton).toBeDisabled()

      fireEvent.click(increaseButton)
      expect(input).toHaveValue('2')

      fireEvent.click(decreaseButton)
      expect(input).toHaveValue('0')
      expect(increaseButton).not.toBeDisabled()
      expect(decreaseButton).toBeDisabled()

      fireEvent.click(decreaseButton)
      expect(input).toHaveValue('0')
    })

    it('has correct accessibility props', () => {
      const settings = {
        showStepControls: true,
        value: 10,
        maximum: 20,
        minimum: 0,
        step: 5,
      }
      render(<Field.Number {...settings} />)

      const input = document.querySelector('.dnb-input__input')
      const [decreaseButton, increaseButton] = Array.from(
        document.querySelectorAll('.dnb-button')
      )

      expect(input).toHaveAttribute('role', 'spinbutton')
      expect(input).toHaveAttribute(
        'aria-valuemin',
        String(settings.minimum)
      )
      expect(input).toHaveAttribute(
        'aria-valuemax',
        String(settings.maximum)
      )
      expect(input).toHaveAttribute(
        'aria-valuenow',
        String(settings.value)
      )
      expect(input).toHaveAttribute(
        'aria-valuetext',
        String(settings.value)
      )

      expect(decreaseButton).toHaveAttribute('aria-hidden', 'true')
      expect(increaseButton).toHaveAttribute('aria-hidden', 'true')
    })

    describe('ARIA', () => {
      it('should validate with ARIA rules', async () => {
        const result = render(
          <Field.Number
            label="Label"
            showStepControls
            value={5}
            maximum={20}
            minimum={10}
            step={5}
            required
            validateInitially
          />
        )

        expect(await axeComponent(result)).toHaveNoViolations()
      })

      it('should have aria-required', () => {
        render(<Field.Number showStepControls required />)

        const input = document.querySelector('input')
        expect(input).toHaveAttribute('aria-required', 'true')
      })

      it('should have aria-invalid', () => {
        render(
          <Field.Number
            showStepControls
            value={1}
            minimum={2}
            validateInitially
          />
        )

        const input = document.querySelector('input')
        expect(input).toHaveAttribute('aria-invalid', 'true')
      })
    })
  })

  describe('ARIA', () => {
    it('should validate with ARIA rules', async () => {
      const result = render(
        <Field.Number label="Label" required validateInitially />
      )

      expect(await axeComponent(result)).toHaveNoViolations()
    })

    it('should have aria-required', () => {
      render(<Field.Number required />)

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('aria-required', 'true')
    })

    it('should have aria-invalid', () => {
      render(<Field.Number value={1} minimum={2} validateInitially />)

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })
  })

  describe('emptyValue', () => {
    it('should use the given emptyValue and set in the data context', async () => {
      const onSubmit = jest.fn()

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Field.Number path="/myValue" emptyValue={0} />
        </Form.Handler>
      )

      const form = document.querySelector('form')
      const input = document.querySelector('input')
      expect(input).toHaveValue('0')

      fireEvent.submit(form)
      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenLastCalledWith(
        { myValue: 0 },
        expect.anything()
      )

      await userEvent.type(input, '1')

      fireEvent.submit(form)
      expect(onSubmit).toHaveBeenCalledTimes(2)
      expect(onSubmit).toHaveBeenLastCalledWith(
        { myValue: 1 },
        expect.anything()
      )

      await userEvent.type(input, '{Backspace}')

      fireEvent.submit(form)
      expect(onSubmit).toHaveBeenCalledTimes(3)
      expect(onSubmit).toHaveBeenLastCalledWith(
        { myValue: 0 },
        expect.anything()
      )
    })
  })

  it('should store "displayValue" in data context', async () => {
    let dataContext = null

    render(
      <Form.Handler>
        <Field.Number path="/myValue" defaultValue={123} />
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
        value: '123',
      },
    })

    await userEvent.type(input, '{Backspace>2}4')

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myValue': {
        type: 'field',
        value: '14',
      },
    })

    await userEvent.type(input, '{Backspace>5}')

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myValue': {
        type: 'field',
      },
    })
  })

  it('should store "displayValue" when inside iterate', async () => {
    let dataContext = null

    render(
      <Form.Handler
        defaultData={{ myArray: [{ myValue: 123 }, { myValue: 456 }] }}
      >
        <Iterate.Array path="/myArray">
          <Field.Number label="Item no. {itemNo}" itemPath="/myValue" />
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
        value: '123',
      },
      '/myArray/1/myValue': {
        type: 'field',
        value: '456',
      },
    })

    await userEvent.type(input, '{Backspace>2}4')

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myArray/0/myValue': {
        type: 'field',
        value: '14',
      },
      '/myArray/1/myValue': {
        type: 'field',
        value: '456',
      },
    })

    await userEvent.type(input, '{Backspace>5}')

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myArray/0/myValue': {
        type: 'field',
      },
      '/myArray/1/myValue': {
        type: 'field',
        value: '456',
      },
    })
  })

  describe('validateContinuously', () => {
    it('should show error during paste when exceeding MAX_SAFE_INTEGER', async () => {
      render(<Field.Number />)
      const input = document.querySelector('input')

      input.focus()
      const getData = jest.fn(() => String(Number.MAX_SAFE_INTEGER + 1))
      const clipboardData = { getData }
      fireEvent.paste(input, { clipboardData })
      // Simulate the input event that follows paste with the new value
      fireEvent.input(input, {
        inputType: 'insertFromPaste',
        target: { value: String(Number.MAX_SAFE_INTEGER + 1) },
      })

      await waitFor(() => {
        const statusElement = document.querySelector('.dnb-form-status')
        expect(statusElement).toBeInTheDocument()

        // Check that the message contains the Norwegian text and the formatted number
        const alertText = statusElement.textContent
        const expectedText = nb.NumberField.errorMaximum.replace(
          '{maximum}',
          String(format(Number.MAX_SAFE_INTEGER, { locale: 'nb-NO' }))
        )
        // Use regex to handle both regular and non-breaking spaces
        const expectedRegex = expectedText.replace(/\s/g, '\\s')
        expect(alertText).toMatch(new RegExp(expectedRegex))
      })
    })

    it('should show error when pasting safe value then typing 2 to exceed MAX_SAFE_INTEGER', async () => {
      render(<Field.Number />)
      const input = document.querySelector('input')

      // Paste a safe value: 900719925474099 (below MAX_SAFE_INTEGER)
      input.focus()
      const getData = jest.fn(() => '900719925474099')
      const clipboardData = { getData }
      fireEvent.paste(input, { clipboardData })
      fireEvent.input(input, {
        inputType: 'insertFromPaste',
        target: { value: '900719925474099' },
      })

      // No error yet
      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()

      // Now type '2' to make it 9007199254740992 (> MAX_SAFE_INTEGER)
      await userEvent.type(input, '2')

      await waitFor(() => {
        const statusElement = document.querySelector('.dnb-form-status')
        expect(statusElement).toBeInTheDocument()

        // Check that the message contains the Norwegian text and the formatted number
        const alertText = statusElement.textContent
        const expectedText = nb.NumberField.errorMaximum.replace(
          '{maximum}',
          String(format(Number.MAX_SAFE_INTEGER, { locale: 'nb-NO' }))
        )
        // Use regex to handle both regular and non-breaking spaces
        const expectedRegex = expectedText.replace(/\s/g, '\\s')
        expect(alertText).toMatch(new RegExp(expectedRegex))
      })
    })

    it('should show error when entering value less than MIN_SAFE_INTEGER (e.g. -9007199254740992)', async () => {
      render(<Field.Number />)
      const input = document.querySelector('input')

      await userEvent.type(input, '-9007199254740992')

      await waitFor(() => {
        const statusElement = document.querySelector('.dnb-form-status')
        expect(statusElement).toBeInTheDocument()

        // Check that the message contains the Norwegian text and the formatted number
        const alertText = statusElement.textContent
        const expectedText = nb.NumberField.errorMinimum.replace(
          '{minimum}',
          String(format(Number.MIN_SAFE_INTEGER, { locale: 'nb-NO' }))
        )
        // Use regex to handle both regular and non-breaking spaces
        const expectedRegex = expectedText.replace(/\s/g, '\\s')
        expect(alertText).toMatch(new RegExp(expectedRegex))
      })
    })

    it('should show minimum error when entering value less than MIN_SAFE_INTEGER (e.g. -9007199254740992)', async () => {
      const minimum = 10
      render(<Field.Number minimum={minimum} />)
      const input = document.querySelector('input')

      await userEvent.type(input, '-9007199254740992')

      await waitFor(() => {
        const statusElement = document.querySelector('.dnb-form-status')
        expect(statusElement).toBeInTheDocument()

        // Check that the message contains the Norwegian text and the formatted number
        const alertText = statusElement.textContent
        const expectedText = nb.NumberField.errorMinimum.replace(
          '{minimum}',
          String(format(minimum, { locale: 'nb-NO' }))
        )
        // Use regex to handle both regular and non-breaking spaces
        const expectedRegex = expectedText.replace(/\s/g, '\\s')
        expect(alertText).toMatch(new RegExp(expectedRegex))
      })
    })

    it('should show minimum error when entering value less than MIN_SAFE_INTEGER (e.g. -9007199254740992) when providing minimum', async () => {
      // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
      const minimum = -9007199254740993
      render(<Field.Number minimum={minimum} />)
      const input = document.querySelector('input')

      await userEvent.type(input, '-9007199254740992')

      await waitFor(() => {
        const statusElement = document.querySelector('.dnb-form-status')
        expect(statusElement).toBeInTheDocument()

        // Check that the message contains the Norwegian text and the formatted number
        const alertText = statusElement.textContent
        const expectedText = nb.NumberField.errorMinimum.replace(
          '{minimum}',
          String(format(Number.MIN_SAFE_INTEGER, { locale: 'nb-NO' }))
        )
        // Use regex to handle both regular and non-breaking spaces
        const expectedRegex = expectedText.replace(/\s/g, '\\s')
        expect(alertText).toMatch(new RegExp(expectedRegex))
      })
    })

    it('should set validateContinuously to true when numberValue exceeds MAX_SAFE_INTEGER', () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState(undefined)
        const [validateContinuously, setValidateContinuously] =
          React.useState(false)

        return (
          <div>
            <Field.Number
              value={value}
              onChange={(newValue) => {
                setValue(newValue)
                // This simulates the internal logic
                setValidateContinuously(newValue > Number.MAX_SAFE_INTEGER)
              }}
            />
            <output>{validateContinuously.toString()}</output>
          </div>
        )
      }

      render(<TestComponent />)
      const input = document.querySelector('input')
      const output = document.querySelector('output')

      // Initially should be false
      expect(output).toHaveTextContent('false')

      // Type a value within MAX_SAFE_INTEGER
      fireEvent.change(input, { target: { value: '9007199254740991' } })
      expect(output).toHaveTextContent('false')

      // Type a value exceeding MAX_SAFE_INTEGER
      fireEvent.change(input, { target: { value: '9007199254740992' } })
      expect(output).toHaveTextContent('true')
    })

    it('should not show error during typing when validateContinuously is explicitly set to false', async () => {
      render(<Field.Number maximum={1000} validateContinuously={false} />)
      const input = document.querySelector('input')

      // Type a value that exceeds the maximum
      await userEvent.type(input, '1001')

      // No error should appear during typing
      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()

      // Error should appear on blur
      input.blur()

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
        const expected = nb.NumberField.errorMaximum.replace(
          '{maximum}',
          String(format(1000, { locale: 'nb-NO' }))
        )
        // Use regex to handle both regular and non-breaking spaces
        const expectedRegex = expected.replace(/\s/g, '\\s')
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(new RegExp(expectedRegex))
      })
    })

    it('should show error during typing when using custom validator with validateContinuously', async () => {
      const validator = (value) => {
        if (value > 1000) {
          return new Error('Value must be less than or equal to 1000')
        }
      }

      render(<Field.Number validateContinuously validator={validator} />)
      const input = document.querySelector('input')

      // Type a value that exceeds the validator limit
      await userEvent.type(input, '1001')

      // Error should appear during typing
      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent('Value must be less than or equal to 1000')
      })
    })

    it('should show error on blur when maximum is exceeded (default behavior)', async () => {
      render(<Field.Number maximum={1000} />)
      const input = document.querySelector('input')

      // Type a value that exceeds the maximum
      await userEvent.type(input, '1001')

      // No error should appear during typing (default behavior)
      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()

      // Error should appear on blur
      input.blur()

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
        const expected = nb.NumberField.errorMaximum.replace(
          '{maximum}',
          String(format(1000, { locale: 'nb-NO' }))
        )
        // Use regex to handle both regular and non-breaking spaces
        const expectedRegex = expected.replace(/\s/g, '\\s')
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(new RegExp(expectedRegex))
      })
    })

    it('should show error on blur when exclusiveMaximum is exceeded (default behavior)', async () => {
      render(<Field.Number exclusiveMaximum={1000} />)
      const input = document.querySelector('input')

      // Type a value that exceeds the exclusive maximum
      await userEvent.type(input, '1000')

      // No error should appear during typing (default behavior)
      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()

      // Error should appear on blur
      input.blur()

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
        const expected = nb.NumberField.errorExclusiveMaximum.replace(
          '{exclusiveMaximum}',
          String(format(1000, { locale: 'nb-NO' }))
        )
        // Use regex to handle both regular and non-breaking spaces
        const expectedRegex = expected.replace(/\s/g, '\\s')
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(new RegExp(expectedRegex))
      })
    })

    it('should show error on blur when maximum safe integer is exceeded (default behavior)', async () => {
      render(<Field.Number />)
      const input = document.querySelector('input')

      // Type a value that exceeds MAX_SAFE_INTEGER
      await userEvent.type(input, '9007199254740992') // MAX_SAFE_INTEGER + 1

      // Error should appear during typing because it exceeds safe integer range
      await waitFor(() => {
        const statusElement = document.querySelector('.dnb-form-status')
        expect(statusElement).toBeInTheDocument()

        // Check that the message contains the Norwegian text and the formatted number
        const alertText = statusElement.textContent
        const expectedText = nb.NumberField.errorMaximum.replace(
          '{maximum}',
          String(format(Number.MAX_SAFE_INTEGER, { locale: 'nb-NO' }))
        )
        // Use regex to handle both regular and non-breaking spaces
        const expectedRegex = expectedText.replace(/\s/g, '\\s')
        expect(alertText).toMatch(new RegExp(expectedRegex))
      })
    })

    it('should show error on blur when maximum safe integer is exceeded (default behavior) when providing maximum', async () => {
      render(<Field.Number maximum={9007199254740992} />)
      const input = document.querySelector('input')

      // Type a value that exceeds MAX_SAFE_INTEGER
      await userEvent.type(input, '9007199254740993') // MAX_SAFE_INTEGER + 1

      // Error should appear during typing because it exceeds safe integer range
      await waitFor(() => {
        const statusElement = document.querySelector('.dnb-form-status')
        expect(statusElement).toBeInTheDocument()

        // Check that the message contains the Norwegian text and the formatted number
        const alertText = statusElement.textContent
        const expectedText = nb.NumberField.errorMaximum.replace(
          '{maximum}',
          String(format(Number.MAX_SAFE_INTEGER, { locale: 'nb-NO' }))
        )
        // Use regex to handle both regular and non-breaking spaces
        const expectedRegex = expectedText.replace(/\s/g, '\\s')
        expect(alertText).toMatch(new RegExp(expectedRegex))
      })
    })

    it('should show maximum error on blur when maximum safe integer is exceeded (default behavior)', async () => {
      const maximum = 10
      render(<Field.Number maximum={maximum} />)
      const input = document.querySelector('input')

      // Type a value that exceeds MAX_SAFE_INTEGER
      await userEvent.type(input, '9007199254740992') // MAX_SAFE_INTEGER + 1

      // Error should appear during typing because it exceeds safe integer range
      await waitFor(() => {
        const statusElement = document.querySelector('.dnb-form-status')
        expect(statusElement).toBeInTheDocument()

        // Check that the message contains the Norwegian text and the formatted number
        const alertText = statusElement.textContent
        const expectedText = nb.NumberField.errorMaximum.replace(
          '{maximum}',
          String(format(maximum, { locale: 'nb-NO' }))
        )
        // Use regex to handle both regular and non-breaking spaces
        const expectedRegex = expectedText.replace(/\s/g, '\\s')
        expect(alertText).toMatch(new RegExp(expectedRegex))
      })
    })
  })

  describe('Zod validation', () => {
    it('shows localized min error when Zod schema has min without custom message (direct)', async () => {
      const schema = z.number().min(5)

      render(<Field.Number schema={schema} />)
      const input = document.querySelector('input')

      await userEvent.type(input, '3')
      input.blur()

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(
          nb.NumberField.errorMinimum.replace(
            '{minimum}',
            String(format(5, { locale: 'nb-NO' }))
          )
        )
      })
    })

    it('shows localized max error when Zod schema has max without custom message (via Form.Handler)', async () => {
      const schema = z.object({ amount: z.number().max(10) })

      render(
        <Form.Handler schema={schema} ajvInstance={makeAjvInstance()}>
          <Field.Number path="/amount" />
        </Form.Handler>
      )

      const input = document.querySelector('input')
      await userEvent.type(input, '15')
      input.blur()

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(
          nb.NumberField.errorMaximum.replace(
            '{maximum}',
            String(format(10, { locale: 'nb-NO' }))
          )
        )
      })
    })

    it('should validate with Zod schema directly', async () => {
      const schema = z.number().min(5)

      render(<Field.Number schema={schema} />)
      const input = document.querySelector('input')

      // Type a value that's too small
      await userEvent.type(input, '3')
      input.blur()

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(
          nb.NumberField.errorMinimum.replace(
            '{minimum}',
            String(format(5, { locale: 'nb-NO' }))
          )
        )
      })
    })

    it('should validate with Zod schema via Form.Handler', async () => {
      const schema = z.object({
        amount: z.number().min(10),
      })

      render(
        <Form.Handler schema={schema} ajvInstance={makeAjvInstance()}>
          <Field.Number path="/amount" />
        </Form.Handler>
      )

      const input = document.querySelector('input')

      // Type a value that's too small
      await userEvent.type(input, '5')
      input.blur()

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(
          nb.NumberField.errorMinimum.replace(
            '{minimum}',
            String(format(10, { locale: 'nb-NO' }))
          )
        )
      })
    })

    it('shows localized multipleOf error when Zod schema has multipleOf without custom message (direct)', async () => {
      const schema = z.number().multipleOf(3)

      render(<Field.Number schema={schema} />)
      const input = document.querySelector('input')

      // Type a value that's not a multiple of 3
      await userEvent.type(input, '5')
      input.blur()

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(
          nb.NumberField.errorMultipleOf.replace(
            '{multipleOf}',
            String(format(3, { locale: 'nb-NO' }))
          )
        )
      })
    })

    it('should show provided errorMessages based on validation rule with injected value', async () => {
      render(<Field.Number minimum={5} />)
      const input = document.querySelector('input')

      // Type a value that's too small
      await userEvent.type(input, '3')
      input.blur()

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(
          nb.NumberField.errorMinimum.replace(
            '{minimum}',
            String(format(5, { locale: 'nb-NO' }))
          )
        )
      })
    })

    it('should show provided errorMessages based on validation rule with injected value for maximum', async () => {
      render(<Field.Number maximum={10} />)
      const input = document.querySelector('input')

      // Type a value that's too large
      await userEvent.type(input, '15')
      input.blur()

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(
          nb.NumberField.errorMaximum.replace(
            '{maximum}',
            String(format(10, { locale: 'nb-NO' }))
          )
        )
      })
    })

    it('should show provided errorMessages based on validation rule with injected value for exclusiveMinimum', async () => {
      render(<Field.Number exclusiveMinimum={5} />)
      const input = document.querySelector('input')

      // Type a value that's not greater than exclusiveMinimum
      await userEvent.type(input, '5')
      input.blur()

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(
          nb.NumberField.errorExclusiveMinimum.replace(
            '{exclusiveMinimum}',
            String(format(5, { locale: 'nb-NO' }))
          )
        )
      })
    })

    it('should show provided errorMessages based on validation rule with injected value for exclusiveMaximum', async () => {
      render(<Field.Number exclusiveMaximum={10} />)
      const input = document.querySelector('input')

      // Type a value that's not less than exclusiveMaximum
      await userEvent.type(input, '10')
      input.blur()

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(
          nb.NumberField.errorExclusiveMaximum.replace(
            '{exclusiveMaximum}',
            String(format(10, { locale: 'nb-NO' }))
          )
        )
      })
    })

    it('should show provided errorMessages based on validation rule with injected value for multipleOf', async () => {
      render(<Field.Number multipleOf={3} />)
      const input = document.querySelector('input')

      // Type a value that's not a multiple of 3
      await userEvent.type(input, '5')
      input.blur()

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(
          nb.NumberField.errorMultipleOf.replace(
            '{multipleOf}',
            String(format(3, { locale: 'nb-NO' }))
          )
        )
      })
    })

    it('should not show error for valid value using Zod schema directly', async () => {
      const schema = z.number().min(5, 'Minimum 5 required')

      render(<Field.Number schema={schema} />)
      const input = document.querySelector('input')

      await userEvent.type(input, '7')
      input.blur()

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).not.toBeInTheDocument()
      })
    })

    it('should not show error for valid value when Zod schema is provided by Form.Handler', async () => {
      const schema = z.object({ amount: z.number().min(3) })

      render(
        <Form.Handler schema={schema}>
          <Field.Number path="/amount" />
        </Form.Handler>
      )

      const input = document.querySelector('input')
      await userEvent.type(input, '5')
      input.blur()

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).not.toBeInTheDocument()
      })
    })

    it('should show error on blur for invalid value using Zod schema with validateUnchanged', async () => {
      const schema = z.number().min(5, 'Minimum 5 required')

      render(<Field.Number schema={schema} validateUnchanged />)
      const input = document.querySelector('input')

      await userEvent.type(input, '3')
      input.focus()
      input.blur()

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent('Minimum 5 required')
      })
    })
  })
})
