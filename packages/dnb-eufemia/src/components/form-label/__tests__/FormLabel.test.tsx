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
import { render } from '@testing-library/react'
import Component from '../FormLabel'
import Input from '../../input/Input'
import FormRow from '../../form-row/FormRow'

const props = fakeProps(require.resolve('../FormLabel'), {
  optional: true,
})
props.element = 'label'
props.direction = 'horizontal'
props.label_direction = 'horizontal'

describe('FormLabel component', () => {
  it('should forward unlisted attributes like "aria-hidden"', () => {
    render(<Component {...props} for_id="input" aria-hidden />)
    expect(document.querySelector('label[aria-hidden]')).toBeTruthy()
    expect(
      document
        .querySelector('label[aria-hidden]')
        .getAttribute('aria-hidden')
    ).toBeTruthy()
  })

  it('should support spacing props', () => {
    render(<Component for_id="input" top="large" />)

    const element = document.querySelector('.dnb-form-label')

    expect(Array.from(element.classList)).toEqual([
      'dnb-form-label',
      'dnb-space__top--large',
    ])
  })

  it('should set correct class when sr_only is set', () => {
    render(<Component for_id="input" sr_only />)

    const element = document.querySelector('.dnb-form-label')

    expect(Array.from(element.classList)).toEqual([
      'dnb-form-label',
      'dnb-sr-only',
    ])
  })

  it('should inherit FormRow vertical label', () => {
    render(
      <FormRow vertical>
        <Component label="Label" />
      </FormRow>
    )

    const element = document.querySelector('.dnb-form-label')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class', 'label'])
    expect(Array.from(element.classList)).toEqual([
      'dnb-form-label',
      'dnb-form-label--vertical',
    ])
  })

  it('should validate with ARIA rules', async () => {
    const Comp = render(<Component {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('should validate with ARIA rules as a label with a input', async () => {
    const LabelComp = render(<Component {...props} for_id="input" />)
    const InputComp = render(<Input id="input" value="some value" />)
    expect(await axeComponent(LabelComp, InputComp)).toHaveNoViolations()
  })
})

describe('FormLabel scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/deps.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-form-label-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
