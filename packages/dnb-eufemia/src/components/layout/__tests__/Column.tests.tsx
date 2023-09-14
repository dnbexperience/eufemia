import React from 'react'
import { render } from '@testing-library/react'
import Column from '../Column'
import Card from '../Card'

describe('Layout.Column', () => {
  it('should forward HTML attributes', () => {
    render(<Column aria-label="Aria Label">content</Column>)

    const element = document.querySelector(
      '.dnb-layout__flex-container--direction-column'
    )
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toContain('aria-label')
    expect(element.getAttribute('aria-label')).toBe('Aria Label')
  })

  it('should support spacing props', () => {
    const { rerender } = render(<Column top="large">content</Column>)
    const element = document.querySelector(
      '.dnb-layout__flex-container--direction-column'
    )

    expect(element.classList).toContain('dnb-space__top--large')

    rerender(<Column top="x-large">content</Column>)

    expect(element.classList).toContain('dnb-space__top--x-large')
  })

  it('should contain given classes', () => {
    render(<Column className="custom-class">content</Column>)

    const element = document.querySelector(
      '.dnb-layout__flex-container--direction-column'
    )

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-layout__flex-container',
      'custom-class',
      'dnb-layout__flex-container--direction-column',
      'dnb-layout__flex-container--justify-flex-start',
      'dnb-layout__flex-container--align-stretch',
      'dnb-layout__flex-container--divider-space',
      'dnb-layout__flex-container--spacing-small',
    ])
  })

  it('should render children', () => {
    render(
      <Column>
        <Card>Content 1</Card>
        <Card>Content 2</Card>
        <Card>Content 3</Card>
      </Column>
    )

    const element = document.querySelector(
      '.dnb-layout__flex-container--direction-column'
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
      <Column>
        <Card>Content 1</Card>
        <Card>Content 2</Card>
        <Card>Content 3</Card>
      </Column>
    )

    const element = document.querySelector(
      '.dnb-layout__flex-container--direction-column'
    )
    const children = element.children

    expect(children[0].className).toContain('dnb-space__top--zero')
    expect(children[0].className).toContain('dnb-space__bottom--zero')
    expect(children[0].className).toContain('dnb-layout__flex-item')

    expect(children[1].className).toContain('dnb-space__top--small')
    expect(children[1].className).toContain('dnb-space__bottom--zero')
    expect(children[1].className).toContain('dnb-layout__flex-item')

    expect(children[2].className).toContain('dnb-space__top--small')
    expect(children[2].className).toContain('dnb-space__bottom--zero')
    expect(children[2].className).toContain('dnb-layout__flex-item')
  })
})
