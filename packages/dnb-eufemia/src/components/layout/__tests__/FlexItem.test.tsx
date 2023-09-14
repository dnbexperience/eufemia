import React from 'react'
import { render } from '@testing-library/react'
import FlexItem from '../FlexItem'
import { P } from '../../../elements'

describe('Layout.FlexItem', () => {
  it('should forward HTML attributes', () => {
    render(<FlexItem aria-label="Aria Label">Flex</FlexItem>)

    const element = document.querySelector('.dnb-layout__flex-item')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toContain('aria-label')
    expect(element.getAttribute('aria-label')).toBe('Aria Label')
  })

  it('should support spacing props', () => {
    const { rerender } = render(<FlexItem top="large">Flex</FlexItem>)
    const element = document.querySelector('.dnb-layout__flex-item')

    expect(element.classList).toContain('dnb-space__top--large')

    rerender(<FlexItem top="x-large">Flex</FlexItem>)

    expect(element.classList).toContain('dnb-space__top--x-large')
  })

  it('should contain given classes', () => {
    render(<FlexItem className="custom-class">Flex</FlexItem>)

    const element = document.querySelector('.dnb-layout__flex-item')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-layout__flex-item',
      'custom-class',
    ])
  })

  it('should render children', () => {
    render(
      <FlexItem>
        <P>Flex</P>
      </FlexItem>
    )

    const element = document.querySelector('.dnb-layout__flex-item')
    const children = element.children

    expect(children.length).toEqual(1)
    expect(children[0].textContent).toEqual('Flex')
  })

  it('should set width', () => {
    const { rerender } = render(<FlexItem>Flex</FlexItem>)

    const element = document.querySelector('.dnb-layout__flex-item')

    expect(element.className).not.toContain(
      'dnb-layout__flex-item--width-'
    )

    rerender(<FlexItem width="large">Flex</FlexItem>)

    expect(element.className).toContain(
      'dnb-layout__flex-item--width-large'
    )

    rerender(<FlexItem width="small">Flex</FlexItem>)

    expect(element.className).toContain(
      'dnb-layout__flex-item--width-small'
    )
  })

  it('should grow and shrink', () => {
    const { rerender } = render(<FlexItem grow>Flex</FlexItem>)

    const element = document.querySelector('.dnb-layout__flex-item')

    expect(element.className).toContain('dnb-layout__flex-item--grow')
    expect(element.className).not.toContain(
      'dnb-layout__flex-item--shrink'
    )

    rerender(<FlexItem shrink>Flex</FlexItem>)

    expect(element.className).toContain('dnb-layout__flex-item--shrink')
    expect(element.className).not.toContain('dnb-layout__flex-item--grow')
  })

  it('should set element', () => {
    render(<FlexItem element="section">Flex</FlexItem>)

    const element = document.querySelector('.dnb-layout__flex-item')

    expect(element.tagName).toBe('SECTION')
  })
})
