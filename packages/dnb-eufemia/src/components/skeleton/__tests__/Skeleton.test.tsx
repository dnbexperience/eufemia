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

// React's deprecated .defaultProps would convert undefined values to the
// declared default. After migrating away from .defaultProps we replicate
// that behavior with removeUndefinedProps so that context overrides still
// work when a consumer passes an explicit `undefined`.
describe('undefined props should fall through to defaults', () => {
  it('should let context override show when prop is explicitly undefined', () => {
    const { container } = render(
      <Skeleton {...props} show={undefined} skeleton={true} />
    )

    // When skeleton is true and show is not explicitly false,
    // the skeleton should still activate
    expect(
      container.querySelector('[aria-busy="true"]')
    ).toBeInTheDocument()
  })
})

describe('Skeleton scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })
})
