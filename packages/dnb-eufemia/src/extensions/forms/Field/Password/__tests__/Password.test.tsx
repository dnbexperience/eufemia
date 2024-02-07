/**
 * Password Test
 *
 */

import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Password, { PasswordProps } from '../Password'

import nbNO from '../../../../../shared/locales/nb-NO'
import enGB from '../../../../../shared/locales/en-GB'
import { Provider } from '../../../../../shared'

const nb = nbNO['nb-NO'].Forms
const en = enGB['en-GB'].Forms

describe('Password component', () => {
  it('has correct type by default', () => {
    const props: PasswordProps = {}
    render(<Password {...props} id="input" />)

    expect(
      document.querySelector('.dnb-input__input').getAttribute('type')
    ).toBe('password')
  })

  it('has correct state after "focus" trigger', () => {
    render(<Password id="input" />)

    fireEvent.focus(document.querySelector('input'))

    expect(
      document.querySelector('.dnb-input').getAttribute('data-input-state')
    ).toBe('focus')
  })

  it('has correct aria-label', async () => {
    const { rerender } = render(<Password id="input" />)

    const button = document.querySelector('button')

    expect(button.getAttribute('aria-label')).toBe(
      nb.passwordShowPasswordLabel
    )

    await userEvent.click(button)

    expect(button.getAttribute('aria-label')).toBe(
      nb.passwordHidePasswordLabel
    )

    rerender(<Password id="input" lang="en-GB" />)

    expect(button.getAttribute('aria-label')).toBe(
      en.passwordHidePasswordLabel
    )

    await userEvent.click(button)

    expect(button.getAttribute('aria-label')).toBe(
      en.passwordShowPasswordLabel
    )
  })

  it('has aria-describedby and aria-controls', () => {
    render(<Password id="input" />)

    fireEvent.focus(document.querySelector('input'))
    expect(
      document
        .querySelector('.dnb-input__input')
        .getAttribute('aria-describedby')
    ).toBe('input-submit-button')
    expect(
      document
        .querySelector('button#input-submit-button')
        .getAttribute('aria-controls')
    ).toBe('input')
  })

  it('has correct aria-controls id', () => {
    render(<Password id="input" />)

    expect(
      document.querySelector('.dnb-input__input').getAttribute('id')
    ).toBe(
      document
        .querySelector('button.dnb-button--input-button')
        .getAttribute('aria-controls')
    )
  })

  it('has a submit button which gets focus', () => {
    render(<Password />)

    const Button = document.querySelector('button')
    expect(Button).toBeInTheDocument()

    fireEvent.focus(Button)
    expect(
      document
        .querySelector('.dnb-input__submit-button')
        .getAttribute('data-input-state')
    ).toBe('focus')
  })

  it('can change the visibility of the password', () => {
    render(<Password />)

    const Button = document.querySelector('button')
    expect(Button).toBeInTheDocument()

    fireEvent.click(Button)
    expect(
      document.querySelector('.dnb-input__input').getAttribute('type')
    ).toBe('text')

    fireEvent.click(Button)
    expect(
      document.querySelector('.dnb-input__input').getAttribute('type')
    ).toBe('password')

    expect(
      document
        .querySelector('.dnb-input__submit-button')
        .getAttribute('data-input-state')
    ).not.toBe('focus')
  })

  it('events gets triggered on interaction', () => {
    const on_show_password = jest.fn()
    const on_hide_password = jest.fn()
    render(
      <Password
        on_show_password={on_show_password}
        on_hide_password={on_hide_password}
      />
    )

    const Button = document.querySelector('button')

    fireEvent.click(Button)
    expect(on_show_password).toHaveBeenCalledTimes(1)
    expect(on_hide_password).not.toHaveBeenCalled()

    fireEvent.click(Button)
    expect(on_show_password).toHaveBeenCalledTimes(1)
    expect(on_hide_password).toHaveBeenCalledTimes(1)

    fireEvent.click(Button)
    expect(on_show_password).toHaveBeenCalledTimes(2)
    expect(on_hide_password).toHaveBeenCalledTimes(1)
  })

  it('should support spacing props', () => {
    render(<Password top="large" />)

    const element = document.querySelector('.dnb-forms-field-password')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-space__top--large',
      'dnb-forms-field-block',
      'dnb-forms-field-string',
      'dnb-forms-field-password',
    ])
  })

  it('should inherit formElement vertical label', () => {
    render(
      <Provider formElement={{ label_direction: 'vertical' }}>
        <Password label="Label" />
      </Provider>
    )

    const element = document.querySelector('.dnb-input')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual([
      'class',
      'data-input-state',
      'data-has-content',
    ])
    expect(Array.from(element.classList)).toEqual([
      'dnb-input',
      'dnb-form-component',
      'dnb-forms-field-string__input',
      'dnb-input--password',
      'dnb-input--has-submit-element',
      'dnb-input--vertical',
      'dnb-input--stretch',
    ])
  })

  it('should validate with ARIA rules as a input with a label', async () => {
    const PasswordComp = render(
      <Password id="input" label="label" value="some value" />
    )
    expect(await axeComponent(PasswordComp)).toHaveNoViolations()
  })

  it('should allow changing visibility-toggle aria-labels using the Provider', async () => {
    render(
      <Provider
        locales={{
          'nb-NO': {
            Forms: {
              passwordShowPasswordLabel: 'Show it!',
              passwordHidePasswordLabel: 'Hide it!',
            },
          },
        }}
      >
        <Password />
      </Provider>
    )
    const button = document.querySelector('.dnb-button--input-button')

    expect(button).toHaveAttribute('aria-label', 'Show it!')

    await userEvent.click(button)

    expect(button).toHaveAttribute('aria-label', 'Hide it!')
  })
})
