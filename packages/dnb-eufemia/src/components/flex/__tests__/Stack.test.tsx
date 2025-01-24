import React from 'react'
import { render } from '@testing-library/react'
import Flex from '../Flex'

describe('Flex.Stack', () => {
  it('should forward HTML attributes', () => {
    render(<Flex.Stack aria-label="Aria Label">content</Flex.Stack>)

    const element = document.querySelector('.dnb-flex-stack')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toContain('aria-label')
    expect(element.getAttribute('aria-label')).toBe('Aria Label')
  })

  it('should support spacing props', () => {
    const { rerender } = render(
      <Flex.Stack top="large">content</Flex.Stack>
    )

    const element = document.querySelector('.dnb-flex-stack')

    expect(element.classList).toContain('dnb-space__top--large')

    rerender(<Flex.Stack space={{ top: 'x-large' }}>content</Flex.Stack>)

    expect(element.classList).toContain('dnb-space__top--x-large')
  })

  it('should contain given classes', () => {
    render(<Flex.Stack className="custom-class">content</Flex.Stack>)

    const element = document.querySelector('.dnb-flex-stack')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-flex-container',
      'dnb-flex-container--row-gap-off',
      'dnb-flex-stack',
      'custom-class',
      'dnb-flex-container--direction-vertical',
      'dnb-flex-container--justify-flex-start',
      'dnb-flex-container--align-stretch',
      'dnb-flex-container--align-self-stretch',
      'dnb-flex-container--spacing-medium',
      'dnb-flex-container--wrap',
      'dnb-flex-container--divider-space',
    ])
  })

  it('should support "spacing" property', () => {
    render(<Flex.Stack gap="large">content</Flex.Stack>)

    const element = document.querySelector('.dnb-flex-stack')

    expect(element.classList).toContain(
      'dnb-flex-container--spacing-large'
    )
    expect(element.classList).toContain(
      'dnb-flex-container--divider-space'
    )
  })

  it('should omit spacing when "spacing" is false', () => {
    render(<Flex.Stack gap={false}>content</Flex.Stack>)

    const element = document.querySelector('.dnb-flex-stack')

    expect(element.className).not.toContain('spacing')
  })

  it('should default to section element', () => {
    render(<Flex.Stack>content</Flex.Stack>)

    const element = document.querySelector('.dnb-flex-stack')

    expect(element.tagName).toBe('SECTION')
  })

  it('should default direction to column', () => {
    render(<Flex.Stack>content</Flex.Stack>)

    const element = document.querySelector('.dnb-flex-stack')

    expect(element.classList).toContain(
      'dnb-flex-container--direction-vertical'
    )
  })

  it('should set flow direction of content', () => {
    const { rerender } = render(<Flex.Stack>content</Flex.Stack>)

    const element = document.querySelector('.dnb-flex-stack')

    expect(element.classList).toContain(
      'dnb-flex-container--direction-vertical'
    )

    rerender(<Flex.Stack direction="horizontal">content</Flex.Stack>)

    expect(element.classList).toContain(
      'dnb-flex-container--direction-horizontal'
    )
  })

  it('has correct classes when divider is line', () => {
    render(
      <Flex.Stack divider="line">
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
      </Flex.Stack>
    )

    const element = document.querySelector('.dnb-flex-container')
    const children = element.children

    expect(children.length).toBe(3)
    expect(element).toHaveClass('dnb-flex-container--divider-line')

    expect(children[0].tagName).toContain('DIV')
    expect(children[0]).toHaveClass(
      'dnb-space dnb-space__top--zero dnb-space__bottom--zero dnb-flex-item'
    )

    expect(children[1].tagName).toContain('HR')
    expect(children[1]).toHaveClass(
      'dnb-flex-container__hr dnb-space__top--small dnb-space__left--zero dnb-space__bottom--zero dnb-space__right--zero dnb-hr'
    )

    expect(children[2].tagName).toContain('DIV')
    expect(children[2]).toHaveClass(
      'dnb-space dnb-space__top--small dnb-space__bottom--zero dnb-flex-item'
    )
  })

  it('has correct classes when divider is line-framed', () => {
    render(
      <Flex.Stack divider="line-framed">
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
      </Flex.Stack>
    )

    const element = document.querySelector('.dnb-flex-container')
    const children = element.children

    expect(children.length).toBe(5)
    expect(element).toHaveClass('dnb-flex-container--divider-line-framed')

    expect(children[0].tagName).toContain('HR')
    expect(children[0]).toHaveClass(
      'dnb-flex-container__hr dnb-space__top--zero dnb-space__left--zero dnb-space__bottom--zero dnb-space__right--zero dnb-hr'
    )

    expect(children[1].tagName).toContain('DIV')
    expect(children[1]).toHaveClass(
      'dnb-space dnb-space__top--small dnb-space__bottom--zero dnb-flex-item'
    )

    expect(children[2].tagName).toContain('HR')
    expect(children[2]).toHaveClass(
      'dnb-flex-container__hr dnb-space__top--small dnb-space__left--zero dnb-space__bottom--zero dnb-space__right--zero dnb-hr'
    )

    expect(children[3].tagName).toContain('DIV')
    expect(children[3]).toHaveClass(
      'dnb-space dnb-space__top--small dnb-space__bottom--zero dnb-flex-item'
    )

    expect(children[4].tagName).toContain('HR')
    expect(children[4]).toHaveClass(
      'dnb-flex-container__hr dnb-space__top--small dnb-space__left--zero dnb-space__bottom--zero dnb-space__right--zero dnb-hr'
    )
  })
})
