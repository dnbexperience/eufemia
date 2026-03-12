import React from 'react'
import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import Stat from '../Stat'

describe('Stat.Inline', () => {
  it('renders horizontal inline layout with defaults', () => {
    render(
      <Stat.Inline>
        <Stat.Trend>+1.2%</Stat.Trend>
        <Stat.Info>(additional information)</Stat.Info>
      </Stat.Inline>
    )

    const inline = document.querySelector('.dnb-stat__inline')

    expect(inline).toBeInTheDocument()
    expect(inline.classList).toContain(
      'dnb-flex-container--direction-horizontal'
    )
    expect(inline.classList).toContain('dnb-flex-container--align-center')
    expect(inline.classList).toContain(
      'dnb-flex-container--spacing-x-small'
    )
  })

  it('supports overrides', () => {
    render(
      <Stat.Inline align="baseline" gap="small">
        <Stat.Trend>+1.2%</Stat.Trend>
        <Stat.Info>(additional information)</Stat.Info>
      </Stat.Inline>
    )

    const inline = document.querySelector('.dnb-stat__inline')

    expect(inline.classList).toContain(
      'dnb-flex-container--align-baseline'
    )
    expect(inline.classList).toContain('dnb-flex-container--spacing-small')
    expect(inline.classList).not.toContain(
      'dnb-flex-container--align-center'
    )
  })

  it('should validate with ARIA rules', async () => {
    const component = render(
      <Stat.Inline>
        <Stat.Trend>+1.2%</Stat.Trend>
        <Stat.Info>(additional information)</Stat.Info>
      </Stat.Inline>
    )

    expect(await axeComponent(component)).toHaveNoViolations()
  })
})
