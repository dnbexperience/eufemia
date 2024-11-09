import React from 'react'
import { render } from '@testing-library/react'
import MainHeading from '../MainHeading'

beforeEach(() => {
  global.console.log = jest.fn()
})

describe('Form.MainHeading', () => {
  it('should forward HTML attributes', () => {
    render(<MainHeading aria-label="Aria Label">Aria Heading</MainHeading>)

    const element = document.querySelector('.dnb-forms-main-heading')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toContain('aria-label')
    expect(element.getAttribute('aria-label')).toBe('Aria Label')
  })

  it('should support spacing props', () => {
    const { rerender } = render(
      <MainHeading top="x-large">Space Heading</MainHeading>
    )
    const element = document.querySelector('.dnb-forms-main-heading')

    expect(element.classList).toContain('dnb-space__top--x-large')

    rerender(<MainHeading top="x-small">Space Heading</MainHeading>)

    expect(element.classList).toContain('dnb-space__top--x-small')
  })

  it('should contain given classes', () => {
    render(
      <MainHeading className="custom-class">Class Heading</MainHeading>
    )

    const element = document.querySelector('.dnb-forms-main-heading')

    expect(Array.from(element.classList)).toEqual([
      'dnb-heading',
      'dnb-h--large',
      'dnb-forms-main-heading',
      'dnb-card--indent',
      'custom-class',
    ])
  })

  it('should render children', () => {
    render(<MainHeading>Children Heading</MainHeading>)

    const element = document.querySelector('.dnb-forms-main-heading')
    const children = element.childNodes

    expect(children.length).toEqual(1)
    expect(children[0].textContent).toEqual('Children Heading')
  })

  it('should default to large heading', () => {
    render(<MainHeading>Heading</MainHeading>)

    const element = document.querySelector('.dnb-forms-main-heading')

    expect(element.className).toContain('dnb-h--large')
  })
})
