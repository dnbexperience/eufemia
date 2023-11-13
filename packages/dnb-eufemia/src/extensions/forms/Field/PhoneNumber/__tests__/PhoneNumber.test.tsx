import React from 'react'
import { wait } from '../../../../../core/jest/jestSetup'
import { act, fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PhoneNumber from '..'
import { Provider } from '../../../../../shared'

describe('Field.PhoneNumber', () => {
  it('should default to 47', () => {
    render(<PhoneNumber />)

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
    render(<PhoneNumber />)

    const codeElement = document.querySelector(
      '.dnb-forms-field-phone-number__country-code input'
    )

    fireEvent.mouseDown(codeElement)

    const selectedItemElement = document.querySelector(
      '.dnb-drawer-list__option.dnb-drawer-list__option--selected'
    )

    expect(selectedItemElement.textContent).toBe('+47 Norge')
  })

  it('should change locale', () => {
    render(
      <Provider locale="en-GB">
        <PhoneNumber />
      </Provider>
    )

    const codeElement = document.querySelector(
      '.dnb-forms-field-phone-number__country-code input'
    )

    fireEvent.mouseDown(codeElement)

    const selectedItemElement = document.querySelector(
      '.dnb-drawer-list__option.dnb-drawer-list__option--selected'
    )

    expect(selectedItemElement.textContent).toBe('+47 Norway')
  })

  it('should return correct value onFocus and onBlur event', async () => {
    const onFocus = jest.fn()
    const onBlur = jest.fn()
    render(<PhoneNumber onFocus={onFocus} onBlur={onBlur} />)

    const phoneElement = document.querySelector(
      '.dnb-forms-field-phone-number__number input'
    )

    fireEvent.focus(phoneElement)
    expect(onFocus).toHaveBeenLastCalledWith('')

    fireEvent.blur(phoneElement)
    expect(onBlur).toHaveBeenLastCalledWith('')

    await userEvent.type(phoneElement, '99999999')

    fireEvent.focus(phoneElement)
    expect(onFocus).toHaveBeenLastCalledWith('+47 99999999')

    fireEvent.blur(phoneElement)
    expect(onBlur).toHaveBeenLastCalledWith('+47 99999999')
  })

  it('should have selected correct item', async () => {
    render(<PhoneNumber />)

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

  it('should return correct value onChange event', async () => {
    const onChange = jest.fn()
    const onCountryCodeChange = jest.fn()

    render(
      <PhoneNumber
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

    expect(onChange).toHaveBeenLastCalledWith('+47 99999999')
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

    fireEvent.focus(codeElement)
    fireEvent.change(codeElement, { target: { value: '+41' } })
    fireEvent.click(firstItemElement())

    await wait(1)

    expect(onCountryCodeChange).toHaveBeenCalledTimes(1)
    expect(onCountryCodeChange).toHaveBeenLastCalledWith('+41')
    expect(onChange).toHaveBeenLastCalledWith('+41 99999999')
    expect(codeElement.value).toEqual('CH (+41)')
    expect(phoneElement.value).toEqual('99 99 99 99')
  })

  it('should handle events correctly', async () => {
    const onChange = jest.fn()
    const onCountryCodeChange = jest.fn()

    render(
      <PhoneNumber
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
    fireEvent.change(codeElement, { target: { value: '+41' } })
    fireEvent.click(firstItemElement())

    expect(onChange).toHaveBeenCalledTimes(0)

    expect(onCountryCodeChange).toHaveBeenLastCalledWith('+41')
    expect(codeElement.value).toEqual('CH (+41)')
    expect(phoneElement.value).toEqual('')

    await userEvent.type(phoneElement, '456')

    expect(onChange).toHaveBeenLastCalledWith('+41 456')
    expect(codeElement.value).toEqual('CH (+41)')
    expect(phoneElement.value).toEqual('45 6​ ​​ ​​')
  })

  it('should handle events correctly with initial value', async () => {
    const onChange = jest.fn()
    const onCountryCodeChange = jest.fn()

    render(
      <PhoneNumber
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

    expect(onChange).toHaveBeenLastCalledWith('+47 1')

    fireEvent.change(phoneElement, { target: { value: '' } })

    expect(onChange).toHaveBeenLastCalledWith('')
    expect(codeElement.value).toEqual('NO (+47)')
    expect(phoneElement.value).toEqual('')

    fireEvent.focus(codeElement)
    fireEvent.change(codeElement, { target: { value: '+41' } })
    fireEvent.click(firstItemElement())

    expect(onChange).toHaveBeenCalledTimes(2)

    expect(onCountryCodeChange).toHaveBeenLastCalledWith('+41')
    expect(codeElement.value).toEqual('CH (+41)')
    expect(phoneElement.value).toEqual('')

    await userEvent.type(phoneElement, '456')

    expect(onChange).toHaveBeenLastCalledWith('+41 456')
    expect(codeElement.value).toEqual('CH (+41)')
    expect(phoneElement.value).toEqual('45 6​ ​​ ​​')
  })

  it('should support spacing props', () => {
    render(<PhoneNumber top="2rem" />)

    const element = document.querySelector('.dnb-forms-field-phone-number')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class'])
    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-space__top--large',
      'dnb-forms-field-block',
      'dnb-forms-field-phone-number',
      'dnb-forms-field-block--width-large',
    ])
  })

  it('should require one number', async () => {
    render(<PhoneNumber required />)

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
})
