/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  axeComponent,
  toJson,
  loadScss,
} from '../../../core/jest/jestSetup'
import Component from '../Skeleton'
import Input from '../../input/Input'
import P from '../../../elements/P'

const props = {
  children: (
    <>
      <P>paragraph</P>
      <Input id="input" label="label">
        value
      </Input>
    </>
  ),
}

describe('Skeleton component', () => {
  const Comp = mount(<Component {...props} />)

  // compare the snapshot
  it('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has to use the provider to enable a skeleton in a component', () => {
    expect(Comp.find('.dnb-input .dnb-skeleton').exists()).toBe(false)
    Comp.setProps({ show: true })
    expect(Comp.find('.dnb-input .dnb-skeleton').exists()).toBe(true)
  })

  it('should validate with ARIA rules', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Skeleton scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/deps.scss'))
    expect(scss).toMatchSnapshot()
  })
})
