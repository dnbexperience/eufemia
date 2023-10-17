/**
 * FormLabel Test
 *
 */

import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import { render } from '@testing-library/react'
import FormLabel, { FormLabelProps } from '../FormLabel'
import Input from '../../input/Input'
import FormRow from '../../form-row/FormRow'

const props: FormLabelProps = {
  title: 'title',
}

describe('FormLabel component', () => {
  it('should forward unlisted attributes like "aria-hidden"', () => {
    render(<FormLabel {...props} for_id="input" aria-hidden />)
    expect(
      document.querySelector('label[aria-hidden]')
    ).toBeInTheDocument()
    expect(document.querySelector('label[aria-hidden]')).toHaveAttribute(
      'aria-hidden'
    )
  })

  it('should support spacing props', () => {
    render(<FormLabel for_id="input" top="large" />)

    const element = document.querySelector('.dnb-form-label')

    expect(Array.from(element.classList)).toEqual([
      'dnb-form-label',
      'dnb-space__top--large',
    ])
  })

  it('should set correct class when sr_only is set', () => {
    render(<FormLabel for_id="input" sr_only />)

    const element = document.querySelector('.dnb-form-label')

    expect(Array.from(element.classList)).toEqual([
      'dnb-form-label',
      'dnb-sr-only',
    ])
  })

  it('should inherit FormRow vertical label', () => {
    render(
      <FormRow vertical>
        <FormLabel label="Label" />
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

  it('should support heading size prop', () => {
    const { rerender } = render(
      <FormLabel label="Label" size="medium">
        content
      </FormLabel>
    )

    expect(document.querySelector('.dnb-form-label').classList).toContain(
      'dnb-h--medium'
    )

    rerender(
      <FormLabel label="Label" size="large">
        content
      </FormLabel>
    )

    expect(document.querySelector('.dnb-form-label').classList).toContain(
      'dnb-h--large'
    )
  })

  it('should validate with ARIA rules', async () => {
    const Comp = render(<FormLabel {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('should validate with ARIA rules as a label with a input', async () => {
    const LabelComp = render(<FormLabel {...props} for_id="input" />)
    const InputComp = render(<Input id="input" value="some value" />)
    expect(await axeComponent(LabelComp, InputComp)).toHaveNoViolations()
  })
})

describe('FormLabel scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const css = loadScss(
      require.resolve('../style/themes/dnb-form-label-theme-ui.scss')
    )
    expect(css).toMatchSnapshot()
  })
})
