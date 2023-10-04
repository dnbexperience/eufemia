import React from 'react'
import { wait } from '../../../../../core/jest/jestSetup'
import { fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PhoneNumber from '..'

describe('Field.PhoneNumber', () => {
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

  it('should return correct value onChange event', async () => {
    const onChange = jest.fn()
    const onCountryCodeChange = jest.fn()
    render(
      <PhoneNumber
        onChange={onChange}
        onCountryCodeChange={onCountryCodeChange}
      />
    )

    const phoneElement = document.querySelector(
      '.dnb-forms-field-phone-number__number input'
    )
    await userEvent.type(phoneElement, '99999999')
    expect(onChange).toHaveBeenLastCalledWith('+47 99999999')

    const codeElement = document.querySelector(
      '.dnb-forms-field-phone-number__country-code input'
    )

    fireEvent.change(codeElement, { target: { value: '+41' } })
    fireEvent.click(
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
    )
    await wait(1)

    expect(onCountryCodeChange).toHaveBeenCalledTimes(1)
    expect(onCountryCodeChange).toHaveBeenLastCalledWith('+41')
    expect(onChange).toHaveBeenLastCalledWith('+41 99999999')
  })
})
