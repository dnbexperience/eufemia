import React from 'react'
import { wait } from '../../../../../core/jest/jestSetup'
import { fireEvent, render } from '@testing-library/react'
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
    expect(onFocus).toHaveBeenLastCalledWith('+47')

    fireEvent.blur(phoneElement)
    expect(onBlur).toHaveBeenLastCalledWith('+47')

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

    const phoneElement = document.querySelector(
      '.dnb-forms-field-phone-number__number input'
    )
    await userEvent.type(phoneElement, '99999999')
    expect(onChange).toHaveBeenLastCalledWith('+47 99999999')

    const codeElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-phone-number__country-code input'
    )

    expect(codeElement.value).toEqual('NO (+47)')

    // open
    fireEvent.keyDown(codeElement, {
      key: 'ArrowDown',
      keyCode: 40,
    })

    expect(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
        .textContent
    ).toBe('+47 Norge')

    fireEvent.focus(codeElement)
    fireEvent.change(codeElement, { target: { value: '+41' } })
    fireEvent.click(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
    )

    expect(codeElement.value).toEqual('CH (+41)')

    await wait(1)

    expect(onCountryCodeChange).toHaveBeenCalledTimes(1)
    expect(onCountryCodeChange).toHaveBeenLastCalledWith('+41')
    expect(onChange).toHaveBeenLastCalledWith('+41 99999999')
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
})
