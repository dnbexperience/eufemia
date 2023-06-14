/**
 * Skeleton Test
 *
 */

import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import Skeleton from '../Skeleton'
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
  it('has to use the provider to enable a skeleton in a component', () => {
    const { rerender } = render(<Skeleton {...props} />)
    expect(document.querySelector('.dnb-input .dnb-skeleton')).toBeFalsy()
    rerender(<Skeleton {...props} show={true} />)
    expect(document.querySelector('.dnb-input .dnb-skeleton')).toBeTruthy()
  })

  it('should validate with ARIA rules', async () => {
    const Comp = render(<Skeleton {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Skeleton scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/deps.scss'))
    expect(scss).toMatchSnapshot()
  })
})
