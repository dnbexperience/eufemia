import React from 'react'
import { render } from '@testing-library/react'
import SubHeading from '../SubHeading'

beforeEach(() => {
  global.console.log = jest.fn()
})

describe('Layout.SubHeading', () => {
  it('should forward HTML attributes', () => {
    render(<SubHeading aria-label="Aria Label">Aria Heading</SubHeading>)

    const element = document.querySelector('.dnb-layout__sub-heading')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toContain('aria-label')
    expect(element.getAttribute('aria-label')).toBe('Aria Label')
  })

  it('should support spacing props', () => {
    const { rerender } = render(
      <SubHeading top="large">Space Heading</SubHeading>
    )
    const element = document.querySelector('.dnb-layout__sub-heading')

    expect(element.classList).toContain('dnb-space__top--large')

    rerender(<SubHeading top="x-large">Space Heading</SubHeading>)

    expect(element.classList).toContain('dnb-space__top--x-large')
  })

  it('should contain given classes', () => {
    render(<SubHeading className="custom-class">Class Heading</SubHeading>)

    const element = document.querySelector('.dnb-layout__sub-heading')

    expect(Array.from(element.classList)).toEqual([
      'dnb-heading',
      'dnb-h--medium',
      'dnb-layout__sub-heading',
      'custom-class',
    ])
  })

  it('should render children', () => {
    render(<SubHeading>Children Heading</SubHeading>)

    const element = document.querySelector('.dnb-layout__sub-heading')
    const children = element.childNodes

    expect(children.length).toEqual(1)
    expect(children[0].textContent).toEqual('Children Heading')
  })

  it('should default to medium heading', () => {
    render(<SubHeading>Heading</SubHeading>)

    const element = document.querySelector('.dnb-layout__sub-heading')

    expect(element.className).toBe(
      'dnb-heading dnb-h--medium dnb-layout__sub-heading'
    )
  })
})
