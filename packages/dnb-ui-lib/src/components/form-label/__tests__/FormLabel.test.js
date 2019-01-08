/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  fakeProps,
  toJson,
  axeComponent
} from '../../../core/jest/jestSetup'
import Component from '../FormLabel'
import Input from '../../input/Input'

const props = fakeProps(require.resolve('../FormLabel'), {
  optional: true
})

describe('FormLabel component', () => {
  const Comp = mount(<Component {...props} />)

  it('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('should validate with ARIA rules', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('should validate with ARIA rules as a label with a input', async () => {
    const LabelComp = mount(<Component {...props} for_id="input" />)
    const InputComp = mount(<Input id="input" value="some value" />)
    expect(await axeComponent(LabelComp, InputComp)).toHaveNoViolations()
  })
})
