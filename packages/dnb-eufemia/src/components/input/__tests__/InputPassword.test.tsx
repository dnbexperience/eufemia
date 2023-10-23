/**
 * InputPassword Test
 *
 */

import React from 'react'
import { axeComponent } from '../../../core/jest/jestSetup'
import { fireEvent, render } from '@testing-library/react'
import InputPassword, { InputPasswordProps } from '../InputPassword'

import nbNO from '../../../shared/locales/nb-NO'
import enGB from '../../../shared/locales/en-GB'
import { Provider } from '../../../shared'

const nb = nbNO['nb-NO'].Input
const en = enGB['en-GB'].Input

describe('InputPassword component', () => {
  it('has correct type by default', () => {
    const props: InputPasswordProps = {}
    render(<InputPassword {...props} id="input" />)

    expect(
      document.querySelector('.dnb-input__input').getAttribute('type')
    ).toBe('password')
  })

  it('has correct state after "focus" trigger', () => {
    render(<InputPassword id="input" />)

    fireEvent.focus(document.querySelector('input'))

    expect(
      document.querySelector('.dnb-input').getAttribute('data-input-state')
    ).toBe('focus')
  })

  it('has correct aria-label', () => {
    const { rerender } = render(<InputPassword id="input" />)

    expect(
      document.querySelector('button').getAttribute('aria-label')
    ).toBe(nb.show_password)

    rerender(<InputPassword id="input" lang="en-GB" />)

    expect(
      document.querySelector('button').getAttribute('aria-label')
    ).toBe(en.show_password)

    expect(
      document.querySelector('button').getAttribute('aria-label')
    ).toBe(en.show_password)
  })

  it('has aria-describedby and aria-controls', () => {
    render(<InputPassword id="input" />)

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
    render(<InputPassword id="input" />)

    expect(
      document.querySelector('.dnb-input__input').getAttribute('id')
    ).toBe(
      document
        .querySelector('button.dnb-button--input-button')
        .getAttribute('aria-controls')
    )
  })

  it('has a submit button which gets focus', () => {
    render(<InputPassword />)

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
    render(<InputPassword />)

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
      <InputPassword
        on_show_password={on_show_password}
        on_hide_password={on_hide_password}
      />
    )

    const Button = document.querySelector('button')

    fireEvent.click(Button)
    expect(on_show_password).toBeCalledTimes(1)
    expect(on_hide_password).not.toBeCalled()

    fireEvent.click(Button)
    expect(on_show_password).toBeCalledTimes(1)
    expect(on_hide_password).toBeCalledTimes(1)

    fireEvent.click(Button)
    expect(on_show_password).toBeCalledTimes(2)
    expect(on_hide_password).toBeCalledTimes(1)
  })

  it('should support spacing props', () => {
    render(<InputPassword top="2rem" />)

    const element = document.querySelector('.dnb-input')

    expect(Array.from(element.classList)).toEqual([
      'dnb-input',
      'dnb-form-component',
      'dnb-space__top--large',
      'dnb-input--password',
      'dnb-input--has-submit-element',
    ])
  })

  it('should inherit formElement vertical label', () => {
    render(
      <Provider formElement={{ label_direction: 'vertical' }}>
        <InputPassword label="Label" />
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
      'dnb-input--password',
      'dnb-input--has-submit-element',
      'dnb-input--vertical',
    ])
  })

  it('should validate with ARIA rules as a input with a label', async () => {
    const InputPasswordComp = render(
      <InputPassword id="input" label="label" value="some value" />
    )
    expect(await axeComponent(InputPasswordComp)).toHaveNoViolations()
  })
})
