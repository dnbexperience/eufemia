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
import { render } from '@testing-library/react'

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
  // compare the snapshot
  it('have to match snapshot', () => {
    const Comp = mount(<Component {...props} />)
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has to use the provider to enable a skeleton in a component', () => {
    const { rerender } = render(<Component {...props} />)
    expect(document.querySelector('.dnb-input .dnb-skeleton')).toBeFalsy()
    rerender(<Component {...props} show={true} />)
    expect(document.querySelector('.dnb-input .dnb-skeleton')).toBeTruthy()
  })

  it('should validate with ARIA rules', async () => {
    const Comp = render(<Component {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Skeleton scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/deps.scss'))
    expect(scss).toMatchSnapshot()
  })
})
