import React from 'react'
import { render } from '@testing-library/react'
import Card from '../../card/Card'
import Flex from '../Flex'

describe('Flex.Horizontal', () => {
  it('should forward HTML attributes', () => {
    render(
      <Flex.Horizontal aria-label="Aria Label">content</Flex.Horizontal>
    )

    const element = document.querySelector(
      '.dnb-flex-container--direction-horizontal'
    )
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toContain('aria-label')
    expect(element.getAttribute('aria-label')).toBe('Aria Label')
  })

  it('should support spacing props', () => {
    const { rerender } = render(
      <Flex.Horizontal top="large">content</Flex.Horizontal>
    )
    const element = document.querySelector(
      '.dnb-flex-container--direction-horizontal'
    )

    expect(element.classList).toContain('dnb-space__top--large')

    rerender(<Flex.Horizontal top="x-large">content</Flex.Horizontal>)

    expect(element.classList).toContain('dnb-space__top--x-large')
  })

  it('should contain given classes', () => {
    render(
      <Flex.Horizontal className="custom-class">content</Flex.Horizontal>
    )

    const element = document.querySelector(
      '.dnb-flex-container--direction-horizontal'
    )

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-flex-container',
      'custom-class',
      'dnb-flex-container--direction-horizontal',
      'dnb-flex-container--justify-flex-start',
      'dnb-flex-container--align-flex-start',
      'dnb-flex-container--spacing-small',
      'dnb-flex-container--wrap',
      'dnb-flex-container--divider-space',
    ])
  })

  it('should render children', () => {
    render(
      <Flex.Horizontal>
        <Card>Content 1</Card>
        <Card>Content 2</Card>
        <Card>Content 3</Card>
      </Flex.Horizontal>
    )

    const element = document.querySelector(
      '.dnb-flex-container--direction-horizontal'
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
      <Flex.Horizontal>
        <Card>Content 1</Card>
        <Card>Content 2</Card>
        <Card>Content 3</Card>
      </Flex.Horizontal>
    )

    const element = document.querySelector(
      '.dnb-flex-container--direction-horizontal'
    )

    expect(element.className).toContain(
      'dnb-flex-container--spacing-small'
    )
  })
})
