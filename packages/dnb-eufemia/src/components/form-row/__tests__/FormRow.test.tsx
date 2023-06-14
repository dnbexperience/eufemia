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
import Component from '../FormRow'
import Input from '../../input/Input'
import NumberFormat from '../../number-format/NumberFormat'
import Provider from '../../../shared/Provider'
import { render } from '@testing-library/react'

const props = fakeProps(require.resolve('../FormRow'), {
  optional: true,
})
props.id = 'form-row'
props.direction = 'horizontal'
props.label_direction = 'horizontal'
props.globalStatus = { id: 'main' }

describe('FormRow component', () => {
  it('should have vertical direction class', () => {
    render(<Component {...props} direction="vertical" />)
    expect(
      document
        .querySelector('.dnb-form-row')
        .classList.contains('dnb-form-row--vertical')
    ).toBe(true)
  })

  it('should have an isolated state on nested FormRows', () => {
    render(
      <Component vertical>
        <Input label="Vertical" />
        <Component vertical={false} label_direction="horizontal">
          <Input label="Horizontal" />
        </Component>
        <Input label="Vertical" />
      </Component>
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
    render(<Component {...props} />)

    expect(document.querySelector('fieldset')).toBeTruthy()
    expect(document.querySelector('legend')).toBeTruthy()
  })

  it('should using formset and legend by default', () => {
    render(<Component {...props} no_fieldset />)
    expect(document.querySelector('label')).toBeTruthy()
    expect(document.querySelector('fieldset')).toBeFalsy()
    expect(document.querySelector('legend')).toBeFalsy()
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

  it('should react correct on two states in row', () => {
    const { rerender } = render(
      <Component {...props} disabled={false}>
        <Input />
      </Component>
    )
    rerender(
      <Component {...props} disabled={true}>
        <Input />
      </Component>
    )
    expect(document.querySelector('input[disabled]')).toBeTruthy()
  })

  it('should validate with ARIA rules', async () => {
    const Comp = render(<Component {...props} />)
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
