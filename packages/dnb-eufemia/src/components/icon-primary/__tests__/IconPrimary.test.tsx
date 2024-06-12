/**
 * IconPrimary Test
 *
 */

import React from 'react'
import { axeComponent } from '../../../core/jest/jestSetup'
import IconPrimary, { IconPrimaryAllProps } from '../IconPrimary'
import { render } from '@testing-library/react'

const props: IconPrimaryAllProps = {
  icon: 'question',
}

describe('IconPrimary component', () => {
  it('has valid width and height prop', () => {
    const width = '200'
    const height = '100'
    render(<IconPrimary {...props} width={width} height={height} />)
    const elem = document.querySelector('svg')
    expect(elem).toBeInTheDocument()
    expect(elem.getAttribute('width')).toBe(width)
    expect(elem.getAttribute('height')).toBe(height)
    expect(elem.getAttribute('viewBox')).toBe('0 0 16 16')
  })

  it('has valid medium size as enum', () => {
    // here we explicit set size="medium" as well, cause we then test that the loadSVG makes a good job
    render(<IconPrimary {...props} icon="question_medium" size="medium" />)
    const svg = document.querySelector('svg')
    const path = svg.querySelector('path')
    expect(svg).toBeInTheDocument()
    expect(path).toBeInTheDocument()
    expect(svg.getAttribute('viewBox')).toBe('0 0 24 24')
  })

  it('has valid medium size as int', () => {
    // here we explicit set size="medium" as well, cause we then test that the loadSVG makes a good job
    render(<IconPrimary {...props} icon="question_medium" size="24" />)
    const svg = document.querySelector('svg')
    const path = svg.querySelector('path')
    expect(svg).toBeInTheDocument()
    expect(path).toBeInTheDocument()
    expect(svg.getAttribute('viewBox')).toBe('0 0 24 24')
  })

  it('should validate with ARIA rules', async () => {
    const Comp = render(<IconPrimary {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})
