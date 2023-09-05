/**
 * FormSet Test
 *
 */

import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import FormSet, { FormSetProps } from '../FormSet'
import FormRow from '../../form-row/FormRow'
import Input from '../../input/Input'
import NumberFormat from '../../number-format/NumberFormat'
import Provider from '../../../shared/Provider'
import { render } from '@testing-library/react'

const props: FormSetProps = {
  direction: 'horizontal',
  element: 'form',
}

describe('FormSet component', () => {
  it('should have .dnb-form-set class', () => {
    render(<FormSet {...props} />)

    expect(document.querySelector('.dnb-form-set')).toBeInTheDocument()
  })

  it('should have working provider with vertical direction class on form-row', () => {
    render(
      <FormSet {...props} direction="vertical">
        <FormRow />
      </FormSet>
    )
    expect(document.querySelector('.dnb-form-row').classList).toContain(
      'dnb-form-row--vertical'
    )
  })

  it('should disable nested components', () => {
    const { rerender } = render(
      <FormSet {...props} disabled>
        <FormRow>
          <Input />
        </FormRow>
      </FormSet>
    )
    expect(
      document.querySelector('input.dnb-input__input[disabled]')
    ).toBeInTheDocument()

    rerender(
      <FormSet {...props} disabled={false}>
        <FormRow>
          <Input />
        </FormRow>
      </FormSet>
    )
    expect(
      document.querySelector('input.dnb-input__input[disabled]')
    ).not.toBeInTheDocument()

    rerender(
      <FormSet {...props} disabled>
        <FormRow>
          <Input />
        </FormRow>
      </FormSet>
    )
    expect(
      document.querySelector('input.dnb-input__input[disabled]')
    ).toBeInTheDocument()

    rerender(
      <FormSet {...props} disabled>
        <FormRow disabled={false}>
          <Input />
        </FormRow>
      </FormSet>
    )

    expect(
      document.querySelector('input.dnb-input__input[disabled]')
    ).not.toBeInTheDocument()
  })

  it('should support locale context forwarding', () => {
    const { rerender } = render(
      <FormSet>
        <NumberFormat currency>1234</NumberFormat>
      </FormSet>
    )

    expect(
      document
        .querySelector('.dnb-number-format')
        .querySelector('.dnb-number-format__visible').textContent
    ).toBe('1 234,00 kr')

    rerender(
      <FormSet locale="en-GB">
        <NumberFormat currency>1234</NumberFormat>
      </FormSet>
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
        <FormSet>
          <NumberFormat currency>1234</NumberFormat>
        </FormSet>
      </Provider>
    )

    expect(
      document
        .querySelector('.dnb-number-format')
        .querySelector('.dnb-number-format__visible').textContent
    ).toBe('NOK 1 234.00')
  })

  it('should validate with ARIA rules', async () => {
    const Comp = render(<FormSet {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('FormSet scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const css = loadScss(
      require.resolve('../style/themes/dnb-form-set-theme-ui.scss')
    )
    expect(css).toMatchSnapshot()
  })
})
