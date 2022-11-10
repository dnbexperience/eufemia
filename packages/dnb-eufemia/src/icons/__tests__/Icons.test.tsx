/**
 * Component Test
 *
 */

import React from 'react'
import { render } from '@testing-library/react'
import { axeComponent } from '../../core/jest/jestSetup'
import Down from '../thumbs_down'
import Up from '../thumbs_up'

describe('Icons', () => {
  it('should validate with ARIA rules', async () => {
    const Comp = render(
      <>
        <Down />
        <Up />
      </>
    )

    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})
