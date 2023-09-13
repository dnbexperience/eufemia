import React from 'react'
import { render } from '@testing-library/react'
import Horizontal from '../Horizontal'
import Card from '../Card'

describe('Layout.Horizontal', () => {
  it('should forward HTML attributes', () => {
    render(<Horizontal aria-label="Aria Label">content</Horizontal>)

    const element = document.querySelector(
      '.dnb-layout__flex-container--direction-horizontal'
    )
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toContain('aria-label')
    expect(element.getAttribute('aria-label')).toBe('Aria Label')
  })

  it('should support spacing props', () => {
    const { rerender } = render(
      <Horizontal top="large">content</Horizontal>
    )
    const element = document.querySelector(
      '.dnb-layout__flex-container--direction-horizontal'
    )

    expect(element.classList).toContain('dnb-space__top--large')

    rerender(<Horizontal top="x-large">content</Horizontal>)

    expect(element.classList).toContain('dnb-space__top--x-large')
  })

  it('should contain given classes', () => {
    render(<Horizontal className="custom-class">content</Horizontal>)

    const element = document.querySelector(
      '.dnb-layout__flex-container--direction-horizontal'
    )

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-layout__flex-container',
      'custom-class',
      'dnb-layout__flex-container--direction-horizontal',
      'dnb-layout__flex-container--justify-flex-start',
      'dnb-layout__flex-container--align-flex-start',
      'dnb-layout__flex-container--spacing-small',
      'dnb-layout__flex-container--wrap',
      'dnb-layout__flex-container--divider-space',
    ])
  })

  it('should render children', () => {
    render(
      <Horizontal>
        <Card>Content 1</Card>
        <Card>Content 2</Card>
        <Card>Content 3</Card>
      </Horizontal>
    )

    const element = document.querySelector(
      '.dnb-layout__flex-container--direction-horizontal'
    )
    const children = element.children
    const childredTextContents = Array.from(children).map((child) =>
      child.textContent.replace(/[\u200C]/g, '')
    )

    expect(children.length).toEqual(3)
    expect(childredTextContents).toEqual([
      'Content 1',
      'Content 2',
      'Content 3',
    ])
  })

  it('should apply spacing to children', () => {
    render(
      <Horizontal>
        <Card>Content 1</Card>
        <Card>Content 2</Card>
        <Card>Content 3</Card>
      </Horizontal>
    )

    const element = document.querySelector(
      '.dnb-layout__flex-container--direction-horizontal'
    )

    expect(element.className).toContain(
      'dnb-layout__flex-container--spacing-small'
    )
  })
})
