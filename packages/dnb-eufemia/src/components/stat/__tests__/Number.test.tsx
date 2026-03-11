import React from 'react'
import { render } from '@testing-library/react'
import Stat from '../Stat'

describe('Stat.Number', () => {
  it('renders the same output as Stat.Amount', () => {
    const { container: numberContainer } = render(
      <Stat.Number value={12345.67} />
    )
    const { container: amountContainer } = render(
      <Stat.Amount value={12345.67} />
    )

    expect(numberContainer.innerHTML).toBe(amountContainer.innerHTML)
  })

  it('supports _supportsSpacingProps', () => {
    expect(Stat.Number._supportsSpacingProps).toBe(true)
  })
})
