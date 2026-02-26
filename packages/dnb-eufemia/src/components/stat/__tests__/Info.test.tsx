import React from 'react'
import { render } from '@testing-library/react'
import Stat from '../Stat'

describe('Stat.Info', () => {
  it('renders info content and class', () => {
    render(<Stat.Info>Some additional content</Stat.Info>)

    const info = document.querySelector('.dnb-stat__info')

    expect(info).toBeInTheDocument()
    expect(info.tagName.toLowerCase()).toBe('span')
    expect(info.textContent).toBe('Some additional content')
    expect(info.classList).toContain('dnb-stat')
  })
})
