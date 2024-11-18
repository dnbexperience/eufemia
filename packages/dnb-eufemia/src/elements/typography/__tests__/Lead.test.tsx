import React from 'react'
import Lead from '../Lead'
import { render } from '@testing-library/react'

describe('Lead', () => {
  it('has correct classes by default', () => {
    render(<Lead />)
    const element = document.querySelector(
      '.dnb-p--lead'
    ) as HTMLParagraphElement

    expect(Array.from(element.classList)).toEqual(['dnb-p--lead', 'dnb-p'])
  })

  it('should forward HTML attributes', () => {
    render(<Lead aria-label="Aria Label">Aria Paragraph</Lead>)

    const element = document.querySelector(
      '.dnb-p--lead'
    ) as HTMLParagraphElement
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toContain('aria-label')
    expect(element.getAttribute('aria-label')).toBe('Aria Label')
  })

  it('should support spacing props', () => {
    const { rerender } = render(<Lead top="x-large">Space Paragraph</Lead>)
    const element = document.querySelector(
      '.dnb-p--lead'
    ) as HTMLParagraphElement

    expect(element.classList).toContain('dnb-space__top--x-large')

    rerender(<Lead top="x-small">Space Paragraph</Lead>)

    expect(element.classList).toContain('dnb-space__top--x-small')
  })

  it('should contain given classes', () => {
    render(<Lead className="custom-class">Class Paragraph</Lead>)

    const element = document.querySelector(
      '.dnb-p--lead'
    ) as HTMLParagraphElement

    expect(Array.from(element.classList)).toEqual([
      'dnb-p--lead',
      'custom-class',
      'dnb-p',
    ])
  })

  it('should render children', () => {
    render(<Lead>Children Paragraph</Lead>)

    const element = document.querySelector(
      '.dnb-p--lead'
    ) as HTMLParagraphElement
    const children = element.childNodes

    expect(children.length).toEqual(1)
    expect(children[0].textContent).toEqual('Children Paragraph')
  })
})
