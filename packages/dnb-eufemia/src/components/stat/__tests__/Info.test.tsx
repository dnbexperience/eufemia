import React from 'react'
import { render } from '@testing-library/react'
import Stat from '../Stat'
import { spyOnEufemiaWarn } from '../../../core/jest/jestSetup'

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
})
