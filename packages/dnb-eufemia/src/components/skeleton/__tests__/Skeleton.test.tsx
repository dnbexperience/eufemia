/**
 * Skeleton Test
 *
 */

import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import Skeleton, { SkeletonProps } from '../Skeleton'
import Input from '../../input/Input'
import P from '../../../elements/P'
import { render } from '@testing-library/react'

const props: SkeletonProps = {
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
    expect(
      document.querySelector('.dnb-input .dnb-skeleton')
    ).not.toBeInTheDocument()
    rerender(<Skeleton {...props} show={true} />)
    expect(
      document.querySelector('.dnb-input .dnb-skeleton')
    ).toBeInTheDocument()
  })

  it('should validate with ARIA rules', async () => {
    const Comp = render(<Skeleton {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Skeleton scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })
})
