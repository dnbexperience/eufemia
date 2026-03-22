import React from 'react'
import { render } from '@testing-library/react'
import {
  axeComponent,
  spyOnEufemiaWarn,
} from '../../../core/jest/jestSetup'
import Stat from '../Stat'

describe('Stat.Info', () => {
  it('renders info content and class', () => {
    render(<Stat.Info>Some additional content</Stat.Info>)

    const info = document.querySelector('.dnb-stat__info')

    expect(info).toBeInTheDocument()
    expect(info.tagName.toLowerCase()).toBe('span')
    expect(info.textContent).toBe('Some additional content')
    expect(info.classList).toContain('dnb-stat')
    expect(info.classList).toContain('dnb-stat__info--subtle')
  })

  it('supports plain variant', () => {
    render(<Stat.Info variant="plain">Some additional content</Stat.Info>)

    const info = document.querySelector('.dnb-stat__info')

    expect(info.classList).toContain('dnb-stat__info--plain')
    expect(info.classList).not.toContain('dnb-stat__info--subtle')
  })

  it('supports deprecated default variant and maps to plain', () => {
    const log = spyOnEufemiaWarn()

    render(
      <Stat.Info variant="default">Some additional content</Stat.Info>
    )

    const info = document.querySelector('.dnb-stat__info')

    expect(info.classList).toContain('dnb-stat__info--plain')
    expect(info.classList).not.toContain('dnb-stat__info--default')
    expect(log).toHaveBeenCalledWith(
      expect.stringContaining('Eufemia'),
      expect.stringContaining('variant="default" is deprecated')
    )

    log.mockRestore()
  })

  it('supports prominent variant', () => {
    render(
      <Stat.Info variant="prominent">Some additional content</Stat.Info>
    )

    const info = document.querySelector('.dnb-stat__info')

    expect(info.classList).toContain('dnb-stat__info--prominent')
    expect(info.classList).not.toContain('dnb-stat__info--subtle')
  })

  it('supports skeleton prop', () => {
    render(<Stat.Info skeleton>Some additional content</Stat.Info>)

    const info = document.querySelector('.dnb-stat__info')

    expect(info.classList).toContain('dnb-skeleton')
    expect(info.classList).toContain('dnb-skeleton--font')
    expect(info).toHaveAttribute('aria-disabled', 'true')
  })

  it('supports spacing props', () => {
    render(<Stat.Info top="large">Some additional content</Stat.Info>)

    const info = document.querySelector('.dnb-stat__info')

    expect(info.classList).toContain('dnb-space__top--large')
  })

  it('should validate with ARIA rules', async () => {
    const component = render(
      <Stat.Info>Some additional content</Stat.Info>
    )

    expect(await axeComponent(component)).toHaveNoViolations()
  })

  it('supports id prop', () => {
    render(<Stat.Info id="my-info">Details</Stat.Info>)

    const info = document.querySelector('.dnb-stat__info')

    expect(info.getAttribute('id')).toBe('my-info')
  })

  it('applies style prop to the element', () => {
    render(<Stat.Info style={{ color: 'red' }}>Details</Stat.Info>)

    const info = document.querySelector('.dnb-stat__info')

    expect(info.style.color).toBe('red')
  })
})
