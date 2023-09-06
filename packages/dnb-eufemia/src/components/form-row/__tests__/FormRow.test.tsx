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
    expect(document.querySelector('.dnb-form-row').classList).toContain(
      'dnb-form-row--vertical'
    )
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
      document.querySelectorAll('span.dnb-input')[0].classList
    ).toContain('dnb-input--vertical')
    expect(
      document.querySelectorAll('span.dnb-input')[1].classList
    ).toContain('dnb-input--horizontal')
    expect(
      document.querySelectorAll('span.dnb-input')[2].classList
    ).toContain('dnb-input--vertical')
  })

  it('should using formset and legend by default', () => {
    render(<FormRow {...props} />)

    expect(document.querySelector('fieldset')).toBeInTheDocument()
    expect(document.querySelector('legend')).toBeInTheDocument()
  })

  it('should using formset and legend by default', () => {
    render(<FormRow {...props} no_fieldset />)
    expect(document.querySelector('label')).toBeInTheDocument()
    expect(document.querySelector('fieldset')).not.toBeInTheDocument()
    expect(document.querySelector('legend')).not.toBeInTheDocument()
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
    expect(document.querySelector('input[disabled]')).toBeInTheDocument()
  })

  it('should validate with ARIA rules', async () => {
    const Comp = render(<FormRow {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('FormRow scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const css = loadScss(
      require.resolve('../style/themes/dnb-form-row-theme-ui.scss')
    )
    expect(css).toMatchSnapshot()
  })
})
