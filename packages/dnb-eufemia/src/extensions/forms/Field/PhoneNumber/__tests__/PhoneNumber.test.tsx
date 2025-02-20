import React from 'react'
import { isCI } from 'repo-utils'
import { wait, axeComponent } from '../../../../../core/jest/jestSetup'
import { fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SharedProvider from '../../../../../shared/Provider'
import DataContext from '../../../DataContext/Context'
import { Field, Form, JSONSchema } from '../../..'
import locales from '../../../constants/locales'
import DrawerListProvider from '../../../../../fragments/drawer-list/DrawerListProvider'

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
    expect(selectedItemElement.textContent).toContain('+47 Norge')
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

    expect(selectedItemElement.textContent).toBe('+47 Norge')
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
      })
    )

    fireEvent.blur(phoneElement)
    expect(onBlur).toHaveBeenLastCalledWith(
      undefined,
      expect.objectContaining({
        countryCode: '+47',
        phoneNumber: undefined,
      })
    )

    await userEvent.type(phoneElement, '99999999')

    fireEvent.focus(phoneElement)
    expect(onFocus).toHaveBeenLastCalledWith(
      '+47 99999999',
      expect.objectContaining({
        countryCode: '+47',
        phoneNumber: '99999999',
      })
    )

    fireEvent.blur(phoneElement)
    expect(onBlur).toHaveBeenLastCalledWith(
      '+47 99999999',
      expect.objectContaining({
        countryCode: '+47',
        phoneNumber: '99999999',
      })
    )
  })

  it('should have selected correct item', async () => {
    render(<Field.PhoneNumber />)

    const codeElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-phone-number__country-code input'
    )

    expect(codeElement.value).toEqual('NO (+47)')

    await userEvent.type(codeElement, ' ')

    const items = document.querySelectorAll('li.dnb-drawer-list__option')
    const item = Array.from(items).find((element) => {
      return element.className.includes('selected')
    })

    expect(item.textContent).toBe('+47 Norge')
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
    expect(scandinavia[0]).toHaveTextContent('+45 Danmark')
    expect(scandinavia[1]).toHaveTextContent('+47 Norge')
    expect(scandinavia[2]).toHaveTextContent('+46 Sverige')

    rerender(<Field.PhoneNumber countries="Nordic" />)

    const nordic = countries()

    await userEvent.clear(phoneInput)
    await userEvent.type(phoneInput, '123')
    fireEvent.keyDown(ccInput, {
      key: 'Enter',
      keyCode: 13,
    })

    expect(nordic).toHaveLength(7)
    expect(nordic[0]).toHaveTextContent('+45 Danmark')
    expect(nordic[1]).toHaveTextContent('+358 Finland')
    expect(nordic[2]).toHaveTextContent('+298 Færøyene')
    expect(nordic[3]).toHaveTextContent('+299 Grønland')
    expect(nordic[4]).toHaveTextContent('+354 Island')
    expect(nordic[5]).toHaveTextContent('+47 Norge')
    expect(nordic[6]).toHaveTextContent('+46 Sverige')

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

  it('should return correct value onChange event', async () => {
    const onChange = jest.fn()
    const onCountryCodeChange = jest.fn()

    render(
      <Field.PhoneNumber
        onChange={onChange}
        onCountryCodeChange={onCountryCodeChange}
        noAnimation
      />
    )

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
    ).toBe('+47 Norge')

    await userEvent.type(codeElement, '{Backspace}')

    expect(firstItemElement().textContent).toBe('+47 Norge')
    expect(codeElement.value).toEqual('NO (+47')
    expect(phoneElement.value).toEqual('99 99 99 99')

    fireEvent.change(codeElement, { target: { value: '+41' } })
    fireEvent.click(firstItemElement())

    await wait(1)

    expect(onCountryCodeChange).toHaveBeenCalledTimes(1)
    expect(onCountryCodeChange).toHaveBeenLastCalledWith('+41')
    expect(onChange).toHaveBeenLastCalledWith(
      '+41 99999999',
      expect.objectContaining({
        countryCode: '+41',
        phoneNumber: '99999999',
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
      })
    )
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

    expect(attributes).toEqual(['class', 'id'])
    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-space__top--large',
      'dnb-forms-field-block',
      'dnb-forms-field-phone-number',
      'dnb-forms-field-block--width-large',
    ])
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
    await wait(2)

    expect(codeElement.value).toBe('CH (+41)')
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

          /** @deprecated – can be removed in v11 */
          required: enGB.PhoneNumber.errorRequired,
          pattern: enGB.PhoneNumber.errorRequired,
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

  it('should filter countries list with given filterCountries', () => {
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

    const liElements = document.querySelectorAll('li:not([aria-hidden])')
    expect(liElements).toHaveLength(3)
    expect(liElements[0].textContent).toBe('+47 Norge')
    expect(liElements[1].textContent).toBe('+46 Sverige')
    expect(liElements[2].textContent).toBe('+45 Danmark')

    expect(
      document.querySelector('li.dnb-drawer-list__option--selected')
        .textContent
    ).toBe('+47 Norge')
  })

  it('should by default sort prioritized countries on top', () => {
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

    const liElements = document.querySelectorAll('li:not([aria-hidden])')
    expect(liElements.length).toBeGreaterThan(200)
    expect(liElements[0].textContent).toContain('Norge')
    expect(liElements[1].textContent).toContain('Sverige')
    expect(liElements[2].textContent).toContain('Danmark')
    expect(liElements[3].textContent).toContain('Finland')
    expect(liElements[4].textContent).toContain('Afghanistan')
  })

  it('should show only Scandinavian countries', () => {
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

    const liElements = document.querySelectorAll('li:not([aria-hidden])')
    expect(liElements).toHaveLength(3)
    expect(liElements[0].textContent).toBe('+45 Danmark')
    expect(liElements[1].textContent).toBe('+47 Norge')
    expect(liElements[2].textContent).toBe('+46 Sverige')

    expect(
      document.querySelector('li.dnb-drawer-list__option--selected')
        .textContent
    ).toBe('+47 Norge')
  })

  it('should show only Scandinavian countries and filterCountries at the same time', () => {
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

    const liElements = document.querySelectorAll('li:not([aria-hidden])')
    expect(liElements).toHaveLength(2)
    expect(liElements[0].textContent).toBe('+47 Norge')
    expect(liElements[1].textContent).toBe('+46 Sverige')

    expect(
      document.querySelector('li.dnb-drawer-list__option--selected')
        .textContent
    ).toBe('+47 Norge')
  })

  it('should sort prioritized countries on top', () => {
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

    const liElements = document.querySelectorAll('li:not([aria-hidden])')
    expect(liElements.length).toBeGreaterThan(200)
    expect(liElements[0].textContent).toContain('Norge')
    expect(liElements[1].textContent).toContain('Sverige')
    expect(liElements[2].textContent).toContain('Danmark')
    expect(liElements[3].textContent).toContain('Finland')
    expect(liElements[4].textContent).toContain('Afghanistan')
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

    expect(numberElement.value).toBe('12 3​ ​​ ​​')
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

    expect(numberElement.value).toBe('88 88 ​​ ​​')
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

    render(<Field.PhoneNumber schema={schema} />)

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
    it('should change locale', () => {
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

      expect(selectedItemElement().textContent).toBe('+47 Norge')

      rerender(
        <SharedProvider locale="en-GB">
          <Field.PhoneNumber />
        </SharedProvider>
      )

      fireEvent.mouseDown(codeElement)

      expect(selectedItemElement().textContent).toBe('+47 Norway')

      rerender(
        <SharedProvider locale="nb-NO">
          <Field.PhoneNumber />
        </SharedProvider>
      )

      fireEvent.mouseDown(codeElement)

      expect(selectedItemElement().textContent).toBe('+47 Norge')
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

      expect(currentOptions()).toContain('+56 Chile')
      expect(currentOptions()).not.toContain('+86 Kina')

      rerender(
        <SharedProvider locale="en-GB">
          <Field.PhoneNumber />
        </SharedProvider>
      )

      await userEvent.clear(codeElement)
      await userEvent.type(codeElement, 'Chi')

      expect(currentOptions()).toContain('+56 Chile')
      expect(currentOptions()).toContain('+86 China')

      rerender(
        <SharedProvider locale="nb-NO">
          <Field.PhoneNumber />
        </SharedProvider>
      )

      await userEvent.clear(codeElement)
      await userEvent.type(codeElement, 'Chi')

      expect(currentOptions()).toContain('+56 Chile')
      expect(currentOptions()).not.toContain('+86 Kina')
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

    fireEvent.focus(input)
    await userEvent.type(input, '{ArrowRight>6} 8888')

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myValue': {
        type: 'field',
        value: '+47 99 99 88 88',
      },
    })

    await userEvent.type(input, '{Backspace>12}')

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myValue': {
        type: 'field',
        value: undefined,
      },
    })

    await userEvent.type(input, '123')

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myValue': {
        type: 'field',
        value: '+47 12 3​ ​​ ​​',
      },
    })

    // Open like user would do, but without a delay
    DrawerListProvider['blurDelay'] = 0
    await userEvent.type(countryCode, '{Backspace>12}45')
    await userEvent.keyboard('{Enter}')
    DrawerListProvider['blurDelay'] = 201

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myValue': {
        type: 'field',
        value: '+45 123​​​​​​​​​',
      },
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
