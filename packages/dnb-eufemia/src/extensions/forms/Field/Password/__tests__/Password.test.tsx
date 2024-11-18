/**
 * Password Test
 *
 */

import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PasswordProps } from '../Password'
import { Provider } from '../../../../../shared'
import { Translations } from '../../../../../shared/Context'
import { Field, Form } from '../../..'

import nbNO from '../../../constants/locales/nb-NO'
import enGB from '../../../constants/locales/en-GB'

const nb = nbNO['nb-NO']
const en = enGB['en-GB']

describe('Password component', () => {
  it('has correct type by default', () => {
    const props: PasswordProps = {}
    render(<Field.Password {...props} id="input" />)

    expect(
      document.querySelector('.dnb-input__input').getAttribute('type')
    ).toBe('password')
  })

  it('should show error when required and value is empty', async () => {
    render(<Field.Password value="a" required />)
    const input = document.querySelector('input')
    await userEvent.type(input, '{Backspace}')
    fireEvent.blur(input)
    expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
      nb.Field.errorRequired
    )
  })

  it('has correct state after "focus" trigger', () => {
    render(<Field.Password id="input" />)

    fireEvent.focus(document.querySelector('input'))

    expect(
      document.querySelector('.dnb-input').getAttribute('data-input-state')
    ).toBe('focus')
  })

  it('has correct aria-label', async () => {
    const { rerender } = render(
      <Form.Handler>
        <Field.Password />
      </Form.Handler>
    )

    const button = () => document.querySelector('button')

    expect(button().getAttribute('aria-label')).toBe(
      nb.Password.ariaLabelShow
    )

    await userEvent.click(button())

    expect(button().getAttribute('aria-label')).toBe(
      nb.Password.ariaLabelHide
    )

    rerender(
      <Form.Handler locale="en-GB">
        <Field.Password />
      </Form.Handler>
    )

    expect(button().getAttribute('aria-label')).toBe(
      en.Password.ariaLabelHide
    )

    await userEvent.click(button())

    expect(button().getAttribute('aria-label')).toBe(
      en.Password.ariaLabelShow
    )
  })

  it('sets correct class when size prop is large', () => {
    render(<Field.Password size="large" />)

    expect(document.querySelector('.dnb-input')).toHaveClass(
      'dnb-input--large'
    )
  })

  it('has aria-describedby and aria-controls', () => {
    render(<Field.Password id="input" />)

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
    render(<Field.Password id="input" />)

    expect(
      document.querySelector('.dnb-input__input').getAttribute('id')
    ).toBe(
      document
        .querySelector('button.dnb-button--input-button')
        .getAttribute('aria-controls')
    )
  })

  it('has a submit button which gets focus', () => {
    render(<Field.Password />)

    const Button = document.querySelector('button')
    expect(Button).toBeInTheDocument()

    fireEvent.focus(Button)
    expect(
      document
        .querySelector('.dnb-input__submit-button')
        .getAttribute('data-input-state')
    ).toBe('focus')
  })

  it('can change the visibility of the password', async () => {
    render(<Field.Password />)

    const button = () => document.querySelector('button')

    expect(button()).toBeInTheDocument()

    await userEvent.click(button())

    expect(
      document.querySelector('.dnb-input__input').getAttribute('type')
    ).toBe('text')

    await userEvent.click(button())
    expect(
      document.querySelector('.dnb-input__input').getAttribute('type')
    ).toBe('password')

    expect(
      document
        .querySelector('.dnb-input__submit-button')
        .getAttribute('data-input-state')
    ).not.toBe('focus')
  })

  it('events gets triggered on interaction', async () => {
    const onShowPassword = jest.fn()
    const onHidePassword = jest.fn()

    render(
      <Field.Password
        onShowPassword={onShowPassword}
        onHidePassword={onHidePassword}
      />
    )

    const button = () => document.querySelector('button')
    const input = () => document.querySelector('input')

    await userEvent.type(input(), 'password123')
    await userEvent.click(button())
    expect(onShowPassword).toHaveBeenCalledTimes(1)
    expect(onShowPassword).toHaveBeenLastCalledWith(
      expect.objectContaining({ value: 'password123' })
    )
    expect(onHidePassword).not.toHaveBeenCalled()

    await userEvent.click(button())
    expect(onShowPassword).toHaveBeenCalledTimes(1)
    expect(onHidePassword).toHaveBeenCalledTimes(1)
    expect(onHidePassword).toHaveBeenLastCalledWith(
      expect.objectContaining({ value: 'password123' })
    )

    await userEvent.click(button())
    expect(onShowPassword).toHaveBeenCalledTimes(2)
    expect(onShowPassword).toHaveBeenLastCalledWith(
      expect.objectContaining({ value: 'password123' })
    )
    expect(onHidePassword).toHaveBeenCalledTimes(1)
  })

  it('should support spacing props', () => {
    render(<Field.Password top="large" />)

    const element = document.querySelector('.dnb-forms-field-password')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-space__top--large',
      'dnb-forms-field-block',
      'dnb-forms-field-string',
      'dnb-forms-field-password',
      'dnb-forms-field-block--content-width-large',
    ])
  })

  it('should inherit formElement vertical label', () => {
    render(
      <Provider formElement={{ label_direction: 'vertical' }}>
        <Field.Password label="Label" />
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
      'dnb-input__border--tokens',
      'dnb-form-component',
      'dnb-forms-field-string__input',
      'dnb-input--password',
      'dnb-input--has-submit-element',
      'dnb-input--vertical',
      'dnb-input--stretch',
    ])
  })

  it('should validate with ARIA rules as a input with a label', async () => {
    const result = render(
      <Field.Password id="input" label="label" value="some value" />
    )
    expect(await axeComponent(result)).toHaveNoViolations()
  })

  it('should allow changing visibility-toggle aria-labels using the Form.Handler', async () => {
    const tr: Translations = {
      'nb-NO': {
        Password: {
          ariaLabelShow: 'Show it!',
          ariaLabelHide: 'Hide it!',
        },
      },
    }

    render(
      <Form.Handler translations={tr}>
        <Field.Password />
      </Form.Handler>
    )
    const button = () =>
      document.querySelector('.dnb-button--input-button')

    expect(button()).toHaveAttribute('aria-label', 'Show it!')

    await userEvent.click(button())

    expect(button()).toHaveAttribute('aria-label', 'Hide it!')
  })
})
