import React from 'react'
import { render } from '@testing-library/react'
import Vertical from '../Vertical'
import Card from '../Card'

describe('Layout.Vertical', () => {
  it('should forward HTML attributes', () => {
    render(<Vertical aria-label="Aria Label">content</Vertical>)

    const element = document.querySelector(
      '.dnb-layout-flex-container--direction-vertical'
    )
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toContain('aria-label')
    expect(element.getAttribute('aria-label')).toBe('Aria Label')
  })

  it('should support spacing props', () => {
    const { rerender } = render(<Vertical top="large">content</Vertical>)
    const element = document.querySelector(
      '.dnb-layout-flex-container--direction-vertical'
    )

    expect(element.classList).toContain('dnb-space__top--large')

    rerender(<Vertical top="x-large">content</Vertical>)

    expect(element.classList).toContain('dnb-space__top--x-large')
  })

  it('should contain given classes', () => {
    render(<Vertical className="custom-class">content</Vertical>)

    const element = document.querySelector(
      '.dnb-layout-flex-container--direction-vertical'
    )

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-layout-flex-container',
      'custom-class',
      'dnb-layout-flex-container--direction-vertical',
      'dnb-layout-flex-container--justify-flex-start',
      'dnb-layout-flex-container--align-flex-start',
      'dnb-layout-flex-container--spacing-small',
      'dnb-layout-flex-container--wrap',
      'dnb-layout-flex-container--divider-space',
    ])
  })

  it('should render children', () => {
    render(
      <Vertical>
        <Card>Content 1</Card>
        <Card>Content 2</Card>
        <Card>Content 3</Card>
      </Vertical>
    )

    const element = document.querySelector(
      '.dnb-layout-flex-container--direction-vertical'
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
      <Vertical>
        <Card>Content 1</Card>
        <Card>Content 2</Card>
        <Card>Content 3</Card>
      </Vertical>
    )

    const element = document.querySelector(
      '.dnb-layout-flex-container--direction-vertical'
    )
    const children = element.children

    expect(children[0].className).toContain('dnb-space__top--zero')
    expect(children[0].className).toContain('dnb-space__bottom--zero')
    expect(children[0].className).toContain('dnb-layout-flex-item')

    expect(children[1].className).toContain('dnb-space__top--small')
    expect(children[1].className).toContain('dnb-space__bottom--zero')
    expect(children[1].className).toContain('dnb-layout-flex-item')

    expect(children[2].className).toContain('dnb-space__top--small')
    expect(children[2].className).toContain('dnb-space__bottom--zero')
    expect(children[2].className).toContain('dnb-layout-flex-item')
  })
})
