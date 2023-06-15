/**
 * FormRow Test
 *
 */

import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import FormRow, { FormRowProps } from '../FormRow'
import Input from '../../input/Input'
import NumberFormat from '../../number-format/NumberFormat'
import Provider from '../../../shared/Provider'
import { render } from '@testing-library/react'

const props: FormRowProps = {
  label: 'label',
}

describe('FormRow component', () => {
  it('should have vertical direction class', () => {
    render(<FormRow {...props} direction="vertical" />)
    expect(
      document
        .querySelector('.dnb-form-row')
        .classList.contains('dnb-form-row--vertical')
    ).toBe(true)
  })

  it('should have an isolated state on nested FormRows', () => {
    render(
      <FormRow vertical>
        <Input label="Vertical" />
        <FormRow vertical={false} label_direction="horizontal">
          <Input label="Horizontal" />
        </FormRow>
        <Input label="Vertical" />
      </FormRow>
    )
    expect(
      document
        .querySelectorAll('span.dnb-input')[0]
        .classList.contains('dnb-input--vertical')
    ).toBe(true)
    expect(
      document
        .querySelectorAll('span.dnb-input')[1]
        .classList.contains('dnb-input--horizontal')
    ).toBe(true)
    expect(
      document
        .querySelectorAll('span.dnb-input')[2]
        .classList.contains('dnb-input--vertical')
    ).toBe(true)
  })

  it('should using formset and legend by default', () => {
    render(<FormRow {...props} />)

    expect(document.querySelector('fieldset')).toBeTruthy()
    expect(document.querySelector('legend')).toBeTruthy()
  })

  it('should using formset and legend by default', () => {
    render(<FormRow {...props} no_fieldset />)
    expect(document.querySelector('label')).toBeTruthy()
    expect(document.querySelector('fieldset')).toBeFalsy()
    expect(document.querySelector('legend')).toBeFalsy()
  })

  it('should support locale context forwarding', () => {
    const { rerender } = render(
      <FormRow>
        <NumberFormat currency>1234</NumberFormat>
      </FormRow>
    )

    expect(
      document
        .querySelector('.dnb-number-format')
        .querySelector('.dnb-number-format__visible').textContent
    ).toBe('1 234,00 kr')

    rerender(
      <FormRow locale="en-GB">
        <NumberFormat currency>1234</NumberFormat>
      </FormRow>
    )

    expect(
      document
        .querySelector('.dnb-number-format')
        .querySelector('.dnb-number-format__visible').textContent
    ).toBe('NOK 1 234.00')
  })

  it('should not overwrite locale from provider when not set', () => {
    render(
      <Provider locale="en-GB">
        <FormRow>
          <NumberFormat currency>1234</NumberFormat>
        </FormRow>
      </Provider>
    )

    expect(
      document
        .querySelector('.dnb-number-format')
        .querySelector('.dnb-number-format__visible').textContent
    ).toBe('NOK 1 234.00')
  })

  it('should react correct on two states in row', () => {
    const { rerender } = render(
      <FormRow {...props} disabled={false}>
        <Input />
      </FormRow>
    )
    rerender(
      <FormRow {...props} disabled={true}>
        <Input />
      </FormRow>
    )
    expect(document.querySelector('input[disabled]')).toBeTruthy()
  })

  it('should validate with ARIA rules', async () => {
    const Comp = render(<FormRow {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('FormRow scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/deps.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-form-row-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
