import React from 'react'
import { render } from '@testing-library/react'
import Row from '../Row'
import Card from '../Card'

describe('Layout.Row', () => {
  it('should forward HTML attributes', () => {
    render(<Row aria-label="Aria Label">content</Row>)

    const element = document.querySelector(
      '.dnb-layout__flex-container--direction-row'
    )
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toContain('aria-label')
    expect(element.getAttribute('aria-label')).toBe('Aria Label')
  })

  it('should support spacing props', () => {
    const { rerender } = render(<Row top="large">content</Row>)
    const element = document.querySelector(
      '.dnb-layout__flex-container--direction-row'
    )

    expect(element.classList).toContain('dnb-space__top--large')

    rerender(<Row top="x-large">content</Row>)

    expect(element.classList).toContain('dnb-space__top--x-large')
  })

  it('should contain given classes', () => {
    render(<Row className="custom-class">content</Row>)

    const element = document.querySelector(
      '.dnb-layout__flex-container--direction-row'
    )

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-layout__flex-container',
      'custom-class',
      'dnb-layout__flex-container--direction-row',
      'dnb-layout__flex-container--justify-flex-start',
      'dnb-layout__flex-container--align-stretch',
      'dnb-layout__flex-container--divider-space',
      'dnb-layout__flex-container--spacing-small',
    ])
  })

  it('should render children', () => {
    render(
      <Row>
        <Card>Content 1</Card>
        <Card>Content 2</Card>
        <Card>Content 3</Card>
      </Row>
    )

    const element = document.querySelector(
      '.dnb-layout__flex-container--direction-row'
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
      <Row>
        <Card>Content 1</Card>
        <Card>Content 2</Card>
        <Card>Content 3</Card>
      </Row>
    )

    const element = document.querySelector(
      '.dnb-layout__flex-container--direction-row'
    )

    expect(element.className).toContain(
      'dnb-layout__flex-container--spacing-small'
    )
  })
})
