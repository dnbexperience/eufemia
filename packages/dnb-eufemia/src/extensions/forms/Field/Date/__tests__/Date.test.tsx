import React from 'react'
import { act, render } from '@testing-library/react'
import Date, { Props } from '..'
import userEvent from '@testing-library/user-event'
import { axeComponent } from '../../../../../core/jest/jestSetup'

const props: Props = {}

describe('Field.Date', () => {
  it('should render with props', () => {
    render(<Date {...props} />)
  })

  it('should show required warning', async () => {
    render(<Date {...props} value="2023-12-07" required />)

    const datepicker = document.querySelector('.dnb-date-picker')
    const inputs: Array<HTMLInputElement> = Array.from(
      datepicker.querySelectorAll('.dnb-date-picker__input')
    )

    expect(datepicker.classList).not.toContain(
      'dnb-date-picker__status--error'
    )
    expect(
      datepicker.querySelector('.dnb-form-status__text')
    ).not.toBeInTheDocument()

    act(() => {
      inputs[inputs.length - 1].focus()
      inputs[inputs.length - 1].setSelectionRange(4, 4)
    })

    await userEvent.keyboard('{Backspace>8}')

    expect(datepicker.classList).toContain(
      'dnb-date-picker__status--error'
    )
    expect(
      datepicker.querySelector('.dnb-form-status__text')
    ).toBeInTheDocument()
    expect(
      datepicker.querySelector('.dnb-form-status__text')
    ).toHaveTextContent('The value is required')

    await userEvent.keyboard('20231207')

    expect(datepicker.classList).not.toContain(
      'dnb-date-picker__status--error'
    )
    expect(
      datepicker.querySelector('.dnb-form-status__text')
    ).not.toBeInTheDocument()

    await userEvent.click(
      document.querySelector('.dnb-input__submit-button__button')
    )

    await userEvent.click(
      document
        .querySelector('.dnb-date-picker__footer')
        .querySelectorAll('.dnb-button--tertiary ')[0]
    )

    expect(datepicker.classList).toContain(
      'dnb-date-picker__status--error'
    )
    expect(
      datepicker.querySelector('.dnb-form-status__text')
    ).toBeInTheDocument()
    expect(
      datepicker.querySelector('.dnb-form-status__text')
    ).toHaveTextContent('The value is required')
  })

  it('should validate with ARIA rules', async () => {
    const element = render(<Date {...props} value="2023-12-07" required />)

    expect(await axeComponent(element)).toHaveNoViolations()
  })
})
