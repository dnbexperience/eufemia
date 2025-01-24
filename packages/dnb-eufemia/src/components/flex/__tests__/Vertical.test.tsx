import React from 'react'
import { render } from '@testing-library/react'
import Flex from '../Flex'
import Card from '../../card/Card'

describe('Flex.Vertical', () => {
  it('should forward HTML attributes', () => {
    render(<Flex.Vertical aria-label="Aria Label">content</Flex.Vertical>)

    const element = document.querySelector(
      '.dnb-flex-container--direction-vertical'
    )
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toContain('aria-label')
    expect(element.getAttribute('aria-label')).toBe('Aria Label')
  })

  it('should support spacing props', () => {
    const { rerender } = render(
      <Flex.Vertical top="large">content</Flex.Vertical>
    )
    const element = document.querySelector(
      '.dnb-flex-container--direction-vertical'
    )

    expect(element.classList).toContain('dnb-space__top--large')

    rerender(<Flex.Vertical top="x-large">content</Flex.Vertical>)

    expect(element.classList).toContain('dnb-space__top--x-large')
  })

  it('should contain given classes', () => {
    render(<Flex.Vertical className="custom-class">content</Flex.Vertical>)

    const element = document.querySelector(
      '.dnb-flex-container--direction-vertical'
    )

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-flex-container',
      'dnb-flex-container--row-gap-off',
      'custom-class',
      'dnb-flex-container--direction-vertical',
      'dnb-flex-container--justify-flex-start',
      'dnb-flex-container--align-flex-start',
      'dnb-flex-container--spacing-small',
      'dnb-flex-container--wrap',
      'dnb-flex-container--divider-space',
    ])
  })

  it('should render children', () => {
    render(
      <Flex.Vertical>
        <Card>Content 1</Card>
        <Card>Content 2</Card>
        <Card>Content 3</Card>
      </Flex.Vertical>
    )

    const element = document.querySelector(
      '.dnb-flex-container--direction-vertical'
    )
    const children = element.children
    const childrenTextContents = Array.from(children).map((child) =>
      child.textContent.replace(/[\u200C]/g, '')
    )

    expect(children.length).toEqual(3)
    expect(childrenTextContents).toEqual([
      'Content 1',
      'Content 2',
      'Content 3',
    ])
  })

  it('should apply spacing to children', () => {
    render(
      <Flex.Vertical>
        <Card>Content 1</Card>
        <Card>Content 2</Card>
        <Card>Content 3</Card>
      </Flex.Vertical>
    )

    const element = document.querySelector(
      '.dnb-flex-container--direction-vertical'
    )
    const children = element.children

    expect(children[0].className).toContain('dnb-space__top--zero')
    expect(children[0].className).toContain('dnb-space__bottom--zero')
    expect(children[0].className).toContain('dnb-flex-item')

    expect(children[1].className).toContain('dnb-space__top--small')
    expect(children[1].className).toContain('dnb-space__bottom--zero')
    expect(children[1].className).toContain('dnb-flex-item')

    expect(children[2].className).toContain('dnb-space__top--small')
    expect(children[2].className).toContain('dnb-space__bottom--zero')
    expect(children[2].className).toContain('dnb-flex-item')
  })
})
