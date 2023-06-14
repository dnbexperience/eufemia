/**
 * Component Test
 *
 */

import React from 'react'
import {
  fakeProps,
  axeComponent,
  loadScss,
} from '../../../core/jest/jestSetup'
import Component from '../FormSet'
import FormRow from '../../form-row/FormRow'
import Input from '../../input/Input'
import NumberFormat from '../../number-format/NumberFormat'
import Provider from '../../../shared/Provider'
import { render } from '@testing-library/react'

const props = fakeProps(require.resolve('../FormSet'), {
  optional: true,
})
props.direction = 'horizontal'
props.element = 'form'

describe('FormSet component', () => {
  it('should have .dnb-form-set class', () => {
    render(<Component {...props} />)

    expect(document.querySelector('.dnb-form-set')).toBeTruthy()
  })

  it('should have working provider with vertical direction class on form-row', () => {
    render(
      <Component {...props} direction="vertical">
        <FormRow />
      </Component>
    )
    expect(
      document
        .querySelector('.dnb-form-row')
        .classList.contains('dnb-form-row--vertical')
    ).toBe(true)
  })

  it('should disable nested components', () => {
    const { rerender } = render(
      <Component {...props} disabled>
        <FormRow>
          <Input />
        </FormRow>
      </Component>
    )
    expect(
      document.querySelector('input.dnb-input__input[disabled]')
    ).toBeTruthy()

    rerender(
      <Component {...props} disabled={false}>
        <FormRow>
          <Input />
        </FormRow>
      </Component>
    )
    expect(
      document.querySelector('input.dnb-input__input[disabled]')
    ).toBeFalsy()

    rerender(
      <Component {...props} disabled>
        <FormRow>
          <Input />
        </FormRow>
      </Component>
    )
    expect(
      document.querySelector('input.dnb-input__input[disabled]')
    ).toBeTruthy()

    rerender(
      <Component {...props} disabled>
        <FormRow disabled={false}>
          <Input />
        </FormRow>
      </Component>
    )

    expect(
      document.querySelector('input.dnb-input__input[disabled]')
    ).toBeFalsy()
  })

  it('should support locale context forwarding', () => {
    const { rerender } = render(
      <Component>
        <NumberFormat currency>1234</NumberFormat>
      </Component>
    )

    expect(
      document
        .querySelector('.dnb-number-format')
        .querySelector('.dnb-number-format__visible').textContent
    ).toBe('1 234,00 kr')

    rerender(
      <Component locale="en-GB">
        <NumberFormat currency>1234</NumberFormat>
      </Component>
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
        <Component>
          <NumberFormat currency>1234</NumberFormat>
        </Component>
      </Provider>
    )

    expect(
      document
        .querySelector('.dnb-number-format')
        .querySelector('.dnb-number-format__visible').textContent
    ).toBe('NOK 1 234.00')
  })

  it('should validate with ARIA rules', async () => {
    const Comp = render(<Component {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('FormSet scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/deps.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-form-set-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
