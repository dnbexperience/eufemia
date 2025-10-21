import React from 'react'
import { isCI } from 'repo-utils'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SharedProvider from '../../../../../shared/Provider'
import {
  Field,
  Form,
  JSONSchema,
  makeAjvInstance,
  DataContext,
} from '../../..'
import locales from '../../../constants/locales'
import DrawerListProvider from '../../../../../fragments/drawer-list/DrawerListProvider'
import { AdditionalArgs } from '../PhoneNumber'

const nbNO = locales['nb-NO']
const enGB = locales['en-GB']

if (isCI) {
  jest.retryTimes(5) // because of an flaky async tests
}

describe('Field.PhoneNumber', () => {
  it('should default to 47', () => {
    render(<Field.PhoneNumber />)

    const codeElement = document.querySelector(
      '.dnb-forms-field-phone-number__country-code input'
    )

    fireEvent.mouseDown(codeElement)

    const selectedItemElement = document.querySelector(
      '.dnb-drawer-list__option.dnb-drawer-list__option--selected'
    )

    expect(selectedItemElement).toBeInTheDocument()
    expect(selectedItemElement.textContent).toContain('Norge+47')
  })

  it('should use nb-NO by default', () => {
    render(<Field.PhoneNumber />)

    const codeElement = document.querySelector(
      '.dnb-forms-field-phone-number__country-code input'
    )

    fireEvent.mouseDown(codeElement)

    const selectedItemElement = document.querySelector(
      '.dnb-drawer-list__option.dnb-drawer-list__option--selected'
    )

    expect(selectedItemElement.textContent).toBe('Norge+47')
  })

  it('should support size', () => {
    render(<Field.PhoneNumber size="large" />)

    const autocompleteElement: HTMLInputElement = document.querySelector(
      '.dnb-autocomplete'
    )
    expect(autocompleteElement.classList).toContain(
      'dnb-autocomplete--large'
    )

    const fieldPhoneNumberElement: HTMLInputElement =
      document.querySelector('.dnb-forms-field-phone-number')
    expect(fieldPhoneNumberElement.classList).toContain(
      'dnb-forms-field-block--label-height-large'
    )

    const fieldPhoneNumberNumberElement: HTMLInputElement =
      document.querySelector('.dnb-forms-field-phone-number__number')
    expect(fieldPhoneNumberNumberElement.classList).toContain(
      'dnb-forms-field-block--label-height-large'
    )
  })

  it('should support disabled prop', () => {
    const { rerender } = render(
      <Field.PhoneNumber label="Disabled label" disabled />
    )

    const labelElement = () => document.querySelector('label')

    expect(labelElement()).toHaveAttribute('disabled')

    rerender(<Field.PhoneNumber label="Disabled label" />)

    expect(labelElement()).not.toHaveAttribute('disabled')
  })

  it('should set correct class when labelSrOnly is true', () => {
    render(<Field.PhoneNumber labelSrOnly />)

    const element = document.querySelectorAll('.dnb-form-label')

    expect(element[0]).toHaveClass('dnb-sr-only')
    expect(element[0]).not.toHaveClass('dnb-form-label--interactive')

    expect(element[1]).toHaveClass('dnb-sr-only')
    expect(element[1]).not.toHaveClass('dnb-form-label--interactive')
  })

  it('should have default label', () => {
    render(<Field.PhoneNumber />)

    const label = document.querySelector('.dnb-forms-field-phone-number')
    expect(label).toHaveTextContent(nbNO.PhoneNumber.label)
  })

  it('should add (optional) text to the number label if required={false}', () => {
    render(
      <Form.Handler required>
        <Field.PhoneNumber required={false} />
      </Form.Handler>
    )

    const codeElement = document.querySelector(
      '.dnb-forms-field-phone-number__country-code'
    ) as HTMLInputElement
    const numberElement = document.querySelector(
      '.dnb-forms-field-phone-number__number'
    ) as HTMLInputElement

    expect(codeElement.querySelector('label')).not.toHaveTextContent(
      `${nbNO.Field.optionalLabelSuffix}`
    )
    expect(numberElement.querySelector('label')).toHaveTextContent(
      `${nbNO.PhoneNumber.label} ${nbNO.Field.optionalLabelSuffix}`
    )

    // Use "textContent" to check against non-breaking space
    expect(numberElement.querySelector('label').textContent).toBe(
      `${nbNO.PhoneNumber.label}${' '}${nbNO.Field.optionalLabelSuffix}`
    )
  })

  it('should only have a mask when +47 is given', async () => {
    const { rerender } = render(<Field.PhoneNumber value="999999990000" />)

    const codeElement = document.querySelector(
      '.dnb-forms-field-phone-number__country-code input'
    ) as HTMLInputElement
    const numberElement = document.querySelector(
      '.dnb-forms-field-phone-number__number input'
    ) as HTMLInputElement

    expect(codeElement.value).toBe('NO (+47)')
    expect(numberElement.value).toBe('99 99 99 99')

    await userEvent.type(numberElement, '123')

    expect(numberElement.value).toBe('99 99 99 99')

    rerender(<Field.PhoneNumber value="+41 99999999123456" />)

    expect(codeElement.value).toBe('CH (+41)')
    expect(numberElement.value).toBe('999999991234')

    await userEvent.type(numberElement, '123')

    expect(numberElement.value).toBe('999999991234')
  })

  it('should only have a placeholder when +47 is given', async () => {
    const { rerender } = render(<Field.PhoneNumber />)

    expect(
      document.querySelector('.dnb-input__placeholder').textContent
    ).toBe('00 00 00 00')

    rerender(<Field.PhoneNumber value="+41" />)

    expect(
      document.querySelector('.dnb-input__placeholder')
    ).not.toBeInTheDocument()
  })

  it('should return correct value onFocus and onBlur event', async () => {
    const onFocus = jest.fn()
    const onBlur = jest.fn()
    render(<Field.PhoneNumber onFocus={onFocus} onBlur={onBlur} />)

    const phoneElement = document.querySelector(
      '.dnb-forms-field-phone-number__number input'
    )

    fireEvent.focus(phoneElement)
    expect(onFocus).toHaveBeenLastCalledWith(
      undefined,
      expect.objectContaining({
        countryCode: '+47',
        phoneNumber: undefined,
        iso: 'NO',
      })
    )

    fireEvent.blur(phoneElement)
    expect(onBlur).toHaveBeenLastCalledWith(
      undefined,
      expect.objectContaining({
        countryCode: '+47',
        phoneNumber: undefined,
        iso: 'NO',
      })
    )

    await userEvent.type(phoneElement, '99999999')

    fireEvent.focus(phoneElement)
    expect(onFocus).toHaveBeenLastCalledWith(
      '+47 99999999',
      expect.objectContaining({
        countryCode: '+47',
        phoneNumber: '99999999',
        iso: 'NO',
      })
    )

    fireEvent.blur(phoneElement)
    expect(onBlur).toHaveBeenLastCalledWith(
      '+47 99999999',
      expect.objectContaining({
        countryCode: '+47',
        phoneNumber: '99999999',
        iso: 'NO',
      })
    )
  })

  // TODO: This is a temporary solution, and should be removed once the mask is updated to handle this case.
  it('should truncate the phone number of more than 8 digits when changing country code to Norway', async () => {
    const onNumberChange = jest.fn()

    render(
      <Field.PhoneNumber
        value="+46 987654321231"
        onNumberChange={onNumberChange}
      />
    )

    const codeElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-phone-number__country-code input'
    )
    const phoneElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-phone-number__number input'
    )

    expect(codeElement.value).toEqual('SE (+46)')
    expect(phoneElement.value).toEqual('987654321231')

    await userEvent.clear(codeElement)
    await userEvent.type(codeElement, 'Norge')
    fireEvent.click(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
    )

    const items = document.querySelectorAll('li.dnb-drawer-list__option')
    const item = Array.from(items).find((element) => {
      return element.className.includes('selected')
    })

    expect(item.textContent).toBe('Norge+47')
    expect(phoneElement.value).toEqual('98 76 54 32')

    await waitFor(() => {
      expect(onNumberChange).toHaveBeenCalledTimes(1)
      expect(onNumberChange).toHaveBeenLastCalledWith('98765432')
    })
  })

  it('should have selected correct item', async () => {
    render(<Field.PhoneNumber />)

    const codeElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-phone-number__country-code input'
    )

    expect(codeElement.value).toEqual('NO (+47)')

    await userEvent.type(codeElement, ' ')

    await waitFor(() => {
      const items = document.querySelectorAll('li.dnb-drawer-list__option')
      const item = Array.from(items).find((element) => {
        return element.className.includes('selected')
      })
      expect(item?.textContent).toBe('Norge+47')
    })
  })

  it('should update internal state from outside', () => {
    const onChange = jest.fn()
    const onFocus = jest.fn()
    const onCountryCodeChange = jest.fn()

    const MockPhoneNumber = () => {
      const [state, update] = React.useState('+47 1')
      React.useEffect(() => {
        update('+41 2')
      }, [])

      return (
        <Field.PhoneNumber
          value={state}
          onFocus={(value) => onFocus(value)}
          onCountryCodeChange={onCountryCodeChange}
          onChange={(value) => {
            update(value)
            onChange(value)
          }}
          noAnimation
        />
      )
    }

    render(<MockPhoneNumber />)

    const codeElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-phone-number__country-code input'
    )
    const phoneElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-phone-number__number input'
    )
    const firstItemElement = () =>
      document.querySelectorAll('li.dnb-drawer-list__option')[0]

    expect(codeElement.value).toEqual('CH (+41)')
    expect(phoneElement.value).toEqual('2​​​​​​​​​​​')

    // Change PhoneNumber
    fireEvent.change(phoneElement, { target: { value: '234' } })
    fireEvent.focus(phoneElement)

    expect(onChange).toHaveBeenNthCalledWith(1, '+41 234')
    expect(onFocus).toHaveBeenNthCalledWith(1, '+41 234')
    expect(codeElement.value).toEqual('CH (+41)')
    expect(phoneElement.value).toEqual('234​​​​​​​​​')

    // Change CountryCode
    fireEvent.focus(codeElement)
    fireEvent.keyDown(codeElement, {
      key: 'Enter',
      keyCode: 13,
    })
    fireEvent.change(codeElement, { target: { value: '+47' } })
    fireEvent.click(firstItemElement())

    expect(onChange).toHaveBeenNthCalledWith(2, '+47 234')
    expect(onFocus).toHaveBeenNthCalledWith(2, '+41 234')
    expect(onCountryCodeChange).toHaveBeenCalledWith('+47')
    expect(codeElement.value).toEqual('NO (+47)')
    expect(phoneElement.value).toEqual('23 4​ ​​ ​​')

    fireEvent.focus(phoneElement)
    expect(onFocus).toHaveBeenNthCalledWith(3, '+47 234')

    // Empty PhoneNumber – expect empty value
    fireEvent.change(phoneElement, { target: { value: '' } })
    fireEvent.focus(phoneElement)

    expect(onChange).toHaveBeenNthCalledWith(3, undefined)
    expect(onFocus).toHaveBeenNthCalledWith(4, undefined)
    expect(codeElement.value).toEqual('NO (+47)')
    expect(phoneElement.value).toEqual('')
  })

  it('should display specified countries on dropdown click, after user has entered a phonenumber', async () => {
    const { rerender } = render(
      <Field.PhoneNumber countries="Scandinavia" />
    )

    const [ccInput, phoneInput] = Array.from(
      document.querySelectorAll('input')
    )
    const countries = () =>
      document.querySelectorAll('li:not([aria-hidden])')

    await userEvent.type(phoneInput, '123')
    fireEvent.keyDown(ccInput, {
      key: 'Enter',
      keyCode: 13,
    })

    const scandinavia = countries()

    expect(scandinavia).toHaveLength(3)
    expect(scandinavia[0]).toHaveTextContent('Danmark+45')
    expect(scandinavia[1]).toHaveTextContent('Norge+47')
    expect(scandinavia[2]).toHaveTextContent('Sverige+46')

    rerender(<Field.PhoneNumber countries="Nordic" />)

    const nordic = countries()

    await userEvent.clear(phoneInput)
    await userEvent.type(phoneInput, '123')
    fireEvent.keyDown(ccInput, {
      key: 'Enter',
      keyCode: 13,
    })

    expect(nordic).toHaveLength(7)
    expect(nordic[0]).toHaveTextContent('Danmark+45')
    expect(nordic[1]).toHaveTextContent('Finland+358')
    expect(nordic[2]).toHaveTextContent('Færøyene+298')
    expect(nordic[3]).toHaveTextContent('Grønland+299')
    expect(nordic[4]).toHaveTextContent('Island+354')
    expect(nordic[5]).toHaveTextContent('Norge+47')
    expect(nordic[6]).toHaveTextContent('Sverige+46')

    rerender(<Field.PhoneNumber countries="Europe" />)

    const europe = countries()

    await userEvent.clear(phoneInput)
    await userEvent.type(phoneInput, '123')
    fireEvent.keyDown(ccInput, {
      key: 'Enter',
      keyCode: 13,
    })

    expect(europe).toHaveLength(52)
  })

  describe('onCountryCodeChange', () => {
    it('should return correct value', async () => {
      const onCountryCodeChange = jest.fn()

      render(
        <Field.PhoneNumber
          onCountryCodeChange={onCountryCodeChange}
          noAnimation
        />
      )

      const codeElement = document.querySelector(
        '.dnb-forms-field-phone-number__country-code input'
      )

      await userEvent.clear(codeElement)
      await userEvent.type(codeElement, 'Sverige')
      fireEvent.click(
        document.querySelectorAll('li.dnb-drawer-list__option')[0]
      )

      await waitFor(() => {
        expect(onCountryCodeChange).toHaveBeenCalledTimes(1)
        expect(onCountryCodeChange).toHaveBeenLastCalledWith('+46')
      })
    })
  })

  describe('onNumberChange', () => {
    it('should return correct value', async () => {
      const onNumberChange = jest.fn()

      render(
        <Field.PhoneNumber onNumberChange={onNumberChange} noAnimation />
      )

      const phoneElement: HTMLInputElement = document.querySelector(
        '.dnb-forms-field-phone-number__number input'
      )

      await userEvent.type(phoneElement, '9')

      await waitFor(() => {
        expect(onNumberChange).toHaveBeenCalledTimes(1)
        expect(onNumberChange).toHaveBeenLastCalledWith('9')
      })
    })
  })

  describe('onChange', () => {
    it('should return correct value onChange event', async () => {
      const onChange = jest.fn()

      render(<Field.PhoneNumber onChange={onChange} noAnimation />)

      const phoneElement: HTMLInputElement = document.querySelector(
        '.dnb-forms-field-phone-number__number input'
      )
      const codeElement: HTMLInputElement = document.querySelector(
        '.dnb-forms-field-phone-number__country-code input'
      )
      const firstItemElement = () =>
        document.querySelectorAll('li.dnb-drawer-list__option')[0]

      await userEvent.type(phoneElement, '99999999')

      expect(onChange).toHaveBeenLastCalledWith(
        '+47 99999999',
        expect.objectContaining({
          countryCode: '+47',
          phoneNumber: '99999999',
          iso: 'NO',
        })
      )
      expect(codeElement.value).toEqual('NO (+47)')
      expect(phoneElement.value).toEqual('99 99 99 99')

      // open
      fireEvent.focus(codeElement)
      fireEvent.keyDown(codeElement, {
        key: 'Enter',
        keyCode: 13,
      })

      expect(
        document.querySelector('li.dnb-drawer-list__option--selected')
          .textContent
      ).toBe('Norge+47')

      await userEvent.type(codeElement, '{Backspace}')

      expect(firstItemElement().textContent).toBe('Norge+47')
      expect(codeElement.value).toEqual('')
      expect(phoneElement.value).toEqual('99 99 99 99')

      fireEvent.change(codeElement, { target: { value: '+41' } })
      fireEvent.click(firstItemElement())

      expect(onChange).toHaveBeenLastCalledWith(
        '+41 99999999',
        expect.objectContaining({
          countryCode: '+41',
          phoneNumber: '99999999',
          iso: 'CH',
        })
      )
      expect(codeElement.value).toEqual('CH (+41)')
      expect(phoneElement.value).toEqual('99999999​​​​')

      await userEvent.type(phoneElement, '{Backspace>12}')

      expect(onChange).toHaveBeenLastCalledWith(
        undefined,
        expect.objectContaining({
          countryCode: '+41',
          phoneNumber: undefined,
          iso: 'CH',
        })
      )
      expect(codeElement.value).toEqual('CH (+41)')
      expect(phoneElement.value).toEqual('')
    })

    it('should return correct value onChange event in data context', async () => {
      const onChange = jest.fn()

      render(
        <Form.Handler onChange={onChange}>
          <Field.PhoneNumber path="/phone" />
        </Form.Handler>
      )

      const phoneElement = document.querySelector(
        '.dnb-forms-field-phone-number__number .dnb-input__input'
      )

      await userEvent.type(phoneElement, '9999')

      expect(onChange).toHaveBeenCalledTimes(4)
      expect(onChange).toHaveBeenLastCalledWith(
        { phone: '+47 9999' },
        expect.anything()
      )
    })

    it('should support transformIn', async () => {
      type PhoneNumberDataShape = {
        countryCode: string
        phoneNumber: string
        countryCodePrefix: string
      }

      const transformIn = jest.fn(
        (
          {
            countryCode: iso,
            phoneNumber,
            countryCodePrefix: countryCode,
          }: PhoneNumberDataShape = {} as PhoneNumberDataShape | undefined
        ) => {
          return {
            countryCode,
            phoneNumber,
            iso,
          } satisfies AdditionalArgs
        }
      )

      render(
        <Form.Handler
          defaultData={{
            myField: {
              countryCode: 'GB',
              phoneNumber: '9999',
              countryCodePrefix: '+44',
            },
          }}
        >
          <Field.PhoneNumber path="/myField" transformIn={transformIn} />
        </Form.Handler>
      )

      expect(transformIn).toHaveBeenCalledTimes(1)
      expect(transformIn).toHaveBeenLastCalledWith({
        countryCode: 'GB',
        phoneNumber: '9999',
        countryCodePrefix: '+44',
      })

      const phoneElement = document.querySelector(
        '.dnb-forms-field-phone-number__number .dnb-input__input'
      )
      const codeElement = document.querySelector(
        '.dnb-forms-field-phone-number__country-code input'
      )

      expect(phoneElement).toHaveValue('9999​​​​​​​​')
      expect(codeElement).toHaveValue('GB (+44)')

      expect(transformIn).toHaveBeenCalledTimes(1)
      expect(transformIn).toHaveBeenLastCalledWith({
        countryCode: 'GB',
        countryCodePrefix: '+44',
        phoneNumber: '9999',
      })
    })

    it('should support transformOut', async () => {
      const onChange = jest.fn()

      type PhoneNumberDataShape = {
        countryCode: string
        phoneNumber: string
        countryCodePrefix: string
      }

      const transformOut = jest.fn((internal, additionalArgs = {}) => {
        const {
          countryCode: countryCodePrefix,
          phoneNumber,
          iso: countryCode,
        } = additionalArgs as AdditionalArgs

        return {
          countryCode,
          phoneNumber,
          countryCodePrefix,
        } satisfies PhoneNumberDataShape
      })

      const transformIn = jest.fn(
        (
          {
            countryCode: iso,
            phoneNumber,
            countryCodePrefix: countryCode,
          }: PhoneNumberDataShape = {} as PhoneNumberDataShape | undefined
        ) => {
          return {
            countryCode,
            phoneNumber,
            iso,
          } satisfies AdditionalArgs
        }
      )

      render(
        <Form.Handler onChange={onChange}>
          <Field.PhoneNumber
            path="/myField"
            transformOut={transformOut}
            transformIn={transformIn}
          />
        </Form.Handler>
      )

      const phoneElement = document.querySelector(
        '.dnb-forms-field-phone-number__number .dnb-input__input'
      )

      await userEvent.type(phoneElement, '9999')

      expect(onChange).toHaveBeenCalledTimes(4)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          myField: {
            countryCode: 'NO',
            phoneNumber: '9999',
            countryCodePrefix: '+47',
          },
        },
        expect.anything()
      )
      expect(transformOut).toHaveBeenCalledTimes(10)
      expect(transformOut).toHaveBeenLastCalledWith('+47 9999', {
        countryCode: '+47',
        phoneNumber: '9999',
        iso: 'NO',
      })
      expect(transformIn).toHaveBeenCalledTimes(8)
      expect(transformIn).toHaveBeenLastCalledWith({
        countryCode: 'NO',
        countryCodePrefix: '+47',
        phoneNumber: '9999',
      })

      await userEvent.clear(phoneElement)

      expect(onChange).toHaveBeenCalledTimes(5)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          myField: {
            countryCode: 'NO',
            countryCodePrefix: '+47',
            phoneNumber: undefined,
          },
        },
        expect.anything()
      )
      expect(transformOut).toHaveBeenCalledTimes(12)
      expect(transformOut).toHaveBeenLastCalledWith(undefined, {
        countryCode: '+47',
        phoneNumber: undefined,
        iso: 'NO',
      })
      expect(transformIn).toHaveBeenCalledTimes(10)
      expect(transformIn).toHaveBeenLastCalledWith({
        countryCode: 'NO',
        countryCodePrefix: '+47',
        phoneNumber: undefined,
      })
    })

    it('should return phoneNumber in additional args', async () => {
      const onChange = jest.fn()

      render(<Field.PhoneNumber onChange={onChange} noAnimation />)

      const phoneElement = document.querySelector(
        '.dnb-forms-field-phone-number__number input'
      )
      await userEvent.type(phoneElement, '123')

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledTimes(3)
      })

      expect(onChange).toHaveBeenLastCalledWith(
        '+47 123',
        expect.objectContaining({
          phoneNumber: '123',
        })
      )
    })

    it('should return countryCode in additional args', async () => {
      const onChange = jest.fn()

      render(<Field.PhoneNumber onChange={onChange} noAnimation />)

      const phoneElement = document.querySelector(
        '.dnb-forms-field-phone-number__number input'
      )
      await userEvent.type(phoneElement, '123')

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledTimes(3)
      })

      expect(onChange).toHaveBeenLastCalledWith(
        '+47 123',
        expect.objectContaining({
          countryCode: '+47',
        })
      )

      const codeElement = document.querySelector(
        '.dnb-forms-field-phone-number__country-code input'
      )

      await userEvent.clear(codeElement)
      await userEvent.type(codeElement, 'Sverige')
      fireEvent.click(
        document.querySelectorAll('li.dnb-drawer-list__option')[0]
      )

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledTimes(4)
      })

      expect(onChange).toHaveBeenLastCalledWith(
        '+46 123',
        expect.objectContaining({
          countryCode: '+46',
        })
      )
    })

    it('should return iso in additional args', async () => {
      const onChange = jest.fn()

      render(<Field.PhoneNumber onChange={onChange} noAnimation />)

      const phoneElement = document.querySelector(
        '.dnb-forms-field-phone-number__number input'
      )
      await userEvent.type(phoneElement, '123')

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledTimes(3)
      })

      expect(onChange).toHaveBeenLastCalledWith(
        '+47 123',
        expect.objectContaining({
          iso: 'NO',
        })
      )

      const codeElement = document.querySelector(
        '.dnb-forms-field-phone-number__country-code input'
      )

      await userEvent.clear(codeElement)
      await userEvent.type(codeElement, 'Sverige')
      fireEvent.click(
        document.querySelectorAll('li.dnb-drawer-list__option')[0]
      )

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledTimes(4)
      })

      expect(onChange).toHaveBeenLastCalledWith(
        '+46 123',
        expect.objectContaining({
          iso: 'SE',
        })
      )
    })
  })

  it('should handle events correctly with initial value', async () => {
    const onChange = jest.fn()
    const onCountryCodeChange = jest.fn()

    render(
      <Field.PhoneNumber
        onChange={onChange}
        onCountryCodeChange={onCountryCodeChange}
        value="+47 12"
      />
    )

    const codeElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-phone-number__country-code input'
    )
    const phoneElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-phone-number__number input'
    )
    const firstItemElement = () =>
      document.querySelectorAll('li.dnb-drawer-list__option')[0]

    fireEvent.change(phoneElement, { target: { value: '1' } })

    expect(onChange).toHaveBeenLastCalledWith(
      '+47 1',
      expect.objectContaining({
        countryCode: '+47',
        phoneNumber: '1',
      })
    )

    fireEvent.change(phoneElement, { target: { value: '' } })

    expect(onChange).toHaveBeenLastCalledWith(
      undefined,
      expect.objectContaining({
        countryCode: '+47',
        phoneNumber: undefined,
      })
    )
    expect(codeElement.value).toEqual('NO (+47)')
    expect(phoneElement.value).toEqual('')

    fireEvent.focus(codeElement)
    fireEvent.keyDown(codeElement, {
      key: 'Enter',
      keyCode: 13,
    })
    fireEvent.change(codeElement, { target: { value: '+41' } })
    fireEvent.click(firstItemElement())

    expect(onChange).toHaveBeenCalledTimes(3)

    expect(onCountryCodeChange).toHaveBeenLastCalledWith('+41')
    expect(codeElement.value).toEqual('CH (+41)')
    expect(phoneElement.value).toEqual('')

    await userEvent.type(phoneElement, '456')

    expect(onChange).toHaveBeenLastCalledWith(
      '+41 456',
      expect.objectContaining({
        countryCode: '+41',
        phoneNumber: '456',
      })
    )
    expect(codeElement.value).toEqual('CH (+41)')
    expect(phoneElement.value).toEqual('456​​​​​​​​​')
  })

  it('should handle events correctly', async () => {
    const onChange = jest.fn()
    const onCountryCodeChange = jest.fn()

    render(
      <Field.PhoneNumber
        onChange={onChange}
        onCountryCodeChange={onCountryCodeChange}
        noAnimation
      />
    )

    const codeElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-phone-number__country-code input'
    )
    const phoneElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-phone-number__number input'
    )
    const firstItemElement = () =>
      document.querySelectorAll('li.dnb-drawer-list__option')[0]

    fireEvent.focus(codeElement)
    fireEvent.keyDown(codeElement, {
      key: 'Enter',
      keyCode: 13,
    })
    fireEvent.change(codeElement, { target: { value: '+41' } })
    fireEvent.click(firstItemElement())

    expect(onChange).toHaveBeenCalledTimes(1)

    expect(onCountryCodeChange).toHaveBeenLastCalledWith('+41')
    expect(codeElement.value).toEqual('CH (+41)')
    expect(phoneElement.value).toEqual('')

    await userEvent.type(phoneElement, '456')

    expect(onChange).toHaveBeenLastCalledWith(
      '+41 456',
      expect.objectContaining({
        countryCode: '+41',
        phoneNumber: '456',
      })
    )
    expect(codeElement.value).toEqual('CH (+41)')
    expect(phoneElement.value).toEqual('456​​​​​​​​​')
  })

  it('should support spacing props', () => {
    render(<Field.PhoneNumber top="2rem" />)

    const element = document.querySelector('.dnb-forms-field-phone-number')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class', 'aria-labelledby', 'id'])
    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-space__top--large',
      'dnb-forms-field-block',
      'dnb-forms-field-phone-number',
      'dnb-forms-field-block__composition',
      'dnb-forms-field-block__composition--horizontal',
      'dnb-forms-field-block--width-stretch',
      'dnb-forms-field-block--content-width-large',
    ])
  })

  it('should select whole country code input value on click', async () => {
    render(<Field.PhoneNumber />)

    const codeElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-phone-number__country-code input'
    )

    await userEvent.click(codeElement)

    await waitFor(() => {
      expect(codeElement.selectionStart).toBe(0)
      expect(codeElement.selectionEnd).toBe(8)
    })
  })

  it('should support country code autofill', async () => {
    const onChange = jest.fn()

    render(<Field.PhoneNumber onChange={onChange} />)

    const codeElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-phone-number__country-code input'
    )
    const phoneElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-phone-number__number input'
    )

    fireEvent.change(phoneElement, {
      target: { value: '999', nativeEvent: undefined },
    })
    fireEvent.change(codeElement, {
      target: { value: '41', nativeEvent: undefined },
    })

    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenNthCalledWith(
      1,
      '+47 999',
      expect.objectContaining({
        countryCode: '+47',
        phoneNumber: '999',
      })
    )
    expect(onChange).toHaveBeenNthCalledWith(
      2,
      '+41 999',
      expect.objectContaining({
        countryCode: '+41',
        phoneNumber: '999',
      })
    )

    // Because of requestAnimationFrame
    await waitFor(() => {
      expect(codeElement.value).toBe('CH (+41)')
    })
  })

  it('should require one number', async () => {
    render(<Field.PhoneNumber required />)

    const phoneElement = document.querySelector(
      '.dnb-forms-field-phone-number__number input'
    )

    await userEvent.type(phoneElement, '1{Backspace}')
    fireEvent.blur(phoneElement)

    expect(document.querySelector('[role="alert"]')).toBeInTheDocument()

    await userEvent.type(phoneElement, '1')
    fireEvent.blur(phoneElement)

    expect(
      document.querySelector('[role="alert"]')
    ).not.toBeInTheDocument()
  })

  it('should require a number, even if country code is given', async () => {
    render(<Field.PhoneNumber required value="+41" validateInitially />)

    const codeElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-phone-number__country-code input'
    )
    const phoneElement = document.querySelector(
      '.dnb-forms-field-phone-number__number input'
    )

    expect(codeElement.value).toEqual('CH (+41)')
    expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
      nbNO.PhoneNumber.errorRequired
    )

    await userEvent.type(phoneElement, '1')
    fireEvent.blur(phoneElement)

    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()
  })

  it('should render given country code, even if no number is given', async () => {
    render(<Field.PhoneNumber value="+41" />)

    const codeElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-phone-number__country-code input'
    )
    const phoneElement = document.querySelector(
      '.dnb-forms-field-phone-number__number input'
    )

    expect(codeElement).toHaveValue('CH (+41)')
    expect(phoneElement).toHaveValue('')

    await userEvent.click(codeElement)

    await waitFor(() => {
      expect(
        document.querySelector('li.dnb-drawer-list__option--selected')
          .textContent
      ).toBe('Sveits+41')
    })
  })

  it('should render given country code from data context, even if no number is given', async () => {
    render(
      <Form.Handler
        data={{
          phoneNumber: '+41',
        }}
      >
        <Field.PhoneNumber path="/phoneNumber" />
      </Form.Handler>
    )

    const codeElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-phone-number__country-code input'
    )
    const phoneElement = document.querySelector(
      '.dnb-forms-field-phone-number__number input'
    )

    expect(codeElement).toHaveValue('CH (+41)')
    expect(phoneElement).toHaveValue('')

    await userEvent.click(codeElement)

    await waitFor(() => {
      expect(
        document.querySelector('li.dnb-drawer-list__option--selected')
          .textContent
      ).toBe('Sveits+41')
    })
  })

  it('should handle simple "pattern" property', async () => {
    render(
      <SharedProvider locale="en-GB">
        <Field.PhoneNumber pattern="^\+47 [49]+" />
      </SharedProvider>
    )

    const numberElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-phone-number__number input'
    )

    await userEvent.type(numberElement, '34')
    fireEvent.blur(numberElement)

    expect(document.querySelector('[role="alert"]')).toBeInTheDocument()
    expect(document.querySelector('[role="alert"]').textContent).toContain(
      enGB.PhoneNumber.errorRequired
    )

    await userEvent.type(numberElement, '{Backspace>8}89')
    fireEvent.blur(numberElement)

    expect(document.querySelector('[role="alert"]')).toBeInTheDocument()

    await userEvent.type(numberElement, '{Backspace>8}43')
    fireEvent.blur(numberElement)

    expect(numberElement.value).toBe('43 ​​ ​​ ​​')

    expect(
      document.querySelector('[role="alert"]')
    ).not.toBeInTheDocument()

    await userEvent.type(numberElement, '{Backspace>8}98')
    fireEvent.blur(numberElement)

    expect(
      document.querySelector('[role="alert"]')
    ).not.toBeInTheDocument()
  })

  it('should handle "pattern" property with country code', () => {
    const props = {
      validateInitially: true,
      pattern:
        '((?=\\+47)^\\+47 [49]\\d{7}$)|((?!\\+47)^\\+\\d{2} \\d{6})',
    }
    const { rerender } = render(
      <Field.PhoneNumber value="+47 99999999" {...props} />
    )

    expect(
      document.querySelector('[role="alert"]')
    ).not.toBeInTheDocument()

    rerender(<Field.PhoneNumber value="+47 9999" {...props} />)

    expect(document.querySelector('[role="alert"]')).toBeInTheDocument()

    rerender(<Field.PhoneNumber value="+41 999999" {...props} />)

    expect(
      document.querySelector('[role="alert"]')
    ).not.toBeInTheDocument()

    rerender(<Field.PhoneNumber value="+41 9999" {...props} />)

    expect(document.querySelector('[role="alert"]')).toBeInTheDocument()
  })

  it('should handle "onChangeValidator" property with country code', async () => {
    const onChangeValidator = jest.fn(() => {
      return new Error('some error')
    })

    render(
      <SharedProvider locale="en-GB">
        <Field.PhoneNumber
          onChangeValidator={onChangeValidator}
          validateInitially
          value="+41 9999"
        />
      </SharedProvider>
    )

    expect(onChangeValidator).toHaveBeenCalledTimes(1)
    expect(onChangeValidator).toHaveBeenCalledWith(
      '+41 9999',
      expect.objectContaining({
        errorMessages: expect.objectContaining({
          'Field.errorRequired': enGB.PhoneNumber.errorRequired,
          'Field.errorPattern': enGB.PhoneNumber.errorRequired,
        }),
      })
    )

    await waitFor(() => {
      expect(document.querySelector('[role="alert"]')).toBeInTheDocument()
      expect(
        document.querySelector('[role="alert"]').textContent
      ).toContain('some error')
    })
  })

  it('should filter countries list with given filterCountries', async () => {
    render(
      <Field.PhoneNumber
        filterCountries={({ regions }) => regions?.includes('Scandinavia')}
      />
    )

    const codeElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-phone-number__country-code input'
    )

    // open
    fireEvent.focus(codeElement)
    fireEvent.keyDown(codeElement, {
      key: 'Enter',
      keyCode: 13,
    })

    await waitFor(() => {
      const liElements = document.querySelectorAll('li:not([aria-hidden])')
      expect(liElements).toHaveLength(3)
      expect(liElements[0].textContent).toBe('Norge+47')
      expect(liElements[1].textContent).toBe('Sverige+46')
      expect(liElements[2].textContent).toBe('Danmark+45')
    })

    expect(
      document.querySelector('li.dnb-drawer-list__option--selected')
        .textContent
    ).toBe('Norge+47')
  })

  it('should by default sort prioritized countries on top', async () => {
    render(<Field.PhoneNumber />)

    const codeElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-phone-number__country-code input'
    )

    // open
    fireEvent.focus(codeElement)
    fireEvent.keyDown(codeElement, {
      key: 'Enter',
      keyCode: 13,
    })

    await waitFor(() => {
      const liElements = document.querySelectorAll('li:not([aria-hidden])')
      expect(liElements.length).toBeGreaterThan(200)
      expect(liElements[0].textContent).toContain('Norge')
      expect(liElements[1].textContent).toContain('Sverige')
      expect(liElements[2].textContent).toContain('Danmark')
      expect(liElements[3].textContent).toContain('Finland')
      expect(liElements[4].textContent).toContain('Afghanistan')
    })
  })

  it('should show only Scandinavian countries', async () => {
    render(<Field.PhoneNumber countries="Scandinavia" />)

    const codeElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-phone-number__country-code input'
    )

    // open
    fireEvent.focus(codeElement)
    fireEvent.keyDown(codeElement, {
      key: 'Enter',
      keyCode: 13,
    })

    await waitFor(() => {
      const liElements = document.querySelectorAll('li:not([aria-hidden])')
      expect(liElements).toHaveLength(3)
      expect(liElements[0].textContent).toBe('Danmark+45')
      expect(liElements[1].textContent).toBe('Norge+47')
      expect(liElements[2].textContent).toBe('Sverige+46')
    })

    expect(
      document.querySelector('li.dnb-drawer-list__option--selected')
        .textContent
    ).toBe('Norge+47')
  })

  it('should show only Scandinavian countries and filterCountries at the same time', async () => {
    render(
      <Field.PhoneNumber
        countries="Scandinavia"
        filterCountries={({ iso }) => iso !== 'DK'}
      />
    )

    const codeElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-phone-number__country-code input'
    )

    // open
    fireEvent.focus(codeElement)
    fireEvent.keyDown(codeElement, {
      key: 'Enter',
      keyCode: 13,
    })

    await waitFor(() => {
      const liElements = document.querySelectorAll('li:not([aria-hidden])')
      expect(liElements).toHaveLength(2)
      expect(liElements[0].textContent).toBe('Norge+47')
      expect(liElements[1].textContent).toBe('Sverige+46')
    })

    expect(
      document.querySelector('li.dnb-drawer-list__option--selected')
        .textContent
    ).toBe('Norge+47')
  })

  it('should sort prioritized countries on top', async () => {
    render(<Field.PhoneNumber countries="Prioritized" />)

    const codeElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-phone-number__country-code input'
    )

    // open
    fireEvent.focus(codeElement)
    fireEvent.keyDown(codeElement, {
      key: 'Enter',
      keyCode: 13,
    })

    await waitFor(() => {
      const liElements = document.querySelectorAll('li:not([aria-hidden])')
      expect(liElements.length).toBeGreaterThan(200)
      expect(liElements[0].textContent).toContain('Norge')
      expect(liElements[1].textContent).toContain('Sverige')
      expect(liElements[2].textContent).toContain('Danmark')
      expect(liElements[3].textContent).toContain('Finland')
      expect(liElements[4].textContent).toContain('Afghanistan')
    })
  })

  it('should omit country code implementation with omitCountryCodeField', async () => {
    const onChange = jest.fn()

    const { rerender } = render(
      <Field.PhoneNumber omitCountryCodeField onChange={onChange} />
    )

    const numberElement = document.querySelector(
      '.dnb-forms-field-phone-number__number input'
    ) as HTMLInputElement

    expect(
      document.querySelector('.dnb-forms-field-phone-number__country-code')
    ).not.toBeInTheDocument()

    await userEvent.type(numberElement, '123')

    await waitFor(() => {
      expect(numberElement.value).toBe('12 3​ ​​ ​​')
    })
    expect(onChange).toHaveBeenLastCalledWith(
      '123',
      expect.objectContaining({
        phoneNumber: '123',
      })
    )

    rerender(
      <Field.PhoneNumber
        omitCountryCodeField
        value="+47 99999999"
        onChange={onChange}
      />
    )

    expect(numberElement.value).toBe('99 99 99 99')

    await userEvent.type(numberElement, '{Backspace>8}8888')

    await waitFor(() => {
      expect(numberElement.value).toBe('88 88 ​​ ​​')
    })
    expect(onChange).toHaveBeenLastCalledWith(
      '8888',
      expect.objectContaining({
        phoneNumber: '8888',
      })
    )

    await userEvent.type(numberElement, '{Backspace>6}+4')

    await waitFor(() => {
      expect(numberElement.value).toBe('88 4​ ​​ ​​')
    })
    expect(onChange).toHaveBeenLastCalledWith(
      '884',
      expect.objectContaining({
        phoneNumber: '884',
      })
    )
    expect(
      Object.prototype.hasOwnProperty.call(
        onChange.mock.calls[17][1],
        'countryCode'
      )
    ).toBeFalsy()
  })

  it('should not show error when value is empty string', () => {
    render(<Field.PhoneNumber value="" validateInitially />)

    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()
  })

  it('should not show error when value is undefined', () => {
    render(<Field.PhoneNumber value={undefined} validateInitially />)

    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()
  })

  it('should not show error when value partial', () => {
    render(<Field.PhoneNumber value="+41" validateInitially />)

    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()
  })

  it('should validate when required', () => {
    render(
      <Form.Handler>
        <Field.PhoneNumber required />
        <Form.SubmitButton />
      </Form.Handler>
    )

    const buttonElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-submit-button'
    )

    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()

    fireEvent.click(buttonElement)

    expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(1)
    expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
      nbNO.PhoneNumber.errorRequired
    )
  })

  it('should validate schema', async () => {
    const schema: JSONSchema = {
      type: 'string',
      pattern: '^\\+47 [49]+',
    }

    render(
      <DataContext.Provider ajvInstance={makeAjvInstance()}>
        <Field.PhoneNumber schema={schema} />
      </DataContext.Provider>
    )

    const numberElement = document.querySelector(
      '.dnb-forms-field-phone-number__number input'
    ) as HTMLInputElement

    await userEvent.type(numberElement, '123')
    fireEvent.blur(numberElement)

    expect(numberElement.value).toBe('12 3​ ​​ ​​')
    expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(1)
    expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
      nbNO.PhoneNumber.errorRequired
    )

    await userEvent.type(numberElement, '{Backspace>8}456')
    fireEvent.blur(numberElement)

    expect(numberElement.value).toBe('45 6​ ​​ ​​')
    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()
  })

  it('should not validate initially when required and country code is provided as a value', () => {
    render(<Field.PhoneNumber required value="+47" />)

    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()
  })

  it('should execute validateInitially if required', () => {
    const { rerender } = render(
      <Field.PhoneNumber required validateInitially />
    )

    expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(1)
    expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
      nbNO.PhoneNumber.errorRequired
    )

    rerender(<Field.PhoneNumber validateInitially />)

    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()
  })

  it('phone number input should have tel input mode', () => {
    render(<Field.PhoneNumber />)

    const phoneNumberInput = document.querySelector(
      '.dnb-forms-field-phone-number__number .dnb-input__input'
    )

    expect(phoneNumberInput).toHaveAttribute('inputmode', 'tel')
  })

  it('should render value from context', () => {
    render(
      <Form.Handler data={{ phoneNumber: '9999' }}>
        <Field.PhoneNumber path="/phoneNumber" />
      </Form.Handler>
    )

    const phoneNumberInput = document.querySelector(
      '.dnb-forms-field-phone-number__number .dnb-input__input'
    )

    expect(phoneNumberInput).toHaveValue('99 99 ​​ ​​')
  })

  describe('locale', () => {
    it('should change locale', async () => {
      const { rerender } = render(
        <SharedProvider>
          <Field.PhoneNumber />
        </SharedProvider>
      )

      const codeElement = document.querySelector(
        '.dnb-forms-field-phone-number__country-code input'
      )

      fireEvent.mouseDown(codeElement)

      const selectedItemElement = () =>
        document.querySelector(
          '.dnb-drawer-list__option.dnb-drawer-list__option--selected'
        )

      await waitFor(() => {
        expect(selectedItemElement().textContent).toBe('Norge+47')
      })

      rerender(
        <SharedProvider locale="en-GB">
          <Field.PhoneNumber />
        </SharedProvider>
      )

      fireEvent.mouseDown(codeElement)

      await waitFor(() => {
        expect(selectedItemElement().textContent).toBe('Norway+47')
      })

      rerender(
        <SharedProvider locale="nb-NO">
          <Field.PhoneNumber />
        </SharedProvider>
      )

      fireEvent.mouseDown(codeElement)

      await waitFor(() => {
        expect(selectedItemElement().textContent).toBe('Norge+47')
      })
    })

    it('should show search results based on locale', async () => {
      const { rerender } = render(
        <SharedProvider>
          <Field.PhoneNumber />
        </SharedProvider>
      )

      const codeElement: HTMLInputElement = document.querySelector(
        '.dnb-forms-field-phone-number__country-code input'
      )

      const currentOptions = () =>
        Array.from(
          document.querySelectorAll(
            '.dnb-drawer-list__options .dnb-drawer-list__option__inner'
          )
        ).map((option: HTMLSpanElement) => option.textContent)

      await userEvent.click(codeElement)

      await userEvent.clear(codeElement)
      await userEvent.type(codeElement, 'Chi')

      await waitFor(() => {
        expect(currentOptions()).toContain('Chile+56')
        expect(currentOptions()).not.toContain('Kina+86')
      })

      rerender(
        <SharedProvider locale="en-GB">
          <Field.PhoneNumber />
        </SharedProvider>
      )

      await userEvent.clear(codeElement)
      await userEvent.type(codeElement, 'Chi')

      await waitFor(() => {
        expect(currentOptions()).toContain('Chile+56')
        expect(currentOptions()).toContain('China+86')
      })

      rerender(
        <SharedProvider locale="nb-NO">
          <Field.PhoneNumber />
        </SharedProvider>
      )

      await userEvent.clear(codeElement)
      await userEvent.type(codeElement, 'Chi')

      await waitFor(() => {
        expect(currentOptions()).toContain('Chile+56')
        expect(currentOptions()).not.toContain('Kina+86')
      })
    })
  })

  it('should store "displayValue" in data context', async () => {
    let dataContext = null

    render(
      <Form.Handler>
        <Field.PhoneNumber path="/myValue" defaultValue="9999" />
        <DataContext.Consumer>
          {(context) => {
            dataContext = context
            return null
          }}
        </DataContext.Consumer>
      </Form.Handler>
    )

    const input = document.querySelector(
      '.dnb-forms-field-phone-number__number input'
    )
    const countryCode = document.querySelector(
      '.dnb-forms-field-phone-number__country-code input'
    )

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myValue': {
        type: 'field',
        value: '+47 99 99 ​​ ​​',
      },
    })

    const event = userEvent.setup({ delay: 10 })
    await event.click(input)
    await event.keyboard('{ArrowRight>7}8888')

    expect(input).toHaveValue('99 99 88 88')
    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myValue': {
        type: 'field',
        value: '+47 99 99 88 88',
      },
    })

    await event.keyboard('{Backspace>12}')

    expect(input).toHaveValue('')
    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myValue': {
        type: 'field',
        value: undefined,
      },
    })

    await event.keyboard('123')

    expect(input).toHaveValue('12 3​ ​​ ​​')
    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myValue': {
        type: 'field',
        value: '+47 12 3​ ​​ ​​',
      },
    })

    // Open like user would do, but without a delay
    DrawerListProvider['blurDelay'] = 0
    await event.type(countryCode, '{Backspace>12}45')
    await event.keyboard('{Enter}')
    DrawerListProvider['blurDelay'] = 201

    await waitFor(() => {
      expect(dataContext.fieldDisplayValueRef.current).toEqual({
        '/myValue': {
          type: 'field',
          value: '+45 123​​​​​​​​​',
        },
      })
    })
  })

  describe('ARIA', () => {
    it('should validate with ARIA rules', async () => {
      const result = render(
        <Field.PhoneNumber required validateInitially />
      )

      expect(await axeComponent(result)).toHaveNoViolations()
    })

    it('should have aria-required', () => {
      render(<Field.PhoneNumber required />)

      const input = document.querySelector(
        '.dnb-forms-field-phone-number__number input'
      )
      expect(input).toHaveAttribute('aria-required', 'true')
    })

    it('should have aria-invalid', () => {
      render(<Field.PhoneNumber required validateInitially />)

      const input = document.querySelector(
        '.dnb-forms-field-phone-number__number input'
      )
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })
  })
})
